# Unit F6 FOUNDATION — successor brief 2 (the fix round)

Supersedes `f6-fix-brief.md` (never launched). What changed and why: the F6 audit round (analyst on
Astra, thread `01a0ca6c-3993-75d3-8c98-974bd5328763`; checker on Sonnet; reviewer on Opus) found the
items below beyond the Contract adoption the first draft carried, and the Orchestrator's gate chain
over the worktree reddened `test:setup:browser` on a case the unit's obligation 1 falsified in a
file the first brief did not own.

## Role and engine

`opus` on Opus (the `opus` alias; served `claude-opus-5`), the sole writer in the F6 worktree
`/home/user/veneer-f6` (detached at `07fc3c3` plus the F6 unit's writes and the Orchestrator's three
integration patches, all uncommitted), reached as a native subagent. Perform the assignment directly
and spawn nothing. Do not commit, push, or run `git checkout`, `git restore`, `git stash`,
`git reset`, or `git clean`. The dependency move is yours to make in `package.json`; the Orchestrator
runs `npm install` for the lockfile after you return, so leave `package-lock.json` alone.

## Objective

Close the F6 round's code findings in one pass: the Contract guard adoption (obligation 5, ruled
in by the tenet "Reuse appropriate @orkestrel/* packages, including Contract"), the
`.disabled`-first delegate case, the three order-dependent theme-attribute readings outside the
unit's first scope, and the guide prose the round found false or counted.

## Context

**Evidence.** The round's verdicts: `/home/user/scaffold/tmp/audit/f6-audit-analyst-verdict.md`
(claims 3, 4, 5, 6, 8, 11, 12 and the `isAppError` measurement), `f6-audit-checker-verdict.md`,
and the F6 report `/home/user/scaffold/tmp/audit/f6-report.md` (§ Obligation 5, § Deviations 1 and 2,
§ Observations). The gate log `/home/user/scaffold/tmp/audit/f6-gates.log.txt`: every gate `exit=0`
except `test:setup:browser exit=1` on `tests/setupBrowser.test.ts:697` "drives dark and light
variants and leaves the requested mode applied on repetition" (`AssertionError: expected true to be
false`), a case that pins the attribute removal obligation 1 retired. The fleet: `@orkestrel/test`
declares `@orkestrel/contract` under `dependencies` (its `package.json`, read 2026-09-22); Veneer
declares it under `devDependencies` only and has no `dependencies` block; `vite.config.ts` marks
`@orkestrel/*` external, so the import survives into `dist/src/browser/index.js` as a bare specifier
a consumer resolves through the dependency, and `tests/distribution.test.ts` case "ships only
relative or Orkestrel module specifiers" permits it.

**Law.** `/home/user/scaffold/AGENTS.md`; `.claude/rules/typescript.md`, `patterns.md` (§ Guards),
`architecture.md`, `workspace.md`, `tests.md`, `documentation.md`, `writing.md`. Skill: none. Guide:
`/home/user/veneer-f6/guides/veneer.md`. Rulings: D4 (no delegate refusal), D5, D6.

**Installed primitives.** `node_modules/@orkestrel/contract/dist/src/core/index.d.ts`: `literalOf`
(`Guard<Literals[number]>`), `isInstance(value, Class)` and `instanceOf(Class)` (the analyst executed
both against `AppError` over an application error, an ordinary error, a plain record, a throwing
proxy, a revoked proxy, and `null`, and each matched `isAppError`; the declaration carries the
throwing-`instanceof` containment at its line 2849), and `Guard<T>`. A local guard whose job one of
these does is a defect; a wrapper that merely renames one is a defect too — a named export defined as
a configured Contract guard (`literalOf('light', 'dark')`, `instanceOf(HTMLElement)`) is a narrower
contract and stays exported because the guide documents it as public API.

**Host.** Linux, bash, npm 11 on `PATH`
(`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`);
Chromium 141 at `/opt/pw-browsers`; the worktree has `node_modules` installed and
`@orkestrel/contract` is already installed there (a devDependency today). A foreground command is
capped at 10 minutes.

**Measurements.** Take before editing: whether `instanceOf(HTMLElement)` evaluated at module scope
typechecks in every project that loads `src/browser/validators.ts` (`npm run check`), and whether
`tests/src/browser/validators.test.ts` pins the throwing-`getPrototypeOf` proxy case (it does per the
F6 report; `isInstance` contains it).

**Control identifiers.** none.

**Standing conditions.** The tree is dirty with F6's writes and the three integration patches; keep
every one of them. `package-lock.json` will disagree with `package.json` after your dependency move
until the Orchestrator's `npm install`; `npm run check`, the browser projects, and the distribution
proof do not read the lockfile, so run them.

## Unknowns

Whether the distribution proof's release mode (`--mode release`) reads the manifest's `dependencies`
for the packed closure; run `npm run test:distribution` if the script exists and report its reading.

## Scope

**Owned.** `package.json` (move `@orkestrel/contract` from `devDependencies` to a new `dependencies`
block with the same caret); `src/browser/validators.ts` (`isColorModeState` through `literalOf`,
`isButtonHost` through `instanceOf` or `isInstance`, with the doc blocks kept true); `src/core/errors.ts`
(`isAppError` through `isInstance(value, AppError)` or `instanceOf(AppError)`, and the `@remarks`
sentence that said no Contract export serves corrected or removed); `tests/src/browser/validators.test.ts`
and `tests/src/core/errors.test.ts` (the proofs follow the guards; keep every case that pins a
behaviour, and add none that pins the factory); `tests/src/browser/Delegate.test.ts` (add the case that
acquires a host carrying `.disabled` before the first click, asserting acquisition, toggling, and
restoration); `tests/setupBrowser.test.ts` (the case at line 697 only: read the mode rather than the
raw attribute); `tests/app/browser/integration.test.ts` (the section case around line 540 only:
`mode === DARK ? 'dark' : null` becomes a mode reading like the matrix patch); `guides/veneer.md`
(§ Styles: the sentence around line 364 that still describes a reversing stylesheet or a twin goes;
§ Styles important-utility paragraph: name the `[hidden]` and calendar-picker rules without stating
their count; § Tests: one sentence pointing at the layer-order statement under § Showcase and the
`src/styles/_tokens.scss` file; § Surface engine paragraph: name B-COLLAPSE as the unit that
generalizes `emitEvent`, `bindEventMap`, and `Delegate`; § Styles → § Files mirror sentence: state
what `inspectPolicyMirrorPaths` proves — every non-integration module test under `tests/src/styles/`
names a source module at the same relative path, a leading-underscore partial resolved, enforced by
`npm run test:policy` — and no more).

Added from the reviewer lane (`/home/user/scaffold/tmp/audit/f6-audit-reviewer-verdict.md`, findings
F1 to F4 and claims 9 and 11), all owned by this unit:

- `app/browser/constants.ts`: declare `SHOWCASE_CONTROL = 'control'` beside `BUTTON_GRID` in the same
  doc form, and set it at the `Showcase.ts` site that writes the class; `tests/app/browser/index.test.ts`:
  the export inventory row for it (F1).
- `tests/setupStyles.ts` (the `TEXT_DL_CASES` remark: state the fact — `color` is the list's own
  resolved colour, `description` the colour resolved on its `dd` — and drop the generalization) and
  `tests/src/styles/elements/dl.test.ts` (name the element local `dd`) (F2).
- `guides/veneer.md`: move the sentence naming `src/styles/_tokens.scss` and its `@layer` declaration
  from § Showcase into § Styles ahead of the important-utility paragraph, and leave one pointer under
  § Tests naming § Styles for the layer order (F3 and the analyst's claim 6); recast the counts at the
  § Styles important-utility paragraph ("Two rules …") and the § Surface engine paragraph ("All three
  …", "the three together") without a numeral (claim 11); in § Compatibility, name the actor for the
  disabled-anchor accessibility row — Bootstrap's own recorded engine refuses the activation — in the
  preamble or the obligation text, after checking with `npm run test:conformance` whether
  `scanOracleObligation` keyword-matches the obligation cell (F4; if the cell text is matched, change
  the preamble only).
- `tests/setupBrowser.test.ts`: the two assertions at the case "drives dark and light variants and
  leaves the requested mode applied on repetition" (around lines 706 and 709) read the mode
  (`getAttribute('data-bs-theme') === 'dark'` is `false`), never a `'light'` pin, because `applyTheme`
  clicks only when the document's dark-ness differs (claim 9).

**Shared (report-only).** none. **Off-limits.** every other file, `package-lock.json` included, and
`ROADMAP.md`.

**What asserts the state this change ends.** `tests/src/browser/validators.test.ts`,
`tests/src/core/errors.test.ts` (search bound: `grep -rn 'isColorModeState\|isButtonHost\|isAppError' tests`);
`tests/distribution.test.ts` (the specifier case); `tests/guides.test.ts` parity over the guards'
summaries and the changed guide sections.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash for the gate commands and
`node_modules/.bin/oxfmt --config .oxfmtrc.json --write <owned file>`; no install, no commit, no
tree-wide mutating `format` or `lint --fix`; a probe under `tmp/probe/`, deleted before you return.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

Write `./tmp/units/f6-report-2.md` and return its full content as your final message, nothing else:
per item what changed with the file; the guard form chosen and the typecheck reading behind it; the
commands you ran with exit codes; `git status --porcelain` and `git diff --stat`; every deviation and
every claim of your own you flag as unverified. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one short hypothesis —
per `/home/user/scaffold/.agents/orchestration.md` § Deviation protocol, on: a Contract guard whose
semantics differ from the guard it replaces (a pinned case reddens); the distribution proof refusing
the specifier; a gate that cannot reach green inside your owned files. Decide, record, and carry on
from: the guard form; case titles; the exact wording of each guide sentence within the rulings.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0.
2. `npm run test:src:core` and `npm run test:src:browser` exit 0 with the validators, errors, and
   Delegate proofs green and the `.disabled`-first case present.
3. `npm run test:setup:browser` exits 0.
4. `npm run test:app` and `npm run test:journey` exit 0.
5. `npm run build` exits 0, and the distribution proof (its script name in `package.json`) exits 0
   on the specifier case, or the report names why it cannot run here.
6. `npm run test:guides` and `npm run test:policy` exit 0.
7. `grep -rn 'isColorModeState\|isButtonHost\|isAppError' src` shows each guard defined through a
   Contract export and no local `instanceof` or literal membership check beside it.
8. `git status --porcelain` lists the F6 files already dirty plus the owned files above and nothing
   else.
9. `npm run test:setup:browser` exits 0 (the fix for claim 9), and `grep -n "Two rules\|All three\|the three together" guides/veneer.md` prints nothing.

**Observations, not criteria.** The whole-chain `npm test` reading.

## Review evidence

The Orchestrator takes the actual diff and status after you return; `analyst` on Astra audits the
fix (an engine that did not write it).
