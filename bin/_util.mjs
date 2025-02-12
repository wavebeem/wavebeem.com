import { spawnSync } from "node:child_process";
export { chdir } from "node:process";

export function* match(string, regexp) {
  const m = string.match(regexp);
  if (m) {
    yield m;
  }
}

export async function run(cmd, ...args) {
  const result = spawnSync(cmd, args);
  if (!result) {
    throw new Error(`Exit code ${result.status}: ${cmd} ${args.join(" ")}`);
  }
}
