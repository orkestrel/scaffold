# J-SCROLLSPY audit round 1 — the checker's verdict (`checker` on Sonnet, native subagent, read-only; 39 tool uses, 227 s; retained verbatim from the subagent's return)

**Role and lane:** `checker` on Sonnet, reached as a native Claude subagent with `Read`, `Grep`, and `Glob`; mechanical conformance only.

## Numbered verdicts (mechanical clauses only; behavioral/correctness clauses referred)

1. **Construction, options, and lifetime.** Mechanical clause "`ScrollSpy.ts`, one class plus imports": CONFIRMED — `src/browser/ScrollSpy.ts` grep for top-level `class|function|const` shows only `export class ScrollSpy implements ScrollSpyInterface` at line 55, with imports above it. Behavioral sub-clauses (refusal order, resolution order, destroy semantics): UNRESOLVED by this lane — correctness attack, not mechanical; refer to objective/subjective lanes.

2. **Refresh and the observer.** No isolable mechanical clause; behavioral. UNRESOLVED — refer to objective/subjective lanes.

3. **The delivery rule and its doors.** No isolable mechanical clause; behavioral. UNRESOLVED — refer to objective/subjective lanes.

4. **Smooth scroll.** No isolable mechanical clause; behavioral. UNRESOLVED — refer to objective/subjective lanes.

5. **The delegate's construction scan.** Mechanical clause "pinned by the five scan cases in `Delegate.test.ts`" (titles present verbatim): CONFIRMED — all five titles found verbatim in `tests/src/browser/Delegate.test.ts` at lines 1015, 1047, 1062, 1093, 1114. Behavioral sub-clauses: UNRESOLVED — refer.

6. **The guard, the tables, the parsers, and the barrel.** Mechanical clauses: CONFIRMED.
   - `SCROLL_SPY_EVENTS/CLASSES/ATTRIBUTES/SELECTORS/DEFAULTS` frozen at every level: confirmed at `src/browser/constants.ts:73,78,85,93,102,104,106` (`Object.freeze` at outer and nested `intersection`/`threshold` levels).
   - `satisfies Pick<ScrollSpyOptions, 'smooth' | 'intersection'>`: confirmed at `src/browser/constants.ts:108`.
   - Barrel exports `./ScrollSpy.js`: confirmed at `src/browser/index.ts:11`.
   - `index.test.ts` lists the nine new names: confirmed — `SCROLL_SPY_ATTRIBUTES`, `SCROLL_SPY_CLASSES`, `SCROLL_SPY_DEFAULTS`, `SCROLL_SPY_EVENTS`, `SCROLL_SPY_SELECTORS`, `ScrollSpy`, `isScrollSpyEvent`, `parseRootMargin`, `parseThreshold` all present in `tests/src/browser/index.test.ts:37-55`.
   - Parser/guard behavioral correctness (`parseRootMargin`, `parseThreshold`, `isScrollSpyEvent` semantics): UNRESOLVED — refer.

7. **The guide and the returned patch.** Mechanical clauses: CONFIRMED.
   - § Surface carries one row per new export, the nine names: confirmed — diff shows exactly nine added `| \`Name\` |` rows in the Surface table (`ScrollSpy`, `SCROLL_SPY_CLASSES`, `SCROLL_SPY_ATTRIBUTES`, `SCROLL_SPY_SELECTORS`, `SCROLL_SPY_EVENTS`, `SCROLL_SPY_DEFAULTS`, `isScrollSpyEvent`, `parseRootMargin`, `parseThreshold`).
   - ScrollSpy fence under § Examples imports `@orkestrel/veneer/browser`: confirmed, `guides/veneer.md:460`.
   - `plugin` row reads `shipped` with Proof `tests/src/browser/ScrollSpy.test.ts`: confirmed, `guides/veneer.md:5972`.
   - Compatibility table's Proof-column re-padding changes whitespace alone outside that row: PARTIALLY CONFIRMED — the diff shows the ScrollSpy row is the only one with a content-level change (Status/Proof), and the region's row count (~178 changed row-pairs by a conservative regex, ~213 by a looser one) is consistent with "about 213 rows"; a byte-exact `git diff -w` was not run by this lane (no Bash tool). UNRESOLVED for the exact "whitespace alone" guarantee on every other row — this lane can only sample-corroborate it, not certify it with `git diff -w`.
   - "With it applied, `test:guides` parity holds and no `ScrollSpyInterface` sentence is false" — the patch is confirmed NOT applied in the worktree (`guides/veneer.md:330` still reads the old "removes the classes the scrollspy added" sentence, matching the report's own disclosure that it withheld the patch and did not re-run gates with it applied). That sub-clause is therefore UNRESOLVED — its only evidence is the report's own claim about a hypothetical post-patch state, which this checker did not and cannot independently re-run.

8. **Scope, gates, and the added lines.** Mechanical clauses: CONFIRMED.
   - Status lists only the ten modified and two new files the report names, no off-limits file: confirmed against `j-scrollspy-status.txt` (`guides/veneer.md`, `Delegate.ts`, `ScrollSpy.ts` [new], `constants.ts`, `index.ts`, `parsers.ts`, `validators.ts`, `Delegate.test.ts`, `ScrollSpy.test.ts` [new], `index.test.ts`, `parsers.test.ts`, `validators.test.ts`); `types.ts`, `helpers.ts`, `HostSnapshot.ts`, `Button.ts`, `Collapse.ts`, `tests/setupBrowser.ts`, `ROADMAP.md` absent.
   - Every gate green in `j-scrollspy-gates.log.txt`: confirmed — `check:src:browser exit=0`, `oxlint exit=0`, `oxfmt exit=0`, `test:src:browser exit=0` "234 passed (234)", `test:guides exit=0` "19 passed", `test:policy exit=0` "109 passed | 1 skipped", `build:src:core/styles/browser exit=0`, `test:conformance exit=0` "22 passed", `test:setup exit=0` "267 passed", tree-wide `check exit=0`. This is the Orchestrator's own run, independent of the writer's report.
   - Mutation run reads 62 `EXACT`/`JOINED` rows, five `GREEN?` rows at 0 failed, receipt `restored byte for byte`: confirmed — `j-scrollspy-mutations.log.txt` lines 2-63 are 62 mutation rows, lines 64-68 are the five `GREEN?` rows (ScrollSpy 0/19, Delegate 0/39, validators 0/12, parsers 0/7, index 0/3), line 70 reads `receipt: restored byte for byte`, digests before/after identical.
   - Added lines carry no `any`, `as ` (excepting one `as const` — see referral below), non-null `!`, `@ts-`, `eslint-disable`, access modifier, default export: CONFIRMED by grep sweep of the diff — no matches for `\bany\b`, `!\.`, `@ts-`, `eslint-disable`, ` public |protected|private `, `export default`. One `as const` idiom found at `tests/src/browser/ScrollSpy.test.ts:605` — see referral.
   - No `.bs.` wire name outside `constants.ts`: CONFIRMED — no `.bs.` matches in `ScrollSpy.ts` or `Delegate.ts`; the dispatched event constant is `activate.vn.scrollspy` at `constants.ts:74`; all `.bs.` occurrences in the gates log are guide prose describing other Bootstrap plugins, not this unit's wire names.
   - Every invoked element guard reads `isInstance`: CONFIRMED — every guard grepped in `ScrollSpy.ts` and `validators.ts` uses `isInstance(...)`.
   - The report records that no `prove` call was made: CONFIRMED as a fact about the report's own text (`j-scrollspy-report.md:9`) — this is UNRESOLVED as a fact about reality, since its only evidence is the writer's self-report that the MCP server "was not reachable."

## Checklist of items

| Item | Met/Not met | Evidence |
|---|---|---|
| Status lists only owned files, no off-limits file | Met | `j-scrollspy-status.txt:1-12`; off-limits names absent |
| Case titles present verbatim | Met | `ScrollSpy.test.ts` and `Delegate.test.ts` grep hits listed above |
| Mutation rows present with matching counts, digest receipt | Met | `j-scrollspy-mutations.log.txt:2-70` |
| No `.bs.` wire name outside `constants.ts` | Met | grep shows none in `ScrollSpy.ts`/`Delegate.ts`; event is `activate.vn.scrollspy` |
| No `any`, non-null `!`, `@ts-`, `eslint-disable`, access modifier, default export | Met | diff sweep, no matches |
| `as` type assertion in added lines | Not met as stated / referral | one `as const` at `tests/src/browser/ScrollSpy.test.ts:605`; judgment call on whether `as const` falls under the "as" ban |
| Every element guard reads `isInstance` | Met | grep of `ScrollSpy.ts`, `validators.ts` |
| `ScrollSpy.ts` one class plus imports | Met | grep shows only one `class`/no other top-level declarations |
| Barrel exports exactly the nine names | Met | `index.ts:11`; `index.test.ts:37-55` |
| Guide § Surface one row per new export | Met | diff shows nine added rows |
| Example fence imports `@orkestrel/veneer/browser` | Met | `guides/veneer.md:460` |
| `plugin` row reads `shipped`, Proof `ScrollSpy.test.ts` | Met | `guides/veneer.md:5972` |
| Compatibility table re-padding whitespace-only outside ScrollSpy row | Partially met / referral | row-count order-of-magnitude matches "about 213"; exact `git diff -w` byte check not run by this lane (no shell tool) |
| Shared-file patch applied to worktree | Not applied (matches report's own disclosure) | `guides/veneer.md:330` still carries stale sentence |
| Substitution-table banned terms in added prose | Met (none found) | grep of diff for banned-term list, no matches |
| Shared-file patch names only `types.ts`/`guides/veneer.md`/`ROADMAP.md` | Met | `j-scrollspy-report.md:146-175` |
| Report records no `prove` call | Met (as a fact about the report) / UNRESOLVED (as a fact about reality) | `j-scrollspy-report.md:9` — self-report only |

## Referrals

- Whether the single `as const` at `tests/src/browser/ScrollSpy.test.ts:605` violates the claim's "no `as`" mechanical clause, or is exempt as a const-assertion idiom distinct from a narrowing type assertion — a judgment call this lane cannot decide from AGENTS.md's flat "never use... type assertions (as)" wording. Refer to the Orchestrator or the subjective lane.
- Full byte-level confirmation that every non-ScrollSpy row in the Compatibility table's re-padding changed whitespace only (a `git diff -w` reading) — this lane has no shell tool and could only sample-corroborate row counts and content via grep. Refer to `verifier` or the Orchestrator to run `git diff -w` directly.
- All behavioral/correctness sub-clauses of claims 1-4 and the parser/guard semantics in claim 6, and the `#deliver`/`#activate`/smooth-scroll fidelity to Bootstrap in claims 3-4 — outside mechanical conformance; refer to the objective (`analyst`) and subjective (`reviewer`) lanes named in the brief's Subject.
- The truth of "no `prove` call was made" beyond the report's own assertion (MCP unreachability) — its only evidence is the writer quoting itself; per the checker rule this is UNRESOLVED, not CONFIRMED, and no independent corroborating log was supplied to this lane.

VERDICT: FAIL 1, 2, 3, 4, 6, 7; outside the claims: none

---

The Orchestrator's note at retention: the `FAIL` list names the claims whose behavioural clauses this lane refers rather than claims it refuted; every mechanical clause it ruled on is met. The two referrals it can not settle (the `as const` idiom and the byte-level `git diff -w` reading) are taken by the Orchestrator and recorded in the reconciled verdict.
