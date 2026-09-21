<!-- CL3 scope read, checker on native Sonnet (clean context, read-only), brief units/cl3-scope-read-brief.md over units/cl3-brief.md and the Veneer tree at 9f5ffda, 2026-09-21. Verdict: amend (no sections/ aggregate; no reboot Compatibility row; the Departures heading; the design report paths); carried by units/cl3-brief-2.md with the readings folded in. -->

## Item 1 — Path and symbol resolution

| Claim | Resolves | Evidence |
|---|---|---|
| Layer order `_tokens.scss` | yes | `veneer/src/styles/_tokens.scss:4` `@layer theme, reset, base, elements, components, utilities;` |
| Load order `index.scss` | yes, but incomplete as stated | `veneer/src/styles/index.scss:1-6`: `tokens`, `theme`, `elements/html`, `elements/body`, `elements/button`, `components/button` (matches brief's launch-reading list exactly) |
| `elements/` and `components/` partials | yes | `veneer/src/styles/elements/{_html,_body,_button}.scss`; `veneer/src/styles/components/_button.scss` (Glob) |
| Elements-layer guard admitting one bare tag plus mandated pairs | yes | `veneer/tests/src/styles/index.test.ts:23-27` (`joins no two bare tags…`, uses `matchesLooseTagPair`); the predicate itself at `veneer/tests/setupStyles.ts:1633-1652` consults `MANDATED_TAG_PAIRS` |
| Physical-axis guard | yes | `veneer/tests/src/styles/index.test.ts:28-38` |
| `MANDATED_TAG_PAIRS` in `tests/setupStyles.ts` | yes, pairs listed | `veneer/tests/setupStyles.ts:437-456`: `details/summary`, `dl/dt`, `dl/dd`, `fieldset/legend`, `figure/figcaption`, `ol/li`, `optgroup/option`, `ruby/rp`, `ruby/rt`, `select/option`, `table/caption`, `table/colgroup`, `table/tbody`, `table/tfoot`, `table/thead`, `tr/td`, `tr/th`, `ul/li` |
| `app/browser/sections/ButtonSection.ts` | yes | `veneer/app/browser/sections/ButtonSection.ts:1-77` |
| `app/browser/constants.ts` specimen table | yes | `veneer/app/browser/constants.ts:29-232` (`BUTTON_SPECIMENS`) |
| `app/browser/types.ts` specimen interface | yes, named `ButtonSpecimen` | `veneer/app/browser/types.ts:18-33` |
| `app/browser/index.ts` "the `sections/` export" | **false as stated** | `veneer/app/browser/index.ts:4` re-exports `./sections/ButtonSection.js` directly; there is no `sections/` barrel file and no `sections/index.ts` (Glob: only `ButtonSection.ts` under `app/browser/sections/`) |
| `Showcase.ts` mounts `ButtonSection` into `main` | yes | `veneer/app/browser/Showcase.ts:59-66`: `this.#main.append(...)`, `return [new ButtonSection(this.#main)]` |
| `tests/app/browser/sections/` | yes | `veneer/tests/app/browser/sections/ButtonSection.test.ts` (Glob) |
| Export-set assertion `tests/app/browser/index.test.ts` | yes | `veneer/tests/app/browser/index.test.ts:7-16` asserts `['BUTTON_COPY','BUTTON_GRID','BUTTON_SPECIMENS','ButtonSection','SHOWCASE_COPY','Showcase']` |
| Export-set assertion `tests/setupStyles.test.ts` | yes | `veneer/tests/setupStyles.test.ts:54-60` (key list continues past the shown page; presence confirmed) |
| `reboot` entry and `listed` in `tests/conformance.test.ts` and `inventory.json` | **false as stated** | `veneer/tests/conformance.test.ts:55` declares `listed: readonly string[] = ['btn']` only, and reads it from `collectShippedComponents`/guide Compatibility rows — no `reboot` component row exists anywhere in `veneer/guides/veneer.md` § Compatibility (`veneer/guides/veneer.md:686-719`, ten `btn`/`engine` rows only, no `reboot` row); `tests/fixtures/oracle/inventory.json` does carry a `reboot` key (`:2822-2827`, `:114210-114215`) but nothing in the guide or `conformance.test.ts` reads that key as `accepted`, because `readCompatibility` derives components strictly from guide table rows |
| `readOracleInventory` in `tests/setupConformance.ts` | yes | `veneer/tests/setupConformance.ts:741-773` |
| Guide § Styles files table, § Departures, § Showcase region sentence | files table at `veneer/guides/veneer.md:122-135`; § Showcase region sentence at `:740-741` ("a Buttons region carrying every declared button specimen"); **§ Departures is ambiguous**: the guide has two headings, `### Departures from the workspace rows` (`:240`) and `### Departures from Bootstrap` (`:616`), and the brief names neither explicitly |
| Calibration records present | yes | `.orkestrel/veneer/research/calibration-content.md` and `research/calibration.md` both resolve (Glob) |
| `node_modules/bootstrap/scss/_reboot.scss` in Veneer checkout | yes | resolves (Glob) |
| Planner/analyst/scout reports at `units/content-layout-*-report.md` | resolve, but only relative to `.orkestrel/veneer/`, not `` | `.orkestrel/veneer/units/content-layout-design-planner-report.md`, `-analyst-report.md`, `scout-report.md` all exist; brief's Context paragraph writes them as bare `units/...` without the `.orkestrel/veneer/` prefix it gives the design-verdict file two lines earlier, so a writer resolving relative to its own `` root finds nothing there |

## Item 2 — Readings taken now

- CL2 tokens present: `--vn-space-12` (`_tokens.scss:240`), `--vn-space-24` (`:241`), `--vn-display-1`…`-6` (`:220-225`), `--vn-state-stripe` emitted by `_mixins.scss:136` (`--vn-state-stripe: #{map.get($values, 'state-stripe')};`).
- `index.scss` load order: `tokens, theme, elements/html, elements/body, elements/button, components/button` — matches the brief exactly (`index.scss:1-6`).
- Elements-layer guard site: `tests/src/styles/index.test.ts:23-27`. `MANDATED_TAG_PAIRS`: listed above (18 pairs).
- `ButtonSection` shape: constructor takes `host: HTMLElement`, mounts in the constructor (no separate `mount` verb), exposes `destroy()` and `get host()`, reads `BUTTON_SPECIMENS` from `constants.ts`, implements `SectionInterface` (`ButtonSection.ts:22`, `types.ts:10-15`).
- App barrel export set: `['BUTTON_COPY','BUTTON_GRID','BUTTON_SPECIMENS','ButtonSection','SHOWCASE_COPY','Showcase']` (`tests/app/browser/index.test.ts:8-15`).
- Styles setup export inventory: confirmed present at `tests/setupStyles.test.ts:54-60` onward (file truncated past that point; the assertion exists and enumerates `Object.keys(setup)`).
- Guide files table rows: confirmed at `guides/veneer.md:126-135`; none of the rows the brief scopes for new addition (`_heading.scss` etc., `_reset.scss`) exist yet — expected, since CL3 creates them.
- `--vn-line-heading` (`_tokens.scss:228`), `--vn-weight-heading` (`:230`), `--vn-text-code` (`_mixins.scss:151`), `--vn-link-rgb` (`_mixins.scss:162`), and the `--vn-link-*` family (`--vn-link-base`, `--vn-link-hover-base`, `--vn-link-hover-rgb`, `--vn-link-decoration`) are all present with values traceable to `_tokens.scss` `$light`/`$dark` maps.
- Statement the tree contradicts: the `sections/` export claim (item 1) and the `reboot`/`listed` claim (item 1) both fail as literally stated.

## Item 3 — Scope by falsified assertions

| File | Assertion the item's result falsifies | Granted by Scope? |
|---|---|---|
| `tests/src/styles/index.test.ts` | Layer-order array (`:21`) unaffected by new partials since `@layer` list is fixed in `_tokens.scss`; elements-guard test (`:23-27`) and physical-axis test (`:28-38`) run against every rule in the shipped cascade, so new partials feed them automatically — granted for "only where the layer order or the guard's admitted set must grow" | Yes, named in Scope |
| `guides/veneer.md` § Styles Files table | New partial rows required | Yes, named in Scope |
| `tests/app/browser/index.test.ts` | Export-set assertion (`:8-15`) grows with `ContentSection` and any new specimen exports | Yes, named in Scope |
| `tests/setupStyles.test.ts` | Export inventory assertion (confirmed present, `:54-60`+) grows if `_reset.scss`/new partials add exported helpers to `setupStyles.ts` — **not granted**: Scope's off-limits list bars `tests/setup*.ts` and their proofs (brief line 93-94: "`tests/setup*.ts` and their proofs" off-limits) | **Ungranted conflict**: if item execution needs a new `setupStyles.ts` export (for example a new tag-pair or heading helper), the file and its proof are off-limits, yet no exemption is carved for it. Item 2's text tag partials rely only on existing `MANDATED_TAG_PAIRS`/`matchesLooseTagPair`, so this may resolve without touching `setupStyles.ts`, but the brief does not say so explicitly — a referral, not a sweep failure |
| `tests/conformance.test.ts` `listed` / `scanCompatibilityPresence` | New bare-tag selectors reaching the built cascade do not change `listed` (`['btn']`, line 55) or `collectShippedComponents`'s result, because neither reads Reboot tag selectors — both are driven by the guide's Compatibility table, which carries no `reboot` component row for this unit to "keep accepted." The acceptance criterion "The `reboot` row stays `accepted`" (brief acceptance criterion 4) **names a row that does not exist in the tree** | `tests/conformance.test.ts` is off-limits (Scope, brief line 94); consistent, since nothing in this unit's own scope should need to touch it — but then acceptance criterion 4 is unsatisfiable as literally worded, because there is no `reboot` row to "stay accepted" |
| `PHYSICAL_LONGHANDS`/`matchesDirectionSensitive` (`tests/setupStyles.ts`) | New declarations checked automatically; no change needed unless a new physical property name is introduced (unlikely) | N/A — off-limits, consistent |
| `tests/policy.test.ts` (comment sweep) | New comments in new partials are swept | Vendored, off-limits, consistent — comments must simply comply |
| `guides/veneer.md` § Compatibility | Not scoped, and brief item 5 (guide) only names "the files table rows, the three departure rows, the region sentence" — **no Compatibility-row update is scoped**, consistent with the finding that no `reboot` row exists to touch |

Scope covered: `tests/**`, `app/**`, `guides/veneer.md`, `src/styles/**`, `package.json`, `configs/**` (all swept via the preceding file reads and Glob).

`none found` for `package.json` and `configs/**`: this unit's execution touches neither, and Scope correctly lists neither as owned.

## Item 4 — Vendored/off-limits and not-yet-existing owned files

- Owned files that are vendored or off-limits by the brief's own list: **none found** — the Scope section does not list `vite.config.ts`, `tests/config.test.ts`, `tests/policy.test.ts`, or `tests/setupPolicy.ts` as owned; each is correctly named only in Off-limits (brief line 93-96) and Context's "never edited" clause (brief line 58-59).
- Owned paths that do not yet exist (expected, for the writer to create): `src/styles/_reset.scss`; every listed `src/styles/elements/_*.scss` partial except `_html.scss` and `_body.scss` (which exist and are only conditionally touched); `tests/src/styles/reset.test.ts` and one mirrored proof per new partial; `app/browser/sections/ContentSection.ts`; `tests/app/browser/sections/ContentSection.test.ts`; a new specimen interface in `app/browser/types.ts` if `ButtonSpecimen` does not fit (confirmed: `ButtonSpecimen` is button-shaped only, `types.ts:18-33`, so a new interface is required, not merely possible).

Verdict: amend — rows forcing it: (1) item 1's `app/browser/index.ts` "the `sections/` export" claim is false, the barrel exports `./sections/ButtonSection.js` directly with no `sections/` aggregate file; (2) item 1/2's `reboot`/`listed` claim is false, no `reboot` Component row exists in `guides/veneer.md` § Compatibility, so acceptance criterion 4 ("The `reboot` row stays `accepted`") is unsatisfiable as worded and Context's launch-reading instruction to state "the `reboot` entry" is baseless; (3) the brief's § Departures reference is ambiguous between the two existing headings `### Departures from the workspace rows` and `### Departures from Bootstrap`, and execution item 5 / Scope must name which one carries the three new departure rows; (4) the planner/analyst/scout report paths in Context resolve only under `.orkestrel/veneer/units/`, not the bare `units/` the brief writes them as, and a writer resolving relative to `` (as the design-verdict citation two lines earlier implies by contrast) will not find them.
