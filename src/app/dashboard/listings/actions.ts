"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function toggleListingStatus(formData: FormData) {
  const session = await auth();
  if (!session?.user) return;
  const provider = await prisma.provider.findUnique({ where: { userId: session.user.id } });
  if (!provider) return;

  const id = formData.get("id") as string;
  const product = await prisma.product.findUnique({ where: { id }, select: { isActive: true, providerId: true } });
  if (!product || product.providerId !== provider.id) return;

  await prisma.product.update({ where: { id }, data: { isActive: !product.isActive } });
  revalidatePath("/dashboard/listings");
}

export async function createListing(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  const provider = await prisma.provider.findUnique({ where: { userId: session.user.id } });
  if (!provider || provider.status !== "APPROVED") throw new Error("Provider not approved");

  const type = formData.get("type") as string;
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const currency = (formData.get("currency") as string) || "RWF";
  const maxGuests = formData.get("maxGuests") ? parseInt(formData.get("maxGuests") as string) : null;
  const durationHours = formData.get("durationHours") ? parseInt(formData.get("durationHours") as string) : null;

  const attributes: Record<string, unknown> = {};
  if (type === "ROOM") {
    attributes.beds = formData.get("beds") ? parseInt(formData.get("beds") as string) : null;
    attributes.roomSize = formData.get("roomSize") ? parseFloat(formData.get("roomSize") as string) : null;
    attributes.amenities = (formData.get("amenities") as string)?.split(",").map(s => s.trim()).filter(Boolean) || [];
  } else if (type === "TOUR_PACKAGE") {
    attributes.itinerary = formData.get("itinerary") as string || null;
    attributes.includes = (formData.get("includes") as string)?.split(",").map(s => s.trim()).filter(Boolean) || [];
    attributes.languages = (formData.get("languages") as string)?.split(",").map(s => s.trim()).filter(Boolean) || [];
    attributes.difficulty = formData.get("difficulty") as string || null;
  } else if (type === "ACTIVITY") {
    attributes.difficulty = formData.get("difficulty") as string || null;
    attributes.whatToBring = (formData.get("whatToBring") as string)?.split(",").map(s => s.trim()).filter(Boolean) || [];
  } else if (type === "TABLE") {
    attributes.cuisine = formData.get("cuisine") as string || null;
    attributes.mealType = formData.get("mealType") as string || null;
    attributes.seatingCapacity = formData.get("seatingCapacity") ? parseInt(formData.get("seatingCapacity") as string) : null;
  }

  const images = (formData.get("images") as string)?.split("\n").map(s => s.trim()).filter(Boolean) || [];

  await prisma.product.create({
    data: {
      providerId: provider.id,
      type: type as any,
      name,
      description: description || null,
      price,
      currency,
      maxGuests,
      durationHours,
      attributes: Object.keys(attributes).length > 0 ? JSON.parse(JSON.stringify(attributes)) : undefined,
      images,
      isActive: true,
    },
  });

  revalidatePath("/dashboard/listings");
}

export async function updateListing(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  const provider = await prisma.provider.findUnique({ where: { userId: session.user.id } });
  if (!provider) throw new Error("Unauthorized");

  const id = formData.get("id") as string;
  const existing = await prisma.product.findUnique({ where: { id }, select: { providerId: true } });
  if (!existing || existing.providerId !== provider.id) throw new Error("Unauthorized");

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const currency = (formData.get("currency") as string) || "RWF";
  const maxGuests = formData.get("maxGuests") ? parseInt(formData.get("maxGuests") as string) : null;
  const durationHours = formData.get("durationHours") ? parseInt(formData.get("durationHours") as string) : null;

  await prisma.product.update({
    where: { id },
    data: { name, description: description || null, price, currency, maxGuests, durationHours },
  });

  revalidatePath("/dashboard/listings");
}
