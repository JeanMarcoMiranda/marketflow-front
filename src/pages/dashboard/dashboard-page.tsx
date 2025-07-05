import { SectionCards } from "@/components/features/dashboard/dashboard-section-cards";
import { ChartAreaInteractive } from "@/components/features/dashboard/dashboard-chart-area-interactive";
import { DataTable } from "@/components/features/dashboard/dashboard-data-table";
import data from "./data.json";

export default function Dashboard() {
  return (
    <div>
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <SectionCards />
        <div className="px-4 lg:px-6">
          <ChartAreaInteractive />
        </div>
        <DataTable data={data} />
      </div>
    </div>
  );
}
