import React from "react";
import WasixLogo from "./WasixLogo";
import Features from "./Features";

function Home() {
  return (
    <>
      <div className=" h-[100lvh] w-[100lvw] flex flex-col items-center justify-center">
        <WasixLogo className="h-[100%] w-[100%] sm:h-[80%] sm:w-[50%] shadow-xl shadow-white rounded-xl p-12" />
        <div className=" -translate-y-48 text-center">
          <h2 className="text-3xl md:text-5xl mb-4">Introducing WASIX</h2>
          <h3 className="text-lg md:text-xl">The superset of WASI</h3>
        </div>
      </div>
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Features />
      </div>
    </>
  );
}

export default Home;
