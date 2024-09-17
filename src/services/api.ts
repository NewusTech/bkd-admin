"use client";

import Cookies from "js-cookie";
import { LoginUserInterface, NewUserInterface } from "@/types/interface";

// get user profile
export const getUserProfile = async () => {
  const token = Cookies.get("Authorization");

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/get`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  return await response.json();
};

// get all subDistrict
export const getAllSubDistrict = async (limit: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/kecamatan/get?limit=${limit}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  return await response.json();
};

//get all village
export const getAllVillage = async (kecamatan_id: number, limit: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/desa/get?kecamatan_id=${kecamatan_id}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  return await response.json();
};

// post login user
export const postLoginUser = async (data: LoginUserInterface) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    cache: "no-store",
  });

  return await response.json();
};

// get term and condition
export const getTermConditions = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/term-condition/get`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  return await response.json();
};

// get Faqs
export const getFaqs = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/faq/get`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  return await response.json();
};

// get carousel slider
export const getCarouselSliders = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/banner/get`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  return await response.json();
};

// get gallery image activities
export const getGalleryImageActivities = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/galeri/get`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  return await response.json();
};

// get service
export const getServices = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/layanan/get`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  return await response.json();
};

// get areas / bidang
export const getAreas = async (limit: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/bidang/get?limit=${limit}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  return await response.json();
};

// get detail area by service
export const getServiceByAreas = async (bidang_id: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/layanan/bidang/get/${bidang_id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  return await response.json();
};
