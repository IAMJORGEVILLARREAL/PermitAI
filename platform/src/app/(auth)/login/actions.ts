"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createSession, destroySession } from "@/lib/auth/session";

const schema = z.object({
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(1, "Enter your password."),
});

export type LoginState = { error?: string };

const DEMO_PASSWORD = "buildscope";

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

  // Demo gate — any email + shared password. Role switching is in-app.
  if (parsed.data.password !== DEMO_PASSWORD) {
    return { error: "Email or password is incorrect." };
  }

  await createSession();
  redirect("/projects");
}

export async function logout() {
  await destroySession();
  redirect("/login");
}
