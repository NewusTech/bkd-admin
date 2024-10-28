// "use client";

// import waiting from "@/../../public/assets/icons/admin-dashboard-time.png";
// import done from "@/../../public/assets/icons/admin-dashboard-approval.png";
// import revision from "@/../../public/assets/icons/admin-dashboard-revision.png";
// import failed from "@/../../public/assets/icons/admin-dashboard-reject.png";
// import {
//   Bar,
//   BarChart,
//   CartesianGrid,
//   LabelList,
//   XAxis,
//   Label,
//   Pie,
//   PieChart,
//   YAxis,
// } from "recharts";
// import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartLegend,
//   ChartLegendContent,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart";
// import DataNotFound from "@/components/elements/data_not_found";
// import HistoryApplicationMobileFilter from "@/components/elements/filters/mobile/historyApplicationMobileFilter";
// import HistoryApplicationFilter from "@/components/elements/filters/website/historyApplicationFilter";
// import PaginationComponent from "@/components/elements/pagination";
// import MobileDivisionVerificationAdminApplicationHistoryCard from "@/components/mobile_all_cards/mobileDivisionVerificationAdminApplicationHistoryCard";
// import VerificationUserApplicationHistoryTablePages from "@/components/tables/verification_admin_user_application_history_table";
// import { useMediaQuery } from "@/hooks/useMediaQuery";
// import {
//   TabsApplicationSuperAdminDashBoardInterface,
//   UserApplicationHistoryInterface,
// } from "@/types/interface";
// import React from "react";
// import { string } from "zod";
// import Image from "next/image";

// export default function TabsApplicationDepartmentSecretaryDashBoard({
//   layananId,
//   setLayananId,
//   services,
//   fetchPdf,
//   fetchExcel,
//   search,
//   setSearch,
//   startDate,
//   setStartDate,
//   endDate,
//   setEndDate,
//   setMonth,
//   years,
//   setYear,
//   users,
//   pagination,
//   handlePageChange,
//   superAdmin,
// }: TabsApplicationSuperAdminDashBoardInterface) {
//   const isMobile = useMediaQuery("(max-width: 768px)");

//   const chartData = superAdmin?.countbyBidang?.map((item, index) => {
//     let colour: string | undefined = "#FF6600";
//     if (index === 0) colour = "#FF6600";
//     else if (index === 1) colour = "#27DE27";
//     else if (index === 2) colour = "#1B99E9";
//     else if (index === 3) colour = "#FFD94F";

//     return {
//       nama: item?.name,
//       permohonan: item?.permohonan_count,
//       fill: colour,
//     };
//   });

//   const chartConfig = {
//     permohonan: {
//       label: "Permohonan",
//     },
//   } satisfies ChartConfig;

//   const chartDataStaff = superAdmin?.countPegawaibyBidang?.map(
//     (item, index) => {
//       let color: string | undefined = "#FF0000";

//       if (index === 0) color = "#FF0000";
//       else if (index === 1) color = "#44E6FF";
//       else if (index === 2) color = "#646464";
//       else if (index === 3) color = "#5033F5";

//       return {
//         nama: item?.name,
//         jumlah: item?.pegawai_count,
//         fill: color,
//       };
//     }
//   );

//   const chartConfigStaff = {
//     jumlah: {
//       label: "Jumlah",
//     },
//   } satisfies ChartConfig;

//   return (
//     <div className="w-full flex flex-col gap-y-5">
//       <div className="w-full flex flex-col md:mt-5">
//         <div className="w-full md:flex md:flex-row gap-x-5">
//           <Card className="bg-line-10 shadow-md rounded-lg border-none w-full md:w-8/12 mb-4 md:mb-0">
//             <div className="w-full flex flex-col p-3">
//               <div className="w-full flex flex-col items-center p-2 gap-y-5">
//                 <div className="w-full flex flex-col items-center">
//                   <CardTitle className="text-[16px] font-normal">
//                     Jumlah Keseluruhan Pengajuan
//                   </CardTitle>
//                 </div>

//                 <div className="w-full h-0.5 bg-line-20"></div>

//                 <div className="w-full flex flex-row justify-center items-center gap-x-4">
//                   <div className="bg-[#1947BC] px-3 py-3"></div>
//                   <div className="bg-[#BC6D19] px-3 py-3"></div>
//                   <div className="bg-[#D51C7F] px-3 py-3"></div>
//                   <div className="bg-[#4D56B7] px-3 py-3"></div>
//                   <div className="bg-[#039C00] px-3 py-3"></div>
//                 </div>
//               </div>
//             </div>

//             <CardContent>
//               <ChartContainer config={chartConfigBar}>
//                 <BarChart
//                   accessibilityLayer
//                   data={chartDataBar}
//                   layout="vertical"
//                   margin={{
//                     right: 16,
//                   }}>
//                   <YAxis
//                     dataKey="nama"
//                     type="category"
//                     tickLine={false}
//                     tickMargin={10}
//                     axisLine={false}
//                     hide={true}
//                   />

//                   <XAxis
//                     dataKey="bidang"
//                     type="number"
//                     hide={true}
//                     tickLine={false}
//                     tickMargin={10}
//                     axisLine={false}
//                   />
//                   <ChartTooltip
//                     cursor={false}
//                     content={<ChartTooltipContent indicator="line" />}
//                   />
//                   <Bar
//                     dataKey="bidang"
//                     layout="vertical"
//                     fill="#1947BC"
//                     radius={4}>
//                     <LabelList
//                       dataKey="nama"
//                       position="insideLeft"
//                       offset={8}
//                       className="#1947BC"
//                       fill="#ffffff"
//                       fontSize={12}
//                     />
//                     <LabelList
//                       dataKey="bidang"
//                       position="right"
//                       offset={8}
//                       fontSize={12}
//                     />
//                   </Bar>
//                 </BarChart>
//               </ChartContainer>
//             </CardContent>
//           </Card>
//           <Card className="bg-line-10 shadow-md rounded-lg border-none px-4 md:w-5/12 w-full">
//             <div className="w-full flex flex-row justify-between items-center p-3">
//               <CardTitle className="text-[16px] font-normal">
//                 Grafik Status
//               </CardTitle>
//               {/* <div className="flex items-center w-5/12 justify-between">
//                 <Select */}
//               {/* // onValueChange={handleSelectStatusChange} */}
//               {/* >
//                   <SelectTrigger
//                     className={`w-full gap-x-4 rounded-lg border-none active:border-none active:outline-none focus:border-none focus:outline-none`}> */}
//               {/* <Checks className="w-6 h-6 text-black-80" /> */}
//               {/* <SelectValue
//                       placeholder="Sort By"
//                       className="text-black-80 w-full"
//                     />
//                   </SelectTrigger>
//                   <SelectContent className="bg-line-10">
//                     <div className="pt-2"> */}
//               {/* {statusDatas &&
//                   statusDatas.map(
//                     (status: { id: number; value: string }, i: number) => {
//                       return (
//                         <SelectItem
//                           key={i}
//                           className={`w-full px-4`}
//                           value={status.id.toString()}>
//                           {status.value}
//                         </SelectItem>
//                       );
//                     }
//                   )} */}
//               {/* <SelectItem className="w-full px-4 pl-8" value="1">
//                         Hello World
//                       </SelectItem>
//                     </div>
//                   </SelectContent>
//                 </Select>
//               </div> */}
//             </div>

//             <div className="w-full h-0.5 bg-line-20"></div>

//             <CardContent className="flex-1 pb-0">
//               <ChartContainer
//                 config={chartConfigLegend}
//                 className="mx-auto aspect-square max-h-[250px]">
//                 <RadarChart
//                   data={chartDataLegend}
//                   margin={{
//                     top: -40,
//                     bottom: -10,
//                   }}>
//                   <ChartTooltip
//                     cursor={false}
//                     content={<ChartTooltipContent indicator="line" />}
//                   />
//                   <PolarAngleAxis dataKey="bulan" tick={{ fill: "#BC6D19" }} />
//                   <PolarGrid stroke="#cccccc" />
//                   <Radar
//                     dataKey="permohonan"
//                     fill="#1947BC"
//                     stroke="#1947BC"
//                     fillOpacity={0.6}
//                   />
//                   <ChartLegend
//                     className="mt-8"
//                     content={<ChartLegendContent />}
//                   />
//                 </RadarChart>
//               </ChartContainer>
//             </CardContent>
//             {/* <CardFooter className="flex-col gap-2 text-sm">
//               <div className="flex items-center gap-2 font-medium leading-none">
//                 Trending up by 5.2% this month{" "}
//                 <TrendingUp className="h-4 w-4" />
//               </div>
//               <div className="leading-none text-muted-foreground">
//                 Showing total visitors for the last 6 months
//               </div>
//             </CardFooter> */}
//           </Card>
//         </div>
//       </div>

//       <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-x-4">
//         <div className="flex flex-col items-center bg-line-10 shadow-md rounded-lg p-6 md:p-4 gap-y-4 m-auto justify-center">
//           <div className="w-full md:w-3/12 h-full transition-all animate-pulse">
//             <Image
//               src={waiting}
//               alt="Menunggu"
//               width={1000}
//               height={1000}
//               className="w-1/2 h-1/2 md:w-full md:h-full flex justify-center m-auto"
//             />
//           </div>
//           <p className="text-black-80 md:text-sm text-xs">
//             {role && role === "Sekretaris Dinas"
//               ? "Sedang Divalidasi"
//               : role && role === "Kepala Dinas"
//                 ? "Sudah Divalidasi"
//                 : "Sedang Ditandatangi"}
//           </p>
//           <p className="text-primary-40 font-semibold text-xl md:text-4xl">
//             {role && role === "Sekretaris Daerah"
//               ? data?.totalMenungguTandatangan
//               : role === "Kepala Dinas"
//                 ? data?.totalMenungguVerifikasi
//                 : data?.totalMenungguVerifikasi}
//           </p>
//         </div>

//         <div className="flex flex-col items-center bg-line-10 shadow-md rounded-lg p-6 md:p-4 gap-y-4 m-auto justify-center">
//           <div className="w-full md:w-3/12 h-full transition-all animate-pulse">
//             <Image
//               src={done}
//               alt="Berhasil"
//               width={1000}
//               height={1000}
//               className="w-1/2 h-1/2 md:w-full md:h-full flex justify-center m-auto"
//             />
//           </div>
//           <p className="text-black-80 md:text-sm text-xs">Permohonan Selesai</p>
//           <p className="text-primary-40 font-semibold text-xl md:text-4xl">
//             {role && role === "Sekretaris Daerah"
//               ? data?.totalDitandatangan
//               : data?.totalDisetujui}
//           </p>
//         </div>

//         <div className="flex flex-col items-center bg-line-10 shadow-md rounded-lg p-6 md:p-4 gap-y-4 m-auto justify-center">
//           <div className="w-full md:w-3/12 h-full transition-all animate-pulse">
//             <Image
//               src={failed}
//               alt="Gagal"
//               width={1000}
//               height={1000}
//               className="w-1/2 h-1/2 md:w-full md:h-full flex justify-center m-auto"
//             />
//           </div>
//           <p className="text-black-80 md:text-sm text-xs">Permohonan Ditolak</p>
//           <p className="text-primary-40 font-semibold text-xl md:text-4xl">
//             {data && data?.totalDitolak}
//           </p>
//         </div>

//         <div className="flex flex-col items-center bg-line-10 shadow-md rounded-lg p-6 md:p-4 gap-y-4 m-auto justify-center">
//           <div className="w-full md:w-3/12 h-full transition-all animate-pulse">
//             <Image
//               src={revision}
//               alt="Revisi"
//               width={1000}
//               height={1000}
//               className="w-1/2 h-1/2 md:w-full md:h-full flex justify-center m-auto"
//             />
//           </div>
//           <p className="text-black-80 md:text-sm text-xs">
//             Permohonan Direvisi
//           </p>
//           <p className="text-primary-40 font-semibold text-xl md:text-4xl">
//             {data && data?.totalDirevisi}
//           </p>
//         </div>
//       </div>

//       <div className="w-full bg-line-10 rounded-lg shadow-md p-4 flex flex-col gap-y-4">
//         <div
//           className={`w-full flex flex-col ${!isMobile ? "bg-white shadow-md rounded-lg p-5" : ""} gap-y-3`}>
//           <div className="flex items-center w-full h-[40px] justify-between bg-line-10 border border-primary-40 rounded-lg">
//             <Select
//               onValueChange={(value) =>
//                 setLayananId(value === "all" ? undefined : Number(value))
//               }>
//               <SelectTrigger
//                 className={`w-full gap-x-4 text-[14px] rounded-lg border-none active:border-none active:outline-none focus:border-none focus:outline-none`}>
//                 <SelectValue
//                   placeholder="Pilih Layanan"
//                   className="text-black-80 tex-[14px] w-full"
//                 />
//               </SelectTrigger>
//               <SelectContent className="bg-line-10">
//                 <div className="pt-2">
//                   <SelectItem className="w-full px-4" value="all">
//                     Semua Status
//                   </SelectItem>
//                   {services &&
//                     services.map((service: ServiceInterface, i: number) => {
//                       return (
//                         <SelectItem
//                           key={i}
//                           className={`w-full px-4`}
//                           value={service.id.toString()}>
//                           {service?.nama}
//                         </SelectItem>
//                       );
//                     })}
//                 </div>
//               </SelectContent>
//             </Select>
//           </div>

//           <div className={`w-full flex flex-col md:flex-row gap-y-5 gap-x-5`}>
//             <SearchPages
//               search={search}
//               change={(e: any) => setSearch(e.target.value)}
//               placeholder="Pencarian"
//             />

//             <div className="flex flex-row justify-center items-center w-full gap-x-3">
//               <DatePages
//                 date={startDate ?? null}
//                 setDate={(e) => setStartDate(e ?? undefined)}
//               />
//               <p className="text-center">to</p>
//               <DatePages
//                 date={endDate ?? null}
//                 setDate={(e) => setEndDate(e ?? undefined)}
//               />
//             </div>

//             <div className="w-full">
//               <Button className="w-full flex flex-row gap-x-4 text-sm bg-primary-40 items-center justify-center hover:bg-primary-70 h-10 text-line-10 rounded-lg">
//                 <Printer className="w-6 h-6 text-line-10" />

//                 <span>Print</span>
//               </Button>
//             </div>
//           </div>
//         </div>

//         <div className="w-full">
//           {users && users.length > 0 && (
//             <VerificationUserApplicationHistoryTablePages users={users} />
//           )}
//         </div>

//         {users && users.length > 10 && (
//           <div className="w-full">
//             <PaginationComponent
//               currentPage={pagination.currentPage}
//               totalPages={pagination.totalPages}
//               onPageChange={handlePageChange}
//             />
//           </div>
//         )}

//         <div className="w-full">{users.length === 0 && <DataNotFound />}</div>
//       </div>
//     </div>
//   );
// }

import React from "react";

export default function Hello() {
  return <div>Hello world</div>;
}
