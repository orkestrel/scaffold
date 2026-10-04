# Unit flip-sheet-4 — finish the fold after the precedence ruling

## Role and engine

astra on GPT-6 Astra (effort high), reached as `codex exec` at `danger-full-access`, in `/home/user/veneer` on branch `ccr-d15a48b1-yyyll6`. You are the sole writer for tracked files.

## Objective

Complete unit U2b exactly as `/home/user/scaffold/tmp/codex/flip-sheet-2-brief.md` (with its appended rulings) and `/home/user/scaffold/tmp/codex/flip-sheet-3-brief.md` (the scoped-witness ruling) specify, starting from the partial tree the second run left uncommitted, under the ruling in § The precedence ruling. The second run's report is `/home/user/scaffold/tmp/codex/flip-sheet-3-last.md`: read it for what is done, what is pending, and the measured values.

## State at launch

`git status --porcelain` reads ten modified tracked files, all U2b's (the Sass with the `$scoped` map and the `scope` mixin; the guide table with 30 reboot, 10 restore, and 6 scoped rows and the plain-plus-hazard scoped witnesses; `readCuration` with the `scoped` form; the instruments; `tests/src/tailwindcss/index.test.ts` with the derivation proof pinning 73 originals, 72 curated copies, 7 scoped copies, and the witness case passing on every row with the border widths read at 0px). Done: the sheet suite passes 5 of 5 through the configured Vitest file. Not done: the precedence case, formatting, the U3 writers twice, every gate.

## The precedence ruling

The second run stopped because the curated copy `button:focus:not(:focus-visible):where(…)` at (0,2,1) outranks `.focus-ring:focus` at (0,2,0) on `outline: 0`. The original reboot rule `button:focus:not(:focus-visible)` has the same (0,2,1) and outranks that component rule in Bootstrap alone too; the copy reproduces Bootstrap's own precedence, which is what a copy is for. The hazard the audit found came from `.ROOT TAG` adding a class to the compound, which `:where(.ROOT)` removes.

Ruling: the precedence case asserts that no copy introduces a precedence its original lacks. For every curated copy (`TAG…:where(.A, .B)`) and scoped copy (`:where(.ROOT) TAG`) in the built tuned sheet, read from CSSOM: (a) the copy sits in the `bootstrap` layer; (b) the copy's specificity equals its original reboot compound's specificity (`:where()` contributes zero; read both with the same specificity reader, the one the diagnostic used or `tests/setupStyles.ts`'s if present); (c) the copy's position in the flattened sequence precedes the first rule whose selector carries a `CLASS_NAMES.bootstrap.components` class (the components follow the reset partial). Controls: a planted `.table tr { border-color: inherit }` copy in `bootstrap` (specificity (0,1,1) against the original's (0,0,1)) fails (b); a planted copy appended after the components fails (c). Title in the file's style, such as `keeps every curated and scoped copy at its original's specificity before the component rules`. Report the measured specificity pairs as a count per original and quote the `button:focus:not(:focus-visible)` pair.

## Scope deltas against the earlier briefs

None. Everything else stands: formatting of owned files, `npm run build:src:tailwindcss` with the digest reported, the U3 writers twice with both record digests, every gate in order.

## Acceptance criteria

The `flip-sheet-3` brief's list, bare, in order, each with its exit in the report.

## Return shape

As the `flip-sheet-3` brief, plus the precedence case's measured counts. Nothing committed.

## Deviation contract

As the earlier briefs, with the precedence ruling replacing the second run's stop. Settle an ancillary choice yourself and record it; stop only on a conflict this brief and the earlier ones do not rule on.
