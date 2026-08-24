# Unit PD4 — probe: byte-identical control refusal + Claim remark

Role: implementer. Engine: Claude Opus 5 (native). You perform this unit directly and spawn
nothing. Read `/home/user/orkestrel/probe/AGENTS.md` and the applicable `.claude/rules/*` there
before editing.

## Objective

In `/home/user/orkestrel/probe` (baseline: the head commit when you start — read
`git log --oneline -1`), land ruling 2 from
`/home/user/scaffold/.orkestrel/campaign/d2c-reconciliation.md` (read it first):

1. **One total refusal.** A control whose file bytes are identical to the case's is refused at
   admission in `Probe.prove` (`src/server/Probe.ts`), before any stage runs, as the existing
   caller-selected door does: `origin: 'claimant'`, `code: 'refused'`. Judge equality with the
   real digest helper the package already exports (`computeDigest` in `src/server/helpers.ts` —
   read its exact signature and apply it to each side's file set; the control's `reason` is not
   file bytes and must not rescue an identical file set). Through `prove` a byte-identical
   control can only break by nondeterminism, and a flake-earned receipt is the worst output the
   package can produce — that is the invariant, state it in the TSDoc.
2. **The remark widens.** The `Claim` type's "must differ" remark currently sits narrower than
   the rule; widen it to the whole case (`src/server/types.ts` or wherever `Claim` is declared —
   verify), and move the `@throws`/refusal documentation with the refusal to the door that now
   owns it.
3. NO relatedness invariant beyond byte identity — any approximation refuses controls the guide
   deliberately allows. The guide's prose for this ruling is CARRIED BY PD6; touch no guide.

## TTTDD

Types first. Red-first pin: a `prove` call whose control files are byte-identical to the case's
currently proceeds into the stages (red: assert the refusal, watch it fail), then green after the
admission check. Record the exact command and failing count, then the same command green. Also
pin the near-miss negative control: a one-byte-different control is NOT refused.

## Environment

Native run in `/home/user/orkestrel/probe`; `node_modules` installed; Vitest runs for you. Run
scoped suites only (`tests/src/server/Probe.test.ts` and the files you touch); the whole-suite
reading is the Orchestrator's host run.

## Scope

- Owned: `src/server/Probe.ts`, `src/server/types.ts`, `src/server/helpers.ts` (read-mostly;
  edit only if the equality needs an exported pure leaf), `tests/src/server/Probe.test.ts`.
- Off-limits: `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, guides,
  the stage files, everything else. No commits.

## Acceptance criteria (cheap-first)

1. Scoped oxlint/oxfmt clean on owned files.
2. `npm run check:src:server` green (verify the script name in `package.json` first).
3. The red-first pin recorded red then green; the near-miss negative control green alongside it.

## Deviation contract

Stop and report on: a conflict with the primary objective, an off-limits file the change makes
false, or an equality mechanism `computeDigest` cannot express. Ancillary wording and placement
choices are yours to decide and record.

## Output

Final message = report: the admission check's exact site (file:line), the equality mechanism,
red/green records with commands, `git diff --stat`, `git status --porcelain`, deviations or none.
