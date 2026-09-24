# J-COLLAPSE audit round 3 — the checker's verdict (returned 2026-09-24 by `checker` on Sonnet, native subagent, 60 tool uses, 336 s; retained verbatim from the subagent's return text; the Orchestrator's note follows)

# Checker verdict — J-COLLAPSE audit round 3

**Role and lane:** `checker` on Sonnet, native Claude subagent, `Read`/`Grep`/`Glob` only; mechanical conformance only.

## Numbered verdicts

**Claim 3 (mechanical clauses — three "within the parent" sites; token-order departure wording verbatim): CONFIRMED**
- `guides/veneer.md:663` reads "within the parent carrying the `host` or `transition` token." — matches.
- `guides/veneer.md:746` reads "A panel inside a transitioning ancestor within the parent counts as nested and is not a sibling." — matches verbatim.
- `src/browser/Collapse.ts:330` reads "// tokens or the `transition` token, and sits inside no other panel within the parent carrying the" — matches.
- `guides/veneer.md:750-754` carries the token-order departure verbatim as claimed, and Bootstrap's `collapse.js` confirms it: `show` at lines 140-141 (`remove(COLLAPSE)` then `add(COLLAPSING)`); its complete at 151-152 (`remove(COLLAPSING)` then `add(COLLAPSE, SHOW)`); `hide` at 182-183 (`add(COLLAPSING)` then `remove(COLLAPSE, SHOW)`); its complete at 197-198 (`remove(COLLAPSING)` then `add(COLLAPSE)`).

**Claim 4 (mechanical clauses — no "two bounds"; three sentences verbatim): CONFIRMED**
- `grep -n "two bounds" src/browser/parsers.ts` — no hit.
- `src/browser/parsers.ts:13-17` carries the three sentences verbatim, as quoted in the claim.
- `node_modules/bootstrap/js/src/util/index.js:93` (`document.querySelector(parseSelector(object))`) is unguarded, confirming the third sentence.

**Claim 6 (instrument and its log): UNRESOLVED**
- The instrument diff, log rows, `GREEN?` totals (32/33/10/3/3), and the `restored byte for byte` receipt all confirm: `j-collapse-mutations-3.py` differs from `j-collapse-mutations-2.py` by exactly the four claimed rows plus the `LOG` path (line 9); the `REPORT` path is identical in both files, so "report paths" in the claim's wording is imprecise but the substance holds. The header comment (line 1) also differs beyond a bare round-number swap ("a copy of mutations-2.py with the round-3 rows" is new prose), which is an unnamed difference.
- 55 mutation rows in the instrument match 55 rows in the log one-to-one (`grep -c "^    ('"` = 55; `grep -c "^(EXACT|JOINED...) exit"` = 55).
- The claim that "the report's table is the log's rows verbatim, grouped `EXACT` then `JOINED`" is not decidable from the retained evidence: `j-collapse-report-3.md`'s own header states the mutation table was replaced at retention ("retained verbatim from the subagent's return text **except** the mutation table, which the retained log carries row for row"), and the report body (lines 73-75) is a prose summary referencing the log, not a verbatim grouped table. Whether the writer's original return contained the verbatim grouped table is unrecoverable from what was retained.

**Claim 7 (bounds taken): BROKEN**
- "Both methods spell the post-`await` read with `during`" — confirmed (`Collapse.ts:187`, `Collapse.ts:245`).
- `j-collapse-returns.diff` carries "or the panel's tokens read the change as taken over" in both `@returns` hunks — confirmed.
- The orphan line "finds the" at `guides/veneer.md:710` — confirmed; the § Delegation paragraph (lines 715-730) carries no comparable orphan line.
- The departure phrase "found or constructed" is present (`guides/veneer.md:748`).
- The departure phrase **"destroys each sibling collapse it constructed" does not exist anywhere in the worktree** (`grep -n "destroys each sibling" C:/Users/mikes/WebstormProjects/veneer-collapse` — no matches; `Collapse.ts:47-48` reads "destroys one whose panel left the document at its next show or hide call, and destroys the rest on its own destruction" instead). The claim asserts this exact wording, and it is false.

**Claim 8 (scope, gates, added lines): CONFIRMED**
- `j-collapse-3-status.txt` lists exactly the eight files, all `M`; none of `types.ts`, `index.ts`, `HostSnapshot.ts`, `helpers.ts`, `Button.ts`, `constants.ts`, `tests/setupBrowser.ts`, `ROADMAP.md` appears (`grep` for those names against the status file: no matches).
- `j-collapse-gates-3.log.txt` shows every named gate at `exit=0`, including `test:src:browser` 200/200, `test:guides` 19/19, `test:policy` 109+1 skipped, the three builds, `test:conformance` 22/22, `check` exit=0, and the four patches applying together (`apply-check exit=0`).
- `grep -n "#open|#close|#moving|#taken" src/browser/Collapse.ts` (run directly against the worktree) returns no matches, confirming the clause the gates log itself omits.
- Over-100-column lines in the four sources are exactly `Delegate.ts:73-74` (`@param`/`@throws`), `Collapse.ts:83-84` (`@param`/`@throws`), `Collapse.ts:32` (the pre-existing class-remark summary line), and `validators.ts:27` (the pre-existing remark line); `j-collapse-2.diff` shows the `Collapse.ts:84` `@throws` line and the `validators.ts` hunk already present before round 3, confirming none was added this round.
- No `any`, non-null `!`, `@ts-`, `eslint-disable`, `public`/`protected`/`private`, parameter property, default export, or nested function declaration in the added lines (`j-collapse-3.diff` swept; every `!` hit is a logical negation, every `as ` hit is prose, not a type assertion).
- No `writing.md` § Substitutions term (case-insensitive sweep of `simply|easy|just|utilize|leverage|via|in order to|e.g.|i.e.|etc.|performant|robust|allows you to|and/or|please|sanity check|dummy|blacklist|whitelist|master|slave` against added lines of `j-collapse-3.diff`) — no matches.
- `j-collapse-report-3.md:108` records the refused `prove` call.
- All four patches under `j-collapse-patches-2/` name only `types.ts`, `guides/veneer.md`, or `ROADMAP.md` (verified by `--- a/`/`+++ b/` headers in each file).

**Claim 9 (mechanical clause — round-3 delta touches only the named sites, nothing else): UNRESOLVED**
- Spot checks support the claim: `src/browser/validators.ts`'s only hunk and `tests/src/browser/parsers.test.ts`'s only hunk are byte-identical between `j-collapse-2.diff` and `j-collapse-3.diff`, so round 3 added nothing to either file, consistent with "nothing else." The `parsers.ts` change matches D4 exactly.
- A full hunk-by-hunk reconciliation of `j-collapse-3.diff` against `j-collapse-2.diff` across `Collapse.ts`, `Delegate.ts`, `Collapse.test.ts`, `Delegate.test.ts`, and `guides/veneer.md` to confirm the round-3 delta touches only `#writeTriggers`'s two call sites, `hide`'s doors, `#activate`/`#conflicts`, the named test cases, the named guide sentences, and the `#prune` comment — and nothing else in those five files — was not completed within this review; that comparison would settle it.

## Findings fitting no claim

None substantiated beyond the above.

## Attacked and held

- Instrument/log row-count parity (55/55) and digest-restoration receipt: attacked by direct count and found to hold.
- `#conflicts` single declaration/single call site before `#routeButton` in `#activate` (`Delegate.ts:136-137,144`): held.
- `#writeTriggers` single declaration, two call sites with the exact argument lists claimed (`Collapse.ts:180,240,403-409`): held.
- Retargeted test title present with extension only; round-2 title absent unextended (`tests/src/browser/Delegate.test.ts:918`, `tests/src/browser/Collapse.test.ts:1006`, `Delegate.test.ts:888`): held.

## Referrals

None — every ruling above rests on direct file evidence, not judgment.

VERDICT: FAIL 6, 7, 9; outside the claims: none

---

The Orchestrator's note: the claim-7 clause the checker broke holds. The departure reads, across a line wrap at `guides/veneer.md` around line 760, "Destruction abandons a transition in flight, restores the panel and its triggers, and destroys / each sibling collapse it constructed.", so a single-line grep for "destroys each sibling" misses the phrase the wrap splits; the Orchestrator's `grep -n "Destruction abandons\|sibling collapse it constructed"` reads both lines. Claim 6's "verbatim table" clause is the Orchestrator's retention choice (the return's table was the log's rows; the retained report points at the log rather than duplicating it) and closes with the replay; claim 9's full reconciliation is the objective lane's.
