# CL8 scope read — check the brief before it is dispatched

## Role and engine

`checker` on native Sonnet, clean context, read-only (no write tools). Perform the assignment
directly and spawn nothing.

## Objective

Rule on whether `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl8-brief.md` can be dispatched
as written. Report every defect that would stop, misdirect, or under-scope the unit, each with a
`file:line` site and the correction it needs. End with one terminal line: `Dispatch: go`, or
`Dispatch: fix` naming the defects that force it.

This is a pre-dispatch check of a brief, not a review of code. The unit has not run.

## The subject

The brief at `cl8-brief.md`, against the live Veneer checkout at
`C:/Users/mikes/WebstormProjects/veneer`, which sits clean at commit `a9172df`.

Supporting records, for what the brief inherits rather than for its correctness:
`.orkestrel/veneer/units/cl8-scout-report.md` (terrain, which the brief supersedes where they
differ), `.orkestrel/veneer/cl7-audit-verdict.md` (the findings the brief carries), and
`.orkestrel/veneer/units/cl7-brief.md` with `src/styles/components/_container.scss` and
`tests/src/styles/components/container.test.ts` (the pattern the brief tells the unit to follow).

The law lives in the scaffold checkout: `AGENTS.md` at the Veneer root redirects there, and the
rule files are under `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/` — `styles.md`,
`tests.md`, `architecture.md`, and `names.md` in particular. The dispatch contract is
`.agents/orchestration.md` § Dispatch anatomy, whose "Check the brief before you send it"
checklist is what this lane applies.

## What to check

1. **Every path the brief names resolves** from the Veneer checkout root, or is marked new. Name
   any that does not.
2. **Every factual claim the brief states is true of the tree.** The brief states measured facts
   about the pinned inventory: which families sit under `components.row`, `components.col`, and
   `components.offset` and their row counts; that `.row-gap-*` is recorded identically under
   `components['row-gap']`; that `.col-form-label*` is recorded under no form key; that a
   breakpoint-scoped selector row carries its own `condition` field while the key's `media` array
   is empty; that `offset` has an empty properties object and `row` and `col` do not. **Re-derive
   each from `tests/fixtures/oracle/inventory.json` yourself** and name any that is wrong. Do not
   quote long selector lists; report counts and families.
3. **Every ruling the brief states as already taken is true of the tree.** That the container
   partial ships logical properties and aliases `--bs-gutter-x` over `--vn-gutter-x`; that
   `--vn-gutter-x`, `--vn-gutter-y`, and `TOKEN_NAMES.gutter` exist; that `.claude/rules/styles.md`
   bars literal colors rather than literal lengths; that the rule bars repeating per-variant blocks.
4. **The owned set covers every file the change makes false.** Walk each acceptance criterion and
   each obligation, and name any file the unit must edit to close it that appears in neither the
   owned nor the off-limits list. Pay particular attention to: the conformance listing and whatever
   asserts it; any proof that enumerates the styles barrel's loads or the showcase's sections; any
   proof that pins the setup module's exports; and whatever the guide parity gate reads.
5. **No acceptance criterion is unreachable under the brief's own scope.** In particular, rule
   whether criterion 5 — `row` and `col` not listed — is consistent with whatever the conformance
   run actually requires, and whether the deferral the brief asks for has a mechanism in this tree.
   The brief names that as an Unknown; say whether the Unknown is honestly named or whether the
   answer is plainly in the tree and the brief should have carried it.
6. **The criteria are ordered cheap-first** and no criterion hides behind an unreachable one.
7. **No criterion is timing-sensitive or whole-suite in a way the contract bars for a unit running
   inside its own exec.**
8. **The carried CL7 findings name real sites.** The brief tells the unit to fix an ordering slip
   in `app/browser/index.ts` and `app/browser/Showcase.ts`, an ordering slip in
   `tests/setupStyles.test.ts`, and an annotation on the layout copy constant in
   `app/browser/constants.ts`. Confirm each site exists and the described condition holds.

## Scope

Read-only. You own no file. Write nothing, run no test, run no build. Report through your final
message.

## Output

1. **Path check** — a short table of every path the brief names and whether it resolves.
2. **Fact check** — each measured claim, CONFIRMED or REFUTED, with what you derived.
3. **Ruling check** — each already-taken ruling, CONFIRMED or REFUTED.
4. **Scope gaps** — every file the change makes false that neither list names.
5. **Criterion check** — each criterion, reachable or not, with the reason.
6. **Defects** — numbered, each with a site and the correction.
7. One terminal line.

No process diary.
