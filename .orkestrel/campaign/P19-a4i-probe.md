<!-- P19 — Orchestrator probe on the host, 2026-09-15: replays every U4l control independently so the A4i objective lane reads host evidence rather than the writer's report. Instruments: the unit's own U4l-mutate-publish.mjs.txt and U4l-mutate-tests.mjs.txt (read before reuse), driven by P19-a4i-probe.sh.txt; log P19-a4i-probe.log.txt. -->

# P19 — the four U4l controls replayed on the host

Each control mutates one file in place, runs the named test, and restores the byte copy; the
SHA-256 prefix before and after each control is equal. One green run over the three owned test
files follows the last restoration.

| Control | File (SHA-256 before = after) | Mutation | Test | Red reading |
| --- | --- | --- | --- | --- |
| publish | `src/browser/ModelContext.ts` (`56ac1dc5588e259d`) | `#publish` flattened to reconcile-then-prune (mutated `0a4144e203081cde`) | `prunes a failed publication and keeps the names it carries` | exit 1, `1 failed \| 57 skipped (58)`, `expected [ 'accepted', 'dropped', 'kept' ] to deeply equal [ 'accepted', 'kept' ]` |
| identity | `tests/src/browser/ModelContext.test.ts` (`9e3296b66b8fcd6f`) | the carried entry bound to `dropped` (mutated `38070b0f9b5d6f9a`) | the same pin | exit 1, `1 failed \| 57 skipped (58)`, `expected { tool: { name: 'kept', …(2) }, …(1) } to be { …(2) } // Object.is equality` |
| factories | `tests/src/browser/factories.test.ts` (`32ec0fa5813e3cac`) | expected value forced to `!('modelContext' in document)` (mutated `bdecb4a4f841870d`) | `builds a bridge exactly where this page exposes the registry` | exit 1, `1 failed \| 61 skipped (62)`, `expected false to be true` |
| validators | `tests/src/browser/validators.test.ts` (`58a99a4b1a581e0f`) | the same forcing (mutated `585fa12b23eb92fa`) | `detects the registry exactly where this page exposes the property` | exit 1, `1 failed \| 10 skipped (11)`, `expected false to be true` |

Green, restored: `npm run test:src:browser -- tests/src/browser/ModelContext.test.ts
tests/src/browser/factories.test.ts tests/src/browser/validators.test.ts` → exit 0,
`Test Files 3 passed (3)`, `Tests 129 passed | 2 skipped (131)`; `git status --short
--untracked-files=no` names 27 paths.

## Ruling

Every red the U4l report records is reproduced on the host on the assertion the report names, and
every file is byte-identical afterwards. The controls are the Orchestrator's evidence for A4i
claims 1 and 2.
