"use client";

//? STYLESHEET
import "@/styles/scss/globals.scss";

//? NEXT - Hook to get the current URL path.
import { usePathname } from "next/navigation";
import Link from "next/link";
//? CLSX - Utility for conditionally combining class names.
import clsx from "clsx";
//? REACT BOOTSTRAP 
import { Container, Navbar } from "react-bootstrap";
//? REACT ICONS
import { MdAccountCircle } from "react-icons/md";
import { IoHome } from "react-icons/io5";

//? Objects representing link with its icon.
const links = [
  { name: "Home", href: "/", icon: IoHome},
  { name: "Blogs", href: '/blogs', icon: MdAccountCircle},
  { name: "Sign-in", href: '/signin', icon: MdAccountCircle},
];

export default function NavigationBar() {

  // * Getting the current pathname using the usePathname hook.
  // * Retrieve the current URL path to determine the active link.
  const pathname = usePathname();

  //* Define the brand name for the navigation bar
  const brand: string = "AMENOMINAKANUSHI";

  return (
    <Navbar 
      sticky="top" 
      expand="md" 
      id="navigation-bar__style" 
      // className="sticky-top" 
      data-bs-theme="dark"
    >
      <Container fluid>
        <Navbar.Brand className="d-flex align-items-center" href="/">
          {/* <span><MdToken style={{ fontSize: '1.7em'}}/></span> */}
          <span className="ml-3 fw-bold">{brand}</span>
          <span className="btn btn-theme mx-2">beta</span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <div className="nav navigation-link__style justify-content-end flex-grow-1 mt-3 mt-md-0">
          {/* Mapping over the links array to render each link */}
          {links.map((link) => {
            // const LinkIcon = link.icon;
            return (
              <Link
                key={link.name} 
                href={link.href}
                className={clsx(
                  "btn text-decoration-none mb-2 mb-md-0", // [Default] - Style
                  {
                    // If pathname matches link href, apply .active class
                    "btn-theme text-dark": pathname === link.href
                  },
                )}
              >
                <span className="d-flex align-items-center justify-content-center">
                {/* <LinkIcon className="link-icon mx-1" /> */}
                {link.name}
                </span>
              </Link>
            );
          })}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
