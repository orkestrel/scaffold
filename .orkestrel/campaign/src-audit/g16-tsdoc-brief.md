# Unit: TSDoc-convention cross-check (g16)

## Role and engine

Convention-verification lane, Claude native (Sol bench dark: `codex` CLI absent). Perform directly; spawn nothing.

## Objective

Several audit findings claim fleet-wide TSDoc drift. They are instances of three convention questions. Settle each question fleet-wide so per-package rulings rest on one reading.

1. **First-sentence voice.** Findings claim every exported symbol's TSDoc first sentence must be third-person (`Creates...`, `Escapes...`) and that imperative openings (`Create...`, `Escape...`) are drift.
2. **Boolean `@returns` form.** A finding claims a boolean-returning guard's `@returns` must be written a specific way.
3. **`@example` import specifiers.** Findings claim public `@example` blocks must import from the published `@orkestrel/<name>` specifier, and that `@src/*` aliases in examples are drift because they ship into `dist/**/*.d.ts` unresolvable.

## Method

- Quote the exact operative sentences from `/home/user/scaffold/.claude/rules/typescript.md` (Comments / API documentation section) and `/home/user/scaffold/.claude/rules/documentation.md`. The precise wording decides; do not paraphrase.
- Sample broadly: at least 12 packages under `/home/user/fleet/<pkg>/src/`, plus `/home/user/scaffold/src/` itself (the canon repository). For each convention, count conforming vs non-conforming exported symbols per package (grep is fine; verify a few hits by reading).
- Check what ships: pick two packages and confirm whether `@example` blocks and their specifiers appear in `dist/**/*.d.ts`.
- Check history: did any commit deliberately move a package from one voice to the other?

## Output

Return through the structured-output tool: for each of the three questions - `question`, `rule_quote` (verbatim), `fleet_reading` (what the sample shows, with per-package tallies as a compact string), `ruling` (`DRIFT` when the rule genuinely bans the flagged form / `EXCEPTION` when the fleet form is the deliberate convention and the rule permits or defers / `INVALID` when the findings misread the rule), `confidence`, `evidence` (array of `path:line - fact`).

## Constraints

Read-only. Never edit, never run mutating commands.
