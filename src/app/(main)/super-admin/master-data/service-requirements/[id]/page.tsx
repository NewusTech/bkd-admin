"use client";

import Step from "@/components/Steps";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import useUpdateRequirementStore from "@/store/useUpdateRequirement";
import { useEffect, useState } from "react";
import { getFormByService } from "@/services/api";
import { ChevronLeft, Loader } from "lucide-react";

const steps = [
  { id: 1, desk: "Tambah Persyaratan" },
  { id: 2, desk: "Formulir" },
  { id: 3, desk: "Dokumen" },
];
const currentStep = 1;

const UpdateManageRequirementPage = ({
  params,
}: {
  params: {
    id: number;
  };
}) => {
  const { setLayananforms, setServiceId } = useUpdateRequirementStore(
    (state) => ({
      setLayananforms: state.setLayananforms,
      setServiceId: state.setServiceId,
    })
  );
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [detailForms, setDetailForms] = useState<any>();

  const fetchFormData = async (serviceId: number) => {
    try {
      const response = await getFormByService(serviceId);

      setDetailForms(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.id) {
      fetchFormData(params?.id);
    }
  }, [params?.id]);

  const handlePassLayananforms = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setLayananforms(detailForms?.Layanan_forms);
      setServiceId(params.id);
      router.push(
        `/super-admin/master-data/service-requirements/${params.id}/step-2`
      );
    }, 2000);
  };

  return (
    <section className="w-full flex flex-col items-center md:px-5 md:mt-5">
      <div className="w-11/12 md:w-full rounded-lg bg-line-10 shadow-md border border-line-20 p-5 md:p-8">
        <div className="flex flex-row items-center">
          <button onClick={() => router.back()}>
            <ChevronLeft className="w-7 h-7 text-black-80 mr-2" />
          </button>

          <h5 className="text-xl text-start text-black-80 font-normal">
            Detail Persyaratan
          </h5>
        </div>

        <div className="flex justify-center md:justify-end mt-5 md:mt-0">
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
        <div className="py-5 space-y-2">
          <p className="text-[14px] md:text-[16px] text-black-80">
            Jenis Layanan
          </p>
          <div className="w-full rounded-lg py-3 px-4 bg-line-10 text-black-20 border border-line-40">
            {detailForms?.nama}
          </div>
        </div>
        <div className="flex justify-center items-center pt-8">
          <Button
            className="bg-primary-40 hover:bg-primary-70 rounded-full w-[290px] text-line-10"
            onClick={handlePassLayananforms}
            disabled={isLoading ? true : false}>
            {isLoading ? <Loader className="animate-spin" /> : "Lanjut"}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default UpdateManageRequirementPage;
