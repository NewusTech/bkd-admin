"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import DivisionVerificationAdminDashboardPages from "@/components/sections/division_verification_admin/verification_admin_dashboard";
import { AdminProfileInterface } from "@/types/interface";
import { getUserProfile } from "@/services/api";
import SuperAdminDashboardPages from "@/components/sections/super_admin";
import RegionalSecretaryDashboardPages from "@/components/sections/regional-secretary";

export default function DashboardScreen() {
  const router = useRouter();
  const [user, setUser] = useState<AdminProfileInterface>();

  useEffect(() => {
    const token = Cookies.get("Authorization");

    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const fetchUserProfile = async () => {
    try {
      const response = await getUserProfile();
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  // console.log(user, "ini user");

  return (
    <section className="w-full flex flex-col items-center px-5 mt-5">
      {user && user?.role_name === "Super Admin" ? (
        <SuperAdminDashboardPages />
      ) : user && user?.role_name === "Sekretaris Daerah" ? (
        <RegionalSecretaryDashboardPages />
      ) : user && user.role_name === "Kepala Dinas" ? (
        <RegionalSecretaryDashboardPages />
      ) : user && user?.role_name === "Sekretaris Dinas" ? (
        <RegionalSecretaryDashboardPages />
      ) : user && user?.role_name === "Kepala Bidang" ? (
        <DivisionVerificationAdminDashboardPages />
      ) : (
        <DivisionVerificationAdminDashboardPages />
      )}
    </section>
  );
}
