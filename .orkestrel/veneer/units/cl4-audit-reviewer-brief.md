# CL4 audit — objective lane brief

## Role and engine

`reviewer` on native Opus 5, clean context. Astra wrote the unit under audit, so you hold the
OBJECTIVE lane (correctness under the shipped cascade and the pinned inventory: whether every
selector the `reboot` row claims is genuinely present or genuinely excluded, whether the
canonicalization can mask an absence, whether each partial's values match what the claims say
they bind, whether the scoped conformance cases still prove what they proved, test sufficiency,
mechanical conformance), and Astra holds the subjective lane on another engine. Read the work as
work you did not write. Perform the assignment directly and spawn nothing. You edit nothing and
run nothing; you have no write tools and no shell.

## Objective

Rule on every claim of `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/cl4-audit-claims.md`
with CONFIRMED, REFUTED, or UNDECIDABLE and the deciding evidence (`file:line` or exact text),
add any extra finding that is an implementation defect (numbered after the last claim, with a
site and a one-line failure scenario, distinguishing one that forces a fix round from one that
does not), and end with one terminal line: `Verdict: accept`, or `Verdict: fix round` with the
claims that force it.

## Evidence

The Orchestrator rendered the diff over the Veneer checkout's CL3b landing `d822d59` at
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl4-diff.patch.txt` (tracked changes plus a
no-index rendering of every new file) and the status at `tmp/audit/cl4-status.txt`; read those
and the live Veneer tree at `C:/Users/mikes/WebstormProjects/veneer`, including the built
`dist/src/styles/index.css`, the pinned `tests/fixtures/oracle/inventory.json`, and
`node_modules/bootstrap/scss/_reboot.scss`. Read the retained records under
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/`: `units/cl4-brief.md` and
`units/cl4-brief-2.md`, the Orchestrator's rulings `units/cl4-brief-3.md` to `units/cl4-brief-6.md`,
the completion report `units/cl4-report-5.md` and the four stop reports `units/cl4-report.md` to
`units/cl4-report-4.md`, `units/cl4-scope-read-report.md`, `units/cl4-scout-report.md` (the
terrain map), `content-layout-design-verdict.md`, `research/calibration-content.md`, and the law
under that checkout (`AGENTS.md`, `.claude/rules/styles.md`, `tests.md`, `architecture.md`,
`names.md`, `application.md`, `documentation.md`). Rule on the diff and the live files, never on
a report's word alone; a report-only claim is recorded as report-only.

**This unit took four deviation stops and three Orchestrator rulings, so give the rulings
themselves the hardest reading.** Each granted something the briefs had put off-limits: a
canonicalization inside the conformance normalizer, an exclusion for a selector the build drops,
and the scoping of the ledger-population cases. For each, rule whether what landed stays inside
what was granted, and whether it closes the gap honestly rather than making a proof easier to
pass. The canonicalization is the one to attack hardest: if it can make the scan report present a
selector the cascade ships in no spelling, claim 5 is refuted whatever its cases say.

## Scope of judgment

The user has ruled that audits cover implementation only: correctness, rule compliance, test
sufficiency, scope honesty. Report no wording, comment, doc-block, or guide-prose finding; a
guide row is judged only on its facts being true of the code.

## Output

The claim table (`Claim | Verdict | Evidence`), the extra findings, one terminal line. No
process diary.
