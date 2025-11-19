import { z } from "zod";

export const SignInSchema = z.object({
  email: z
    .string()
    .min(1, { error: "Email is required" })
    .email("Invalid email address."),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(50, "Password cannot exceed 50 characters."),
});

export const SignUpSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters.")
    .max(30, "Username must be at most 30 characters.")
    .regex(/^[a-zA-Z0-9_]+$/, {
      error: "Username can only contain letters, numbers, and underscores.",
    }),

  name: z
    .string()
    .min(1, { error: "Name is required" })
    .max(50, "Name cannot exceed 50 characters.")
    .regex(/^[a-zA-Z\s]+$/, {
      error: "Name can only contain letters and spaces.",
    }),

  email: z
    .string()
    .min(1, { error: "Email is required" })
    .email("Invalid email address."),

  password: z
    .string()
    .min(6, { error: "Password must be at least 6 characters." })
    .max(50, { error: "Password cannot exceed 50 characters." })
    .regex(/[A-Z]/, {
      error: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      error: "Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, { error: "Password must contain at least one number." })
    .regex(/[^A-Za-z0-9]/, {
      error: "Password must contain at least one special character.",
    }),
});
