"use server";

import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { redirect } from "next/navigation";

export async function registerProviderAction(formData: FormData) {
  const name = formData.get("name") as string;
  const countryCode = formData.get("country") as string;
  const type = formData.get("type") as string;
  const email = formData.get("email") as string;
  const phone = (formData.get("phone") as string) || undefined;
  const cityName = formData.get("city") as string;
  const address = (formData.get("address") as string) || undefined;
  const licenseNo = (formData.get("licenseNo") as string) || undefined;
  const description = (formData.get("description") as string) || undefined;

  if (!name || !countryCode || !type || !email || !cityName) {
    throw new Error("Missing required fields");
  }

  const country = await prisma.country.findUnique({ where: { code: countryCode } });
  if (!country) throw new Error("Country not found");

  const citySlug = slugify(cityName);
  let city = await prisma.city.findFirst({
    where: { countryId: country.id, slug: citySlug },
  });
  if (!city) {
    city = await prisma.city.create({
      data: { countryId: country.id, name: cityName, slug: citySlug },
    });
  }

  const slug = slugify(name);

  await prisma.provider.create({
    data: {
      name,
      slug,
      type: type as any,
      email,
      phone,
      licenseNo,
      description,
      address,
      countryId: country.id,
      cityId: city.id,
    },
  });

  redirect(`/${country.slug}?registered=true`);
}
