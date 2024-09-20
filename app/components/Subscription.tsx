import React from 'react'
import { ProfileIcon } from '../icons/Social';
import Image from 'next/image';
import bg from '@/app/imgs/man.png'
import vector from "@/app/imgs/grey.png";
import { SubList } from '../constant';

export default function Subscription() {
  return (
    <div>
      <article className="bg-[#2550C0] w-[90%] lg:w-[80%] py-4 px-6 mx-auto flex sm:justify-between flex-col sm:flex-row  rounded-xl my-5 lg:h-[500px] items-center">
        <div className='hidden sm:flex items-center absolute justify-center w-3/4 mt-40'>
          <Image src={vector} className="w-full" alt="" />
          <Image src={vector} className="w-full" alt="" />
          <Image src={vector} className="w-full" alt="" />
        </div>
        <aside className="flex flex-col w-full sm:w-1/2 z-2">
          <h2 className="text-3xl text-white font-semibold lg:w-2/3 mb-5">
            Why You Should Use Our Platform
          </h2>
          <div className="flex space-y-3 flex-col">
            {SubList.map((item) => (
              <div key={item.title} className=" rounded-xl bg-white p-5 m-2">
                <span className="flex items-center space-x-3">
                  <ProfileIcon />
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                </span>
                <p className="text-xs text-[#272727]">{item.body}</p>
              </div>
            ))}
          </div>
        </aside>
        <aside className="w-full sm:w-1/2 ml-auto flex justify-end">
          <Image src={bg} className="w-full xl:w-[80%] 2xl:w-1/2" alt="" />
        </aside>
      </article>
    </div>
  );
}
