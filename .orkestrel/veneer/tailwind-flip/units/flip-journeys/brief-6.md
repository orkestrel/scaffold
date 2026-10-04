# Unit flip-journeys-6 — finish U6 after the nested-rule and declared-longhand rulings

## Role and engine

astra on GPT-6 Astra (effort high), reached as `codex exec` at `danger-full-access`, in `/home/user/veneer` on branch `ccr-d15a48b1-yyyll6`. You are the sole writer for tracked files.

## Objective

Complete unit U6 as the earlier briefs specify (`/home/user/scaffold/tmp/codex/flip-journeys-brief.md` with its appended rulings, then `flip-journeys-2-brief.md` to `flip-journeys-5-brief.md`, the fifth's § The winner model governing the partition case), starting from the partial tree the fifth run left uncommitted, under the two rulings in § Rulings. The fifth run's report is `/home/user/scaffold/tmp/codex/flip-journeys-5-last.md`; its complete report `/home/user/veneer/tmp/units/flip-journeys/fifth-report.md`; the declaration excerpts `/home/user/veneer/tmp/units/flip-journeys/fifth-declarations.txt`.

## State at launch

`git status --porcelain` reads three modified tracked files, all U6's. Done: everything but six partition violations and the final gates. The partition case runs in 73.6 s (its limit stays 300 s); `check` exit 0 on the final tree; the lint error is fixed.

## Rulings

1. **Nested rules.** Tailwind's compile nests `@media` blocks inside `.container` (CSS nesting), so the declarations sit in `CSSStyleRule.cssRules`, which the collector does not descend; it therefore reports Bootstrap as the winner of `.container`'s `max-width` under `unexcluded`. The collector in `tests/setupBrowser.ts` descends every `CSSStyleRule`'s `cssRules` (and every grouping rule's) when it reads a face's declarations, with the nested conditions joined to the rule's context as the sheet-placement reader does. Leave `scanSheetRules` in `tests/setupStyles.ts` unchanged: other proofs pin counts on its present walk; note in the report that a shared nested-aware reader is a fix-unit candidate.
2. **Declared longhands decide the winner.** In the winner table, a system wins a longhand only where its rule for N declares it; where only the other system declares the longhand, that system wins by default. Under `unexcluded`, `border-1` (Bootstrap declares the four widths only; Tailwind declares the widths and `border-style`) reads Bootstrap's widths (masked where the style is `none` under `bootstrap`, skip 3) and Tailwind's `border-*-style`; under `tailwindcss`, a component longhand only Tailwind declares has no declaration from N (Tailwind's rule is excluded) and is not compared.

Everything else in the fifth brief stands: zero violations after the skips, the controls, the measured partition counts, the acceptance list, and the stop.

## Acceptance criteria

The `flip-journeys-3` brief's list, bare, in order, each with its exit in the report.

## Return shape

As the fifth brief. Nothing committed.

## Deviation contract

As the fifth brief.
