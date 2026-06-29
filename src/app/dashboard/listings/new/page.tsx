import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ListingForm } from "../listing-form";

export default async function NewListingPage() {
  const session = await auth();
  const provider = await prisma.provider.findUnique({ where: { userId: session!.user.id } });

  return (
    <div className="p-6 lg:p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-[32px] leading-[40px] tracking-tight font-bold text-ink-blue">Add Listing</h1>
        <p className="text-on-surface-variant mt-1">Create a new listing for {provider!.name}</p>
      </div>
      <div className="bg-white border border-natural-clay rounded-xl p-6 lg:p-8">
        <ListingForm />
      </div>
    </div>
  );
}
