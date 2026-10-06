# Unit journey-cost-lane-0 — veneer journey run-cost tuning, lane 0

## Role and engine

Astra implementation unit on GPT-6 Astra (`gpt-6-astra`, effort high), reached as the Codex transport (`codex exec`). Executor: BENCH_ENGINE.

## Objective

In the veneer worktree, apply verdict items 11 (split the preservation and partition cases into one case per width, four cases in light-1280) and 1a (one owner for the selector-major match: a helper plus its proof, consumed by no scan yet), prepare probe P-A as an unrun patch, prepare the exact gate commands, and pass the lane's own acceptance through the host queue. The lane launches only after J-B0; the Orchestrator launches it.

## Context

- **Checkout.** The worktree `/home/user/.wave/journey-cost/0` at veneer commit `4d21de7`, with its own `node_modules`. You are the sole writer in this checkout. Commit nothing. A nested `git` inside the sandbox may report `not a git repository` while your own `git status` works; do not diagnose the checkout.
- **Governing texts.** The verdict `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/showcase/journey-cost-2026-10-05/verdict.md` (§ 2 constraint and gates, § 3 items 11 and 1a, § 5, § 6, § 7 P-A, § 8 lane 0) and `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/showcase/journey-cost-2026-10-05/plan-v3.md` (item 11 at lines 90-109, item 1a at 110-122, P-A). The verdict governs where they differ.
- **Code (paths in the worktree).** `/home/user/.wave/journey-cost/0/tests/app/browser/integration.test.ts` (preservation case 1122-1439, partition case 1440-1695 at 4d21de7; the shared `it.each` placement pattern near 459 and 686); `/home/user/.wave/journey-cost/0/tests/setupBrowser.ts` (`collectComponentSignatures` near 1867-1909, the three `element.matches` scans near 1906, 1994, 2164, 2169, the filter at 1990-1995, `collectPartition`, `JOURNEY_PLACEMENTS` near 5339-5346); `/home/user/.wave/journey-cost/0/tests/setupBrowser.test.ts` (proof placement near 1088); `/home/user/.wave/journey-cost/0/guides/veneer.md` (case titles near 2140 and 2174-2175, § Variant placement near 2578; re-resolve every location by searching the quoted text, not by line number).
- **Law.** `/home/user/.wave/journey-cost/0/AGENTS.md` non-negotiables; rules `/home/user/scaffold/.claude/rules/tests.md`, `/home/user/scaffold/.claude/rules/typescript.md`, `/home/user/scaffold/.claude/rules/writing.md`, `/home/user/scaffold/.claude/rules/documentation.md` § Parity (guide titles pinned by `tests/guides.test.ts` findDrift), `/home/user/scaffold/.claude/rules/architecture.md` (no nested functions).
- **Host queue.** Every command that launches Chromium or loads the CPU (check, lint, format, build, every Vitest suite) runs only through:
  `flock /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/lane0-<name> --kind command|journey --cwd /home/user/.wave/journey-cost/0 -- <command>`
  Usage is in `/home/user/veneer/tmp/units/journey-cost/README.md`. A journey run appends `--reporter=dot --reporter=json --outputFile=<folder>/report.json`. Never run such a command outside the queue.
- **Price windows** are the Orchestrator's. You run equality probes through the queue and never a full journey run; the one gate run is scheduled as your last step and the Orchestrator starts it.
- **Host.** Linux, Codex `workspace-write` sandbox rooted at `/home/user/.wave/journey-cost/0`. Network denied, `.git` read-only, loopback bind and grandchild processes may be denied. Reports go to `/home/user/veneer/tmp/units/journey-cost/lane-0/` and queue folders to `/home/user/veneer/tmp/units/journey-cost/runs/`, outside the `-C` root; the Orchestrator grants them as writable roots. If the sandbox rejects a write there (or the queue cannot run under the sandbox), stop that write, do not try another mechanism, write the report to the worktree's tmp/units/journey-cost/lane-0/report.md instead, and say so in the report.
- **Standing conditions.** `/home/user/veneer/tmp/units/journey-cost/mutation-targets.json` is lane M's and exists; if lane M changes it before launch, re-read it.

## Unknowns

The J-B0 folder paths for `compare.ts` arrive in an appended ruling at launch; if absent, leave the placeholder `<J-B0 folder>` in the prepared command and say so. Report any other unknown as an open item, never guess.

## Scope

- **Owned.** `/home/user/.wave/journey-cost/0/tests/app/browser/integration.test.ts` lines 1122-1695 only (the two cases); the `JOURNEY_PLACEMENTS` constant and its comment in `/home/user/.wave/journey-cost/0/tests/setupBrowser.ts`; item 1a's new helper beside `collectComponentSignatures` in `/home/user/.wave/journey-cost/0/tests/setupBrowser.ts`, with its proof in `/home/user/.wave/journey-cost/0/tests/setupBrowser.test.ts`; `/home/user/.wave/journey-cost/0/guides/veneer.md` only at the two case titles and § Variant placement; the P-A patch and command under the worktree's tmp/units/journey-cost/probes/p-a/ folder; the report folder.
- **Shared (report-only).** none.
- **Off-limits.** Everything else, including every existing scan in `/home/user/.wave/journey-cost/0/tests/setupBrowser.ts`, `package.json`, the lockfile, configs, and the main checkout `/home/user/veneer` outside `/home/user/veneer/tmp/units/journey-cost/lane-0/` and its `runs/lane0-*` folders.
- **Made false by this change.** The registration counts (96 registered, 6 skipped become 92 and 0); the two guide titles; any test pinning the old titles (find with a search for the title text).
- **Tools and limits.** No installs, no commits, no pushes, no credentials, no destructive commands (no `rm -rf`, `git reset`, `git checkout --`, `git clean`), no shared-file edits, no tree-wide mutating gate (no `format` write, no `lint --fix`). Scoped validation only, and only through the queue.

## Work

1. **Item 11.** Split the preservation case and the partition case into one case per width (four cases), all registered in light-1280 through `it.each` over a placement entry filtered to `VARIANT` the way the shared cases do. Each half builds its page from the light-1280 variant object with its width replaced as the loops do today and restores the host viewport in `finally`. Each preservation half keeps its own `failures` list; the partition halves keep their direct `expect` calls. Every assertion, control, logged line (content and multiplicity), and `## Resolved values` row stays; the logged `variant` names the reading variant and a separate `host` field names the project; rows carry the reading-variant prefix. The 300 s budgets stay. Update `JOURNEY_PLACEMENTS` and its comment. Result: 92 cases registered, 0 skipped. The guide's two titles and § Variant placement follow the new titles.
2. **Item 1a.** Add a helper beside `collectComponentSignatures` that evaluates each distinct selector text one time over the representatives with the same `element.matches` predicate the three scans use, appends entries to each representative's per-sheet list in scan order, and refuses an invalid selector the way `element.matches` does (throws the same error). Add its proof in `/home/user/.wave/journey-cost/0/tests/setupBrowser.test.ts`. No scan changes behavior; items 1b, 2, 3 consume it in later lanes.
3. **Probe P-A.** Write an uncommitted phase-timer copy as a patch file plus one command line under the worktree's tmp/units/journey-cost/probes/p-a/ folder: timers around the filter at setupBrowser.ts 1990-1995, each match-map build in `collectPartition`, the departure loop, and the text reads, in light-1280 at both widths. Do not apply or run it; the patch must apply cleanly on top of your edits.
4. **Mutation targets.** For each target in `/home/user/veneer/tmp/units/journey-cost/mutation-targets.json`, check its search string still occurs exactly once after your edits; report any that moved or multiplied.
5. **Acceptance (yours), in this order, each through the queue with `--kind command` unless stated:** `npm run check`; `npm run lint:check`; `npm run format:check`; `npm run test:setup:browser`; the scoped runs of the four new cases in light-1280, each half once, `--kind journey` (equality runs, not price runs); then `git diff --check` (directly, no queue needed).
6. **Gate (prepare only, last step; the Orchestrator starts each).** Write the exact command lines: `test:setup:browser` through the queue; the mutation copy `node tmp/units/journey-cost/mutations.ts --targets /home/user/veneer/tmp/units/journey-cost/mutation-targets.json --report <folder>/mutations.json -- <runner prefix>` (cwd `/home/user/veneer`, folder under `runs/lane0-*`); one full journey run through the queue with `--kind journey`; its `compare.ts` invocation against the J-B0 folders; and the registration-count read.

## Execution

Perform the assignment yourself and spawn nothing.

## Output

Write `/home/user/veneer/tmp/units/journey-cost/lane-0/` (file report.md) (or the fallback above) containing: every command run with its exit code and queue folder; the registration counts; the mutation-target check; the P-A patch path and command; the prepared gate commands; deviations and settled choices; `git status --porcelain` and `git diff --stat`. Your final message is that report's path and a short summary of the same. No process diary.

## Deviation contract

Stop and report (expected, found, evidence, done or not done, one hypothesis) when: an assertion, control, logged line, or row would be lost; a scoped run of a half fails outside the host-bound set; the guide pin (`test:guides`) cannot be kept inside the owned lines; the queue lock cannot be taken within 30 minutes (report the holder); a sandbox rejects a write you need; a change would require a file outside Owned. Settle naming, ordering, and comment wording yourself and record them.

## Acceptance criteria

1. `npm run check`, `npm run lint:check`, `npm run format:check` pass through the queue.
2. `npm run test:setup:browser` passes through the queue, including the new helper proof.
3. Each of the four new cases passes once in light-1280 through the queue (`--kind journey`), with every prior line and row present.
4. 92 registered, 0 skipped; `git diff --check` clean; diff confined to Owned.

**Observations, not criteria.** The full journey run, `compare.ts` output, mutation run, and P-A timings: the Orchestrator runs them.

**Measurement.** Light-1280 journey at both widths, the realistic full-page load; the Orchestrator reads price in its windows.

## Review evidence

The actual diff and `git status --porcelain` of the worktree, and the queue folders under `/home/user/veneer/tmp/units/journey-cost/runs/lane0-*`.

## Appended ruling at launch (2026-10-05)

- **J-B0 folders for `compare.ts`:** `/home/user/veneer/tmp/units/journey-cost/runs/jb0-1` and `/home/user/veneer/tmp/units/journey-cost/runs/jb0-2` (each holds `report.json`, `stdout.log`, `measure.jsonl`, `manifest.json`). Replace the `<J-B0 folder>` placeholder with both, one `compare.ts` invocation per folder.
- **Sandbox:** you run under `danger-full-access`, not `workspace-write`, so the queue lock, the run folders, and child processes work. The § Host and § Sandbox limits still bind as rules: your only writable roots are `/home/user/.wave/journey-cost/0` (the owned files and the worktree's own `tmp/` and `node_modules/.vite`), `/home/user/veneer/tmp/units/journey-cost/lane-0/`, and `/home/user/veneer/tmp/units/journey-cost/runs/` (folders named `lane0-<name>`). Never write anywhere else.
- **Mutation targets:** `/home/user/veneer/tmp/units/journey-cost/mutation-targets.json` is final; read it once at start.
- **Precondition gates on the base (worktree M at 4d21de7):** `test:src:browser` fails the six § Host-bound set titles; `test:setup`, `test:conformance` fail only when the ignored `tmp/` parents are missing (they exist in your worktree); the `test:src:tailwindcss` case `pins every curation witness against the tuned sheet alone and rejects each removed repair` timed out once at 15 s under the queue and passes on the landed tree. Treat a repeat of that timeout as a reportable reading, not as your change's failure, unless your change touches the Tailwind face.

## Second appended ruling at relaunch (2026-10-05, after the first run's deviation report)

- **Scoped runs use `--kind command`.** `run.ts`'s `--kind journey` mode is the full-run evidence mode: it requires all four variant artifacts fresh and is reserved for the Orchestrator's full runs. Every run you make (a selected test, a half, a project filter, an equality probe, a mutation copy) goes through the queue as `--kind command`, with whatever Vitest arguments the probe needs (`--project 'journey:light-1280*'`, `-t PATTERN`, `--reporter=json --outputFile=<folder>/report.json` included). The "`--kind command|journey`" wording in § Host queue meant that choice; your reading of the conflict was correct, and this ruling resolves it. Nothing else in the brief or the first ruling changes.
- **Report path.** Write the resumed run's report to `/home/user/veneer/tmp/units/journey-cost/lane-0/report.md`, replacing the deviation report (keep a copy of it as `report-deviation-1.md` in the same folder).
- **Registration readings.** Read the registered and skipped counts from the JSON report of a `--kind command` run over the four journey projects with `-t 'a title no test carries'` (every case lists as skipped, so the count of listed cases is the registration), or from a dry Vitest listing if one exists; name the method.

## Third appended ruling (2026-10-05, iteration)

Your own proof under construction is iteration, not a deviation: the clause "a scoped run fails outside the host-bound set" applies to a case you did not write or change in this lane and to the acceptance gates. A red run of a probe or proof you are writing (P-A, item 1a's helper proof, the split cases while you split them) is an instrument reading: fix it, re-run the scoped selection through the queue, record the red run and its cause in the ledger, and keep going. Stop only when the same instrument fails three consecutive scoped runs for a cause you cannot name, or when a case you did not change goes red.

## Fourth appended ruling (2026-10-05, after the Opus review of the second run)

The review mapped every assertion, control, reading, and logged line of the base's two cases to the candidate (43 `expect` sites in both, 16 reading sites, 3 row sites; none missing) and confirmed items 11 and 1a. Fix the following in your candidate, re-run the scoped acceptance, and report; the Orchestrator then runs the gate.

1. **The once-per-selector cache has no proof.** Deleting `matches.set(entry.selector, matched)` in `collectSelectorMatches` leaves every proof green, while the helper's `@remarks` claims one evaluation per distinct selector. Add a recorder-backed case in `tests/setupBrowser.test.ts`: fixture elements of a registered custom element class whose `matches` method records each selector it receives and forwards to the native method (a recorder of calls, which `tests.md` admits; no mock of project behavior); assert that a selector repeated across sheets is evaluated once per representative. If the recorder cannot be built without a mock, drop the once-evaluation sentence from the `@remarks` and say so.
2. **`@throws` form.** `tests/setupBrowser.ts` near 1861: write `@throws Thrown when a selector is invalid, with the \`DOMException\` error that the \`Element.matches\` method raises.`
3. **Guide tokens take a following noun.** `guides/veneer.md` near 2582: "a 390 px reading in the `light-1280` project."; near 2584: "the `host` field names the project".
4. **P-A runs twice.** Add a second line to `tmp/units/journey-cost/probes/p-a/command.txt` identical except for the folder `lane0-p-a-2`.
5. **Referral answered (no change for you).** `collectSelectorMatches` is exported with no consumer except its proof. The verdict's § 3 item 1a orders that: lanes 1 and 2 consume it, and acceptance requires a consumer. The Orchestrator records this as the Minimal public API exception the verdict grants.

Acceptance after the fixes, through the queue: the scoped setup:browser selection for the helper proof, `npm run test:setup:browser`, `npm run check`, `npm run lint:check`, `npm run format:check`, `npm run test:guides`, then `git diff --check`; refresh `changes.patch`. Report over `/home/user/veneer/tmp/units/journey-cost/lane-0/report.md`, keeping the current one as `report-2.md`.

## Fifth appended ruling at relaunch (2026-10-05, after the fix pass's timeout stop)

- **A budget timeout of an unchanged case is a load reading, not a stop.** `statechart tables > drives every face and color-mode row through the header buttons` timed out once at 60 000 ms in `lane0-r4-setup-browser-2` after passing in `lane0-r4-setup-browser` minutes earlier, while five other lanes shared the host. When an unchanged case times out at its budget, record the run folder and re-run the same gate once through the queue; a second timeout of the same case is the stop; a pass continues. The deviation clause means an assertion failure or a repeated timeout.
- **Finish the acceptance on the final candidate** through the queue: `npm run test:setup:browser`, `npm run check`, `npm run lint:check`, `npm run format:check`, `npm run test:guides`, then `git diff --check`; refresh `changes.patch`; cite each run folder.
- **Report path.** Keep the fix-pass report as `report-3.md` and write the resumed run's report over `report.md`.
