"use client";

import { signOut } from "next-auth/react";

export function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="btn-ghost rounded-lg px-2.5 py-1.5 text-sm"
    >
      Выйти
    </button>
  );
}
