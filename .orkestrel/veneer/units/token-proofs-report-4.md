# Unit TOKEN-PROOFS round 4 report

Applied the Orchestrator's ruled text for Items 1 to 3 exactly, with no other edit. `oxfmt` left
each Item's own lines unchanged; the wider diff column widening in the token table (guides/veneer.md
around the motion-and-stacking table) and the additional test cases in
`tests/src/styles/tokens.test.ts` predate this round (rounds 1 to 3, uncommitted) and are outside
this round's Items.

## Item 1 — `guides/veneer.md` § Customization opening paragraph and list

**Before:**

```markdown
Override a canonical token in your own unlayered rule. Veneer declares its tokens inside the
`@layer theme` block, so an unlayered rule wins. Where you declare the override decides what
follows it, because each tier and each `--bs-*` alias resolves on the element whose rule declares
it, and a descendant inherits the resolved value. The following list gives what an override moves
from each placement:

- An override on `:root` moves every tier and every `--bs-*` alias derived from the token you
  changed, except inside a `[data-bs-theme]` element whose mode scope re-declares that token.
- An override on a `[data-bs-theme]` element moves the tiers and aliases each mode scope
  re-declares: the body, emphasis, secondary, and tertiary colors and backgrounds, the border
  color, the heading, link, code, and highlight colors, the primary and secondary fills, each
  role's subtle, border-subtle, and text-emphasis tiers, the focus ring color, the form validation
  pair, and the close button and carousel values.
- The aliases a second `:root` block declares once follow only an override on `:root`, and keep
  their `:root` value under a `[data-bs-theme]` override: the fixed palette and grays, the other
  roles' base fills and channel triplets, the fonts, the radii, the shadows, the gradient, the
  border width and style, the focus ring width and opacity, the breakpoints, and the link
  decoration.
- An override on any other element moves only the rules that read the token directly: the link
  colors and decoration, the button state mixes and the disabled button opacity, the heading
  weight, and the standard easing.
- A rule that reads a `--bs-*` alias, as the validation rules do, follows that alias on whatever
  element you set it.
```

**After:**

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

## Item 2 — `tests/src/styles/tokens.test.ts`, comment above `describe('ancestor token overrides', () => {`

**Before:**

```ts
// Each override case sets one token on an ancestor and reads a shipped consumer inside it beside a
// twin outside it. The twin is read first, so a consumer that stops reading the token fails on the
// overridden reading while the twin's rest reading has already held. The placement cases read where
// an override reaches: a `--bs-form-*` alias follows its canonical token from a mode scope and not
// from a plain ancestor, and a rule reading that alias follows it from any ancestor. Every hover
// and press is read with motion reduced, so no reading lands partway through a transition.
```

**After:**

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

## Item 3 — `tests/src/styles/tokens.test.ts`, comment above the scope case

**Before:**

```ts
	// A mode scope re-declares the aliases whose value follows the mode, and a second `:root` block
	// declares the fixed ones once, so a mode-scope override reaches the first set and not the second.
	// A document-element override reaches both sets, except inside a mode scope that re-declares the
	// token itself.
```

**After:**

```ts
	// A mode scope re-declares the aliases whose value follows the mode, and a second `:root` block
	// declares the fixed ones once, so a mode-scope override reaches the mode aliases and not the
	// root-only ones. A document-element override reaches both, except inside a mode scope that
	// re-declares the token itself.
```

## Gate table

| Gate | Log | Result |
| --- | --- | --- |
| `npm run check` | `tmp/units/tkp-4-check.log.txt` | exit=0 |
| `npm run lint:check` | `tmp/units/tkp-4-lintcheck.log.txt` | exit=0 |
| `oxfmt --check guides/veneer.md tests/src/styles/tokens.test.ts` | `tmp/units/tkp-4-oxfmtcheck.log.txt` | exit=0 |
| `npm run build:src:styles` | `tmp/units/tkp-4-buildstyles.log.txt` | exit=0 |
| `npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/tokens.test.ts` | `tmp/units/tkp-4-vitesttokens.log.txt` | exit=0, 46 tests passed |
| `npm run test:guides` | `tmp/units/tkp-4-testguides.log.txt` | exit=0, 20 tests passed |
| `npm run test:policy` | `tmp/units/tkp-4-testpolicy.log.txt` | exit=0, 109 passed, 1 skipped |

## Diff and status

`tmp/units/tkp-4.diff` holds `git diff 2376710` and `tmp/units/tkp-4-status.txt` holds
`git status --short`. Both files are two lines changed against the baseline commit,
`guides/veneer.md` and `tests/src/styles/tokens.test.ts`, matching the accumulated rounds 1 to 4.

## Deviations

None. Every Evidence reading matched the brief before editing. `oxfmt` left each Item's own text
unchanged.
