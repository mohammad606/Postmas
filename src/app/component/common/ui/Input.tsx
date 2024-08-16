"use client";
import React, { HTMLProps} from "react";
import { useFormContext } from "react-hook-form";


export interface InputProps extends HTMLProps<HTMLInputElement> {
  className?: string | undefined;
  name?: string;
  label?: string;
  type: string;
  required?: boolean;
  setWatch?: React.Dispatch<number>;
  unit?:
    | "IQD"
    | "day"
    | "week"
    | "month"
    | "hour"
    | "sec"
    | "min"
    | "%"
    | undefined;
  min?: number;
}

const Input: React.FC<InputProps> = ({
  className,
  label,
  name,
  type,
  required = false,
  setWatch,
  unit,
  min = 0,
  ...props
}) => {
  const {
    register,
    watch,

  } = useFormContext();
  if (setWatch) {
    setWatch(watch(name ?? ""));
  }





    return (
      <div
        className={`flex ${type == `radio` ? `` : "flex-col"} items-start w-full`}
      >
        {label ? (
          <label className={"label"}>
            {label}
            {unit ? (
              <span className="ml-1 ">
                (<span className="text-green-500">{unit}</span>)
              </span>
            ) : (
              ""
            )}
            {required ? <span className="ml-1 text-red-600">*</span> : false}
          </label>
        ) : (
          ""
        )}
        <input
          {...props}
          {...register(`${name}`)}
          className={
            className ??
            `input input-bordered w-full  focus:outline-pom focus:border-pom`
          }
          min={min}
          type={type}
          step={"any"}
        />
      </div>
    )

};

export default Input;