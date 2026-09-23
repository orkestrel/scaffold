# Unit PROOF-RESOLVER (`pr`) — a plugin row's Proof cell names a test file

## Role and engine

`builder` on Sonnet, a native Claude subagent, the sole writer in the worktree `/home/user/veneer-pr` (branch `unit/pr` from `518faf0`, the session head carrying the CAROUSEL landing and the engine session's J-TYPES landing). The executor that opens this brief is that subagent. Every edit here is specified; a choice this brief does not make is not the unit's to make.

## Objective

The conformance Proof resolver accepts, for an `engine | plugin` compatibility row, a Proof cell naming the test file that proves the obligation, so the engine session can flip a shipped `plugin` row's Proof from `—` to its proof file; every other row keeps the Button recording semantics unchanged.

## Context

**The request.** The engine session's design verdict (`/home/user/scaffold/.orkestrel/veneer/engine/j-engine-design-verdict.md` § Pending shared changes and requests to the baseline) asks the baseline to extend the resolver beyond Button's recording so a shipped `plugin` row's Proof cell can name a test file; until then a shipped plugin row carries Proof `—` and names its proof in the Obligation cell.

**The resolver today.** `tests/setupServer.ts`: `readCompatibility` reads the guide's § Compatibility tables into `CompatibilityRow` (`component`, `category`, `obligation`, `proof: string | undefined`, `status`; a `—` cell reads as `undefined`); `scanOracleObligation(row, fixture, bindings)` returns `undefined` for a row with no proof, else finds the Button recording step named by `row.proof` and judges it through the oracle bindings (`missing recording step`, `obligation has no oracle predicate`, `proof step does not prove this obligation`, `recording contradicts obligation`). `tests/conformance.test.ts` (around line 187) runs every compatibility row through `scanOracleObligation(row, recording)` and expects `undefined`. `tests/setupServer.test.ts` proves the resolver (the cases around lines 620 to 735: `button.click.toggle`, `button.absent`, `button.hover`, `button.keyboard.space`). The module anchors every path it reads at the exported `WORKSPACE_ROOT` constant (`tests/setupServer.ts` around line 350); resolve the proof file against it.

**The guide.** `guides/veneer.md` § Compatibility: the table (`Component | Kind | Obligation | Proof | Status`), the `engine | plugin` rows for Collapse, Dropdown, Tab, ScrollSpy, Alert, and Carousel with Proof `—` and `Owner: J-ENGINE.`, and the prose after the tables (around line 4823: "An accepted row records scope; a named Proof step obliges the official recording to agree with the row. … Those CSS rows carry a dash in Proof, as do source and engine obligations the Button interaction recording cannot drive.").

**Law.** `AGENTS.md`; `.claude/rules/{tests,typescript,names,documentation,writing,architecture}.md`; the skill: none; the guide `guides/veneer.md`. **Host.** Linux, `bash`; npm 11 on `PATH` through `export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"` (run it first in every shell); the worktree is staged with `npm ci --ignore-scripts` and `npm run build:src:styles` (`tmp/units/pr-stage.log.txt`). **Standing conditions.** `npm run build:src` is red on this base at the declaration rollup (`InternalError: Unable to follow symbol for "Sanitizer"`, the engine session's J-TYPES landing; its fix is in flight): do not run it and do not treat it as this unit's. `tests/setupPolicy.ts` and `tests/policy.test.ts` are vendored: never edit them.

## The change

1. **`tests/setupServer.ts`.** Add an exported predicate `isProofFile(proof: string): boolean` beside the resolver's helpers (documented; true when `proof` matches `/^tests\/[^\s`]+\.test\.ts$/u`). In `scanOracleObligation`, after the `row.proof === undefined` return and before the step lookup: when `isProofFile(row.proof)`, return `${label}: a file proof is a plugin row's` unless `row.category === 'plugin'`; else return `undefined` when `existsSync(resolve(WORKSPACE_ROOT, row.proof))` holds, else `${label}: missing proof file`. Update the function's TSDoc (`@returns` and `@remarks`) to state the file form. Add `isProofFile` to the module's public surface wherever the module's export list is asserted (`tests/setupServer.test.ts`, the case `declares the identity constants, …` around line 478).
2. **`tests/setupServer.test.ts`.** Beside the existing resolver cases add one `describe`-level case per behaviour, each named for what it proves: a `plugin` row whose Proof names an existing file (`tests/setupServer.test.ts` itself) reads `undefined`; a `plugin` row naming a missing file (`tests/src/browser/absent.test.ts`) reads the `missing proof file` finding; a non-plugin row (spread from the `button.click.toggle` row with `proof: 'tests/setupServer.test.ts'`) reads the `a file proof is a plugin row's` finding; `isProofFile` accepts `tests/src/browser/Collapse.test.ts` and refuses `button.click.toggle`, `tests/setup.ts`, and `src/browser/Collapse.test.ts`. Insert a failing proof first: record `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupServer.test.ts` red with the cases and the unchanged resolver, then green.
3. **`guides/veneer.md`, § Compatibility prose** (the paragraph around line 4823). After "Those CSS rows carry a dash in Proof, as do source and engine obligations the Button interaction recording cannot drive." add: "A `plugin` row's Proof cell names instead the test file that proves the obligation, as a path from the workspace root ending in `.test.ts`, after its engine unit ships; the conformance proof requires that file to exist, and a row of any other kind refuses the file form." Change no table row.

## Unknowns

None.

## Scope

**Owned.** `tests/setupServer.ts`, `tests/setupServer.test.ts`, `guides/veneer.md` (the one prose sentence). **Off-limits.** Everything else, `tests/conformance.test.ts` and `tests/setupPolicy.ts` included. **Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, push, install, `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; no tree-wide `format` or `lint --fix`; no `npm run build:src`; scoped runs only.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

A report at `/home/user/veneer-pr/tmp/units/pr-report.md` (no count of a growable set; no list item named by its position) with: the diff summary, the failing-first command and its red and green result lines, each gate's command and result line, every deviation, and what the unit could not close. Delivered as that file plus the same text as the final message.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Decide, record, and carry on from a case title and the TSDoc wording within the forms named; stop on any other choice, on a conformance row that reads differently after the change, and on a disagreement between this brief and the tree.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0.
2. `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupServer.test.ts` exits 0 with the added cases, after the recorded red run.
3. `npm run test:conformance` exits 0 (every existing row reads as before).
4. `npm run test:guides` and `npm run test:policy` exit 0.
5. The report carries the failing-first evidence and the gates.

## Review evidence

`git -C /home/user/veneer-pr diff 518faf0` and `git -C /home/user/veneer-pr status --porcelain`, captured by the Orchestrator at hand-back as `pr.diff` and `pr-status.txt`, plus the report.
