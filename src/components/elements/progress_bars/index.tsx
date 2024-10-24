"use client";

import { Progress } from "@/components/ui/progress";

export function getDescription(value: number): string {
  if (value <= 0) {
    return "Belum Dinilai";
  } else if (value > 0 && value <= 30) {
    return "Sangat Buruk";
  } else if (value > 30 && value <= 50) {
    return "Buruk";
  } else if (value > 50 && value <= 75) {
    return "Cukup";
  } else if (value > 75 && value <= 90) {
    return "Baik";
  } else if (value > 90 && value <= 100) {
    return "Sangat Baik";
  }
  return "Nilai tidak valid";
}

export function getBackgroundClass(description: string): string {
  switch (description) {
    case "Sangat Buruk":
      return "bg-error-50";
    case "Buruk":
      return "bg-error-50";
    case "Cukup":
      return "bg-warning-50";
    case "Baik":
      return "bg-primary-40";
    case "Sangat Baik":
      return "bg-success-50";
    case "Belum Dinilai":
      return "bg-secondary-50";
    default:
      return "";
  }
}

export const ProgressBar = ({
  name,
  value,
}: {
  name: string;
  value: number;
}) => {
  const fixValue = Math.round(value);
  const description = getDescription(fixValue);
  const backgroundClass = getBackgroundClass(description);

  return (
    <div className="flex space-x-3 space-y-3 items-center">
      <div className="w-full space-y-1">
        <div className="flex justify-between text-sm text-black-80">
          <div className="hover:text-primary-40 hover:underline transition-colors duration-300">
            <h4 className="text-[12px] md:text-[14px]">{name}</h4>
          </div>
          <div className="hover:text-primary-40 hover:underline transition-colors duration-300">
            <p className="text-[12px] md:text-[14px]">{fixValue}</p>
          </div>
        </div>
        <div className="border border-line-10 bg-line-20 rounded-full">
          <Progress value={fixValue} />
        </div>
      </div>
      <div
        className={`text-[10px] ${backgroundClass} h-10 w-20 flex items-center justify-center rounded-lg text-line-10 px-2 py-1`}>
        <p className="text-center">{description}</p>
      </div>
    </div>
  );
};
