"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formQuestions } from "./lead-form-questions";
import { LeadFormInput } from "./lead-input";
import { FormField } from "./ui/form";

const formSchema = z.object({
  question: z.array(
    z.object({
      question: z.string().min(1, "Question is required"),
      answer: z.string().min(1, "Answer is required"),
    })
  ),
});

export default function LeadForm() {
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: formQuestions.map((q) => ({
        question: q.question,
        answer: "", // Initialize with empty string or appropriate default
      })),
    },
  });

  console.log(form.watch());

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

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
            <FormField
              control={form.control}
              name={`question.${index}.answer`}
              render={({ field }) => (
                <LeadFormInput
                  question={question}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />
          </CardContent>
        </Card>
      ))}
      <div className="items-end flex justify-end w-full">
        <Button type="submit">Continue</Button>
      </div>
    </form>
  );
}
