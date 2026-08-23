# Subjective lane — the setup proof and the distribution proof's browser stage

Held on Opus 5 in a clean context. The lane's allowlist carried no Bash, so it could not write
this file itself and returned the answer inline; the Orchestrator transcribed it verbatim. That
was a dispatch error against the brief-check rule requiring the output mechanism to be checked
against the executor's tool allowlist.

## Recommendation

**The setup half.** Generate `tests/setup.test.ts` in every workspace, and delete `Blueprint.setup`
as a field that can only ever be true. The proof does not import the setup modules — it reads them
through the TypeScript compiler checker, the same mechanism the distribution proof uses — and it
asserts one derived relation: every value a `tests/setup*.ts` module exports is imported by some
other file under `tests/`. That law is `AGENTS.md` § Design laws "Export and test reusable logic.
No hidden module helpers or declarations," and `.claude/rules/tests.md` § Shared test
infrastructure "Export every reusable helper, fixture type, factory, constant, and guard from setup
files." It is not in the class `src/core/compilers.ts:1129` refuses: the guide and conformance
proofs name an official artifact outside the workspace, and this proof's whole subject is inside
it. Reading rather than importing is forced, not stylistic: `ARTIFACT_TEMPLATES.tests.setup` is the
empty string, an empty file is not a module, the vendored lint config refuses an unassigned import,
and `tests/setupBrowser.ts` carries DOM and Vue helpers that cannot load in the `setup` project's
Node environment. Because `tests/setup.ts` is seeded unconditionally in every workspace, the proof
is unconditional too, and the `setup` project and the `test:setup` script join `policy` and
`config` as the cross-cutting proofs whose subject is the workspace itself.

**The browser half.** The browser stage runs inside the generated Vitest `distribution` project, in
Node, driving Playwright as a library — no second Vitest project, no browser-mode project, no
spawned child, and no listening socket. It builds a consumer of the installed package with the
`vite` Node API at `write: false`, injects the resulting IIFE into an `about:blank` page with
`addScriptTag`, and reads back the module namespace object's keys. It selects its subpaths by
testing each `exports` target path against `dist/src/browser/`, never by subpath name, because
`indexeddb` publishes its browser face at the root subpath. It locates declarations from the
`types` condition sitting beside the browser target in the same condition block, reads that `.d.ts`
through the checker, keeps the symbols carrying a value meaning after alias resolution, and
compares that name set against the browser namespace keys — the identical comparison the Node
branch makes, differing only in how the namespace was acquired. Under `--mode release` a browser
that cannot launch fails the proof; outside release mode it skips, citing the launch error. That
costs the browser-face packages nothing new, because `prepublishOnly` already runs `npm test`,
which already runs their `src:browser` project in Playwright Chromium.

## Rulings

**1. Is there a derivable assertion strong enough to justify generating the proof?** Yes, and it is
the candidate law, adopted with one sharpening. The reference relation is the only law left that is
derivable from the workspace shape, is not already owned by another instrument, and reddens for a
real defect — a helper left behind after the last test using it was deleted. Two rivals are
rejected with their cost named. The "`describe`, `it`, and `expect` never appear in a `setup*.ts`"
law is syntactic and single-file, so `.claude/rules/workspace.md` § Policy instruments puts it in
`configs/policy.ts` or the policy sweep; measuring it here would give one rule two instruments,
which that rule forbids. "Every `setupFiles` module the root configuration names resolves" is
`tests/config.test.ts`'s stated subject; measuring it here duplicates that proof. The sharpening: a
reference is an *import* of the name by another file under `tests/`, so a use inside the declaring
module does not count. Without that, an internal helper that never needed exporting passes, and
internal-only exports are most of what the law exists to catch.

**2. What it asserts, derived or literal.**

| Property | Derived or literal |
| --- | --- |
| The sibling `tests/setup*.ts` module set | Derived at runtime, globbed from the `tests/` directory resolved against `import.meta.url` |
| Each module's exported value names | Derived at runtime through the checker over the workspace `tsconfig.json` program, aliases resolved, type-only exports dropped |
| Each name imported from a setup module by another file under `tests/` | Derived at runtime from resolved import declarations; a namespace import references every export of its target |
| The unreferenced remainder | Derived; asserted equal to an empty name list, and the failure prints the names |
| `'tests/setup.ts'` as a required member of the discovered module set | Literal |
| The glob `'setup*.ts'` and the project path `'tsconfig.json'` | Literal |

Nothing package-specific is emitted — no package name, no export name, no tally. The literal
membership assertion is the instrument's own liveness check and is what `.claude/rules/tests.md`
requires when it says an assertion must fail rather than pass when its population is empty: a wrong
anchor or a wrong working directory returns an empty glob and reddens instead of passing. The
export relation is genuinely empty in a fresh workspace and genuinely non-empty the moment a helper
is written, which is the same contract `ARTIFACT_TEMPLATES.tests.entry` already ships.

**3. What happens to `Blueprint.setup`.** Delete it, for a reason stronger than the one that deletes
`Blueprint.distribution`. Distribution is a derived duplicate of `publishes`. Setup, once scaffold
emits the proof unconditionally, is a field that can only ever hold one value — and `AGENTS.md`
§ Design laws refuses a stored fact that duplicates a derivable one. There is no replacement
predicate, because there is no condition: `blueprintToScripts` emits `test:setup` and adds it to the
`test` chain unconditionally, and `blueprintToRootVite` pushes `CONFIG_TEMPLATES.factories.setup`
unconditionally, exactly as it already does for `policy` at `src/core/compilers.ts:784` and
`config` at `:786`. That produces a vocabulary the generated workspace can be read from: the
cross-cutting proofs whose subject is the workspace itself — placement, configuration, test
infrastructure — are unconditional; the proofs whose subject is something only the package knows —
guides, conformance, integration, service — stay conditional; distribution follows `publishes`.
`src/bin/CLI.ts:970` loses its `tests/` scan for `setup`, which is the self-fulfilling derivation
itself.

**4. Ownership, `audit`, and `repair`.** `presence`, in `src/core/types.ts`'s own terms: audit
compares existence, and a write restores an absent file and never touches present bytes. Group
`tests`, origin `template`, emitted by `blueprintToTestArtifacts`. A target lacking the file reports
`drift: 'missing'` with `ownership: 'presence'`, and `auditToExit` returns the drift code. `repair`
writes it and never returns to it. This is the same ruling the distribution round reached, for the
same reason: under `birth`, audit reports every target lacking the proof as aligned, so nothing in
the fleet ever reports which packages still lack it.

**5. `ollama` and `process`.** Nothing happens to their bytes. Presence never touches a present
file, so `ollama`'s behavioural proof over its recorders, fixtures, and guards, and `process`'s
proof over `resolveChildFixture` and `childCommand`, both survive untouched, and both already
declare `test:setup`, so their audit reports the path aligned and the script region recognized. The
honest cost, taken rather than hidden: the reference law is measured only where the generated seed
survives, so those two packages leave it unmeasured. The fix that would close it — content
ownership over the proof — is rejected because it would delete both bespoke proofs, which is the
outcome the distribution round already refused for the same reason. The mitigation is that the
seed's derived block is additive: a package extending the seed with behavioural assertions keeps
the block, and the guide states that as the expected shape.

**6. Does the empty `ARTIFACT_TEMPLATES.tests.setup` seed stay empty?** Yes. Giving it content would
invent a helper no workspace asked for, which `AGENTS.md` § Design laws refuses as mechanism
overreaching into product policy and as a speculative addition with no first consumer. The empty
seed and the derived proof are coherent together: the proof reads the file rather than importing
it, so an empty file is a legal input that yields an empty relation, and the first exported helper
is what puts the relation under load.

**7. Where the browser stage gets its executable.** It imports `resolveBrowser` and
`resolvePinnedBrowser` from `../configs/browsers.js` — the workspace's own module, not a copy. Two
facts make that safe rather than fragile. `configs/browsers.ts` is emitted at
`src/core/compilers.ts:887` with `ownership: 'content'` whenever `blueprintToMachinery(blueprint).browser`
holds, and that predicate is true for every workspace with a published browser face. So the same
plan that writes the proof writes the resolver, and content ownership means `repair` restores it
byte-exact whenever it drifts or disappears. What breaks if a browser-face workspace has no
`configs/browsers.ts`: the proof fails to load, the `distribution` project reports a resolution
error, and the repair is `scaffold repair`, which the audit already demanded by reporting the file
missing. That is a better failure than the alternative — carrying a second copy of the resolution
inside the proof template would put the fleet's Chromium, Chrome, and Microsoft Edge discovery in
two places that can disagree, which is the duplicate the centralization law exists to prevent.
Calling `resolveBrowser` through `vite.config.ts`'s already-computed `browserOptions` is also
rejected: the proof would then import the root configuration to reach a value, and the root
configuration is not a module a test imports.

**8. What the stage bundles and how.** The consumer is a generated entry written into the scratch
directory the Node branch already created, installed, and populated:

```ts
import * as subject from '<the installed specifier for this subpath>'
globalThis.subject = subject
```

The Vite configuration that builds it is neither `vite.config.ts` nor
`configs/src/vite.browser.config.ts` — both build the workspace's own source, and the stage's
subject is a consumer of the installed package. It is an inline configuration constructed in the
proof and passed to `build` from `vite`: `root` set to the scratch consumer directory so resolution
walks that directory's `node_modules`, `logLevel: 'silent'`, `build.write: false`,
`build.rollupOptions.input` naming the written entry, and `build.rollupOptions.output.format: 'iife'`.
What is served to the browser is nothing — there is no server. The stage calls `page.setContent` for
a bare document, `page.addScriptTag({ content })` with the returned code, and
`page.evaluate(() => Object.keys(globalThis.subject))`. The IIFE format is load-bearing: a classic
script needs no fetch and no origin, so it sidesteps both module-script CORS on a `file://` or
`about:blank` document and any need for a listening socket — and `.agents/orchestration.md`
§ Bench laws records that a bench sandbox denies `listen` on every address, which is exactly the
environment an agent verifies this in. Reading a namespace object rather than a bundle's exports
keeps the comparison identical to the Node branch's `Object.keys(await import(...))`.

**9. How the stage selects its subpaths.** For each key in the installed `exports` map other than
`./package.json`, it walks the condition block to its target string and tests that target against
`dist/src/browser/`. A subpath whose target lies there takes the browser branch; every other
subpath takes the Node branch. Selection is never by subpath name, because `indexeddb` publishes
its browser face at the root subpath `.` and a name-driven rule would drive its browser bundle
through Node — which is precisely the reading a Node import cannot falsify, so the miss would be
silent. The rule also needs no `require` branch: no browser-face subpath in the fleet declares one,
and a subpath that grows one later still selects correctly because the rule reads targets rather
than condition names.

**10. What the stage compares, and how a browser-only entry's declarations are located.** It
compares the sorted name set from `Object.keys(globalThis.subject)` in the page against the sorted
value-export names of the entry's declarations. The declarations are located from the same
condition block that supplied the browser target: the sibling `types` value inside it, resolved
against the installed package root. Never by substituting `.d.ts` for `.js` on the target path —
the map declares where the types are, and the reconciled ground fixes that assertions derive from
the installed `exports` map and the built declarations. Every browser-face subpath in the fleet
declares `types`, so the lookup is total today; a block with no `types` fails the proof naming the
subpath, rather than guessing. The declarations are read by creating a program over that single
`.d.ts`, taking the module symbol's exports, resolving each alias symbol to its target, and keeping
those whose flags carry a value meaning. Type-only exports drop out, which is what makes the
comparison against runtime keys meaningful, and alias resolution is what makes a re-export visible
— the failure a declaration-text walk produces.

**11. Failure semantics.** An unlaunchable browser is the same class of missing evidence as an
unreachable registry, and takes the same treatment. Under `--mode release` the proof fails, naming
the provider options the resolver chose and the launch error. Outside release mode it skips, citing
the launch error as the mechanism, which is the citation `.claude/rules/tests.md` requires of a
conditional skip. Two facts settle this. First, `resolveBrowser` at `src/core/templates.ts:1020`
never returns `undefined` — its last branch returns an unverified platform-default channel — so
browser absence is not knowable before a launch attempt, and any design that tried to skip on "no
browser found" would be reading a value that never says so. Second, failing under release costs the
affected packages nothing: `blueprintToScripts` at `src/core/compilers.ts:426` puts `npm test` in
`prepublishOnly` ahead of `npm run test:distribution -- --mode release`, and `npm test` runs
`test:src`, which runs the `src:browser` project in Playwright Chromium. A browser-face package that
cannot launch a browser already cannot publish. The release gate exists so no artifact ships without
the proof having actually run, and the browser entry is the single entry a Node import cannot check
— a skip there is the exact hole the gate was built to close.

**12. Inside the `distribution` project, or a child process.** Inside the project, in Node, driving
Playwright as a library. Both alternatives are rejected on named costs. A spawned Node child is
refused because `.agents/orchestration.md` § Bench laws records a child's stdio measured both
buffering until EOF and publishing nothing, and records the resulting failure shape as a false
green — the stage never arms, the request never resolves, and the timeout produces the same
rejection a genuine timeout produces, so a bench run passes while the host's gate reports the honest
red and neither run explains the disagreement. A second Vitest project in browser mode is refused
because a project carries one environment, so the browser branch would need its own project name
and its own fixed path, and both the cross-cutting proof table in `.claude/rules/tests.md` and the
project matrix in `.claude/rules/workspace.md` would grow a row for one branch of a proof that
already has a row. The `distribution` project is already sized for this: `environment: 'node'`,
120-second test and hook timeouts, `fileParallelism: false`. Playwright is a Node library, so the
whole stage — pack, install, build, launch, evaluate, compare, close — sits in one process with one
lifecycle and one failure surface.

**13. The cost and fragility bound.** The stage reaches the browser-face packages: `console`,
`database`, `indexeddb`, `mcp`, `router`, `test`, and `workflow`, with `test` additionally unable to
import `@orkestrel/test` and taking the same accommodation the Node branch already makes for it.
What a maintainer of one of them must do that they do not do today: nothing in `package.json` and
nothing on the machine. `vite`, `vitest`, and `typescript` come from `BASE_DEV_DEPENDENCIES` at
`src/core/constants.ts:399`; `playwright` and `@vitest/browser-playwright` come from
`SOURCE_BROWSER_DEV_DEPENDENCIES` at `:419`, which a published browser face already selects. What
changes for them is time and a new red: `prepublishOnly` grows one Chromium launch plus one Vite
build per browser subpath, and a browser export whose runtime keys disagree with its declaration
value exports now blocks the publish. That red is the point of the stage.

**14. One adoption unit or two.** One. Both proofs are group `tests`, origin `template`, ownership
`presence`, emitted by `blueprintToTestArtifacts`, so `repair` and `overwrite` already write them
through the path they use for every planned artifact — no verb-level work at all. The single
genuinely new writer is the manifest script region, and it serves both: `test:setup` and its place
in the `test` chain for one, `test:distribution -- --mode release` and its place in `prepublishOnly`
for the other. Shape it as `replaceManifestScripts` in `src/core/compilers.ts`, a sibling of
`replaceManifestRanges` with the same `string | undefined` convention, replacing values in place so
every byte outside the named ranges survives. Its recognized predecessor state is already
computable: the target's current value for a script equals `blueprintToScripts` over the blueprint
with the proof absent, or the script is absent entirely. Anything else returns `undefined` and the
region is left untouched — and the refusal degrades exactly onto the non-blocking question
`src/bin/CLI.ts:1219` already raises, which walks the gate chain, finds a registered project no
gate reaches, distinguishes "the script is missing" from "the gate is missing," and prints the exact
line to paste. The writer closes the recognized case; the unrecognized case keeps the advisory that
exists today.

On the surface that writer needs: `MaterializerInterface.declare` currently takes two positional
dependency lists. A fifth verb for a second manifest region is refused — both regions are one
concept, the parts of a birth-owned manifest scaffold computes. They group under the entity noun,
per `.claude/rules/patterns.md` § Options:

```ts
interface ManifestRegions {
	readonly pins: DependencyPinSet
	readonly scripts: Readonly<Record<string, string>>
}

declare(regions: ManifestRegions, target: string): MaterializeResult
```

Every current caller in `src/bin/CLI.ts` passes both regions, and the positional pair collapses into
the set it always was.

A target lacking both proofs reports two findings under `audit`: `tests/setup.test.ts` and
`tests/distribution.test.ts`, each `group: 'tests'`, `ownership: 'presence'`, `drift: 'missing'`,
and the run exits drift. If its script region is also unrecognized it additionally carries the
non-blocking projects question naming the unreached projects. That is the whole report a maintainer
needs and it is derivable, not stored.

**15.** See Units.

## Units

Ordered by dependency. Each names its role and engine so the routing ledger is derivable.

**U1 — Contract.** Role `sol`, engine GPT-5.6 Sol. Owns `src/core/types.ts`. Deletes
`Blueprint.setup` and its `@remarks` clause, declares `ManifestRegions`, and revises
`MaterializerInterface.declare`. Shared and report-only: none. Accepts when `npm run check` is clean
across the tree, `Blueprint` declares no `setup` member, and `ManifestRegions` carries readonly
members only. Depends on nothing.

**U2 — Unconditional setup project and script.** Role `sol`, engine GPT-5.6 Sol. Owns
`src/core/compilers.ts` (`blueprintToScripts`, `blueprintToRootVite`) and `src/bin/CLI.ts`
(`#derive`). Removes the `blueprint.setup` gates at `compilers.ts:343`, `:371`, and `:788`, and the
`tests/` scan at `CLI.ts:971`. Accepts when `blueprintToScripts` over a blueprint declaring no `src`
and no `app` returns a `test:setup` entry and a `test` chain naming it, `blueprintToRootVite` over
that same blueprint emits `label: 'setup'`, and `npm run check` plus the scoped `src:core` and
`src:bin` suites are green. Depends on U1.

**U3 — The generated setup proof.** Role `implementer`, engine Opus 5. The generated file is
developer-facing prose and assertion shape that a maintainer reads and extends, which is the
subjective work class. Owns `src/core/templates.ts` (a new `ARTIFACT_TEMPLATES.tests.proof` entry),
`src/core/compilers.ts` (`blueprintToTestArtifacts`), and `src/core/constants.ts`
(`SETUP_TEST_PATH`). Accepts when `blueprintToTestArtifacts` over any blueprint returns an artifact
at `tests/setup.test.ts` with `ownership: 'presence'` and `origin: 'template'`; when a workspace
generated into a scratch directory passes its own `npm run test:setup`; and when the failing proof
is recorded — add an unreferenced export to that workspace's `tests/setup.ts`, record `test:setup`
red naming the symbol, remove it, record the same command green. Depends on U2.

**U4 — The manifest script region writer.** Role `sol`, engine GPT-5.6 Sol. Compare-and-swap over a
recognized predecessor is constraint work with an exact refusal condition. Owns
`src/core/compilers.ts` (`replaceManifestScripts`), `src/server/Materializer.ts` (`declare`), and
`src/bin/CLI.ts` (the three `declare` call sites at `:353`, `:413`, and `:518`). Accepts when a
manifest whose named scripts all match the predecessor is rewritten with every byte outside those
ranges unchanged; when a manifest with any named script holding an unrecognized value returns
`undefined` and the file is not written; when the existing projects question still fires for the
refused case; and when the `src:server` and `src:bin` suites are green. Depends on U1.

**U5 — The browser stage.** Role `sol`, engine GPT-5.6 Sol. Export-map traversal, checker symbol
resolution, and Playwright lifecycle are constraint-heavy. Owns the distribution proof template in
`src/core/templates.ts` and its emission branch in `src/core/compilers.ts`. Accepts when the
generated proof for a browser-face blueprint contains the target-path selection rule and no
subpath-name rule; when the emitted proof imports `resolveBrowser` from `../configs/browsers.js`;
when a scratch workspace built from a browser-face blueprint passes `test:distribution` on a host
with a launchable browser; when the same command under `--mode release` on a host whose
`PLAYWRIGHT_EXECUTABLE_PATH` names a non-executable path fails rather than skips; and when it skips
outside release mode under the same condition. Depends on the reconciled distribution core unit,
which sits outside this design.

**U6 — Scaffold's own adoption.** Role `implementer`, engine Opus 5. Scaffold is server-face, so it
takes the setup proof and no browser stage. Owns `tests/setup.test.ts` and the `scripts` region of
`package.json` in this repository. Accepts when `npm run test:setup` is green here and `npm test`
invokes it. Depends on U3 and U4.

**U7 — Rules and guide parity.** Role `implementer`, engine Opus 5. Owns
`.claude/rules/workspace.md` (the `setup` project row and the "Define the `setup` project only when
a root file matches" directive, which this design falsifies), `.claude/rules/tests.md` (the
`tests/setup*.test.ts` row in Cross-cutting proofs, which must name the generated seed's subject
beside the behavioural one), and the matching guide in `guides/`. Accepts when no rule file states a
condition on the `setup` project, when the guide documents the seed's derived block and the presence
ownership that preserves a replacement, and when `npm test` here is green including the parity
proof. Depends on U2 and U3.

## Tensions

Named for the objective lane to challenge, or for the Orchestrator to rule.

- **Deleting `Blueprint.setup` outright rather than deriving it.** The lane rules the field can only
  ever be true and therefore is not a structural fact. The objective lane may hold that a workspace
  could legitimately want no setup project, and that the field is the seam that expresses it. The
  cost if wrong: a workspace that deletes the proof gets a red `test` run from an empty Vitest
  project, which `.claude/rules/tests.md` § Discovery names as a real failure mode.
- **A reference is an import by another file, not a use inside the declaring module.** This is the
  sharpening that gives the proof teeth. It also means a setup module using its own exported helper
  internally must still be imported somewhere under `tests/` or the proof reddens. Judged correct —
  an export nothing imports is not exported infrastructure — but it is a judgment call.
- **Refusing to load the setup modules.** Reading through the checker rather than importing is
  forced by the browser setup module and the empty seed, but it means the proof measures a static
  relation and never that the helpers work. The behavioural half of the row in
  `.claude/rules/tests.md` stays the package's to write.
- **Grouping `declare` into `ManifestRegions`.** This changes a signature and three call sites for a
  shape improvement rather than a correctness one. A lane arguing minimal diff would keep positional
  arguments and add a fourth.
- **Playwright as a library rather than Vitest browser mode.** The lane trades the framework's
  browser integration for one process and one failure surface. A lane may hold that a project the
  framework configures is more maintainable than a launch the proof owns.
- **IIFE plus `addScriptTag` rather than a served bundle.** Chosen so the stage needs no listening
  socket, which a bench sandbox denies. It costs the stage the ability to prove anything about how
  the package behaves when loaded as a module script over HTTP.

## Risks

- **The generated setup proof reddens across the fleet on first adoption.** Packages such as `mcp`
  carry substantial `tests/setup.ts` modules, and any unreferenced export there fails immediately.
  That is the proof working, but a release wave must absorb it. Settling evidence: run the proof's
  reading against the checked-out `mcp`, `terminal`, `ollama`, and `process` before the fleet visit,
  and name the offending symbols per package. Both repairs — delete the export or use it — are
  mechanical.
- **Inline module or classic script execution on `about:blank` is asserted, not measured.** The lane
  did not run `page.setContent` followed by `addScriptTag` with an IIFE and read a global back.
  Settling evidence: a runtime probe that launches through `resolveBrowser`, injects a two-line
  IIFE, and reads the global. If it fails, the fallback is writing the bundle to the scratch
  directory and navigating to a `file://` document, which keeps the no-socket property.
- **Vite's Node build API resolving the installed package from the scratch consumer is asserted, not
  measured.** The install that makes the Node branch's `import` work also populates `node_modules`
  for the bundle, so the runtime dependencies are present — but Vite's condition resolution for the
  `browser` condition from a `root` outside the workspace is unproven. Settling evidence: the same
  probe, extended to build a two-line consumer of an already-installed browser-face package and read
  `output[0].code`.
- **The `test` chain's predecessor state is unmeasured.** The census measured that every package
  lacking the distribution proof carries the same scaffold-generated `prepublishOnly` shape. Nothing
  measured `scripts.test`. If targets have customized it, the writer refuses without mutation and
  the maintainer gets the existing advisory — the design degrades correctly, but the fleet visit
  costs more hand edits than planned. Settling evidence: read `scripts.test` across the committed
  census.
- **The checker read costs wall-clock in every workspace's `npm test`.** Creating a program over the
  workspace `tsconfig.json` is the expensive part, and the `setup` project has no raised timeout.
  Settling evidence: time `test:setup` in the largest checked-out package. If it exceeds the default
  timeout, the fix is a raised `testTimeout` in `CONFIG_TEMPLATES.factories.setup`, matching what
  `config` already does at 45 seconds for the same reason.

## Unknowns

- **The eighth `configs/browsers.ts`.** The lane narrows it without a fleet checkout: the file is
  emitted when `src` includes `browser` or `app` includes `browser`, so the disagreeing package
  almost certainly carries a private browser application and no published browser face. The answer
  changes no ruling: selection in ruling 9 reads published export targets, which a private `app`
  face never produces, so such a package takes no browser stage; and ruling 7 depends only on the
  file being present wherever `machinery.browser` holds, which is the same predicate that emits it.
  (The Orchestrator settled this independently: `supervisor` carries `app/browser` and publishes no
  browser face.)
- **Whether any generated workspace's `scripts.test` diverges from the scaffold shape.** Named in
  Risks with its settling read.
- **Whether the checker's value-meaning filter agrees with a browser namespace's keys for a package
  that re-exports a class through an alias chain.** The mechanism is right; the exact `SymbolFlags`
  predicate after `getAliasedSymbol` is an implementation detail U5 must settle with a case, not
  assert. Settling evidence: run the comparison against `mcp`'s published browser declarations and
  its built browser bundle, and confirm the two name sets match before the proof is generated
  anywhere.
