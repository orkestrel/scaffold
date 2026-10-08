# Critique: the three variant proposals

The critique finds 23 gaps. Three hit all three proposals, 11 hit the attribute proposal, 13 hit the class proposal, and 10 hit the token proposal. At landing, two of the token proposal's gaps redden gates that pass at `9f56e6a`:

- Its accent partial writes `[data-vn-theme]` into the built `./styles` sheet, which `tests/src/styles/themes/index.test.ts:26` refuses.
- Its `@scope` preludes hide every accent class from the `readCascade` function that the page census relies on.

The class and attribute proposals resolve the variant color on the host. A color-mode island under the host therefore keeps the host's mode, and the token proposal's own run reads 1.05 to 2.53 for that case against the island's body background (`tmp/units/variants-2026-10-08/token/freeze.txt`). No proposal states that forced colors erase every key. No proposal states that the admitted maps can't give a solid-fill variant a foreground.

This critique reads the following sources, all on 2026-10-08:

- `/home/user/veneer` at `9f56e6a`, and the `landing` branch at `de168b8`
- the scaffold rules under `/home/user/scaffold`
- the Sass doctrine in `native/drag-2026-10-08/verdict.md`
- the scout's `brief.md`
- the three proposals and their runs under `/home/user/veneer/tmp/units/variants-2026-10-08/`

It ran no browser, edited no source, and committed nothing. A bare line number names `9f56e6a` unless the item names another tip.

Each item names the proposals it hits, the evidence, and the fix. The items run from the gaps that redden a gate to the gaps that leave a claim unchecked.

1. **The accent partial puts a theme-pack selector into the `./styles` sheet.**
   - Hits the token proposal.
   - Evidence: The partial's selector list `:scope, [data-bs-theme], [data-vn-theme]` (`proposal-token.md:47-50`) compiles into the built `./styles` sheet. The `ships the shared order with only theme blocks and no fabricated defaults` case refuses any `data-vn-theme` text in that sheet (`tests/src/styles/themes/index.test.ts:26`), and the guide states that pin (`guides/veneer.md:1944-1945`). `ROADMAP.md:95` also makes the `retune` mixin the one home of the theme-pack selector scheme. No token unit owns the themes test, and the proposal's themes claim covers `_tokens.scss` alone (`proposal-token.md:194`).
   - Fix: Drop `[data-vn-theme]` from the `./styles` partial and keep `[data-bs-theme]`. State in the guide that a pack root re-resolves the accent only when it carries `data-bs-theme`; `ROADMAP.md:50` already asks that of a pack root inside a dark ancestor. Give the pack cells of the accent matrix a pack root with that attribute and one without it.

2. **The `@scope` prelude hides each accent class from the page census, and the specimen shows 1 of 8 classes.**
   - Hits the token proposal.
   - Evidence: The `readCascade` function of `@orkestrel/test` 0.0.25 collects class tokens from `CSSStyleRule.selectorText` alone (`node_modules/@orkestrel/test/dist/src/browser/index.js:2192-2199`). The page census therefore lists `accent-success` as undeclared, while `tests/app/browser/integration.test.ts:1328-1330` pins `census.undeclared` to the slide marker, the icon tokens, and the two controls. The set equality at `:1318-1327` also fails both ways:
     - Adding `collectNames(CLASS_NAMES.veneer)` leaves 7 accent classes missing from the page.
     - Leaving the expected set alone makes `accent-success` an extra.

     Unit V1 changes only the `tests/setupStyles.ts` instruments (`proposal-token.md:376`), and V4 never mentions the page census.
   - Fix: Land a `readCascade` change in `@orkestrel/test` that reads the class tokens of each `CSSScopeRule` rule's `start` and `end` preludes, and release and re-pin it before V4. Then show every `CLASS_NAMES.veneer.modifiers.accent` class on the page, and give V4 the page census expectation with `collectNames(CLASS_NAMES.veneer)` added.

3. **Prelude-only classes contradict the class registry's membership law.**
   - Hits the token proposal.
   - Evidence: Several sources define a member as a name that a style-rule selector reacts to:
     - the `CLASS_NAMES` `@remarks`: "Membership means a style-rule selector reacts to the name" (`src/core/constants.ts:1056`)
     - the `ClassName` summary: "Names one class declared in a style-rule selector" (`guides/veneer.md:32`, pinned to its TSDoc through the `findDrift` function)
     - `ROADMAP.md:46`

     An `accent-KEY` class sits in a scope prelude and in no style-rule selector. The proposal keeps the description paragraphs unchanged "so guide parity holds" (`proposal-token.md:377`). Parity holds, but the sentence it keeps is false, against the falsification rule in `/home/user/scaffold/.claude/rules/documentation.md` § Parity.
   - Fix: In V2, amend the membership sentence in the `@remarks`, the `ClassName` description and its Summary cell, and `ROADMAP.md:46` to admit a scope prelude, and run `npm run test:guides`.

4. **A host-resolved variant keeps the host's color mode across islands and nested hosts.**
   - Hits the class and attribute proposals.
   - Evidence: Each generated rule declares `--vn-drag-color: var(--bs-KEY-text-emphasis)` on the host, so the host computes the value once and every descendant inherits it. A `[data-bs-theme]` element between the host and an item keeps the host mode's color. The token proposal's run reads 1.05 to 2.53 in every key for that case, under the 3:1 that state graphics need (`token/freeze.txt`).

     The default path doesn't freeze. A contextual item sets `--bs-list-group-active-bg` on itself (`src/bootstrap/components/_list-group.scss:248`), so the line resolves in the item's own mode. A variant therefore regresses an island that renders correctly at `9f56e6a`.

     Each proposal leaves this unpinned:
     - The class proposal records the limit without a case (`proposal-class.md:553-556`).
     - The attribute proposal records that no case measures an island (`proposal-attribute.md:380`), and it doesn't record that a nested host inherits the outer host's color.
   - Fix: Write each generated rule with a second selector for islands, `[data-vn-drag].drag-KEY [data-bs-theme]` or `[data-vn-drag][data-vn-color='KEY'] [data-bs-theme]`. That form keeps the class inside a style-rule selector for the census. Add an island cell per key in both modes. Record in the guide that a nested host of another key inside a colored host resolves by map order.

5. **Forced colors erase every key, and no proposal says that a variant carries no meaning.**
   - Hits all three proposals.
   - Evidence: Under `forced-colors: active`, the existing rules paint the line and the empty-host outline in `Highlight` for every key (`src/styles/composables/_drag.scss:63-72`). The user agent forces `background-color`, and no case reads what the over tint becomes: the forced-colors case reads the outline alone (`tests/src/styles/composables/drag.test.ts:262-302`). Every key therefore renders alike, and WCAG 2.2 SC 1.4.1 (Use of Color) needs the list's meaning to sit somewhere other than its color. No proposal's guide edits say so. The token proposal's drag accent case has no forced-colors cell at all (`proposal-token.md:317`).
   - Fix: State in § Sortable list that a variant is decoration, that forced colors paint every key in `Highlight`, and that a list's meaning sits in its accessible name or text. Add a forced-colors cell per key to the token matrix. Read the over tint under forced colors in each matrix so the guide states what it becomes.

6. **The `recolor` mixin has one caller, and its justification misreads the authority clause.**
   - Hits the attribute proposal.
   - Evidence: `/home/user/scaffold/.claude/rules/styles.md:69` forbids a mixin for one caller. The proposal invokes "the user's current instruction wins" (`/home/user/scaffold/AGENTS.md:8`), but the user asked for variants on later components, not for a mixin ahead of its second caller. On a conflict between a rule and a guide, the contract says to stop and report (`AGENTS.md:13`). Neither precedent the proposal cites is a free choice:
     - `styles.md:71` mandates `transition`.
     - `ROADMAP.md:95` makes `retune` the one home of the pack selector scheme.
   - Fix: Land the `@each` inline in `surfaces/_drag.scss` with `@use '../../bootstrap/maps'`, which is the proposal's own fallback (`proposal-attribute.md:377`). Move the loop into `_mixins.scss` with the second caller.

7. **No packed install compiles the styles Sass, and the mixin carries the maps into the themes entry.**
   - Hits the attribute proposal.
   - Evidence: `themes/_default.scss:1` loads `_mixins.scss`, so a maps load there makes `./styles/themes/scss` cross faces as well as `./styles/scss`. The distribution proof compiles `./bootstrap/scss` alone (`tests/distribution.test.ts:841-875`). The class proposal (U2) and the token proposal (V5) each add a packed `./styles/scss` case. The attribute proposal adds none, and it lists no `npm run test:distribution` gate (`proposal-attribute.md:418-426`).
   - Fix: Add packed compiles of `./styles/scss` and `./styles/themes/scss` through the `NodePackageImporter` class to V1's files and gates. Each compile reads its generated rules, or reads their absence in the themes sheet.

8. **The scaffold rule changes have no landing path.**
   - Hits the class and token proposals.
   - Evidence: Unit U0 edits `/home/user/scaffold/.claude/rules/styles.md` and gates on `npm run test:policy` alone (`proposal-class.md:598-602`). That gate misses two facts:
     - Scaffold's `host.json:580` carries that file's digest, and `tests/config.test.ts:1250-1327` refuses a stale committed host inventory.
     - Veneer reads the installed copy whenever no checkout sits beside it (`/home/user/veneer/AGENTS.md:11-20`).

     The token proposal's R-1 asks for a scaffold follow-up that no unit schedules. Its R-2 creates a token that only a modifier class declares, against `styles.md:49` and the fourteenth-round ruling that "the drag tokens stay component-scoped on the host selector" (`stage-b/user-rulings-2026-10-06.md:81`), and records it at `ROADMAP.md:104`, which can't amend a scaffold rule.
   - Fix: Give each rule change its own scaffold unit, ordered before the veneer unit that depends on it. The unit does the following:
     - regenerates `host.json` with `npm run build:inventory`
     - runs scaffold's config, distribution, and policy gates
     - lands in a scaffold release that veneer re-pins

     Put R-2 to the user beside the fourteenth-round ruling it narrows.

9. **The class loop takes its keys from the text map, so the planted control can't see the axis.**
   - Hits the class proposal.
   - Evidence: The partial loops `@each $key, $value in maps.$theme-colors-text` (`proposal-class.md:46`). The doctrine and the thirteenth-round reading generate each variant from the key list it varies over (`verdict.md:233`; `stage-b/user-rulings-2026-10-06.md:74`). Bootstrap 5.3.8 keys its contextual list-group and alert classes on `map-keys($theme-colors)` (`node_modules/bootstrap/scss/_list-group.scss:185`; `_alert.scss:60`). Under this loop, a `$theme-colors` change generates nothing and refuses nothing. The planted fixture configures `$theme-colors-text` alone (`proposal-class.md:113-121`), so it can't tell the two key sources apart.
   - Fix: Loop over `map.keys(maps.$theme-colors)`, and read each value with `map.get(maps.$theme-colors-text, $key)` and an `@error` on a missing key, as the other two partials do. Plant the control on `$theme-colors`, and add a control that drops one text key and expects the refusal.

10. **The maps hold references, not Sass colors, and no proposal states what that excludes.**
    - Hits all three proposals.
    - Evidence: Every color map value is a `var(--bs-*)` reference (`src/bootstrap/_maps.scss:2-73`), so no Sass color function, such as `color-contrast()`, can run on it. Bootstrap's solid variants take their foreground from that function at compile time, as the literal values at `src/bootstrap/components/_buttons.scss:98-102` show. No admitted map holds a contrast foreground or a `-rgb` triplet. `$colors` (`:14-29`) has no emphasis or subtle family, and `$border-widths`, `$spacers`, and `$font-sizes` hold literals (`:101-125`).

      The user's request names "other elements and components that we come up with". A solid-fill skin is therefore out of reach, yet each proposal offers its mechanism to later components without that limit:
      - `proposal-attribute.md:245`
      - `proposal-class.md:146-201`
      - `proposal-token.md:122`

      A theme pack that retunes `--bs-KEY` also leaves `--bs-KEY-text-emphasis` unchanged (`src/bootstrap/_tokens.scss:60-67`). The class proposal records that limit (`:566-567`); the attribute and token proposals don't.
    - Fix: Add a § Styles sheet paragraph in whichever proposal lands, stating what the maps give a variant:
      - The text-emphasis, bg-subtle, and border-subtle families are the only color families that retune by mode.
      - A pack moves a variant only by retuning the emphasis family.
      - A solid fill with a contrasting foreground waits on a user ruling about a contrast map under `src/bootstrap`.
      - The length maps hold literals, which the doctrine keeps out of sizes.

11. **The surfaces-layer color rules lose to any composables default, and the guard is pinned for one module.**
    - Hits the attribute proposal.
    - Evidence: `surfaces` precedes `composables` (`src/styles/_tokens.scss:2`). The law that a color default lives only in a `var()` fallback is pinned by a site check on `--vn-drag-color` alone (`proposal-attribute.md:209-211`, `:264-267`), and the guide edits give it no home (`:456-467`). A later module partial that declares its `--vn-MODULE-color` default in `composables` would beat every color rule with no reddened reading. The existing pattern invites that declaration, because `--vn-drag-size` is declared there (`src/styles/composables/_drag.scss:16`).
    - Fix: State the law in § Styles sheet. Widen the site check to every `--vn-*-color` name the sheet declares: each declaration sits under a selector that carries `[data-vn-color=`, in the layer of the partial that calls `recolor`.

12. **The guide files `data-vn-color` as a module attribute, and nothing pins its values.**
    - Hits the attribute proposal.
    - Evidence: V3 adds the row to the table under "The module exposes these data attributes" (`guides/veneer.md:1567`; `proposal-attribute.md:457`). The module never reads or writes the attribute, and two sentences say the styles sheet paints state attributes (`guides/veneer.md:2071-2072`; `ROADMAP.md:141`). No core registry or TypeScript type names its values, and a misspelt value falls to the default chain without a refusal (`proposal-attribute.md:381`).
    - Fix: Document the attribute in its own table of authored styling attributes under § Styles sheet, with its values taken from the `theme-colors` keys of `tests/fixtures/bootstrap/maps.json`. Add a guide case that reads the table's values against that fixture, and rewrite the two state-attribute sentences.

13. **The color journey runs in all four journey projects.**
    - Hits all three proposals.
    - Evidence: A case runs in every journey project unless the `JOURNEY_PLACEMENTS` or `COMPONENT_TABLES` constant places it (`guides/veneer.md:2536-2549`). The `shared` placement runs one `dark-1280` and one `light-390` pass (`tests/setupBrowser.ts:3851-3855`), and the table comment at `:3859` records a run-time balance. Each proposal leaves its case unplaced:
      - The attribute proposal runs its case in every project (`proposal-attribute.md:320`).
      - The token proposal does the same (`proposal-token.md:297`).
      - The class proposal places nothing (`proposal-class.md:521-526`).
    - Fix: Place the color journey under `shared`, which reads one light and one dark mode, and add it to the § Variant placement table.

14. **The deferred `vary` mixin carries one color token, so a component skin can't take a fill or an outline.**
    - Hits the class proposal.
    - Evidence: `vary($host, $name)` writes `--vn-#{$name}-color` from `$theme-colors-text` alone (`proposal-class.md:159-165`). A class skin in `components/` pairs three families, as `.alert-KEY` does (`src/bootstrap/components/_alert.scss:39-44`).
    - Fix: Give `vary` an argument that maps each token to its family map, with an `@error` on a missing key. State in U4 that a component skin names its families.

15. **The planted fixture's load paths don't resolve where U2 lands the fixture.**
    - Hits the class proposal.
    - Evidence: The fixture loads `'../src/bootstrap/maps'` and `'../src/styles/modifiers/drag'` (`proposal-class.md:114`, `:120`), paths written for the probe's `class/fixtures/` copy. U2 lands the file at `tests/fixtures/styles/planted.scss`, where the sibling fixtures load `'../../../src/styles/mixins'` (`tests/fixtures/styles/pack.scss:1`).
    - Fix: Write `'../../../src/bootstrap/maps'` and `'../../../src/styles/modifiers/drag'`.

16. **The registry-law argument for `drag-KEY` cites a law whose result the proposal doesn't follow.**
    - Hits the class proposal.
    - Evidence: The cited law files "a modifier specific to a component" with the component, as `components.btn.primary` (`guides/veneer.md:679`). The proposal files `drag-KEY` under `modifiers` instead (`proposal-class.md:213`). The category law gives it `modifiers` because no `drag` root class exists, and that same reason files a bare `success` there.
    - Fix: Drop the `:679` support. State the category law's own result: no root class, so each class is a general token-only class under `modifiers`. Rest the case against the bare form on the two-meanings argument alone.

17. **The word "accent" already names a Bootstrap token in the registry.**
    - Hits the token proposal.
    - Evidence: The proposal searches `CLASS_NAMES` alone (`proposal-token.md:180`). `TOKEN_NAMES.bootstrap.table.accent.bg` names `--bs-table-accent-bg` (`src/core/constants.ts:313-314`), so the registry would carry `accent` for two concepts, against "One concept, one term" (`/home/user/scaffold/AGENTS.md:54`).
    - Fix: Put the term to the user under R-1 with both registry paths in view, or name the axis with a word neither registry carries.

18. **The attribute proposal leaves five documentation claims false or unrecorded.**
    - Hits the attribute proposal.
    - Evidence: Five claims go false or unrecorded under this proposal:
      - The § Surface sentence says a `TOKEN_NAMES` member is a property that Bootstrap 5.3.8's bundled CSS declares (`guides/veneer.md:37-39`). V3 edits only `:661-672` (`proposal-attribute.md:466`).
      - The concept index says the `./styles` sheet has "no showcase", and the directory index lists none for `src/styles` (`guides/README.md`), while the specimen shows the sheet on `showcase/browser.html`.
      - The `src/styles/composables/_drag.scss:3` comment, "the line follows it unasked", turns false under a host color, yet the proposal says it stays true (`proposal-attribute.md:111`).
      - The `primary` key draws `#052c65` (`src/bootstrap/_tokens.scss:60`), not the default `#0d6efd` (`_list-group.scss:20`).
      - The `light` and `dark` keys both draw `#495057` in light mode (`_tokens.scss:66-67`).
    - Fix: Add each edit to V3. Add a matrix assertion that the `primary` line differs from the default line.

19. **The class proposal leaves four documentation claims false.**
    - Hits the class proposal.
    - Evidence: Four claims go false or unchecked under this proposal:
      - "The page uses Bootstrap's classes alone" (`guides/veneer.md:2074-2075`) becomes false, and U3 owns § Class coverage alone.
      - The § Interaction row names only the `Dispatch priorities` list (`:2313`).
      - U1 adds veneer lines to § Examples (`:637-654`), but `tests/guides.test.ts:133-146` transcribes each fence's claims, and U1 doesn't own that file.
      - The comment at `src/styles/composables/_drag.scss:3` turns false under a host class.
    - Fix: Give U3 the Showcase opener and the § Interaction row. Give U1 `tests/guides.test.ts`. Rewrite the comment in U2.

20. **The token proposal leaves the census, showcase, and pack prose stale, and overstates the platform floor.**
    - Hits the token proposal.
    - Evidence: V6 edits none of the following (`proposal-token.md:381`):
      - § Class coverage (`guides/veneer.md:2281-2295`)
      - the Showcase opener (`:2074-2075`)
      - the § Interaction row (`:2313`)
      - `ROADMAP.md:141`, which says the page shows Bootstrap's own classes
      - the showcase column of `guides/README.md`
      - § Theme packs, though a pack root changes what the accent resolves to

      The proposal also says that `@scope` "adds nothing to the platform floor the styles sheet needs" (`:69`). The `retune` output ships in the themes sheet alone, and the `./styles` sheet at `9f56e6a` holds no `@scope` rule, so the accent makes that sheet depend on `@scope` for the first time. The `accent-primary` line also differs from the default `#0d6efd` line, and no risk row records it.
    - Fix: Add each section to V6. Restate the floor claim for the `./styles` sheet. Record the `primary` difference beside the `light` and `dark` row.

21. **Two partial comments break the comment rule, and no sweep reads them.**
    - Hits the class and token proposals.
    - Evidence: The class comment claims the family "holds 3:1 in both modes" (`proposal-class.md:44`). That number has no run behind it in the comment, and the proposal leaves hover and author backgrounds unmeasured. The token comment at `proposal-token.md:38` restates the map it precedes. `oxlint` lints no `.scss` file (`package.json`, the `lint:check` script), so the `policy/no-banned-term` rule never reads either comment.
    - Fix: Make the class comment state why it uses the family, which matches the contextual item's line (`_list-group.scss:248`), without a ratio. Delete the token comment, per `/home/user/scaffold/.claude/rules/writing.md` § Code comments.

22. **Two proposals cite tips that `landing` has passed, and one probe compiles a different partial.**
    - Hits the attribute and class proposals.
    - Evidence: The two proposals cite older tips than `landing`:
      - The attribute proposal reads `48a9c9f` in `/home/user/.wave/veneer-drag6`.
      - The class proposal reads `2540baf`.

      `landing` sits at `de168b8`, with D2.6's touch path. The attribute probe's `probe/styles/surfaces/_drag.scss` file lacks the grouped-host rule from `6381c29`, which the proposal says stays in the partial (`proposal-attribute.md:97`).
    - Fix: Re-run each probe against the `surfaces/_drag.scss` partial at `de168b8`, and cite that tip.

23. **No proposal rules the item scope that the request names.**
    - Hits the class and attribute proposals.
    - Evidence: The request asks for variants on "drag and drop elements". Both proposals generate host selectors alone:
      - The class proposal pins an item class as inert without ruling on it (`proposal-class.md:496`).
      - The attribute proposal says nothing about item scope.
    - Fix: State in § Sortable list that Bootstrap's `.list-group-item-KEY` class is the item path, because it retints the line through `--bs-list-group-active-bg` along with the fill (`_list-group.scss:239-250`), and that a host variant overrides it. Add the attribute proposal's inert-item case.
