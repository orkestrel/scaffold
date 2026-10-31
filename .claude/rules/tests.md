---
paths:
  - 'tests/**/*'
  - 'vite.config.ts'
  - 'configs/**/*.ts'
  - 'package.json'
---

# Testing rules

These rules govern what a test asserts and where it lives, the cross-cutting and expensive proofs, probes, shared test infrastructure, browser tests, and runner configuration. `.claude/rules/quality.md` § Instruments chooses the instrument for a question.

## Test contract

- Mirror module/application structure:
  `tests/{src,app}/[environment]/[domain]/[module].test.ts`.
- The mirrored population is `src` and `app`, plus the skill scripts: `.agents/skills/<skill>/scripts/<name>.ts` is proved by `tests/agents/skills/<skill>/scripts/<name>.test.ts`, one proof per script, and the policy sweep refuses a script with no proof. `configs/` is a source directory and is
  deliberately not a mirrored root: its leaves produce the workspace's configuration rather than ship
  in it, and they are proved from `tests/config.test.ts` beside the configuration they produce. Do
  not add `tests/configs/`.
- Resolve a mirrored module through `.ts`, `.tsx`, `.mts`, `.cts`, `.vue`, `.scss`, or `.css`.
- Resolve a Sass or CSS partial through the module's leading underscore.
- Mirror the root setup modules § Shared test infrastructure places, and their proofs, in both
  directions; that section's list is the whole set of names. A root `tests/setup<Name>.test.ts`
  resolves to `tests/setup<Name>.ts`. A root `tests/setup<Name>.ts` that declares an export has
  `tests/setup<Name>.test.ts` or is imported by `tests/setup.test.ts`, which can prove several
  setup modules when their helpers serve several projects. The setup modules scaffold owns are
  outside this population: a vendored module and the `tests/setupDistribution.ts` harness. The
  policy sweep (`tests/setupPolicy.ts`) enforces both directions. `tests/studies/**`
  is outside the mirrored population: a study test names a package-level subject and mirrors no
  module.
- Prefer test filenames matching entrypoints: `index.test.ts` for `index.ts`, `main.test.ts` for `main.ts`.
- Tests are deterministic: identical inputs produce identical results.
- When a proof runs a command, assert its exit code.
- Keep default suites fast: give each timer the shortest real duration that still separates the orderings the test asserts on a loaded host, and make no network calls.
- Use real implementations and small scenarios. Never use mocks, behavioral fakes, module replacement, or framework spies for project-owned or integrated behavior.
- Use recorders for calls/events, temporary resources for stateful boundaries, protocol-faithful fixture servers for deterministic network peers, and the real external service when its behavior is the claim.
- Prefer inert customizable data and input stubs.
- Allow a scripted boundary stub only when it implements the real interface or protocol minimally, to drive the system under test. It never reimplements project-owned behavior and never stands in for the integration being claimed.
- Bind a test fixture server to `127.0.0.1` on an ephemeral port (`listen(0)`), never to `::1` and never to a fixed port: a host without IPv6 fails `EAFNOSUPPORT`, and a fixed port flakes on occupancy.
- Cover happy paths, error paths, empty input, boundary values, `NaN`, positive/negative zero, cycles, and Map/Set order where relevant.
- Test observable behavior, not implementation details.
- Assert the membership a discovered or globbed set must have, not a total that a partly empty population satisfies. A glob spanning two locations passes a size check while one of them matches nothing.
- Never assert an implementation against itself. Compare the answer to a declaration, a fixture, or a second mechanism that could disagree with it. Re-deriving the answer the same way the source derives it produces a test that passes for every value the source ever returns, and it reads exactly like a real one.
- Probe a host-varying property at runtime, on the host the test is running on, and assert against what the probe returned. Filesystem case folding, path separators, permission bits, and rename semantics differ per host, and a thrown error's class or message differs per Node major, so a fixture built on one host describes that host and silently measures something else on the next.
- Assert a runtime-chosen result as the property it must have, not as the number one run produced. Compression, timing, and buffer sizing are the runtime's choice, so pin the relationship the test depends on — that the encoded form is larger, that the second call is faster — and let the assertion fail when the input drifts out of the range where that relationship holds.
- Measure an elapsed interval with `performance.now()`, never `Date.now()`. `Date.now()` returns whole milliseconds, so an interval built from two of its readings truncates at both ends and can under-report by a millisecond — enough to fail a boundary assertion against a timer that behaved correctly. `performance.now()` is monotonic and sub-millisecond, and it does not move when the wall clock does.
- Give a conditional skip the mechanism that makes it inapplicable, cited, not the platform name alone. A test skipped on a platform is a test nobody re-examines; a test skipped because a named API rejects a named case is one anybody can re-check.
- Create every directory a test writes under. Make the test independent of the presence, contents, and absence of git-ignored paths it does not own.
- A readiness wait resolves on parsed complete content, never on a file's existence.
- A browser case restores every runner global it changes before it ends.
- A proof that runs before `build` in the gate chain resolves no `dist/` path; a proof that deliberately consumes the built entry loads it at run time through a resolved path and refuses a stale build.
- When data a generator renders gains a new shape, the generator's test gains that shape before the data ships.
- The revert that proves a repair reddens exactly the test that names the defect. Keep the import and collection graph valid while reverting, and confirm the named test was collected. A revert that reddens anything beyond that test broke the harness, and its count is not evidence.
- Use `it.todo()` only for explicitly out-of-scope roadmap work, never to complete the current request. Every conditional skip has a narrow verifiable applicability reason. Never commit `.only` or `.skip`; `vitest/no-focused-tests` and `vitest/no-disabled-tests` refuse both.
- Do not create test files solely for `constants.ts`, barrels, error definitions, or `types.ts`.

## Cross-cutting proofs

A proof that covers the workspace instead of one module has a fixed location, so no package invents
its own. `.claude/rules/workspace.md` § Test project matrix lists each location with its project,
what it proves, and its gate.

- Put `tests/setupBrowser.test.ts` and `tests/setupStyles.test.ts` in the browser-enabled
  `setup:browser` project. Put every other root `tests/setup*.test.ts` proof in the Node `setup`
  project, and exclude both browser proofs from that project. Keep each proof's assertions on
  exported test-infrastructure behavior: do not duplicate production behavior there, and do not
  move setup-helper assertions into another cross-cutting proof.
- Put an assertion about the package's real tree that no vendored proof carries in
  `tests/tree.test.ts`, driving the exported `tests/setup*.ts` helper that reads the tree, and keep
  that helper's own proof over fixtures in its `tests/setup*.test.ts` file.
- The `guides` project runs in Node with the browser disabled. Its subject is what the guide
  claims: that every documented name resolves, and that every fence asserting a value returns
  that value. A proof that renders a component and compares it against a definition is a
  composition and belongs in an `integration.test.ts` scoped to its directory.
- Transcribe each flagship fence and assert the values its comments claim. Name resolution is
  not a behavioural proof, so a fence documenting a value the code contradicts passes every
  parity assertion. Change a fence, change the transcription beside it.
- `integration.test.ts` is a reserved filename at any level. It names a scope rather than a module,
  so the mirror rule does not reach it; its scope is the directory it sits in.
- An integration test is an end-to-end test: it composes the package's own features and drives them
  together, through the public API, with no part of the system under test replaced.
- Scope it by where the composition happens. `tests/integration.test.ts` drives features **across**
  environments — core through server, core through browser, one environment's output consumed by
  another. A nested `tests/src/<environment>/integration.test.ts` drives features **within** that one
  environment.
- Do not put a packaging, install, or distribution check in an integration test. What the tarball
  contains is a different question from whether the features compose.
- A test the mirror rule flags is a misplaced test until its placement is checked. Move it to the
  location its scope names. Widen the rule only when that check shows the test already sits at the
  location its scope names and the rule's population omits a module this ruleset mandates, and then
  widen the population rather than admitting the individual case.
- A nested `tests/{src,app}/<environment>/**/integration.test.ts` runs in that environment's project,
  whose existing glob collects it exactly once. Give it a separate exact-path project entry only when
  the proof needs different setup or a different runtime, and exclude that exact path from the
  environment project when you do. A `tests/app/<application>/integration.test.ts` journey suite is
  such a proof: `.claude/rules/workspace.md` § Test project matrix collects it in the journey
  projects of its mode.

## Probes

A probe is a throwaway instrument that settles one question. It is not a test and never ships.

Route the question before writing a probe. When you can state the edit you believe is correct and the
edit that must break with the stage it breaks at, the question is a claim for the `prove` tool the
`probe` MCP server registers, and `.claude/rules/quality.md` § Instruments owns that rule. When the
question carries no stated belief to falsify yet, when the subject lies outside the TypeScript a
workspace project judges, or when the proof needs what that tool's stages do not model — a process
tree, a listening socket, an installed package, a built entry driven as a child, or a live external
service — write a probe.

The kinds split by which tool has to see the probe:

- A **type probe** is read by `tsc`, whose scoped project includes only its own environment, so it
  lives in the source tree beside what it measures. Delete it before the unit returns; a leaked one
  fails the `policy` plugin's placement rules, because a probe filename is not a centralized kind
  file.
- A **runtime probe** is collected by a Vitest project, so it lives in `tmp/probes/` and runs through
  the `probe` project. `tmp/` is ignored by git, so no probe enters a commit by accident, and every
  test script names its project, so no gate runs the `probe` project.
- For a **bench**, write a `*.bench.ts` file under `tests/` or `tmp/probes/` and run `test:bench`.
  Register a regular `test` or `it` callback with its context's `bench` fixture. With Vitest 5,
  call `await bench(name, options, fn).run()` for one measurement or await `bench.compare(...)`
  for a comparison. Pass options before the function. Keep benchmark files outside ordinary
  `*.test.ts` includes and every gate. Use the script's explicit `--mode benchmark` when reading
  `import.meta.env.MODE`; do not infer that mode from the `vitest bench` command alone.

Run a probe before relying on an unverified belief about behaviour: what a function returns, what a
configuration resolves to, whether a path is reached at all. Prefer a probe to an argument whenever
the probe is cheap.

When the question is whether the difference between methods is worth having, write a `*.bench.ts`
file beside the probe test, run the `test:bench` script, and size its fixtures, declare its
threshold, and read its result per `.claude/rules/quality.md` § Performance. A settled difference
that underwrites an implementation choice promotes with its test into the mirrored suite and keeps
its benchmark file there while that choice stands. A deterministic relationship promotes as an
ordinary assertion, so delete the benchmark file. Never commit baseline output.

These rules bind every probe:

- **Prove the instrument can fail before trusting that it passed.** Pair it with a control drawn
  from outside the population it covers.
- **Promote or delete.** A probe that settles a claim becomes a test in the mirrored location that
  proves the real source. Delete every other probe. A probe left in the suite reports on the harness
  while reading as a test.
- **Never commit a probe.** The ignore rule stops an accident, not a deliberate forced add, and a
  type probe sits in tracked source with no ignore rule at all.

## Live-service tests

Live external services/models are the deliberate exception to fast hermetic defaults:

- Put them in the `service` project, under `tests/service/`, with `tests/setupService.ts` for setup
  and a longer timeout. That module's presence is what registers the project, so a live proof with
  no readiness setup is a project nothing configures.
- `.claude/rules/workspace.md` fixes which gate runs the `service` project, and that gate is not the
  same one in a publishing and a `private: true` workspace.
- Warm and verify service readiness in `tests/setupService.ts`.
- Hard-require readiness: throw loudly; never silently skip.
- Verify service-dependent logic through that service's project, not unrelated module tests or scattered conditional skips.
- Tune each request to the smallest input/context/output that proves one behavior without becoming brittle or expensive.
- Prefer semantic bounded assertions over exact generated prose. Increase context/workload only when the scenario requires it.

## Expensive proofs

A test that spawns a process, packs, installs, or drives a real build is a proof, not a unit test.

- Give it its own Vitest project with its own setup and timeout.
- Keep it out of the default run where the workspace has a gate that can hold it.
  `.claude/rules/workspace.md` fixes where each isolated project runs, and that placement
  differs between a publishing and a `private: true` workspace.
- Use `distribution` and `service` as the fixed expensive-proof projects.
- When a change alters what a package ships, such as an export, its declaration text, or a packed
  path, run its `distribution` project before accepting the change.
- Put a study's proofs under `tests/studies/` in the `studies` project, which
  `.claude/rules/workspace.md` § Test project matrix places.
- Put in `studies` only the proofs the `@orkestrel/study` engine drives. Place a slow end-to-end proof of
  the package's own features that no study engine drives, such as its built executable run against
  a fixture workspace, as an integration test under § Cross-cutting proofs. Place it by the scope it
  composes:
  - Put a proof that crosses environments in `tests/integration.test.ts`, which the `integration`
    project runs from `test`.
  - Put a proof that stays within one environment in that environment's `integration.test.ts`.
  - Set its budget with the suite's `timeout` option.
- A `distribution` proof reads `import.meta.env.MODE` and fails, rather than skips, on an unreachable
  registry under `--mode release`. The publish gate invokes it that way, so a proof that skips there
  passes the gate without ever proving the artifact installs. An ordinary local run may still skip.
- Accept a process, race, or lock proof only under the suite load it ships in and at a repeat count the brief sets from the failure's nature and states with its reason, re-examined against the stop signals `.agents/orchestration.md` § Size gate names, reported as passes over runs by a `verifier`.
- Slowness decides a proof's budget and isolation inside the project its subject names, per `.claude/rules/workspace.md` § Test project matrix, and the proof need not touch an external service.
- Where such a proof stays in a shared project, size its budget from a full contended run rather than from an isolated one. A budget that clears the isolated cost by a thin margin turns contention into a red gate reporting a timeout, which carries no diagnostic about the code and costs a full investigation to dismiss.

## Shared test infrastructure

Test helpers are shared infrastructure, not local test-file clutter.

`@orkestrel/test` owns the helpers every workspace repeats: the call recorder, the real delay, the JSON and async collectors, and the owned scratch directory. Import them from `@orkestrel/test`, and its Node-only helpers from `@orkestrel/test/server`. Before declaring a helper in a `tests/setup*.ts` module, read the installed surface — `guides/test.md` § Surface in the scaffold checkout, or the package's own declaration under `node_modules` — and declare only what no export does. A setup-module export whose name or job matches an installed export is a defect, whichever file declared it first. `guides/test.md` § Surface holds the signatures; the following sections state how to use them.

- For the test modules scaffold owns, keep shared helpers within them instead of importing them
  from `@orkestrel/test`. In the vendored set (`tests/setupPolicy.ts`, `tests/policy.test.ts`, and
  `tests/config.test.ts`), follow the vendored-file import law in `.claude/rules/workspace.md`. In
  the `tests/setupDistribution.ts` harness, import only `node:` modules, `vitest`, and `vite`, and
  in its browser variant also `playwright`, `@vitest/browser-playwright`, and
  `../configs/browsers.js`.

- Extract a fixture, recorder, event factory, async wait, renderer, scenario/data builder, protocol fixture, or DOM builder as soon as it could serve another test.
- Any duplicate or near-duplicate helper is a defect; consolidate it into one general form.
- Export every reusable helper, fixture type, factory, constant, and guard from setup files.
- A setup file owns everything an assertion needs and nothing an assertion is: `describe`, `it`, `test`, and `expect` never appear in a `setup*.ts`; lint refuses their import from `vitest` there.
- Data tables and case matrices belong in a setup file at any size; test registration does not.
- Test files import shared infrastructure rather than declaring local fixture factories. The
  `policy/no-test-helper` lint rule refuses a module-scope function, class, or function-valued
  binding in a mirrored test file (`tests/src/**`, `tests/app/**`) or a root setup proof; move each
  into the setup module its environment names.
- Never reimplement a framework helper in tests or fixtures; import the real parser, signer, flattener, or other helper.
- Prefer small customizable factories/stubs that seed inert data for a real scenario over repeated inline setup.
- Helper names follow module-helper naming: `createFixtureServer`, `buildElement`, `appendItems`, `renderRows`, `waitForReady`, `extractDetail`.
- Re-prove a change to what a setup module imports with the build output set aside.
- A module reads no live host object at import; it reads one inside the function that needs it.
- A fixture that stands in for another package's platform behavior copies that package's own proof of the behavior rather than re-deriving it.

Declare test infrastructure only in the root modules the following list places, each in the
environment it names, and in scaffold's vendored `tests/setupPolicy.ts`. Never create another
`tests/setup<Name>.ts`, a nested setup module, or a helper, type, suite, or builder module anywhere
else under `tests/`. Put a cross-cutting proof's helpers in the module of the environment the proof
runs in: `tests/setupServer.ts` for the Node `conformance`, `tree`, and `integration` proofs. A file
under a `fixtures/` directory is data, an entry a test runs or loads on its own, or a raw-runtime
support module beside the entries that alone import it. Permit that support module only when its
runtime requires the placement and it substitutes for no project-owned implementation. Never import
a fixture helper from a test file. The policy sweep's `mirror` rule refuses every other TypeScript module under
`tests/` that is not a test, a bench, or a declaration file; it reads paths, not imports, so review
refuses a helper placed under `fixtures/` outside the permitted raw-runtime support modules.

- `tests/setup.ts`: host-independent; no `node:*`, DOM, `window`, or Vue. Lint refuses a `node:` or Vue import there.
- `tests/setupServer.ts`: Node-only helpers and `node:fs` loaders anchored to `WORKSPACE_ROOT`.
- `tests/setupBrowser.ts`: DOM/Vue/browser helpers and setup CSS. Lint refuses a `node:` import here and in `tests/setupStyles.ts`.
- `tests/setupStyles.ts`: the CSSOM and sheet helpers `.claude/rules/styles.md` places there; a
  sheet-face project loads it after `tests/setupBrowser.ts` when the target has the file.
- `tests/setupService.ts`: the `service` project's readiness setup, per § Live-service tests.
- `tests/setupGlobal.ts`: the `globalSetup` module `.claude/rules/workspace.md` § Test project
  matrix assigns to `src:browser`, `setup:browser`, and `integration`.
- `tests/setupStudy.ts`: the harness module the study tests import and, in a study-engine package,
  its source tests too. Name it in no project's `setupFiles`; tests import it, as the policy proof
  imports `tests/setupPolicy.ts`.
- `tests/setupDistribution.ts`: the harness of the `distribution` proof, which scaffold plans in
  every publishing workspace and owns by content. Name it in no project's `setupFiles`. The emitted
  `tests/distribution.test.ts` imports `createDistributionSuite` and `buildDistributionCases`, plus
  `checkDistributionBrowser` in its browser variant, starts and destroys the suite in its hooks, and
  registers one `it` per case row. Put a package-specific distribution helper in
  `tests/setupServer.ts`, because `repair` replaces every edit to the harness.

In the `@orkestrel/scaffold` checkout, never rename or remove an export of
`tests/setupDistribution.ts` that an emitted proof imports, an interface member that proof reads, or
the `./setupDistribution.js` specifier it imports from, because no verb rewrites a proof a target holds. Add a name or member beside a frozen one instead.

### Recorder

Import `createRecorder` from `@orkestrel/test` instead of a framework spy when only calls and arguments matter.

### Delay

Import `waitForDelay` from `@orkestrel/test`; never repeat an inline timeout promise.

Use it to yield, never to wait for something another process produces. A fixed delay chosen to
outlast a child's startup is a race whose loss looks like a product defect: the test measures
interpreter bootstrap rather than the behaviour it names, and it fails on a loaded host and passes on
an idle one. Wait for a named condition, an event, or an abort with the helpers under
§ Condition instead.

### Condition

Import `waitForCondition`, `waitForEvent`, `waitForAbort`, and `retryUntil` from
`@orkestrel/test`. A polling loop, a deadline read, or a deferred that observes an abort or an
event in a test or a setup module is a defect: `waitForCondition` owns the poll, `waitForEvent`
the deferred on an event, and `waitForAbort` the deferred on a signal. A guide fence transcribed
byte for byte into `tests/guides.test.ts` is the consumer's code and stays as the guide shows it.
Give each timed wait a `description` the timeout error names.

### Scratch

Import `createScratch` from `@orkestrel/test/server` when a proof needs real files, and call `destroy` on it.

### Style primitives

Browser/style setup exposes shared assertions/builders:

`mount`, `render`, `build`, `readStyle`, `readToken`, `readRootToken`, `readPixels`, `parseCSSColor`, `matchesColor`, `findStyleRule`.

`findStyleRule` proves a declaration exists in the cascade; `readStyle()` reads the resolved result.

## Browser tests

Use the real browser as the system under test:

- Do not replace DOM events, storage, observers, viewports, layout methods, pointer, or drag APIs unless the browser genuinely lacks one.
- Prefer real nodes, events, styles/layout, and observers.
- In a file compiled by a browser or Vue scope, never load `@vitest/browser-playwright` types; read `cdp()` as `unknown`, and narrow `send` and each reply with guards.
- A browser proof of layout, geometry, or visibility runs the tester frame unscaled at the declared viewport.
- When a browser test moves the real pointer through CDP, move it to `(-1, -1)` in the case's `finally` block.
- Centralize event factories: `createPointerEvent`, `createDragEvent`, `typeInput`, `fireTransitionEnd`.
- Centralize DOM builders: `createButtonElement`, `createDropdownElements`, `createModalElement`.
- Assert DOM state, emitted events, callback records, focus, classes, attributes, and public API state.
- Do not assert private state, internal timers, or framework scheduler internals.
- Prefer real short timers and observable wakeups. Never replace the host clock.

### Journey tests

A journey test drives the application as a person does, through only what a person can see and reach:

- Resolve every interactive target by its ARIA role and accessible name as rendered. Never reach into a component instance, a store, a transport, a copied credential, or a test-only hook to make a step succeed. A step the interface cannot perform is a finding about the interface.
- Assert the rendered text a person reads, which is `innerText`: a label under `text-uppercase` asserts as `TRACE` where the source says `Trace`. An entity state read can corroborate a perception assertion and never replaces it.
- Assert what the interface withholds. Assert each refusal through the resolver's exact failure voice, and distinguish an absent control from a present but unreachable one.
- Keep transport and persistence proofs in their own declared block, never in a journey. Assert every live or asynchronous fact by convergence, polling until it contains or equals, never by an identity read of one frame. A poll's predicate must be able to go false-to-true after the action it observes.
- Commit a value through an act a person performs: `pressKeys('{Enter}')` on the focused control, a Tab away, or a named button. A screen that commits on a timer, on an unpredictable event, or only after work the person cannot observe is a screen finding; never work around it in the test layer.
- Type only what a person would. Inputs no person would type belong to the transport family and the parser suites. Type keystroke by keystroke where the keystrokes are the subject, and fill in one operation where the text is only a payload the person pastes.
- Perform every interaction step unconditionally. Never gate a step on whether its control exists or is reachable, and never branch a journey on `readRefusal`: a guarded step passes whether or not the control was there.
- Import every journey verb, reader, wait, and fixture builder from `@orkestrel/test/browser`, and every host-independent wait and table type from `@orkestrel/test`. Send every key sequence through `pressKeys`, and never reach past it to the provider's keyboard function.
- Enter through the real entry: mount the shipped root component with a real store and the route a person lands on.
- Reach each screen's own controls through forward Tab traversal in at least one journey.
- Assert the state the flow must reach, never the transient path taken to it.
- Assert the negative beside the positive whenever a value replaces another: name the arriving sentence and carry the replaced one as absent.
- Assert the state a control announces beside every drive that sets it, and on an unselected sibling.
- After a confirmed destructive action, assert through trusted input that focus landed on a visible, announced location.
- Assert the page's perception never matches the vocabulary the product does not speak: engine, schema, and implementation words the interface is supposed to translate.
- Report a bare accessible name that answers for more than one reachable element on one screen as a screen finding, and target through role or region until the screen is fixed.

## Runner configuration

Keep Vitest/provider configuration minimal:

- Prefer defaults until a measured problem proves them insufficient.
- Centralize provider setup in one helper/shared block.
- Add browser/provider/teardown/timeout/parallelism/cache/launch settings only for a current verified need.
- Avoid long browser flag lists and persistent contexts unless a test requires them.
- For slow teardown, inspect test cleanup, open handles, file parallelism, and context churn before adding launch flags.
- Remove exploratory settings after fixing the cause.
- Config comments explain the current reason, not the history of failed experiments.

## Untestable usually means missing seam

Before accepting that a behavior cannot be tested, look for the seam that would make it testable.

- Treat a collaborator reached through a hard-coded global — a stream, a clock source, a spawn, a fetch — as a missing injection point, not an untestable truth.
- An injected collaborator with a real minimal implementation is a sanctioned boundary stub, not a mock of project-owned behavior.
- Add the seam rather than shipping the gap whenever the design would welcome it anyway, and whenever a sibling collaborator is already injected.
- Record a genuinely irreducible gap where a reader meets it: what is unproven, why it cannot be driven, and what would change that. A silent untested guard reads exactly like a tested one.

Coverage rules:

- Read a coverage report as a discovery input, never as evidence of proof. It answers one cheap mechanical question — which code no test executed — and that reliably finds forgotten branches and rules nothing calls.
- Never cite coverage as the adequacy audit's result. It cannot tell you whether an executed line is asserted, so a fully covered file can still be entirely unproven.
- Never let a percentage become the target.

## Discovery and adequacy audit

Before accepting a change the size gate in `AGENTS.md` § Work loop names medium or large, run the
audit in the `orkestrel-harden` skill's hardening reference, § Audit the tests themselves.
