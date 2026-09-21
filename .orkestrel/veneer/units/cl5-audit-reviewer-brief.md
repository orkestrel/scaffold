# CL5 audit — subjective lane brief

## Role and engine

`reviewer` on native Opus 5, clean context. Opus wrote this unit, so you hold the SUBJECTIVE lane
(shape, naming, ergonomics, design fit: how the four partials divide the keys and order their
rules, how the two sections divide the medium, the names of every new file, case table, and
specimen, whether each proof's cases read as one coherent subject, and whether the guide rows sit
where a reader looks for them) and the Astra analyst holds the OBJECTIVE lane on another engine.
Read the work as work you did not write. Perform the assignment directly and spawn nothing. You
edit nothing and run nothing; you have no write tools and no shell.

## Objective

Rule on every claim of `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/cl5-audit-claims.md`
with CONFIRMED, REFUTED, or UNDECIDABLE and the deciding evidence (`file:line` or exact text),
add any extra finding that is an implementation defect (numbered after the last claim, with a
site and a one-line failure scenario, distinguishing one that forces a fix round from one that
does not), and end with one terminal line: `Verdict: accept`, or `Verdict: fix round` with the
claims that force it.

## Evidence

The Orchestrator rendered the diff over the Veneer checkout's CL4b landing `5240e36` at
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl5-diff.patch.txt` (tracked changes plus a
no-index rendering of every new file) and the status at `tmp/audit/cl5-status.txt`. Read those
and the live Veneer tree at `C:/Users/mikes/WebstormProjects/veneer`, including the four new
partials, `src/styles/index.scss`, `src/styles/_tokens.scss`, `src/styles/_mixins.scss`,
`src/styles/elements/_heading.scss`, `_img.scss`, `_mark.scss`, `_figure.scss`, the built
`dist/src/styles/index.css`, the pinned `tests/fixtures/oracle/inventory.json`, the new proofs
under `tests/src/styles/components/`, the section files and their proofs, and `guides/veneer.md`.
Read `node_modules/bootstrap/scss/_type.scss` and `_images.scss` in that checkout for what
Bootstrap's own lines say. Read the retained records under
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/`: the effective briefs
`units/cl5-brief.md` and `units/cl5-brief-2.md`, the report `units/cl5-report.md`, the terrain
map `units/cl5-scout-report.md`, the scope read `units/cl5-scope-read-report.md`,
`research/calibration-content.md`, and the law under the Veneer checkout (`AGENTS.md`,
`.claude/rules/styles.md`, `tests.md`, `architecture.md`, `names.md`, `application.md`,
`browser.md`, `documentation.md`). Rule on the diff and the live files, never on the report's
word alone; a report-only claim (a measurement the unit took, a red-then-green run) is recorded
as report-only.

**Where to push hardest.** Three places. First, the heading twin ruling: the unit extended it
from the size to the tag's whole block, which is a judgment its brief did not spell out, so rule
whether the extension follows from the brief's own reason or exceeds it, and whether the guide
row describes what actually ships. Second, the section shape: three sections now exist that the
unit's own report says differ only in the copy and table they read, so rule whether the two new
ones are shaped as a reader would expect and whether the duplication is a defect this unit should
have closed or one its scope genuinely barred. Third, the unit's four carried findings at the end
of its report: rule each as real or not, because a finding the unit invented protects it from a
finding a lane would otherwise raise.

## Scope of judgment

The user has ruled that audits cover implementation only: correctness, rule compliance, test
sufficiency, scope honesty. Report no wording, comment, doc-block, or guide-prose finding; a
guide row is judged only on its facts being true of the code.

## Output

The claim table (`Claim | Verdict | Evidence`), the extra findings, one terminal line. No process
diary.
