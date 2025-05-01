//? REACT ICONS
import { HiCash, HiUserGroup, HiClock, HiInbox  } from "react-icons/hi";

//? Map each type to a react icon
const iconMap = {
  collected: HiCash,
  customers: HiUserGroup,
  pending: HiClock,
  invoices: HiInbox,
};

//? Map each type to a Tailwind color class
const colorMap = {
  collected: "text-green-600",
  pending: "text-orange-600",
  invoices: "text-blue-600",
  customers: "text-blue-600",
};

// TODO: Async Function 
export default function CardWrapper() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      <Card title="Collected" value="£1485" type="collected" />
      <Card title="Pending" value="£595" type="pending" />
      <Card title="Total Invoices" value="12" type="invoices" />
      <Card title="Total Customers" value="10" type="customers" />
    </section>
  );
}

//? Defining a React functional component named Card.
export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string; //? Accepting either a number or a string as the value prop.
  type: 'invoices' | 'customers' | 'pending' | 'collected';
}) {

  //? Define icon variable linked to mapping of icons
  const Icon = iconMap[type];
  const colorClass = colorMap[type];
  
  return (
    <article className="bg-white shadow rounded-2xl p-4 flex flex-col gap-2">
      <header className="flex items-center gap-2 text-lg font-semibold text-gray-700">
        {Icon && <Icon className={`text-2xl ${colorClass}`} aria-hidden="true" />}
        <span>{title}</span>
      </header>
      <p className={`${colorClass}`}>{value}</p>
    </article>
  );
}