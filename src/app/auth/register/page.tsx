"use client";

import { useActionState } from "react";
import { register } from "./actions";
import Link from "next/link";

export default function RegisterPage() {
  const [state, formAction, pending] = useActionState(register, undefined);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold text-primary">irugle</Link>
          <h1 className="text-xl font-semibold text-gray-900 mt-6">Create account</h1>
          <p className="text-sm text-gray-500 mt-1">Sign up with email</p>
        </div>

        <form action={formAction} className="bg-white rounded-xl border p-6 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
            <input id="name" name="name" type="text" required className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input id="email" name="email" type="email" required className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input id="password" name="password" type="password" required minLength={6} className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
          </div>

          {state?.error && <p className="text-sm text-red-600">{state.error}</p>}

          <button disabled={pending} className="w-full bg-primary text-white rounded-lg px-4 py-2.5 text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-opacity">
            {pending ? "Creating account..." : "Create account"}
          </button>

          <p className="text-center text-sm text-gray-500">
            Already have an account? <Link href="/auth/signin" className="text-primary font-medium hover:underline">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
