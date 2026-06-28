import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const user = await prisma.user.findUnique({ where: { email: "admin@irugle.com" } });
    if (!user) {
      return Response.json({ error: "user not found" });
    }
    const passwordValid = user.hashedPassword
      ? await bcrypt.compare("test1234", user.hashedPassword)
      : false;
    return Response.json({
      found: true,
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      hasPassword: !!user.hashedPassword,
      passwordValid,
    });
  } catch (e: any) {
    return Response.json({ error: e.message, stack: e.stack });
  }
}
