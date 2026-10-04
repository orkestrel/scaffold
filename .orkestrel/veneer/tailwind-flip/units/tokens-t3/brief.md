# Unit tokens-t3 — the showcase and the journeys under the token map (R11, T3)

## Role and engine

astra on GPT-6 Astra (effort high), `codex exec` at `danger-full-access` in `/home/user/veneer`, the sole writer of tracked files for this unit. Commit nothing. The Orchestrator verifies, commits, and records.

## Launch state

Written 2026-10-04 before T2's acceptance; the Orchestrator appends the launch HEAD (the T2 commit), the digests, and T2's hand-over list (the journey titles whose readings the map moves, with the moved readings) under § Orchestrator rulings. The tree is clean at launch.

## Objective

Carry the token map into what a person sees and what the journeys read, under `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/tokens/design-verdict.md` (**V**) § 5 (journeys) and § 7 (showcase): the Tailwind section's captions name the token departures in the face form; `TAILWIND_READINGS` gains token rows; the four contrast subjects read under the `tailwindcss` face in both color modes and the header buttons under each face; the partition compares a Bootstrap winner against `mapReading` keyed by selector role and longhand; the paired engine states case and the witness readings take the tuned sheet alone as their component baseline; the journey's wall time is re-read; `showcase/browser.html` is rebuilt.

## Governing texts (read-only)

1. **V** § 2, § 3 with § 3.1, § 5 (journeys), § 7, § 10 (M1 population and floors, M5 widths, M6 `mapReading` and its 1140 px control).
2. T2's report (`tmp/units/tokens-t2/report.md`) and its hand-over list; the records `tests/fixtures/tailwindcss/tokens.json` and `palette.json`; the T0 probe's `tmp/probes/tokens2/partition.ts` (`mapReading`, port only).
3. The copy document `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/units/flip-copy/copy.md` § 3.0 (the five caption forms) and § 3 (the existing captions), and the R12 note on labels.
4. The flip's journeys (`tests/app/browser/integration.test.ts`, `tests/setupBrowser.ts` showcase section: `TAILWIND_READINGS`, `FACE_LABELS`, `readTailwind`, the partition's winner model and same-page baseline, `collectComponentPreservation`), the header unit's neutrality case, the preservation gate, and `lanes.md` § Host-bound set.
5. Law: `AGENTS.md`, `tests.md`, `writing.md`, `names.md`; the environment boundary (`tests/setupBrowser.ts` imports no value from `app/`).

## Boundaries

- **Owned.** `app/browser/sections/tailwindcss.html` (captions and, where V § 7 names one, a specimen), `app/browser/sections/*.html` captions that name a token-bearing reading, `tests/app/browser/**`, the showcase section of `tests/setupBrowser.ts` and `tests/setupBrowser.test.ts`, `showcase/browser.html` through `npm run build:showcase` only, `tmp/units/tokens-t3/**`.
- **Off-limits.** `src/**`, `tests/src/**`, `tests/integration.test.ts`, `tests/conformance.test.ts`, `tests/setup.ts`, `tests/setupStyles.ts`, `guides/**`, `ROADMAP.md`, `configs/**`, `package.json`, the engine section of `tests/setupBrowser.ts`.

## Items

1. **Captions.** Every Tailwind-section specimen whose reading a token moves takes the face form of the copy document § 3.0 with the measured values under the three faces (the `Bootstrap` face keeps Bootstrap's values; the `unexcluded` face loads `./bootstrap`, so a token row reads Bootstrap's value there; the `tailwindcss` face reads the map). Add the specimens V § 7 names where none exists (a primary button and link on the page, an alert, a table variant, a focus ring, a radius and shadow carrier, a breakpoint carrier), each in the showcase's figure chrome; report each caption string.
2. **`TAILWIND_READINGS` token rows**, one per caption claim of item 1, with the three measured values and the `narrow` value where the viewport decides; the wrong-caption control stands.
3. **Contrast.** The four showcase contrast subjects read under the `tailwindcss` face in both color modes, and the header buttons under each face in light mode (`rulings.md` finding 8); report the ratios.
4. **The partition** compares a Bootstrap winner against `mapReading` of the same element under the `bootstrap` face, keyed by selector role and longhand (port the probe's reading); control: an unmapped reading fails on `.btn-primary` `background-color`; the 1140 px control (`.modal-xl` under both faces at 1280) stands.
5. **Baselines.** The paired engine states case and every journey reading T2's hand-over list names take the tuned sheet alone as their component baseline, or their expectations move to the map's value where the list says so; report each moved expectation with its before and after.
6. **Budget.** Re-read the three-face journey's wall time against the recorded 446 to 591 s on this host; report the per-case cost of the partition, the preservation gate, and the paired engine states case.
7. **Rebuild** `showcase/browser.html` and record its digest and stamp.

## Acceptance (in order, exits recorded)

`npm run check`; `npm run lint:check`; `npm run format:check`; `npm run test:app:browser`; `npm run test:setup:browser`; `npm run build:app:browser`; `npm run build:showcase` then `sha256sum showcase/browser.html dist/src/bootstrap/index.css dist/src/tailwindcss/index.css`; the header unit's P4 neutrality probe (`tmp/units/flip-header/p4.ts`) twice with `cmp`; `npm run test:journey` (every failing title in § Host-bound set); `git diff --check`; `git status --porcelain`.

## Report (write `tmp/units/tokens-t3/report.md`, then return it)

Finding first: the caption strings, the token rows with their readings, the contrast ratios, the partition's counts, every moved expectation, the wall times, the digests, the acceptance table, `git status --porcelain`.

## Deviation contract

Stop and report (expected, found, evidence, done or not done, one hypothesis) when: a sandbox write is rejected; a contrast subject reads under 4.5 under the layer (name the pairing and both readings; change no map value); the partition reads a Bootstrap winner the map does not explain; a journey title outside § Host-bound set fails and T2's list does not name it; P4 reads a chrome departure.

## Orchestrator rulings appended before launch

(The launch HEAD, the digests, and T2's hand-over list.)

Appended 2026-10-04 at launch. Launch HEAD: veneer `4333d76` on `ccr-d15a48b1-yyyll6` (T2 committed). Digests at launch: `./bootstrap` `7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f`; the tuned sheet `9a20b9662d0ee44abc317e2fbd31d16e1f81e46de9be4166e865c846b659edeb` (the map on). T2's hand-over (`tmp/units/tokens-t2/report.md` § T3 handoff, `journey-failures.json`): `test:setup:browser` fails 6 cases in `tests/setupBrowser.test.ts` (the face and color-mode selection and the `pair` header table expect the dark body background `#212529`, which reads `rgb(3, 7, 18)` under the layer; the four `reads every Tailwind reading the caption claims` cases expect the container at 1140 px, which reads 1280 px at 1280, and the bare table `th` and `td` border-bottom colors `rgb(222, 226, 230)` light and `rgb(73, 80, 87)` dark, which read `rgb(209, 213, 220)` and `rgb(74, 85, 101)`); `test:journey` fails 15 instances this sheet moves (J4 in four variants: the container and the table borders; the matrix readings case in four variants: the same, before its census and contrast clauses; the preservation gate at light-1280: its lifted baseline records 9596 and 9494 departures and rejects 48 per width, so its baseline becomes the tuned sheet alone; the partition at light-1280: two container signatures read 1280 px; the `pair` header table at light-390: the dark body color; the portfolio case in four variants, downstream of J4) and 3 Host-bound titles (J8 and accordion motion=false at light-390, collapse motion=false at dark-390). The paired engine states case passes in all four variants and establishes no changed engine expectation. Every expectation of the `tailwindcss` face moves to the map's value with the record as its source (`tokens.json`); the `bootstrap` and `unexcluded` columns keep their values. The caption readings table in `app/browser/sections/tailwindcss.html` and the Faces readings carry the moved values in the face form. The preservation gate reads its baseline from the tuned sheet alone, as T2 made the component proofs do; report the departures it then attributes (the token rows are `resolved`, not `unattributed`). The journey's wall time read 495 s in T2's run. No veneer release.

Appended 2026-10-04 after the first run's stop (`tmp/units/tokens-t3/report.md`: P4 read 210 longhand departures and 12 box departures in the header under the `tailwindcss` face at 1280 px, the header text `rgb(33, 37, 41)` to `rgb(3, 7, 18)` and the bottom border `rgb(222, 226, 230)` to `rgb(209, 213, 220)`). Ruling: the chrome is built from Bootstrap's classes and ships no sheet of its own, so under the layer it reads the map like every other element; R12's neutrality is re-read under R11 as "the chrome departs between faces only by the token rows". Apply it as follows, and continue the unit.

1. **The neutrality case** (`keeps the compact sticky header neutral under every face at narrow and wide viewports`) and **P4** (`tmp/units/flip-header/p4.ts`, adapted under `tmp/units/tokens-t3/`) attribute every chrome departure between the `bootstrap` face and a Tailwind face: a color longhand whose two values are a palette row's lifted and tuned values (`tokens.json`, the context row included), a `font-family` whose two values are the scale row's literal and the resolution of its reference, a radius or shadow longhand that is a scale row, and a geometry departure (a box, `width`, `height`, `inline-size`, `block-size`, `line-height`, `letter-spacing`) on an element whose own or ancestor `font-family` departs by that scale row (text metrics), are `token` departures and admitted; the earlier exclusions (`tab-size`, zero-width border styles and colors, the replaced-class longhands, the inherited preflight defaults) stay; anything else is refused. The case reports the admitted counts per kind and per width. The `unexcluded` face loads `./bootstrap`, so its chrome departs by nothing but the earlier exclusions, as before.
2. **The R12 invariants hold under every face** and the case asserts them per face: the five header buttons one line box tall, the three face buttons on one row inside the viewport at 390 px, the header at or under 30 % of the viewport height at 390 px, one row with the brand left and the groups right at 768 px and wider; the contents headings land under the toolbar with the 8 px gap. Record the header heights per face and width.
3. **The contrast case for the header buttons** (`reads every header button at 4.5:1 or more, pressed or not, in both color modes`) reads under each face in light mode as the first brief's item 3 says, and reports the ratios; a ratio under 4.5 under the layer is a stop (name the button and both readings; change no map value).
4. **Hand T4 the sentence**: the guide's Header subsection says the chrome is neutral; report the replacement sentence (the chrome departs between faces only by the token rows, with the counts) for T4 to write; edit no guide prose here.
5. Write the report to `tmp/units/tokens-t3/report-2.md`; the first brief's acceptance stands, with P4 run twice and `cmp` equal under the adapted reading.
