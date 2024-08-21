import Form from "@/app/component/common/ui/Form";
import {apiData, Group} from "@/app/service/module/Group";
import {ApiService} from "@/app/service/ApiService";
import SelectPopOverFrom from "@/app/component/common/ui/SelectPopOverForm";
import {useState} from "react";
import ApiSelect from "@/app/component/common/ui/ApiSelect";
import {keyService} from "@/app/service/KeyService";


const Authorization =  ({data}: { data: apiData })=>{

    const [check,setCheck] = useState(data.auth_log)

    const handleSetHeaders =async (dataSend:any)=>{
        const send = check ? {
            "auth_log" :check
        }:{
            "auth_log":false,
            token:dataSend.auth
        }
        return ApiService.make<ApiService>().updateApi(data.group_id,send,data.id)
    }

    return (
        <div>
            <Form handleSubmit={handleSetHeaders} buttonText={'Set'}>
                <div className={'my-4 flex w-full gap-4 items-center'}>
                    <label className={'label w-[20%]'}>Save The Token ?</label>
                    <input checked={check} type="checkbox" className="checkbox checkbox-warning" onClick={(e)=>setCheck(!check)}/>
                </div>
                {check?"":
                    <ApiSelect
                        api={() =>
                            keyService.make<keyService>(data.group_id).ReadDataBase()
                        }
                        required={true}
                        placeHolder={"Select Group name ..."}
                        name={"auth"}
                        label={"Type Of Key"}
                        optionValue={"value"}
                        getOptionLabel={(data: { name:string,value:string }) => (data.name)}
                    />
                }
            </Form>
        </div>
    )
}

export default Authorization