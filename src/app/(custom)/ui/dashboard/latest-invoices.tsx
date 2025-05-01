import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Hardcoded customer and invoice data
const customers = [
  { id: '3958dc9e-712f-4377-85e9-fec4b6a6442a', name: 'Delba de Oliveira' },
  { id: '3958dc9e-742f-4377-85e9-fec4b6a6442a', name: 'Lee Robinson' },
  { id: '3958dc9e-737f-4377-85e9-fec4b6a6442a', name: 'Hector Simpson' },
  { id: '50ca3e18-62cd-11ee-8c99-0242ac120002', name: 'Steven Tey' },
  { id: '3958dc9e-787f-4377-85e9-fec4b6a6442a', name: 'Steph Dietz' },
  { id: '76d65c26-f784-44a2-ac19-586678f7c2f2', name: 'Michael Novotny' },
  { id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa', name: 'Evil Rabbit' },
  { id: '126eed9c-c90c-4ef6-a4a8-fcf7408d3c66', name: 'Emil Kowalski' },
  { id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9', name: 'Amy Burns' },
  { id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB', name: 'Balazs Orban' },
];

const invoices = [
  { customer_id: customers[0].id, amount: 15795, status: 'pending', date: '2022-12-06' },
  { customer_id: customers[1].id, amount: 20348, status: 'pending', date: '2022-11-14' },
  { customer_id: customers[4].id, amount: 3040, status: 'paid', date: '2022-10-29' },
  { customer_id: customers[3].id, amount: 44800, status: 'paid', date: '2023-09-10' },
  { customer_id: customers[5].id, amount: 34577, status: 'pending', date: '2023-08-05' },
  { customer_id: customers[7].id, amount: 54246, status: 'pending', date: '2023-07-16' },
  { customer_id: customers[6].id, amount: 666, status: 'pending', date: '2023-06-27' },
];

// Format amount in GBP (£)
function formatCurrency(amount: number): string {
  return `£${(amount / 100).toFixed(2)}`;
}

export function LatestInvoicesTable() {
  const latestInvoices = invoices
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 7)
    .map((invoice, index) => {
      const customer = customers.find(c => c.id === invoice.customer_id);
      return {
        id: `INV${(index + 1).toString().padStart(3, "0")}`,
        customerName: customer?.name || "Unknown",
        status: invoice.status,
        amount: formatCurrency(invoice.amount),
        date: new Date(invoice.date).toLocaleDateString(),
      };
    });

  return (
    <Table>
      <TableCaption>A list of your most recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {latestInvoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">{invoice.id}</TableCell>
            <TableCell>{invoice.customerName}</TableCell>
            <TableCell>
              <span
                className={`px-2 py-1 text-sm rounded-full ${
                  invoice.status === "paid"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
              </span>
            </TableCell>
            <TableCell>{invoice.date}</TableCell>
            <TableCell className="text-right">{invoice.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right">
            {formatCurrency(
              latestInvoices.reduce((sum, inv) => {
                const numericAmount = parseFloat(inv.amount.replace(/[£,]/g, ""));
                return sum + numericAmount * 100;
              }, 0)
            )}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
