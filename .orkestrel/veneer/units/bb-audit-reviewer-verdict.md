# B-PASSIVE-B — audit verdict, subjective lane (`reviewer` on Opus)

Lane held: **subjective** (API feel, naming, guide voice, the shape a consumer and a showcase reader meet). Correctness, tallies, and gate readings are referred to the objective lane and to `checker` where named.

## 1. The partial — UNRESOLVED

Everything the claim asserts about the file's content holds on my own reading, except its final conjunct.

Held: `/home/user/veneer-bb/src/styles/components/_button-group.scss:1-4` opens `@layer components` after `@use '../tokens'` and `@use '../mixins' as *`; every rule it writes matches `/home/user/veneer-bb/node_modules/bootstrap/dist/css/bootstrap.css:3696-3795` selector list and declaration for declaration, `var(--bs-border-radius)` (release line 3732, partial `.btn-group` rule) and `calc(-1 * var(--bs-border-width))` (release 3736 and 3783) included; both `:not(.dropdown-toggle)` exclusions ship (the `.btn-group > .btn:not(:last-child)…` and `.btn-group-vertical > .btn:not(:last-child)…` rules); `.btn-toolbar .input-group` (release 3727) and `.btn-group > .btn.dropdown-toggle-split:first-child` (release 3739) are absent; `/home/user/veneer-bb/src/styles/index.scss:55` sits after `@use 'components/vr'`, the position family ruling 8 gives it.

Unresolved: the reading `recorded 38, shipped 34, missing []` rests only on the writer's run, and it does not reconcile with what I can count. `/home/user/veneer-bb/tests/setupStyles.ts` `BUTTON_GROUP_SELECTORS` (around line 2745) lists 34 shipped names, and `/home/user/veneer-bb/guides/veneer.md` § Deferred selectors keeps six further names of these two keys (`.btn-toolbar .input-group` and the five `dropdown-toggle-split` forms, guide lines 444-449), which sums to 40 distinct recorded names rather than 38.

What settles it: the Orchestrator re-runs acceptance criterion 2's reading over `dist/src/styles/index.css` and states the population the `recorded` tally was drawn from (the two keys' `selectors` arrays, deduplicated how). Referred to the objective lane.

## 2. No ledger row — CONFIRMED, with a correction to the claim's stated reason

The attribution holds, but not for the reason the claim gives. `attributeSelector` in `/home/user/veneer-bb/tests/setupServer.ts:1491-1518` answers by layer, then by inventory membership — `const member = keys.find((key) => shipped.includes(key))` at line 1498, returning the **first inventory key order** match. The specificity sort (`.sort((left, right) => right.length - left.length)`, line 1516) runs only in the class-prefix fallback, which is unreachable for a selector the inventory records. So `.btn-group-lg > .btn` and `.btn-group-sm > .btn` stay attributed to `btn` because `/home/user/veneer-bb/tests/fixtures/oracle/inventory.json:31245` declares `"btn"` before `"btn-group"` at line 46927 — not because `btn` is the most specific shipped key. The attribution is stable while that committed fixture's key order holds, and the fixture is off-limits to every B-PASSIVE unit.

No-departure/no-addition corroborated independently of the writer's run: I compared the partial's declarations against the release stylesheet (§ 1) and found no value difference, which is what a departure row records; every selector the partial emits appears in `BUTTON_GROUP_SELECTORS`, which `/home/user/veneer-bb/tests/setupStyles.test.ts:770-783` binds to the inventory, so there is no emitted name for an addition row. `bb-status.txt` shows `guides/ledger/` untouched, so the existing `btn`-attributed rows are unchanged.

Residual for the objective lane: the comparison normalizes selector text by its own rules, so the settling evidence is still the Orchestrator's `npm run build:src && npm run test:conformance`.

## 3. The proof — BROKEN

Three shipped selectors have **no assertion anywhere that reads their treatment**, and the report's § Coverage matrix names, for each of them, a case that does not exercise it.

- `.btn-group > .btn-check:focus + .btn` — matrix cell names `rings the checked label of the grouped alignment control`. That case lives in `/home/user/veneer-bb/tests/app/browser/integration.test.ts:713-747`, not in the proof file the matrix's own header names. Its only lift assertion is `expect(readStyle(checked, 'z-index')).toBe('1')` at line 742. The element it reads is the label of a **checked** input, so `.btn-group > .btn-check:checked + .btn` already resolves `z-index: 1` for it.
- `.btn-group-vertical > .btn-check:focus + .btn` — matrix cell names `renders every grouped class the partial ships at least once` (`/home/user/veneer-bb/tests/app/browser/sections/ButtonGroupSection.test.ts:82-104`). That case's selector list does not contain this selector at all; its last `.btn-check` entry is `.btn-group-vertical > .btn-check:checked + .btn` (line 100).
- `.btn-group-vertical > .btn-check:checked + .btn` — matched for presence only by the same case (line 100). `BUTTON_GROUP_CHECK_MARKUP` is mounted under `.btn-group` alone in every styles proof case, so the vertical direction's checked lift is never read.

A grep of `/home/user/veneer-bb/tests` for `btn-check:focus` returns only table entries in `setupStyles.ts:2760,2766` and `setupStyles.test.ts:798`, and those compare the **inventory** against a written table — they read nothing about the shipped partial. No test drives an unchecked `.btn-check` input to focus.

Mutation discipline, three cases:

1. `pulls each neighbour back by one border width on the axis its group runs` (`/home/user/veneer-bb/tests/src/styles/components/button-group.test.ts:74-101`). Mutation: `margin-left: 0` in the `.btn-group > :not(.btn-check:first-child) + .btn` rule. **Distinguishes** — the value read (`-border`) and the geometric read (`child.left ≈ previous.right - border`) both fail, and the `index === 0 ? 0` arm is the control that would catch the rule widening to the first child.
2. `leaves a dropdown toggle its trailing corners where a plain child loses them` (same file, around line 206). Mutation: drop `:not(.dropdown-toggle)` from the trailing-radius rule. **Distinguishes** — the toggle child's `border-top-right-radius` would read 0 against an asserted `base > 0`, and the plain child at the same position is the paired control.
3. `rings the checked label of the grouped alignment control when Tab reaches it` (integration.test.ts:713-747). Mutation: delete `.btn-group > .btn-check:focus + .btn` from the partial's `z-index` selector list. **Does not distinguish** — the same element still matches the `:checked + .btn` selector the partial keeps, so `z-index` still resolves `1`; and `readRing(reached, checked)` reads the focus ring `_button.scss` ships, not anything this partial writes.

Bound: the mutation is not invisible to the tree. `tests/conformance.test.ts`'s ledger comparison reads the built cascade against the inventory, so a deleted selector reddens there. What is broken is the claim that the proof "reads each shipped selector's **treatment** through the installed cascade readers inside the rendered region", and the report's coverage matrix, which attributes three selectors to cases that do not exercise them.

Right looks like: drive an **unchecked** `.btn-check` input to focus in `button-group.test.ts` and read its label's `z-index` against the unfocused sibling, in both directions; mount `BUTTON_GROUP_CHECK_MARKUP` under `.btn-group-vertical` for the vertical checked lift; and correct the three coverage-matrix cells to name the case that actually reads each selector.

## 4. The showcase and the registry — CONFIRMED

`/home/user/veneer-bb/app/browser/sections/ButtonGroupSection.ts` renders the eight named specimens from `BUTTON_GROUP_SPECIMENS`, frozen at every level (`ButtonGroupSection.test.ts:56-62` asserts the freezes, line 46 asserts `region.querySelector('[style]')` is null). `CASCADE_KEYS` gains a resting row for every specimen but the check group (`tests/setup.ts`, the seven rows after the `.link-primary` row), and `GROUP_KEYS` (around line 357) carries `check-group-checked` and `check-group-focus` — the claim's "one rest scenario per specimen" reads true only with that exception, which its next clause states. `CaptureState` gains `checked` (tests/setup.ts:110), which `b-passive-baseline.md` § The capture registry names as the authorized extension. The journey places both frames (integration.test.ts:698 and 746) and drives the Tab traversal (line 736).

The portfolio holds exactly 132 files. Every frame the report lists exists: nine scenarios × four variants = 36 PNG files, and eight subjects × four variants = 32 accessibility artifacts, all under `/home/user/veneer-bb/tmp/capture/states/`.

The frames show what the report claims. Joined corners: `horizontal-group--light-1280.png` shows three children as one rounded outline with flat inner joins. Vertical stack: `vertical-group--light-1280.png` shows both columns full-width with the joins flattened. Checked check group: `check-group-checked--light-1280.png` shows the middle label filled and the group's outer corners kept. Nested joining: `nested-groups--light-1280.png` shows the four horizontal children as one run and the vertical group of groups stacked. Wrapping toolbar: `crowded-toolbar--light-390.png` shows three groups on three lines — see finding F2 for what the same evidence refutes.

## 5. The accounting — UNRESOLVED

Every conjunct but the gate reading is confirmed from the diff and the status: `tests/conformance.test.ts:92-95` places `'btn-group'` and `'btn-toolbar'` between `'btn'` and `'col'`, sorted; § Compatibility gains a `btn-group` selector row, a `btn-group` variable row, and a `btn-toolbar` selector row, and `btn-toolbar` correctly takes no variable row per family ruling 7; the `Passive`-owned `.btn-group*`, `.btn-group-vertical*`, and `.btn-toolbar` rows are struck from § Deferred selectors with the Forms and Disclosure rows left in their original relative order (`guides/veneer.md:444-449`); `bb-status.txt` shows `guides/ledger/` untouched.

The claim declares its own gate conjunct unresolved until the Orchestrator's run, so the claim takes that value. What settles it: the `verifier` run of `npm run test:conformance`.

## 6. The guide — CONFIRMED

`### Button group classes` (`/home/user/veneer-bb/guides/veneer.md:376`) and `### Button toolbar classes` (line 420) sit in barrel order after `### Helper classes` (line 325), which is where family ruling 12 puts them. The voice matches `### Table classes` (line 294) closely: present tense, the key's own behaviour first, the token relationship named, the proof file named at the end of the body, then a `These are the key's recorded departures.` list. Every list is introduced by a complete sentence; no count of a growable set appears in either section; I found no substitution-table term in the added prose (swept the new sections for `should`, `simply`, `easy`, `just`, `via`, `in order to`, `e.g.`, `i.e.`, `etc.`, `allows you to`, `and/or`, `leverage`, `utilize`, `performant`, `robust`, `please`, and causal `since`, temporal `once`, cross-reference `above`/`below` — no hit in a banned sense).

The § Files row for `_button-group.scss` is added after the `_icon-link.scss` row; the proof is named by the pre-existing `tests/src/styles/` row, which is how every other component's proof is named in that table. No `guides/ledger/` path appears in the added prose. Ignoring the table reflow that removing the widest deferral cell forces, the guide diff is exactly the added rows, the two added sections, and the struck rows — I read every `guides/veneer.md` hunk in `bb.diff` and found no change to the text of a retained row.

See F6 for one incomplete enumeration inside the confirmed section.

## 7. The blockers and the rewrites — CONFIRMED

Blocker 1 is outside the unit's scope: `tests/setupServer.test.ts` is named off-limits by family ruling 13. The patch inserts `'btn-group', 'btn-toolbar'` after `'btn'` and before `'col'`, which is the literal's sorted order.

Blocker 3 is in neither list, so unowned: family ruling 13 does not name `tests/app/browser/sections/ButtonSection.test.ts`, and the unit owns only its own section proof. I read the case at `/home/user/veneer-bb/tests/app/browser/sections/ButtonSection.test.ts:68-76`; its exclusion at line 72 is `!name.startsWith('btn-group') && name !== 'btn-check'`, unpatched in the tree. The partial declares exactly three class names the baseline cascade lacked — `btn-group`, `btn-group-vertical`, `btn-toolbar` — the first two already covered by the `startsWith` arm, so adding `name !== 'btn-toolbar'` closes the case and nothing else. The writer flagged the patch unrun; the reasoning is closed on my own reading of the case.

Blocker 2 is measured correctly at its source: `/home/user/veneer-bb/src/styles/components/_grid.scss:8-9` declares `display: flex; flex-wrap: wrap;` in `.row`, and the `.btn-toolbar` rule in `_button-group.scss` (around line 36) declares the same pair. Family ruling 13 puts `_mixins.scss` and `_grid.scss` off-limits to every B-PASSIVE unit, so this cannot close inside the unit; it is the family design round's. I rule nothing on the mixin name, as the claim directs.

The `Showcase.test.ts` rewrite preserves the assertion's intent. The scoped read at line 98 still compares the Buttons region's hosts against `BUTTON_SPECIMENS` (lines 99-101), the `owned` filter below it only narrows a non-emptiness assertion, and the whole-host assertion at lines 128-132 still reads every `.${BUTTON_CLASS}` in the host and asserts none sits outside `main` — unchanged. See F3 for how that line is written.

The `toggles a native host and an anchor host through the keyboard` reorder carries every assertion across intact: the diff moves the five anchor statements (traverse, `activeElement`, `{Enter}`, `waitForState`, `classList.contains('active')`, `JOURNAL.record`) ahead of the native block without editing one of them, and the native block is untouched. The journey "split" adds two new cases and removes none.

Residuals for the Orchestrator, neither load-bearing for the conjuncts above: Blocker 2's scratch-copy compile (`112045` bytes each side, `shared: []`) is the writer's own measurement, and Blocker 3's patch has never been run.

## 8. Scope is honest — CONFIRMED

Every one of the thirteen modified paths in `bb-status.txt` appears in family ruling 13's shared list, and the four untracked paths are exactly the unit's owned partial, proof, section, and section proof. `tmp/probe/` no longer exists (glob over `/home/user/veneer-bb/tmp/probe/**` returns nothing). `_grid.scss`, `_mixins.scss`, `tests/setupServer.test.ts`, and `ButtonSection.test.ts` are absent from the status, and I confirmed `ButtonSection.test.ts:72` still carries the unpatched exclusion, so the returned patches really were not applied. No vendored path (`tests/setupPolicy.ts`, `tests/policy.test.ts`, `.claude/settings.json`) appears. `tests/setup.test.ts` carries exactly the import addition, the `'GROUP_KEYS'` export-literal row, and the one `CAPTURE_KEYS` concatenation rewrite.

## 9. Gates — UNRESOLVED

Every reading in the report's § Commands run is the writer's own. What settles it: the independent `verifier` run of the gate chain, including the `test:setup` and `test:app` reds the report attributes to Blockers 1, 2, and 3, and the `npm test` the unit did not run.

---

# Findings outside the claims

## F1 — `GROUP_KEYS` drops the qualifier every other declaration in this family carries

`/home/user/veneer-bb/tests/setup.ts`, the `GROUP_KEYS` declaration around line 357; consumers at `/home/user/veneer-bb/tests/setup.ts:372` and `/home/user/veneer-bb/tests/setup.test.ts:14,60,73-78`.

What is wrong: the family names itself `BUTTON_GROUP` everywhere else — `BUTTON_GROUP_COPY`, `BUTTON_GROUP_ACTIONS`, `BUTTON_GROUP_PAIR`, `BUTTON_GROUP_CHOICES`, `BUTTON_GROUP_SPECIMENS` in `app/browser/constants.ts`, and `BUTTON_GROUP_SELECTORS`, `BUTTON_GROUP_CORNERS`, `BUTTON_GROUP_RADIUS_CASES`, `BUTTON_GROUP_STACK_CASES`, `BUTTON_GROUP_MARKUP`, `BUTTON_GROUP_CHECK_MARKUP` in `tests/setupStyles.ts`. The registry alone says `GROUP`.

Why it matters: `AGENTS.md` § Design laws fixes one term per concept, and `.claude/rules/names.md` § Value-level identifiers fixes a constant as `{QUALIFIER}_{NOUN}`. The neighbouring registries take the exact term their subject carries — `SHOWCASE_KEYS` for the Showcase region, `BUTTON_KEYS` for the Button section (`tests/setup.ts:206,226`). Beside `BUTTON_KEYS`, a reader meets `GROUP_KEYS` and cannot tell whether it belongs to the Button group section or is a grouping of keys. No collision forces the short name.

What right looks like: rename to `BUTTON_GROUP_KEYS`, and move its row in the sorted export literal at `tests/setup.test.ts:57-64` to the position that name takes.

## F2 — the second toolbar specimen's stated contrast is refuted by its own frames, and the specimen earns nothing

`/home/user/veneer-bb/app/browser/constants.ts`, the `BUTTON_GROUP_SPECIMENS` doc block (around line 665) and the `Wide toolbar` and `Crowded toolbar` entries below it.

What is wrong: the doc block states "the wide specimen holds its groups on one line at the registered widths, and the crowded one carries enough of them to wrap at the narrow one". The portfolio shows otherwise. `/home/user/veneer-bb/tmp/capture/states/wide-toolbar--light-390.png` shows the Wide toolbar's two groups on **two** lines — it wraps at a registered width. `wide-toolbar--light-1280.png` and `crowded-toolbar--light-1280.png` both hold one line; `crowded-toolbar--light-390.png` wraps. So at both registered viewports the two specimens demonstrate the same thing, and the sentence that justifies shipping the toolbar twice is false at one of the two widths it names.

A third term compounds it: the section paragraph promises "a wrapping toolbar" (`BUTTON_GROUP_COPY.paragraph`, around line 624), the specimen is labelled `Crowded toolbar`, and its own groups announce `Wrapped cut actions`. One concept, three terms, and a reader who scans the paragraph for the wrapping toolbar cannot tell which of the two specimens it means — at 1280 neither wraps, at 390 both do.

Why it matters: the second specimen costs four frames, an accessibility artifact per variant, a `CASCADE_KEYS` row, and six focusable hosts in the document tab order — the same tab order whose length the unit's own Deviation 4 had to work around (30816 ms to 5546 ms). `AGENTS.md` § Design laws requires the design to earn each concept, and `.claude/rules/documentation.md` requires a prose claim about behaviour to be true of what shipped.

What right looks like: keep one toolbar specimen, named for the behaviour it ships (`Wrapping toolbar`), and let the proof case `wraps a toolbar onto a second line under pressure and keeps its groups leading` carry the controlled-width reading it already carries. If the family wants both, make the contrast real — give one specimen few enough groups that it holds one line at 390 — and rewrite the doc block to the widths actually measured.

## F3 — the authorized-line rewrite hard-codes a region name the file already reads from the constants

`/home/user/veneer-bb/tests/app/browser/Showcase.test.ts:98`:

```ts
const specimens = [...host.querySelectorAll(`section[aria-label="Buttons"] .${BUTTON_CLASS}`)]
```

What is wrong: `'Buttons'` is `BUTTON_COPY.region` (`/home/user/veneer-bb/app/browser/constants.ts:16-19`), and this same case reads the other region name from its constant three lines later — `expect(readName(region)).toBe(SHOWCASE_COPY.region)` at line 121, with `SHOWCASE_COPY` already imported at line 8. The rewrite commits, four lines above it, the defect the case's own comment at lines 102-104 warns against: "a hand-written attribute test here would be a second declaration of the ownership rule and would pass while the published one moved."

Why it matters: this is the line the report returns as Deviation 3 for the Orchestrator to authorize, so the version that gets authorized is the version that ships. A literal region name silently stops selecting anything if `BUTTON_COPY.region` is ever retuned, and the assertion below it — comparing against `BUTTON_SPECIMENS` — would then compare an empty list against a non-empty one and redden for the wrong reason.

What right looks like: add `BUTTON_COPY` to the existing `@app/browser` import at lines 1-12 and write ``section[aria-label="${BUTTON_COPY.region}"] .${BUTTON_CLASS}``.

## F4 — the partial carries two `@use` lines it never uses

`/home/user/veneer-bb/src/styles/components/_button-group.scss:1-2`: `@use '../tokens'` and `@use '../mixins' as *`. The file references no `tokens.` member and contains no `@include`.

The cause is family ruling 8, which directs a partial to open `@layer components` "after `@use '../tokens'` and `@use '../mixins'`", so the unit obeyed its brief. The tree's own pattern is narrower: the immediate barrel neighbour `/home/user/veneer-bb/src/styles/components/_vr.scss:1` opens `@layer components` with no `@use` at all, and `/home/user/veneer-bb/src/styles/components/_grid.scss:1-3` imports `../mixins` because it calls `alias-gutters` and `pad-gutters`. The unit's own brief says the tree wins where a record disagrees with it, and the unit neither stopped nor reported the disagreement.

Why it matters: a reader opening the partial looks for what two imports are for and finds nothing. There is no output difference — Sass emits a `@use`d module once and `index.scss` already loads `tokens`.

What right looks like: amend family ruling 8 to "a partial opens `@layer components`, after the `@use` lines it uses", and drop both lines from this partial. This is the Orchestrator's ruling on the family record, not the unit's to take.

## F5 — the `GROUP_KEYS` remarks describe a frame the journey does not shoot

`/home/user/veneer-bb/tests/setup.ts`, the `GROUP_KEYS` doc block (around line 345): "The checked frame is an element frame of the specimen **as the showcase renders it**".

The journey does not shoot it there. `/home/user/veneer-bb/tests/app/browser/integration.test.ts:672-698` clones the specimen, renames every `.btn-check` input and its label's `for` attribute, prepends the clone to `document.body`, and places the frame on the clone — with its own comment at lines 693-695 saying an element frame taken where the showcase renders this specimen "comes back blank".

Why it matters: the neighbouring registry states the same mechanism honestly. `CASCADE_KEYS` remarks (`tests/setup.ts:254-259`) say "The same specimens, copied and put at the document's start, photograph correctly at both widths — which is what the journey does". The new block inherits the mechanism and drops the disclosure, so the registry now tells a reader two different things about how its frames are made.

What right looks like: state the copy in the `GROUP_KEYS` remarks the way `CASCADE_KEYS` states it, and name the input renaming the clone needs.

## F6 — the guide's departures bullet names three of the five split-toggle selectors deferred under this key

`/home/user/veneer-bb/guides/veneer.md:413-415` opens "**The split-toggle selectors are absent.**" and then names `.btn-group > .btn.dropdown-toggle-split:first-child`, `.btn-group-sm > .btn + .dropdown-toggle-split`, and `.btn-group-lg > .btn + .dropdown-toggle-split`. § Deferred selectors carries five rows (lines 445-449); `.btn-sm + .dropdown-toggle-split` and `.btn-lg + .dropdown-toggle-split` are missing from the bullet, and the inventory records both (`tests/fixtures/oracle/inventory.json:33611,33647`).

Why it matters: the sentence reads as the set, so a reader reconciling the two tables finds two rows the key's own departures list does not account for.

What right looks like: name all five, or recast the sentence to point at § Deferred selectors without enumerating.

---

# Attacked and held

- **The partial against the release stylesheet.** I read `node_modules/bootstrap/dist/css/bootstrap.css:3696-3795` rule by rule against the partial looking for a dropped declaration, a reordered selector list, or a substituted token. Nothing. The two omissions are exactly the deferred names, and the `.btn-group > .btn.dropdown-toggle-split:first-child` removal leaves the surrounding two-selector rule intact.
- **The adjacent behaviour that looks like the defect and is correct:** the partial writes nothing for `.btn-group-sm > .btn` or `.btn-group-lg > .btn`, which reads at first like a gap in the key's surface. It is correct — Bootstrap's own `@extend` emits them from `_button.scss`, `bb-status.txt` shows `_button.scss` and `button.test.ts` untouched, and `BUTTON_GROUP_SELECTORS` lists them as shipped so the inventory binding stays closed over them.
- **The `check-group-focus` page frame.** I opened `check-group-focus--light-1280.png`: an 8626-pixel-tall page shot in which the ring is not legible at any reading scale. This is **not** this unit's defect — `integration.test.ts:359,394` shoots `primary-focus` as a page frame the same way, so the form is the family's established one and the declared region is what the portfolio guard reads.
- **The `Row cut` / `Column cut` label qualifiers.** They read oddly for a toolbar, but the `BUTTON_GROUP_ACTIONS` doc block states the constraint that forces them (the capture registry's subject reader refuses a name two declarations answer to), and `ButtonGroupSection.test.ts:113-123` asserts the uniqueness. Documented tradeoff, correct.
- **`BUTTON_GROUP_PAIR`.** A constant named for its cardinality invites drift, but it is derived (`BUTTON_GROUP_ACTIONS.slice(0, 2)`) and pinned (`ButtonGroupSection.test.ts:62`), so the name stays true however the action list grows. No finding.
- **The deferral table's row order.** The struck rows leave the retained Forms and Disclosure rows in exactly the relative order the pre-image had, so the table was not rewritten — only the whole-row deletions family ruling 13 permits, plus the column reflow they force.
- **The `checked` `CaptureState` member.** `check-group-checked` is the one resting scenario in the tree whose stem carries a state, which reads like a driven frame beside eight stem-only resting siblings. It holds: `b-passive-baseline.md` § The capture registry names `checked` as the authorized extension, the `CaptureState` doc admits a state a journey "reads that subject in", and the scenario spelling `<stem>-<state>` is one of the two the grammar permits.

---

# Dispatch defects in this round

- **The brief's named design authority does not exist.** `/home/user/veneer-bb/tmp/units/b-passive-design-verdict.md` is absent; `/home/user/veneer-bb/tmp/units/` holds only `b-passive-b-brief.md`, `b-passive-family.md`, `b-passive-baseline.md`, `b-passive-terrain-report.md`, and `b-passive-b-report.md`. The unit's own brief points at the same missing file for "ruling 5 for this unit's specimens", and the family record points at it for rulings 8, 9, and 10. I ruled on the specimen set against the unit brief's Obligation 1 list instead, and name the substitution here.
- **"Rule on the `progress-component` barrel alias" names another unit's subject.** Family ruling 8 puts `as progress-component` on B-PASSIVE-E's `progress` partial alone. Nothing in this diff carries an alias; `src/styles/index.scss:55` is a bare `@use 'components/button-group'`. Nothing to rule.
- **"Rule on the D6 and D10 choices" is unreachable.** `D6` and `D10` are design-verdict decision ids (the family record cites `D2`, `D5`, `D6`), and that file is the missing one. Not ruled.
- My primary working directory was `/home/user/veneer-bsw` while the subject tree is `/home/user/veneer-bb`. Every read in this verdict used an absolute path, so no reading was affected.

VERDICT: FAIL 1, 3, 5, 9; outside the claims: F1, F2, F3, F4, F5, F6
