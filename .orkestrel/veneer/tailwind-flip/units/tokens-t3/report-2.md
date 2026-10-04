# tokens-t3 — stopped on 26 chrome departures outside the neutrality ruling

The revised P4 reading admits **184 token departures** at 1280 px under `Tailwind + layer`, but still refuses **26 longhands** outside the ruling's enumerated geometry properties: 11 `perspective-origin`, 11 `transform-origin`, and one each of `inset-inline-end`, `inset-inline-start`, `left`, and `right`. Two runs reproduce the same record (`cmp` exits 0); both probes exit 1. The brief's stop condition applies. Bootstrap and Tailwind, no layer have no remaining departures.

The contrast implementation is complete and its focused test passes: all five header buttons under each face and all four showcase subjects in both themes exceed 4.5:1. The remaining T3 implementation and ordered acceptance sequence are not complete. Only `tests/app/browser/Showcase.test.ts` is modified among tracked files. Nothing was committed.

## Deviation

- **Expected:** the appended neutrality ruling admits palette, font, radius, shadow, and font-attributed geometry departures. Its geometry list is “a box, `width`, `height`, `inline-size`, `block-size`, `line-height`, `letter-spacing`”; it says “anything else is refused.” The deviation contract says to stop when P4 reads a chrome departure.
- **Found:** after the earlier exclusions and the newly permitted token attribution, P4 still refuses 26 longhands under the layer at 1280 px in light mode. For the brand group, `perspective-origin` changes from `98.125px 10.5px` to `88.8281px 10.5px`, and `transform-origin` from `98.1328px 10.5px` to `88.8359px 10.5px`. For the visually hidden status paragraph, `left` and `inset-inline-start` change from `803.516px` to `849.641px`; `right` and `inset-inline-end` change from `477.484px` to `431.359px`. These properties are not in the ruling's list.
- **Evidence:** [adapted P4](p4.ts), [record A](p4-2-a.json), [record B](p4-2-b.json), [run A stderr](p4-2-final-a.err), [run B stderr](p4-2-final-b.err). The source probe under `tmp/units/flip-header/` is unchanged. The adapted probe reads the actual token record, resolves the scale literals and references in the rendered page, preserves alpha for color pairs, admits SVG fill colors, and checks font ancestry for only the enumerated geometry properties. The probe is light-mode-only, like its source; it makes no dark-neutrality claim. Its first development run reported 36 remaining differences before alpha-color and SVG-fill attribution were corrected; the final repeatable refusal is 26.
- **Done or not done:** contrast assertions and measurements are complete; the adapted P4 has been run twice with equal records. P4 stops at 1280 px before reaching 390 or 768 px. The durable neutrality case remains unchanged. No caption, specimen, token expectation, partition, component baseline, map, app markup, guide, or showcase artifact was changed. Full acceptance has not started. Only evidence confirmation and formatting of the completed contrast change followed the stop finding.
- **One hypothesis:** the font substitution changes element widths, which changes the resolved 50% origins and the automatic position of the hidden status paragraph. These appear to be further text-metric consequences, but the explicit allowance does not include their longhands; this unit does not extend it.

## Caption strings

None changed or added before the stop. The caption and specimen work remains pending; no new caption string is certified.

## Token rows and readings

No `TAILWIND_READINGS` row was added or changed. Existing wrong-caption and modal-width controls remain unchanged and were not rerun. The token attribution counts below belong to P4, not to the specimen readings table or the partition.

| Width / theme | Face | Palette | Font | Radius | Shadow | Geometry, including boxes | Refused |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| 1280 / light | Bootstrap | 0 | 0 | 0 | 0 | 0 | 0 |
| 1280 / light | Tailwind, no layer | 0 | 0 | 0 | 0 | 0 | 0 |
| 1280 / light | Tailwind + layer | 134 | 16 | 0 | 0 | 34 | 26 |
| 390 and 768 | Every face | — | — | — | — | — | Not reached |

The layer's 34 admitted geometry readings include the 12 box differences in the first report. Earlier exclusions remain: under no layer, 16 `tab-size` and 78 zero-width border-style readings; under the layer, 16 `tab-size`, 78 zero-width border-style, and 86 zero-width border-color readings. No other exclusion kind is populated. The inversion/reapplication check reads 16,246 surface subjects and 2,979 chrome elements; the remaining replaced-class census is 0, with no refused inversion/reapplication departure.

| Width / theme | Bootstrap header | No-layer header | Layer header |
| --- | ---: | ---: | ---: |
| 1280 / light | 48 px | 48 px | 48 px |
| 390 and 768 | Not reached | Not reached | Not reached |

At 1280, all five buttons are 31 px tall under every face, equal to one line plus padding and borders. Both groups stay on one row without overflow. The Containers and Tailwind contents links land within the probe's 1 px tolerance of the 8 px gap under each face; the sticky contents spans from y=48 to y=800. Narrow invariants and the complete durable per-face invariant case remain unproven in this run.

## Contrast ratios

The focused test `reads every header button at 4.5:1 or more, pressed or not, in both color modes` passes, including its deliberately sub-4.5 control and accepted control in each face/theme. [Full readings and test result](contrast-2.log). Ratios below are rounded to six decimals; assertions use the unrounded readings.

Header ratios in light mode:

| Face | Bootstrap button | No-layer button | Layer button | Light button | Dark button |
| --- | ---: | ---: | ---: | ---: | ---: |
| Bootstrap | 4.689302 | 21 | 21 | 4.689302 | 21 |
| Tailwind, no layer | 21 | 4.689302 | 21 | 4.689302 | 21 |
| Tailwind + layer | 21 | 21 | 4.836368 | 4.836368 | 21 |

Header ratios in dark mode:

| Face | Bootstrap button | No-layer button | Layer button | Light button | Dark button |
| --- | ---: | ---: | ---: | ---: | ---: |
| Bootstrap | 4.689302 | 15.426285 | 15.426285 | 15.426285 | 4.689302 |
| Tailwind, no layer | 15.426285 | 4.689302 | 15.426285 | 15.426285 | 4.689302 |
| Tailwind + layer | 20.134270 | 20.134270 | 4.836368 | 20.134270 | 4.836368 |

Pressed buttons pair white with `rgb(108, 117, 125)` on the Bootstrap/no-layer faces and with `rgb(106, 114, 130)` under the layer. Unpressed buttons are black over the white body in light mode, and white over the dark body in dark mode. The reader composites their transparent backgrounds.

Four showcase subjects:

| Theme | Face | Veneer heading | Containers lead | Container widths caption | Containers contents link |
| --- | --- | ---: | ---: | ---: | ---: |
| Light | Bootstrap | 15.426285 | 6.781063 | 15.426285 | 21 |
| Light | Tailwind, no layer | 15.426285 | 6.781063 | 15.426285 | 21 |
| Light | Tailwind + layer | 20.134270 | 9.585666 | 20.134270 | 21 |
| Dark | Bootstrap | 11.846723 | 7.292024 | 11.846723 | 15.426285 |
| Dark | Tailwind, no layer | 11.846723 | 7.292024 | 11.846723 | 15.426285 |
| Dark | Tailwind + layer | 16.262354 | 9.168423 | 16.262354 | 20.134270 |

The layer's heading/caption foreground is `rgb(3, 7, 18)` in light mode and `rgb(229, 231, 235)` in dark mode; the lead uses the same channels at alpha 0.75. No contrast stop was triggered and no map value was changed.

## Partition counts

Not measured. The partition's `mapReading` integration, unmapped primary-button control, and 1140 px modal control were not implemented or rerun before the stop. No partition pass is claimed.

## Moved expectations

None of T2's handed-over expectations or baselines was changed. Pending movements from the launch ruling are:

| Subject | Before | Required after under the layer | Status |
| --- | --- | --- | --- |
| Dark body, face/theme and pair tables | `rgb(33, 37, 41)` | `rgb(3, 7, 18)` | Pending |
| Container at 1280 | `1140px` | `1280px` | Pending |
| Bare `th` and `td` border, light | `rgb(222, 226, 230)` | `rgb(209, 213, 220)` | Pending |
| Bare `th` and `td` border, dark | `rgb(73, 80, 87)` | `rgb(74, 85, 101)` | Pending |
| Preservation baseline | Lifted Bootstrap alone | Tuned sheet alone | Pending |
| Bootstrap winner in partition | Same-element unmapped Bootstrap reading | Same-element role/longhand token reading | Pending |
| Paired engine component baseline | Existing baseline | Tuned sheet alone, with no changed engine expectation | Pending |

Bootstrap and unexcluded expectations remain unchanged. The affected J4, matrix, pair, preservation, partition, and downstream portfolio cases were not rerun.

## T4 guide handoff

The intended replacement sentence cannot yet be certified for all widths. A truthful sentence at the current stop is: “At 1280 px in light mode, the header's layered face admits 134 palette, 16 font, and 34 font-related geometry departures, but 26 additional origin and position longhands remain outside the neutrality allowance; the unexcluded face has no remaining departure after the existing exclusions.”

This is stop-state evidence, not approval to publish the stronger claim that the chrome departs only by token rows. The 390/768 counts and the remaining departures must be resolved before T4 writes that claim. No guide prose was edited.

## Wall times

Dispatch-launcher durations, with no simultaneous T3 command competing with each measured run:

| Command | Exit | Seconds |
| --- | ---: | ---: |
| Focused contrast test, Vitest `app:browser` | 0 | 16.970 |
| Adapted P4, development reading before alpha/fill correction | 1 | 19.590 |
| Adapted P4, final reading A | 1 | 18.601 |
| Adapted P4, final reading B | 1 | 17.535 |
| `cmp p4-2-a.json p4-2-b.json` | 0 | Not timed |

The focused test reports 1 passed and 18 filtered-out tests, with a Vitest duration of 15.56 s and test execution of 4.58 s. The three-face journey did not run: comparison with 446–591 s and T2's 495 s, and per-case partition, preservation, and paired-engine costs remain unread.

## Digests and stamp

Current artifacts, unchanged by this run; these are not a T3 rebuild:

| Artifact | SHA-256 |
| --- | --- |
| `showcase/browser.html` | `c67257a16b744703bc392a31473cc9a44d02ed24a3840c0b18c1e10d9c2f061b` |
| `dist/src/bootstrap/index.css` | `7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f` |
| `dist/src/tailwindcss/index.css` | `9a20b9662d0ee44abc317e2fbd31d16e1f81e46de9be4166e865c846b659edeb` |

Both sheet digests match the launch ruling. The unchanged showcase stamp is `8a9a7370413aa317683272254b0ce54fe077579e47605ab1ca1ad036bd5be138`. P4 used the app build produced in the first run; no app source has changed since it was built.

## Acceptance table

The ordered acceptance sequence was not started. Focused implementation checks and stop-state evidence are distinguished below from acceptance passes.

| Prescribed command | Exit | Status |
| --- | --- | --- |
| `npm run check` | — | Not run; stopped on P4 |
| `npm run lint:check` | — | Not run |
| `npm run format:check` | — | Not run |
| `npm run test:app:browser` | — | Full command not run; focused contrast test passed |
| `npm run test:setup:browser` | — | Not run |
| `npm run build:app:browser` | — | Not rerun; existing app build used for P4 |
| `npm run build:showcase` | — | Not run |
| `sha256sum showcase/browser.html dist/src/bootstrap/index.css dist/src/tailwindcss/index.css` | 0 | Stop-state readings only |
| Adapted P4, twice | 1 / 1 | Refused the same 26 longhands at 1280; 390/768 not reached |
| `cmp tmp/units/tokens-t3/p4-2-a.json tmp/units/tokens-t3/p4-2-b.json` | 0 | Records byte-equal; this is a reproducible refusal, not a neutrality pass |
| `npm run test:journey` | — | Not run; no new journey failure to classify |
| `git diff --check` | 0 | Stop-state check |
| `git status --porcelain` | 0 | One modified tracked file, shown below |

## Git status

```text
 M tests/app/browser/Showcase.test.ts
```

HEAD remains `4333d768c9dc1b9b94efe1bb3008b6cab8a59bac`. The tracked change extends the existing contrast case to every face and measures the four showcase subjects, with positive and negative contrast controls. The first report is preserved. All new probe/report/evidence files are under the ignored `tmp/units/tokens-t3/` directory. No commit or release was made.
