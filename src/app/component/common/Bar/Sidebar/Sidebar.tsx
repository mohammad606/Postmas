'use client'
import XMark from "@/app/component/common/icons/XMarkIcon";
import SidebarCompactItem from "@/app/component/common/Bar/Sidebar/SidebarCompactItem";
import SidebarItem from "@/app/component/common/Bar/Sidebar/SidebarItem";
import {useState} from "react";
import MenuIcon from "@/app/component/common/icons/MenuIcon";
import PlusIcon from "@/app/component/common/icons/PlusIcon";


const Sidebar = ()=>{

    const [open,setOpen]= useState(false)


    return (
        <div className={`max-w-[25%]  h-[93vh] ${open ? "w-fit" :"w-full"}  border-gray-200 border-t-[1px] bg-[#262626]`}>
            <div className={` h-16 flex justify-between items-center px-4 ${open ? "hidden" :"w-full"} `}>
                <h1 className={'label'}>Menu</h1>
                <div className={'flex justify-between items-center h-full'}>
                    <PlusIcon className={'w-7 h-7 mr-2 cursor-pointer'} onClick={()=>setOpen(!open)}/>
                    <XMark className={'w-7 h-7 cursor-pointer'} onClick={()=>setOpen(!open)}/>
                </div>
            </div>
            <div className={`${open ? "" :"hidden"} p-4`}>
                <MenuIcon className={`w-8 h-8 cursor-pointer ${open ? "" :"hidden"}`} onClick={()=>setOpen(!open)}/>
            </div>

            <div className={` p-4 h-[calc(100%-64px)] overflow-y-scroll ${open ? "hidden" :"w-full"}`}>
                <ul>
                    <SidebarCompactItem title={("Clinic Management")}>
                        <div className="flex flex-col">
                            <SidebarItem link={"/doctor/clinic/schedules"}>
                                {("Clinics Schedules")}
                            </SidebarItem>
                            <SidebarItem link={"/doctor/clinic/holidays"}>
                                {("Clinic Holidays")}
                            </SidebarItem>
                            <SidebarItem link={"/doctor/clinic/schedules"}>
                                {("Clinics Schedules")}
                            </SidebarItem>
                            <SidebarItem link={"/doctor/clinic/holidays"}>
                                {("Clinic Holidays")}
                            </SidebarItem>
                        </div>
                    </SidebarCompactItem>
                    <SidebarCompactItem title={("Clinic Management")}>
                        <div className="flex flex-col">
                            <SidebarItem link={"/doctor/clinic/schedules"}>
                                {("Clinics Schedules")}
                            </SidebarItem>
                            <SidebarItem link={"/doctor/clinic/holidays"}>
                                {("Clinic Holidays")}
                            </SidebarItem>
                            <SidebarItem link={"/doctor/clinic/schedules"}>
                                {("Clinics Schedules")}
                            </SidebarItem>
                            <SidebarItem link={"/doctor/clinic/holidays"}>
                                {("Clinic Holidays")}
                            </SidebarItem>
                            <SidebarItem link={"/doctor/clinic/schedules"}>
                                {("Clinics Schedules")}
                            </SidebarItem>
                            <SidebarItem link={"/doctor/clinic/holidays"}>
                                {("Clinic Holidays")}
                            </SidebarItem>
                        </div>
                    </SidebarCompactItem>
                    <SidebarCompactItem title={("Clinic Management")}>
                        <div className="flex flex-col">
                            <SidebarItem link={"/doctor/clinic/schedules"}>
                                {("Clinics Schedules")}
                            </SidebarItem>
                            <SidebarItem link={"/doctor/clinic/holidays"}>
                                {("Clinic Holidays")}
                            </SidebarItem>
                            <SidebarItem link={"/doctor/clinic/schedules"}>
                                {("Clinics Schedules")}
                            </SidebarItem>
                            <SidebarItem link={"/doctor/clinic/holidays"}>
                                {("Clinic Holidays")}
                            </SidebarItem>
                        </div>
                    </SidebarCompactItem>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar