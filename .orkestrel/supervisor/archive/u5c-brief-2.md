# U5c fix round — count adjacency, the dismissal word, one honest Tab

Successor to `u5c-brief.md`. Carries three findings from U5c's audit (verdicts on disk:
`tmp/codex/u5c-audit-last.md`, reviewer report in the campaign record; every other claim
CONFIRMED by both lanes; the reviewer's pointer-events referral was answered by Sol's cascade
evidence — halfmoon.css:8307/8323 — and is closed):

1. **Reviewer, rendered defect (frames confirm):** below `lg` the signature control renders the
   count after every mark, so `⏸ 2` reads as two paused and `⚠ 2` as two problems; desktop
   binds each number to its own mark.
2. **Reviewer, naming defect:** the dismissal record ref is named `cleared`; "clear" is the
   operator's word in the same file. One word per concept.
3. **Sol, trusted-input defect:** the keyboard-reach proof calls `control.focus()` and asserts
   that programmatic focus (ApplicationView.test.ts:598).

## Role and engine

`builder` (three fully specified sites). Sole serial writer in `/workspace/supervisor` from
clean committed baseline **92509bb**. Perform directly, spawn nothing, no
commits/pushes/installs.

## The changes

1. `app/browser/ApplicationView.vue` (~258-266, the below-`lg` signature control): move
   `fleet.count` so it renders immediately after the live mark and before the paused/stopped
   marks — the control reads `≡ ● 2 ⏸ ⚠`. The visible caption stays the single numeral; the
   `aria-label` binding is untouched. If a test in `tests/app/browser/ApplicationView.test.ts`
   pins the old glyph/count DOM order, update exactly that order expectation to the new order —
   nothing else about the assertion.
2. `app/browser/ApplicationView.vue:97` area: rename the `cleared` ref to `dismissed`, updating
   its uses (the visibility filter, the dismiss handler, the pruning watcher — three sites plus
   the declaration). No behavior change; comments mentioning the record follow the new word
   where they name it.
3. `tests/app/browser/ApplicationView.test.ts` (~598, the keyboard-reach proof): remove the
   direct `control.focus()`. Establish a known focus position through real interaction, then
   `await userEvent.tab()` (repeating as needed, bounded like the file's existing Tab walks)
   until the toast's dismiss control reports focus, assert it, and keep the existing
   `userEvent.keyboard('{Enter}')` activation and its assertions.

Touch nothing else.

## Scope

**Owned:** `app/browser/ApplicationView.vue`, `tests/app/browser/ApplicationView.test.ts`.
Everything else off-limits. Forbidden: the standing list; no assertion weakening beyond the one
authorized order expectation in item 1.

## Acceptance criteria

1. The below-`lg` control renders count adjacent to the live mark (`grep` the template order);
   no `cleared` identifier remains in the shell; no `\.focus()` call remains in the test file.
2. `npm run test:app:browser -- tests/app/browser/ApplicationView.test.ts` green (29/29), from
   `/workspace/supervisor`.

## Deviation contract

If the Tab walk cannot reach the dismiss control from any real focus position, stop and report
the observed sequence verbatim — that is a reachability finding, not yours to fix.

## Output

The diff, the test command and its summary line, `git status --porcelain`, deviations or none.
