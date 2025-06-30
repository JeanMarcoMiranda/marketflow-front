import { useState, useCallback } from "react";

export const useStepper = (totalSteps: number, initialStep = 0) => {
  const [currentStep, setCurrentStep] = useState(Math.max(0, Math.min(initialStep, totalSteps - 1)));

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => (prev < totalSteps - 1 ? prev + 1 : prev));
  }, [totalSteps]);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const goToStep = useCallback((step: number) => {
    if (step >= 0 && step < totalSteps) {
      setCurrentStep(step);
    }
  }, [totalSteps]);

  return {
    currentStep,
    nextStep,
    prevStep,
    goToStep,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === totalSteps - 1,
    totalSteps,
  };
};