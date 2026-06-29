"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function updateProfile(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const provider = await prisma.provider.findUnique({ where: { userId: session.user.id } });
  if (!provider) throw new Error("Provider not found");

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const description = formData.get("description") as string;
  const website = formData.get("website") as string;
  const address = formData.get("address") as string;

  await prisma.provider.update({
    where: { id: provider.id },
    data: { name, email: email || null, phone: phone || null, description: description || null, website: website || null, address: address || null },
  });

  revalidatePath("/dashboard/settings");
}
