import React from "react";
import bashLogo from "../../../assets/apps/bash_logo.png";
import Image from "next/image";

function BashLogo() {
  return (
    <div className="bg-gray-800 h-[100px] w-[100px] border-4 rounded-xl border-[#60b23d] p-4">
      <Image
        className=" object-contain -translate-y-1"
        src={bashLogo}
        alt="Bash Logo"
      />
    </div>
  );
}

export default BashLogo;
