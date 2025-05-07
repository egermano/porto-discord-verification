"use client";
import { Stepper } from "@/components/ui/stepper";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const steps = [
  { title: "Step 1", description: "Create your account", path: "/signin" },
  { title: "Step 2", description: "Connect to Discord", path: "/discord" },
  { title: "Step 3", description: "Add your details", path: "/form" },
  { title: "Step 4", description: "Done", path: "/success" },
];

export default function Steps({
  activeStep,
}: {
  activeStep?: number;
}): React.JSX.Element {
  const pathname = usePathname();
  const currentPathnameIndex = steps.findIndex(
    (step) => step.path === pathname
  );
  const [currentStep, setCurrentStep] = useState(
    activeStep || (currentPathnameIndex === -1 ? 0 : currentPathnameIndex) || 0
  );

  useEffect(() => {
    const index = steps.findIndex((step) => step.path === pathname);
    if (index !== -1) {
      setCurrentStep(index);
    }
  }, [pathname]);

  return <Stepper steps={steps} currentStep={currentStep} />;
}
