import { useStepper } from "./hooks/use-stepper";
import { StepperStep } from "./stepper-step";
import { StepperContent } from "./stepper-content";
import { StepperActions } from "./stepper-actions";
import { cn } from "@/lib/utils";
import type { StepperProps } from "./types/stepper.types";

export const Stepper = ({
  steps,
  initialStep = 0,
  onComplete,
  onStepChange,
  orientation = "horizontal",
  variant = "default",
  size = "md",
  className,
  stepClassName,
  activeStepClassName,
  completedStepClassName,
  disabledStepClassName,
  renderActions,
}: StepperProps) => {
  const {
    currentStep,
    nextStep,
    prevStep,
    goToStep,
    isFirstStep,
    isLastStep,
  } = useStepper(steps.length, initialStep);

  const handleNext = () => {
    if (isLastStep) {
      onComplete?.();
    } else {
      nextStep();
      onStepChange?.(currentStep + 1);
    }
  };

  const handlePrev = () => {
    prevStep();
    onStepChange?.(currentStep - 1);
  };

  const handleStepClick = (index: number) => {
    goToStep(index);
    onStepChange?.(index);
  };

  return (
    <div
      className={cn(
        "w-full",
        orientation === "vertical" && "flex gap-8",
        className
      )}
    >
      <div
        className={cn(
          "flex w-full items-center justify-between",
          orientation === "vertical" && "flex-col items-start justify-start gap-4"
        )}
      >
        {steps.map((step, index) => (
          <StepperStep
            key={step.id}
            step={step}
            index={index}
            currentStep={currentStep}
            variant={variant}
            size={size}
            onStepClick={handleStepClick}
            stepClassName={stepClassName}
            showConnector={true}
            isLastStep={index === steps.length - 1}
            activeStepClassName={activeStepClassName}
            completedStepClassName={completedStepClassName}
            disabledStepClassName={disabledStepClassName}
          />
        ))}
      </div>

      <StepperContent currentStep={currentStep} steps={steps} />

      {renderActions ? (
        renderActions({
          nextStep: handleNext,
          prevStep: handlePrev,
          isFirstStep,
          isLastStep,
          currentStep,
        })
      ) : (
        <StepperActions
          nextStep={handleNext}
          prevStep={handlePrev}
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
        />
      )}
    </div>
  );
};