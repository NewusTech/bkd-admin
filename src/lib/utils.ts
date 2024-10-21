import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const formatDateString = (date: string) => {
  const bulanIndonesia = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const tanggal = new Date(date);

  const hari = tanggal.getDate();
  const bulan = bulanIndonesia[tanggal.getMonth()];
  const tahun = tanggal.getFullYear();

  return `${hari} ${bulan} ${tahun}`;
};

export function formatToWIB(dateString: string): string {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    console.log("Invalid date string");
  }

  const wibOffset = 7 * 60 * 60 * 1000;

  const wibTime = new Date(date.getTime() + wibOffset);

  const hours = wibTime.getUTCHours().toString().padStart(2, "0");
  const minutes = wibTime.getUTCMinutes().toString().padStart(2, "0");

  return `${hours}.${minutes} WIB`;
}

export function truncateTitle(title: string, maxLength = 35) {
  if (title.length > maxLength) {
    return title.slice(0, maxLength) + "...";
  } else {
    return title;
  }
}
