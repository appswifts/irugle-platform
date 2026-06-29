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
