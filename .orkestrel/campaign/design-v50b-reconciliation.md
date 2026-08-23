# Reconciliation — the setup proof and the browser stage

Both lanes ran on one brief with two successors and three executed-evidence files, in clean
contexts, blind to each other. `planner` held the subjective lane on Opus 5. The objective lane's
default engine is GPT-5.6 Sol; that bench was dark for the whole round, so Opus 5 held it too, in a
separate clean context forbidden from reading any file naming the subjective lane.
`.orkestrel/campaign/routing-v50b.md` records the substitution and the recovery attempt behind it.

The round produced a real disagreement on the setup half, and the objective lane wins it on written
law and measurement rather than on argument. The Orchestrator re-ran every load-bearing measurement
before ruling.

## The setup half — do not generate a setup proof

Ruled for the objective lane, against the subjective lane, on grounds verified first-hand.

**A written rule states the conditional emission as law.** `.claude/rules/workspace.md:137` reads
"Define the `setup` project only when a root file matches `tests/setup*.test.ts`, exact-case.
Include every matching file. When registered, emit `test:setup` and run it from `test`. When no file
matches, emit neither the project nor the script." Deleting `Blueprint.setup` and registering the
project unconditionally falsifies that rule. The subjective lane proposed amending it; the rule is a
decision, not an accident.

**A written rule fixes the setup proof's subject as behaviour.** `.claude/rules/tests.md:59` and
`.claude/rules/workspace.md:130` both read "Reusable behavior exported from sibling
`tests/setup*.ts` modules works as the workspace's suites require." Behaviour is what
`src/core/compilers.ts:1129` already refuses to generate, for the guide and conformance proofs, on
the ground that a generated placeholder reads as a proof while measuring nothing. The setup proof
falls in that class, and scaffold's own stated policy therefore decides it.

**A written rule mandates the exports the candidate assertion would call defects.**
`.claude/rules/tests.md:180` reads "Export every reusable helper, fixture type, factory, constant,
and guard from setup files." `AGENTS.md` § Design laws, Minimal public API, exposes a capability
"regardless of which consumers currently use them". The exported-but-unreferenced population that
`setup-proof-evidence.md` measured is compliance with those rules, not a defect. A generated proof
asserting helper coverage would redden for obedience.

**Deleting the flag reds the fleet.** Vitest 4.1.11 exits 1 with no test files found for a project
whose include matches nothing, re-measured here on a scratch workspace with a function-form
`projects` entry. Registering the `setup` project unconditionally would therefore turn `test:setup`
and the aggregate `test` chain red in every package carrying no setup proof.

**No coverage narrowing survives.** The objective lane rewrote the instrument as a TypeScript
checker reading real import bindings, which confirmed the name-level instrument and raised its
misses — the name-level test produced false passes, never false misses. Narrowing by module, by
ownership, and by export kind each stays red in at least four of the six checkouts, scaffold's own
included. Exactly one narrowing is green in all six and red on an injected control, and it is not a
coverage assertion: **a `tests/setup*.ts` module that nothing under `tests/` imports and no
`setupFiles` or `globalSetup` entry names is dead.**

### A correction to this campaign's own evidence

`.orkestrel/campaign/setup-proof-evidence.md` states that the vendored block cannot be fixed by the
target. That is half wrong. `host.json` vendors `tests/policy.test.ts` at line 641 as well as
`tests/setupPolicy.ts` at line 647, so the pair is scaffold's own bytes and scaffold could close
those misses once and propagate the fix through `repair`. The file's conclusion survives its reason:
closing them would mean deleting exports `.claude/rules/tests.md:180` mandates.

### What closes the setup gap instead

The user's complaint was that nothing in the fleet ever reports which packages lack the proof. That
gap is visibility, not reachability — `Blueprint.setup` reads from the target's disk exactly as
`conformance`, `integration`, `service`, `global`, and `showcase` do, every one of which scaffold
also declines to write, and `ollama`, `process`, and `supervisor` all reached the branch by hand.
Three closures, each independently checkable:

- Keep `Blueprint.setup`.
- Land the orphan-setup-module rule in the vendored `tests/setupPolicy.ts` and `tests/policy.test.ts`
  pair, where `POLICY_TESTS_MODULE_GLOB` already reads that population and `repair` propagates
  scaffold's own fix to every target.
- Emit an `audit` question for a target carrying non-vendored setup modules with value exports and
  no setup proof, on the non-blocking advisory channel `src/bin/CLI.ts` already merges.

## The browser half — both lanes agree, and the objective lane corrects three details

Both lanes independently reached: the stage runs in-process inside the generated Vitest
`distribution` project rather than in a spawned child; it imports the workspace's own
`configs/browsers.js` rather than carrying a second copy of the resolution; it selects subpaths by
export **target** path rather than by subpath name; it compares runtime keys against declaration
value exports read through the checker with aliases resolved; and under `--mode release` an
unlaunchable browser fails rather than skips.

Three corrections the objective lane measured and the subjective lane asserted:

- **`resolveBrowser` returns `PlaywrightProviderOptions`, not a path, and never reports absence** —
  its last resort is an unverified channel. The stage must attempt the launch and classify the
  rejection, mapping `launchOptions.executablePath`, `launchOptions.channel`, `connectOptions`, and
  the empty case. Probe-then-decide reads a value that never says "no browser".
- **`--mode release` reaches `import.meta.env.MODE` only when the `projects` entry is a function.**
  An inline object entry silently keeps `MODE === 'test'`, converting the publish gate into a skip.
  `vite.config.ts:238` emits bare function references today, which is why the gate works; nothing
  guards it. That becomes its own unit.
- **One export entry in the fleet is flat rather than condition-nested** — `@orkestrel/indexeddb` at
  the root subpath, with `types` at the top level. A fixed `entry.import.types` read returns a
  JavaScript file there, so the declaration locator must be a recursive walk for the first `types`
  key in condition order.

On transport into the page, the subjective lane proposed an IIFE injected with `addScriptTag` to
avoid a listening socket, and the objective lane measured a loopback server working inside a
`distribution` worker. Ruled **loopback server**, measured twice — once in this campaign's rehearsal
and once by the objective lane. The no-socket property matters where a bench sandbox denies `listen`,
which is an agent's verification environment rather than a target's publish host; the IIFE form is
recorded in the guide as the fallback for a host that denies a loopback listener.

## Where the subjective lane is adopted

Its `ManifestRegions` grouping. `MaterializerInterface.declare` takes two positional dependency
lists, and the manifest script region would make a third. `.claude/rules/patterns.md` § Options
groups them under the entity noun rather than growing the positional list, and every current caller
passes both regions. The objective lane raised no correctness objection, and API shape is the
subjective lane's remit.

## What this round retires

The subjective lane's units U1, U2, U3, U6, and U7 all rest on deleting `Blueprint.setup` and
generating a setup proof. They are struck. Its U4 survives as the manifest writer and its U5 as the
browser stage, both restated in the objective lane's terms.
