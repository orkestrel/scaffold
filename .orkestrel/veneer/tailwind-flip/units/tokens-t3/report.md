# tokens-t3 — stopped on P4 chrome departure

P4 triggers the brief's deviation contract before implementation. Against a fresh app build at launch HEAD `4333d768c9dc1b9b94efe1bb3008b6cab8a59bac`, the unchanged header probe reports **210 departures, including 12 box departures**, under `Tailwind + layer` at 1280 px. `Bootstrap` and `Tailwind, no layer` each report **0 departures**. No tracked file changed. Nothing was committed.

## Deviation

- **Expected:** the brief requires P4 neutrality unchanged and says to “Stop and report … when … P4 reads a chrome departure.”
- **Found:** P4 exits 1 at 1280 px after its declared exclusions. The header's `color` reads `rgb(33, 37, 41)` under Bootstrap and `rgb(3, 7, 18)` under the layer. Its `border-bottom-color` reads `rgb(222, 226, 230)` and `rgb(209, 213, 220)`, respectively. Its font stack also changes, and the record contains 12 box differences. The probe stops before the 390 px iteration.
- **Evidence:** see [the complete P4 record](p4.json), [the compact reading](deviation.json), [P4 stderr](preflight-p4.err), and [the fresh app build](preflight-build.log). P4 reads 16,246 surface subjects and a chrome population of 2,979; the replaced-class census is 0. The `Tailwind + layer` exclusions count 16 `tab-size`, 78 zero-width border-style, and 86 zero-width border-color readings before the remaining 210 departures. The run uses Chromium 141.0.7390.37 and Node 22.22.2.
- **Done or not done:** the fresh app build and the unchanged P4 probe ran as a prerequisite check, before the ordered acceptance sequence. The T3 implementation and ordered acceptance sequence did not run. The second P4 run and `cmp` did not run because the first run triggered the stop condition. The map, header markup, neutrality assertion, and exclusions remain unchanged.
- **One hypothesis:** the mapped body, border, font, and button tokens reach header descendants, so the existing literal face-equality contract conflicts with the enabled token map. A ruling on that contract is required before this unit can continue.

## Caption strings

Not changed or remeasured. No specimen was added before the stop.

## Token rows and readings

No `TAILWIND_READINGS` row was added or changed. The P4 readings in the deviation are the only token-bearing before/after readings taken by this unit.

## Contrast ratios

Not measured. No contrast pass is claimed.

## Partition counts

Not measured. Neither `mapReading` nor its controls were implemented before the stop. The P4 population counts are not partition counts.

## Moved expectations

None. The T2 hand-over's dark body background, container width, table-border expectations, and tuned-alone component baselines remain pending.

## Wall times

The dispatch launcher recorded these durations on this host. No other T3 command ran concurrently with either command; external host load was not measured.

| Command | Exit | Seconds |
| --- | --- | --- |
| `npm run build:app:browser` — prerequisite build | 0 | 1.982 |
| `node tmp/units/flip-header/p4.ts` — prerequisite probe | 1 | 20.808 |

The three-face journey did not run. Its comparison against 446–591 s, T2's 495.022 s, and the partition, preservation, and paired-engine per-case costs remains unread.

## Digests and stamp

These are readings of the artifacts present at the stop, **not a T3 showcase rebuild**. Both stylesheet digests match the launch ruling.

| Artifact | SHA-256 |
| --- | --- |
| `showcase/browser.html` — unchanged | `c67257a16b744703bc392a31473cc9a44d02ed24a3840c0b18c1e10d9c2f061b` |
| `dist/src/bootstrap/index.css` | `7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f` |
| `dist/src/tailwindcss/index.css` | `9a20b9662d0ee44abc317e2fbd31d16e1f81e46de9be4166e865c846b659edeb` |

The unchanged showcase's `build-id` stamp reads `8a9a7370413aa317683272254b0ce54fe077579e47605ab1ca1ad036bd5be138`.

## Acceptance table

The ordered acceptance sequence was not started. The following table distinguishes prerequisite and stop-state readings from acceptance passes.

| Prescribed command | Exit | Status |
| --- | --- | --- |
| `npm run check` | — | Not run; stopped on prerequisite P4 |
| `npm run lint:check` | — | Not run |
| `npm run format:check` | — | Not run |
| `npm run test:app:browser` | — | Not run |
| `npm run test:setup:browser` | — | Not run |
| `npm run build:app:browser` | 0 | Prerequisite only; 1.982 s |
| `npm run build:showcase` | — | Not run |
| `sha256sum showcase/browser.html dist/src/bootstrap/index.css dist/src/tailwindcss/index.css` | 0 | Stop-state readings, without a showcase rebuild |
| `node tmp/units/flip-header/p4.ts`, twice with `cmp` | 1 | First prerequisite run failed; repeat and comparison not run |
| `npm run test:journey` | — | Not run; no failing journey titles to classify |
| `git diff --check` | 0 | Stop-state check |
| `git status --porcelain` | 0 | Empty output |

## Git status

`git status --porcelain` returns no bytes. HEAD remains `4333d768c9dc1b9b94efe1bb3008b6cab8a59bac`. Only ignored T3 evidence and the prescribed probe's ignored output were written; `dist/app/browser` was rebuilt. No tracked file was edited and no commit was made.
