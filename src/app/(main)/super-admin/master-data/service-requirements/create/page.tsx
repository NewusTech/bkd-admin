"use client";

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import { useQuill } from "react-quilljs";
import SearchPages from "@/components/elements/search";
import { Button } from "@/components/ui/button";
import { deleteAreas, getAreas, postAreas, updateAreas } from "@/services/api";
import { AreasInterface } from "@/types/interface";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Swal from "sweetalert2";
// import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import PaginationComponent from "@/components/elements/pagination";
import Editor from "@/components/elements/toolbar_editors";
import InputComponent from "@/components/InputComponent";
import SuperServiceRequirementsMasterDataTablePages from "@/components/tables/master_datas/service-requirements-table";
import Link from "next/link";
import AddIcon from "@/components/elements/add_button";
import Step from "@/components/Steps";
import { getServices } from "@/services/api"; // Pastikan untuk mengimpor fungsi ini
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useCreateRequirement from "@/store/useCreateRequirement";

const steps = [
  { id: 1, desk: "Tambah Persyaratan" },
  { id: 2, desk: "Formulir" },
  { id: 3, desk: "Dokumen" },
];
const currentStep = 1;

export default function ServiceRequiremntsCreate() {
  const { selectedId, serviceId, setServiceId } = useCreateRequirement(
    (state) => ({
      selectedId: state.selectedId,
      serviceId: state.serviceId,
      setServiceId: state.setServiceId,
    })
  );
  const [informationService, setInformationService] = useState("");
  const [searchInputInstance, setSearchInputInstance] = useState(""); // State for search input
  const [searchTermInstance, setSearchTermInstance] = useState("");

  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getServices();
        if (response.status === 200) {
          setServices(response.data);
        } else {
          console.error("Error fetching services");
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  const handleSelectChange = (e: any) => {
    const selectedServiceId = e;
    setServiceId(selectedServiceId);

    // Find the selected service to get its description
    // const selectedService = serviceAll.find(
    //     (service: any) => service.id === parseInt(selectedServiceId),
    // );

    // if (selectedService) {
    //     setInformationService(selectedService.desc);
    // }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearchTermInstance(searchInputInstance);
    }, 300); // Debounce time to avoid excessive API calls

    return () => clearTimeout(delayDebounceFn);
  }, [searchInputInstance]);

  const router = useRouter();

  return (
    <section className="w-full flex flex-col items-center gap-y-5 px-5 mt-5">
      <div className="bg-line-10 shadow-md rounded-lg w-full flex flex-col p-5 gap-y-5">
        <div className="flex gap-4">
          <Link href="/super-admin/master-data/service-requirements">
            <svg
              width="30"
              height="31"
              viewBox="0 0 30 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M19.413 24.2122C19.5001 24.2993 19.5692 24.4028 19.6164 24.5166C19.6635 24.6304 19.6878 24.7523 19.6878 24.8755C19.6878 24.9987 19.6635 25.1207 19.6164 25.2345C19.5692 25.3483 19.5001 25.4517 19.413 25.5388C19.3259 25.6259 19.2225 25.695 19.1087 25.7421C18.9949 25.7893 18.8729 25.8135 18.7498 25.8135C18.6266 25.8135 18.5046 25.7893 18.3908 25.7421C18.277 25.695 18.1736 25.6259 18.0865 25.5388L8.71148 16.1638C8.62431 16.0767 8.55517 15.9733 8.50799 15.8595C8.46081 15.7457 8.43652 15.6237 8.43652 15.5005C8.43652 15.3773 8.46081 15.2553 8.50799 15.1415C8.55517 15.0277 8.62431 14.9243 8.71148 14.8372L18.0865 5.46224C18.2624 5.28633 18.501 5.1875 18.7498 5.1875C18.9985 5.1875 19.2371 5.28633 19.413 5.46224C19.589 5.63815 19.6878 5.87674 19.6878 6.12552C19.6878 6.3743 19.589 6.61289 19.413 6.7888L10.7002 15.5005L19.413 24.2122Z"
                fill="#3D3D3D"
              />
            </svg>
          </Link>
          <h1 className="text-lg md:text-lg">Persyaratan Layanan</h1>
        </div>
        <div className="w-full">
          <div className="text-center mb-4 text-sm md:text-lg">
            Tambah Persyaratan
          </div>
          <div className="flex w-full">
            {steps.map((step, index) => (
              <Step
                key={step.id}
                isLastStep={index === steps.length - 1}
                isActive={step.id === currentStep}
                isCompleted={step.id < currentStep}
                desk={step.desk}
              />
            ))}
          </div>
        </div>
        <div className="w-full flex flex-row gap-x-2 md:gap-x-5">
          <div className="w-full border border-b rounded-lg z-50">
            <Select
              value={serviceId?.toString() || ""}
              onValueChange={
                (value: any) => setServiceId(Number(value)) // Set serviceId ketika layanan dipilih
              }>
              <SelectTrigger
                className={`w-full gap-x-4 rounded-lg border-none active:border-none active:outline-none focus:border-none focus:outline-none`}>
                <SelectValue
                  placeholder="Pilih Layanan"
                  className="text-black-80 w-full"
                />
              </SelectTrigger>
              <SelectContent className="bg-line-10">
                {services.map((service) => (
                  <SelectItem
                    key={service.id}
                    className="w-full px-4 pl-8"
                    value={service.id.toString()}>
                    {service.nama}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        {/* Add Data */}
        <div className="flex justify-center m-auto items-center w-full mt-20">
          <Button
            onClick={() => {
              router.push(
                "/super-admin/master-data/service-requirements/create/step-2"
              );
            }}
            className="bg-primary-40 h-10 text-xs md:text-sm px-3 rounded-lg text-white hover:bg-primary-70 border border-primary text-center font-medium justify-end flex gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110duration-300 py-2">
            Selanjutnya
          </Button>
        </div>
        {/* Tambah Data */}
      </div>
    </section>
  );
}
