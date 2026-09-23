# Verdict: UTIL-SPACER (`us`), audit round 2, objective lane

**Lane:** objective, held by `reviewer` on Opus 5.5 in place of `analyst` on Astra. The writer ran on the same engine family.

**Evidence base:** the claims file, `us-2.diff`, `us-2-status.txt`, `us-shared-2.patch`, `b-utilities-us-report-2.md`, `us-2-measurements.txt`, and `us-instruments/`. I also read the worktree `/home/user/veneer-us`, including the unit's raw run logs under `/home/user/veneer-us/tmp/probe/`. The claims file says those logs were not retained, but they are on disk: `mutate-styles-2.out.txt`, `layout-*.log.txt`, `control-{a,b,c,d}.log.txt`, `service.log.txt`, `g5.log.txt`, `g6.log.txt`, and `build-src.log.txt`. (The Orchestrator retained them under `us-instruments/logs/` at reconciliation.)

## Per-claim verdicts

**1. Delta and scope: CONFIRMED.**
- `us-2-status.txt` lines 1–10 lists exactly the ten files that `us-brief-3.md` § Scope (line 35) names as owned. `us-2-measurements.txt` lines 22–32 repeats the same list.
- `tests/setup.css`, `consumer.css`, and `preflight.css` do not appear in the status, so the control restores held against the index. Their backups sit under `tmp/probe/*.bak`.
- `us-2.diff` has exactly those ten `diff --git` headers.
- `us-shared-2.patch` touches exactly the seven files the claim names (`us-2-measurements.txt` lines 13–20).
- No vendored file moves, and no `src/styles/index.scss`, `components/**`, or sibling file moves.
- The `@use 'sass:list'` and `@use 'sass:string'` lines added at `_mixins.scss` lines 1–4 sit outside "the two mixins only", but they serve only those mixins. The round-1 `sass:meta` line set the same precedent, which was accepted.
- A record conflict goes to the Orchestrator under Referrals.

**2. The `$state` mechanism (F1): CONFIRMED.**
- **Signatures:** `utility` at `/home/user/veneer-us/src/styles/_mixins.scss:354-362` and `utility-variable` at `:405` match the claim.
- **Base rule first:** each mixin builds `$selectors` with the base selector first, then appends `.NAME-PSEUDO:PSEUDO` (`:383-386`, `:414-417`). Each selector gets its own rule with the same body: `!important` properties at `:393`, and a normal custom property at `:420`.
- **Release parity:** this matches the release at `node_modules/bootstrap/scss/mixins/_utilities.scss:57-65` and `:67-89`.
- **Values and order:** `mixins.test.ts` asserts `'margin-top: 1px !important;'` and `'--bs-vn-utility-tint: 0.1;'` for the two state rules (diff lines 637–638). It also asserts that each state rule directly follows its base rule (diff lines 639–641).
- **Mutations, executed (`tmp/probe/mutate-styles-2.out.txt`):** the naming case goes red under each of these, and the assertions distinguish every one: `state-without-pseudo` (line 25), `state-on-base` (line 27), `state-ahead` (line 29), `state-ignored` (line 31), `variable-state-without-pseudo` (line 33), `variable-state-on-base` (line 35).
- **Mutations, not executed:** the instrument does not run "state ahead" or "`$state` ignored" on `utility-variable`. Reading the test settles both: ignoring the state drops `.vn-utility-tint-1-hover:hover` from the sorted-set equality (diff line 625); emitting the state ahead makes `order[indexOf('.vn-utility-tint-1')+1]` undefined (diff line 641), because the tint call is the last `vn-utility-` emission.
- **Round-1 mutations:** all of them are still red (out.txt lines 1–24 and 37–70).
- **Failing-first record:** the report records `2 failed | 19 passed`, then `21 passed` (report lines 97–101). `g6.log.txt` lines 144–145 show `21 passed (21)`.

**3. The classless infix (F2): CONFIRMED.**
- **Code:** `$lead` slices the infix's leading hyphen when `$class == ''` (`_mixins.scss:371-374`), so the name is `md-` plus the key. This matches the release's composition at `_utilities.scss:29` and `:32`.
- **Expectations:** the naming case expects `.vn-utility-raised`, then `.sm-…` through `.xxl-vn-utility-raised` (diff lines 601–609). The gating case reads `${name}-vn-utility-raised` at each width (diff lines 660 and 667).
- **Mutation:** `classless-keeps-hyphen`, which emits `.-md-vn-utility-raised`, turns both the naming and gating cases red (out.txt lines 22–24).
- **Header comment:** `_mixins.scss:342-344` describes the emitted names correctly.

**4. The built cascade is unchanged: UNRESOLVED.**
- **Report-only evidence:** the digest lines (`df76aab7…ed765` for round 1 and for this build) and the `compare.mjs` output exist only in the report (report lines 78–91). No artifact holds them; a search of `tmp/` finds these strings only in `tmp/units/us-report-2.md`.
- **Corroboration:** `_gap.scss` is the same blob in both rounds (`index c4706df..315139d` in `us.diff` and `us-2.diff`); the only mixin change on the gap path is `$selectors` plus `@each` with a single selector, which compiles to the same rule; `build-src.log.txt` line 53 and `probe-build.log.txt` line 53 both report `145.93 kB`; spot checks of `.gap-md-3` and `.column-gap-xl-2` match between `tmp/probe/round1-built/index.css` and `dist/src/styles/index.css`.
- **Why UNRESOLVED:** a byte-level digest equality cannot be derived from source.
- **What settles it:** in `/home/user/veneer-us`, run `sha256sum dist/src/styles/index.css tmp/probe/round1-built/index.css tmp/probe/round1/index.css`, then `node tmp/units/us-instruments/compare.mjs`. `tmp/probe/base/index.css` is present. Record both outputs.

**5. Specimens and the Layout proof (F3, R3): CONFIRMED.**
- **Markup:** both specimens use `.container-fluid > .row.row-cols-auto.g-0…` with plain `div` items, no `.card`, and no inline style (`us-shared-2.patch:16-29`).
- **Classes shipped at launch:** `.row-cols-auto > *` and `.col-12` ship in `src/styles/components/_grid.scss:32-39` and `:47-55`, which is unchanged at `87ff1d0`, so R12 holds. `.col-12` comes later than `.row-cols-auto > *` at equal specificity, so the last item takes 100% width and wraps.
- **Deviation:** the report bounds it to the wrap mechanism (report line 176). The `row-cols-2` reading is executed: `tmp/probe/layout-row-cols-2.log.txt:27` shows "expected 886 to be 817", so the second item sits on its own row. With `width: 50%` and any non-zero column gap, each item must wrap, so no column gap can ever show.
- **Mutations, executed:** `row-cols-2` and no-wrap: the geometry case goes red (`layout-row-cols-2.log.txt:27`; `layout-no-wrap.log.txt:27`, "expected 817 to be greater than 838"), and so does the shape selector; `.card` in either specimen: the no-`.card` check goes red (`layout-responsive-card.log.txt:15`; `layout-steps-card.log.txt:15`); `Gap steps` without its container: the shape selector goes red (`layout-steps-unframed.log.txt:15`).
- **Geometry case, unmutated:** the passing run is not retained. The geometry case passes on the final `Responsive gap` markup in the `steps-card` and `steps-unframed` runs ("1 failed | 2 passed", with only the render case red).
- **Render case, unmutated:** every assertion before the `.card` check passed in the `responsive-card` run. The remaining frozen checks hold because the patch freezes both specimens.
- **Red without the patch:** this follows deterministically from the test. The name list is short of the two specimens, and `requireValue(…'No responsive gap row')` throws, which gives `2 failed | 1 passed`.
- **The 8px assertion:** Chromium LayoutUnit values are multiples of 1/64 px, so the exact equality is sound.

**6. The service proofs and the shared patch: CONFIRMED.**
- **R2:** `profiles.test.ts` asserts `toEqual(['--spacing'])` (diff line 391).
- **Control C:** `tmp/probe/control-c.log.txt:13` shows "expected [ '--font-sans', …(408) ] to deeply equal [ '--spacing' ]".
- **Control D:** `control-d.log.txt:13` shows `[ '--spacing', '--radius-planted' ]`, so the old `toEqual([])` would also be red against the unplanted `['--spacing']`.
- **Controls A and B:** both are red (`control-a.log.txt:78`, `3 failed`; `control-b.log.txt:130`, `5 failed`).
- **Guide text:** each sentence the claim names is present verbatim: the Layout copy (patch line 8), the § Tailwind sentence (lines 233–234), § Styles (lines 195–208), § Gap utilities (lines 266–299), the compatibility rows (lines 452–453), the § Files row (line 218), both ledger tables (lines 320 and 404), § Showcase (line 462), and § Tests (line 471).
- **Partial-importance sentence:** the rewording (lines 239–241) matches `consumer.test.ts:220-238`.
- **ROADMAP:** the CL8b cell is in the closed-row form (line 482).
- **Key lists:** the `column-gap` and `gap` entries sit alphabetically in both lists (lines 69, 77, 166, and 174).
- **Apply check:** the patch applies to `87ff1d0` with exit 0 (`us-2-measurements.txt:10-11`).
- Presence is confirmed here. The truth of the § Styles sentences is a separate finding, M1.

**7. Law and report: BROKEN (the report states counts).**
- **Counts in report prose, not measurements:** "One ancillary choice departs" (report line 8); "One pre-existing defect sits outside scope" (report line 9); "(291 files)" (report line 63); "reads a list of 12 names against 14 expected" (report line 104); the diffstat "10 files changed, 591 insertions(+), 64 deletions(-)" (report line 197).
- **Fix:** write "An ancillary choice", "A pre-existing defect", drop "(291 files)", write "lacks the `Gap steps` and `Responsive gap` names", and drop the diffstat.
- **What holds:** the code-token nouns hold in the changed comments and the patch ("the `breakpoint-each` mixin", "the `src/styles/utilities/_gap.scss` partial", "the `tests/src/styles/mixins.test.ts` proof", "the `base` layer", "the `color` utility partial"); the delta adds no `any`, no non-null `!`, no suppression, and no mock, its only `as` is `as const` at diff line 629, and its only functions are callbacks passed directly; the banned-term sweep finds only permitted senses ("once" as "one time" at diff lines 29, 31, and 588 and patch line 281; "below" as "one pixel lower" at patch line 288 and as a variable name; `new` only in code); the report records each criterion's command and result line, retains `baseline.sh`, and bounds each deviation it names.

**Counts the report states (for the record):** the gate tallies (`291 files`; `2 passed (2)` / `21 passed (21)`; `3 passed (3)` / `18 passed (18)`; `3 passed (3)`); the `compare.mjs` output (`180` / `252`; `[gap, 36]` and `[column-gap, 36]`; `recorded 36 … extra 0`, three times); the failing-first records (`2 failed | 19 passed`; `21 passed`; `1 failed | 7 passed`; `2 failed | 1 passed`; `12` names against `14` expected; `3 passed`); the mutation tallies (`1 failed | 20 passed`; `2 failed | 19 passed`; `4 failed | 17 passed`; `8 failed | 13 passed`; `11 failed | 10 passed`; `7 failed | 14 passed`); the layout tallies (`2 failed | 1 passed`; `1 failed | 2 passed`); the control tallies (`2 failed | 16 passed` with `…(408)`; `1 failed | 17 passed`; `3 failed | 15 passed`; `5 failed | 13 passed`); the observation tallies (`22`, `18`, `250`, `65`, and `8 passed`); the Files section's diffstat; the prose counts "One ancillary choice" and "One pre-existing defect".

## Findings outside the claims

**M1. The § Styles mixin-contract sentences are false against what ships at this landing.**
- **Where:** `us-shared-2.patch:195-197`, which says: "Every utility partial writes its classes through the `utility` mixin…, and a utility that sets a `--bs-*` custom property writes it through the `utility-variable` mixin, so no partial writes an `!important` flag by hand."
- **Counterexamples in the landed tree:** `src/styles/utilities/_gap.scss:13-23` writes the `.g-*`, `.gx-*`, and `.gy-*` classes by hand, and the same patch's § Files row calls them "gutter and gap step utilities" (patch line 218); `src/styles/components/_link.scss:32-36` and `:61-66` write the release's `css-var` utilities `.link-opacity-*` and `.link-underline-opacity-*` by hand, and `:39-44` writes `.link-offset-* … !important` by hand; `_reset.scss:8`, `elements/_input.scss:10`, and `components/_form-control.scss:186` write `!important` by hand, and the guide's own preceding paragraph (guide lines 152–154) names two of those rules; `utility-variable` has no caller in `src/` (grep `@include utility` over `/home/user/veneer-us/src` finds only `_gap.scss:24-26`).
- **Why it matters:** the guide states the family's future obligation (`b-utilities-family.md` ruling 2) as present fact. `.claude/rules/documentation.md` requires prose to be falsified against what shipped.
- **What right looks like:** describe the mechanism without the universal claim. For example: "The `utility` mixin in the `src/styles/_mixins.scss` file writes a utility key's classes, and the `utility-variable` mixin writes a utility that sets a `--bs-*` custom property. The `src/styles/utilities/_gap.scss` partial writes its gap keys through the `utility` mixin." Delete "so no partial writes an `!important` flag by hand."

**M2. Counts in shipped prose and in comments.**
- **Where:** `us-shared-2.patch:240`, "of the two longhands Tailwind's `col-1` rule declares"; `LayoutSection.test.ts` comments "lays two plain items out" (diff line 178) and "The two leading items" (diff line 214).
- **What right looks like:** "declares `!important` on the `grid-column-start` longhand alone, leaving the `grid-column-end` longhand that Tailwind's `col-1` rule also declares normal", and "lays a plain item and its neighbor out".

## Attacked and held

- **Adjacent correct behaviour in the mixins:** a `$state: (hover)` argument is a single unquoted value, not a list, and `@each` still iterates it once, which the execution record shows; an empty `$state` leaves `$selectors` a single string, so the gap emission is unchanged.
- **Mutation-instrument patterns:** `mutate-styles-2.py` uses 4-tab and 3-tab patterns that each hit exactly one mixin, and its `count == 1` guard enforces that.
- **Cascade and layout:** the layered escape in `gap.test.ts` relies on the top-level `utilities` layer, and a later same-layer rule wins at equal specificity; `.gap-md-4.column-gap-sm-2` gives a 24px column gap at 768px because a wider infix's block comes later; the dropped `-moz-column-gap` rows use `min-width` conditions, following the ledger's convention for dropped rows (guide line 2622).

## Referrals (to the Orchestrator)

- **R-a:** `b-utilities-family.md:81-83` lists `tests/setupServer.test.ts` as off-limits for every unit. `us-brief-3.md:37` grants it as shared, and the patch edits it at lines 160–177. The record and the brief disagree. Rule which one binds, and correct the other before wave 2 dispatches.
- **R-b:** the claims file's line 5 says the mutation and control logs were not retained. They exist under `/home/user/veneer-us/tmp/probe/`. Retain them in `.orkestrel/veneer/` before the worktree is swept, because claims 2, 5, and 6 rest on them.

VERDICT: FAIL 4, 7; outside the claims: M1, M2
