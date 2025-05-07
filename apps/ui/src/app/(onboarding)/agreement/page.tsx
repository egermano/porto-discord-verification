import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

export default function AgreementPage() {
  return (
    <div className="flex grow justify-center items-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Terms of Service</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Please review our{" "}
            <a href="/terms" className="text-blue-500 underline">
              Terms of Service
            </a>
            .
          </p>
          <div className="flex items-center mt-4">
            <Checkbox id="agree" />
            <label htmlFor="agree" className="ml-2 text-sm">
              I agree to the Terms of Service
            </label>
          </div>
        </CardContent>
        <CardFooter>
          <Button>
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
