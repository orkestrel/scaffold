# U6 audit round 1 — checker brief (native Sonnet)

Retained after the fact on 2026-09-20: this is the dispatch text as sent through the harness's
Agent tool, written to disk on the Orchestrator's own retention audit. The lane's report is
`u6-audit-checker-report.md`; the claims file is `../u6-audit-claims.md`.

---

Role `checker` on native Sonnet (clean context). You produce mechanical conformance evidence for
unit U6 of the Veneer campaign, which GPT Astra wrote in the Test checkout
`C:/Users/mikes/WebstormProjects/test` (HEAD `f49bc7f` plus the uncommitted U6 diff). Perform the
assignment directly and spawn nothing. You edit nothing; you have no write tools.

Read first: `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md` and
`C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/documentation.md`, `tests.md`, `writing.md`.
Then the claims file `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u6-audit-claims.md` and the
diff `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u6-diff.patch.txt`.

Check mechanically, reading the live files, and report each with the exact evidence:

A. Claim 1: `MediaOptions` in `src/browser/types.ts` has exactly `print?` and `motion?`, both
   `readonly boolean`, each with a TSDoc description; `POINTER_HOLD` in `src/browser/constants.ts`
   equals `'data-pointer-hold'` and sits after `IMPLICIT_ROLES` (state the constant names before
   and after it); `src/browser/index.ts` exports both (quote the barrel lines that carry them).
B. Claim 10: in `guides/test.md`, list the `Surface` row for each of `MediaOptions`, `POINTER_HOLD`,
   `sendProtocol`, `hoverAccessible`, `holdAccessible`, `releasePointer`, `stageMedia`,
   `releaseMedia` (quote each row); for each, compare the `Summary` cell with the TSDoc description
   paragraph in the source and state equal or not, quoting both when they differ; quote the
   `readStyle` and `readPixels` signature cells; list each `Voices` row added and compare its
   sentence with the `throw new Error(...)` text in `src/browser/helpers.ts` (equal or not); list
   the `Limits` rows added; list the `Bounds` bullets added; list the Patterns headings added and,
   for each, the `ROUTED_FENCES` entry in `tests/setup.ts` and the test case in
   `tests/src/browser/helpers.test.ts` that transcribes it (quote the `it(` line).
C. Claim 9: for each of `PLANT-SCALE`, `PLANT-PSEUDO`, `PLANT-RELEASE`, quote the red assertion
   line from the matching `u6-plant-*-red.log` (UTF-16 transcript; read as text) and
   confirm `grep -n "PLANT-" tests/src/browser/helpers.test.ts src/browser/helpers.ts` returns
   nothing.
D. Claim 11: run the search the report describes over
   `C:/Users/mikes/WebstormProjects/veneer/node_modules/@orkestrel/scaffold/dist/host/guides/*.md`
   for each new public name and report the hit count per name.
E. Claim 12: from the diff, list every file changed and confirm the set is exactly
   `guides/test.md`, `src/browser/constants.ts`, `src/browser/helpers.ts`, `src/browser/types.ts`,
   `tests/setup.ts`, `tests/src/browser/helpers.test.ts`; confirm the `tests/setup.ts` hunk touches
   only `ROUTED_FENCES` entries; search the diff's added lines for ` as ` (excluding `as const`),
   `!.`, `!)`, `: any`, `@ts-`, `eslint-disable`, and report every hit with its line.
F. Writing sweep: search the added lines of `guides/test.md` and the added TSDoc in
   `src/browser/helpers.ts` for the banned terms in `.claude/rules/writing.md` § Substitutions
   (`should`, `simply`, `easy`, `just`, `currently`, `utilize`, `leverage`, `via`, `in order to`,
   `e.g.`, `i.e.`, `etc.`, `performant`, `robust`, `allows you to`, `and/or`, `please`)
   case-insensitively and report each hit with its line, ruling the sense-dependent rows (`now`,
   `new`, `once`, `since`, `above`, `below`) yourself.

Output: one section per check A to F with the evidence quoted, each ending in `PASS` or `FAIL`
with the reason; no process diary; no verdict beyond those readings.
