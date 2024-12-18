"use client";

import Cookies from "js-cookie";
import {
  AboutUsVisionMisionUpdateInterface,
  AreasCreateInterface,
  FaqsCreateInterface,
  LoginUserInterface,
  NewsCreateInterface,
  NewUserInterface,
  ServiceCreateInterface,
  TermConditionUpdateInterface,
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

//get all roles
export const getAllRoles = async () => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/role/get`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  return await response.json();
};

//get all account managing roles
export const getAccountManagingRoles = async (
  page: number,
  limit: number,
  search: string
) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    // `${process.env.NEXT_PUBLIC_API_URL}/user/info/get?page=${page}&limit=${limit}`,
    `${process.env.NEXT_PUBLIC_API_URL}/admin/get?page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  return await response.json();
};
export const getAccountUser = async (
  page: number,
  limit: number,
  search: string
) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/info/get?page=${page}&limit=${limit}&search=${search}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  return await response.json();
};

// post register user
export const postRegisterCreate = async (data: any) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    cache: "no-store",
  });

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

// get NIP Data
export const getNIPData = async (
  page: number,
  limit: number,
  search: string
) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/info/admin/nip/get?page=${page}&limit=${limit}&search=${search}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  return await response.json();
};

// post NIP Data
export const postNIPData = async (data: any) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/info/admin/nip/create`,
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

// update NIP Data
export const updateNIPData = async (data: any, id: number) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/info/admin/nip/update/${id}`,
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

// post NIP Data Import
export const postNIPDataImport = async (formData: FormData) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/info/import/excel`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
      cache: "no-store",
    }
  );

  return await response.json();
};

// get areas / bidang
export const getAreas = async (
  page?: number,
  limit?: number,
  search?: string
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/bidang/get?page=${page}&limit=${limit}&search=${search}`,
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
export const updateAreas = async (data: AreasCreateInterface, slug: string) => {
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
export const getService = async (
  page?: number,
  limit?: number,
  search?: string
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/layanan/get?page=${page}&limit=${limit}&search=${search}`,
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
export const getNews = async (page: number, limit: number, search: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/berita/get?page=${page}&limit=${limit}&search=${search}`,
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
export const getBKDGalleryActivities = async (
  page: number,
  limit: number,
  search: string
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/galeri/get?page=${page}&limit=${limit}&search=${search}`,
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
export const getAboutVisionMision = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/bkd/profile/get`,
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
export const updateAboutVisionMision = async (id: number, data: any) => {
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

// get logo
export const getLogo = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/bkd/profile/get`,
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
export const updateLogo = async (id: number, data: any) => {
  const token = Cookies.get("Authorization");

  const formData = new FormData();

  formData.append("logo", data.logo);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/bkd/profile/update/${id}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
      cache: "no-store",
    }
  );

  return await response.json();
};

// get struktur organisasi
export const getStructureOrganizations = async (
  page?: number,
  limit?: number,
  search?: string,
  status?: number
) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/bkd/struktur/get?page=${page}&limit=${limit}&search=${search}&${status != undefined && `status=${status}`}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  return await response.json();
};

// delete struktur organisasi Inti
export const deleteStructureOrganizationsMain = async (id: number) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/selected/struktur/delete/${id}`,
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

// delete struktur organisasi
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

// update struktur organisasi
export const updateStructureOrganizations = async (data: any, slug: string) => {
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

// get faqs
export const getFaqs = async (page: number, limit: number, search: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/faq/get?page=${page}&limit=${limit}&search=${search}`,
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

// post faqs
export const postFaqs = async (data: FaqsCreateInterface) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/faq/create`,
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

// delete faqs
export const deleteFaqs = async (id: number) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/faq/delete/${id}`,
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

// update faqs
export const updateFaqs = async (id: number, data: FaqsCreateInterface) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/faq/update/${id}`,
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

// update term and condition
export const updateTermConditions = async (
  data: TermConditionUpdateInterface
) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/term-condition/update`,
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

// post carousel slider
export const postCarouselSliders = async (data: any) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/banner/create`,
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

// delete carousel slider
export const deleteCarouselSliders = async (id: number) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/banner/delete/${id}`,
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

// update carousel slider
export const updateCarouselSliders = async (id: number, data: any) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/banner/update/${id}`,
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

// get manual books
export const getManualBooks = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/manual/book/get`,
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

// update manual books
export const updateManualBooks = async (data: FormData, id: number) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/manual/book/update/${id}`,
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

// get regulation
export const getRegulations = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/regulasi/get`,
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

// create regulation
export const createRegulations = async (formData: FormData) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/regulasi/create`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
      cache: "no-store",
    }
  );

  return await response.json();
};

// update regulation
export const updateRegulations = async (formData: FormData, id: number) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/regulasi/update/${id}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
      cache: "no-store",
    }
  );

  return await response.json();
};

// delete regulation
export const deleteRegulations = async (id: number) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/regulasi/delete/${id}`,
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

// get user complaint
export const getUserComplaints = async (
  page: number,
  limit: number,
  search?: string,
  start_date?: string,
  end_date?: string,
  status?: number,
  month?: number,
  bidang_id?: number
) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/pengaduan/get?page=${page}&limit=${limit}&search=${search}&start_date=${start_date}&end_date=${end_date}&${status != undefined && `status=${status}`}&month=${month}&${bidang_id != undefined && `bidang_id=${bidang_id}`}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  return await response.json();
};

// get user complaint
export const getUserComplaintDetail = async (id: number) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/pengaduan/get/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  return await response.json();
};

// update user complaint history
export const updateUserComplaint = async (data: any, id: number) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/pengaduan/update/${id}`,
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

// update location maps
export const updateLocationMaps = async (
  id: number,
  data: {
    long: string;
    lang: string;
  }
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

// get struktur organisasi inti
export const getStructureOrganizationsMain = async (
  page?: number,
  limit?: number,
  search?: string
) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/selected/struktur/get?page=${page}&limit=${limit}&search=${search}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  return await response.json();
};

// post struktur organisasi inti
export const postStructureOrganizationsMain = async (data: any) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/selected/struktur/create`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-store",
    }
  );

  return await response.json();
};

// create servicr form multi
export const serviceRequirementStep2 = async (data: any) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/layanan/form/createmulti`,
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

// get application user histories
export const getApplicationUserHistories = async (
  page: number,
  limit: number,
  status?: number | number[],
  search?: string,
  start_date?: string,
  end_date?: string,
  month?: number,
  year?: string,
  layanan_id?: number,
  bidang_id?: number
) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/history/form?page=${page}&limit=${limit}&${status && `status=${status}`}&search=${search}&start_date=${start_date}&end_date=${end_date}&month=${month}&year=${year}&layanan_id=${layanan_id}&bidang_id=${bidang_id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  return await response.json();
};

// get user application history detail
export const getUserApplicationHistoryDetail = async (id: number) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/input/form/detail/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  return await response.json();
};

// update user application history detail
export const updateUserApplicationHistoryDetail = async (
  data: any,
  id: number
) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/input/form/updatestatus/${id}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-store",
    }
  );

  return await response.json();
};

// get Indeks Kepuasan
export const getSatisfactionIndexHistoryReportDetail = async (
  id: number,
  page?: number,
  limit?: number,
  start_date?: string,
  end_date?: string
) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/history/feedback/${id}?page=${page}&limit=${limit}&start_date=${start_date}&end_date=${end_date}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  return await response.json();
};

// get Indeks Kepuasan
export const getVerificationReportingsDetail = async (
  page?: number,
  limit?: number,
  start_date?: string,
  end_date?: string,
  layanan_id?: number
) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/history/form?page=${page}&limit=${limit}&start_date=${start_date}&end_date=${end_date}&layanan_id=${layanan_id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  return await response.json();
};

// update output Letter
export const updateOutputLetter = async (data: any, id: number) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/edit/surat/${id}`,
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

// get dashboard super admin
// year?: number,
//   search?: string,
//   instansi_id?: number,
//   start_date?: string,
//   end_date?: string
// ?year=${year}&search=${search}&instansi_id=${instansi_id}&start_date=${start_date}&end_date=${end_date}
export const getSuperAdminDashboard = async () => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/dashboard/superadmin`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  return await response.json();
};

// get dashboard admin verification
export const getAdminVerificationDashboard = async () => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/dashboard/admin/verifikasi`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  return await response.json();
};

// get dashboard kepala bidang
export const getHeadOfDivisionDashboard = async () => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/dashboard/kepala/bidang`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  return await response.json();
};

// get dashboard department scretary
export const getDepartmentSecretaryDashboard = async () => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/dashboard/sekretaris/dinas`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  return await response.json();
};

// get dashboard department head
export const getDepartmentHeadDashboard = async () => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/dashboard/kepala/dinas`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  return await response.json();
};

// get dashboard regional secreatry
export const getRegionalSecretaryDashboard = async () => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/dashboard/sekretaris/daerah`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  return await response.json();
};

// get golongan/pangkat
export const getAllGrade = async (limit: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/pangkat/get?limit=${limit}`,
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

// get satisfaction index report
export const getSatisfactionIndexReport = async (
  page: number,
  limit: number,
  layanan_id?: number,
  search?: string,
  bidang_id?: number
) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/history/feedback?page=${page}&limit=${limit}&${layanan_id && `layanan_id=${layanan_id}`}&search=${search}&${bidang_id != undefined || (bidang_id != null && `bidang_id=${bidang_id}`)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  return await response.json();
};

// get reporting History
export const getReportHistories = async (
  page?: number,
  limit?: number,
  search?: string,
  start_date?: string,
  end_date?: string,
  layanan_id?: number
) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/layanan/report/get?page=${page}&limit=${limit}&search=${search}&start_date=${start_date}&end_date=${end_date}&${layanan_id && `layanan_id=${layanan_id}`}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  return await response.json();
};

// get reporting History Detail
export const getReportHistoryDetail = async (page: number, limit: number) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/history/form?page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  return await response.json();
};

// get Application history output
export const getApplicationDocumentOutput = async (id: number) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/${id}/surat`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  return await response.blob();
};

// get setting message
export const getSettingMessage = async (id: number) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/detail/surat/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  return await response.json();
};

// get Detail output letter
export const getOutputLetterDetail = async (id: number) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/pdf/${id}/surat`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  return await response.json();
};

// update signature letter
export const updateSignatureLetterApplication = async (
  formData: FormData,
  id: number
) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/form/${id}/signing`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
      cache: "no-store",
    }
  );

  return await response.json();
};

// get Application history output
export const getDownloadApplicationPrint = async (
  start_date?: string,
  end_date?: string,
  year?: string,
  month?: number,
  layanan_id?: number | undefined
) =>
  // bidang_id?: number,
  // layanan_id?: number,
  // search?: string,
  // start_date?: string,
  // end_date?: string
  {
    const token = Cookies.get("Authorization");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/document/print/application/get?start_date=${start_date}&end_date=${end_date}&year=${year}&month=${month}&${!layanan_id ? `layanan_id=${layanan_id}` : ""}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    return await response.blob();
  };

// get staff bkd output print
export const getDownloadStaffBkdPrint = async () =>
  // bidang_id?: number,
  // layanan_id?: number,
  // search?: string,
  // start_date?: string,
  // end_date?: string
  {
    const token = Cookies.get("Authorization");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/document/print/staff-bkd/get`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    return await response.blob();
  };

// get indeks kepuasan detail output print
export const getDownloadSatisfactionIndexPrint = async (id: number) =>
  // bidang_id?: number,
  // layanan_id?: number,
  // search?: string,
  // start_date?: string,
  // end_date?: string
  {
    const token = Cookies.get("Authorization");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/document/print/satisfaction-index/${id}/get`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    return await response.blob();
  };

// get user complaint output print
export const getDownloadUserComplaintPrint = async () =>
  // bidang_id?: number,
  // layanan_id?: number,
  // search?: string,
  // start_date?: string,
  // end_date?: string
  {
    const token = Cookies.get("Authorization");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/document/print/user-complaint/get`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    return await response.blob();
  };

// get bkd struktur
export const getBKDStructure = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/struktur/file/get`,
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

// create bkd struktur
export const createBKDStructure = async (formData: FormData) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/struktur/file/create`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
      cache: "no-store",
    }
  );

  return await response.json();
};

// update bkd struktur
export const updateBKDStructure = async (formData: FormData, id: number) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/struktur/file/update/${id}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
      cache: "no-store",
    }
  );

  return await response.json();
};

// delete bkd struktur
export const deleteBKDStructure = async (id: number) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/struktur/file/delete/${id}`,
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

// get Application history output
export const getDownloadApplicationExcelPrint = async (
  start_date?: string,
  end_date?: string,
  year?: string,
  month?: number,
  layanan_id?: number | undefined
) =>
  // bidang_id?: number,
  // layanan_id?: number,
  // search?: string,
  // start_date?: string,
  // end_date?: string
  {
    const token = Cookies.get("Authorization");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/document/excel/print/application/get?start_date=${start_date}&end_date=${end_date}&year=${year}&month=${month}&${!layanan_id ? `layanan_id=${layanan_id}` : ""}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    return await response.blob();
  };

// get staff bkd output print excel
export const getDownloadStaffBkdExcelPrint = async () =>
  // bidang_id?: number,
  // layanan_id?: number,
  // search?: string,
  // start_date?: string,
  // end_date?: string
  {
    const token = Cookies.get("Authorization");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/document/excel/print/staff-bkd/get`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    return await response.blob();
  };

// get user complaint output excel print
export const getDownloadUserComplaintExcelPrint = async () =>
  // bidang_id?: number,
  // layanan_id?: number,
  // search?: string,
  // start_date?: string,
  // end_date?: string
  {
    const token = Cookies.get("Authorization");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/document/excel/print/user-complaint/get`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    return await response.blob();
  };

// get indeks kepuasan detail output excel print
export const getDownloadSatisfactionIndexExcelPrint = async (id: number) =>
  // bidang_id?: number,
  // layanan_id?: number,
  // search?: string,
  // start_date?: string,
  // end_date?: string
  {
    const token = Cookies.get("Authorization");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/document/excel/print/satisfaction-index/${id}/get`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    return await response.blob();
  };

// form detail
export const getFormByService = async (serviceId: number) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/layanan/form/${serviceId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  return await response.json();
};

// form detail doc
export const getFormDocByService = async (serviceId: number) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/layanan/docs/${serviceId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  return await response.json();
};

// delete item form
export const deleteFormDetailServiceRequirment = async (serviceId: number) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/layanan/form/delete/${serviceId}`,
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

// delete item form doc
export const deleteDocDetailServiceRequirment = async (serviceId: number) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/layanan/form/delete/${serviceId}`,
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

// update signature barcode
export const SignatureBarcode = async (id: number) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/form/${id}/barcode`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  return await response.json();
};

// form detail
export const getSignatureBarcode = async (id: number) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/form/${id}/barcode/get`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  return await response.json();
};

// update Password User / Reset Password User
export const updateUserPasswordByAdmin = async (data: any, slug: string) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/change/password/by/admin/${slug}`,
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

  return response;
};
