I held the **subjective lane**: shape, vocabulary, ergonomics, and design fit. I read the brief, `.orkestrel/scaffold/evidence.md`, both subject skills with every reference they name, `orkestrel-polish-surface/references/capture-harness.md`, the binding rule files, `form/src/core/types.ts`, `test/src/browser/types.ts`, and the `probe` guide sections on claims and the runtime overlay.

# Design

## The ruling that shapes everything else

**A skill states the property and the control that proves an instrument can fail. A package states the instrument.** `enterprise-bootstrap` already tried the other way, and the evidence shows the cost: `layer.md` opens "Implement the signatures below … never copy them as source" while `@orkestrel/test` 0.0.11 publishes every signature it lists. A skill that spells out an algorithm becomes a second implementation that drifts from the first. Every mechanism this round adds goes into `@orkestrel/test/browser`; every skill line names it and says what it settles.

The skill-directory law makes this the only legal shape anyway: a skill holds `SKILL.md`, `agents/openai.yaml`, and the `references/*.md` files `SKILL.md` names, so a bundled tool has nowhere to live.

## The split between the two skills

Keep both, keep their charters, and split by what the reader holds in hand.

| Skill | Owns | Stays |
| --- | --- | --- |
| `enterprise-bootstrap` | What to draw, and what must be true of the markup | Portable: no Orkestrel package name, no rule-file binding, no stack assumption |
| `orkestrel-prove-journey` | How the browser proves it, and which published helper reads it | Orkestrel-bound: names `@orkestrel/test/browser` and the workspace rules |

That split gives each rule one home. The property "no authored class lacks a rule in the shipped cascade" lives in `enterprise-bootstrap`. The sentence "read it with `readClasses` against `readCascade`" lives in `orkestrel-prove-journey`. Neither restates the other.

## Vocabulary

- **`control`** is what a schema declares. **`affordance`** is what gets drawn. They are two concepts, not synonyms: one `select` control draws as a `form-select` menu, a segmented `btn-group`, or a radio list, and the density decides. Naming both `control` is what forced `taverna` to declare its own `FieldControl` in `app/browser/types.ts` beside the package's.
- **`state`** keeps one meaning across the campaign: the condition a surface is in. A statechart's `from` and `to` are states, a capture registry name is a state, and ideal / empty / loading / partial / error are states. No rename is needed; state it once and stop alternating with "condition" or "mode".
- **`transition`** is the statechart's edge, and the scenario is named for it. This is already the `elements` and `veneer` contract.
- **`variant`** is one value carrying theme and viewport together, already `CaptureVariant` in the package. It becomes the single run axis for every artifact, not only captures.
- **`instrument`** is the only noun for a check. Drop "check" and "inspection" as nouns; `.claude/rules/quality.md` § Instruments already owns the word and its negative-control law.

## `enterprise-bootstrap`: what changes

### New reference `references/inputs.md` — the affordance catalog

Keyed by what a person is being asked for, not by any package's type union, so the skill stays portable. Each row carries the default affordance, its Bootstrap markup, its alternates and when density earns them, and the states it must handle.

The categories, which cover every `FieldControl` member plus what Bootstrap ships no component for: one line of text; text over many lines; a secret; a number; a number in a bounded range; a date; a time; a date and time; a color; one on/off answer; one of a few; one of many; one of many with an unlisted value admitted; any of a few; any of many; files; a value picked from a searched list; an ordered set of tags; a rating; a progress-bearing sequence.

Each row's state set is fixed and identical, so a model can check a drawn affordance against one list: rest, hover, focus-visible, disabled, locked, invalid, busy, and — where the value is a set — empty and full. The data states (ideal, empty, loading, partial, error) stay where they already live in `bootstrap-reference.md` → The data states, and `inputs.md` points there rather than repeating them.

Where Bootstrap ships no component, the row carries the APG pattern the hand-roll owes and the class contract the affordance publishes, drawn from `mailbox`'s `.date-picker`, `.date-cell`, `.dropzone`, and `.upload-zone` pages. The native-first ladder is not repeated: `bootstrap-reference.md` → When Not to Hand-Roll already owns the decision, and `inputs.md` owns the drawn result.

Two findings from `taverna` become rules, because both are the kind a model rediscovers the expensive way:

> Keep a read-only field on the same affordance as its editable form, with `readonly` or `disabled` plus a transparent chrome combination. Never swap to `form-control-plaintext`: it drops horizontal padding, so the view and the edit states reflow against each other.

> Give a chosen filter an accent variant rather than the neutral outline. A `btn-outline-secondary` label reads as chosen in light and as muted in dark.

### New reference `references/inspection.md` — the instruments and their controls

Each instrument is stated as: the property, the population it walks, the reading that settles it, and the negative control drawn from outside that population. No API name, no algorithm.

The instruments this round adds to the existing composited-contrast, authored-class, and one-glyph-one-meaning set:

- **Class combinations.** A pair of classes whose declarations cancel is a defect, not a style. Control: a pair known to cancel.
- **Winning origin.** For every property the design depends on, the declaration that won comes from a stylesheet rule, never from a `style` attribute and never from a `<style>` block. Control: an element carrying an inline declaration.
- **Utility hacks.** A utility class whose declaration a later authored rule overrides is a hack; the utility is doing nothing and the reader believes it is. Control: a utility deliberately overridden.
- **Token discipline.** Every color a rule resolves traces to a `--bs-*` token or a `color-mix()` over one. Control: a literal hex.
- **Population floor.** Every instrument reports the population it walked, and fails on an empty one. An extractor that quietly matched nothing passes every other assertion.

The `SKILL.md` "Mechanical proof" block shrinks to a pointer at this reference and the production checklist gains one line naming it.

## `orkestrel-prove-journey`: what changes

### `references/layer.md` becomes a consumption contract

Delete "Implement the signatures below as a contract in the workspace's browser test setup module." Replace with the import rule and the failure-voice table, which is the part a reader actually needs at the moment a target stops resolving:

> Import every journey helper from `@orkestrel/test/browser`. Write a helper of your own only where that package publishes none for the act, and name the act it performs.

The verb tables stay, re-pointed at the published names. The role-vocabulary section stays verbatim: it is diagnosis, not implementation.

### New reference `references/styles.md` — proving what the browser resolved

Owns the answer to "styles that are truly generated and applied on the browser". The rules a reader needs:

> Assert the resolved value, never the class list. A class present in the markup and absent from the cascade resolves to nothing, and a class-list assertion passes on it.

> Run every style assertion once per variant. A pairing that passes light routinely fails dark, and a target that clears 24×24 px wide fails narrow.

> Read a contrast pairing through the composited layers. An assertion against a translucent surface measures the surface, not what a person sees.

> Pair every style instrument with a control that must read under the bar, in the same run. `terrain/tests/app/browser/styles/tokens.test.ts` already carries one, and its luminance math is now published.

### New reference `references/statechart.md` — the run a person watches

The transition table is the source of truth and has two consumers: the automated run that asserts it, and the harness a person watches. Both read one table.

> Declare each transition as its name, its `from` state, the event, and its `to` state. Write one scenario per transition with its arrange, act, and assert.

> Mount the harness on the same table. Give it a play control per transition, a play-all control, a state badge, an event log, and a `role="status"` announcer, and publish its outcome on the stage element so a run can poll it.

> Give the harness a demo step that leaves the widget in its most legible state, for a person or a vision model deciding on a look.

> Deep-link one transition and the play-all run from the route, so a decision round names the exact link it wants looked at.

That is `elements/app/browser/playgrounds/StatechartHarness.vue` stated as a contract. Its automated proof — mount, play all, poll, assert zero failures — is `elements/tests/app/browser/playgrounds.test.ts` and becomes the acceptance line.

### New reference `references/decide.md` — the fast loop

Routes a question to the cheapest instrument that can answer it.

> Route the claim by what judges it. A claim a compiler or a Node runner judges goes to the `prove` tool with its case, its control, and the stage the control must break at. A claim a person's eye judges goes to a rendered artifact: a capture, a statechart harness link, or a resolved-style matrix.

> Never ask `prove` about pixels and never ask a screenshot about types. An instrument answering an adjacent question returns a confident wrong answer.

> Name the artifact by its variant, so a decision cites the exact file.

### `SKILL.md` rewrite

Keep the journey laws. Add the run axis and the acceptance lines for the new evidence:

> Read one `variant` value at run start and let it choose the theme, the viewport, and the capture destination together. Never split them: a split lets a run write a filename describing a combination it did not render.

> Run the suite once per variant to produce the portfolio, the style matrix, and the statechart outcome for that variant.

## `@orkestrel/test/browser`: the additions

Three names, each with existing consumers, each fitting the published `read*` and `run*` families:

- **`runScenarios`** with `StateTransition` and `StateScenario`. Today duplicated verbatim in `elements/tests/setup.ts` and `veneer/tests/setup.ts` with two different call signatures. Consolidating fixes the drift and closes the statechart reference's mechanism.
- **`readClasses`** — every class token the markup uses, with the population it walked. Pairs with the published `readCascade`, which returns every token the stylesheets define; the instrument is the set difference and the population floor comes free.
- **`readOrigin`** — for one element and one property, the declaration that won and the authored rules it beat. One reader answers the `style`-attribute question, the `<style>`-block question, and the utility-hack question, which are the same question about origin.

Consumers exist for each before the addition, so the minimal-public-API creation gate is met rather than speculated past.

# Alternatives

**A third skill owning inspection.** Split the instruments into `orkestrel-inspect-markup`, leaving `enterprise-bootstrap` on craft and `orkestrel-prove-journey` on journeys. It reads cleanly on paper. It loses because the inspection work never happens on its own: a model is either building (and wants the property beside the markup rule that produced it) or proving (and wants the reader beside the assertion). A third skill puts the instruments where neither reader is, and adds a third trigger description competing with two that already overlap. The proposed design gets the same separation from the property/mechanism split without a third discovery surface.

**Prose-only: no package additions.** Write every instrument as a described procedure in the references and let each workspace implement it. It loses on the evidence already in hand: the journey layer went that way, every workspace implemented it, the package then published the same signatures, and the skill now contradicts itself. `terrain` writes luminance math inline twice; `elements`, `veneer`, and `mailbox` each redeclare `mount`, `render`, `style`, and `token`. A described instrument is an instrument with no negative control anybody ran.

# Units

Every unit is a writer in the main checkout, serialized, disjoint files. The Codex bench is dark, so units whose work class is objective run on Opus `implementer` with the substitution recorded in the routing ledger.

**U1 — Affordance catalog.** Role `implementer`, engine Opus 5.
Owns `.agents/skills/enterprise-bootstrap/references/inputs.md`.
Depends on the `absorb-inputs` Grok slice.
Accepts when: every category listed in the Design section has a row; every row names its default affordance, its markup, and its state set; every hand-roll row names its APG pattern; no Orkestrel package name appears in the file; `npm run format:check` clean on the file.

**U2 — Instrument discipline.** Role `implementer`, engine Opus 5.
Owns `.agents/skills/enterprise-bootstrap/references/inspection.md`.
Depends on nothing.
Accepts when: every instrument names its property, its population, its reading, and a control drawn from outside that population; no function name from any package appears; the file states the population-floor rule once.

**U3 — Package additions.** Role `implementer`, engine Opus 5 (objective class; Sol bench dark, substitution recorded).
Owns `test/src/browser/{types.ts,helpers.ts,index.ts}`, `test/guides/test.md`, `test/tests/src/browser/*`.
Depends on an ecosystem reuse audit against the published surface and against `elements/src/browser/inspector/`.
Accepts when: `readClasses`, `readOrigin`, `runScenarios`, `StateTransition`, and `StateScenario` are declared in `types.ts` before implementation and exported from the browser barrel; each has a test asserting a failing case and a passing case; the guide documents each and `tests/guides.test.ts` passes; `elements` and `veneer` each drop their duplicate declaration in the same change; no existing export is renamed.

**U4 — Layer reference becomes a consumption contract.** Role `implementer`, engine Opus 5.
Owns `.agents/skills/orkestrel-prove-journey/references/layer.md`.
Depends on U3.
Accepts when: the file names no signature the package does not publish; the "implement these signatures" instruction is gone; the failure-voice table and the role-vocabulary section survive unchanged; the added-helper rule names the narrow case that permits one.

**U5 — Journey skill's new references and rewrite.** Role `implementer`, engine Opus 5.
Owns `.agents/skills/orkestrel-prove-journey/SKILL.md`, `references/styles.md`, `references/statechart.md`, `references/decide.md`, `references/captures.md`.
Depends on U3, U4.
Accepts when: `SKILL.md` names every file in `references/` and no file there is unnamed; `SKILL.md` stays under 500 lines; the `variant` run axis is stated once and nowhere restated; the acceptance list gains the style-matrix, statechart-outcome, and portfolio lines; `captures.md` names `createPortfolio` rather than prescribing a hook.

**U6 — Bootstrap skill routing and checklist.** Role `implementer`, engine Opus 5.
Owns `.agents/skills/enterprise-bootstrap/SKILL.md`.
Depends on U1, U2.
Accepts when: the layer table lists `inputs.md` and `inspection.md`; the Mechanical proof block is a pointer with no restated instrument; the forms section points at `inputs.md`; the production checklist names the input catalog and the instruments; the file stays portable, naming no Orkestrel package.

**U7 — Control-to-affordance crosswalk.** Role `implementer`, engine Opus 5.
Owns `form/guides/form.md`.
Depends on U1.
Accepts when: each `FieldControl` member maps to one catalog category; the concept inventory's presentation-hint row cites the crosswalk; `form`'s `tests/guides.test.ts` passes; no affordance markup is copied into the guide.

**U8 — Polish-surface evidence row.** Role `builder`, engine Sonnet.
Owns `.agents/skills/orkestrel-polish-surface/references/capture-harness.md`.
Depends on U5.
Accepts when: the portfolio table gains a statechart-outcome row naming what the artifact must show; no instrument is described there; the file's existing rows are unchanged.

**U9 — Skill-shape conformance.** Role `checker`, engine Grok (ladder step recorded).
Owns nothing; reports.
Depends on U1, U2, U4, U5, U6, U8.
Accepts when: it reports, with paths, that each skill directory holds only `SKILL.md`, `agents/openai.yaml`, and named `references/*.md`; every reference is named from its `SKILL.md`; frontmatter carries only `name` and a `description` with a `Use ` sentence; each `.claude/skills/<name>/SKILL.md` bridge carries its canonical twin's `name` and `description` verbatim.

**U10 — Gates and vendored inventory.** Role `verifier`, engine Sonnet.
Owns nothing; runs and reports.
Depends on every preceding unit.
Accepts when: `format:check`, `lint:check`, `check`, `build`, and `test` are reported with their real output in `scaffold`, `test`, `form`, `elements`, and `veneer`; every new skill file appears in `scaffold/host.json`; the report names the scaffold bump and the fleet `repair` visit the skill edits oblige.

# Tensions

**1. Where does the new material live?**
Options: inside the two existing skills with mechanisms published in `@orkestrel/test` (cost: a scaffold bump and a fleet `repair` visit, plus a `test` release the consuming packages re-pin); a third skill (cost: a third trigger description competing with two overlapping ones, and instruments sitting where neither reader is); skills only, no package code (cost: every workspace reimplements each instrument, and the `layer.md` contradiction repeats).
Recommendation: the first. The package release is the cheap part; the drift is the expensive part, and the evidence already shows it happening.

**2. Does the `FieldControl` crosswalk go in `enterprise-bootstrap` or in `form/guides/form.md`?**
Options: in `inputs.md` (cost: a portable skill now names an Orkestrel type union and must be edited whenever `FieldControl` changes, which erodes the documented naming exception); in the `form` guide (cost: a model rendering an Orkestrel form must open two documents, and the crosswalk is a package edit outside the skills campaign).
Recommendation: the `form` guide. `form/guides/form.md` already parks presentation hints in its concept inventory, so the row has a home waiting, and the skill keeps the charter its name depends on.

**3. How large is the package addition?**
Options: `readClasses`, `readOrigin`, and `runScenarios` (cost: three new exports, three new guide sections, three new test files); `runScenarios` alone, leaving the inspection instruments as prose (cost: the class and origin instruments get reimplemented per workspace, which is the failure this round exists to stop); no addition (cost: as in Tension 1).
Recommendation: all three. Each has a consumer today — `elements` and `veneer` for the runner, `terrain`'s cascade test for the class census, `taverna`'s transparent-chrome combination for the origin reader — so none is speculative.

**4. Does the statechart harness ship as published code or stay a per-repo component?**
Options: stay per-repo, contracted by `statechart.md` (cost: `elements` has one and the next application rebuilds it); publish a harness component from `@orkestrel/test/browser` (cost: the package acquires a Vue dependency and a rendered surface, which is a much larger commitment than a test helper and puts framework choice inside a test package).
Recommendation: stay per-repo. Publish `runScenarios` and the transition types, contract the harness in prose, and let each application own its own stage. The table is the reusable part; the stage is presentation.

**5. What shape do the run options take?**
Options: one `variant` value carrying theme and viewport, reused for captures, style matrices, and the statechart run (cost: a full portfolio needs one run per variant, so wall-clock scales with the matrix); separate theme, viewport, and capture switches (cost: a run can write a filename describing a combination it never rendered, which `captures.md` already refuses for good reason).
Recommendation: one `variant` value. Keep the existing law and extend its reach rather than inventing a second axis.

**6. Does `enterprise-bootstrap` keep its portable charter?**
Options: keep it (cost: the skill can never name a published instrument, so a model needs both skills open for an Orkestrel surface); bind it to Orkestrel (cost: it loses the documented naming exception, gets renamed into the namespace, and stops being usable in the non-Orkestrel projects it was built for).
Recommendation: keep it. The property/mechanism split delivers the material without the rename, and the second skill is already loaded whenever the surface is Orkestrel's.

**7. Does the custom-CSS rule admit a sanctioned exception?**
Options: keep "rung 4 is the developer's call, propose and never take" (cost: a model meeting a genuine vendor gap — the focus ring under 3:1 that `terrain` fixed, the `form-check` color variant `lloyds` wrote — stops and asks, every time); admit a named exception for a rule that only restores a bar the vendor cascade misses, written over tokens (cost: the exception is a door, and a model with a door will find reasons to use it).
Recommendation: admit the exception, bounded by its proof. Permit an authored rule only where an instrument in `inspection.md` reports the vendor cascade failing a stated bar, and require the rule to cite that reading. The gate is evidence, not judgment, so the door only opens where the measurement already opened it.

**8. Is the statechart run required acceptance evidence?**
Options: required for every surface with interactive state (cost: every application owes a harness and a transition table before it can accept); required only where a review round asks a person to decide on a look (cost: the tables get written late, after the surface is already built, which is when they are least useful).
Recommendation: required for every surface whose controls carry state a journey drives, and offered — not required — where the surface is static. The table is cheap when written beside the component and expensive when reconstructed later.

# Risks

- **The `prove` runtime stage against a browser project is unproven.** `probe/src/server/helpers.ts` infers `<axis>:<environment>` from `tests/{src,app}/<environment>/**`, and every fleet `vite.config.ts` composes `probe` with `browser: { enabled: false }`. If the overlay serves a browser project, `decide.md` gains a browser-claim door and a worked example. If it does not, `decide.md` states the limit and routes every browser claim to a rendered artifact. Only that reference's routing table changes either way; nothing else in this design depends on the answer. Evidence needed: the `absorb-tooling` Grok slice, or a throwaway claim naming a `tests/app/browser/` test path.
- **The Grok absorption slices have not returned.** `inputs.md` rests on the `mailbox` page class contracts and the `taverna` affordance decisions being what the evidence file records; `statechart.md` rests on the two `runScenarios` signatures differing only in argument order. Both are read from the evidence file rather than first-hand. Evidence needed: `absorb-inputs` and `absorb-tooling`.
- **`readOrigin` may duplicate work the platform already does.** `getComputedStyle` reports the winning value, not the winning rule, and the published `readRules` and `findRule` read stylesheets rather than winners — so the gap looks real. It is not yet proven that a correct implementation is possible without a second CSS parser, which `AGENTS.md` forbids. Evidence needed: a probe resolving one property's winning declaration through `CSSStyleDeclaration` and `matches` over the loaded sheets, run before U3 is briefed.
- **Skill length.** `orkestrel-prove-journey/SKILL.md` gains a run axis, a statechart acceptance line, and a decision-routing pointer while `enterprise-bootstrap/SKILL.md` gains routing to two references. Both must stay concise, and the reference count on the journey skill grows past what a reader scans. Evidence needed: the line counts after U5 and U6, read before U9 rules on shape.
- **Every skill file is vendored.** `scaffold/host.json` ships `.agents/skills/**` as `dist/host`, so this campaign obliges a scaffold bump, a publish, a re-pin in each target, a `repair` visit, and a gate run per target. That cost falls outside the two-skill scope and needs the user's decision before U10's report becomes a release. Evidence needed: the catalog table `scaffold catalog` regenerates, read at release time rather than from the tree.
- **The property/mechanism split can drift into duplication.** `inspection.md` states the class-census property and `styles.md` states the reader that answers it. Nothing mechanical stops a later edit from restating either in the other. Evidence needed: a `checker` sweep in U9 asserting that no instrument's property sentence appears in both skills.
