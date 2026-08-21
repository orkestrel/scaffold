## Delivered

- Adopted the mapped accumulator in `createRecorders`.
- Added structural, hostile-input-safe recorder-map validation.
- Moved guard proofs to [validators.test.ts](/home/user/test/tests/src/core/validators.test.ts).
- Added scoped listener cleanup regressions and removed duplicate native scope wiring.
- Updated the required TSDoc.

## Validation

- `npm run format:check` — exit 0.
- `npm run lint:check` — exit 0.
- `npm run check` — exit 0 for the root, core, browser, and server TypeScript projects.
- `npm run test:src:core` — exit 0; the validators mirror was collected.
- `npm run test:policy` — exit 0; the validators mirror passed policy.
- `git diff --check` — exit 0.
- `git status --short` lists only the owned paths.

## Controls

- The pre-fix `npm run test:src:core` run exited 1 at the malformed-recorder and scoped-lifetime assertions.
- Removing the guard’s `handler` check made the focused validators command exit 1 at [validators.test.ts](/home/user/test/tests/src/core/validators.test.ts:29).
- Removing scoped cleanup aborts made the focused factories command exit 1 at the manual-removal and one-shot assertions.
- Every mutation was restored before final validation.
- Forbidden-form scans found no added `as`, `any`, non-null assertion, or `@ts-` directive. `createRecorders` contains no `Partial` accumulator or `Object.fromEntries`.

## Decisions

- The guard claims per-key tuple precision only after validating runtime structure. Its TSDoc assigns event-to-recorder pairing to the factory or direct caller.
- The signal instrument owns scoped cleanup. Native registration receives options without `signal`, avoiding duplicate lifetime registrations, while scope abort removes the installed listener explicitly.
- The wider-union limit now states its condition, runtime consequence, and remedy separately.
- The Orchestrator’s rejected construction probes were not repeated.

## Deviations

None.

## Flags

Guide changes remain assigned to R4 and were not touched.