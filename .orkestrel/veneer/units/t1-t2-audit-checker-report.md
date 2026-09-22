<!-- T1/T2 audit round, checker lane: `checker` on Sonnet, native, returned 2026-09-22 (79 s). Brief: units/t1-t2-audit-checker-brief.md. Claims: ../t1-t2-audit-claims.md. Blind report, retained verbatim. -->

## Verdict — checker (Sonnet), T1 TEST-SCOPED / T2 TEST-FORCED-COLORS, claims 7, 8, 9, 11, 12

1–6, 10. UNRESOLVED — judgment claim, referred to the lanes.

7. **CONFIRMED.** The marker semantics are unchanged. `/home/user/test/src/browser/helpers.ts:3137` builds `MEDIA_STAGE` as `[media === 'print', reduced, dark, forced].map(Number).join('')` (position four, index 3, is `forced`), and this line is untouched by `t1-t2.diff` (no `+`/`-` on it). The added test at `t1-t2.diff:849` (`document.documentElement.getAttribute(MEDIA_STAGE)?.at(3)`) reads that same index and asserts it equals `String(Number(forced))` before any stage call, and `helpers.ts:3219-3222` (also untouched) still restores all four axes from that marker string on release. Mutation that would falsify this: reorder the marker array or drop `forced` from it — the `.at(3)` assertion in the new test would then read the wrong axis and fail. The assertion distinguishes that mutation from the passing case.

8. **CONFIRMED.** No installed or existing export is duplicated. `/home/user/test/src/core/index.ts` contains no match for `resolveAccessibleWithin|resolveAccessible|driveHold|driveTraversal` (grep: no files found), and `/home/user/test/node_modules/@orkestrel/contract/dist/src/core/index.d.ts` likewise has no match. The diff's five new/changed exports (`resolveAccessibleWithin`, `holdAccessibleWithin`, `driveHold`, `traverseAccessibleWithin`, `driveTraversal`) each compose an existing helper (`resolveAccessible`, `resolveAccessibleWithin`, `resolveRendered`) rather than re-implementing one, per `t1-t2.diff:408-417, 453-482, 531-563`.

9. **CONFIRMED.** The public surface is documented to parity.
   - Doc-block description ↔ guide `Summary`, collapsed whitespace, byte-for-byte: `resolveAccessibleWithin` (`t1-t2.diff:389` vs `:107`), `holdAccessibleWithin` (`:432-433` vs `:120`), `driveHold` (`:462` vs `:121`), `traverseAccessibleWithin` (`:513-514` vs `:126`), `driveTraversal` (`:540-541` vs `:127`), `stageMedia` (`:580-582` vs `:173`), `MediaOptions` (`:638` vs guide row `:10`) — each pair reads identically once whitespace is collapsed.
   - Each new/changed export carries an `@example` fence: `resolveAccessibleWithin` (`:403-406`), `holdAccessibleWithin` (`:447-451`), `driveHold` (`:476-480`), `traverseAccessibleWithin` (`:526-529`), `driveTraversal` (`:554-557`).
   - `MediaOptions.forced` is a single-word `readonly` member (`t1-t2.diff:645`).
   - `Voice` rows the diff changed match the throwing site in source: the region-refusal rows (`t1-t2.diff:273-275`) now name `resolveAccessibleWithin`, which is exactly where those three `throw new Error(...)` statements sit (`t1-t2.diff:411-414` region unreachable/ambiguous/unresolved); the traversal-refusal row (`:279`) names `driveTraversal`, matching its throw inside the loop body (unchanged code, now inside the renamed function per `:559-573`); the hold-refusal rows (`:330-331`) name `driveHold`, matching its two throws (`t1-t2.diff:484, 497, 500`).
   - `npm run test:guides` exit 0 (51 passed) is in the gate log (`t1-t2-gates.log.txt`, already-established evidence, not re-run by this lane).

11. **CONFIRMED.** Scope is honest. `t1-t2-audit-evidence.md` § Status lists exactly four modified paths — `guides/test.md`, `src/browser/helpers.ts`, `src/browser/types.ts`, `tests/src/browser/helpers.test.ts` — and no others. `package.json`, `package-lock.json`, `src/core/**`, `src/server/**`, and the vendored policy files appear nowhere in that porcelain output or in `t1-t2.diff`'s file headers (only the same four `diff --git` blocks exist in the diff).

12. **CONFIRMED.** Prose holds. A case-insensitive whole-word sweep of `t1-t2.diff` for `should|simply|easy|just|currently|via|e\.g\.|i\.e\.|etc\.` returned no matches (covers every added/removed line in the guide and the doc blocks, since the diff is the changed-lines superset). A follow-up sweep for a stated count in the added guide/doc-block prose found only pre-existing, unmoved table rows re-emitted by the reflowed table (their text is untouched by this change) and generic singular uses of "one" describing a single shared mechanism (`t1-t2.diff:471, 550`), not a count of a growable population; no violation.

## Findings outside the claims

None found within the reviewed scope (claims 7, 8, 9, 11, 12).

## Attacked-and-held

- Claim 7: attacked by checking whether the marker-construction and marker-restoration lines were touched by the diff (they were not) and whether the new test's index assertion would catch a reordered marker (it would). Held.
- Claim 8: attacked by grepping both named installed declaration files for every one of the five symbol names; both searches returned no files. Held.
- Claim 9: attacked by comparing each doc-block description against its guide `Summary` cell pairwise and by tracing each changed `Voice` row to its actual `throw` site in the diff. Held.
- Claim 11: attacked by checking the porcelain status against every named off-limits path individually. Held.
- Claim 12: attacked by a case-insensitive regex sweep of the full diff text for the banned-term list, and a second sweep for stated counts in added prose. Held.

## Referrals

Claims 1–6 and 10 are judgment claims referred to the subjective and objective lanes, per the dispatch brief's routing (this checker rules only claims 7, 8, 9, 11, 12).

## Terminal line

VERDICT: PASS — claims 7, 8, 9, 11, 12 all CONFIRMED on cited evidence; claims 1–6, 10 UNRESOLVED (referred, not ruled by this lane).
