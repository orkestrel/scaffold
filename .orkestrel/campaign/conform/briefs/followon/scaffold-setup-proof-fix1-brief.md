# Unit scaffold-setup-proof fix round 1 — the unreleased listener, the tautological prefix case, the report's pointers and counts

## Role and engine

`builder` on Claude Sonnet (native Claude Code subagent; a fully specified unit), the sole writer in `/home/user/scaffold` for the files this brief owns, also owning the unit's report file `/home/user/scaffold/tmp/units/followon/scaffold-setup-proof-report.md` and the capture directory `/home/user/work/evidence/scaffold-proofs/`. Perform the assignment directly and spawn nothing. The Orchestrator commits campaign records under `.orkestrel/**` by path while this unit runs; never touch `.orkestrel/**` or `tmp/**` other than the report, never stage, never commit, never push.

## Objective

Close round 1 of the scaffold-setup-proof audit: the checker's refutations of claims 1 and 9 (`/home/user/scaffold/.orkestrel/campaign/conform/units/followon/scaffold-setup-proof-checker-grok.result.md`) and the objective lane's refutations of claims 1, 5, and 9 with its findings O-1 and O-2 and referral R-1 (`/home/user/scaffold/.orkestrel/campaign/conform/units/followon/scaffold-setup-proof-objective-r1.md`). Rulings: R-1 is adopted — the coverage table cites each case's title beside its line; O-3 is an observation, no change; the report's `:108` ("the last declared `test:` key was `test:bench`") and `:160` ("the `test` chain stops at the first failure") are permitted — each states a rule or a behaviour and names no list item by its position; O-1 is the Orchestrator's retention, closed after this round.

## Context

`/home/user/scaffold/AGENTS.md` § Writing and § TTTDD; `/home/user/scaffold/.claude/rules/tests.md:35` (a case that re-derives its answer from the value it feeds in proves nothing) and § Shared test infrastructure; `/home/user/scaffold/.claude/rules/writing.md` § Code tokens, references, and links; the `createScratch` contract in `node_modules/@orkestrel/test/dist/src/server/index.d.ts:404` and `guides/test.md:737` (a prefix fragment carrying no separator is one path segment and cannot steer the allocation out of its parent).

Standing conditions: the tree is the landed tip `1da0a353`, clean except for what this unit writes; `node_modules` is installed and current, never run `npm install`, `npm ci`, or any command that rewrites it or the lockfile; never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`, undo a plant by editing the line back; the vendored set (`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`, `configs/**`, `scripts/**`, `.claude/**`, `LICENSE`, the root dotfiles) is off-limits; `tests/setupServer.ts:242` is off-limits except for the one planted control named under O-2, restored byte-for-byte. Allowed commands, one per call: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:setup`, `npx oxfmt --config .oxfmtrc.json <file>`, `git status --short`, `git diff --stat`, `grep -rnE <pattern> <paths>`, `ls`, `cat`, `sed -n`, `tee`.

## Sites and edits

- **Claim 5** — `tests/setupServer.test.ts:701-716`, the case `drops the connection it is holding open when the suite destroys it`: wrap the body after `const server = await createUpstreamServer({ … })` in `try { … } finally { await server.destroy() }`, keeping the in-body `await server.destroy()` the case asserts on (`destroy` is idempotent: the first call's promise is returned to every later one, `guides/test.md:1148`). Read the whole case to its closing line before editing so the `try` encloses every statement that follows the server's creation.
- **O-2** — `tests/setupServer.test.ts:96-104`, the case `allocates every scratch directory this suite owns under its own prefix`: replace the tautological `workspace.path.includes(SCRATCH_PREFIX)` assertion with the property the consuming suites depend on: `SCRATCH_PREFIX` carries no path separator (`expect(SCRATCH_PREFIX.includes('/')).toBe(false)` and `expect(SCRATCH_PREFIX.includes('\\')).toBe(false)`, or one assertion over `/[\\/]/u`), and the allocated directory's basename starts with `SCRATCH_PREFIX` (`basename(workspace.path).startsWith(SCRATCH_PREFIX)`, importing `basename` from `node:path` beside the file's other `node:` imports); keep the `existsSync` assertion and the `finally`. Failing-first control: plant `SCRATCH_PREFIX` at `tests/setupServer.ts:242` as `'orkestrel/scaffold-'`, run `npm run test:setup`, capture with `tee` to `/home/user/work/evidence/scaffold-proofs/fix1-prefix-planted-red.txt` (it must fail this case on the separator assertion), restore the line, run the same command, capture to `/home/user/work/evidence/scaffold-proofs/fix1-prefix-green.txt`; confirm `git diff --stat -- tests/setupServer.ts` prints nothing after the restore.
- **Claim 1 and R-1** — the report's coverage table: re-derive every `file:line` from the tree after the edits under claim 5 and O-2 (those edits move lines too), and add each case's title beside its line in the form `` `tests/setupServer.test.ts:726` (`buildCLIOptions points registry and repository endpoints at one loopback base`) `` — read the actual `it(` title. The objective lane's list of drifted rows (`buildCLIOptions` onward, +11 before this round's edits) is the minimum; check every row.
- **Claim 9** — the report: `:5` "One gate is red" → name the gate ("The `test` gate is red"); `:125` "Planted, one helper body per module" → "Planted, a helper body in each module"; `:137` "Restored by editing the same two lines back" → "Restored by editing the same lines back"; `:231` "The control below it" → "The control that follows it"; `:243` "The two setup modules were edited" → "The setup modules were edited"; `:254` "the two links to `tests/guides.test.ts`" → "the links to `tests/guides.test.ts`". Sweep `\b(one|two|three|both|below|above)\b`, case-insensitive, over the report and rule every remaining hit (a value beside its measurement is permitted).
- **Report** — append `## Fix round 1` naming both lane files, each edit with `file:line` before and after, the control's command and both captures with their counts, and the rulings (R-1 adopted, O-3 observation, `:108` and `:160` permitted, O-1 the Orchestrator's retention).

## Scope

Owned: `tests/setupServer.test.ts` (the two named cases and the `node:path` import line); `tests/setupServer.ts:242` for the planted control only, restored byte-for-byte; `/home/user/work/evidence/scaffold-proofs/fix1-*.txt`; the report. Shared: none. Off-limits: every other line and every other file.

## Execution

Perform every step yourself; spawn nothing.

## Output

Return, as your final message: each tree edit with `file:line` before and after; the control command with the red count, the green count, and both capture paths; the re-derived coverage rows (export → `file:line` and title) for every row that changed; the report sentences before and after; `git status --short`; the exit codes of `npm run format:check`, `npm run lint:check`, `npm run check`, and `npm run test:setup`. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one hypothesis — when the planted control does not fail on the separator assertion, when the restored run does not pass, when a gate reddens, or when a named site does not read as this brief quotes it. Decide, record, and carry on for an ancillary question: the exact wording of a rewritten sentence, the choice between the two separator-assertion forms.

## Acceptance criteria

1. `sed -n 701,722p tests/setupServer.test.ts` shows the `try`/`finally` enclosing the case body with `await server.destroy()` in the `finally`; `grep -n 'includes(SCRATCH_PREFIX)' tests/setupServer.test.ts` returns nothing; `grep -n 'basename' tests/setupServer.test.ts` shows the import and the assertion.
2. `fix1-prefix-planted-red.txt` shows `npm run test:setup` failing the prefix case; `fix1-prefix-green.txt` shows it passing; `tests/setupServer.ts` is byte-identical to `1da0a353`.
3. Every coverage-table `file:line` opens on the `it(` line whose title the row carries; `grep -nE '\b(two|One gate|below it)\b' /home/user/scaffold/tmp/units/followon/scaffold-setup-proof-report.md` returns nothing at the named lines.
4. The gates and `npm run test:setup` exit 0; `git status --short` lists `tests/setupServer.test.ts` alone among tracked files.
