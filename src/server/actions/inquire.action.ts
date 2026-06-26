"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function inquireAction(formData: FormData) {
  const providerId = formData.get("providerId") as string;
  const country = formData.get("country") as string;
  const guestName = formData.get("guestName") as string;
  const guestEmail = formData.get("guestEmail") as string;
  const guestPhone = (formData.get("guestPhone") as string) || undefined;
  const checkIn = formData.get("checkIn") as string;
  const checkOut = formData.get("checkOut") as string;
  const guests = parseInt((formData.get("guests") as string) || "1");
  const notes = (formData.get("notes") as string) || undefined;

  if (!providerId || !guestName || !guestEmail) {
    throw new Error("Missing required fields");
  }

  const provider = await prisma.provider.findUnique({ where: { id: providerId } });
  if (!provider) throw new Error("Provider not found");

  await prisma.booking.create({
    data: {
      providerId: provider.id,
      productId: provider.id, // fallback — direct hotel inquiry
      guestName,
      guestEmail,
      guestPhone,
      checkIn: checkIn ? new Date(checkIn) : null,
      checkOut: checkOut ? new Date(checkOut) : null,
      guests,
      notes,
      status: "INQUIRY",
    },
  });

  redirect(`/${country}?inquiry=success`);
}
