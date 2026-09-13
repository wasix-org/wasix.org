import { LuGlobe, LuPanelsTopLeft, LuServer } from "react-icons/lu";
import { WasixMark } from "../Logo";

const destinations = [
  { name: "Server", icon: LuServer, x: 98, y: 344 },
  { name: "Edge", icon: LuGlobe, x: 280, y: 374 },
  { name: "Browser", icon: LuPanelsTopLeft, x: 462, y: 344 },
];

const connections = [
  "M186 232V251L98 302",
  "M280 287V332",
  "M374 232V251L462 302",
];

export default function RuntimeDiagram() {
  return (
    <div
      className="runtime-diagram"
      role="img"
      aria-label="C, C++, Rust, and Python applications target WASIX. An infinity mark inside a shield represents the WebAssembly sandbox, connected to three environments: Server, Edge, and Browser."
    >
      <div className="diagram-topline" aria-hidden="true">
        <span>ONE BUILD. EVERY ENVIRONMENT.</span>
        <span>FIG. 01</span>
      </div>
      <svg viewBox="0 0 560 470" aria-hidden="true" className="runtime-art">
        {/* A fine construction drawing beneath a single, portable artifact. */}
        <g className="runtime-guides" fill="none">
          <path d="M66 241 280 364 494 241M92 180v90l188 108 188-108v-90" />
          <path d="m80 185 12-7 12 7m164 184 12 7 12-7m164-184 12-7 12 7" />
        </g>
        <g fill="none" strokeLinejoin="round">
          {connections.map((path) => (
            <path key={path} d={path} className="runtime-connection" />
          ))}
        </g>
        {/* Flat faces and a narrow lime edge echo the original illustration. */}
        <g stroke="#303829" strokeWidth="1" strokeLinejoin="round">
          <path d="m92 160 188 108v20L92 180Z" fill="#293122" />
          <path d="m280 268 188-108v20L280 288Z" fill="#222a1c" />
          <path d="m92 173 188 108v8L92 181Z" fill="#c6ed68" stroke="#a4c44e" />
          <path
            d="m280 281 188-108v8L280 289Z"
            fill="#a1c540"
            stroke="#89a938"
          />
          <path d="M280 52 468 160 280 268 92 160Z" fill="#37402e" />
        </g>
        <path
          d="m280 62 171 98-171 98-171-98Z"
          fill="none"
          stroke="#59634b"
          strokeWidth=".7"
        />
        {/* The mark is engraved on the same isometric plane as the tile. */}
        <g transform="matrix(.866 -.5 .866 .5 92 160)">
          <path
            d="M108 25C127 36 144 40 159 42V83C159 115 140 139 108 156C76 139 57 115 57 83V42C72 40 89 36 108 25Z"
            fill="#2c3424"
            stroke="#c6ed68"
            strokeWidth="1.6"
          />
          <WasixMark
            x="65"
            y="57"
            width="86"
            height="58"
            className="runtime-shield-mark"
          />
          <text
            x="108"
            y="199"
            textAnchor="middle"
            fill="#f3f5ec"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="43"
            fontWeight="600"
            letterSpacing="-2"
          >
            wasix<tspan fill="#c6ed68">.</tspan>
          </text>
        </g>
        <g className="runtime-inputs">
          <g fill="#f7f8f1" stroke="#b5bfa8" strokeWidth="1">
            <rect x="34" y="75" width="94" height="34" rx="3" />
            <rect x="432" y="75" width="94" height="34" rx="3" />
            <rect x="233" y="3" width="94" height="34" rx="3" />
          </g>
          <g fill="none" stroke="#8c9a7c" strokeWidth="1">
            <path d="M81 109v25l44 25M479 109v25l-44 25M280 37V62" />
          </g>
          <g fill="#c6ed68" stroke="#819957" strokeWidth="1">
            <circle cx="125" cy="159" r="3.2" />
            <circle cx="435" cy="159" r="3.2" />
            <circle cx="280" cy="62" r="3.2" />
          </g>
          <g fill="#58634c" textAnchor="middle" className="runtime-svg-label">
            <text x="280" y="25">
              Python
            </text>
            <text x="81" y="97">
              C / C++
            </text>
            <text x="479" y="97">
              Rust
            </text>
          </g>
        </g>
        {destinations.map(({ name, icon: Icon, x, y }) => (
          <g key={name}>
            <g stroke="#a9ba87" strokeWidth="1" strokeLinejoin="round">
              <path d={`M${x - 72} ${y}l72 42v12l-72-42Z`} fill="#c6db98" />
              <path d={`M${x} ${y + 42}l72-42v12l-72 42Z`} fill="#b5cb82" />
              <path d={`M${x} ${y - 42}l72 42-72 42-72-42Z`} fill="#d6edaa" />
            </g>
            <g transform={`matrix(.866 -.5 .866 .5 ${x - 72} ${y})`}>
              <Icon
                x="21"
                y="20"
                size={42}
                className="runtime-destination-icon"
              />
            </g>
            <circle
              cx={x}
              cy={y - 42}
              r="3"
              fill="#789b45"
              stroke="#f0f3e9"
              strokeWidth="1.5"
            />
            <text
              x={x}
              y="455"
              textAnchor="middle"
              className="runtime-destination-label"
            >
              {name}
            </text>
          </g>
        ))}
      </svg>
      <div className="runtime-caption" aria-hidden="true">
        <WasixMark />
        <span>ONE TARGET. MORE PLACES TO RUN.</span>
      </div>
    </div>
  );
}
