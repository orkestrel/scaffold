# A2-fix-r2 mutation probes (Orchestrator, 2026-09-14, worktree `agent-audit` at `611e24e`)

Instrument: `a2-fix-r2-mutations.sh.txt` driven by `a2-fix-r2-mutations.tsv.txt`; full log
`a2-fix-r2-probes.log.txt`. Each row applies one mutation to the committed source, runs the named
test file with the real Vitest core project, records the reading, and restores the file; a
whole-project control run follows on the restored tree.

| Row | Mutation | Reading | Pins that reddened |
| --- | --- | --- | --- |
| R1 | the snapshot bypassed: `body` returns the projection itself | 5 failed / 8 passed in `RelayProvider.test.ts` | sends the snapshot of hostile parameters and never consults their serializer; the same for a hostile schema; the same for hostile call arguments; carries the projection failure as the refusal cause; owns a valid request snapshot without changing its JSON values |
| R2 | the refusal thrown without its `cause` | 1 failed / 12 passed | carries the projection failure as the refusal cause |

Control: the restored tree, whole core project — 753 passed (753), exit 0.

Ruling: the snapshot is the load-bearing mechanism for every serializer case, including the
`arguments` case the deleted refusal never covered, and the `cause` pin binds to its own line.
R3–R9 are structural (a deleted guard, a rename, fence consolidation, a restored control, a
resized deadline, a layout, a remark) and fall to the analyst and the checker.
