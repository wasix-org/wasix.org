import {
  LuArrowRight,
  LuCpu,
  LuFolderOpen,
  LuGitBranch,
  LuNetwork,
} from "react-icons/lu";
import { WasixMark } from "./Logo";

export default function WasixExplained() {
  return (
    <figure
      className="docs-platform-diagram"
      aria-label="WASIX extends the WASI foundation with system capabilities such as threads, networking, processes, and files."
    >
      <div className="docs-platform-top">
        <span>THE WASIX PLATFORM</span>
        <WasixMark />
      </div>
      <div className="docs-platform-features">
        {[
          { icon: LuCpu, label: "Threads" },
          { icon: LuNetwork, label: "Networking" },
          { icon: LuGitBranch, label: "Processes" },
          { icon: LuFolderOpen, label: "Files & I/O" },
        ].map(({ icon: Icon, label }) => (
          <span key={label}>
            <Icon />
            {label}
          </span>
        ))}
      </div>
      <div className="docs-platform-base">
        <strong>WASI foundation</strong>
        <span>
          Extended for real applications <LuArrowRight />
        </span>
      </div>
    </figure>
  );
}
