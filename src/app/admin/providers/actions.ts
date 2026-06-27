"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

async function checkAdmin() {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    throw new Error("Unauthorized");
  }
}

export async function approveProvider(formData: FormData) {
  await checkAdmin();
  const id = formData.get("id") as string;
  await prisma.provider.update({ where: { id }, data: { status: "APPROVED" } });
  revalidatePath("/admin/providers");
}

export async function rejectProvider(formData: FormData) {
  await checkAdmin();
  const id = formData.get("id") as string;
  await prisma.provider.update({ where: { id }, data: { status: "REJECTED" } });
  revalidatePath("/admin/providers");
}
