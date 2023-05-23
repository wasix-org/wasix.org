import React from "react";
import Image from "next/image";
import hyperLogo from "../../../assets/apps/hyper.png";

function HyperLogo() {
  return (
    <div className="bg-white h-[100px] w-[100px] border-4 rounded-xl border-black p-2 flex items-center justify-center">
      <Image className="object-contain" src={hyperLogo} alt="Hyper Logo" />
    </div>
  );
}

export default HyperLogo;
