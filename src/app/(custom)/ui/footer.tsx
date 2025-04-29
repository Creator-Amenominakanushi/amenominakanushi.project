//? NEXT MODULE
import Link from "next/link";

const Footer = () => {

  //* Variable that stores the values for todays date
  const currentDate = new Date();

  return (
    <footer className="footer mt-5">
      <small>
        {/* Display Dynamic Year */}
        {currentDate.getFullYear()} Copyright &copy; AMENOMINAKANUSHI
      </small>
    </footer>
  );
}

export default Footer;
