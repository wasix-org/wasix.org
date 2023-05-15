import React from "react";
// import image from Next.js
import Image from "next/image";

import wasixExplained from "../assets/wasix-explained.png";

function WasixExplained() {
  return (
    <div className="p-2 my-4 flex justify-center w-full">
      <Image
        className=" max-w-md"
        alt={"WASIX Explained"}
        src={wasixExplained}
      />
    </div>
  );
}

export default WasixExplained;
