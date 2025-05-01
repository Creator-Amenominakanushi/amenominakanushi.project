import CardWrapper from "@/app/(custom)/ui/dashboard/cards";
import { LatestInvoicesTable } from "@/app/(custom)/ui/dashboard/latest-invoices";
import { RevenueBarChart } from "@/app/(custom)/ui/dashboard/revenue-barchart";

export default function DashboardOverviewPage() {
  return (
    <div className="mt-5">
      <small>Version beta.1</small>
      <h1 className="mb-5">Dashboard Overview</h1>
      <CardWrapper />
      {/* Grid layout for latest invoices and revenue chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Latest Invoices Table */}
        <div className="col-span-1 w-full">
          <LatestInvoicesTable />
        </div>

        {/* Revenue Bar Chart */}
        <div className="col-span-1 w-full">
          <RevenueBarChart />
        </div>
      </div>
    </div>
  );
}