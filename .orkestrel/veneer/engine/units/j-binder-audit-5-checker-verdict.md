# J-BINDER audit round 5 — the checker's verdict (returned 2026-09-23 by `checker` on Sonnet, native subagent, 29 tool uses, 152 s; retained verbatim from the subagent's return text)

## VERDICT — checker on Sonnet, native Claude subagent (Read/Grep/Glob only), mechanical conformance only

### Claim 4 — CONFIRMED (with one sub-clause UNRESOLVED)

- Five red readings match `j-binder5-red.log.txt` exactly: `Button > stops a toggle...`, `ColorMode > writes no storage...`, `HostSnapshot > keeps the outer restoration...`, `HostSnapshot > records the live element...`, `HostSnapshot > hands a snapshot its own pending original...` — file lines 2-11, `Tests 5 failed | 127 passed (132)` (line 13).
- All seven new case titles (five red-first plus two after-fix) exist in the worktree's test files: `Button.test.ts:272`, `Button.test.ts:332`, `ColorMode.test.ts:73`, `HostSnapshot.test.ts:137,168,204,233`.
- Every mutation row in the report's table (lines 71-86 of `j-binder-report-5.md`) has a matching entry in `j-binder5-mutations.json` (20 entries) or `j-binder5-mutations-2.json` (2 entries), each name appearing exactly once across the two files, with matching result tallies in `j-binder5-mutation-results.json`/`-2.json` (verified row by row: `Button: no lifetime re-check…` 1/41, `ColorMode…` 1/17, `entries owned by the snapshot…` 0/12, `a written target not withdrawn…` 1/76, `a snapshot never takes its own pending entry` 1/12, `pending targets never unpublished (rerun…)` 1/13, `a nested restore withdraws…` 1/13, and the remaining rows' tallies 6/76, 5/76, 4/76, 4/53, 6/64, 1/23×3, 7/23, 3/23, 2/23, 9/23, 2/26, 1/26, 3/26, 3/25).
- UNRESOLVED sub-clause: "the instrument restores every source byte for byte" and "the Orchestrator's own re-run of a sample after the lanes return reproduces the recorded reddening (`j-binder-mutations-5-orchestrator.log.txt`)" — that file does not exist (`Glob` returned no match), and the byte-for-byte restoration claim rests only on the report's own assertion (report line 67). Neither has independent evidence; both are UNRESOLVED, not CONFIRMED.

### Claim 5 — CONFIRMED

Every moved tally checks out exactly against `j-binder4-mutation-results.json` and `j-binder5-mutation-results.json`:
- "pending targets never unpublished": 1/9 (round 4, `"1 failed | 8 passed (9)"`) → 0/12 (round 5, `"12 passed (12)"`).
- "a pending original not taken": 4/71 → 6/76.
- "a taken target not skipped": 4/71 → 5/76.
- "attributes before tokens": 2/48 → 4/53.
- "Button: restore before releasing the claim": 5/62 → 6/64.

### Claim 6 — CONFIRMED (with two UNRESOLVED sub-clauses)

- `grep -n "owner: this\|owner === this\|owner"` on `HostSnapshot.ts` in the actual worktree returns no hit (confirmed directly).
- Second sweep pattern (`#held`, `#restore\b`, `AttributeNames`, `CallRecording\b`, `OPTION_PREFIX`, `isHost`, `from './Snapshot`, `class Snapshot`, `BUTTON_ACTIVE`, `BUTTON_SELECTOR\b`, `BUTTON_PRESSED`, `COLOR_MODE_ATTRIBUTE\b`, `CONFIG_ATTRIBUTE`, `LINK_ATTRIBUTE`, `generateId`, `hidePrevented`) returns no hit across `src/browser`, `tests/src/browser`, `tests/setupBrowser.ts` (confirmed directly, three separate `Grep` calls).
- No forbidden syntax (`any`, `as `, `!`, `@ts-`, `eslint-disable`, `public`/`protected`/`private`, parameter property, default export, nested function declaration) in added diff lines — all matches on that pattern in `j-binder-5.diff` are false positives (prose "as" comparisons in doc comments).
- `readonly` present throughout added interface/type lines (39 occurrences in the diff).
- `npm run test:src:browser` (134/134), `test:policy`, `test:guides` (19/19), `check:src:browser`, `build:src:browser` all exit 0 in `j-binder-gates-5.log.txt` (Orchestrator's independent run).
- Tree-wide `npm run check` is red on exactly the three named app files plus the `Showcase.test.ts:231` `instanceof` error (`j-binder-gates-5.log.txt` lines 128-131), matching the claim.
- UNRESOLVED: "every report-only patch still applies" — no independent `git apply --check` or equivalent was run against the patches; only the unit's report asserts this. I have no tool to execute a check command, so this stays UNRESOLVED.
- UNRESOLVED / referral: "the export list is unchanged" — `src/browser/index.ts` diff (lines 1592-1604 of `j-binder-5.diff`) shows `export * from './Snapshot.js'` replaced by `export * from './HostSnapshot.js'`, and `tests/src/browser/index.test.ts` asserts `HostSnapshot` in the barrel's name list, not `Snapshot`. Whether a rename (not an addition or removal) counts as "unchanged" is a judgment call the brief does not resolve mechanically — referred rather than ruled.

### Checklist of mechanical items

| Item | Met | Evidence |
| --- | --- | --- |
| Diff touches only the round-4 owned set | Met | `j-binder-5-status.txt` lines 1-20 match `j-binder-gates-5.log.txt` lines 3-22 and the diff's file list exactly |
| Five red readings match the red log | Met | `j-binder5-red.log.txt` lines 2-13 |
| Seven new case titles present in worktree test files | Met | Grep results above (`Button.test.ts:272,332`; `ColorMode.test.ts:73`; `HostSnapshot.test.ts:137,168,204,233`) |
| Red log's failed count is five | Met | `j-binder5-red.log.txt:13` `"Tests 5 failed \| 127 passed (132)"` |
| Mutation-row/result correspondence, each name once | Met | row-by-row match against `j-binder5-mutations.json`, `-2.json`, `-mutation-results.json`, `-results-2.json` |
| No forbidden TypeScript syntax in added lines | Met | Grep on `j-binder-5.diff`, no true hits |
| Readonly on added interface/type properties | Met | 39 `readonly` occurrences in diff (spot-checked pattern) |
| `owner: this`/`owner === this`/`owner` absent from `HostSnapshot.ts` | Met | Direct grep, no hit |
| Old-name sweep absent from `src/browser`, `tests/src/browser`, `tests/setupBrowser.ts` | Met | Direct grep, no hit |
| `index.ts` exports match `index.test.ts` assertion | Met (via gate) | `j-binder-gates-5.log.txt` shows `test:src:browser` 134/134 passed, which includes `index.test.ts`'s `toStrictEqual` assertion |
| Guide § Surface parity, Summary/Methods cells | Met (via gate) | `test:guides` 19/19 passed in `j-binder-gates-5.log.txt` |
| No banned `writing.md` substitution terms in added prose | Met (bounded) | Grep for a sample of banned terms in the diff returned no hit; not exhaustively swept against the full substitution table |
| Report names three departures with expected/found | Met | Report lines 5-9 (`ColorMode.apply`, the invocation-vs-snapshot identity, the throwing-write withdrawal) |
| Report names retained scratchpad instruments as `j-binder5-<name>` | Met | Report lines 212 lists them as `binder5-*`; retained files in the unit directory are literally named `j-binder5-*` (the Orchestrator's own naming, consistent) |
| Report-only patches still apply | UNRESOLVED | No independent apply-check run; only report asserts it |
| Instrument restores source byte for byte | UNRESOLVED | Only report asserts it (report line 67) |
| Orchestrator's mutation-sample re-run reproduces reddening | UNRESOLVED | `j-binder-mutations-5-orchestrator.log.txt` does not exist |

### Referrals

- Whether "the export list is unchanged" (claim 6) tolerates the `Snapshot` → `HostSnapshot` rename, or whether the claim's intent is violated by any rename — a judgment call for the subjective/objective lane or the Orchestrator, not this checker.
- Whether the per-call `invocation` object should collapse into the snapshot itself (claim 2, explicitly deferred to a lane by the claims file itself) — outside this checker's mechanical scope.

VERDICT: FAIL none; outside the claims: none
