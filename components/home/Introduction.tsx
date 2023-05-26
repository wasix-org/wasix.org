import React from "react";

export default function Introduction() {
  return (
    <div className="my-28">
      <h2 className="text-6xl sm:text-7xl whitespace-nowrap md:text-[108px] font-bold font-sans ml-4 mb-12 sm:ml-0 text-black dark:text-white">
        Introduction
      </h2>
      <div className="flex flex-col mx-4 rounded-md relative text-xl md:text-2xl font-sans text-justify">
        WASIX is the long term stabilization and support of the existing WASI
        ABI plus additional non-invasive syscall extensions that complete the
        missing gaps sufficiently enough to enable real, practical and useful
        applications to be compiled and used now. It aims to speed up the
        ecosystem around the WASI so that the Wasm’ification of code bases
        around the world can really start today!
      </div>
    </div>
  );
}
