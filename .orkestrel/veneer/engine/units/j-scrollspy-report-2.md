# J-SCROLLSPY round 2 — the writer's report (returned 2026-09-24 by `opus` on Opus 5.5, the round-1 writer resumed in the same worktree, 49 tool uses, 832 s; retained verbatim from the subagent's return; the tree is the worktree `veneer/tmp/worktrees/scrollspy` on `unit/scrollspy` from `e24e2c3`, uncommitted, `main` not merged)

J-SCROLLSPY round 2 is done in the scrollspy worktree; nothing is committed and main was not merged. Items A to E are closed and every acceptance command in the brief's chain exits 0. The round-2 instrument ran once in full: all 73 rows (62 kept from round 1, 11 new) reddened their named case, and it ends `receipt: restored byte for byte`. I made no `prove` call; that server is not reachable from a subagent.

Three things go beyond the brief's letter:
- **Clearing-door proof:** I added a proof for the clearing door (the target and each cleared link), not only the leaving door. The brief named one row, "a removal door admits a restored token"; I split it into a leaving-write row and a clearing-write row so each door has its own case.
- **Second `instanceof`:** item D named one line, but I also converted `event instanceof CustomEvent` near line 91 of `tests/src/browser/ScrollSpy.test.ts` to `isInstance(event, CustomEvent)`. It is another added line under the same rule.
- **Ancillary guide sentences:** I added three sentences under `#### ScrollSpy`: the frozen copy of the ratios, a refresh forgetting a link it no longer observes, and destruction forgetting the selected link.

## Files touched
All paths are under `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/scrollspy/`.
- `src/browser/ScrollSpy.ts`:
  - `refresh` forgets a selected link it no longer observes.
  - The constructor keeps a frozen copy of the ratios, and one throw block replaces the two.
  - `#holds` and `#apply` take a `present` set and an `absent` set.
  - The dispatch door requires the link's token; each removal door requires the removed token absent.
  - The unreachable `: 0` fallback became a `continue`.
  - The remarks and the `#deliver` comment were corrected.
- `src/browser/types.ts`: the `link` summary and the `destroy` summary (items A and C).
- `src/browser/Delegate.ts`: the class summary now names the scan.
- `tests/src/browser/ScrollSpy.test.ts`:
  - 7 new cases.
  - The destroy case is strengthened.
  - `isInstance` replaces `instanceof` on two lines.
- `guides/veneer.md`:
  - The `Delegate` § Surface row and the `ScrollSpyInterface` Methods rows.
  - The § Delegation reinsertion sentence.
  - The zero-scroll sentence and the `parseRootMargin` sentence under `#### ScrollSpy`.
  - The doors paragraph and the malformed-escape departure.
- `tmp/j-scrollspy/mutations-2.py`, `mutations-2-dry.py`, `mutations-2.log.txt`, `acceptance-2.sh`, `acceptance-2.log.txt`, `r2-red.log.txt`, `r2-green.log.txt`.

## Per item
**A and B, red first.** Command: `npm run test:src:browser -- tests/src/browser/ScrollSpy.test.ts`

Red, on the round-1 source with the new cases in place: `Tests  4 failed | 21 passed (25)`. The failing cases:
- `forgets the selected link at a refresh that no longer observes its section` (A i): `expected <a class="nav-link active" …(1)></a> to be undefined`
- `keeps the ratios it read at construction when the caller changes its array, and reads the root again at each refresh` (A ii): `RangeError: Failed to construct 'IntersectionObserver': Threshold values must be numbers between 0 and 1`
- `stops a delivery whose activate listener removes the selected link token, activating no later entry` (B i): `expected [ [ 3, [ 'Three' ] ] ] to deeply equal [ [ 2, [] ] ]`
- `stops a delivery whose leaving write a reaction answers by restoring the token, keeping the restored token and activating no later entry` (B ii): `expected [ [ 2, [ 'Two' ] ] ] to deeply equal [ [ 1, [ 'One' ] ] ]`

Green after the fix: `Test Files  1 passed (1)` / `Tests  25 passed (25)`. With the clearing-door case added: `Tests  26 passed (26)`.

**C.** The sentences are in place. `npm run test:guides` gives `Tests  19 passed (19)` with the `destroy` patch applied in the tree. The patch is no longer a returned diff.

**D.** Both lines use `isInstance`. `npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser` exits 0. The `as const` near line 605 stays: it fixes a literal tuple whose contract is not declared.

**E.** Each new row has a pinning case. The observer-identity row reddens `stops the delivery a refresh inside its activate listener replaced, writing nothing more`. The early-return row reddens `writes and dispatches nothing when a delivery names the selected link again while it carries its token`. These cases, and the destroy case below, pass on the round-1 source; only their instrument rows prove they can fail.

**The unknown about `destroy` clearing `#link`.** You were right that the round-1 case could not tell the difference. I strengthened it: after destruction, the case gives the link its token back and asserts that `link` is still undefined. The row "destruction keeps the selected link" now reddens that case alone (EXACT).

## Instrument
`tmp/j-scrollspy/mutations-2.py` is a copy of `mutations-1.py` with every round-1 row kept. Six of those rows carry the round-2 text for lines the source changed, with the same mutation: the leaving door, the two constructor validation rows, the write door, the link-token door, and the dispatch door. A dry check matched all 73 rows. Each row ran over its whole test file with no `-t`.

The 11 new rows from `tmp/j-scrollspy/mutations-2.log.txt`:
```
EXACT exit=1 | a refresh keeps a selected link it no longer observes | tests/src/browser/ScrollSpy.test.ts | 1 failed of 26 | named: ['forgets the selected link at a refresh that no longer observes its section'] | joined: []
EXACT exit=1 | the caller's threshold array is kept | tests/src/browser/ScrollSpy.test.ts | 1 failed of 26 | named: ['keeps the ratios it read at construction when the caller changes its array, and reads the root again at each refresh'] | joined: []
EXACT exit=1 | the dispatch door reads no token | tests/src/browser/ScrollSpy.test.ts | 1 failed of 26 | named: ['stops a delivery whose activate listener removes the selected link token, activating no later entry'] | joined: []
EXACT exit=1 | a removal door admits a restored token at the leaving write | tests/src/browser/ScrollSpy.test.ts | 1 failed of 26 | named: ['stops a delivery whose leaving write a reaction answers by restoring the token, keeping the restored token and activating no later entry'] | joined: []
EXACT exit=1 | a removal door admits a restored token at the clearing write | tests/src/browser/ScrollSpy.test.ts | 1 failed of 26 | named: ['stops an activation whose clearing write a reaction answers by restoring the token, activating and dispatching nothing'] | joined: []
EXACT exit=1 | the observer identity is not read | tests/src/browser/ScrollSpy.test.ts | 1 failed of 26 | named: ['stops the delivery a refresh inside its activate listener replaced, writing nothing more'] | joined: []
EXACT exit=1 | the root is read once, at construction | tests/src/browser/ScrollSpy.test.ts | 1 failed of 26 | named: ['keeps the ratios it read at construction when the caller changes its array, and reads the root again at each refresh'] | joined: []
EXACT exit=1 | the activation's early return is dropped | tests/src/browser/ScrollSpy.test.ts | 1 failed of 26 | named: ['writes and dispatches nothing when a delivery names the selected link again while it carries its token'] | joined: []
EXACT exit=1 | destruction keeps the selected link | tests/src/browser/ScrollSpy.test.ts | 1 failed of 26 | named: ['restores every link it wrote on destruction, keeping consumer edits, and observes and writes nothing more'] | joined: []
JOINED exit=1 | the default active token is one the nav cascade does not paint | tests/src/browser/ScrollSpy.test.ts | 14 failed of 26 | named: ['writes the token the shipped nav cascade paints as the active pill'] | joined: [...13 cases that assert the default token...]
EXACT exit=1 | the margin parser refuses a valid margin | tests/src/browser/parsers.test.ts | 1 failed of 7 | named: ['returns a margin the intersection observer accepts unchanged'] | joined: []
```

The log's closing lines:
```
GREEN? exit=0 | tests/src/browser/ScrollSpy.test.ts | 0 failed of 26 | []
GREEN? exit=0 | tests/src/browser/Delegate.test.ts | 0 failed of 39 | []
GREEN? exit=0 | tests/src/browser/validators.test.ts | 0 failed of 12 | []
GREEN? exit=0 | tests/src/browser/parsers.test.ts | 0 failed of 7 | []
GREEN? exit=0 | tests/src/browser/index.test.ts | 0 failed of 3 | []
receipt: restored byte for byte
```
The digests before and after are identical for `ScrollSpy.ts`, `Delegate.ts`, `validators.ts`, `parsers.ts`, `constants.ts` and `index.ts`. The full 73-row table, verbatim, is in the log file.

## Acceptance chain
The chain ran in the brief's order through `tmp/j-scrollspy/acceptance-2.sh`; the log is `acceptance-2.log.txt`.

| Command | Exit | Summary |
|---|---|---|
| `npm run check:src:browser` | 0 | — |
| `npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser` | 0 | — |
| `npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md` | 0 | `All matched files use the correct format.` |
| `npm run test:src:browser` | 0 | `Test Files  11 passed (11)` / `Tests  241 passed (241)` |
| `npm run test:guides` | 0 | `Tests  19 passed (19)` |
| `npm run test:policy` | 0 | `Tests  109 passed \| 1 skipped (110)` |
| `npm run build:src:core` | 0 | — |
| `npm run build:src:styles` | 0 | — |
| `npm run build:src:browser` | 0 | — |
| `npm run test:conformance` | 0 | `Tests  22 passed (22)` |
| `npm run test:setup` | 0 | `Tests  267 passed (267)` |

The `test:src:browser` run also prints the known `SyntaxError` from the landed HostSnapshot case, which throws by design.

## Status and diffstat
`git status --short`:
```
 M guides/veneer.md
 M src/browser/Delegate.ts
 A src/browser/ScrollSpy.ts
 M src/browser/constants.ts
 M src/browser/index.ts
 M src/browser/parsers.ts
 M src/browser/types.ts
 M src/browser/validators.ts
 M tests/src/browser/Delegate.test.ts
 A tests/src/browser/ScrollSpy.test.ts
 M tests/src/browser/index.test.ts
 M tests/src/browser/parsers.test.ts
 M tests/src/browser/validators.test.ts
```

`git diff --stat`:
```
 guides/veneer.md                     |  644 +++++++++++-------
 src/browser/Delegate.ts              |   62 +-
 src/browser/ScrollSpy.ts             |  390 +++++++++++
 src/browser/constants.ts             |   43 ++
 src/browser/index.ts                 |    1 +
 src/browser/parsers.ts               |   65 +-
 src/browser/types.ts                 |    4 +-
 src/browser/validators.ts            |   41 +-
 tests/src/browser/Delegate.test.ts   |  132 +++-
 tests/src/browser/ScrollSpy.test.ts  | 1199 ++++++++++++++++++++++++++++++++++
 tests/src/browser/index.test.ts      |    9 +
 tests/src/browser/parsers.test.ts    |   56 +-
 tests/src/browser/validators.test.ts |   55 ++
 13 files changed, 2463 insertions(+), 238 deletions(-)
```

## Deviation state
There was no stop, and no shared-file patch is outstanding. As before, the Compatibility-table Proof column is re-padded to the width of `tests/src/browser/ScrollSpy.test.ts`, so sibling `plugin` rows will conflict on whitespace only at landing.

---

The Orchestrator's retention note: the round-2 instrument and its log are retained as `j-scrollspy-mutations-2.py` and `j-scrollspy-mutations-2.log.txt`; the review evidence is `j-scrollspy-2.diff` and `j-scrollspy-2-status.txt`, captured by `w2-gates.sh scrollspy 2`, whose log is `j-scrollspy-gates-2.log.txt`.
