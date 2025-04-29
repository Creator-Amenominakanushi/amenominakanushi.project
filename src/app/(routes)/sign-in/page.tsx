import * as React from "react";

//? STYLESHEET
import "./style.scss";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SignIn } from "@/app/(custom)/ui/auth-components";

export default function SignInFormPage() {
  return (
    <Card className="w-[350px] center-xy__container">
      <CardHeader>
        <CardTitle>Log-in To Your Account</CardTitle>
        <CardDescription>Sign-In built with auth.js beta.</CardDescription>
      </CardHeader>
      <CardContent>
        {/* GITHUB PROVIDER | SIGN-IN BTN */}
        <div className="mb-4 pb-5">
          <SignIn />
        </div>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Username</Label>
              <Input id="name" placeholder="Username" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Password</Label>
              <Input id="password" placeholder="Password" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Sign-In</Button>
      </CardFooter>
    </Card>
  );
}
