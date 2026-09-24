# J-COLLAPSE round 3 — the writer's report (returned 2026-09-24 by the resumed `opus` writer on Opus 5.5, native subagent, 37 tool uses, 892 s; retained verbatim from the subagent's return text except the mutation table, which the retained log `j-collapse-mutations-round-3.log.txt` carries row for row; the tree is the worktree `veneer-collapse` on `unit/collapse` at `eab447e` with the round-2 and round-3 edits uncommitted)

Round 3 is complete: D1 to D7 are in, and every acceptance command exits 0. The D1 and D2 proofs failed against the unchanged code and pass after the fixes. The D5 proof passed against the unchanged code, because `#prune` already ran before the refusals. Its only red reading is under the mutation "#prune runs after the refusals". Everything is still uncommitted on top of `eab447e`, in the same eight files.

## D1 to D7

**D1 (claim 1; R1 and R2): the hide stops at the trigger door.**
- `#writeTriggers` now takes both token lists, `(change, present, absent, triggers, expanded)`.
- In `hide`, four doors now require `[transition]` present and `[shown]` absent: the host-and-shown removal, the trigger writes, the size clearing, and the read after the await. A reaction that adds `shown` back at any of them stops the call at that door.
- The `show` doors are unchanged.
- The class remark and the per-phase paragraph in `#### Collapse` now state the extra read.
- New proof: "stops a hide whose trigger write a reaction answers by adding the shown token, writing nothing more".

**D2 (claim 2; R5 and E12): the same-host click is refused.**
- `Delegate#conflicts(target)` runs in `#activate` before either route. It refuses the click when the button host is one of the panels the collapse trigger names, the trigger is inside the root, and neither `Button.find(host)` nor `Collapse.find(host)` returns an engine. Nothing is then marked, driven, constructed, or prevented.
- The same-host case now puts a `Button` the test constructs on the panel, so only the collapse route constructs. Its new title is "…when the button host is the panel itself and carries a button a consumer constructed".
- § Delegation, `#### Collapse`, and the `Delegate` class remark now say "by the first live delegate whose root contains it to reach it", followed by the destroyed-delegate sentence. `#### Collapse` and the remark add the refusal sentence, and the remark is rewrapped to 100 columns.
- The § Delegation restoration sentence "whichever delegate hears it" now reads "in the first delegate to hear it", so the brief's grep returns no hit.
- New proof: "refuses a click whose button host is a panel the collapse trigger names when neither engine exists, driving neither route".

**D3 (claim 4): nesting scope and token order.**
- The nesting sentence reads "within the parent" at all three sites: the `#### Collapse` sentence, the `#siblings` comment, and the departure.
- The token-order departure now uses the wording from the brief.

**D4 (F1): the `parseElement` remark.** ", with two bounds" is gone. The three differences are now separate sentences: "Unlike `getElement`, this reader passes over a match that is not an HTML element…", the selector used as written where `parseSelector` escapes the id, and an invalid selector returning undefined "where `getElement` throws".

**D5 (claim 7; R3): the prune order.** After `first.remove()`, the removed-sibling proof now calls `show()` on the shown owner, which resolves `false`. It then asserts `Collapse.find(first)` is `undefined` and the first panel restored, before the existing `hide()`.

**D6 (claim 6): the table comes from the log.** `tmp/j-collapse/mutations-3.py` is a copy of `mutations-2.py` with the round-3 rows added; the round-2 instrument is unchanged. Its log is `tmp/j-collapse/mutations-round-3.log.txt`, and it ends with `receipt: restored byte for byte`.

**D7 (bounds).**
- Both methods spell the read after the await with `during`.
- The departure now says "destroys each sibling collapse it constructed" and "found or constructed".
- The `#prune` comment reads forward.
- `j-collapse-returns.diff` now says "or the panel's tokens read the change as taken over".
- I also rewrapped the guide paragraphs these edits pushed past 100 columns.

## Proof readings

The red run was the whole of `Collapse.test.ts` and `Delegate.test.ts` against the unchanged code (`tmp/j-collapse/round3-red.log.txt`):
```
 FAIL  |src:browser (chromium)| tests/src/browser/Collapse.test.ts:1006:2 > Collapse > stops a hide whose trigger write a reaction answers by adding the shown token, writing nothing more
AssertionError: expected [ MutationRecord{}, …(2) ] to deeply equal []
- []
+ [
+   MutationRecord {},
+   MutationRecord {},
+   MutationRecord {},
+ ]
 ❯ tests/src/browser/Collapse.test.ts:1038:63
 FAIL  |src:browser (chromium)| tests/src/browser/Delegate.test.ts:888:2 > Delegate > refuses a click whose button host is a panel the collapse trigger names when neither engine exists, driving neither route
AssertionError: expected false to be true // Object.is equality
 ❯ tests/src/browser/Delegate.test.ts:907:39
 Test Files  2 failed (2)
      Tests  2 failed | 63 passed (65)
```
The extended D5 case was among the 63 that passed, and so was the retargeted same-host case.

The green run after the fixes (`tmp/j-collapse/round3-green.log.txt`):
```
 ✓ |src:browser (chromium)| tests/src/browser/Collapse.test.ts:1006:2 > Collapse > stops a hide whose trigger write a reaction answers by adding the shown token, writing nothing more 1ms
 ✓ |src:browser (chromium)| tests/src/browser/Collapse.test.ts:1086:2 > Collapse > destroys a sibling collapse it constructed at its next change after that sibling panel leaves the document 1ms
 ✓ |src:browser (chromium)| tests/src/browser/Delegate.test.ts:888:2 > Delegate > refuses a click whose button host is a panel the collapse trigger names when neither engine exists, driving neither route 1ms
 ✓ |src:browser (chromium)| tests/src/browser/Delegate.test.ts:918:2 > Delegate > drives the button route and the collapse route once each when the button host is the panel itself and carries a button a consumer constructed 11ms
 Test Files  2 passed (2)
      Tests  65 passed (65)
```

## The Unknown

The refusal covers the same host element only. It does not extend to an ancestor or a descendant of a named panel, because E12 as amended says: "The conflict is the same host element only; an ancestor or a descendant of a named panel is a different host." `#conflicts` checks `readTargets(...).includes(host)`, which matches the element itself.

## Mutation table

Copied from `mutations-round-3.log.txt` in the return; retained here by reference: the log `j-collapse-mutations-round-3.log.txt` beside this report carries every `EXACT` and `JOINED` row (the new rows "the trigger-write door reads no token", "the hide doors after the removal admit the shown token", "#prune runs after the refusals", and "the same-host conflict is not refused" each `EXACT` on their case), the five `GREEN?` rows (Collapse 0 of 32, Delegate 0 of 33, validators 0 of 10, parsers 0 of 3, index 0 of 3), and the receipt `restored byte for byte` with identical SHA-256 digests before and after.

## Acceptance criteria output

```
== check:src:browser             exit=0
== oxlint --deny-warnings src/browser tests/src/browser   exit=0
== oxfmt --check src/browser tests/src/browser guides/veneer.md
All matched files use the correct format.   exit=0
== test:src:browser   (Chromium 153.0.8010.12)
 Test Files  10 passed (10)
      Tests  200 passed (200)            exit=0
== test:guides        Test Files  1 passed (1)   Tests  19 passed (19)   exit=0
== test:policy        Test Files  1 passed (1)   Tests  109 passed | 1 skipped (110)   exit=0
== build:src:core exit=0
== build:src:styles exit=0
== build:src:browser exit=0
== test:conformance   Test Files  1 passed (1)   Tests  22 passed (22)   exit=0
== root tsc exit=0
== grep -n "whichever delegate" guides/veneer.md src/browser/Delegate.ts   → no hit (exit=1)
== grep -n "within the parent" guides/veneer.md src/browser/Collapse.ts
guides/veneer.md:663:within the parent carrying the `host` or `transition` token. Each one hides thr…   (#### Collapse; rewrapped since, still hits)
guides/veneer.md:746:- A panel inside a transitioning ancestor within the parent counts as nested and is not a sibling.
src/browser/Collapse.ts:330:	// tokens or the `transition` token, and sits inside no other panel within the parent carrying the
== grep -n "two bounds" src/browser/parsers.ts   → no hit (exit=1)
== awk 'length > 100' src/browser/Delegate.ts
	 * @param options - The delegation root, `document` by default, and the vocabulary of each routed entity.
	 * @throws Thrown when a group value is not a class token, an attribute name, or a selector, as an `AppError` carrying the entity's `{ENTITY}_OPTION_INVALID` code.
== git apply --check tmp/j-collapse/patches-2/*.diff   exit=0
```

`test:src:browser` still prints a stack trace, "Failed to execute 'toggle' on 'DOMTokenList'", from the landed binder case "withdraws an overlapping earliest recording when its restoration throws inside a reaction" in `HostSnapshot.test.ts`. That case throws on purpose, the run passes, and the file isn't one this unit owns.

I made no `prove` call, because that MCP server isn't available to this subagent.

## Status and diffstat

```
 M guides/veneer.md
 M src/browser/Collapse.ts
 M src/browser/Delegate.ts
 M src/browser/parsers.ts
 M src/browser/validators.ts
 M tests/src/browser/Collapse.test.ts
 M tests/src/browser/Delegate.test.ts
 M tests/src/browser/parsers.test.ts
```
```
 guides/veneer.md                   | 595 ++++++++++++++++++++-----------------
 src/browser/Collapse.ts            | 249 +++++++++++-----
 src/browser/Delegate.ts            |  63 ++--
 src/browser/parsers.ts             |  19 +-
 src/browser/validators.ts          |   5 +-
 tests/src/browser/Collapse.test.ts | 273 ++++++++++++++++-
 tests/src/browser/Delegate.test.ts | 112 +++++++
 tests/src/browser/parsers.test.ts  |  10 +
 8 files changed, 930 insertions(+), 396 deletions(-)
```

## Remaining shared-file patches (`tmp/j-collapse/patches-2/`)

`j-collapse-returns.diff` changed this round (both `@returns` sentences end "or the panel's tokens read the change as taken over"); `j-collapse-delegate-interface.diff`, `j-collapse-destroy-summary.diff`, and `j-collapse-roadmap.diff` are unchanged from the round-2 report; all four are retained under `j-collapse-patches-2/` and apply together.

## Deviation state

None. The scripts are in `C:/Users/mikes/WebstormProjects/veneer-collapse/tmp/j-collapse/`:
- **Tests and fixes:** `round3-tests.py`, `round3-collapse.py`, `round3-delegate.py`, `round3-guide.py`, `round3-rewrap.py`
- **Mutation instrument:** `round3-instrument.py` built `mutations-3.py`, which writes `mutations-round-3.log.txt`
- **Readings:** `round3-red.log.txt`, `round3-green.log.txt`, and the `r3-build:src:*.log.txt` build logs

---

The Orchestrator's retention note: the scripts, the instrument, its log, and the red and green readings are retained beside this report as `j-collapse-round3-{tests,collapse,delegate,guide,rewrap,instrument}.py`, `j-collapse-mutations-3.py`, `j-collapse-mutations-round-3.log.txt`, `j-collapse-round3-red.log.txt`, and `j-collapse-round3-green.log.txt`; the review evidence is `j-collapse-3.diff` (`git diff HEAD`, rounds 2 and 3 together), `j-collapse-3-unit.diff` (the whole unit against Veneer `main` `468a118`), and `j-collapse-3-status.txt`, captured by `collapse-gates-3.sh`, whose log is `j-collapse-gates-3.log.txt`.
