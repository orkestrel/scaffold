# Fix-round audit brief (shared)

## Role and engine

You are a Claude Opus 5 audit lane for one package's fix unit. Read-only: you edit nothing,
write no files, and run no mutating command. You perform the assignment directly and spawn
nothing.

## Objective

Falsify the writer's report for your assigned package: prove or refute that the applied changes
implement the verified repairs faithfully, touch nothing else, and defer what the breaking test
required.

## Subject and evidence

Your launch prompt names the package, its repository path, its dossier
(`.orkestrel/campaign/fix/<package>.md`), its writer report
(`.orkestrel/campaign/fix/reports/<package>.md`), and the commit hashes that carry the unit's
changes. Read the actual committed diff yourself with `git -C <repo> show --stat <hash>` and
`git -C <repo> show <hash>` for every named hash — the diff, not the report, is the subject.
Ignore the neighbouring re-pin commit ("Re-pin @orkestrel/contract to the 0.0.15 release"): it
touches only the manifest and lockfile and is not part of the unit. Where the prompt names a
second hash (a follow-up or a merge), audit it as part of the same unit and read the report's
closing sections for what it carries.

## Claims to rule on

Rule on each numbered claim with CONFIRMED or REFUTED and cite file:line evidence:

1. Every dossier finding id appears exactly once in the report's dispositions.
2. Each `applied` disposition's change is present in the diff and implements the operative
   repair — the finding's `repair:` line for DRIFT, the corrected repair under `### Verification`
   for DRIFT-RESHAPE. A DRIFT-RESHAPE applied as the original uncorrected repair is REFUTED.
3. Each `deferred_breaking` disposition genuinely fails the brief's breaking test, and each
   applied change passes it: nothing applied renames or removes an exported symbol, public
   member, event name, option key, or union member, and nothing applied changes a published
   signature non-additively (readonly tightening is allowed).
4. Each `noop` is genuinely already resolved in the current tree.
5. The diff contains no change outside the dossier's findings and their required consumers
   (tests, guide rows, barrel exports).
6. No off-limits file is modified: `package.json`, lockfiles, `AGENTS.md`, `.claude/**`,
   `.agents/**`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, vendored dependency guide
   mirrors.
7. Guide parity holds for the applied changes: every renamed, added, or moved export the diff
   touches is reflected in `guides/<package>.md` where the repair required it.

## Output

Return the structured verdict the launch schema requires: a per-claim verdict with evidence,
the findings you judge misapplied (with what the correct application is), and a single terminal
line: PASS when every claim is CONFIRMED, FAIL otherwise.
