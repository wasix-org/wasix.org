import React from "react";
import Image from "next/image";
import tantivyLogo from "../../../assets/apps/tantivy.png";

function TantivyLego() {
  return (
    <div className="bg-[#a3b7d3] h-[100px] w-[100px] border-4 rounded-xl border-[#464646] p-2 flex items-center justify-center">
      <Image className="object-contain" src={tantivyLogo} alt="Tantivy Logo" />
    </div>
  );
}

export default TantivyLego;
