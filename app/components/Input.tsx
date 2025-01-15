"use client";
import React, { useState } from "react";
import { Copy } from "../icons/ManageUser";
import { EyeIcons, EyeSlash } from "../icons/Social";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: JSX.Element;
  iconFunc?: () => void;
}

export default function Input({
  label,
  name,
  placeholder,
  type,
  value,
  onChange,
  onBlur,
  icon,
  iconFunc,max,maxLength
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <div
      className="login font-semibold capitalize flex flex-col w-full"
    >
      <label htmlFor={label} className="text-sm font-medium">
        {label}
      </label>
      <input
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        max={max}
        maxLength={maxLength}
        placeholder={placeholder}
        className={`p-2 outline-none rounded ${
          value
            ? "border-b-2 border-[#3399FF] bg-[#EDF6FF]"
            : "border-[1px] border-gray-300 text-sm"
        }`}
      />
      {icon && (
        <div
          onClick={iconFunc}
          className="relative -top-[34px] cursor-pointer left-[90%]"
          // onClick={handleShowPassword}
        >
          {icon}
        </div>
      )}
      {type === "password" && !icon && (
        <div
          className="relative -top-8 cursor-pointer w-10 left-[90%]"
          onClick={handleShowPassword}
        >
          {showPassword ? <EyeIcons /> : <EyeSlash />}
        </div>
      )}
    </div>
  );
}
