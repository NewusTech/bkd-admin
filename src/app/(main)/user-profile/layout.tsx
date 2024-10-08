"use client";

import ProfileSideBarScreen from "@/components/layouts/profilebars";
import DashBoardSidebarPages from "@/components/layouts/sidebars";
import { Poppins } from "next/font/google";
import React from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function UserProfileLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main
      className={`${poppins.className} w-full relative flex flex-col min-h-screen`}>
      <div className="flex-1 overflow-y-auto">
        <div className="relative bg-primary-40 h-32 mx-7 mt-7">
          <div className="absolute w-full flex flex-row gap-x-5 px-5 pt-14">
            <ProfileSideBarScreen />

            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
