# Audit lane — `checker` on Sonnet, mechanical conformance, F7b CAPTION-SPECIMEN (`f7b`)

`checker` on Sonnet (native subagent, clean context, read-only). F7b ran on `builder` from a fully specified brief (`units/f7b-caption-specimen-brief.md`), so you are the round's only lane. Rule on these claims by reading alone, citing `file:line`:

1. **Delta and scope.** `units/f7b.diff` (the worktree `/home/user/veneer-f7b` against `a4654a8`) changes only `app/browser/constants.ts` and `tests/app/browser/sections/TableSection.test.ts`; `units/f7b-status.txt` lists the same two files and no other.
2. **The specimen (criterion 1).** `TABLE_SPECIMENS` in `app/browser/constants.ts` carries `{ name: 'Caption at bottom', classes: 'caption-bottom' }` directly after the `Caption at top` row, and the diff changes nothing else in that file; the markup template puts the class on the `<table>` element (read the template) so the caption inherits `caption-side`.
3. **The proof (criterion 2).** The section proof's name literal carries `'Caption at bottom'` directly after `'Caption at top'` and its class literal carries `'caption-bottom'` directly after `'caption-top'`; the diff changes nothing else in the file.
4. **Shared files.** The report's grep over `guides/veneer.md`, `tests/setup.ts`, `tests/app/browser/integration.test.ts`, and `ROADMAP.md` for `Caption at top` and `caption-top` is recorded; confirm by your own grep under `/home/user/veneer-f7b` that no enumeration of the table specimens sits in those files (a `caption-top` hit inside a Tailwind `@source` fence or a ledger row is not an enumeration of specimens).
5. **Law and report.** The delta adds no prose beyond the two literals and the row; the report `units/f7b-caption-specimen-report.md` records each criterion's command and result line (criteria 3 and 4: the format, lint, and type checks, and `npm run test:app`) and states no count.

The evidence is `units/f7b.diff`, `units/f7b-status.txt`, the brief, and the report under `/home/user/scaffold/.orkestrel/veneer/units/`. Law: `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/{writing,browser,tests}.md`. Edit nothing, run nothing, spawn nothing. Use absolute paths.

Output: the `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts with `file:line`, findings outside the claims to the BROKEN standard, and one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
