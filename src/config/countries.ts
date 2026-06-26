export interface CountryConfig {
  code: string;
  name: string;
  slug: string;
  currency: string;
  phoneCode: string;
  flag: string;
  timezone: string;
  requireLicense: boolean;
  defaultLocale: string;
}

export const countries: Record<string, CountryConfig> = {
  RW: {
    code: "RW",
    name: "Rwanda",
    slug: "rwanda",
    currency: "RWF",
    phoneCode: "+250",
    flag: "🇷🇼",
    timezone: "Africa/Kigali",
    requireLicense: true,
    defaultLocale: "en",
  },
  KE: {
    code: "KE",
    name: "Kenya",
    slug: "kenya",
    currency: "KES",
    phoneCode: "+254",
    flag: "🇰🇪",
    timezone: "Africa/Nairobi",
    requireLicense: false,
    defaultLocale: "en",
  },
  UG: {
    code: "UG",
    name: "Uganda",
    slug: "uganda",
    currency: "UGX",
    phoneCode: "+256",
    flag: "🇺🇬",
    timezone: "Africa/Kampala",
    requireLicense: true,
    defaultLocale: "en",
  },
  TZ: {
    code: "TZ",
    name: "Tanzania",
    slug: "tanzania",
    currency: "TZS",
    phoneCode: "+255",
    flag: "🇹🇿",
    timezone: "Africa/Dar_es_Salaam",
    requireLicense: false,
    defaultLocale: "en",
  },
};

export function getCountryBySlug(slug: string): CountryConfig | undefined {
  return Object.values(countries).find((c) => c.slug === slug);
}

export function getCountryByCode(code: string): CountryConfig | undefined {
  return countries[code.toUpperCase()];
}

export function getActiveCountries(): CountryConfig[] {
  return Object.values(countries);
}
