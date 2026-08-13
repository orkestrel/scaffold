# Falsification audit — `@orkestrel/test` — round 3 reconciliation

Subject: `/home/user/test` at `cb2b9df`, `@orkestrel/test@0.0.1`, 11 values and 5 types, zero runtime
dependencies.

## Lanes

| Lane | Role / engine | Transport | Verdict |
| --- | --- | --- | --- |
| Objective | `analyst` / GPT-5.6 Sol | `codex exec`, journal `tmp/audit/analyst3.jsonl`, thread `019ffaed-675c-7cf3-9b90-db205c69ba65`, 33 commands, 4 probes | `FAIL` — 6 broken, 0 unresolved |
| Subjective | `reviewer` / Opus 5 | native subagent, `Read`/`Grep`/`Glob` only | `FAIL` — 6 broken, 2 unresolved, 1 outside finding |

Both lanes ran one brief, blind to each other. Neither lane's engine wrote the code it audited: the
round-2 fixes were written by Sol and the prose by Opus, so each lane audited work the other engine
produced.

The transport split did its job. Sol settled claims 2 and 3 by execution and returned `CONFIRMED`.
Opus marked the same two `UNRESOLVED` with the exact command that would settle them, rather than
reasoning about runtime — which is what round 1's subjective lane failed to do. The two lanes
disagreed on no claim.

## Rulings

### Upheld — no action

| Claim | Ruling |
| --- | --- |
| 2 — absolute-path normalization opened no escape | Holds. Sol re-proved absolute-root, normalized-inside, lexical escape, realpath escape, win32 drive-relative, cross-drive, and both UNC forms. |
| 3 — the raw-JSON fix has no bypass | Holds **in the direction it was asked**. See F1 for the direction it does not hold in. |
| 5 — `resolveContained` is the right survivor | Holds. Both lanes read it against `@orkestrel/scaffold`'s `resolveContainedPath` and confirmed the recorded semantic difference is real: this one is lexical only, that one resolves through the filesystem and lives in a build tool. Five call sites make one exported function right and none wrong. |
| 6 — the parity ruling holds | Holds. Opus attacked it from the actual duplicated file rather than the ruling's description, subtracted what `@orkestrel/guide` and `@orkestrel/test` already publish, and found the residue names a foreign contract or is per-package registration. No export clears membership, boundary and ownership at once. |

### Dropped on the record

**Sol: "the guide says missing roots throw" while `read` returns `undefined` and `exists` returns
`false` after destruction.** Falsified by reading. Only the `write` row at `guides/test.md:136` says
a missing root throws, and `write` does throw. The `read` and `exists` rows do not claim it, and the
source matches them. The query/mutation asymmetry is deliberate and documented accurately.

**Sol: the packed tarball ships stale `dist`, exports the deleted `hasSymbolicLink`, carries 12
values not 11, and omits `guides/test.md` while the README links there.** The measurement is real —
`dist/src/server/index.js` was four hours older than `src/server/helpers.ts` on disk. The ruling is
that its owner is `@orkestrel/scaffold`, not this package:

```text
$ # across all 41 published packages
packages with a prepack or prepare script:  0
files[] == ["dist/src","README.md"]:        40   (1 adds dist/bin, dist/host)
packages whose README links into guides/:   41
```

No package in the fleet rebuilds on `npm pack`, none ships `guides/`, and all 41 link to it from the
README anyway. Publication is unaffected because `prepublishOnly` runs `clean && build` before the
upload, so the registry receives fresh code. Recorded against `@orkestrel/scaffold` for the next
change to that package. The README half of the finding is `@orkestrel/test`'s own and is carried as
F6 below.

## Findings carried into the fix round

Every one reproduced by the Orchestrator before being carried.

| # | Finding | Source | Carrier |
| --- | --- | --- | --- |
| F1 | `roundTripJSON` throws `RangeError` on a legitimate large `JSONValue`. `pending.push(...current)` spreads an array into argument positions. Measured: `Array.from({length: 300_000})` → `Maximum call stack size exceeded`. | Opus, claim 3 direction two, returned `UNRESOLVED` with the settling command; Orchestrator ran it | Sol brief item 1 |
| F2 | `resolveContained` refuses paths that **are** contained. `src/server/helpers.ts:17` rejects every absolute target, so the one return value means both "escaped" and "absolute", `readInventory` normalizes at line 55 to work around its own package's predicate, and `guides/test.md:414-418` teaches consumers to repeat the workaround. | Opus, outside the claims | Sol brief item 3 |
| F3 | `read` on a contained **directory** throws `EISDIR` — a class the `## Methods` row does not admit — while `exists` returns `true` for the same path and the guide's own example at line 392 hands the reader that call. Measured. | Opus, claim 8 | Sol brief item 2 (source), prose unit (the row) |
| F4 | Guide rule 7 is titled "`createScratch` stays inside its own directory" and its own body three lines later says it does not walk segments for symlinks. The package's own test writes through a symlink to outside the allocation. | Both lanes, claims 1 and 4 | prose unit |
| F5 | The mode-`0700` sentence is the whole stated justification for deleting the symlink walk, and nothing probes or tests it. It is also weaker than it reads: mode scopes to a uid, not a process, so it admits every sibling worker and the code under test — which is the population that creates the link. Eight lines earlier the same guide probes a different host-varying property and says so. | Both lanes, claim 8 | prose unit; Sol brief item 4 adds the missing test |
| F6 | The README cannot drive `readInventory`. `guides/` never ships, so the README is the only prose a consumer receives, and it gives `readInventory` one subordinate clause with no signature, no mention that the second argument is required, and no example — while `createScratch` gets a full worked fence. This is round 2's R8, carried, and the round-3 diff edited that exact paragraph without repairing it. | Both lanes, claim 9 | prose unit |
| F7 | Six regression proofs the suite does not have. `requireValue`'s default message (`grep` → 0 hits), `collectStream`'s lock release (0 hits), `-0` normalization (0 hits), `exclude` on a **directory** (only a file is excluded, at `tests/src/server/helpers.test.ts:139`, against `src/server/types.ts:45` documenting "file or directory"), mode `0700` (0 hits), and an existing assertion that a half-delay mutant satisfies (`elapsed >= delay / 2`). | Sol claim 7 and Opus claim 7, complementary | Sol brief item 4 |

Every retained finding names its carrier. No finding is dropped without a ruling above.

## What the round establishes about the seam

Three rounds have now gone to the server face, and round 3's failures are a different kind from
rounds 1 and 2. Those were mechanism defects. These are **prose that the mechanism change left
standing**: round 2's ruling landed in the code and did not land in the sentences the ruling existed
to correct. Rule 7's heading, the `read` row, and the README clause all describe a design that was
replaced.

`.claude/rules/documentation.md` already carries the rule this violates — "Re-read the prose last,
against what actually shipped" and "prose rulings survive because nothing tries." The round is
evidence that the rule needs an executable trigger rather than better intentions, because the fix
round that broke the prose was explicitly told not to touch `guides/` and did exactly as instructed.

The core face was attacked by both lanes and held. Eight values, no finding against any of them
except F1, which is one line.

## Order of repair

F1, F2, F3-source and F7 are objective and constraint-heavy: Sol, one writer, in the main checkout.
F2 makes `guides/test.md:414-418` false, so the prose unit runs **after** Sol rather than beside it,
and Sol's brief names the resulting `guides` failure as a standing condition instead of leaving it to
arrive as a deviation report.
