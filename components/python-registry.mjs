// Verified against the registry homepage and complete index on 2026-09-12.
export const pythonRegistry = {
  url: "https://python-registry.wasmer.app/",
  indexUrl: "https://python-registry.wasmer.app/all/simple/",
  packageCount: 434,
  runtimePackage: "python/python@=3.13.19",
  checkedAt: "2026-09-12",
  checkedLabel: "September 12, 2026",
  examples: ["FastAPI", "NumPy", "pandas", "Pydantic", "cryptography"],
};

export function pythonInstallCommand(packages = "fastapi") {
  return [
    `pip install ${packages}`,
    `  --index-url ${pythonRegistry.indexUrl}`,
    "  --platform wasix_wasm32",
    "  --python-version 3.13",
    "  --only-binary=:all:",
    "  --target ./wasix-packages",
  ].join(" \\\n");
}

export function pythonRunCommand() {
  return [
    `wasmer run ${pythonRegistry.runtimePackage}`,
    "  --volume ./wasix-packages:/packages",
    "  --env PYTHONPATH=/packages",
    `  -- -c "import fastapi; print('FastAPI', fastapi.__version__)"`,
  ].join(" \\\n");
}
