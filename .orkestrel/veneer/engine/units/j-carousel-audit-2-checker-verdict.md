# J-CAROUSEL audit round 2 — the checker's verdict (`checker` on Sonnet, native subagent, read-only; 26 tool uses, 185 s; retained verbatim from the subagent's return)

## Checker verdict — J-CAROUSEL round 2 audit

Role and lane: `checker` on Sonnet, reached as a native Claude subagent with `Read`, `Grep`, `Glob`; mechanical conformance only.

### Per-claim verdicts (`j-carousel-audit-claims-2.md`)

1. **Destruction inside the swipe's construction (item A).** UNRESOLVED for the behavioral mechanism (requires reading the runtime construction logic, a judgment/correctness matter for the objective/subjective lanes), but the mechanical pin is CONFIRMED: the red-first case title `destroys the swipe it constructed when a reaction to the swipe token destroys the carousel during its construction` exists verbatim at `tests/src/browser/Carousel.test.ts:1579`, and the mutation log row `a swipe constructed while the carousel was destroyed is kept` reddens it by name, `EXACT`, at `.orkestrel/veneer/engine/units/j-carousel-mutations-2.log.txt:91`.

2. **The slide doors (item B).** Mechanical pins CONFIRMED: all four named case titles resolve verbatim in `Carousel.test.ts` (spot-checked `writes, tests, reads, and matches only the replacing values when every group is replaced` at `Carousel.test.ts:1843`), and their reddening rows (`the dispatch reads no slide count`, `the indicator doors read no indicator`, `the outgoing order token is not read`, `the doors read no membership`) are each `EXACT` in `j-carousel-mutations-2.log.txt:92-95`. The behavioral correctness of `#holds` and door logic is UNRESOLVED (design/correctness judgment, not mechanical).

3. **The timer under standing conditions (item C).** Mechanical pins CONFIRMED (case titles present, rows redden them, `JOINED`/`EXACT` as claimed at `j-carousel-mutations-2.log.txt:96-101`). The claim itself states "the lanes rule on whether `#touched` is the smallest mechanism," which is an explicit judgment referral, not a checker ruling — REFERRED to the subjective/objective lanes.

4. **The restoration order and its bound (item D).** CONFIRMED: case title `restores the items before the swipe token, so a replacement a reaction to the token constructs leaves the original markup after both destructions` at `Carousel.test.ts:1015`; reddening row `the swipe restores before the items` is `EXACT` at `j-carousel-mutations-2.log.txt:102`.

5. **The delegate's carousel route and its lifetime (item E).** CONFIRMED: case title `destroys a carousel it constructed while a reaction to the construction destroyed the delegate, and drives it nowhere` at `Delegate.test.ts:1380`; row `a carousel built while the delegate was destroyed is acquired` is `EXACT` at `j-carousel-mutations-2.log.txt:104`.

6. **The `pointer` key and `CarouselVocabulary` (item F).** CONFIRMED: `CarouselClassMap.pointer` readonly at `types.ts:1986-1987`; `CarouselVocabulary` interface readonly at `types.ts:105-107`; guide § Surface row for `CarouselVocabulary` at diff line 9; reddening row `the swipe writes its default pointer token` is `EXACT` at `j-carousel-mutations-2.log.txt:105`.

7. **Sentences the source makes false (item G).** Prose-parity claim; UNRESOLVED against source rebuild — `test:guides` reports green in `j-carousel-gates-2.log.txt:86-91` (independent Orchestrator run, not the writer's self-report), which mechanically confirms the parity assertions the guide test enforces, but the qualitative accuracy of each rewritten paragraph is a documentation-judgment matter — REFERRED.

8. **Instrument controls and the first run (item H).** CONFIRMED by direct line citation: the first-run log `j-carousel-mutations-1-full.log.txt` has `MISSED` rows at exactly file lines 25, 28, 54, and 69 — line 25 (`a pause during the slide is ignored`, named case renamed from `slide` to `slid` listener, matching the claim), line 28 (`the pointer leaving resumes nothing`), line 54 (`the indicator doors read no item`), line 69 (`the carousel route ignores the position`, `exit=1` with the case unnamed, joined only). This matches the report's row references exactly.

9. **Scope, gates, the instrument, and the added lines.**
   - Status lists only owned files: CONFIRMED — `j-carousel-2-status.txt` lists exactly `guides/veneer.md`, `Carousel.ts` (new), `Delegate.ts`, `Swipe.ts` (new), `constants.ts`, `helpers.ts`, `index.ts`, `parsers.ts`, `types.ts`, `validators.ts`, and the matching test files, and no off-limits file.
   - `types.ts` restoration: UNRESOLVED — the report's SHA-256 claim (`bc6fd488…`) is the writer's own quoted command output; no independent capture of that hash exists in the review evidence supplied.
   - Gates green: CONFIRMED — `j-carousel-gates-2.log.txt` shows `check:src:browser exit=0`, `oxlint exit=0`, `oxfmt` clean, `test:src:browser` 284 passed, `test:guides` 19 passed, `test:policy` 109 passed/1 skipped, three builds green, `test:conformance` 22 passed, `test:setup` 267 passed, tree-wide `check exit=0` (lines 22-586).
   - Instrument 105 rows, receipt: CONFIRMED — `j-carousel-mutations-2.log.txt:114-115` shows matching before/after digests and `receipt: restored byte for byte`.
   - Orchestrator's replay `j-carousel-mutations-2-orchestrator.log.txt`: absent from the supplied evidence, per the brief's own note — UNRESOLVED by design, not FAIL.
   - Added-lines syntax bans: CONFIRMED clean — grep across the diff for `any`, `as ` (assertion), `!.`, `@ts-`, `eslint-disable`, `public `/`protected `/`private `, `.bs.` (outside guide Bootstrap-comparison prose and `constants.ts`), and default export found none; one `as const` in a test fixture (`j-carousel-2.diff:3749`) is a literal-narrowing idiom, not an unsafe type assertion — noted, not a violation.
   - Every invoked element guard reads `isInstance`: CONFIRMED — all eight `isInstance(x, HTMLElement|HTMLInputElement|HTMLTextAreaElement|Element|CustomEvent)` call sites in the diff (lines 500, 1019, 1020, 1050, 1266, 1398, 1779, 1783) satisfy the brief's Element-or-subclass note; `instanceOf` appears only as a `.filter(instanceOf(HTMLElement))` predicate (diff lines 934, 948, 1293), matching the claim.
   - Barrel exports exactly the names `index.test.ts` asserts: CONFIRMED — `src/browser/index.ts` re-exports `Carousel.js` and `Swipe.js`, and both appear in the asserted name list in `index.test.ts:49,57`.
   - No `prove` call was made: CONFIRMED recorded in report deviation 5.

### Checklist

| Item | Met/Not met | Evidence |
|---|---|---|
| Status lists only owned files | Met | `j-carousel-2-status.txt:1-17` matches Subject's file list exactly |
| Case titles present verbatim | Met | spot-checked five titles, all resolve in `Carousel.test.ts`/`Delegate.test.ts` |
| Mutation rows match report, named case, digest receipt | Met | `j-carousel-mutations-2.log.txt:91-105,114-115` |
| No `.bs.` wire name outside `constants.ts`/guide prose | Met | grep found only guide-prose and comparison-table occurrences |
| No banned syntax in added lines | Met | grep across diff found none |
| readonly on added interface members | Met | `types.ts:107,1987` |
| `Carousel.ts` one class plus imports | Met | single `export class Carousel` at diff line 459 |
| Element guards read `isInstance` | Met | all eight sites use `HTMLElement`/subclass or `Element` |
| Barrel exports match `index.test.ts` | Met | `index.ts` re-exports; names present in assertion list |
| Guide § Surface row per barrel export | Met | `CarouselVocabulary` and `CarouselRide` rows present |
| Summary cell equals description paragraph | Met | spot-checked `Swipe` and `CarouselVocabulary` |
| Summary opens third-person `-s` verb, no self-name | Met | "Carries…", "Reports…" |
| § Examples fence imports from `@orkestrel/veneer/browser` | Met | `guides/veneer.md:465` |
| `plugin` row reads `shipped`, Proof `Carousel.test.ts` | Met | `j-carousel-2.diff:374` |
| No banned prose term | Met | grep across added lines found none |
| Shared-file patches name only `types.ts`/`guides/veneer.md`/`ROADMAP.md` | Met | report names no shared-file patch outside those two files |
| No `prove` call, recorded | Met | report deviation 5 |
| Orchestrator's round-2 replay log independent evidence | Not met (by design) | file not supplied to this lane per brief note — UNRESOLVED, not FAIL |
| `types.ts` restoration SHA-256 claim | Not met (self-report only) | report's own quoted hash, no independent capture — UNRESOLVED |

### Referrals

- Claim 1 and claim 2's behavioral correctness (whether `#move`/`#holds` and the destruction-during-construction interleaving actually implement the intended semantics) — judgment for the objective/subjective lanes, not mechanical.
- Claim 3's explicit question, "whether `#touched` is the smallest mechanism… and whether its clearing site can leave it set across a later mouse hover" — the claim itself assigns this to the lanes.
- Claim 7's qualitative prose accuracy beyond the `test:guides` parity gate — documentation-judgment referral.

VERDICT: UNRESOLVED — claims 1 (partial), 3 (partial), 7 (partial), and item 9's `types.ts`-restoration and Orchestrator-replay sub-clauses; every other mechanical clause is CONFIRMED.

---

The Orchestrator's reading of the `types.ts` clause: what the round accepts is the file's content, which the diff `j-carousel-2.diff` shows against `e24e2c3` with only items F and G's hunks (the checker confirms them at `types.ts:105-107` and `:1986-1987`); the restoration's intermediate hash is the writer's process record and carries no acceptance weight. The `as const` in a test fixture (`j-carousel-2.diff:3749`) is carried to the landing round for removal, matching the Dropdown round's ruling that no `as const` remains under `tests/src/browser`.
