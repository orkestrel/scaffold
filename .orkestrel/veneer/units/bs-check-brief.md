# BROWSER-SERIALIZATION (`bs`) — verification check

## Role and engine

`checker` on Sonnet, a native Claude subagent, read-only (Read, Grep, Glob). It writes nothing and runs nothing.

## Objective

Rule, claim by claim, whether the unit's return closes D45 for the sites the engine session's reading names, and nothing else.

## Context

**Evidence, under `/home/user/scaffold/.orkestrel/veneer/units/`.** `bs.diff` (`git diff 97ac9ab` in `/home/user/veneer-bs`), `bs-status.txt`, the report `browser-serialization-report.md`, the brief `browser-serialization-brief.md`, D45 in `decisions-round-2.md`, and the engine session's reading `/home/user/scaffold/.orkestrel/veneer/engine/units/host-chromium-153-reading.md`. The worktree `/home/user/veneer-bs` holds the edited files (read them; never edit them).

**Law.** `AGENTS.md` § Writing; `.claude/rules/{tests,writing}.md`. Skill: none.

## Unknowns

None.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Claims

1. **Delta and scope.** `bs-status.txt` lists exactly `guides/veneer.md`, `tests/service/tailwind/preflight.test.ts`, `tests/src/styles/components/close.test.ts`, `tests/src/styles/components/form-select.test.ts`, and `tests/src/styles/components/validation.test.ts` as modified and nothing else, and `bs.diff` changes only those.
2. **The position and size assertions.** After the diff, no assertion in the three style proofs compares a `background-position` string that names `right <length>` without also accepting `calc(100% - <length>)`, and no `background-size` assertion compares a bare `<length>` without accepting `<length> auto`; each site the engine reading names (form-select around line 277, validation around lines 77 and 335, close around line 52) is changed, and the two sites the report adds (form-select's density reading; validation's marked textarea around line 85) carry the same form.
3. **The preflight comparison.** `preflight.test.ts` compares each measured move by tag, property, and the preflight value, asserts the measured standalone value differs from the preflight value, and no longer equates the standalone column with a recorded reading; the guide's table is unchanged and its preflight paragraph carries the sentence the report quotes verbatim.
4. **The mutations.** The report records, per changed assertion, a mutation with its command and result line showing the assertion still reddens on a wrong value, and the reverts' green runs.
5. **Law and report.** The diff adds no `any`, `as` assertion, `!`, suppression, mock, or nested function; the report and the guide sentence carry no banned term and no count of a growable set; the report records each gate's command and result line.

## Output

One verdict per claim (`CONFIRMED`, `BROKEN`, `UNRESOLVED`, or `NOT-EVIDENCED`) with `file:line` evidence, findings outside the claims, and the single terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`. Rule every population whole; state no count of a growable set.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol; rule a claim whose evidence is missing `NOT-EVIDENCED` rather than stopping.

## Acceptance criteria

A verdict on every claim with evidence and the terminal line.

## Review evidence

`bs.diff` and `bs-status.txt`.
