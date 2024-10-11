"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

export default function DatePages({
  date,
  setDate,
}: {
  date: Date | null;
  setDate: (date: Date | null) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="w-full">
          <Button
            className={cn(
              "w-full hover:bg-line-10 bg-line-10 border border-primary-40 text-black-80 justify-between text-left font-normal",
              !date && "text-muted-foreground"
            )}>
            <CalendarIcon className="mr-2 h-4 w-4 text-primary-40" />
            {date ? format(date, "PP") : <span>Pilih Tanggal</span>}
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-line-10">
        <Calendar
          mode="single"
          selected={date as Date}
          onSelect={(day) => setDate(day ?? null)}
          initialFocus
          className="text-[14px] md:text-[16px]"
        />
      </PopoverContent>
    </Popover>
  );
}
