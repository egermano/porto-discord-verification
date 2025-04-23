import { Button } from "@/components/ui/button";
import { config } from "@/config";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between">
      <main className="flex flex-col items-center justify-between w-full px-24 py-16">
        <h1 className="text-4xl font-bold">Get verified!</h1>
        <p className="mt-4 text-lg">
          Sign-in to start the verification process and get full access to the{" "}
          <strong>{config.communityName}</strong> discord.
        </p>
        <p className="mt-4 text-lg">
          <Link href={"/auth/signin"}>
            <Button asChild>
              <span>
                Sign in to start <ArrowRight />
              </span>
            </Button>
          </Link>
        </p>
      </main>
    </div>
  );
}
