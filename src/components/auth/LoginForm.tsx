"use client";

import { useActionState } from "react";
import { signInWithCredentials, signInWithGoogle } from "@/lib/actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import Link from "next/link";
import { Separator } from "../ui/separator";

function GoogleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width="24px"
      height="24px"
    >
      {/* ...your svg paths... */}
    </svg>
  );
}

export function LoginForm() {
  const [state, dispatch] = useActionState(signInWithCredentials, undefined);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.error) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description:
          typeof state.error === "string"
            ? state.error
            : "Please check your inputs.",
      });
    }
  }, [state, toast]);

  return (
    <div className="space-y-4">
      {/* Email/password login form */}
      <form action={dispatch} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required />
        </div>

        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </form>

      <Separator className="my-4" />

      {/* Google login button - separate from form */}
      <Button
        type="button" // important: prevents form validation
        onClick={() => signInWithGoogle()}
        variant="outline"
        className="w-full"
      >
        <GoogleIcon />
        <span className="ml-2">Sign in with Google</span>
      </Button>

      <div className="mt-4 text-center text-sm">
        Don’t have an account?{" "}
        <Link href="/register" className="underline">
          Sign up
        </Link>
      </div>
    </div>
  );
}
