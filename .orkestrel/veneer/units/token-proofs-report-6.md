# TOKEN-PROOFS round 6: report

Items 1 to 5 are applied. The root-with-mode state fails under its own plant with an `AssertionError`,
and every gate exits 0. `test:policy` timed out at 5000 ms twice while a journey suite from the
`/home/user/veneer` checkout loaded the host, then passed after that suite exited. Deviation state:
no stop. One observation outside the Items follows, with a patch.

## Evidence re-taken

Each Evidence reading matched the worktree before any edit, with line wraps aside: the opening
paragraph around line 7361, the list's first and second items, the § Color modes sentence around
line 3804, and the scope case, which set no `data-bs-theme` attribute on the root. Round 5's state is
backed up as `tmp/units/tkp-6-backup/veneer.md` and `tmp/units/tkp-6-backup/tokens.test.ts`.

## Scope reading (Unknown)

The mode scopes declare these names again with the value the `:root` selector gives them, and each
one resolves the same in the root, the light scope, and the dark scope:

- `--vn-state-hover` (`12%`), `--vn-state-active` (`22%`), and `--vn-state-stripe` (`5%`)
- `--vn-focus-highlight` (`Highlight`) and `--vn-focus-reset` (`none`)
- `--bs-heading-color` (`var(--vn-text-heading, inherit)`, which resolves to the fallback in every
  scope because the `:root` selector declares `--vn-text-heading: inherit` on the root)

The following instruments produced the reading. All of them are logged in
`tmp/units/tkp-6-scopes.log.txt`:

- **Text comparison** (`tmp/units/tkp-6-scopes.py`). The light scope's declarations match the root's
  text exactly. The dark scope matches the root's text for a larger set, but most of those are
  `var()` aliases whose referenced token changes by mode, so text equality does not answer the
  question. Control: a perturbed `:root` value drops out of the equal list.
- **Resolved comparison** (`tmp/units/tkp-6-resolve.py`, `tmp/units/tkp-6-resolve.log.txt`). It
  substitutes the `var()` chains per scope, the way each element resolves them. It returns exactly
  the preceding names. Control: changing the dark `--vn-state-hover` to `13%` moves that name to
  the differing list, and the script exits 0 only when that happens.
- **Chromium cross-check** (`tmp/units/tkp-6-browser-probe.py`, `tmp/units/tkp-6-browser-probe.log.txt`).
  It reads `getComputedStyle` on the root, a light island, and a dark island, using a temporary case
  restored byte-identically (`cmp` exit 0). It returns the same names plus the build-generated
  `--lightningcss-light` and `--lightningcss-dark` pair. Those read empty in Chromium for both
  `initial` and a blank value, so the browser cannot separate them. They do differ by mode (light:
  `initial`/blank, dark: blank/`initial`), and they are not Veneer names.
- **Root-only names** (`tmp/units/tkp-6-rootonly.py`, `tmp/units/tkp-6-rootonly.log.txt`). No name
  declared at the `:root` selector alone changes value when the root also carries the dark scope.
  Control: `--bs-primary` read the same way differs.

## Items

**Item 1.** In § Customization's opening paragraph:

- Before: "from the values that element inherits"
- After: "from the values that element holds, declared there or inherited"

**Item 2.** The list's first item:

- Before: "An override in a `:root` rule reaches every rule, tier, and alias that reads the token,
  except inside a `[data-bs-theme]` element whose mode scope declares that token again."
- After: "An override on the root element, in a `:root` rule or any rule that matches the root,
  reaches every rule, tier, and alias that reads the token, except inside a `[data-bs-theme]`
  element below the root whose mode scope declares that token again."

The root-with-mode reading supports Item 2. With `data-bs-theme="light"` on the root and an inline
`--vn-radius-base` override there, a child reads `--bs-border-radius` as `20px`.

**Item 3.** The list's second item:

- Before: "An override on a `[data-bs-theme]` element reaches the tiers and aliases its mode scope
  derives from the token, which § Color modes describes, and every rule inside it that reads the
  token. The aliases only the `:root` selector declares keep their value."
- After: "An override on a `[data-bs-theme]` element below the root reaches the tiers and aliases
  its mode scope derives from the token and every rule inside it that reads the token. The aliases
  only the `:root` selector declares keep their value."

**Item 4.** In the scope case, titled "moves a mode-scope alias and holds the root-only aliases
under a mode scope that overrides their tokens, moves all of them from the document element outside
a mode scope that re-declares the token, and moves a root-only alias from a document element that
carries a mode":

- The case asserts that the root carries no `data-bs-theme` attribute, then sets
  `data-bs-theme="light"` on `document.documentElement`.
- A guard asserts that the `#outside` child reads `--bs-border-radius` at the rest value `radius`.
- The case sets the `--vn-radius-base` override of `20px` on the root and asserts that the child
  reads `--bs-border-radius` as `20px`.
- A `finally` block removes the attribute and the property.
- The title gains its closing clause, and the comment above the case gains the root-with-mode
  sentence.

**Item 5.** In § Color modes:

- Before: "A name no mode changes is declared at the `:root` selector alone, and every island
  inherits it from there."
- After: "A name no mode changes keeps one value in every scope. The `:root` selector declares most
  such names alone, and an island below the root inherits them from there. Each mode scope declares
  the `--vn-state-hover`, `--vn-state-active`, `--vn-state-stripe`, `--vn-focus-highlight`,
  `--vn-focus-reset`, and `--bs-heading-color` variables again, with the value the `:root` selector
  gives them."

The inheritance claim is limited to an island below the root. Where the root carries the attribute,
the `:root` declarations apply to the island itself.

## Plant reading

Script: `tmp/units/tkp-6-plant.py`. Log: `tmp/units/tkp-6-plant-root-mode.log.txt`.

- **Plant.** The script appends
  `:root[data-bs-theme] { --bs-border-radius: calc(0.375rem * var(--vn-factor-radius)); }` inside
  the `@layer theme` block of `src/styles/_theme.scss`. The built stylesheet then carries
  `:root[data-bs-theme]{--bs-border-radius:calc(.375rem * var(--vn-factor-radius))}`.
- **Result.** The scope case fails with
  `AssertionError: expected 'calc(.375rem * 1)' to be '20px'` at the new override assertion. Every
  earlier assertion in the case holds, including the guard beside it. The run exits 1 with the case
  as the only failure.
- **Restore.** `cmp` reports `restored-byte-identical`, `git diff --stat -- src` prints nothing, and
  after the rebuild, `grep -c ':root\[data-bs-theme\]'` on the stylesheet returns 0.

## Gates

Script: `tmp/units/tkp-6-gates.sh`, derived from `tmp/units/tkp-5-gates.sh`. The following table
lists each gate's log and result.

| Gate                                                                                 | Log                                                                                                          | Result                                                                                                                                            |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run check`                                                                      | `tmp/units/tkp-6-check.log.txt`                                                                              | exit=0                                                                                                                                            |
| `npm run lint:check`                                                                 | `tmp/units/tkp-6-lintcheck.log.txt`                                                                          | exit=0                                                                                                                                            |
| oxfmt `--check` on the owned files                                                   | `tmp/units/tkp-6-oxfmtcheck.log.txt`                                                                         | exit=0; `sha256sum -c` unchanged-exit=0                                                                                                           |
| `npm run build:src:styles`                                                           | `tmp/units/tkp-6-buildstyles.log.txt`                                                                        | exit=0                                                                                                                                            |
| `npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/tokens.test.ts` | `tmp/units/tkp-6-vitesttokens.log.txt`                                                                 | `Tests 46 passed (46)`, exit=0                                                                                                                    |
| `npm run test:guides`                                                                | `tmp/units/tkp-6-testguides.log.txt`                                                                         | `Tests 20 passed (20)`, exit=0                                                                                                                    |
| `npm run test:policy`                                                                | `tmp/units/tkp-6-testpolicy.log.txt`, `tmp/units/tkp-6-testpolicy-rerun.log.txt`, `tmp/units/tkp-6-testpolicy-rerun-2.log.txt` | Reading 1 and reading 2: exit=1 with `Test timed out in 5000ms` in the workspace-policy case, load average 22. Reading 3: `Tests 109 passed \| 1 skipped (110)`, exit=0, load average 9.5 |

The `test:policy` timeouts came while a `vitest --config configs/app/vite.journey.config.ts` process
with its Chromium renderers ran in `/home/user/veneer`, a different checkout (process `24715`). The
passing reading came after that process exited. The deciding reading belongs to the Orchestrator.

Before the gates, the formatter rewrite on the owned files left both files' SHA-256 digests unchanged.

## Diff and status

- `tmp/units/tkp-6.diff` holds `git diff 2376710`: `guides/veneer.md | 63`, `tests/src/styles/tokens.test.ts | 446`,
  488 insertions and 21 deletions.
- `tmp/units/tkp-6-delta.diff` holds this round alone, taken against the round 5 backups.
- `tmp/units/tkp-6-status.txt` holds ` M guides/veneer.md` and ` M tests/src/styles/tokens.test.ts`.

## Observation outside the Items

The list's fourth item, "An override of a `--bs-*` alias works the same way: the validation rules
follow an override of their aliases on an ancestor, except inside a `[data-bs-theme]` element whose
mode scope declares those aliases again.", has the same root edge that Item 2 closes. Where the root
carries the mode, an alias override on the root reaches the whole document.

- **Probe.** `tmp/units/tkp-6-alias-probe.py`, logged to `tmp/units/tkp-6-alias-probe.log.txt`, used
  a temporary case restored byte-identically (`cmp` exit 0).
- **Reading.** With `data-bs-theme="light"` and an inline `--bs-form-valid-color: rgb(9, 8, 7)` on
  the root, a child reads `rgb(9, 8, 7)`.
- **Control.** A light island below a plain override reads the mode value
  `color-mix(in oklab, oklch(52.7% .154 150.069) 70%, oklch(20.8% .042 265.755))`.

No Item carries this sentence, so it is unedited. Proposed patch, which wraps the same way after
oxfmt:

```diff
 - An override of a `--bs-*` alias works the same way: the validation rules follow an override of
-  their aliases on an ancestor, except inside a `[data-bs-theme]` element whose mode scope declares
-  those aliases again.
+  their aliases on an ancestor, except inside a `[data-bs-theme]` element below the root whose mode
+  scope declares those aliases again.
```

The describe header's sentence "The scope case reads the published `--bs-*` aliases themselves,
under a mode scope and under the document element" stays true and is unedited.

## Instruments and backups

All of these are retained under `tkp-instruments/r6/` (launched from `/home/user/veneer-tkp/tmp/units/`):

- Scope reading: `tkp-6-scopes.py`, `tkp-6-resolve.py`, `tkp-6-browser-probe.py`, and `tkp-6-rootonly.py`
- Plant and gates: `tkp-6-plant.py` and `tkp-6-gates.sh`
- Observation probe: `tkp-6-alias-probe.py`
- Backups: `tkp-6-backup/`
- Snapshots of the prose before editing: `tkp-6-items123-before.md` and `tkp-6-item5-before.md`
- Build log from before the edits: `tkp-6-prebuild.log.txt`
