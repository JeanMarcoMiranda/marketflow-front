import { cn } from "@/lib/utils";
import { Step } from "./types/stepper.types";

interface StepperStepProps extends React.HTMLAttributes<HTMLDivElement> {
  step: Step;
  index: number;
  currentStep: number;
  variant?: "default" | "dots" | "with-line";
  size?: "sm" | "md" | "lg";
  onStepClick?: (index: number) => void;
  stepClassName?: string;
  activeStepClassName?: string;
  completedStepClassName?: string;
  disabledStepClassName?: string;
}

export const StepperStep = ({
  step,
  index,
  currentStep,
  variant = "default",
  size = "md",
  onStepClick,
  stepClassName,
  activeStepClassName,
  completedStepClassName,
  disabledStepClassName,
  ...props
}: StepperStepProps) => {
  const isActive = index === currentStep;
  const isCompleted = step.completed || index < currentStep;
  const isDisabled = step.disabled;

  const handleClick = () => {
    if (!isDisabled && onStepClick) {
      onStepClick(index);
    }
  };

  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
  };

  const baseClasses = cn(
    "flex items-center justify-center rounded-full font-medium transition-colors",
    sizeClasses[size],
    stepClassName,
    isActive && ["bg-primary text-primary-foreground", activeStepClassName],
    isCompleted && [
      "bg-primary/10 text-primary dark:bg-primary/20",
      completedStepClassName,
    ],
    isDisabled && ["bg-muted text-muted-foreground", disabledStepClassName],
    !isActive && !isCompleted && !isDisabled && "bg-muted text-foreground"
  );

  return (
    <div
      {...props}
      onClick={handleClick}
      className={cn(
        "flex flex-col items-center gap-1",
        isDisabled && "cursor-not-allowed",
        !isDisabled && "cursor-pointer"
      )}
    >
      {variant === "dots" ? (
        <div
          className={cn(
            baseClasses,
            "h-3 w-3 rounded-full",
            isActive && "h-4 w-4",
            isCompleted && "h-3 w-3"
          )}
        />
      ) : (
        <div className={baseClasses}>
          {step.icon ? step.icon : isCompleted ? "✓" : index + 1}
        </div>
      )}
      <div className="text-center">
        <p
          className={cn(
            "text-sm font-medium",
            isActive && "text-primary",
            isCompleted && "text-primary",
            isDisabled && "text-muted-foreground"
          )}
        >
          {step.title}
        </p>
        {step.subtitle && (
          <p className="text-xs text-muted-foreground">{step.subtitle}</p>
        )}
      </div>
    </div>
  );
};