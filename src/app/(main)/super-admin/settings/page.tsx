"use client";

import active from "@/../../public/assets/icons/documentActive.png";
import Deactive from "@/../../public/assets/icons/documentNotActive.png";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { ServiceInterface } from "@/types/interface";
import { getService } from "@/services/api";
import { useDebounce } from "@/hooks/useDebounce";
import Image from "next/image";
import Link from "next/link";

export default function SuperSettingScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 500);
  const [serviceId, setServiceId] = useState<number | null>(null);
  const [services, setServices] = useState<ServiceInterface[]>([]);

  const fetchService = async (page: number, limit: number, search: string) => {
    try {
      const response = await getService(page, limit, search);

      setServices(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchService(1, 30, "");
  }, []);

  return (
    <section className="w-full flex flex-col items-center md:px-5 md:mt-5">
      <div className="bg-line-20 md:bg-line-10 md:shadow-md md:rounded-lg w-full flex flex-col p-5 gap-y-5">
        <div className="w-full border border-line-20 rounded-lg">
          <Select onValueChange={(value) => setServiceId(Number(value))}>
            <SelectTrigger
              className={`w-full text-[14px] md:text-[16px] gap-x-4 rounded-lg border-none active:border-none active:outline-none focus:border-none focus:outline-none bg-white`}>
              <SelectValue
                placeholder="Pilih Layanan"
                className="text-black-80 text-[14px] md:text-[16px] w-full bg-white"
              />
            </SelectTrigger>
            <SelectContent className="bg-line-10">
              <div className="pt-2">
                {services &&
                  services.length > 0 &&
                  services.map((service: ServiceInterface, i: number) => {
                    return (
                      <SelectItem
                        key={i}
                        className={`w-full text-[14px] px-4`}
                        value={service.id.toString()}>
                        {service?.nama}
                      </SelectItem>
                    );
                  })}
              </div>
            </SelectContent>
          </Select>
        </div>

        {serviceId ? (
          <Link
            href={`/super-admin/settings/${serviceId}`}
            className="w-full md:w-3/12 cursor-pointer p-10 group flex flex-col gap-y-5 border border-line-20 rounded-lg shadow-md bg-line-10 hover:bg-primary-40">
            <div className="w-full h-[100px]">
              <Image
                src={active}
                alt="active"
                width={1000}
                height={500}
                className="w-full h-full object-contain"
              />
            </div>

            <h6 className="text-black-80 group-hover:text-line-10 text-center font-normal text-[18px] md:text-[20px]">
              Format Surat
            </h6>
          </Link>
        ) : (
          <div className="w-full md:w-3/12 p-10 cursor-not-allowed group flex flex-col gap-y-5 border border-line-20 rounded-lg shadow-md bg-line-10">
            <div className="w-full h-[100px]">
              <Image
                src={Deactive}
                alt="de-active"
                width={1000}
                height={500}
                className="w-full h-full object-contain"
              />
            </div>

            <h6 className="text-black-80 text-center font-normal text-[18px] md:text-[20px]">
              Format Surat
            </h6>
          </div>
        )}
      </div>
    </section>
  );
}
