import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signIn } from "@/lib/auth";

export async function GET() {
  try {
    const user = await prisma.user.findUnique({ where: { email: "admin@irugle.com" } });
    if (!user) {
      return Response.json({ error: "user not found" });
    }
    const passwordValid = user.hashedPassword
      ? await bcrypt.compare("test1234", user.hashedPassword)
      : false;

    let signInResult: any = "not tested";
    try {
      signInResult = await signIn("credentials", {
        email: "admin@irugle.com",
        password: "test1234",
        redirect: false,
      });
    } catch (e: any) {
      signInResult = { threw: true, message: e?.message, type: e?.type, digest: e?.digest };
    }

    return Response.json({
      user: {
        found: true,
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        hasPassword: !!user.hashedPassword,
        passwordValid,
      },
      signInResult,
    });
  } catch (e: any) {
    return Response.json({ error: e.message, stack: e.stack });
  }
}
