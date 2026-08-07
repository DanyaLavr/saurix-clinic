import z from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Минимум 2 символа"),
  email: z.email("Некорректный email"),
  password: z.string().min(6, "Минимум 6 символов"),
});
export type TRegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.email("Некорректный email"),
  password: z.string().min(1, "Введите пароль"),
});
export type TLoginInput = z.infer<typeof loginSchema>;
