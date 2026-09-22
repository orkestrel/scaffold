# CL9 audit round 2 — objective lane brief

## Role and engine

`reviewer` on native Opus 5, clean context. Astra wrote the unit and its fix, so you hold the
OBJECTIVE lane and the Astra analyst holds the subjective lane. Read the work as work you did not
write. Perform the assignment directly and spawn nothing. You edit nothing and run nothing.

## Objective

Rule on every claim of `C:/Users/mikes/WebstormProjects/scaffold/tmp/audit/cl9-audit-claims-2.md`
with CONFIRMED, REFUTED, or UNDECIDABLE and the deciding evidence, add any extra finding that is an
implementation defect (numbered after the last claim, with a site and a one-line failure scenario,
distinguishing one that forces a fix round from one that does not), and end with one terminal line:
`Verdict: accept`, or `Verdict: fix round` with the claims that force it.

## Two standing instructions about your own evidence

**Every `file:line` you cite must exist in the file you name.** Confirm the file is long enough and
that the line says what you claim.

**In round 1 this lane confirmed two claims the other lane refuted, and the other lane was right on
both.** Both times the difference was the same: the other lane either executed the thing or asked
what an assertion can *discriminate*, while this lane reasoned from the code's structure. Structural
reasoning is also what caught the third forcing finding, which the other lane missed — so this is not
a reason to defer. It is a reason, before confirming any claim about a proof, to ask explicitly:
**what mutation would make this assertion fail, and would the assertion actually distinguish it from
the passing case?** Write that answer into your evidence rather than describing what the code does.

## Evidence

The Orchestrator rendered the diff over the CL8b landing `8c70787` at
`C:/Users/mikes/WebstormProjects/scaffold/tmp/audit/cl9-diff-2.patch` and the status at
`tmp/audit/cl9-status-2.txt`; round 1's diff is at `tmp/audit/cl9-diff.patch`.

Read those and these files in the live Veneer tree at `C:/Users/mikes/WebstormProjects/veneer`:

- `tests/setupStyles.ts` — `normalizeComplexSelector` with the corrected guard and its neighbour, and
  `walkSelector`, which supplies the literal flag both guards read
- `tests/setupStyles.test.ts` — the presence-scanner regression case, the freeze assertions, and the
  collector's cases
- `tests/src/styles/components/table.test.ts` — the corrected accent case and the state releases
- `src/styles/components/_table.scss` — the role loop and its import
- `src/styles/_tokens.scss` — the two role lists the token module carries
- `tests/setupConformance.ts` — `scanCompatibilityPresence` and `readCompatibility`, which the
  regression case drives, read as machinery the unit cannot edit
- the built `dist/src/styles/index.css` and `tests/fixtures/oracle/inventory.json`

Read the retained records under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/`: the
effective brief `units/cl9-brief-2.md` with `units/cl9-brief.md` beneath it, the fix report
`units/cl9-report-2.md`, the terrain record `units/cl9-terrain.md`, and `cl9-audit-verdict.md` for
round 1, whose rulings carry unchanged.

**The law lives in the scaffold checkout**, under
`C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`.

## Where to push hardest

**Whether the regression case proves what it claims.** Claim 2 asks whether driving the real presence
scanner with a constructed inventory is a sound proof of the shared behaviour, or whether it only
exercises the normalizer under another name. Rule that, and say what the case would catch that a
direct normalizer assertion would not.

**Whether the corrected accent case catches the original defect.** Claim 4's control replaced the
final fallback with a literal. The defect round 1 found was subtler: an assertion that could not tell
a chain reading the accent from one ignoring it. Rule whether the corrected case would fail if the
chain stopped reading the accent variable at all — not only under the literal substitution.

**The role-list choice.** Claim 5: the token module carries two lists, and only one matches the
record. Rule what the comparison would do under the other, and whether anything in the tree would
catch the wrong choice.

## Scope of judgment

Implementation only. Report no wording or prose finding. The guide's rows stay in scope as a contract,
judged on their facts being true of the code.

## Output

The claim table (`Claim | Verdict | Evidence`), the extra findings, one terminal line. No process
diary.
