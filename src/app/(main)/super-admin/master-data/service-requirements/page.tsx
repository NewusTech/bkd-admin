"use client";

import { getService } from "@/services/api";
import { AreasInterface, ServiceInterface } from "@/types/interface";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PaginationComponent from "@/components/elements/pagination";
import SuperServiceRequirementsMasterDataTablePages from "@/components/tables/master_datas/service-requirements-table";
import Link from "next/link";
import AddIcon from "@/components/elements/add_button";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useDebounce } from "@/hooks/useDebounce";
import MobileSuperServiceRequirementsMasterDataTablePages from "@/components/mobile_all_cards/mobileSuperServiceRequirementsMasterDataTablePages";
import NotFoundSearch from "@/components/ui/SearchNotFound";

export default function ServiceRequiremnts() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const deboucedSearch = useDebounce(search, 500);
  const [services, setServices] = useState<ServiceInterface[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    totalPages: 1,
    totalCount: 0,
  });

  const fetchService = async (page: number, limit: number, search: string) => {
    try {
      const response = await getService(page, limit, search);

      setServices(response.data);
      setPagination((prev) => ({
        ...prev,
        currentPage: page,
        totalPages: response?.pagination?.totalPages,
        totalCount: response?.pagination?.totalCount,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchService(1, 10, deboucedSearch);
  }, [deboucedSearch]);

  const handlePageChange = (newPage: number) => {
    if (newPage !== pagination.currentPage) {
      fetchService(newPage, 10, "deboucedSearch");
    }
  };

  return (
    <>
      {!isMobile ? (
        <>
          {/* Dekstop */}
          <section className="w-full flex flex-col items-center gap-y-5 px-5 mt-5">
            <div className="bg-line-10 shadow-md rounded-lg w-full flex flex-col p-5 gap-y-5">
              <div className="w-full flex flex-row justify-end gap-x-5">
                <div className="w-fit flex justify-end ">
                  <Link
                    href="/super-admin/master-data/service-requirements/create"
                    className="bg-primary-40 w-fit group h-11 text-[16px] px-3 rounded-lg text-white hover:bg-primary-70 border border-primary text-center font-medium justify-center flex gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
                    <AddIcon className="w-4 h-4 text-line-10" />
                    Tambah
                  </Link>
                </div>
              </div>

              <div className="w-full">
                {services && services.length > 0 && (
                  <SuperServiceRequirementsMasterDataTablePages
                    services={services}
                  />
                )}
              </div>
            </div>
          </section>
          {/* Desktop */}
        </>
      ) : (
        <>
          {/* mobile */}
          <section className="w-full flex flex-col items-center gap-y-5 px-5 mt-5">
            <div className="bg-line-10 shadow-md rounded-lg w-full flex flex-col p-5 gap-y-5">
              <div className="w-full gap-x-5">
                <div className="w-full mt-2">
                  <div className="flex justify-end items-center w-full">
                    <Link
                      className="w-full text-[14px] md:text-[16px] bg-primary-40 flex flex-row items-center justify-center hover:bg-primary-70 h-10 text-line-10 px-3 py-2 rounded-lg border border-primary-40 text-center font-medium gap-x-3 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                      href="/super-admin/master-data/service-requirements/create">
                      <AddIcon className="w-4 h-4 text-line-10" />
                      Tambah
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-line-10 shadow-md rounded-lg w-full flex flex-col p-5 gap-y-5 mt-2">
              <div className="w-full">
                {services && services.length > 0 ? (
                  services.map((item: ServiceInterface, i: number) => {
                    return (
                      <MobileSuperServiceRequirementsMasterDataTablePages
                        key={i}
                        item={item}
                        index={i}
                      />
                    );
                  })
                ) : (
                  <NotFoundSearch />
                )}
              </div>
            </div>
          </section>
          {/* Mobile */}
        </>
      )}

      <div className="w-full mb-10">
        <PaginationComponent
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}
