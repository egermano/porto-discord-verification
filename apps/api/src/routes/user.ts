import { DISCORD_GUILD_ID, DISCORD_ROLE_NAME } from "@/constants";
import { auth, Session, User } from "@/lib/auth";
import { createRouter } from "@/lib/create-app";
import { client, getRoleId } from "@/lib/discordClient";
import { Context } from "hono";

const userRoute = createRouter();

userRoute.get(
  "/user/check",
  async (
    c: Context<
      {
        Variables: {
          user: User | null;
          session: Session | null;
        };
      },
      "*",
      {}
    >
  ) => {
    const user = c.var.user;

    if (!user) {
      return c.json(
        {
          error: "Unauthorized",
          message: "You must be logged in to check your user information.",
        },
        { status: 401 }
      );
    }

    // check user dicord account
    const accounts = await auth.api.listUserAccounts({
      headers: c.req.raw.headers,
    });

    const discordAccount = accounts.find(
      (account) => account.provider === "discord"
    );

    if (!discordAccount) {
      return c.json(
        {
          error: "Discord account not linked",
          message:
            "You must link your Discord account to check your user information.",
        },
        { status: 403 }
      );
    }

    // check user is member of the discord server
    const discordUserId = discordAccount.accountId;
    let member;

    try {
      member = await client.getMember(DISCORD_GUILD_ID, discordUserId);
    } catch (error) {
      console.error("Error fetching Discord member:", error);
      return c.json(
        {
          error: "Discord member fetch failed",
          message: (error as Error).message,
        },
        { status: 500 }
      );
    }

    if (!member) {
      return c.json(
        {
          error: "Discord member not found",
          message:
            "You must be a member of the Discord server to check your user information.",
        },
        { status: 404 }
      );
    }

    // check user dicord role
    const roleId = await getRoleId(DISCORD_ROLE_NAME, DISCORD_GUILD_ID);
    const hasRole = member.roles.includes(roleId);

    if (!hasRole) {
      return c.json(
        {
          message:
            "You have not been assigned the required role in Discord yet.",
          done: false,
        },
        { status: 202 }
      );
    }

    await handleSuccess(c);
    
    return c.json({
      message: `User is done.`,
      done: true,
    });
  }
);

const handleSuccess = async (
  c: Context<
    {
      Variables: {
        user: User | null;
        session: Session | null;
      };
    },
    "*",
    {}
  >
) => {
  const user = c.var.user;

  if (!user) {
    return c.json(
      {
        error: "Unauthorized",
        message: "You must be logged in to update your user information.",
      },
      { status: 401 }
    );
  }

  const userId = user.id;
  const accounts = await auth.api.listUserAccounts({
    headers: c.req.raw.headers,
  });

  const discordAccount = accounts.find(
    (account) => account.provider === "discord"
  );

  if (!discordAccount) {
    return c.json(
      {
        error: "Discord account not linked",
        message:
          "You must link your Discord account to update your user information.",
      },
      { status: 403 }
    );
  }

  const discordUserId = discordAccount.accountId;

  try {
    const member = await client.getMember(DISCORD_GUILD_ID, discordUserId);

    if (!member) {
      return c.json(
        {
          error: "Discord member not found",
          message:
            "You must be a member of the Discord server to update your role.",
        },
        { status: 404 }
      );
    }

    const roleId = await getRoleId(DISCORD_ROLE_NAME, DISCORD_GUILD_ID);

    await client.addRole(DISCORD_GUILD_ID, discordUserId, roleId);

    return c.json({
      message: `User ${userId} updated successfully and Discord role assigned.`,
    });
  } catch (error) {
    console.error("Error updating Discord role:", error);
    return c.json(
      {
        error: "Discord role update failed",
        message: (error as Error).message,
      },
      { status: 500 }
    );
  }
};

userRoute.patch("/user/success", handleSuccess);

export { userRoute };
