# CL8 audit round 2 — objective lane brief

## Role and engine

`reviewer` on native Opus 5, clean context. Astra wrote the unit and its fix, so you hold the
OBJECTIVE lane (correctness under the shipped cascade and the pinned inventory, rule compliance,
test sufficiency, scope honesty) and the Astra analyst holds the subjective lane. Read the work as
work you did not write. Perform the assignment directly and spawn nothing. You edit nothing and run
nothing; you have no write tools and no shell.

## Objective

Rule on every claim of `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/cl8-audit-claims-2.md`
with CONFIRMED, REFUTED, or UNDECIDABLE and the deciding evidence (`file:line` or exact text), add
any extra finding that is an implementation defect (numbered after the last claim, with a site and a
one-line failure scenario, distinguishing one that forces a fix round from one that does not), and
end with one terminal line: `Verdict: accept`, or `Verdict: fix round` with the claims that force
it.

## Evidence

The Orchestrator rendered the diff over the CL7 landing `a9172df` at
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl8-diff-2.patch.txt` and the status at
`tmp/audit/cl8-status-2.txt`; round 1's diff is at `cl8-diff.patch.txt` for a diff-to-diff
reading.

Read those and these files in the live Veneer tree at `C:/Users/mikes/WebstormProjects/veneer`,
which are this round's subject:

- `tests/setupStyles.test.ts` and `tests/setupStyles.ts` — the retained emitted-vocabulary
  assertion, its exported collector, the literal reading rows, the zero-boundary binding, and the
  extracted ramp compilation
- `tests/src/styles/components/grid.test.ts` — the browser consumer the zero-boundary fix touched
- `tests/app/browser/sections/LayoutSection.test.ts` — the showcase assertion's discriminator
- `tests/setupConformance.ts` — `readBuiltCascade`, `readDeferrals`, `normalizeComplexSelector`, and
  `scanStyleBlocks`, read as the machinery the new proof reuses and must not duplicate, never as a
  file the unit could change
- `src/styles/components/_grid.scss` and the built `dist/src/styles/index.css` — the emitted
  vocabulary the assertion reads
- `tests/fixtures/oracle/inventory.json` and `guides/veneer.md` — the record and the deferral rows
  the assertion's expected operand is built from

Read the retained records under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/`: the
effective brief `units/cl8-brief-4.md` with briefs 3, 2, and 1 beneath it; the fix report
`units/cl8-report-4.md`; and `cl8-audit-verdict.md` for round 1, whose rulings carry unchanged and
are not reopened.

**The law lives in the scaffold checkout**, not in the subject: `AGENTS.md` at the Veneer checkout
root redirects there, and the rule files are under
`C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/` — `tests.md`, `styles.md`,
`architecture.md`, and `names.md` in particular.

Rule on the diff and the live files, never on a report's word alone; a report-only claim is recorded
as report-only.

## Where to push hardest

**Whether the new proof can go stale.** It reads the built cascade, and the project it runs in does
not build. Rule what happens when the artifact is stale rather than absent — a missing file throws,
but a stale one reads old bytes — and whether that makes the assertion weaker than the gate it
replaces. Say whether this is the established pattern in this tree or something this round
introduced, by reading how the conformance proof reads the same artifact.

**Whether the controls prove what they claim.** The plants are in the built artifact, not the
source. The failure round 1 named was a source change emitting an extra selector. Rule whether the
built-artifact plant plus round 1's own in-memory source attack together close the chain, or whether
a link is still unproved.

**Whether the zero-boundary binding catches its named failure.** Finding 3 said a second
zero-boundary entry would go unread. Rule whether the new comparison would catch that, and whether
the two consumers now identify the row the same way.

## Scope of judgment

Implementation only. Report no wording or prose finding. The guide's compatibility and deferral rows
stay in scope as a contract, judged on whether their facts are true of the code.

## Output

The claim table (`Claim | Verdict | Evidence`), the extra findings, one terminal line. No process
diary.
