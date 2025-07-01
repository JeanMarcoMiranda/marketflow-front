import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

const BusinessInfoField = ({
  label,
  value,
  children,
  icon,
  copyable = false,
  className,
}: {
  label: string;
  value?: string | number | null;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  copyable?: boolean;
  className?: string;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (value) {
      await navigator.clipboard.writeText(value.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400 }}
      className={cn(
        "group relative space-y-3 p-4 rounded-lg border border-slate-200/60 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200",
        className
      )}
    >
      <div className="flex items-center gap-2">
        {icon && (
          <div className="text-slate-500 group-hover:text-slate-700 transition-colors">
            {icon}
          </div>
        )}
        <p className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
          {label}
        </p>
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="flex-grow">
          {children ? (
            children
          ) : (
            <p className="text-sm text-slate-900 font-medium">
              {value || (
                <span className="text-slate-500 italic">No especificado</span>
              )}
            </p>
          )}
        </div>

        {copyable && value && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
          >
            {copied ? (
              <Check className="h-3 w-3 text-green-600" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default BusinessInfoField;
