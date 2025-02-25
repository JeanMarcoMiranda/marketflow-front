import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useDialogStore } from "@/app/store/useDialogStore";

export function GlobalDialog() {
  const { isOpen, content, closeDialog } = useDialogStore();

  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
      <DialogContent className="sm:max-w-md max-w-lg">
        {content}
      </DialogContent>
    </Dialog>
  );
}