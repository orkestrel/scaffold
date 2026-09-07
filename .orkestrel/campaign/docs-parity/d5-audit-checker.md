Lane held: checker

## Claims

**1. The seed's reach — PASS.**
`/home/user/scaffold/scripts/docs.ts:19-40` imports only `@orkestrel/guide` (type and value) and `node:fs`, `node:path`, `node:process`. No `src/core` or other scaffold-module import exists anywhere in the file. A full read of the file (`scripts/docs.ts:1-437`) shows no `any`, no `as` type assertion, no non-null assertion (`!`), no `@ts-*`/`eslint-disable` comment, no `enum`, `namespace`, parameter property, or decorator, no default export, and every function is a top-level `function` declaration — none nested inside another function body.

**2. What it reads — CANNOT RULE (objective lane's claim).** The brief assigns "what the seed reads" to the objective lane.

**3. The report run — CANNOT RULE (objective lane's claim).** The brief assigns exit codes and report-run behavior to the objective lane.

**4. `--to guide` — CANNOT RULE (objective lane's claim).** Assigned to the objective lane ("what each direction writes").

**5. `--to source` — CANNOT RULE (objective lane's claim).** Assigned to the objective lane.

**6. The flag surface — CANNOT RULE (subjective lane's claim).** The brief assigns "the usage line" and voice to the subjective lane.

**7. The wiring — PASS.**
`src/core/constants.ts:139-140` (current tree): `'scripts/ollama.sh', 'scripts/docs.ts',` — `scripts/docs.ts` follows `scripts/ollama.sh` in `HOST_PATHS`. `src/core/constants.ts:232-237` (`EXECUTABLE_PATHS`) does not contain `scripts/docs.ts`. `src/core/compilers.ts` (`d5-fix.diff.txt:332-340`) shows `docs` emitted only inside the `if (blueprint.guides)` block that also sets `test:guides`; `blueprintToHostArtifacts` (`d5-fix.diff.txt:475-484`, `src/core/compilers.ts`) filters `scripts/docs.ts` out unless `blueprint.guides`; `tests/src/core/compilers.test.ts` case `plans the documentation seed and its script together with guides` (`d5-fix.diff.txt:729-746`) proves both are withheld together. `package.json` diff (`d5-fix.diff.txt:293-298`) adds `"docs": "node --experimental-strip-types scripts/docs.ts"` beside `test:guides`. `host.json` diff adds a `scripts/docs.ts` entry with digest, produced by `npm run build:inventory` per `d5-fix-report.md` K7. `guides/scaffold.md` diff (`d5-fix.diff.txt:121-146`, `:1035-1044`) documents the renamed `blueprintToHostArtifacts` signature and the seed's selection fact.

**8. The rule and its gate (D5-fix) — PASS.**
`.claude/rules/workspace.md:77-83` (read directly) carries the vendored-imports bullet reported at that span in `d5-fix-report.md` K1; the workspace-proof table (D4's edit) sits untouched at `:131-140`, confirmed identical between `d5-scaffold-seed.diff.txt` and `d5-fix.diff.txt`. `tests/src/server/helpers.test.ts` (`d5-fix.diff.txt:1167-1254`) keeps the population (`HOST_PATHS` members matching `/\.[cm]?[jt]s$/u`), collects `@orkestrel/<package>` specifiers not a key of `BASE_DEV_DEPENDENCIES`, asserts `expect(imported).toEqual([])`, carries four inline controls, and is named `imports only Orkestrel packages every workspace declares from each vendored module`. `/home/user/scaffold/.orkestrel/campaign/docs-parity/instruments/d5/m7-test-src-server-before.log.txt:12-27` records the red at exactly `tests/src/server/helpers.test.ts:200` with `received ["scripts/docs.ts"]` — one entry, exactly the seed. `d5-fix-report.md` K2 records the same command green after (`EXIT=0`, `Test Files 5 passed (5)`).

**9. The own specifiers (D5-fix) — PASS**, with one imprecision noted below.
`src/core/compilers.ts` (`d5-fix.diff.txt:391-433`): when `srcToRoot` finds no single root, a subpath entry `@orkestrel/<name>/<environment>` is pushed for each non-core selected environment; the bare `@orkestrel/<name>` is pushed mapping to `root ?? 'core'`; the `app` loop pushes only `@app/<environment>` entries, never an `@orkestrel/*` entry. `tsconfig.json:24-27` carries `"@orkestrel/scaffold/server"` and `"@orkestrel/scaffold"`. `d5-fix-report.md` K4 records `node dist/bin/main.js audit --groups configs --offline` at exit 0, "0 of 17 planned paths drifted," and the Unknowns section records that the Vite alias changes nothing for `tests/guides.test.ts` (same two red cases, same totals) and that `tests/config.test.ts`'s alias case is green.
*Imprecision:* claim 9 says the report records `node dist/bin/main.js audit --groups configs` (without `--offline`) as "aligned." The report's own Criteria table (`d5-fix-report.md:206`) shows that exact command exits **1** (unrelated dependency-floor findings), and only the `--offline` variant is recorded aligned. This is a wording looseness in the claim rather than a defect in the underlying work.

**10. The tests — CANNOT RULE (objective lane's claim).** "The reality of the tests" is assigned to the objective lane.

**11. The guide — CANNOT RULE (subjective lane's claim).** Guide prose is assigned to the subjective lane.

**12. Scope honesty — PASS.**
`d5-fix.status.txt` lists exactly: D5's owned files (`scripts/docs.ts`, `src/core/constants.ts`, `src/core/compilers.ts`, `package.json`, `guides/scaffold.md`, `tests/src/core/compilers.test.ts`, `tests/src/core/helpers.test.ts`, `host.json`), D5-fix's owned files (`.claude/rules/workspace.md`, `tests/src/server/helpers.test.ts`, `src/core/Compiler.ts`, `tsconfig.json` — `src/core/helpers.ts` and `tests/src/core/Compiler.test.ts` not touched, consistent with "if touched" and K6's "unchanged"), D4's five, and `tests/setupServer.ts`, which `d5-fix-integration.md` accounts for as one of the Orchestrator's four serial patches (renamed spans at `src/core/constants.ts:130,180,272` and `tests/setupServer.ts:1285`). No file outside these categories appears in the status. `src/core/constants.ts` moved only by the `HOST_PATHS` row, its `@remarks`, and the three renamed spans; `package.json` moved only by the `docs` line.

**13. Report honesty — FAIL.**
`/home/user/scaffold/.orkestrel/campaign/docs-parity/d5-fix-report.md:301` states "The non-zero status comes from **five** dependency-floor findings the online run adds" — a stated count of a growable set (`findings`), which `AGENTS.md` § Writing bans outright ("NEVER state a count... rules, rows, members, exports, files, options, steps, cases, stages, findings, and tests are such sets"). The itemized list below it does not cure the violation; the rule requires naming the members *or* omitting the number, not both. All spot-checked `file:line` citations in `d5-fix-report.md` (K1 `.claude/rules/workspace.md:77-83`, K2 `tests/src/server/helpers.test.ts:175-244`/`:200`/`:207-209`/`:227-230`/`:236-241`/`:242`/`:19`, K4 `src/core/compilers.ts:643-693`, K5 `guides/scaffold.md` spans) matched the files at their current state.

## Findings outside the claims

- `/home/user/scaffold/.orkestrel/campaign/docs-parity/d5-fix-integration.md:3` states "`tests/setupServer.ts` is a staged host file, so `npm run build:inventory` re-ran and `host.json` moved by its digest alone." `tests/setupServer.ts` is a member of neither `HOST_PATHS` (`src/core/constants.ts:133-155`) nor `CANON_PATHS` (`src/core/constants.ts:188-203`), so it is not a staged/vendored host file. `host.json`'s actual digest movement in this diff traces to `.claude/rules/documentation.md`, `.claude/rules/tests.md`, `.claude/rules/workspace.md`, `guides/scaffold.md`, and the new `scripts/docs.ts` entry — not to `tests/setupServer.ts`. Right look: the integration note should attribute `host.json`'s movement to the staged files actually listed in its own diff, and should not claim `tests/setupServer.ts` is staged.

VERDICT: FAIL 13
