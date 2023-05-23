import React from "react";
import Image from "next/image";
import pythonLogo from "../../../assets/apps/python.png";

function PythonLogo() {
  return (
    <div className="bg-[#ffe874] bg-opacity-40 h-[100px] w-[100px] border-4 rounded-xl border-[#498ec0] p-4 flex items-center justify-center">
      <Image
        className="object-contain translate-y-1"
        src={pythonLogo}
        alt="Python Logo"
      />
    </div>
  );
}

export default PythonLogo;
