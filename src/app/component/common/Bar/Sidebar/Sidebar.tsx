'use client'
import XMark from "@/app/component/common/icons/XMarkIcon";
import SidebarCompactItem from "@/app/component/common/Bar/Sidebar/SidebarCompactItem";
import SidebarItem from "@/app/component/common/Bar/Sidebar/SidebarItem";
import {useState ,Fragment} from "react";
import MenuIcon from "@/app/component/common/icons/MenuIcon";
import PlusIcon from "@/app/component/common/icons/PlusIcon";
import { Dialog, Transition } from '@headlessui/react'
import SelectPopOver from "@/app/component/common/ui/SelectPopOver";
import Form from "@/app/component/common/ui/Form";
import Input from "@/app/component/common/ui/Input";

const Sidebar = ()=>{

    const [open,setOpen]= useState(false)
    let [isOpen, setIsOpen] = useState(false)
    let [selectType,setSelectType] = useState('Create Group')
    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const handleSubmit = (data:any)=>{

    }

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                {/*// @ts-ignore*/}
                <Dialog as="div" className="relative bg-black/50 z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed bg-black/50 inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full bg-white/50 max-w-md transform overflow-hidden rounded-2xl  p-6 text-left align-middle shadow-xl transition-all">
                                   <Form handleSubmit={handleSubmit}>
                                       <h2 className={'label text-black'}>Create :</h2>
                                       <SelectPopOver handleSelect={(select:string)=>setSelectType(select)} id={2} ArraySelect={['Create Group',"Add Api"]} status={selectType}/>
                                       {selectType == "Create Group"?<Input label={'Name'} name={'name'} type={'text'}/>:
                                        ""
                                       }
                                   </Form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            <div className={`max-w-[25%]  h-[93vh] ${open ? "w-fit" :"w-full"}  border-gray-200 border-t-[1px] bg-[#262626]`}>
                <div className={` h-16 flex justify-between items-center px-4 ${open ? "hidden" :"w-full"} `}>
                    <h1 className={'label'}>Menu</h1>
                    <div className={'flex justify-between items-center h-full'}>
                        <PlusIcon className={'w-7 h-7 mr-2 cursor-pointer'} onClick={openModal}/>
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
        </>
    )
}

export default Sidebar