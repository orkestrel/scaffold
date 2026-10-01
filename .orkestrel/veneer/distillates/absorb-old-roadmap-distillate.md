I'll read the brief and follow it exactly.The brief scopes three ranges of the old roadmap. I'll read those and skip the unit queue.# Old roadmap distillate

## Tenets

| Old tenet (one sentence) | Successor disposition | Why (one sentence) | Citation |
| --- | --- | --- | --- |
| Build a proper Orkestrel package. | dropped | Package conversion, types-first contracts, and Scaffold rule discipline are absent from the successor tenets. | `tmp/mikesaintsg-veneer/ROADMAP.md:17` |
| Preserve Bootstrap compatibility while owning the implementation. | changed | The successor recreates Bootstrap 5.3.8 in authored source order with the same output, and the browser face owns the interaction engine. | `tmp/mikesaintsg-veneer/ROADMAP.md:20` |
| Ship Veneer's own JavaScript. | changed | The successor forbids implementing the interaction engine with Bootstrap JavaScript and assigns that engine to the browser face. | `tmp/mikesaintsg-veneer/ROADMAP.md:23` |
| Allow Orkestrel runtime dependencies and forbid other runtime packages. | kept | The successor limits runtime dependencies to `@orkestrel/*` and bars Bootstrap, Tailwind, and Vue as runtime and peer dependencies. | `tmp/mikesaintsg-veneer/ROADMAP.md:26` |
| Keep framework integration outside the engine. | changed | The successor has the consumer supply Vue and does not restate an adapter over a framework-free engine. | `tmp/mikesaintsg-veneer/ROADMAP.md:29` |
| Make Elements the visual and interaction reference. | dropped | Elements as the visual and interaction reference is absent from the successor tenets. | `tmp/mikesaintsg-veneer/ROADMAP.md:32` |
| Give semantic tags useful defaults without inferring components. | kept | The successor gives semantic tags useful defaults and forbids inferring a component from tag position. | `tmp/mikesaintsg-veneer/ROADMAP.md:35` |
| Preserve direct control through classes. | kept | The successor keeps classes as the explicit control. | `tmp/mikesaintsg-veneer/ROADMAP.md:38` |
| Remain compatible with Tailwind CSS without requiring it. | changed | The successor maps Tailwind into a compatibility layer tested against the real package, and Bootstrap wins on a shared class. | `tmp/mikesaintsg-veneer/ROADMAP.md:41` |
| Make CSS-variable tokens a supported customization and testing contract. | changed | The successor keeps CSS variables as the customization contract, and rendered correctness is a separate tenet. | `tmp/mikesaintsg-veneer/ROADMAP.md:44` |
| Let the rendered browser result decide UI correctness. | kept | The successor uses the same rule that the rendered browser result decides UI correctness. | `tmp/mikesaintsg-veneer/ROADMAP.md:47` |
| Prove Bootstrap parity and Veneer's own additions. | changed | The successor recreates the Bootstrap pin with the same output, and the styles layer records additions against that pin. | `tmp/mikesaintsg-veneer/ROADMAP.md:50` |
| Prefer the native browser platform. | kept | The successor says to prefer native browser APIs. | `tmp/mikesaintsg-veneer/ROADMAP.md:53` |
| Build incrementally and finish each component before advancing. | dropped | Incremental component closure is absent from the successor tenets. | `tmp/mikesaintsg-veneer/ROADMAP.md:58` |
| Research the existing projects before designing replacements. | dropped | A duty to study Elements, Mailbox, and the named skills is absent from the successor tenets. | `tmp/mikesaintsg-veneer/ROADMAP.md:61` |
| Use ASTs only where they help answer a concrete question. | dropped | AST and parser limits are absent from the successor tenets. | `tmp/mikesaintsg-veneer/ROADMAP.md:64` |
| Keep the work and its instructions efficient. | dropped | Absorption assignment and plan-prose limits are absent from the successor tenets. | `tmp/mikesaintsg-veneer/ROADMAP.md:67` |

## Rulings

| Id | Ruling (one sentence) | Disposition | Why | Citation |
| --- | --- | --- | --- | --- |
| SR1 | A design ruling wins wherever it and a standing ruling disagree, and git history archives every pruned record. | dropped | Ruling precedence and prune archival are absent from the successor tenets. | `tmp/mikesaintsg-veneer/ROADMAP.md:75` |
| SR2 | Veneer is first a Bootstrap baseline that pins Bootstrap and accounts for every token, element, component, and utility in source and tests. | changed | The successor makes the Bootstrap 5.3.8 pin the map and records additions on Veneer's own styles layer. | `tmp/mikesaintsg-veneer/ROADMAP.md:80` |
| SR3 | Every selector ends shipped, excluded with a reason, or recorded as a departure, in machine-checkable form. | dropped | The shipped, excluded, and departure ledger is absent from the successor tenets. | `tmp/mikesaintsg-veneer/ROADMAP.md:82` |
| SR4 | A claims file carries no guide-row claim, because implementation is preferred to prose. | dropped | Claims-file limits are absent from the successor tenets. | `tmp/mikesaintsg-veneer/ROADMAP.md:84` |
| SR5 | Write a claim only from a source you read, never from the unit's report. | dropped | Claim-source discipline is absent from the successor tenets. | `tmp/mikesaintsg-veneer/ROADMAP.md:85` |
| SR6 | Rewrite every field of a derived launch artifact that names the subject. | dropped | Launch-artifact rewriting is absent from the successor tenets. | `tmp/mikesaintsg-veneer/ROADMAP.md:86` |
| SR7 | Confirm that every file a brief names exists when the round launches. | dropped | Brief file-existence checks are absent from the successor tenets. | `tmp/mikesaintsg-veneer/ROADMAP.md:87` |
| SR8 | Read the rules from the scaffold checkout, never from this checkout. | dropped | A separate scaffold-checkout rule source is absent from the successor tenets. | `tmp/mikesaintsg-veneer/ROADMAP.md:88` |
| SR9 | Keep one guide, `guides/veneer.md`, and invent no surface it does not carry. | dropped | A single-guide limit is absent from the successor tenets. | `tmp/mikesaintsg-veneer/ROADMAP.md:89` |
| SR10 | Keep `guides/` for the package guide, the map, and the catalog mirrors, with the cascade ledger inside the guide. | dropped | The guides-folder limit is absent from the successor tenets. | `tmp/mikesaintsg-veneer/ROADMAP.md:90` |
| SR11 | Pilot every styles mechanism by hand in Veneer and implement nothing in scaffold for it. | dropped | A Veneer-only styles pilot is absent from the successor tenets. | `tmp/mikesaintsg-veneer/ROADMAP.md:93` |
| SR12 | Place a lone class flat and a family in a lowercase plural folder. | dropped | Source-folder shape is absent from the successor tenets. | `tmp/mikesaintsg-veneer/ROADMAP.md:94` |
| SR13 | Ship no right-to-left support. | kept | The successor forbids a right-to-left sheet. | `tmp/mikesaintsg-veneer/ROADMAP.md:95` |
| SR14 | Declare an `@orkestrel/*` package as a runtime dependency where a unit needs one, and leave any other dependency to the user. | changed | The successor limits runtime dependencies to `@orkestrel/*` and pins `bootstrap` at `5.3.8` as a devDependency. | `tmp/mikesaintsg-veneer/ROADMAP.md:96` |
| SR15 | Treat publishing as the user's decision, run on the user's one-time code. | dropped | Publishing ownership is absent from the successor tenets. | `tmp/mikesaintsg-veneer/ROADMAP.md:98` |
| SR16 | Report an exclusion and an open design question at the owning unit's acceptance. | dropped | Acceptance reporting of exclusions is absent from the successor tenets. | `tmp/mikesaintsg-veneer/ROADMAP.md:99` |
| SR17 | Refuse the `./browser/auto` entry, its wrapper, its manifest rows, and the rule amendment, and keep the data API as `Delegate`. | dropped | The auto entry and the `Delegate` data API are absent from the successor tenets. | `tmp/mikesaintsg-veneer/ROADMAP.md:100` |
| SR18 | Keep `index.rtl.css` emitted and unexported until D5 rules, and spend no unit's work on it before that ruling. | changed | The successor forbids a right-to-left sheet, so an unexported twin is not held. | `tmp/mikesaintsg-veneer/ROADMAP.md:102` |
| DR1 | This file is the executable plan, the old plan file becomes a short bridge to it, and the diary lives in git history. | dropped | Plan-file location is absent from the successor tenets. | `tmp/mikesaintsg-veneer/ROADMAP.md:106` |
| DR2 | Close self-containment first, with Test `0.0.19` published and a clean install reproducing every proof, before any family opens. | dropped | The Test `0.0.19` self-containment gate is absent from the successor tenets. | `tmp/mikesaintsg-veneer/ROADMAP.md:108` |
| DR3 | Observe an event's target fields only inside the listener, through one recorder proved on an attached host and a detached host. | dropped | The event-recorder proof is absent from the successor tenets. | `tmp/mikesaintsg-veneer/ROADMAP.md:112` |
| DR4 | Retire the hand-written selector grammar, read rules with `postcss`, and answer the tag-pair judgment with a rendered proof. | dropped | Selector-grammar retirement is absent from the successor tenets. | `tmp/mikesaintsg-veneer/ROADMAP.md:116` |
| DR5 | Run value accounting first, with a departures table, an additions table, and a gate that reddens on an unrecorded difference. | changed | The successor records additions against the Bootstrap pin and requires the same output. | `tmp/mikesaintsg-veneer/ROADMAP.md:121` |
| DR6 | Keep the guide as the only machine-read record, with `tests/fixtures/oracle/inventory.json` as the pinned upstream input. | dropped | A single machine-read guide record is absent from the successor tenets. | `tmp/mikesaintsg-veneer/ROADMAP.md:128` |
| DR7 | Judge the grid against Bootstrap's page, and take Elements' spacing, container widths, and motion tokens from rendered specimens when identity opens. | changed | The successor recreates Bootstrap 5.3.8 with the same output, and Elements is not the reference. | `tmp/mikesaintsg-veneer/ROADMAP.md:131` |
| D3 | Deliver Vue through an adapter that takes the consumer's reactivity and lifecycle by injection and imports nothing. | changed | The successor has the consumer supply Vue, and Vue is neither a runtime nor a peer dependency. | `tmp/mikesaintsg-veneer/ROADMAP.md:134` |
| D2 | Open Tailwind after the accounting unit. | dropped | An accounting-before-Tailwind order is absent from the successor tenets. | `tmp/mikesaintsg-veneer/ROADMAP.md:137` |
| DR8 | Infer no component from tag position, give the shell's header button an explicit class, and treat every `!important` as Bootstrap's contract with the consumer's own `!important` as the escape. | changed | The successor forbids inferring a component from tag position, keeps classes as the explicit control, and lets Bootstrap win on a shared class. | `tmp/mikesaintsg-veneer/ROADMAP.md:138` |
| DR9 | Build every entity on explicit construction, opt-in delegation, restore-on-destroy, and native disclosure, placement, and scroll observation, and refuse `@vue/reactivity`. | changed | The successor assigns the engine to the browser face, prefers native browser APIs, and limits runtime dependencies to `@orkestrel/*`. | `tmp/mikesaintsg-veneer/ROADMAP.md:143` |
| D2, D6 | Make Bootstrap and Tailwind compatible, with Bootstrap's declaration winning where a class name exists in both. | kept | The successor says Bootstrap wins on a shared class. | `tmp/mikesaintsg-veneer/ROADMAP.md:150` |
| D3 | Deliver Vue as a `src/vue` environment with its own export and no declared dependency, the consumer supplying Vue. | kept | The successor has the consumer supply Vue and bars Vue as a runtime or peer dependency. | `tmp/mikesaintsg-veneer/ROADMAP.md:154` |
| D4 | Remove the delegate's refusal of `disabled`, `.disabled`, and `aria-disabled="true"` hosts, recording no departure. | dropped | The delegate's disabled-host rule is absent from the successor tenets. | `tmp/mikesaintsg-veneer/ROADMAP.md:156` |
| D5 | Ship no right-to-left support, and remove the `index.rtl.css` twin, its plugin, its proofs, and the inventory's `rtl` fields. | kept | The successor forbids a right-to-left sheet. | `tmp/mikesaintsg-veneer/ROADMAP.md:158` |
| D7 | Keep no alias, wrapper, deprecation, or compatibility shim, retain the `--bs-*` variables, and remove the older highlight token pair. | changed | The successor recreates Bootstrap 5.3.8's output, which keeps the Bootstrap variable contract. | `tmp/mikesaintsg-veneer/ROADMAP.md:160` |
| D8 | Leave the toolchain majors and the `pool` pin outside this campaign, with X-EXIT recording the exclusion. | dropped | Toolchain-major exclusions are absent from the successor tenets. | `tmp/mikesaintsg-veneer/ROADMAP.md:162` |
| D9 | The prune's deletion set is approved when presented. | dropped | Prune-set approval is absent from the successor tenets. | `tmp/mikesaintsg-veneer/ROADMAP.md:163` |
| D10 | T1 and T2 ship in one Test release on the user's one-time code. | dropped | A combined Test release is absent from the successor tenets. | `tmp/mikesaintsg-veneer/ROADMAP.md:163` |
| D11 | Write the physical property Bootstrap 5.3.8 writes for each rule, and drop the logical-only direction machinery. | kept | The successor recreates Bootstrap 5.3.8 with the same output and forbids a right-to-left sheet. | `tmp/mikesaintsg-veneer/ROADMAP.md:165` |
| D12 | Keep the root setup modules to the fleet's fixed set, with the styles surface and a future `src/vue` environment as the only blessed departures. | dropped | The setup-module inventory is absent from the successor tenets. | `tmp/mikesaintsg-veneer/ROADMAP.md:169` |
| D41 | Close the baseline before the engine, ship each family cascade with static state classes, and form the engine afterward on native browser systems with no runtime dependency outside `@orkestrel/*`. | changed | The successor assigns the engine to the browser face on native APIs with `@orkestrel/*` as the only runtime dependencies. | `tmp/mikesaintsg-veneer/ROADMAP.md:174` |
| D43 | From 2026-09-23 the engine runs in a parallel session on `main`, one worktree per unit. | dropped | Parallel-session ownership is absent from the successor tenets. | `tmp/mikesaintsg-veneer/ROADMAP.md:178` |
| DR10 | Apply the appearance ruling: coloured text takes Elements' on-canvas tier, and the 14-pixel base with 600 heading weight scales down below 1200 pixels. | dropped | Elements' colour mix and the 14-pixel heading scale are absent from the successor tenets. | `tmp/mikesaintsg-veneer/ROADMAP.md:182` |

## Standing conditions

- The host runs npm `10.9.7` while `package.json` pins `devEngines.packageManager` to npm `>=11.6.0` with `onFail` set to `error`, so every install and package script runs through the npm 11 binary the deps script places in the scratchpad (host fact, npm version). `tmp/mikesaintsg-veneer/ROADMAP.md:227`
- Playwright `1.63.0` expects `chromium-1243` while this host carries Chromium `141.0.7390.37` at `/opt/pw-browsers/chromium-1194` with browser downloads disabled, so every receipt taken here names Chromium 141 (host fact, Playwright revision and Chromium build). `tmp/mikesaintsg-veneer/ROADMAP.md:228`
- A `codex exec` sandbox denies network, denies its child's child, and writes only under its `--cd` root and the system temporary directory, so installs, lockfile generation, and live fetches stay with the Orchestrator or a native writer (host fact, sandbox). `tmp/mikesaintsg-veneer/ROADMAP.md:229`
- A `codex exec` sandbox denies the loopback listener vitest's browser mode binds, and `-c sandbox_workspace_write.network_access=true` lets that listener bind, so every Astra writing unit that runs a browser project launches with that override (host fact, sandbox). `tmp/mikesaintsg-veneer/ROADMAP.md:230`
- The Cursor agent's shell is allowlisted to `ls`, so a `grok` lane gets reading work only and every command result it needs is supplied in the brief (host fact, sandbox). `tmp/mikesaintsg-veneer/ROADMAP.md:231`
- `scaffold repair` restores every vendored file, including `tests/setupPolicy.ts` and `tests/policy.test.ts`, and scaffold content-owns the root `tsconfig.json`, `vite.config.ts`, and each planned `configs/` wrapper, so those paths stay off-limits and no vendored file is edited here (scaffold fact, repair and vendored files). `tmp/mikesaintsg-veneer/ROADMAP.md:232`
- The policy sweep reads every authored Markdown file for the banned terms of the vendored writing rule, so `test:policy` runs after any Markdown edit in this checkout (scaffold fact, policy sweep). `tmp/mikesaintsg-veneer/ROADMAP.md:233`
- The conformance setup pins Bootstrap by version and tarball identity through `BOOTSTRAP_VERSION`, so a differing installed copy is refused (campaign fact). `tmp/mikesaintsg-veneer/ROADMAP.md:234`
- The vendored `tests/setupPolicy.ts` mirror law requires every `tests/{app,src}/**/*.test.ts` file other than `integration.test.ts` to name a sibling module under `src/` or `app/`, so the Tailwind proofs live in `tests/service/tailwind/` (scaffold fact, vendored files). `tmp/mikesaintsg-veneer/ROADMAP.md:235`
- The Codex bench reported its usage limit at 2026-09-23 13:34 UTC and the user reset it the same day, so the objective lane is `analyst` on Astra again from the 15:18 UTC probe, re-probed at each dispatch (campaign fact). `tmp/mikesaintsg-veneer/ROADMAP.md:236`

## Exit criterion

- Self-containment, a clean `npm ci` and the whole gate chain exiting 0, is dropped under the successor tenets. `tmp/mikesaintsg-veneer/ROADMAP.md:243`
- Accounting closure, every emitted name mapping to a Bootstrap value, a departure, or an addition, is changed: the successor records additions against the Bootstrap pin and requires the same output. `tmp/mikesaintsg-veneer/ROADMAP.md:244`
- Baseline coverage, every pinned key shipped, deferred with an owner, or excluded with a reason, is changed: the successor recreates Bootstrap 5.3.8 with the same output and treats the pin as the map. `tmp/mikesaintsg-veneer/ROADMAP.md:247`
- The owned engine, every interactive contract working without Bootstrap JavaScript or another forbidden runtime, is kept: the browser face owns the interaction engine and Bootstrap JavaScript does not implement it. `tmp/mikesaintsg-veneer/ROADMAP.md:249`
- Semantic independence and class control, proved by rendered runs with the important-utility contract documented, is changed: the successor keeps semantic defaults and class control. `tmp/mikesaintsg-veneer/ROADMAP.md:251`
- Tokens, each documented token read from the built cascade and each group override moving a consumer property, is changed: the successor makes CSS variables the customization contract and lets the rendered result decide correctness. `tmp/mikesaintsg-veneer/ROADMAP.md:253`
- Rendered acceptance, captures of every shipped key under one frame grammar ruled through the polish skill, is changed: the successor lets the rendered browser result decide UI correctness. `tmp/mikesaintsg-veneer/ROADMAP.md:255`
- Elements identity, appearance and motion rulings landing as recorded departures, is dropped under the successor tenets. `tmp/mikesaintsg-veneer/ROADMAP.md:257`
- Tailwind, a standalone profile and each supported combination proved in the browser, is changed: the successor maps Tailwind into a compatibility layer tested against the real package, and Bootstrap wins on a shared class. `tmp/mikesaintsg-veneer/ROADMAP.md:258`
- Vue, the ruled adapter proved by a real Vue consumer with the manifest unchanged, is changed: the successor has the consumer supply Vue and bars Vue as a runtime or peer dependency. `tmp/mikesaintsg-veneer/ROADMAP.md:259`
- Receipts, each recorded receipt naming its browser build, are dropped under the successor tenets. `tmp/mikesaintsg-veneer/ROADMAP.md:260`
- One ledger and a pruned record, the guide as the only machine-read record and the campaign folder pruned, is dropped under the successor tenets. `tmp/mikesaintsg-veneer/ROADMAP.md:261`
- Publication of Veneer stays a separate user-directed task, and that separation is dropped under the successor tenets. `tmp/mikesaintsg-veneer/ROADMAP.md:264`

## Protocol

- Take one `grok` terrain distillate per family, and point every unit brief of that family at it. `process` `tmp/mikesaintsg-veneer/ROADMAP.md:343`
- Run one design round on one brief with the subjective lane and the objective lane. `process` `tmp/mikesaintsg-veneer/ROADMAP.md:344`
- Run one `verifier` gate chain at the family's close, and at any landing that moves the manifest or a config. `process` `tmp/mikesaintsg-veneer/ROADMAP.md:345`
- Rule the family's capture portfolio in one verdict round. `process` `tmp/mikesaintsg-veneer/ROADMAP.md:347`
- Write a file brief that points at the terrain record and restates no measurement it carries. `process` `tmp/mikesaintsg-veneer/ROADMAP.md:351`
- Give the unit one writer. `process` `tmp/mikesaintsg-veneer/ROADMAP.md:352`
- Run one audit round with both lanes on one claims file, with the objective lane on an engine that did not write the unit. `process` `tmp/mikesaintsg-veneer/ROADMAP.md:353`
- Add `checker` where a criterion is mechanical, never in place of a lane. `process` `tmp/mikesaintsg-veneer/ROADMAP.md:355`
- Close a verbatim fix by mutation probe. `process` `tmp/mikesaintsg-veneer/ROADMAP.md:356`
- Land through the parameterized landing script with the unit's allowlist. `process` `tmp/mikesaintsg-veneer/ROADMAP.md:357`
- Push a landing to `main` after its gate evidence is green, so the session branch carries only in-flight work. `process` `tmp/mikesaintsg-veneer/ROADMAP.md:358`
- Refuse a scope-read lane per unit where the family terrain record already covers the unit's files. `process` `tmp/mikesaintsg-veneer/ROADMAP.md:363`
- Refuse a full gate chain per unit, and keep scoped checks over owned files as the unit's own criterion. `process` `tmp/mikesaintsg-veneer/ROADMAP.md:364`
- Refuse a `checker` on a round whose criteria are all behavioural. `process` `tmp/mikesaintsg-veneer/ROADMAP.md:365`
- Refuse a fix round on a prose finding. `process` `tmp/mikesaintsg-veneer/ROADMAP.md:366`
- Refuse a re-review of an unchanged clean claim. `process` `tmp/mikesaintsg-veneer/ROADMAP.md:367`
- The engine session works on `main` in Veneer and in scaffold, each unit writes in a worktree on a `unit/<unit>` branch, one writer per checkout, and neither session force-pushes. `process` `tmp/mikesaintsg-veneer/ROADMAP.md:374`
- The engine session owns `src/browser/**`, `src/core/**`, their tests, the guide's engine sections, and the engine and plugin status cells, and the baseline owns every other file, with the setup modules, the exports map, and `README.md` report-only for both. `process` `tmp/mikesaintsg-veneer/ROADMAP.md:378`
- Before every landing, a session merges `origin/main`, re-runs its gate chain, and fast-forwards `main`, and a conflict in `guides/veneer.md` or `ROADMAP.md` is resolved for the session that owns the section. `process` `tmp/mikesaintsg-veneer/ROADMAP.md:386`
- Each session runs one `grok` lane at a time on the shared Cursor bench and re-probes an empty lane before ruling it dark. `process` `tmp/mikesaintsg-veneer/ROADMAP.md:392`
- Each session prunes its own records, and the engine session's campaign records live under `/home/user/scaffold/.orkestrel/veneer/engine/` only. `process` `tmp/mikesaintsg-veneer/ROADMAP.md:394`
- Each session keeps a reconciliation marker in its plan file naming the `origin/main` commits it last reconciled. `process` `tmp/mikesaintsg-veneer/ROADMAP.md:399`
- At session start, before a brief, before every landing, and at every re-baseline, each session fetches `origin/main`, reads the log since its marker, reads the other session's plan and decisions, and moves its marker. `process` `tmp/mikesaintsg-veneer/ROADMAP.md:403`
- A session records an intended change to a shared or other-owned site under pending shared changes before the landing, and two pending changes to one site go to the user. `process` `tmp/mikesaintsg-veneer/ROADMAP.md:410`
- The baseline session numbers decisions `D<n>` and the engine session numbers decisions `E<n>`, and a decision that moves the other session's scope or exit criterion is a question for the user. `process` `tmp/mikesaintsg-veneer/ROADMAP.md:415`
- The baseline session adds each landed family's `plugin` row, and the engine session fills that row's Status, Proof, and Obligation cells. `process` `tmp/mikesaintsg-veneer/ROADMAP.md:418`
- Each report to the user names the session's marker. `process` `tmp/mikesaintsg-veneer/ROADMAP.md:422`
- Read the machine-read record from `guides/veneer.md` alone, and treat its compatibility, deferred-selector, departure, addition, and outside-the-ledger sections as the definition of done. `process` `tmp/mikesaintsg-veneer/ROADMAP.md:571`
- Read the pinned upstream input from `tests/fixtures/oracle/inventory.json`, and record no status in it. `process` `tmp/mikesaintsg-veneer/ROADMAP.md:574`
- Read the campaign record from `/home/user/scaffold/.orkestrel/veneer/`, including the engine session's record under `engine/`. `process` `tmp/mikesaintsg-veneer/ROADMAP.md:576`
- State no status a run recomputes in this file. `process` `tmp/mikesaintsg-veneer/ROADMAP.md:583`
- Promote every durable fact into the guide, a rule file, or a commit message before X-RETENTION prunes the campaign folder. `process` `tmp/mikesaintsg-veneer/ROADMAP.md:586`

## Carrier register

The register is an Item and Carrier table of open items from the design round, each with its unit or its recorded drop. `tmp/mikesaintsg-veneer/ROADMAP.md:427`

The columns are Item and Carrier, and the section states no count of rows per status. `tmp/mikesaintsg-veneer/ROADMAP.md:429`

The register does not use `shipped`, `deferred`, `excluded`, or `departure` as a status column. A landed carrier is marked `Closed`, as with the older highlight-token pair. `tmp/mikesaintsg-veneer/ROADMAP.md:432`

The same landed mark appears as `closed`, as with the accounting units. `tmp/mikesaintsg-veneer/ROADMAP.md:434`

A drop is marked `Recorded drop`, as with the `visitBreakpoint` cluster. `tmp/mikesaintsg-veneer/ROADMAP.md:477`

A drop is also marked `dropped on evidence`, as with `.form-control-plaintext:focus`. `tmp/mikesaintsg-veneer/ROADMAP.md:464`

A withdrawn claim is marked `Retired as mis-stated`, as with audit claim 14. `tmp/mikesaintsg-veneer/ROADMAP.md:494`

An item still open names its unit, as with Vue delivery carried by E-VUE. `tmp/mikesaintsg-veneer/ROADMAP.md:482`

Rows marked `Closed` or `closed` are too many to list; their items name accounting, the foundation, forms, passive components, utilities, capture, tokens, Tailwind, motion, the ledger, frames, and appearance. `tmp/mikesaintsg-veneer/ROADMAP.md:434`

Rows whose carrier is still open, or whose text records a drop or an exclusion:

- Outline ghost, dark primary contrast, latched `.active`, the repaired control beside outline secondary, the heading scale, mark highlight, and link colours wait on E-ELEMENTS to assemble the readings and on E-IDENTITY to land the appearance ruling. `tmp/mikesaintsg-veneer/ROADMAP.md:431`
- `::-moz-focus-inner` is a recorded drop held in the guide's deferred selectors, and F5 accounting retains the Chromium-scope exclusion. `tmp/mikesaintsg-veneer/ROADMAP.md:435`
- The container and navigation combinators have their cascade half closed, and the J-ENGINE Collapse unit still carries their behaviour. `tmp/mikesaintsg-veneer/ROADMAP.md:437`
- Later majors of `@vitest/browser-playwright`, `typescript`, and `vitest`, and the vendored `pool: 'forks'` pin, are an exclusion recorded by X-EXIT. `tmp/mikesaintsg-veneer/ROADMAP.md:439`
- The Chrome receipt's promised hosts are recorded by E-RECEIPTS, and the install is the user's. `tmp/mikesaintsg-veneer/ROADMAP.md:441`
- The U1-del legacy tree is a recorded drop that X-RETENTION carries. `tmp/mikesaintsg-veneer/ROADMAP.md:442`
- The U7c paint calibration readings are taken by E-ELEMENTS and landed by E-IDENTITY. `tmp/mikesaintsg-veneer/ROADMAP.md:445`
- The CSS-token noun rule waits on P1 SCAFFOLD-PROPAGATE to land the sentence in the writing rule. `tmp/mikesaintsg-veneer/ROADMAP.md:459`
- `.form-control-plaintext:focus` is dropped on evidence because the release draws no indicator there in any mode. `tmp/mikesaintsg-veneer/ROADMAP.md:464`
- `visitBreakpoint`'s bare `finally`, the hold's uncased refusals, the `resolveButton` rename, and `driveOracle` root scoping are a recorded drop that X-RETENTION verifies. `tmp/mikesaintsg-veneer/ROADMAP.md:477`
- The CL12 guide bounds are a recorded drop that X-RETENTION confirms. `tmp/mikesaintsg-veneer/ROADMAP.md:478`
- Vue delivery is carried by E-VUE as a `src/vue` export with no declared dependency. `tmp/mikesaintsg-veneer/ROADMAP.md:482`
- A later shared class whose Veneer declarations are all normal has its carrier not yet known, and the F8c consumer proof is the trigger that reddens. `tmp/mikesaintsg-veneer/ROADMAP.md:484`
- Audit claim 14 is retired as mis-stated, and E-RECEIPTS runs the distribution proof in release mode. `tmp/mikesaintsg-veneer/ROADMAP.md:494`
- A brief that lists `ROADMAP.md` as both shared and off-limits waits on the next dispatch's brief check, and X-EXIT verifies it. `tmp/mikesaintsg-veneer/ROADMAP.md:507`
- An unlayered consumer `!important` that loses to Veneer's layered important declarations waits on the user to rule IMPORTANT-LAYER. `tmp/mikesaintsg-veneer/ROADMAP.md:508`
- `--vn-focus-reset` and the tertiary role's unread `-subtle`, `-border`, and `-rgb` tiers wait on TOKEN-RETIRE after the engine session answers. `tmp/mikesaintsg-veneer/ROADMAP.md:509`
- LEDGER-RETUNE still carries the canonical values, the `retuned` member, and the `bootstrap` provenance after LEDGER-ADDITIONS closed the rest of that row. `tmp/mikesaintsg-veneer/ROADMAP.md:512`
- The audit verdict is folded into this register, and claims 1, 2, 6, 15, 19, and 23 held and carry nothing. `tmp/mikesaintsg-veneer/ROADMAP.md:518`
- D14's law that `guides/` holds guides alone waits on P1 SCAFFOLD-PROPAGATE. `tmp/mikesaintsg-veneer/ROADMAP.md:519`
- D18's law that an unread `@use` is a dead load waits on P1 SCAFFOLD-PROPAGATE. `tmp/mikesaintsg-veneer/ROADMAP.md:520`
- The first-screen page frame is excluded, because the arrival frame stays whole and the page strips are element frames. `tmp/mikesaintsg-veneer/ROADMAP.md:550`

## Unknowns

- pruned record. `tmp/mikesaintsg-veneer/ROADMAP.md:13`
- pruned record. `tmp/mikesaintsg-veneer/ROADMAP.md:140`
- pruned record. `tmp/mikesaintsg-veneer/ROADMAP.md:227`
- pruned record. `tmp/mikesaintsg-veneer/ROADMAP.md:228`
- pruned record. `tmp/mikesaintsg-veneer/ROADMAP.md:230`
- pruned record. `tmp/mikesaintsg-veneer/ROADMAP.md:231`
- pruned record. `tmp/mikesaintsg-veneer/ROADMAP.md:518`
- D13 to D36 are cited as recorded in `/home/user/scaffold/.orkestrel/veneer/units/decisions-round-2.md` and are not restated in the ranges read. `tmp/mikesaintsg-veneer/ROADMAP.md:561`