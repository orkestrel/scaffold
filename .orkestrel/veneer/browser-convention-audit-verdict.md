# Browser convention audit verdict — falsify round `browser-convention-audit`

Subject: the browser engine of `@orkestrel/veneer` at veneer `main` `95eb674` (2026-10-02), after the convention unit, the tips unit, and the adoption of scaffold 0.0.87. Claims: the 27 in veneer `tmp/units/browser-convention-claims.md`. The round decides whether the convention and tips units are accepted, and whether scaffold's plugin kind ships as it stands.

Ruling: `FAIL`. A fix campaign opens with the items in § Carried, beside ruling 16 of `browser-convention-verdict.md` and the open items of the conflict status map. Scaffold's plugin kind takes the repair in G13 before its next release.

## Lanes

| Lane       | Role       | Engine          | Mode                                                                                                                                       | Verdict                                                                           |
| ---------- | ---------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| subjective | `reviewer` | Claude Opus 5.5 | native Agent tool, read-only, no shell; 103 citations, 4 short forms resolved by hand                                                      | `FAIL 9, 10, 11, 15, 16, 17, 18, 22, 23, 25, 27; outside: F1, F2, F3`              |
| objective  | `analyst`  | GPT-6 Astra     | `codex exec` at `danger-full-access`, effort high, 1682 s; a Chromium probe and a node probe, both deleted, tree clean; 122 citations, 0 unresolved | `FAIL 4, 10, 12, 14, 15, 16, 17, 18, 20, 22, 23, 27; outside: O1, O2`              |

No lane was skipped. The verdicts are kept verbatim at veneer `tmp/units/browser-convention-reviewer-verdict.md` and `tmp/codex/browser-convention-audit-verdict.md`.

## Reproduction

Two workflows reproduced every `BROKEN` claim, every outside finding, and the reviewer's referral, each probe beside a control, in five scratch worktrees at `95eb674` (`veneer-wt-repro-a` to `-e`, Claude Opus 5.5 agents, every worktree clean at return). Records: veneer `tmp/units/repro-reviewer-findings.md` and `tmp/units/repro-analyst-findings.md`.

| Finding | Outcome | Reading |
| ------- | ------- | ------- |
| 4, 14 | wider | a show listener that destroys the scope leaves the second target of a two-target collapse constructed, unowned, unregistered, and completing its show; a consumer-retained context reaches the same orphan with no reentrancy. Bootstrap's handler throws and never touches the second target. |
| R1 | confirmed | a boot that throws `REGISTRY_CONFLICT` leaves the scope registered, listening, and half-booted; a later `createEngine(root)` returns it |
| O1 | confirmed | an opener destroyed from a sibling's `hide.bs.collapse` listener keeps `collapsing`, a height, and `aria-expanded="true"` permanently |
| O2 | bounded | a modal destroyed from its `hidePrevented.bs.modal` listener writes `modal-static` and `overflow: hidden` after destroy; both revert within the bounce, so the defect is a window of post-destroy writes |
| 9 | confirmed | an anchor inside a `div` collapse toggle navigates under the engine and is prevented by Bootstrap; an `AREA` collapse toggle is prevented by the engine and navigates under Bootstrap |
| 10, 12 | confirmed | `const context: ComponentContext<ComponentInterface> = registry.context(createButtonPlugin())` compiles; its `own(alert)` stores an `Alert` under `button`, and `createButton(host)` then throws `REGISTRY_CONFLICT`; `own` and `release` as readonly function properties fail the widening with TS2322 and break only 18 sites in `tests/src/browser/Tip.test.ts` |
| 11 | bounded | the bundle property holds: a `createModal` consumer keeps only `Modal` among the families, no `Engine`, and no document listener, from the barrel, `dist`, or `factories.ts`; only the proof is weak, because a `Modal` that imports `Dropdown` keeps it green |
| 15 | bounded | the `tip-boot` reading is a tautology; a class-selector target matching two modals, offcanvases, or carousels shows two where Bootstrap shows one, and no proof catches dropping `.slice(0, 1)`; a `.btn.disabled` toggle case is missing, so `disabled: false` on the button route passes 617 of 617. Evaporated: deleting `boot` from either tip plugin fails 4 and 7 tests, and deleting `prevent` from the button or carousel route fails 3 and 6, because the transcript records `defaultPrevented` |
| 16 | confirmed | a panel scope composed with the button plugin alone leaves an open menu inside it shown after an outside click and its modal toggle inert; the guide, the `EngineInterface` remarks, and the `name` docs state otherwise |
| 17 | wider | the plugin rule misses `export const` aliases, default exports, classes, destructuring, and `export import`; every one except `export import NAME = …` is refused by another enabled rule; `createModal_Plugin` and a misnamed arity pass the pattern; the shared `reportName` added reports for specifiers and star re-exports in `parsers.ts` and `factories.ts` and removed none |
| 18 | wider | `disabled: false` sits on six routes (alert, modal, and toast dismiss, offcanvas toggle and dismiss, tab toggle), matching Bootstrap's `isDisabled` sites; the leaf's name reads inverted, and no value switches a route off; `resolveTipOptions` names its profile `plugin` |
| 20 | wider | a delegating parent's offset equal to the profile default (`[0,6]`, `[0,8]`, the string `0,6`, or an options array) is dropped, so the child's `[0,30]` wins where Bootstrap forwards the parent's |
| 22 | wider | two paths leave a hidden panel's id in `aria-describedby`: a hide that finishes while a delayed re-show is pending (permanent when that show is refused), and a re-show whose renderer returns nothing or throws (Bootstrap also leaves a stale id there, so that path breaks veneer's own shared-host contract) |
| 25 | wider | after `write`, the show gate reads written content where Bootstrap's reads only the configured title or `data-bs-original-title`, for both profiles; a partial `write` keeps the earlier body where `setContent` replaces every slot |
| 23, F1 | wider | 100 rows read `<absent> \| <absent>`; the comparator consumes such a row in either direction, so a planted reversal passes |
| 27 | confirmed | all 270 coexistence rows share one reason; 126 of them are class, `aria-describedby`, and added-node writes whose index moved only because Popper adds placement writes |
| F2 | confirmed | `tests/src/browser/Tip.test.ts` restates `readTipTranscript` twice and a placement-dropping variant twice |
| F3 | bounded | `buildPlugin` reads `gate`, `prevent`, `disabled`, `hosts`, `execute`, `create`, `boot.execute`, and `clear.execute` from the caller's input at dispatch; a late `prevent` reaches only triggers matching the copied selector |

## Rulings per claim

1. `CONFIRMED` by both lanes.
2. `CONFIRMED` by both lanes. The proof asserts the plugin and its route array frozen; G3 adds the boot, clear, and per-route assertions with the capture fix.
3. `CONFIRMED` by both lanes.
4. `BROKEN` (analyst; reproduced wider). Carried as G2.
5. `CONFIRMED` by both lanes.
6. `CONFIRMED` by both lanes.
7. `CONFIRMED`, narrowed as the claims file states; the cross-family phase defect is G1.
8. `CONFIRMED` by both lanes.
9. `BROKEN`. The lanes answered different questions: the analyst confirmed the binder's step order, the reviewer attacked the collapse prevent condition. Both stand. Carried as G4.
10. `BROKEN` (both; reproduced). Carried as G3.
11. `CONFIRMED` on the analyst's bundle probe and the reproduction; the proof's weakness is carried as G11.
12. `BROKEN` (analyst) through claim 10's widening: a profile guard protects lookup, not storage. Carried as G3.
13. `CONFIRMED`; the `tip-boot` proof is G11.
14. `BROKEN` (analyst) with the reviewer's referral R1. Carried as G2.
15. `BROKEN`, bounded by the reproduction to the `tip-boot` tautology, the class-selector targets, and the `.btn.disabled` toggle; the analyst's open question, whether every changed row reaches a comparison, stands because no table-wide consumption assertion exists. Carried as G11.
16. `BROKEN` (both). Carried as G12, with the analyst's half (the shared-host and delegation sentences) closed by G7 and G8.
17. `BROKEN`: the claim overstated the rule, and the rule admits one shipping form. Carried as G13.
18. `BROKEN` (both), on concrete correctness (G2, G3, G7, G8) and on the route leaf's name. Carried as G5 with the others.
19. `CONFIRMED` by both lanes.
20. `BROKEN` (analyst; reproduced wider). Carried as G8.
21. `CONFIRMED` by both lanes.
22. `BROKEN` (both, on two paths; reproduced). Carried as G7.
23. `BROKEN` through F1; the census half is G11's consumption assertion.
24. `CONFIRMED` with the blind spot both lanes named: the coexistence comparison drops style readings, so a panel anchored to the other host's anchor name passes. Carried as G11.
25. `BROKEN`. The lanes answered different questions: the analyst confirmed the gate without `write`, the reviewer attacked `write` then `show`. Ruling 3's oracle-wins clause and `write`'s own doc ("the slots the tip shows from this call on") rule for Bootstrap's semantics. Carried as G6.
26. `CONFIRMED` by both lanes.
27. `BROKEN` (both). Carried as G11, by the reviewer's normalization: it removes the 270 rows at their source, including the 126 index-shift rows, while the single-panel `tooltip:show` and `popover:show` rows keep pinning the order and the element-state reading keeps comparing the final side. The analyst's scenario-set grouping keeps every row's information but adds a table form, so it is not carried.

## Carried

Each item names its bound; the fix brief carries both.

- **G1 Dispatch topology.** Each scope binds its clear events as a bubble-phase document listener that runs every plugin's clear after the routes; routes stay in the capture phase. Every route and every clear runs through `attempt`, a failure is reported through the realm's `reportError`, and the walk continues. Ruling 2 and 3's order sentences, the `types.ts` docs, the guide, and the order test change together. Oracle cases: a second dropdown toggle with a menu open, a tab and a modal toggle inside an open menu, `stopPropagation` inside a menu, Escape in an open and in a closed dropdown inside a modal. Bound: Escape precedence depends on capture routes, so no route moves to the bubble phase; list order and closest-match resolution stay.
- **G2 Scope lifetime.** A destroyed scope refuses construction: the binder stops its host loop when the scope is destroyed, and the engine's context refuses `own` after destroy, so a retained context cannot yield a live orphan. A boot that throws destroys the scope and rethrows the original error. `Collapse.show` rechecks `destroyed` after its sibling loop, and `Modal`'s static bounce rechecks it after the `hidePrevented` emission. Bound: `Registry.own` for a plain context stays open, because factory construction outlives scopes; a boot error is never swallowed; registration stays before boot, so a reentrant `createEngine` cannot build a second scope; a destroyed sibling never stops the opener.
- **G3 Registry soundness.** `ComponentContext.own` and `release` become readonly function properties, and the `Tip.test.ts` helper that widens a profile becomes generic over it. `buildPlugin` captures every leaf at build time, keeping each function's identity, and the proof asserts the boot, clear, and per-route freezing. Whether `own` also refuses a component its plugin's guard rejects is a design question (§ Design). Bound: `component` stays covariant.
- **G4 Collapse prevent.** The collapse data API prevents the default when the event target or the trigger is an `A`, as `collapse.js:282` does, and carries no `AREA` rule. Oracle cases for an anchor inside a `div` toggle and an `AREA` toggle. Bound: `closest('a')` would prevent a `span` in an anchor in a `div` that Bootstrap lets navigate; the binder's `AREA` rule stays for modal, offcanvas, tab, and dismiss. The shape is a design question.
- **G5 Names.** The route leaf `disabled` takes a one-word name whose `true` selects skipping a disabled trigger, default `false`, set on the six routes; `resolveTipOptions` names its parameter `profile`; the `name` docs read "Names the registry key". Bound: the default keeps serving disabled triggers. The leaf's name is a design question.
- **G6 Tip content.** The show gate reads only the configured slots (`tooltip.js:292`). Rendering follows Bootstrap's template factory: a render's map is the last written map, or the configured slots when nothing was written (`tooltip.js:297`); the tip's first render takes that map whole, so an omitted slot renders empty (`tooltip.js:338-344`), and each later render merges its map into the map last rendered (`tooltip.js:336`, `util/template-factory.js:80`). Oracle cases: `write` before `show` on an untitled host, a partial `write` before the first render, and a partial `write` after it, for both profiles. Bound: rendering keeps reading the written content. Amended 2026-10-02: the first ruling read "`write` replaces the whole slot map", which held only before the first render; the `browser-tipfix` writer's oracle case after a render read Bootstrap merging.
- **G7 Tip description token.** A hide finish removes its panel's id even when a pending re-show keeps the panel; a re-show whose renderer returns nothing or throws removes the previous id. Cases for both profiles. Bound: the retained panel stays in the DOM, and author tokens and the other profile's id stay.
- **G8 Delegation offset.** A delegator forwards `position.offset` whenever its markup or options supplied one, whatever the value. Bound: with no supplied offset, the child's markup wins.
- **G9 Slot owner models.** Ruling 16's teardown model: one counted-hold engine shared with `Lock`, operations split by slot shape; Collapse and Tab hold per attribute, class token, and style property, the accordion's sibling triggers included; `Tab`'s dropdown coupling holds nothing on the dropdown's elements; `anchor-name` leaves `PLACEMENT_PROPERTIES.reference` after a Chromium probe of a comma-separated list; `Registry.settle`'s double title write on one tip is fixed or recorded. Proofs: an accordion's middle item destroyed while another is open, two collapses on one trigger and sibling tabs destroyed in creation order, a dropdown toggle carrying a factory tooltip. The engine's shape is a design question.
- **G10 Focus trap.** Ruling 16's `trap-owner` departure row, with the oracle case of a modal opened from an offcanvas, closed in each order.
- **G11 Proofs and the departure table.** A token distinct from `<absent>` for a reading recorded with no value, the key at `guides/veneer.md` updated, and the affected rows regenerated; the coexistence normalization in `readTipTranscript` (per panel path, the first `data-popper-placement` write moved ahead of the panel's `show` class write and an immediately repeated identical write dropped), the 270 rows deleted, and a planted wrong final side shown red; one `readTipTranscript` with a boolean for dropping placement writes in place of the four inline copies; a table-wide assertion that every departure row is consumed by a comparison; the `tip-boot` case booting `createEngine` with the tip plugins and reading the host on both sides; class-selector target cases for modal, offcanvas, and carousel; a `.btn.disabled` toggle case; the distribution case importing the barrel and asserting every other family class absent in both emitted forms (`class X` and `X = class`) and `Engine` absent; each coexistence panel's anchor checked against its own host; a plugin-list test checking each built-in route and boot against Bootstrap's `getOrCreateInstance` sites; the touch-shim departure row under CDP touch emulation. Bound: `#attribute` keeps returning `undefined` for `null`, because every first-write reading depends on it; placement writes are not dropped wholesale, because the single-panel rows pin the order.
- **G12 Guide and comments.** A nested scope's list is its subtree's whole data API; the clearing and boot sentences are qualified by the list; the shared-mechanics paragraph names each resource's owner model; the delegation paragraph states which children a delegator configures; creator ownership's consequence for a body-level modal; the factory tips inside a container that teardown hides; an inline `anchor-name` hiding a stylesheet `anchor-name` on the same element; one browser entry per document, with `Placement` names made unique against the document; the drifted citations at `src/browser/plugins.ts:210` and `:247`.
- **G13 Scaffold's plugin kind.** The plugin pattern refuses `_` (`/^create[A-Z][A-Za-z0-9]*Plugins?$/u`); an exported `TSImportEqualsDeclaration` in a kind file is reported; § Plugins states that a name cannot carry arity. Bound: the binding reader stays limited to functions, because the data rule already refuses value bindings in kind files and widening it double-reports them in `parsers.ts` and `factories.ts`. It ships in the next scaffold release.

## Design

Five shapes went to one blind design pass before code: the counted-hold engine's contract (G9), the dead-scope refusal and its error (G2), whether `own` checks the plugin guard (G3), the collapse prevent rule's shape (G4), and the route leaf's name (G5). Ruling 17 of `browser-convention-verdict.md` rules each.

## Dropped on the record

- Claim 15(b): deleting `prevent` from the button or carousel route fails 3 and 6 tests; the transcript records `defaultPrevented`. Evaporated.
- Claim 15(a)'s wider form: deleting `boot` from either tip plugin fails 4 and 7 tests. Evaporated; the tautology of the `tip-boot` reading stands.
- Claim 17's analyst inputs as shipping hazards: the alias, the class, and the destructure are each refused by `no-misplaced-data`, `no-misplaced-class`, or `no-hidden-declaration`.
- The reviewer's distribution assertion as written: a bare `class Dropdown` substring passes vacuously against Vite's `var Dropdown = class` form; G11 carries the corrected assertion.
- Claim 3's proof note: the factory and a consumer reach the same constructor with the same context, so a transcript comparison would test nothing the reading has not shown.
