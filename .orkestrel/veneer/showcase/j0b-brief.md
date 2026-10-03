# Unit J0b: implement the measured journey optimizations

## Role and engine

GPT-6 Astra implementation lane through `codex exec`, sandbox `danger-full-access` on the Linux cloud host. Perform the work yourself and spawn nothing.

## Objective

Implement the optimizations unit J0 measured, so `npm run test:journey` in `/home/user/veneer` finishes green, faster, and inside the host's memory, with every claim still proved.

## Context

- Read `/home/user/.wave/codex/j0-brief.md` (the original unit: checkout, PATH export, owned files, claims, canon, known host failures) and your own report `/home/user/.wave/codex/j0-last.md` (the baseline). Everything there still holds except the deviation contract, which this brief replaces.
- Baseline at `42685f7` (2026-10-02, this host, 4 cores, a 14 345 035 776-byte memory cgroup): 464.65 s wall, 40 passed, 1 failed, 7 incomplete; the kernel killed Chromium for out-of-memory at 16:39:50 UTC; the statechart test timed out at 120 s in light-390 and passed alone in 23.1 s test time.
- Your measured causes: each of the four projects runs the full four-variant matrix (about 132 s per project); J2 resolves its target across every interactive role after each Tab (about 36 s); several dark-project tests mount the default light theme without applying the project's own theme, so they never prove dark; projects run concurrently although `fileParallelism` is false.

## Do

1. Each journey project proves its own variant only: the matrix reads its project's variant (viewport and theme) and no other, so the four projects together cover the four variants once.
2. Every test in a project applies that project's theme and viewport before it reads or acts, so a dark project proves dark.
3. J2 resolves each Tab stop directly from the focused element (`document.activeElement` and its accessible role and name), not by scanning every role after each Tab, keeping the same expected order and the same refusal of hidden stops.
4. Keep the run inside memory: bound concurrent browser projects in `configs/app/vite.journey.config.ts` (for example a worker or instance limit) to the fastest setting that stays below the cgroup limit, measured; release large readings after use.
5. Remove any other cost you measured that a claim does not need, by the rules of the original brief (a claim keeps a reading in every variant it depends on; no fixed delays; no weakened control).
6. Measure after with the same reporters and report before and after per test and in total. Also report the fastest scoped iteration commands with measured times.
7. Gates, each read bare with its exit code: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:app:browser`, `npm run test:setup:browser`, `npm run test:journey` (all four variants green), `CAPTURE=1 npm run test:journey` (the 304 capture files of `tmp/j0-before-captures.txt`, compare the list), `npm run test:policy`.
8. Commit as one unit in the repository's message style with the trailers `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>` and `Claude-Session: https://claude.ai/code/session_017fwYCgxCd9JhL43kVBLBJV`. Never push. No installs, no network, no edits outside `tests/app/browser/`, `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`, and `configs/app/vite.journey.config.ts`.

## Output

Your final message is the report: before and after per test and total, each change with the claim it serves and where it is proved now, the peak memory you observed if you measured it, the fastest scoped commands with times, each gate with exit code and counts, the commit hash, and any deviation.

## Deviation contract

When a gate fails, find the cause and fix it inside the owned files; stop and report only when the fix needs a file outside them, when a claim cannot keep its proof, or when the sandbox refuses an action.
