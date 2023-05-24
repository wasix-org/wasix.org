import React, { useCallback } from "react";
import Marquee from "react-fast-marquee";
import { useTheme } from "nextra-theme-docs";

import BashLogo from "./apps/BashLogo";
import BytesLogo from "./apps/BytesLogo";
import CurlLogo from "./apps/CurlLogo";
import HyperLogo from "./apps/HyperLogo";
import LeptosLogo from "./apps/LeptosLogo";
import MioLogo from "./apps/MioLogo";
import PythonLogo from "./apps/PythonLogo";
import RspackLogo from "./apps/RsPackLogo";
import SerdeLogo from "./apps/SerdeLogo";
import TantivyLego from "./apps/TantivyLogo";
import TokioLogo from "./apps/TokioLogo";
import TowerLogo from "./apps/TowerLogo";
import TracingLogo from "./apps/TracingLogo";
import { BsFillHeartFill } from "react-icons/bs";
import { shuffleArray } from "../utils";

const availableApps = [
  BashLogo,
  BytesLogo,
  CurlLogo,
  HyperLogo,
  LeptosLogo,
  MioLogo,
  PythonLogo,
  RspackLogo,
  SerdeLogo,
  TantivyLego,
  TokioLogo,
  TowerLogo,
  TracingLogo,
];
export default function Apps() {
  const { resolvedTheme } = useTheme();

  const randomMarquees = useCallback(() => {
    const range = Array.from({ length: availableApps.length }, (x, i) => i);
    const marquees = [];
    for (let i = 0; i < 5; i++) {
      const marquee = [];
      const shuffledArray = shuffleArray(range);
      for (const num of shuffledArray) {
        marquee.push(availableApps[num]);
      }
      marquees.push(marquee);
    }

    return (
      <>
        {marquees.map((marquee, marqueeIdx) => (
          <Marquee
            key={`marquee-${marqueeIdx}`}
            className="flex flex-row py-2 my-1 overflow-hidden"
            gradient={true}
            gradientWidth={50}
            gradientColor={
              resolvedTheme === "dark" ? [17, 17, 17] : [255, 255, 255]
            }
            direction={(marqueeIdx & 1) === 0 ? "right" : "left"}
            speed={20}
            pauseOnHover={false}
            pauseOnClick={false}
            delay={0}
          >
            {marquee.map((App, appIdx) => (
              <div className="mx-4" key={`marquee-${marqueeIdx}-app-${appIdx}`}>
                <App />
              </div>
            ))}
          </Marquee>
        ))}
      </>
    );
  }, [resolvedTheme]);
  return (
    <div className="my-28">
      <h2 className="text-5xl md:text-7xl font-bold font-sans ml-4 mb-12 sm:ml-0 text-black dark:text-white">
        Just works in WASIX
      </h2>
      <div className="flex flex-col mx-4 rounded-md relative">
        {randomMarquees()}
        <div className="absolute w-full md:w-auto left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] rounded-2xl backdrop-filter backdrop-blur-xl bg-white bg-opacity-30 dark:bg-black dark:bg-opacity-30 z-10 px-16 py-28">
          <p className="text-black dark:text-white text-4xl md:text-5xl md:whitespace-nowrap">
            All the apps you love{" "}
            <span className="inline-flex text-black dark:text-white">
              <BsFillHeartFill className="h-7 w-7" />
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
