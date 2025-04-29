//? STYLESHEET
import Footer from "@/app/(custom)/ui/footer";
import "@/styles/scss/globals.scss";

export default function NextMDXBlogsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="container">
      {children}
      <Footer />
    </main>
  );
}
