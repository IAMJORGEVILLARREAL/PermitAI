"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/lib/db";
import { verifyPassword } from "@/lib/auth/password";
import { createSession, destroySession } from "@/lib/auth/session";
import { isGcRole } from "@/lib/domain";

const schema = z.object({
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(1, "Enter your password."),
});

export type LoginState = { error?: string };

export async function login(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const parsed = schema.safeParse({
    email: String(formData.get("email") ?? "").trim().toLowerCase(),
    password: String(formData.get("password") ?? ""),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid credentials." };
  }

  const user = await db.user.findUnique({ where: { email: parsed.data.email } });

  // Same message either way — never reveal whether an account exists.
  if (!user || !verifyPassword(parsed.data.password, user.passwordHash)) {
    return { error: "Email or password is incorrect." };
  }

  await createSession(user.id);
  await db.auditEvent.create({
    data: {
      orgId: user.orgId,
      userId: user.id,
      action: "AUTH_LOGIN",
      entityType: "User",
      entityId: user.id,
    },
  });

  redirect(isGcRole(user.role) ? "/projects" : "/work");
}

export async function logout() {
  await destroySession();
  redirect("/login");
}
