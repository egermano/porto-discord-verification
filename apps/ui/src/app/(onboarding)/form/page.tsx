import LeadForm from "@/components/lead-form";
import ProtectedRoute from "@/providers/protected-route";

export default function FormPage() {
  return (
    <div className="flex flex-col gap-6 w-full md:w-[45rem] mx-auto mt-10">
      <ProtectedRoute>
        <p className="text-sm text-muted-foreground">step 3</p>
        <h2 className="text-xl font-bold">Tell us about yourself</h2>
        <LeadForm />
      </ProtectedRoute>
    </div>
  );
}
