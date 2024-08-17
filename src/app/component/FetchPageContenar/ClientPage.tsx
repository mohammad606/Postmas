"use client";
import { Tab } from "@headlessui/react";
import {useContext} from "react";
import { ReFetchPostApi } from "@/app/ProviderQuery";
import { useQuery } from "@tanstack/react-query";
import { GroupService } from "@/app/service/GroupService";
import { Group } from "@/app/service/module/Group";
import ApiData from "@/app/post/apis/page";

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
}

const ClientPage = () => {
    const { postArray, setPostArray } = useContext(ReFetchPostApi);
    const { data: group } = useQuery({
        queryKey: ["group"],
        queryFn: async () => {
            return await GroupService.make<GroupService>().ReadDataBase();
        },
    });

    const groupArray = Array.isArray(group?.data) ? group.data : [];

    return (
        <div className={"w-full"}>
            <Tab.Group>
                <div className={"w-full h-10"}>
                    <Tab.List className="flex w-full h-full space-x-1 bg-[#1d1d1d]">
                        {groupArray.map((e: Group) => {
                            const filteredApis =
                                e.api?.filter((api) =>
                                    postArray.some((t) => t.group === e.id && t.api === api.id)
                                ) ?? [];

                            return filteredApis.map((api) => (
                                <Tab
                                    key={api.id}
                                    className={({ selected }) =>
                                        classNames(
                                            "w-36 h-full border-[1px] border-gray-200 bg-[#1d1d1d]",
                                            selected
                                                ? "!border-b-[2px] !border-orange-500"
                                                : "text-white"
                                        )
                                    }
                                >
                                    {api.name}
                                </Tab>
                            ));
                        })}
                    </Tab.List>
                    <hr />
                </div>
                <Tab.Panels>
                    {groupArray.map((e: Group) => {
                        const filteredApis =
                            e.api?.filter((api) =>
                                postArray.some((t) => t.group === e.id && t.api === api.id)
                            ) ?? [];

                        return filteredApis.map((api) => (
                            <Tab.Panel className={"w-full"}>
                                <div className={"w-full h-[calc(100vh-108px)]"}>
                                    <ApiData data={api}/>
                                </div>
                            </Tab.Panel>
                        ));
                    })}
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
};

export default ClientPage;