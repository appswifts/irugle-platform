import Link from "next/link";

const countries = [
  { code: "RW", name: "Rwanda", slug: "rwanda", flag: "🇷🇼", color: "from-blue-600 to-green-500" },
  { code: "KE", name: "Kenya", slug: "kenya", flag: "🇰🇪", color: "from-red-600 to-green-600", comingSoon: true },
  { code: "UG", name: "Uganda", slug: "uganda", flag: "🇺🇬", color: "from-yellow-500 to-red-500", comingSoon: true },
  { code: "TZ", name: "Tanzania", slug: "tanzania", flag: "🇹🇿", color: "from-green-600 to-blue-500", comingSoon: true },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="relative flex min-h-screen flex-col items-center justify-center px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Irugle
            </span>
          </h1>
          <p className="mt-6 text-xl text-muted-foreground sm:text-2xl">
            Discover. Stay. Explore. &mdash; The hospitality platform for Rwanda and beyond.
          </p>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {countries.map((c) => (
              <Link
                key={c.code}
                href={c.comingSoon ? "#" : `/${c.slug}`}
                className={`group relative overflow-hidden rounded-xl border bg-card p-6 text-left shadow-sm transition-all hover:shadow-md ${
                  c.comingSoon ? "cursor-not-allowed opacity-60" : "hover:-translate-y-1"
                }`}
              >
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${c.color}`} />
                <span className="text-3xl">{c.flag}</span>
                <h3 className="mt-3 text-lg font-semibold">{c.name}</h3>
                {c.comingSoon && (
                  <span className="mt-2 inline-block rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                    Coming soon
                  </span>
                )}
                {!c.comingSoon && (
                  <span className="mt-2 inline-block text-sm text-muted-foreground group-hover:text-primary">
                    Explore &rarr;
                  </span>
                )}
              </Link>
            ))}
          </div>

          <div className="mt-20 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <Link href="/rwanda/hotels" className="hover:text-primary">
              Hotels
            </Link>
            <Link href="/rwanda/tours" className="hover:text-primary">
              Tours
            </Link>
            <Link href="/providers/register" className="hover:text-primary">
              List Your Property
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
