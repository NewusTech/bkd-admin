"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

interface SelectItem {
  id: string;
  name: string;
}

interface InputProps {
  typeInput?: string;
  type?: string;
  placeholder?: string;
  label?: string;
  value?: any;
  name?: string;
  disable?: boolean;
  valueInput?: any;
  onChangeInputSearch?: (e: any) => void;
  onChange?: (e: any) => void;
  items?: SelectItem[];
  date?: Date | undefined;
  setDate?: (date: Date | undefined) => void;
  required?: boolean;
}

const InputComponent = ({
  typeInput,
  type,
  placeholder,
  label,
  items,
  value,
  onChange,
  date,
  setDate,
  name,
  disable,
  valueInput,
  onChangeInputSearch,
  required,
}: InputProps) => {
  // const [date, setDate] = useState<Date>();
  if (typeInput === "selectSearch")
    return (
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full text-[14px] md:text-[16px]">
          <SelectValue
            placeholder={placeholder}
            className="text-[14px] md:text-[16px]"
          />
        </SelectTrigger>
        <SelectContent className="pt-10 bg-white">
          <div className="px-2 fixed border-b w-full top-0 flex items-center justify-between z-10">
            <Search className="text-line-30" />
            <Input
              placeholder="Search..."
              className="w-full border-0 text-[14px] md:text-[16px]"
              value={valueInput}
              onChange={onChangeInputSearch}
            />
          </div>
          <SelectGroup>
            <SelectLabel className="text-[14px] md:text-[16px]">
              {label}
            </SelectLabel>
            {items?.map((item: any) => (
              <SelectItem
                className="text-[14px] md:text-[16px]"
                key={item.id}
                value={item.id}>
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );

  if (typeInput === "select")
    return (
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full text-[14px] md:text-[16px]">
          <SelectValue
            placeholder={placeholder}
            className="text-[14px] md:text-[16px]"
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {items?.map((item) => (
              <SelectItem
                className="text-[14px] md:text-[16px]"
                key={item.id}
                value={item.id}>
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );

  if (typeInput === "datepicker")
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className={cn(
              "w-[280px] justify-between text-left font-normal",
              !date && "text-muted-foreground"
            )}>
            {date ? format(date, "PP") : <span>Pilih Tanggal</span>}
            <CalendarIcon className="ml-2 h-4 w-4 text-primary-40" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    );

  if (typeInput === "textarea")
    return (
      <Textarea
        className="h-40 text-[14px] md:text-[16px]"
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        disabled={disable}
      />
    );

  // if (typeInput === "radio")
  //     return (
  //         <RadioGroup>
  //             <div className="flex items-center space-x-2">
  //                 <RadioGroupItem value="docs" id="docs" />
  //                 <Label htmlFor="docs">Dokumen</Label>
  //             </div>
  //             <div className="flex items-center space-x-2">
  //                 <RadioGroupItem value="pdf" id="pdf" />
  //                 <Label htmlFor="pdf">PDF</Label>
  //             </div>
  //             <div className="flex items-center space-x-2">
  //                 <RadioGroupItem value="image" id="image" />
  //                 <Label htmlFor="image">Gambar</Label>
  //             </div>
  //         </RadioGroup>
  //     );

  if (typeInput === "formInput")
    return (
      <Input
        type="text"
        placeholder="Judul / Pertanyaan"
        className="rounded-none border-r-0 border-t-0 border-l-0 bg-transparent text-[14px] md:text-[16px]"
        value={value}
        onChange={onChange}
      />
    );

  if (typeInput === "file")
    return <Input type="file" placeholder="Email" className="rounded-full" />;

  if (typeInput === "upload")
    return (
      <div className="relative inline-block cursor-pointer">
        <input
          type="file"
          id="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50"
          onChange={onChange}
          required={required}
        />
        <label
          htmlFor="file"
          className="cursor-pointer inline-block bg-transparent border border-primary-40 text-primary-40 py-2 px-5 rounded-full font-semibold text-[14px] md:text-[16px] hover:bg-primary-30">
          {label}
        </label>
      </div>
    );

  return (
    <Input
      type={type}
      name={name}
      placeholder={placeholder}
      className="rounded-full"
      value={value}
      onChange={onChange}
      disabled={disable}
    />
  );
};

export default InputComponent;
