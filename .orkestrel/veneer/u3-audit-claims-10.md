# U3 audit round 10 — numbered claims (both lanes and the checker)

Subject: the U3 working tree in `C:/Users/mikes/WebstormProjects/veneer` after brief 13
(`.orkestrel/veneer/units/u3-brief-13.md`, report `units/u3-report-11.md`), on top of the round-9
tree the verdict `u3-audit-verdict-9.md` ruled on. Native Sonnet (`builder`) wrote the unit, so
the `analyst` on Astra holds the OBJECTIVE lane and the `reviewer` on Opus the SUBJECTIVE lane;
neither engine wrote the work. This file alone fixes the claim numbers. The Orchestrator rendered
the diff over `b661142` including every added file at `units/u3-diff-10.patch.txt` and the status
at `tmp/audit/u3-status-10.txt`. Rule on every claim with `CONFIRMED`, `REFUTED`, or
`UNDECIDABLE` and the deciding evidence (`file:line` or exact text); read the rendered diff and
the live files, never the reports alone; execute a reading in memory where a claim names one.
Round 9 confirmed the guard's behaviour on every input and everything outside
`tests/setupStyles.test.ts`; brief 13 touched that file alone, so re-read other sites only where a
claim names them. Law: scaffold's `AGENTS.md`, `.claude/rules/tests.md`, `writing.md`, read from
`C:/Users/mikes/WebstormProjects/scaffold`.

1. **The six readings are cases.** `tests/setupStyles.test.ts` asserts, inside the `it` titled
   `reads a quoted parenthesis and an escaped combinator as the text they are rather than as
   grammar` (the block holding the `h1\+p` case brief 13 anchored on; the brief's own title for
   that block was wrong and the anchor line right), `matchesLooseTagPair('h1\2b p')` false and
   `matchesLooseTagPair('h1\2b  p')` (two spaces) true;
   inside the `it` titled `refuses a functional list wherever it is written, however it is spelled,
   and reads the same text quoted`, `:is(.title > h1)+p` and `:is(h1:has(p)) + p` each throw
   matching `/functional list/u` and `:not(h1) + p + span` reads true; and beside the existing
   `details summary\<TAB>` case, `details summary\<FF>` (a form feed after the backslash) reads
   true. Each expected value is the value the live `tests/setupStyles.ts` returns when executed.
2. **The proof ran red.** Report 11 records `npm run test:setup` failing on the planted
   `matchesLooseTagPair('h1\2b p')` `toBe(true)` with the assertion's message, and the same
   command green after the correction; the recorded green count equals the round-9 count for the
   `setup` project (the assertions sit inside existing `it` blocks, so no test is added).
3. **Nothing else moved.** `tests/setupStyles.ts` is byte-identical to its round-9 state (SHA-256
   `69db1f7fd677a2b11c2b47d4d412f1bbb8433a77fa5185f39199c264fa425625`); the diff over the round-9
   tree touches `tests/setupStyles.test.ts` alone and adds only assertion lines (no `it` title
   changed, the export inventory list unchanged); `tmp/audit/u3-status-10.txt` equals the round-9
   status row for row.
4. **Law over the added lines.** No `any`, non-null assertion, type assertion, `@ts-` directive,
   `eslint-disable`, or nested function; no line over 100 columns other than an `it` title; the
   added lines carry no prose.
5. **Gates (ruled by the Orchestrator from the retained verifier report).** The whole chain exits
   0 on managed Chromium; `test:src:styles`, `test:src`, and `test:setup:browser` exit 0 on Edge;
   `test:distribution` green; `scaffold audit` reports no planned path drifted, its non-zero exit
   being the pending `@orkestrel/scaffold` re-pin, with its dependency lines advisory.
