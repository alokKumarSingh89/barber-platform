import { existsSync } from "node:fs";

import { join, dirname } from "node:path";

function findMonorepoRoot(): string {
  let currentDir = __dirname;
  while (true) {
    const packageJsonPath = join(currentDir, "package.json");
    const pnpmWorkspacePath = join(currentDir, "pnpm-workspace.yaml");
    if (existsSync(packageJsonPath) && existsSync(pnpmWorkspacePath)) {
      return currentDir;
    }

    const parentDir = dirname(currentDir);

    if (parentDir === currentDir) {
      throw new Error("Could not find monorepo root");
    }
    currentDir = parentDir;
  }
}

export function getEnvFilePath(): string {
  if (process.env.ENV_FILE_PATH) {
    return process.env.ENV_FILE_PATH;
  }

  return join(findMonorepoRoot(), ".env");
}
