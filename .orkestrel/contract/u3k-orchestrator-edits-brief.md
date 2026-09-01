# Orchestrator edit unit U3k — the last two copies of the unconditional read count (successor to U3j)

## Role and engine

Orchestrator (Opus 5), acting directly on two lines. Briefed, owned, and audited like any other part: `checker` on Sonnet verifies the verbatim landing and the sweeps, `verifier` on Sonnet runs the gates. No `reviewer` lane runs: the wording is the U3j subjective lane's own prescription adopted verbatim (`u3j-audit-subjective.md` findings A and B), and `.claude/rules/quality.md` § Rounds and verdicts warns off a further revision round on this sentence; recorded as the round's deviation.

## Objective

Carry the condition the U3j sentence states ("once more for the rebuild ... when one was") into the two copies that still stated the declared-pattern case unconditionally, so `grep` for the read-count wording finds one vocabulary.

## Scope

Owned: `tests/src/core/helpers.test.ts:3288` (title only); `src/core/helpers.ts:1954-1955` (the `@param pattern` default line only). Off-limits: every other line.

## Edits

1. `tests/src/core/helpers.test.ts:3288`: `reads a hand-rolled shape's pattern accessor twice per call, for the presence test and for the rebuild that names the limit` → `reads a hand-rolled shape's pattern accessor twice per call when the shape declares one, for the presence test and for the rebuild that names the limit` (U3j lane finding A, verbatim).
2. `src/core/helpers.ts:1954-1955`: `Default: rebuilt from` / `` `shape` on every call `` → `Default: rebuilt from` / `` `shape.pattern` on every call, when the shape declares one `` (U3j lane finding B, verbatim).

## Acceptance criteria

1. `npm run format:check` and `npm run lint:check` exit 0.
2. The scoped helpers suite reports `235 passed (235)` (the title change moves no assertion).
3. The `checker` reports the two edits as the only differences between `u3j-diff.patch` and `u3k-diff.patch`, and the `verifier` sweep is GREEN.
