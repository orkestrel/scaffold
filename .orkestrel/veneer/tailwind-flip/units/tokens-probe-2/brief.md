# Unit tokens-probe-2 — the critic's T0: measurements M1 to M9 over the adopted token map

## Role and engine

astra on GPT-6 Astra (effort high), reached as `codex exec` at `danger-full-access`, in `/home/user/veneer`. You are the sole writer under /home/user/veneer/tmp/probes/tokens2/. Another unit (fix unit A) may edit `tests/` in the same checkout at the same time; its entries in `git status --porcelain` are not yours; change none. Before launch the tree already carries 13 modified entries under app/, showcase/, and `tests/`; they are not yours either. A nested `git` may report "not a git repository": do not diagnose; your own `git status --porcelain` is the authority.

## Objective

Run the nine measurements of the critic's § 3 table, exactly as stated there and below, and report per measurement whether it holds or is refuted, with the numbers. Decide nothing; recommend nothing; the verdict rules on your numbers.

## Governing texts (read-only)

All under `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/tokens/`:

- `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/tokens/design/critic.md`: § 2 findings, § 3 the table M1 to M9 with each acceptance (authoritative where this brief paraphrases), § 4.
- `rulings.md`: the Orchestrator's default rulings (references for fonts, radii, shadows with Tailwind 4.3.3 fallbacks; colors pinned to the default palette as sRGB hex; containers at `max-width = breakpoint`; the dark secondary fill at `gray-900`; a possible context split for `#dee2e6`; the tuned-sheet-alone baseline).
- `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/tokens/design/judge-consumer.md`: § Synthesis map (one row per Bootstrap token, resolved hexes light and dark) and § Contradictions and rulings.
- `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/tokens/design/judge-mechanism.md`: § 4.1 the `swatch`/`scale` mechanism, § 4.2 the proofs, § 5 open risks.
- `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/tokens/design/proposal-algebra.md` (algebra twin and oracle), `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/tokens/design/proposal-consumer.md` § 4 and risk 5, `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/tokens/design/proposal-ramp.md` § 5 (the scale keys).
- `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/tokens/measurements/contrast.md`, `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/tokens/measurements/contrast.json`, `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/tokens/measurements/mechanism.md`, `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/tokens/measurements/mechanism.json`.
- `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/tokens/tailwind-theme.json`, `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/tokens/inventory.json`, `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/tokens/scales.json`, `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/tokens/probe-report.md`.
- `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/design-verdict.md` § 3 pin 4 and § 12 (the partition's signatures, the witness case's value classes).

Prior probe code (read-only, copy what you reuse): `/home/user/veneer/tmp/probes/tokens/contrast.ts`, `rewrite.ts`, `mechanism.ts`, `types.ts`, `verify.ts`, sass-copy/. Never edit `/home/user/veneer/tmp/probes/tokens/`.

Code at HEAD (read-only): `/home/user/veneer/src/bootstrap/**`, `/home/user/veneer/src/tailwindcss/**`, `/home/user/veneer/tests/setup.ts` (`RELATION_WIDTHS`), `/home/user/veneer/tests/integration.test.ts` and `/home/user/veneer/tests/app/browser/integration.test.ts` (the partition and witness cases, the contrast case at about line 1064), `/home/user/veneer/tests/setupBrowser.ts` (`collectContrastSubjects`, `TAILWIND_READINGS`, `NAVBAR_SCENARIOS`, `RESPONSIVE_OFFCANVAS_SCENARIOS`, the signature reader), `/home/user/veneer/tests/conformance.test.ts` (line 120 and the recipe describe), `/home/user/veneer/node_modules/tailwindcss/theme.css`, `/home/user/veneer/node_modules/bootstrap/scss/`. `readContrast` is exported by `@orkestrel/test/browser` (`/home/user/veneer/node_modules/@orkestrel/test/dist/src/browser/index.js`), not by tests/setupStyles.ts. `mapReading` does not exist at HEAD: M6 implements it in the probe as § 12 and the judges describe it, and says so. Read these sources; import nothing from the checkout's source or test trees (reimplement or copy the logic into the probe, citing the line).

## Host

Linux. Put `/home/user/.wave/npm11/node_modules/.bin` first on `PATH`. Chromium: Playwright from `/home/user/veneer/node_modules` with `chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })`; record `browser.version()`. Serve pages from a loopback `node:http` server on port 0. Sass (`sass`) and `tailwindcss`/`@tailwindcss/node` from `/home/user/veneer/node_modules`. No network.

## Scope

- **Owned.** /home/user/veneer/tmp/probes/tokens2/** (create).
- **Off-limits.** Every other file. Write no tracked file. Run no npm script that writes outside `tmp/` or `dist/`; never rebuild `dist/`. No install, commit, push, credential, destructive command, `git stash/add/reset/checkout`, or tree-wide mutating gate (no formatter or linter with `--fix` over the tree). Every Sass edit is on a copy under /home/user/veneer/tmp/probes/tokens2/.

## Scratch tuned sheet (shared by M1, M2, M5)

The mechanism is not in the source yet. Build the scratch tuned sheet by copying the lifted sheet (`/home/user/veneer/dist/src/bootstrap/index.css`, or the tuned sheet the recipe uses if `dist/` carries one; state which) and substituting the adopted map's hexes (judge-consumer § Synthesis map, with the `rulings.md` defaults) in the collision-safe single pass `mechanism.md` describes (all 7 spellings: hex, short hex, `rgb`/`rgba`/`RGBA(`, `-rgb` triplets, `%23` escapes, `rgba%28`, data-URI attributes). Report every literal you could not map. M2 and M5 add, on further copies, the references and the aligned breakpoints and containers.

## Measurements

Each row: what to compute, acceptance, output file under /home/user/veneer/tmp/probes/tokens2/out/.

- **M1 — durable contrast and separation over the adopted map** → out/m1.json. Population (the union): the 142 pairings of `contrast.ts`; the judge's additions (the form-control border, secondary and tertiary text, `code`, `mark` in both modes, `.dropdown-menu-dark` header and item, 4 header readings, `.text-secondary` on the dark body); the dark tertiary text; the adjacent surfaces (each bg-subtle and border-subtle against its page in both modes, each button hover against its base, each table state against its bg). Compute in Node first, then in Chromium through `readContrast` (and `collectContrastSubjects`' subjects) under the scratch tuned sheet alone. Acceptance: reproduce the judge's four control ratios (`#0d6efd` on white 4.50; white on `#155dfc` 5.25; shade 15 of `#155dfc` = `#124fd6`; dark `mark` 4.65) and the critic's [K] figures (dark tertiary text 4.07 under Bootstrap against 3.94 under the map; dark secondary fill 1.163 against 1.000, and 1.135 with `gray-900`). Report every pairing below its floor (the lesser of Bootstrap's ratio and 4.5:1), Node and Chromium side by side, and whether the `#dee2e6` context split restores the dark tertiary floor.
- **M2 — references in the full recipe** → out/m2.json. A further copy of the scratch sheet whose font, radius, and shadow tokens are `var(--font-sans, …)`, `var(--radius-md, …)`, `var(--shadow-md, …)` and the rest with Tailwind 4.3.3 fallbacks; compile through the real recipe (`@import 'tailwindcss'` then the sheet) three ways: alone, under a consumer `@theme` (font, radius, shadow, `--color-blue-600`), and under `prefix(tw)`. Report the theme block's emitted variables per form, pin 4's flattened equality against the sheet (the derivation's rewrite list), whether `/home/user/veneer/tests/conformance.test.ts`:120's expectation would change (acceptance: unchanged), and what each reference computes to on a `.btn` and on `body` in Chromium under the three forms.
- **M3 — the scale edit on a Sass copy** → out/m3.json. Apply the `scale` mechanism (judge-mechanism § 4.1, proposal-ramp § 5 keys) to a copy of `/home/user/veneer/src/bootstrap/`. Acceptance: both entries keep their digests `ef7b5845…` and `4142d6d4…` under an empty `$scale`; the line count is unchanged; a tracer reaches the 64 grid-tied conditions, the 10 breakpoint values, the 5 container widths, and the font, radius, and shadow sites; the 12 RFS conditions untouched. State the ownership of the 4 shadow color sites.
- **M4 — the synthesized `swatch($literal)`** → out/m4.json. On a copy, in the judge's shape, over all 7 spellings (including `%23fff`, `RGBA(`, `rgba%28`). Acceptance: the same two digests under an empty map and the 571-site tracer of `mechanism.md`.
- **M5 — breakpoint readings in Chromium** → out/m5.json. Three faces: `bootstrap`, `unexcluded`, `tailwindcss` (the last with a scratch tuned sheet carrying the aligned breakpoints and containers). Widths: 390, 639, 640, 767, 768, 991, 992, 1023, 1024, 1199, 1200, 1279, 1280, 1281, 1399, 1400, 1535, 1536 (a superset of the critic's eleven). Read the `NAVBAR_SCENARIOS` and `RESPONSIVE_OFFCANVAS_SCENARIOS` toggler states, `.container` and `.container-*`, `.modal-xl`, and `TAILWIND_READINGS`. List every (name, width, longhand) where the tuned sheet alone departs from the `bootstrap` export alone at `RELATION_WIDTHS`, and the down-form gap at device scale factor 1.25 and 1.5.
- **M6 — `mapReading` over the partition** → out/m6.json. Over the 1665 signatures (design-verdict § 12), list every Bootstrap-winner longhand that carries a scale value and every value collision (expected example: `.modal-xl` 1140px against `.container` 1280px). Record the focused wall time against 53 s; the journey's against 449 s and 487 s if you can run it within `tmp/`, else state not run and why.
- **M7 — pixel reads** → out/m7.json. On an sRGB profile (`--force-color-profile=srgb`), a canvas (or screenshot) read of `bg-blue-600` beside `.btn-primary`, and of `yellow-500`, `cyan-500`, `teal-400`, `red-600`, `green-700` beside their components; Tailwind's oklch against the clipped hex, per channel.
- **M8 — the oracle join** → out/m8.json. Compile Bootstrap's own Sass (`/home/user/veneer/node_modules/bootstrap/scss`, copied if configuring needs a file) with the map's bases, the role variables, and `$table-variants` configured; join against every amount row (button states, table states, link hovers, focus border, range thumb, the 3 gray mixes). Acceptance: within 1 channel unit; list every unjoined row (judge-mechanism § 5).
- **M9 — Chromium's own conversion** → out/m9.json. Each palette row's `color-mix(in srgb, VALUE 100%, transparent)` computed serialization, clipped and rounded, against the probe's conversion (`/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/tokens/tailwind-theme.json`); list every disagreement.

## Outputs

- /home/user/veneer/tmp/probes/tokens2/report.md: per measurement, finding first (holds or refuted, with the numbers), then checks, Chromium version, durations, the commands, the unmapped literals, `cmp` results.
- /home/user/veneer/tmp/probes/tokens2/out/m1.json to out/m9.json: stable key order, no timestamps or durations (durations go in `report.md`).
- The scripts, one entry per measurement or one driver; each run twice and its JSON compared with `cmp`.

## Acceptance criteria (cheap first)

1. Every script exits 0 twice with byte-identical out/mN.json (`cmp`).
2. `report.md` and the nine JSON files exist; any measurement not computed is named with its exact error.
3. `git status --porcelain` after the run equals the before state apart from fix unit A's entries under `tests/`; list those as not yours.

## Law

Scripts are TypeScript run by `node path/file.ts`; no `any`, no `as`, no `!`, no `@ts-*`; add no package; import `node:` modules and packages from `/home/user/veneer/node_modules` only; import nothing from the checkout's source or test trees. Report prose: plain, lead with the finding, numbers only with their run.

## Return shape

Final message: per measurement M1 to M9, the finding (holds or refuted, the numbers) and its file path; anything not computed with the exact error; `git status --porcelain`, listing fix unit A's entries and the pre-existing entries as not the probe's. No process diary.

## Deviation contract

Stop and report (expected, found, evidence, done or not done, one hypothesis) when: a sandbox write is rejected (never try another write mechanism); Chromium cannot launch from the pinned path; the loopback bind fails; a write outside /home/user/veneer/tmp/probes/tokens2/ would be needed; a digest under the empty map differs. If a single measurement cannot proceed, record it and continue with the others. Settle ancillary choices yourself and record them in the report.
