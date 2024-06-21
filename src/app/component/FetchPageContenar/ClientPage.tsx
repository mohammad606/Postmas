"use client"
import { Tab } from "@headlessui/react";


function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
}
const ClientPage = ()=>{



    const array = []


    return (
        <div className={'w-full'}>
            <Tab.Group>
                 <div className={'w-full h-10'}>
                     <Tab.List className="flex w-full h-full space-x-1  bg-[#1d1d1d] ">
                         <Tab
                             className={({ selected }) =>
                                 classNames(
                                     "w-36  h-full border-[1px]  border-gray-200  bg-[#1d1d1d]",
                                     selected
                                         ? " !border-b-[2px] !border-orange-500"
                                         : "text-white ",
                                 )
                             }
                         >
                             Overview
                         </Tab>
                         <Tab
                             className={({ selected }) =>
                                 classNames(
                                     "w-36  h-full border-[1px]  border-gray-200  bg-[#1d1d1d]",
                                     selected
                                         ? " !border-b-[2px] !border-orange-500"
                                         : "text-white ",
                                 )
                             }
                         >
                             Overview
                         </Tab>
                         <Tab
                             className={({ selected }) =>
                                 classNames(
                                     "w-36  h-full border-[1px]  border-gray-200  bg-[#1d1d1d]",
                                     selected
                                         ? " !border-b-[2px] !border-orange-500"
                                         : "text-white ",
                                 )
                             }
                         >
                             Overview
                         </Tab>
                     </Tab.List>
                     <hr />
                 </div>
                <Tab.Panels >
                    <Tab.Panel className={"w-full"}>
                        <div className={'w-full h-[calc(100vh-108px)]'}></div>
                    </Tab.Panel>
                    <Tab.Panel className={"w-full"}>
                        <div className={'w-full h-full'}></div>
                    </Tab.Panel>
                    <Tab.Panel className={"w-full"}>
                        <div className={'w-full h-full'}></div>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    )
}

export default ClientPage