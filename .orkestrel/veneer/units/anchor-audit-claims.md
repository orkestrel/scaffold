# E-ID-ANCHOR audit — claims

Subject: E-ID-ANCHOR in `/home/user/veneer-anchor` (branch `unit/anchor`, uncommitted over Veneer `0a0a252`), briefed by
`e-id-anchor-brief.md`. Written by `opus` on Opus 5.5 and reported in `e-id-anchor-report.md`. Evidence: `anchor.diff`
(`git diff 0a0a252`), `anchor-status.txt`, and `anchor-instruments/` (the attribution probe, the gate driver, the
mutation hashes, and every log). All paths sit under `/home/user/scaffold/.orkestrel/veneer/units/`. A mutation counts as
a kill only when the failing case's message names an assertion failure. Rule every claim.

1. **The rendered value.** A dropdown menu, tooltip, and popover each promoted to the top layer and open through the
   popover API computes `position-visibility: anchors-visible` on Chromium 141, computes the browser's initial value
   while closed, and yields to a consumer class written outside every layer without `!important`
   (`anchor-red.log.txt`, `anchor-green.log.txt`).
2. **The placement.** One rule per partial, each written through the `anchor-visibility` mixin as
   `:where(.<class>):popover-open`, is the form D46 and the ledger's per-component attribution require: the attribution
   probe (`anchor-attribution-probe.log.txt`) shows a single combined rule attributes to `dropdown` alone, and the
   mixin, its comment, and its name satisfy `.claude/rules/styles.md` and `.claude/rules/names.md`.
3. **The ledger rows.** Each component's § Additions `selector` and `declaration` rows equal what
   `npm run test:conformance` reads, with a `—` Veneer cell on each selector row and `anchors-visible` on each
   declaration row, and deleting the declaration reddens the gate with an assertion naming each stale row
   (`anchor-mutation-conformance.log.txt`).
4. **The enumeration cases.** Each enumeration case admits its new selector by name, its title and comment follow the
   seam ruling in `ebc-audit-3-verdict.md`, and the dropdown case's title states what it asserts.
5. **The mixins case.** Narrowing the button-reboot population to rules whose whole selector is one `:where()` group
   keeps every reboot rule the case read before and admits no other, and the new `position-visibility` case reads every
   such declaration in the built cascade.
6. **The proofs.** Each new case failed at the base and passes after, and deleting the declaration fails each with an
   assertion (`anchor-mutation-styles.log.txt`); name for each case the mutation that would make it fail and whether its
   assertions distinguish it.
7. **The prose.** The § Dropdown, § Tooltip, and § Popover classes paragraphs and the Reason cells state the rule and
   its reason truly and read once.
8. **Scope and gates.** The status names only owned files (the mixin and its test are owned because the unit took a
   mixin under D46), and the format, lint, check, styles, conformance, guides, and policy logs exit 0.
