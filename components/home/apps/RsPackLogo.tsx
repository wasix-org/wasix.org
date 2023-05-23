import React from "react";
import Image from "next/image";
import rspackLogo from "../../../assets/apps/rspack.png";

function RspackLogo() {
  return (
    <div className="bg-[#ffe868] bg-opacity-40 h-[100px] w-[100px] border-4 rounded-xl border-[#5a3926] p-2 flex items-center justify-center">
      <Image className="object-contain" src={rspackLogo} alt="RsPack Logo" />
    </div>
  );
}

export default RspackLogo;
