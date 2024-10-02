export interface debounceInterface {
  value: string;
  delay: number;
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
  Bidang_nama: string;
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
  createdAt: string;
}

export interface TermConditionUpdateInterface {
  desc: string;
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
  slug: string;
  jabatan: string;
  image: string;
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
  tipedata:
    | "text"
    | "number"
    | "radio"
    | "checkbox"
    | "date"
    | "textarea"
    | "string";
  isrequired: any;
  options?: OptionType[];
}