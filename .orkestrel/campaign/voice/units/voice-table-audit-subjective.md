# Audit lane output — voice-table, subjective lane (FAIL 1, 2, 3)

## Verdicts

Lane held: SUBJECTIVE (voice, wording, meaning kept, guide voice), per the dispatch. Sol dark; the objective lane did not run, so every referral below is addressed to the Orchestrator.

Claim 1 — every rewritten first sentence keeps the meaning of the sentence it replaced: BROKEN.

I read every hunk in `/home/user/scaffold/tmp/units/voice/voice-table.diff` (both pages) and checked each against the tree. One rewrite changes the action:

- `/home/user/fleet/table/src/core/types.ts:789` — `resize(limit?)` on `PaginationManagerInterface` now reads "Says how many rows a page holds." The replaced sentence, "Say how many rows a page holds.", was an imperative addressed to the caller: the caller tells the table its page size. Converting the verb to third person moves the actor to the method, so the sentence now claims `resize` reports the page size. `resize` sets it. The package's own implementation doc contradicts the interface: `/home/user/fleet/table/src/core/tables/PaginationManager.ts:77` reads "Changes the page size while keeping the first row previously shown." The guide corroborates the original sense — `/home/user/fleet/table/guides/table.md:1289` gives `resize` as "Say how many rows a page holds, keeping the first row the view was showing." Why it matters: a reader of the public interface meets a mutator documented as a query, on the one member of `PaginationManagerInterface` that changes state through an argument. What right looks like: "Sets how many rows a page holds." (or "Sets the number of rows one page holds.") at `types.ts:789`, keeping the `@remarks` and `@param` untouched.

Every other rewritten first sentence keeps its action, subject, and qualifiers. Referent chains survive: `types.ts:826-836` still resolves "them" and "the ones" to "the rows" named one line earlier, and `/home/user/fleet/table/src/core/tables/KeyManager.ts:5` keeps "it" attached to "one table axis". No quantifier was added and no possessive moved.

Claim 2 — every rewritten first sentence opens with a third-person `-s` verb that fits the symbol and never repeats the symbol's name: BROKEN.

Every doc block in `src/` now opens with an `-s` verb (single-line blocks enumerated across all sixteen files; multi-line openers in `helpers.ts:36-513` and `types.ts`). One verb misdescribes its symbol:

- `/home/user/fleet/table/src/core/types.ts:776` — "Counts the rows a page holds, or `undefined` when the table is not paged." on `readonly limit: number | undefined`. `limit` is the page size a host sets through `resize`; it counts nothing, and the last page holds fewer rows than `limit` whenever the rows do not divide evenly, so "Counts the rows a page holds" states something the value does not report. The verb also cannot govern the alternative: "Counts …, or `undefined`" does not parse, whereas the sibling one line earlier does — `types.ts:774` reads "Holds the page the view shows, counted from one, and `1` when the table is not paged." The class-side getter already carries the right wording at `PaginationManager.ts:51`, "Returns the number of rows one page holds." What right looks like: "Holds the number of rows one page shows, or `undefined` when the table is not paged." at `types.ts:776`.

Lesser instances of the same `Counts` decision, recommended rather than required: `types.ts:778` doubles the root — "Counts the rows the view skips before the page it shows, counted from zero" — and reads better as "Holds the number of rows the view skips before the page it shows, counted from zero."; `types.ts:780` and `types.ts:845` are defensible because both values are genuinely derived by counting.

No rewritten sentence repeats its own symbol's name. `isTableError` at `/home/user/fleet/table/src/core/errors.ts:31` and the guards in `validators.ts` name the type they narrow, which is the content a guard's first sentence owes; that is not the banned repetition.

Claim 3 — every rewritten boolean `@returns` reads `True if …; false otherwise` with the original condition kept: BROKEN.

Every boolean `@returns` in `src/` is in the required form (verified across `errors.ts`, `helpers.ts`, `validators.ts`, and `types.ts`). One rewrite did not keep the original condition:

- `/home/user/fleet/table/src/core/types.ts:305` — `CellMatcher` now reads "@returns True if the row is kept; false otherwise." The replaced line was "@returns `true` to keep the row." That line told the callback's author what returning `true` causes; the rewrite turns the return into a passive report of an outcome the callback itself decides, so the sentence is circular and the developer implementing a `CellMatcher` can no longer read which way to return. The condition was not kept — it was invented. The package already holds the right term for this test: `/home/user/fleet/table/src/core/helpers.ts:239` documents the built-in equivalent as "True if the filter accepts the cell; false otherwise." What right looks like: "@returns True if the filter accepts the cell; false otherwise." at `types.ts:305`, which keeps the rule's form, names the actor, and matches the vocabulary the package uses for the same concept.

Every other boolean `@returns` keeps its condition intact, including the concessive forms at `types.ts:659` and `types.ts:727`.

Claim 4 — no already-conforming first sentence was rewritten, and the diff touches no `@example`, `@param`, `@remarks`, `@throws`, or later sentence: CONFIRMED, with one qualification.

No removed line in the diff opens with a third-person `-s` verb (pattern `^-\s*(\*|/\*\*)\s+[A-Z][a-z]+(s|es) ` over the diff returns nothing), and the blocks that already conformed are untouched in the tree: `helpers.ts:90`, `helpers.ts:113`, `helpers.ts:128`, and `KeyManager.ts:46` still carry their original third-person sentences and appear in no hunk. No `@param`, `@remarks`, `@throws`, `@example`, or `@deprecated` tag line is added or removed (pattern `^[+-].*@(param|remarks|throws|example|deprecated)` returns nothing). Every added and removed line begins with whitespace then `*` or `/**`, so no code token moved.

Qualification: several `@returns` blocks re-wrapped because the third-person first clause is longer than the `` `true` when … `` form it replaced, so a following sentence's words crossed a line break — for example `types.ts:481-482`, where "Every key is checked before any row goes, so one unknown key leaves the whole call undone." is word-identical but re-flowed. No later sentence's wording changed, which is what this lane rules on.

## Findings outside the claims

Findings outside the claims.

F1 — the same member is documented with two different verbs on the interface and on the class. `types.ts:776` says "Counts the rows a page holds" while `PaginationManager.ts:51` says "Returns the number of rows one page holds"; `types.ts:845` says "Counts the rows the filter admits" while `/home/user/fleet/table/src/core/Table.ts:206` says "Returns the number of rows admitted by the filters"; `types.ts:628` says "Holds the keys of the rows picked right now" while `/home/user/fleet/table/src/core/tables/SelectionManager.ts:28` says "Returns the keys of the rows picked right now"; `types.ts:774` says "Holds the page the view shows" while `PaginationManager.ts:46` says "Returns the page shown, counted from one". Why it matters: a reader who follows `table.pagination.limit` from the contract to the implementation meets two descriptions of one value, which is the drift the one-concept-one-term law exists to stop, and it is the shape a future reader will copy. What right looks like: fix one verb per member and use it on both sides — `Holds` for a stored readonly value, `Returns` for a computed getter — and apply it to the four pairs named here. Recommended, not required by the claims; if the campaign's scope is fixed, record it against the member vocabulary rather than reopening this unit.

F2 — the concessive clause in two `@returns` lines now sits between the condition and its `false` counterpart. `types.ts:659-660` reads "True if the key named a row the table holds, whether or not it was / picked; false otherwise.", and `types.ts:727-728` reads the same way with "open". Why it matters: the `; false otherwise` contrast is what the rule's form makes scannable, and burying a concession in front of it across a line break costs exactly that. What right looks like: "True if the key named a row the table holds; false otherwise. Whether it was picked makes no difference." at `types.ts:659`, and the same shape with "open" at `types.ts:727`.

F3 — voice coherence of the package as shipped is otherwise sound. `Manages` for a manager-returning member (`types.ts:826-836`, `Table.ts:165-193`) reads better than `Holds` would and does not misdescribe; `Represents` for a type, `Names` for a constant or a literal union, `Lists` for a collection, `Reports whether` for a boolean, and `Describes` for the options interface each fit their symbol, and the constants file (`/home/user/fleet/table/src/core/constants.ts:3-26`) is coherent end to end. The guide keeps its own register and was correctly left untouched.

Referrals to the Orchestrator (Sol dark, objective lane did not run; no verdict from me).

R1 — the writer's own acceptance criterion 3 requires every later sentence to be byte-identical to the launch tree, and the `@returns` re-wraps described under claim 4 move a later sentence's bytes across a line break with its words unchanged (`types.ts:481-482` is one instance; the writer's report lists the reason). Whether a re-wrap forced by the longer first clause satisfies a byte-identity criterion is a mechanical reading, not a design-fit one.

R2 — the writer reports the acceptance instrument as requiring the literal `; false otherwise` contiguously on one line, and states that three wrap points were chosen to satisfy it (`voice-table-report.md:85-89`). An instrument that constrains where prose wraps shapes the artifact it measures; whether that is the instrument's intent belongs to the objective lane.

R3 — the writer's report claims the gate chain exited 0 at every step, including `npm test` inside its own exec. I did not run any command; that reading is the verifier's.
