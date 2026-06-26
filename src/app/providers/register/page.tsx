import { redirect } from "next/navigation";
import { registerProviderAction } from "@/server/actions/register-provider.action";
import { countries } from "@/config/countries";

export default function ProviderRegisterPage() {
  return (
    <main className="mx-auto max-w-lg px-4 py-12">
      <h1 className="text-2xl font-bold">List Your Property</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Join Irugle and let travelers discover your business. Free for the first 3 months.
      </p>

      <form action={registerProviderAction} className="mt-8 space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Business Name
          </label>
          <input id="name" name="name" required className="mt-1 w-full rounded-lg border px-4 py-2.5 text-sm" />
        </div>

        <div>
          <label htmlFor="country" className="block text-sm font-medium">
            Country
          </label>
          <select id="country" name="country" required className="mt-1 w-full rounded-lg border px-4 py-2.5 text-sm">
            <option value="">Select country</option>
            {Object.values(countries).map((c) => (
              <option key={c.code} value={c.code}>{c.flag} {c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium">
            Business Type
          </label>
          <select id="type" name="type" required className="mt-1 w-full rounded-lg border px-4 py-2.5 text-sm">
            <option value="">Select type</option>
            <option value="HOTEL">Hotel</option>
            <option value="LODGE">Lodge</option>
            <option value="GUEST_HOUSE">Guest House / B&B</option>
            <option value="APARTMENT">Apartment / Vacation Rental</option>
            <option value="TOUR_OPERATOR">Tour Operator</option>
            <option value="TOUR_GUIDE">Tour Guide</option>
            <option value="RESTAURANT">Restaurant</option>
            <option value="EXPERIENCE">Experience / Activity</option>
          </select>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input id="email" name="email" type="email" required className="mt-1 w-full rounded-lg border px-4 py-2.5 text-sm" />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium">
            Phone
          </label>
          <input id="phone" name="phone" type="tel" className="mt-1 w-full rounded-lg border px-4 py-2.5 text-sm" />
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-medium">
            City
          </label>
          <input id="city" name="city" required className="mt-1 w-full rounded-lg border px-4 py-2.5 text-sm" />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium">
            Address
          </label>
          <input id="address" name="address" className="mt-1 w-full rounded-lg border px-4 py-2.5 text-sm" />
        </div>

        <div>
          <label htmlFor="licenseNo" className="block text-sm font-medium">
            License Number (if applicable)
          </label>
          <input id="licenseNo" name="licenseNo" className="mt-1 w-full rounded-lg border px-4 py-2.5 text-sm" />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium">
            Description
          </label>
          <textarea id="description" name="description" rows={3} className="mt-1 w-full rounded-lg border px-4 py-2.5 text-sm" />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground hover:opacity-90"
        >
          Register Property
        </button>
      </form>
    </main>
  );
}
