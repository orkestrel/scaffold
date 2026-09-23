# Decisions D2 to D10 — the user's rulings, 2026-09-22

The user's message, verbatim, and the Orchestrator's reading of each ruling. The roadmap's
§ Decisions and § Carriers take these when the Veneer checkout frees (F4 is its writer at the time
of writing); until then this record is the ruling's home.

## Verbatim

> D2 approved, the aim is to make bootstrap and tailwind as compatible, favoring bootstrap.
> D3 we'll eventually make a vue adapter for the JavaScript we come up with to replace bootstrap
> JavaScript but we will have a src/vue instead since we will treat vue as a service with a
> separate export, no dependency at all and it leaves it up to the user to pull vue in when they
> decide to import from there.
> D4 not sure I understand what it is, get rid of it if it is superfluous.
> D5 get rid of any RTL, no plans to support.
> D6 provide more information on this, we should keep all of bootstrap utilities and we're adding
> tailwindcss utilities as well and favoring bootstrap on conflict.
> D7 no aliasing, nothing superfluous, no backwards compatibility, wrappers, deprecations, etc when
> it comes to veneer, just compatibility with bootstrap and tailwindcss as I have described
> before, all else is greenfield and meant to be broken to fix for a proper foundation.
> D8 not sure the issue.
> D9 approved.
> D10 approved, let me know when you need the OTP code.

## Rulings as read

- **D2 (Tailwind tooling).** Approved. `tailwindcss` and its PostCSS plugin are development
  dependencies for the profile proofs; the Orchestrator installs them as a tracked command when F8
  opens. The product aim: Bootstrap and Tailwind compatible, Bootstrap favoured on conflict. F8's
  design round takes that aim as its brief.
- **D3 (Vue).** Later, as a `src/vue` environment with its own package export
  (`@orkestrel/veneer/vue`), no declared dependency of any kind; the consumer supplies Vue when
  importing from that entry. Replaces the injected-adapter recommendation. E-VUE's description and
  the workspace environments change accordingly when E-VUE opens; nothing lands before then.
- **D4 (Delegate refusals).** The refusal of `disabled`, `.disabled`, and `aria-disabled="true"`
  hosts is a Veneer addition over Bootstrap's data API, which toggles whatever host the delegated
  click reaches and leaves refusal to the cascade's `pointer-events: none`. Under the baseline
  ruling it is superfluous: remove it, match Bootstrap, and record no departure. Carrier: F6
  FOUNDATION (the engine change and the Delegate proofs), with the guide's engine rows.
- **D5 (RTL).** No right-to-left support. Remove the `index.rtl.css` emission and its plugin, the
  proofs that read the twin, the guide's direction sentences, the Bootstrap RTL artifact digest
  pin, and the inventory's `rtl` fields at the next inventory regeneration. Carrier: F6 FOUNDATION
  for the emission, plugin, proofs, and guide; F5b ACCOUNTING-LEDGER for the digest and the
  inventory fields.
  Open question for the user (D11): the cascade is written in logical properties
  (`margin-inline-start` where Bootstrap writes `margin-left`), which was chosen for direction
  neutrality and is a systematic departure from Bootstrap's declarations. With RTL out, revert to
  Bootstrap's physical declarations (recommended, because it shrinks the departure surface and
  favours Bootstrap), or keep the logical form as a recorded departure.
- **D6 (important utilities).** Keep every Bootstrap utility with its `!important`, exactly as
  Bootstrap ships it; document in the guide that a consumer overrides one with its own
  `!important`; and rule the Tailwind conflict Bootstrap's way: where a class name exists in both
  (`.container`, `.border`, `.rounded`, `.shadow`, `.collapse`, `.visible`, `.invisible`,
  `.text-center`, and the like), Bootstrap's declaration wins. The mechanism (layer order, or
  Bootstrap's `!important` where it already carries one) is F8's design question. Carriers: F6
  FOUNDATION states the contract and the escape in the guide; F8 TAILWIND proves the conflict rule.
- **D7 (aliases and the older highlight pair).** Remove the older highlight token pair and every
  token whose only job is to alias an earlier Veneer name. Read narrowly: the retained `--bs-*`
  variables are the Bootstrap contract itself, not aliases, and stay. Carrier: F5c TOKENS-TRUTH.
  The general rule (no alias, no wrapper, no deprecation, no compatibility shim inside Veneer;
  compatibility means Bootstrap and Tailwind only) binds every later unit and is already
  `AGENTS.md` law.
- **D8 (toolchain majors and the pool pin).** The registry serves later majors of
  `@vitest/browser-playwright`, `typescript`, and `vitest` than the tree pins, and the vendored
  Vitest config pins `pool: 'forks'`. The question was whether to move them inside this campaign.
  Read as: leave them outside it, per the recommendation; X-EXIT records the exclusion.
- **D9 (the prune).** Approved for the set the prune record presents at X-RETENTION.
- **D10 (the Test release).** Approved: T1 TEST-SCOPED and T2 TEST-FORCED-COLORS in one release,
  on a session branch pushed to `main` at the window, published on the user's one-time code, which
  the Orchestrator asks for when the window opens.

## Routing ruling, 2026-09-22 (later the same day)

> Continue your work, for now, do as much as you can with Opus when it comes to implementation,
> ease off of Astra unless you really need it for the adversarial and objective runs. Also do some
> work on your end, I want you to also get into implementation where it needs the extra white
> glove treatment to get everything just right.

As read: every implementation unit after F4 routes to `opus` on native Opus 5, or to the
Orchestrator itself where precision on a small surface justifies it; a part the Orchestrator
writes is briefed, owned, and audited like any other, with `analyst` on Astra as its objective
auditor. Astra keeps the objective audit lane of every round (the engine that did not write the
work) and the objective design lane of every design round. F4 round 3, already running on Astra
when the ruling arrived, runs to completion and is audited with `reviewer` on Opus holding the
objective lane. The roadmap's § Routing and the unit table take this when the Veneer checkout
frees.

## D11 ruling, 2026-09-22 (later the same day)

> D11 approved, revert to bootstrap

As read: the cascade reverts every logical property to the physical property Bootstrap 5.3.8
writes (`margin-left` where the cascade wrote `margin-inline-start`, `width` and `height` where it
wrote `inline-size` and `block-size`, the physical radius corners, `text-align: left`); the
direction machinery in the styles setup module (the physical-longhand and side-keyword tables and
their scanners) and the proof that forbade physical inline-axis declarations go with it, because
D5 removed the writing direction they served; every proof reads the physical property; the guide's
direction sentences and the image row say physical. The revert is one unit, F5d PHYSICAL, on
`opus`, sequenced after F5a and before F5b so the ledger measures the reverted cascade and needs no
logical-to-physical map.

## D12 ruling, 2026-09-22 (later the same day)

> Where did setupCases and setupCalibration come from? I think you went off the reservation there,
> you need to stick to what scaffold propagates and what we have as conventions as per
> AGENTS.md/CLAUDE.md and their folders and files, read them again thoroughly if you forgot. Only
> thing different that was blessed was the new styles surface and what we have for the future
> which would be the vue service.

As read: the root `tests/` setup modules are the set `.claude/rules/tests.md` fixes by
environment — `setup.ts`, `setupBrowser.ts`, `setupServer.ts`, `setupStyles.ts` — plus the
vendored `setupPolicy.ts`, and nothing else; the styles surface and a future `src/vue` environment
are the only blessed departures from what scaffold propagates. `tests/setupCases.ts` and
`tests/setupCalibration.ts` (F5a's split, the Orchestrator's own decomposition, not a convention)
fold back into `tests/setupStyles.ts`; `tests/setupConformance.ts` (Node-only helpers from an
earlier round) becomes `tests/setupServer.ts`; `tests/setupListeners.ts` (a load-time fixture)
moves under `tests/fixtures/`. The correction is one unit, F5e SETUP-CONVENTION, on `opus`,
sequenced before F5d; the queued briefs that name the retired modules are rewritten after it lands.

## D13 ruling, 2026-09-22 (later the same day)

> Continue, quick changes, instead of Opus 5, use the new Opus 5.5. Also, update scaffold and the
> agents where you can find them in the dot files as well as AGENTS.md and CLAUDE.md, we need to
> bump the versions of agents, going forward Grok should be 4.7, Opus at 5.5 and Sol should be gpt
> 6 Astra.

As read: the engines are Opus 5.5 (reached through the `opus` alias the Claude bridge fixes, never
a fixed model ID), GPT-6 Astra (`gpt-6-astra`) in place of GPT-5.6 Sol, and Grok 4.7
(`grok-4.7-high`) on the Cursor bench; the role names `opus`, `sol`, and `grok` stay as the routes.
Landed in scaffold at 06f9387 across the orchestration contract, the transport contracts, the
Claude and Codex role files, the Codex configuration, the Cursor rule, the readiness script, and
the Claude bridge; the queued Veneer briefs and the pending roadmap fold carry Opus 5.5.

## D14 (2026-09-22)

Verbatim: "Why is there even a `guides/ledger`? That makes no sense and does not follow our
conventions at all, only guides are allowed on the guides folder and the guide for veneer is
veneer.md. Don't make stuff up like that, follow our conventions, read the AGENTS.md/CLAUDE.md and
the agents/rules/skills they point to and follow them strictly."

Ruling: `guides/` holds guides alone — the package's own guide, the map, and the catalog mirrors.
The cascade ledger is part of `guides/veneer.md`. The vendored policy sweep that refused
`guides/ledger.md` states this law; a nested path that escapes its glob is refused. Carrier:
L1 LEDGER-HOME reverts the move; every live unit writes its ledger rows into `guides/veneer.md`
§ Tokens › § Departures and § Additions from its integration onward.

## D15 — a shared declaration block that records an external value is a coincidence (2026-09-22)

Orchestrator ruling from the B-SWEEP design round (`b-sweep-design-verdict.md`): both copies stay
inline; the sweep reports duplication through `findDuplicates` beside an unchanged `scanStyleBlocks`
under `(shared >= 4 && shared * 2 > min(left, right)) || shared >= 6` (amended after C's
measurements); the styles rule states the coincidence line; no coincidence mixin lands, `list-reset`
included. The exported name is `findDuplication` (`findDuplicates` collides with
`@orkestrel/reason`'s hosted surface under the policy gate; rename accepted 2026-09-22).

## D17 — an empty resting paint registers no frame (2026-09-22)

Orchestrator amendment to the B-PASSIVE design verdict's ruling 5 (recorded there): a specimen
whose only paint is an animation frame after its first step (the grow spinners) renders in the
showcase, registers no capture scenario with the reason recorded, and its proof reads the timeline.

## D18 — a partial loads only the modules it reads (2026-09-22)

Orchestrator amendment to family ruling 8, from the B-PASSIVE-E audit: `@use '../tokens'` and
`@use '../mixins'` open a partial only where the partial reads that module; an unread `@use` is a
dead load, which is the tree's precedent (`_icon-link.scss`, `_type.scss`, `_image.scss` load mixins
alone; `_vr.scss` and `_ratio.scss` load neither).

## D19 — the Tailwind proofs are a service proof (2026-09-22)

User instruction: Tailwind is treated as a service under the ecosystem's rules. Orchestrator ruling:
the Tailwind proofs move from the hand-authored `src:tailwind` browser project into the workspace
convention's `service` project (`tests/service/**`, Node, `tests/setupService.ts` readiness,
`test:service` from `prepublishOnly`), driving the installed compiler through `postcss` and the pinned
Chromium through Playwright from Node; the F8 design verdict's ruling 6 and its exit criterion are
amended by the F8c design round (`units/f8c-design-brief.md`). The probe
`units/f8c-probe-import.mjs` measured that the plugin resolves `@import '@orkestrel/veneer/styles'`
verbatim from Node through the manifest's `exports` self-reference, so no alias remains.

## D20 — per-family driven-key lists stay until the family closes (2026-09-22)

From the B-PASSIVE-C reviewer's F4: each family's `<FAMILY>_KEYS` list costs a rewrite of the
`CAPTURE_KEYS` spread and its assertion per landing. Orchestrator ruling: family ruling 10 stands
for the units in flight; the spread and the assertion rewrites are the Orchestrator's mechanical
integration edits at each landing; B-PASSIVE-CLOSE consolidates the lists into one driven table
appended the way `CASCADE_KEYS` is, so later families append rows.

## D21 — a flat paint is not a blank frame (2026-09-22)

From B-PASSIVE-E-2 § D1: a placeholder bar paints one flat fill, and the portfolio guard refused the
frame as uniform. Orchestrator ruling: a uniform region whose colour differs from the frame's floor
is admitted as a paint; a uniform region equal to the floor stays refused; B-PASSIVE-E-3 lands the
reader and its two-sided proof.

## D22 — a selector the inventory records under several keys belongs to the most specific one (2026-09-22)

From the B-PASSIVE-A reviewer's F4 and R1 and the B-PASSIVE-B analyst's claim 2: `attributeSelector`
answers by inventory iteration order when several keys record a selector, so `.btn-close` files under
`btn` and `.btn-group-lg > .btn` under `btn`, where the release writes them under `btn-close` and
`btn-group`. Orchestrator ruling: the ladder prefers, among the keys that record the selector, the
one the release authors it under (the most specific key), and the departure ledger regroups the moved
rows (`#### btn-close`, the size twins under `btn-group`). B-FORMS-VALIDATION already lands the ladder
(`attributeSelector` prefers, among the recorded keys, the one the selector's own classes name,
longest first, and falls back to the first recorded member), with its proof in
`tests/setupServer.test.ts`; so `.btn-close` moves to `btn-close` the moment VALIDATION lands, while
`.btn-group-lg > .btn` stays under `btn` because `btn-group` is not one of that selector's classes.
The ledger regroup for the moved rows is the Orchestrator's integration edit at B-PASSIVE-A's
landing (`#### btn-close`), proved by the conformance gate; selectors recorded under one key are
untouched.

## D23 — F8c stage and reader names, and the stage's teardown

`StageManager.properties(css)` is `expand(css)`: a method is a verb, and `expand` states that it
expands each rule's declarations to the longhand names Chromium assigns. `SheetReader.properties`
is `variables`: that reading is custom properties alone, and `properties` already names any
property in `SheetDeclaration.property`, `StageRule.properties`, and the `read(selector,
properties?)` parameter, which keep their names. `StageManager` composes `createTeardown()` from
`@orkestrel/test` for its release order, so `destroy` after a failed `open` releases what was
acquired and `destroy` on a never-opened stage is a no-op. Amends F8c rulings 1 and 3. Carrier:
F8c-A-3 (`units/f8c-a-brief-3.md`); F8c-B consumes the new names.

## D24 — The forbidden-runtime scan and the service tree

The conformance case `imports no forbidden runtime package from source, application, or tests`
excludes the service setup module (`tests/setupService.ts`), its proof, and `tests/service/**` from
its population, because those files drive the installed Tailwind compiler as their subject (D19); the
bundle case and the manifest case keep proving that the published entries and the manifest carry no
Tailwind requirement. Lint's `import/no-dynamic-require` refuses a variable specifier, so the service
module's literal import is the only lint-clean form. Carrier: F8c-B MOVE, which owns
`tests/conformance.test.ts` for the exemption.

## D25 — The import-placement sentence

The guide's § Tailwind states the rule a consumer follows as the CSS syntax rule it rests on — an
`@import` rule is valid only ahead of every rule other than `@charset` and `@layer` statements — with
its citation, and the executed guard is the consumer recipe-equality case that holds each recipe
import-first. The sentence about Vite's bundled `postcss-import` is restated as a consequence of that
rule: a processor that follows the syntax drops a late import and the cascade import is the one a
consumer loses. No test asserts the plugin's behaviour, because asserting it needs `postcss-import`,
which the tree does not declare; the F8c-B analyst lane's executed probe (retained in its verdict)
is the evidence that the consequence holds in Vite 7.

## D26 — The theme scope's select caret and switch knob

`$assets` in `src/styles/_tokens.scss` still maps `select-indicator` and `switch-knob`, and
`_theme.scss` emits them under `[data-bs-theme='dark']`; VALIDATION kept them and CHECK and SELECT
hold both files off-limits. A follow-up unit, B-FORMS-ASSETS, removes both entries, amends the
`tokens.test.ts` case that re-declares every theme-dependent name inside each mode scope, the § Tokens
paragraph naming the retuned variables, and the `$assets` doc comment, after CHECK and SELECT land
their component-level dark rules. Carrier: B-FORMS-ASSETS (`builder` on Sonnet, fully specified).

## D27 — The document-order reading in the service proofs

The service proofs read the document's layer order structurally, as the first placement of each
layer across the linked cascade followed by the loaded profile; the sheet sequence is fixed by
`stage.open` (the cascade linked first) and `stage.load` (the profile appended), not observed. The
limit is stated in the profiles proof's case comment and in the guide's sentence on the order line.
No stage member is added for it.
