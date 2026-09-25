# Unit E-ID-MOTION-MODAL round 3 report

Round 2's audit (`mmod-audit-2-verdict.md`) confirmed every claim but the prose, on the dialog
paragraph's sentence naming why a modal without the `fade` class runs no transition. This round
rewrote that sentence at its five sites and re-wrapped each comment.

## Items: before and after

### Item 1 — `guides/veneer.md`, dialog paragraph

Before: "On a modal without the `fade` class, an engine writes no opacity, so no transition runs as
the engine shows or hides that modal."

After: "A modal without the `fade` class keeps its opacity as an engine adds and removes the `show`
class, so no transition runs as the engine shows or hides it."

### Item 2 — `src/styles/components/_modal.scss`, the `.modal` rule comment

Before: "On a modal without that class, an engine writes no opacity, so no transition runs as the
engine shows or hides that modal."

After: "A modal without that class keeps its opacity as an engine adds and removes the `show`
class, so no transition runs as the engine shows or hides it."

### Item 3 — `guides/veneer.md`, the modal backdrop's Reason cell

Before: "The `overlay-backdrop` mixin fades the backdrop on the panel timing the modal host fades
on, in place of the shared `.fade` rule's feedback timing."

After: "The `overlay-backdrop` mixin fades the backdrop over the `--vn-motion-panel` duration on
the `--vn-ease-out` curve, in place of the shared `.fade` rule's feedback timing."

### Item 4 — `tests/src/styles/components/modal.test.ts`, the entrance case's comment

Before: "...a specimen resolves from the tokens apart from the dialog's rule."

After: "...a specimen resolves from the tokens independently of the dialog's rule."

### Item 5 — `src/styles/_mixins.scss`, the `overlay-backdrop` comment

Before: "...the compound outranks that rule,"

After: "...the backdrop's `.fade` compound outranks that rule,"

Every replacement re-wrapped its paragraph or comment at 100 columns without changing another word.
`mmod-instruments/r3/mmod-3-delta.diff` shows each site changed and nothing else.

## Gate table

| Gate | Exit | Log |
| --- | --- | --- |
| `npm run check` | 0 | `mmod-instruments/r3/mmod-3-check.log.txt` |
| `npm run lint:check` | 0 | `mmod-instruments/r3/mmod-3-lint-check.log.txt` |
| `oxfmt --check` (owned files) | 0 | `mmod-instruments/r3/mmod-3-oxfmt-check.log.txt` |
| `npm run build:src:styles` | 0 | `mmod-instruments/r3/mmod-3-build-src-styles.log.txt` |
| `vitest run` (`vite.styles.config.ts`, modal/offcanvas/mixins) | 0, 111 tests passed | `mmod-instruments/r3/mmod-3-vitest-styles.log.txt` |
| `npm run test:conformance` | 0, 29 tests passed | `mmod-instruments/r3/mmod-3-conformance.log.txt` |
| `npm run test:guides` | 0, 26 tests passed | `mmod-instruments/r3/mmod-3-guides.log.txt` |
| `npm run test:policy` | 0, 109 passed, 1 skipped | `mmod-instruments/r3/mmod-3-policy.log.txt` |

## Evidence

- `mmod-3.diff` — `git diff 73326c7`, the cumulative diff across all three rounds.
- `mmod-instruments/r3/mmod-3-delta.diff` — this round alone, against the pre-edit backups.
- `mmod-instruments/r3/mmod-3-status.txt` — `git status --porcelain=v1` after the edits.

The Evidence readings re-taken before editing matched the brief exactly; no Evidence reading
differed, so no deviation occurred.
