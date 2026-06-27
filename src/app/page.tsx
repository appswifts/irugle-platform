import Link from "next/link";

const trending = [
  { name: "Volcanoes National Park", image: "https://images.unsplash.com/photo-1580060838334-4de0e6270b2e?w=200&h=200&fit=crop&crop=center" },
  { name: "Akagera National Park", image: "https://images.unsplash.com/photo-1549366021-9f761d450615?w=200&h=200&fit=crop&crop=center" },
  { name: "Nyungwe Forest", image: "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=200&h=200&fit=crop&crop=center" },
  { name: "Lake Kivu", image: "https://images.unsplash.com/photo-1596178060671-7a80dc8053f4?w=200&h=200&fit=crop&crop=center" },
  { name: "Kigali", image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=200&h=200&fit=crop&crop=center" },
  { name: "King's Palace Museum", image: "https://images.unsplash.com/photo-1566140967404-b8b3932483f5?w=200&h=200&fit=crop&crop=center" },
];

const highlights = [
  { name: "Hilltop Hotel", location: "Kigali, Rwanda", rating: 4.8, reviews: 124, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop", beds: 3, guests: 6, size: "80m²" },
  { name: "Delta Resort", location: "Lake Kivu, Rwanda", rating: 4.6, reviews: 89, image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=300&fit=crop", beds: 2, guests: 4, size: "55m²" },
  { name: "Palast Rock Hotel", location: "Volcanoes NP, Rwanda", rating: 4.9, reviews: 203, image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop", beds: 4, guests: 8, size: "110m²" },
];

const restaurants = [
  { name: "The Hut Restaurant", cuisine: "Rwandan", rating: 4.7, image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=260&fit=crop" },
  { name: "La Fontaine", cuisine: "French", rating: 4.5, image: "https://images.unsplash.com/photo-1550966871-3ed3cdb51f3a?w=400&h=260&fit=crop" },
  { name: "Brachetto Restaurant", cuisine: "Italian", rating: 4.3, image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=260&fit=crop" },
  { name: "Repub Lounge", cuisine: "Rwandan", rating: 4.4, image: "https://images.unsplash.com/photo-1592861956120-e524fc2c9f8c?w=400&h=260&fit=crop" },
];

const experiences = [
  { title: "Gorilla Trekking Adventure", desc: "3-day gorilla trek in Volcanoes NP", price: "150K RWF", tag: "Wildlife", image: "https://images.unsplash.com/photo-1580060838334-4de0e6270b2e?w=400&h=260&fit=crop" },
  { title: "Kigali City Tour", desc: "Full day exploring Kigali's culture", price: "45K RWF", tag: "Culture", image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=260&fit=crop" },
  { title: "Lake Kivu Canoe", desc: "Half day canoe on Lake Kivu's scenic waters", price: "35K RWF", tag: "Adventure", image: "https://images.unsplash.com/photo-1596178060671-7a80dc8053f4?w=400&h=260&fit=crop" },
];

const plans = [
  { name: "Starter", price: "15K", unit: "RWF", desc: "List up to 5 properties with basic analytics", features: ["5 properties", "Basic analytics", "Email support"], popular: false },
  { name: "Professional", price: "49K", unit: "RWF", desc: "Unlimited properties with advanced features", features: ["Unlimited properties", "Advanced analytics", "Priority support", "Featured listings"], popular: true },
  { name: "Business", price: "149K", unit: "RWF", desc: "Full suite for larger hospitality businesses", features: ["Unlimited properties", "API access", "Dedicated account manager", "Custom branding", "Bulk import"], popular: false },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? "fill-yellow-400" : "fill-gray-300"}`} viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-xs font-medium ml-1">{rating}</span>
    </div>
  );
}

function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/70">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 lg:px-8 h-16">
        <Link href="/" className="text-xl font-bold tracking-tight text-primary">irugle</Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-on-surface">
          <Link href="/rwanda/hotels" className="hover:text-primary transition-colors">Homes</Link>
          <Link href="/rwanda/tours" className="hover:text-primary transition-colors">Restaurants</Link>
          <Link href="/rwanda/tours" className="hover:text-primary transition-colors">Experiences</Link>
          <Link href="/rwanda" className="hover:text-primary transition-colors">Crafts</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/providers/register" className="hidden md:inline text-sm font-medium text-on-surface hover:text-primary transition-colors">
            Host your place
          </Link>
          <Link href="/auth/signin" className="flex items-center gap-2 rounded-full bg-primary text-white px-5 py-2 text-sm font-medium hover:bg-primary-container transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Sign in
          </Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center justify-center pt-16">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/40 z-[1]" />
        <img
          src="https://images.unsplash.com/photo-1574484284002-952d92456975?w=1600&h=900&fit=crop"
          alt="Rwanda landscape"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 text-center text-white">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-shadow-md">
          Discover amazing places in{" "}
          <span className="text-primary-fixed-dim">Rwanda</span>
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-white/90">
          Hotels, tours, guides, and experiences — all in one place.
        </p>
        <div className="mt-10">
          <div className="flex items-center justify-center gap-2 sm:gap-4 text-sm font-medium mb-4">
            {["Homes", "Bar & Restaurants", "Experiences"].map((tab) => (
              <button key={tab} className={`px-4 py-2 rounded-full transition-all ${tab === "Homes" ? "bg-white text-primary shadow-lg" : "bg-white/20 text-white hover:bg-white/30"}`}>
                {tab}
              </button>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-white/15 backdrop-blur-sm rounded-2xl p-2 max-w-2xl mx-auto">
            <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 flex-1">
              <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <input type="text" placeholder="Search destinations, hotels..." className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400" />
            </div>
            <div className="flex items-center gap-2 bg-white/90 rounded-xl px-4 py-3">
              <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm text-gray-500">Check in - Check out</span>
            </div>
            <div className="flex items-center gap-2 bg-white/90 rounded-xl px-4 py-3">
              <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm text-gray-500">Guests</span>
            </div>
            <Link href="/rwanda/hotels" className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-container text-white rounded-xl px-6 py-3 font-medium text-sm transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Trending() {
  return (
    <section className="py-16 lg:py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-primary">Explore</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-on-surface mt-1">Trending Destinations</h2>
          </div>
          <Link href="/rwanda" className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            View all <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-5">
          {trending.map((d) => (
            <Link key={d.name} href="/rwanda" className="group text-center">
              <div className="aspect-square rounded-full overflow-hidden border-2 border-transparent group-hover:border-primary transition-all shadow-md">
                <img src={d.image} alt={d.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <p className="mt-2 text-xs sm:text-sm font-medium text-on-surface leading-tight">{d.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function BentoGrid() {
  return (
    <section className="py-16 lg:py-20 bg-artisanal-cream" style={{ backgroundColor: "#f9f6f0" }}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="mb-10">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary">Categories</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-on-surface mt-1">Find by Interest</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <Link href="/rwanda/hotels" className="md:col-span-1 md:row-span-2 relative rounded-2xl overflow-hidden group min-h-[400px]">
            <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=700&fit=crop" alt="Places to stay" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-2xl font-bold">Places to stay</h3>
              <p className="text-sm text-white/80 mt-1">Hotels, lodges, resorts across Rwanda</p>
            </div>
          </Link>
          <Link href="/rwanda/tours" className="relative rounded-2xl overflow-hidden group min-h-[190px]">
            <img src="https://images.unsplash.com/photo-1580060838334-4de0e6270b2e?w=600&h=300&fit=crop" alt="Experiences" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
              <h3 className="text-xl font-bold">Experiences</h3>
              <p className="text-xs text-white/80 mt-0.5">Tours & activities</p>
            </div>
          </Link>
          <Link href="/rwanda" className="relative rounded-2xl overflow-hidden group min-h-[190px]">
            <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=300&fit=crop" alt="Bar & Restaurants" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
              <h3 className="text-xl font-bold">Bar & restaurants</h3>
              <p className="text-xs text-white/80 mt-0.5">Dining & nightlife</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

function Highlights() {
  return (
    <section className="py-16 lg:py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-primary">Curated</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-on-surface mt-1">Explore our highlights</h2>
          </div>
          <Link href="/rwanda/hotels" className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            View all <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((h) => (
            <Link key={h.name} href="/rwanda/hotels" className="group rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all">
              <div className="relative overflow-hidden">
                <img src={h.image} alt={h.name} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </span>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-on-surface group-hover:text-primary transition-colors">{h.name}</h3>
                    <p className="text-sm text-on-surface-variant mt-0.5">{h.location}</p>
                  </div>
                  <StarRating rating={h.rating} />
                </div>
                <div className="flex items-center gap-4 mt-3 text-xs text-on-surface-variant border-t border-gray-100 pt-3">
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {h.guests} guests
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    {h.size}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                    {h.beds} beds
                  </span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  From <span className="font-semibold text-primary">$120</span> / night
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Restaurants() {
  return (
    <section className="py-16 lg:py-20 bg-ink-blue" style={{ backgroundColor: "#0a1833" }}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-blue-300">Dining</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mt-1">Top Rated Restaurants</h2>
          </div>
          <Link href="/rwanda" className="hidden sm:flex items-center gap-1 text-sm font-medium text-blue-300 hover:underline">
            View all <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {restaurants.map((r) => (
            <Link key={r.name} href="/rwanda" className="group rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all">
              <div className="overflow-hidden">
                <img src={r.image} alt={r.name} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-white">{r.name}</h3>
                  <StarRating rating={r.rating} />
                </div>
                <p className="text-sm text-blue-200/70 mt-1">{r.cuisine}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experiences() {
  return (
    <section className="py-16 lg:py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-primary">Activities</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-on-surface mt-1">Latest Experiences</h2>
          </div>
          <Link href="/rwanda/tours" className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            View all <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((e) => (
            <Link key={e.title} href="/rwanda/tours" className="group rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all">
              <div className="relative overflow-hidden">
                <img src={e.image} alt={e.title} className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-semibold text-primary px-3 py-1 rounded-full">
                  {e.tag}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-on-surface group-hover:text-primary transition-colors">{e.title}</h3>
                <p className="text-sm text-on-surface-variant mt-1">{e.desc}</p>
                <p className="mt-3 text-sm">
                  From <span className="font-semibold text-primary">{e.price}</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section className="py-16 lg:py-20" style={{ backgroundColor: "#f9f6f0" }}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary">Pricing</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-on-surface mt-1">Choose your plan</h2>
          <p className="text-on-surface-variant mt-2 max-w-xl mx-auto">
            Start listing your properties and reach thousands of travelers visiting Rwanda.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((p) => (
            <div key={p.name} className={`relative rounded-2xl p-6 border ${p.popular ? "bg-primary border-primary text-white" : "bg-white border-gray-200"} shadow-sm`}>
              {p.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-fixed-dim text-on-primary text-xs font-semibold px-4 py-1 rounded-full">
                  Most popular
                </span>
              )}
              <h3 className={`text-lg font-bold ${p.popular ? "text-white" : "text-on-surface"}`}>{p.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className={`text-4xl font-bold ${p.popular ? "text-white" : "text-on-surface"}`}>{p.price}</span>
                <span className={`text-sm ${p.popular ? "text-white/70" : "text-on-surface-variant"}`}>/{p.unit}</span>
              </div>
              <p className={`mt-2 text-sm ${p.popular ? "text-white/80" : "text-on-surface-variant"}`}>{p.desc}</p>
              <ul className={`mt-6 space-y-3 ${p.popular ? "text-white/90" : "text-on-surface"}`}>
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <svg className={`w-4 h-4 shrink-0 ${p.popular ? "text-white" : "text-primary"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/providers/register"
                className={`mt-8 w-full flex items-center justify-center rounded-xl py-3 text-sm font-semibold transition-all ${
                  p.popular
                    ? "bg-white text-primary hover:bg-gray-100"
                    : "bg-primary text-white hover:bg-primary-container"
                }`}
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-ink-blue text-white" style={{ backgroundColor: "#0a1833" }}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-xl font-bold">irugle</Link>
            <p className="mt-3 text-sm text-blue-200/60 max-w-xs">
              Discover, stay, and explore Rwanda. The hospitality platform connecting travelers with the best accommodations, tours, and experiences.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-blue-300 mb-4">Platform</h4>
            <ul className="space-y-2">
              {["Hotels", "Tours", "Experiences", "Map"].map((item) => (
                <li key={item}>
                  <Link href="/rwanda" className="text-sm text-blue-200/70 hover:text-white transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-blue-300 mb-4">Company</h4>
            <ul className="space-y-2">
              {["About us", "Blog", "Careers", "Press"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-blue-200/70 hover:text-white transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-blue-300 mb-4">Legal</h4>
            <ul className="space-y-2">
              {["Privacy policy", "Terms of service", "Cookie policy"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-blue-200/70 hover:text-white transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-blue-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-blue-200/50">&copy; 2026 Irugle. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {["Facebook", "Instagram", "X", "YouTube", "TikTok"].map((s) => (
              <Link key={s} href="#" className="text-blue-200/50 hover:text-white transition-colors" aria-label={s}>
                <span className="text-xs">{s[0]}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function MobileBottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden">
      <div className="flex items-center justify-around py-2">
        {[
          { label: "Home", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", active: true },
          { label: "Map", icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7", active: false },
          { label: "Saved", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z", active: false },
          { label: "Profile", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z", active: false },
        ].map((item) => (
          <Link key={item.label} href="/" className={`flex flex-col items-center gap-0.5 ${item.active ? "text-primary" : "text-gray-400"}`}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={item.active ? 2.5 : 1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
            </svg>
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Trending />
        <BentoGrid />
        <Highlights />
        <Restaurants />
        <Experiences />
        <Pricing />
        <Footer />
      </main>
      <MobileBottomNav />
    </>
  );
}
