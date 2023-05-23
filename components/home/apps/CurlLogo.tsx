import React from "react";
import Image from "next/image";
import curlLogo from "../../../assets/apps/curl-logo.png";

function CurlLogo() {
  return (
    <div className="bg-white h-[100px] w-[100px] border-4 rounded-xl border-[#3b7069] p-2 flex items-center justify-center">
      <Image className="object-contain" src={curlLogo} alt="Curl Logo" />
    </div>
  );
}

export default CurlLogo;
