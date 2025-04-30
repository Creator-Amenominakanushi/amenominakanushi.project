//? NEXTAUTH@BETA
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
//? AUTH
import { SignIn } from "../auth-components";
//? SHADCN
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
//? TypeScript TYPES
import type { Session } from "next-auth";

//* Define an asynchronous default export function
export default async function UserAvatar() {

  //* Await result of auth function, which retrieves current session
  const session: Session | null = await auth();

  //* Fallback img
  const fallbackUserImg = "images/avatars/shadcn.png";

  // TODO: Look into https://react.dev/reference/react/experimental_taintObjectReference
  //? Filter out sensitive data before passing to client.
  if (session?.user) {
    session.user = {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    }
  }

  if (!session?.user) return <SignIn />;

  return (
    <SessionProvider session={session}>
      <div className="flex flex-row items-center px-2 pt-3 pb-4">
        <Avatar>
          <AvatarImage src={session.user.image || fallbackUserImg} alt="@Github Avatar" />
          <AvatarFallback>SN</AvatarFallback>
        </Avatar>
        <span className="mx-2">{session.user.name}</span>
      </div>
    {/* <p>{session.user.email}</p> */}
    </SessionProvider>
  );
}
