"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function toggleProductStatus(formData: FormData) {
  const id = formData.get("id") as string;
  const product = await prisma.product.findUnique({ where: { id }, select: { isActive: true } });
  if (!product) return;
  await prisma.product.update({
    where: { id },
    data: { isActive: !product.isActive },
  });
  revalidatePath("/admin/listings");
}

export async function createAdminListing(formData: FormData) {
  const providerId = formData.get("providerId") as string;
  const name = formData.get("name") as string;
  const type = formData.get("type") as string;
  const price = parseFloat(formData.get("price") as string);

  await prisma.product.create({
    data: {
      providerId,
      type: type as any,
      name,
      price,
      isActive: true,
    },
  });

  revalidatePath("/admin/listings");
}
