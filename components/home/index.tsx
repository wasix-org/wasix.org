import React, { useCallback } from "react";
import WasixLogo from "./WasixLogo";
import Features from "./Features";

import { AiFillCaretDown } from "react-icons/ai";
import Apps from "./Apps";
import CTA from "./CTA";

function Home() {
  const handleScrollToFeatures = useCallback(() => {
    const element = document.getElementById("home-features-anchor");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
  return (
    <>
      <div className="h-[100lvh] w-[100lvw] flex flex-col items-center justify-center">
        <WasixLogo className="h-[100%] w-[100%] sm:h-[80%] sm:w-[50%] dark:shadow-xl dark:shadow-white text-black dark:text-white rounded-xl p-12" />
        <div className=" -translate-y-48 text-center">
          <h2 className="text-3xl md:text-5xl mb-4">Introducing WASIX</h2>
          <h3 className="text-lg md:text-xl">The superset of WASI</h3>
        </div>
        <div
          className="absolute bottom-0 translate-y-2 animate-bounce ease-linear"
          id="home-features-anchor"
          onClick={handleScrollToFeatures}
        >
          <AiFillCaretDown className="text-5xl md:text-7xl" />
        </div>
      </div>
      <main className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Features id={"home-features"} />
        <Apps />
        <CTA />
      </main>
    </>
  );
}

export default Home;
