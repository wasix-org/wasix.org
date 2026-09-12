"use client";
import { useEffect, useRef, useState } from "react";
import { LuCheck, LuCopy } from "react-icons/lu";

export default function CopyCommand({
  command,
  label = "Copy command",
}: {
  command: string;
  label?: string;
}) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timeout.current) clearTimeout(timeout.current);
    },
    [],
  );
  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setStatus("idle"), 2500);
  }
  return (
    <span className="copy-control">
      <button type="button" onClick={copy} aria-label={label} title={label}>
        {status === "copied" ? <LuCheck /> : <LuCopy />}
      </button>
      <span
        role="status"
        className={status === "idle" ? "sr-only" : "copy-status"}
      >
        {status === "copied"
          ? "Copied!"
          : status === "error"
            ? "Select and copy the command manually."
            : ""}
      </span>
    </span>
  );
}
