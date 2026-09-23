# Unit L2 LEDGER-PRIORITY — a conformance case holding every shared declaration's priority (D39, D39a)

## Role and engine

`builder` on Sonnet (native Claude subagent), sole writer in `/home/user/veneer-bfm` (a git
worktree on branch `unit/bfm`, clean at its head, with the mixin unit landed; `node_modules`
installed). Perform the assignment directly and spawn nothing. Use absolute paths under
`/home/user/veneer-bfm` for every command and file, and run every npm and npx command from
`/home/user/veneer-bfm`. Do not commit, push, install, or run `git checkout`, `git restore`, `git
stash`, `git reset`, `git clean`, or `git checkout-index`; undo the plant by the exact reverse
edit. The permission floor forbids every one of those git commands for any purpose, a comparison
against the base included.

## Objective

`tests/conformance.test.ts` carries a case that reports every (selector, property) pair the release's
compiled CSS and the built cascade both declare whose priority differs, the case is green on the
tree, the named plant reddens it, and the guide's non-utility `!important` sentence names the case.

## Context

**Evidence.** Read on 2026-09-23: the Orchestrator's probe
`/home/user/scaffold/.orkestrel/veneer/units/l2-probe.test.ts` (run at `d60d91c` as
`tmp/probe/priority.test.ts`; `l2-probe.log.txt`: 1350 pairs compared, 59 important in the release,
89 important in the cascade overall, no mismatch) is the case's logic; `SheetReader` in
`tests/setupServer.ts` (around line 1615, `declarations` with `selector`, `property`, `value`,
`important`) and `readBuiltCascade` are the readers; `tests/conformance.test.ts` `describe('cascade
ledger')` (the ledger cases around lines 180 to 195) is where the case sits, as its own `describe`
("declaration priority") after the ledger cases; the release is
`node_modules/bootstrap/dist/css/bootstrap.css` (resolve it through `createRequire(import.meta.url)`
as `tests/setupStyles.test.ts` resolves `tailwindcss/preflight.css`); `guides/veneer.md` around lines
152 to 155 ("Every Bootstrap utility Veneer ships carries the `!important` Bootstrap writes for it,
and Veneer adds none Bootstrap does not write. Outside the class utilities, the `[hidden]` rule in
the `reset` layer and the calendar-picker indicator rule in the `elements` layer carry one as well,
each matching Bootstrap's own declaration."); `src/styles/_reset.scss` line 8 (`display: none
!important` on `[hidden]`) is the plant's site.

**Law.** `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{tests,typescript,names,writing,documentation}.md`;
D39 and D39a in `/home/user/veneer-bfm/tmp/units/decisions-round-2.md` (copy the current file from
`/home/user/scaffold/.orkestrel/veneer/units/decisions-round-2.md` first). Skill: none. Guide:
`guides/veneer.md` (the one sentence; owned).

**Installed primitives.** `@orkestrel/test`: `requireValue`; `SheetReader` and `readBuiltCascade`
from `tests/setupServer.ts`; add no helper. Keep the pair key and the mismatch line as case-local
expressions unless the case repeats them, in which case export the leaf from `tests/setupServer.ts`
with its proof and inventory row.

**Host.** npm 11 on `PATH`
(`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`);
`prettier` must never run; run `npm run build:src` before `npm run test:conformance` and after every
plant and revert (the case reads `dist/src/styles/index.css`).

**Measurements.** `npm run test:conformance` exits 0 at the worktree's head (the mixin unit's
reading).

**Control identifiers.** none; name the case for what it proves.

**Standing conditions.** none.

## Unknowns

- none.

## Obligations

1. **The case.** In `tests/conformance.test.ts`, add `describe('declaration priority')` after the
   `cascade ledger` block with one case, "carries the priority the release writes on every
   declaration both sheets make, and adds none": read the release and the built cascade through
   `SheetReader`; key each declaration by selector and property; for each pair both declare,
   compare whether any declaration of it is important on each side; assert the mismatch list
   equals `[]` with each line in the form `<selector> { <property> }: release <important|normal>,
   cascade <important|normal>`; assert the compared count is greater than 0 so an empty reading
   cannot pass. A comment states D39a: the oracle records no priority, so this case is where the
   priority is held equal.
2. **The plant.** Remove ` !important` from `display: none !important` in `src/styles/_reset.scss`
   (the `[hidden]` rule); build; the case must redden with the one line naming `[hidden] { display
   }`; reverse exactly; build; green. Record the red line and the green reading.
3. **The guide.** After the sentence "…each matching Bootstrap's own declaration." in
   `guides/veneer.md`, add: "The conformance proof holds that agreement for every declaration both
   sheets make: each shared selector and property carries the same priority on both sides, because
   the oracle records values without their priority." Rewrap at or under 100 columns.
4. Run `npx oxfmt --config .oxfmtrc.json --write` over the owned files.

## Scope

**Owned.** `tests/conformance.test.ts`, `guides/veneer.md` (the one sentence),
`src/styles/_reset.scss` (the plant and its exact revert only).

**Shared (report-only).** `ROADMAP.md` (return the closing text for the D39 carrier row, "The
ledger's dropped priority…", once it exists; the Orchestrator adds the row at CONTROL's landing).

**Off-limits.** `tests/setupServer.ts` unless obligation 1's repetition clause fires, `tests/fixtures/**`,
every other partial, the vendored files, and every other file.

**What asserts the state this change ends.** The new case (`npm run test:conformance`) and
`npm run test:guides`; derived by running them.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No tree-wide `format`, `lint --fix`, or
`build` beyond `npm run build:src`; no `npm install`; no git command that discards a change.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

Validate with `npx oxfmt --config .oxfmtrc.json --check` over the owned files, `npx oxlint --config
.oxlintrc.json --deny-warnings tests/conformance.test.ts`, `npm run check`, `npm run build:src`,
`npm run test:conformance`, and `npm run test:guides`, all from `/home/user/veneer-bfm`.

## Output

Write `/home/user/veneer-bfm/tmp/units/l2-report.md` and return the same text: the case's site; the
plant record; the guide sentence; the gate exits with counts (the compared count the case reads
included); `git status --porcelain`; and deviations per § Deviation protocol in
`/home/user/scaffold/.agents/orchestration.md`. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — on the case reddening on the tree before any plant, on the plant failing to redden it,
and on any file outside § Scope a gate names. Decide, record, and carry on from the comment's
wording and the describe's placement.

## Acceptance criteria

1. `npx oxfmt --check`, the scoped `oxlint`, and `npm run check` exit 0.
2. `npm run build:src` and `npm run test:conformance` exit 0 with the new case passing and a
   compared count above 0; the plant record shows the red line.
3. `npm run test:guides` exits 0.
4. `git status --porcelain` lists the two owned files and nothing else (the partial restored).

## Review evidence

The report and the diff of the owned files against the worktree's head.
