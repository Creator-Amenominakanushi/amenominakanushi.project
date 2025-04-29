//? STYLESHEET
import "@/styles/css/globals.css";

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      {children}
    </main>
  );
}
