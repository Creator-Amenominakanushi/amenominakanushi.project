//? STYLESHEET
import "@/styles/scss/globals.scss";

export default function NextMDXBlogsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="container">
      {children}
    </main>
  );
}
