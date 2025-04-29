//? NEXTAUTH@BETA
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
//? AUTH
import { SignIn } from "../(custom)/ui/auth-components";
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
    <Avatar>
      <AvatarImage src={session.user.image || fallbackUserImg} alt="@Github Avatar" />
      <AvatarFallback>SN</AvatarFallback>
    </Avatar>
      <small>{session.user.id}</small>
      <h1>{session.user.name}</h1>
      <p>{session.user.email}</p>
    </SessionProvider>
  );
}