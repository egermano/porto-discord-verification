"use client";
import { Button } from "@/components/ui/button";
import { config } from "@/config";
import { authClient } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { GalleryVerticalEnd } from "lucide-react";

export function DiscordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {

  const gotToLeadForm = async () => {
    await authClient.linkSocial({
      provider: "discord",
      callbackURL: `${window.location.origin}/form`,
    });
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <a href="#" className="flex flex-col items-center gap-2 font-medium">
            <div className="flex h-24 w-24 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-24" />
            </div>
            <span className="sr-only">{config.appName}</span>
          </a>
          <h1 className="text-xl font-bold">
            Now we need to connect to Discord.
          </h1>
        </div>

        <div className="flex flex-col gap-4">
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={gotToLeadForm}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M20.317 4.369a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.211.375-.444.864-.608 1.249a18.365 18.365 0 00-5.487 0 12.505 12.505 0 00-.617-1.249.077.077 0 00-.079-.037c-1.625.29-3.18.79-4.885 1.515a.07.07 0 00-.032.027C1.533 9.045.99 13.579 1.24 18.057a.082.082 0 00.031.056 19.908 19.908 0 005.993 3.03.078.078 0 00.084-.027c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 11.348 11.348 0 01-1.612-.765.077.077 0 01-.008-.128c.108-.082.216-.168.318-.256a.074.074 0 01.077-.01c3.372 1.543 7.015 1.543 10.343 0a.073.073 0 01.079.009c.103.088.211.174.318.256a.077.077 0 01-.006.128c-.51.32-1.05.574-1.612.765a.076.076 0 00-.041.106c.375.699.787 1.364 1.226 1.994a.077.077 0 00.084.027 19.876 19.876 0 005.993-3.03.077.077 0 00.031-.056c.334-5.17-.554-9.659-3.725-13.661a.061.061 0 00-.031-.028zM8.02 15.331c-1.182 0-2.155-1.085-2.155-2.419 0-1.333.955-2.418 2.155-2.418 1.21 0 2.182 1.085 2.155 2.418 0 1.334-.955 2.419-2.155 2.419zm7.974 0c-1.182 0-2.155-1.085-2.155-2.419 0-1.333.955-2.418 2.155-2.418 1.21 0 2.182 1.085 2.155 2.418 0 1.334-.946 2.419-2.155 2.419z"
                fill="currentColor"
              />
            </svg>
            Connect with Discord
          </Button>
        </div>
      </div>
    </div>
  );
}
