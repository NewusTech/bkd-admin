import { LargeNumberLike } from "crypto";
import React from "react";
import { ZodStringCheck } from "zod";

export interface debounceInterface {
  value: string;
  delay: number;
}

export interface JwtPayload {
  role?: string;
  bidang_id?: number;
}

export interface PaginationInterface {
  page: number;
  perPage: number;
  totalPages: number;
  totalCount: number;
  // links: {
  //   prev: string | null;
  //   next: string | null;
  // };
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface SubDistrictInterface {
  id: number;
  nama: string;
}

export interface VillageInterface {
  id: number;
  nama: string;
}

export interface AdminProfileInterface {
  id: number;
  slug: number;
  nik: string;
  email: string;
  telepon: string;
  rt: number;
  rw: number;
  alamat: string;
  agama: string;
  tempat_lahir: string;
  tgl_lahir: string;
  gender: string;
  goldar: string;
  role_id: number;
  role_name: string;
  jabatans: [];
  pangkats: [];
  pendidikans: [];
  createdAt: string;
}

export interface NewUserInterface {
  name: string;
  nip: string;
  email: string;
  telepon: string;
  password: string;
  kecamatan_id: string;
  desa_id: string;
  rt: string;
  rw: string;
  alamat: string;
  role_id: number;
}

export interface LoginUserInterface {
  nip: string;
  password: string;
}

export interface PaginationInterface {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

// export interface SearchInterface {
//   search: string;
//   change: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   props: any;
// }

export interface RolesInterface {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface AreasInterface {
  id: number;
  nama: string;
  slug: string;
  desc: string;
  pj: string;
  nip_pj: string;
  createdAt: string;
  jmlLayanan: number;
}

export interface AccountManagingRolesInterface {
  id: number;
  user_id: number;
  name: string;
  slug: string;
  nip: string;
  nik: string;
  email: string;
  telepon: string;
  kecamatan_id: number;
  desa_id: number;
  rt: number;
  rw: number;
  alamat: string;
  agama: string;
  tempat_lahir: string;
  tgl_lahir: string;
  gender: string;
  goldar: string;
  createdAt: string;
  updatedAt: string;
  Role: string;
  Bidang: string;
}

export interface AreasCreateInterface {
  nama: string;
  desc: string;
  pj: string;
  nip_pj: string;
}

export interface OutputServiceInterface {
  status: number;
  message: string;
  data: ServiceInterface[];
  bidang: AreasInterface;
}

export interface ServiceInterface {
  id: number;
  nama: string;
  slug: string;
  desc: string;
  penanggung_jawab: string;
  syarat: string;
  ketentuan: string;
  langkah: string;
  bidang_id: number;
  createdAt: string;
  Bidang_name: string;
}

export interface ServiceCreateInterface {
  nama: string;
  desc: string;
  penanggung_jawab: string;
  syarat: string;
  ketentuan: string;
  langkah: string;
  bidang_id: string;
}

export interface TermConditionInterface {
  id: number;
  desc: string;
  privacy_policy: string;
  createdAt: string;
}

export interface TermConditionUpdateInterface {
  desc: string;
  privacy_policy: string;
}

export interface NewsInterface {
  id: number;
  title: string;
  slug: string;
  desc: string;
  image: string;
  createdAt: string;
}

export interface NewsCreateInterface {
  title: string;
  slug: string;
  desc: string;
  image: string;
}

export interface BKDGalleryActivitiesInterface {
  id: number;
  title: string;
  slug: string;
  image: string;
  createdAt: string;
}

export interface AboutUsVisionMisionInterface {
  id: number;
  about_bkd: string;
  visi: string;
  misi: string;
  kontak: string;
  long: string;
  lang: string;
  createdAt: string;
}

export interface AboutVisionMisionInterface {
  id: number;
  about_bkd: string;
  visi: string;
  misi: string;
  kontak: string;
  createdAt: string;
  logo: string;
  image_bkd: string;
}

export interface ManualBooksInterfaceInterface {
  id: number;
  title: string;
  dokumen: string;
  role_id: string;
  createdAt: string;
  updatedAt: string;
}

export interface AboutUsVisionMisionUpdateInterface {
  about_bkd: string;
  visi: string;
  misi: string;
  kontak: string;
  long: string;
  lang: string;
}

export interface StructureOrganizationInterface {
  id: number;
  nama: string;
  nip: string;
  slug: string;
  jabatan: string;
  image: string;
  golongan: string;
  status: number;
  bidang_id: number;
  createdAt: string;
  updatedAt: string;
}

export interface StructureOrganizationInterfaceMain {
  bkdstruktur_id: number;
  createdAt: string;
  image: string;
  jabatan: string;
  nama: string;
  select_id: number;
  slug: string;
  updatedAt: string;
}

export interface FaqsInterface {
  id: number;
  question: string;
  answer: string;
  createdAt: string;
}

export interface FaqsInterface {
  id: number;
  question: string;
  answer: string;
  createdAt: string;
}

export interface FaqsCreateInterface {
  question: string;
  answer: string;
}

export interface CarouselSliderInterface {
  id: number;
  image: string;
  image_potrait: string;
  createdAt: string;
}

export interface AdminApplicationHistoryInterface {
  startDate: Date;
  setStartDate: (e: Date | undefined) => void;
  endDate: Date;
  setEndDate: (e: Date | undefined) => void;
  search: string;
  setSearch: (e: string) => void;
}

export interface RegulationInterface {
  id: number;
  title: string;
  file: string;
  createdAt: string;
  updatedAt: string;
}

export interface UploadBKDInterface {
  id: number;
  title: string;
  file: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserComplaintInterface {
  id: number;
  bidang_id: number;
  layanan_id: number;
  userinfo_id: number;
  status: number;
  isi_pengaduan: string;
  judul_pengaduan: string;
  jawaban: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  Layanan: {
    id: number;
    nama: string;
  };
  Bidang: {
    id: number;
    nama: string;
  };
  User_info: {
    id: number;
    name: string;
    nip: string;
  };
}

export interface CardStepProps {
  isLastStep: boolean;
  isActive: boolean;
  desk: string;
  isCompleted: boolean;
}

export interface OptionType {
  id: number;
  key: string;
}

export interface CardType {
  id?: any;
  toggle?: boolean;
  field: string;
  tipedata: "text" | "textarea" | "number" | "radio" | "checkbox" | "date";
  isrequired: any;
  options?: OptionType[];
}

export interface CardTypeFile {
  id?: any;
  toggle?: boolean;
  field: string;
  tipedata: "file";
  isrequired?: string;
}

export interface UserApplicationHistoryInterface {
  id: number;
  admin_updated: string;
  bidang_id: number;
  bidang_name: string;
  createdAt: string;
  fileoutput: string;
  layanan_id: number;
  layanan_name: string;
  name: string;
  nip: string;
  no_request: string;
  pesan: string;
  status: number;
  tgl_selesai: string;
  updatedAt: string;
  userinfo_id: number;
}

export interface UserApplicationHistoryAreaInterface {
  id: number;
  nama: string;
  desc: string;
}

export interface UserApplicationHistoryServiceInterface {
  id: number;
  nama: string;
  desc: string;
  Bidang: UserApplicationHistoryAreaInterface;
}

export interface UserApplicationHistoryUserInfoSubDIstrictInterface {
  id: number;
  nama: string;
}

export interface UserApplicationHistoryUserInfoVillageInterface {
  id: number;
  nama: string;
}

export interface UserApplicationHistoryUserInfoInterface {
  id: number;
  name: string;
  nip: string;
  nik: string;
  slug: string;
  email: string;
  telepon: string;
  image_profile: string;
  kecamatan_id: number;
  desa_id: number;
  rt: string;
  rw: string;
  alamat: string;
  agama: string;
  tempat_lahir: string;
  tgl_lahir: string;
  gender: string;
  goldar: string;
  user_id: number;
  createdAt: string;
  updatedAt: string;
  Desa: UserApplicationHistoryUserInfoVillageInterface;
  Kecamatan: UserApplicationHistoryUserInfoSubDIstrictInterface;
}

export interface UserApplicationHistoryFormServiceInputJsonDataInterface {
  id: number;
  key: string;
}

export interface UserApplicationHistoryFormServiceInputInterface {
  id: number;
  data: string;
  layananform_id: number;
  layananformnum_id: number;
  layananform_name: string;
  layananform_datajson: UserApplicationHistoryFormServiceInputJsonDataInterface[];
  layananform_tipedata: string;
  data_key: string[];
}

export interface UserApplicationHistoryDetailInterface {
  id: number;
  no_request: string;
  layanan_id: number;
  layanan: UserApplicationHistoryServiceInterface;
  tgl_selesai: string;
  userinfo_id: number;
  userinfo: UserApplicationHistoryUserInfoInterface;
  admin_updated: string;
  createdAt: string;
  updatedAt: string;
  Layanan_form_inputs: UserApplicationHistoryFormServiceInputInterface[];
  status: number;
  fileoutput: string;
  pesan: string;
}

export interface UserApplicationActionsInterface {
  id: number;
  name: string;
  isGlobalDialog: boolean;
  setIsGlobalDialog: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => Promise<void>;
  data: { status: number; pesan: string };
  setData: React.Dispatch<
    React.SetStateAction<{
      status: number;
      pesan: string;
    }>
  >;
  isGlobalLoading: boolean;
}

export interface SatisfactionHistoryInterface {
  id: number;
  userinfo_id: number;
  layanan_id: number;
  layanan_name: string;
  bidang_name: string;
  question_1: number;
  question_2: number;
  question_3: number;
  question_4: number;
  feedback: string;
  createdAt: string;
  updatedAt: string;
}

export interface SatisfactionIndexHistoryReportDetailInterface {
  id: number;
  name: string;
  nip: string;
  gender: string;
  date: string;
  kritiksaran: string;
  nilai: number;
}

export interface StatisVerificationReportingsDetailInterface {
  id: number;
  userinfo_id: number;
  name: string;
  nip: string;
  pesan: string;
  admin_updated: StatisVerificationReportingsDetailInterfaceAdminUpdate;
  status: number;
  tgl_selesai: string;
  fileoutput: string;
  no_request: string;
  layanan_id: number;
  layanan_name: string;
  bidang_id: number;
  bidang_name: string;
  createdAt: string;
  updatedAt: string;
}

export interface StatisVerificationReportingsDetailInterfaceAdminUpdate {
  id: number;
  name: string;
  nip: string;
}

export interface SatisfactionIndexHistoryReportInterface {
  id: number;
  layanan_id: number;
  layanan_name: string;
  bidang_name: string;
  total_feedback: number;
  average_nilai: number;
  created_at: string;
}

export interface SuperAdminDashboardMonthInterface {
  month: string;
  permohonanCount: number;
}

export interface SuperAdminDashboardAreasInterface {
  id: number;
  name: string;
  permohonan_count: number;
}

export interface VericationAdminInterface {
  LayananId: number;
  LayananName: string;
  LayananformnumCount: number;
}

export interface SuperAdminDashboardServiceInterface {
  id: number;
  bidang_id: number;
  bidang_name: string;
  layanan_createdAt: string;
  layanan_name: string;
  permohonanCount: number;
}

export interface VerificationAdminAreasDataInterface {
  id: number;
  desc: string;
  nama: string;
}

export interface SuperAdminDashboardInterface {
  permohonanCount: number;
  monthlyCounts: SuperAdminDashboardMonthInterface[];
  countbyBidang: SuperAdminDashboardAreasInterface[];
  layananByBidang: [];
  countbyLayanan: SuperAdminDashboardServiceInterface[];
  allLayananMonth: VericationAdminInterface[];
  databidang: VerificationAdminAreasDataInterface[];
  totalMenungguVerifikasi: number;
  totalMenunggu: number;
  totalDisetujui: number;
  totalDitolak: number;
  totalDirevisi: number;
  totalKeseluruhanPermohonan: number;
}

export interface GradeInterface {
  id: number;
  nama: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReportDataInterface {
  id: number;
  nama: string;
  slug: string;
  selesai: number;
  gagal: number;
}

export interface ReportInterface {
  report: ReportDataInterface[];
  total_selesai: number;
  total_gagal: number;
}

export interface SettingMessageServiceInterface {
  id: number;
  nama_pj: string;
  nip_pj: string;
  jabatan_pj: string;
  pangkat_pj: string;
  unitkerja_pj: string;
  layanan_id: number;
  header: string;
  body: string;
  footer: string;
  nomor: string;
  perihal: string;
  catatan: string;
  tembusan: string;
  createdAt: string;
  updatedAt: string;
}

export interface SettingServiceInterface {
  id: number;
  nama: string;
  pj: string;
  nip_pj: string;
}

export interface SuperAdminSettingInterface {
  id: number;
  nama: string;
  Bidang: SettingServiceInterface;
  Layanan_surat: SettingMessageServiceInterface;
}

export interface OutputLetterDetailServiceInterface {
  id: number;
  bidang_id: number;
  createdAt: string;
  deletedAt: string;
  desc: string;
  ketentuan: string;
  langkah: string;
  nama: string;
  penanggung_jawab: string;
  slug: string;
  syarat: string;
  updatedAt: string;
}

export interface OutputLetterDetailInterface {
  Layanan: OutputLetterDetailServiceInterface;
  fileoutput: ZodStringCheck;
  id: LargeNumberLike;
}
