"use client"
import {apiData} from "@/app/service/module/Group";
import Form from "@/app/component/common/ui/Form";
import SelectPopOverFrom from "@/app/component/common/ui/SelectPopOverForm";
import Input from "@/app/component/common/ui/Input";
import OtherDataInput from "@/app/component/apis/prams";
import {useState} from "react";
import axios from "axios";


const ApiData = ({data}: { data: apiData }) =>{
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSend = async (data) =>{
        setLoading(true);
        console.log(data.other_data)
        // try {
        //     const params = {
        //         param1: 'value1',
        //         param2: 'value2',
        //     };
        //
        //     const res = await fetch(data.api, {
        //         method: data.method,
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(data),
        //     });
        //     const result = await res.json();
        //     setResponse(result);
        // } catch (err) {
        //     setResponse(err);
        // } finally {
        //     setLoading(false);
        // }
    }


    return (
        <div>
           <Form handleSubmit={handleSend} defaultValues={data} disableBtn={true}>
              <div className={'w-full h-20 flex py-6 p-2'}>
                  <div className={'w-[10%]'}>
                      <SelectPopOverFrom name={'method'} status={data.method} ArraySelect={['get',"post","delete","put"]} handleSelect={()=>undefined}/>
                  </div>
                  <div className={'w-[80%]'}>
                      <Input name={"api"} type={'text'}/>
                  </div>
                  <div className={'w-[10%] flex justify-center items-center'}>
                      <button type="submit"
                              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                          {data.method.toUpperCase()}
                      </button>
                  </div>
              </div>

            <div className={'overflow-y-scroll max-h-[50vh]'}>

                    <OtherDataInput />

            </div>
           </Form>
            <div className={'fixed bottom-0 h-[30vh] w-full bg-gray-800'}>
                <div className={'w-full h-8 py-1 px-4 border-b-2 border-gray-400'}>
                    <h2 className={''}>Console</h2>
                </div>
                <div className={'w-full h-full overflow-y-scroll'}>
                    {loading && <p>Loading...</p>}
                    {response && (
                        <pre>{JSON.stringify(response, null, 2)}</pre>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ApiData