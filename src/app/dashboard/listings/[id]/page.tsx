import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { ListingForm } from "../listing-form";

export default async function EditListingPage(
  props: { params: Promise<{ id: string }> }
) {
  const { id } = await props.params;
  const session = await auth();
  if (!session?.user) redirect("/auth/signin");

  const provider = await prisma.provider.findUnique({ where: { userId: session.user.id } });
  if (!provider) redirect("/dashboard");

  const product = await prisma.product.findUnique({ where: { id } });
  if (!product || product.providerId !== provider.id) notFound();

  return (
    <div className="p-6 lg:p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-[32px] leading-[40px] tracking-tight font-bold text-ink-blue">Edit Listing</h1>
        <p className="text-on-surface-variant mt-1">{product.name}</p>
      </div>
      <div className="bg-white border border-natural-clay rounded-xl p-6 lg:p-8">
        <ListingForm initialData={product} />
      </div>
    </div>
  );
}
