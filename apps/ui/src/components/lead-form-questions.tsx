export interface Question {
  question: string;
  type: "radio" | "checkbox" | "select";
  instruction?: string;
  options: Record<string, string>;
}

// Questions to be rendered
export const formQuestions: Question[] = [
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
