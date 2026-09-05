# Audit brief — ts7-seven-fix (round 2 over stage 2 of the TypeScript 7 move in scaffold)

## Role and lane

A read-only lane over one brief. The dispatch names which lane you hold: the subjective lane (`reviewer`, Opus 5), the objective lane (`reviewer`, Opus 5, the recorded substitution for the dark Sol bench), or the checker (`checker`, Sonnet). Read `/home/user/scaffold/AGENTS.md` § Writing and § Non-negotiable rules, `/home/user/scaffold/.claude/rules/writing.md`, `/home/user/scaffold/.claude/rules/tests.md`, and `/home/user/scaffold/.claude/rules/documentation.md` first. You run no command and edit nothing.

## Subject and review evidence

The fix round's uncommitted working tree in `/home/user/scaffold` over `c4bee5da` (stage 2 landed as `6c46f547`; `c4bee5da` added campaign records only). The diff: `/home/user/scaffold/tmp/units/ts7-seven-fix.diff.txt` (351 lines, `git diff 6c46f547` excluding `.orkestrel/`). The status: `/home/user/scaffold/tmp/units/ts7-seven-fix.status.txt`. The unit's brief: `/home/user/scaffold/tmp/units/ts7-seven-fix-brief.md`. The unit's report: `/home/user/scaffold/tmp/units/ts7-seven-fix-report.md`. Round 1's lane reports: `/home/user/scaffold/tmp/units/ts7-audit-scaffold-{subjective,objective,checker}.md`. Resolve every pointer by reading the cited file at the cited line; a report is a claim, never evidence.

## Already established

Round 1 confirmed claims 1 to 5, 7, and 8 of `/home/user/scaffold/tmp/units/ts7-audit-scaffold-brief.md` and the verifier's chain was green; do not re-rule them. The fresh-install `ERESOLVE` on `@orkestrel/probe@0.0.12`'s optional peer is carried by reconciliation R6 and is not a finding here.

## Claims

1. Every prose item the brief prescribes (items 1 to 10) reads at its site as prescribed, or with an ancillary deviation the report records, and each amended sentence obeys `AGENTS.md` § Writing and `.claude/rules/writing.md` (voice, condition-first order, the substitution table, no count of a growable set, no ambiguous pronoun).
2. `guides/scaffold.md` § Dependency floors is true of the code it describes: the `audit` question names the major the registry serves (`src/bin/helpers.ts:414-424`); the override sentence names `''`; the lib-set sentence's versions match `node_modules/@microsoft/api-extractor/package.json` and its nested `typescript`; the test-map sentence matches what `tests/src/core/constants.test.ts` proves.
3. The added test `sets the rollup's compiler folder override in every emitted published face` (`tests/src/core/compilers.test.ts`) asserts the override string in each of the emitted core, browser, and server faces and its absence in the emitted bin face, its blueprint carries `bin: true` so the control is present, and deleting the browser template's override line (`src/core/templates.ts:611`) would make it fail; `src/core/templates.ts` is unchanged in the diff.
4. `buildPackument` (`tests/setupServer.ts`) accepts `string | readonly string[]`, its single-version behaviour is unchanged for every existing call site, the first array element is `dist-tags.latest`, edges land on every published record, an empty array throws, the TSDoc states the form, `tests/setupServer.test.ts` gains one row over the multi-version form, and both shared `/typescript` rows in `tests/src/bin/CLI.test.ts` call it with no inline `JSON.stringify` packument; the two per-test packuments at `CLI.test.ts` `reports a stale foreign floor…` and its sibling are the report's recorded leftover, not a hidden one.
5. `PROPOSAL.md`: the four rewrapped paragraphs changed no word (compare the diff's removed and added lines token by token), and the two amended sentences (the fallback reader's preview status and spawned binary; the C12 row's preview clause) are true against `/home/user/scaffold/.orkestrel/campaign/ts7/orchestrator-measurements.md` and `absorb-distillate.md`.
6. `host.json` moves only the `guides/scaffold.md` digest and the root digest.
7. No file outside the unit's owned set changed (`guides/scaffold.md`, `ROADMAP.md`, `PROPOSAL.md`, `tests/src/core/constants.test.ts`, `tests/src/core/compilers.test.ts`, `tests/src/bin/CLI.test.ts`, `tests/setupServer.ts`, `tests/setupServer.test.ts`, `host.json`); `.orkestrel/` entries in the status are the Orchestrator's records.

## Threshold

Default to refuting where the evidence is thin. A claim is CONFIRMED only from the cited file; a claim you cannot settle from your evidence is UNRESOLVED with the reason. Findings outside the claims are welcome, each with file, line, what is wrong, why it matters, and what right looks like.

## Output

Per-claim verdicts with evidence, then findings outside the claims, then exactly one terminal line: `VERDICT: PASS|FAIL <failed claim ids>; outside the claims: <ids or none>`. No process diary.

## Execution

Perform the assignment directly and spawn nothing.
