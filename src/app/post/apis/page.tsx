"use client"
import {apiData} from "@/app/service/module/Group";
import {Tab} from "@headlessui/react";
import ApiData from "@/app/component/apis/ApiData";
import Headers from "@/app/component/apis/Headers";
import Params from "@/app/component/apis/Params";
import Authorization from "@/app/component/apis/Authorization";

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
}

const page = ({data}: { data: apiData }) => {

    return (
        <div className={"w-full"}>
            <Tab.Group>
                <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                    <Tab
                        className={({ selected }) =>
                            classNames(
                                "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                                "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                                selected
                                    ? "bg-white text-blue-400 shadow"
                                    : "text-blue-500 hover:bg-white/[0.12] hover:text-white",
                            )
                        }
                    >
                        Authorization
                    </Tab>
                    <Tab
                        className={({ selected }) =>
                            classNames(
                                "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                                "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                                selected
                                    ? "bg-white text-blue-400 shadow"
                                    : "text-blue-500 hover:bg-white/[0.12] hover:text-white",
                            )
                        }
                    >
                        Prams
                    </Tab>
                    <Tab
                        className={({ selected }) =>
                            classNames(
                                "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                                "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                                selected
                                    ? "bg-white text-blue-400 shadow"
                                    : "text-blue-500 hover:bg-white/[0.12] hover:text-white",
                            )
                        }
                    >
                        Headers
                    </Tab>
                    <Tab
                        className={({ selected }) =>
                            classNames(
                                "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                                "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                                selected
                                    ? "bg-white text-blue-400 shadow"
                                    : "text-blue-500 hover:bg-white/[0.12] hover:text-white",
                            )
                        }
                    >
                       Body
                    </Tab>
                </Tab.List>
                <Tab.Panels className="mt-2">
                    <Tab.Panel className={"w-full"}>
                        <Authorization data={data}/>
                    </Tab.Panel>
                    <Tab.Panel className={"w-full"}>
                        <Params data={data}/>
                    </Tab.Panel>
                    <Tab.Panel>
                        <Headers data={data}/>
                    </Tab.Panel>
                    <Tab.Panel>
                        <ApiData data={data}/>
                    </Tab.Panel>

                </Tab.Panels>
            </Tab.Group>
        </div>
    )
}

export default page;