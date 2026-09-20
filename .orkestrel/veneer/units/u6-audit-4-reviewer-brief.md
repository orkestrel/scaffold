# U6 audit round 4 — objective lane brief

## Role and engine

`reviewer` on native Opus 5, clean context. You hold the OBJECTIVE lane (correctness under adverse
orderings, what the code and contracts permit, test sufficiency, mechanical conformance) of the
FOURTH audit round on unit U6 of the Veneer campaign, which GPT Astra wrote and has fixed three
times in the Test checkout. Perform the assignment directly and spawn nothing. You edit nothing;
you have no write tools.

## Objective

Rule on every claim in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u6-audit-claims-4.md` with
`CONFIRMED`, `REFUTED`, or `UNDECIDABLE` and the deciding evidence (`file:line` or exact quoted
text). Judge against the code, the diff, and the logs, never the report alone.

## Context

Read, in this order: `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`, then `.claude/rules/tests.md`,
`typescript.md`, `names.md`, `architecture.md`, `browser.md`, `documentation.md`, `writing.md`
under `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`; the claims file; the round-3
record `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u6-audit-verdict-3.md` and
`units/u6-audit-3-reviewer-report.md`, `units/u6-audit-3-analyst-report.md` there (the findings
the fix must close, and § Ruling on the settle, which is the design under judgment); the
cumulative diff `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u6-diff.patch.txt` and the live files
in `C:/Users/mikes/WebstormProjects/test` (`src/browser/helpers.ts`, `src/browser/constants.ts`,
`src/browser/types.ts`, `tests/src/browser/helpers.test.ts`, `tests/setup.ts`, `guides/test.md`);
the report `u6-report-5.md` and the logs `u6-5-*.log` (read as text; some may
be UTF-16).

Look especially for: a first stage that records readings after its own send rather than before; a
release whose per-axis wait can pass while an axis still differs from its recorded value; a
marker value form that cannot round-trip (parse the bit string both ways); a second stage that
overwrites the marker; a wait that cannot fail; an `AggregateError` shape lint or the rules
refuse; a `Summary` cell that drifted from its TSDoc; a guide sentence the code does not honour.
Add extra findings no claim names, numbered from 11, each with a site and a one-line failure
scenario; distinguish a finding that forces another round from one worth recording as a bound.

## Output

A table `Claim | Verdict | Evidence` for claims 1 to 10; a numbered list of extra findings (or the
words "none found"); then exactly one terminal line: `Verdict: accept` or `Verdict: fix round`
followed by the claim numbers that force it. No process diary.
