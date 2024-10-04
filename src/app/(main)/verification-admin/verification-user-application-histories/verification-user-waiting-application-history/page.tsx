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
import { Checks, Printer } from "@phosphor-icons/react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Button } from "@/components/ui/button";
import FilterDataPages from "@/components/elements/data_filters";
import VerificationUserApplicationHistoryTablePages from "@/components/tables/verification_admin_user_application_history_table";
import { getApplicationUserHistories } from "@/services/api";
import { UserApplicationHistoryInterface } from "@/types/interface";

export default function VerificationUserApplicationHistoriesScreen() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [search, setSearch] = useState("");
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), 0, 1);
  const [startDate, setStartDate] = useState<Date | undefined>(firstDayOfMonth);
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [users, setUsers] = useState<UserApplicationHistoryInterface[]>([]);

  const startDateFormatted = startDate
    ? formatDate(new Date(startDate))
    : undefined;
  const endDateFormatted = endDate ? formatDate(new Date(endDate)) : undefined;

  const fetchApplicationHistoryUser = async (status?: number) => {
    try {
      const response = await getApplicationUserHistories(status);

      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApplicationHistoryUser(1);
  }, []);

  console.log(users, "ini user");

  return (
    <section className="w-full flex flex-col items-center px-5 mt-5">
      <FilterDataPages
        startDate={startDate as Date}
        setStartDate={setStartDate}
        endDate={endDate as Date}
        setEndDate={setEndDate}
        search={search}
        setSearch={setSearch}
      />

      <div className="w-full">
        {users && users.length > 0 && (
          <VerificationUserApplicationHistoryTablePages users={users} />
        )}
      </div>
    </section>
  );
}
