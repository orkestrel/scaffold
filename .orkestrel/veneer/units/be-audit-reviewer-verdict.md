# B-PASSIVE-E audit — `reviewer` on Opus, **subjective lane** (API feel, naming, guide voice, the shape a consumer and a showcase reader meet)

## Numbered verdicts

**1. The partials — BROKEN (one conjunct; the fix is to the ruling's wording, not to the code).**

Everything in this claim holds except the `@use '../tokens'` conjunct, which is false in all three partials. `/home/user/veneer-be/src/styles/components/_placeholder.scss:1` opens `@layer components` on line 1 with no `@use` at all; `_progress.scss:1` and `_spinner.scss:1` open with `@use '../mixins' as *` alone.

What right looks like: **change the family record, not the partials.** The tree's own precedent is import-what-you-use — `components/_icon-link.scss:1`, `_type.scss:1`, `_image.scss:1` import mixins alone, `_vr.scss` and `_ratio.scss` import neither, and only `_button.scss:1` and `_table.scss:1` take `@use '../tokens'` because they read the tokens module's Sass API. None of these three partials does; adding the import would be dead code. Amend `/home/user/veneer-be/tmp/units/b-passive-family.md` ruling 8 to "a partial opens `@layer components` after the `@use` lines it needs", and restate the claim accordingly before the sibling units are audited against the same false conjunct.

Everything else in claim 1 is CONFIRMED on direct source-to-inventory comparison, not on the report. `_placeholder.scss:5-64` emits `tests/fixtures/oracle/inventory.json:1144-1404` selector for selector, declaration for declaration, in the recorded order, less `-webkit-mask-image` and `-webkit-mask-size`; `properties: {}` at `inventory.json:1371` is why `placeholder` owes no variable row. `_spinner.scss:7-16` writes the shared box as one selector list where `inventory.json:602-678` records it as two identical rules — same cascade, and the one-rule form is the better shape. `.progress-bar-animated` takes `animation: none` under `reduced-motion` (`_progress.scss:73-78`); the spinner pair takes `1.5s` with the animation still running (`_spinner.scss:75-80`); placeholder gates neither (`_placeholder.scss:35-37, 49-58`). `src/styles/index.scss:55-57` appends the three after `@use 'components/vr'` with `as progress-component`, which is the same collision-only aliasing `button-component` (line 43) and `table-component` (line 51) already use, and is forced here by `elements/progress` at line 41. `src/styles/elements/_progress.scss` is absent from `/home/user/scaffold/tmp/audit/be-status.txt`, and no partial selector is a bare `progress`.

**2. Token rulings — CONFIRMED, and the claim's cited precedent does not exist in this tree.**

`--bs-progress-bar-bg: var(--vn-palette-blue)` is the **only** binding family ruling 4 admits. `_tokens.scss:162` declares `--vn-palette-blue: #0d6efd`, the recorded byte exactly. `--vn-color-primary-base` resolves to `oklch(0.48 0.255 264)` in light and `oklch(0.7 0.15 233)` in dark (`_tokens.scss:24, 68` through `_mixins.scss:233`) — not `#0d6efd` — so the ceiling ("a token that already resolves to Bootstrap's recorded value") forbids it.

The precedent the claim rests on is not here: a grep for `#0d6efd` across `/home/user/veneer-be/src/styles` returns `_tokens.scss:162` and `_progress.scss:24` and nothing else — `_button.scss` carries no such binding — and there is no RANGE partial (`src/styles/components/` holds `_button _table _image _link _icon-link _vr _ratio _list _type _container _quote _grid _progress _spinner _placeholder`). Correct the claim rather than the code.

The same rule settles the stripe and the wave: `_tokens.scss:172-175` declares `--vn-palette-black-base: #000`, `--vn-palette-black-rgb: 0, 0, 0`, `--vn-palette-white-base: #fff`, `--vn-palette-white-rgb: 255, 255, 255` — all exact, all admissible. `src/styles/_tokens.scss` is absent from the status, so no token was added.

The refusal of `--vn-size-1` and `--vn-space-8` for `--bs-progress-font-size` and `--bs-progress-height` (report § Token reuse) is the right call and the reasoning is the right reasoning: routing a recorded fixed measure through `--vn-factor-density` changes behaviour, not notation. The radius still reaches the track through `--bs-border-radius`, and `progress.test.ts:116-127` reads it.

**3. The proofs — CONFIRMED.**

Ruled on three cases, each with the mutation named and whether the assertions distinguish it:

- `progress.test.ts:95-112` `reads $name on $selector and moves what that variable drives`. Mutation: `.progress-bar` stops reading `--bs-progress-bar-bg` and hardcodes the fill. Distinguished — line 110 writes the override on the track and requires the resolved reading to equal it, which a hardcoded fill cannot produce. The ancestor step (106-108) is a real control, not decoration: it fails if the closure moves off `.progress` onto an inheritable ancestor, which is the shape claim 3 names.
- `progress.test.ts:195-213` `runs the stripe animation each second and stops it under the reduced-motion preference`. Mutation: the `reduced-motion { animation: none }` block is dropped. Distinguished — line 206 requires `getAnimations()` to be empty under the staged preference, and a surviving animation returns length 1. Reading the timeline rather than the declaration also distinguishes the weaker mutation of an animation declared but never started.
- `spinner.test.ts:175-193` `turns the ring a whole circle and grows the disc from nothing`. Mutation: the keyframe is rewritten to a partial or flipped turn. Distinguished — the assertion compares the cascade's own keyframe text (`[['100%', 'rotate(360deg)']]`), and the doc comment states exactly why a resolved transform would not: Chrome serializes several rotations to one matrix string.

The tables are frozen and inventoried, and the bindings are real: `setupStyles.test.ts:936-938` holds `PROGRESS_SELECTORS` against `oracle.components.progress`, `:941-946` holds the variable rows plus `--bs-progress-box-shadow` against the recorded property map, `:970-1002` does the same for spinner including the `em`-factor edges, `:1012-1024` for placeholder with `expect(recorded.properties).toEqual({})`. Each name is in the export inventory at `setupStyles.test.ts:152-165`. See finding **F4** for the one place a case title outruns its assertions.

**4. The showcase and the registry — CONFIRMED.**

The three sections are the `TableSection` grain unchanged (`ProgressSection.ts:12-19` and its twins), fed by frozen rows at `constants.ts:625-732`, constructed after `TableSection` in alphabetical region order at `Showcase.ts:84-86`, and mirrored at that position in `tests/app/browser/Showcase.test.ts:79-82`. No specimen writes an inline style — each width comes from a column class, and `PlaceholderSection.test.ts:56` pins that with `expect(region.querySelector('[style]')).toBeNull()`. Ten scenarios append to `CASCADE_KEYS` (`tests/setup.ts:301-360`) and their subjects are sorted into `CaptureSubject` (`tests/setup.ts:81-98`) with the grow spinners correctly absent.

**D6's measurement holds**, from source rather than from the report: `_spinner.scss:63` declares `opacity: 0` on `.spinner-grow` and `_spinner.scss:44-47` makes `scale(0)` the keyframe's 0% step, so the reset-to-first-step the capture performs leaves a zero-sized, invisible box. No `grow-spinner--*.png` exists under `/home/user/veneer-be/tmp/capture/states/`, consistent with the declination.

**A bordered host is the family's call, and D6 is right to escalate it** — it moves the declared region onto another key's class, which is a family-level decision about what a frame's stem means. One correction for the family: D6 states the option as "if the host is Bootstrap's own documented pairing", which implies a `.btn` and makes the option look costlier than it is. A plain bordered `<div>` supplied by the section's own chrome would give the region a box without adding anything to the Buttons population.

**D10 is right for a specimen the section proof reads.** A placeholder stands in for a label that has not arrived, so `aria-hidden="true"` with no name is the honest announcement and `PlaceholderSection.test.ts:50-54` pins it. I cannot evidence "Bootstrap's documented shape" from this tree — the installed package ships no documentation — so treat that half as unevidenced rather than as ruled; the attribute set is defensible on its own merits. One inertness worth knowing: with `href` dropped, `tabindex="-1"` at `constants.ts:730` changes nothing, because an `<a>` without `href` is not focusable. Keep it or drop it, but say which in the comment. See finding **F3** for the divergence this created with the style fixture.

**5. The accounting — UNRESOLVED.**

What I verified in the tree: the three `placeholder` departure rows at `guides/ledger/departures.md:777-779` with `-webkit-mask-image` and `-webkit-mask-size` as `dropped`; five `progress` rows at `:785-789`; `placeholder`, `progress`, and `spinner` at their sorted positions in the `listed` literal (`tests/conformance.test.ts:116-123`); a `selector` row per key and a `variable` row for `progress` and `spinner` only (`guides/veneer.md:1186-1190`), placed after the `vr` row at `:1185`; the `` `.placeholder.btn::before` `` deferral row gone, with `guides/veneer.md:438` stating why.

**Dropping the prefixed mask aliases is sound and follows the tree's own precedent** — `guides/veneer.md:366-369` rules the same way for `-webkit-backface-visibility`, and `:488` for `::-webkit-file-upload-button`. The ledger's `dropped` member already carries rows of that shape.

What is open: "no addition row" rests entirely on the comparison run the report records, and the claim defers the conformance gate to the Orchestrator's own run. Settled by `npm run build:src && npm run test:conformance` on the integrated tree.

One observation for the objective lane, not a verdict of mine: `guides/veneer.md:461` justifies the drop by "the build's targets", and `vite.config.ts:229` sets `cssMinify: 'lightningcss'` with no declared browser targets anywhere in the checkout. The phrase is pre-existing (`:367`, `:488`) and not this unit's to fix, but it is doing load-bearing work in a ledger row now.

**6. The guide — CONFIRMED.**

`### Progress classes` (`:378`), `### Spinner classes` (`:412`), and `### Placeholder classes` (`:434`) sit in barrel order after `### Helper classes` (`:327`), and each one carries the `### Table classes` shape: what ships, the closure a consumer retunes, the motion ruling, a `These are the key's recorded departures.` list, and the proof's path as the closing line. The § Files rows are at `:192-194`, directly after `_icon-link.scss` at `:191`. The § Showcase paragraph at `:1268-1274` names the three regions and the declined grow-spinner frames. The § Tests stem rows at `:1322-1331` keep the existing rows' voice ("the `X` specimen's own Y").

Prose: a case-insensitive sweep for the substitution table's unconditional rows plus the judged rows (`should|simply|easy|easier|just|currently|utilize|leverage|via|in order to|e.g.|i.e.|etc.|performant|robust|allows you to|and/or|please|dummy|above|below|Once|once|since|latest|newly`) over `/home/user/veneer-be/guides/veneer.md` returns nothing inside `:378-466`. The nearest hit, `once` at `:426`, means "a single time" and is permitted. No count of a growable set; `both` at `:398` names its members in the preceding sentence. Headings are sentence case. No `guides/ledger` path appears anywhere in the file.

The deletion claim is corroborated beyond the report: a pattern for a deleted line beginning with anything other than `-`, `|`, or whitespace over `/home/user/scaffold/tmp/audit/be.diff` returns no match, so every deletion in the whole diff is a table row or a table separator. That bounds the removed content to table lines, and the struck deferral row is the only table line whose content is gone.

**7. The deviations — CONFIRMED, and the claim's D5 correction is itself wrong.**

D2, D3, and D4 are outside the unit's append-only scope as claimed, and D4 reproduces exactly: `tests/app/browser/Showcase.test.ts:102-105` collects every `.btn` in the mounted showcase and compares against `BUTTON_SPECIMENS`, which the `Button placeholder` specimen (`constants.ts:730`) necessarily reddens.

**Rule on D5's patch site: the patch is correct as written, and the claim's proposed relocation is not.** `vite.config.ts` is not vendored by scaffold — it is absent from `/home/user/veneer-be/node_modules/@orkestrel/scaffold/dist/host/**` and unmentioned in that directory's `manifest.json`. It is off-limits under family ruling 13, which is the family's choice rather than a vendoring fact. `appJourney` is *defined* at `vite.config.ts:243-263`, beside `config`'s `testTimeout: 60_000` (`:291`) and `distribution`'s `testTimeout: 120_000` (`:369`), so that is where a project's budget lives in this tree. `configs/app/vite.journey.config.ts` is eighteen lines that supply variants and call `appJourney`, which is exactly the "thin target wrapper" `AGENTS.md` § Project model describes; putting the timeout there splits one project's definition across two files and makes the wrapper carry policy. Leave the patch where D5 puts it. See finding **F5** for the patch comment's prose.

On D4's patch shape, for the family rather than for this unit: appending a bare `''` to `BUTTON_SPECIMENS` names the hidden anchor by its absence and will not survive B-PASSIVE-B adding `.btn-group` hosts. The durable shape is to scope the assertion to the Buttons region's own `.btn` set. D4 says the integrated form is the family's to settle, which is the right escalation.

**8. Scope is honest — CONFIRMED.**

`/home/user/scaffold/tmp/audit/be-status.txt` lists owned and shared paths only. `src/styles/_mixins.scss`, `src/styles/components/_vr.scss`, `src/styles/components/_button.scss`, `src/styles/elements/_figure.scss`, `src/styles/_tokens.scss`, `tests/setup.test.ts`, `tests/setupServer.ts`, `vite.config.ts`, and `configs/**` are all absent from it — so D3's measured mixin patch and D2's and D5's patches really are unapplied. `/home/user/veneer-be/tmp/probe/**` matches no file.

**The D1 substitution did not diverge from design verdict ruling 5.** Reading `/home/user/veneer-be/tmp/units/b-passive-design-verdict.md` ruling 5 against what shipped: one section per key ✓; every specimen a whole-specimen frame with background ✓ (`tests/app/browser/integration.test.ts:610-625` lifts the specimen, not the selector's element); no `-<step>` suffix on any of this unit's scenarios ✓, which is right because none of these three keys paints an interaction state. The "ramps derived from a source list and one `.map`" clause is inert here — no specimen family in this unit is a ramp of specimens the way `TABLE_SPECIMENS` (`constants.ts:590-622`) is, and each of the four specimens per key carries genuinely distinct markup. The `Placeholder ramp` specimen at `constants.ts:714-718` is a ramp of four elements inside one markup string; a `.map` over four entries producing a concatenated string would be more machinery than the literal, and the literal is the plainer read. No divergence.

**9. Gates — UNRESOLVED.**

Every row rests on the writer's own report. Settled by the independent `verifier` run.

## Findings outside the claims

**F1 — `glowing-placeholder` registers a property no rule of its key sets, so the scenario's comparison cannot fail on the glow.**

`tests/setup.ts:343-348` registers `{ scenario: 'glowing-placeholder', selector: '.placeholder-glow', property: 'color' }`. The cascade contains no rule whose selector is `.placeholder-glow` — a grep across `/home/user/veneer-be/src/styles` returns only `_placeholder.scss:35` (`.placeholder-glow .placeholder`) and `:39` (the keyframe). `color` on that wrapper is inherited from the document. The journey's comparison at `tests/app/browser/integration.test.ts:622-623, 634` reads `key.property` on the showcase element and on its clone and requires them equal — for an inherited `color` that holds for any element, glow or no glow. Delete `_placeholder.scss:35-43` entirely and this scenario still passes.

Why it matters: `tests/setup.ts:245` states the registry's own rule — "Each property is one the key's own rule sets" — and every other row obeys it, including all nine of this unit's others (`.progress` / `height`, `.progress-bar-striped` / `background-size`, `.progress-bar-animated` / `animation-name`, `.spinner-border` / `border-right-color`, `.placeholder-wave` / `mask-size`, `.placeholder.btn` / `opacity`, and the rest). One row silently departing from a rule the file states two hundred lines earlier is the kind of drift nothing catches. It is also the only cascade row whose declared property is inherited rather than declared, and the frame corroborates it: `/home/user/veneer-be/tmp/capture/states/glowing-placeholder--light-1280.png` shows a flat uniform grey bar with no glow visible, because the capture resets the infinite animation to its first step — the same mechanism D6 used to decline the grow spinners.

What right looks like: `{ scenario: 'glowing-placeholder', subject: 'Glowing placeholder', selector: '.placeholder-glow .placeholder', property: 'animation-name' }`. That selector resolves through `frame.querySelector` in the lifted copy, and `animation-name` is set by the key's own rule and moves the moment the glow stops shipping — the same shape `animated-progress` already uses at `tests/setup.ts:313-318`.

**F2 — `guides/veneer.md:1189` claims more than the cascade does, and the tree's own comment says so.**

The row reads "Every official `--bs-spinner-*` custom property is declared on each spinner". `.spinner-grow` declares `--bs-spinner-width`, `-height`, `-vertical-align`, `-animation-speed`, and `-animation-name` (`_spinner.scss:55-64`) and does not declare `--bs-spinner-border-width`; only `.spinner-border` declares all of them (`_spinner.scss:26-36`). `tests/setupStyles.ts:2863-2864` states the fact plainly — "`.spinner-border` … is the one name declaring all of them: the grow spinner paints no border" — so the guide and the test fixture disagree about the same cascade, with the guide taking the wider claim.

Why it matters: `.claude/rules/writing.md` § Claims and time requires claiming only what the reader can check, and a § Compatibility row is the ledger a consumer reads to decide what to retune. `scanCompatibilityPresence` reads the Component and Kind cells, never the sentence, so nothing else catches this.

What right looks like: "Every official `--bs-spinner-*` custom property ships, each on the spinner that declares it, and the reduced-motion preference retunes the speed property; both are proved in `tests/src/styles/components/spinner.test.ts`."

**F3 — the button placeholder ships in two different shapes, each documented as the release's own.**

`app/browser/constants.ts:730` renders `<a class="btn btn-primary disabled placeholder col-4" tabindex="-1" aria-hidden="true">`, and its remark at `:710-711` says the specimen "is hidden from assistive technology and kept out of the tab order rather than announced as an unnamed control". `tests/setupStyles.ts:3003` renders the same concept as `<a class="btn btn-primary disabled placeholder col-4" href="#loading" role="button" aria-disabled="true" aria-label="Loading action">`, and its remark at `:2996-2997` says that markup "is the markup the release's own button placeholder carries". Both rationales claim release fidelity for incompatible attribute sets, and D10 ruled one of them a defect while the other shipped unchanged in the same commit.

The style proof reads only the `::before` box (`placeholder.test.ts:71-80`), so nothing breaks. That is why it matters: two shapes for one concept, each with an authoritative-sounding sentence, and no gate that can tell them apart. `AGENTS.md` § Design laws, "One concept, one term".

What right looks like: bring `PLACEHOLDER_MARKUP` to the shape D10 settled (`tabindex="-1" aria-hidden="true"`, no `href`, no `role`, no `aria-label`) and make its remark state D10's reason rather than a release-fidelity claim. If the fixture must keep an announcing control to exercise something, say what — and then only one of the two remarks may claim release fidelity.

**F4 — three case titles claim a completeness their assertions do not test.**

`progress.test.ts:34`, `spinner.test.ts:33`, and `placeholder.test.ts:31` are each titled `writes every recorded selector into the components layer and no name beyond them`. The second half is untested. Each case asserts that the key's recorded list is a subset of the layer's selectors, then that one hand-picked non-member is absent (`.progress-vertical`, `.spinner-ring`, `.placeholder-xl`). Nothing enumerates the layer's own `.progress*`, `.spinner*`, or `.placeholder*` names and compares them back against the list, so a partial that gained `.progress-vertical-bar` passes all three.

Bounding it: this is a title defect, not a coverage hole. `tests/conformance.test.ts:128`'s `scanCompatibilityPresence` and the addition-ledger comparison do report an extra name, so the cascade is guarded elsewhere. The cost is that a reader — and the next round's auditor — reads the title as the guarantee. The doc comment above each one is honest about what it does; the title is not.

What right looks like: rename to `writes every recorded selector into the components layer`, and leave the absent-name assertion as the lookup's control the doc comment already calls it. Or, if the completeness reading is wanted here, add the complement: filter `written` for names carrying the key's class prefix and require the difference against the recorded list to be empty.

**F5 — D5's patch comment writes a temporal `once`, which the substitution table bans.**

`/home/user/veneer-be/tmp/units/b-passive-e-report.md:667` (the `vite.config.ts` patch body): "the walk measured 10.0s against the Table-era surface and 15.9s once the passive component regions landed". `.claude/rules/writing.md` § Substitutions replaces temporal `once` with `after`. The patch is meant to be applied verbatim by whoever owns `vite.config.ts`, and `policy/no-banned-term` reads every comment, so this lands as a red gate on the unit that applies it.

What right looks like: "… and 15.9s after the passive component regions landed."

## Attacked and held

- **The tokenizing ceiling.** I attacked `--bs-progress-bar-bg` from the direction the claim invited — that a role token would be the better binding — and it holds: `--vn-color-primary-base` resolves to an `oklch` value, not `#0d6efd`, so ruling 4 forecloses it and the departure row records the palette binding honestly.
- **The `progress-component` alias.** I attacked it as gratuitous and it holds: `elements/progress` occupies the namespace at `src/styles/index.scss:41`, and `button-component` and `table-component` are the same collision-only pattern. The design verdict's refusal of a blanket `-component` suffix is the right call and this is the one exception that earns it.
- **The variable cases' ancestor control.** I looked for the shape where the ancestor step passes for the wrong reason — an override on a property the component does not declare, which would move and defeat the shadow reading. Every row in `PROGRESS_VARIABLE_CASES` (`setupStyles.ts:2777-2827`) and `SPINNER_VARIABLE_CASES` (`:2868-2905`) names a property the component itself declares, and `setupStyles.test.ts:953` and `:981` pin that against the inventory. Correct.
- **Adjacent behaviour that looks like F1 and is not.** `small-border-spinner` registers `.spinner-border-sm` / `width`, and `width` is written by the shared box rule rather than by `.spinner-border-sm`. That row is fine: `.spinner-border-sm` declares `--bs-spinner-width` (`_spinner.scss:38-42`), so the property moves when the key's own rule moves. F1 is different in kind — nothing about the glow reaches `color` at all.
- **The `Placeholder ramp` specimen's literal markup.** I attacked it against design verdict ruling 5's "ramps derived from a source list and one `.map`" and it holds: the ruling governs ramps of specimens, and this is a ramp of elements inside one specimen. The literal reads better than a four-entry `.map` producing a concatenated string.
- **The frames the brief named.** `striped-progress--light-1280.png` shows the 45-degree white stripes over the blue fill against the grey track; `waving-placeholder--light-1280.png` shows the mask gradient across the bar, lighter left to darker right. `border-spinner--light-1280.png` shows the ring with its open edge — the rotation itself is not a still-frame claim and is carried by `spinner.test.ts:143-170` instead. `glowing-placeholder--light-1280.png` shows the bar and no glow, for the capture-reset reason F1 records.

## Referral to the objective lane

- **Family ruling 8's `@use` wording** (claim 1). I ruled the design; whether the ruling as written is a binding mechanical requirement the unit was obliged to stop and report on is conformance, not taste.
- **`guides/veneer.md:461`'s "the build's targets"** (claim 5). `vite.config.ts:229` declares `cssMinify: 'lightningcss'` with no browser targets in the checkout, so the phrase names a set nothing in the tree defines. Pre-existing at `:367` and `:488`; worth a ruling on whether a `dropped` ledger row may rest on it.
- **`placeholder.test.ts:74, 90, 139`** select the bare placeholder with `host.querySelector('p > .placeholder')`, which also matches the button specimen at `setupStyles.ts:3003` and resolves correctly only because document order puts the bare span first. Selector fragility, not design fit.

VERDICT: FAIL 1, 5, 9; outside the claims: F1, F2, F3, F4, F5
