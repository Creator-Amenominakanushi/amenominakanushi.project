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
        await signOut();
      }}
    >
      <Button 
        type="submit" 
        variant="destructive"
      > 
        Sign Out
      </Button>
    </form>
  );
}
