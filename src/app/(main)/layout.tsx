"use client";

import DashBoardSidebarPages from "@/components/layouts/sidebars";
import MobileDashboardSideBarPages from "@/components/mobile_layouts/mobile_sidebars";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Poppins } from "next/font/google";
import React, { Suspense } from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <main
      className={`${poppins.className} w-full relative flex flex-col min-h-screen`}>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="flex-1 overflow-y-auto bg-line-10">
          {!isMobile ? (
            <div className="w-full flex flex-row">
              <DashBoardSidebarPages />

              <div className="w-full flex flex-row justify-end">
                <div className="w-[77%]">{children}</div>
              </div>
            </div>
          ) : (
            <>
              <MobileDashboardSideBarPages />

              {children}
            </>
          )}
        </div>
      </Suspense>
    </main>
  );
}
