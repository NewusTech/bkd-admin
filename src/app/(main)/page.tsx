"use client";

import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import DivisionVerificationAdminDashboardPages from "@/components/sections/division_verification_admin/verification_admin_dashboard";

export default function DashboardScreen() {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("Authorization");

    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return (
    <section className="w-full flex flex-col items-center px-5 mt-5">
      <DivisionVerificationAdminDashboardPages />
    </section>
  );
}
