import { config } from "@/config";
import ModeToggle from "./mode-toggle";

export default function Footer() {
  return (
    <footer className="flex items-center justify-between w-full px-4 py-2 mx-auto mt-8 border-t dark:border-slate-700">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        &copy; {new Date().getFullYear()} {config.appName}. All rights reserved.
      </p>
      <div className="flex items-center space-x-4">
        <a
          href="/privacy"
          className="text-sm text-slate-500 dark:text-slate-400 hover:underline"
        >
          Privacy Policy
        </a>
        <a
          href="/terms"
          className="text-sm text-slate-500 dark:text-slate-400 hover:underline"
        >
          Terms of Service
        </a>
        <ModeToggle />
      </div>
    </footer>
  );
}
