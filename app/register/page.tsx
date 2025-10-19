import bg3 from "@/app/imgs/register.png";
import Registration from "../components/Registration";
import Image from "next/image";
import { Success } from "../icons/Social";
import Link from "next/link";

export default function page() {
  return (
    <div className="flex overflow-hidden h-screen">
      <div className="hidden lg:flex lg:w-1/2">
        <Image src={bg3} className="w-full object-cover" alt="" />
      </div>
      <Registration />
    </div>
  );
}

export const Hurray = () => (
  <div>
    <span className="flex items-center justify-center">
      <Success />
    </span>
    <h2 className="font-bold text-2xl mx-auto w-full text-center text-[#2550C0]">
      Your account has been created successfully! 🎉
    </h2>
    <div className="h-40 overflow-auto bg-slate-50 rounded-md p-4 m-5 shadow">
      <b>Disclaimer:</b> <br />
      <small className="text-gray-500">
        Altirev is an independent platform dedicated to promoting transparency
        and accountability in the electoral process by providing real-time
        election monitoring and insights. Altirev is not authorized to declare
        or publish official election results, a role reserved exclusively for
        the Independent National Electoral Commission (INEC) and State Electoral
        Commission under Nigerian law. All data, insights, and preliminary
        analyses presented on this platform are for informational purposes only
        and are based on observations of election-related activities. Altirev
        does not claim or represent any data as final or official results. Users
        of Altirev should refer to the National or State Electoral Commission
        for official election results and updates. By using this platform, you
        acknowledge and agree that Altirev does not bear any responsibility for
        decisions or actions taken based on the information provided herein.
      </small>
    </div>

    <Link
      prefetch
      href="/dashboard"
      className="flex items-center mx-auto capitalize my-5 justify-center rounded-lg p-2 w-max bg-[#2550C0] text-white "
    >
      accept and go to dashboard
    </Link>
  </div>
);
