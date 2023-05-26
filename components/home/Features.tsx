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
    Description: () => (
      <p>
        WASIX has full support for sockets (
        <span className="bg-sky-100 dark:bg-sky-800 dark:bg-opacity-30 text-sky-500 px-1 py-[2px] rounded-md font-bold text-xs">
          socket
        </span>
        ,
        <span className="bg-sky-100 dark:bg-sky-800 dark:bg-opacity-30 text-sky-500 px-1 py-[2px] rounded-md font-bold text-xs">
          bind
        </span>
        ,
        <span className="bg-sky-100 dark:bg-sky-800 dark:bg-opacity-30 text-sky-500 px-1 py-[2px] rounded-md font-bold text-xs">
          connect
        </span>
        )
        <ul className="list-disc pl-4 font-bold">
          <li>IPv4, IPv6</li>
          <li>UDP, TCP</li>
          <li>Multicast, Anycast</li>
          <li>RAW sockets</li>
        </ul>
      </p>
    ),
    icon: BsGlobe2,
    iconForeground: "text-sky-500",
    iconBackground: "bg-sky-100 dark:bg-sky-800 dark:bg-opacity-30",
  },
  {
    title: "Multi-threading",
    Description: () => (
      <p>
        Full Support for Efficient{" "}
        <span className="bg-violet-100 dark:bg-violet-900 dark:bg-opacity-30 text-purple-500 px-1 py-[2px] rounded-md font-bold text-xs">
          Multithreading
        </span>
        enabling applications to better utilize system resources and achieve
        superior performance.
      </p>
    ),
    icon: TbRocket,
    iconForeground: "text-purple-500",
    iconBackground: "bg-violet-100 dark:bg-violet-900 dark:bg-opacity-30",
  },
  {
    title: "Asynchronous Runtimes Support",
    Description: () => (
      <p>
        <span className="bg-red-100 dark:bg-red-600 dark:bg-opacity-20 text-red-500 px-1 py-[2px] rounded-md font-bold text-xs">
          Asynchronous
        </span>{" "}
        polling of Sockets and Files for application responsiveness and
        performance.
      </p>
    ),
    icon: FaSyncAlt,
    iconForeground: "text-red-500",
    iconBackground: "bg-red-100 dark:bg-red-600 dark:bg-opacity-20",
  },
  {
    title: "Filesystem Support",
    Description: () => (
      <p>
        WASIX fully supports the POSIX Filesystem API (
        <span className="bg-yellow-100 dark:bg-yellow-800 dark:bg-opacity-30 text-yellow-500 px-1 py-[2px] rounded-md font-bold text-xs">
          open
        </span>
        ,
        <span className="bg-yellow-100 dark:bg-yellow-800 dark:bg-opacity-30 text-yellow-500 px-1 py-[2px] rounded-md font-bold text-xs">
          read
        </span>
        ,
        <span className="bg-yellow-100 dark:bg-yellow-800 dark:bg-opacity-30 text-yellow-500 px-1 py-[2px] rounded-md font-bold text-xs">
          write
        </span>
        ,
        <span className="bg-yellow-100 dark:bg-yellow-800 dark:bg-opacity-30 text-yellow-500 px-1 py-[2px] rounded-md font-bold text-xs">
          close
        </span>
        ) and more.
      </p>
    ),
    icon: VscFileSymlinkDirectory,
    iconForeground: "text-yellow-500",
    iconBackground: "bg-yellow-100 dark:bg-yellow-800 dark:bg-opacity-30",
  },
  {
    title: "Threading Support",
    Description: () => (
      <p>
        WASIX supports threading in both Rust and C:
        <ul className="list-disc pl-4 font-bold">
          <li>
            <span className="bg-rose-100 dark:bg-rose-800 dark:bg-opacity-30 text-rose-700 px-1 py-[2px] rounded-md font-bold text-xs">
              Rayon
            </span>{" "}
            in Rust
          </li>
          <li>
            <span className="bg-rose-100 dark:bg-rose-800 dark:bg-opacity-30 text-rose-700 px-1 py-[2px] rounded-md font-bold text-xs">
              pthreads
            </span>{" "}
            in C
          </li>
        </ul>
      </p>
    ),
    icon: HiLightningBolt,
    iconForeground: "text-rose-700",
    iconBackground: "bg-rose-100 dark:bg-rose-800 dark:bg-opacity-30",
  },
  {
    title: "lngjmp & setjmp",
    Description: () => (
      <p>
        WASIX has support for both
        <span className="bg-indigo-100 dark:bg-indigo-800 dark:bg-opacity-40 text-indigo-500 px-1 py-[2px] rounded-md font-bold text-xs">
          lngjmp
        </span>
        {" and "}
        <span className="bg-indigo-100 dark:bg-indigo-800 dark:bg-opacity-40 text-indigo-500 px-1 py-[2px] rounded-md font-bold text-xs">
          setjmp
        </span>{" "}
        using asyncify.
      </p>
    ),
    icon: TbJumpRope,
    iconForeground: "text-indigo-500",
    iconBackground: "bg-indigo-100 dark:bg-indigo-800 dark:bg-opacity-40",
  },
  {
    title: "Subprocesses",
    Description: () => (
      <p>
        WASIX can create and wait for subprocesses using
        <ul className="list-disc pl-4 font-bold">
          <li>
            <span className="bg-emerald-100 dark:bg-emerald-900 dark:bg-opacity-30 text-emerald-700 px-1 py-[2px] rounded-md font-bold text-xs">
              exec
            </span>{" "}
          </li>
          <li>
            <span className="bg-emerald-100 dark:bg-emerald-900 dark:bg-opacity-30 text-emerald-700 px-1 py-[2px] rounded-md font-bold text-xs">
              wait
            </span>{" "}
          </li>
        </ul>
      </p>
    ),
    icon: GiSpawnNode,
    iconForeground: "text-emerald-700",
    iconBackground: "bg-emerald-100 dark:bg-emerald-900 dark:bg-opacity-30",
  },
  {
    title: "Process Forking",
    Description: () => (
      <p>
        WASIX supports both
        <span className="bg-fuchsia-100 dark:bg-fuchsia-800 dark:bg-opacity-30 text-fuchsia-500 px-1 py-[2px] rounded-md font-bold text-xs">
          fork
        </span>
        {" and "}
        <span className="bg-fuchsia-100 dark:bg-fuchsia-800 dark:bg-opacity-30 text-fuchsia-500 px-1 py-[2px] rounded-md font-bold text-xs">
          vfork
        </span>
        . Allowing a process to create a copy of itself.
      </p>
    ),
    icon: MdForkRight,
    iconForeground: "text-fuchsia-500",
    iconBackground: "bg-fuchsia-100 dark:bg-fuchsia-800 dark:bg-opacity-30",
  },
  {
    title: "TTY Support",
    Description: () => <p>WASIX provides functions to control Terminal I/O.</p>,
    icon: BiTerminal,
    iconForeground: "text-black dark:text-white",
    iconBackground: "bg-gray-100 dark:bg-gray-700 dark:bg-opacity-50",
  },
  {
    title: "Runtime Support",
    Description: () => (
      <p>
        WASIX supports the{" "}
        <span className="bg-violet-100 dark:bg-violet-800 dark:bg-opacity-40 text-violet-500 px-1 py-[2px] rounded-md font-bold text-xs">
          Wasmer
        </span>{" "}
        runtime, with expectations for more runtimes to join soon. WASIX
        provides toolchains for Rust and C, including support for Zig.
      </p>
    ),
    icon: BsGearFill,
    iconForeground: "text-violet-500",
    iconBackground: "bg-violet-100 dark:bg-violet-800 dark:bg-opacity-40",
  },
];

interface FeatureProps {
  id: string;
}

export default function Features({ id }: FeatureProps) {
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    setHydrated(true);
  }, []);
  return (
    <div id={id} className="h-[100slvh]">
      <h2 className="text-5xl md:text-7xl font-bold font-sans ml-4 mb-12 sm:ml-0 text-black dark:text-white">
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
              <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                {hydrated && action.Description()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
