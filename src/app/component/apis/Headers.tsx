import Form from "@/app/component/common/ui/Form";
import MultInput from "@/app/component/apis/MultInput";
import {apiData} from "@/app/service/module/Group";
import {ApiService} from "@/app/service/ApiService";


const Headers =  ({data}: { data: apiData })=>{

    const handleSetHeaders =async (dataSend:any)=>{
        const send = {
            headers:JSON.parse(dataSend.other_data)
        }
        return ApiService.make<ApiService>().updateApi(data.group_id,send,data.id)
    }
    console.log(data)

    const defHeaders = JSON.stringify(data.headers?? {})
    return (
        <div>
            <Form handleSubmit={handleSetHeaders} buttonText={'Set'}>
                <MultInput lable={"Headers"} defaultValues={defHeaders}/>
            </Form>
        </div>
    )
}

export default Headers