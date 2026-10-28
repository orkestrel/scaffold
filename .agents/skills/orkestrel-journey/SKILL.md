---
name: orkestrel-journey
description: Prove a browser application the way a person uses it — real keystrokes, clicks, and Tab/Enter against only what is visible and reachable — through the journey layer @orkestrel/test/browser publishes, and generate the capture portfolio, the resolved-style matrix, and the statechart outcome from those same journeys. Use when accepting a UI build, proving an application end to end, deciding whether a screen is reachable by keyboard alone, proving what a screen refuses as well as what it does, proving the styles a browser actually resolved under each theme and viewport, driving a transition table through the interface and watching it run, auditing whether the interface speaks the user's vocabulary rather than the engine's, producing the screenshots a design review judges, routing a rendered question to an artifact a model can read, or whenever the only evidence a screen works is a test that drove it through JavaScript instead of through the interface.
---

# Prove an application through human journeys

## Read

`AGENTS.md` § Authority and loading names the files every unit reads. This skill adds:

1. [layer.md](references/layer.md) before importing, extending, or debugging the journey layer.
2. [captures.md](references/captures.md) before registering a state or placing a capture.
3. [styles.md](references/styles.md) before asserting anything the browser resolved.
4. [statechart.md](references/statechart.md) before declaring a transition or mounting the harness.
5. [decide.md](references/decide.md) before routing a question to an instrument.
6. [recorded.md](references/recorded.md) before judging a browser recording's run as evidence.
7. The `*/types.ts` of every environment the journeys drive, plus the application's root component,
   route entry, and store contract.

## Declare the families

Declare in the browser environment's `integration.test.ts` which families that screen carries, and
assert in the always-on proofs that every declared family is present. A declaration names which
families a screen owes. It never switches what a declared family proves.

| Family     | Declared                                                                                     | Proves                                                                 |
| ---------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Journey    | Always                                                                                       | Each user intent reaches its outcome through the interface             |
| Refusal    | Always                                                                                       | Each control the screen withholds, through one exact failure voice     |
| Matrix     | Where the journey wrapper declares more than one variant                                     | The values the browser resolved under each declared variant            |
| Statechart | Where a journey drives a transition of an entity carrying its own state and event vocabulary | Each declared transition, driven through the interface where it can be |
| Transport  | Where the screen persists or restarts                                                        | Persistence, restart, and storage failure through real implementations |
| Capture    | Under the capture flag                                                                       | The registry times the variants, each registered file written to disk  |

- Prove Matrix in the arrival journey `scaffold new` seeds while its wrapper declares more than one
  variant: read one resolved value under each declared variant.
- Refuse a declaration that omits a family whose trigger the screen meets. Report the omission as a
  scope finding and stop; never prove the remaining families around it.
- Assert the declaration itself: a family listed with no proof, and a proof belonging to no listed
  family, each fail the run.
- Bind the journey laws to every declared family, not to the journey family alone. A matrix reading
  and a transport assertion reach their screen through the same verbs a journey reaches it through.
- Change route and theme through the interface in the matrix family and the transport family. A
  family that navigates by calling the application's own router proves the router, and says nothing
  about the screen it reads afterwards.
- Let the transport family construct the store it hands the application, and drive the application
  from the interface after that. The constructed store is the fixture; it is never the drive.
- Take an entity read or a storage read as corroboration beside a rendered assertion, never in place
  of one.

## Resolve the population

Resolve every target and every population by ARIA role and accessible name as rendered.

- Admit a selector only where the population carries no role at all — a paragraph set, a token
  census, a style-escape walk. Declare that selector in the workspace's browser test setup module
  with the reason beside it, and never in a test file.
- Read a painted population through the platform: `element.checkVisibility()` reports what the box
  tree renders, and a non-zero `getBoundingClientRect()` reports what occupies space. The layer
  publishes no painted-population predicate.
- Reach for `isRendered` and `isReachable` where the subject is one element's own reachability
  ([layer.md](references/layer.md) → The resolver).

## Read the variant once

A browser application born by `scaffold new` carries the journey axis: the
`configs/app/vite.journey.config.ts` wrapper, the root `appJourney` factory, the `test:journey`
script, and that script's place in the `test` chain. That wiring fans the journey suite out into one
Vitest project per variant, and each project provides its own variant. Read the variant once at run
start, and let it choose the capture destination, the matrix row, and the statechart run together.

- Read `inject('variant')` for this run's variant name, `inject('variants')` for the declared list,
  and `inject('capture')` for whether this run writes frames.
- Declare the provided types once, by augmenting Vitest's own `ProvidedContext` in the workspace's
  browser test setup module, so `inject` is typed rather than narrowed at each call.
- Declare the variant list in `configs/app/vite.journey.config.ts`, the birth-owned wrapper a
  browser application is born with. Its presence is the journey axis. Rename and extend the seeded
  viewports for this application.
- Activate the axis in a workspace born before it: write `configs/app/vite.journey.config.ts`, run
  `scaffold repair`, then add `npm run test:journey` to the `test` script after `npm run test:app`.
  The repair defines `appJourney` in the root configuration, emits the `test:journey` script, and
  excludes the journey suite from the ordinary `app:browser` project. It does not rewrite the `test`
  chain, so the chain entry is yours to add. Add that entry before the repair instead where you
  prefer: `test:journey` names a configuration rather than a project, so neither order blocks the
  repair.
- Name each variant per [captures.md](references/captures.md) → Variants.
- Keep the provided variants as serializable `JourneyVariant` data: `name`, `width`, and `height`.
  Compose no callback merely to pass that data to a capture.
- Run the axis with `npm run test:journey`, which runs that wrapper and joins the `test` chain. Set
  `CAPTURE` to `1` in your own shell and run `npm run test:journey` again to write the frames; the
  root configuration reads that variable and provides it as `capture`.
- Keep the journeys in `tests/app/browser/integration.test.ts`, and the journeys of the `vue`
  extension's application in `tests/app/vue/integration.test.ts`, which `npm run test:journey:vue`
  runs. Each variant project of a mode collects that file alone, and the application's ordinary
  project excludes it while the axis is on, so a journey written anywhere else runs in no variant.
- Loop every declared variant inside one run for the matrix family
  ([styles.md](references/styles.md) → Run per variant).
- Render exactly one variant per run for the capture family
  ([captures.md](references/captures.md) → Variants).

`scaffold audit` reports a manifest and a wrapper that disagree as one of these findings. Settle the one it reports before trusting a green run.

- The manifest names a Vitest configuration for `test:journey` that the plan does not emit and the target does not hold. Write the wrapper and run `scaffold repair`, or remove the `test:journey` script and its chain invocation.
- The manifest does not invoke `npm run test:journey` from its `test` chain. Add `npm run test:journey` to the `test` script after `npm run test:app`.

`scaffold audit` reports the invocation question only when no chain from `test` reaches
`npm run test:journey` through literal `npm run` calls, so a chain reaching it through an
intermediate script raises none. It reports the configuration question only for a `test:*` script
whose text names `vitest`, so a script naming another runner's configuration raises none either.

### Prepare the capture theme

- Where the application ships a theme control, await the theme action through that interface
  before driving the state the journey captures. Pass the provided `JourneyVariant` list directly
  to `createPortfolio` when capture needs no additional synchronous document change. Never attach
  an asynchronous action to `CaptureVariant.apply` or re-resolve a covered theme control at capture
  time.
- Where the screen has no theme control, prepare the theme through the attribute the screen
  reads. Use the optional `CaptureVariant.apply` hook only for a synchronous document change,
  such as setting that attribute. Treat its `() => void` contract as synchronous: `createPortfolio`
  invokes the hook without awaiting a returned promise.
- Keep `applyTheme` as the workspace's own browser setup helper. Make it drive the theme control
  through the published journey verbs and await the announced theme state and settled paint.
- Put the provided-context declaration in the browser test setup module, and consume the injected
  data in `tests/app/browser/integration.test.ts` through the following portfolio configuration.
  Mount the shipped application entry with its real provisions before the acceptance journey runs.
- From `tests/app/browser/integration.test.ts`, pass `../../../tmp/captures/states` as the capture
  directory to write into the workspace's `tmp/captures/states` directory. The browser provider
  resolves a custom screenshot path relative to the test file's directory.

```ts
import type { JourneyVariant } from '@orkestrel/test'

declare module 'vitest' {
	interface ProvidedContext {
		readonly variant: string
		readonly variants: readonly JourneyVariant[]
		readonly capture: boolean
	}
}
```

```ts
import { createPortfolio } from '@orkestrel/test/browser'
import { inject } from 'vitest'
import { applyTheme } from '../../setupBrowser.js'

const VARIANT = inject('variant')
const CAPTURE = inject('capture')
const VARIANTS = inject('variants')
const PORTFOLIO = createPortfolio({
	states: ['home'],
	variants: VARIANTS,
	variant: VARIANT,
	directory: '../../../tmp/captures/states',
	enabled: CAPTURE,
})
```

At the start of the existing home acceptance journey, insert the following theme preparation before
that journey's actions.

```ts
await applyTheme(VARIANT)
```

Immediately after that journey's actual rendered-home assertion, insert the following placement.
Keep the existing journey and its assertions as the consumer; add no screenshot-only test.

```ts
await PORTFOLIO.place('home')
```

## Apply the journey laws

- Write every journey under `.claude/rules/tests.md` § Journey tests.
- Generate the portfolio from the acceptance journeys. Place each registered state inside the
  journey that reaches it, and never register a state no journey reaches.

## Import the journey layer

- Write a verb, reader, or wait of your own only where the entries `.claude/rules/tests.md`
  § Journey tests names publish none for the act ([layer.md](references/layer.md) → Import, never
  implement).
- Place a helper you must write in the workspace's browser test setup module, name it for the act,
  and export it from there under `.claude/rules/tests.md`. Never declare a resolver inside a test
  file.
- Prove that setup module with `tests/setupBrowser.test.ts`, and activate its `setup:browser`
  project in the order [layer.md](references/layer.md) → Import, never implement states.
- Drive every step through the published verbs, and never dispatch a constructed event
  ([layer.md](references/layer.md) → What it drives).
- Re-verify every target against what the application renders after any markup change
  ([layer.md](references/layer.md) → Role vocabulary).

## Derive journeys from intents

Write one journey per user intent, named for what the person achieves rather than for the
components it passes through. Place them in the browser environment's `integration.test.ts`, whose
placement and scope `.claude/rules/tests.md` fixes. Carry a replaced value in `absent` as
[layer.md](references/layer.md) → The waits shows.

### The intents every screen owes

Write a journey for each of the following wherever the screen has that state. Take the expected
outcome from the product guide; this skill supplies the mechanism and invents no copy, no redirect,
and no title scheme.

| Intent            | The journey proves                                                             |
| ----------------- | ------------------------------------------------------------------------------ |
| Arrival           | The entry route renders its own screen, read through a named region            |
| An unknown route  | What the application does with a route it does not carry, and what it says     |
| An empty result   | What a query matching nothing renders, in the product's own words              |
| The document name | The title each screen publishes, asserted per screen                           |
| A render failure  | What a person reads when a component throws, rather than an unexplained screen |

- Report a missing outcome as a product finding, with its evidence site, rather than inventing the
  copy the screen owes.
- Assert the title from `document.title` per screen, against the title the product guide names for
  that screen. Report a screen the guide gives no title as a product finding.

## Prove the refusals

- Give every screen a refusal family: the controls a person must not reach in the state the
  journey has put the screen in.
- Assert the exact failure voice the case means. Never write an assertion that accepts more than
  one voice ([layer.md](references/layer.md) → The failure voices).
- Cover the restrictions the interface imposes on itself: a collapsed panel's field, a verb
  belonging to another kind of object, a control disabled until its precondition lands.
- When a refusal changes voice after a markup change, read it as a role or reachability change
  before treating the element as missing
  ([layer.md](references/layer.md) → Role vocabulary).

## Declare the transport family

- Name the block for what it proves — persistence, restart, storage failure.
- Drive it through the application's real session and store contracts.
- Build the host's own storage conditions with `createStorage`: `reads: false` and `writes: false`
  withhold what a browser with site data blocked withholds, `quota` caps the accepted `setItem`
  calls, and `permit()` grants the withheld permissions the way a person allowing site data grants
  them. It replenishes no quota, because room and permission are different refusals.
- Assert the withheld voice on its `name` as well as its message: a withheld operation raises a
  `DOMException` named `SecurityError`, and a write past the quota raises one named
  `QuotaExceededError`.
- Prove the visible half in a journey: the failure sentence a person reads, and the retry control
  that clears it. A storage failure whose visible half is a control that silently does nothing is a
  screen finding.
- Assert restart by starting a second session over the same store and polling the restored value.
- Take a stalled read to the application's own asynchronous store contract, never to `Storage`.
  `Storage` is synchronous, so a hanging read is not expressible against it and a fixture that fakes
  one is proving a store contract the application does not have.

## Prove the styles

Follow [styles.md](references/styles.md) for the resolved-value law, the per-variant run, the
composited contrast reading and its published control, the authored-class census, the
`extractStyles` reading, and the token comparison.

## Prove the statechart

Follow [statechart.md](references/statechart.md) for the transition table, the scenario per
transition, the runner, the mounted harness, and the gate that reads its tally.

## Generate the portfolio

Follow [captures.md](references/captures.md) for the state registry and its placement rules, the
variant matrix, the always-on filename proof, the capture-run membership proof, and how a state that
exists only during an activation is captured.

Where a capture and a green suite disagree, take the capture as the evidence and the fixture as the
defect.

Route review of the portfolio to the `orkestrel-polish` campaign. Do not judge it here.

## Route the question

Follow [decide.md](references/decide.md) before spending a round on a question. It fixes which
instrument judges which claim, what `prove` cannot serve, and what the run's written artifact holds.

## Mutate each assertion class

Mutate each assertion class once, read the red, restore, and read the green.
`.claude/rules/quality.md` § Instruments owns the law this satisfies.

| Assertion class | The mutation                                                         | What must change                  |
| --------------- | -------------------------------------------------------------------- | --------------------------------- |
| Journey         | Omit the act the journey performs, keeping collection valid          | The destination assertion reddens |
| Refusal         | Make the withheld control reachable, or present, without renaming it | The asserted voice changes        |

- Omit the act rather than weakening the assertion. An assertion a missing act leaves green cannot
  tell arrival from never having left.
- Change reachability rather than the name. A renamed control reddens on absence, which is a finding
  the refusal family already carries.

## Accept

Completion requires all of:

- every in-scope user intent, the intents every screen owes included, reaching its outcome through the interface with no step that reaches past it, and keyboard-only reachability proven on every screen the journeys cover;
- a refusal family per screen, each asserting one exact failure voice;
- the declared families each proven, the declaration asserted, and the transport family driven through real implementations;
- the matrix family read once per declared variant, each style reading carrying its published control from [styles.md](references/styles.md) → The published controls, and the authored-class census and the `extractStyles` reading each reporting the population it walked;
- the statechart table driven to a terminal status with no failed row, and the harness tally read from the object and from its markup;
- the registry-times-variants filename proof and the state-placement proof green in an ordinary run, one capture run per variant writing every registered file, and the written artifact produced for every variant, named by that variant;
- the browser test setup module proven by `tests/setupBrowser.test.ts` in the `setup:browser` project `scaffold repair` registers;
- each assertion class mutated, with the red reading and the green reading recorded;
- the repository gates green, per `.agents/orchestration.md` § Acceptance.

State the engine bound with the verdict, per [styles.md](references/styles.md) → The engine bound.

Report each journey by the intent it proves, the refusals it establishes, the states it placed, the
variants it read, the statechart outcome it reached, and every screen finding the layer's refusals
exposed.
