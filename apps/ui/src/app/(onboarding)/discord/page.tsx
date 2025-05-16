import { DiscordForm } from "@/components/discord-form";
import ProtectedRoute from "@/providers/protected-route";

export default function Discord() {
  return (
    <div className="grow h-full flex flex-col items-center justify-center">
      <ProtectedRoute>
        <DiscordForm />
      </ProtectedRoute>
    </div>
  );
}
