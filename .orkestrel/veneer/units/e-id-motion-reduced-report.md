# Unit E-ID-MOTION-REDUCED report

`opus` on Opus 5.5, native, sole writer in `/home/user/veneer-mred` (branch `unit/mred`, base `21c821a`). Under the
reduced-motion preference the placeholder glow, the placeholder wave, and both spinners run no animation. The grow
spinner renders at opacity `1` with no transform and keeps its label in the accessibility tree. Each state is read from
the rendered page. Every acceptance gate exited 0.

## Release readings

These readings come from `node_modules/bootstrap/dist/css/bootstrap.css` (Bootstrap 5.3.8). Each of these animations
departs from the release.

| Animation | Release treatment under `(prefers-reduced-motion: reduce)` | Veneer after this unit | Parity or departure |
| --- | --- | --- | --- |
| `.placeholder-glow .placeholder` | No rule. The glow runs (`animation: placeholder-glow 2s ease-in-out infinite`, around line 6802) | `animation: none` | Departure |
| `.placeholder-wave` | No rule. The wave runs (`animation: placeholder-wave 2s linear infinite`, around line 6816) | `animation: none` | Departure |
| `.spinner-border` | `--bs-spinner-animation-speed: 1.5s`, so the ring keeps turning (the `@media` block around line 6269) | `animation: none` | Departure |
| `.spinner-grow` | The same `1.5s` block. The dot keeps pulsing, and its resting `opacity: 0` stays | `animation: none`, `opacity: 1` | Departure |

The release already stops the progress stripes (`.progress-bar-animated { animation: none }`, around line 4988). That
rule is parity, and this unit leaves it alone.

## Failing-first and green readings

The command for both readings is
`npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/components/placeholder.test.ts tests/src/styles/components/spinner.test.ts`.
Each reading ran after `npm run build:src:styles`.

| Reading | Cascade | Result | Log |
| --- | --- | --- | --- |
| Red, before the fix | Base partials at `21c821a` | `Tests  8 failed \| 25 passed (33)`, exit 1 | `tmp/units/mred-red.log.txt` |
| Red, final proofs | Base partials written back by the `base` plant | `Tests  8 failed \| 25 passed (33)`, exit 1 | `tmp/units/mred-plant-base.log.txt` |
| Green | Landed partials | `Tests  33 passed (33)`, exit 0 | `tmp/units/mred-green.log.txt` |

The first red reading ran before I added the wave's `mask-position` assertion. The `base` plant re-ran the final proofs
against the base partials, and the same tests failed.

These are the failing-first tests:

- `placeholder classes > stops the glow and the wave under the reduced-motion preference and runs them again without it`
  replaces `keeps the glow and the wave running under the reduced-motion preference`. Before the preference it reads each
  timeline as `[['running', 2000]]`. Under the preference it reads `getAnimations()` as `[[], []]`, `animation-name` as
  `none`, the glow's opacity as `0.5`, and the wave's `mask-position` as `0% 0%`. After release it reads the running
  timelines again.
- `placeholder classes > gates its animations on the reduced-motion preference and nothing on a width boundary` replaces
  `gates no rule of this family on a query`. The set of conditions is `{(prefers-reduced-motion: reduce)}`, and no
  condition is a width.
- `spinner classes > stops $name under the reduced-motion preference and turns it again without it` has one row for each
  of `spinner-border`, `spinner-border-sm`, `spinner-grow`, and `spinner-grow-sm`. It replaces
  `keeps $name turning under the reduced-motion preference and halves its speed`. Each row reads
  `[['running', 750]]` before and after the preference, and `[]` with `animation-name: none` under it.
- `spinner classes > shows $name as a whole still disc under the reduced-motion preference and keeps its label` has rows
  for `spinner-grow` and `spinner-grow-sm`. Under the preference it reads opacity `1`, transform `none`, and the box at
  its own size. The `.visually-hidden` label reads `isRendered` true, and `readText` reads `Loading...`.

## Rules as written

The compiled cascade in `dist/src/styles/index.css` writes these rules:

```css
@media (prefers-reduced-motion:reduce){.spinner-grow,.spinner-border{animation:none}}
@media (prefers-reduced-motion:reduce){.spinner-grow{opacity:1}}
@media (prefers-reduced-motion:reduce){.placeholder-glow .placeholder{animation:none}}
@media (prefers-reduced-motion:reduce){.placeholder-wave{animation:none}}
```

The source changes are these:

- The `src/styles/components/_placeholder.scss` partial gains `@use '../mixins' as *;`. It nests
  `@include reduced-motion { animation: none; }` in the glow rule and in the wave rule, and each rule's comment states
  the stop and the release's treatment.
- In the `src/styles/components/_spinner.scss` partial, the shared `.spinner-grow, .spinner-border` rule nests
  `@include reduced-motion { animation: none; }`. The `.spinner-grow` rule nests `@include reduced-motion { opacity: 1; }`.
  The trailing `1.5s` block and its "slows rather than stops" comment are gone. Replacement comments state the rule: every
  animation stops, and the status role and label report the wait. They also state why the disc gets full opacity.
- I decided not to write `transform: none` for the grow spinner. Its only scale comes from the `spinner-grow` keyframe,
  so `animation: none` already leaves no transform. The proof reads `transform` as `none` under the preference, and the
  `spinner-slow` plant shows that reading fails while an animation still runs. A separate declaration would add a ledger
  row and change nothing on screen.

## Guide rows and the table each went into

`npm run test:conformance` measured these rows (first run: `tmp/units/mred-conformance-first.log.txt`), and each went
into the table the ledger reported:

| Row | Table |
| --- | --- |
| `spinner \| .spinner-border \| --bs-spinner-animation-speed \| @media (prefers-reduced-motion: reduce) \| 1.5s \| — \| dropped` | § Departures, a `spinner` subsection added between `row-gap` and `sticky` |
| `spinner \| .spinner-grow \| --bs-spinner-animation-speed \| @media (prefers-reduced-motion: reduce) \| 1.5s \| — \| dropped` | § Departures, `spinner` |
| `spinner \| .spinner-grow { animation } \| @media (prefers-reduced-motion: reduce) \| declaration` | § Additions, after `focus-ring` |
| `spinner \| .spinner-border { animation } \| @media (prefers-reduced-motion: reduce) \| declaration` | § Additions |
| `spinner \| .spinner-grow { opacity } \| @media (prefers-reduced-motion: reduce) \| declaration` | § Additions |
| `placeholder \| .placeholder-glow .placeholder { animation } \| @media (prefers-reduced-motion: reduce) \| declaration` | § Additions |
| `placeholder \| .placeholder-wave { animation } \| @media (prefers-reduced-motion: reduce) \| declaration` | § Additions |

The ledger's reading is split. The dropped `1.5s` speed is a departure, and each `animation: none` and the grow
opacity are declaration additions. The first conformance run failed the dark-rules and planted-literal cases as well.
Both of those cases read `departures.unrecorded` and `additions.unrecorded`, and both passed after I recorded the rows.

I made these prose edits in the `guides/veneer.md` file:

- § Spinner classes: the reduced-motion paragraph states that both spinners stop, names the release's `1.5s`
  treatment, and points at § Departures and § Additions. It also states the grow spinner's whole, fully opaque disc and
  its label. The proof sentence names the reduced-motion readings.
- § Placeholder classes: I removed the paragraph that said neither animation is gated. A departure bullet, "Both
  animations stop under the reduced-motion preference.", now leads the key's departures list. The proof sentence names
  the reduced-motion readings.
- § Keyframes: the introduction states Veneer's treatment beside the release's. The `spinner-border`, `spinner-grow`,
  `placeholder-glow`, and `placeholder-wave` cells now read `Stopped: …` and name the release's treatment. The `Name`
  and `Key` cells are unchanged.
- § Compatibility: the `spinner | variable` row no longer says the preference retunes the speed. The
  `placeholder | selector` row now says it proves geometry and motion. These rows stated the old motion, so I corrected
  them inside the owned guide.

## Plant table

`tmp/units/mred-plants.sh` drove each plant, and `tmp/units/mred-plant.py` applied it. After each run the script wrote
the landed partials back from copies and compared their `sha256sum` output with the output read before the run.

| Plant | Change | Failing proofs (AssertionError) | Count line | Restore |
| --- | --- | --- | --- | --- |
| `spinner-slow` | Drops the shared rule's `animation: none` and writes back the release's trailing `1.5s` block | `stops $name …` for every spinner row (`expected [ CSSAnimation{} ] to deeply equal []`); `shows $name as a whole still disc …` for both grow rows (`expected 'matrix(0.022…)' to be 'none'`) | `6 failed \| 27 passed (33)` | byte-identical |
| `glow-drop` | Drops the glow's reduced-motion include | `stops the glow and the wave …` (`expected [ [ CSSAnimation{} ], [] ] to deeply equal [ [], [] ]`) | `1 failed \| 32 passed (33)` | byte-identical |
| `grow-opacity` | Drops the grow spinner's `opacity: 1` include | `shows $name as a whole still disc …` for both grow rows (`expected '0' to be '1'`) | `2 failed \| 31 passed (33)` | byte-identical |
| `base` | Writes both partials back to their `21c821a` bytes | The failing-first tests in the preceding section | `8 failed \| 25 passed (33)` | byte-identical |

The logs are the `tmp/units/mred-plant-<name>.log.txt` files. After the plants ran, the script rebuilt the landed
cascade (`tmp/units/mred-build-final.log.txt`, exit 0).

## Gate table

`tmp/units/mred-gates.sh` ran each gate. The load average is the first line of each log.

| Gate | Command | Reading | Exit | Load average | Log |
| --- | --- | --- | --- | --- | --- |
| Format | `./node_modules/.bin/oxfmt --config .oxfmtrc.json --check` over the owned files | All matched files use the correct format | 0 | 6.88 5.64 4.28 | `tmp/units/mred-format.log.txt` |
| Check | `npm run check` | Clean | 0 | 7.36 5.80 4.36 | `tmp/units/mred-check.log.txt` |
| Lint | `npm run lint:check` | Clean | 0 | 7.54 6.08 4.52 | `tmp/units/mred-lint.log.txt` |
| Conformance | `npm run test:conformance` | `Tests  26 passed (26)` | 0 | 7.54 6.08 4.52 | `tmp/units/mred-conformance.log.txt` |
| Guides | `npm run test:guides` | `Tests  26 passed (26)` | 0 | 6.31 5.97 4.54 | `tmp/units/mred-guides.log.txt` |
| Policy | `npm run test:policy` | `Tests  109 passed \| 1 skipped (110)` | 0 | 6.82 6.10 4.60 | `tmp/units/mred-policy.log.txt` |
| Styles, observation | `npm run test:src:styles` | `Test Files  115 passed (115)`, `Tests  1507 passed (1507)` | 0 | 7.00 6.14 4.63 | `tmp/units/mred-styles.log.txt` |

## Diff and status

- `tmp/units/mred.diff` is the output of `git diff 21c821a`. Its `--stat` reading is: `guides/veneer.md` 67,
  `src/styles/components/_placeholder.scss` 16, `src/styles/components/_spinner.scss` 24,
  `tests/src/styles/components/placeholder.test.ts` 56, `tests/src/styles/components/spinner.test.ts` 60, with
  `150 insertions(+), 73 deletions(-)`.
- `tmp/units/mred-status.txt` is the output of `git status --short`. It lists the owned files named in the preceding
  bullet as modified and no other path.

## Shared-file patches

None. The existing `REDUCED_MOTION` and `parseMediaWidth` exports of the `tests/setupStyles.ts` module, and the
`isRendered` and `readText` readers of `@orkestrel/test/browser`, covered every reading. The `_mixins.scss` partial's
`reduced-motion` mixin needed no change.

## Deviation state

No stop. I settled these ancillary choices:

- I ran `npm run build:src:core` and `npm run build:src:browser` in this worktree
  (`tmp/units/mred-build-entries.log.txt`, exit 0). Without `dist/src/core/index.js`, the conformance case
  `runtime boundaries > bundles no forbidden runtime into a published JavaScript entry` fails with `ENOENT`, and that
  would block acceptance criterion 4. The build wrote only this worktree's `dist/`.
- I wrote no `transform: none` declaration. The Rules as written section gives the reason.
- I updated the § Compatibility rows in the owned guide because they stated the old spinner motion.

## Sites searched and observations

I searched `tests/`, `guides/`, `src/`, and `app/` for `1.5s`, `spinner-animation-speed`, `placeholder-glow`, and
`placeholder-wave`. I own every site whose claim this change makes false, and I updated each one. These sites stay
true:

- The `tests/fixtures/oracle/inventory.json` file records the release's own values, including `1.5s`. Those values are
  still the release's, and the ledger reads them.
- The `tests/setupServer.test.ts` file (off-limits) writes `Slowed to \`1.5s\`.` into a scratch guide it builds to test
  the `readKeyframes` reader. It asserts nothing about the shipped guide.
- The `tests/setup.ts` file (not owned) registers a `glowing-placeholder` cascade key that reads `animation-name`.
- `tests/app/browser/integration.test.ts` (off-limits) holds journeys that read these animations. The cascade-keys journey compares the
  `glowing-placeholder` key's `animation-name` between the specimen and its lifted copy. The journey "holds each grow
  spinner at the keyframe that paints its whole disc" reads the grow spinner's running animation. Both run without the
  reduced-motion preference. The integration file stages that preference only inside named button, link, and form cases and
  inside `FRAMES.focus`. No focus scenario names a spinner or a placeholder. I have not run the app project, so the
  claim that these readings stay the same comes from reading the source, not from a run. Take that run on the host
  after the unit lands.
- No engine proof under `tests/src/browser/**` names a spinner or a placeholder.
