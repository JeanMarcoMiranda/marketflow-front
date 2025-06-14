import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useDialogStore } from "@/store/useDialogStore";

export function GlobalDialog() {
  const { isOpen, content, closeDialog, options } = useDialogStore();

  // Map maxWidth option to Tailwind classes
  const maxWidthClasses = {
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-md',
    lg: 'sm:max-w-lg',
    xl: 'sm:max-w-xl',
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeDialog()}>
      <DialogContent
        className={`max-h-[90vh] overflow-y-auto ${maxWidthClasses[options.maxWidth || 'md']}`}
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