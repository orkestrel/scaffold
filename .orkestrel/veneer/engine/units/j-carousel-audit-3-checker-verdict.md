# J-CAROUSEL audit round 3 — the checker's verdict (`checker` on Sonnet, native subagent, read-only; 41 tool uses, 153 s; retained verbatim from the subagent's return)

**checker on Sonnet — mechanical conformance lane, J-CAROUSEL round 3 audit.**

## Verdicts on numbered claims (mechanical clauses)

1. **CONFIRMED.** `Carousel.ts:698-701` (`#move`) reads `#pauses` (`const pauses = this.#pauses`) before `emitEvent(this.#host, CAROUSEL_EVENTS.slide, ...)` dispatches. The report cites the red-first case with `expected 2 to be 1` in `j-carousel-red-3.log.txt`, which I did not independently re-run (the run itself is UNRESOLVED — see below), but the mutation-row evidence in `j-carousel-mutations-3.log.txt:107` (`EXACT exit=1 | the pause tally is read after the dispatch | ... | 1 failed of 57 | named: ['keeps a pause a slide listener made under an interaction ride']`) independently corroborates the row reddens the named case by name.

2. **CONFIRMED.** `Carousel.ts:581-585` registers `pointerup`, `pointermove`, `pointerdown` only when `touch && pause`; `#notice` and the `:hover` disarm exist as described (verified by file read of the constructor block). Mutation rows `j-carousel-mutations-3.log.txt:108-109` corroborate both named rows redden the named case `EXACT`.

3. **CONFIRMED.** `j-carousel-3.diff:164-190` (guide `#### Carousel` timer paragraph) and lines 297-307 (delegate paragraph) match the report's before/after text verbatim; both rules appear in `Carousel.ts`'s class remark (lines 452-457) and field comments (`#pauses` comment ~line 487-489, `#touched` comment ~line 496-499). `test:guides` exit=0 in `j-carousel-gates-3.log.txt:89`.

4. **CONFIRMED.** `tests/src/browser/Carousel.test.ts:2017` declares `const refusals: ReadonlyArray<readonly [string, string]>`; grep for `as const` under `tests/src/browser` returns no files.

5. **CONFIRMED except one clause, UNRESOLVED.** `j-carousel-mutations-3.log.txt` grep confirms exactly 69 `EXACT` rows, 39 `JOINED` rows (108 total), seven `GREEN?` rows all `0 failed` (Carousel 57, Swipe 6, Delegate 47, validators 12, parsers 5, helpers 32, index 3), and `receipt: restored byte for byte` at line 118. The two new named rows for claim 1 and 2's two rows are present (lines 107-109). The clause naming the Orchestrator's replay `j-carousel-mutations-3-orchestrator.log.txt` is **UNRESOLVED**: that file is absent from the units directory (confirmed by directory grep), consistent with the brief's note that it is absent by design while the lanes read.

6. **CONFIRMED, with one finding.** Status (`j-carousel-3-status.txt`) lists exactly the round-2 files plus the round-3 owned set (`Carousel.ts`, `Carousel.test.ts`, `guides/veneer.md`), no off-limits file. All named gates exit 0 in `j-carousel-gates-3.log.txt` (`check:src:browser` 22, oxlint 25, oxfmt 32, `test:src:browser` 286 passed at line 72, `test:guides` 19 passed, `test:policy` 109 passed/1 skipped, the three builds, `test:conformance` 22 passed, `test:setup` 267 passed, tree-wide `check` exit=0 at line 585). The bs-wire-grep in the gate log (lines 202-209) shows every `.bs.` hit confined to `guides/veneer.md` Bootstrap-comparison prose rows, none in code. No `any`, `as` (operator), `!.`, `@ts-`, `eslint-disable`, access modifiers, default export found in `Carousel.ts` (grep matches were only the English word "as" in prose comments). Every invoked element guard reads `isInstance(x, HTMLElement|Element|HTMLInputElement|HTMLTextAreaElement)` — a subclass of `Element`, satisfying the brief's guard note. The report records no `prove` call was made, but that claim rests only on the report itself, so it is **UNRESOLVED**, not confirmed.
   - **Finding (not part of the numbered claims but a mechanical writing.md hit):** `tests/src/browser/Carousel.test.ts:655` — the added case title "skips a tick while the host is not rendered, and cycles again once it is" uses `once` in its temporal sense ("after it is [rendered]"), which `.claude/rules/writing.md` § Substitutions bans unconditionally in that sense. Re-dispatch: rewrite the title to use `after` in place of the temporal `once`.

## Checklist

| Item | Met | Evidence |
|---|---|---|
| Status lists only owned files, no off-limits file | Met | `j-carousel-3-status.txt` lines 1-17 match `j-carousel-report-3.md` lines 68-84 exactly |
| Every case title in report appears verbatim in worktree test files | Met | Grep confirmed the item-A/B titles and the item-D fixture verbatim in `Carousel.test.ts` |
| Mutation rows match instrument log with named case, digest receipt | Met | `j-carousel-mutations-3.log.txt:107-118` |
| No `.bs.` wire name dispatched/listened outside `constants.ts`/guide prose | Met | gate log bs-wire-grep, lines 202-209, all hits in guide comparison rows |
| Added lines free of `any`/`as`/`!`/`@ts-`/`eslint-disable`/access modifiers/default export/nested function | Met | grep of `Carousel.ts`; all `as`/`once`/`now` hits are English prose, not syntax |
| Every added interface property/public return collection readonly | Met | `types.ts:1945-2046`, `520-538` |
| `Carousel.ts` holds one class plus imports | Met | single `export class Carousel` at line 80, only imports before it |
| Every added `isInstance` guard reads `Element` or subclass | Met | `Carousel.ts:123,653-654,684` |
| Barrel exports exactly the names `index.test.ts` asserts | Met (sampled) | `index.ts:1-13`; `index.test.ts` lists `Carousel`, `Swipe`, `SWIPE_CLASSES`, `SWIPE_DEFAULTS`, `isCarouselEvent` matching guide rows |
| Guide § Surface has one row per barrel export | Met (sampled) | Diff rows for `Carousel`, `Swipe`, `SWIPE_CLASSES`, `SWIPE_DEFAULTS`, `CarouselVocabulary`, `matchesReducedMotion`, `isCarouselEvent`, constants all present |
| `plugin` row reads `shipped` with Proof `Carousel.test.ts` | Met | `j-carousel-3.diff:378` |
| No banned substitution term in added prose | **Not met** | `Carousel.test.ts:655` temporal `once`; swept pattern list in AGENTS.md/writing.md Substitutions table against all `+` lines of `j-carousel-3.diff` |
| Shared-file patches name only `types.ts`/`guides/veneer.md`/`ROADMAP.md` | UNRESOLVED | Report states no deviations/patches were returned (report-only evidence, no independent corroboration found) |
| Report records no `prove` call | UNRESOLVED | Only the report attests this (`j-carousel-report-3.md:91`) |

## Referrals

- None. The temporal-`once` finding is mechanical (a fixed substitution-table sense), not a judgment call.

VERDICT: FAIL — claim 6 and the banned-term check on `tests/src/browser/Carousel.test.ts:655`

---

The Orchestrator's readings: the temporal `once` in the case title "skips a tick while the host is not rendered, and cycles again once it is" (a round-1 title the round-3 diff carries against `e24e2c3`) is a mechanical writing-rule hit and is carried to the landing round as a title rename, with every other temporal `once` the Orchestrator's own sweep of the unit's tests, sources, and guide lines finds (recorded in the round-3 verdict); the `prove` clause is the writer's self-report and is accepted as such; the replay runs on the landing round's instrument before the fast-forward.
