'use client'
import React, { useEffect } from "react";

const Tawk = () => {
    let Tawk_API:any
  useEffect(() => {
     Tawk_API = Tawk_API || {};
    const Tawk_LoadStart = new Date();

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://embed.tawk.to/66f67985e5982d6c7bb57c76/1i8pclcec";
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    const firstScript:any = document.getElementsByTagName("script")[0];
    firstScript.parentNode.insertBefore(script, firstScript);

    // Clean up the script when the component unmounts
    return () => {
      firstScript.parentNode.removeChild(script);
    };
  }, []);

  return null; // This component does not render anything visible
};

export default Tawk;
