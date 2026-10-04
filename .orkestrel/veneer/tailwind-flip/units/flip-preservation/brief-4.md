# Unit flip-preservation-4 — finish the preservation gate after the planted-control stop

## Role and engine

astra on GPT-6 Astra (effort high), `codex exec` at `danger-full-access` in `/home/user/veneer`, the sole writer of tracked files. Commit nothing.

## Launch state

Veneer `bc35a3e` on `ccr-d15a48b1-yyyll6` with the third run's uncommitted edits in place (the five owned test files). Continue from them. The three earlier briefs (`/home/user/scaffold/tmp/codex/flip-preservation-brief.md` with its appended rulings, `flip-preservation-2-brief.md`, `flip-preservation-3-brief.md`) stay in force except where this brief rules otherwise; the third run's report is `tmp/units/flip-preservation/report-3.md`.

## The stop and the ruling

At 1280 px the gate reads zero `preflight` and zero `unattributed` departures (9611 elements, 1455 signatures, 3282 utility, 72 resolved, 14 dependents excluded with their anchor, 3 admitted, 218 chrome excluded). The planted-preflight control, `@layer base { h6 { font-weight: 300 } }`, produced no departure, because every `h6` in the population carries a curated class whose copy in the `bootstrap` layer outranks `base`; that is the preservation claim holding, not a detection failure.

1. **Two planted controls replace the one.** The first keeps the `h6 { font-weight: 300 }` plant in `@layer base` and asserts the gate reads no departure from it: a planted preflight rule on a curated longhand of a curated carrier changes nothing (preservation holds). The second plants a `@layer base` rule on a longhand no Bootstrap rule declares on a textual carrier in the population and no exclusion covers, for example `@layer base { p { word-spacing: 0.25em } }` read on `p.card-text`, and asserts the gate reads that departure as `preflight` and fails its assertion (detection works). Verify before adopting the longhand that `matchesLayoutDeparture`, `matchesTypographyDeparture`, `matchesInvisibleDeparture`, and `matchesExcludedDeparture` leave it in, and that the carrier has rendered text; if `word-spacing` is excluded, choose `text-indent` or `text-transform` the same way and name the choice. Restore both plants.
2. **The remaining controls** of the first brief run as written (stripped curation already fails as required).
3. **Then finish**: the 390 px reading, the caption `TAILWIND_READINGS` rows (the first brief's item 3), the guide sentence for the `Tailwind + layer` row (item 4), and the acceptance sequence. Fold nothing; edit no fragment, caption, or guide prose.

## Acceptance (in order, exits recorded)

`npm run check`; `npm run lint:check`; `npm run format:check` (format the owned files first); the focused gate with its wall time; `npm run test:setup:browser`; `npm run test:app:browser`; `npm run test:journey` (every failing title in § Host-bound set of `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/lanes.md`: J8 and accordion motion=false at light-390; tooltip motion=true, collapse motion=false, navbar-390 motion=false at dark-390; record the gate's wall time inside the full run); `git diff --check`; `sha256sum dist/src/bootstrap/index.css dist/src/tailwindcss/index.css` (`7932f7a5…`, `b946eefe…`, both unchanged); `git status --porcelain` (only the owned files).

## Report (write `tmp/units/flip-preservation/report-4.md`, then return it)

Finding first: the gate's counts at both widths, each control's failing line (or the preservation control's empty reading), the caption rows with their three readings, the guide sentence, the acceptance table with the gate's focused and in-journey wall times, the digests, and `git status --porcelain`.

## Deviation contract

Stop and report (expected, found, evidence, done or not done, one hypothesis) when: a sandbox write is rejected; the second planted control still produces no departure after the verification in ruling 1; a departure remains `preflight` or `unattributed` at 390 px; a journey title outside § Host-bound set fails; either digest changes.
