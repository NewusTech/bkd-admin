"use client";

import DatePages from "@/components/elements/date";
import SearchPages from "@/components/elements/search";
import { formatDate } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import {
  AreasInterface,
  ServiceInterface,
  UserComplaintInterface,
} from "@/types/interface";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CircleX, Loader } from "lucide-react";
import Image from "next/image";
import { CloudArrowUp } from "@phosphor-icons/react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { getAreas, getServiceByAreas, getUserComplaints } from "@/services/api";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import VerificationUserComplaintTablePages from "@/components/tables/verification_admin_user_compaint_table";

export default function VerificationUserComplaintScreen() {
  const router = useRouter();
  const dropRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [search, setSearch] = useState("");
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), 0, 1);
  const [startDate, setStartDate] = useState<Date | undefined>(firstDayOfMonth);
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [areas, setAreas] = useState<AreasInterface[]>([]);
  const [areaId, setAreaId] = useState<number | null>(null);
  const [services, setServices] = useState<ServiceInterface[]>([]);
  const [serviceId, setServiceId] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dateIndex, setDateIndex] = useState<Date>(new Date());
  const [timeIndex, setTimeIndex] = useState<Date>(new Date());
  const [complaintImage, setComplaintImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [complaints, setComplaints] = useState<UserComplaintInterface[]>();
  const [data, setData] = useState({
    bidang_id: "",
    layanan_id: "",
    judul_pengaduan: "",
    isi_pengaduan: "",
    image: "",
    status: 0,
  });

  const fetchUserComplaints = async () => {
    try {
      const response = await getUserComplaints();

      setComplaints(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserComplaints();
  }, []);

  const fetchAreas = async (page: number, limit: number) => {
    try {
      const response = await getAreas(page, limit);

      setAreas(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAreas(1, 10);
  }, []);

  const fetchServices = async (bidang_id: number) => {
    try {
      const response = await getServiceByAreas(bidang_id);

      setServices(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (areaId) {
      fetchServices(areaId);
    }
  }, [areaId]);

  useEffect(() => {
    if (areaId !== null) {
      setData((prevUser) => ({
        ...prevUser,
        bidang_id: String(areaId),
      }));
    }
  }, [areaId]);

  useEffect(() => {
    if (serviceId !== null) {
      setData((prevUser) => ({
        ...prevUser,
        layanan_id: String(serviceId),
      }));
    }
  }, [serviceId]);

  return (
    <section className="w-full flex flex-col items-center px-5 mt-5">
      <div
        className={`w-full flex flex-col ${!isMobile ? "bg-white shadow-md rounded-lg p-5" : ""} gap-y-5`}>
        <h2 className="text-2xl text-black-80 text-center md:mb-6">
          Pengaduan Layanan
        </h2>

        <div
          className={`w-full flex flex-col md:flex-row ${!isMobile ? "" : "p-3 rounded-lg shadow-md"} bg-line-10 gap-y-5 gap-x-5`}>
          <SearchPages
            search={search}
            change={(e: any) => setSearch(e.target.value)}
            placeholder="Pencarian"
          />

          <div className="flex flex-row justify-center items-center w-full gap-x-3">
            <DatePages
              date={startDate ?? null}
              setDate={(e) => setStartDate(e ?? undefined)}
            />
            <p className="text-center">to</p>
            <DatePages
              date={endDate ?? null}
              setDate={(e) => setEndDate(e ?? undefined)}
            />
          </div>

          <div className="flex items-center w-full h-[40px] justify-between bg-line-10 border border-primary-40 rounded-lg">
            <Select
            // onValueChange={handleSelectStatusChange}
            >
              <SelectTrigger
                className={`w-full gap-x-4 rounded-lg border-none active:border-none active:outline-none focus:border-none focus:outline-none`}>
                {/* <Checks className="w-6 h-6 text-black-80" /> */}
                <SelectValue
                  placeholder="Status"
                  className="text-black-80 w-full"
                />
              </SelectTrigger>
              <SelectContent className="bg-line-10">
                <div className="pt-2">
                  {/* {statusDatas &&
                  statusDatas.map(
                    (status: { id: number; value: string }, i: number) => {
                      return (
                        <SelectItem
                          key={i}
                          className={`w-full px-4`}
                          value={status.id.toString()}>
                          {status.value}
                        </SelectItem>
                      );
                    }
                  )} */}
                  <SelectItem className="w-full px-4 pl-8" value="1">
                    Hello World
                  </SelectItem>
                </div>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="w-full">
          {/* {!isMobile ? ( */}
          <>
            {complaints && complaints.length > 0 && (
              <VerificationUserComplaintTablePages complaints={complaints} />
            )}
          </>
          {/* ) : (
            <MobileUserComplaintCardPages />
          )} */}
        </div>
      </div>
    </section>
  );
}
