# Unit journey-cost-compare-hostbound: host-bound titles match at title level, and the Journal normalizes the worktree path

Route: astra (implementation). You are the sole writer of `/home/user/veneer/tmp/units/journey-cost/compare.ts` and its proof material under `/home/user/veneer/tmp/units/journey-cost/` (`fixtures/`, `proofs.json`, `README.md` § Compare evidence). No other process writes those files; `/home/user/veneer/AGENTS.md`'s non-negotiables bind the code.

## Objective

Two readings from lane 0's gate comparison (`/home/user/veneer/tmp/units/journey-cost/lane-0/compare-both.md`, candidate `runs/lane0-gate-journey-2` against baselines `runs/jb0-1` and `runs/jb0-2`) force two amendments the Orchestrator rules:

1. **Worktree path in a Journal entry.** The journey Journal records `submit Book shipment: http://localhost:<port>/?sessionId=<session>&iframeId=%2Fhome%2Fuser%2F.wave%2Fjourney-cost%2FM%2Ftests%2Fapp%2Fbrowser%2Fintegration.test.ts`; the `iframeId` value is the URL-encoded absolute path of the test file, which differs per worktree (`M`, `0`, `3`, …). Normalize `iframeId=<url-encoded absolute path>` to `iframeId=<file>` wherever a line or Journal entry is compared, beside the existing `sessionId` and port normalizations. After this, the candidate's Journal agrees with `jb0-1` except for nothing, and the gate passes under the at-least-one-baseline rule.
2. **Host-bound titles match at title level.** The verdict's row-and-cause rule (`verdict.md:26`) cannot be met for titles whose failing rows vary by chance between runs: the five § Host-bound set titles fail on different Enter-burst or lifecycle rows in `jb0-1`, `jb0-2`, and the candidate, and the verdict (`verdict.md:229`) left that as a judgment call. The ruling: a candidate failure whose title is in the host-bound file and fails in at least one baseline passes the failure gate; its (row, cause) tuples are reported under a new `## Host-bound rows` section as information (matched or new against the baseline union), never as a difference. A candidate failure whose title is not host-bound stays a refusal (`Host-bound title absent`), and a host-bound title that fails in the candidate but in no baseline is reported as `Host-bound title failed in no baseline` and stays a refusal.

## Governing texts (read first)

- `compare.ts` (the failure gate, the normalizations near the `sessionId`/port replacements, `renderReport`, the usage line) and `README.md` § Compare evidence.
- The verdict: `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/showcase/journey-cost-2026-10-05/verdict.md` lines 17-27 and 229.
- The host-bound file shape: `/home/user/veneer/tmp/units/journey-cost/host-bound.md` (a `## Host-bound set` section with the titles in backticks).
- The three runs named in the objective (read-only) and the comparison report.
- The precedent amendments and their proof shape: `lane-compare/report.md`, `fixtures/compare-baselines.ts`, `lane-mutations/report.md`.
- Rules: `/home/user/scaffold/.claude/rules/typescript.md`, `architecture.md` (no nested functions), `names.md`, `writing.md`.

## Proof

- Fixtures from the existing fixture shape: a Journal entry differing only by the `iframeId` path passes; a host-bound title failing on a row the baselines never saw passes with the row listed under `## Host-bound rows`; a non-host-bound failing title is refused; a host-bound title failing in no baseline is refused; the retained comparison proofs keep their exits.
- The live check: `node compare.ts --baseline runs/jb0-1 --baseline runs/jb0-2 --candidate runs/lane0-gate-journey-2 --host-bound host-bound.md --registration 92/0 --out lane-compare/live-check-lane0.md` exits 0 with `Journal: agree with runs/jb0-1`, `Lines: agree with runs/jb0-2`, and the eight (row, cause) tuples listed under `## Host-bound rows`. Quote the gate lines in the report.
- Every proof runs twice with byte-identical reports (`cmp`).

## Host

Node only; the proofs and the live check run directly. Launch nothing else.

## Forbidden

Installs, commits, pushes, destructive commands, edits outside the owned files, a change to the rows, lines, registration, or evidence gates, a change to the exit-code contract, a second writer.

## Return shape

Report file `/home/user/veneer/tmp/units/journey-cost/lane-compare-2/report.md` with the diff summarized by function, the proof commands with exits and `cmp` results, the live check's gate lines and host-bound rows, and deviations. Your final message is a short summary naming the report path.

## Appended ruling at relaunch (2026-10-05, after the first run's conflict finding)

The conflict is ruled. The three retained cases whose only refusals were `Failure cause absent from baselines` on host-bound titles (`real-row-cause`, `real-a-versus-b`, `real-b-versus-landing`) encode the row-and-cause rule that this amendment supersedes; their expected exit becomes 0, and each gains a note in `proofs.json` naming this ruling and the date. Every other retained proof keeps its exit. The sentence "the retained comparison proofs keep their exits" in § Proof reads with that exception. Implement the objective's two amendments, then run the fixtures, the retained proofs with the three updated expectations, and the live check (exit 0, `Journal: agree with runs/jb0-1`, `Lines: agree with runs/jb0-2`, the eight tuples under `## Host-bound rows`), each twice with `cmp`. Report over `/home/user/veneer/tmp/units/journey-cost/lane-compare-2/report.md`, keeping the first as `report-deviation-1.md`.

## Second appended ruling at relaunch (2026-10-05, after the live check's `navbar-390` refusal)

The `navbar-390` statechart title is in § Host-bound set (its entry names the disclosure observer's Enter burst as its cause and says it fails in loaded full runs and passes focused); both J-B0 runs happened to pass it, and lane 0's gate run failed it under five lanes of host load. The Orchestrator rules: a candidate failure whose title is in the host-bound file is never a refusal of the failure gate, whether or not a baseline failed it; the report lists it under `## Host-bound rows` with the note `failed in no baseline` beside its (row, cause) tuples. Host-bound failure frequency is lane M's judgment at the checkpoint and at acceptance (the verdict's "no more acceptance runs than J-B0 runs" clause and § 229), read from the report, not a gate the tool refuses. A failure whose title is not in the host-bound file stays `Host-bound title absent` and a refusal. Update the fixture for the "title failing in no baseline" case to expect exit 0 with the note, re-run every proof twice with `cmp`, and the live check (exit 0; `Journal: agree with runs/jb0-1`; `Lines: agree with runs/jb0-2`; eight new and two matched tuples, the `navbar-390` tuple marked `failed in no baseline`). Report over `report.md`, keeping the second as `report-2.md`.
