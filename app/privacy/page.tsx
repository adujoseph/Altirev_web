"use client";
import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function page() {
  return (
    <>
      <Header />
      <div className="mx-auto p-5 sm:p-10">
        {/* <Header /> */}
        <h2 className="text-center font-bold text-2xl sm:text-4xl my-5">
          Privacy Policy & Terms of Use
        </h2>
        <p className="text-sm text-gray-500 text-center w-full sm:w-3/4 mx-auto my-5">
          Welcome to Altirev – a civic tech platform built to promote
          transparency, accountability, and community-led election
          monitoring.This document explains both our *Privacy Policy* (how we
          collect and use your data) and *Terms of Use* (the rules for using our
          platform). By accessing or using (https://altirev.com), you agree to
          these terms.
        </p>
        <h3 className="text-2xl font-semibold text-center">Privacy Policy</h3>
        <p className=" text-gray-500 text-center">
          Altirev is a civic engagement platform that enables users to report
          electoral events, log field activities, and observe democratic
          processes in real time.
        </p>
        <h4 className="text-xl font-semibold">
          {" "}
          What We Collect Information You Provide:
        </h4>
        <p className="text-sm text-gray-500">
          When you create an account on the App, we may collect certain personal
          information, such as your name, email address, and profile picture.
          Usage Data: We may collect information about how you use the App, such
          as the features you access, the content you view, and the time you
          spend on the App. Device Information: We may collect information about
          the device you use to access the App, such as the device type,
          operating system, IP address, and unique device identifier. Photo and
          Video Data: You may choose to upload photos and videos to the App for
          wedding planning and sharing purposes.
        </p>
        <h3 className="text-2xl font-semibold ">
          Information You Provide:
        </h3>
        <p className=" text-gray-500 ">
          We use the information we collect from you for the following purposes:
        </p>
        <p className="text-sm text-gray-500">
          👉 Name, email, or phone number (if entered voluntarily)
        </p>
        <p className="text-sm text-gray-500">
          👉 Role selection (e.g., Agent, Observer, Moderator)
        </p>
        <p className="text-sm text-gray-500">
          👉 Content you submit (incident reports, messages, uploads)
        </p>
        <h4 className="">Automatically Collected:</h4>
        <p className="text-sm text-gray-500"> 👉 Device and browser info</p>
        <p className="text-sm text-gray-500">
          {" "}
          👉 IP address and general location
        </p>
        <p className="text-sm text-gray-500">
          {" "}
          👉 Interaction logs (e.g., pages visited, timestamps)
        </p>
        <h3 className="text-2xl font-semibold ">
          Why We Collect It:
        </h3>
        <p className=" text-gray-500">We collect this data to:</p>
        <p className="text-sm text-gray-500">
          {" "}
          👉 Authenticate and assign roles
        </p>
        <p className="text-sm text-gray-500">
          {" "}
          👉 * Improve platform experience{" "}
        </p>
        <p className="text-sm text-gray-500">
          {" "}
          👉 Monitor platform usage and security
        </p>
        <p className="text-sm text-gray-500">
          {" "}
          👉 Allow communication between contributors (if needed)
        </p>
        <p className="text-sm text-gray-500">
          We <b>do not</b> sell or share your personal data with advertisers.
        </p>
        <h4 className="text-xl font-semibold">Who We Share It With:</h4>
        <p className="text-sm text-gray-500">
          {" "}
          👉 Trusted service providers* for hosting, analytics, or support
        </p>
        <p className="text-sm text-gray-500">
          {" "}
          👉 Law enforcement, if legally required
        </p>
        <p className="text-sm text-gray-500">
          {" "}
          👉 Moderators/Admins, with role-based access and strict internal
          guidelines
        </p>
        <h4 className="text-xl font-semibold">Your Rights:</h4>
        <p className="text-sm text-gray-500">You can request:</p>
        <p className="text-sm text-gray-500"> 👉 Access to your data</p>
        <p className="text-sm text-gray-500"> 👉 Correction or deletion</p>
        <p className="text-sm text-gray-500"> 👉 Restriction of processing</p>
        <p className="text-sm text-gray-500"> 👉 Withdrawal of consent</p>
        <h4 className="text-xl font-semibold">Cookies:</h4>
        <p className="text-sm text-gray-500">We use minimal cookies to:</p>
        <p className="text-sm text-gray-500"> 👉 Remember login sessions</p>
        <p className="text-sm text-gray-500">
          {" "}
          👉 Measure anonymized usage statistics
        </p>
        <p className="text-sm text-gray-500">
          {" "}
          👉 You may disable cookies via browser settings, but this may affect
          functionality.
        </p>
        <h4 className="text-xl font-semibold">Data Security:</h4>
        <p className="text-sm text-gray-500">We safeguard your data using:</p>
        <p className="text-sm text-gray-500"> 👉 End-to-end HTTPS</p>
        <p className="text-sm text-gray-500"> 👉 Role-based access control</p>
        <p className="text-sm text-gray-500">
          {" "}
          👉 Secure hosting infrastructure
        </p>
        <h4 className="text-xl font-semibold">Data Retention:</h4>
        <p className="text-sm text-gray-500">
          We retain data only as long as necessary to support our mission. You
          may request deletion of your account and content at any time.
        </p>
        <h4 className="text-xl font-semibold text-center">Terms of Use :</h4>
        <p className="text-sm text-gray-500"> Acceptance of Terms</p>
        <p className="text-sm text-gray-500">
          By using Electionss, you agree to abide by the following rules. If you
          do not agree, please do not use the platform.
        </p>{" "}
        <h4 className="text-xl font-semibold">Platform Purpose :</h4>
        <p className="text-sm text-gray-500">This platform is designed to:</p>
        <p className="text-sm text-gray-500">
          {" "}
          👉 Support peaceful, civic-driven election monitoring
        </p>
        <p className="text-sm text-gray-500">
          {" "}
          👉 Allow verified users (Agents, Observers, Moderators) to contribute
          responsibly
        </p>
        <p className="text-sm text-gray-500">
          {" "}
          👉 Encourage non-partisan transparency
        </p>
        <h4 className="text-xl font-semibold">User Responsibilities :</h4>
        <p className="text-sm text-gray-500">You agree to:</p>
        <p className="text-sm text-gray-500">
          {" "}
          👉 Use the platform lawfully and respectfully
        </p>
        <p className="text-sm text-gray-500">
          {" "}
          👉 Submit only *truthful, non-malicious, and verifiable reports
        </p>
        <p className="text-sm text-gray-500">
          {" "}
          👉 Avoid spamming, misinformation, or political propaganda
        </p>
        <p className="text-sm text-gray-500">
          {" "}
          👉 Not attempt to hack, overload, or reverse engineer the site
        </p>
        <h4 className="text-xl font-semibold">Content Ownership:</h4>
        <p className="text-sm text-gray-500">
          You retain rights to any reports or materials you submit. By uploading
          them, you grant us a non-exclusive license to display, store, and use
          them for civic transparency purposes.
        </p>
        <h4 className="text-xl font-semibold">Account Termination:</h4>
        <p className="text-sm text-gray-500">We reserve the right to:</p>
        <p className="text-sm text-gray-500">
          {" "}
          👉 Suspend or ban users violating these terms
        </p>
        <p className="text-sm text-gray-500">
          {" "}
          👉 Remove harmful, misleading, or offensive content
        </p>
        <p className="text-sm text-gray-500">
          {" "}
          👉 Report illegal activities to authorities
        </p>
        <h4 className="text-xl font-semibold"> Platform Limitations:</h4>
        <p className="text-sm text-gray-500">
          This is a community-based tool. We do not guarantee:
        </p>
        <p className="text-sm text-gray-500">
          {" "}
          👉 The accuracy of all user-submitted content
        </p>
        <p className="text-sm text-gray-500">
          {" "}
          👉 Continuous, uninterrupted access
        </p>
        <p className="text-sm text-gray-500">
          {" "}
          👉 Platform availability during high-load events
        </p>
        <h4 className="text-xl font-semibold">Modifications:</h4>
        <p className="text-sm text-gray-500">
          We may update these policies over time. Major updates will be posted
          on the homepage or emailed to registered users.
        </p>
        <h4 className="text-xl font-semibold">Contact Us :</h4>
        <p className="text-sm text-gray-500">
          Altirev Team 📧 Email: (privacy@altirev.com)
        </p>
      </div>
            <Footer />
      
    </>
  );
}
