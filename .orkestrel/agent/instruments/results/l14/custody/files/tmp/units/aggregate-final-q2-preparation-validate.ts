import { readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { pathToFileURL } from 'node:url';

const root: string = 'C:/Users/mikes/WebstormProjects/scaffold';
const built: string = join(root, '.orkestrel/agent/instruments/harness/.build/bench5');
const matrix = await import(pathToFileURL(join(built, 'matrix/helpers.js')).href);
const refit = await import(pathToFileURL(join(built, 'refit/helpers.js')).href);
const cell: string = join(root, '.orkestrel/agent/instruments/results/l14/q2-think0');
const frozenPath: string = join(cell, 'freeze/manifest.json');
const resourcePath: string = join(cell, 'resource/manifest.json');
const frozenReference = refit.hashFile(frozenPath);
const frozen = matrix.readFrozen(frozenReference);
const resource = matrix.readResource(refit.hashFile(resourcePath), frozenReference);
const attempts = resource.attempts.map((attempt: any, index: number) => {
  const run = matrix.readAttempt(attempt);
  matrix.verifyMatrixFeasibility(run);
  const costs = matrix.measureMatrixCosts(run);
  return {
    index,
    budget: attempt.budget,
    accepted: attempt.accepted,
    resource: attempt.resource,
    failures: attempt.failures,
    run: { status: run.status, failures: run.failures },
    wire: costs.wire.map((item: any) => ({ phase: item.phase, role: item.role, requests: item.requests, wall: item.wall, prompt: item.prompt, completion: item.completion, missing: item.missing })),
  };
});
const walk = (dir: string): string[] => readdirSync(dir).flatMap((name: string) => {
  const path = join(dir, name);
  return statSync(path).isDirectory() ? walk(path) : [path];
});
const artifacts = walk(join(cell, 'resource')).map((path: string) => {
  const file = refit.hashFile(path);
  return { path: relative(root, path).replaceAll('\\', '/'), bytes: statSync(path).size, sha256: file.hash };
});
process.stdout.write(JSON.stringify({
  frozen: { path: frozenPath, hash: refit.hashFile(frozenPath).hash },
  resource: { path: resourcePath, hash: refit.hashFile(resourcePath).hash, accepted: resource.accepted, budget: resource.budget ?? null, attempts },
  artifacts,
}, null, 2) + '\n');