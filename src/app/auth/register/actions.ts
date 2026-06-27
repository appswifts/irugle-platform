"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signIn } from "@/lib/auth";

export async function register(prev: { error?: string } | undefined, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) return { error: "All fields required" };
  if (password.length < 6) return { error: "Password must be at least 6 characters" };

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return { error: "Email already registered" };

  const hashedPassword = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: { name, email, hashedPassword, role: "TRAVELER" },
  });

  await signIn("credentials", { email, password, redirectTo: "/" });
}
