"use client";

import profilePicture from "@/../../public/assets/images/foto-profile.jpg";
import { DotIcon, HomeIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BuildingApartment } from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import { getAreas, getServiceByAreas, getUserProfile } from "@/services/api";
import {
  AdminProfileInterface,
  AreasInterface,
  ServiceInterface,
} from "@/types/interface";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { masterDataSupers } from "@/constants/main";

export default function DashBoardSidebarPages() {
  const router = useRouter();
  const pathName = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const limitItem = 10;
  const [activeAccordionValue, setActiveAccordionValue] = useState("account");
  const [user, setUser] = useState<AdminProfileInterface>();
  const [areas, setAreas] = useState<AreasInterface[]>([]);
  const [services, setServices] = useState<ServiceInterface[]>();
  const [serviceId, setServiceId] = useState<number | null>(null);

  useEffect(() => {
    const token = Cookies.get("Authorization");

    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const fetchUserProfile = async () => {
    try {
      const response = await getUserProfile();
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <section className="flex flex-col w-10/12 md:w-[28%] h-full justify-center items-center fixed">
      <div className="w-full h-screen flex flex-col">
        {!isMobile && (
          <div className="w-full h-[8%] flex flex-row items-center justify-center gap-x-3 bg-primary-40">
            <BuildingApartment className="w-7 h-7 text-line-10" />

            <h3 className="text-line-10 text-xl">Instansi BKD</h3>
          </div>
        )}

        <div className="w-full flex flex-col py-5 verticalScroll gap-y-5 h-full border bg-white shadow-md border-line-20">
          <Link
            href={"/"}
            className="w-full flex flex-row items-center cursor-pointer px-4 gap-x-3">
            <HomeIcon className="w-5 h-5 text-black-80" />

            <p className="text-[16px] text-black-80">Dashboard</p>
          </Link>

          {/* render Super Admin */}
          <div className="w-full flex flex-col">
            <Accordion
              className="w-full flex flex-col gap-y-4"
              type="single"
              collapsible
              value={activeAccordionValue}
              onValueChange={(value) => {
                setActiveAccordionValue(value);
              }}>
              <AccordionItem
                className="w-full border-none flex flex-col"
                value={`item-1`}>
                <AccordionTrigger
                  // onClick={() => setServiceId(area.id)}
                  className="px-4 py-2 bg-white font-normal text-neutral-700 text-sm text-start h-[50px] md:h-full pr-4">
                  <div className="w-full flex flex-row items-center gap-x-2">
                    <p className="text-black-80 text-[16px]">Data Master</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="md:text-start pb-0 text-justify w-full h-full">
                  <div className="w-full flex flex-col">
                    {masterDataSupers &&
                      masterDataSupers?.length > 0 &&
                      masterDataSupers?.map(
                        (master: { id: number; name: string }, i: number) => {
                          let linking;

                          switch (master?.name) {
                            case "Bidang":
                              linking = "/super-admin/master-data/areas";
                              break;
                            case "Layanan":
                              linking = "/super-admin/master-data/services";
                              break;
                            case "Persyaratan Layanan":
                              linking =
                                "/super-admin/master-data/service-requirements";
                              break;
                            case "Berita":
                              linking = "/super-admin/master-data/news";
                              break;
                            case "Foto Kegiatan":
                              linking =
                                "/super-admin/master-data/bkd-gallery-activities";
                              break;
                            case "Tentang, Visi, & Misi":
                              linking =
                                "/super-admin/master-data/about-us-vision-mission";
                              break;
                            case "Struktur Organisasi":
                              linking =
                                "/super-admin/master-data/structure-organization";
                              break;
                            case "FAQ":
                              linking = "/super-admin/master-data/faqs";
                              break;
                            case "Syarat dan Ketentuan":
                              linking =
                                "/super-admin/master-data/terms-and-conditions";
                              break;
                            case "Manual Book":
                              linking = "/super-admin/master-data/manual-book";
                              break;
                            case "Logo":
                              linking = "/super-admin/master-data/logo";
                              break;
                            case "Carousel - Slider":
                              linking =
                                "/super-admin/master-data/carousel-slider";
                              break;
                            case "Lokasi - Maps":
                              linking =
                                "/super-admin/master-data/location-maps";
                              break;
                            default:
                              break;
                          }

                          return (
                            <Link
                              key={i}
                              href={`${linking}`}
                              className={`w-full py-2 flex items-center justify-center bg-line-10 bg-opacity-50 text-black-80`}>
                              <div className="w-10/12 flex flex-row items-center gap-x-2">
                                <DotIcon className={`w-5 h-5 text-black-80`} />
                                <p>{master?.name}</p>
                              </div>
                            </Link>
                          );
                        }
                      )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="w-full flex flex-col items-center justify-center">
            <div className="w-11/12 h-[1px] bg-line-50"></div>
          </div>

          {user && (
            <Link
              href={"/user-profile"}
              className="w-full flex flex-row gap-x-3 px-4">
              <div className="w-3/12 h-full">
                <Image
                  src={profilePicture}
                  alt="Profile-Picture"
                  width={1000}
                  height={1000}
                  className="w-16 h-16 rounded-full"
                />
              </div>

              <div className="w-full flex flex-col justify-center gap-y-1">
                <h5 className="text-black-80 text-[16px]">
                  {user && user?.role_name}
                </h5>

                <p className="text-black-40 text-sm">Bandar Lampung</p>
              </div>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
