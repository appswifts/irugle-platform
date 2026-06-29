"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createListing, updateListing } from "./actions";

const productTypes = [
  { value: "ROOM", label: "Room", emoji: "🛏️" },
  { value: "TOUR_PACKAGE", label: "Tour Package", emoji: "🏔️" },
  { value: "ACTIVITY", label: "Activity", emoji: "🎯" },
  { value: "TABLE", label: "Restaurant Table", emoji: "🍽️" },
  { value: "GUIDE_SERVICE", label: "Guide Service", emoji: "🧭" },
];

export function ListingForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const [type, setType] = useState(initialData?.type || "");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const fd = new FormData(form);

    try {
      const action = initialData ? updateListing : createListing;
      await action(fd);
      router.push("/dashboard/listings");
      router.refresh();
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {initialData && <input type="hidden" name="id" value={initialData.id} />}

      <div>
        <label className="block text-sm font-semibold text-ink-blue mb-3">Listing Type</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {productTypes.map((pt) => (
            <button
              key={pt.value}
              type="button"
              onClick={() => setType(pt.value)}
              className={`p-4 rounded-xl border text-left transition-all ${
                type === pt.value
                  ? "border-primary bg-primary-fixed/20 ring-1 ring-primary"
                  : "border-natural-clay hover:border-primary/40"
              }`}
            >
              <span className="text-xl">{pt.emoji}</span>
              <p className="text-sm font-medium text-ink-blue mt-1">{pt.label}</p>
            </button>
          ))}
        </div>
        <input type="hidden" name="type" value={type} />
      </div>

      {type && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-ink-blue mb-1.5">Listing Name</label>
              <input
                name="name"
                defaultValue={initialData?.name || ""}
                required
                className="w-full border border-natural-clay rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="e.g. Deluxe King Room, 3-Day Gorilla Trek"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-ink-blue mb-1.5">Description</label>
              <textarea
                name="description"
                defaultValue={initialData?.description || ""}
                rows={4}
                className="w-full border border-natural-clay rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                placeholder="Describe what you're offering..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-ink-blue mb-1.5">Price</label>
              <input
                name="price"
                type="number"
                step="0.01"
                defaultValue={initialData?.price || ""}
                required
                className="w-full border border-natural-clay rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-ink-blue mb-1.5">Currency</label>
              <select
                name="currency"
                defaultValue={initialData?.currency || "RWF"}
                className="w-full border border-natural-clay rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option value="RWF">RWF (Rwandan Franc)</option>
                <option value="USD">USD (US Dollar)</option>
                <option value="EUR">EUR (Euro)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-ink-blue mb-1.5">Max Guests</label>
              <input
                name="maxGuests"
                type="number"
                defaultValue={initialData?.maxGuests || ""}
                className="w-full border border-natural-clay rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="e.g. 2"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-ink-blue mb-1.5">Duration (hours)</label>
              <input
                name="durationHours"
                type="number"
                defaultValue={initialData?.durationHours || ""}
                className="w-full border border-natural-clay rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="e.g. 8"
              />
            </div>
          </div>

          {/* Type-specific fields */}
          {type === "ROOM" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-ink-blue mb-1.5">Beds</label>
                <input name="beds" type="number" className="w-full border border-natural-clay rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="e.g. 1" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-ink-blue mb-1.5">Room Size (m²)</label>
                <input name="roomSize" type="number" step="0.1" className="w-full border border-natural-clay rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="e.g. 35" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-ink-blue mb-1.5">Amenities (comma separated)</label>
                <input name="amenities" className="w-full border border-natural-clay rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="WiFi, AC, Breakfast, Mini Bar" />
              </div>
            </div>
          )}

          {type === "TOUR_PACKAGE" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-ink-blue mb-1.5">Itinerary</label>
                <textarea name="itinerary" rows={3} className="w-full border border-natural-clay rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none" placeholder="Day 1: ...&#10;Day 2: ..." />
              </div>
              <div>
                <label className="block text-sm font-semibold text-ink-blue mb-1.5">Includes (comma separated)</label>
                <input name="includes" className="w-full border border-natural-clay rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="Transport, Guide, Meals" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-ink-blue mb-1.5">Languages (comma separated)</label>
                <input name="languages" className="w-full border border-natural-clay rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="English, French, Kinyarwanda" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-ink-blue mb-1.5">Difficulty</label>
                <select name="difficulty" className="w-full border border-natural-clay rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                  <option value="">Select...</option>
                  <option value="easy">Easy</option>
                  <option value="moderate">Moderate</option>
                  <option value="challenging">Challenging</option>
                </select>
              </div>
            </div>
          )}

          {type === "ACTIVITY" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-ink-blue mb-1.5">Difficulty</label>
                <select name="difficulty" className="w-full border border-natural-clay rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                  <option value="">Select...</option>
                  <option value="easy">Easy</option>
                  <option value="moderate">Moderate</option>
                  <option value="challenging">Challenging</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-ink-blue mb-1.5">What to Bring (comma separated)</label>
                <input name="whatToBring" className="w-full border border-natural-clay rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="Hiking shoes, Water, Camera" />
              </div>
            </div>
          )}

          {type === "TABLE" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-ink-blue mb-1.5">Cuisine</label>
                <input name="cuisine" className="w-full border border-natural-clay rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="e.g. Italian, Rwandan" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-ink-blue mb-1.5">Meal Type</label>
                <select name="mealType" className="w-full border border-natural-clay rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                  <option value="">Select...</option>
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="all_day">All Day</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-ink-blue mb-1.5">Seating Capacity</label>
                <input name="seatingCapacity" type="number" className="w-full border border-natural-clay rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="e.g. 4" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-ink-blue mb-1.5">Image URLs (one per line)</label>
            <textarea
              name="images"
              rows={3}
              className="w-full border border-natural-clay rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none font-mono"
              placeholder="https://example.com/photo1.jpg&#10;https://example.com/photo2.jpg"
            />
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-outline-variant">
            <button
              type="submit"
              disabled={submitting}
              className="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-all disabled:opacity-50"
            >
              {submitting ? "Saving..." : initialData ? "Update Listing" : "Create Listing"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="text-on-surface-variant text-sm font-medium hover:text-ink-blue transition-colors"
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </form>
  );
}
