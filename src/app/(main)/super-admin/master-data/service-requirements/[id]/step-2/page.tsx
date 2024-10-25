"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { selectDataTypeForm } from "@/constants";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CardType, OptionType } from "@/types/interface";
import { Input } from "@/components/ui/input";
import InputComponent from "@/components/InputComponent";
import Step from "@/components/Steps";
import { ChevronLeft, Loader, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import useUpdateRequirementStore from "@/store/useUpdateRequirement";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const steps = [
  { id: 1, desk: "Tambah Persyaratan" },
  { id: 2, desk: "Formulir" },
  { id: 3, desk: "Dokumen" },
];
const currentStep = 2;

const UpdateManageRequirementPageStep2 = () => {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { serviceId, layananforms, dataStep2, setDataStep2 } =
    useUpdateRequirementStore();

  const [cards, setCards] = useState<CardType[]>([]);

  useEffect(() => {
    const initialCards = layananforms?.map((item) => ({
      id: item.id,
      field: item.field,
      tipedata: item.tipedata,
      isrequired: item.isrequired,
      options:
        (item.tipedata === "radio" || item.tipedata === "checkbox") &&
        item.datajson
          ? item.datajson.map((opt: any) => ({ id: opt.id, key: opt.key }))
          : [],
    }));
    setCards(initialCards);
  }, [layananforms]);

  const handleCardChange = (
    id: number,
    field: keyof CardType,
    value: string | number | OptionType[]
  ) => {
    setCards(
      cards.map((card) => (card.id === id ? { ...card, [field]: value } : card))
    );
  };

  const removeOption = (cardId: number, optionId: number) => {
    const updatedCards = cards.map((card) =>
      card.id === cardId
        ? {
            ...card,
            options: card.options
              ?.filter((option) => option.id !== optionId)
              ?.map((option, index) => ({ ...option, id: index + 1 })), // Reassign IDs starting from 1
          }
        : card
    );
    setCards(updatedCards);
  };

  const handleOptionChange = (
    cardId: number,
    optionId: number,
    value: string
  ) => {
    const updatedCards = cards.map((card) =>
      card.id === cardId
        ? {
            ...card,
            options: card.options?.map((option) =>
              option.id === optionId ? { ...option, key: value } : option
            ),
          }
        : card
    );
    setCards(updatedCards);
  };

  useEffect(() => {
    setDataStep2(cards);
  }, [cards, setDataStep2]);

  const handleSubmit = async () => {
    setIsLoading(true);
    const formattedData = dataStep2.map((card) => {
      const formattedCard: any = {
        id: card.id,
        field: card.field,
        tipedata: card.tipedata,
        isrequired: card.isrequired,
        status: 1,
      };

      if (card.tipedata === "radio" || card.tipedata === "checkbox") {
        formattedCard.datajson = card.options?.map((option) => ({
          id: option.id,
          key: option.key,
        }));
      }

      return formattedCard;
    });

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/layanan/form/updatemulti`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("Authorization")}`,
          },
          body: JSON.stringify(formattedData),
        }
      );
      const responseData = await response.json();
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: `Berhasil Mengupdate Pertanyaan untuk Persyaratan Layanan`,
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        router.push(
          `/super-admin/master-data/service-requirements/${serviceId}/step-3`
        );
        setCards([]);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal submit",
        timer: 2000,
        showConfirmButton: false,
        position: "center",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full flex flex-col items-center md:px-5 md:mt-5">
      <div className="w-11/12 md:w-full flex flex-col gap-y-5 rounded-lg bg-line-10 shadow-md border border-line-20 p-5 md:p-8">
        <div className="flex flex-row items-center">
          <button onClick={() => router.back()}>
            <ChevronLeft className="w-7 h-7 text-black-80 mr-2" />
          </button>

          <h5 className="text-xl text-start text-black-80 font-normal">
            Formulir
          </h5>
        </div>

        <div className="flex justify-center md:justify-end">
          <div className="flex">
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
        {cards.map((card) => (
          <div
            key={card.id}
            className="w-full h-full rounded-lg bg-line-10 border border-line-20 p-5 md:p-8 shadow-md">
            <div className="flex gap-x-10 items-end">
              <div className="w-full md:w-8/12">
                <InputComponent
                  typeInput="formInput"
                  value={card.field}
                  onChange={(e) =>
                    handleCardChange(card.id, "field", e.target.value)
                  }
                />
              </div>
              {!isMobile && (
                <div className="w-4/12 space-y-2">
                  <p className="text-sm">Tipe Pertanyaan</p>
                  <Select
                    value={card.tipedata}
                    onValueChange={(e: string) =>
                      handleCardChange(card.id, "tipedata", e)
                    }>
                    <SelectTrigger className="w-full border border-line-20 rounded-lg">
                      <SelectValue placeholder="Pilih Tipe Pertanyaan" />
                    </SelectTrigger>
                    <SelectContent className="bg-line-10 w-full">
                      <SelectGroup>
                        <SelectLabel>Tipe Pertanyaan</SelectLabel>
                        {selectDataTypeForm?.map((item: any) => (
                          <SelectItem key={item.id} value={item.value}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
            <div className="flex justify-between mt-3">
              <div className="space-y-2 text-sm text-black-80">
                <p>Apakah wajib diisi?</p>
                <RadioGroup
                  onValueChange={(e) =>
                    handleCardChange(card.id, "isrequired", parseInt(e))
                  }
                  value={
                    card.isrequired || card.isrequired === true ? "1" : "0"
                  }
                  className="flex space-x-1">
                  <div className="flex items-center space-x-2 space-y-0">
                    <RadioGroupItem value="1" />
                    <p className="font-normal">Ya</p>
                  </div>
                  <div className="flex items-center space-x-2 space-y-0">
                    <RadioGroupItem value="0" />
                    <p className="font-normal">Tidak</p>
                  </div>
                </RadioGroup>
              </div>

              {isMobile && (
                <div className="w-4/12 space-y-2">
                  <p className="text-sm">Tipe Pertanyaan</p>
                  <Select
                    value={card.tipedata}
                    onValueChange={(e: string) =>
                      handleCardChange(card.id, "tipedata", e)
                    }>
                    <SelectTrigger className="w-full border border-line-20 rounded-lg">
                      <SelectValue placeholder="Pilih Tipe Pertanyaan" />
                    </SelectTrigger>
                    <SelectContent className="bg-line-10 w-full">
                      <SelectGroup>
                        <SelectLabel>Tipe Pertanyaan</SelectLabel>
                        {selectDataTypeForm?.map((item: any) => (
                          <SelectItem key={item.id} value={item.value}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
            {/* Menampilkan opsi tambahan jika tipedata adalah radio atau checkbox */}
            {(card.tipedata === "radio" || card.tipedata === "checkbox") && (
              <div className="mt-4 space-y-2">
                <p className="text-sm">Pilihan</p>
                {card.options?.map((option) => (
                  <div key={option.id} className="flex gap-x-3 items-center">
                    <Input
                      type="text"
                      className="rounded-full w-2/12"
                      value={option.key}
                      onChange={(e) =>
                        handleOptionChange(card.id, option.id, e.target.value)
                      }
                      placeholder={`Pilihan ${option.id}`}
                    />
                    <div
                      className="cursor-pointer group"
                      onClick={() => removeOption(card.id, option.id)}>
                      <X className="text-error-50 group-hover:text-error-70" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <div className="flex justify-center items-center pt-8">
          <Button
            className="bg-primary-40 hover:bg-primary-70 rounded-full w-[290px] text-line-10"
            onClick={handleSubmit}
            disabled={isLoading ? true : false}>
            {isLoading ? <Loader className="animate-spin" /> : "Lanjut"}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default UpdateManageRequirementPageStep2;
