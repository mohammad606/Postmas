"use client"
import {apiData} from "@/app/service/module/Group";
import Form from "@/app/component/common/ui/Form";
import SelectPopOverFrom from "@/app/component/common/ui/SelectPopOverForm";
import Input from "@/app/component/common/ui/Input";
import {useState} from "react";
import axios from "axios";
import ReactJson from 'react-json-view';
import MultInput from "@/app/component/apis/MultInput";
import ExtractToken from "@/hook/ExtractTheToken";
import {GroupService} from "@/app/service/GroupService";
import {ApiService} from "@/app/service/ApiService";
const ApiData = ({ data }: { data: apiData }) => {
    const [response, setResponse] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleSend = async (dataSend: any) => {
        setLoading(true);
        const other = JSON.parse(dataSend.other_data || '{}');
        let head ;
        if(data.token && data.headers){
            head = {
                ...data.headers,
                Authorization:`Bearer ${data.token}`
            }
        }else if(data.token && !data.headers) {
            head = {
                Authorization:"Bearer data.token"
            }
        }else {
            head = {}
        }



        try {
            const config: any = {
                url: dataSend.api,
                method: dataSend.method,
                headers: head ?? { 'Content-Type': 'application/json' },
                params: dataSend.params ?? {},
                data: dataSend.method !== 'GET' && dataSend.method !== 'HEAD' ? other : undefined,
            };

            let res;
            res = await axios(config);
            if (res && res.data) {
                const token = ExtractToken(res);
                if (data.auth_log && token) {
                    await GroupService.make<GroupService>().update(data.group_id, {
                        auth: [{ name: "token", value: token }]
                    });
                }
                setResponse(res.data);
                return await ApiService.make<ApiService>().updateApi(data.group_id,{
                    api:dataSend.api,
                    body:dataSend.other_data},data.id)
            } else {
                setResponse({ error: "No data found in response" });
            }
        } catch (err: any) {
            setResponse({ error: err.message || "An error occurred" });
        } finally {
            setLoading(false);
        }
    };

    console.log(response);
    return (
        <div>
            <Form handleSubmit={handleSend} defaultValues={data} disableBtn={true}>
                <div className={'w-full h-20 flex py-6 p-2'}>
                    <div className={'w-[10%]'}>
                        <SelectPopOverFrom name={'method'} status={data.method}
                                           ArraySelect={['get', 'post', 'delete', 'put']}
                                           handleSelect={() => undefined}/>
                    </div>
                    <div className={'w-[80%]'}>
                        <Input name={"api"} type={'text'}/>
                    </div>
                    <div className={'w-[10%] flex justify-center items-center'}>
                        <button type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                            {data.method.toUpperCase()}
                        </button>
                    </div>
                </div>


                <div className={'overflow-y-scroll max-h-[50vh]'}>
                    <MultInput lable={'Body'} defaultValues={data.body}/>
                </div>
            </Form>
            <div className={'fixed bottom-0 h-[30vh] w-full bg-gray-800'}>
                <div className={'w-full h-8 py-1 px-4 border-b-2 border-gray-400'}>
                    <h2 className={''}>Console</h2>
                </div>
                <div className={'w-full h-full overflow-y-scroll '}>
                    {loading && <p>Loading...</p>}
                    {response && (
                        <ReactJson src={response} theme="monokai" collapsed={false}/>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ApiData;