export type Step = {
  id: string | number;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  error?: boolean;
  loading?: boolean;
  completed?: boolean;
  content: React.ReactNode;
};

export type StepperProps = {
  steps: Step[];
  initialStep?: number;
  onComplete?: () => void;
  onStepChange?: (step: number) => void;
  orientation?: "horizontal" | "vertical";
  variant?: "default" | "minimal" | "filled" | "outlined" | "connected";
  size?: "sm" | "md" | "lg";
  className?: string;
  stepClassName?: string;
  activeStepClassName?: string;
  completedStepClassName?: string;
  disabledStepClassName?: string;
  renderActions?: (props: {
    nextStep: () => void;
    prevStep: () => void;
    isFirstStep: boolean;
    isLastStep: boolean;
    currentStep: number;
  }) => React.ReactNode;
};