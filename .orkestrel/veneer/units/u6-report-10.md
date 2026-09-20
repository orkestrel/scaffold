# Unit U6 — report 10: one paragraph

## What changed

`guides/test.md` § Bounds, the `holdAccessible` bullet: re-flowed as one greedy fill at the
100-column width the `stageMedia` bullet below it uses. No word changed. Ran
`npx oxfmt --config .oxfmtrc.json --write guides/test.md`, which reformatted the whole file to its
canonical form (the file was already dirty from prior U6 successors and had not been run through
the formatter since); the bullet's own wrapping was unaffected by that pass.

## Diff (`guides/test.md`, the bullet)

```diff
-- **`holdAccessible` maps through the tester iframe's painted scale and reads `:active` back.**
-  It presses the control's centre and releases before refusing a missed press. If that release
-  also rejects, the missed-press refusal carries it as its cause. That path can't be driven from
-  inert input against a conforming engine, because the marker is built from the coordinates the
-  press used; it is covered by review. The measured layout is a single accessible, uniformly
-  scaled tester iframe. A covered centre or unsupported geometry can refuse
-  even when the resolver accepts the target. The verb inherits the resolver's focus reachability
-  conditions.
++- **`holdAccessible` maps through the tester iframe's painted scale and reads `:active` back.** It
++  presses the control's centre and releases before refusing a missed press. If that release also
++  rejects, the missed-press refusal carries it as its cause. That path can't be driven from inert
++  input against a conforming engine, because the marker is built from the coordinates the press
++  used; it is covered by review. The measured layout is a single accessible, uniformly scaled tester
++  iframe. A covered centre or unsupported geometry can refuse even when the resolver accepts the
++  target. The verb inherits the resolver's focus reachability conditions.
```

## Line lengths (bullet range, lines 1608–1614)

```text
1608 98
1609 96
1610 97
1611 95
1612 100
1613 96
1614 73
```

Every line but the last fills toward the 100-column width (the next word would overflow it), and
none ends a short fragment.

## Gates

`npx oxfmt --config .oxfmtrc.json --write guides/test.md`

```text
Finished in 936ms on 1 files using 16 threads.
```

`npm run format:check` — exit 0

```text
Checking formatting...

All matched files use the correct format.
Finished in 1132ms on 60 files using 16 threads.
```

`npm run test:guides` — exit 0

```text
 Test Files  1 passed (1)
      Tests  50 passed | 1 skipped (51)
```

## `git status --porcelain`

```text
 M guides/test.md
 M src/browser/constants.ts
 M src/browser/helpers.ts
 M src/browser/types.ts
 M tests/setup.ts
 M tests/src/browser/helpers.test.ts
```

Six files, matching acceptance criterion 3. The five files besides `guides/test.md` were already
dirty from prior U6 successors; this unit touched only the `holdAccessible` bullet.

## Deviations

None. No other line of `guides/test.md` changed beyond what `oxfmt` normalized mechanically across
the whole file per step 2 of the brief; no word in the bullet changed.

## Acceptance criteria

1. Met — the bullet is one greedy fill at 100 columns, words unchanged.
2. Met — `format:check` and `test:guides` both exit 0.
3. Met — `git status --porcelain` lists the six U6 files and nothing else.
