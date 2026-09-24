# J-CAROUSEL audit round 1 — the checker's verdict (`checker` on Sonnet, native subagent, read-only; 29 tool uses, 134 s; retained verbatim from the subagent's return)

**Role and lane:** `checker` on Sonnet, native Claude subagent with `Read`/`Grep`/`Glob`, mechanical conformance only.

## Claim verdicts

**1. Construction, options, and lifetime** — UNRESOLVED. The report's narrative and mutation rows (EXACT for `refuses an invalid host and a second owner…`, `destroys the carousel when its signal aborts…`, `starts at construction for a load ride…`, `arms no swipe… when touch is off`) corroborate the mechanical shape, but confirming the full construction sequence (claim owner, hooks binding order, `resolveVocabulary`/`resolveOptions` call shape) as true requires reading the entire `#constructor` body line by line against the claim's prose, which is a correctness/parity judgment beyond scope-mechanical grep. Referred to the objective lane.

**2. The slide sequence and its doors** — UNRESOLVED (objective-lane subject; the door sequencing and reaction-cases require behavioral tracing, not mechanical grep).

**3. The timer, hover, keys, touch** — UNRESOLVED (same: behavioral tracing required; mechanical case-title presence confirmed below in the checklist).

**4. Destruction and restoration** — UNRESOLVED (behavioral).

**5. The delegate's carousel route, scan, and E12** — UNRESOLVED (behavioral/E12 conformance is a design-fit question).

**6. The guard, the tables, the parser, the helper, and the barrel** — CONFIRMED for the mechanical sub-parts: `CAROUSEL_EVENTS`, `CAROUSEL_CLASSES`, `CAROUSEL_ATTRIBUTES`, `CAROUSEL_SELECTORS`, `CAROUSEL_DEFAULTS`, `CAROUSEL_TOUCH_DELAY`, `SWIPE_CLASSES`, `SWIPE_DEFAULTS` are each `Object.freeze` or numeric-literal-frozen at `src/browser/constants.ts:75-133` (read directly), values match the claim's table (`interval:5000`, `keyboard/touch/wrap:true`, `pause:true`, `threshold:40`, `pointer:'pointer-event'`). Barrel exports at `src/browser/index.ts:11-12` (`export * from './Swipe.js'`, `export * from './Carousel.js'`). Guard logic itself (`isCarouselEvent`, `parseRide`, `matchesReducedMotion` semantics) UNRESOLVED — behavioral.

**7. The guide and the returned patches** — CONFIRMED that the patches are unapplied (`types.ts` absent from `j-carousel.diff`; guide-methods patch is a separate unapplied file). UNRESOLVED whether the patched sentences would in fact close every remaining false statement — that is a parity-correctness judgment, referred to the subjective/documentation lane.

**8. Scope, gates, and the added lines** — CONFIRMED.
- Status lists exactly the twelve modified and four new files the report and claim name, no off-limits file: `j-carousel-status.txt:1-16` and `j-carousel-gates.log.txt:3-18` both list `guides/veneer.md`, `src/browser/Delegate.ts`, `constants.ts`, `helpers.ts`, `index.ts`, `parsers.ts`, `validators.ts`, `tests/src/browser/Delegate.test.ts`, `helpers.test.ts`, `index.test.ts`, `parsers.test.ts`, `validators.test.ts` (modified) plus `src/browser/Carousel.ts`, `Swipe.ts`, `tests/src/browser/Carousel.test.ts`, `Swipe.test.ts` (new); no `types.ts`, `HostSnapshot.ts`, `Button.ts`, `Collapse.ts`, `tests/setupBrowser.ts`, or `ROADMAP.md` present.
- Gates: `j-carousel-gates.log.txt` shows `check:src:browser exit=0` (line 21), `oxlint exit=0` (24), `oxfmt exit=0` (31, "All matched files use the correct format"), `test:src:browser exit=0` with `Test Files 12 passed (12)` / `Tests 270 passed (270)` (71-76), `test:guides exit=0` 19/19 (84-89), `test:policy exit=0` 109 passed|1 skipped (97-102), three builds exit=0 (124, 136, 149), `test:conformance exit=0` 22/22 (157-162), `test:setup exit=0` 267/267 (195-200), tree-wide `check exit=0` (580). All independent-Orchestrator evidence, not writer self-report.
- Mutation instrument: `j-carousel-mutations.log.txt` has 89 mutation rows (lines 2-90) each `EXACT` or `JOINED`, seven `GREEN?` rows at `0 failed` (91-97), digest before/after identical, `receipt: restored byte for byte` (99). Sampled case titles resolve verbatim in the worktree's test files (confirmed by grep against `Carousel.test.ts` and `Swipe.test.ts`).
- Added lines: grep across `Carousel.ts` and `Swipe.ts` for `any`, `as `, non-null `!`, `@ts-`, `eslint-disable`, access modifiers, default export found no code hits (only English-prose false positives in comments, e.g. "as an `AppError`", "at once"). `.bs.` wire name grep in `src/browser` returned no matches — confirmed no `.bs.` wire name outside `constants.ts`'s Bootstrap-spelled attribute default values and guide prose.
- Element guards: `isInstance(host, HTMLElement)` at `Carousel.ts:100`, `Swipe.ts:47`; `isInstance(event.target, HTMLInputElement|HTMLTextAreaElement)` at `Carousel.ts:532-533`; `isInstance(event.target, Element)` at `Carousel.ts:559`. `instanceOf(HTMLElement)` used only as a `.filter()` predicate at `Carousel.ts:459,473`, matching the report's own standing-condition claim (point 8) rather than contradicting the mechanical clause.
- Report records no `prove` call, with reason given (`j-carousel-report.md:43`).

## Checklist (items beyond the numbered claims)

| Item | Met/Not met | Evidence |
|---|---|---|
| Status lists only owned files, no off-limits file | Met | `j-carousel-status.txt` and `j-carousel-gates.log.txt` file lists, both match the report's "Files touched" list exactly |
| Every case title the report names appears verbatim in worktree test files | Met (sampled) | Grep hits at `Carousel.test.ts:109,288,493,624,1017` and `Swipe.test.ts:12,19,38,54,94,124` |
| Every mutation row matches instrument log, ends with digest receipt | Met | `j-carousel-mutations.log.txt:1,98,99` — digest before/after identical, receipt line present; 89 rows (lines 2-90) + 7 GREEN rows (91-97) matches the report's "89 mutations… seven GREEN? rows" |
| No `.bs.` wire name outside `constants.ts` and guide prose | Met | Grep for `\.bs\.` in `src/browser` returned no matches |
| No forbidden syntax in added lines | Met | Grep for `any`/`as `/`!`/`@ts-`/`eslint-disable`/access modifiers/default export in `Carousel.ts`, `Swipe.ts` returned no code hits |
| `Carousel.ts` and `Swipe.ts` each one class plus imports | Met | Import blocks then single `export class` at `Carousel.ts:1-70`, `Swipe.ts:1-28` |
| Element guards read `isInstance` | Met | See claim 8 evidence; `instanceOf` used only as filter, matching report's own stated exception |
| Barrel exports match `index.test.ts` assertions | Met | `index.ts:11-12` exports `Swipe`/`Carousel.js`; `index.test.ts:38,46` list `'Carousel'`, `'Swipe'` in the asserted array |
| Plugin row reads `shipped` with named Proof | Met | `guides/veneer.md:6037` |
| No unconditional-substitution-table term in added prose | Met | Grep of `j-carousel.diff` added (`^+`) lines for unconditionally-banned terms (`simply`, `easy`, `just`, `utilize`, `leverage`, ` via `, `in order to`, `e.g.`, `i.e.`, `etc.`, `performant`, `robust`, `allows you to`, `and/or`, `please`, `sanity check`, `dummy`, `blacklist`/`whitelist`, `should`) returned no unconditional-ban hits — only judged-sense rows (`once`, `above`, `below`) matched, which `writing.md` § Substitutions explicitly excludes from the unconditional set |
| Shared-file patches name only `types.ts`/`guides/veneer.md`/`ROADMAP.md` | Met | `j-carousel-report.md:84-92` — `types.ts`, guide Methods rows, `ROADMAP.md` ("no change needed") |
| Report records no `prove` call | Met | `j-carousel-report.md:43` |

## Referrals

- Claims 1-5 and 7's behavioral/correctness content (slide sequencing, doors, delegate route conformance to Bootstrap and E12, whether the returned `types.ts` patch text is itself accurate) require tracing execution logic and comparing prose-to-behavior — judgment beyond mechanical scope. Referred to the objective (`analyst`) and subjective (`reviewer`) lanes running this round.
- Whether deviations D1-D5 (swipe-token timing, interaction-ride ownership, the missing `pointer` vocabulary key, the inline delegate type, the extra exports) are the correct design choices is explicitly named in the claims file as still open — referred to the design-fit lane, per the claims file's own framing.

VERDICT: FAILED CLAIMS: NONE (claims 1-5, 7 UNRESOLVED pending objective/subjective lane; all mechanical clauses and checklist items CONFIRMED/Met)
