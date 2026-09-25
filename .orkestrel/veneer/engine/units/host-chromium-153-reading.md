# The baseline's proofs on this host's browser build (a standing reading, 2026-09-23)

The engine session runs Veneer's gate chain on the user's Windows machine, where the browser projects launch Playwright's managed Chromium 153.0.8010.12 (E3). The baseline session runs the same chain in its cloud container on Chromium 141.0.7390.37 (ROADMAP § Standing conditions). Several proofs the baseline owns assert Chromium 141's answers, and Chromium 153 answers differently, so the chain reads red on this host at the baseline's own tip, before any engine landing.

## The measurement

Taken in a throwaway detached checkout of Veneer `a658879` (the baseline's tip at J-SEED's landing), installed from the lockfile, with `dist/src/styles/index.css` built there; the checkout was removed after the reading (`baseline-reds.sh` beside this file, its log `baseline-reds.log.txt`; the readings in the table are copied from that log).

| Proof | Assertion | Chromium 141 (the recorded expectation) | Chromium 153 (this host) |
| --- | --- | --- | --- |
| `tests/src/styles/components/form-select.test.ts:249` (reads its spacing … so both factors rescale it) | `readStyle(plain, 'background-position')` matches `/^right 12px 50%,/u` (line 277) | `right 12px 50%, …` | `calc(100% - 12px) 50%, 12px 50%` |
| `tests/src/styles/components/validation.test.ts:55` (carries the valid and invalid marks …), two cases | `readStyle(control, 'background-position')` equals `'right 9px 50%'` (line 77) | `right 9px 50%` | `calc(100% - 9px) 50%` |
| `tests/src/styles/components/validation.test.ts:280` (reaches every host through the scope …), two cases | `readStyle(area, 'background-position')` equals `'right 9px top 9px'` (line 335) | `right 9px top 9px` | `calc(100% - 9px) 9px` |
| `tests/src/styles/components/close.test.ts:35` (resolves the recorded content box, inset, and mark) | `readStyle(control, 'background-size')` equals `'14px'` (line 52) | `14px` | `14px auto` |
| `tests/service/tailwind/preflight.test.ts` (keeps every property the elements layer declares, and records every property the profile moves) | the measured preflight moves equal the guide's recorded rows (line 150) | `select | background-color | rgb(239, 239, 239) | …`, `select | height | 20px | 18px`, four `table | border-*-color` rows | `select | background-color | rgb(255, 255, 255) | …`, `select | height | 23px | 21px`, the four `table` rows absent |

Every row in the table is red at `a658879` on this host with the message the table records, and red at `97ac9ab` (J-SEED) with the same message in the verifier's chain (`j-seed-landing-gates.log.txt`) and in the Orchestrator's own `npm run test:src` run there. The close-control row was measured at `a658879` in a second throwaway checkout (`baseline-reds-2.sh` beside this file, its log `baseline-reds-2.log.txt`, same procedure), because the first run covered only the form-select, validation, and preflight files.

The cause is the browser build, not the cascade: Chromium 153 serializes a `background-position` written with the `right <length>` keyword form as `calc(100% - <length>)`, serializes a one-value `background-size` as `<length> auto`, and its user-agent defaults for `select` and `table` differ from 141's, which the preflight comparison reads through the guide's recorded departure rows.

## What this session does

- The engine landing gate is the chain green except these standing rows, each re-measured by the verifier at every landing and compared against this table; a new red row is a finding, and a row that turns green is struck here.
- The engine session edits none of these proofs: `tests/src/styles/**`, `tests/service/**`, and the guide's preflight rows are the baseline's (D43).
- This reading is the request to the baseline session at the next boundary: either the assertions accept both serializations of the same computed position (read the resolved offset rather than the serialized string, or match either form) and the preflight comparison records the Chromium build it measured against, or the baseline names Chromium 141 as the only receipt host and this session's landings record these rows as the host's standing reading. Two sessions pushing to one `main` with proofs that pass on one browser build and fail on the other is a campaign-level question, so it goes to the user as well.

## Struck rows (2026-09-23, later)

The baseline's `83d23cf` ("Read the mark and caret geometry and the preflight moves in a build-independent form", on `main` through its carousel push `518faf0`, under D45) reads the close, form-select, and validation proofs in a build-independent form; the verifier's chain on `55ca0cd` (`j-types-3-landing-gates.log.txt`) reads every style row of the table green on this host, so those rows are struck. The preflight row stays: `tests/service/tailwind/preflight.test.ts` still compares the measured moves with the guide's recorded rows and reads `select | height | 21px` against `18px` and the four `table | border-*-color` rows absent on this host. E5's gate is therefore the chain green except that one row until the baseline's close-out lands the preflight repair.

## New standing row (2026-09-23, the J-TYPES rounds 5 to 10 landing)

The verifier's chain on Veneer `main` `f538d48` (this session's landing over the baseline's `72e97e2`) reads one red row this table did not carry, on a file the baseline landed after the struck rows were measured:

| Proof | Assertion | Chromium 141 (the recorded expectation) | Chromium 153 (this host) |
| --- | --- | --- | --- |
| `tests/src/styles/components/accordion.test.ts:110` (lays each button out as a full-width row with its chevron at the end, and zeroes the header margin; the baseline's `53d3c21`) | `readStyle(button, 'background-size', '::after')` equals `'20px'` | `20px` | `20px auto` |

The cause is the one this file records for the struck `close.test.ts:35` row, the one-value `background-size` serialization, which D45 ruled build-independent for the close, form-select, and validation proofs; the accordion proof was written after that ruling in the same string form. The row is standing under E5 until the baseline applies D45's reading to it (the request is in `plan.md` § Requests to the baseline session), and this session's landing, whose diff against `72e97e2` touches `src/browser/types.ts` and `guides/veneer.md` alone, does not introduce it. The chain's `format:check` red on `ROADMAP.md` at the same reading is the baseline's file at its own tip and is recorded in the same request, not in this table.

## Second standing row (2026-09-23, the J-BINDER-PRECEDENCE landing)

The verifier's chain on Veneer `main` `468a118` (this session's landing over the baseline's wave-2 tip `3211b8d`; `j-binder-precedence-landing-gates.log.txt`) reads one more red row on a file the baseline landed in that wave:

| Proof | Assertion | Chromium 141 (the recorded expectation) | Chromium 153 (this host) |
| --- | --- | --- | --- |
| `tests/src/styles/components/navbar.test.ts:63` (lays the bar out as a wrapping row, writes no rule for the light class, and every shipped selector reaches the components layer; the baseline's NAVBAR landing in `3211b8d`) | a `background-size` reading equals `'100%'` | `100%` | `100% auto` |

The cause is the one-value `background-size` serialization the accordion row records, on a proof written in the same string form after D45's ruling. The row is standing under E5 until the baseline applies D45's reading to it (the request joins the accordion's in `plan.md` § Requests to the baseline session), and this session's landing, whose diff against `3211b8d` touches `src/browser/` sources, `tests/src/browser/` proofs, and `guides/veneer.md` alone, does not introduce it. The accordion row and the preflight row read red at `468a118` with the messages this file records, so E5's gate is the chain green except those three rows.

## Two rows closed (2026-09-24, the J-HELPERS landing)

The verifier's chain on Veneer `main` `afae42c` (`j-helpers-landing-verifier-report.md`) reads `npm test` green, so the accordion row (`tests/src/styles/components/accordion.test.ts:110`, the one-value `background-size` serialization) and the navbar row (`tests/src/styles/components/navbar.test.ts:63`, the same cause) no longer stand: the styles session's second batch (`9ce1a08` and its parents, merged into `afae42c`) landed the proofs that read the value by its serialized form. The preflight row stays as the one standing red: `test:service` reads `select | height | 21px` against `18px` and the four `table | border-*-color` rows absent, until the baseline's close-out lands the preflight repair. A landing verifier from this reading on treats a red accordion or navbar row as new.

## Third standing row (2026-09-25, the J-CONCERNS-A landing)

J-CONCERNS-A's gate chain read one red outside the earlier rows. `tools/main-red-check.sh` read the same red on a clean checkout of Veneer `origin/main` `21c821a`, whose styles the engine landing does not touch (`units/main-red-check-button.test.log.txt`). The styles session's E-ID-BUTTON-CASCADE round 5 read `test:src:styles` green in its Chromium 141 container, with 1500 tests passed (its `units/e-id-button-cascade-report-5.md`). The row is D45's class: a user-agent default that differs between the builds.

| Proof | Assertion | Chromium 141 (the recorded expectation) | Chromium 153 (this host) |
| --- | --- | --- | --- |
| `tests/src/styles/elements/button.test.ts:198` (resolves every `.btn` form on a button as the same form resolves on an anchor at rest, and every enabled form under hover, press, and keyboard focus, apart from the button appearance and the user agent's focus offset on a link; the styles session's E-ID-BUTTON-CASCADE) | the differing longhands per form and state equal the expected list | `appearance` alone in the `pressed` state of the `filled`, `outline`, and `link` forms | `appearance` and `outline-width` in those states |

The styles session is asked to apply D45's reading, so that the proof reads the resolved outline, or names the build-dependent longhand.

## Fourth standing reading (2026-09-25, the J-SAMEWAY-ENGINES-B landing)

The styles session's E-ID-BUTTON-CLASSES (on `main` as `0a0a252`) closes the third row. Its `.btn` form case compares the Veneer map of button-versus-anchor differences with the release's map, read in the same browser. Its four new button-reboot cases read red on this host.

The J-SAMEWAY-ENGINES-B landing chain read the four reds. The Orchestrator re-ran the four files alone on the main checkout at `0a0a252`, with no engine change present, through the styles config after `npm run build:src:styles`, and read the same four failures. So they are `main`'s reading on this host, not the engine landing's.

| Proof | State | The release's map | Veneer's map |
| --- | --- | --- | --- |
| `tests/src/styles/components/carousel.test.ts`, "carousel button reboot" (the carousel indicator) | pressed | `outline-width: 0px` | absent |
| `tests/src/styles/components/dropdown.test.ts`, "dropdown-item button reboot" | pressed | `outline-width: 0px` | absent |
| `tests/src/styles/components/list-group.test.ts`, "list-group-item button reboot" | pressed | `outline-width: 0px` | absent |
| `tests/src/styles/components/nav.test.ts`, "nav-link button reboot" | pressed | `outline-width: 0px` | absent |

Each is the same Chromium 153 behaviour as the third row: the user agent's focus outline on a pressed button, which the release's map carries and Veneer's does not. E5 excludes these four as standing rows, and the landing runs `tools/w2-land-rest.sh` past them. The styles session receives the reading.
