//? STYLESHEET
import "@/styles/css/globals.css";
import "./style.scss";
//? SHADCN
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/(custom)/ui/dashboard/sidebar";
//? Auth
import { auth } from "@/auth";
//? TypeScript TYPES
import type { Session } from "next-auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  //* Await result of auth function, which retrieves current session
  const session: Session | null = await auth();

  if (!session) return <div>Not authenticated</div>;

  //? Check console for Object data from GitHub API
  console.log(JSON.stringify(session, null, 2));

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="container mx-auto px-4 relative">
        {children}
        <SidebarTrigger style={{
          position: 'fixed',
          bottom: '0',
          right: '0',
          width: '50px',
          height: '50px',
          zIndex: 10,
          borderRadius: '50%',
        }} />
      </main>
    </SidebarProvider>
  );
}
