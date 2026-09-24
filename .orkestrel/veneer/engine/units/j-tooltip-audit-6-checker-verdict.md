# Checker verdict — J-TOOLTIP landing round 6 (Sonnet, agent a88f51f54b9d9edfb, retained verbatim 2026-09-24)

**Checker (Sonnet, read-only)** — J-TOOLTIP landing round 6 audit.

## Claim verdicts

**Claim 1 (merge keeps both sides).** CONFIRMED. `index.ts` order matches (`./Offcanvas.js` then `./sanitizers/NativeSanitizer.js` then `./Tooltip.js`, `src/browser/index.ts:22-26`). The Surface table holds exactly 283 rows (`guides/veneer.md:13-295`), no duplicate names spot-checked, tooltip rows inserted between Offcanvas (210-224) and Popover (244+) in landing order. The barrel's runtime export assertion (`tests/src/browser/index.test.ts:67-201`) lists every name the diff adds. Minus-line sweep of the landing diff found matches only inside the allowed files (`guides/veneer.md`, `Placement.ts`, `helpers.ts` import block, `parsers.ts`, `types.ts`, `helpers.test.ts`) — no reverted `main` line found.

**Claim 2 (`readClosest` routing).** CONFIRMED. `Tooltip.ts:282,595,736` all call `readClosest`; a repository-wide grep for `.closest(` in `Tooltip.ts` found no matches.

**Claim 3 (rebuild's doors, L2).** CONFIRMED. `Tooltip.ts:339-344` reads exactly `const held = this.shown ? true : undefined`, `#holds(change, held)` after dispatch, `const left = this.#discard(false)`, then `if ((held === true && !left) || !this.#holds(change, undefined)) return false`.

**Claim 4 (teardown's token read, L3).** CONFIRMED. `#discard(hiding: boolean)` at `Tooltip.ts:624`; `#conceal` reads `if (!this.#discard(true) || !this.#holds(change, undefined)) return false` at `Tooltip.ts:717`.

**Claim 5 (promotion bound, sentences, construction form).** CONFIRMED for the mechanical clauses: `TooltipInterface.show`'s `@remarks` at `types.ts:1665-1667` states the E18 exclusion ("Bootstrap's `show` also runs again while a change is in flight; this contract resolves false there"); `"hides it despite prevention"` at `guides/veneer.md:2756` and in `TooltipEventMap.hide`'s doc comment (`types.ts:1533`); `"can start another change"` at `types.ts:1869,1875` and `Tooltip.ts:284,549`; both `since` occurrences in the diff are the permitted temporal sense ("moved since"), not the banned causal sense. UNRESOLVED: the departure item's claim about `tooltip.js` ("Bootstrap's `show` method continues its sequence after its `inserted.bs.tooltip` event whatever a listener did," `guides/veneer.md:2824-2825`) is a factual claim about Bootstrap's own source that this lane has no access to verify — refer to the objective lane or a source check.

**Claim 6 (instrument, chains, scope).** CONFIRMED. `j-tooltip-mutations-5.log.txt` shows digest-before equals digest-after (byte-for-byte restore), `GREEN?` rows at 0 failed for all seven files with the exact counts claimed (Tooltip 56, Placement 18, NativeSanitizer 7, helpers 61, validators 28, parsers 24, index 3), and `receipt: restored byte for byte` (line 108). `j-tooltip-acceptance-6.log.txt` shows all eleven steps at `exit=0`. The added-lines sweep found no `any`, unsafe `as Type` assertion (only `as const`), non-null `!`, `@ts-` directive, `eslint-disable`, access modifier, default export, or nested function declaration outside an anonymous callback. `Tooltip.ts:114` holds exactly one class (`export class Tooltip implements TooltipInterface`) plus imports. UNRESOLVED: no independent `j-tooltip-gates-6.log.txt` exists yet in the units directory — the Orchestrator's replay is still in progress per the brief's own note, so the gates-green state rests only on the writer's own chain and is UNRESOLVED until that file lands.

## Checklist

| Item | Status | Evidence |
|---|---|---|
| status lists only owned/off-limits files | met | `j-tooltip-6-status.txt:1-17` matches the report's own listed entries; `Tooltip.ts`/`Placement.ts`/`helpers.ts`/`NativeSanitizer.ts` are absent because `git status` during a merge omits files unchanged relative to the merge result (they exist unmodified in the worktree, confirmed by `Glob`) |
| no `.bs.` wire name outside `constants.ts`/guide prose | met | worktree-wide `.bs.` sweep restricted to diffed files (`Tooltip.ts`) returned no matches; guide hits are all Bootstrap-comparison prose |
| no bare `.closest(` in `Tooltip.ts` | met | grep returned no matches |
| no conflict marker | met | grep over `**/*.{ts,md}` returned no files |
| substitution-table sweep on added prose | met | grep for `should, simply, just, utilize, leverage, in order to, e.g., i.e., etc., allows you to, and/or, please, sanity check, dummy, blacklist, whitelist` against added (`+`) lines in `j-tooltip-6.diff` returned no matches |
| plugin row `shipped` with named Proof | met | `guides/veneer.md:10273` |
| readonly on added interface properties | met | `types.ts:1528-1650`, every property `readonly` |
| one class plus imports in `Tooltip.ts` | met | `Tooltip.ts:114` sole `export class` |

## Referrals

- Claim 5's Bootstrap-source comparison (`inserted.bs.tooltip` sequencing claim) needs a reader with access to Bootstrap's `tooltip.js`, which this lane does not have — route to the objective lane or a source-verification step.
- Whether `held === undefined` with a proceeding rebuild (claim 3's attack: a stale relocated tip left by a stopped show) is the intended undo rule or a hole is a design judgment, not mechanical — refer to the subjective/objective lanes.

## Terminal line

VERDICT: UNRESOLVED (5, 6) — gate independence and one Bootstrap-source clause pending; no claim FAILED.

## The Orchestrator's closure of the two clauses (2026-09-24)

- Claim 6: `j-tooltip-gates-6.log.txt` landed after the checker read (the Orchestrator's run over the merged tree: `check:src:browser`, oxlint, oxfmt, `test:src:browser` 799 passed, `test:guides` 20, `test:policy` 109 and 1 skipped, the three builds, `test:conformance` 26, `test:setup` 318, and the tree-wide `check`, twelve exits at 0). Closed.
- Claim 5: `node_modules/bootstrap/js/src/tooltip.js` in the Veneer checkout triggers `EVENT_INSERTED` at line 212 and continues with `this._popper = this._createPopper(tip)` (line 215) and `tip.classList.add(CLASS_NAME_SHOW)` (line 217) with no read of what a listener did, so the departure sentence holds. Closed.
