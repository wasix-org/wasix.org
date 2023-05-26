import React from "react";
export default function CTA() {
  return (
    <div className="mb-28">
      <div className="relative isolate overflow-hidden  bg-opacity-100 bg-black dark:bg-opacity-90 dark:bg-white px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
        <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl dark:text-black">
          Get started with Wasix
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300 dark:text-gray-700">
          You can get started with Wasix by installing the toolchain and trying
          out the examples. Join the community to get help and share your
          projects.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="/docs"
            className="rounded-md bg-white dark:bg-black px-3.5 py-2.5 text-sm font-semibold text-gray-900 dark:text-white shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Documentation
          </a>
          <a
            href="https://discord.gg/qBTfsNP7N8"
            className="text-sm font-semibold leading-6 text-white dark:text-black "
          >
            Join the Community <span aria-hidden="true">→</span>
          </a>
        </div>
        <svg
          viewBox="0 0 1024 1024"
          className="absolute left-1/2 top-1/2 -z-10 h-[72rem] w-[72rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
          aria-hidden="true"
        >
          <circle
            cx={512}
            cy={512}
            r={512}
            fill="url(#radial-gradient-sky-to-cyan)"
            fillOpacity="1"
          />
          <defs>
            <radialGradient id="radial-gradient-sky-to-cyan">
              <stop stopColor="#4846dd" />
              <stop offset={1} stopColor="#4846dd" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
