# Falsify round: the Opus reviewer's verdict over veneer `473edd6` (2026-10-04)

Lane: subjective (Opus reviewer, read-only). Object: the seven commits `bae9a1b` to `473edd6` over `d0603b4`. The lane's own note: its engine wrote the copy document (U5a) and U7's prose, and findings F1 and F2 land partly on that prose.

## Claims

Holds: 1, 2, 3, 4, 5, 6, 7, 10, 11, 12, 13, 14, 15, 17, 18, 19, 20, 21, 22, 23, 24, 26, 27, 28, 31, 32, 33, 35, 36, 40, 41, 42, 45, 46, 47, 48, 49, 52, 53, 56, 57.

Unverifiable (referred to the analyst or resting on a report): 8 (the `package.json` diff), 9 (the `$layered: false` digest at both commits), 16 (`hidden="until-found"` together with `d-flex` rests on P6), 29 (the dropped `.carousel-indicators button` color and "every element of the measured markup" rest on the audit), 30 (no case reads a bare `h2` in a card body, `.card-text:last-child`, or `h5.modal-title` under `unexcluded`), 34 (`incompatible.json` "differs only on border-style longhands" needs the diff), 37 (no committed case reads `[unexcluded, built]`), 38 (no case loads a consumer's `.mt-3 { margin-top: 2rem !important }` after the recipe), 54 (the chrome census asserts only `h-100` and card-body `gap-3`; the P4 equality rests on the report), 55 (eight of the 23 specimens carry captions no case reads).

Refuted: 25 (the `:where(.table) thead` and `tfoot` witnesses carry no hazard element; Bootstrap documents `<thead class="table-light">`), 39 (no case reads `mt-3!`; the overrides table lacks the `dark:` and important-modifier rows verdict § 7 requires), 43 (`tests/src/tailwindcss/index.test.ts:37-63` has no control; `tests/setup.test.ts:131-134` holds an assertion that cannot fail; the precedence controls at `index.test.ts:328-353` never run the case's pairing), 44 (`tests/setup.test.ts:131` says "refuses the mirror ownership", `:1183` says "compatibility recipe guards and exemptions", `tests/app/browser/integration.test.ts:944` says "partitions every departure of the tailwindcss face" and partitions nothing), 50 (the partition case runs only in light-1280, reads only shared-name elements, partitions by winning system with no attribution kinds; the claim text predates the § 12 rulings), 51 (the guide names no attribution kind; `DepartureCause` has no `resolved` member).

## Findings by severity

- **F1 (high): the curation is bounded by masked showcase markup, so Bootstrap's documented markup still breaks.** Preflight's `h1-h6 { font-size: inherit; font-weight: inherit }` and `* { margin: 0 }` in `base` beat the reboot in `reset`; `$curation` lacks `alert-heading`, `card-subtitle`, `dropdown-header`, `display-6`, `figure`, `list-inline`, because the showcase carries them with masking companions (`h4.alert-heading.h5` at `sections/alerts.html:142`, `h5.card-subtitle.h6` at `card.html:15`, `span.dropdown-header` at `dropdowns.html:8`, `p.display-6.mb-0` at `typography.html:60`, `figure.figure.mb-0` at `figures.html:5,25`, `ul.list-inline.mb-0` at `typography.html:114`). Expected readings under the recipe (cascade reading, for the analyst to measure): `h4.alert-heading` 16px, 400, 0px against 24px, 500, 8px at 1280; `h6.card-subtitle` and `h6.dropdown-header` weight 400 against 500; `p.display-6`, `figure.figure`, `ul.list-inline` bottom margin 0px against 16px. Overclaims: `guides/veneer.md:1203-1205`, `:1387`, `:1893`; `sections/tailwindcss.html:18-20`; `ROADMAP.md:15`. Right: specimens in Bootstrap's documented markup with no `.hN`, `mb-0`, or `span` substitute; the fixed point rerun; the six reboot rows with witnesses.
- **F2 (high): no gate proves that components keep their look on the page.** `collectPartition` reads only shared-name elements; `attributeDeparture` and its helpers have no consumer beyond their unit test; `guides/veneer.md:1893` names a property no case proves. Right: a gate, once per signature as the partition is, that reads every element carrying a `CLASS_NAMES.bootstrap.components` name under `bootstrap` and `tailwindcss` through `attributeDeparture` and fails on any departure attributed to `preflight` or left `unattributed`.
- **F3 (medium): the overrides table is incomplete** (`guides/veneer.md:1484-1489`): add a consumer's unlayered `!important` after the recipe (32px), `mt-3!` (12px under both Tailwind faces), and the `dark:` limit, each with an integration case.
- **F4 (medium): controls that cannot fail**: `index.test.ts:37-63` (plant a `@layer base` rule and a layered `!important`); the precedence controls at `:328-353` (rerun the pairing loop on text emitting `.table tr` and on a copy moved after the first component rule); `setup.test.ts:131-134` (pin `SHEET_LAYERS` to the cascade table or delete); the `thead` and `tfoot` witnesses (add `<thead class="table-light">` and `<tfoot class="table-group-divider">`).
- **F5 (medium): false or stale titles and retired vocabulary**: `tests/app/browser/integration.test.ts:944` (cited seven times in the guide) names a partition it does not do; `tests/setup.test.ts:131` ("mirror") and `:1183` ("exemptions"); `tests/setup.ts:527` dead `'Tailwind exemption table'` branch; `tests/setupServer.ts:990` TSDoc places the compile after the sheet; `tests/integration.test.ts:867` says "refuses" but measures; `guides/veneer.md:14` "compatibility sheet"; `_mixins.scss:6` "this switch" above six.
- **F6 (low): misplaced proofs**: `tests/setup.test.ts:11-61` and `:63-73` prove production artifacts in the setup proof; move to `tests/conformance.test.ts` § `Tailwind compatibility recipe` and list at `ROADMAP.md:82`.
- **F7 (low): unpinned caption readings** for eight specimens (`sections/tailwindcss.html:212-213, 233-235, 254-255, 278-279, 313-315, 337-338, 512-514, 542-543`); add `TAILWIND_READINGS` rows.
- **F8 (low): the census title overclaims** (`sections/integration.test.ts:123-143` checks 2 of 5 replaced names): add `rounded`, `border`, card-body `w-100` with planted controls.
- **F9 (low): positional coupling** (`setupBrowser.ts:1621` `slice(0, 2)`; `setupBrowser.test.ts:871` `[22]`): select by specimen and subject.
- **F10 (low): two names per concept across the `with` boundary** (`$shared`/`$withhold`, `$curation`/`$curated`, `$defaults`/`$restored`; `$defaults` names `revert` rows; `reboot` names a form and a mixin): the Tailwind tokens take the switch names; update the setup pin regexes, `ROADMAP.md:99`, `guides/veneer.md:1465-1467`.
- **F11 (low): the `unexcluded` face is composed in two orders** (`tests/integration.test.ts` `built` then `unexcluded`; `Showcase.ts:190` and the guide `unexcluded` first): use the showcase order in the integration readings or a case that reads both as equal.
- **F12 (low): R11 and writer drift**: `ROADMAP.md:171` lists fewer tokens than R11; the preflight writer asserts the major is 141 against § 6 "either host regenerates".
- **F13 (low): guide voice**: `guides/veneer.md:1478-1482` offers two paths; `:1220-1221` lists the "type scale" among `--bs-*` declarations though the heading sizes are literals.

## Attacked and held

The fifth switch `$scoped` (ruled in § 12; not forwarded; the `@error` guard protects the internal configuration); the kept `_mixins.scss` (verdict § 8 item 2 and `AGENTS.md` keep the kind file: the Orchestrator's fix list had it deleted; ruled below); the 215 empty blocks (a pinned artifact); the curated copies' specificity (`ul:where(.pagination)` loses to `.pagination` as under Bootstrap alone); the face derived from connected `style` elements; R11 stated as not landed without overclaiming.

VERDICT: FAIL 25, 39, 43, 44, 50, 51; outside the claims: F1, F2, F5, F6, F7, F8, F9, F10, F11, F12, F13.

## Orchestrator rulings on the verdict (2026-10-04)

- **F1 is the finding that matters most** for the user's rulings (the layer curates so components do not break): the fixed point read the showcase, whose companion classes mask documented markup. The fix wave adds documented-markup specimens (Bootstrap's own example markup for every component carrier, without masking companions), reruns the fixed point (probe-4) over them, and folds the derived rows (sheet-3) before the landing.
- **F2 becomes a gate** in the journey project (one variant, per signature), through the existing `attributeDeparture`, failing on `preflight` or `unattributed` after the probe's exclusions; its cost is measured against the partition's 53 s.
- `src/tailwindcss/_mixins.scss` stays (the reviewer's reading of `AGENTS.md`'s kind-file rule stands over the earlier fix-list entry).
- F3 to F13 go to the fix units with the analyst's findings; the claims list is updated to the § 12 rulings (50, 51) rather than the code to the stale claims.

## Note (2026-10-05)

- Claims 50 and 51 are superseded by `../../design-verdict.md` § 12 and the preservation gate at veneer `77c65cf`.
- Claim 54 is superseded by the showcase brief's four permitted longhand kinds and the census fix unit A widened at `527ea39`.
- The refutation of claim 51 at `:11` ("`DepartureCause` has no `resolved` member") has been false since `77c65cf`.
- The briefs stay as written.
