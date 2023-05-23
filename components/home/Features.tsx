import React from "react";
import {
  AcademicCapIcon,
  BanknotesIcon,
  CheckBadgeIcon,
  ClockIcon,
  ReceiptRefundIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

import { BsGlobe2, BsGearFill } from "react-icons/bs";
import { TbRocket } from "react-icons/tb";
import { FaSyncAlt } from "react-icons/fa";
import { VscFileSymlinkDirectory } from "react-icons/vsc";
import { HiLightningBolt } from "react-icons/hi";
import { TbJumpRope } from "react-icons/tb";
import { GiSpawnNode } from "react-icons/gi";
import { MdForkRight } from "react-icons/md";
import { BiTerminal } from "react-icons/bi";

const actions = [
  {
    title: "Networking",
    icon: BsGlobe2,
    iconForeground: "text-sky-500",
    iconBackground: "bg-sky-800 bg-opacity-30",
  },
  {
    title: "Multi-threading",
    href: "#",
    icon: TbRocket,
    iconForeground: "text-purple-500",
    iconBackground: "bg-violet-900 bg-opacity-30",
  },
  {
    title: "Asynchronous",
    href: "#",
    icon: FaSyncAlt,
    iconForeground: "text-red-500",
    iconBackground: "bg-red-600 bg-opacity-20",
  },
  {
    title: "Directory Support",
    href: "#",
    icon: VscFileSymlinkDirectory,
    iconForeground: "text-yellow-500",
    iconBackground: "bg-yellow-800 bg-opacity-30",
  },
  {
    title: "pthreads",
    href: "#",
    icon: HiLightningBolt,
    iconForeground: "text-rose-700",
    iconBackground: "bg-rose-800 bg-opacity-30",
  },
  {
    title: "lngjmp & setjmp",
    href: "#",
    icon: TbJumpRope,
    iconForeground: "text-indigo-500",
    iconBackground: "bg-indigo-800 bg-opacity-40",
  },
  {
    title: "Subprocesses",
    href: "#",
    icon: GiSpawnNode,
    iconForeground: "text-emerald-700",
    iconBackground: "bg-emerald-900 bg-opacity-30",
  },
  {
    title: "Process Forking",
    href: "#",
    icon: MdForkRight,
    iconForeground: "text-fuchsia-500",
    iconBackground: "bg-fuchsia-800 bg-opacity-30",
  },
  {
    title: "TTY Support",
    href: "#",
    icon: BiTerminal,
    iconForeground: "text-white",
    iconBackground: "bg-gray-700 bg-opacity-50",
  },
  {
    title: "Runtime Support",
    href: "#",
    icon: BsGearFill,
    iconForeground: "text-amber-500",
    iconBackground: "bg-amber-800 bg-opacity-40",
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Features() {
  return (
    <>
      <h2 className="text-5xl mb-12 ml-4 sm:ml-0">Features</h2>
      <div className="flex flex-col space-y-4 mx-4 sm:ml-0 sm:space-y-0 sm:grid sm:grid-cols-4 sm:gap-4 sm:divide-y-0">
        {actions.map((action) => (
          <div
            key={action.title}
            className={classNames(
              "relative rounded-lg bg-[#181a1b] p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
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
              <h3 className="text-base font-semibold leading-6 text-white">
                {action.title}
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Doloribus dolores nostrum quia qui natus officia quod et
                dolorem. Sit repellendus qui ut at blanditiis et quo et
                molestiae.
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
