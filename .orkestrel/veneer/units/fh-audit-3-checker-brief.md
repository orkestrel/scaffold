# Audit round 3 — FRAME-HELPERS (`fh`): checker

## Role and engine

`checker` on Sonnet, the round's only lane. The objective and subjective lanes are not run this round, by the user's
instruction to put implementation first, because the round renames bindings in test files and rewrites two sentences,
adding no frame and no behavior.

## Objective

Verdicts on the round-2 verdict's findings N3 and W3 (`/home/user/scaffold/.orkestrel/veneer/units/fh-audit-2-verdict.md`),
by reading alone:

1. **N3.** Every focus reading in `tests/setupBrowser.test.ts` and in the `focus` TSDoc example in
   `tests/setupBrowser.ts` is bound as `focusReading`, none shadows another, the lifted element is `specimen`, and the
   detached copy is `copied`. Each split proof keeps the assertions its unsplit original made.
2. **W3.** The page-strip comment names the Page 1 link and its relation to the previous-page arrow without naming an
   item by position, and the `FocusOptions.worn` documentation writes the `worn` token with its noun.
3. **Scope and gates.** The status lists only the six files round 1 owned; round 3's changes sit in its three owned
   files; each gate log ends with exit 0.

## Context

Evidence under `/home/user/scaffold/.orkestrel/veneer/units/`: `fh-3.diff` (the whole change over `5afa37b`),
`fh-3-status.txt`, `b-frame-helpers-report-3.md`, the `fh3-*` logs under `fh-instruments/`, round 2's `fh-2.diff`, and
the round-2 verdicts `fh-audit-2-verdict.md` and `fh-audit-2-objective-verdict.md` (which name each site by line). The
worktree `/home/user/veneer-fh` holds the files; read them, never edit them. Law: `/home/user/scaffold/AGENTS.md`,
`/home/user/scaffold/.claude/rules/{names,tests,writing}.md`. Execution: a native subagent, clean context; perform the
assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Output

The `orkestrel-falsify` verdict shape and nothing else: per-item verdicts (CONFIRMED, BROKEN, UNRESOLVED, or
NOT-EVIDENCED) with `file:line`, findings outside the items to the BROKEN standard, and one terminal line
`VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
