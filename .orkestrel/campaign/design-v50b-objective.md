# Objective lane — the setup proof and the distribution proof's browser stage

Every claim below is marked **[measured]** with the command behind it, or **[inferred]** with what it
rests on. Measurements were taken 2026-08-23 in this container: Linux, Node v22.22.2, Vitest 4.1.11,
against the checkouts `scaffold`, `supervisor`, `ollama`, `process`, `mcp`, `terminal` and the live
`registry.npmjs.org`.

## Recommendation

**The setup half.** Do not generate `tests/setup.test.ts`. The brief's candidate assertion does not
merely fail empirically — it inverts a written law. `.claude/rules/tests.md` § Shared test
infrastructure orders "Export every reusable helper, fixture type, factory, constant, and guard from
setup files", and the population the candidate calls a defect is exactly what obeying that order
produces **[measured]**. The vendored block is worse than the evidence file states and better than
its conclusion: `tests/setupPolicy.ts` **and** `tests/policy.test.ts` are *both* vendored at content
ownership in `host.json`, byte-identical in five of six checkouts, so the 53 misses are scaffold's own
bytes and scaffold could close them once — but it would be closing them against a law that mandates
the exports **[measured]**. And the proof cannot be generated for a second, independent reason: the
subject `.claude/rules/tests.md` fixes for `tests/setup*.test.ts` is behavioural — "Reusable behavior
exported from sibling `tests/setup*.ts` modules works as the workspace's suites require" — which is
`compilers.ts:1129`'s class exactly. What closes the setup half instead is three things that are all
checkable: keep `Blueprint.setup`, because `.claude/rules/workspace.md` mandates it verbatim ("When no
file matches, emit neither the project nor the script"); land the one workspace-shape assertion that
*does* survive — no orphan `tests/setup*.ts` module — in the **vendored** `tests/setupPolicy.ts` +
`tests/policy.test.ts` pair, where it is measured green in all six checkouts and red on an injected
control, and where `repair` propagates scaffold's own fix to all 48 targets; and make the gap visible
by emitting an `audit` question for a workspace that carries setup modules and no setup proof, which
is the actual complaint `provision-evidence-correction.md` raised.

**The browser half.** Build it, in-process, inside the generated Vitest `distribution` project — no
child process, no separate project. I ran the whole stage from inside a Vitest `distribution` worker:
programmatic `vite.build()`, loopback server, `chromium.launch()` at the path the *real* generated
`configs/browsers.ts` resolves, page evaluation, and name-set comparison against the installed
declarations read through the TypeScript checker. It passes in 1.06 s (build 351 ms, drive 700 ms)
**[measured]**. Three things the prior evidence did not measure change the design. First,
`resolveBrowser` returns `PlaywrightProviderOptions`, not a path, and it *never* reports "no browser" —
its last resort is an unverified channel — so the stage must attempt the launch and classify the
rejection, which costs 1–2 ms when there is nothing to launch **[measured]**. Second, `--mode release`
reaches `import.meta.env.MODE` only when the `projects` entry is a **function**; an inline object entry
silently keeps `MODE === 'test'`, which would turn the release gate into a skip **[measured]**. Third,
exactly one of the fleet's 69 export entries is flat rather than condition-nested — `@orkestrel/indexeddb`
at `.` — so the declaration locator must be a recursive condition walk; a fixed `entry.import.types`
read returns a `.js` path there **[measured]**. I drove `indexeddb` end to end to confirm the outlier
branch works.

## Rulings

**1. Is there a derivable assertion strong enough to justify generating `tests/setup.test.ts`?**
No, and the candidate is the wrong law. Three findings, in order of force.

*The instrument is right, and understates.* I rewrote `helpers.mjs` as a TypeScript-checker instrument
that resolves real import bindings and resolves every identifier to its symbol, instead of matching
bare names in text. It confirms the evidence and raises it: `supervisor` 88 → 93 misses, `mcp` 80 → 81,
the others unchanged. The name-level test produced *false passes* (`stagePane`, `readFocus`, `readRing`,
`Journal`, and two exports literally named `setup`), never false misses **[measured]**:
`node .orkestrel/campaign/helpers.mjs <6 repos>` and my
`scratchpad/objective/coverage.mjs <6 repos>`.

*`tests/policy.test.ts` genuinely does not import those symbols.* It imports exactly 25 named bindings
from `./setupPolicy.js` (`sed -n '1,30p' tests/policy.test.ts`), against ~90 value exports in that
module (`grep -nE '^export ' tests/setupPolicy.ts`) **[measured]**. The 53 unreferenced are real.

*But the evidence's "cannot fix" is half right and its conclusion does not follow.* `host.json` vendors
**both** `tests/setupPolicy.ts` (digest `3714a96b…`) and `tests/policy.test.ts` (digest `4642dfcf…`),
and `sha256sum` shows both byte-identical in `scaffold`, `ollama`, `process`, `mcp`, `terminal`;
`supervisor` carries an older pair and would be repaired to the same bytes **[measured]**. So the
53 misses are not a gate a target cannot pass — they are a gate only *scaffold* can pass, once, in its
own storage. That correction does not rescue the candidate, for the reason below.

*The candidate contradicts a written law.* `.claude/rules/tests.md` line 180: "Export every reusable
helper, fixture type, factory, constant, and guard from setup files." `AGENTS.md` § Design laws,
Minimal public API: "expose its top-level source exports … regardless of which consumers currently use
them." The exported-but-unreferenced population is compliance, not defect. A generated proof asserting
coverage would make every workspace choose which of two rules to break.

*And the law the brief cites is not the law a setup proof measures.* `.claude/rules/tests.md`
line 59 fixes the subject of `tests/setup*.test.ts` as "Reusable behavior exported from sibling
`tests/setup*.ts` modules **works as the workspace's suites require**". That is behaviour, which is
`compilers.ts:1129`'s class verbatim: a generated placeholder "would read as a proof while measuring
nothing". Rule: **the setup proof falls in that class.**

*Is there a surviving narrowing?* I measured five, across all six checkouts
(`scratchpad/objective/narrow.mjs`) **[measured]**:

| Narrowing | scaffold | supervisor | ollama | process | mcp | terminal |
| --- | --- | --- | --- | --- | --- | --- |
| every setup export referenced anywhere | RED 69 | RED 93 | RED 58 | RED 53 | RED 81 | RED 55 |
| non-vendored modules only | RED 16 | RED 41 | RED 5 | GREEN | RED 28 | RED 2 |
| `tests/setup.ts` only | RED 8 | RED 2 | GREEN | GREEN | RED 3 | RED 2 |
| non-vendored, `export function` only | RED 9 | RED 23 | RED 4 | GREEN | RED 14 | RED 1 |
| **no orphan `tests/setup*.ts` module** | **GREEN** | **GREEN** | **GREEN** | **GREEN** | **GREEN** | **GREEN** |

Every coverage narrowing — by module, by ownership, by export kind — reds in at least four of six,
scaffold's own checkout included. Exactly one narrowing survives, and it is not a coverage assertion:
*a `tests/setup*.ts` module that nothing under `tests/` imports and no configuration names is dead*.

*Does the survivor redden for a real defect?* Yes, and I proved the instrument can fail before trusting
that it passed, per `.claude/rules/tests.md` § Probes. Control: a copy of `process/tests` with
`tests/setupDead.ts` (a module nothing imports) and a dead export appended to `tests/setup.ts`. The
orphan-module check goes **RED(1) → tests/setupDead.ts** on the control and stays GREEN on the
unmodified checkout **[measured]**. The coverage narrowings also redden on the control — but they are
already red on five of six real repos, so they cannot separate a defect from compliant practice.

**2. What closes the derivation, if you refuse to generate.**
*Deviation report first, per the brief's contract.* Item 2's premise conflicts with a measurement, so
I report it rather than design around it. `Blueprint.setup` is **not** self-fulfilling the way
`Blueprint.distribution` was, and it is not "unreachable in 46 packages". `.claude/rules/workspace.md`
§ Vitest projects states the current behaviour as law: "Define the `setup` project only when a root file
matches `tests/setup*.test.ts`, exact-case. Include every matching file. When registered, emit
`test:setup` and run it from `test`. **When no file matches, emit neither the project nor the script.**"
**[measured]**. `CLI.ts:#derive` reads the flag from the target's disk, exactly as it reads
`conformance`, `integration`, `service`, `global`, and `showcase` — every one of which scaffold also
declines to write **[measured]**, `sed -n '948,990p' src/bin/CLI.ts`. `Blueprint.distribution` became
circular only because the reconciled design decided scaffold would start *writing* that file; the
deletion is a consequence of generating, not an independent finding. The branch is reached the way
`ollama`, `process`, and `supervisor` reached it: the package writes its proof and re-runs scaffold.

The user's ruling — 0.0.50 closes the setup proof — is satisfied by closing what is actually open,
which is that the gap is *invisible*, not that it is *unreachable*. Three closures, all checkable:

- **(a) Emit an `audit` question.** For a target where `Blueprint.setup` is false and `tests/` carries
  at least one non-vendored `setup*.ts` module with ≥1 value export, `audit` raises a non-blocking
  question naming the module count and export count. `CLI.ts` already carries advisories that ride the
  comparison without changing an exit code (`sed -n '930,942p' src/bin/CLI.ts`) **[measured]**. This is
  the exact complaint `provision-evidence-correction.md` raised — "nothing in the fleet ever reports
  which packages still lack it" — closed without writing a byte into any target.
- **(b) Land the surviving assertion where it belongs.** The orphan-setup-module check is a *placement*
  law, and `tests/policy.test.ts` is the fixed home for placement law
  (`.claude/rules/tests.md` § Cross-cutting proofs). `tests/setupPolicy.ts` already globs
  `POLICY_TESTS_MODULE_GLOB = 'tests/**/setup*.ts'` for its `mirror` rule (`grep -n
  POLICY_TESTS_MODULE_GLOB tests/setupPolicy.ts`) **[measured]**, so the population is already read
  there. Both files are content-owned in `host.json`, so scaffold writes the rule once and `repair`
  propagates it to 48 targets with no per-package migration — measured green in all six checkouts.
- **(c) Keep the flag.** Ruled in item 3.

Cost of the option I reject: generating `tests/setup.test.ts` with the candidate assertion hands
`scaffold`, `supervisor`, `ollama`, `mcp`, and `terminal` a red gate on adoption — 16, 41, 5, 28, and 2
findings respectively under the most generous narrowing — and `prepublishOnly` then refuses to publish.
Scaffold would ship 0.0.50 with its own gate red.

**3. What happens to `Blueprint.setup`.**
It stays. It is an irreducible structural observation, not a derived duplicate. `blueprintToScripts`
treats it identically to `blueprint.guides` and `blueprint.conformance` (`compilers.ts:343`, `:371`,
`:788`) **[measured]**, and scaffold generates no proof for any of the three. `AGENTS.md` § Design laws
"Derive state … do not store a second flag that can drift" is satisfied: `#derive` computes it from the
target each time; nothing stores it.

Deleting it and always registering the `setup` project is not survivable. Measured: Vitest 4.1.11 exits
**1** with "No test files found" for a project whose include matches nothing **[measured]** —
`vitest run --config vite.config.mjs --project setup` over a config with `include:
['tests/setup*.test.ts']` and no matching file. That reds `npm run test:setup` and the aggregate `test`
chain in every workspace with no setup proof, which is 45 of 48. `.claude/rules/tests.md` § Discovery
already fixes this: "An empty project is not a passing project."

The seeded `tests/setup.ts` being unconditional and empty is not an argument for the flag either way:
it is `birth`-owned (`compilers.ts:1155-1161`), so `audit` never compares it, and
`ARTIFACT_TEMPLATES.tests.setup` is `''` (`templates.ts:1087`) **[measured]**.

**4. Ownership, `audit`, `repair`, in `src/core/types.ts`'s vocabulary.**
Nothing new is owned. Setup modules keep `birth` — "audit never compares it and always reports it
aligned" (`types.ts:24-31`) — so `repair` creates an absent one and touches nothing present. No
artifact is added at `tests/setup*.test.ts`, so scaffold makes no claim there and `audit` reports the
path as `foreign` if it exists. `overwrite` therefore does not delete a package's bespoke setup proof
only because the `foreign` set is narrowed by git tracking; that narrowing is the sole thing standing
between `overwrite` and `ollama/tests/setup.test.ts`, and this design does not change it.

On successor-2's glob question: **by refusing, the ownership model needs no extension.** A presence
claim over a pattern is not expressible, and fixing one canonical path is measurably harmful:
`supervisor` satisfies `Blueprint.setup` through `tests/setupServer.test.ts` and has no
`tests/setup.test.ts` (`ls /home/user/supervisor/tests/setup*.test.ts`) **[measured]**, so a
presence claim at `tests/setup.test.ts` reports it as `missing` and `repair` writes a second, generated
setup proof beside its real one — collected by the same `tests/setup*.test.ts` include. Cost of the
option I reject is that concrete: one measured package in six gets a duplicate proof on first repair.

The two closures in item 2 add ownership only where scaffold already holds it: (b) edits
`tests/setupPolicy.ts` and `tests/policy.test.ts`, both `content`-owned in `host.json`; (a) writes no
file at all.

**5. `ollama`, `process`, and `supervisor`.**
Untouched — no bytes compared, no path claimed, no script rewritten. `supervisor` is a third carrier
the registry sweep missed (successor-2), and it is exactly the case a fixed generated path would have
damaged. Their `test:setup` scripts and `setup` projects continue to be emitted from the disk reading.

**6. Does the empty `ARTIFACT_TEMPLATES.tests.setup` seed stay empty?**
Yes, unchanged. `templates.ts` already states the reason ("Empty barrels, entries, and setup modules
are intentional"), and under this design nothing asserts over the seed, so there is no empty-population
problem to solve by filling it. Filling it would create one: `.claude/rules/tests.md` § Discovery
requires an assertion to "fail rather than pass when its population is empty", and a seeded helper
nothing consumes is precisely the shape item 1 rules out.

---

**7. Where the browser stage gets its executable.**
The generated proof imports `resolveBrowser` and `resolvePinnedBrowser` from `./configs/browsers.js`
(relative from `tests/`), and carries no resolution of its own. Two measurements make that safe and one
makes it necessary. `configs/browsers.ts` is **content**-owned (`compilers.ts:885-892`) and is selected
by `machinery.browser = src.includes('browser') || app.includes('browser')` (`compilers.ts:567`), so
every published-browser-face workspace has it and `audit` compares its bytes **[measured]**.
`.claude/rules/workspace.md` names it a permitted leaf that "imports nothing from the workspace", so a
test importing it respects dependency direction **[measured]**. And it works: I transpiled `mcp`'s real
`configs/browsers.ts` and ran it here **[measured]** —

```
resolvePinnedBrowser()      : /opt/pw-browsers/chromium-1234/chrome-linux64/chrome   (does not exist)
resolveManagedBrowser(pin)  : /opt/pw-browsers/chromium
resolveBrowser(...)         : {"launchOptions":{"executablePath":"/opt/pw-browsers/chromium"}}
```

`browser-stage-evidence.md` asserted the ladder rescues the dead pinned path but drove a *hand-written
imitation* in `rehearsal/drive.mjs`; this is the shipped artifact, and the claim holds.

The correction the design needs: `resolveBrowser` returns `PlaywrightProviderOptions`, not a path. The
proof must map three shapes — `{launchOptions:{executablePath}}` and `{launchOptions:{channel}}` to
`chromium.launch()`, `{connectOptions:{wsEndpoint}}` to `chromium.connect()`, and `{}` to a bare
`chromium.launch()` — and the `{}` and channel branches are unverified by design ("verifying an override
would defeat the override").

What breaks with no `configs/browsers.ts`: the *import* is static, so the file's absence is a collection
error, not a skip. Generate the import under `machinery.browser` (the same predicate that emits the
file), and have the runtime branch fail with a named message when the installed `exports` map presents a
browser target and no resolver was generated. That is the only place blueprint-side and artifact-side
selection can disagree; `repair` regenerates both from one blueprint, so it cannot persist silently.

**8. What the stage bundles and how.**
An installed-package consumer: a scratch root carrying the packed-and-installed package under
`node_modules`, an `index.html`, and one `src/main.ts` that does
`import * as face from '<name><subpath>'` and publishes `Object.keys(face).sort()` on `globalThis`.
Vite's **programmatic** `build({ root, base: './', logLevel: 'silent', build: { outDir: 'dist' } })` —
not a spawned `vite build` — builds it, and a `createServer` bound to `127.0.0.1:0` serves `dist/` to
the page. Measured inside a Vitest `distribution` project: `viteBuild=351ms drive=700ms total=1057ms`,
26 runtime keys, no page error **[measured]**. `browser-stage-evidence.md` established that a registry
install carries its own `@orkestrel/*` runtime dependencies with no copying stage; I re-confirmed it for
a second package (`@orkestrel/indexeddb` → `@orkestrel/contract`, resolved and bundled, 6 modules
transformed) **[measured]**.

**9. How the stage selects its subpaths.**
From the installed `exports` map, by **target**, never by subpath name. For each entry, collect every
target string by recursive walk of the condition object, strip a leading `./`, and classify the subpath
`browser` when any target starts with `dist/src/browser/`. I swept all 48 published manifests: this
selects exactly `console`, `database`, `mcp`, `router`, `test`, `workflow` at `./browser` and
`indexeddb` at `.` — the successor's table, confirmed, none unreadable **[measured]**
(`scratchpad/objective/shapes.mjs`). A name-based selector misses `indexeddb` entirely and would drive
its browser bundle through Node.

**10. What the stage compares, and how a browser-only entry's declarations are located.**
Runtime keys — `Object.keys()` of the namespace object as evaluated in Chromium — against the **value**
exports of the entry's declaration file, read through `checker.getExportsOfModule` with
`getAliasedSymbol` applied and `SymbolFlags.Value` filtered. Name-set equality both ways; no counts.

The locator must be a **recursive walk for the first `types` key in condition order**, resolved relative
to the installed package root. Measured across all 48: 62 entries are `import+require` nested, 6 are
`import` nested, and exactly **1** is flat — `@orkestrel/indexeddb` at `.`, shape
`{types, import, default}` with `types` at the top level. For 6 browser faces the declaration sits at
`entry.import.types`; for `indexeddb` a fixed `entry.import.types` read returns `./dist/src/browser/index.js`,
a JavaScript file **[measured]**. I drove `indexeddb` end to end through the generic locator: 26 declared
value exports, 26 runtime keys, none absent, none undeclared, `indexedDB` present in the page, no page
error **[measured]** (`scratchpad/objective/idbdrive.mjs`).

**11. Failure semantics.**
An unlaunchable browser **is** the same class of missing evidence as an unreachable registry, and the
`--mode release` rule applies unchanged. Both are host-capability absences external to the artifact, and
`.claude/rules/tests.md`'s stated reason — "a proof that skips there passes the gate without ever proving
the artifact installs" — transfers word for word to the browser face. It is also affordable in a way the
registry is not: `resolveBrowser` honours `PLAYWRIGHT_EXECUTABLE_PATH`, `PLAYWRIGHT_WS_ENDPOINT`, and
`PLAYWRIGHT_CHANNEL` ahead of all discovery **[measured]**, so a publishing host that cannot discover a
browser can name one.

Mechanically: **attempt and classify**, never probe-then-decide. `resolveBrowser` cannot report absence —
its last resort is an unverified channel — so availability is only knowable from the launch. Every
failure branch throws fast and distinguishably **[measured]** (`scratchpad/objective/failmode.mjs`):

```
executablePath resolved      LAUNCHED in 212ms
channel chrome (fallback)    THREW after 2ms: Chromium distribution 'chrome' is not found at ...
pinned path (nonexistent)    THREW after 1ms: Failed to launch chromium because executable doesn't exist
default (no options)         THREW after 1ms: Executable doesn't exist at ...chrome-headless-shell...
```

Under `--mode release`, a launch rejection fails the proof, quoting the resolved option shape and the
Playwright message. Outside release mode it skips with that same text as the named reason, satisfying
"Give a conditional skip the mechanism that makes it inapplicable, cited, not the platform name alone."
Cost when there is no browser: 1–2 ms.

**A defect this ruling depends on, which I measured.** `--mode release` reaches `import.meta.env.MODE`
**only when the `projects` entry is a function**. Measured three shapes **[measured]**:

| `projects` entry shape | `--mode release` → `import.meta.env.MODE` |
| --- | --- |
| flat config, no `projects` | `release` |
| inline object in `projects` | **`test`** |
| **function in `projects`** (scaffold's shape) | `release` |

`blueprintToRootVite` emits `projects: [srcCore, srcServer, …, distribution]` — bare function references
(`vite.config.ts:238`) **[measured]** — and Vite calls each with `{command:'serve', mode:'release', …}`,
which is why the gate works today. Any refactor that registers the distribution project as an inline
object, or that splits the browser stage into a second project entry written as an object, silently
converts the release gate into a skip and nothing reports it. Pin this as an acceptance criterion.

**12. In the Vitest `distribution` project, or a child process?**
**Inside the project.** Measured, not argued: a test in a `distribution`-shaped project
(`environment: 'node'`, `browser: { enabled: false }`) imported `playwright` and `vite`, resolved the
browser, built with the Vite JS API, launched Chromium, evaluated the page, and compared against the
checker — 3 tests passed, exit 0, 1.06 s **[measured]**
(`vitest run --config vite.config.mjs --project distribution` over
`scratchpad/objective/stage/tests/apibuild.test.ts`).

`.agents/orchestration.md` § Bench laws is decisive against the alternative: "A Node process spawned by
a bench unit's own Node process has been measured both buffering its pipe until EOF and publishing
nothing at all… It fails as a **false green**." A stage whose verdict arrives through a spawned Node
child's stdio is unverifiable by the agents who will verify it. Chromium is not a Node child and its
transport is Playwright's own, which is why the in-process shape is measurable here and a spawned
`vite build` or a spawned `vitest` would not be. Second reason: `--mode release` does not cross a
process boundary by itself, so a child driver reintroduces the item-11 defect by construction.

**13. The bound on cost and fragility.**
Reaches exactly seven packages: `console`, `database`, `indexeddb`, `mcp`, `router`, `test`, `workflow`
**[measured, item 9]**. No maintainer declares a new dependency — all seven already declare `playwright`,
`@vitest/browser-playwright`, `vite`, `vitest`, and `typescript` (brief's measured ground), and scaffold
itself declares `playwright` and `@vitest/browser-playwright` despite having no browser face
**[measured]**, which is what lets scaffold execute the generated stage in its own suite rather than
only assert its generated text.

What a maintainer must newly do: their publishing host must be able to launch a Chromium, or export one
of the three override variables. That is the whole delta. Added wall time ≈ 1.1 s per browser subpath on
top of the pack-and-install the distribution proof already performs **[measured]**. `@orkestrel/test`
needs no special case: the browser branch imports nothing from `@orkestrel/*`.

**14. Joint: one adoption unit or two, and what a target lacking both reports.**
**One.** Only the distribution proof is generated, so `repair` and `overwrite` gain exactly one new
artifact and one manifest write. The setup half writes nothing into a target; its closures are a
vendored-pair edit that `repair` already carries and an audit question that writes nothing.

What a target reports under `audit`:

- **`tests/distribution.test.ts`** — `missing` at `presence` ownership; `repair` writes it; a package
  that replaced it keeps its bytes untouched.
- **`package.json`** — *nothing*. It is `birth`-owned (`Compiler.ts:284-289`) **[measured]**, so audit
  never compares it and always reports it aligned. **A missing `test:distribution` script therefore
  produces no drift finding at all.** The reconciled compare-and-swap manifest write must run as its own
  writer path reporting through `questions`, not as a repair driven by a drift finding. This is a
  consequence of the reconciled ownership choice that the reconciliation did not state, and it decides
  where the code goes.
- **`tests/setup*.test.ts`** — no artifact, no drift, and instead the new audit question from item 2(a).

**15. Bounded implementation units.** See below.

## Units

Ordered by dependency. Each is independently checkable.

**U1 — Vendored placement rule: no orphan setup module.**
Owned files: `tests/setupPolicy.ts`, `tests/policy.test.ts`, `host.json` (digests), `guides/` parity row.
Add a `PolicyControl` over `POLICY_TESTS_MODULE_GLOB` reporting a `tests/setup*.ts` module that no file
under `tests/` imports and that no `setupFiles`/`globalSetup` entry in the root configuration names.
Acceptance: green on `scaffold`, `supervisor`, `ollama`, `process`, `mcp`, `terminal`; red on a control
workspace carrying `tests/setupDead.ts`; `host.json` digests regenerated. Both measured shapes exist
already in `scratchpad/objective/narrow.mjs`.

**U2 — Audit question for an unproven setup surface.**
Owned files: `src/bin/CLI.ts` (`#derive` neighbourhood and the advisory it already merges),
`src/core/types.ts` (question reason, if the coded set needs a member), `tests/src/bin/CLI.test.ts`.
Acceptance: `audit` over a workspace with ≥1 non-vendored `tests/setup*.ts` carrying ≥1 value export and
no `tests/setup*.test.ts` emits exactly one question naming both counts; exit code unchanged; `ollama`,
`process`, and `supervisor` emit none.

**U3 — Delete `Blueprint.distribution`; generate `tests/distribution.test.ts` at `presence`.**
Owned files: `src/core/types.ts`, `src/core/compilers.ts`, `src/bin/CLI.ts`, `src/core/templates.ts`,
`src/core/constants.ts`, `tests/src/core/compilers.test.ts`, `guides/`.
Selection is `blueprint.src.length > 0` (`compilers.ts:295`). Acceptance: a compiled plan for a
`src: ['core']` blueprint contains `tests/distribution.test.ts` at `presence`; a target with a bespoke
proof reports `aligned`; a target without reports `missing`; `Blueprint.distribution` no longer exists.

**U4 — Core and server branches of the generated proof.**
Owned files: `src/core/templates.ts` (proof template), `src/core/compilers.ts` (branch selection),
`tests/src/core/compilers.test.ts`.
Exports-map reader with the recursive condition walk; subpath classification by target prefix; checker
comparison. Acceptance: over the installed `@orkestrel/router`, the reader returns `.` → core,
`./browser` → browser, `./server` → server, and over `@orkestrel/indexeddb` returns `.` → browser with
declarations at `./dist/src/browser/index.d.ts` — both measured shapes are in
`scratchpad/objective/shapes.mjs`.

**U5 — The browser branch.**
Owned files: `src/core/templates.ts`, `src/core/compilers.ts` (the `machinery.browser`-gated import of
`./configs/browsers.js`), `tests/src/core/compilers.test.ts`.
Programmatic `vite.build()`, loopback server on `127.0.0.1:0`, three-way mapping of
`PlaywrightProviderOptions`, attempt-and-classify launch, `it.skipIf(!launchable && !release)`.
Acceptance: scaffold materializes a browser-face workspace, packs and installs a browser-face package,
and executes the generated branch to a pass in its own suite — scaffold declares `playwright`, so this is
executable, not only assertable as generated text. Second criterion: with
`PLAYWRIGHT_EXECUTABLE_PATH=/nonexistent`, the branch skips outside release mode and **fails** under
`--mode release`.

**U6 — Manifest script region: compare-and-swap.**
Owned files: `src/core/compilers.ts`, `src/bin/CLI.ts`, `tests/src/core/compilers.test.ts`.
Acceptance: a recognized predecessor chain is upgraded to include `test:distribution` and
`npm run test:distribution -- --mode release` in `prepublishOnly`; a customized chain is refused with no
mutation and one question; and because `package.json` is birth-owned, the refusal and the write both
report through `questions`, never through a drift finding.

**U7 — Release-mode regression guard.**
Owned files: `tests/config.test.ts`.
Acceptance: an assertion that every entry of the root `projects` array is a **function**, with the
measured reason recorded — an inline object entry keeps `import.meta.env.MODE === 'test'` under
`--mode release` and silently converts the publish gate into a skip.

## Risks

- **If `.claude/rules/tests.md` line 180 is revised** to stop mandating exhaustive setup exports, item
  1's normative argument weakens to an empirical one. The empirical one still stands: five of six
  checkouts red under every coverage narrowing.
- **If a browser-face package's `configs/browsers.ts` has drifted from the template**, the generated
  proof imports symbols that may not exist. Content ownership makes this a reported `stale`, not a
  silent break — but `repair` must run before the proof does, and only `mcp` of the seven was read here.
- **If a browser-face package's own browser entry needs a DOM API Chromium gates** behind a secure
  context or a permission, the bundle evaluates but the module may throw at import. `router` and
  `indexeddb` did not; five browser faces are unmeasured.
- **If Vitest changes how a function-valued `projects` entry receives `mode`**, U7's guard reddens rather
  than the release gate silently degrading. That is the intended failure direction.
- **If the audit question in U2 is treated as blocking by any caller**, 45 packages go red. It must ride
  `questions`, which `CLI.ts` already documents as non-blocking.
- **If `overwrite`'s `foreign` narrowing by git tracking is ever relaxed**, the bespoke setup proofs in
  `ollama`, `process`, and `supervisor` become deletable. Nothing in this design touches that narrowing,
  and nothing in it protects them either.

## Unknowns

- **Whether the remaining five browser-face packages bundle and evaluate cleanly.** Measured for
  `router` and `indexeddb` only. Settled by running the U5 stage against `console`, `database`, `mcp`,
  `test`, and `workflow` from the registry — cheap here, ~1.1 s each, and I recommend U5's acceptance
  require it.
- **Whether any browser-face workspace lacks `configs/browsers.ts` or carries a drifted copy.** Only
  `mcp` of the seven is checked out; `supervisor` (no browser face) explains the 8-vs-7 census gap per
  successor-2. Settled by a fleet-wide checkout reading, which this container cannot take. It does not
  change any ruling: item 7 gates the import on the same predicate that emits the file.
- **How many setup-proof carriers exist on unpublished commits.** `supervisor` proved the registry sweep
  lags. Since nothing is generated and no path is claimed, the count changes no ruling — it only changes
  how many targets U2's question skips.
- **Whether the `{}` branch of `resolveBrowser`** (pinned revision genuinely installed) launches on a
  host where it is reached. Unreachable here: `chromium.launch()` with no options fails on this
  container **[measured]**. Settled on a host with a complete Playwright install.
