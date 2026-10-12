import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
const root = 'C:/Users/mikes/WebstormProjects/scaffold';
const built = join(root, '.orkestrel/agent/instruments/harness/.build/bench5');
const refit = await import(pathToFileURL(join(built, 'refit/helpers.js')).href);
const common = await import(pathToFileURL(join(built, 'helpers.js')).href);
const model = process.argv[2];
if (!['q2', 'g2', 'g4', 'q4'].includes(model)) throw new Error('unknown fixed model key');
const dir = join(root, `.orkestrel/agent/instruments/results/l14/calibration/${model}`);
const fitDir = join(dir, 'fit');
const diagnosisPath = join(fitDir, 'diagnosis.json');
const fitPath = join(fitDir, 'fit.json');
const generationDir = join(dir, 'generation');
const diagnosisFile = refit.hashFile(diagnosisPath);
const assessment = refit.readRefitAssessment(diagnosisFile);
const generationManifest = common.readJSON(join(generationDir, 'manifest.json'));
const attempts = common.readRows(join(generationDir, 'attempts.jsonl'));
const costs = refit.readRefitCosts(attempts, generationManifest);
const exploratoryCutoff = refit.selectMajorityCutoff(assessment);
const fit = existsSync(fitPath) ? common.readJSON(fitPath) : null;
const summary = {
  model,
  diagnosis: { path: diagnosisFile.path, sha256: diagnosisFile.hash, accepted: assessment.accepted, cutoff: assessment.cutoff ?? null, reasons: assessment.reasons, operationalErrors: assessment.errors, occurrences: assessment.occurrences, distinct: assessment.distinct, custody: assessment.custody },
  exploratoryCutoff: exploratoryCutoff ?? null,
  costs,
  fit: fit === null ? null : { path: fitPath, sha256: refit.hashFile(fitPath).hash, agree: fit.agree, change: fit.change, separated: fit.separated },
};
process.stdout.write(JSON.stringify(summary) + '\n');
