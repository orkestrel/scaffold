# Unit LEDGER-RETUNE round 2, continued — the Orchestrator's ruling on the root font size

Successor to `ledger-retune-brief-2.md`, which stays in place unedited and still binds except where this brief
overrides it. What changed: round 2 stopped on its deviation contract (`lret-r2-stop-report.md`): `--vn-shadow-inset`
lost its only witness once the resolver varied the root font size. This brief rules the fork, grants the files the
ruling needs, and sends the unit on to finish round 2. The work already in `/home/user/veneer-lret` (uncommitted over
`7952712`) stays; build on it.

## Role and engine

`opus` on Opus 5.5, the same sole writer in `/home/user/veneer-lret`, as `ledger-retune-brief-2.md` states.

## The ruling

1. **Keep the `root` and `viewport` settings.** A `rem` term reads the root font size and a `vw` term the viewport, and a
   reader's default font size and window are contexts a consumer's page runs in, so Item 1's rule covers them: a pair
   is alike only where it computes alike under every setting. The `display`, `legend`, and `.col-form-label` rows read
   `retuned`, as the gate prints them.
2. **Write `--vn-shadow-inset` in px.** The release writes `--bs-box-shadow-inset` as `inset 0 1px 2px` while it writes
   its other shadows in rem, so the token takes the release's unit:
   `inset 0 calc(1px * var(--vn-factor-elevation)) calc(2px * var(--vn-factor-elevation)) rgba(var(--vn-palette-black-rgb), 0.075)`.
   The `theme` `--bs-box-shadow-inset` row then reads `tokenized`, and the token keeps its witness under every setting.
   `--vn-shadow-1`, `-2`, and `-3` keep rem, as the release's shadows do.

## Scope, added to round 2's

**Owned, added.** The `--vn-shadow-inset` declaration in `src/styles/_tokens.scss`; the `--vn-shadow-inset` rows of the
guide's § Tokens tables and § Reference map; every test or setup table that pins that token's written value (search
`tests/` for `0.0625rem * var(--vn-factor-elevation)) calc(0.125rem` and for `--vn-shadow-inset`, and own each hit that
pins the inset token). The guide's § Departures rows the gate prints stay Owned, as round 2 states.

**Off-limits.** As round 2, and every other declaration of `src/styles/**`.

## Execution

Perform the assignment directly and spawn nothing.

1. Apply Ruling 2, then run `npm run build:src` and `npm run test:conformance`; the witness case passes, and the member
   drift is the rows Ruling 1 names. If any other `bootstrap` token loses its witness, or any other row changes member,
   stop and report it.
2. Apply the drift to § Departures from the gate's output.
3. Finish round 2 as `ledger-retune-brief-2.md` states: Item 7 (the guide, which now also states that the resolver varies
   the root font size and the viewport, and names the settings in the words the code uses), Item 6 (the mutation driver
   and every plant of its Execution step 6, adding a `root` mutation that drops the `root` setting and must fail a case
   with an `AssertionError`), the contended timing reading with the derived `LEDGER_TIMEOUT`, and every Acceptance gate
   there. `npm run test:src:styles` joins the observations, because the token's written value changed.
4. Report the Evidence discrepancies you found (the second `normalizeDeclaration` case pair, where
   `normalizeDeclarationValue` lives) in the report; they need no change.

## Output

Write `tmp/units/r2/lret-report-3.md` and return the same text, in the shape `ledger-retune-brief-2.md` § Output names,
covering the whole of round 2: the stop, the ruling applied, and everything done after it. Refresh `tmp/units/r2/lret-2.diff`,
`lret-2-full.diff`, and `lret-2-status.txt` at the end.

## Deviation contract

As round 2's, and stop when Execution step 1 finds a witness or a member change the ruling does not name.
