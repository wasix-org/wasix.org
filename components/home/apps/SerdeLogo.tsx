import React from "react";
import Image from "next/image";
import serdeLogo from "../../../assets/apps/serde.png";

function SerdeLogo() {
  return (
    <div className="bg-white bg-opacity-40 h-[100px] w-[100px] border-4 rounded-xl border-black p-2 flex items-center justify-center">
      <Image className="object-contain" src={serdeLogo} alt="Serde Logo" />
    </div>
  );
}

export default SerdeLogo;
