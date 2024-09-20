'use client'
import React from 'react'
import Input from './Input';
import { InputCall, InputMessage, InputProfile, InputSMS } from '../icons/Inputs';
import Button from './Button';
import Image from 'next/image';
import vector from "@/app/imgs/grey.png";
import { useContactQuery } from '../hooks/useContact';

export default function Contact() {
  const {
    handleChange,
    handleBlur,
    values,
    errors,
    handleSubmit,
    isSubmitting,
  } = useContactQuery();
  return (
    <div
      id="contact"
      className="flex flex-col space-y-5 sm:flex-row sm:justify-between border-[1px] border-grey-200 p-5 bg-white rounded-xl  w-[90%] sm:w-[80%] mx-auto my-6 !overflow-hidden relative"
    >
      <div className="hidden lg:flex absolute mt-[8em] w-full left-0">
        {/* <Image src={vector} className="" alt="" />
        <Image src={vector} className="" alt="" /> */}
        <Image src={vector} className="w-3/4" alt="" />
        <Image src={vector} className="w-full" alt="" />
        <Image src={vector} className="w-3/4 ml-32" alt="" />
      </div>
      <article className="w-full sm:w-1/2 py-5 px-4 z-20">
        <div className="bg-[#2550C0] p-4 rounded text-white flex-col space-y-2 flex">
          <h2 className="text-2xl font-semibold">Get In Touch With Us</h2>
          <small>
            We’d love to hear from you. Our friendly team is available round the
            clock
          </small>
        </div>
      </article>
      <article className="w-full sm:w-1/2 py-5 px-10  z-20">
        <Input
          label="full name"
          placeholder="john doe"
          name="name"
          type="text"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.name}
          icon={<InputProfile />}
        />
        {errors.name ? (
          <b className="text-xs text-red-500">{errors.name}</b>
        ) : null}
        <Input
          label="email address"
          placeholder="you@gmail.com"
          name="email"
          type="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          icon={<InputSMS />}
        />
        {errors.email ? (
          <b className="text-xs text-red-500">{errors.email}</b>
        ) : null}
        <Input
          label="Phone Number"
          placeholder="0814002992"
          name="phone"
          type="number"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.phone}
          icon={<InputCall />}
        />
        {errors.phone ? (
          <b className="text-xs text-red-500">{errors.phone}</b>
        ) : null}
        <Input
          label="Message"
          placeholder="Leave a Message..."
          name="message"
          type="text"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.message}
          icon={<InputMessage />}
        />
        {errors.message ? (
          <b className="text-xs text-red-500">{errors.message}</b>
        ) : null}
        <Button
          label="Send Message"
          onClick={handleSubmit}
          loading={isSubmitting}
          styles=" text-[#fff] bg-[#2550C0] w-full font-medium"
        />
      </article>
    </div>
  );
}
