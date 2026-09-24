# Audit claims — UTIL-PAINT (`up`), round 1

Subject: `up.diff` and `up-status.txt` (the worktree `/home/user/veneer-up` against `2a3f223`, captured
by the Orchestrator read-only at retention: each untracked owned file as
`git diff --no-index /dev/null <path>`), the shared-file patch `up-shared.patch` (one unified diff
against `2a3f223`; the per-file split `up-shared--*.patch` is under `up-instruments/`), the proposed
patch `up-unscoped-profiles.patch` for `tests/service/tailwind/profiles.test.ts`, the unit's report
`b-utilities-up-report.md`, and its retained instruments and logs under `up-instruments/` (the mutation
instruments and logs, the negative controls, the cascade count, the Tailwind longhand and profile-layer
readings, and every copy gate log), against the effective brief `b-utilities-up-brief.md`, the family
record `b-utilities-family.md`, the design verdict
`/home/user/scaffold/.orkestrel/veneer/b-utilities-design-verdict.md`, the wave-3 terrain
`b-utilities-w3-terrain-report.md`, the first terrain `b-utilities-terrain-report.md`, and the
mid-campaign notes `w2-w3-note-1.md`, `w2-w3-note-2.md`, and `w2-w3-note-3.md`. The unit was written by
`opus` on Opus 5.5. Each claim is falsifiable; a lane rules CONFIRMED or BROKEN with `file:line`
evidence, and before confirming a claim about a proof names the mutation that would make the proof fail
and whether its assertions distinguish that mutation from the passing case.

Orchestrator rulings the lanes take as given, and rule wrong where the evidence says so: the brief's
refreshed rulings (the base `2a3f223`, the family's barrel and section orders); the unit's D1 stop is
the brief's scope gap, so `tests/service/tailwind/profiles.test.ts` is granted retroactively as Shared
(note 3) and `up-unscoped-profiles.patch` is audited here as a shared patch; the `test:setup` and
baseline `test:conformance` timeouts the report records under load are the Orchestrator's reading;
`ROADMAP.md` is the Orchestrator's fold; the scratchpad files the report's D2 lists are recorded, not
ruled.

1. **Scope and delta.** `up-status.txt` lists only the brief's Owned paths; `up.diff` carries those
   files and no other; `up-shared.patch` touches only files the brief lists as Shared, equals the union
   of the per-file split, and applies with `git apply --check` to a fresh extract of `2a3f223`;
   `up-unscoped-profiles.patch` touches only `tests/service/tailwind/profiles.test.ts` and applies after
   it; neither patch adds a line to a vendored file, `src/browser/**`, `src/core/**`, `package.json`,
   `README.md`, `src/styles/_mixins.scss`, or a sibling unit's file.
2. **The cascade against the oracle.** The built cascade carries exactly the selectors the inventory
   records under the `bg`, `border`, and `rounded` keys, each in the utilities layer under no at-rule,
   with `!important` on every property declaration and on no custom property, in the release's map
   order apart from the rounded entries the report writes beside the border entries (a move the report
   says changes no resolution); the fills walk `tokens.$aliased` and emit no `-tertiary` class; the
   opacity locals are written through the `utility-variable` mixin at the empty infix alone; no value
   departs from the release textually, so no `#### bg`, `#### border`, `#### rounded`, or `### Additions`
   row is owed.
3. **The proofs distinguish their mutations.** Each mutation the report names has a retained entry in
   `up-mutations-styles.log.txt`, `up-mutations-tables-sections-ledger.log.txt`, or
   `up-negative-controls-service.log.txt` recording its site, command, exits, summary, and failing
   cases, and the named case's assertions distinguish it from the passing case: the emitted tertiary
   role, the literal fills, the opacity local before the fill or written important, the light tier
   literals, the literal gradient, the unguarded and responsive entries, the sides before `border`, the
   literal border width and radius, the rounded sides before `rounded`, the literal border role, the
   border opacity before the colour, the normal properties, the unlayered partial, the table, specimen,
   and caption drifts, and the `rounded-circle` ledger value. A lane names, per mutation, whether the
   assertion distinguishes it.
4. **The profiles proof (D1).** The two `profiles.test.ts` cases go red on the unit's shared names for
   the reason the report gives (`up-service-before-profiles-patch.log.txt`,
   `up-profile-layers.log.txt`); `up-unscoped-profiles.patch` makes them read what the profiles emit
   without weakening what each case asserts about the order line, the imported-part layers, and the
   Tailwind reset under the preflight profile; with it applied `test:service` reads green
   (`up-service-after-profiles-patch.log.txt`); a lane names the mutation to a profile that the patched
   cases still reject.
5. **Tailwind shared names.** The shared-name table is true against the installed compiler: the
   `bg-black`, `bg-white`, `bg-transparent`, `border`, `border-0`, `border-black`, `border-white`, and
   `rounded` names stay off the exclusion line because Veneer writes `!important` on every longhand
   Tailwind declares for them; `border-1` to `border-5` go on the line because Tailwind also declares the
   style longhands; the line, its copies, and `markup.html` carry exactly that change; each negative
   control reads red.
6. **Sections, specimens, and registries.** The Background and Border regions extend `SpecimenSection`
   over their constants with the brief's specimen names in its order; no specimen writes an inline style
   or an unshipped class, and each caption names the swatch's classes; the section proofs' populations
   derive from the specimens or a setup table (note 1); the sections construct after
   `VisibilitySection` and before `NavbarSection` with matching `index.ts`, `Showcase.test.ts`, and
   `index.test.ts` rows; the `CASCADE_KEYS` rows read a property the rule sets on a box a computed style
   can read; the `listed` literal, the order case's entry paths, and the dash-proof component set agree
   with the barrel; the eight tables sit in `tests/setupStyles.ts`, are frozen and exported, and are
   bound to the inventory by derivation.
7. **The guide.** `guides/veneer.md` gains `### Background utilities` and `### Border utilities` after
   `### Visibility utilities`, the § Files and § Compatibility rows, the § Tests links, and the Tailwind
   paragraph's extension naming the paint names off the line and the widths on it; every sentence the
   patch adds is true of what ships, names the rule that applies each value (note 1), and follows every
   code token with a noun.
8. **Law and report.** The owned files and both patches add no `any`, no `as` beyond a const assertion,
   no `!`, no suppression, no mock, spy, or fake, and no nested function beyond a callback passed
   directly; no new helper duplicates an installed `@orkestrel/test` or `@orkestrel/contract` export;
   added comments, TSDoc, guide text, and the report follow the writing rule; the report records each
   gate's command with its result line; a lane lists every count the report states as a finding outside
   the claims for the record.
