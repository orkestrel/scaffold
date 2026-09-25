# Unit TOKEN-PROOFS round 8 report

Evidence readings re-taken before editing matched the brief exactly for all three sites; no stop
condition applied.

## Item 1 — describe-block comment (`tests/src/styles/tokens.test.ts`)

Before:

```
// alias follows its canonical token from a mode scope and not from a plain ancestor, and a rule
// reading that alias follows it from an ancestor, except inside a mode scope below that ancestor
// that declares it again. The scope case reads the published `--bs-*` aliases themselves, under a mode scope and
// under the document element. Every hover and press is read with motion reduced, so no reading
// lands partway through a transition.
```

After (re-wrapped at 100 columns):

```
// alias follows its canonical token from the root or a mode scope and not from a plain ancestor
// below the root, and a rule reading that alias follows it from an ancestor, except inside a mode
// scope below that ancestor that declares it again. The scope case reads the published `--bs-*`
// aliases themselves, under a mode scope and under the document element. Every hover and press is
// read with motion reduced, so no reading lands partway through a transition.
```

## Item 2 — scope-case comment (`tests/src/styles/tokens.test.ts`)

Before:

```
// declares the fixed ones once, so a mode-scope override reaches the mode aliases and not the
// root-only ones. A document-element override reaches both whether or not the document element
// carries a mode, because the override wins over that element's own mode scope, and a mode scope
// below it that re-declares the token keeps its own value.
```

After (re-wrapped at 100 columns):

```
// declares the fixed ones once, so an override on a mode scope below the root reaches the mode
// aliases and not the root-only ones. A document-element override reaches both whether or not the
// document element carries a mode, because the override wins over that element's own mode scope,
// and a mode scope below it that re-declares the token keeps its own value.
```

## Item 3 — § Color modes (`guides/veneer.md`)

Before:

```
keeps one value in every scope. The `:root` selector declares most such names alone, and an island
below the root inherits them from there. Each mode scope declares the `--vn-state-hover`,
`--vn-state-active`, `--vn-state-stripe`, `--vn-focus-highlight`, `--vn-focus-reset`, and
`--bs-heading-color` variables again, with the value the `:root` selector gives them.
```

After:

```
carries the same declaration in every scope. The `:root` selector declares most such names alone,
and an island inherits them from its parent. Each mode scope declares the `--vn-state-hover`,
`--vn-state-active`, `--vn-state-stripe`, `--vn-focus-highlight`, `--vn-focus-reset`, and
`--bs-heading-color` variables again, with the declaration the `:root` selector writes, so each
resolves against the tokens its own element holds.
```

## Gate table

| Gate | Command | Exit | Log |
| --- | --- | --- | --- |
| oxfmt check | `./node_modules/.bin/oxfmt --config .oxfmtrc.json --check tests/src/styles/tokens.test.ts guides/veneer.md` | 0 | `tkp-instruments/r8/tkp-8-oxfmt.log.txt` |
| typecheck | `npm run check` | 0 | `tkp-instruments/r8/tkp-8-check.log.txt` |
| lint | `npm run lint:check` | 0 | `tkp-instruments/r8/tkp-8-lint.log.txt` |
| styles build | `npm run build:src:styles` | 0 | `tkp-instruments/r8/tkp-8-buildstyles.log.txt` |
| tokens test | `npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/tokens.test.ts` | 0 | `tkp-instruments/r8/tkp-8-vitest.log.txt` |
| guides parity | `npm run test:guides` | 0 | `tkp-instruments/r8/tkp-8-guides.log.txt` |

Every log carries `/proc/loadavg` after its exit line. Load stayed in the range 2.17–3.54 on the
one-minute figure across all runs; no gate hit a timeout.

## Artifacts

- `tkp-8.diff` — `git diff 2376710`, the cumulative diff across all rounds.
- `tkp-instruments/r8/tkp-8-delta.diff` — this round's edits alone, against backups taken before the first
  edit.
- `tkp-instruments/r8/tkp-8-status.txt` — `git status`, showing `guides/veneer.md` and
  `tests/src/styles/tokens.test.ts` modified, nothing else.

No deviation occurred.
