"use client"
import Form from "@/app/component/common/ui/Form";
import Input from "@/app/component/common/ui/Input";
import singIn from "@/app/service/AuthService";

export default function LogIn() {

    const handleSubmit =async (data)=>{

        return await singIn(data.email,data.password)
    }
  return (
      <main className={'flex flex-col'}>
        <Form handleSubmit={handleSubmit}>
            <Input type={'text'} name={'email'} label={'Email'}/>
            <Input type={'text'} name={'password'} label={'Password'}/>

        </Form>
      </main>
  );
}