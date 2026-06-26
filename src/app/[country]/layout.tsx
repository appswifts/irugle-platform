import { notFound } from "next/navigation";
import Link from "next/link";
import { getCountryBySlug } from "@/config/countries";

export default async function CountryLayout(
  props: { children: React.ReactNode; params: Promise<{ country: string }> }
) {
  const { children } = props;
  const { country } = await props.params;
  const config = getCountryBySlug(country);

  if (!config) notFound();

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-8">
            <Link href={`/${country}`} className="text-xl font-bold">
              Irugle <span className="text-muted-foreground">{config.flag}</span>
            </Link>
            <nav className="hidden gap-6 text-sm font-medium md:flex">
              <Link href={`/${country}/map`} className="text-muted-foreground hover:text-primary">
                Map
              </Link>
              <Link href={`/${country}/hotels`} className="text-muted-foreground hover:text-primary">
                Hotels
              </Link>
              <Link href={`/${country}/tours`} className="text-muted-foreground hover:text-primary">
                Tours
              </Link>
              <Link href={`/${country}/restaurants`} className="text-muted-foreground hover:text-primary">
                Dining
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/providers/register"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              List Your Property
            </Link>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
