import { prisma } from "../src/lib/prisma";
import { slugify } from "../src/lib/utils";
import { getCountryByCode } from "../src/config/countries";
import RWANDA_DATA from "../src/data/rwanda-hotels";

async function seed() {
  console.log("🌱 Seeding database...");

  for (const [code, config] of Object.entries({
    RW: getCountryByCode("RW")!,
    KE: getCountryByCode("KE")!,
    UG: getCountryByCode("UG")!,
    TZ: getCountryByCode("TZ")!,
  })) {
    await prisma.country.upsert({
      where: { code },
      update: {},
      create: {
        code: config.code,
        name: config.name,
        slug: config.slug,
        currency: config.currency,
        phoneCode: config.phoneCode,
        flag: config.flag,
        timezone: config.timezone,
      },
    });
    console.log(`  Country: ${config.flag} ${config.name}`);
  }

  const rwanda = await prisma.country.findUnique({ where: { code: "RW" } });
  if (!rwanda) throw new Error("Rwanda country record not found");

  for (const item of RWANDA_DATA) {
    const citySlug = slugify(item.city);
    let city = await prisma.city.upsert({
      where: { countryId_slug: { countryId: rwanda.id, slug: citySlug } },
      update: {},
      create: { countryId: rwanda.id, name: item.city, slug: citySlug },
    });

    const providerSlug = slugify(item.name);
    await prisma.provider.upsert({
      where: { countryId_slug: { countryId: rwanda.id, slug: providerSlug } },
      update: {
        type: item.type as any,
        phone: item.phone,
        website: item.website,
        starRating: item.starRating,
        description: item.description,
        amenities: item.amenities,
        cityId: city.id,
        status: "APPROVED",
      },
      create: {
        name: item.name,
        slug: providerSlug,
        type: item.type as any,
        description: item.description,
        phone: item.phone,
        website: item.website,
        starRating: item.starRating,
        amenities: item.amenities,
        countryId: rwanda.id,
        cityId: city.id,
        status: "APPROVED",
        email: `info@${slugify(item.name)}.com`,
      },
    });
    console.log(`  ${item.type}: ${item.name} (${item.city})`);
  }

  console.log(`\n✅ Seed complete: ${RWANDA_DATA.length} properties in Rwanda`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
