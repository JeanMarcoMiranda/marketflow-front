import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface StepperActionsProps {
  nextStep: () => void;
  prevStep: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  className?: string;
  prevButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  nextButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

export const StepperActions = ({
  nextStep,
  prevStep,
  isFirstStep,
  isLastStep,
  className,
  prevButtonProps,
  nextButtonProps,
}: StepperActionsProps) => {
  return (
    <div className={cn("mt-8 flex justify-between", className)}>
      <Button
        variant="outline"
        onClick={prevStep}
        disabled={isFirstStep}
        {...prevButtonProps}
      >
        Anterior
      </Button>
      <Button onClick={nextStep} {...nextButtonProps}>
        {isLastStep ? "Finalizar" : "Siguiente"}
      </Button>
    </div>
  );
};