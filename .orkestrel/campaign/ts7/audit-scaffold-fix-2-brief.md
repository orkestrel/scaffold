# Audit brief — ts7-seven-fix-2 (round 3 over stage 2 of the TypeScript 7 move in scaffold)

## Role and lane

A read-only lane over one brief. The dispatch names which lane you hold: the subjective lane (`reviewer`, Opus 5), the objective lane (`reviewer`, Opus 5, the recorded substitution for the dark Sol bench), or the checker (`checker`, Sonnet). Read `/home/user/scaffold/AGENTS.md` § Writing and § Non-negotiable rules, `/home/user/scaffold/.claude/rules/writing.md`, and `/home/user/scaffold/.claude/rules/tests.md` first. You run no command and edit nothing.

## Subject and review evidence

The uncommitted working tree in `/home/user/scaffold` over `c4bee5da`, carrying the round-2 fix unit and the round-3 builder unit. The diff: `/home/user/scaffold/tmp/units/ts7-seven-fix-2.diff.txt` (351 lines, `git diff 6c46f547` excluding `.orkestrel/`). The status: `/home/user/scaffold/tmp/units/ts7-seven-fix-2.status.txt`. The round-3 brief: `/home/user/scaffold/tmp/units/ts7-seven-fix-2-brief.md`; its report: `/home/user/scaffold/tmp/units/ts7-seven-fix-2-report.md`. Round 2's lane reports: `/home/user/scaffold/tmp/units/ts7-audit-scaffold-fix-{subjective,objective,checker}.md`. Resolve every pointer by reading the cited file at the cited line; a report is a claim, never evidence.

## Already established

Round 2 confirmed the added compilers test and its control, the builder's single-version behaviour, the four rewraps, `host.json` membership, and the scope; do not re-rule them. The fresh-install `ERESOLVE` on `@orkestrel/probe@0.0.12`'s optional peer is carried by reconciliation R6 and is not a finding here. The inline per-test packuments in `tests/src/bin/CLI.test.ts` (`/typescript` at one site, `/oxfmt` at two) are a recorded successor item, not a finding here.

## Claims

1. Each of the eight edits the round-3 brief prescribes reads at its site as written there, and every amended sentence obeys `AGENTS.md` § Writing and `.claude/rules/writing.md`: no count of a growable set, no ambiguous pronoun, condition before instruction, the substitution table.
2. `guides/scaffold.md` § Dependency floors is true of the code and the installed packages it describes, and claims nothing the campaign did not measure: the `audit` question sentence, the override sentence, the lib-set sentence ("resolves only the lib types that compiler provides"), the browser fork sentence.
3. `tests/src/core/compilers.test.ts`'s renamed test `sets the rollup's compiler folder override in every declaration-rolling face` still asserts the override in the three declaration-rolling faces and its absence in the bin face, and its name now matches its population.
4. `buildPackument` binds the published list once, returns byte-identical JSON for a string argument, names the first array element under `dist-tags.latest`, throws on an empty array, and `tests/setupServer.test.ts` pins both the tag-from-first-element (with `['0.0.4', '0.0.8']` and `latest` `0.0.4`) and the empty-array throw.
5. `PROPOSAL.md`'s C12 row reads "preview surfaces carrying no stability promise, whose shape 7.1's different API can change" and that clause is true against `/home/user/scaffold/.orkestrel/campaign/ts7/orchestrator-measurements.md` and `design-objective.md`; every rewrapped line sits at or under 100 columns and no word changed beyond the prescribed clause.
6. `host.json` moves only the `guides/scaffold.md` digest and the root digest.
7. No file outside the two units' owned sets changed; `src/core/templates.ts` is absent from the diff and the status.

## Threshold

Default to refuting where the evidence is thin. A claim is CONFIRMED only from the cited file; a claim you cannot settle from your evidence is UNRESOLVED with the reason. Findings outside the claims are welcome, each with file, line, what is wrong, why it matters, and what right looks like.

## Output

Per-claim verdicts with evidence, then findings outside the claims, then exactly one terminal line: `VERDICT: PASS|FAIL <failed claim ids>; outside the claims: <ids or none>`. No process diary.

## Execution

Perform the assignment directly and spawn nothing.
