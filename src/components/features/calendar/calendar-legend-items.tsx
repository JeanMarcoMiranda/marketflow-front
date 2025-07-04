const LegendItem: React.FC<{ color: string; label: string }> = ({ color, label }) => (
  <div className="flex items-center space-x-2">
    <div className={`w-2 h-2 rounded-full bg-${color}-500`}></div>
    <span className="text-muted-foreground">{label}</span>
  </div>
);

export default LegendItem;