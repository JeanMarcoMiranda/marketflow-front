import { cn } from "@/lib/utils";
import { Step } from "./types/stepper.types";

interface StepperContentProps {
  currentStep: number;
  steps: Step[];
  className?: string;
}

export const StepperContent = ({
  currentStep,
  steps,
  className,
}: StepperContentProps) => {
  return (
    <div className={cn("mt-6", className)}>
      {steps[currentStep]?.content || null}
    </div>
  );
};