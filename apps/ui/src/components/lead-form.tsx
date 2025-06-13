"use client";

import { formQuestions } from "@/components/lead-form-questions";
import { LeadFormInput } from "@/components/lead-input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, FormDescription, FormField } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import { API_BASE_URL } from "@/constants";
import { authClient } from "@/lib/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  questions: z.array(
    z.object({
      question: z.string().min(1, "Question is required"),
      answer: z.string().min(1, "Answer is required"),
    })
  ),
});

export default function LeadForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const checkUser = useCallback(async () => {
    try {
      const response = await authClient.$fetch<{
        message: string;
        done?: boolean;
      }>(`${API_BASE_URL}/api/user/check`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response && response.data?.done) {
        router.push("/success");
        return;
      }

      if (!response || response.error) {
        let description = "An error occurred while checking user data.";
        if (response.error?.status === 401) {
          description = "You must be logged. Go back to login and start again.";
        }
        if (response.error?.status === 403) {
          description =
            "You must link your Discord account to check your user information. Go back to login and then link your Discord account.";
        }
        if (response.error?.status === 404) {
          description =
            "You must be a member of the Discord server to check your user information. Go back to login and then join the Discord server.";
        }

        toast.error("Something went wrong", {
          description,
        });

        await authClient.signOut();
        router.push("/");
        return;
      }
    } catch (error) {
      toast.error("Something went wrong", {
        description: "An error occurred while checking user data.",
        position: "top-center",
      });
      return router.push("/");
    }

    setIsLoading(false);
  }, [router]);

  useEffect(() => {
    // Check user data when the component mounts
    if (!isLoading) {
      checkUser();
      setIsLoading(true);
    }

  }, [isLoading, checkUser]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      questions: formQuestions.map((q) => ({
        question: q.question,
        answer: "", // Initialize with empty string or appropriate default
      })),
    },
  });
  const { handleSubmit, formState } = form;

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const leadFormValue = JSON.stringify(values.questions);
    await authClient.updateUser({
      // @ts-expect-error
      leadForm: leadFormValue,
    });

    const response = await authClient.$fetch(
      `${API_BASE_URL}/api/user/success`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          done: true,
        }),
      }
    );

    if (!response || response.error) {
      toast.error("An error occurred while submitting the form.", {
        description: response.error.message || "Please try again later.",
      });
      return;
    }

    router.push("/success");
  }

  if (isLoading) {
    return <Spinner size="large" />;
  }

  return (
    <Form {...form}>
      <p className="text-sm text-muted-foreground">step 3</p>
      <h2 className="text-xl font-bold">Tell us about yourself</h2>
      <form
        className="flex flex-col items-center justify-center space-y-4"
        onSubmit={handleSubmit(onSubmit)}
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
                name={`questions.${index}.answer`}
                render={({ field }) => (
                  <>
                    <LeadFormInput
                      question={question}
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                    {formState.errors.questions?.[index]?.answer && (
                      <FormDescription className="text-red-500 mt-2">
                        {formState.errors.questions[index].answer.message}
                      </FormDescription>
                    )}
                  </>
                )}
              />
            </CardContent>
          </Card>
        ))}
        <div className="items-end flex justify-end w-full">
          <Button type="submit">
            Continue
            {formState.isSubmitting && <Spinner size="small" />}
          </Button>
        </div>
      </form>
    </Form>
  );
}
