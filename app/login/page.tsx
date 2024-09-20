import bg3 from "@/app/imgs/register.png";
import Image from "next/image";
import { Success } from "../icons/Social";
import Login from "../components/Login";
import Link from "next/link";

export default function page() {
  return (
    <div className="flex overflow-hidden h-screen">
      <div className="hidden lg:flex lg:w-1/2">
        <Image src={bg3} className="w-full object-cover" alt="" />
      </div>
      <Login />
    </div>
  );
}

export const Hurray = () => (
  <>
    <span className="flex items-center justify-center">
      <Success />
    </span>

    <h2 className="font-bold text-2xl mx-auto w-full text-center text-[#2550C0]">
      Your password has been reset. 🎉
    </h2>
    <Link
      prefetch
      href="/login"
      className="flex items-center mx-auto capitalize my-5 justify-center rounded-lg p-2 w-max bg-[#2550C0] text-white "
    >
      go to login
    </Link>
  </>
);
