"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SuperAreasMasterDataCard from "@/components/all_cards/superAreasMasterDataCard";
import {
  AccountManagingRolesInterface,
  AreasInterface,
  RolesInterface,
} from "@/types/interface";
import MobileSuperAreasMasterDataCard from "@/components/all_cards/mobile/superAreasMasterDataCard";
import SuperAccountManagingRolesCard from "@/components/all_cards/superAccountManagingRolesCard";
import MobileSuperAccountManagingRolesCard from "@/components/mobile_all_cards/mobileSuperAccountManagingRolesCard";

export default function SuperAccountManagingRolesTablePages({
  accounts,
  areas,
  roles,
  // handleDeleteArea,
  isDeleteLoading,
  data,
  setData,
  isUpdateLoading,
  isDialogEditOpen,
  isDrawerEditOpen,
  setIsDialogEditOpen,
  setIsDrawerEditOpen,
  // handleUpdateArea,
  seen,
  setSeen,
}: {
  accounts: AccountManagingRolesInterface[];
  areas: AreasInterface[];
  roles: RolesInterface[];
  // handleDeleteArea: (slug: string) => void;
  isDeleteLoading: boolean;
  data: {
    bidang_id: string;
    nip: string;
    name: string;
    role_id: string;
    email: string;
    password: string;
  };
  setData: React.Dispatch<
    React.SetStateAction<{
      bidang_id: string;
      nip: string;
      name: string;
      role_id: string;
      email: string;
      password: string;
    }>
  >;
  isUpdateLoading: boolean;
  isDialogEditOpen: boolean;
  isDrawerEditOpen: boolean;
  setIsDialogEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDrawerEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // handleUpdateArea: (e: React.FormEvent<HTMLFormElement>, slug: string) => void;
  seen: boolean;
  setSeen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      {/* mobile*/}
      <div className="md:hidden">
        <>
          {accounts &&
            accounts.length > 0 &&
            accounts.map(
              (account: AccountManagingRolesInterface, i: number) => (
                <MobileSuperAccountManagingRolesCard
                  key={i}
                  account={account}
                  areas={areas}
                  roles={roles}
                  index={i}
                  // handleDeleteArea={handleDeleteArea}
                  isDeleteLoading={isDeleteLoading}
                  data={data}
                  setData={setData}
                  isUpdateLoading={isUpdateLoading}
                  // handleUpdateArea={handleUpdateArea}
                  isDialogEditOpen={isDialogEditOpen}
                  setIsDialogEditOpen={setIsDialogEditOpen}
                  seen={seen}
                  setSeen={setSeen}
                />
              )
            )}
        </>
      </div>
      {/* mobile*/}

      {/* dekstop*/}
      <div className="hidden md:block">
        <Table className="w-full border border-line-20">
          <TableHeader className="bg-primary-40 text-line-10">
            <TableRow className="w-full">
              <TableHead className="text-center">No.</TableHead>
              <TableHead className="text-center">Nama</TableHead>
              <TableHead className="text-center">NIP</TableHead>
              <TableHead className="text-center">Role</TableHead>
              <TableHead className="text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts &&
              accounts.length > 0 &&
              accounts.map(
                (account: AccountManagingRolesInterface, i: number) => (
                  <SuperAccountManagingRolesCard
                    key={i}
                    account={account}
                    areas={areas}
                    roles={roles}
                    index={i}
                    // handleDeleteArea={handleDeleteArea}
                    isDeleteLoading={isDeleteLoading}
                    data={data}
                    setData={setData}
                    isUpdateLoading={isUpdateLoading}
                    // handleUpdateArea={handleUpdateArea}
                    isDialogEditOpen={isDialogEditOpen}
                    setIsDialogEditOpen={setIsDialogEditOpen}
                    seen={seen}
                    setSeen={setSeen}
                  />
                )
              )}
          </TableBody>
        </Table>
      </div>
      {/* dekstop*/}
    </>
  );
}
