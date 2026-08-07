"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Field, Input } from "@/components/ui/Field";
import { login, type LoginState } from "./actions";

export function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, {});
  const [email, setEmail] = useState("paul@ironline.test");
  const [password, setPassword] = useState("buildscope");

  return (
    <div>
      <form action={action} className="flex flex-col gap-8">
        <Field label="Email" refCode="ID">
          <Input
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
          />
        </Field>
        <Field label="Password" refCode="KEY" error={state.error}>
          <Input
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field>
        <Button type="submit" variant="primary" marked size="lg" block disabled={pending}>
          {pending ? "Verifying…" : "Sign in"}
        </Button>
      </form>

      <p className="mt-10 text-[12px] leading-relaxed text-steel">
        Demo: sign in once, then use the <span className="text-carbon">GC / SubC</span> toggle
        in the top right to switch roles. Password{" "}
        <span className="font-mono text-carbon">buildscope</span>.
      </p>
    </div>
  );
}
