# Unit U3: Premise's two modes, stated and pinned

## Role and engine

Role `builder`, engine Sonnet, native subagent, sole writer in
`C:/Users/mikes/WebstormProjects/qualifier`. You perform the assignment directly and spawn
nothing.

## Objective

Design round 3 (S3) ruled `Premise` stays all-optional with two authoring modes the renderer
resolves by presence. Two residues close here:

1. The `Premise` TSDoc at `src/core/types.ts:50` reads "Display-neutral checked evidence.",
   which over-claims: the type also admits a DESCRIBED premise (no `field`, no `comparison`)
   that `describePremise` renders from `description`, and `met` absent means NOT EVALUATED
   (rendered as unknown — see `src/core/helpers.ts:158-166`). Rewrite the TSDoc to name both
   modes and the three-state `met`. The guide's `Premise` surface row (`guides/qualifier.md:76`)
   drops the unqualified "checked" the same way.
2. The described-mode render has no test. In `tests/src/core/helpers.test.ts`, add: an
   assertion that `describePremise({ description: 'Applicant is enrolled' })` returns a
   sentence ending `→ unknown`; and that
   `describePremise({ description: 'Applicant is enrolled', met: false })` ends `→ not met`.
   Match the exact arrow/word rendering the helper produces — read `describePremise` first and
   assert its REAL output shape; the two cases must exercise the described branch
   (`helpers.ts:160-161`) and the three-state `met`.

## Context

Authority in this checkout: `AGENTS.md`, `.claude/rules/typescript.md`,
`.claude/rules/tests.md`, `.claude/rules/documentation.md`, `.claude/rules/writing.md`. No
behaviour changes: `src/core/helpers.ts` and `src/core/validators.ts` are off-limits.

## Scope

- Owned: `src/core/types.ts` (the `Premise` TSDoc only), `guides/qualifier.md` (the `Premise`
  surface row only), `tests/src/core/helpers.test.ts` (added cases only).
- Off-limits: everything else. The checkout is clean.
- No commits, installs, or git checkout/restore/stash/reset/clean. Use `npx.cmd`.

## Acceptance criteria, in this order

1. `git status --porcelain` lists exactly the owned files.
2. `npx.cmd oxfmt --config .oxfmtrc.json --check` on the owned files exits 0.
3. `npx.cmd oxlint --config .oxlintrc.json --deny-warnings` on the owned test file exits 0.
4. `npx.cmd tsc --noEmit --project tsconfig.json` exits 0.
5. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=verbose --project src:core tests/src/core/helpers.test.ts`
   exits 0 with the new cases listed; every pre-existing case passes.
6. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project guides`
   exits 0.

## Output

The diff; raw output and exit code per criterion; the exact rendered strings your cases
asserted. No process diary.

## Deviation contract

Stop if `describePremise`'s real output contradicts the expected shapes in a way that suggests
the ruling misread the helper (report the actual output). TSDoc and row wording are yours.
