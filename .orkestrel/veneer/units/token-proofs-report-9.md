# Unit TOKEN-PROOFS round 9 report

## Item 1 — stripe case comment

Before:
```
// A mode island inherits the `:root` value, so a reading taken on the island holds wherever
// the stripe is declared. Each mode's own declaration list is what places the stripe
// beside the hover and active percentages.
```

After:
```
// Each mode scope declares the stripe again, with the declaration the `:root` selector
// writes, so a reading on an island cannot tell where its value was declared. Each mode's
// own declaration list is what places the stripe beside the hover and active percentages.
```

## Item 2 — `theme` paragraph in `guides/veneer.md` § Tokens › § Departures

Before (the named sentence): "Veneer declares each of them at the `:root` selector alone, and a
light island inherits each one from that selector through every island around it, so a light
island nested in a dark one reads the document value;"

After: "Veneer declares each of them at the `:root` selector alone, and an island inherits each
one from its parent, so a light island nested in a dark one reads the document value unless an
ancestor below the root overrides the name;"

The surrounding paragraph is re-wrapped at 100 columns; no other word in it changed.

## Item 3 — border utilities paragraph in `guides/veneer.md` § Styles › § Border utilities

Before (the named sentence): "so a retuned width token widens every default border and a dark
island draws the dark border color."

After: "so the width token retuned on the root element widens every default border, and a dark
island draws the dark border color. The `:root` selector alone declares the `--bs-border-width`
alias, so the width token retuned on an element below the root moves no border; retune the alias
on that element instead."

The surrounding paragraph is re-wrapped at 100 columns; no other word in it changed.

## Gate table

| Gate | Command | Exit | Log |
| --- | --- | --- | --- |
| oxfmt write | `./node_modules/.bin/oxfmt --config .oxfmtrc.json tests/src/styles/tokens.test.ts guides/veneer.md` | 0 | `tkp-instruments/r9/tkp-9-oxfmt.log.txt` |
| oxfmt check | `./node_modules/.bin/oxfmt --config .oxfmtrc.json --check tests/src/styles/tokens.test.ts guides/veneer.md` | 0 | `tkp-instruments/r9/tkp-9-oxfmt-check.log.txt` |
| typecheck | `npm run check` | 0 | `tkp-instruments/r9/tkp-9-check.log.txt` |
| lint | `npm run lint:check` | 0 | `tkp-instruments/r9/tkp-9-lint.log.txt` |
| styles build | `npm run build:src:styles` | 0 | `tkp-instruments/r9/tkp-9-build-styles.log.txt` |
| tokens test | `npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/tokens.test.ts` | 0 | `tkp-instruments/r9/tkp-9-vitest-tokens.log.txt` |
| guides parity | `npm run test:guides` | 0 | `tkp-instruments/r9/tkp-9-test-guides.log.txt` |

Every gate exited 0.

## Evidence

- `tkp-9.diff` — `git diff 2376710`.
- `tkp-instruments/r9/tkp-9-delta.diff` — this round alone, against the round-8 backups
  (`tmp/units/tokens.test.ts.bak-9`, `tmp/units/veneer.md.bak-9`). It touches only the stripe
  comment and the two named sentences with their paragraph re-wraps.
- `tkp-9-status.txt` — `git status --porcelain`, showing only
  `guides/veneer.md` and `tests/src/styles/tokens.test.ts` modified.

## Deviation

None. Every Evidence reading matched what round 8 left in the tree before editing.
