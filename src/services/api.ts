"use client";

import Cookies from "js-cookie";
import {
  AboutUsVisionMisionUpdateInterface,
  AreasCreateInterface,
  LoginUserInterface,
  NewsCreateInterface,
  NewUserInterface,
  ServiceCreateInterface,
} from "@/types/interface";

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

// post areas / bidang
export const postAreas = async (data: AreasCreateInterface) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/bidang/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      cache: "no-store",
    }
  );

  return await response.json();
};

// delete areas / bidang
export const deleteAreas = async (slug: string) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/bidang/delete/${slug}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  return await response.json();
};

// PUT areas / bidang
export const updateAreas = async (slug: string, data: AreasCreateInterface) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/bidang/update/${slug}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
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

// get detail area by service
export const getService = async (limit: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/layanan/get?limit=${limit}`,
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

export const postCreateService = async (data: ServiceCreateInterface) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/layanan/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      cache: "no-store",
    }
  );

  return await response.json();
};

// delete service
export const deleteService = async (id: number) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/layanan/delete/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  return await response.json();
};

// PUT services
export const updateService = async (
  id: number,
  data: ServiceCreateInterface
) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/layanan/update/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      cache: "no-store",
    }
  );

  return await response.json();
};

// get news / berita
export const getNews = async (limit: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/berita/get?limit=${limit}`,
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

// post news / berita
export const postCreateNews = async (data: any) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/berita/create`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
      cache: "no-store",
    }
  );

  return await response.json();
};

// delete news / berita
export const deleteNews = async (slug: string) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/berita/delete/${slug}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  return await response.json();
};

// update news / berita
export const updateNews = async (slug: string, data: any) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/berita/update/${slug}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
      cache: "no-store",
    }
  );

  return await response.json();
};

// get bkd gallery activities
export const getBKDGalleryActivities = async (limit: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/galeri/get?limit=${limit}`,
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

// post bkd gallery activities
export const postCreateBKDGalleryActivities = async (data: any) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/galeri/create`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
      cache: "no-store",
    }
  );

  return await response.json();
};

// delete bkd gallery activities
export const deleteBKDGalleryActivities = async (slug: string) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/galeri/delete/${slug}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  return await response.json();
};

// update bkd gallery activities
export const updateBKDGalleryActivities = async (slug: string, data: any) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/galeri/update/${slug}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
      cache: "no-store",
    }
  );

  return await response.json();
};

// get bkd about visi misi
export const getAboutVisionMision = async (limit: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/bkd/profile/get?limit=${limit}`,
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

// update about visi misi
export const updateAboutVisionMision = async (
  id: number,
  data: AboutUsVisionMisionUpdateInterface
) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/bkd/profile/update/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      cache: "no-store",
    }
  );

  return await response.json();
};

// get struktur organisasi
export const getStructureOrganizations = async (limit: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/bkd/struktur/get?limit=${limit}`,
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

// post struktur organisasi
export const postStructureOrganizations = async (data: any) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/bkd/struktur/create`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
      cache: "no-store",
    }
  );

  return await response.json();
};

// delete bkd gallery activities
export const deleteStructureOrganizations = async (slug: string) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/bkd/struktur/delete/${slug}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  return await response.json();
};

// update bkd gallery activities
export const updateStructureOrganizations = async (slug: string, data: any) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/bkd/struktur/update/${slug}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
      cache: "no-store",
    }
  );

  return await response.json();
};
