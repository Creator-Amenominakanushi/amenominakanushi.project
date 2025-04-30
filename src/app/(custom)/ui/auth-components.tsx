//? Auth.ts CONFIGURATION
import { signIn, signOut } from "@/auth";
//? SHADCN
import { Button } from "@/components/ui/button";
//? REACT ICONS
import { AiFillGithub } from "react-icons/ai";

export function SignIn() {

  return (
    <form
      action={async () => {
        "use server";
        await signIn("github", { redirectTo: "/dashboard" });
      }}
    >
      <Button 
        type="submit"
        size="sm"
      > 
        <AiFillGithub /> Sign-in with GitHub
      </Button>
    </form>
  );
}

export function SignOut() {

  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <Button 
        type="submit" 
        variant="destructive"
        size="sm"
      > 
        Sign Out
      </Button>
    </form>
  );
}
