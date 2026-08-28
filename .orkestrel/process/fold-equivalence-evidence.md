# Instrument: is the folded retention equivalent to the `Retention` class

## Claim under test

`Retention` tracks two counters, `delivered` and `retained`. The fold replaces it with one counter
per stream. The claim is that `retained` is not independent state at all: retention is greedy from
the head, so `retained` is always exactly `min(delivered, limit)` and can be derived rather than
stored.

If the claim holds, the fold needs one exported pure helper and one counter per stream, and it
reproduces the class's behaviour exactly.

## Why this needed a probe rather than an argument

The fold rewrites the hot path of the package's flagship function, and the owner required that the
hardening survive the removal. An argument that the two forms agree is the kind of claim
`.claude/rules/quality.md` § Probes before arguments requires be run rather than reasoned.

## Instrument

`retention-equivalence.mjs`, retained beside this file. It transcribes the published
`Retention.retain` body from `src/server/Retention.ts:35-43` and runs it against the proposed
single-counter fold over a deterministic pseudo-random chunk sequence — no `Math.random`, so the
run reproduces. For every chunk it compares three things: whether both forms retained or skipped,
whether the retained slices have equal length, and whether the class's own `retained` equals the
derived `min(delivered, limit)`. It also compares the concatenated retained length per trial.

Population: limits of 0, 1, 2, 7, 16, 64, and 1000, each over 400 trials of 12 chunks sized 0 to
39 bytes. The zero and one-byte limits cover the no-room boundary; chunk sizes span both sides of
every limit below 40.

Coverage: this measures the retention arithmetic alone. It does not measure `execute`'s stream
wiring, and it does not measure the UTF-8 trim, which `buildExecuteResult` applies separately to
the concatenated buffer.

## Result

33600 chunk comparisons, 0 mismatches. The derived `min(delivered, limit)` matched the class's
stored `retained` on every comparison.

## Controls

The instrument must be able to report a mismatch. Three defects were injected into the fold's room
calculation, each run under identical conditions:

- an off-by-one in `room` — 4966 mismatches
- `room` ignoring `delivered` entirely — 22449 mismatches
- `delivered` undercounted by half — 3140 mismatches

Each control was drawn from outside the population the measurement covers: the measurement compares
two agreeing implementations, and each control makes them disagree in a different arithmetic place.
The instrument discriminates, so its clean result is evidence.

## Obligation this creates

`.claude/rules/quality.md` § Instruments requires that an instrument which settled a claim be
adopted as a test before the work it settled is accepted. The retained-equals-`min(delivered,
limit)` property and the no-room boundary belong in `tests/src/server/helpers.test.ts` as the
regression guard for the fold, and they are where the proof now carried by
`tests/src/server/Retention.test.ts` lands.
