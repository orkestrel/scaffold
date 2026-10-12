The temporary serializer is complete. It was not invoked. No experiment data was read or written; source, build, and HEAD were not changed by this unit. Semantic acceptance remains with root.

The owned script is `tmp/units/aggregate-final-label-wrap.ts`. From `C:/Users/mikes/WebstormProjects/scaffold`, root can later invoke it with approved inputs:

```text
node tmp/units/aggregate-final-label-wrap.ts CALIBRATION APPROVED_ARRAY SHA256
```

`CALIBRATION` must resolve to an exact `q2`, `g2`, `g4`, or `q4` child of `.orkestrel/agent/instruments/results/l14/calibration`. `APPROVED_ARRAY` names root's JSON label array. `SHA256` is its exact lowercase SHA256 byte hash.

The script reuses emitted `hashFile`, `verifyLabels`, `isRefitItem`, and `isRefitLabels`. It retains the supplied array order and JSON content, binds the existing wrapper to the corpus, attempts, packet, and manifest hashes, and writes `labels.json` with `wx`. It checks resolved input paths and hashes before writing and again before reporting output path, hash, and label count.

The scoped validation commands passed with exit code 0:

```text
node --check tmp/units/aggregate-final-label-wrap.ts
node node_modules/typescript/bin/tsc --ignoreConfig --noEmit --strict --skipLibCheck --target es2023 --module nodenext --moduleResolution nodenext --types node tmp/units/aggregate-final-label-wrap.ts
```

The initial TypeScript command omitted `--ignoreConfig` and returned TS5112 with exit code 1. The corrected command passed. Type validation uses emitted declarations and skips dependency declaration checking.

Runtime behavior was not exercised, as the brief forbids fixtures and invocation. Path and hash rechecks detect observed changes; filesystem checks are not an atomic transaction against concurrent hostile path replacement. If an input changes after creation, the script refuses a success report and leaves the created output for root review. No runtime or semantic acceptance is claimed.
