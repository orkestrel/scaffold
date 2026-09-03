# Unit conform-PACKAGE — implement the confirmed conformance rows

## Role and engine

`implementer` on Claude Opus 5, a native subagent in the main checkout `REPO`, the sole writer in that tree. Perform the assignment directly and spawn nothing.

## Objective

Land every row under § Rows in `REPO` so that the tree conforms to `AGENTS.md` and the rules on each row's cited section, with the tests, guide, and README that pin the change, and the gate chain green.

## Context

**Law.** `AGENTS.md`; every file under `.claude/rules/` (read the copies at `/home/user/scaffold/.claude/rules/`, which are the canon this round judges by; the vendored copies under `node_modules/@orkestrel/scaffold/dist/host/claude/rules/` are one release behind); the package guide `guides/PACKAGE.md`; `guides/README.md`.

**Evidence.** Each row quotes the operative rule sentence, the `file:line` it applies to, what is wrong, and the smallest correct repair, as ruled by the refuter lane. The rows are the refuter's CONFIRMED rulings for this package; the finders' refuted findings are not here and are not yours.

**Host.** POSIX shell in `REPO`; `node_modules` holds the fleet closure staged with `npm install --no-save` from the tips named under § Staged closure, so a declared `@orkestrel/*` dependency's installed declaration can be ahead of the registry release the manifest declares. Never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile; a fresh install would revert the staged closure. Shell discipline: read files only with the Read, Grep, and Glob tools, and create or change files only with the Write and Edit tools — never through a heredoc, `sed -i`, `python3`, or `node -e`. Use Bash only for `npm --prefix <checkout> run <script>`, `npm --prefix <checkout> test`, `npx oxfmt …`, `npx oxlint …`, `npx vitest run …`, `git -C <checkout> status`, `git -C <checkout> diff`, `git -C <checkout> add -N …`, `git -C <checkout> mv <from> <to>` (the one tool that relocates a file; a row that moves a file uses it, never a copy plus a delete), and `node /home/user/scaffold/tmp/work/evidence.mjs PACKAGE`, one command per call: a leading `cd <checkout> && ` before an `npx` call is the only chain, with no `;` sequence, no `for` loop, no heredoc, no redirect except a runner's output into a file under `EVIDENCE_DIR/PACKAGE-proofs/`, and no pipe except `2>&1 | tail -N`. A command that prompts for permission blocks the whole round and reaches the user as an interruption.

**Measurements.** Every gate is green at the baseline tip `TIP` (`format:check`, `lint:check`, `check`, `build`, `test`) except where § Standing conditions says otherwise.

**Staged closure.** STAGED_CLOSURE

**Standing conditions.** STANDING_CONDITIONS

**Consumers.** CONSUMERS — where a row is breaking, these fleet packages import the renamed or removed symbol; you do not edit them. Record each consumer-side edit the row obliges as an exact patch under § Shared-file patches in your report; the Orchestrator carries it to that package's unit in layer order.

## Unknowns

A row whose repair collides with an existing name, or whose ruled name is already taken by another symbol in the package, stops the unit with the deviation report; do not pick a substitute name.

## Scope

**Owned.** `src/**`, `tests/**` except the vendored `tests/setupPolicy.ts`, `tests/policy.test.ts`, and `tests/config.test.ts`; `guides/PACKAGE.md`; `guides/README.md`; `README.md`; `package.json` only for the `description`, `exports`, `files`, `scripts`, and `bin` fields a row names; `vite.config.ts` and `tsconfig.json` only where a row names them.

**Shared (report-only).** Every other fleet checkout under `/home/user/fleet/`; the vendored dependency guide mirrors `guides/<other-package>.md`.

**Off-limits.** `.claude/**`, `.codex/**`, `.cursor/**`, `AGENTS.md`, `CLAUDE.md`, `.agents/**`, `configs/**`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `scripts/**`, `.mcp.json`, `.oxlintrc.json`, `.oxlintignore`, `.oxfmtrc.json`, `.prettierignore`, `.editorconfig`, `.gitattributes`, `.gitignore`, `LICENSE`, `package-lock.json`, the `version` and dependency fields of `package.json`, `node_modules/**`.

**What asserts the state this change ends.** Derive the set by running the suite after each row: the mirrored test of every touched module, `tests/guides.test.ts` (parity over the barrel and the guide's method tables), and the guide fences a renamed symbol appears in. End every red file inside Owned or as a shared-file patch.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash`. Never commit, stage, push, tag, publish, install, or run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`. Never add a dependency. Never suppress a diagnostic. Never use a mock, behavioral fake, module replacement, framework spy, or fake clock. Never leave a TODO, a skipped test, or a deferred row. Run no tree-wide mutating command except the gate chain named under § Acceptance criteria, which is yours to run because you are the only writer in this tree.

## Rows

ROWS

## Fleet rows

These rows come from the Orchestrator's fleet-wide rulings of 2026-09-03 on refuter findings that named a fleet pattern; each takes a disposition (`applied`, `noop` with evidence, or `stopped`) in the report's table like a numbered row, under the ids given here.

- **fleet-F1** (the `isBrowserVuePath` residue; msg-obj-4 and budget-obj-7 pattern; non-breaking). Where `tests/setup.ts` declares `isBrowserVuePath` and this workspace has no browser environment (no `src/browser`, no `app/browser`, no `tests/setupBrowser.ts`), delete the helper and its doc comment, the `describe('isBrowserVuePath', …)` block in `tests/setup.test.ts`, its entry in that file's import list, and the clause naming it in the header comment of `tests/setup.ts`. Where the workspace has a browser environment, or the helper is absent, record `noop` with the path read. Where the helper is the sole export of `tests/setup.ts` and its `describe` block the sole case of `tests/setup.test.ts` (the Orchestrator's ruling of 2026-09-03 13:04 UTC): delete the helper and its doc comment, and rewrite `tests/setup.test.ts` as the export-free proof — `import * as setup from './setup.js'`, one `describe('setup', …)` with one case `adds no export` asserting `expect(Object.keys(setup)).toEqual([])`, under a header comment stating that the module is deliberately export-free so that loading it first contributes nothing to any project. Keep `tests/setup.ts` with its header comment, keep the `setup` project in `vite.config.ts`, and keep the `test:setup` script and its step in the `test` chain: `tests/setup.ts` stays as `setupFiles[0]` of every project, so the export-free proof is what guards that loading it first contributes nothing; the installed scaffold's plan infers the `setup` project and the `test:setup` script from the proof's presence (`node_modules/@orkestrel/scaffold/dist/bin/main.js:1266-1270` on 0.0.60), and `scaffold audit --offline` refuses an uncovered `tests/setup.ts` while that axis is declared (emitter, 13:04 UTC). With the proof deleted the plan infers no axis and the audit is clean too (template's measurement), so two shapes are audit-clean and the fleet keeps the one that runs the guard. Where a numbered row of this brief already deletes the helper, fleet-F1 folds into that row: record fleet-F1 `applied` by that row's id and make no second edit; where that row also removes the `setup` axis, stop on that row and report the conflict with this ruling.
- **fleet-F2** (the `id` field ahead of the `#` fields; budget-obj-8 pattern; non-breaking). Where an implementation class declares a public `readonly id: string` data field ahead of its `#` private fields (`.claude/rules/architecture.md` § Class order puts `#` fields first and the public interface as getters then methods), declare `readonly #id: string` as the first `#` field, assign it in the constructor where the public field was assigned, and add `get id(): string { return this.#id }` as the first getter of the public interface; leave the interface's `readonly id: string` in `types.ts` unchanged. Before applying it, read every test and guide fence for a `JSON.stringify` of that class's instance: a getter lives on the prototype, so the serialized form loses `id`; where any serializes it, `stop` and report that site instead of applying. Where no class has the shape, record `noop` with the classes read.

## Method

1. Types first: change `*/types.ts` for every row that moves a contract, and typecheck (`npm run check`) before implementing.
2. For each behavioural row, write the failing test that names the defect, record the exact command and its failing count, implement, and record the same command green. A row that adds, moves, or extracts a helper or a fixture is behavioural for this step: its proof is the helper's own test read red without the helper (or with the helper's body planted wrong) and green with it. Capture each control's runner output to a file (`npm run <script> > EVIDENCE_DIR/PACKAGE-proofs/<row>-<control>.txt 2>&1`, one plain command) rather than transcribing counts into the report, and name the file beside the count; a read-only audit lane can open a file and cannot re-run a suite. For a row that deletes a count over a package-owned set, sweep both the number words (`\b(one|two|three|four|five|six|seven|eight|nine|ten)\b`, case-insensitive) and the numerals (`\b\d+ (elements|members|rules|rows|exports|files|options|steps|cases|stages|findings|tests|helpers|methods|entities|tables|sections|constants|passes|categories)\b`) over the same population, and rule every hit by its sense. For a placement, naming, or documentation row, record the sweep that proves the old form is gone (a word-boundary search over the old name, and a second case-insensitive search over its `-s`, `-ed`, and `-ing` inflections) beside the gate that proves the new one.
3. Update every consumer inside the package atomically: imports, barrel rows, tests, guide method tables and Surface rows, README links, fence transcriptions in `tests/guides.test.ts`. No compatibility alias, re-export, or shim.
4. Where a row renames or removes a published symbol, state it under § Breaking in the report with the consumers named above and the exact edit each needs.
5. Sweep after implementation: no stray implementation-file declaration, no non-exported centralized declaration, no nested function, no superfluous wrapper, no stale import or barrel row, no untested extracted function, no old name in prose.
6. Run the gate chain in order and read each result bare.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

Write `REPORT_PATH` as Markdown and return the same content as the structured object: per row `applied`, `stopped` (with the deviation), or `noop` (with the evidence it was already true); files touched with one-line summaries; the failing-first command and counts per behavioural row; the sweeps with their patterns and paths; each gate command with its exit code and any failure excerpt; § Breaking with the consumer edits; § Shared-file patches; deviations. Then produce the evidence files `EVIDENCE_DIR/conform-PACKAGE.diff` and `EVIDENCE_DIR/conform-PACKAGE.status` with the one plain command `node /home/user/scaffold/tmp/work/evidence.mjs PACKAGE`, which runs `git add -N` on every untracked file and writes `git diff HEAD` and `git status --short` to those paths; never write them through a shell redirect, because `git diff … > file` prompts for permission and nobody answers. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one short hypothesis — when a row's repair contradicts a rule, collides with an existing name, requires a file outside Owned, or requires an edit to a consumer to keep this package's own gates green. Decide, record, and carry on from an ancillary question: where a paragraph sits in the guide, the order of rows within one file, the name of a new test case.

## Acceptance criteria

1. `npm run format:check` exits 0.
2. `npm run lint:check` exits 0.
3. `npm run check` exits 0.
4. `npm run build` exits 0.
5. `npm test` exits 0 (see § Standing conditions for a package whose baseline is red on a named container failure; report that gate's reading as an observation there).
6. Every row is `applied`, `stopped`, or `noop`, and the old-name sweeps read empty.
7. `git status --short` lists only files under Owned.

**Observations, not criteria.** The whole-suite `npm test` reading under any concurrent load; the Orchestrator takes the deciding run after the unit exits.

## Review evidence

The diff and status files named under § Output; the report; the rows.
