"use server";

import { signIn } from "@/lib/auth";

export async function signInWithCredentials(_prev: { error?: string } | undefined, formData: FormData) {
  const result = await signIn("credentials", {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    redirect: false,
  });
  if (result?.error) {
    return { error: `Sign-in error: ${result.error}` };
  }
  return { ok: true, url: result?.url };
}

export async function signInWithGithub() {
  "use server";
  await signIn("github", { redirectTo: "/" });
}

export async function signInWithGoogle() {
  "use server";
  await signIn("google", { redirectTo: "/" });
}
