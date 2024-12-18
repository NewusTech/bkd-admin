"use client";

import profilePicture from "@/../../public/assets/images/foto-profile.jpg";
import { DotIcon, HomeIcon, Loader, LogOut } from "lucide-react";
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
import {
  AccountManagement,
  adminBars,
  areasHeadBars,
  masterDataAreasHeads,
  masterDataSupers,
  SatisfactionIndexs,
} from "@/constants/main";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";

export default function DashBoardSidebarPages() {
  const router = useRouter();
  const pathName = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const limitItem = 10;
  const [isLoadingOut, setIsLoadingOut] = useState(false);
  const [activeAccordionValue, setActiveAccordionValue] = useState("");
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

  const handleLogout = () => {
    setIsLoadingOut(true);
    setTimeout(() => {
      setIsLoadingOut(false);
      Cookies.remove("Authorization");
      Swal.fire({
        icon: "success",
        title: "Berhasil logout, silahkan login kembali!",
        timer: 2000,
        showConfirmButton: false,
        position: "center",
      });
      router.push("/login");
    }, 1000);
  };

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
    <section className="flex flex-col w-10/12 md:w-[23%] h-full justify-center items-center fixed">
      <div className="w-full h-screen flex flex-col">
        {!isMobile && (
          <div className="w-full h-[8%] flex flex-row items-center justify-center gap-x-3 bg-primary-40">
            <BuildingApartment className="w-7 h-7 text-line-10" />

            <h3 className="text-line-10 text-xl">SIPADU BKD</h3>
          </div>
        )}

        <div className="w-full flex flex-col py-5 verticalScroll gap-y-5 h-full border bg-line-10 shadow-md border-line-20">
          <Link
            href={"/"}
            className={`${pathName === "/" ? "bg-primary-40 group bg-opacity-20" : ""} hover:pl-5 ease-in-out duration-300 animate-in py-3 w-full flex flex-row items-center cursor-pointer px-4 gap-x-3`}
          >
            <HomeIcon className="w-5 h-5 text-black-80 group-hover:text-primary-40" />

            <p className="text-[14px] md:text-[16px] text-black-80 group-hover:text-primary-40">
              Dashboard
            </p>
          </Link>

          {/* render verification admin */}
          {user?.role_name && user?.role_name === "Admin Verifikasi" && (
            <>
              <div className="w-full flex flex-col">
                <Accordion
                  className="w-full flex flex-col gap-y-4"
                  type="single"
                  collapsible
                  value={activeAccordionValue}
                  onValueChange={(value) => {
                    setActiveAccordionValue(value);
                  }}
                >
                  <AccordionItem
                    className="w-full border-none flex flex-col"
                    value={`item-1`}
                  >
                    <AccordionTrigger
                      className={`${pathName === "/verification-admin/verification-user-application-histories/verification-user-waiting-application-history" || pathName === "/verification-admin/verification-user-application-histories/verification-user-revision-application-history" ? "bg-primary-40 bg-opacity-20" : ""} px-4 py-3 font-normal text-neutral-700 text-sm text-start h-[50px] md:h-full pr-4`}
                    >
                      <div className="w-full flex flex-row items-center gap-x-2">
                        <p className="text-black-80 text-[14px] md:text-[16px]">
                          Riwayat Permohonan
                        </p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="md:text-start pb-0 text-justify w-full h-full">
                      <div className="w-full flex flex-col">
                        {adminBars &&
                          adminBars.length > 0 &&
                          adminBars?.map(
                            (bar: { id: number; name: string }, i: number) => {
                              const isWaitingPath =
                                bar.name === "Riwayat Pengajuan" &&
                                pathName ===
                                  "/verification-admin/verification-user-application-histories/verification-user-waiting-application-history";
                              const isRevisionPath =
                                bar.name !== "Riwayat Pengajuan" &&
                                pathName ===
                                  "/verification-admin/verification-user-application-histories/verification-user-revision-application-history";

                              return (
                                <Link
                                  key={i}
                                  href={`${
                                    bar.name === "Riwayat Pengajuan"
                                      ? "/verification-admin/verification-user-application-histories/verification-user-waiting-application-history"
                                      : "/verification-admin/verification-user-application-histories/verification-user-revision-application-history"
                                  }`}
                                  className={`w-full py-2 flex items-center justify-center bg-line-10 bg-opacity-50 text-black-80`}
                                >
                                  <div className="w-10/12 flex flex-row items-center gap-x-2">
                                    <DotIcon
                                      className={`w-5 h-5 ${
                                        isWaitingPath || isRevisionPath
                                          ? "text-primary-40"
                                          : "text-black-80"
                                      }`}
                                    />
                                    <p
                                      className={`text-[14px] md:text-[16px] ${
                                        isWaitingPath || isRevisionPath
                                          ? "text-primary-40"
                                          : "text-black-80"
                                      }`}
                                    >
                                      {bar.name}
                                    </p>
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

              <div className="w-full flex flex-col gap-y-4">
                <div
                  className={`${pathName === "/verification-admin/verification-user-complaint-history" ? "bg-primary-40 bg-opacity-20" : ""} w-full py-3`}
                >
                  <Link
                    href={
                      "/verification-admin/verification-user-complaint-history"
                    }
                    className={`w-full flex flex-row text-black-80 text-[14px] md:text-[16px] px-4`}
                  >
                    Pengaduan
                  </Link>
                </div>

                <div
                  className={`${pathName === "/verification-admin/verification-reportings" ? "bg-primary-40 bg-opacity-20" : ""} w-full py-3`}
                >
                  <Link
                    href={"/verification-admin/verification-reportings"}
                    className={`w-full flex flex-row text-black-80 text-[14px] md:text-[16px] px-4`}
                  >
                    Laporan
                  </Link>
                </div>

                <div
                  className={`${pathName === "/super-admin/application-history-lists" ? "bg-primary-40 bg-opacity-20" : ""} w-full py-3`}
                >
                  <Link
                    href={"/super-admin/application-history-lists"}
                    className={`w-full flex flex-row text-black-80 text-[14px] md:text-[16px] px-4`}
                  >
                    Daftar Permohonan
                  </Link>
                </div>

                <div
                  className={`${pathName === "/verification-admin/verification-satisfaction-index-history" ? "bg-primary-40 bg-opacity-20" : ""} w-full py-3`}
                >
                  <Link
                    href={
                      "/verification-admin/verification-satisfaction-index-history"
                    }
                    className={`w-full flex flex-row text-black-80 text-[14px] md:text-[16px] px-4`}
                  >
                    Indeks Kepuasan
                  </Link>
                </div>
              </div>
            </>
          )}

          {/* render areas head */}
          {user?.role_name && user?.role_name === "Kepala Bidang" && (
            <>
              <div className="w-full flex flex-col">
                <Accordion
                  className="w-full flex flex-col gap-y-4"
                  type="single"
                  collapsible
                  value={activeAccordionValue}
                  onValueChange={(value) => {
                    setActiveAccordionValue(value);
                  }}
                >
                  <AccordionItem
                    className="w-full border-none flex flex-col"
                    value={`item-1`}
                  >
                    <AccordionTrigger
                      className={`${pathName === "/verification-admin/verification-user-application-histories/verification-user-waiting-application-history" || pathName === "/verification-admin/verification-user-application-histories/verification-user-revision-application-history" ? "bg-primary-40 bg-opacity-20" : ""} px-4 py-3 font-normal text-neutral-700 text-sm text-start h-[50px] md:h-full pr-4`}
                    >
                      <div className="w-full flex flex-row items-center gap-x-2">
                        <p className="text-black-80 text-[14px] md:text-[16px]">
                          Riwayat Permohonan
                        </p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="md:text-start pb-0 text-justify w-full h-full">
                      <div className="w-full flex flex-col">
                        {adminBars &&
                          adminBars.length > 0 &&
                          adminBars?.map(
                            (bar: { id: number; name: string }, i: number) => {
                              const isWaitingPath =
                                bar.name === "Riwayat Pengajuan" &&
                                pathName ===
                                  "/verification-admin/verification-user-application-histories/verification-user-waiting-application-history";
                              const isRevisionPath =
                                bar.name !== "Riwayat Pengajuan" &&
                                pathName ===
                                  "/verification-admin/verification-user-application-histories/verification-user-revision-application-history";

                              return (
                                <Link
                                  key={i}
                                  href={`${
                                    bar.name === "Riwayat Pengajuan"
                                      ? "/verification-admin/verification-user-application-histories/verification-user-waiting-application-history"
                                      : "/verification-admin/verification-user-application-histories/verification-user-revision-application-history"
                                  }`}
                                  className={`w-full py-2 flex items-center justify-center bg-line-10 bg-opacity-50 text-black-80`}
                                >
                                  <div className="w-10/12 flex flex-row items-center gap-x-2">
                                    <DotIcon
                                      className={`w-5 h-5 ${
                                        isWaitingPath || isRevisionPath
                                          ? "text-primary-40"
                                          : "text-black-80"
                                      }`}
                                    />
                                    <p
                                      className={`text-[14px] md:text-[16px] ${
                                        isWaitingPath || isRevisionPath
                                          ? "text-primary-40"
                                          : "text-black-80"
                                      }`}
                                    >
                                      {bar.name}
                                    </p>
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

              <div className="w-full flex flex-col gap-y-4">
                <div
                  className={`${pathName === "/areas-head/head-manage-approvals" ? "bg-primary-40 bg-opacity-20" : ""} w-full py-3`}
                >
                  <Link
                    href={"/areas-head/head-manage-approvals"}
                    className={`w-full flex flex-row text-black-80 text-[14px] md:text-[16px] px-4`}
                  >
                    Kelola Persetujuan
                  </Link>
                </div>

                <div
                  className={`${pathName === "/verification-admin/verification-user-complaint-history" ? "bg-primary-40 bg-opacity-20" : ""} w-full py-3`}
                >
                  <Link
                    href={
                      "/verification-admin/verification-user-complaint-history"
                    }
                    className={`w-full flex flex-row text-black-80 text-[14px] md:text-[16px] px-4`}
                  >
                    Pengaduan
                  </Link>
                </div>

                <div
                  className={`${pathName === "/verification-admin/verification-reportings" ? "bg-primary-40 bg-opacity-20" : ""} w-full py-3`}
                >
                  <Link
                    href={"/verification-admin/verification-reportings"}
                    className={`w-full flex flex-row text-black-80 text-[14px] md:text-[16px] px-4`}
                  >
                    Laporan
                  </Link>
                </div>

                <div
                  className={`${pathName === "/super-admin/application-history-lists" ? "bg-primary-40 bg-opacity-20" : ""} w-full py-3`}
                >
                  <Link
                    href={"/super-admin/application-history-lists"}
                    className={`w-full flex flex-row text-black-80 text-[14px] md:text-[16px] px-4`}
                  >
                    Daftar Permohonan
                  </Link>
                </div>

                <div
                  className={`${pathName === "/verification-admin/verification-satisfaction-index-history" ? "bg-primary-40 bg-opacity-20" : ""} w-full py-3`}
                >
                  <Link
                    href={
                      "/verification-admin/verification-satisfaction-index-history"
                    }
                    className={`w-full flex flex-row text-black-80 text-[14px] md:text-[16px] px-4`}
                  >
                    Indeks Kepuasan
                  </Link>
                </div>
              </div>

              <div className="w-full flex flex-col">
                <Accordion
                  className="w-full flex flex-col gap-y-4"
                  type="single"
                  collapsible
                  value={activeAccordionValue}
                  onValueChange={(value) => {
                    setActiveAccordionValue(value);
                  }}
                >
                  <AccordionItem
                    className="w-full border-none flex flex-col"
                    value={`item-3`}
                  >
                    <AccordionTrigger
                      className={`${pathName === "/super-admin/master-data/areas" || pathName === "/super-admin/master-data/services" || pathName === "/super-admin/master-data/service-requirements" || pathName === "/super-admin/master-data/news" || pathName === "/super-admin/master-data/bkd-gallery-activities" || pathName === "/super-admin/master-data/about-us-vision-mission" || pathName === "/super-admin/master-data/structure-organization" || pathName === "/super-admin/master-data/structure-organization-main" || pathName === "/super-admin/master-data/faqs" || pathName === "/super-admin/master-data/terms-and-conditions" || pathName === "/super-admin/master-data/manual-book" || pathName === "/super-admin/master-data/logo" || pathName === "/super-admin/master-data/carousel-slider" || pathName === "/super-admin/master-data/location-maps" ? "bg-primary-40 bg-opacity-20 text-primary-40" : "text-black-80"} px-4 py-3 font-normal text-sm text-start h-[50px] md:h-full pr-4`}
                    >
                      <div className="w-full flex flex-row items-center gap-x-2">
                        <p className="text-[14px] md:text-[16px]">
                          Data Master
                        </p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="md:text-start pb-0 text-justify w-full h-full">
                      <div className="w-full flex flex-col">
                        {masterDataAreasHeads &&
                          masterDataAreasHeads?.length > 0 &&
                          masterDataAreasHeads?.map(
                            (
                              master: { id: number; name: string },
                              i: number
                            ) => {
                              let linking;

                              switch (master?.name) {
                                case "Layanan":
                                  linking = "/super-admin/master-data/services";
                                  break;
                                case "Persyaratan Layanan":
                                  linking =
                                    "/super-admin/master-data/service-requirements";
                                  break;
                                default:
                                  break;
                              }

                              return (
                                <Link
                                  key={i}
                                  href={`${linking}`}
                                  className={`${pathName === linking ? "text-primary-40" : "text-black-80"} w-full py-2 flex items-center justify-center bg-line-10 bg-opacity-50`}
                                >
                                  <div className="w-10/12 flex flex-row items-center gap-x-2">
                                    <DotIcon
                                      className={`w-5 h-5 ${pathName === linking ? "text-primary-40" : "text-black-80"}`}
                                    />
                                    <p className="text-[14px] md:text-[16px]">
                                      {master?.name}
                                    </p>
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

              <div className="w-full flex flex-col gap-y-3">
                <div
                  className={`${pathName === "/super-admin/settings" ? "bg-primary-40 bg-opacity-20" : ""} w-full py-3`}
                >
                  <Link
                    href={"/super-admin/settings"}
                    className={`w-full flex flex-row text-black-80 text-[14px] md:text-[16px] px-4`}
                  >
                    Pengaturan
                  </Link>
                </div>
              </div>
            </>
          )}

          {/* render department secretary */}
          {user?.role_name && user?.role_name === "Sekretaris Dinas" && (
            <>
              <div className="w-full flex flex-col">
                <Accordion
                  className="w-full flex flex-col gap-y-4"
                  type="single"
                  collapsible
                  value={activeAccordionValue}
                  onValueChange={(value) => {
                    setActiveAccordionValue(value);
                  }}
                >
                  <AccordionItem
                    className="w-full border-none flex flex-col"
                    value={`item-1`}
                  >
                    <AccordionTrigger
                      className={`${pathName === "/verification-admin/verification-user-application-histories/verification-user-waiting-application-history" || pathName === "/verification-admin/verification-user-application-histories/verification-user-revision-application-history" ? "bg-primary-40 bg-opacity-20" : ""} px-4 py-3 font-normal text-neutral-700 text-sm text-start h-[50px] md:h-full pr-4`}
                    >
                      <div className="w-full flex flex-row items-center gap-x-2">
                        <p className="text-black-80 text-[14px] md:text-[16px]">
                          Riwayat Permohonan
                        </p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="md:text-start pb-0 text-justify w-full h-full">
                      <div className="w-full flex flex-col">
                        {adminBars &&
                          adminBars.length > 0 &&
                          adminBars?.map(
                            (bar: { id: number; name: string }, i: number) => {
                              const isWaitingPath =
                                bar.name === "Riwayat Pengajuan" &&
                                pathName ===
                                  "/verification-admin/verification-user-application-histories/verification-user-waiting-application-history";
                              const isRevisionPath =
                                bar.name !== "Riwayat Pengajuan" &&
                                pathName ===
                                  "/verification-admin/verification-user-application-histories/verification-user-revision-application-history";

                              return (
                                <Link
                                  key={i}
                                  href={`${
                                    bar.name === "Riwayat Pengajuan"
                                      ? "/verification-admin/verification-user-application-histories/verification-user-waiting-application-history"
                                      : "/verification-admin/verification-user-application-histories/verification-user-revision-application-history"
                                  }`}
                                  className={`w-full py-2 flex items-center justify-center bg-line-10 bg-opacity-50 text-black-80`}
                                >
                                  <div className="w-10/12 flex flex-row items-center gap-x-2">
                                    <DotIcon
                                      className={`w-5 h-5 ${
                                        isWaitingPath || isRevisionPath
                                          ? "text-primary-40"
                                          : "text-black-80"
                                      }`}
                                    />
                                    <p
                                      className={`text-[14px] md:text-[16px] ${
                                        isWaitingPath || isRevisionPath
                                          ? "text-primary-40"
                                          : "text-black-80"
                                      }`}
                                    >
                                      {bar.name}
                                    </p>
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

              <div className="w-full flex flex-col gap-y-4">
                <div
                  className={`${pathName === "/areas-head/head-manage-approvals" ? "bg-primary-40 bg-opacity-20" : ""} w-full py-3`}
                >
                  <Link
                    href={"/areas-head/head-manage-approvals"}
                    className={`w-full flex flex-row text-black-80 text-[14px] md:text-[16px] px-4`}
                  >
                    Kelola Persetujuan
                  </Link>
                </div>

                <div
                  className={`${pathName === "/verification-admin/verification-user-complaint-history" ? "bg-primary-40 bg-opacity-20" : ""} w-full py-3`}
                >
                  <Link
                    href={
                      "/verification-admin/verification-user-complaint-history"
                    }
                    className={`w-full flex flex-row text-black-80 text-[14px] md:text-[16px] px-4`}
                  >
                    Pengaduan
                  </Link>
                </div>

                <div
                  className={`${pathName === "/verification-admin/verification-reportings" ? "bg-primary-40 bg-opacity-20" : ""} w-full py-3`}
                >
                  <Link
                    href={"/verification-admin/verification-reportings"}
                    className={`w-full flex flex-row text-black-80 text-[14px] md:text-[16px] px-4`}
                  >
                    Laporan
                  </Link>
                </div>

                <div
                  className={`${pathName === "/super-admin/application-history-lists" ? "bg-primary-40 bg-opacity-20" : ""} w-full py-3`}
                >
                  <Link
                    href={"/super-admin/application-history-lists"}
                    className={`w-full flex flex-row text-black-80 text-[14px] md:text-[16px] px-4`}
                  >
                    Daftar Permohonan
                  </Link>
                </div>

                <div
                  className={`${pathName === "/verification-admin/verification-satisfaction-index-history" ? "bg-primary-40 bg-opacity-20" : ""} w-full py-3`}
                >
                  <Link
                    href={
                      "/verification-admin/verification-satisfaction-index-history"
                    }
                    className={`w-full flex flex-row text-black-80 text-[14px] md:text-[16px] px-4`}
                  >
                    Indeks Kepuasan
                  </Link>
                </div>
              </div>
            </>
          )}

          {/* render department head */}
          {user?.role_name && user?.role_name === "Kepala Dinas" && (
            <>
              <div className="w-full flex flex-col">
                <Accordion
                  className="w-full flex flex-col gap-y-4"
                  type="single"
                  collapsible
                  value={activeAccordionValue}
                  onValueChange={(value) => {
                    setActiveAccordionValue(value);
                  }}
                >
                  <AccordionItem
                    className="w-full border-none flex flex-col"
                    value={`item-1`}
                  >
                    <AccordionTrigger
                      className={`${pathName === "/verification-admin/verification-user-application-histories/verification-user-waiting-application-history" || pathName === "/verification-admin/verification-user-application-histories/verification-user-revision-application-history" ? "bg-primary-40 bg-opacity-20" : ""} px-4 py-3 font-normal text-neutral-700 text-sm text-start h-[50px] md:h-full pr-4`}
                    >
                      <div className="w-full flex flex-row items-center gap-x-2">
                        <p className="text-black-80 text-[14px] md:text-[16px]">
                          Riwayat Permohonan
                        </p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="md:text-start pb-0 text-justify w-full h-full">
                      <div className="w-full flex flex-col">
                        {adminBars &&
                          adminBars.length > 0 &&
                          adminBars?.map(
                            (bar: { id: number; name: string }, i: number) => {
                              const isWaitingPath =
                                bar.name === "Riwayat Pengajuan" &&
                                pathName ===
                                  "/verification-admin/verification-user-application-histories/verification-user-waiting-application-history";
                              const isRevisionPath =
                                bar.name !== "Riwayat Pengajuan" &&
                                pathName ===
                                  "/verification-admin/verification-user-application-histories/verification-user-revision-application-history";

                              return (
                                <Link
                                  key={i}
                                  href={`${
                                    bar.name === "Riwayat Pengajuan"
                                      ? "/verification-admin/verification-user-application-histories/verification-user-waiting-application-history"
                                      : "/verification-admin/verification-user-application-histories/verification-user-revision-application-history"
                                  }`}
                                  className={`w-full py-2 flex items-center justify-center bg-line-10 bg-opacity-50 text-black-80`}
                                >
                                  <div className="w-10/12 flex flex-row items-center gap-x-2">
                                    <DotIcon
                                      className={`w-5 h-5 ${
                                        isWaitingPath || isRevisionPath
                                          ? "text-primary-40"
                                          : "text-black-80"
                                      }`}
                                    />
                                    <p
                                      className={`text-[14px] md:text-[16px] ${
                                        isWaitingPath || isRevisionPath
                                          ? "text-primary-40"
                                          : "text-black-80"
                                      }`}
                                    >
                                      {bar.name}
                                    </p>
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

              <div className="w-full flex flex-col gap-y-4">
                <div
                  className={`${pathName === "/department-secretary/department-signature-validation" || pathName === "/department-secretary/department-signature-validation/department-signature-validation-detail" || pathName === "/department-secretary/department-signature-validation/department-signature-validation-upload" ? "bg-primary-40 bg-opacity-20" : ""} w-full py-3`}
                >
                  <Link
                    href={
                      "/department-secretary/department-signature-validation"
                    }
                    className={`w-full flex flex-row text-black-80 text-[14px] md:text-[16px] px-4`}
                  >
                    Pengesahan Tanda Tangan
                  </Link>
                </div>

                <div
                  className={`${pathName === "/verification-admin/verification-user-complaint-history" ? "bg-primary-40 bg-opacity-20" : ""} w-full py-3`}
                >
                  <Link
                    href={
                      "/verification-admin/verification-user-complaint-history"
                    }
                    className={`w-full flex flex-row text-black-80 text-[14px] md:text-[16px] px-4`}
                  >
                    Pengaduan
                  </Link>
                </div>

                <div
                  className={`${pathName === "/verification-admin/verification-reportings" ? "bg-primary-40 bg-opacity-20" : ""} w-full py-3`}
                >
                  <Link
                    href={"/verification-admin/verification-reportings"}
                    className={`w-full flex flex-row text-black-80 text-[14px] md:text-[16px] px-4`}
                  >
                    Laporan
                  </Link>
                </div>

                <div
                  className={`${pathName === "/super-admin/application-history-lists" ? "bg-primary-40 bg-opacity-20" : ""} w-full py-3`}
                >
                  <Link
                    href={"/super-admin/application-history-lists"}
                    className={`w-full flex flex-row text-black-80 text-[14px] md:text-[16px] px-4`}
                  >
                    Daftar Permohonan
                  </Link>
                </div>

                <div
                  className={`${pathName === "/verification-admin/verification-satisfaction-index-history" ? "bg-primary-40 bg-opacity-20" : ""} w-full py-3`}
                >
                  <Link
                    href={
                      "/verification-admin/verification-satisfaction-index-history"
                    }
                    className={`w-full flex flex-row text-black-80 text-[14px] md:text-[16px] px-4`}
                  >
                    Indeks Kepuasan
                  </Link>
                </div>
              </div>

              <div className="w-full flex flex-col">
                <Accordion
                  className="w-full flex flex-col gap-y-4"
                  type="single"
                  collapsible
                  value={activeAccordionValue}
                  onValueChange={(value) => {
                    setActiveAccordionValue(value);
                  }}
                >
                  <AccordionItem
                    className="w-full border-none flex flex-col"
                    value={`item-3`}
                  >
                    <AccordionTrigger
                      className={`${pathName === "/super-admin/master-data/areas" || pathName === "/super-admin/master-data/services" || pathName === "/super-admin/master-data/service-requirements" || pathName === "/super-admin/master-data/news" || pathName === "/super-admin/master-data/bkd-gallery-activities" || pathName === "/super-admin/master-data/about-us-vision-mission" || pathName === "/super-admin/master-data/structure-organization" || pathName === "/super-admin/master-data/structure-organization-main" || pathName === "/super-admin/master-data/faqs" || pathName === "/super-admin/master-data/terms-and-conditions" || pathName === "/super-admin/master-data/manual-book" || pathName === "/super-admin/master-data/logo" || pathName === "/super-admin/master-data/carousel-slider" || pathName === "/super-admin/master-data/location-maps" ? "bg-primary-40 bg-opacity-20 text-primary-40" : "text-black-80"} px-4 py-3 font-normal text-sm text-start h-[50px] md:h-full pr-4`}
                    >
                      <div className="w-full flex flex-row items-center gap-x-2">
                        <p className="text-[14px] md:text-[16px]">
                          Data Master
                        </p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="md:text-start pb-0 text-justify w-full h-full">
                      <div className="w-full flex flex-col">
                        {masterDataSupers &&
                          masterDataSupers?.length > 0 &&
                          masterDataSupers?.map(
                            (
                              master: { id: number; name: string },
                              i: number
                            ) => {
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
                                case "Struktur Organisasi Inti":
                                  linking =
                                    "/super-admin/master-data/structure-organization-main";
                                  break;
                                case "FAQ":
                                  linking = "/super-admin/master-data/faqs";
                                  break;
                                case "Syarat dan Ketentuan":
                                  linking =
                                    "/super-admin/master-data/terms-and-conditions";
                                  break;
                                case "Manual Book":
                                  linking =
                                    "/super-admin/master-data/manual-book";
                                  break;
                                case "Regulasi":
                                  linking =
                                    "/super-admin/master-data/regulations";
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
                                  className={`${pathName === linking ? "text-primary-40" : "text-black-80"} w-full py-2 flex items-center justify-center bg-line-10 bg-opacity-50`}
                                >
                                  <div className="w-10/12 flex flex-row items-center gap-x-2">
                                    <DotIcon
                                      className={`w-5 h-5 ${pathName === linking ? "text-primary-40" : "text-black-80"}`}
                                    />
                                    <p className="text-[14px] md:text-[16px]">
                                      {master?.name}
                                    </p>
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
            </>
          )}

          {/* render regional secretary */}
          {user?.role_name && user?.role_name === "Sekretaris Daerah" && (
            <>
              <div className="w-full flex flex-col">
                <Accordion
                  className="w-full flex flex-col gap-y-4"
                  type="single"
                  collapsible
                  value={activeAccordionValue}
                  onValueChange={(value) => {
                    setActiveAccordionValue(value);
                  }}
                >
                  <AccordionItem
                    className="w-full border-none flex flex-col"
                    value={`item-1`}
                  >
                    <AccordionTrigger
                      className={`${pathName === "/verification-admin/verification-user-application-histories/verification-user-waiting-application-history" || pathName === "/verification-admin/verification-user-application-histories/verification-user-revision-application-history" ? "bg-primary-40 bg-opacity-20" : ""} px-4 py-3 font-normal text-neutral-700 text-sm text-start h-[50px] md:h-full pr-4`}
                    >
                      <div className="w-full flex flex-row items-center gap-x-2">
                        <p className="text-black-80 text-[14px] md:text-[16px]">
                          Riwayat Permohonan
                        </p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="md:text-start pb-0 text-justify w-full h-full">
                      <div className="w-full flex flex-col">
                        {adminBars &&
                          adminBars.length > 0 &&
                          adminBars?.map(
                            (bar: { id: number; name: string }, i: number) => {
                              const isWaitingPath =
                                bar.name === "Riwayat Pengajuan" &&
                                pathName ===
                                  "/verification-admin/verification-user-application-histories/verification-user-waiting-application-history";
                              const isRevisionPath =
                                bar.name !== "Riwayat Pengajuan" &&
                                pathName ===
                                  "/verification-admin/verification-user-application-histories/verification-user-revision-application-history";

                              return (
                                <Link
                                  key={i}
                                  href={`${
                                    bar.name === "Riwayat Pengajuan"
                                      ? "/verification-admin/verification-user-application-histories/verification-user-waiting-application-history"
                                      : "/verification-admin/verification-user-application-histories/verification-user-revision-application-history"
                                  }`}
                                  className={`w-full py-2 flex items-center justify-center bg-line-10 bg-opacity-50 text-black-80`}
                                >
                                  <div className="w-10/12 flex flex-row items-center gap-x-2">
                                    <DotIcon
                                      className={`w-5 h-5 ${
                                        isWaitingPath || isRevisionPath
                                          ? "text-primary-40"
                                          : "text-black-80"
                                      }`}
                                    />
                                    <p
                                      className={`text-[14px] md:text-[16px] ${
                                        isWaitingPath || isRevisionPath
                                          ? "text-primary-40"
                                          : "text-black-80"
                                      }`}
                                    >
                                      {bar.name}
                                    </p>
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

              <div className="w-full flex flex-col gap-y-4">
                <div
                  className={`${pathName === "/department-secretary/department-signature-validation" || pathName === "/department-secretary/department-signature-validation/department-signature-validation-detail" || pathName === "/department-secretary/department-signature-validation/department-signature-validation-upload" ? "bg-primary-40 bg-opacity-20" : ""} w-full py-3`}
                >
                  <Link
                    href={
                      "/department-secretary/department-signature-validation"
                    }
                    className={`w-full flex flex-row text-black-80 text-[14px] md:text-[16px] px-4`}
                  >
                    Pengesahan Tanda Tangan
                  </Link>
                </div>

                <div
                  className={`${pathName === "/verification-admin/verification-user-complaint-history" ? "bg-primary-40 bg-opacity-20" : ""} w-full py-3`}
                >
                  <Link
                    href={
                      "/verification-admin/verification-user-complaint-history"
                    }
                    className={`w-full flex flex-row text-black-80 text-[14px] md:text-[16px] px-4`}
                  >
                    Pengaduan
                  </Link>
                </div>

                <div
                  className={`${pathName === "/verification-admin/verification-reportings" ? "bg-primary-40 bg-opacity-20" : ""} w-full py-3`}
                >
                  <Link
                    href={"/verification-admin/verification-reportings"}
                    className={`w-full flex flex-row text-black-80 text-[14px] md:text-[16px] px-4`}
                  >
                    Laporan
                  </Link>
                </div>

                <div
                  className={`${pathName === "/super-admin/application-history-lists" ? "bg-primary-40 bg-opacity-20" : ""} w-full py-3`}
                >
                  <Link
                    href={"/super-admin/application-history-lists"}
                    className={`w-full flex flex-row text-black-80 text-[14px] md:text-[16px] px-4`}
                  >
                    Daftar Permohonan
                  </Link>
                </div>

                <div
                  className={`${pathName === "/verification-admin/verification-satisfaction-index-history" ? "bg-primary-40 bg-opacity-20" : ""} w-full py-3`}
                >
                  <Link
                    href={
                      "/verification-admin/verification-satisfaction-index-history"
                    }
                    className={`w-full flex flex-row text-black-80 text-[14px] md:text-[16px] px-4`}
                  >
                    Indeks Kepuasan
                  </Link>
                </div>
              </div>
            </>
          )}

          {/* render Super Admin */}
          {user?.role_name && user?.role_name === "Super Admin" && (
            <>
              <div className="w-full flex flex-col">
                <Accordion
                  className="w-full flex flex-col gap-y-4"
                  type="single"
                  collapsible
                  value={activeAccordionValue}
                  onValueChange={(value) => {
                    setActiveAccordionValue(value);
                  }}
                >
                  <AccordionItem
                    className="w-full border-none flex flex-col"
                    value={`item-1`}
                  >
                    <AccordionTrigger
                      className={`${pathName === "/verification-admin/verification-user-application-histories/verification-user-waiting-application-history" || pathName === "/verification-admin/verification-user-application-histories/verification-user-revision-application-history" ? "bg-primary-40 bg-opacity-20" : ""} px-4 py-3 font-normal hover:pl-5 ease-in-out duration-300 animate-in text-neutral-700 text-sm text-start h-[50px] md:h-full pr-4`}
                    >
                      <div className="w-full flex flex-row items-center gap-x-2">
                        <p className="text-black-80 text-[14px] md:text-[16px]">
                          Riwayat Permohonan
                        </p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="md:text-start pb-0 text-justify w-full h-full">
                      <div className="w-full flex flex-col">
                        {adminBars &&
                          adminBars.length > 0 &&
                          adminBars?.map(
                            (bar: { id: number; name: string }, i: number) => {
                              const isWaitingPath =
                                bar.name === "Riwayat Pengajuan" &&
                                pathName ===
                                  "/verification-admin/verification-user-application-histories/verification-user-waiting-application-history";
                              const isRevisionPath =
                                bar.name !== "Riwayat Pengajuan" &&
                                pathName ===
                                  "/verification-admin/verification-user-application-histories/verification-user-revision-application-history";

                              return (
                                <Link
                                  key={i}
                                  href={`${
                                    bar.name === "Riwayat Pengajuan"
                                      ? "/verification-admin/verification-user-application-histories/verification-user-waiting-application-history"
                                      : "/verification-admin/verification-user-application-histories/verification-user-revision-application-history"
                                  }`}
                                  className={`w-full hover:pl-2 ease-in-out duration-300 animate-in py-2 flex items-center justify-center bg-line-10 bg-opacity-50 text-black-80`}
                                >
                                  <div className="w-10/12 flex flex-row items-center gap-x-2">
                                    <DotIcon
                                      className={`w-5 h-5 ${
                                        isWaitingPath || isRevisionPath
                                          ? "text-primary-40"
                                          : "text-black-80"
                                      }`}
                                    />
                                    <p
                                      className={`text-[14px] md:text-[16px] ${
                                        isWaitingPath || isRevisionPath
                                          ? "text-primary-40"
                                          : "text-black-80"
                                      }`}
                                    >
                                      {bar.name}
                                    </p>
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

              <div className="w-full flex flex-col gap-y-4">
                <div
                  className={`${pathName === "/department-secretary/department-signature-validation" || pathName === "/department-secretary/department-signature-validation/department-signature-validation-detail" || pathName === "/department-secretary/department-signature-validation/department-signature-validation-upload" ? "bg-primary-40 bg-opacity-20" : ""} w-full py-3`}
                >
                  <Link
                    href={
                      "/department-secretary/department-signature-validation"
                    }
                    className={`w-full flex flex-row hover:pl-5 ease-in-out duration-300 animate-in text-black-80 text-[14px] md:text-[16px] px-4`}
                  >
                    Pengesahan Tanda Tangan
                  </Link>
                </div>

                <div
                  className={`${pathName === "/areas-head/head-manage-approvals" ? "bg-primary-40 bg-opacity-20" : ""} w-full py-3`}
                >
                  <Link
                    href={"/areas-head/head-manage-approvals"}
                    className={`w-full flex flex-row hover:pl-5 ease-in-out duration-300 animate-in text-black-80 text-[14px] md:text-[16px] px-4`}
                  >
                    Kelola Persetujuan
                  </Link>
                </div>

                <div
                  className={`${pathName === "/verification-admin/verification-user-complaint-history" ? "bg-primary-40 bg-opacity-20" : ""} w-full py-3`}
                >
                  <Link
                    href={
                      "/verification-admin/verification-user-complaint-history"
                    }
                    className={`w-full flex flex-row hover:pl-5 ease-in-out duration-300 animate-in text-black-80 text-[14px] md:text-[16px] px-4`}
                  >
                    Pengaduan
                  </Link>
                </div>

                <div
                  className={`${pathName === "/department-head/lead-bkd-staff" ? "bg-primary-40 bg-opacity-20" : ""} w-full py-3`}
                >
                  <Link
                    href={"/department-head/lead-bkd-staff"}
                    className={`w-full flex flex-row hover:pl-5 ease-in-out duration-300 animate-in text-black-80 text-[14px] md:text-[16px] px-4`}
                  >
                    Staff BKD
                  </Link>
                </div>

                <div
                  className={`${pathName === "/verification-admin/verification-reportings" ? "bg-primary-40 bg-opacity-20" : ""} w-full py-3`}
                >
                  <Link
                    href={"/verification-admin/verification-reportings"}
                    className={`w-full flex flex-row hover:pl-5 ease-in-out duration-300 animate-in text-black-80 text-[14px] md:text-[16px] px-4`}
                  >
                    Laporan
                  </Link>
                </div>

                <div
                  className={`${pathName === "/super-admin/application-history-lists" ? "bg-primary-40 bg-opacity-20" : ""} w-full py-3`}
                >
                  <Link
                    href={"/super-admin/application-history-lists"}
                    className={`w-full flex flex-row text-black-80 text-[14px] md:text-[16px] px-4`}
                  >
                    Daftar Permohonan
                  </Link>
                </div>

                <div
                  className={`${pathName === "/verification-admin/verification-satisfaction-index-history" ? "bg-primary-40 bg-opacity-20" : ""} w-full py-3`}
                >
                  <Link
                    href={
                      "/verification-admin/verification-satisfaction-index-history"
                    }
                    className={`w-full flex flex-row hover:pl-5 ease-in-out duration-300 animate-in text-black-80 text-[14px] md:text-[16px] px-4`}
                  >
                    Indeks Kepuasan
                  </Link>
                </div>
              </div>

              <div className="w-full flex flex-col">
                <Accordion
                  className="w-full flex flex-col gap-y-4"
                  type="single"
                  collapsible
                  value={activeAccordionValue}
                  onValueChange={(value) => {
                    setActiveAccordionValue(value);
                  }}
                >
                  <AccordionItem
                    className="w-full border-none flex flex-col"
                    value={`item-3`}
                  >
                    <AccordionTrigger
                      className={`${pathName === "/super-admin/master-data/areas" || pathName === "/super-admin/master-data/services" || pathName === "/super-admin/master-data/service-requirements" || pathName === "/super-admin/master-data/news" || pathName === "/super-admin/master-data/bkd-gallery-activities" || pathName === "/super-admin/master-data/about-us-vision-mission" || pathName === "/super-admin/master-data/structure-organization" || pathName === "/super-admin/master-data/structure-organization-main" || pathName === "/super-admin/master-data/faqs" || pathName === "/super-admin/master-data/terms-and-conditions" || pathName === "/super-admin/master-data/manual-book" || pathName === "/super-admin/master-data/logo" || pathName === "/super-admin/master-data/carousel-slider" || pathName === "/super-admin/master-data/location-maps" ? "bg-primary-40 bg-opacity-20 text-primary-40" : "text-black-80"} px-4 py-3 font-normal hover:pl-5 ease-in-out duration-300 animate-in text-sm text-start h-[50px] md:h-full pr-4`}
                    >
                      <div className="w-full flex flex-row items-center gap-x-2">
                        <p className="text-[14px] md:text-[16px]">
                          Data Master
                        </p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="md:text-start pb-0 text-justify w-full h-full">
                      <div className="w-full flex flex-col">
                        {masterDataSupers &&
                          masterDataSupers?.length > 0 &&
                          masterDataSupers?.map(
                            (
                              master: { id: number; name: string },
                              i: number
                            ) => {
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
                                case "Struktur Organisasi Inti":
                                  linking =
                                    "/super-admin/master-data/structure-organization-main";
                                  break;
                                case "FAQ":
                                  linking = "/super-admin/master-data/faqs";
                                  break;
                                case "Syarat dan Ketentuan":
                                  linking =
                                    "/super-admin/master-data/terms-and-conditions";
                                  break;
                                case "Manual Book":
                                  linking =
                                    "/super-admin/master-data/manual-book";
                                  break;
                                case "Regulasi":
                                  linking =
                                    "/super-admin/master-data/regulations";
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
                                case "Struktur Pengurus BKD":
                                  linking =
                                    "/super-admin/master-data/bkd-upload-structure";
                                  break;
                                default:
                                  break;
                              }

                              return (
                                <Link
                                  key={i}
                                  href={`${linking}`}
                                  className={`${pathName === linking ? "text-primary-40" : "text-black-80"} w-full py-2 flex items-center justify-center bg-line-10 hover:pl-2 ease-in-out duration-300 animate-in bg-opacity-50`}
                                >
                                  <div className="w-10/12 flex flex-row items-center gap-x-2">
                                    <DotIcon
                                      className={`w-5 h-5 ${pathName === linking ? "text-primary-40" : "text-black-80"}`}
                                    />
                                    <p className="text-[14px] md:text-[16px]">
                                      {master?.name}
                                    </p>
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

              <div className="w-full flex flex-col">
                <Accordion
                  className="w-full flex flex-col gap-y-4"
                  type="single"
                  collapsible
                  value={activeAccordionValue}
                  onValueChange={(value) => {
                    setActiveAccordionValue(value);
                  }}
                >
                  <AccordionItem
                    className="w-full border-none flex flex-col"
                    value={`item-4`}
                  >
                    <AccordionTrigger
                      className={`${pathName === "/super-admin/account-managing-roles" || pathName === "/super-admin/account-managing-users" ? "bg-primary-40 bg-opacity-20 text-primary-40" : "text-black-80"} px-4 py-3 hover:pl-5 ease-in-out duration-300 animate-in font-normal text-[14px] md:text-[16px] text-start h-[50px] md:h-full pr-4`}
                    >
                      <div className="w-full flex flex-row items-center gap-x-2">
                        <p className="text-black-80 text-[14px] md:text-[16px]">
                          Kelola Akun
                        </p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="md:text-start pb-0 text-justify w-full h-full">
                      <div className="w-full flex flex-col">
                        {AccountManagement &&
                          AccountManagement.length > 0 &&
                          AccountManagement?.map(
                            (
                              bar: { id: number; name: string; value: string },
                              i: number
                            ) => {
                              let linking;

                              switch (bar?.name) {
                                case "Roles":
                                  linking =
                                    "/super-admin/account-managing-roles";
                                  break;
                                case "Users":
                                  linking =
                                    "/super-admin/account-managing-users";
                                  break;
                                case "ASN":
                                  linking =
                                    "/super-admin/management-list-employees";
                                  break;
                                default:
                                  break;
                              }

                              return (
                                <Link
                                  key={i}
                                  href={`${bar?.name === "Roles" ? "/super-admin/account-managing-roles" : bar?.name === "ASN" ? "/super-admin/management-list-employees" : "/super-admin/account-managing-users"}`}
                                  className={`${pathName === linking ? "text-primary-40" : "text-black-80"} w-full py-2 hover:pl-2 ease-in-out duration-300 animate-in flex items-center justify-center bg-opacity-50`}
                                >
                                  <div className="w-10/12 flex flex-row items-center gap-x-2">
                                    <DotIcon
                                      className={`${pathName === linking ? "text-primary-40" : "text-black-80"} w-5 h-5`}
                                    />
                                    <p
                                      className={`${pathName === linking ? "text-primary-40" : "text-black-80"} text-[14px] md:text-[16px]`}
                                    >
                                      {bar?.value}
                                    </p>
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

              <div className="w-full flex flex-col gap-y-3">
                <div
                  className={`${pathName === "/super-admin/settings" ? "bg-primary-40 bg-opacity-20" : ""} w-full py-3`}
                >
                  <Link
                    href={"/super-admin/settings"}
                    className={`w-full flex flex-row hover:pl-5 ease-in-out duration-300 animate-in text-black-80 text-[14px] md:text-[16px] px-4`}
                  >
                    Pengaturan
                  </Link>
                </div>
              </div>
            </>
          )}

          <div className="w-full flex flex-col items-center justify-center">
            <div className="w-11/12 h-[1px] bg-line-50"></div>
          </div>

          <div className="w-full flex flex-col">
            <Accordion
              className="w-full flex flex-col gap-y-4"
              type="single"
              collapsible
              value={activeAccordionValue}
              onValueChange={(value) => {
                setActiveAccordionValue(value);
              }}
            >
              <AccordionItem
                className="w-full border-none flex flex-col"
                value={`item-5`}
              >
                <AccordionTrigger className="px-4 py-2 hover:pl-5 ease-in-out duration-300 animate-in bg-white font-normal text-neutral-700 text-[14px] md:text-[16px] text-start h-[50px] md:h-full pr-4">
                  <div className="w-full flex flex-row gap-x-3 px-4">
                    <div className="w-3/12 h-full">
                      <Image
                        key={user?.role_name}
                        src={`https://ui-avatars.com/api/?name=${user?.role_name}&background=random&rounded=true`}
                        alt="image"
                        className="rounded-full w-full h-full"
                        width={600}
                        height={600}
                      />
                    </div>

                    <div className="w-full flex flex-col justify-center gap-y-1">
                      <h5 className="text-black-80 text-[14px] md:text-[16px]">
                        {user && user?.role_name}
                      </h5>

                      <p className="text-black-40 text-sm">Bandar Lampung</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="md:text-start pb-0 mt-2 text-justify w-full h-full">
                  <div className="w-full flex flex-row px-5">
                    <Button
                      onClick={handleLogout}
                      className="w-full flex flex-row items-center rounded-lg bg-error-50 bg-opacity-30 justify-start px-5 py-6 gap-x-3 group"
                    >
                      {isLoadingOut ? (
                        <Loader className="animate-spin" />
                      ) : (
                        <>
                          <LogOut className="w-5 h-5 text-error-50 group-hover:text-error-70" />

                          <p className="text-error-50 font-light text-[14px] md:text-[16px] group-hover:text-error-70 hover:underline">
                            Keluar
                          </p>
                        </>
                      )}
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
