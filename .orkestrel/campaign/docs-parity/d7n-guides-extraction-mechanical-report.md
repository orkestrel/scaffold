I'll read the mechanical brief and the orchestration/rules it requires, then collect only the bounded read-only evidence it asks for.The brief pins this as a read-only Grok evidence pass. Next I’ll load the required rules, falsify skill, and the named campaign/diff inputs.The pass directory wasn’t at the glob I tried. I’ll load the falsify references, host-ownership guide, campaign inputs, and locate the actual diffs.Frozen snapshots and rulings are in place. Next I’ll compare those receipts with current source for the five mechanical boundaries.## Question

Do the frozen Guide and scaffold extraction diffs, statuses, heads, and root-gate receipts match the five mechanical boundaries in `tmp/units/d7n-guides-extraction-mechanical-brief.md`, as observed in the canonical checkouts?

## Evidence

Heads and statuses (frozen capture `tmp/pass/d7n-guides-extraction-population-final`, retained also under `.orkestrel/campaign/docs-parity/evidence/d7n-guides-extraction-population-final`):

- Scaffold HEAD `23329d5f1be419cb1609e73889975c9e0ceb09c3` in `scaffold.head.txt`; same value in `evidence/d7n-scaffold-parity-population-reviewed-gates/head.txt`.
- Guide HEAD `ef6ada9975d71ce97ac20239f473c02b77e84cd9` in `guide.head.txt`; same value in `evidence/d7n-guide-parity-population-gates/head.txt`.
- Scaffold status lists dirty product including `package.json`, `package-lock.json` (`MM`), deleted `scripts/docs.ts`, `src/core/constants.ts`, `src/core/compilers.ts`, `host.json`, `tests/guides.test.ts`, and `tests/setupServer.ts`. Guide status lists `AM src/core/Parity.ts`, `AM tests/src/core/Parity.test.ts`, plus `src/core/{types,index,factories,helpers,shapers,validators,constants}.ts` and `guides/guide.md`.

**Guides entry and host membership**

- `package.json:80` — `"test:guides": "node --experimental-strip-types tests/guides.test.ts"`.
- `src/core/compilers.ts:350-351` — when `blueprint.guides` is set, `blueprintToScripts` assigns `test:guides` to `` `node --experimental-strip-types ${GUIDES_TEST_PATH}` ``.
- `src/core/constants.ts:305-306` — `GUIDES_TEST_PATH = 'tests/guides.test.ts'`.
- `src/core/constants.ts:133-151` — `HOST_PATHS` members are `LICENSE`, `.claude/settings.json`, `scripts`, the vendored test/config leaves, editor/lint files, and `guides/guide.md` / `guides/scaffold.md`. `tests/guides.test.ts` is absent.
- `tests/src/core/helpers.test.ts:184-190` — asserts `GUIDES_TEST_PATH` is package-owned: not in `HOST_PATHS`, not in `EXECUTABLE_PATHS`, not a canon path; `HOST_PATHS` contains `scripts` and does not contain `scripts/deps.sh`.
- `tests/src/core/compilers.test.ts:1806-1811` — planned host artifacts omit `scripts/guides.ts`; `test:guides` is the `tests/guides.test.ts` command.
- Scaffold checkout `scripts/` holds `codex.sh`, `cursor.sh`, `deps.sh`, `ollama.sh`. No `scripts/docs.ts` or `scripts/guides.ts`. Frozen scaffold diff deletes `scripts/docs.ts` and the `docs` manifest script (`scaffold.diff.txt` around the `package.json` and `scripts/docs.ts` hunks).
- Guide still carries `scripts/docs.ts` and `package.json` script `docs` (`guide/package.json:73`). The plan names that as successor “Guide command adoption”, outside this boundary.

**Scripts directory and service ownership**

- `HOST_PATHS` member `scripts` at `src/core/constants.ts:136`.
- `src/` and `tests/` product trees contain no `RETIRED_HOST`, `DOCS_SEED`, or `scripts/docs.ts` identifier. The remaining `retired` hit is catalog prose in `src/bin/types.ts:291`.
- `SERVICE_SCRIPT_PATH = 'scripts/service.sh'` at `src/core/constants.ts:300`.
- `blueprintToOrchestrationArtifacts` at `src/core/compilers.ts:1544-1558` emits that path with `ownership: 'birth'`, `origin: 'template'`, only when vendors are declared. It is not a `HOST_PATHS` member.
- `EXECUTABLE_PATHS` at `src/core/constants.ts:228-233` names `scripts/codex.sh`, `scripts/cursor.sh`, `scripts/deps.sh`, `scripts/ollama.sh` — not `scripts/service.sh`.
- `guides/scaffold.md:1039-1055` — package-owned `tests/guides.test.ts` stays outside `HOST_PATHS`; scaffold owns the `scripts` directory; planned birth-owned `scripts/service.sh` survives overwrite deletion.

**Inventory, gates, toolchain metadata**

- `host.json` `roots` includes `"scripts"` (`host.json:774`). Entries name `scripts/codex.sh`, `scripts/cursor.sh`, `scripts/deps.sh`, `scripts/ollama.sh` (`host.json:688-709`). Grep of `host.json` finds no `scripts/docs.ts`, `scripts/guides.ts`, `tests/guides.test.ts`, or `scripts/service.sh`.
- Recorded ordered-gate exits are `0` for format:check, lint:check, check, build, and test in `evidence/d7n-scaffold-parity-population-reviewed-gates/` and `evidence/d7n-guide-parity-population-gates/`. Population-final `core-js.exit.txt` and `core-declaration.exit.txt` are `0`.
- `d7n-guides-extraction-final-root-gates.md` records that `scaffold.diff.txt`, `before-test.diff.txt`, `after-test.diff.txt`, and `diff-final.txt` share SHA-256 `b6ae7d7e57d7c6b51d51b0aac7ad9dceb90f33a7a2a89ad44c0f3db71e522fb8`, and that staged-metadata receipts share SHA-256 `a370b9e946f7a0cd955d1655b90e4fe5566bd0a31b3e1269709888aac4657f7b`. `index-before.txt` and `index-after.txt` show the same blobs: `package-lock.json` `07c6a98607b8b919dfd726a45ca0ab24986d2133`, `package.json` `a344ed02ee79527003194f487bb0646ba3f95b48`. `manifest-preservation.log.txt` prints `package.json: OK` and `package-lock.json: OK`.
- Guide restored-manifest receipts in `d7n-parity-population-landing.md` and `evidence/d7n-guide-parity-population-gates/manifests-before.sha256`: package.json `13bb1e600a8f275e29d5ffe821842124817e7680d4f81f01bb1862f4bc934946`, package-lock.json `040270de20d0af72d67fe6cff573b720db77a54dd94e5d9266b6f5082e59e593`. Guide `package.json` still declares `@orkestrel/contract` `^0.0.16` and `@orkestrel/markdown` `^0.0.13`.
- Installed overlay: `artifacts.sha256` matches landing (Guide core JS `07fc545f…`, declarations `0a8cc655…`, archive `fd282089…`). Scaffold `package.json:105` still declares `@orkestrel/guide` `^0.0.17`; `node_modules/@orkestrel/guide/package.json` reads `"version": "0.0.18"`.
- Scaffold frozen `package.json` hunks bump existing toolchain ranges `@types/node` `^26.4.0` → `^26.5.0`, `oxfmt` `^0.65.0` → `^0.67.0`, `oxlint` `^1.80.0` → `^1.82.0`, and fixture `@orkestrel/scaffold` `^0.0.63` → `^0.0.64`. No added dependency name appears. Ruling 35 and the extraction plan approve including those owner toolchain and prepared 0.0.64 edits.

**Guide parity types, barrel, tests, placement**

- Added public types live in `guide/src/core/types.ts`: `DriftCategory` (`59`), `Drift.category` (`67`), `ParityPitch` (`136-141`), `ParityOptions` (`146-159`), `ParityRow` (`164-171`), `ParityFinding` (`176-181`, `spec?` optional), `ParityExampleReport` (`186-195`), `ParityReport` (`200-225`), `ParityDirection` (`230`), `ParityChange` (`235-240`), `ParityRewrite` (`245-250`), `ParityInterface` (`255-275`). Interface properties and public return collections are `readonly`.
- Sole core barrel `guide/src/core/index.ts` star-exports `./types.js` and `./Parity.js` (`1`, `8`). Guide `package.json` exports only `.` and `./package.json`.
- `createParity` is in `guide/src/core/factories.ts:117-119`. Class `Parity` is the one class in `guide/src/core/Parity.ts`. Private methods hold inspect/rewrite; `rewrite` passes anonymous `filter`/`sort`/`map` callbacks as arguments (`151-154`).
- `guides/guide.md` Surface rows for those types (`39-51`), `createParity` (`209`), and `Parity` / `ParityInterface` methods (`228-306`). Direct tests in `tests/src/core/Parity.test.ts` (composition, input, report families, examples, titles, sections, declarations, methods, categorized drift). Scaffold consumer `tests/guides.test.ts:7-10,65` imports `createParity` from `@orkestrel/guide`.
- Frozen Guide `diff --git` paths: `guides/guide.md`, `src/core/Parity.ts`, `constants.ts`, `factories.ts`, `helpers.ts`, `index.ts`, `shapers.ts`, `types.ts`, `validators.ts`, `tests/guides.test.ts`, `tests/setup.ts`, `tests/src/core/Parity.test.ts`, and the matching factories/helpers/shapers/validators tests. Added TypeScript hunks did not introduce `@ts-ignore`, `@ts-expect-error`, `@ts-nocheck`, `eslint-disable`, `oxlint-disable`, or `as Type` assertions. `as const` remains in pre-existing helper tests.

**Dependencies and skips**

- Frozen Guide diff does not edit `package.json`. Frozen scaffold diff adds no package name; it bumps the toolchain ranges named above.
- Frozen diffs add no `it.skip`, `describe.skip`, or `it.todo`. Recorded scaffold `test.log.txt` still shows inherited `skipIf` cases (`428 passed | 6 skipped` in one project, `172 passed | 1 skipped` in another). Root gates file classifies those as inherited, not executed proof of this extraction. Product tests that already used `it.skipIf` (`tests/src/server/helpers.test.ts`, `tests/distribution.test.ts`, `tests/config.test.ts`, `tests/src/server/WriteTransaction.test.ts`, `tests/policy.test.ts`) are outside the frozen added hunks.

## Distillate

- **Guides command.** Scaffold `package.json` and `blueprintToScripts` invoke `tests/guides.test.ts` through `GUIDES_TEST_PATH`. That path is not a `HOST_PATHS` member. Scaffold planned host membership does not include `scripts/docs.ts` or `scripts/guides.ts`; the checkout’s `scripts/` directory does not hold them. Guide’s remaining `scripts/docs.ts` / `docs` script is the named successor, not this boundary.
- **Scripts ownership.** `HOST_PATHS` names the `scripts` directory. Product source has no retired-host list and no per-docs-name deletion constant. `scripts/service.sh` stays a separately declared birth-owned orchestration template, not a vendored host-inventory entry.
- **Inventory and receipts.** Generated `host.json` expands the `scripts` root to the four declared hook scripts and omits docs/guides/service/guides-test paths. Recorded ordered-gate exits are `0`. Staged `package.json` / `package-lock.json` blobs are unchanged across the scaffold gate receipts. Declared Guide range stays `^0.0.17` while the installed overlay is `0.0.18`, matching the no-save install described in the landing. Owner toolchain bumps and prepared `0.0.64` fixture metadata are present in the frozen scaffold diff; they are not an extra package addition.
- **Guide parity types.** The parity public types are `readonly`, declared in `types.ts`, exported from the sole core barrel, documented in `guides/guide.md`, and covered by `Parity.test.ts`. `Parity.ts` is one class; `createParity` sits in `factories.ts`. This diff does not add forbidden assertion or suppression directives.
- **Skips and prose.** This diff introduces no npm package and no test skip. Inherited `skipIf` lines remain in the recorded suite log. Report-only prose defects, if any, are annotations under the brief, not source blockers.

## Unknowns

- SHA-256 values quoted in `d7n-guides-extraction-final-root-gates.md` were not recomputed against the files on disk in this lane.
- Whether the working-tree `MM package-lock.json` still matches the staged blob `07c6a98607b8b919dfd726a45ca0ab24986d2133` byte-for-byte was not hashed here.
- Whether `host.json`’s own `"digest"` field `2f297efd…` still hashes the current inventory body was not recomputed.
- Live `git status` / `git diff` against those frozen snapshots was not run (brief forbids Git mutation; this lane used the captured diffs and current file reads).
- Guide `origin/main` ancestry and packing overlay restoration beyond the landing/receipt files were not re-fetched.

## Journal

`C:/Users/mikes/WebstormProjects/scaffold/tmp/cursor/d7n-guides-extraction-mechanical.jsonl`

## Deviation

- `AGENTS.md` also names `ROADMAP.md` when present; that file was not read.
- `.agents/orchestration.md` was read from the start of the file, not the whole file.
- A product-tree search for retired-host names also matched campaign report paths. Those counterpart lane reports were not opened. Unread on purpose: independent Astra review, reused objective analysis, `d7n-guides-extraction-design-subjective-report.md`, `d7n-guides-extraction-design-objective-report.md`, and `d7n-guides-extraction-review-bridge-report.md`.
- Guide `scripts/docs.ts` was located by name only; its body was not read (successor command adoption).
- No engine was spawned. No source edit, test command, install, Git mutation, or publication.

This is mechanical observation for root reconciliation. It is not product acceptance.
