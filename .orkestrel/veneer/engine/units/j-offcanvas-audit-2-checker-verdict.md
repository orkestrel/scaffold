# J-OFFCANVAS audit round 2 — the checker lane's verdict (Sonnet, agent a00a35deb29d79339, retained verbatim 2026-09-24)

**Checker lane (Sonnet, native subagent, Read/Grep/Glob only, mechanical conformance).**

## Claim verdicts

1. **The backdrop's removal is a step of the hide (O1).** CONFIRMED. `Backdrop.hide()` fades without removing (no `element.remove()` call in `Backdrop.ts`'s `hide` body per read); `Backdrop.destroy()` removes it (class present at `Backdrop.ts:29`). `Offcanvas.ts` calls `backdrop.destroy()` after the attribute-removal steps (report line 313 pointer; mutation rows "the backdrop removes itself at the end of its fade" and "the hide removes the backdrop before the settle door" both `EXACT`, 1 failed of 43, in `j-offcanvas-mutations-2.log.txt` lines 31-32). Modal.ts absent from the diff (status has no `Modal.ts` row) — off-limits honored.

2. **The interactive backdrop (O2).** CONFIRMED. `IsolationOptions.spare?: readonly HTMLElement[]` at `types.ts:390`; `isInstance` guards at `Isolation.ts:52,68,75,97,104`; mutation rows "the isolation claims a spared element" and "the observer claims a spared insertion" `EXACT` (`j-offcanvas-mutations-2.log.txt` lines 29-30); press-related rows ("the press counts any target containing the backdrop", "the isolation spares no backdrop") `EXACT` (lines 26, 28).

3. **The policy clauses and contract sentences (O3, O4, F1, F2).** CONFIRMED. No `hook` local found (`Grep` for `const hook|hook =` in `Offcanvas.test.ts` returned only unrelated `hooks` recorder variables at lines 390, 684). `IsolationOptions` and `OffcanvasSelectorMap` guide § Surface rows (`guides/veneer.md:82,209`) equal their `types.ts` doc-block descriptions verbatim. `destroy` § Methods row (`guides/veneer.md:433`) reads "removes the backdrop." No `.bs.` wire name found in any `src/browser/*.ts` file (empty grep result), confirming isolation to the guide's Bootstrap-side prose table only. `test:guides` reads 19 passed in `j-offcanvas-gates-2.log.txt:100`.

4. **The missing control and the instrument (O4/O5).** CONFIRMED. Round-2 mutation log has 64 `EXACT`/`JOINED` rows (lines 2-65) plus 7 `GREEN?` rows at 0 failed (lines 66-72, matching the report's per-file counts) and ends `receipt: restored byte for byte` (line 74); digests before/after are identical. The first run's invalid row ("the press counts a target inside the panel", `TypeError: (intermediate value) is not a function`, 25 failed of 43) is verified in `j-offcanvas-mutations-2-first.log.txt:27`, and the rerun's same row is `EXACT`, 1 failed of 43 (`j-offcanvas-mutations-2.log.txt:27`) — the report's account of the fix is corroborated by both retained logs, not merely asserted.

5. **Gates and scope.** CONFIRMED. `j-offcanvas-gates-2.log.txt` shows `check:src:browser exit=0`, `check exit=0`, `oxlint exit=0`, `oxfmt exit=0`, `test:src:browser` 706 passed (23 files), `test:guides` 19 passed, `test:policy` 109 passed/1 skipped, all exit 0. Status (`j-offcanvas-2-status.txt`) lists 16 files; `constants.ts`, `index.ts`, `validators.ts`, `index.test.ts`, `validators.test.ts` are round-1-owned carryovers per the round-1 verdict and this round's brief note ("the status lists the round-1 files plus…"); `Modal.ts` absent — no off-limits file present. No `any`, `as `, non-null `!`, `@ts-`, `eslint-disable`, access modifier, parameter property, or default export found in `Offcanvas.ts`, `Backdrop.ts`, or `Isolation.ts` (targeted greps returned only prose false positives). `Backdrop.ts`, `Isolation.ts`, `Offcanvas.ts` each hold exactly one `export class` (confirmed by grep). Report line 5 records no `prove` call.

## Checklist

| Item | Status | Evidence |
|---|---|---|
| Status lists only owned files, no off-limits | Met | `j-offcanvas-2-status.txt` vs. brief scope + round-1 verdict carryover note |
| Test case titles present verbatim | Met | Grep hits for all named cases in `Offcanvas.test.ts`, `Isolation.test.ts` |
| Mutation rows match instrument log with named case/count, digest receipt at end | Met | `j-offcanvas-mutations-2.log.txt` lines 2-74 |
| No `.bs.` wire name outside `constants.ts`/guide prose | Met | Empty grep across `src/browser/*.ts` |
| No forbidden syntax in added lines | Met | Targeted greps, no genuine hits |
| Every added interface property/return readonly | Met | `types.ts:390` `readonly spare?` |
| `Offcanvas.ts` one class plus imports | Met | `Offcanvas.ts:86` single `export class` |
| Element guards read `isInstance(x, HTMLElement)` | Met | `Isolation.ts:52,68,75,97,104`, `Offcanvas.ts:111` |
| Barrel exports match `index.test.ts` | Met | `index.ts:24`, `index.test.ts:114` |
| Guide § Surface one row per export | Met | `IsolationOptions`, `OffcanvasSelectorMap` rows present |
| Summary cells equal description paragraphs | Met | `types.ts` diff vs. `guides/veneer.md:82,209` |
| Fence imports from `@orkestrel/veneer/browser` | Met | `guides/veneer.md:689` |
| `plugin` row `shipped`, Proof `Offcanvas.test.ts` | Met | `guides/veneer.md:9412` |
| No banned substitution terms in added prose | Met | Case-insensitive sweep of `guides/veneer.md` and touched `src/browser/*.ts` for the full unconditional-ban row set (`simply`, `easy`, `just`, `currently`, `utilize`, `leverage`, `via`, `in order to`, `e.g.`, `i.e.`, `etc.`, `performant`, `robust`, `allows you to`, `and/or`, `please`, `sanity check`, `dummy`, `blacklist`, `whitelist`, `master`, `slave`) — no matches |
| Shared-file patches name only `types.ts`/`guides/veneer.md`/`ROADMAP.md` | Met | Report carries no separate shared-file patch section; all edits are direct owned edits |
| Report records no `prove` call | Met | `j-offcanvas-report-2.md:5` |

## Referrals

None. Every item above resolved on direct evidence; no judgment call required within this lane's mechanical scope.

VERDICT: PASS
