"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import DivisionVerificationAdminDashboardPages from "@/components/sections/division_verification_admin/verification_admin_dashboard";
import { JwtPayload } from "@/types/interface";

import SuperAdminDashboardPages from "@/components/sections/super_admin";
import RegionalSecretaryDashboardPages from "@/components/sections/regional-secretary";
import { jwtDecode } from "jwt-decode";

export default function DashboardScreen() {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const token = Cookies.get("Authorization");

    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);

        if (decoded && decoded.role !== undefined) {
          setRole(decoded.role);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    } else {
      router.push("/login");
    }
  }, [router]);

  return (
    <section className="w-full flex flex-col items-center px-5 mt-5">
      {role && role === "Super Admin" ? (
        <SuperAdminDashboardPages />
      ) : role && role === "Sekretaris Daerah" ? (
        <RegionalSecretaryDashboardPages />
      ) : role && role === "Kepala Dinas" ? (
        <RegionalSecretaryDashboardPages />
      ) : role && role === "Sekretaris Dinas" ? (
        <RegionalSecretaryDashboardPages />
      ) : role && role === "Kepala Bidang" ? (
        <DivisionVerificationAdminDashboardPages />
      ) : (
        <DivisionVerificationAdminDashboardPages />
      )}
    </section>
  );
}
