# Verdict — RAMP-DOWN (`rd`) round 2, claims 1, 4, 5

## Numbered verdicts

**Claim 1 — Scope and delta: BROKEN**

The claim asserts `rd-2-status.txt` "lists round 1's owned paths and nothing else." It does not.

- Round 1's owned paths (`/home/user/scaffold/.orkestrel/veneer/units/rd-status.txt:1-5`): `src/styles/_mixins.scss`, `src/styles/components/_modal.scss`, `src/styles/components/_table.scss`, `tests/src/styles/fixtures/mixins.scss`, `tests/src/styles/mixins.test.ts`.
- `rd-2-status.txt:1-6` lists those five plus `src/styles/components/_offcanvas.scss` — a sixth path round 1's status did not carry. The claim's first clause is falsified by this file pair directly; no mutation is needed to break a static file-listing comparison.

The remainder of the claim holds on the evidence read: comparing `rd-2.diff` against round 1's `rd.diff`, the hunks touching `_modal.scss` (hash `3b9a6a0`), `_table.scss` (hash `4778322`), and `fixtures/mixins.scss` (hash `64f6cfb`) are byte-identical between the two diffs, so the round-2 delta against round 1 is confined to `_mixins.scss` (comment-only — the `@mixin`/`@each`/`@if`/`@content` statements at `rd-2.diff:17-26` are unchanged from `rd.diff:16-25`), `_offcanvas.scss` (comment-only, `rd-2.diff:126-133`), and `mixins.test.ts`. The byte-equality sub-claim is confirmed: `rd-instruments/rd-gates-2.log.txt:5` — `[cmp] cmp tmp/units/rd-base.css dist/src/styles/index.css -> exit 0`; the mutation that would falsify it is any change to the built stylesheet's bytes, and the `cmp` exit code distinguishes that mutation from the passing case directly. But because the claim's own first clause is false, the claim as a whole is BROKEN.

**Claim 4 — R-c: the guide gate: CONFIRMED**

`rd-instruments/rd-guides-2.log.txt:1` names how the copy was built: "scratch copy `/home/user/veneer-rd/tmp/probe/rd-guides-copy` (the worktree's tracked files at their working-tree bytes, node_modules linked), with `tmp/units/rd-shared.patch` applied through `patch -p1`." Line 20 records `# exit 0` for `npm run test:guides` (line 5 names the command, lines 15-16 show `1 passed (1)` / `19 passed (19)`). The mutation that would break this claim is the log recording a nonzero exit or an unpatched guide root; the header at line 1 plus the exit line at line 20 together exclude that reading.

**Claim 5 — Law and report: CONFIRMED**

- No `any`, `as` (beyond none present), `!`, suppression comment, or nested function declaration was added: `rg` over `rd-2.diff` for `\bany\b|\bas \b|@ts-|eslint-disable|function\s*\(` returns only prose ("...as the unsuffixed...") at `rd-2.diff:12`, no code hits.
- The added callbacks in `rd-2.diff:194-282` (`.map`, `.flatMap`, `.find`, and the `it(...)` callback itself) are anonymous functions passed directly as arguments — the permitted exception — including the async callback at `rd-2.diff:194` (`it('walks the ramp down...', async () => { ... })`).
- The report `b-modal-rd-report-2.md` states no temporal word: a search for `still|no longer|currently|now|new|latest` over the file returns no matches.
- The report states no tally: every digit in the file is either an exit code, a version (`npm 11`), a quoted log result line (for example `b-modal-rd-report-2.md:66,73,77,137,151-158`), or code/log content quoted verbatim (for example `b-modal-rd-report-2.md:53,68,75`) — none is a count the report itself asserts.
- Every gate's result line in the table (`b-modal-rd-report-2.md:150-158`) is copied from the corresponding `rd-gate-*-2.log.txt` file per the report's own framing at line 146; I did not re-open each `rd-gate-*-2.log.txt` to byte-verify every cell, so treat that sub-clause as sampled rather than exhaustively re-run — the one line independently checked (`cmp`, exit 0, report line 155) matches `rd-gates-2.log.txt:5`.
- Code-token-followed-by-noun: sampled usages ("`rd-shared.patch` file", "`patch -p1` command", "`cmp` command", "`git diff --check` command") all follow the rule; no counterexample found in the file.

Counts the report states, listed for the record: **none** — every numeral in `b-modal-rd-report-2.md` is an exit code, a version number, or verbatim-quoted log/code content, not a count the report asserts on its own account.

## Findings fitting no claim

None substantiated.

## Attacked and held

- Claim 1's byte-equality and no-Sass-statement-change sub-clauses: attacked by comparing the round-1 and round-2 `_mixins.scss`/`_offcanvas.scss` hunks statement-by-statement and by reading the `cmp` gate line; held.
- Claim 5's law sub-clauses: attacked by pattern search across the full round-2 diff rather than a sample of compliant lines; held.

## VERDICT: FAIL 1; outside the claims: none