import Link from "next/link";

function SearchIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-surface border-b border-outline-variant">
      <div className="flex items-center justify-between h-16 md:h-20 px-4 md:px-16 w-full max-w-[1280px] mx-auto">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold tracking-tight text-primary">irugle</Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/rwanda/hotels" className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium">Homes</Link>
            <Link href="/rwanda/tours" className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium">Restaurants</Link>
            <Link href="/rwanda/tours" className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium">Experiences</Link>
            <Link href="/rwanda" className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium">Crafts</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:block text-on-surface-variant text-sm font-medium">Host your place</span>
          <Link href="/auth/signin" className="bg-primary text-white px-5 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-all">
            Sign in
          </Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative w-full h-[600px] md:h-[700px] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A1833]/70 to-transparent z-10" />
      <img
        src="https://images.unsplash.com/photo-1574484284002-952d92456975?w=1600&h=900&fit=crop"
        alt="Mist-covered Virunga Mountains at sunrise, volcanic peaks rising through soft clouds under a sky painted in gold and orange"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-20 w-full max-w-[1280px] mx-auto px-4 md:px-16">
        <div className="max-w-lg">
          <h1 className="text-[40px] md:text-[48px] leading-[48px] md:leading-[56px] tracking-tight font-bold text-white text-shadow-md">
            Find your place in Rwanda
          </h1>
          <div className="mt-8 bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-natural-clay/20">
            <div className="flex gap-6 mb-6 border-b border-outline-variant">
              {[{ label: "Homes", active: true }, { label: "Bar & Restaurants" }, { label: "Experiences" }].map((tab) => (
                <button key={tab.label} className={`pb-2 text-sm font-semibold ${tab.active ? "border-b-2 border-primary text-primary" : "text-on-surface-variant hover:text-primary transition-colors"}`}>
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Try &apos;Kigali&apos; or &apos;Volcanoes Park&apos;..."
                className="w-full px-4 py-3 bg-surface-container-low border border-natural-clay rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20"
              />
              <div className="grid grid-cols-2 gap-3">
                <input type="text" placeholder="Check in" className="w-full px-4 py-3 bg-surface-container-low border border-natural-clay rounded-xl text-sm outline-none" />
                <input type="text" placeholder="Check out" className="w-full px-4 py-3 bg-surface-container-low border border-natural-clay rounded-xl text-sm outline-none" />
              </div>
              <button className="w-full bg-primary text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:brightness-110 transition-all text-sm">
                <SearchIcon /> Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrendingDestinations() {
  const items = [
    { name: "Volcanoes National Park", img: "https://images.unsplash.com/photo-1580060838334-4de0e6270b2e?w=200&h=200&fit=crop&crop=center" },
    { name: "Akagera National Park", img: "https://images.unsplash.com/photo-1549366021-9f761d450615?w=200&h=200&fit=crop&crop=center" },
    { name: "Nyungwe Forest", img: "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=200&h=200&fit=crop&crop=center" },
    { name: "Lake Kivu", img: "https://images.unsplash.com/photo-1596178060671-7a80dc8053f4?w=200&h=200&fit=crop&crop=center" },
    { name: "Kigali", img: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=200&h=200&fit=crop&crop=center" },
    { name: "Nyanza", img: "https://images.unsplash.com/photo-1566140967404-b8b3932483f5?w=200&h=200&fit=crop&crop=center" },
  ];
  return (
    <section className="py-20 max-w-[1280px] mx-auto px-4 md:px-16">
      <h2 className="text-[28px] md:text-[32px] leading-[36px] md:leading-[40px] tracking-tight font-bold text-ink-blue mb-10">Trending destinations</h2>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {items.map((d) => (
          <Link key={d.name} href="/rwanda" className="flex flex-col items-center gap-4 group cursor-pointer">
            <div className="w-28 h-28 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-transparent group-hover:border-primary transition-all">
              <img src={d.img} alt={d.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <span className="text-sm font-semibold text-center leading-tight">{d.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function BentoGrid() {
  return (
    <section className="py-20 bg-artisanal-cream">
      <div className="max-w-[1280px] mx-auto px-4 md:px-16">
        <h2 className="text-[28px] md:text-[32px] leading-[36px] md:leading-[40px] tracking-tight font-bold text-ink-blue mb-10">What are you interested in?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[500px]">
          <Link href="/rwanda/hotels" className="group relative rounded-2xl overflow-hidden border border-natural-clay">
            <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&h=500&fit=crop" alt="" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-blue/80 via-ink-blue/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <h3 className="text-2xl font-bold mb-2">Places to stay</h3>
              <p className="text-sm text-white/80 max-w-sm leading-relaxed">From lakeside villas on Lake Kivu to boutique stays in Kacyiru — find the right home for your trip.</p>
            </div>
          </Link>
          <div className="grid grid-rows-2 gap-6">
            <Link href="/rwanda/tours" className="group relative rounded-2xl overflow-hidden border border-natural-clay">
              <img src="https://images.unsplash.com/photo-1580060838334-4de0e6270b2e?w=600&h=300&fit=crop" alt="" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-blue/80 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h3 className="text-2xl font-bold">Experiences</h3>
                <p className="text-sm text-white/70 mt-1">Gorilla treks, coffee tours, canopy walks</p>
              </div>
            </Link>
            <Link href="/rwanda" className="group relative rounded-2xl overflow-hidden border border-natural-clay">
              <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=300&fit=crop" alt="" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-blue/80 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h3 className="text-2xl font-bold">Bar & restaurants</h3>
                <p className="text-sm text-white/70 mt-1">Kigali&apos;s best dining spots</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Highlights() {
  const cards = [
    { name: "Hilltop Hotel and Country Club", location: "Kigali, Rwanda", beds: 1, guests: 120, size: 125, price: 100, img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop" },
    { name: "Delta Resort Hotel", location: "Lake Kivu, Rwanda", beds: 1, guests: 38, size: 40, price: 69, img: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=300&fit=crop" },
    { name: "Palast Rock Hotel", location: "Volcanoes NP, Rwanda", beds: 1, guests: 49, size: 50, price: 92, img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop" },
  ];
  return (
    <section className="py-20 max-w-[1280px] mx-auto px-4 md:px-16">
      <div className="flex items-end justify-between mb-10">
        <h2 className="text-[28px] md:text-[32px] leading-[36px] md:leading-[40px] tracking-tight font-bold text-ink-blue">Explore our highlights</h2>
        <Link href="/rwanda/hotels" className="text-primary font-semibold text-sm hover:underline hidden sm:block">View all homes</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((h) => (
          <Link key={h.name} href="/rwanda/hotels" className="group bg-white rounded-2xl overflow-hidden border border-natural-clay hover:shadow-lg transition-all">
            <div className="relative h-56 overflow-hidden">
              <img src={h.img} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <span className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow-sm">
                <HeartIcon />
              </span>
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold text-ink-blue mb-1">{h.name}</h3>
              <p className="text-on-surface-variant text-sm mb-4">{h.location}</p>
              <div className="flex items-center gap-4 text-on-surface-variant text-sm mb-4">
                {h.beds > 0 && <span>{h.beds} bed</span>}
                <span>{h.guests} guests</span>
                <span>{h.size}m&sup2;</span>
              </div>
              <div className="flex items-center justify-between border-t border-natural-clay pt-4">
                <span className="text-primary font-bold text-lg">${h.price}.00</span>
                <span className="text-primary font-semibold text-sm">Details</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Restaurants() {
  const items = [
    { name: "Brioche Kacyiru", stars: 4.5, img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=320&fit=crop" },
    { name: "Cafe Camellia Peace Plaza", stars: 4, img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=320&fit=crop" },
    { name: "Lg Bar and Restaurant", stars: 3.5, img: "https://images.unsplash.com/photo-1592861956120-e524fc2c9f8c?w=400&h=320&fit=crop" },
  ];
  return (
    <section className="py-24 bg-ink-blue mx-4 md:mx-16 rounded-[40px]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-16">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-[28px] md:text-[32px] leading-[36px] md:leading-[40px] tracking-tight font-bold text-white mb-2">Best Bar & Restaurants</h2>
            <p className="text-on-primary-container text-lg">Taste the flavours of Rwanda&apos;s finest culinary scenes.</p>
          </div>
          <button className="bg-primary text-white px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition-all text-sm">Explore more</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((r) => (
            <div key={r.name} className="relative group h-72 rounded-2xl overflow-hidden">
              <img src={r.img} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-blue/80 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <h4 className="text-white text-xl font-bold">{r.name}</h4>
                <div className="flex items-center gap-0.5 mt-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className={`w-4 h-4 ${i < Math.floor(r.stars) ? "text-[#bdc2ff]" : "text-white/30"}`} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experiences() {
  const items = [
    { title: "Lake Kivu Adventure & Rwanda Safaris", price: 80, tags: ["Animals", "Nature", "Wellness"], img: "https://images.unsplash.com/photo-1596178060671-7a80dc8053f4?w=400&h=300&fit=crop" },
    { title: "Africa 4Corner Safari", price: 300, tags: ["Animals", "Art", "History"], img: "https://images.unsplash.com/photo-1549366021-9f761d450615?w=400&h=300&fit=crop" },
    { title: "Mb Simba Safaris Rwanda", price: 350, tags: ["Art", "Culture", "History"], img: "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=400&h=300&fit=crop" },
  ];
  return (
    <section className="py-20 max-w-[1280px] mx-auto px-4 md:px-16">
      <h2 className="text-[28px] md:text-[32px] leading-[36px] md:leading-[40px] tracking-tight font-bold text-ink-blue mb-10">Latest experiences</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((e) => (
          <div key={e.title} className="bg-surface-container-low rounded-2xl overflow-hidden border border-natural-clay p-4">
            <div className="h-48 rounded-xl overflow-hidden mb-4">
              <img src={e.img} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="px-1">
              <h3 className="text-lg font-bold text-ink-blue mb-2">{e.title}</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {e.tags.map((t) => (
                  <span key={t} className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">{t}</span>
                ))}
              </div>
              <div className="flex items-center justify-between border-t border-natural-clay pt-4">
                <span className="text-primary font-bold text-lg">${e.price}.00</span>
                <button className="bg-white border border-natural-clay text-ink-blue px-4 py-2 rounded-xl font-semibold text-sm hover:bg-surface transition-colors">Book Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    { name: "Starter", price: "15K", unit: "RWF", desc: "Submit up to 1 listing for limited availability", features: ["1 listing submission", "60 days availability", "Basic support"] },
    { name: "Professional", price: "49K", unit: "RWF", desc: "Submit up to 5 listings and extend availability", features: ["Up to 5 listings", "Available for 5 days", "Dedicated support"], popular: true },
    { name: "Business", price: "149K", unit: "RWF", desc: "Submit up to 20 listings for maximum visibility", features: ["Up to 20 listings", "Available for 365 days", "Priority support"] },
  ];
  return (
    <section className="py-20 max-w-[1280px] mx-auto px-4 md:px-16">
      <div className="text-center mb-12">
        <h2 className="text-[28px] md:text-[32px] leading-[36px] md:leading-[40px] tracking-tight font-bold text-ink-blue mb-2">Pricing Plans</h2>
        <p className="text-on-surface-variant">Subscription plans for partners and hosts</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
        {plans.map((p) => (
          <div key={p.name} className={`bg-white p-8 rounded-2xl border ${p.popular ? "border-2 border-primary shadow-xl scale-105 z-10 relative" : "border-natural-clay"} flex flex-col h-full`}>
            {p.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white px-5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                Most Popular
              </div>
            )}
            <h3 className="text-xl font-bold text-ink-blue mb-1">{p.name}</h3>
            <div className="flex items-baseline gap-1 mb-4">
              <span className={`text-[40px] leading-[48px] font-bold ${p.popular ? "text-primary" : "text-ink-blue"}`}>{p.price}</span>
              <span className="text-on-surface-variant text-sm">/{p.unit}</span>
            </div>
            <p className="text-on-surface-variant mb-6 text-sm leading-relaxed">{p.desc}</p>
            <ul className="space-y-3 mb-8">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-on-surface-variant">
                  <CheckIcon /> {f}
                </li>
              ))}
            </ul>
            <button className={`w-full py-3.5 rounded-xl font-semibold text-sm mt-auto transition-all ${p.popular ? "bg-primary text-white hover:brightness-110" : "bg-surface-container-high text-ink-blue hover:bg-natural-clay"}`}>
              Get Started
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

function FacebookIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function Footer() {
  return (
    <footer className="bg-surface-bright border-t border-natural-clay py-12">
      <div className="max-w-[1280px] mx-auto px-4 md:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-xl font-bold tracking-tight text-primary">irugle</Link>
            <p className="text-on-surface-variant text-sm mt-4 leading-relaxed max-w-xs">
              Rwanda&apos;s travel and hospitality platform. Find homes, restaurants, and experiences across the country.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold text-ink-blue mb-4 uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2">
              {["Explore Homes", "Restaurants", "Experiences"].map((item) => (
                <li key={item}><Link href="#" className="text-on-surface-variant hover:text-primary transition-colors text-sm">{item}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-ink-blue mb-4 uppercase tracking-wider">Company</h4>
            <ul className="space-y-2">
              {["About Us", "Partner with Us", "FAQ"].map((item) => (
                <li key={item}><Link href="#" className="text-on-surface-variant hover:text-primary transition-colors text-sm">{item}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-ink-blue mb-4 uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2">
              {["Privacy Policy", "Terms of Service", "Contact"].map((item) => (
                <li key={item}><Link href="#" className="text-on-surface-variant hover:text-primary transition-colors text-sm">{item}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="pt-6 border-t border-natural-clay flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-on-surface-variant text-xs">&copy; 2024 Rwanda Premier Travel & Hospitality Platform. All rights reserved.</p>
          <div className="flex gap-3">
            <a href="#" className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-ink-blue hover:bg-primary hover:text-white transition-all" aria-label="Facebook">
              <FacebookIcon />
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-ink-blue hover:bg-primary hover:text-white transition-all" aria-label="X">
              <XIcon />
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-ink-blue hover:bg-primary hover:text-white transition-all" aria-label="Instagram">
              <InstagramIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function MobileNav() {
  const items = [
    { label: "Explore", icon: "search", active: true },
    { label: "Favorites", icon: "heart" },
    { label: "Sign In", icon: "user" },
    { label: "Menu", icon: "menu" },
  ];
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-outline-variant z-50 flex items-center justify-around h-16">
      {items.map((item) => (
        <Link key={item.label} href="/" className={`flex flex-col items-center gap-0.5 ${item.active ? "text-primary" : "text-on-surface-variant"}`}>
          {item.icon === "search" && (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
          {item.icon === "heart" && (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          )}
          {item.icon === "user" && (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          )}
          {item.icon === "menu" && (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
          <span className="text-[10px] leading-none">{item.label}</span>
        </Link>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TrendingDestinations />
        <BentoGrid />
        <Highlights />
        <Restaurants />
        <Experiences />
        <Pricing />
        <Footer />
      </main>
      <MobileNav />
    </>
  );
}
