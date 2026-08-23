# Unit W2 report — delete `Blueprint.distribution` and generate the proof

Role `implementer`, engine Opus 5, sole serial writer, dispatched from a clean baseline an
independent verifier had just proved green at `23899f5`.
Brief: `.orkestrel/campaign/unit-w2-brief.md`.

## What landed

`Blueprint.distribution` is gone, along with its derivation in `#derive`, its validator row, its
factory default, and the non-blocking question that fired when the flag was set with no `src`. Both
`distributes` predicates are now the existing `publishes`. `blueprintToTestArtifacts` plans
`DISTRIBUTION_TEST_PATH` for a publishing workspace as a template-origin artifact at `presence`
ownership, and `ARTIFACT_TEMPLATES.tests.distribution` carries the generated proof with its four
browser spans.

This repository's own bespoke `tests/distribution.test.ts` is byte-untouched — confirmed by
`git diff --quiet` — and still passes on its own gate. That is the presence-ownership evidence, and
it is why the brief made that file off-limits.

## The three rules that decide whether the proof measures anything

Each was verified in the committed source rather than taken from the report.

- **Selection reads export targets.** `BROWSER_OUTPUT` is `'./dist/src/browser/'` and the entry is
  classified by `module.startsWith(BROWSER_OUTPUT)`. The unit's own instrument enumerates every
  comparison of a subpath against a literal in the generated text and asserts the set is exactly the
  root-subpath specifier construction, which is not a selection rule.
- **The declaration locator walks conditions recursively.** `resolveTarget` returns a string entry
  directly, walks a record entry through `default` and the named conditions, and recurses. It
  handles a flat root entry and a condition-nested one through the same path.
- **The launch is attempted and classified.** The proof imports `resolveBrowser` from the
  workspace's own `../configs/browsers.js` and maps `connectOptions.wsEndpoint`,
  `launchOptions.executablePath`, and `launchOptions.channel`, with the comment recording that
  `resolveBrowser` never reports absence.

## Executed evidence, not asserted

Three workspaces were materialized outside the repository and driven end to end against a packed
scaffold: a browser-only workspace shaped like `@orkestrel/indexeddb` with its browser face at the
**root** subpath, a three-face workspace exercising the Node import, the Node require, and the
browser branch in one run, and a core-only workspace. Every one passed, and each also passed its own
`format:check`, `lint:check`, and `check` over the generated proof.

Four falsification controls prove the branch fires rather than passing vacuously:

- Deleting a name from the built browser declaration reds the comparison, naming the missing symbol,
  with the type-only export correctly dropped by the checker.
- An unlaunchable browser under `--mode release` fails, quoting the rejected executable and the
  Playwright message.
- The same rejection outside release mode skips, citing the mechanism.
- A flat root export entry still located the declaration and still classified the entry as browser,
  where a fixed `entry.import.types` read returns nothing.

## The unknowns, measured

**Wall clock.** Whole-file durations were 5.07s, 6.06s, and 4.23s against the `distribution`
project's 120-second test and hook timeouts. The slowest single case is the multi-resolution
consumer compile at roughly 2s; the browser case runs between 725ms and 1236ms. No timeout change is
needed.

**`@orkestrel/test`.** No branch and no exception. The generated proof imports nothing from it — its
scratch root comes from `mkdtempSync` over `node:os` and `node:fs` — so the census finding that
`test` alone cannot import that package never binds.

## A scoping error in the brief, ruled

The unit edited `src/core/validators.ts`, `src/core/factories.ts`, and `tests/setup.ts`, which the
brief's owned list omitted and its off-limits list did not name. Each declares the deleted member,
each edit is a single-line deletion, and `check` cannot pass without them. The unit flagged them
rather than absorbing them, which is correct.

**Ruled: granted.** The fault is the brief's. `.agents/orchestration.md` fixes that a change is
scoped by the files its result makes **false**, not by the files that declare the thing changing,
and this brief scoped by declaration site. A validator row, a factory default, and a test builder
all go false when a field is deleted, and none of them imports anything new to do it.

## Carried to the guide-parity unit

`guides/scaffold.md` now states superseded facts at its `DISTRIBUTION_TEST_PATH` table row, in the
two places listing the proof among paths that select a structural fact, in the structural-fact list,
in the paragraph claiming the declared flag alone adds no project, in the proofs-selected-by-path
list, and in the registration paragraph. One row is now unreachable rather than merely stale: a
publishing blueprint that registers a project whose include resolves to nothing, because publishing
now plans the artifact and the project and its file are selected together.

Guide parity is name-based, so nothing gates this drift and `npm test` stays green over it. It is
the guide-parity unit's to close.
