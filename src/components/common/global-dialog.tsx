import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDialogStore } from "@/store/use-dialog-store";

export function GlobalDialog() {
  const { isOpen, content, closeDialog, options } = useDialogStore();

  // Map maxWidth option to Tailwind classes
  const maxWidthClasses: { [key: string]: string } = {
    xs: "sm:max-w-xs", // Extra pequeño
    sm: "sm:max-w-sm", // Pequeño
    md: "sm:max-w-md", // Mediano (por defecto)
    lg: "sm:max-w-lg", // Grande
    xl: "sm:max-w-xl",
    "2xl": "sm:max-w-2xl",
    "3xl": "sm:max-w-3xl",
    "4xl": "sm:max-w-4xl",
    "5xl": "sm:max-w-5xl",
    "6xl": "sm:max-w-6xl",
    "7xl": "sm:max-w-7xl",
    full: "sm:max-w-full",
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeDialog()}>
      <DialogContent
        className={`max-h-[90vh] overflow-y-auto ${
          maxWidthClasses[options.maxWidth ?? "md"]
        }`}
      >
        {options.title && (
          <DialogHeader>
            <DialogTitle>{options.title}</DialogTitle>
          </DialogHeader>
        )}
        <div className="py-4">{content}</div>
      </DialogContent>
    </Dialog>
  );
}
