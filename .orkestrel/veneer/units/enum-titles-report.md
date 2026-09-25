# Unit ENUM-TITLES — report

## Files

Each of the seven files got its comment block and title replaced verbatim (checked after
`oxfmt` ran):

- `tests/src/styles/components/popover.test.ts`: comment and title replaced; title reads
  `writes the recorded popover selectors and no other components-layer selector naming a popover class`.
- `tests/src/styles/components/tooltip.test.ts`: comment and title replaced; title reads
  `writes the recorded tooltip selectors and no other components-layer selector naming a tooltip class`.
- `tests/src/styles/components/modal.test.ts`: comment and title replaced; title reads
  `writes the recorded modal selectors and no other components-layer selector naming a modal class`.
- `tests/src/styles/components/toast.test.ts`: comment and title replaced; title reads
  `writes the recorded toast selectors and no other components-layer selector naming a toast class`.
- `tests/src/styles/components/offcanvas.test.ts`: comment and title replaced; title reads
  `writes the recorded offcanvas selectors and no other components-layer selector naming an offcanvas class`.
- `tests/src/styles/components/collapse.test.ts`: comment and title replaced; title reads
  `writes the recorded collapse and collapsing selectors and no other components-layer selector naming either class`.
- `tests/src/styles/components/fade.test.ts`: comment and title replaced; title reads
  `writes the recorded fade selectors and no other components-layer selector whose classes are the fade and show classes alone`.

## Plant table

Every plant ran `npm run build:src:styles` then `npx vitest run --config
configs/src/vite.styles.config.ts --no-cache tests/src/styles/components/<file>.test.ts -t "no
other components-layer selector"`, one plant at a time, each restored from a copy taken before
the plant and checked with a SHA-256 digest.

| File | Plant | Rule | Case result | Restore digest |
| --- | --- | --- | --- | --- |
| `popover` | `dup` | `.popover-body { letter-spacing: 1px; }` | 1 passed | equal |
| `popover` | `extra` | `.popover-body.audit-probe { letter-spacing: 1px; }` | 1 failed, `AssertionError: expected [ …(34) ] to deeply equal [ …(33) ]` | equal |
| `tooltip` | `dup` | `.tooltip-inner { letter-spacing: 1px; }` | 1 passed | equal |
| `tooltip` | `extra` | `.tooltip-inner.audit-probe { letter-spacing: 1px; }` | 1 failed, `AssertionError: expected [ …(22) ] to deeply equal [ …(21) ]` | equal |
| `modal` | `dup` | `.modal-body { letter-spacing: 1px; }` | 1 passed | equal |
| `modal` | `extra` | `.modal-body.audit-probe { letter-spacing: 1px; }` | 1 failed, `AssertionError: expected [ '.modal', '.modal-backdrop', …(51) ] to deeply equal [ '.modal', '.modal-backdrop', …(50) ]` | equal |
| `toast` | `dup` | `.toast-body { letter-spacing: 1px; }` | 1 passed | equal |
| `toast` | `extra` | `.toast-body.audit-probe { letter-spacing: 1px; }` | 1 failed, `AssertionError: expected [ '.toast', '.toast-body', …(7) ] to deeply equal [ '.toast', '.toast-body', …(6) ]` | equal |
| `offcanvas` | `dup` | `.offcanvas-body { letter-spacing: 1px; }` | 1 passed | equal |
| `offcanvas` | `extra` | `.offcanvas-body.audit-probe { letter-spacing: 1px; }` | 1 failed, `AssertionError: expected [ '.navbar-expand .offcanvas', …(89) ] to deeply equal [ '.navbar-expand .offcanvas', …(88) ]` | equal |
| `collapse` | `dup` | `.collapsing { letter-spacing: 1px; }` | 1 passed | equal |
| `collapse` | `extra` | `.collapsing.audit-probe { letter-spacing: 1px; }` | 1 failed, `AssertionError: expected [ '.collapse:not(.show)', …(3) ] to deeply equal [ '.collapse:not(.show)', …(2) ]` | equal |
| `fade` | `dup` | `.fade { letter-spacing: 1px; }` | 1 passed | equal |
| `fade` | `extra` | `.fade.show:hover { letter-spacing: 1px; }` | 1 failed, `AssertionError: expected [ '.fade', '.fade.show:hover', …(1) ] to deeply equal [ '.fade', '.fade:not(.show)' ]` | equal |

`npm run build:src:styles` ran after the last restore, exit 0. Logs are at
`tmp/units/logs/enum-plant-<file>-<dup|extra>.log.txt`.

## Gate table

| Gate | Command | Exit |
| --- | --- | --- |
| Format | `npm run format:check` | 0 |
| Lint | `npm run lint:check` | 0 |
| Typecheck | `npm run check` | 0 |
| Tests | `npm run test:src:styles` (115 test files, 1500 tests, all passed) | 0 |

Logs are at `tmp/units/enum-format.log.txt`, `tmp/units/enum-lint.log.txt`,
`tmp/units/enum-check.log.txt`, and `tmp/units/enum-test.log.txt`.

## Diff and status

- Diff: `tmp/units/enum.diff`
- Status: `tmp/units/enum-status.txt` — only the seven owned test files show as modified.
