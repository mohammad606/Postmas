'use client'
import XMark from "@/app/component/common/icons/XMarkIcon";
import SidebarCompactItem from "@/app/component/common/Bar/Sidebar/SidebarCompactItem";
import SidebarItem from "@/app/component/common/Bar/Sidebar/SidebarItem";
import {useState, Fragment, useContext} from "react";
import MenuIcon from "@/app/component/common/icons/MenuIcon";
import PlusIcon from "@/app/component/common/icons/PlusIcon";
import { Dialog, Transition } from '@headlessui/react'
import SelectPopOver from "@/app/component/common/ui/SelectPopOver";
import Form from "@/app/component/common/ui/Form";
import Input from "@/app/component/common/ui/Input";
import {GroupService} from "@/app/service/GroupService";
import SelectPopOverFrom from "@/app/component/common/ui/SelectPopOverForm";
import {ApiService} from "@/app/service/ApiService";
import {useQuery} from "@tanstack/react-query";
import ApiSelect from "@/app/component/common/ui/ApiSelect";
import {apiData, Group} from "@/app/service/module/Group";
import {ObjectPost, ReFetchPostApi} from "@/app/ProviderQuery";
import {setCookieClient} from "@/app/actions/CookieClient";

const Sidebar = ()=>{
    const [reFetch,setReFetch] = useState(false)
    const [groupid,setgroupid] = useState<number>(1)
    const {data:groupId} = useQuery({
        queryKey:['groupId',reFetch],
        queryFn:async ()=>{
            return await GroupService.make<GroupService>().limitToLast(1)
        }
    })
    const idGroupNew =groupId && groupId?.length > 0 ? groupId[0].id +1 : 0
    const {data:apiId} = useQuery({
        queryKey:['apiId',groupid,reFetch],
        queryFn:async ()=>{
            return await ApiService.make<ApiService>().limitToLast(1,groupid)
        }
    })
    const idApiNew =apiId && apiId?.length > 0 ? apiId[0].id +1: 0

    const {data:group} = useQuery({
        queryKey:['group',reFetch],
        queryFn:async ()=>{
            return await GroupService.make<GroupService>().ReadDataBase()
        }
    })
    const groupArray =Array.isArray(group?.data) ? group.data : [];

    const [open,setOpen]= useState(false)
    let [isOpen, setIsOpen] = useState(false)
    let [selectType,setSelectType] = useState('Create Group')
    const type = selectType == "Create Group" ? "group":"api"
    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const handleSubmit =async (data:any)=>{
        console.log(data)
        if(type == "group"){
            const dataSend = {
                id:idGroupNew,
                name:data.name,
                type:type
            }
            return await GroupService.make<GroupService>().store(idGroupNew,dataSend).then((res)=>{
                setReFetch(!reFetch)
                closeModal()
                return res})
        }else {
            const dataSend = {
                id:idApiNew,
                group_id:data.groupId,
                name:data.name,
                api:data.api,
                method:data.method,
                auth_log:false
            }
            return await ApiService.make<ApiService>().storeApi(data.groupId,dataSend,idApiNew).then((res)=>{
                setReFetch(!reFetch)
                closeModal()
                return res})
        }
    }

    const {postArray,setPostArray} = useContext(ReFetchPostApi)

    const handleSelectApi = (ObjectPost:ObjectPost)=>{
        setPostArray((prevArray: ObjectPost[]) => {
            const exists = prevArray.some(
                (item) => item.group === ObjectPost.group && item.api === ObjectPost.api
            );
            if (exists) {
                return prevArray;
            }
            return [...prevArray, ObjectPost];
        });
        return setCookieClient("post",JSON.stringify(postArray))
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
                                       <h2 className={'label text-white'}>Create :</h2>
                                       <SelectPopOver handleSelect={(select:string)=>setSelectType(select)} id={2} ArraySelect={['Create Group',"Add Api"]} status={selectType}/>
                                       {type == "group"?
                                           <>
                                               <Input label={'Name'} name={'name'} type={'text'}/>
                                           </>
                                           :
                                        <>
                                            <ApiSelect
                                                onSelect={(selectedItem)=>{
                                                    setgroupid(selectedItem?.id ?? 0)
                                                }}
                                                api={() =>
                                                    GroupService.make<GroupService>().ReadDataBase()
                                                }
                                                required={true}
                                                placeHolder={"Select Group name ..."}
                                                name={"groupId"}
                                                label={"Group Name"}
                                                optionValue={"id"}
                                                getOptionLabel={(data: Group) => (data.name)}
                                            />
                                            <Input label={'Name'} name={'name'} type={'text'}/>
                                            <Input label={'Api'} name={'api'} type={'text'}/>
                                            <SelectPopOverFrom  label={'method :'} handleSelect={(select:string)=>undefined} name={'method'} ArraySelect={['get',"post","delete","put"]} status={"get"}/>

                                        </>
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
                        {groupArray?.map((e:Group,index:number)=>{
                            const api = (e?.api && e?.api?.length > 0) ? e.api : []
                            return (
                               <div key={index}>
                                   <SidebarCompactItem title={e.name} >
                                       <div className="flex flex-col">
                                           {api.map((f:apiData,indexApi)=>{
                                               return (
                                                 <div  key={indexApi}>
                                                     <SidebarItem onClick={(e)=>{
                                                         handleSelectApi({
                                                             group:index,
                                                             api:f.id
                                                         })
                                                     }}>
                                                         {f?.name}
                                                     </SidebarItem>
                                                 </div>
                                               )
                                           })}
                                       </div>
                                   </SidebarCompactItem>
                               </div>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Sidebar