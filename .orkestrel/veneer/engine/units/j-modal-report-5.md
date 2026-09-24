# J-MODAL round 5 (the landing round's second pass) — the writer's report (returned 2026-09-24 by `opus` on Opus 5.5, resumed in the modal worktree, briefed by `j-modal-brief-5.md`; 9 tool uses, 146 s; retained verbatim from the subagent's return; the merge of `2cc0887` stays open with every file staged)

Round 5 is done: the § Delegation sentence names the modal routes, `ModalVocabulary` is in `types.ts` with its guide row and type check, everything is staged, and all six scoped commands exit 0. The instrument's dry anchor check matched every row, so nothing needed re-anchoring. Nothing was committed or installed, no discarding git command was run, and I made no `prove` MCP call (the server is not reachable from a subagent).

## A. The § Delegation sentence
Before:
> The alert, tab, and dropdown routes read a trigger or a control as disabled through the `isDisabled` function: … The button, collapse, and carousel routes read no disabled state, as Bootstrap's data API for those components reads none.

After:
> The alert, tab, dropdown, and modal dismiss routes read a trigger or a control as disabled through the `isDisabled` function: … The button, collapse, carousel, and modal toggle routes read no disabled state, as Bootstrap's data API for those components reads none.

The text between those two sentences is unchanged, apart from one line re-wrapped to fit the width. Nothing else in § Delegation changed.

## B. `ModalVocabulary`
The declaration sits in `src/browser/types.ts` right after `CarouselVocabulary`:
```ts
/** Carries a modal's resolved markup vocabulary: each group with every key present. */
export interface ModalVocabulary {
	/** Names the class tokens the modal writes and tests and the delegate's modal routes match with. */
	readonly classes: ModalClassMap
	/** Names the attributes the modal and its triggers read. */
	readonly attributes: ModalAttributeMap
	/** Names the selectors the modal and the delegate's modal routes match with. */
	readonly selectors: ModalSelectorMap
}
```
- **§ Surface row**, after the `CarouselVocabulary` row: `` | `ModalVocabulary` | interface | Carries a modal's resolved markup vocabulary: each group with every key present. | ``
- **`index.test.ts`:** a new `expectTypeOf<ModalVocabulary>()` row, in the same `Required<NonNullable<ModalOptions[...]>>` shape as the other vocabularies. The case title now reads "…collapse, tab, dropdown, carousel, and modal vocabularies…".
- **`Delegate.ts`:** `#modal` is now typed `ModalVocabulary`. The inline field type and the imports it used (`ModalAttributeMap`, `ModalClassMap`, `ModalSelectorMap`) are gone. There is no runtime change.

## C. Commands (`tmp/j-modal/gates-5.sh`, `tmp/j-modal/gates-5.log.txt`)
| Command | Exit | Summary |
|---|---|---|
| `npm run check:src:browser` | 0 | |
| `npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser` | 0 | |
| `npx oxfmt --config .oxfmtrc.json --write guides/veneer.md` | 0 | |
| `npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md` | 0 | All matched files use the correct format. |
| `npm run test:src:browser` | 0 | 21 files, 571 passed |
| `npm run test:guides` | 0 | 19 passed |
| `npm run test:policy` | 0 | 109 passed, 1 skipped |

I also ran `npx tsc --noEmit -p tsconfig.json` with no errors.

**Dry anchor check:** `tmp/j-modal/check.py` over `tmp/j-modal/mutations-5.py` against the edited files printed `checked 112` and no `MISMATCH` or `NO CASE` line (`tmp/j-modal/dry-check-5.log.txt`). The field-type change moved no line any row matches, so no row was re-anchored.

## `git status --short` (src/browser, tests/src/browser, guide)
```
M  guides/veneer.md
A  src/browser/Alert.ts
M  src/browser/Button.ts
A  src/browser/Carousel.ts
M  src/browser/Collapse.ts
M  src/browser/Delegate.ts
A  src/browser/Dropdown.ts
A  src/browser/Placement.ts
M  src/browser/ScrollLock.ts
A  src/browser/ScrollSpy.ts
A  src/browser/Swipe.ts
A  src/browser/Tab.ts
M  src/browser/constants.ts
M  src/browser/helpers.ts
M  src/browser/index.ts
M  src/browser/parsers.ts
M  src/browser/types.ts
M  src/browser/validators.ts
A  tests/src/browser/Alert.test.ts
A  tests/src/browser/Carousel.test.ts
M  tests/src/browser/Delegate.test.ts
A  tests/src/browser/Dropdown.test.ts
M  tests/src/browser/Modal.test.ts
A  tests/src/browser/Placement.test.ts
A  tests/src/browser/ScrollSpy.test.ts
A  tests/src/browser/Swipe.test.ts
A  tests/src/browser/Tab.test.ts
M  tests/src/browser/helpers.test.ts
M  tests/src/browser/index.test.ts
M  tests/src/browser/parsers.test.ts
M  tests/src/browser/validators.test.ts
```
Every entry is staged: `git diff --stat` over these paths is empty, and `git diff --name-only --diff-filter=U` lists nothing.

## Deviation state
There are no stops or ancillary choices this round. Per your brief, the reading of the shipped `_modal.scss` cascade is carried to W5.
