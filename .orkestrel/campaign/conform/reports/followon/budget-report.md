# Unit followon-budget — report

The `builder` on Claude Sonnet applied every row under § Rows with the Edit tool and ran the gates, then parked on a permission prompt at 10:07:39 UTC while writing the evidence files through a `mkdir … && cd … && git diff HEAD > …` chain. The Orchestrator stopped it at 10:14 UTC, wrote the evidence files from the tree it left (`git diff HEAD`, `git status --short`), and wrote this report from that diff and the builder's recorded gate output. The landing's deciding run is the authoritative gate reading.

## Rows

| Row       | Disposition | What landed                                                                                                                                                                                                                            |
| --------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| budget-R2 | applied     | `src/core/types.ts:5-7`: the `BudgetOptions` remark no longer restates the `id` default; `Default: a random UUID.` on the property (line 15) is its one home.                                                                          |
| budget-R3 | applied     | `tests/setup.ts:86,92,94`: the summary, the `@param target` line, and the `@returns` line of `defineThrowingProperty` state that the call mutates the target in place.                                                                  |
| budget-O1 | applied     | `tests/guides.test.ts:2`: "The four constants below are this" is "The constants that follow are this".                                                                                                                                  |
| budget-O2 | applied     | `tests/guides.test.ts:37-38`: "the second assertion below fails" names the `INTERNAL.filter` assertion later in the file.                                                                                                              |
| budget-O3 | applied     | `tests/guides.test.ts:211-212`: the comment names the chunk size, the crossing value, and the refused chunk by value; the assertions are unchanged.                                                                                     |
| budget-O4 | applied     | `guides/README.md:25-35`: the `guide.md` paragraph is one sentence introducing one byte-identical mirror per declared `@orkestrel/*` development dependency and a list naming `guide.md`, `test.md`, `scaffold.md`, and `probe.md`. |

## Files touched

- `src/core/types.ts` — the remark of `BudgetOptions`.
- `tests/setup.ts` — the TSDoc of `defineThrowingProperty`.
- `tests/guides.test.ts` — the header comment, the `INTERNAL` doc comment, and the stream-loop transcription's comment.
- `guides/README.md` — § Dependency reference.

## Gates (the builder's run, from its transcript, before the stop)

| Command                                                       | Reading                                                        |
| ------------------------------------------------------------- | -------------------------------------------------------------- |
| `npm run format:check`                                        | "All matched files use the correct format."                    |
| `npm run lint:check`                                          | no diagnostic printed                                          |
| `npm run check`                                               | `tsc --noEmit` on the root and `configs/src/tsconfig.core.json` printed no diagnostic |
| `npx vitest run tests/guides.test.ts tests/setup.test.ts`     | Test Files 2 passed, Tests 33 passed                           |
| `npm test`                                                    | `EXIT:0`                                                       |

## Breaking

None. No symbol changed.

## Shared-file patches

None.

## Deviations

- The builder was stopped before it wrote the report and the evidence files; the Orchestrator wrote both. The stop is recorded in the session ledger. No row was changed or added after the stop.
