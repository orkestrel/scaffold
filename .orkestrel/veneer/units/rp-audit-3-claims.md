# RP audit, round 3 — claims

Subject: the RP round-3 change in `/home/user/veneer-rp` (uncommitted over Veneer `1ee0faf`), briefed by
`rp-repin-brief-3.md` and reported in `rp-report-3.md`. The diff is `rp-3.diff`, the status `rp-3-status.txt`, and the
logs `rp-instruments/rp3-*`. The round-2 reconciliation is `rp-audit-2-verdict.md`. Each claim is falsifiable; rule every
one.

1. **Scope and gates.** The status lists `guides/veneer.md`, `tests/app/browser/integration.test.ts`, `tests/setup.ts`,
   and `tests/setupBrowser.ts` and nothing else; the format, lint, and check logs each end on exit 0, and both scoped
   journey logs read one case passed.
2. **The given sentences.** Each of the four sites the brief's Execution section names carries the brief's sentences
   word for word, re-wrapped only, and no other prose changed between `rp-2.diff` and `rp-3.diff`.
3. **No behavior moved.** Between `rp-2.diff` and `rp-3.diff` no assertion, call, import, or identifier changed outside
   the case's title string and comments.
4. **The grep and census criteria.** The brief's acceptance grep finds nothing in the round-3 tree, and
   `git diff 1ee0faf -- tests/setup.ts` changes only the `CASCADE_KEYS` remarks.
5. **Prose law.** Every changed sentence follows `AGENTS.md` § Writing and `.claude/rules/writing.md`: no count, each
   code token followed by its noun, no banned term.
