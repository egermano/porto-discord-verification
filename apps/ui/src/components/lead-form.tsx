"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

interface Question {
  question: string;
  type: "radio" | "checkbox" | "select";
  instruction?: string;
  options: Record<string, string>;
}

// Questions to be rendered
const formQuestions: Question[] = [
  {
    question: "What is your role?",
    type: "radio",
    instruction: "Please select one option.",
    options: {
      developer: "Developer",
      designer: "Designer",
      manager: "Manager",
      other: "Other",
    },
  },
  {
    question: "Whats is your company size?",
    type: "select",
    instruction: "Please select one option.",
    options: {
      small: "1-10",
      medium: "11-50",
      large: "51-200",
      enterprise: "201+",
    },
  },
  {
    question: "What technologies do you use?",
    type: "checkbox",
    instruction: "Select all that apply.",
    options: {
      react: "React",
      vue: "Vue",
      angular: "Angular",
      svelte: "Svelte",
      other: "Other",
    },
  },
  {
    question: "How did you hear about us?",
    type: "radio",
    instruction: "Please select one option.",
    options: {
      youtube: "YouTube",
      google: "Google",
      twitter: "Twitter",
      friend: "Friend",
      other: "Other",
    },
  },
];

export default function LeadForm() {
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted");
    router.push("/success");
  };

  return (
    <form
      className="flex flex-col items-center justify-center space-y-4"
      onSubmit={handleSubmit}
    >
      {formQuestions.map((question, index) => (
        <Card key={question.question} className="w-full">
          <CardHeader>
            <CardTitle>{question.question}</CardTitle>
            <CardDescription>{question.instruction || ""}</CardDescription>
          </CardHeader>
          <CardContent>
            {question.type === "checkbox" && (
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(question.options).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox id={key} name={key} />
                    <Label
                      htmlFor={key}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {value}
                    </Label>
                  </div>
                ))}
              </div>
            )}

            {question.type === "radio" && (
              <RadioGroup className="grid grid-cols-2 gap-4">
                {Object.entries(question.options).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <RadioGroupItem value={key} id={key} />
                    <Label htmlFor="r1">{value}</Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {question.type === "select" && (
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(question.options).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </CardContent>
        </Card>
      ))}
      <div className="items-end flex justify-end w-full">
        <Button type="submit">Continue</Button>
      </div>
    </form>
  );
}
