# Unit TOKEN-PROOFS round 10 report

## Items

### Item 1 — stripe case comment (`tests/src/styles/tokens.test.ts`)

Before:

```
// Each mode scope declares the stripe again, with the declaration the `:root` selector
// writes, so a reading on an island cannot tell where its value was declared. Each mode's
// own declaration list is what places the stripe beside the hover and active percentages.
```

After:

```
// Each mode scope declares the stripe again, with the declaration the `:root` selector
// writes. With no override, an island reads the same default whether it declares the
// stripe or inherits it, so these readings cannot place the declaration; each mode's own
// declaration list is what places the stripe beside the hover and active percentages.
```

### Item 2 — `theme` paragraph (`guides/veneer.md`, § Tokens › § Departures)

Before:

```
selector alone, and an island inherits each one from its parent, so a light island nested in a dark
one reads the document value unless an ancestor below the root overrides the name; the
`tests/src/styles/theme.test.ts` proof reads every such name there. The dark component rules the
form select, form check, navbar, and accordion partials write match the release and carry no row.
```

After:

```
selector alone, and an element that does not override one inherits it from its parent, so a light
island nested in a dark one reads the document value unless the island or an ancestor below the
root overrides the name; the `tests/src/styles/theme.test.ts` proof reads every such name there.
The dark component rules the form select, form check, navbar, and accordion partials write match
the release and carry no row.
```

## Gate table

| Gate                                                                             | Log                             | Exit |
| --------------------------------------------------------------------------------- | -------------------------------- | ---- |
| `oxfmt --check` over the owned files                                              | `tkp-instruments/r10/tkp-10-oxfmt.log.txt`  | 0    |
| `npm run check`                                                                    | `tkp-instruments/r10/tkp-10-check.log.txt` | 0    |
| `npm run lint:check`                                                               | `tkp-instruments/r10/tkp-10-lint.log.txt`  | 0    |
| `npm run build:src:styles`                                                         | `tkp-instruments/r10/tkp-10-build.log.txt` | 0    |
| `npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/tokens.test.ts` | `tkp-instruments/r10/tkp-10-vitest.log.txt` | 0    |
| `npm run test:guides`                                                              | `tkp-instruments/r10/tkp-10-guides.log.txt`| 0    |

Evidence readings for both Items matched the brief's quoted text before editing; no reading
differed, and no gate read red.

## Artifacts

- `tkp-10.diff` — `git diff 2376710`.
- `tkp-instruments/r10/tkp-10-delta.diff` — this round alone, against the backups
  (`tmp/units/tokens.test.ts.bak-10`, `tmp/units/veneer.md.bak-10`).
- `tkp-10-status.txt` — `git status`.

The delta touches only the stripe case's comment and the `theme` paragraph named in the Items;
no other line moved.
