"use client";
import React from "react";
import {FormProvider, useForm} from "react-hook-form";


const Form = ({
                  children,
                  handleSubmit,
                  onSuccess,
                  defaultValues = {},
                  buttonText = "Submit",
                  showToastMessage = true,
                  disableBtn = false
              }: {
    children: React.ReactNode;
    handleSubmit: (data: any) =>any;
    defaultValues?: object | undefined | null;
    onSuccess?: (res: any) => void;
    buttonText?: string;
    showToastMessage?: boolean;
    disableBtn?:boolean
}) => {
    // @ts-ignore
    const methods = useForm({ defaultValues: defaultValues });

    const onSubmit = async (data: any) => {
        return await handleSubmit(data);
    };


    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(onSubmit)}
                encType="multipart/form-data"
            >

                {children}
                {disableBtn?"":
                    <div
                        className="flex justify-center items-center my-5"
                        onClick={() => {
                            methods.clearErrors();
                        }}
                    >
                        <button
                            className={'btn bg-pom text-white hover:text-pom hover:bg-white hover:border-pom'}
                            type="submit"
                            disabled={methods.formState.isSubmitting}
                        >
                            {buttonText}{" "}
                            {methods.formState.isSubmitting ? (
                                <span className="mx-1">
              </span>
                            ) : (
                                ""
                            )}
                        </button>
                    </div>}


            </form>
        </FormProvider>
    );
};

export default Form;