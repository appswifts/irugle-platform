import { notFound } from "next/navigation";
import Link from "next/link";
import { getCountryBySlug } from "@/config/countries";
import { UserMenu } from "@/components/user-menu";

export default async function CountryLayout(
  props: { children: React.ReactNode; params: Promise<{ country: string }> }
) {
  const { children } = props;
  const { country } = await props.params;
  const config = getCountryBySlug(country);

  if (!config) notFound();

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-8">
            <Link href={`/${country}`} className="text-xl font-bold">
              Irugle <span className="text-on-surface-variant">{config.flag}</span>
            </Link>
            <nav className="hidden gap-6 text-sm font-medium md:flex">
              <Link href={`/${country}/map`} className="text-on-surface-variant hover:text-primary">
                Map
              </Link>
              <Link href={`/${country}/hotels`} className="text-on-surface-variant hover:text-primary">
                Hotels
              </Link>
              <Link href={`/${country}/tours`} className="text-on-surface-variant hover:text-primary">
                Tours
              </Link>
              <Link href={`/${country}/restaurants`} className="text-on-surface-variant hover:text-primary">
                Dining
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/providers/register"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              List Your Property
            </Link>
            <UserMenu />
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
