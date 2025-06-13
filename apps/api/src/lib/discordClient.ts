import { DISCORD_BOT_TOKEN } from "@/constants";
import { createRestManager } from "@discordeno/rest";

export const REST = createRestManager({
  // YOUR BOT TOKEN HERE
  token: DISCORD_BOT_TOKEN,
});

export { REST as client };

export const getRoleId = async (
  roleName: string,
  guildId: string
): Promise<string> => {
  console.log("Fetching or creating role:", roleName, "in guild:", guildId);
  try {
    // Check if the role exists
    let roleId;
    const roles = await REST.getRoles(guildId);
    const role = roles.find((r) => r.name === roleName);

    // creat the role if it doesn't exist
    if (!role) {
      console.log(`Role "${roleName}" not found, creating a new role.`);
      const newRole = await REST.createRole(guildId, {
        name: roleName,
        mentionable: false,
        color: Number("0xF3652B"),
      });
      roleId = newRole.id;
    } else {
      console.log(`Role "${roleName}" found with ID: ${role.id}`);
      roleId = role.id;
    }

    return roleId;
  } catch (error) {
    console.error("Error fetching or creating role:", error);
    throw new Error("Failed to fetch or create role");
  }
};
