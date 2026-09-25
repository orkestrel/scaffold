# TOKEN-PROOFS round 3 report

§ Customization now states D51a's placement rules, and a new case pins the split between mode-scope aliases and root-only aliases. The scope plant fails that case with an `AssertionError`. Every Acceptance gate reads green, and no reading contradicted D51a.

## The case

The case is in `describe('ancestor token overrides')` in `tests/src/styles/tokens.test.ts`:

- moves a mode-scope alias and holds the root-only aliases under a mode scope that overrides their tokens, and moves all of them from the document element outside a mode scope that re-declares the token

The case overrides `--vn-color-primary-base`, `--vn-color-success-base`, and `--vn-radius-base` inline on a `data-bs-theme="light"` element. It reads the aliases through `readToken` on a child:

- **Mode-scope override:** `--bs-primary` reads `rgb(4, 5, 6)`. `--bs-success` and `--bs-border-radius` equal the values read on the document element first.
- **Document-element override:** the case sets the same tokens on `document.documentElement` and removes them in `finally`. A child outside any mode scope reads `rgb(4, 5, 6)`, `rgb(1, 2, 3)`, and `20px`.
- **Held island:** a second `data-bs-theme="light"` element with no override keeps its own `--bs-primary` under the document-element override. I added this assertion so the case covers the guide's "except inside a `[data-bs-theme]` element" clause.

The pre-override readings are checked against the override values first, so a hold cannot pass by coincidence.

## Plant readings

Each plant's driver backs up the partial under `tmp/units/tkp-3-backup/`, rebuilds, runs `npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/tokens.test.ts -t 'holds the root-only aliases under a mode scope'`, and restores the partial.

| Plant | Driver and log | Planted | Failing assertion | Restored |
| --- | --- | --- | --- | --- |
| scope | `tmp/units/tkp-3-plant.py`, `tmp/units/tkp-3-plant-scope.log.txt` | `src/styles/_theme.scss`, in the mode scope after the `theme-tokens` include: `--bs-success: var(--vn-color-success-base);` | 948: `readToken(island, '--bs-success')`, `expected 'rgb(1, 2, 3)' to be 'oklch(52.7% .154 150.069)'`. The `--bs-primary` assertion before it holds. | `restored-byte-identical`, `src-diffstat-lines=0` |
| held | `tmp/units/tkp-3-plant-held.py`, `tmp/units/tkp-3-plant-held.log.txt` | the same site: `--vn-color-primary-base: inherit;` | 957: `readToken(held, '--bs-primary')`, `expected 'rgb(4, 5, 6)' to be 'oklch(48% .255 264)'`. Every earlier assertion holds. | `restored-byte-identical`, `src-diffstat-lines=0` |

Both logs read `Tests 1 failed | 45 skipped (46)`. The scope plant first ran before I added the held-island assertion. That log is kept at `tmp/units/tkp-3-first-plant/tkp-3-plant-scope.log.txt`, and it failed at line 942 with the same reading. The table cites the re-run against the final file.

## § Customization, before and after

Before:

> Override a canonical token in your own unlayered rule. Veneer declares its tokens inside the `@layer theme` block, so an unlayered rule wins, and every tier and every `--bs-*` alias derived from the token you changed follows the override, because each one is an expression over that token. A component rule that paints the release's fixed blue …

After:

> Override a canonical token in your own unlayered rule. Veneer declares its tokens inside the `@layer theme` block, so an unlayered rule wins. Where you declare the override decides what follows it, because each tier and each `--bs-*` alias resolves on the element whose rule declares it, and a descendant inherits the resolved value. The following list gives what an override moves from each placement:
>
> - An override on `:root` moves every tier and every `--bs-*` alias derived from the token you changed, except inside a `[data-bs-theme]` element whose mode scope re-declares that token.
> - An override on a `[data-bs-theme]` element moves the tiers and aliases each mode scope re-declares: the body, emphasis, secondary, and tertiary colors and backgrounds, the border color, the heading, link, code, and highlight colors, the primary and secondary fills, each role's subtle, border-subtle, and text-emphasis tiers, the focus ring color, the form validation pair, and the close button and carousel values.
> - The aliases a second `:root` block declares once follow only an override on `:root`, and keep their `:root` value under a `[data-bs-theme]` override: the fixed palette and grays, the other roles' base fills and channel triplets, the fonts, the radii, the shadows, the gradient, the border width and style, the focus ring width and opacity, the breakpoints, and the link decoration.
> - An override on any other element moves only the rules that read the token directly: the link colors and decoration, the button state mixes and the disabled button opacity, the heading weight, and the standard easing.
> - A rule that reads a `--bs-*` alias, as the validation rules do, follows that alias on whatever element you set it.
>
> The `tests/src/styles/tokens.test.ts` proof reads each placement against a shipped consumer or alias. A component rule that paints the release's fixed blue … (unchanged from here)

Three wording choices go beyond D51a. Each comes from `tmp/units/tkp-2-probe-scopes.log.txt`, which lists the built cascade's scopes:

- **Close button and carousel values:** the mode scope also re-declares `--bs-btn-close-filter` and the `--bs-carousel-*` values, so the mode-scope item names them.
- **Gradient and focus ring width and opacity:** `--bs-gradient`, `--bs-focus-ring-width`, and `--bs-focus-ring-opacity` are root-only, so the root-only item names them.
- **Island exception:** the `:root` item gains the exception for a mode scope that re-declares the token. The held-island assertion and its plant cover it.

The link colors and link decoration appear in more than one item. Each item is about a different reader. The `--bs-link-color` alias is re-declared at the mode scope, and `--bs-link-decoration` is root-only. The `a` and `.btn-link` rules read `--vn-link-base` and `--vn-link-decoration` directly.

These cases in the same file execute the placement claims:

- **`:root` and root-only items, and the mode-scope item's primary fill:** the scope case.
- **Mode-scope item, form pair:** the placement case from round 2.
- **Any-other-element item:** the round 1 override cases.
- **Alias item:** the alias case from round 2.

## Gate table

The gates ran through `tmp/units/tkp-3-gates.sh`, which is `tmp/units/tkp-2-gates.sh` with the log names changed.

| Gate | Log | Reading |
| --- | --- | --- |
| `npm run check` | `tmp/units/tkp-3-check.log.txt` | `exit=0` |
| `npm run lint:check` | `tmp/units/tkp-3-lint-check.log.txt` | `exit=0` |
| oxfmt on `tokens.test.ts` and `veneer.md`, with before and after `sha256sum -c` | `tmp/units/tkp-3-oxfmt.log.txt` | `exit=0`; both files `OK`; `unchanged-exit=0` |
| `npm run build:src:styles` then `npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/tokens.test.ts --reporter=verbose` | `tmp/units/tkp-3-tokens.log.txt` | `Tests 46 passed (46)`, `exit=0` |
| `npm run test:guides` | `tmp/units/tkp-3-test-guides.log.txt` | `Tests 20 passed (20)`, `exit=0` |
| `npm run test:policy` | `tmp/units/tkp-3-test-policy.log.txt` | `Tests 109 passed \| 1 skipped (110)`, `exit=0` |

No gate timed out. Each gate log ends with `/proc/loadavg`.

## Diff and status

- `tmp/units/tkp-3.diff` holds `git diff 2376710`. Diffstat: `guides/veneer.md | 59 ++++--` and `tests/src/styles/tokens.test.ts | 403 +++`. The totals are 443 insertions and 19 deletions.
- `tmp/units/tkp-3-status.txt` holds ` M guides/veneer.md` and ` M tests/src/styles/tokens.test.ts`.
- `git diff --stat -- src` is empty.
- Every backup, script, and log for this round is under `tmp/units/`, and nothing was written to the scratchpad.

## Deviation state

No stop, and no reading contradicted D51a. Settled myself: the case title, the list form, and the paragraph's wording, including the additions named under § Customization. I also added the held-island assertion and its plant so the island exception in the prose has an executed proof.

Round 2's plant logs still cite the right lines, because this round inserted its case after them. Round 1's plant logs cite lines that rounds 2 and 3 have since moved. Each plant is named for its case title in its own log.
