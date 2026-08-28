# Unit report U4 — fix round

Role `implementer`, engine Opus 5 (native). The Codex bench is dark this session, so the audit
lanes and this fix both ran on Opus. The round has clean contexts and adversarial framing but no
engine independence from the original writer; the Orchestrator compensated by running every
load-bearing claim rather than reading it.

## What changed

`src/server/helpers.ts` — the `trimHead` retreat repaired, its `@remarks` rewritten, and
`captureChunk`'s alias-or-copy return stated. 28 added, 10 removed.
`tests/src/server/helpers.test.ts` — invalid-UTF-8 rows for `trimHead`, an end-to-end regression row
through `execute`, and a row pinning the guide's new `executeSync` claim.
`guides/process.md` — the mechanism sentence scoped per function, `### Retention helpers` renamed to
`### Capture helpers`, and the duplicated `maxBuffer` handoff removed.

## The repaired retreat

The retreat now fires on evidence rather than on a bit pattern. It walks back over continuation
bytes to the lead byte, reads the length that lead byte declares, and retreats only when
`start + span > limit`. The walk is bounded at `limit - 3`, because a lead byte opens at most a
four-byte sequence, so it terminates on any input.

## Failing-first evidence the unit recorded

`npx vitest run … -t 'trimHead'` before the fix: 2 failed, 5 passed — `expected 3 to be 4` and
`expected +0 to be 3`. After: 7 passed.

`… -t 'delivers the whole limit when the byte past the bound is a stray continuation byte'` before:
1 failed, `expected 'aaa' to be 'aaaa'`. After: 1 passed.

## Measurements the unit took rather than repeating

Driving the built artifact over `aa€bb€` at every limit from 1 to 11, `executeSync` matched
`execute` at every limit and returned no replacement character. Driving `spawnSync` directly, at
`maxBuffer` 1 through 8 it delivered all 10 bytes with `ENOBUFS`, and on a 200000-character write
it delivered 65536 bytes at `maxBuffer` 4 and 1000. On overflow the host returns a chunk-aligned
buffer reaching past `maxBuffer`, so the trim has its excluded byte on that path too. The unit did
not write that `executeSync` returns split sequences.

## Orchestrator's independent verification

Run after the unit exited, driving the published 0.0.8 artifact and the current build side by side
through `execute`:

| Case | Published 0.0.8 | Landed |
| --- | --- | --- |
| stray continuation after valid bytes, limit 4 | `"aaaa"` | `"aaaa"` |
| split euro sequence, limit 3 | `"aa�"` | `"aa"` |
| all continuation bytes, limit 3 | `"���"` | `"���"` |
| clean boundary, limit 2 | `"aa"` | `"aa"` |
| whole sequence fits, limit 5 | `"aa€"` | `"aa€"` |
| limit zero | `""` | `""` |

The behaviour matches the published artifact in every case except the split sequence the repair
targets. Claim 1 now holds as stated: byte-equivalent except at a genuine code-point boundary.

## A prose fix the Orchestrator took directly

The unit recorded, outside its findings, that a test row read "refuses a chunk once the room is
exhausted", where `once` carries the temporal sense `.claude/rules/writing.md` substitutes. The row
was written by this campaign — `git show HEAD` finds no such row — so it is the campaign's own
prose and was corrected to "after".

A second hit, "signals nothing once the host has recorded the native exit", is present at `HEAD`.
It is pre-existing, outside this change's scope, and recorded here for the next change against the
file that owns it.
