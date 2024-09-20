'use client'
import Card from '@/app/components/Card'
import { Toast } from '@/app/components/Toast'
import ModalCard from '@/app/components/modal/Modal'
import { useSettingQuery } from '@/app/hooks/useSettingQuery'
import React, { useDeferredValue, useState } from 'react'
import Button from './Button'
import Input from './Input'

const UpdatePassword = ({ setAddUserModal }: any) => {
  const {
    password,
    password2,
    password3,
    setPassword2,
    setPassword3,
    setPassword,
    handleSubmit
  } = useSettingQuery()
  return (
    <form className="flex items-center justify-center flex-col space-y-3 mt-4 overflow-hidden">
      <aside className="flex flex-col space-y-3 w-full">
        <Input
          label="Old Password"
          placeholder="********"
          name="password"
          type="password"
          //   onChange={handleChange}
          //   onBlur={handleBlur}
          //   value={values.name}
        />
        {/* {errors.name ? (
          <b className="text-xs text-red-700 italic">{errors.name}</b>
        ) : null} */}{" "}
        <Input
          label="New Password"
          placeholder="********"
          name="password"
          type="password"
          //   onChange={handleChange}
          //   onBlur={handleBlur}
          //   value={values.name}
        />
        {/* {errors.name ? (
          <b className="text-xs text-red-700 italic">{errors.name}</b>
        ) : null} */}{" "}
        <Input
          label="Confirm Password"
          placeholder="********"
          name="password"
          type="password"
          //   onChange={handleChange}
          //   onBlur={handleBlur}
          //   value={values.name}
        />
        {/* {errors.name ? (
          <b className="text-xs text-red-700 italic">{errors.name}</b>
        ) : null} */}
      </aside>

      <Button
        // loading={loading2}
        disabled={!password2 && !password && !password3}
        className={
          password2 && password && password3
            ? "bg-primary"
            : "bg-secondary"
        }
        label="Save"
        onClick={handleSubmit}
        styles="bg-[#2550C0]  w-full"
      />
    </form>
  );
}

export default UpdatePassword
