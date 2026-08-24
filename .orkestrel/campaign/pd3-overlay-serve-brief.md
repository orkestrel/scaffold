# Unit PD3 — probe: overlay query strip + serve detection

Role: sol implementer. Engine: GPT-5.6 Sol. You perform this unit directly and spawn nothing.
Read `/home/user/orkestrel/probe/AGENTS.md` and the applicable `.claude/rules/*` there before
editing.

## Objective

In `/home/user/orkestrel/probe` (baseline: the head commit when you start — read
`git log --oneline -1`), land rulings 7 and 8 from
`/home/user/scaffold/.orkestrel/campaign/d2c-reconciliation.md` (read it first):

1. **Query strip.** The runtime overlay plugin's `#load` currently returns overlay text only for
   a bare id or a sole `?v=` query; any other query misses and falls through to disk
   (`src/server/stages/RuntimeStage.ts`, the `orkestrel-runtime-overlay` plugin's `load`). Close
   the rule: strip the id at the FIRST `?` before overlay lookup, so every query form resolves
   the overlaid bytes.
2. **Serve detection.** Record every id the overlay actually served in a `#reads` set inside
   `#load`. After a run, every overlay path present in the served module graph but absent from
   `#reads` reports: `origin: 'workspace'` when the target's configuration defeated the overlay,
   `origin: 'instrument'` when probe's own resolution missed. You pick the honest mechanism for
   the distinction and for where the post-run reading happens; state it in the report. Document
   the boundaries the ruling names: bare specifiers are not chased (Vite's resolver is not
   duplicated), and the type/runtime test-draft asymmetry stays.
3. The detection lands ISSUE-PRODUCING. The ruling gates shipping it on a clean full-suite
   reading; the probe suites spawn children, so that reading is the Orchestrator's host run after
   you exit, and a false finding there demotes the detection to recording-only in a successor —
   record that contingency in your report, do not act on it.
4. Ruling 8's guide sentence (the dated `fsModuleCache` unknown in the receipt-limits passage) is
   CARRIED BY PD6, not you. Touch no guide.

## TTTDD

Types first if any public shape moves (`src/server/types.ts`). Red-first pins: a test driving an
overlaid path through a non-`?v=` query (red today — disk bytes win), and a detection test whose
overlay path never serves (red today — nothing reports). Record each red command and count, then
green.

## Environment and limits

`node_modules` installed. The sandbox denies network, git index writes, loopback listeners, and
child spawns; the stage suites spawn Vitest workers and language services, so record any
spawn-denied suite command as a host observation with both readings — scoped runs that avoid
spawning pass. Never run the whole suite; the host run is the Orchestrator's.

## Scope

- Owned: `src/server/stages/RuntimeStage.ts`, `src/server/Overlay.ts` (if the read-set belongs
  there), `src/server/types.ts`, `src/server/helpers.ts` (if a pure leaf extracts),
  `tests/src/server/stages/RuntimeStage.test.ts`, `tests/src/server/Overlay.test.ts`.
- Off-limits: `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, guides,
  everything else. No commits.

## Acceptance criteria (cheap-first)

1. Scoped oxlint/oxfmt clean on owned files.
2. `npm run check:src:server` green (or the scoped check the manifest names for server).
3. The two red-first pins recorded red then green in scoped runs; spawn-denied commands reported
   as observations, not failures.

## Deviation contract

Stop and report on: a conflict with the primary objective, an off-limits file the change makes
false, or a mechanism the ruling's wording cannot admit. Ancillary placement choices are yours to
decide and record.

## Output

Final message = report: the mechanism chosen for the workspace/instrument distinction, red/green
records with commands, files changed with `git diff --stat`, `git status --porcelain`, host
observations, deviations or none.
