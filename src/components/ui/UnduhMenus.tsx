import { useState } from "react";
import { Download, Loader } from "lucide-react";
import { RiFileExcel2Fill } from "react-icons/ri";
import { FaFilePdf } from "react-icons/fa";
import Swal from "sweetalert2";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface UnduhMenusProps {
  fetchPdf: (id: number) => Promise<any>;
  fetchExcel: (id: number) => Promise<any>;
  pdfFileName?: string;
  excelFileName?: string;
  successTitlePdf?: string;
  successTitleExcel?: string;
  id: number;
}

const UnduhMenus: React.FC<UnduhMenusProps> = ({
  fetchPdf,
  fetchExcel,
  pdfFileName = "dokumen.pdf",
  excelFileName = "dokumen.xlsx",
  successTitlePdf = "Berhasil Download PDF!",
  successTitleExcel = "Berhasil Download Excel!",
  id,
}) => {
  const [isLoadingPdf, setIsLoadingPdf] = useState(false);
  const [isLoadingExcel, setIsLoadingExcel] = useState(false);

  const downloadPdf = async () => {
    setIsLoadingPdf(true);
    try {
      const response = await fetchPdf(id);
      const url = window.URL.createObjectURL(response);
      const a = document.createElement("a");
      a.href = url;
      a.download = pdfFileName;
      document.body.appendChild(a);
      a.click();
      a.remove();

      if (response.type === "application/pdf") {
        Swal.fire({
          icon: "success",
          title: successTitlePdf,
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingPdf(false);
    }
  };

  const downloadExcel = async () => {
    setIsLoadingExcel(true);
    try {
      const response = await fetchExcel(id);
      const url = window.URL.createObjectURL(response);
      const a = document.createElement("a");
      a.href = url;
      a.download = excelFileName;
      document.body.appendChild(a);
      a.click();
      a.remove();

      console.log(response, "ini response");

      Swal.fire({
        icon: "success",
        title: successTitleExcel,
        timer: 2000,
        showConfirmButton: false,
        position: "center",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingExcel(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="bg-primary-40 text-[14px] hover:bg-primary-70 text-line-10 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2 w-full gap-x-2">
            <Download className="w-6 h-6 text-line-10" />
            <span>Unduh</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="transition-all duration-300 ease-in-out opacity-1 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 bg-white border border-gray-300 shadow-2xl rounded-md w-fit mr-0 md:mr-6">
          <DropdownMenuLabel className="font-semibold text-primary text-[14px] w-full bg-white">
            Pilihan Unduhan
          </DropdownMenuLabel>
          <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary-50 to-transparent transition-all animate-pulse"></div>
          <div className="flex gap-2 w-full px-2 py-2">
            <Button
              onClick={downloadPdf}
              className="w-full flex flex-row gap-x-4 text-[14px] bg-primary-40 items-center justify-center hover:bg-primary-70 h-10 text-line-10 rounded-lg">
              {isLoadingPdf ? (
                <>
                  <Loader className="animate-spin h-5 w-5" />
                  <span className="transition ease-in-out delay-150 animate-pulse">
                    Loading...
                  </span>
                </>
              ) : (
                <>
                  <FaFilePdf className="w-6 h-6 text-line-10" />
                  <span>Unduh PDF</span>
                </>
              )}
            </Button>
            <Button
              onClick={downloadExcel}
              className="w-full flex flex-row gap-x-4 text-[14px] bg-primary-40 items-center justify-center hover:bg-primary-70 h-10 text-line-10 rounded-lg">
              {isLoadingExcel ? (
                <>
                  <Loader className="animate-spin h-5 w-5" />
                  <span className="transition ease-in-out delay-150 animate-pulse">
                    Loading...
                  </span>
                </>
              ) : (
                <>
                  <RiFileExcel2Fill className="w-6 h-6 text-line-10" />
                  <span>Unduh Excel</span>
                </>
              )}
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UnduhMenus;
