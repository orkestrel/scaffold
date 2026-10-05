# Parallel holders — status (2026-10-04, late)

The desktop session's hand-off record for browser ROADMAP item 14 and the work around it. The design of record is `synthesis.md` beside this file; the review is `review-h2.md`; the release is `scaffold/.orkestrel/release.md` § 2026-10-04 evening round.

## Landed and published

- Pool 0.0.15 (`4c589c6`): a grant resets the strikes only for a record created after the last strike (user ruling Q3).
- Browser 0.0.24 (`b81c22c`): the holder tools `acquire`, `execute`, `tools`, `destroy` (H2, H2fix), journey admission across holders and downloads under each profile (H3), the guide section `### Run work in parallel` (H5), `BROWSE_VIEWPORT` (item 6), `capture` (item 7), the scroll settle and `OCCLUDED` (item 8), a deadline during element resolution reported as itself instead of `GONE`, and the failover hardening.
- Scaffold 0.0.92 (`5612beb`): generated workspaces pin browser `^0.0.24`; the canon's measured-performance rule and figures-as-properties.
- After the release, on browser `main`: ROADMAP item 15 (`efc3b97`), the service document-startup flake with everything learned.

## Open, in order

1. **Concurrent replays across holders** (unit `replay-race`, launched; brief at browser `tmp/codex/replay-race-brief.md`). The H6 pilot at size 2 saw a named holder's replay of a journey stop at its first step when the shared browser replayed the same journey 0.23 ms apart, on a holder that had just recorded another journey. Fix the cause and prove two simultaneous replays of one journey both complete; release as browser 0.0.25.
2. **H6, the contention measurement** (instrument at browser `tmp/probes/holders/`, usage `node tmp/probes/holders/main.ts [--control] [--load] [--sizes 1,2,3] [--count 5]`). Every control passes (`report-h6b.md`). The size-1 pilot reads 80.16 s per body (SD 0.11 s, five bodies); size 2 stopped on item 1; size 3 not run. After item 1 lands: run the pilots at sizes 1, 2, and 3, derive the final run's sample count and duration from the spread, run the final measurement quiet and under the `test:src:core` loop, and bring the user the readings for the default `BROWSE_POOL` ruling (the rule is in `synthesis.md` § Measurement plan). Pilot readings so far to weigh: idle working set at size 1 about 2.26 GB summed (shared pages counted per process), idle CPU near a quarter of one core, work CPU 154% of one core at size 1 and 285% at size 2.
3. **ROADMAP item 15**, the service document-startup flake: read the cause from an unperturbed run (it vanishes under instrumentation; the keep-alive race is ruled out).
4. **The paused ollama store campaign** (`ollama/tmp/codex/store-campaign-pause.md`): resume the same Codex session from S2's extension when the host can stay quiet for hours; S3 to S5's browser changes then ride a later browser release, and ollama 0.0.21 follows its acceptance.
5. **Worker re-pin** to pool `^0.0.15` at its next visit; probe item 1 (the eager probe, brief at probe `tmp/codex/eager-probe-brief.md`); mcp items 13 and 14.

## Rules that bind the rest

- Tests pin claims at the least cost; report durations; never weaken a pin (the user, 2026-10-04; memory `feedback-test-tuning`).
- The desktop session writes no veneer path; it logs each `browse` release veneer consumes in `scaffold/.orkestrel/veneer/lanes.md`.
