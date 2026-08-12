"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  registerSchema,
  TRegisterInput,
} from "@/src/shared/config/authSchemas";
import ShowButton from "@/src/shared/ui/ShowButton";

export default function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TRegisterInput>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: TRegisterInput) => {
    setServerError("");

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const result = await res.json();
      setServerError(result.error || "Не удалось зарегистрироваться");
      return;
    }

    const signInResult = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (signInResult?.error) {
      router.push("/login");
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  };

  return (
    <div className="mt-8 flex w-full flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-stone-900">
          Создайте аккаунт
        </h1>
        <p className="mt-1 text-sm text-stone-500">
          Это займёт меньше минуты — и вы сможете записаться к врачу
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <label
            htmlFor="register-name"
            className="mb-1.5 block text-sm font-medium text-stone-700"
          >
            Имя
          </label>
          <input
            {...register("name")}
            id="register-name"
            type="text"
            placeholder="Как к вам обращаться"
            className="w-full rounded-lg border border-stone-300 px-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="register-email"
            className="mb-1.5 block text-sm font-medium text-stone-700"
          >
            Email
          </label>
          <input
            {...register("email")}
            id="register-email"
            type="email"
            placeholder="you@example.com"
            className="w-full rounded-lg border border-stone-300 px-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="register-password"
            className="mb-1.5 block text-sm font-medium text-stone-700"
          >
            Пароль
          </label>
          <div className="relative">
            <input
              {...register("password")}
              id="register-password"
              type={showPassword ? "text" : "password"}
              placeholder="Минимум 6 символов"
              className="w-full rounded-lg border border-stone-300 px-4 py-2.5 pr-11 text-sm text-stone-900 placeholder:text-stone-400 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
            />
            <ShowButton isShow={showPassword} set={setShowPassword} />
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        {serverError && <p className="text-sm text-red-600">{serverError}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary mt-2 rounded-lg px-4 py-2.5 text-sm disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Регистрация..." : "Зарегистрироваться"}
        </button>
      </form>
    </div>
  );
}
