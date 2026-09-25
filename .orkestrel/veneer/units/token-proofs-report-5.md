# TOKEN-PROOFS round 5 report

Unit `opus` on Opus 5.5, the only writer in `/home/user/veneer-tkp`, working over Veneer `2376710` with rounds 1 to 4
uncommitted. All Items are applied. Every plant fails its nested assertion with an `AssertionError` and is restored
byte-identically. Every gate exits 0. Deviation state: none stopped. One Evidence citation is recorded later under
§ Evidence readings.

## Touched files

- `/home/user/veneer-tkp/guides/veneer.md`: § Customization's opening paragraph and list replaced with the ruled text.
- `/home/user/veneer-tkp/tests/src/styles/tokens.test.ts`: the block header comment replaced; the link case and the
  alias case each gain a nested mode-scope consumer beside a mode-scope twin outside the override, and both are
  retitled.
- `/home/user/veneer-tkp/tmp/units/`: plant script, gate script, backups, logs, diffs, status, and this report.

Diffstat against `2376710` (`git diff 2376710 --stat`):

```text
 guides/veneer.md                |  55 +++--
 tests/src/styles/tokens.test.ts | 435 ++++++++++++++++++++++++++++++++++++++++
 2 files changed, 471 insertions(+), 19 deletions(-)
```

The diff against `2376710` is in `tmp/units/tkp-5.diff`. The status is in `tmp/units/tkp-5-status.txt`
(`M guides/veneer.md`, `M tests/src/styles/tokens.test.ts`). The round-5 delta against round 4's tree is in
`tmp/units/tkp-5-delta.diff`, taken against the backups in `tmp/units/tkp-5-backup/`. `git diff 2376710 --check` exits 0.

## Evidence readings

I re-took each reading before editing:

- § Customization opened with "Override a canonical token in your own unlayered rule." Its list items began "A rule
  that reads the token itself follows an override" and ended with "A rule that reads a `--bs-*` alias, as the
  validation rules do,". Holds.
- The comment `// Each consumer case sets one token on a plain ancestor` sat directly above
  `describe('ancestor token overrides', () => {`. Holds.
- The alias case title was exactly as the brief quotes it, and the case sets `--bs-form-valid-color` and
  `--bs-form-valid-border-color` on a plain ancestor with no `[data-bs-theme]` element in between. Holds.
- The link case sets `TOKEN_NAMES.link.base`, which `src/core/constants.ts` maps to `--vn-link-base`, on a plain
  ancestor with no `[data-bs-theme]` element in between. Holds. **Citation note:** the brief identifies this case as
  "`overrides the link base ...`, around line 698". The actual title is "repaints a link and a link button inside an
  ancestor that overrides the link color, and leaves a twin on the rest color", at line 697. No title in the file
  contains "overrides the link base". The line number and every substantive fact identify exactly one case, so I
  treated this as a quoting slip rather than a differing reading, and proceeded.
- After `npm run build:src:styles` (`tmp/units/tkp-5-prebuild.log.txt`, `exit=0`), `dist/src/styles/index.css` declares
  `--vn-link-base`, `--bs-form-valid-color`, and `--bs-form-valid-border-color` in the `:root` block, the
  `[data-bs-theme=light]` block, and the `[data-bs-theme=dark]` block. Holds.

## Items

### Item 1 — § Customization opening paragraph and list

Before:

```markdown
Override a canonical token in your own unlayered rule. Veneer declares its tokens inside the
`@layer theme` block, so an unlayered rule wins. The element that carries the override decides
what follows it:

- A rule that reads the token itself follows an override on its own element or on any ancestor.
  The link colors and decoration, the button state mixes and the disabled button opacity, the
  heading weight, and the standard easing are rules of this kind.
- A tier or a `--bs-*` alias resolves on the element whose rule declares it, and a descendant
  inherits the resolved value. An override in a `:root` rule moves every tier and alias derived
  from the token, except inside a `[data-bs-theme]` element whose mode scope declares that token
  again. An override on a `[data-bs-theme]` element moves the tiers and aliases its mode scope
  derives from the token, which § Color modes describes. An override on any other element moves
  no tier and no alias.
- A rule that reads a `--bs-*` alias, as the validation rules do, follows an override of that
  alias on its own element or on any ancestor.
```

After: the brief's Item 1 text, byte for byte. oxfmt left it unchanged.

```markdown
Override a canonical token in your own unlayered rule. Veneer declares its tokens inside the
`@layer theme` block, so an unlayered rule wins. Each custom property resolves on the element whose
rule declares it, from the values that element inherits, and a descendant inherits the resolved
value. An override therefore reaches every declaration that reads the token on its own element or
inside it, and no declaration on an element above it; an element inside it that declares the token
again gives its own subtree that value. The placement decides what follows:

- An override in a `:root` rule reaches every rule, tier, and alias that reads the token, except
  inside a `[data-bs-theme]` element whose mode scope declares that token again.
- An override on a `[data-bs-theme]` element reaches the tiers and aliases its mode scope derives
  from the token, which § Color modes describes, and every rule inside it that reads the token. The
  aliases only the `:root` selector declares keep their value.
- An override on any other element reaches the rules and the component aliases inside it that read
  the token, among them the link colors and decoration, the button state mixes and the disabled
  button opacity, the heading weight, and the standard easing. The tiers and aliases the `:root`
  selector and the mode scopes declare above it keep their value.
- An override of a `--bs-*` alias works the same way: the validation rules follow an override of
  their aliases on an ancestor, except inside a `[data-bs-theme]` element whose mode scope declares
  those aliases again.
```

### Item 2 — block header comment

Before:

```ts
// Each consumer case sets one token on a plain ancestor and reads a shipped consumer inside it
// beside a twin outside it. The twin is read first, so a consumer that stops reading the token
// fails on the overridden reading while the twin's rest reading has already held. The placement
// cases read where an override reaches: a `--bs-form-*` alias follows its canonical token from a
// mode scope and not from a plain ancestor, and a rule reading that alias follows it from any
// ancestor. The scope case reads the published `--bs-*` aliases themselves, under a mode scope and
// under the document element. Every hover and press is read with motion reduced, so no reading
// lands partway through a transition.
```

After: the brief's Item 2 text, byte for byte, at column 0 like the comment it replaced. oxfmt left it unchanged.

```ts
// Each consumer case sets one token on an ancestor and reads a shipped consumer inside it beside a
// twin outside it: a plain ancestor for a consumer whose rule or component alias reads the token,
// and a mode scope for the validation rules, whose aliases resolve there. The twin is read first,
// so a consumer that stops reading the token fails on the overridden reading while the twin's rest
// reading has already held. The placement cases read where an override reaches: a `--bs-form-*`
// alias follows its canonical token from a mode scope and not from a plain ancestor, and a rule
// reading that alias follows it from an ancestor, except inside a mode scope that declares it
// again. The scope case reads the published `--bs-*` aliases themselves, under a mode scope and
// under the document element. Every hover and press is read with motion reduced, so no reading
// lands partway through a transition.
```

### Item 3 — link case nested mode scope

Before: the fixture held the overriding `<div>` with `#inside-link` and `#inside-button`, then `#twin-link` and
`#twin-button` outside it. The case ended on the inside assertions.

After: `<div data-bs-theme="light"><a id="nested-link">` sits inside the overriding `<div>`, and
`<div data-bs-theme="light"><a id="mode-link">` sits outside the override. After the existing assertions, the case reads
the mode twin first, checks that it isn't the override value, and asserts that the nested anchor equals it:

```ts
const mode = readStyle(modeLink, 'color')
expect(matchesColor(mode, 'rgb(200, 30, 40)')).toBe(false)
expect(readStyle(nestedLink, 'color')).toBe(mode)
```

The `not the override` check keeps the equality from passing vacuously. The equality separates following the outer
override from keeping the mode value only while the mode twin differs from the override.

### Item 4 — alias case nested mode scope

Before: the fixture held the plain `<div>` setting both validation aliases, with `#inside-control` and
`#inside-feedback` inside it, then `#twin-control` and `#twin-feedback` outside it. The case ended on the inside
assertions.

After: a `<div data-bs-theme="light">` holding `#nested-control` (`form-control is-valid`) and `#nested-feedback`
(`valid-feedback`) sits inside the plain ancestor. A `<div data-bs-theme="light">` holding `#mode-control` and
`#mode-feedback` sits outside the override. After the existing assertions:

```ts
const border = readStyle(modeControl, 'border-top-color')
const feedback = readStyle(modeFeedback, 'color')
expect(matchesColor(border, 'rgb(20, 130, 40)')).toBe(false)
expect(matchesColor(feedback, 'rgb(200, 30, 40)')).toBe(false)
expect(readStyle(nestedControl, 'border-top-color')).toBe(border)
expect(readStyle(nestedFeedback, 'color')).toBe(feedback)
```

### Item 5 — retitles

I retitled both cases because each old title no longer named the nested limit its case proves:

- Link, before: `repaints a link and a link button inside an ancestor that overrides the link color, and leaves a twin
  on the rest color`. After: `repaints a link and a link button inside an ancestor that overrides the link color, leaves
  a twin on the rest color, and leaves a link inside a nested mode scope on the mode color`.
- Alias, before: `recolors the border and the feedback of a valid control inside a plain ancestor that sets the
  validation aliases, and leaves a twin on the rest color`. After: `recolors the border and the feedback of a valid
  control inside a plain ancestor that sets the validation aliases, leaves a twin on the rest color, and leaves a
  control inside a nested mode scope on the mode color`.

## Plants

Each plant is driven by `tmp/units/tkp-5-plant.py` (`python3 tmp/units/tkp-5-plant.py`). It adds one line after the
`@include theme-tokens(...)` line in the mode-scope rule of `src/styles/_theme.scss`. It then rebuilds the styles and
runs the case alone with `npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/tokens.test.ts -t
'<title prefix>'`. Finally it restores the file from `tmp/units/tkp-5-backup/_theme-<name>.scss`.

`inherit` makes the mode scope take the property from its parent instead of declaring it again. The `:root` block
includes the mixin from `_tokens.scss`, so it keeps its own declaration. As a result, the mode twin outside the override
still reads the rest value, and every earlier assertion in the case holds. The alias case gets a separate plant for
each nested assertion, so the feedback assertion is also shown to fail when the border assertion holds.

| Plant                   | Planted line                                  | Failing assertion (log)                                                                                                                                                                  | Restore                                                     |
| ----------------------- | --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| `link-nested`           | `--vn-link-base: inherit;`                    | `tokens.test.ts:725` `expect(readStyle(nestedLink, 'color')).toBe(mode)`: `AssertionError: expected 'color(srgb 0.784314 0.117647 0.156863)' to be 'color(srgb 0.0510206 0.212902 0.67272…'` (`tkp-5-plant-link-nested.log.txt`, `1 failed \| 45 skipped`) | `cmp` reports `restored-byte-identical`; `src-diffstat-lines=0` |
| `alias-nested-border`   | `--bs-form-valid-border-color: inherit;`      | `tokens.test.ts:952` `expect(readStyle(nestedControl, 'border-top-color')).toBe(border)`: `AssertionError: expected 'rgb(20, 130, 40)' to be 'oklab(0.4313 -0.0943551 0.0412221)'` (`tkp-5-plant-alias-nested-border.log.txt`) | `cmp` reports `restored-byte-identical`; `src-diffstat-lines=0` |
| `alias-nested-feedback` | `--bs-form-valid-color: inherit;`             | `tokens.test.ts:953` `expect(readStyle(nestedFeedback, 'color')).toBe(feedback)`: `AssertionError: expected 'rgb(200, 30, 40)' to be 'oklab(0.4313 -0.0943551 0.0412221)'` (`tkp-5-plant-alias-nested-feedback.log.txt`) | `cmp` reports `restored-byte-identical`; `src-diffstat-lines=0` |

In each failure, the nested consumer reads the outer override: `color(srgb 0.784314 …)` is `rgb(200, 30, 40)`. After
the last restore, the plant script rebuilt the styles (`tmp/units/tkp-5-plant-rebuild.log.txt`, `exit=0`).

## Gates

`bash tmp/units/tkp-5-gates.sh` ran each gate, and each log ends with `exit=` and the load average:

| Gate                                                                                   | Log                                     | Result                                                      |
| -------------------------------------------------------------------------------------- | --------------------------------------- | ----------------------------------------------------------- |
| `npm run check`                                                                        | `tmp/units/tkp-5-check.log.txt`         | `exit=0`                                                    |
| `npm run lint:check`                                                                   | `tmp/units/tkp-5-lintcheck.log.txt`     | `exit=0`                                                    |
| `oxfmt --config .oxfmtrc.json --check` on the owned files, then `sha256sum -c`         | `tmp/units/tkp-5-oxfmtcheck.log.txt`    | `exit=0`, `unchanged-exit=0`                                |
| `npm run build:src:styles`                                                             | `tmp/units/tkp-5-buildstyles.log.txt`   | `exit=0`                                                    |
| `npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/tokens.test.ts` | `tmp/units/tkp-5-vitesttokens.log.txt` | `Tests 46 passed (46)`, `exit=0`                          |
| `npm run test:guides`                                                                  | `tmp/units/tkp-5-testguides.log.txt`    | `Tests 20 passed (20)`, `exit=0`                            |
| `npm run test:policy`                                                                  | `tmp/units/tkp-5-testpolicy.log.txt`    | `Tests 109 passed \| 1 skipped (110)`, `exit=0`; round 4's log reports the same skip |

## Failing-first evidence

- Command: `python3 tmp/units/tkp-5-plant.py`. Each plant runs the case alone. Planted: `1 failed | 45 skipped` in each
  plant log, failing at the nested assertion named in the plant table. Restored:
  `npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/tokens.test.ts` reports
  `46 passed (46)`.
- Tests: the link case and the alias case under their titles from Item 5.

## Shared-file patches

None.

## Deviation state

None stopped. Settled within scope: the nested fixtures and the `not the override` guard; one `inherit` plant in the
`_theme.scss` mode scope per nested assertion; and both retitles. The Evidence citation for the link case title
(`overrides the link base`) does not match the file, as described under § Evidence readings. No nested reading
contradicts the ruled text.
