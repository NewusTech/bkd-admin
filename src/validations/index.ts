"use client";

import { z } from "zod";

export const schemaLoginAdmin = z.object({
  nip: z
    .string({ message: "NIP tidak boleh kosong!" })
    .min(5, { message: "NIP minimal 6 karakter" })
    .max(32, { message: "NIP maksimal 32 karakter" }),
  password: z
    .string({ message: "Kata sandi tidak boleh kosong!" })
    .min(6, { message: "Kata sandi minimal 6 karakter" })
    .max(32, { message: "Kata sandi maksimal 32 karakter" }),
});

export const schemaAreaData = z.object({
  nama: z
    .string({ message: "Nama tidak boleh kosong!" })
    .min(3, { message: "Bidang minimal 3 karakter" }),
  desc: z
    .string({ message: "Deskripsi tidak boleh kosong!" })
    .min(3, { message: "Deskripsi minimal 3 karakter" }),
  pj: z
    .string({ message: "Penanggung jawab tidak boleh kosong!" })
    .min(3, { message: "Penanggung jawab minimal 3 karakter" }),
  nip_pj: z
    .string({ message: "NIP penanggung jawab tidak boleh kosong!" })
    .length(18, { message: "NIP penanggung jawab harus 18 karakter" }),
});

export const schemaServiceData = z.object({
  nama: z
    .string({ message: "Nama tidak boleh kosong!" })
    .min(3, { message: "Bidang minimal 3 karakter" }),
  desc: z
    .string({ message: "Deskripsi tidak boleh kosong!" })
    .min(3, { message: "Deskripsi minimal 3 karakter" }),
  penanggung_jawab: z
    .string({ message: "Penanggung jawab tidak boleh kosong!" })
    .min(3, { message: "Penanggung jawab minimal 3 karakter" }),
  syarat: z
    .string({ message: "Syarat tidak boleh kosong!" })
    .min(3, { message: "Syarat minimal 3 karakter" }),
  ketentuan: z
    .string({ message: "Ketentuan tidak boleh kosong!" })
    .min(3, { message: "Ketentuan minimal 3 karakter" }),
  langkah: z
    .string({ message: "Langkah tidak boleh kosong!" })
    .min(3, { message: "Langkah minimal 3 karakter" }),
});

export const schemaNewsData = z.object({
  title: z
    .string({ message: "Judul tidak boleh kosong!" })
    .min(3, { message: "Judul minimal 3 karakter" }),
  desc: z
    .string({ message: "Deskripsi tidak boleh kosong!" })
    .min(3, { message: "Deskripsi minimal 3 karakter" }),
});

export const schemaGalleryData = z.object({
  title: z
    .string({ message: "Judul tidak boleh kosong!" })
    .min(3, { message: "Judul minimal 3 karakter" }),
});

export const schemaNIPData = z.object({
  nip: z
    .string({ message: "NIP tidak boleh kosong!" })
    .length(18, { message: "Panjang NIP Harus 18 karakter" }),
});

export const schemaFaqData = z.object({
  question: z
    .string({ message: "Pertanyaan tidak boleh kosong!" })
    .min(3, { message: "Pertanyaan minimal 3 karakter" }),
  answer: z
    .string({ message: "Jawaban tidak boleh kosong!" })
    .min(3, { message: "Jawaban minimal 3 karakter" }),
});

export const schemaStaffData = z.object({
  nama: z
    .string({ message: "Nama tidak boleh kosong!" })
    .min(3, { message: "Nama minimal 3 karakter" }),
  jabatan: z
    .string({ message: "Jabatan tidak boleh kosong!" })
    .min(3, { message: "Jabatan minimal 3 karakter" }),
  golongan: z.string({ message: "Golongan tidak boleh kosong!" }),
  nip: z
    .string({ message: "NIP tidak boleh kosong!" })
    .length(18, { message: "NIP harus 18 karakter" }),
  bidang_id: z.number({ message: "Bidang tidak boleh kosong!" }),
  status: z.number({ message: "Status tidak boleh kosong!" }),
});

export const schemaRoleData = z.object({
  bidang_id: z.number({ message: "Bidang tidak boleh kosong!" }),
  role_id: z.number({ message: "Role tidak boleh kosong!" }),
  name: z
    .string({ message: "Nama tidak boleh kosong!" })
    .min(3, { message: "Nama minimal 3 karakter" }),
  nip: z
    .string({ message: "NIP tidak boleh kosong!" })
    .length(18, { message: "NIP harus 18 karakter" }),
  email: z
    .string({ message: "Email tidak boleh kosong!" })
    .email({ message: "Email tidak valid!" }),
  password: z
    .string({ message: "Password tidak boleh kosong!" })
    .min(6, { message: "Password minimal 6 karakter" }),
});
