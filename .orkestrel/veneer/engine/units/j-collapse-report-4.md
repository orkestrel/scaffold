# J-COLLAPSE round 4 — the writer's report (returned 2026-09-24 by the resumed `opus` writer on Opus 5.5, native subagent, 20 tool uses, 873 s; retained verbatim from the subagent's return text except the instrument log, which the retained `j-collapse-mutations-round-4.log.txt` carries row for row; the tree is the worktree `veneer/tmp/worktrees/collapse` on `unit/collapse` at `eab447e` with the round-2, round-3, and round-4 edits uncommitted)

Round 4 is complete: F1 to F6 are in and every acceptance command exits 0. No mechanism changed. The four new F1 and F2 proofs each come out `EXACT` under their own mutation row, all proofs pass on the real code, and the instrument restored every source byte for byte. Everything is still uncommitted on `unit/collapse` at `eab447e`, in the same eight files, in `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/collapse`. I made no `prove` call, because that server isn't available to this subagent.

## F1 to F6

**F1 (claim 1, R2): the three hide doors.** Three new cases in `tests/src/browser/Collapse.test.ts`:
- **(a)** "stops a hide whose host-and-shown removal a reaction answers by adding the shown token back, writing nothing more". A custom-element panel re-adds `show` on the write that removes `collapse` and `show`, then starts the observer. The case asserts no record after the reaction, `false`, no `hidden`, the panel `collapsing show`, and the trigger untouched.
- **(b)** "stops a hide whose size clearing a reaction answers by adding the shown token, dispatching no hidden event". A `style` reaction on the clearing write re-adds `show`, with the cascade loaded. Under this mutation the next door that reads `[shown]` is the post-await read, which stops the call without writing anything, so the absence of writes alone can't tell the two apart. The case therefore also asserts that the call resolves while the transition is still running (`getAnimations()` has length 1). A call that went on to await would resolve only after the transition settles. A comment above the case records this.
- **(c)** "stops a hide when the shown token returns during its transition, dispatching no hidden event". With the cascade loaded, `show` is added after the transition's `ready`. The case asserts `false`, no `hidden`, and the panel ends `collapsing show`.

**F2 (claim 2, R3): the `href` conflict.** New case in `Delegate.test.ts`: "refuses a click whose anchor trigger names its own panel through its href when neither engine exists, driving neither route". It asserts what the target-attribute refusal case asserts. Whether the delegate prevented the default is read from a document listener that fires after the delegate, and that listener then stops the anchor from navigating the test page.

**F3: § Delegation and the `#activate` comment.**
- The refusal sentence now follows the collapse-option sentence.
- The restoration sentence now reads "…finds no owner, and the first live delegate whose root contains the host to reach it acquires a fresh engine at once; that engine's snapshot takes…".
- The `#activate` comment uses the brief's wording.
- I rewrapped both § Delegation paragraphs; their words are unchanged.

**F4: `parseElement`.** The last sentence is now: "Where the selector as written is invalid, this reader returns undefined; `getElement` returns null for an empty string and throws for any other selector its escaping leaves invalid."

**F5: the case title.** It is now "destroys a sibling collapse it constructed at its next show or hide call, refused or not, after that sibling panel leaves the document". The instrument rows match it by the prefix "destroys a sibling collapse it constructed", so none of them needed a change.

**F6: the wraps.** The `#### Collapse` takeover paragraph is rewrapped: no line in it is under 20 characters and none is over 100. The `Collapse.ts` class remark is rewrapped from "completes to. A call that" on. The words are unchanged in both.

The instrument is `tmp/j-collapse/mutations-4.py`, copied from `mutations-3.py` by `round4-instrument.py`. It sets `ROOT` to the new path, writes its own log, and adds four rows that use the exact texts from `j-collapse-probe-r2-r3-single-door.py`.

## New proofs: red under their mutation, green on the code

Red (log rows 38 to 41):
```
EXACT exit=1 | the host-and-shown removal door admits the shown token | tests/src/browser/Collapse.test.ts | 1 failed of 35 | named: ['stops a hide whose host-and-shown removal a reaction answers by adding the shown token back, writing nothing more'] | joined: []
EXACT exit=1 | the size-clearing door admits the shown token | tests/src/browser/Collapse.test.ts | 1 failed of 35 | named: ['stops a hide whose size clearing a reaction answers by adding the shown token, dispatching no hidden event'] | joined: []
EXACT exit=1 | the post-await read admits the shown token | tests/src/browser/Collapse.test.ts | 1 failed of 35 | named: ['stops a hide when the shown token returns during its transition, dispatching no hidden event'] | joined: []
EXACT exit=1 | the conflict read names a panel through the target attribute alone | tests/src/browser/Delegate.test.ts | 1 failed of 34 | named: ['refuses a click whose anchor trigger names its own panel through its href when neither engine exists, driving neither route'] | joined: []
```
Green:
```
 ✓ |src:browser (chromium)| tests/src/browser/Collapse.test.ts:1006:2 > Collapse > stops a hide whose host-and-shown removal a reaction answers by adding the shown token back, writing nothing more 1ms
 ✓ |src:browser (chromium)| tests/src/browser/Collapse.test.ts:1049:2 > Collapse > stops a hide whose size clearing a reaction answers by adding the shown token, dispatching no hidden event 1ms
 ✓ |src:browser (chromium)| tests/src/browser/Collapse.test.ts:1086:2 > Collapse > stops a hide when the shown token returns during its transition, dispatching no hidden event 326ms
 ✓ |src:browser (chromium)| tests/src/browser/Collapse.test.ts:1184:2 > Collapse > destroys a sibling collapse it constructed at its next show or hide call, refused or not, after that sibling panel leaves the document 1ms
 ✓ |src:browser (chromium)| tests/src/browser/Delegate.test.ts:918:2 > Delegate > refuses a click whose anchor trigger names its own panel through its href when neither engine exists, driving neither route 1ms
      Tests  69 passed (69)
```

Two older rows are now `JOINED` because the new cases fail alongside their named case:
- "the hide doors after the removal admit the shown token" was `EXACT` in round 3. The three F1 cases now fail with it (row 36).
- "the same-host conflict is not refused" is joined by the `href` case (row 42).

## Instrument log

The return carried `tmp/j-collapse/mutations-round-4.log.txt` verbatim; the retained copy `j-collapse-mutations-round-4.log.txt` beside this report is that log (every `EXACT` and `JOINED` row in instrument order, the five `GREEN?` rows at Collapse 0 of 35, Delegate 0 of 34, validators 0 of 10, parsers 0 of 3, index 0 of 3, and the receipt `restored byte for byte` over identical digests).

## Acceptance output

Browser runs are Chromium 153.0.8010.12.
```
== check:src:browser             exit=0
== oxlint --deny-warnings src/browser tests/src/browser   exit=0
== oxfmt --check src/browser tests/src/browser guides/veneer.md
All matched files use the correct format.   exit=0
== test:src:browser
 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/collapse
 Test Files  10 passed (10)
      Tests  204 passed (204)             exit=0
== test:guides        Test Files  1 passed (1)   Tests  19 passed (19)   exit=0
== test:policy        Test Files  1 passed (1)   Tests  109 passed | 1 skipped (110)   exit=0
== build:src:core exit=0
== build:src:styles exit=0
== build:src:browser exit=0
== test:conformance   Test Files  1 passed (1)   Tests  22 passed (22)   exit=0
== root tsc exit=0
== grep -n "in the first delegate to hear it" guides/veneer.md     → no hit (exit=1)
== "refused" inside ## Engine
538: panels its collapse trigger names inside the root is refused when neither engine exists th…   (§ Delegation)
727: button and no collapse constructed on that element, is refused before either route runs: t…   (#### Collapse)
== grep -n "getElement throws" src/browser/parsers.ts              → no hit (exit=1)
== grep -n "at its next change" tests/src/browser/Collapse.test.ts tmp/j-collapse/mutations-4.py → no hit (exit=1)
== awk 'length < 20 && length > 0' over the takeover paragraph (lines 706–718) → no hit; its lines run 89 to 100 columns
== git apply --check tmp/j-collapse/patches-2/*.diff   exit=0
```
Line 496 also contains "refused", but it's the § Vocabulary sentence about a refused value, not one of the two refusal sentences.

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
 guides/veneer.md                   | 596 ++++++++++++++++++++-----------------
 src/browser/Collapse.ts            | 248 ++++++++++-----
 src/browser/Delegate.ts            |  68 +++--
 src/browser/parsers.ts             |  20 +-
 src/browser/validators.ts          |   5 +-
 tests/src/browser/Collapse.test.ts | 371 ++++++++++++++++++++++-
 tests/src/browser/Delegate.test.ts | 152 ++++++++++
 tests/src/browser/parsers.test.ts  |  10 +
 8 files changed, 1072 insertions(+), 398 deletions(-)
```

## Patches

The four patches under `tmp/j-collapse/patches-2/` are byte-identical to the round-3 report: `j-collapse-returns.diff`, `j-collapse-delegate-interface.diff`, `j-collapse-destroy-summary.diff`, and `j-collapse-roadmap.diff`. I didn't regenerate them, because `patches-2.py` still points at the old path. `git apply --check tmp/j-collapse/patches-2/*.diff` exits 0 against this tree.

## Deviation state

None. The round-4 scripts are in `tmp/j-collapse/`: `round4-tests.py`, `round4-text.py`, `round4-instrument.py`, `mutations-4.py` with `mutations-round-4.log.txt`, and the `r4-build:src:*.log.txt` build logs.

---

The Orchestrator's retention note: the instrument, its log, and the scripts are retained beside this report as `j-collapse-mutations-4.py`, `j-collapse-mutations-round-4.log.txt`, and `j-collapse-round4-{tests,text,instrument}.py`; the review evidence is `j-collapse-4.diff`, `j-collapse-4-unit.diff`, and `j-collapse-4-status.txt`, captured by `collapse-gates-4.sh`, whose log is `j-collapse-gates-4.log.txt`.
