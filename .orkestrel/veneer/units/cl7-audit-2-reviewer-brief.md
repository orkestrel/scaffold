# CL7 audit round 2 — objective lane brief

## Role and engine

`reviewer` on native Opus 5, clean context. Astra wrote the unit and its fix, so you hold the
OBJECTIVE lane (correctness under the shipped cascade and the pinned inventory, rule compliance,
test sufficiency, scope honesty) and the Astra analyst holds the subjective lane. Read the work
as work you did not write. Perform the assignment directly and spawn nothing. You edit nothing
and run nothing; you have no write tools and no shell.

## Objective

Rule on every claim of `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/cl7-audit-claims-2.md`
with CONFIRMED, REFUTED, or UNDECIDABLE and the deciding evidence (`file:line` or exact text),
add any extra finding that is an implementation defect (numbered after the last claim, with a
site and a one-line failure scenario, distinguishing one that forces a fix round from one that
does not), and end with one terminal line: `Verdict: accept`, or `Verdict: fix round` with the
claims that force it.

## Evidence

The Orchestrator rendered the diff over the CL6 landing `c8f53f8` at
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl7-diff-2.patch.txt` and the status at
`tmp/audit/cl7-status-2.txt`; round 1's diff is at `cl7-diff.patch.txt` for a diff-to-diff
reading.

Read those and these files in the live Veneer tree at
`C:/Users/mikes/WebstormProjects/veneer`, which are this round's subject:
`tests/setupStyles.test.ts` and `tests/setupStyles.ts` (the set assertion and the case tables),
`tests/src/styles/components/container.test.ts` (the proof the direction axis left),
`src/styles/_mixins.scss` (the ramp, and the plant's site),
`src/styles/components/_container.scss` (the loop the assertion protects),
`src/styles/_tokens.scss` and `src/core/constants.ts` (the container tokens and their leaves),
`tests/setupBrowser.ts` (the viewport visitor), and the built `dist/src/styles/index.css`.

Read the retained records under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/`:
the effective brief `units/cl7-brief-3.md` with `units/cl7-brief-2.md` and `units/cl7-brief.md`
beneath it; both reports `units/cl7-report.md` and `units/cl7-report-2.md`; and
`cl7-audit-verdict.md` for round 1, whose rulings carry unchanged and are not reopened.

**The law lives in the scaffold checkout**, not in the subject: `AGENTS.md` at the Veneer
checkout root redirects there, and the rule files are under
`C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/` — `styles.md`, `tests.md`,
`architecture.md`, and `names.md` in particular.

Rule on the diff and the live files, never on a report's word alone; a report-only claim is
recorded as report-only.

**Where to push hardest.** Two places, both about whether this round's work actually closes what
it claims. First, the set assertion: rule whether it reads the **real** ramp rather than a
restated copy, because an assertion over a restated list would pass while the ramp and the tokens
diverged, which is the exact defect it exists to prevent. Then rule whether it would catch the
finding's own failure scenario in **both** directions: a ramp member without a token, and a token
without a ramp member. Second, the removal: rule whether every reading the direction axis wrapped
is genuinely retained, by comparing the proof against round 1's copy in the earlier diff, and name
any assertion, variant, boundary visit, or override that the removal dropped along with the axis.

## Scope of judgment

Implementation only. Report no wording or prose finding. The guide's compatibility rows stay in
scope as a contract, judged on whether their facts are true of the code, never on their wording.

## Output

The claim table (`Claim | Verdict | Evidence`), the extra findings, one terminal line. No process
diary.
