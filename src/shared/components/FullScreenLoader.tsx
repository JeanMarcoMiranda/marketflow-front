import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";

export function FullScreenLoader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simula un avance continuo en la barra de progreso
    const timer = setInterval(() => {
      setProgress((prev) => (prev + 10 > 100 ? 0 : prev + 10));
    }, 200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full">
      <div className="mb-4 text-lg font-semibold">Cargando...</div>
      <Progress value={progress} className="w-[60%]" />
    </div>
  );
}
