# Audit claims — UTIL-FONT (`uf`), round 1

Subject: `uf.diff` and `uf-status.txt` (the worktree `/home/user/veneer-uf` against `2a3f223`, captured
by the Orchestrator read-only at retention: tracked changes as `git diff 2a3f223`, each untracked
owned file as `git diff --no-index /dev/null <path>`), the shared-file patch `uf-shared.patch` (one
unified diff against `2a3f223`; the per-file patches under `uf-instruments/` split it), the unit's
report `b-utilities-uf-report.md`, and its retained instruments and logs under `uf-instruments/`
(`uf-mutations.sh`, `uf-mutations.log.txt`, `uf-gates.log.txt`, `uf-tailwind-probe.log.txt`), against
the effective brief `b-utilities-uf-brief.md`, the family record `b-utilities-family.md`, the design
verdict `/home/user/scaffold/.orkestrel/veneer/b-utilities-design-verdict.md`, the wave-3 terrain
`b-utilities-w3-terrain-report.md`, the first terrain `b-utilities-terrain-report.md`, and the
mid-campaign notes `w2-w3-note-1.md` and `w2-w3-note-2.md`. The unit was written by `opus` on Opus
5.5. Each claim is falsifiable; a lane rules CONFIRMED or BROKEN with `file:line` evidence, and before
confirming a claim about a proof names the mutation that would make the proof fail and whether its
assertions distinguish that mutation from the passing case.

Orchestrator rulings the lanes take as given, and rule wrong where the evidence says so: the brief's
refreshed rulings (the base `2a3f223`, the family's barrel and section orders); the `test:setup`
timeouts the report records under load are the Orchestrator's reading, not the unit's criterion;
`ROADMAP.md` is the Orchestrator's fold; the scratchpad items the report says the unit wrote before
note 2 arrived and then removed by their own paths are recorded, not ruled.

1. **Scope and delta.** `uf-status.txt` lists only the brief's Owned paths (the modified
   `TypeSection.ts` and `TypeSection.test.ts`, the added `_font.scss` and `font.test.ts`); `uf.diff`
   carries those files and no other; `uf-shared.patch` touches only files the brief lists as Shared,
   equals the union of the per-file patches, and applies with `git apply --check` to a fresh extract of
   `2a3f223`; it adds no line to a vendored file, `src/browser/**`, `src/core/**`, `package.json`,
   `README.md`, a Tailwind fixture, or a sibling unit's file.
2. **The cascade against the oracle.** The built cascade carries exactly the unconditioned selectors
   the inventory records under the `font`, `fs`, `fst`, `fw`, and `lh` keys, each in the utilities
   layer through the `utility` mixin with `!important` on its one declaration and no custom property
   carrying a priority, in the release's map order; `.fs-1` to `.fs-6` read the `--vn-size-{9-N}`
   token their heading class reads, the fluid `calc()` values and the four `(min-width: 1200px)` caps
   are dropped, `.lh-base` reads the `--vn-line-body` token, and `.font-monospace` reads the
   `--bs-font-monospace` alias; every departure the comparison measures is a `#### fs` or `#### lh`
   row with the comparison's own category, and `font`, `fst`, and `fw` carry none.
3. **The proofs distinguish their mutations.** Each mutation the coverage matrix, the failing-first
   table, and the precedence list name has a retained section in `uf-mutations.log.txt` recording its
   site, command, exits, summary, and failing cases, and the named case's assertions distinguish it
   from the passing case: the monospace token and literal, the fluid and literal sizes, the release
   cap block, the italic rename, the relative weights written absolute, the line-height factor and
   literal, the infixed classes, the mode rule and the density factor, the reorder, the dropped
   `!important`, the elements-layer and unlayered moves, and the ledger and binding mutations. A lane
   names, per mutation, whether the assertion distinguishes it, and rules on the report's statement
   that dropping `!important` alone leaves the heading-override case green.
4. **Font sizes on the heading scale.** Dropping the fluid formula and its cap is the family record's
   ruling for the size classes and holds under `.claude/rules/styles.md`; the viewport case at 390 and
   1280 proves each `.fs-N` class resolves to the size its heading class resolves; the reuse of
   `TYPE_HEADING_CASES` and `TYPE_HEADING_TOKEN_CASES` binds the size classes to the heading scale
   rather than restating it.
5. **Tailwind shared names.** The report's shared-name table is true against the installed compiler:
   none of the unit's names generates a Tailwind rule, so none is shared, the exclusion line, its
   copies, and `markup.html` stay unchanged, and the `tailwind-line` negative control reads red.
6. **Sections, specimens, and registries.** The Type region gains the `Font sizes`, `Font weights`,
   `Font styles`, `Line heights`, and `Monospace` specimens, each using only classes shipped at
   `2a3f223` plus the unit's own and no inline style; the section proof covers their names, markup,
   and order without an inline case population (note 1); the `CASCADE_KEYS` rows read a property the
   rule sets on a box a computed style can read; the conformance `listed` literal, the order case, and
   the dash-proof component set agree with the barrel; `FONT_ENTRY_CASES` and the other tables sit in
   `tests/setupStyles.ts`, are frozen and exported, and are bound to the inventory by derivation.
7. **The guide.** `guides/veneer.md` gains `### Font utilities` after `### Visibility utilities`, the
   § Files and § Compatibility rows, the `#### fs` and `#### lh` tables equal to the rows the gate
   measured, and the § Showcase sentence; every sentence the patch adds is true of what ships, names
   the rule that applies each value (note 1), and follows every code token with a noun; the section
   heading's name holds beside UTIL-TEXT's `### Text utilities`.
8. **Law and report.** The owned files and the patch add no `any`, no `as` beyond a const assertion,
   no `!`, no suppression, no mock, spy, or fake, and no nested function beyond a callback passed
   directly; no new helper duplicates an installed `@orkestrel/test` or `@orkestrel/contract` export;
   added comments, TSDoc, guide text, and the report follow the writing rule; the report records each
   gate's command with its result line; a lane lists every count the report states as a finding
   outside the claims for the record.
