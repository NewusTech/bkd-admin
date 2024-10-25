"use client";

import InputComponent from "@/components/InputComponent";
import Step from "@/components/Steps";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { CardTypeFile } from "@/types/interface";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { ChevronLeft, Loader } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Swal from "sweetalert2";
import useUpdateRequirementStore from "@/store/useUpdateRequirement";
import { getFormDocByService } from "@/services/api";

const steps = [
  { id: 1, desk: "Tambah Persyaratan" },
  { id: 2, desk: "Formulir" },
  { id: 3, desk: "Dokumen" },
];
const currentStep = 3;

const CreateManageRequirementPageStep3 = () => {
  const { serviceId } = useUpdateRequirementStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cards, setCards] = useState<CardTypeFile[]>([]);
  const [docForm, setDocForm] = useState<any>();

  const fetchDocFormData = async (serviceId: number) => {
    try {
      const response = await getFormDocByService(serviceId);
      setDocForm(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (serviceId) {
      fetchDocFormData(serviceId);
    }
  }, [serviceId]);

  useEffect(() => {
    const initialCards = docForm?.Layanan_forms?.map((item: CardTypeFile) => ({
      id: item.id,
      field: item.field,
      tipedata: item.tipedata,
      isrequired: item.isrequired ? "1" : "0",
    }));
    setCards(initialCards);
  }, [docForm?.Layanan_forms]);

  const handleInputChange = (id: number, field: string, value: any) => {
    setCards(
      cards.map((card) => (card.id === id ? { ...card, [field]: value } : card))
    );
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const requestData = cards.map((card) => ({
      id: card.id,
      field: card.field,
      isrequired: card.isrequired,
      tipedata: card.tipedata,
    }));

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/layanan/docs/updatemulti`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("Authorization")}`,
          },
          body: JSON.stringify(requestData),
        }
      );

      const data = await response.json();
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: `Berhasil Update Pertanyaan Dokument dari Persyaratan Layanan`,
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        router.push("/super-admin/master-data/service-requirements");
        setCards([]);
        localStorage.removeItem("requirement-update");
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
            Dokumen
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
        {cards?.map((card) => (
          <div
            key={card.id}
            className="w-full h-full flex flex-col gap-y-3 rounded-[20px] bg-line-10 p-5 md:p-8">
            <InputComponent
              typeInput="formInput"
              value={card.field}
              onChange={(e) =>
                handleInputChange(card.id, "field", e.target.value)
              }
            />
            <div className="space-y-2 text-[14px] w-full flex flex-col gap-y-3 md:text-[16px] text-black-80">
              <p>Apakah wajib diisi?</p>
              <RadioGroup
                onValueChange={(e) =>
                  handleInputChange(card.id, "isrequired", parseInt(e))
                }
                defaultValue={card?.isrequired}
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
            {/*<div className="mt-8">*/}
            {/*  <div className="flex items-center gap-x-4">*/}
            {/*    <p className="text-sm text-neutral-900">*/}
            {/*      Hanya izinkan dengan file tertentu*/}
            {/*    </p>*/}
            {/*    <Switch*/}
            {/*      onClick={() => handleSwitch(card.id)}*/}
            {/*      className="data-[state=checked]:bg-neutral-800 data-[state=unchecked]:bg-transparent data-[state=unchecked]:border data-[state=unchecked]:border-neutral-800"*/}
            {/*      thumbClassName="data-[state=unchecked]:border data-[state=unchecked]:border-neutral-800 data-[state=unchecked]:ml-[2px]"*/}
            {/*    />*/}
            {/*  </div>*/}
            {/*  {card.toggle && (*/}
            {/*    <div className="w-[321px] flex mt-6">*/}
            {/*      <InputComponent typeInput="radio" />*/}
            {/*    </div>*/}
            {/*  )}*/}
            {/*</div>*/}
            <div className="flex justify-end mt-3">
              {/* <div
                className="cursor-pointer"
                onClick={() => handleRemoveCard(card.id)}>
                <Image
                  src="/icons/trash.svg"
                  alt="trash"
                  width={24}
                  height={24}
                />
              </div> */}
            </div>
          </div>
        ))}
        <div className="flex justify-center items-center pt-8">
          <Button
            onClick={handleSubmit}
            className="bg-primary-40 hover:bg-primary-70 rounded-full w-[290px] text-line-10"
            disabled={isLoading ? true : false}>
            {isLoading ? <Loader className="animate-spin" /> : "Submit"}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CreateManageRequirementPageStep3;
