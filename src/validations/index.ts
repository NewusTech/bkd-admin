"use client";

import { z } from "zod";

export const schemaLoginAdmin = z.object({
  nip: z
    .string({ message: "NIP tidak boleh kosong!" })
    .min(6, { message: "NIP minimal 6 karakter" })
    .max(32, { message: "NIP maksimal 32 karakter" }),
  password: z
    .string({ message: "Kata sandi tidak boleh kosong!" })
    .min(6, { message: "Kata sandi minimal 6 karakter" })
    .max(32, { message: "Kata sandi maksimal 32 karakter" }),
});
