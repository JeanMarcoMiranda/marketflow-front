import { Clock, AlertCircle, Check } from "lucide-react";
import { Step } from "./types/stepper.types";

interface StepperStepProps extends React.HTMLAttributes<HTMLDivElement> {
  step: Step;
  index: number;
  currentStep: number;
  variant?: "default" | "minimal" | "filled" | "outlined" | "connected";
  size?: "sm" | "md" | "lg";
  orientation?: "horizontal" | "vertical";
  onStepClick?: (index: number) => void;
  stepClassName?: string;
  activeStepClassName?: string;
  completedStepClassName?: string;
  disabledStepClassName?: string;
  showConnector?: boolean;
  isLastStep?: boolean;
}

// Función utilitaria para clases (simulando cn)
const cn = (...classes: (string | string[] | undefined | false)[]) => {
  return classes.flat().filter(Boolean).join(" ");
};

export const StepperStep = ({
  step,
  index,
  currentStep,
  variant = "default",
  size = "md",
  orientation = "horizontal",
  onStepClick,
  stepClassName,
  activeStepClassName,
  completedStepClassName,
  disabledStepClassName,
  showConnector = true,
  isLastStep = false,
  ...props
}: StepperStepProps) => {
  const isActive = index === currentStep;
  const isCompleted = step.completed || index < currentStep;
  const isDisabled = step.disabled;
  const isError = step.error;
  const isLoading = step.loading;
  const isPending = index > currentStep && !isCompleted;

  const handleClick = () => {
    if (!isDisabled && !isLoading && onStepClick) {
      onStepClick(index);
    }
  };
  // Configuraciones de tamaño
  const sizeConfig = {
    sm: {
      circle: "h-8 w-8 text-xs",
      text: "text-xs",
      subtitle: "text-xs",
      connector: "h-0.5",
    },
    md: {
      circle: "h-10 w-10 text-sm",
      text: "text-sm",
      subtitle: "text-xs",
      connector: "h-0.5",
    },
    lg: {
      circle: "h-12 w-12 text-base",
      text: "text-base",
      subtitle: "text-sm",
      connector: "h-1",
    },
  };

  // Función para obtener el icono apropiado
  const getStepIcon = () => {
    if (step.icon) return step.icon;
    if (isLoading) return <Clock className="w-4 h-4 animate-spin" />;
    if (isError) return <AlertCircle className="w-4 h-4" />;
    if (isCompleted) return <Check className="w-4 h-4" />;
    return index + 1;
  };

  // Clases base del círculo según la variante
  const getCircleClasses = () => {
    const baseClasses = cn(
      "flex items-center justify-center rounded-full font-medium transition-all duration-300 ease-in-out",
      sizeConfig[size].circle,
      stepClassName
    );

    switch (variant) {
      case "filled":
        return cn(
          baseClasses,
          isActive && [
            "bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-110",
            ...(activeStepClassName ? [activeStepClassName] : []),
          ],
          isCompleted && [
            "bg-green-600 text-white shadow-lg shadow-green-500/20",
            ...(completedStepClassName ? [completedStepClassName] : []),
          ],
          isError && "bg-red-600 text-white shadow-lg shadow-red-500/20",
          isLoading && "bg-amber-500 text-white",
          isDisabled && [
            "bg-gray-200 text-gray-400 cursor-not-allowed",
            ...(disabledStepClassName ? [disabledStepClassName] : []),
          ],
          isPending && "bg-gray-100 text-gray-500 border-2 border-gray-200"
        );

      case "outlined":
        return cn(
          baseClasses,
          "bg-white border-2",
          isActive && [
            "border-blue-600 text-blue-600 shadow-lg shadow-blue-500/20 scale-105",
            ...(activeStepClassName ? [activeStepClassName] : []),
          ],
          isCompleted && [
            "border-green-600 text-green-600 bg-green-50",
            ...(completedStepClassName ? [completedStepClassName] : []),
          ],
          isError && "border-red-600 text-red-600 bg-red-50",
          isLoading && "border-amber-500 text-amber-600 bg-amber-50",
          isDisabled && [
            "border-gray-200 text-gray-400 cursor-not-allowed",
            ...(disabledStepClassName ? [disabledStepClassName] : []),
          ],
          isPending && "border-gray-300 text-gray-500"
        );

      case "minimal":
        return cn(
          baseClasses,
          "bg-transparent",
          isActive && [
            "text-blue-600 bg-blue-50 ring-2 ring-blue-200",
            ...(activeStepClassName ? [activeStepClassName] : []),
          ],
          isCompleted && [
            "text-green-600 bg-green-50",
            ...(completedStepClassName ? [completedStepClassName] : []),
          ],
          isError && "text-red-600 bg-red-50",
          isLoading && "text-amber-600 bg-amber-50",
          isDisabled && [
            "text-gray-400 cursor-not-allowed",
            ...(disabledStepClassName ? [disabledStepClassName] : []),
          ],
          isPending && "text-gray-500"
        );

      case "connected":
        return cn(
          baseClasses,
          "relative",
          isActive && [
            "bg-blue-600 text-white shadow-md scale-105 z-10",
            ...(activeStepClassName ? [activeStepClassName] : []),
          ],
          isCompleted && [
            "bg-green-600 text-white shadow-md z-10",
            ...(completedStepClassName ? [completedStepClassName] : []),
          ],
          isError && "bg-red-600 text-white shadow-md z-10",
          isLoading && "bg-amber-500 text-white z-10",
          isDisabled && [
            "bg-gray-300 text-gray-500 cursor-not-allowed",
            ...(disabledStepClassName ? [disabledStepClassName] : []),
          ],
          isPending && "bg-gray-200 text-gray-600 border-2 border-white z-10"
        );

      default: // "default"
        return cn(
          baseClasses,
          isActive && [
            "bg-blue-600 text-white shadow-md",
            ...(activeStepClassName ? [activeStepClassName] : []),
          ],
          isCompleted && [
            "bg-green-100 text-green-700 border-2 border-green-600",
            ...(completedStepClassName ? [completedStepClassName] : []),
          ],
          isError && "bg-red-100 text-red-700 border-2 border-red-600",
          isLoading && "bg-amber-100 text-amber-700 border-2 border-amber-500",
          isDisabled && [
            "bg-gray-100 text-gray-400 cursor-not-allowed",
            ...(disabledStepClassName ? [disabledStepClassName] : []),
          ],
          isPending && "bg-gray-100 text-gray-600"
        );
    }
  };

  // Clases del conector
  const getConnectorClasses = () => {
    const baseConnector = cn(
      "transition-all duration-500",
      sizeConfig[size].connector,
      orientation === "horizontal" ? "flex-1" : "w-0.5 h-8 mx-auto"
    );

    if (variant === "connected") {
      return cn(
        baseConnector,
        isCompleted || (isActive && index > 0)
          ? "bg-gradient-to-r from-green-400 to-blue-500"
          : "bg-gray-200"
      );
    }

    return cn(baseConnector, isCompleted ? "bg-green-500" : "bg-gray-200");
  };

  // Clases del texto
  const getTextClasses = () => {
    return cn(
      "font-medium transition-colors duration-200",
      sizeConfig[size].text,
      isActive && "text-blue-600 font-semibold",
      isCompleted && "text-green-700",
      isError && "text-red-600",
      isLoading && "text-amber-600",
      isDisabled && "text-gray-400",
      isPending && "text-gray-600"
    );
  };

  const containerClasses = cn(
    "flex items-center gap-2",
    orientation === "vertical" && "flex-col",
    orientation === "horizontal" && "flex-row",
    !isDisabled && !isLoading && "cursor-pointer group",
    isDisabled && "cursor-not-allowed"
  );

  return (
    <div className={containerClasses} onClick={handleClick} {...props}>
      {/* Conector anterior (solo para variante connected) */}
      {variant === "connected" && index > 0 && orientation === "horizontal" && (
        <div className={getConnectorClasses()} />
      )}

      {/* Contenido del step */}
      <div className="flex flex-col items-center gap-2 relative">
        {/* Círculo del step */}
        <div className={getCircleClasses()}>
          {getStepIcon()}

          {/* Indicador de progreso para loading */}
          {isLoading && (
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-current animate-spin" />
          )}
        </div>

        {/* Información del step */}
        {(step.title || step.subtitle) && (
          <div className="text-center max-w-24">
            {step.title && <p className={getTextClasses()}>{step.title}</p>}
            {step.subtitle && (
              <p
                className={cn(
                  "text-gray-500 mt-0.5",
                  sizeConfig[size].subtitle,
                  isDisabled && "text-gray-400"
                )}
              >
                {step.subtitle}
              </p>
            )}
          </div>
        )}

        {/* Conector vertical */}
        {orientation === "vertical" && !isLastStep && showConnector && (
          <div className={getConnectorClasses()} />
        )}
      </div>

      {/* Conector posterior (para horizontal, excepto connected) */}
      {orientation === "horizontal" &&
        !isLastStep &&
        showConnector &&
        variant !== "connected" && <div className={getConnectorClasses()} />}

      {/* Conector posterior para connected */}
      {variant === "connected" &&
        !isLastStep &&
        orientation === "horizontal" && (
          <div className={getConnectorClasses()} />
        )}
    </div>
  );
};
