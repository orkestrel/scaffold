# CL9 audit round 2 — mechanical lane brief

## Role and engine

`checker` on native Sonnet, clean context, read-only (no write tools, no shell edits). Perform the
assignment directly and spawn nothing.

## Objective

Rule on every claim marked `[mechanical]` in
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/cl9-audit-claims-2.md` with CONFIRMED, REFUTED,
or UNDECIDABLE and `file:line` evidence, run the probes below, add any extra finding that is an
implementation defect (numbered after the last claim), and end with one terminal line:
`Verdict: accept` or `Verdict: fix round` with the claims that force it.

**Every `file:line` you cite must exist in the file you name.** Confirm the file is long enough to
have the line and that the line says what you claim.

**A verifier lane runs the gate chain in this same round, blind to you.** Rule the gate half on the
evidence you have and say plainly that the independent run is not in your slice.

## Evidence

The rendered diff at `cl9-diff-2.patch.txt`, round 1's at `cl9-diff.patch.txt`, and the
statuses `tmp/audit/cl9-status-2.txt` and `tmp/audit/cl9-status.txt`, all under
`C:/Users/mikes/WebstormProjects/scaffold/`; the live Veneer tree at
`C:/Users/mikes/WebstormProjects/veneer`, including `tests/setupStyles.ts`,
`tests/setupStyles.test.ts`, `tests/src/styles/components/table.test.ts`,
`src/styles/components/_table.scss`, `src/styles/_tokens.scss`, `tests/setupConformance.ts` as
read-only reference, and the built `dist/src/styles/index.css`; and the retained briefs and both
reports under `.orkestrel/veneer/units/`, read only to learn what the unit claims. Rule on the tree.

## Probes

- **The status is identical** between the two rounds, path for path, with no addition and no removal.
- **The diff-to-diff delta.** Compare every file's blob hashes between the two diffs and name each
  that differs. `guides/veneer.md`, `tests/conformance.test.ts`, `tests/setupConformance.test.ts`,
  `src/styles/index.scss`, and the three application-barrel files must be byte-identical across the
  rounds — those are what round 1 accepted.
- **The two guards.** Quote the even-child branch and the legacy branch that follows it. Confirm both
  now test the preceding character and its literal flag. Name any other branch in that function that
  tests a preceding character without its flag.
- **The regression case.** Quote it. Confirm it calls the real `scanCompatibilityPresence` and the
  real `readCompatibility`, not a copy, and that the inventory it passes is constructed inline rather
  than read from the fixture.
- **The role loop.** Quote the partial's import and its loop. Name which of the token module's two
  role lists it uses, and name the members of each.
- **The freeze assertions.** Name every table the loop now covers and confirm it asserts each row as
  well as the container.
- **The state releases.** Name each case that applies a class or hovers, and confirm each releases
  what it applied.
- **Law sweep over the round's added lines**: no `any`, no assertion outside `as const`, no non-null
  assertion, no suppression comment, no `public`/`private`/`protected`, no parameter property, no
  default export, no skipped case, no case named for a control.

## Law

`AGENTS.md` at the Veneer checkout root, and the rule files under
`C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`: `styles.md`, `tests.md`,
`architecture.md`, `names.md`. Implementation only: report no prose finding.

## Output

The claim table, the probe readings, the extra findings, one terminal line. No process diary.
