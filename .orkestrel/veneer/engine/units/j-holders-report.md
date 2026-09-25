<!-- The J-HOLDERS writer's final message (opus on Opus 5.5, native subagent aba602bf8c73ee12d), retained verbatim from its completion notification because its transcript file was empty; brief: units/j-holders-brief.md with the decision units/j-holders-decision-1.md; worktree tmp/worktrees/holders on unit/holders from 4cd56a8. -->

J-HOLDERS is complete, and every acceptance criterion reads green in the worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/holders`. H1 is routed through the shared record. H2's write-back is routed, but its claim order stays. H3 stays. H4 names four shapes, and H5 adds both proofs. Nothing is committed.

## Files touched
- `src/browser/types.ts`: declares `HostSnapshotEntry`, `HostSnapshotRecord`, `HostSnapshotHolding`, and `HostSnapshotPresence` (H4).
- `src/browser/HostSnapshot.ts`: reads every private shape from those types, so no inline copy remains.
- `src/browser/Modal.ts`: the `static #opened` map, `#holdOpen`, and `#releaseOpen` are deleted and nothing wraps them. A per-modal snapshot, `#open`, holds the body's `open` token. The class remarks are updated.
- `src/browser/Isolation.ts`: the per-element snapshot is gone from `static #claims`. Each isolation holds its own `#snapshot`, and `destroy` restores it after the hand-offs. The claims list stays.
- `src/browser/ScrollLock.ts`: logic unchanged. A comment on `#locks` states why it stays.
- `tests/src/browser/Modal.test.ts`: one case added, and "reference-counts…" is retitled "shares the scroll lock and the open token…".
- `tests/src/browser/ScrollLock.test.ts`: the signal case added.
- `tests/src/browser/ColorMode.test.ts`: the persist case now covers an absent and a present root, and checks the error with `toBe(error)`.
- `guides/veneer.md`: the § Engine sentences on the snapshot, the Modal show, the Isolation bullet, the Modal record paragraph, and the departure bullet. Also four § Surface rows (see deviation 2).
- `tmp/j-holders/`: `mutations.py` and its log, `acceptance.sh`, `pins.sh`, the `apply-*.py` edit scripts, and the run logs.

Diffstat: 9 files changed, 225 insertions, 154 deletions.

## H1, H2, and H3

**H1, Modal's `open` token: routed.** Each modal saves the body token through `#open`. A hide or a destruction calls `#open.restore()`, and the last holder writes the body back.
- The record does not tell a modal whether it is the first holder. So a show adds the token whenever the body lacks it (`if (!contains) add`), as Bootstrap's show does.
- Writes are the same except in one case: when other code removed the token while a modal held it, the next show adds it back.
- A body element replaced between two shows now gets its own record.
- The door and re-entry cases all pass (Modal.test.ts, 58 passed).
- Pinning case: `Modal > adds the open token again when a later modal shows on a body that lost it, and the last hide writes back the body class the first show found`.
  - Red on the base sources: `AssertionError: expected [ 'page' ] to deeply equal [ 'page', 'modal-open' ]`
  - Red when the last holder does not write back (H1-LAST): `AssertionError: expected 'page modal-open' to be 'page' // Object.is equality`
  - Green: `✓ … Modal.test.ts:655:2 > Modal > adds the open token again … 6ms`

**H2, Isolation's claims: write-back routed, claim order stays.**
- The routed part is the first save and the last-release write-back.
- The claims list stays. The record keeps only the value the first save read and writes only at the last release. It cannot express "the newest claim decides" or "a release hands the element to the newest claim left".
- Destruction now does every hand-off first, then one restore. The set of writes is the same, but their order across elements differs.
- Write-back pin: `Isolation > keeps an inert ancestor clear while any isolation inside it lives, and restores it at the last release`.
  - Red (H2-LAST): `AssertionError: expected null to be '' // Object.is equality`
  - Green: `✓ … Isolation.test.ts:182:2 … 3ms`
- Order pin: `Isolation > keeps an element another live isolation claimed inert interactive while a sparing isolation lives, and hands it back when that isolation ends`.
  - Red (H2-ORDER): `AssertionError: expected false to be true // Object.is equality`
  - Green: `✓ … Isolation.test.ts:103:2 … 7ms`

**H3, ScrollLock's holders: stays.** The holder is the document's group of locks, not one target.
- Only the first lock's measurement decides which targets exist.
- A later lock's selectors can differ.
- A measurement taken after the overflow write reads the width the hidden scrollbar leaves.
- Routing would therefore measure and write once per lock.
- Pinning case: `ScrollLock > compensates the elements the selectors of the lock that wrote match, and refuses a selector that fails to parse`.
  - Red (H3-MEASURE): `AssertionError: expected '0px' to be '' // Object.is equality`
  - Green: `✓ … ScrollLock.test.ts:131:2 … 4ms`

## H4 shapes
All four are in `src/browser/types.ts`, after `HostSnapshotInterface`, each with a matching § Surface row:
- `HostSnapshotEntry { target, key }`
- `HostSnapshotRecord { value, priority, holders, owner, written }`, whose holders and owner are typed as `HostSnapshotInterface`
- `HostSnapshotHolding { element, attribute: 'class' | 'style' }`
- `HostSnapshotPresence { present, holders }`

The method parameters use `HostSnapshotHolding['attribute']`. H4 is types only, so no mutation applies to it.

## H5 cases
- **`ScrollLock > leaves no listener on the signal of a lock it refuses for a missing body, so aborting that signal later runs none of it, writes nothing, and throws nothing`.** Under H5-SIGNAL (the refusal keeps its abort listener) it reads `AssertionError: expected 2 to be 1 // Object.is equality`.
- **`ColorMode > puts the root reading back, absent or present, and rethrows the same error when persisting the stored mode throws during construction`.**
  - Under H5-PRESENT (the catch path puts back only an absent reading): `AssertionError: expected null to be 'light' // Object.is equality`
  - Under H5-IDENTITY (the catch path rethrows a copy with the same message): `AssertionError: expected Error: stop to be Error: stop // Object.is equality`

## Mutation table (`tmp/j-holders/mutations.log.txt`)
| Row | Obligation | Expected | Reading | Failure message | Verdict |
| --- | --- | --- | --- | --- | --- |
| H1-LAST | H1 | KILLED | KILLED | AssertionError: expected 'page modal-open' to be 'page' // Object.is equality | PASS |
| H2-LAST | H2 | KILLED | KILLED | AssertionError: expected null to be '' // Object.is equality | PASS |
| H2-ORDER | H2 | KILLED | KILLED | AssertionError: expected false to be true // Object.is equality | PASS |
| H3-MEASURE | H3 | KILLED | KILLED | AssertionError: expected '0px' to be '' // Object.is equality | PASS |
| H5-SIGNAL | H5 | KILLED | KILLED | AssertionError: expected 2 to be 1 // Object.is equality | PASS |
| H5-PRESENT | H5 | KILLED | KILLED | AssertionError: expected null to be 'light' // Object.is equality | PASS |
| H5-IDENTITY | H5 | KILLED | KILLED | AssertionError: expected Error: stop to be Error: stop // Object.is equality | PASS |
| CONTROL | control | HELD | HELD | | PASS |
| BOOM | demonstration | REFUSED | REFUSED | Error: boom | PASS |

The log ends with `restored byte for byte` and `rows failing: none`. Each source was checked against its recorded SHA-256 digest before and after the run.

## Acceptance output (`tmp/j-holders/acceptance.log.txt`)
```
$ npm run check:src:browser
exit 0
$ npm run lint:check
exit 0
$ npm run format:check
All matched files use the correct format.
Finished in 11003ms on 476 files using 16 threads.
exit 0
$ npx vitest run … --project src:browser Modal/Isolation/ScrollLock/HostSnapshot/ColorMode tests
 Test Files  5 passed (5)
      Tests  141 passed (141)
exit 0
```

My own readings, not criteria:
- `npm run test:guides`: 20 passed.
- `npm run test:policy`: 109 passed and 1 skipped, with no `surface` collision for the new names.
- The whole `src:browser` project: 26 files, 969 tests passed (`tmp/j-holders/suite-browser.log.txt`).
- The owned files read 139 passed at the base `4cd56a8`.

## `git status --short`
```
 M guides/veneer.md
 M src/browser/HostSnapshot.ts
 M src/browser/Isolation.ts
 M src/browser/Modal.ts
 M src/browser/ScrollLock.ts
 M src/browser/types.ts
 M tests/src/browser/ColorMode.test.ts
 M tests/src/browser/Modal.test.ts
 M tests/src/browser/ScrollLock.test.ts
```

## Deviation state
No stop. These are the decisions I made or received:
1. **Criterion 5, changed after dispatch.** The instrument counts a kill only when the failure message opens with `AssertionError`, and reads every other failure as REFUSED. The BOOM row plants `throw new Error('boom')` and reads REFUSED.
2. **Surface rows outside § Engine.** The kind rule puts H4's shapes in `types.ts`, which the barrel exports. The parity check "documents every barrel export" then needs a § Surface row for each, so I added four rows after `HostSnapshotInterface`. That is outside the § Engine sentences I own. If you want it as a patch instead, revert those rows and apply them at integration.
3. **A fourth shape.** I named `HostSnapshotHolding` as well, because the `{ element, attribute }` pair was inline twice and belongs to the record's private shapes. The names follow `.claude/rules/names.md`.
4. **Two behaviour differences.** H1's re-add of a removed token and H2's write order within one destruction, both described under H1 and H2.
5. **How H5-SIGNAL is proved.** Removing the abort listener cannot be seen through writes, because `destroy` already does nothing for a lock that is not a holder. The platform exposes no list of a signal's listeners, so the case observes the listener through the existing `recordCalls` recorder on `AbortController.prototype.abort`. It still asserts that nothing is written and nothing is thrown.
6. **Renamed cases.** The retained round-3 instrument's C1-COLORMODE row names the old ColorMode case title, which I replaced. It no longer resolves on these sources.
