# J-SAMEWAY-ENGINES-A round 4 audit — the checker job (grok on Cursor Grok, grok-4.7-high, ask mode), retained verbatim

Brief: `units/j-engines-a-checker-4-brief.md` (launch copy `tmp/cursor/j-engines-a-checker-4-brief.md`, swept); journal `tmp/cursor/j-engines-a-checker-4.jsonl` (swept at acceptance); session id in the first line below.

---

<!-- Grok lane j-engines-a-checker-4, session dfe6113e-08df-456c-95fe-213e2983d31d -->

I'll read the brief and follow it exactly.The brief limits this to claims 4 and 7. I'll read the claims, parity rules, and the round's files next.Claim 4 needs the TSDoc paragraphs and Surface summaries; claim 7 needs the status paths and any leftover priority reads. I'll pull those from the tip files.**Claim 4 — CONFIRMED.** Each description paragraph equals its § Surface `Summary` cell. `readHostPriority` is exported through the barrel and sits in sorted order in the pinned export list.

| Export | TSDoc description | § Surface `Summary` | Equal |
|---|---|---|---|
| `HostChange` | `types.ts:342` Describes one piece of host state a change wrote and the value and priority it held before the change's first write to it. | `guides/veneer.md:64` Describes one piece of host state a change wrote and the value and priority it held before the change's first write to it. | yes |
| `readHostPriority` | `helpers.ts:891` Reads the priority an inline property carries, as a `HostSnapshot` instance records it. | `guides/veneer.md:72` Reads the priority an inline property carries, as a `HostSnapshot` instance records it. | yes |
| `writeHostValue` | `helpers.ts:906` Writes a value to a piece of host state, in the form the `readHostValue` function reads it. | `guides/veneer.md:73` Writes a value to a piece of host state, in the form the `readHostValue` function reads it. | yes |
| `recordHostChange` | `helpers.ts:934` Records a target a write is about to change, returning a change's records with the target and the value and priority it reads appended. | `guides/veneer.md:74` Records a target a write is about to change, returning a change's records with the target and the value and priority it reads appended. | yes |
| `rewindHostChanges` | `helpers.ts:969` Writes each recorded target back to the value and priority it held before the change's first write to it, in reverse order of those first writes. | `guides/veneer.md:75` Writes each recorded target back to the value and priority it held before the change's first write to it, in reverse order of those first writes. | yes |

Barrel: `src/browser/index.ts:3` re-exports `helpers.js`, which declares `export function readHostPriority` at `helpers.ts:900`. The pinned list places it at `tests/src/browser/index.test.ts:208`, between `readElementName` (`:207`) and `readHostValue` (`:209`).

**Claim 7 — CONFIRMED.** The status file and the report's `git status --short` block (`j-sameway-engines-a-report-4.md:146-154`) name the same eight paths. No path differs.

- `guides/veneer.md`
- `src/browser/Collapse.ts`
- `src/browser/HostSnapshot.ts`
- `src/browser/helpers.ts`
- `src/browser/types.ts`
- `tests/src/browser/Collapse.test.ts`
- `tests/src/browser/helpers.test.ts`
- `tests/src/browser/index.test.ts`

The report's Files touched section also names `tmp/j-engines-a/`. That directory is not in either status list and is not one of the eight. In `src/browser/`, `getPropertyPriority` appears only inside `readHostPriority` at `helpers.ts:902`. `HostSnapshot.#writeBack` (`HostSnapshot.ts:310-319`) takes `(entry, owner)` and writes with `writeHostValue(target, record.value, record.priority)` at `:319`. `restore` calls it at `:146`, `:153`, and `:163` with no callback, and the file has no alias. `writeHostValue`'s default `priority = ''` (`helpers.ts:922`) is the string `getPropertyPriority` returns for an unprioritized declaration (`helpers.ts:902`), which is the platform value rather than an absence sentinel under `AGENTS.md:63`.

VERDICT: PASS
