import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FormPage() {
    return (
        <div className="w-full md:w-[45rem] mx-auto mt-10">
            {/* TODO: make this form a client component */}
            <form  className="space-y-4">
                <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" type="text" placeholder="Enter your name" required />
                </div>
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="Enter your email" required />
                </div>
                <Button type="submit">Submit</Button>
            </form>
        </div>
    );
}