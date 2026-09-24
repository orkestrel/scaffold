# Audit claims — UTIL-FLOW (`ufl`), round 1

Subject: `ufl.diff` (the worktree `/home/user/veneer-ufl` against `2a3f223`: the modified
`tests/app/browser/sections/LinkSection.test.ts` as `git diff`, and each untracked owned file as
`git diff --no-index /dev/null <path>`) and `ufl-status.txt`, the shared-file patch `ufl-shared.patch`
(one unified diff against `2a3f223`), the D46 patch `ufl-routeb.patch` (the `cover-block` mixin, its
fixture and case, and the card and stretched-link includes, applied over the shared patch), the unit's
report `b-utilities-ufl-report.md`, and its retained instruments and logs under `ufl-instruments/`,
against the effective brief `b-utilities-ufl-brief.md`, the family record `b-utilities-family.md`, the
design verdict `/home/user/scaffold/.orkestrel/veneer/b-utilities-design-verdict.md`, the wave-3
terrain `b-utilities-w3-terrain-report.md`, the first terrain `b-utilities-terrain-report.md`, the
mid-campaign note `w2-w3-note-1.md`, and D46 in `decisions-round-2.md`. The unit was written by `opus`
on Opus 5.5. Each claim is falsifiable; a lane rules CONFIRMED or BROKEN with `file:line` evidence, and
before confirming a claim about a proof names the mutation that would make the proof fail and whether
its assertions distinguish that mutation from the passing case.

Orchestrator rulings the lanes take as given, and rule wrong where the evidence says so: D46 (the
covering block is a technique shared as the `cover-block` mixin, the card partial granted to that
change alone); the brief's refreshed rulings (the base `2a3f223`, the sections after
`VisibilitySection` and before `NavbarSection`); the `test:setup` timeouts the report records under a
load average above 20 are the Orchestrator's reading, not the unit's criterion; `ROADMAP.md` is the
Orchestrator's fold.

1. **Scope and delta.** `ufl-status.txt` lists only the brief's Owned paths, the one modified path
   being `LinkSection.test.ts` for the added `Stretched link` name; `ufl.diff` carries those files and
   no other; `ufl-shared.patch` touches only files the brief lists as Shared and applies with
   `git apply --check` to a fresh extract of `2a3f223`; `ufl-routeb.patch` touches only
   `src/styles/_mixins.scss`, `src/styles/components/_card.scss`, the mixins fixture and test, and the
   owned `_stretched-link.scss`, and applies over the shared patch; neither patch adds a line to a
   vendored file, `src/browser/**`, `src/core/**`, `package.json`, `README.md`, or a sibling unit's file.
2. **The cascade against the oracle.** The built cascade carries exactly the selectors the inventory
   records under the `float`, `overflow`, `overflow-x`, `overflow-y`, `object-fit`, `clearfix`, and
   `stretched-link` keys, and no other rule on those classes; every utility declaration is written
   through the `utility` mixin with `!important`, and no custom property carries a priority; the
   clearfix and stretched-link helpers are normal rules in the components layer at the release's helper
   order, and the utilities sit in the utilities layer at the release's map order; every departure the
   comparison measures (the `-o-object-fit` rows among them) is a `#### <key>` row.
3. **The proofs distinguish their mutations.** Each mutation the report names (`clear-omitted`,
   `infix-omitted`, `inset-omitted`, `axis-swapped`, `fill-for-cover`, `priority-dropped`,
   `layer-moved`, and the Tailwind controls `line-written` and `important-dropped`) has a retained log
   under `ufl-instruments/` recording its site, command, exits, summary, and failing cases, and the
   named case's assertions distinguish it from the passing case. A lane names, per mutation, whether
   the assertion distinguishes it.
4. **D46 and the `cover-block` mixin.** The mixin writes `position: absolute` and zero on every edge;
   `.card-img-overlay` and `.stretched-link::after` each include it and resolve the same declarations
   the release records; the mixin's case in `tests/src/styles/mixins.test.ts` reads every declaration
   it writes; with `ufl-routeb.patch` applied, `findDuplication` reports nothing, and the card and
   stretched-link proofs stay green (`ufl-routeb-*.log.txt`); D46 holds under `.claude/rules/styles.md`
   (a lane that reads the shared block as a recorded measure rules D46 wrong with its reason).
5. **Tailwind shared names.** The report's shared-name table is true against the installed compiler:
   `float-start`, `float-end`, `float-none`, and the `overflow-*`, `overflow-x-*`, and `overflow-y-*`
   classes are shared, stay off the exclusion line, and resolve to Veneer's declaration because Veneer
   writes `!important` on every longhand Tailwind declares; `object-fit-*`, `clearfix`, and
   `stretched-link` are not shared; the exclusion line and its copies are unchanged; the negative
   controls read red.
6. **Sections, specimens, and registries.** The Float, Overflow, and Object fit regions extend
   `SpecimenSection` over their constants, the Links region gains `Stretched link`, no specimen writes
   an inline style or an unshipped class, every case population derives from the specimens or a setup
   table (note 1), the sections construct after `VisibilitySection` and before `NavbarSection` with
   matching `index.ts`, `Showcase.test.ts`, and `index.test.ts` rows, the capture rows read a property
   the rule sets on a box a computed style can read, and the conformance order case's helper and entry
   paths agree with the barrel.
7. **The guide.** `guides/veneer.md` gains the Float, Overflow, and Object fit utility sections, the
   stretched link under the helper classes, the § Files and § Compatibility rows, the `#### object-fit`
   table equal to the rows the gate measured, the Tailwind sentence, and the § Showcase and § Tests
   text; every sentence the patch adds is true of what ships, states only what each rule applies
   (note 1), and follows every code token with a noun.
8. **Law and report.** The owned files and both patches add no `any`, no `as` beyond a const
   assertion, no `!`, no suppression, no mock, spy, or fake, and no nested function beyond a callback
   passed directly; every case table sits in a setup file, is frozen, and is bound by derivation (note
   1); no new helper duplicates an installed `@orkestrel/test` or `@orkestrel/contract` export; added
   comments, TSDoc, guide text, and the report follow the writing rule; the report records each gate's
   command with its result line; a lane lists every count the report states as a finding outside the
   claims for the record.
