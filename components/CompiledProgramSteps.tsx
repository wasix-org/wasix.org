import CopyCommand from "./CopyCommand";
import { toolchains } from "./toolchains.mjs";

export default function CompiledProgramSteps({
  language,
}: {
  language: "c" | "rust";
}) {
  const toolchain = toolchains[language];

  return (
    <div className="compiled-program-steps">
      <div className="install-step">
        <span>02</span>
        <h3>Compile something great</h3>
      </div>
      <div className="build-example">
        <span># {toolchain.comment}</span>
        <div className="command-box command-box-multiline">
          <span className="command-prompt" aria-hidden="true">
            $
          </span>
          <code>{toolchain.build}</code>
          <CopyCommand command={toolchain.build} label="Copy build command" />
        </div>
      </div>
      <div className="install-step">
        <span>03</span>
        <h3>Run it with Wasmer</h3>
      </div>
      <div className="command-box command-box-multiline">
        <span className="command-prompt" aria-hidden="true">
          $
        </span>
        <code>{toolchain.run}</code>
        <CopyCommand
          command={toolchain.run}
          label={`Copy ${toolchain.language} run command`}
        />
      </div>
      <p className="install-note">
        <a href="https://docs.wasmer.io/install">Install Wasmer</a>, then run
        this command. {toolchain.runNote}
      </p>
    </div>
  );
}
