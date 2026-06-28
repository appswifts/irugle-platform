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
    console.error("[signin] Auth error:", e?.message, e?.type, e?.code, e?.cause);
    if (e?.message?.includes("CredentialsSignin") || e?.type === "CredentialsSignin") {
      return { error: "Invalid email or password" };
    }
    if (e?.message?.includes("NEXT_REDIRECT")) throw e;
    return { error: `Auth error: ${e?.message || "unknown"}` };
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
