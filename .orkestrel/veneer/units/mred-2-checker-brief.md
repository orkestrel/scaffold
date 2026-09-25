# E-ID-MOTION-REDUCED round 2 — checker read

## Role and engine

`checker` on Sonnet, a native Claude subagent, read-only. Perform the read directly and spawn nothing. Read
`/home/user/scaffold/AGENTS.md` and `/home/user/scaffold/.claude/rules/{styles,tests,writing}.md`. No skill applies.

## Objective

Rule whether round 2 applied Items 1 to 6 of `/home/user/scaffold/.orkestrel/veneer/units/e-id-motion-reduced-brief-2.md`
exactly, and nothing else.

## Evidence

All under `/home/user/scaffold/.orkestrel/veneer/units/`: the brief `e-id-motion-reduced-brief-2.md`; the report
`e-id-motion-reduced-report-2.md`; the round-2 diff `mred-2.diff` (`git diff 21c821a` in `/home/user/veneer-mred`, both
rounds) and `mred-2-status.txt`; the round-1 diff `mred.diff`; and the logs under `mred-instruments/r2/`. The worktree
`/home/user/veneer-mred` holds the change uncommitted; read its files and never edit them.

## Claims

1. **Items 1 to 3.** Each replacement in `guides/veneer.md` reads exactly as the Item gives it, and the § Keyframes table
   differs from round 1 only in the `spinner-grow` row's text and oxfmt's padding.
2. **Item 4.** The two comment lines in `src/styles/components/_spinner.scss` read exactly as the Item gives them, at the
   same indentation, and nothing else in that file differs from round 1.
3. **Item 5.** The three titles read exactly as the Item gives them in `tests/src/styles/components/spinner.test.ts` and
   `tests/src/styles/components/placeholder.test.ts`.
4. **Item 6.** `expect(readText(spinner)).toBe('Loading...')` and the `readText` import are gone, nothing else in the
   file reads `readText`, and `mred-2-plant-label.log.txt` shows the grow cases failing at
   `expect(isRendered(label)).toBe(true)` with an `AssertionError`; the report states a byte-identical restore and a
   green re-run in `mred-2-vitest.log.txt`.
5. **Scope.** Between `mred.diff` and `mred-2.diff`, only the Items' sites change, and `mred-2-status.txt` names only
   `guides/veneer.md`, `src/styles/components/_placeholder.scss`, `src/styles/components/_spinner.scss`, and the two test
   files.
6. **Gates.** The logs under `mred-instruments/r2/` read exit 0 for the styles builds, the spinner and placeholder run,
   `npm run check`, `npm run lint:check`, the oxfmt check, `npm run test:conformance`, `npm run test:guides`, and
   `npm run test:policy`.

## Output

A numbered verdict per claim (CONFIRMED, BROKEN, or NOT-EVIDENCED) with the `file:line` or log line behind it, findings
outside the claims to the same standard, and one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>`.
