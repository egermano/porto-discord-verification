"use client";

import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Check, ChevronRight } from "lucide-react";
import * as React from "react";

interface StepProps {
  index: number;
  title: string;
  description?: string;
  isCompleted?: boolean;
  isActive?: boolean;
}

const Step: React.FC<StepProps> = ({
  index,
  title,
  description,
  isCompleted,
  isActive,
}) => {
  return (
    <div className={cn(
      "flex items-center",
      !isActive && "hidden md:flex"
    )}>
      <div className="relative flex items-center justify-center">
        <div
          className={cn(
            "w-8 h-8 rounded-full border-2 flex items-center justify-center",
            isCompleted
              ? "border-primary bg-primary text-primary-foreground"
              : isActive
                ? "border-primary"
                : "border-muted"
          )}
        >
          {isCompleted ? (
            <Check className="w-4 h-4" />
          ) : (
            <span className="text-sm font-medium">{index}</span>
          )}
        </div>
      </div>
      <div className="ml-4">
        <p
          className={cn(
            "text-sm font-medium",
            isActive || isCompleted
              ? "text-foreground"
              : "text-muted-foreground"
          )}
        >
          {title}
        </p>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
};

interface StepperProps {
  steps: Array<{ title: string; description?: string }>;
  currentStep: number;
  onStepChange?: (step: number) => void;
}

export function Stepper({ steps, currentStep, onStepChange }: StepperProps) {

  const nextSteps = steps
    .map((s, i) => ({ ...s, index: i }))
    .filter(step => step.index > currentStep);

  return (
    <div className="w-full max-w-4xl mx-auto mt-4 md:mt-0">
      <div className="max-w-xs m-auto md:max-w-full flex flex-row justify-between items-center md:items-center gap-4 mb-8">
        {steps.map((step, index) => (
          <React.Fragment key={step.title}>
            <Step
              index={index + 1}
              title={step.title}
              description={step.description}
              isCompleted={index < currentStep}
              isActive={index === currentStep}
            />
            {index < steps.length - 1 && (
              <Popover>
                <PopoverTrigger asChild>
                  <ChevronRight className={cn(
                    index === currentStep ?
                      "block text-muted-foreground"
                      : "hidden md:block text-muted-foreground"
                  )} />
                </PopoverTrigger>
                <PopoverContent asChild align="end">
                  <div className="md:hidden flex flex-col px-4 py-3 gap-2 bg-white text-primary-foreground p-2 mt-4 w-[300px] rounded-lg outline-none">
                    <span className="font-bold">Next Steps:</span>
                    <ul className="text-sm flex flex-col gap-1">
                      {nextSteps.map(ns => (
                        <li key={ns.title} className="flex items-center gap-1">
                          <span className="flex items-center justify-center rounded-full leading-none border border-muted-foreground w-5 h-5 text-xs">
                            {ns.index + 1}
                          </span>
                          {ns.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
