import { Card, CardContent } from "@/components/ui/card";

const StatsCard: React.FC<{
  title: string;
  value: number;
  icon: React.ReactNode;
  variant: 'default' | 'warning' | 'info' | 'success';
}> = ({ title, value, icon, variant }) => {
  const colorClasses = {
    default: 'text-foreground',
    warning: 'text-yellow-600',
    info: 'text-blue-600',
    success: 'text-green-600'
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className={`text-2xl font-bold ${colorClasses[variant]}`}>{value}</p>
          </div>
          <div className={`p-2 rounded-lg bg-muted ${colorClasses[variant]}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;