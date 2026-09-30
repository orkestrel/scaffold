# foundation-audit-2 — reviewer verdict (subjective lane, Claude Opus 5.5, native Agent dispatch, 2026-09-30)

Returned verbatim; immutable. Paths are relative to `C:/Users/mikes/WebstormProjects/veneer/` unless they start with `scaffold/`, which means `C:/Users/mikes/WebstormProjects/scaffold/`.

## 1. Verdicts

1. **CONFIRMED.**
   - All four built sheets open with the same statement at line 1 of `dist/src/{bootstrap,tailwindcss,styles,styles/themes}/index.css`.
   - Dropping a name or swapping two names fails the exact `cssText` check and the `readLayerNames(...).slice(0, 10)` check in each face test:
     - `tests/src/bootstrap/index.test.ts:23-37`
     - `tests/src/tailwindcss/index.test.ts:11-25`
     - `tests/src/styles/index.test.ts:20-34`
     - `tests/src/styles/themes/index.test.ts:30-43`
   - The 24-order case re-reads whichever face loads first (`tests/integration.test.ts:50`), so each face's own statement is checked.
   - A block written into a foreign layer fails:
     - Bootstrap: every block must be named `bootstrap` (`tests/src/bootstrap/index.test.ts:38-42`).
     - Tailwind and styles: the owned-layer lists (`tailwindcss:26-35`, `styles:35-44`).
     - Themes: `['@layer theme']` (`themes:44-48`).
   - The themes sheet has no `:root` (`themes:51`).
   - These `every` checks pass trivially on today's nearly empty sheets, but a planted block makes them fail.

2. **CONFIRMED.** Each mutation I tried is caught:
   - The drop-in branch of `unlayer` dropping `!important` fails the drop-in equality (`tests/conformance.test.ts:68-81`).
   - `@at-root (without: all)` or `(without: layer media)` fails the layered equality (`:83-97`) and the context check (`tests/src/bootstrap/index.test.ts:115-149`).
   - A `layer` mixin that ignores `$layered` fails the `published` check for no `@layer` (`conformance:60`).
   - Removing `show $layered` makes the configured `@use` stop compiling.
   - A planted literal in a partial is refused (`tests/src/bootstrap/index.test.ts:171-180`).
   - The source scan leaves `_tokens.scss` out entirely (`:169`). An *emitting* literal there is still caught, because `published.scss` compiles through the real barrel (`conformance:60`).

3. **BROKEN.** The "moved rule" control does not move a rule.
   - `tests/setupServer.test.ts:34` calls `fixture.replace('.last { opacity: 0.5; }', '')`. The fixture writes that rule over three lines with a tab (`tests/fixtures/styles/instrument.css:15-17`), so the replace matches nothing.
   - The control is therefore the whole fixture with a duplicate `.last` rule added in front.
   - Mutation that survives: a `roundTrip` that sorts rules into a canonical order still differs from this control, because the control has an extra rule. So nothing distinguishes an order-insensitive round trip, which is the property claimed.
   - Fix: extract the rule with a regex as `tests/setupBrowser.test.ts:81-82` does. Before comparing round trips, assert that the control differs from the fixture and has the same length.
   - These parts held: link 2 with its appended-rule control, the digest pin with its one-byte control, the banner, duplicate, unknown-property, and empty-property certification, and the CSSOM-loss pair (`setupServer.test.ts:38-40` against `setupBrowser.test.ts:91-98`).

4. **CONFIRMED.**
   - The derivation law is checked against a literal table, so it is a second mechanism and not the source checked against itself (`tests/src/bootstrap/index.test.ts:212-221`).
   - The renamed and appended controls fail as they should (`:187-209`).
   - A duplicated leaf would fail the sorted equality against unique names (`:202`).
   - Only the `bootstrap` group exists (`tests/src/core/index.test.ts:10`), and `report.drift` holds the Summary cell to the doc block.

5. **UNRESOLVED.**
   - The cascade half held:
     - `retune` is the only `@scope` in `src` (`src/styles/_mixins.scss:5`).
     - Removing `to ([data-vn-theme])` fails `themes:151`.
     - A global dark selector fails `themes:126`.
     - Putting the pack in `reset` loses, as the `early` control shows (`:155-168`), and `:170-188` keeps that control equal to what `retune` emits.
     - The build chain and export strings are pinned at `tests/config.test.ts:105-134`. The gate chain runs `npm run build` and then `test:src:styles` rebuilds both sheets before the themes test reads them.
   - Not settled: that `./styles/themes` and `./styles/themes/scss` resolve. Only the `distribution` project checks that, and it runs from `prepublishOnly`, not from `tmp/gates-final.log`. `npm run test:distribution` would settle it.

6. **CONFIRMED.**
   - A `unlayer` mutation that stops lifting fails both the consumer-first `block` reading and the `grid` reading (`tests/integration.test.ts:92-98`).
   - The Tailwind-first control reads `3px` (`:72-81`).
   - The reversed-order control tells source order apart: `flex` in one order, `block` in the other.
   - `test:integration` is in `test` (`package.json:86`).
   - The fixtures use the real `tokens`, `mixins`, and `retune` (`tests/fixtures/integration/*.scss`), which is the right instrument while the built sheets hold no rules.

7. **CONFIRMED.**
   - Each face project is set up as claimed (`tests/config.test.ts:255-276`).
   - The file census runs at `:198-253` and passed (`gates-final.log`: config 185 passed).
   - Two caveats:
     - Only `setup`, `conformance`, and `src:vue` carry `pool: 'threads'` with `isolate: false`. `src:core`, `app:core`, `policy`, `config`, and `guides` do not (`vite.config.ts:121-379`). The objective lane should rule on how to read "the Node projects".
     - The census control `tests/absent-control.fixture` (`:227`) can never match a `*.test.ts` glob, so it cannot fail. The proof rests on the population assertion alone.

8. **BROKEN.** The `computeStamp` proof checks the helper against itself.
   - `tests/config.test.ts:2317-2322` asserts only a 64-character hex string, determinism, and sensitivity to content. `:2327` builds the expected stamp line with `computeStamp` itself.
   - Mutation that survives: `createHash('sha3-256')`, or SHA-256 over `text + '\n'`. Every assertion still passes, while the page's `build-id` stops being the SHA-256 of the page without its stamp line.
   - Fix: pin a known vector, for example `expect(configHelpers.computeStamp('')).toBe('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855')`.
   - Also unevidenced: the committed stamps and the no-change second build. The fix-4 report says no command ran (`tmp/units/foundation-fix-4-report.md:36`), and `gates-final.log` has no showcase build. To settle it, run both showcase builds twice, run `git diff --exit-code -- showcase`, and hash each page with line 8 removed.
   - These parts held: the `prepublishOnly` order (`package.json:127`), no project reading the pages, and the stamp plugin running after inlining. `vite:singlefile` is a plain `generateBundle` with `enforce: 'post'`, and `mergeOverride` keeps array order (`vite.config.ts:87-106`).

9. **CONFIRMED.**
   - If `main.ts` mounts nothing, `getByRole(...).element()` throws, which fails both journeys (`tests/app/browser/integration.test.ts:30`, `tests/app/vue/integration.test.ts:32-34`).
   - The refusal checks would pass on an empty page, but the Journey check runs first.

10. **BROKEN.** Several guide sentences point at the wrong proof or at none. Fix-10 added the right proofs with "Guide changes: none" (`tmp/units/foundation-fix-10-report.md:28`).
    - `guides/veneer.md:278-279` (pack root inside a dark ancestor) cites no case. `requires dark on the pack root inside a dark ancestor (pack first: %s)` exists at `tests/src/styles/themes/index.test.ts:94`.
    - `guides/veneer.md:129` cites the lift case, which loads no consumer rule into `bootstrap`. `resolves source order inside bootstrap (consumer first: %s)` exists at `tests/integration.test.ts:202`.
    - `guides/veneer.md:138-139`, `:180-182`, and `:227-229` argue by analogy. Direct cases now exist at `tests/integration.test.ts:101-129` and `:131-161`.
    - `guides/veneer.md:126` cites only the equal-specificity case. `lets unlayered importance win at higher specificity` exists at `:189`.
    - `guides/veneer.md:84` says the Bootstrap sheet carries "the order statement and nothing else", and `:145` and `:190` say "no rule". In fact `dist/src/bootstrap/index.css:2-111` holds 110 empty `@layer bootstrap {}` blocks, and `dist/src/tailwindcss/index.css:2` and `dist/src/styles/index.css:2` each hold an empty `@layer reset {}`.
    - Fix: cite the named cases and say "the order statement and empty layer blocks".
    - My sweep of `guides/veneer.md` for the substitution-table terms plus `we` and `our` found nothing, and the pitch equals the tagline.

11. **BROKEN.**
    - `ROADMAP.md:40` says "a proof guards the disjointness". A `disjoint` search outside `node_modules`, `dist`, and `tmp` finds only that line. The only guards are single `.btn` regexes (`tests/src/tailwindcss/index.test.ts:40`, `tests/src/styles/index.test.ts:49`). Nothing compares Tailwind and styles class names, although both write `components` and `utilities`.
    - Fix: state that proof as the Tailwind chunk's deliverable, or add it.
    - `ROADMAP.md:74` lists five repairable files. It omits `.prettierignore`, which `:150` lists, and `configs/app/vite.showcase.config.ts` (see 13).
    - The tenets match the rulings. I read the Vue-peer tenet as a rule, and `:52` and `:146` schedule it.

12. **UNRESOLVED.**
    - `tmp/gates-final.log:8,12,38,157,428` records `exit=0` for all five gates.
    - `tmp/probes/` was not empty when I read it: it held four `foundation-analyst.*` files, apparently the objective lane's probes still in flight.
    - Listing `tmp/probes/` after both lanes return would settle it.

13. **BROKEN.**
    - Scaffold owns the content of `configs/app/vite.showcase.config.ts` (`scaffold/src/core/compilers.ts:1084-1092`). Its template is a three-line `appShowcase()` wrapper (`scaffold/src/core/templates.ts:881-885`).
    - Veneer's file diverges completely, and its own comment admits that `repair` restores the template (`configs/app/vite.showcase.config.ts:10-11`).
    - Neither the claim's list nor `ROADMAP.md:150` or `:74` names it. A repair would silently drop the Vue mode, the root `showcase/` output, and the final-page stamp.
    - Fix: add the file to both lists.

14. **BROKEN.** I would not ship this foundation yet.
    - `tests/src/styles/index.test.ts:48-49` refuses `.btn` and `--bs-*` in `./styles`. `ROADMAP.md:144` itself calls this a "placeholder refusal".
    - That refusal contradicts ruling 3, which lets `./styles` declare a Bootstrap class name, and `guides/veneer.md:187-188`.
    - Fix: drop both regexes from the styles proof, or rename the case so it names the styles chunk that will replace it.
    - Items 3, 8, 10, 11, and 13 also stand against shipping.
    - These parts held: each `it.todo` names its chunk (`tests/src/bootstrap/index.test.ts:223`, `tests/conformance.test.ts:99-101`, `tests/src/styles/index.test.ts:52-54`), and no probe is tracked.

## 2. Findings outside the claims

- **F1.** `C:/Users/mikes/WebstormProjects/veneer/tests/setupServer.ts:168-179`: `compileLayered` is misnamed.
  - It compiles any Sass entry, including the drop-in fixtures, which contain no layer (`tests/conformance.test.ts:57-59,69`).
  - Fix: rename it `compileSass` with the doc line "Compiles a Sass entry with the installed compiler in expanded style."
- **F2.** `C:/Users/mikes/WebstormProjects/veneer/tests/setupServer.ts:21-30`: four exports have no consumer.
  - `TAILWINDCSS_SHEET_PATH`, `TAILWINDCSS_BUILD_SCRIPT`, `STYLES_SHEET_PATH`, and `STYLES_BUILD_SCRIPT` appear only in the example at `:79`, now that the faces read `?raw`.
  - Fix: delete them and point the example at the Bootstrap pair.
- **F3.** The layer order is duplicated test data.
  - The ten-name array repeats at `tests/src/bootstrap/index.test.ts:26-37`, `tests/src/tailwindcss/index.test.ts:14-25`, `tests/src/styles/index.test.ts:23-34`, `tests/src/styles/themes/index.test.ts:31-42`, and `tests/integration.test.ts:50-61`.
  - The statement string repeats at seven more sites (`tests/src/bootstrap/index.test.ts:24`, `tests/src/tailwindcss/index.test.ts:12`, `tests/src/styles/index.test.ts:21`, `tests/src/styles/themes/index.test.ts:24`, `tests/conformance.test.ts:44,63,87`).
  - `tests.md` says data tables belong in a setup file and that any duplicate is a defect.
  - Fix: export a frozen `LAYER_ORDER` from `C:/Users/mikes/WebstormProjects/veneer/tests/setup.ts` and build the statement from it.
- **F4.** Config comments duplicate a benchmark and narrate history.
  - `isolate: false` and a four-line benchmark comment repeat in `configs/src/vite.{bootstrap,styles,tailwindcss}.config.ts:26-29`, restating a probe's result.
  - `vite.config.ts:15-18` narrates a failed run and points into the git-ignored `tmp/gates-final.log`.
  - Fix: set `isolate: false` once in `sheetProject` (`vite.config.ts:187-189`). Reduce the `optimizeDeps` comment to its reason: pre-bundle what every browser test imports so no dependency is discovered mid-run.
- **F5.** `C:/Users/mikes/WebstormProjects/veneer/src/core/constants.ts:6`: a published doc block describes future work ("The styles chunk adds the `veneer` group…"), which `typescript.md` forbids. `ROADMAP.md:50` already holds that plan. Delete the sentence.
- **F6.** `C:/Users/mikes/WebstormProjects/veneer/src/styles/themes/_default.scss:3`: the empty default pack is a stub carrying a narrative comment. Fix: `// TODO: [Default pack] Declare the complete light and dark token maps.`
- **Referred to the objective lane, not ruled:**
  - `configs/helpers.ts:484-488`: `targetBrowser` names `src/vue/` but not `app/vue/`.
  - Every built sheet ends with Vite's `/*$vite$:1*/` marker (for example `dist/src/bootstrap/index.css:111`). That marker ships, and link 2 cannot see it because the round trip drops comments.

## 3. Attacked and held

- **No duplicated helpers.** `@orkestrel/test/browser` `readRules`, `readCascade`, and `findRule` walk rules breadth first with no layer or context, while `scanSheetRules` walks in source order with both (`node_modules/@orkestrel/test/dist/src/browser/index.d.ts:2560-2577`). Neither duplicates the other.
- **Setup proof placement.** `tests/setupBrowser.test.ts` proves `tests/setupStyles.ts`. That departs from ruling 3's placement but is right: `tests.md` puts CSS helpers in `setupStyles.ts`, and `workspace.md` admits only `setupBrowser.test.ts` to `setup:browser`.
- **Themes barrel and the styles tokens.** The themes barrel relies on the styles `_tokens.scss` declaring no `:root`, and `themes:51` guards that.
- **Order statement in three partials.** Each face is a separate compile, and each face test pins the literal, so the three `_tokens.scss` copies are guarded.
- **Vue emptiness.** `tests/src/vue/index.test.ts` would not notice an added Vue export, because `browserKeys` is empty. The guide's `report.surface` check would catch it.
- **Vue factory in a wrapper.** The `appVue` factory lives in a wrapper because the vendored root config forces it; propagation item 2 covers it.
- **Stamp placement.** `stampPage` inserts at the first line that opens with `</head>`. The single-file output inlines each asset on one line (`showcase/*.html:7-9`), so the stamp lands after the inlined assets as intended.

VERDICT: FAIL 3, 8, 10, 11, 13, 14; outside the claims: F1, F2, F3, F4, F5, F6
