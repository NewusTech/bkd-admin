"use client";

import DatePages from "@/components/elements/date";
import SearchPages from "@/components/elements/search";
import { formatDate } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checks, Printer } from "@phosphor-icons/react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Button } from "@/components/ui/button";
import FilterDataPages from "@/components/elements/data_filters";
import VerificationUserApplicationHistoryTablePages from "@/components/tables/verification_admin_user_application_history_table";
import { getApplicationUserHistories, getService } from "@/services/api";
import {
  JwtPayload,
  ServiceInterface,
  UserApplicationHistoryInterface,
} from "@/types/interface";
import DataNotFound from "@/components/elements/data_not_found";
import { useDebounce } from "@/hooks/useDebounce";
import PaginationComponent from "@/components/elements/pagination";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import MobileDivisionVerificationAdminApplicationHistoryCard from "@/components/mobile_all_cards/mobileDivisionVerificationAdminApplicationHistoryCard";

export default function VerificationUserRevisionApplicationHistoriesScreen() {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 500);
  const [layananId, setLayananId] = useState<number | undefined>(undefined);

  const [status, setStatus] = useState<number>(3);
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), 0, 1);
  const [startDate, setStartDate] = useState<Date | undefined>(firstDayOfMonth);
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [users, setUsers] = useState<UserApplicationHistoryInterface[]>([]);
  const [services, setServices] = useState<ServiceInterface[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    totalPages: 1,
    totalCount: 0,
  });

  const startDateFormatted = startDate
    ? formatDate(new Date(startDate))
    : undefined;
  const endDateFormatted = endDate ? formatDate(new Date(endDate)) : undefined;

  const fetchApplicationHistoryUser = async (
    page: number,
    limit: number,
    status?: number,
    search?: string,
    start_date?: string,
    end_date?: string,
    layanan_id?: number
  ) => {
    try {
      const response = await getApplicationUserHistories(
        page,
        limit,
        status,
        search,
        start_date,
        end_date,
        layanan_id
      );

      setUsers(response.data);
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
    if (status) {
      fetchApplicationHistoryUser(
        1,
        10,
        status,
        debounceSearch,
        startDateFormatted,
        endDateFormatted,
        layananId
      );
    }
  }, [debounceSearch, startDateFormatted, endDateFormatted, layananId, status]);

  const handlePageChange = (newPage: number) => {
    if (newPage !== pagination.currentPage) {
      if (status) {
        fetchApplicationHistoryUser(newPage, 10, status, "", "", "", layananId);
      }
    }
  };

  const fetchService = async (page: number, limit: number, search?: string) => {
    try {
      const response = await getService(page, limit, search);

      setServices(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchService(1, 100, "");
  }, []);

  return (
    <section className="w-full flex flex-col items-center gap-y-5 px-5 mt-5">
      <div
        className={`w-full flex flex-col ${!isMobile ? "bg-white shadow-md rounded-lg p-5" : ""} gap-y-3`}>
        <div className="w-full flex flex-col gap-y-5">
          <div className="flex items-center w-full h-[40px] justify-between bg-line-10 border border-primary-40 rounded-lg">
            <Select
              onValueChange={(value) =>
                setLayananId(value === "all" ? undefined : Number(value))
              }>
              <SelectTrigger
                className={`w-full gap-x-4 text-[14px] rounded-lg border-none active:border-none active:outline-none focus:border-none focus:outline-none`}>
                <SelectValue
                  placeholder="Pilih Layanan"
                  className="text-black-80 tex-[14px] w-full"
                />
              </SelectTrigger>
              <SelectContent className="bg-line-10">
                <div className="pt-2">
                  <SelectItem className="w-full px-4" value="all">
                    Semua Status
                  </SelectItem>
                  {services &&
                    services.map((service: ServiceInterface, i: number) => {
                      return (
                        <SelectItem
                          key={i}
                          className={`w-full px-4`}
                          value={service.id.toString()}>
                          {service?.nama}
                        </SelectItem>
                      );
                    })}
                </div>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col h-full items-center w-full gap-y-6">
            <Tabs
              defaultValue="butuh-perbaikan"
              className={`w-full flex flex-col`}>
              <TabsList
                className={`w-full px-0 py-0 h-full flex flex-row gap-x-5 verticalScroll`}>
                <TabsTrigger
                  onClick={() => {
                    setStatus(3);
                  }}
                  className="w-full py-3 rounded-lg bg-primary-40 bg-opacity-20 text-primary-40 data-[state=active]:bg-opacity-100 data-[state=active]:bg-primary-40 data-[state=active]:text-line-10"
                  value="butuh-perbaikan">
                  Butuh Perbaikan
                </TabsTrigger>

                <TabsTrigger
                  onClick={() => {
                    setStatus(4);
                  }}
                  className="w-full py-3 rounded-lg bg-success-70 data-[state=active]:bg-success-70 bg-opacity-20 text-success-70 data-[state=active]:bg-opacity-100 data-[state=active]:text-line-10"
                  value="sudah-diperbaiki">
                  Sudah Diperbaiki
                </TabsTrigger>
              </TabsList>

              <TabsContent
                value="butuh-perbaikan"
                className="w-full flex flex-col mt-4">
                {/* {user && subDistricts && villages && (
              <PersonalDataProfileScreen
                userData={userData}
                setUserData={setUserData}
                returnDate={returnDate}
                setReturnDate={setReturnDate}
                subDistricts={subDistricts}
                villages={villages}
                isLoadingUserCreate={isLoadingUserCreate}
                handleSubmitPersonalDataUser={handleSubmitPersonalDataUser}
              />
            )} */}
              </TabsContent>
              <TabsContent
                value="sudah-diperbaiki"
                className="w-full flex flex-col mt-4">
                {/* {user && subDistricts && villages && (
              <PersonalDataProfileScreen
                userData={userData}
                setUserData={setUserData}
                returnDate={returnDate}
                setReturnDate={setReturnDate}
                subDistricts={subDistricts}
                villages={villages}
                isLoadingUserCreate={isLoadingUserCreate}
                handleSubmitPersonalDataUser={handleSubmitPersonalDataUser}
              />
            )} */}
              </TabsContent>
            </Tabs>
          </div>

          <div className="w-full flex flex-row gap-x-5">
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

              <div className="w-full">
                <Button className="w-full flex flex-row gap-x-4 text-sm bg-primary-40 items-center justify-center hover:bg-primary-70 h-10 text-line-10 rounded-lg">
                  <Printer className="w-6 h-6 text-line-10" />

                  <span>Print</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        {!isMobile ? (
          <>
            {users && users.length > 0 && (
              <VerificationUserApplicationHistoryTablePages users={users} />
            )}
          </>
        ) : (
          <>
            {users &&
              users.length > 0 &&
              users.map((user: UserApplicationHistoryInterface, i: number) => {
                return (
                  <MobileDivisionVerificationAdminApplicationHistoryCard
                    key={i}
                    index={i}
                    user={user}
                  />
                );
              })}
          </>
        )}
      </div>

      {users && users.length > 10 && (
        <div className="w-full">
          <PaginationComponent
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      <div className="w-full">{users.length === 0 && <DataNotFound />}</div>
    </section>
  );
}
