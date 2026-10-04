# Unit tokens-t2 — turn the token map on: records, proofs, and the tuned-sheet-alone baselines (R11, T2)

## Role and engine

astra on GPT-6 Astra (effort high), `codex exec` at `danger-full-access` in `/home/user/veneer`, the sole writer of tracked files for this unit. Commit nothing. The Orchestrator verifies, commits, and records.

## Launch state

Written 2026-10-04 before T1's acceptance; the Orchestrator appends the launch HEAD (the T1 commit), the digests at launch, and T1's record shape under § Orchestrator rulings. The tree is clean at launch. Read `git log --oneline -3` and `git status --porcelain` first.

## Objective

Turn the map on and prove it: `src/tailwindcss/_tokens.scss` fills `$palette` and `$scale` from `tests/fixtures/tailwindcss/tokens.json` (the record T1 wrote), so the tuned sheet carries Tailwind's values under `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/tokens/design-verdict.md` (**V**) § 2 and § 3 with § 3.1; the records regenerate; the Chromium cases of V § 5 land; and every component proof's baseline becomes the tuned sheet adopted alone. `./bootstrap` stays byte-identical. The showcase (`app/browser/**`) and the journeys (`tests/app/browser/**`) are T3's; this unit leaves them alone, and the journey suite is read, not edited.

## Governing texts (read-only)

1. **V**: § 2 policy, § 3 and § 3.1 map, § 4 mechanism, § 5 proofs, § 6 records, § 10 measurements and rulings, § 11 risks. § 3.1 and § 10 supersede § 3's table where they differ.
2. T1's report (`tmp/units/tokens-t1/report-2.md`) and the record guards in `tests/setup.ts` (`TokenRecord`, `PaletteRecord`); the records `tests/fixtures/tailwindcss/tokens.json` and `palette.json`.
3. The T0 probe under `tmp/probes/tokens2/` (`measure.ts` for M1's union population and M5's readings, `partition.ts` for `mapReading`, `out/m1.json`, `out/m5.json`, `out/m8.json`; port, never import).
4. The flip's records and writers: `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/writers/flip-records/` (the recipe writers, run through `tmp/units/flip-records/vite.writers.config.ts` as the second fold did), `design-verdict.md` § 12 (the witness value classes, the same-page baseline, the winner model, the declared-longhand reading, `RELATION_WIDTHS`).
5. Law: `/home/user/veneer/AGENTS.md`, `/home/user/scaffold/.claude/rules/styles.md`, `tests.md` (planted or removed controls; titles in the prescribed shape), `typescript.md`, `names.md`, `writing.md`.
6. Current code: `src/tailwindcss/_tokens.scss`, `src/bootstrap/_mixins.scss`, `tests/src/tailwindcss/index.test.ts` (the derivation, witness, and precedence cases), `tests/integration.test.ts` (the witness and misuse cases, the overrides describe, the composition-order case), `tests/conformance.test.ts` § `Tailwind compatibility recipe`, `tests/setupStyles.ts`, `tests/setupServer.ts` (`readRecipe`), `tests/setup.ts`.

## Boundaries

- **Owned.** `src/tailwindcss/_tokens.scss` (the two switch maps and their `with` rows); `tests/fixtures/tailwindcss/recipe.json` and `app/browser/recipe.json` (regenerated through the writers only); `tests/fixtures/tailwindcss/preflight.json` (regenerated through its writer only, where the reboot's token-bearing rows move); `tests/src/tailwindcss/index.test.ts`; `tests/integration.test.ts`; `tests/conformance.test.ts` (the recipe describe's pins); `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tests/setupServer.ts`, `tests/setupServer.test.ts`, `tests/setup.ts`, `tests/setup.test.ts` (readers and guards); `tmp/units/tokens-t2/**` (create). The writers under `tmp/units/flip-records/` run as they are.
- **Off-limits.** `src/bootstrap/**` (T1's generated edit stands), `src/tailwindcss/index.scss`, `app/**`, `tests/app/**`, `tests/setupBrowser.ts` and its proof, `guides/**`, `ROADMAP.md`, `configs/**`, `package.json`, `showcase/**`. No install, publish, commit, push, credential, or destructive command; never `git stash`, `git add`, `git reset`, `git checkout --`.

## Items

1. **The map on.** `src/tailwindcss/_tokens.scss` declares `$palette` (one row per lifted value, resolved sRGB hex in the record's spelling-neutral form, plus the `'#dee2e6@dark'` context row) and `$scale` (the breakpoint, down-form, container, radius, shadow, and font rows as `var(--TOKEN, LITERAL)` references or aligned rem values), generated from `tokens.json` by a writer step under `tmp/units/tokens-t2/` (a Vitest file in the record-writer convention) so the Sass rows and the record cannot drift; a case pins the Sass maps to the record (`pins the palette and scale maps to the token record`, controls: a planted row, a removed row).
2. **Records.** Run the recipe writers twice (`cmp` equal); run the preflight writer where the record guard requires it and record which rows moved; the `sheet` digests in both recipe records equal the rebuilt tuned sheet. `./bootstrap` keeps `7932f7a5…`; record the tuned digest before and after.
3. **Baselines.** Every component proof reads its baseline from the tuned sheet adopted alone (`V` § 5, `rulings.md` finding 3): the curated witness case (`pins every curation witness against the tuned sheet alone and rejects each removed repair`, control: the lifted sheet as the baseline fails on a token-bearing witness), the integration witness and misuse cases, and the CSSOM-sequence case where it compares component values. The partition's `mapReading` and the paired engine states case are T3's (journey files); name in the report every journey case whose expectations this unit's sheet change moves, with the reading that moves, so T3 starts from the list.
4. **The Chromium cases** of V § 5 in `tests/src/tailwindcss/index.test.ts` or `tests/integration.test.ts` as their subject decides, each with its controls:
   - `derives the tuned sequences by substituting tokens, withholding, moving, copying, restoring, and nothing else`: `substituteTokens` applies the record in one pass per occurrence in the CSSOM spellings before the structural steps; controls: a planted `#0d6efe`, a removed record row, a kept literal read as `#fffffe`, an unwithheld `.mt-3`, the chaining control (`#f8f9fa` to `#f9fafb` and `#f9fafb` elsewhere, each changed exactly once). The existing derivation case's counts (73, 72, 8, 80) stand.
   - `keeps the RFS cap at 1200px and aligns every grid condition to Tailwind's breakpoints`; control: a planted RFS substitution reads `.h1` at 41.2 px at 1279 px.
   - The contrast and separation case over M1's union population (port `measure.ts`'s population: the 142 pairings, the judge's additions, the dark tertiary text, the adjacent surfaces), under the tuned sheet alone and Bootstrap alone: every text pairing reads at or over the lesser of Bootstrap's ratio and 4.5 except the two inherited pairings V § 3.1 lists; every adjacent-surface pair reads 1.05 or more except the one inherited pair; the record carries Bootstrap's ratio beside the tuned one; controls: a `blue-500` copy fails at 3.76, the dark secondary fill at `gray-950` fails the separation clause, the count pin. Read the two pairings V § 3.1 marks as recomputed (8.08, 6.48) and report the measured values.
   - `differs from Bootstrap alone by the token table and nothing else` at `RELATION_WIDTHS`: every departing (name, width, longhand) over the 17 shared component names is a map row (a color or scale value the record maps) or a band state (a width between Bootstrap's and Tailwind's breakpoint for that name); the 5661 rows of `out/m5.json` are the expected input; controls: `.card` padding changed in a tuned copy, an identity map that fails on `.btn-primary`.
   - `agrees every Bootstrap infix with its Tailwind variant at each aligned breakpoint`; control: `./bootstrap` beside the unexcluded compile disagrees at 600 px.
5. **Pins.** Update the conformance rewrite pin (statement count, joined blocks) and the derivation counts by measurement; record before and after.

## Acceptance (in order, exits recorded)

`npm run check`; `npm run lint:check`; `npm run format:check`; `npm run build` then `sha256sum dist/src/bootstrap/index.css dist/src/tailwindcss/index.css`; the writers twice with `cmp`; `npm run test:setup`; `npm run test:conformance`; `npm run test:src:bootstrap`; `npm run test:src:tailwindcss`; `npm run test:integration`; `npm run test:setup:browser`; `npm run test:guides`; `npm run test:policy`; `npm run test:journey` read-only (record every failing title; a title outside § Host-bound set of `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/lanes.md` that this unit's sheet change moves is expected and listed for T3, not repaired here); `git diff --check`; `git status --porcelain` (only owned files).

## Report (write `tmp/units/tokens-t2/report.md`, then return it)

Finding first per item with the numbers (rows in each map, record digests, moved preflight rows, the contrast case's count and the two measured pairings, the relation case's classified rows per class, the infix case's breakpoints), the journey titles T3 inherits with their moved readings, the acceptance table, the digests before and after, the case titles with their controls, and `git status --porcelain`.

## Deviation contract

Stop and report (expected, found, evidence, done or not done, one hypothesis) when: a sandbox write is rejected; `./bootstrap`'s digest changes; a text pairing other than the two inherited ones reads under its floor, or an adjacent pair other than the inherited one reads under 1.05 (report the pairing and both readings; change no map value); a relation departure is neither a map row nor a band state (report it); a writer's two runs differ; a Sass refusal names a key or role.

## Orchestrator rulings appended before launch

(The launch HEAD, the digests at launch, and T1's record shape and any T1 finding that bears on this unit.)

Appended 2026-10-04 at launch. Launch HEAD: veneer `6874b79` on `ccr-d15a48b1-yyyll6` (T1 committed; `main` at `77c65cf`). Digests at launch: `./bootstrap` `7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f`; the tuned sheet `b946eefe63628fa64183e8a1518cffb0b145ea6ccd083c69105ae1f6fe900662` (switches off). T1's record shape (`tests/fixtures/tailwindcss/tokens.json`, guarded by `TokenRecord` in `tests/setup.ts`): `palette` rows `{ lifted, spellings, token, light, dark, origin, context?, rounding? }` (126 rows, one per lifted value plus `#dee2e6` with `context: 'dark'`), `scale` rows `{ role, literal, value, token? }` (26 rows), `kept` rows (27), `amounts` (the Bootstrap-amount rows with their oracle join) and `unjoined`; `palette.json` (`PaletteRecord`) carries `chromium: 141` and 288 rows `{ name, raw, hex }` as Chromium serialized them, the palette's source (verdict § 10 M9 as amended at scaffold `947f06bb`). `swatch` reads the `LITERAL@CONTEXT` key before `LITERAL`; the dark `--bs-body-color` site in `src/bootstrap/_tokens.scss` passes `dark`. The Sass maps `$palette` and `$scale` in `src/tailwindcss/_tokens.scss` take string keys in the record's lifted spelling (`'#dee2e6'`, `'#dee2e6@dark'`, `'0, 0, 0'`) and values in the same spelling family; read T1's `-key` and `-spell` helpers in `src/bootstrap/_mixins.scss` before writing a row. Item 1's writer step generates both maps from the record and pins them. No veneer release.
Writers format what they write: run `npx oxfmt --config .oxfmtrc.json --write` on each record a writer emits before the `cmp` comparison, because T1's writer emitted `tokens.json` with expanded arrays and `format:check` refused it until the Orchestrator formatted the committed record (array wrapping only, no value changed).
