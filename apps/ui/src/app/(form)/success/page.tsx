import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SuccessPage() {
  return (
    <div className="flex grow items-center justify-center">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle>Success!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center">
            Thank you for completing the process. Your are done here you role in
            Discord was updated and you access granted!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
