"use server";

import { signIn } from "@/lib/auth";

export async function signInWithCredentials(_prev: { error?: string } | undefined, formData: FormData) {
  try {
    await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirectTo: "/",
    });
  } catch (e: any) {
    if (e?.message?.includes("CredentialsSignin") || e?.type === "CredentialsSignin") {
      return { error: "Invalid email or password" };
    }
    throw e;
  }
}

export async function signInWithGithub() {
  "use server";
  await signIn("github", { redirectTo: "/" });
}

export async function signInWithGoogle() {
  "use server";
  await signIn("google", { redirectTo: "/" });
}
