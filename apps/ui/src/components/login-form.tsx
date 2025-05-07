"use client";
import { Button } from "@/components/ui/button";
import { config } from "@/config";
import { cn } from "@/lib/utils";
import { createAuthClient } from "better-auth/client";
import { GalleryVerticalEnd } from "lucide-react";
import { useRouter } from "next/navigation";

const authClient = createAuthClient({
  baseURL: 'http://localhost:3333',
}); 

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();

  const goToDiscord = async () => {
    const data = await authClient.signIn.social({
      provider: "github",
    });

    console.log("data", data);
    router.push("/discord");
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
          <h1 className="text-xl font-bold">Welcome to {config.appName}.</h1>
        </div>

        <div className="flex flex-col gap-4">
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={goToDiscord}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5 mr-2"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387.6.113.793-.26.793-.577v-2.234c-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.746.083-.73.083-.73 1.205.084 1.838 1.237 1.838 1.237 1.07 1.833 2.807 1.303 3.492.996.108-.776.42-1.303.763-1.603-2.665-.303-5.467-1.333-5.467-5.93 0-1.31.468-2.383 1.237-3.222-.123-.303-.536-1.523.117-3.176 0 0 1.01-.323 3.3 1.23a11.52 11.52 0 013.003-.403c1.02.005 2.045.137 3.003.403 2.29-1.553 3.3-1.23 3.3-1.23.653 1.653.24 2.873.117 3.176.77.84 1.237 1.913 1.237 3.222 0 4.61-2.807 5.623-5.48 5.92.432.373.816 1.1.816 2.22v3.293c0 .32.192.694.8.577C20.565 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            Continue with Github
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={goToDiscord}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                fill="currentColor"
              />
            </svg>
            Continue with Google
          </Button>
        </div>
      </div>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
