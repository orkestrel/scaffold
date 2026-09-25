# E-ID-BUTTON-CASCADE audit — claims

Subject: E-ID-BUTTON-CASCADE rounds 1 and 2 in `/home/user/veneer-ebc` (branch `unit/ebc`, uncommitted over Veneer
`e07b3a6`). The design verdict `/home/user/scaffold/.orkestrel/veneer/e-id-button-design-verdict.md` binds. Round 1 was
briefed by `e-id-button-cascade-brief.md`, written by `opus` on Opus 5.5, and reported in
`e-id-button-cascade-report.md`. Round 2 was briefed by `ebc-brief-2.md`, written by `builder` on Sonnet, and applies
`ebc-instruments/ebc-unowned-enumerations.patch` to `tests/src/styles/components/accordion.test.ts` and
`tests/src/styles/components/carousel.test.ts`. Evidence: `ebc-2.diff` (the whole change over `e07b3a6`),
`ebc-2-status.txt`, round 1's `ebc.diff`, and the logs and instruments under `ebc-instruments/` (round 2's under
`ebc-instruments/r2/`). All sit under `/home/user/scaffold/.orkestrel/veneer/units/`. The compiled cascade is
`/home/user/veneer-ebc/dist/src/styles/index.css`; the release's is
`/home/user/veneer-ebc/node_modules/bootstrap/dist/css/bootstrap.css`. A unit report's prose is not a claim subject. A
mutation counts as a kill only when the failing case's message names an assertion failure (`AssertionError`, or the
expect library's own assertion message); read every other failure as no kill. Rule every claim.

1. **Tag rule.** In `src/styles/elements/_button.scss`, the surface rule and every state rule select `button` with
   pseudo-classes only, reading no class and no attribute; the surface declares no `cursor` and nothing `!important`;
   the reboot's enabled-only cursor rule is the only `cursor` declaration on `button`; all of it sits in the
   `elements` layer.
2. **Reset mixin.** The `button-reboot` mixin in `src/styles/_mixins.scss` writes `inherit` for `font-family`,
   `font-size`, and `line-height`, `0` for `border-radius`, and `revert` for every other property; its property set
   equals the set of properties the surface writes at rest and in every state, in the compiled cascade.
3. **Includes.** `_close.scss`, `_navbar.scss`, `_accordion.scss`, `_dropdown.scss`, `_nav.scss`, `_list-group.scss`,
   `_pagination.scss`, and `_carousel.scss` each include `button-reboot` in the `components` layer on exactly the
   selectors the design verdict names, each wrapped in `:where()`; `.btn` includes none, and no other partial includes
   it.
4. **Revert readings.** In `ebc-instruments/ebc-probe-revert.log.txt`, under reduced motion, each class's button form
   reads the release's `font-weight`, keyboard `outline-style`, `transition`, disabled `pointer-events`, and `color`,
   except where the class itself writes the value; the `.dropdown-item` `font-weight` difference comes from the
   class's own declaration, not from the reset.
5. **Tag proofs.** The cases titled `paints an empty-class, a utility-class, a consumer-class, and a target-attribute
   button with the surface a classless button wears, at rest and in every state`, `lets a consumer class win the
   padding and the corner, unlayered and inside the components layer, and keeps every other surface value`, and
   `shows the pointer over an enabled button and the default cursor over a disabled one` in `button.test.ts`, and the
   mixin case in `mixins.test.ts` titled `writes the button reboot back on every longhand the button surface writes, on
   each class the release builds on a button, and the surface writes none of them important`, read red before the
   change and green after; the `class`, `target`, `important`, `spacing`, and `nav` mutations each kill the cases the
   report's mutation table names, and each restore is byte-identical.
6. **`.btn` forms.** The case titled `resolves every .btn form on a button as the same form resolves on an anchor,
   apart from the button appearance` compares every `.btn` form the brief names, on a `button` against an anchor, and
   the `spacing` mutation kills it; a surface property that `.btn` does not write would redden it.
7. **Class form.** The case titled `writes the button reboot back on a plain nav link's button form, which takes the
   release's corner, type, and shadow` reads the release's values, and the `nav` mutation kills it.
8. **Enumerations.** Round 2 adds to the expected selector lists in `accordion.test.ts` and `carousel.test.ts` exactly
   the `:where()` selectors the compiled `components` layer carries on those classes, and nothing else; the
   `ACCORDION_SELECTORS` and `CAROUSEL_SELECTORS` constants are unchanged.
9. **Tailwind pairing.** `tests/fixtures/tailwind/markup.html` and `tests/service/tailwind/consumer.test.ts` prove that
   a button carrying a utility alone keeps the surface and takes the utility's padding; the `class` mutation kills the
   case.
10. **Term and guide.** No "bare button" wording, and no sentence stating that a class removes the button surface,
    remains under `src/`, `tests/`, `app/`, or `guides/`; the guide states the tag rule and the per-class reset as
    shipped; its § Outside the ledger sentence on the button reboot rules is true of the ledger's selector reader.
11. **Scope and law.** Every changed path is owned or shared in round 1's brief, or granted by round 2's; the diff
    adds no `any`, `as`, non-null assertion, suppression, nested function declaration, or hidden helper; every added
    case title states what the case proves.
