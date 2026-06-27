"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

async function checkAdmin() {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== "ADMIN") throw new Error("Unauthorized");
}

export async function toggleCountry(formData: FormData) {
  await checkAdmin();
  const id = formData.get("id") as string;
  const country = await prisma.country.findUnique({ where: { id } });
  if (!country) throw new Error("Country not found");
  await prisma.country.update({ where: { id }, data: { isActive: !country.isActive } });
  revalidatePath("/admin/countries");
}

export async function addCountry(formData: FormData) {
  await checkAdmin();
  const code = (formData.get("code") as string).toUpperCase();
  const name = formData.get("name") as string;
  const slug = (formData.get("slug") as string).toLowerCase();
  const currency = (formData.get("currency") as string).toUpperCase();
  await prisma.country.create({ data: { code, name, slug, currency } });
  revalidatePath("/admin/countries");
}
