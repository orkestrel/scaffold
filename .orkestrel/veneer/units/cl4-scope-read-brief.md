# CL4 scope read — the brief against the live tree before dispatch

Role: `checker` on native Sonnet, read-only, clean context. Perform the assignment directly and
spawn nothing. (The tedious-work ladder routes a scope read to `grok` first; this campaign
reserves the Cursor bench for terrain maps, and the ladder step is recorded in the plan.)

Subject: `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/cl4-brief.md`, the brief a bench
writer (Astra) will open next, against the live Veneer checkout at
`C:/Users/mikes/WebstormProjects/veneer` (HEAD `d822d59`, the CL3b landing; tracked tree clean).
CL4 is the largest unit of this family: it lands seventeen partials, flips the conformance
`reboot` key, and grows the showcase, so a fact the brief states wrongly costs a whole round.

Rule on these, with `file:line` evidence for every row:

1. Every path, symbol, and line number the brief states resolves and is true: `MANDATED_TAG_PAIRS`
   in `tests/setupStyles.ts` (the brief cites lines 437-456 — give its true location and list its
   pairs), `readCompatibility`, `collectShippedComponents`, `scanCompatibilityPresence`, and
   `readDeferrals` in `tests/setupConformance.ts`, `readOracleInventory` there, `listed` in
   `tests/conformance.test.ts` (the brief cites line 55), the guide's § Compatibility table and
   its deferral table with their column shapes, `src/styles/index.scss`'s load order after CL3
   and CL3b, `src/styles/elements/_button.scss` and what it declares today,
   `app/browser/constants.ts`'s `CONTENT_SPECIMENS` and `app/browser/types.ts`'s
   `ContentSpecimen`, `app/browser/sections/ContentSection.ts`, the physical-axis guard and the
   elements-layer guard in `tests/src/styles/index.test.ts`, and
   `node_modules/bootstrap/scss/_reboot.scss`.
2. The terrain map's ownership marks still hold against the live tree: for each family the brief
   assigns to CL4 (`b`, `figure`, `img`, `svg`, `table`, `tr`, `label`, `button`, `input`,
   `select`, `optgroup`, `textarea`, `fieldset`, `output`, `iframe`, `details`, `progress`),
   confirm no partial for it already exists under `src/styles/elements/`, and for `button`
   confirm which of the reboot selectors the brief lists that partial already carries. Report
   each mark the tree contradicts.
3. **How the presence scan actually reads.** This decides the unit's whole shape, so answer it
   from the code rather than from the brief: when a Compatibility row is `shipped`, what does
   `scanCompatibilityPresence` require of each inventory selector (exact text, normalized text,
   or a looser match), what does it do with the row's custom properties, and how does it treat a
   selector inside a nested or grouped rule? Then say what an `Excluded` row requires, and
   whether an excluded name is matched as a substring or as a whole selector. Quote the deciding
   lines.
4. Scope by falsified assertions: for each execution item, name every existing test, fixture,
   export-inventory assertion, parity list, guard, or policy sweep that the item's result would
   make false, and say whether the brief's Scope grants that file. Sweep `tests/**`, `src/**`,
   `app/**`, `guides/veneer.md`, `package.json`, and `configs/**`, and name the scope you
   covered. Call out in particular: what flipping `listed` to `['btn', 'reboot']` makes false
   besides the presence scan; whether any proof pins the count or the content of the guide's
   Compatibility rows; whether `tests/src/styles/index.test.ts`'s guards admit the vendor
   pseudo-element and attribute selectors the brief lists without an edit; and whether
   `ContentSection`'s proof or the app barrel's export set grows with the new specimens. List
   each ungranted file with the assertion and the item that breaks it.
5. Every owned file that is vendored (`vite.config.ts`, `tests/config.test.ts`,
   `tests/policy.test.ts`, `tests/setupPolicy.ts`) or otherwise off-limits by the brief's own
   list, and every owned path that does not yet exist (expected for the new partials; list them
   so the writer creates rather than looks).
6. The unclear rows the terrain map flagged (`*`, `*::before`, `*::after`, `[hidden]`, the
   attribute-only and vendor pseudo-element selectors, and which parent owns an `option` row):
   say what the live tree already settles for each and what the brief leaves the writer to
   decide, so the brief can settle it before dispatch.

Output, and nothing else: one table per item (the words `none found` when a sweep finds
nothing), then one line `Verdict: dispatch` or `Verdict: amend` with the rows that force it. No
process diary; report no wording or prose finding.
