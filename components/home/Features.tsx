import React from "react";

import { BsGlobe2, BsGearFill } from "react-icons/bs";
import { TbRocket } from "react-icons/tb";
import { FaSyncAlt } from "react-icons/fa";
import { VscFileSymlinkDirectory } from "react-icons/vsc";
import { HiLightningBolt } from "react-icons/hi";
import { TbJumpRope } from "react-icons/tb";
import { GiSpawnNode } from "react-icons/gi";
import { MdForkRight } from "react-icons/md";
import { BiTerminal } from "react-icons/bi";
import { classNames } from "../utils";

const actions = [
  {
    title: "Networking",
    icon: BsGlobe2,
    iconForeground: "text-sky-500",
    iconBackground: "bg-sky-100 dark:bg-sky-800 dark:bg-opacity-30",
  },
  {
    title: "Multi-threading",
    icon: TbRocket,
    iconForeground: "text-purple-500",
    iconBackground: " bg-violet-100 dark:bg-violet-900 dark:bg-opacity-30",
  },
  {
    title: "Asynchronous",
    icon: FaSyncAlt,
    iconForeground: "text-red-500",
    iconBackground: " bg-red-100 dark:bg-red-600 dark:bg-opacity-20",
  },
  {
    title: "Directory Support",
    icon: VscFileSymlinkDirectory,
    iconForeground: "text-yellow-500",
    iconBackground: " bg-yellow-100 dark:bg-yellow-800 dark:bg-opacity-30",
  },
  {
    title: "pthreads",
    icon: HiLightningBolt,
    iconForeground: "text-rose-700",
    iconBackground: " bg-rose-100 dark:bg-rose-800 dark:bg-opacity-30",
  },
  {
    title: "lngjmp & setjmp",
    icon: TbJumpRope,
    iconForeground: "text-indigo-500",
    iconBackground: " bg-indigo-100 dark:bg-indigo-800 dark:bg-opacity-40",
  },
  {
    title: "Subprocesses",
    icon: GiSpawnNode,
    iconForeground: "text-emerald-700",
    iconBackground: " bg-emerald-100 dark:bg-emerald-900 dark:bg-opacity-30",
  },
  {
    title: "Process Forking",
    icon: MdForkRight,
    iconForeground: "text-fuchsia-500",
    iconBackground: " bg-fuchsia-100 dark:bg-fuchsia-800 dark:bg-opacity-30",
  },
  {
    title: "TTY Support",
    icon: BiTerminal,
    iconForeground: "text-black dark:text-white",
    iconBackground: " bg-gray-100 dark:bg-gray-700 dark:bg-opacity-50",
  },
  {
    title: "Runtime Support",
    icon: BsGearFill,
    iconForeground: "text-amber-500",
    iconBackground: " bg-amber-100 dark:bg-amber-800 dark:bg-opacity-40",
  },
];

interface FeatureProps {
  id: string;
}

export default function Features({ id }: FeatureProps) {
  return (
    <div id={id} className="h-[100lvh]">
      <h2 className="text-7xl font-bold font-sans my-12 ml-4 sm:ml-0 text-black dark:text-white">
        Features
      </h2>
      <div className="flex flex-col space-y-4 mx-4 sm:ml-0 sm:space-y-0 sm:grid sm:grid-cols-4 sm:gap-4 sm:divide-y-0">
        {actions.map((action) => (
          <div
            key={action.title}
            className={classNames(
              "relative rounded-lg dark:bg-zinc-800 bg-opacity-20 p-6 ring-2 ring-black dark:ring-0"
            )}
          >
            <div className="features-icon">
              <span
                className={classNames(
                  action.iconBackground,
                  action.iconForeground,
                  "inline-flex rounded-lg p-3"
                )}
              >
                <action.icon className="h-6 w-6" aria-hidden="true" />
              </span>
            </div>
            <div className="mt-8">
              <h3 className="text-base font-semibold leading-6 text-black dark:text-white">
                {action.title}
              </h3>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                Doloribus dolores nostrum quia qui natus officia quod et
                dolorem. Sit repellendus qui ut at blanditiis et quo et
                molestiae.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
