# UTIL-SPACER (`us`) audit round 2: subjective lane verdict

**Lane:** subjective. `reviewer` on Opus 5.5, native, clean context, read-only. The work under audit was written by `opus` on Opus 5.5, which is this lane's engine, so I attacked it harder. No command was run. Every ruling below comes from the retained evidence and from reading source. Where a statement is my own derivation rather than an executed run, it is labelled as one.

**Result:** the round fails on claims 4 and 7 and on three findings outside the claims. The most serious is SC1. The mixin-contract paragraph the patch adds to § Styles is false against the tree it lands in.

## Numbered verdicts

1. **CONFIRMED.**
   - `us-2-status.txt:1–10` and the `git status` re-read in `us-2-measurements.txt:22–32` list exactly the owned set. `us-2.diff` has file headers for those files and no others.
   - `tests/setup.css` and the fixture CSS are absent from both status readings, so they are unchanged on disk.
   - The `+++` headers of `us-shared-2.patch` (measurements 13–20) name exactly the seven listed files.
   - Adjacent case that looks like a breach and was accepted: `b-utilities-family.md` ruling 12 makes `tests/setupServer.test.ts` off-limits for every unit. `us-brief-3.md:37` grants it as shared instead, and round 1 accepted it as deviation 2 (`us-audit-verdict.md:7`). Patch lines 162–177 add only two list members.

2. **CONFIRMED.**
   - **Signatures:** `_mixins.scss:354` and `:405` match the claim, with `$state` last and defaulting to `()`.
   - **Emission:** us-2.diff 61–74 and 92–100 build a selector list of the base class followed by `.NAME-PSEUDO:PSEUDO`, and emit one rule per selector with one shared body. The body is `!important` properties under `utility` and a plain `--bs-*` declaration under `utility-variable`.
   - **Fixture:** entries at diff 539–547 and 565–572. Their expected text is asserted at diff 637–638.
   - **Mutations** (my derivation from the assertions, not a run):
     - Selector without its pseudo-class (`.vn-utility-lift-1-hover`): the exact sorted selector list at diff 597–627 fails. Distinguished.
     - State emitted on the base class (`.vn-utility-lift-1:hover`): the same list fails. Distinguished.
     - State rule written ahead of its base rule: the sorted list still passes, but the adjacency check at diff 639–641 fails. For `lift-1` the next rule is an `sm` rule; for `tint-1` the index runs past the list. Distinguished.
     - `$state` ignored: the list loses both hover selectors. Distinguished.
     - Each mutation applies to both mixins, because `tint` exercises `utility-variable`.
   - **Records:** `b-utilities-us-report-2.md:97–101` records `2 failed | 19 passed` then `21 passed`. Lines 122–129 record round 1's mutations as red. The red runs themselves rest on the writer.

3. **CONFIRMED.**
   - **Logic:** diff 49–52 slices the hyphen off the infix when `$class` is empty. This reproduces the release's composition at `bootstrap/scss/mixins/_utilities.scss:29–32` for keyed and `null`-keyed entries alike.
   - **Fixture and expectations:** fixture diff 517–525. Expectations at diff 601–609 cover `.vn-utility-raised` and `.{sm…xxl}-vn-utility-raised`.
   - **Mutation** (derived): keeping the hyphen yields `.-md-vn-utility-raised`. The exact sorted list fails, and the gating lookup of `.md-vn-utility-raised` (diff 660, 667) finds no rule and reads `[]` against `[width]`. Distinguished in both cases, as report line 121 records.
   - **Header comment:** `_mixins.scss:342–344` states the classless naming as emitted.
   - A separate wording defect in the same header, on multiple states, is SC3.

4. **UNRESOLVED.**
   - The digest equality, the `baseline.sh round1` rebuild, and the `compare.mjs` output lines exist only in the writer's report (lines 77–91).
   - Round 1's digest is recorded nowhere else. The `tmp/probe/round1-src` overlay that `baseline.sh` rebuilds from was copied by the writer.
   - My derivation supports the claim without settling it. For a non-empty `$class` and an empty `$state`, the round-2 `utility` emits the same single `.{class}{infix}-{key}` rule that round 1's did (us.diff 37–49). `_gap.scss` is textually unchanged from round 1. The added `@use` rules emit no CSS.
   - **What settles it:** a host run of `npm run build:src` and `sha256sum dist/src/styles/index.css`, plus `bash tmp/units/us-instruments/baseline.sh round1 tmp/probe/round1-src` and `node tmp/units/us-instruments/compare.mjs` in `/home/user/veneer-us`, with the printed lines retained.

5. **CONFIRMED.**
   - **Shape:** patch lines 16–29 put both specimens in the gutter siblings' form (`.container-fluid > .row.row-cols-auto.g-0…> div`). Items are plain, with no `.card` and no inline style. The item labels ("Resize for gap steps", "Column gap", "Row gap on wrap") follow the voice of the sibling at `constants.ts:573`.
   - **The deviation is bounded:** it changes only the wrap mechanism (`row-cols-auto` with a `col-12` last item) and keeps the ruled gutter form.
   - **Design fit of the deviation:** it is the right call. Under `row-cols-2` each item is 50% wide, so any non-zero `column-gap` pushes every item onto its own row, and `column-gap-xl-2` would show nothing, which R12 bars. This derivation from the grid rule agrees with the recorded tops 817, 886, and 955.
   - **Mutations** (derived):
     - `row-cols-2`: the shape selector at diff 170 and `second.top === first.top` at diff 217 both fail.
     - No wrap: the `div.col-12` selector and `last.top > first.bottom` both fail.
     - A `.card` in either specimen: the null check at diff 188–192 fails.
     - `Gap steps` without its container: the per-step selector at diff 180–184 fails.
     - All distinguished.
   - **Red without the patch** (derived): `2 failed | 1 passed`. The name list reads 12 against 14, and `requireValue` throws "No responsive gap row".
   - **Green with the patch:** 8px (`column-gap-xl-2`) and 48px (`row-gap-lg-5` overriding `gap-md-3`'s row axis in the later `lg` block) follow from the step tokens. The report's own geometry agrees (161.39 − 153.39 and 886 − 838).
   - The rendered look is outside this claim; see referral R-A.

6. **CONFIRMED.** Each piece is present in `us-shared-2.patch`:
   - **Layout copy:** line 8.
   - **"…are shipped names off the line:":** lines 233–234.
   - **Mixin contract in § Styles:** lines 195–208. § Gap utilities (266–299) keeps only gap-specific sentences.
   - **Compatibility rows:** lines 452–453, verbatim as ruled.
   - **Partial-importance sentence:** lines 239–241. It describes a planted rule, which `consumer.test.ts:221–225` confirms.
   - **The rest:** the § Files row (218), `#### column-gap` (320–395) and `#### gap` (404–443), § Showcase (462), § Tests (471), and the ROADMAP CL8b cell in the closed form with `<landing hash>` (482).
   - **Conformance and setupServer lists:** `column-gap` and `gap` at lines 69, 77, 166, and 174.
   - **Applies to `87ff1d0`:** measurements line 10–11, exit 0.
   - **Profiles case:** diff 391 asserts `toEqual(['--spacing'])`.
   - **Controls** (derived): control C (`--font-sans` leaks) and control D (an extra `--radius-planted`) each break an exact equality. Their recorded reds (report 145–146) rest on the writer.
   - **Term:** "gutter and gap" is used as one term at every site the patch touches.
   - The truth of the § Styles sentences is outside this claim; see SC1 and SC2.

7. **BROKEN.**
   - **Counts:** the report states counts, against `us-brief-3.md:51` and `AGENTS.md` § Writing.
     - `b-utilities-us-report-2.md:8` reads "One ancillary choice departs from the ruling's wording." This is also inaccurate: the ROADMAP cell's added nouns (line 177) depart from the ruled F7 text too.
     - Line 9 reads "One pre-existing defect sits outside scope."
   - **What right looks like:** "The `Responsive gap` specimen departs from the ruling's wording: …", and "A pre-existing defect sits outside scope …". Name each deviation rather than tallying them. The report is retained as returned, as in round 1.
   - **Values from named runs (listed for the record, permitted):**
     - "(291 files)" (63), the test tallies (67–69, 97, 102–107, 115–148, 163–167), and "12 names against 14 expected" (104).
     - The `compare.mjs` lines "180 … 252 … 36" (85–90) and the diffstat "10 files changed, 591 insertions(+), 64 deletions(-)" (197).
     - The geometry values (154–157, 176).
   - **Held:**
     - **Nouns:** every file path, mixin name, test name, and layer name in the changed comments and the patch takes a noun: "the `breakpoint-each` mixin", "the `vn-utility-` prefix", "the `base` layer", "the `stylesheet profiles` proof", "the `src/styles/utilities/_gap.scss` partial". CSS tokens and Sass variables stand as their own nouns.
     - **Unsafe syntax:** there is no `any` or `!`, no suppression, and no mock. The only assertion is the `as const` at diff 629. Every function is a callback passed directly.
     - **Banned terms:** the only hits are `once` meaning "one time" (`_mixins.scss` header) and `below` meaning "one pixel lower" (patch 288).
     - **Bounded deviations:** the specimen wrap, the ROADMAP nouns, the `tests/setup.css` controls restored, and the § Tailwind rewording (27, 174–179) are each bounded.

## Findings outside the claims

**SC1. The § Styles mixin-contract paragraph is false against the tree it lands in.** At `us-shared-2.patch:195–197` it reads "Every utility partial writes its classes through the `utility` mixin … and a utility that sets a `--bs-*` custom property writes it through the `utility-variable` mixin, so no partial writes an `!important` flag by hand." Three facts falsify it:
- `src/styles/utilities/_gap.scss:13–23` writes the `.g-*`, `.gx-*`, and `.gy-*` classes by hand, and they set `--bs-gutter-x` and `--bs-gutter-y`. The guide's own § Files row (patch 218) and § Tests link (471) call these gutter classes utilities.
- `utility-variable` takes no `$infix`, so it cannot express them.
- "No partial writes an `!important` flag by hand" is false at this landing:
  - `_reset.scss:8`
  - `elements/_input.scss:10`
  - `components/_form-control.scss:186`
  - `components/_link.scss:8–58`

  The paragraph this one follows (guide 152–154) names the reset and elements declarations itself.

This matters because the family's exit criterion requires "the guide states the shipped state". The sentence also teaches wave-2 writers a rule that the only shipped partial breaks.

What right looks like, in the patch hunk: "Every utility partial writes its utility entries through the `utility` mixin in the `src/styles/_mixins.scss` file, and an entry whose value is a `--bs-*` custom property alone, as a release `css-var` utility is, goes through the `utility-variable` mixin, so no utility entry carries a hand-written `!important` flag. The gutter classes in the `src/styles/utilities/_gap.scss` partial are the release's grid classes rather than utility entries, and stay hand-written with normal declarations." This follows family ruling 2's own word, "entries".

**SC2. The pronoun `it` is ambiguous in the same paragraph.** At `us-shared-2.patch:203–205`: "writes every property with `!important` and every local variable it is given without it. The `utility-variable` mixin writes its custom property without it". In one clause, one `it` is the mixin and the other is `!important`, against `.claude/rules/writing.md` § Sentence and paragraph order. Right: "writes every property with `!important` and every local variable in `$locals` as a normal declaration. The `utility-variable` mixin writes its custom property as a normal declaration, as the release writes a `css-var` utility …".

**SC3. The header comment calls every state class "a second class".** At `src/styles/_mixins.scss:345`: "Each pseudo-class in `$state` adds a second class after the base class". With `$state: (hover, focus)` the mixin emits `.X`, `.X-hover:hover`, `.X-focus:focus`, so the focus class is not a second class. The word also reads as a positional name. The guide's own wording is correct (patch 201: "adds a class after the base class"). Right: use that same wording in the comment. This is low severity: no release entry uses more than one state.

## Attacked and held

- **Locals on state rules:** a state rule that dropped `$locals` is not distinguished by any case, because no fixture entry carries both locals and a state. This is unreachable at family scope. Bootstrap 5.3.8 has no entry with both `local-vars` and `state`, and the mixin copies the release's body into the state rule (`_utilities.scss:78–88`). It is not a finding.
- **Classless entry with a `null` key:** it emits `.` or `.md`. This matches the release's composition exactly (`_utilities.scss:29–32`), so it is not a Veneer defect.
- **Separate rules instead of one:** the mixins emit a base rule and then a state rule, not the single `.X, .X-hover:hover` rule `_link.scss` writes. This is the release's form (`_utilities.scss:67–89`), and the report records it for UTIL-TEXT.
- **The cascade import in `LayoutSection.test.ts`:** the `beforeAll` cascade import at diff 150–153 follows the house pattern (`ButtonSection.test.ts:22–23`, `InputGroupSection.test.ts:15–16`).
- **Counts in the test's wording:** "two rows" in the test name and "The two leading items" (`LayoutSection.test.ts:117`) describe the measured layout the case asserts, so they are permitted as geometry.
- **Departure bullet:** "The prefixed column-gap property is absent." (patch 297) follows the guide's existing bold-lead form (guide 765, 967).

## Referrals

- **R-A, to the Orchestrator's capture round (NOT-EVIDENCED: no frames supplied).** At `gap-0` the `Gap steps` specimen's two plain items touch ("Gap 0Neighbor"), because `row-cols-auto` with `g-0` leaves no space between them. Whether that reads as a zero step or as a defect needs the `gap-steps` frame at 390 and 1280.
- **R-B, to the Orchestrator.** Two carriers from the round-1 reconciliation are missing from the family record:
  - `us-audit-verdict.md:24` says the record names UTIL-TEXT's link entries as `utility-variable` consumers through `$state`, and that the family exit criterion gains "each mixin has shipped callers in at least two partials … or it is inlined". Neither appears in `b-utilities-family.md`.
  - R4 in `b-utilities-design-verdict.md:52–56` still states the signatures without `$state`.

  Wave-2 briefs point at the record, so UTIL-TEXT would not learn that `$state` exists.
- **R-C, to the Orchestrator, on `us-brief-4.md`.**
  - Its line 15 names "`b-utilities-us-report-2.md` § Guide text", but the report has no such section.
  - At `c3ac297`, `tests/conformance.test.ts:357` already carries "loads the passive block and the helpers in the release order". The patch's added case (patch 86–156) also reads `_helpers.scss` order. Carrying it unchanged, as criterion 2 demands, lands two cases asserting helper order. Rule whether the regenerated patch merges them.
  - Separately, the pre-existing orphan fragment at guide 160–163 still needs a carrier.
- **R-D, to the Orchestrator.** No lane in this round can execute. The run facts in claims 2, 4, 5, and 6 (the writer's recorded reds, greens, and digests) are corroborated here only by derivation. Claim 4's host run is named under its verdict.

VERDICT: FAIL 4, 7; outside the claims: SC1, SC2, SC3
