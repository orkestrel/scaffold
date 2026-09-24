# J-SCROLLSPY round 1 — the writer's report (returned 2026-09-24 by `opus` on Opus 5.5, native subagent, 161 tool uses, 2703 s; retained verbatim from the subagent's return text except the mutation log, which the retained `j-scrollspy-mutations.log.txt` carries row for row; the tree is the worktree `veneer/tmp/worktrees/scrollspy` on `unit/scrollspy` from `e24e2c3`, uncommitted)

I finished J-SCROLLSPY in the scrollspy worktree, and nothing in it is committed. The ScrollSpy engine, the delegate's construction scan, the guard, the two parsers, the tables and the guide rows are in. Every acceptance command exits 0 on Chromium 153.0.8010.12. The mutation log shows 62 mutations with every named case reddening, and its receipt reads `restored byte for byte`.

Before you land it, you need to know two things:
- **Compatibility table:** the proof path `tests/src/browser/ScrollSpy.test.ts` is one character wider than the Proof column. I re-padded that column on every row of the Compatibility table in `guides/veneer.md`, which accounts for about 213 changed rows. Sibling units that edit their own `plugin` rows will conflict on those lines only; resolve each by keeping the widened padding.
- **Shared-file patch:** one sentence in `src/browser/types.ts` is false in one case, so the matching patch is at the end. I did not run the gates with it applied.

The `prove` MCP server was not reachable, so I made no call. Chromium version is from `node tmp/j-scrollspy/version.mjs`, which printed `Chromium 153.0.8010.12`.

## Files touched
All paths are under `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/scrollspy/`.
- `src/browser/ScrollSpy.ts` (new): the engine, with `host`, `target`, `link`, `refresh`, `destroy` and static `find`.
- `src/browser/constants.ts`: adds `SCROLL_SPY_EVENTS`, `SCROLL_SPY_CLASSES`, `SCROLL_SPY_ATTRIBUTES`, `SCROLL_SPY_SELECTORS` and `SCROLL_SPY_DEFAULTS`, all frozen, the defaults nested included.
- `src/browser/validators.ts`: adds `isScrollSpyEvent`. The class check `isInstance(value, CustomEvent)` passes the typecheck, so that form is used.
- `src/browser/parsers.ts`: adds `parseRootMargin` and `parseThreshold`.
- `src/browser/Delegate.ts`: adds the scrollspy route, which scans the root at construction. It also covers scrollspies in the owned set, the discard, and the TSDoc.
- `src/browser/index.ts`: adds the `ScrollSpy.js` barrel row.
- `tests/src/browser/ScrollSpy.test.ts` (new): 19 cases.
- `tests/src/browser/Delegate.test.ts`: adds 5 scan cases.
- `tests/src/browser/validators.test.ts` and `tests/src/browser/parsers.test.ts`: adds the guard and parser rows.
- `tests/src/browser/index.test.ts`: adds the 9 new names to the export list.
- `guides/veneer.md`: adds the ScrollSpy rows under § Surface, a ScrollSpy fence under § Examples, and a `#### ScrollSpy` subsection. It also sets the ScrollSpy `plugin` row's Proof and Status and widens the Proof column.

## Obligations
I recorded the red readings before each fix.

**SCROLLSPY1, SCROLLSPY2 and SCROLLSPY4.** These are the engine, smooth scroll, and the guard, tables, parsers and barrel.
- Command: `npm run test:src:browser -- tests/src/browser/ScrollSpy.test.ts tests/src/browser/validators.test.ts tests/src/browser/parsers.test.ts`
- Red, at file level because the exports did not exist yet:
  - `SyntaxError: The requested module '/src/browser/index.ts' does not provide an export named 'ScrollSpy'` (likewise `isScrollSpyEvent` and `parseRootMargin`)
  - `Test Files  3 failed (3)` / `Tests  no tests`
- Green, first run: `Test Files  3 passed (3)` / `Tests  37 passed (37)`.
- Green, final run: `Test Files  3 passed (3)` / `Tests  38 passed (38)`.

**SCROLLSPY3.** This is the delegate's construction scan.
- Command: `npm run test:src:browser -- tests/src/browser/Delegate.test.ts`
- Red: `Tests  4 failed | 35 passed (39)`. The four failing cases:
  - `acquires a scrollspy for every host its root holds at construction, and releases one at the observer delivery that removes it`
  - `scans by a replaced host selector alone …`
  - `refuses a scrollspy group value …`
  - `destroys every scrollspy its scan acquired and installs no listener when a scanned host refuses its attributes`
- Green: `Test Files  1 passed (1)` / `Tests  39 passed (39)`.

The cases that pin each behaviour:
- **Direction rule:** `activates the lower entering section scrolling down and the higher one scrolling up, dispatching a bubbling activate event for each`, which drives real scrolls in a 100-pixel host. It reads the IntersectionObserver deliveries I probed on Chromium 153.
- **Leaving section:** `clears the active link when its section leaves …`
- **Unscrolled root:** `keeps the first entering section while the root has not scrolled …`
- **Parents:** the nav, list-group and dropdown parents, and the walk staying inside the target.
- **Links and sections:** disabled links, links with no fragment, hidden sections, and `refresh`.
- **Smooth scroll:** one case each for the host and for the document.
- **Options:** attribute versus constructor, per key.
- **Vocabulary:** every group replaced.
- **Refusals and ownership:** refusals, host ownership, the abort signal, restoration, and hooks.
- **Takeover:** three cases, covering a reaction to a parent write, a reaction to the link write, and a listener that destroys the scrollspy.

Some cases were added or strengthened after green, so their red evidence is the mutation rows:
- The unscrolled-root case and the out-of-target parent check were added after green.
- A first mutation pass missed 3 mutations, so I strengthened three cases:
  - The parent-reaction case now records events through a root listener.
  - The listener-destroy case puts `active` on the nav and checks it is restored.
  - The delegate refusal case uses a root with no host.

## Decisions I took inside the unit
- **Activation rule:** I kept Bootstrap's direction rule.
- **`link`:** it reads the last activated link while that link still carries the token. It is cleared only when that link's own section leaves.
- **Parent walk:** it stops at the target.
- **Offsets:** they are measured from bounding rectangles, so a positioned host scrolls to the right place.
- **Takeover signal:** the observer's identity marks the change a delivery belongs to, because an activation can never start again inside itself.
- **Intersection options:** they are resolved as their own layer through `resolveOptions`. The constructor's `intersection` group wins key by key, and a constructor value the observer would refuse throws before the host is claimed.

Every departure from Bootstrap is listed in the guide subsection. No `transition.*` key applies, because no ScrollSpy cascade declares a transition.

## Unknowns
`parseThreshold` accepts:
- a comma-separated list, members trimmed (`' 0 , 1 '` gives `[0, 1]`)
- a JSON array
- a single ratio, as a list of one
- an array of ratios, returned unchanged

It refuses:
- an empty string or empty list (`''`, `'[]'`, `[]`)
- a blank member (`'0.1,,1'`)
- a non-numeric member (`'0.5abc'`, `'NaN'`, `'["0.5"]'`)
- a ratio outside 0 to 1 (`'1.5'`, `'-0.1'`, `'[1e999]'`)
- malformed JSON (`'[0.5'`)
- any other type, including a bare number.

`-0` is accepted.

## Mutation log
The return carried `tmp/j-scrollspy/mutations-1.log.txt` verbatim; the retained copy `j-scrollspy-mutations.log.txt` beside this report is that log (62 `EXACT` or `JOINED` rows, the five `GREEN?` rows at ScrollSpy 0 of 19, Delegate 0 of 39, validators 0 of 12, parsers 0 of 7, index 0 of 3, and the receipt `restored byte for byte` over identical digests).

## Acceptance commands
All logs are in `tmp/j-scrollspy/`.

| Command | Exit | Output |
|---|---|---|
| `npm run check:src:browser` | 0 | no diagnostics |
| `npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser` | 0 | no output |
| `npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md` | 0 | `All matched files use the correct format.` / `Finished in 13744ms on 26 files using 16 threads.` |
| `npm run test:src:browser` | 0 | `Test Files  11 passed (11)` / `Tests  234 passed (234)`; the expected `SyntaxError … DOMTokenList … must not be empty` line from the HostSnapshot case also prints |
| `npm run test:guides` | 0 | `Test Files  1 passed (1)` / `Tests  19 passed (19)` |
| `npm run test:policy` | 0 | `Test Files  1 passed (1)` / `Tests  109 passed \| 1 skipped (110)` |
| `npm run build:src:core` | 0 | — |
| `npm run build:src:styles` | 0 | — |
| `npm run build:src:browser` | 0 | — |
| `npm run test:conformance` | 0 | `Test Files  1 passed (1)` / `Tests  22 passed (22)` |
| `npm run test:setup` | 0 | `Test Files  4 passed (4)` / `Tests  267 passed (267)` |

The conformance and setup runs read the ScrollSpy `plugin` row as Status `shipped`, Proof `tests/src/browser/ScrollSpy.test.ts`, with the catalog's Obligation wording unchanged. As an observation, not a criterion, `npx tsc --noEmit -p tsconfig.json` also exits 0.

## Status and diffstat
`git status --short`:
```
 M guides/veneer.md
 M src/browser/Delegate.ts
 M src/browser/constants.ts
 M src/browser/index.ts
 M src/browser/parsers.ts
 M src/browser/validators.ts
 M tests/src/browser/Delegate.test.ts
 M tests/src/browser/index.test.ts
 M tests/src/browser/parsers.test.ts
 M tests/src/browser/validators.test.ts
?? src/browser/ScrollSpy.ts
?? tests/src/browser/ScrollSpy.test.ts
```

`git diff --stat`:
```
 guides/veneer.md                     | 614 +++++++++++++++++++++++------------
 src/browser/Delegate.ts              |  60 +++-
 src/browser/constants.ts             |  43 +++
 src/browser/index.ts                 |   1 +
 src/browser/parsers.ts               |  65 +++-
 src/browser/validators.ts            |  41 ++-
 tests/src/browser/Delegate.test.ts   | 132 +++++++-
 tests/src/browser/index.test.ts      |   9 +
 tests/src/browser/parsers.test.ts    |  56 +++-
 tests/src/browser/validators.test.ts |  55 ++++
 10 files changed, 853 insertions(+), 223 deletions(-)
```
The untracked files add 380 lines (`src/browser/ScrollSpy.ts`) and 922 lines (`tests/src/browser/ScrollSpy.test.ts`).

## Shared-file patch
The `destroy` sentence in `ScrollSpyInterface` reads "removes the classes the scrollspy added". That is false when the scrollspy removes a consumer's pre-set `active` token and then adds it back to the same link: restoration leaves the token in place. Apply the two hunks together, because the guide's Methods row is compared against this TSDoc:
```diff
--- a/src/browser/types.ts
+++ b/src/browser/types.ts
@@ -1092,7 +1092,7 @@
 	 */
 	refresh(): void
 	/**
-	 * Releases hooks, disconnects the observer, and removes the classes the scrollspy added.
+	 * Releases hooks, disconnects the observer, and restores each `active` token the scrollspy wrote or removed.
 	 *
 	 * @example
 	 * ```ts
--- a/guides/veneer.md
+++ b/guides/veneer.md
@@ -324,10 +324,10 @@
 
 #### `ScrollSpyInterface`
 
-| Method    | Summary                                                                                |
-| --------- | -------------------------------------------------------------------------------------- |
-| `refresh` | Re-reads the navigation's links and observes their sections again.                     |
-| `destroy` | Releases hooks, disconnects the observer, and removes the classes the scrollspy added. |
+| Method    | Summary                                                                                                    |
+| --------- | ---------------------------------------------------------------------------------------------------------- |
+| `refresh` | Re-reads the navigation's links and observes their sections again.                                         |
+| `destroy` | Releases hooks, disconnects the observer, and restores each `active` token the scrollspy wrote or removed. |
```
`ROADMAP.md` needs no change from this unit.

## Deviation state
There was no stop condition. The Compatibility-table re-padding is the ancillary decision I took inside the owned guide, and it is the merge note at the top.

The instruments and logs are in `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/scrollspy/tmp/j-scrollspy/`: `mutations-1.py`, `mutations-1.log.txt`, `red-1.log.txt`, `red-2.log.txt`, `green-1.log.txt`, `green-2.log.txt`, and the `accept-*.log.txt` files.

---

The Orchestrator's retention note: the instrument and its log are retained beside this report as `j-scrollspy-mutations.py` and `j-scrollspy-mutations.log.txt`; the two-hunk patch is retained under `j-scrollspy-patches/` from the worktree's `tmp/j-scrollspy/types-destroy.patch` and `guide-destroy-row.patch`; the review evidence is `j-scrollspy.diff` and `j-scrollspy-status.txt`, captured by `w2-gates.sh scrollspy`, whose log is `j-scrollspy-gates.log.txt`.
