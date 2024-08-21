import Form from "@/app/component/common/ui/Form";
import MultInput from "@/app/component/apis/MultInput";
import {apiData} from "@/app/service/module/Group";
import {ApiService} from "@/app/service/ApiService";


const Params =  ({data}: { data: apiData })=>{

    const handleSetParams =async (dataSend:any)=>{
        const send = {
            params:JSON.parse(dataSend.other_data)
        }
        return ApiService.make<ApiService>().updateApi(data.group_id,send,data.id)
    }
    const defHeaders = JSON.stringify(data.params?? {})
    return (
        <div>
            <Form handleSubmit={handleSetParams} buttonText={'Set'}>
                <MultInput lable={"Params"} defaultValues={defHeaders}/>
            </Form>
        </div>
    )
}

export default Params