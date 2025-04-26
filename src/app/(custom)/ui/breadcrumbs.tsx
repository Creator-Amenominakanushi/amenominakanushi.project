//? NEXT.JS FEATURE
import Link from "next/link";
//? CLSX | Styling w/ Logic
import clsx from "clsx";

//? TYPESCRIPT Interface | Braedcrumbs
interface Breadcrumb {
  //* The text label for the breadcrumb.
  label: string;
  //* The URL that the breadcrumb should link to.
  href: string;
  //* Optional boolean flag indicating whether breadcrumb is active.
  active?: boolean;
};

export default function Breadcrumbs({
  //* Destructuring the props object to extract the breadcrumbs array.
  breadcrumbs, 
}: {
  //* Specifying type of the "breadcrumbs" prop as an array of Breadcrumb objects.
  breadcrumbs: Breadcrumb[];
}) {

  return (
    //? Rendering a navigation element w/ aria label for accessibility.
    <nav aria-label="breadcrumbs" style={{ fontSize: '14px', marginLeft: '0.5rem' }}>
      {/* Rendering an ordered list */}
      <ol className="breadcrumb mt-2 mb-4" id="breadcrumb-bar">
        {/* Mapping over breadcrumbs array to render individual breadcrumb items.*/}
        {breadcrumbs.map((breadcrumb, index) => (
          <li 
            //* Assigning unique key to each breadcrumb item based on href.
            key={breadcrumb.href}
            //* Setting aria-current attribute on "active" property breadcrumb.
            aria-current={breadcrumb.active}
            //* Applying conditional class names w/ the clsx utility function.
            //* If breadcrumb active, apply "active" class, otherwise apply "breadcrumb-item" class.
            className={clsx( breadcrumb.active ? "breadcrumb-item" : "breadcrumb-item active")}
          > {/* Rendering a Next.js Link component with the breadcrumb's href and label */}
            <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
            {/* Checking if the current breadcrumb is not the last one in the array. */}
            {index < Breadcrumbs.length - 1 ? (
              //* If not the last breadcrumb, render a slash separator.
              <span className="mx-3">/</span>
            ): null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
