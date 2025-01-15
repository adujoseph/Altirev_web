"use client";
import Button from "@/app/components/Button";
import Header from "@/app/components/Header";
import Input from "@/app/components/Input";
import { Toast } from "@/app/components/Toast";
import { useStateContext } from "@/app/context/context";
import { BackArrow } from "@/app/icons/Arrow";
import { PremiumPlanIcon, ProPlanIcon } from "@/app/icons/ArrowUp";
import { addThousandSeparator } from "@/app/utils";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { PaystackButton } from "react-paystack";

export default function page() {
  const { plan } = useParams();
  const navigate = useRouter();
  const [view, setView] = useState(0);
  const [amount, setAmount] = useState(0);
  const [email, setEmail] = useState("");
  const [agentId, setAgentId] = useState(plan === "professional" ? 1 : 101);

  const [isValid, setIsValid] = useState(true);
  const { setPayRef, setEmailRef } = useStateContext();
  // const handleChange = (e: any) => {
  //   const newValue = e.target.value;
  //   if (newValue === "" || (Number(newValue) <= 100 && Number(newValue) >= 1)) {
  //     setAgentId(newValue);
  //   }
  // };
  // const handleChange2 = (e: any) => {
  //   const newValue = e.target.value;
  //   if (
  //     newValue === "" ||
  //     (Number(newValue) <= 1000 && Number(newValue) >= 101)
  //   ) {
  //     setAgentId(newValue);
  //   }
  // };
  const validateEmail = (e?: any) => {
    const email = e.target.value;
    setEmail(email);

    // Regular expression for validating email
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (regex.test(email)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };
  const checkAgentNumber = () => {
    if (!email) {
      Toast({ title: "Input Email", error: true });
      return;
    }
    if (!isValid) {
      Toast({ title: "Invalid Email", error: true });
      return;
    }
    if (!agentId) {
      Toast({ title: "Input Number of AgentId", error: true });
      return;
    }
    if (agentId === 0) {
      Toast({ title: "Number of AgentId Cannot be Zero", error: true });
      return;
    }
    if (plan === "premium" && agentId < 101) {
      Toast({ title: "Number of Agents Cannot be less than 101", error: true });
      return;
    }
    if (plan === "premium" && agentId > 1000) {
      Toast({
        title: "Number of Agents Cannot be more than 1000",
        error: true,
      });
      return;
    }
    if (plan === "professional" && agentId > 100) {
      Toast({ title: "Number of Agents Cannot be more than 100", error: true });
      return;
    }
    setView(1);
  };
  const totalPayment = () => {
    if (plan === "professional") {
      const val = agentId * 5000;
      setAmount(val);
    } else {
      const val = agentId * 4600;
      setAmount(val);
    }
  };
  useEffect(() => {
    agentId && totalPayment();
  }, [agentId]);
  // const publicKey = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;
  const publicKey = "pk_test_3d88065c4d72f0a1f435ca677609ad0da70fc33b";
  // const publicKey = "pk_live_71ce197a14d1f8f768a455308a8a2be87f6bc434";
  // const publicKey = "pk_test_3eb5e531d4ed919aaf3d459a8490e4e9eac550cb";
  const componentProps = {
    email,
    amount: amount * 100,
    // metadata: {
    //   name,
    //   phone,
    // },
    publicKey,
    text: "Pay Now",
    onSuccess: (ref) => {
      if (ref.status === "success")
        Toast({ title: ref?.message, error: false });
      navigate.push("/register");
      setPayRef(ref?.trxref);
      setEmailRef(email);

      return;
    },
  };
  useEffect(() => {
    // Prefetch the dashboard page
    navigate.prefetch("/register");
  }, [navigate]);
  return (
    <div className="bg-white min-h-screen">
      <Header />
      <Link
        prefetch
        href="/"
        className="flex space-x-1 items-center p-5 cursor-pointer"
      >
        <p>
          <BackArrow color="#A5A5A5" />
        </p>
        <p className="text-[#A5A5A5] font-medium">Back</p>
      </Link>
      <section className="py-10">
        {plan === "professional" && (
          <Plan
            title={plan}
            body="Great choice! The Professional Plan offers a range of features to support
      your needs."
            icon={<ProPlanIcon />}
            setView={setView}
            view={view}
            setAgentId={setAgentId}
            setEmail={validateEmail}
            email={email}
            amount={amount}
            componentProps={componentProps}
            agentId={agentId}
            checkAgentNumber={checkAgentNumber}
          />
        )}
        {plan === "premium" && (
          <Plan
            title={plan}
            body=" Fantastic choice! The Premium Plan offers a range of features
to support your needs."
            icon={<PremiumPlanIcon />}
            setView={setView}
            view={view}
            setAgentId={setAgentId}
            setEmail={validateEmail}
            email={email}
            agentId={agentId}
            amount={amount}
            componentProps={componentProps}
            checkAgentNumber={checkAgentNumber}
          />
        )}
      </section>
    </div>
  );
}

export const Plan = ({
  title,
  body,
  icon,
  setView,
  view,
  agentId,
  setAgentId,
  email,
  setEmail,
  amount,
  componentProps,
  checkAgentNumber,
}: any) => (
  <>
    {view === 1 ? (
      <PlanConfirmation
        componentProps={componentProps}
        amount={amount}
        agentId={agentId}
        title={title}
      />
    ) : (
      <section className="flex flex-col space-y-3 justify-center w-full rounded border-[1px] border-[#B7B7B7] sm:w-1/2 items-center mx-auto p-5">
        <p>{icon}</p>
        <h1 className="text-[#272727] font-bold text-2xl capitalize ">
          {title} Plan
        </h1>
        <p className="text-[#272727] w-3/4 text-center">{body}</p>
        <Input
          label="Email"
          placeholder="johndoe@email.com"
          name="email"
          type="email"
          onChange={setEmail}
          value={email}
        />
        <Input
          label="Number of Agent:"
          placeholder="100"
          name="agent"
          type="number"
          onChange={(e) => setAgentId(e.target.value)}
          value={agentId}
        />
        <Button
          //   loading={loading2}
          label="Continue"
          onClick={checkAgentNumber}
          styles={
            agentId && email ? "bg-[#2550C0] w-full" : "bg-[#CBCBCB]  w-full"
          }
        />
        <p className="w-3/4 text-center">
          To complete your subscription, enter the number of agents you need
          access for.
        </p>
      </section>
    )}
  </>
);

export const PlanConfirmation = ({
  title,
  amount,
  agentId,
  componentProps,
}: any) => (
  <section className="flex flex-col space-y-3 w-full rounded border-[1px] border-[#B7B7B7] sm:w-1/2 mx-auto p-5 justify-center items-center">
    <h1 className="text-[#272727] font-bold text-2xl"> Confirmation</h1>
    <div className="flex items-center space-y-3 flex-col w-full">
      <span className="flex items-center justify-between w-full">
        <h2>Plan</h2>
        <p className="text-[#272727] font-bold capitalize">{title}</p>
      </span>
      <hr className="h-0.5 w-full" />
      <span className="flex items-center justify-between w-full">
        <h2>Number of Agent</h2>
        <p className="text-[#272727] font-bold">{agentId}</p>
      </span>
      <hr className="h-0.5 w-full" />

      <span className="flex items-center justify-between w-full">
        <h2>Total Payment</h2>
        <p className="text-[#272727] font-bold">
          {addThousandSeparator(amount)}
        </p>
      </span>
    </div>
    <PaystackButton className="paystack-button" {...componentProps} />
    {/* <Button
      //   loading={loading2}
      label="Pay"
      //   onClick={dashboard}
      styles="bg-[#2550C0]  w-full"
    /> */}
  </section>
);
