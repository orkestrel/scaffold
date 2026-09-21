# Unit CL4 — the remaining Reboot tags and the `reboot` key (brief 2)

Supersedes `cl4-brief.md`, which is left unedited and whose every other section stays
in force. What changed and why: the scope read
(`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl4-scope-read-report.md`)
confirmed every ownership mark and every other citation, corrected one line reference, and
answered both of brief 1's Unknowns from the code. This brief carries those answers so you do
not rediscover them, and states the facts the scan's mechanics make load-bearing.

## Corrections to brief 1

- `MANDATED_TAG_PAIRS` is at `tests/setupStyles.ts:780-799`, not at the lines brief 1 cites
  (those hold theme-map colour entries). Its pairs are unchanged: `details/summary`, `dl/dt`,
  `dl/dd`, `fieldset/legend`, `figure/figcaption`, `ol/li`, `optgroup/option`, `ruby/rp`,
  `ruby/rt`, `select/option`, `table/caption`, `table/colgroup`, `table/tbody`, `table/tfoot`,
  `table/thead`, `tr/td`, `tr/th`, `ul/li`.
- The guide's deferral table is `### Deferred selectors` at `guides/veneer.md:192`, with the
  columns `Name`, `Owner`, `Reason`. **No `Excluded` row exists yet**: yours are the first, so
  match the table's existing row shape rather than looking for a precedent.
- The guide's § Compatibility table is at `guides/veneer.md:710` with the columns `Component`,
  `Kind`, `Obligation`, `Proof`, `Status`, and carries `btn` today.

## Both Unknowns, answered

**How the presence scan matches** (`tests/setupConformance.ts:633-687`, read by the scope read
and quoted in its report). This decides your selector text, so treat it as fixed:

- The built cascade is parsed with PostCSS and every rule is walked with `walkRules`, which
  recurses into nested and grouped rules at any depth, so a selector inside a nested rule counts
  exactly as a top-level one. Each rule's comma-separated list is split into its members, and
  each member is passed through `normalizeComplexSelector` (`tests/setupStyles.ts:1760`), which
  normalizes whitespace and combinator spacing and touches nothing else: not case, not vendor
  prefixes, not quoting.
- A `shipped` row's selector is required **present** by exact normalized equality against that
  set. A vendor pseudo-element or attribute selector must therefore appear in your partial with
  the same text the inventory carries, character for character apart from whitespace.
- An `Excluded` row's name is first validated against the pinned inventory by whole-string
  membership across **every** component's selector and property lists, then required **absent**
  from the built cascade by the same exact normalized equality. A substring never matches, in
  either direction.

**Whether the `reboot` row carries custom-property obligations: it does not.** I read the
fixture and the reader myself: `readOracleInventory` projects each component to
`{ selectors, properties }` where `selectors` is the `selector` field of each entry and
`properties` is `Object.keys(component.properties)` (`tests/setupConformance.ts:741-773`). The
`reboot` component's `properties` object is empty, so its projected property list is empty and
the scan requires no custom property of this row. Its `selectors` list carries 117 entries,
which is the population your partials must satisfy: derive it from the fixture, never from a
count anyone wrote down.

## What the scope read settled, so you need not

- Every family brief 1 assigns you is unowned: no partial exists for `b`, `figure`, `img`,
  `svg`, `table`, `tr`, `label`, `input`, `select`, `optgroup`, `textarea`, `fieldset`,
  `output`, `iframe`, `details`, or `progress`. `src/styles/elements/_button.scss` exists and
  carries `button`, `button:hover`, `button:active`, `button:focus-visible`, and
  `button:disabled` only, so every reboot selector brief 1 lists for it is yours to add.
- The elements-layer guard admits a vendor pseudo-element and an attribute-only selector without
  an edit, because neither names a tag and neither triggers a pair. Your grant on
  `tests/src/styles/index.test.ts` therefore stays conditional: edit it only if a selector you
  ship is actually refused, and report that rather than widening the guard on a guess.
- `app/browser/index.ts` re-exports `./constants.js` with a wildcard, so new specimen rows need
  no barrel edit.
- `tests/app/browser/sections/ContentSection.test.ts` carries fixed specimen-count and
  tag-sequence assertions that your new specimens falsify; it is in your owned set, and those
  assertions are yours to grow in the same step.
- `tests/conformance.test.ts` asserts `collectShippedComponents(rows)` equals `listed`, so the
  guide's `reboot` row must read `shipped` in its `Status` cell for the two to agree when you
  grow `listed` to `['btn', 'reboot']`. Both move in one edit.
- `*`, `*::before`, `*::after`, and `[hidden]` are already shipped by `src/styles/_reset.scss`
  in the `reset` layer, and the scan walks every layer, so they satisfy their inventory rows
  where they are. Ship nothing for them.
- The inventory carries no `option` selector, so the question of which parent owns one does not
  arise in this unit.

## Everything else

Brief 1's Role, Objective, Context, Scope, Execution, Output, Deviation contract, and Acceptance
criteria stand unchanged, with one addition to its Deviation contract: **stop and report** if a
`shipped` selector cannot be emitted with the inventory's exact text inside the elements layer
without a rule the guards refuse. That is a design question about the exclusion set, not
something to settle by rewording a selector until the scan passes.
