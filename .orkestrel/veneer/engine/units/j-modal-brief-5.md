# J-MODAL — round 5 brief, the landing round's second pass (successor to `j-modal-brief-4.md`, which stays in place unedited)

What changed and why: round 4 returned green and named three open points; this pass closes two of them in the same open merge and stages the round's own edits. The third (a reading of the shipped `_modal.scss` cascade beside the test-local sheet) is carried to W5 by the Orchestrator. You do not commit; the Orchestrator commits the merge after its replay and one objective lane.

## Role and engine

`opus` on Opus 5.5 (native subagent, effort high), the writer of rounds 1 to 4, resumed in the same worktree.

## Objective

A § Delegation sentence that names every route reading the disabled state, a `ModalVocabulary` interface in the shape the other entities carry, and every landing edit staged.

## Context

- Tree: `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/modal`, the merge of `2cc0887` open; `src/browser/ScrollLock.ts` and `tests/src/browser/Modal.test.ts` are edited and unstaged, everything else staged, nothing unmerged. Edit and `git add`; no commit, no discarding git command, no install.
- Sources: your `j-modal-report-4.md` (§ Deviation state), the landed `AlertVocabulary`, `TabVocabulary`, `DropdownVocabulary`, and `CarouselVocabulary` declarations in `src/browser/types.ts` (the shape to mirror), the § Surface rows and the `index.test.ts` type case for those, `../decisions.md` E16.
- Host facts as in round 4. The `prove` MCP server is not reachable from a subagent; record that no call was made.

## Items

**A. The § Delegation sentence.** The sentence naming the alert, tab, and dropdown routes as the ones that read a trigger or a control as disabled through `isDisabled` now omits the modal's dismiss route, which reads it through `#locate`. Name the modal dismiss route beside them (the modal's toggle route reads none; say so where the sentence lists the routes that read none, with the button, collapse, and carousel routes). This is the one sentence the landing makes false; change nothing else in § Delegation.

**B. `ModalVocabulary`.** Add `ModalVocabulary` to `src/browser/types.ts` in the shape of `AlertVocabulary` and `TabVocabulary` (readonly `classes`, `attributes`, `selectors` groups over the modal's maps, with TSDoc in the same form), placed after `CarouselVocabulary`; add its § Surface row after the `CarouselVocabulary` row and an `expectTypeOf` row to `index.test.ts`'s vocabulary type case; type `Delegate.#modal` with it and delete the inline field type. No runtime change.

**C. Staging and gates.** `git add` every edited file (`ScrollLock.ts`, `Modal.test.ts`, `types.ts`, `Delegate.ts`, `index.test.ts`, `guides/veneer.md`) so `git status --short` shows no unstaged entry. Then `npm run check:src:browser`; `npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser`; `npx oxfmt --config .oxfmtrc.json --write guides/veneer.md` then `npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md`; `npm run test:src:browser`; `npm run test:guides`; `npm run test:policy`; each exit 0. Run the instrument's dry anchor check over `tmp/j-modal/mutations-5.py` against the edited `Delegate.ts` (the field type change may move a line) and re-anchor any row whose text moved, stating each; no full run is needed if the dry check reports every anchor matching, because the Orchestrator's replay follows.

## Scope

Owned: `guides/veneer.md` (item A's sentence, item B's row), `src/browser/types.ts` (item B), `src/browser/Delegate.ts` (the `#modal` field type), `tests/src/browser/index.test.ts` (item B's row), the staging of the files item C names, `tmp/j-modal/**`. Off-limits: everything else.

## Execution

Perform the assignment directly and spawn nothing. Record that no `prove` call was made.

## Output

Your final message: the sentence before and after; the `ModalVocabulary` declaration and its row; the command exits; the dry check's result and any re-anchored row; `git status --short` over `src/browser`, `tests/src/browser`, and the guide (no unstaged entry); the deviation state.
