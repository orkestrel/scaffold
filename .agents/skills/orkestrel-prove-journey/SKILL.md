---
name: orkestrel-prove-journey
description: Prove a browser application the way a person uses it — real keystrokes, clicks, and Tab/Enter against only what is visible and reachable — through the journey layer @orkestrel/test/browser publishes, and generate the capture portfolio, the resolved-style matrix, and the statechart outcome from those same journeys. Use when accepting a UI build, proving an application end to end, deciding whether a surface is reachable by keyboard alone, proving what a screen refuses as well as what it does, proving the styles a browser actually resolved under each theme and viewport, driving a transition table through the interface and watching it run, auditing whether the interface speaks the user's vocabulary rather than the engine's, producing the screenshots a design review judges, routing a rendered question to an artifact a model can read, or whenever the only evidence a screen works is a test that drove it through JavaScript instead of through the interface.
---

# Prove an application through human journeys

## Load authority

Read the current files in this order:

1. `AGENTS.md`.
2. `.claude/rules/tests.md` for test law, real implementations, and shared test infrastructure;
   `.claude/rules/browser.md` for browser and Vue usage; `.claude/rules/application.md` for app
   composition and entries; `.claude/rules/styles.md` for style centralization;
   `.claude/rules/quality.md` for the instrument and negative-control law;
   `.claude/rules/documentation.md` for parity. Those rules are the contract; this skill is the
   workflow.
3. [layer.md](references/layer.md) before importing, extending, or debugging the journey layer.
4. [captures.md](references/captures.md) before registering a state or placing a capture.
5. [styles.md](references/styles.md) before asserting anything the browser resolved.
6. [statechart.md](references/statechart.md) before declaring a transition or mounting the harness.
7. [decide.md](references/decide.md) before routing a question to an instrument.
8. `guides/README.md`, the governing guide for the surface, and `ROADMAP.md` when present.
9. The `*/types.ts` of every environment the journeys drive, plus the application's root component,
   route entry, and store contract.

Treat a retained readiness verdict as evidence to re-verify against the current tip, never as a plan
to resume. Re-take every ruling it records that this run's acceptance depends on, and name the commit
each ruling was taken at.

## Declare the families

Declare in the browser environment's `integration.test.ts` which families that surface carries, and
assert in the always-on proofs that every declared family is present. A declaration names which
families a surface owes. It never switches what a declared family proves.

| Family     | Declared                                                                                     | Proves                                                                 |
| ---------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Journey    | Always                                                                                       | Each user intent reaches its outcome through the interface             |
| Refusal    | Always                                                                                       | Each control the surface withholds, through one exact failure voice    |
| Matrix     | Where the surface ships more than one variant                                                | The values the browser resolved under each declared variant            |
| Statechart | Where a journey drives a transition of an entity carrying its own state and event vocabulary | Each declared transition, driven through the interface where it can be |
| Transport  | Where the surface persists or restarts                                                       | Persistence, restart, and storage failure through real implementations |
| Capture    | Under the capture flag                                                                       | The registry times the variants, each registered file written to disk  |

- Refuse a declaration that omits a family whose trigger the surface meets. Report the omission as a
  scope finding and stop; never prove the remaining families around it.
- Assert the declaration itself: a family listed with no proof, and a proof belonging to no listed
  family, each fail the run.
- Bind the journey laws to every declared family, not to the journey family alone. A matrix reading
  and a transport assertion reach their surface through the same verbs a journey reaches it through.
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
  chain, so the chain entry is yours to add.
- Name each variant for the theme and the viewport it renders, such as `dark-390`. Never split the
  theme from the viewport; a split writes a filename naming a combination the run did not render.
- Compose each variant's theme `apply` inside the test, from the variant's name. Vitest `provide`
  carries serializable values, so `name`, `width`, and `height` cross that channel and a function
  does not.
- Apply the theme through the application's own interface wherever the application ships a theme
  control, and through the attribute the surface reads where it does not.
- Run the axis with `npm run test:journey`, which runs that wrapper and joins the `test` chain. Set
  `CAPTURE` to `1` in your own shell and run `npm run test:journey` again to write the frames; the
  root configuration reads that variable and provides it as `capture`.
- Keep the journeys in `tests/app/browser/integration.test.ts`. Each variant project collects that
  file alone, and the ordinary `app:browser` project excludes it while the axis is on, so a journey
  written anywhere else runs in no variant.
- Loop every declared variant inside one run for the matrix family
  ([styles.md](references/styles.md) → Run per variant).
- Render exactly one variant per run for the capture family
  ([captures.md](references/captures.md) → Variants).

`scaffold audit` reports a manifest and a wrapper that disagree as one of the following questions.
Settle the one it reports before trusting a green run.

| The question `scaffold audit` reports                                                                                                                                                                                            | Settle it by                                                                             |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `The manifest at <target> names a Vitest configuration the plan does not emit and the target does not hold: test:journey --config configs/app/vite.journey.config.ts. Add the configuration or remove the script that names it.` | Writing the wrapper and running `scaffold repair`, or removing the `test:journey` script |
| `The manifest at <target> does not invoke npm run test:journey from its test chain. Add npm run test:journey after npm run test:app.`                                                                                            | Adding `npm run test:journey` to the `test` script after `npm run test:app`              |

```ts
import type { JourneyVariant } from '@orkestrel/test'
import type { CaptureVariant } from '@orkestrel/test/browser'
import { inject } from 'vitest'
// `applyTheme` is the workspace's own setup-module export, named for the act it performs.
import { applyTheme } from '../../setupBrowser.js'

declare module 'vitest' {
	interface ProvidedContext {
		readonly variant: string
		readonly variants: readonly JourneyVariant[]
		readonly capture: boolean
	}
}

const VARIANT = inject('variant')
const CAPTURE = inject('capture')
const VARIANTS: readonly CaptureVariant[] = inject('variants').map((variant) => ({
	...variant,
	apply: () => applyTheme(variant.name),
}))
```

## Apply the journey laws

1. **Drive only what a person can see and reach.** Resolve every interactive target by its ARIA
   role and its accessible name as rendered. Never reach into a component instance, a store, a
   transport, a copied credential, or a test-only hook to make a step succeed. Report a step that
   cannot be performed through the interface as a finding about the interface.
2. **Assert what is seen.** Quote the rendered text a person reads, which is `innerText` — a label
   under `text-uppercase` asserts as `TRACE` where the source says `Trace`. Never let an entity
   state read replace a perception assertion; it may only corroborate one, and
   `.claude/rules/tests.md` fixes which entity state a test may read at all.
3. **Assert what the interface withholds.** Assert every refusal through the resolver's exact
   failure voice, and distinguish an absent control from a present but humanly unreachable one.
4. **Keep transport and persistence proofs in their own declared block,** never inside a journey.
   Assert every live or asynchronous fact by convergence — poll until it contains or equals — never
   by an identity read of one frame.
5. **Generate the portfolio from the acceptance journeys.** Place each registered state inside the
   journey that reaches it, and never register a state no journey reaches.
6. **Commit a value through an act a person performs:** `pressKeys('{Enter}')` on the focused
   control, a Tab away, or a named button. Report a surface that commits on a timer, on an
   unpredictable event, or only after work the person cannot observe as a surface finding, and never
   work around it in the layer.
7. **Type only what a person would.** Journeys carry trusted input; adversarial payloads belong to
   the transport family and the parser suites.
8. **Perform every interaction step unconditionally.** Never gate a step on whether the control it
   is about to drive exists or is reachable, and never branch a journey on `readRefusal`. Let the
   resolver's failure voice name what the interface withheld. A guarded step passes whether or not
   the control was there, so the run goes green on a surface that removed the control.

## Import the journey layer

- Import every journey verb, reader, wait, and fixture builder from `@orkestrel/test/browser`, and
  every host-independent wait and table type from `@orkestrel/test`. Write one of your own only
  where those entries publish none for the act ([layer.md](references/layer.md) → Import, never
  implement).
- Send every key sequence through `pressKeys`, which refuses a sequence sent while nothing but the
  document body holds focus. Never reach past it to the provider's own keyboard function from a
  journey, a matrix reading, or a statechart phase.
- Place a helper you must write in the workspace's browser test setup module, name it for the act,
  and export it from there under `.claude/rules/tests.md`. Never declare a resolver inside a test
  file.
- Prove that setup module with `tests/setupBrowser.test.ts`. Writing that file selects the browser
  setup runtime, so run `scaffold repair` after writing it: the repair registers the browser-enabled
  `setup:browser` project and emits the `test:setup:browser` script. A workspace born with the
  browser setup runtime already carries that script in its `test` chain; in a workspace that
  acquires the runtime later, `repair` leaves the chain as written, so add
  `npm run test:setup:browser` to it yourself. `scaffold audit` reports `setup:browser` as a project
  no chain from `test` reaches until you do. The Node `setup` project excludes that path, so a proof
  of a browser helper placed anywhere else runs without a browser.
- Drive every step through the published verbs, and never dispatch a constructed event
  ([layer.md](references/layer.md) → What it drives).
- Re-verify every target against what the application renders after any markup change
  ([layer.md](references/layer.md) → Role vocabulary).

## Derive journeys from intents

Write one journey per user intent, named for what the person achieves rather than for the
components it passes through. Place them in the browser environment's `integration.test.ts`, whose
placement and scope `.claude/rules/tests.md` fixes.

- Enter through the real entry: mount the shipped root component with a real store and the route a
  person lands on, and let the application load itself.
- Reach each surface's own controls through forward Tab traversal in at least one journey.
- Type keystroke by keystroke where the keystrokes are the subject; fill in one operation where the
  text is only a payload the person pastes.
- Poll every fact the application produces asynchronously until it converges. Never assert one from
  a single read after the action. A poll's predicate must be able to go false-to-true after the
  action it observes; a predicate already true when the poll starts binds nothing.
- Assert the state the flow must reach, never the transient path taken to it. A criterion that bans
  a harmless transient over-refuses and breaks on the next honest implementation.
- Assert the negative beside the positive whenever a value replaces another: name the arriving
  sentence and carry the replaced one in `absent`, so the reading that resolves carries one and not
  the other ([layer.md](references/layer.md) → The waits).
- Assert the state a control announces beside every drive that sets it, and on an unselected
  sibling. A control announcing state owes this assertion whether or not the surface carries the
  statechart family.
- After a confirmed destructive action, assert through trusted input that focus landed on a visible,
  announced location.
- Assert the whole page's perception never matches the vocabulary the product does not speak —
  engine, schema, and implementation words the interface is supposed to translate.
- Report a bare accessible name that answers for more than one reachable element on one screen as a surface
  finding, and target through role or region until the surface is fixed.

### The intents every surface owes

Write a journey for each of the following wherever the surface has that state. Take the expected
outcome from the product guide; this skill supplies the mechanism and invents no copy, no redirect,
and no title scheme.

| Intent            | The journey proves                                                              |
| ----------------- | ------------------------------------------------------------------------------- |
| Arrival           | The entry route renders its own screen, read through a named region             |
| An unknown route  | What the application does with a route it does not carry, and what it says      |
| An empty result   | What a query matching nothing renders, in the product's own words               |
| The document name | The title each screen publishes, asserted per screen                            |
| A render failure  | What a person reads when a component throws, rather than an unexplained surface |

- Report a missing outcome as a product finding, with its evidence site, rather than inventing the
  copy the surface owes.
- Assert the title from `document.title` per screen, against the title the product guide names for
  that screen. Report a screen the guide gives no title as a product finding.

## Prove the refusals

- Give every surface a refusal family: the controls a person must not reach in the state the
  journey has put the surface in.
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
  surface finding.
- Assert restart by starting a second session over the same store and polling the restored value.
- Take a stalled read to the application's own asynchronous store contract, never to `Storage`.
  `Storage` is synchronous, so a hanging read is not expressible against it and a fixture that fakes
  one is proving a surface the application does not have.

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

Route review of the portfolio to the `orkestrel-polish-surface` campaign. Do not judge it here.

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

- Record the exact command and its failing count before the change, restore the tree, and record the
  same command green.
- Omit the act rather than weakening the assertion. An assertion a missing act leaves green cannot
  tell arrival from never having left.
- Change reachability rather than the name. A renamed control reddens on absence, which is a finding
  the refusal family already carries.
- Restore by rewriting what you changed. Never reach for a command that discards working-tree state.

## Accept

Completion requires all of:

- every in-scope user intent reaching its outcome through the interface, with no step that reaches
  past it;
- the intents every surface owes present wherever the surface has the state, each outcome taken from
  the product guide and every missing one reported as a product finding;
- keyboard-only reachability proven on every surface the journeys cover;
- a refusal family per surface, each asserting one exact failure voice;
- the transport family declared separately, driven through real implementations, and convergent;
- the declared families each proven, and the declaration itself asserted;
- the matrix family read once per declared variant, each style reading carrying its published
  control from [styles.md](references/styles.md) → The published controls in the same run, and the
  contrast reading's control straddling its declared bar;
- the authored-class census and the `extractStyles` reading taken on the mounted surface, each
  reporting the population it walked;
- the statechart table driven to a terminal status with no failed row, and the harness tally read
  from the object and from its markup;
- the registry-times-variants filename proof and the state-placement proof green in an ordinary run;
- one capture run per variant writing every registered file, and the disk-membership proof green;
- the written artifact produced for every variant the run rendered, named by that variant;
- perception assertions quoting rendered text, and the vocabulary sweep green on the whole page;
- the browser test setup module proven by `tests/setupBrowser.test.ts` in the `setup:browser`
  project `scaffold repair` registers;
- each assertion class mutated, with the red reading and the green reading recorded;
- the repository gates green, under the independent-verification law in `.agents/orchestration.md`.

State the engine bound with the verdict. The gate renders one engine, so a claim about a second
engine is unproven until a reading on that engine records it. The emitted `configs/browsers.ts` doc
block is the home of that limit and of the condition that reopens it. Cite that doc block, and copy
neither into a verdict.

Report each journey by the intent it proves, the refusals it establishes, the states it placed, the
variants it read, the statechart outcome it reached, and every surface finding the layer's refusals
exposed.
