import Image from "next/image";
import Banner from "./components/Banner";
import Header from "./components/Header";
import SectionOne from "./components/SectionOne";
import Subscription from "./components/Subscription";
import vector from "@/app/imgs/grey.png";
import Plans from "./components/Plans";
import { GetStarted } from "./components/GetStarted";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Banner />
      <Image src={vector} className="w-[20%] absolute mt-5 -left-5" alt="" />
      <SectionOne />
      <hr />
      <Subscription />
      <Plans />
      <GetStarted />
      <Contact />
      <Footer />
    </main>
  );
}
