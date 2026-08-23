# Design brief — the setup proof and the distribution proof's browser stage

## Role and engine

Stated in your dispatch. You hold one lane of an adversarial pass. The other lane runs blind to
you on this same brief. Do not attempt to anticipate or agree with it.

## Objective

Return a design for two open halves of the `@orkestrel/scaffold` 0.0.50 change. The distribution
proof's core design is already reconciled and is given here as settled ground; do not redesign
it. Return a design, not an implementation.

## What the user already ruled

Two scope questions were put to the user and answered. Both answers are binding.

1. **0.0.50 closes the distribution proof and the setup proof.** Both derive a blueprint field
   from the presence of a file scaffold never writes, so both are self-fulfilling in the same
   way. The user chose to close both in this release rather than distribution alone.
2. **Build the full Playwright browser stage.** The subjective lane of the prior round argued
   export conditions alone would do. GPT-5.6 Sol required a real-browser stage, on the ground
   that a Node `import` of a browser bundle proves nothing. The user ruled for the full stage,
   naming the existing Chromium, Chrome, and Microsoft Edge discovery as the reason the cost is
   affordable.

Neither ruling is open. Design within them.

## Settled ground from the reconciled distribution round

Read `.orkestrel/campaign/distribution-design-reconciliation.md` first-hand. In summary, and not
open for redesign:

- Scaffold **generates** `tests/distribution.test.ts`; it never vendors it. The file stays out of
  `host.json`, so this is a `dist/src` release with no vendored byte moved.
- `Blueprint.distribution` is **deleted** as a derived duplicate of the `publishes` predicate
  already declared at `src/core/compilers.ts:295`.
- Ownership is **presence**: `src/core/types.ts` defines presence as "audit compares existence,
  and a write restores an absent file and never touches present bytes". A package that replaced
  the generated proof keeps its replacement untouched, and a target lacking the proof reports
  drift rather than aligned.
- The manifest script region is written too, by **compare-and-swap against a recognized
  predecessor state, refusing without mutation** when a target's chain was customized.
- Declarations are read through the **TypeScript compiler checker over module symbols**, which
  resolves aliases and re-exports, never a declaration-text walk.
- Assertions derive from the **installed `exports` map and the built declarations**, never from
  the blueprint.

## The measured ground

Every reading here was executed. Do not re-derive; treat these as facts and say so if your design
needs one that is absent.

### The fleet, from published manifests on 2026-08-23

All 48 `@orkestrel` packages read from `registry.npmjs.org`, none unreadable. Instrument:
`.orkestrel/campaign/provision.mjs`. Scaffold emits each of these scripts solely from its proof's
presence, and `package.json` ships in every tarball, so the manifest reports the proof.

| Script              | Packages declaring it                                  |
| ------------------- | ------------------------------------------------------ |
| `test:setup`        | `ollama`, `process`                                     |
| `test:distribution` | `brief`, `mcp`, `probe`, `process`, `scaffold`          |
| `test:integration`  | `mcp`, `sea`, `terminal`, `websocket`                   |
| `test:conformance`  | `mcp`, `ollama`                                         |
| `test:guides`       | every package                                           |

`.orkestrel/campaign/provision-gap-evidence.md` states a different table for every row except
distribution. It is superseded by `.orkestrel/campaign/provision-evidence-correction.md`. Use the
correction.

### Face shapes, from the committed census over all 48 packages

- **Browser face** — `console`, `database`, `indexeddb`, `mcp`, `router`, `test`, `workflow`.
- **Server face** — `browser`, `console`, `database`, `mcp`, `middleware`, `ollama`, `probe`,
  `process`, `router`, `scaffold`, `sea`, `server`, `sqlite`, `supervisor`, `terminal`, `test`,
  `toolbox`, `websocket`, `worker`, `workflow`.
- **Styles face** — none.
- **`bin` manifest key** — `probe` and `scaffold` only, and no package exports `dist/bin`.
- **No `require` condition** — `indexeddb` alone.
- **Cannot import `@orkestrel/test`** — `test` alone.

### The browser toolchain each browser-face package already declares, 2026-08-23

Read from published manifests. Every one of the seven browser-face packages declares
`playwright`, `@vitest/browser-playwright`, `vite`, `vitest`, and `typescript`. Only `test` lacks
`@orkestrel/test`, because it is that package. No browser-face target needs a new dependency to
run a Playwright stage.

### The Chromium discovery that already exists

`src/core/templates.ts:736` holds the `browsers` template, which scaffold generates into a
browser-face workspace as `configs/browsers.ts`. Read it first-hand. It exports
`resolveBrowser`, backed by `resolvePinnedBrowser`, `resolveManagedBrowser`,
`resolveBundledBrowser`, and `resolveSystemBrowser`, plus `CHROMIUM_LAYOUTS`,
`BUNDLED_BROWSERS_ROOT`, `BUNDLED_CHROMIUM_LAYOUTS`, and `SYSTEM_BROWSER_CHANNELS` covering
Chrome and Microsoft Edge on Linux, macOS, and Windows. The census reports `configs/browsers.ts`
present in 8 packages against 7 browser faces; that one-package disagreement is unresolved and is
listed as an unknown.

### How the setup field is derived and gated

`src/bin/CLI.ts:970` sets `Blueprint.setup` from any file in `tests/` whose name starts with
`setup` and ends with `.test.ts`. `src/core/compilers.ts:788` gates the `setup` Vitest project on
that field, `:371` gates the `test:setup` script, and `:343` adds `npm run test:setup` to the
aggregate. `blueprintToTestArtifacts` at `src/core/compilers.ts:1153` seeds `tests/setup.ts` and
the per-face setup modules and never seeds a proof over them. `ARTIFACT_TEMPLATES.tests.setup` at
`src/core/templates.ts:1087` is the empty string, so the seeded setup module has no content at
all. The `setup` project's `include` is `tests/setup*.test.ts`.

### What the two existing setup proofs assert

`process/tests/setup.test.ts` is 42 lines over `resolveChildFixture` and `childCommand` imported
from `./setupServer.js`: that the fixture path resolves independently of the working directory,
that it exists on disk, that the spawned file is `process.execPath`, and that each call returns
its own argument vector. That workspace's `tests/setup.ts` contains `export {}` and nothing else.

`ollama/tests/setup.test.ts` is 533 lines over the helpers, fixtures, recorders, and guards
exported by its `tests/setup.ts` and `tests/setupServer.ts`, driving a real `createWorkspace` and
a recorder from `@orkestrel/test`.

Both prove package-specific behaviour of package-owned helpers. Neither contains an assertion
scaffold could have derived from the workspace shape.

### Scaffold's own stated policy on generating a proof it cannot derive

`src/core/compilers.ts:1129` remarks, for the guide and conformance proofs, that neither is
emitted because each "names an official artifact only the package knows, so a generated
placeholder would read as a proof while measuring nothing". Rule on whether the setup proof falls
in that class. This is the central question of the setup half and your answer decides the design.

## What you must rule on

Answer every item. Where you recommend, name the cost of the option you reject.

### A. The setup proof

1. Is there an assertion scaffold can derive, from the workspace shape alone, strong enough to
   justify generating `tests/setup.test.ts` at all? One candidate, which you may adopt, reshape,
   or refuse: every value exported by the workspace's setup modules is referenced by at least one
   file under `tests/`, read through the TypeScript compiler checker — the same mechanism the
   distribution proof uses. `AGENTS.md` § Design laws states "Export and test reusable logic. No
   hidden module helpers or declarations." Rule on whether that law is what a generated setup
   proof should measure.
2. If you generate it, state exactly what it asserts, each property marked derived at runtime or
   emitted as a literal. If you refuse to generate it, state what closes the self-fulfilling
   derivation instead, because leaving `Blueprint.setup` unreachable in 46 packages is not an
   option the user left open.
3. What happens to `Blueprint.setup`? Is it a derived duplicate to delete the way
   `Blueprint.distribution` is, or an irreducible structural fact? Note that a seeded
   `tests/setup.ts` is unconditional in every workspace, and that its seeded content is empty.
4. Ownership, `audit`, and `repair`, in the vocabulary `src/core/types.ts` defines.
5. What happens to `ollama` and `process`, which carry bespoke setup proofs.
6. Whether the empty `ARTIFACT_TEMPLATES.tests.setup` seed stays empty under your design.

### B. The distribution proof's browser stage

7. Where the browser stage gets its executable. The workspace already carries
   `configs/browsers.ts` exporting `resolveBrowser`. Does the generated proof import that module,
   carry its own resolution, or something else? Name what breaks if a browser-face workspace has
   no `configs/browsers.ts`.
8. What the stage bundles and how: what an installed-package consumer looks like, which Vite
   configuration builds it, and what is served to the browser.
9. How the stage selects which subpaths it covers, derived from the installed `exports` map.
10. What the stage compares. The reconciled design says runtime keys against declaration value
    exports. State precisely how a browser-only entry's declarations are located.
11. Failure semantics. Under `--mode release` the proof must fail rather than skip on missing
    evidence. State what happens under `--mode release` with no launchable browser, and what
    happens outside release mode. `.claude/rules/tests.md` fixes that a distribution proof reads
    `import.meta.env.MODE` and fails rather than skips on an unreachable registry under release
    mode; rule on whether an unlaunchable browser is the same class of missing evidence.
12. Whether the stage runs inside the generated Vitest `distribution` project or as a child
    process the proof drives, and why. Note that `.agents/orchestration.md` § Bench laws records
    that a Node process spawned by another Node process inside a sandbox has been measured both
    buffering its pipe until EOF and publishing nothing, so a design resting on a spawned child's
    stdio is fragile in exactly the environment an agent verifies it in.
13. The bound on cost and fragility: which of the seven browser-face packages this reaches, and
    what a maintainer of one of them has to do that they do not have to do today.

### C. Joint

14. Do the two proofs adopt through one unit in `repair` and `overwrite`, or two? What does a
    target that lacks both report under `audit`?
15. The bounded implementation units your design implies, each with owned files and an
    independently checkable acceptance criterion. Order them by dependency.

## Unknowns

Named as unknown rather than guessed. Report on each; do not stall on one.

- The census reports `configs/browsers.ts` in 8 packages against 7 browser faces. Which package
  disagrees, and why, is unmeasured. Only `scaffold`, `mcp`, `terminal`, `ollama`, and `process`
  are checked out in this container, so a fleet-wide file reading is not available to you.
- Whether any browser-face package's `exports` map names a browser target outside the published
  browser output directory is unmeasured.
- Whether a generated Vite bundle of an installed package resolves that package's own
  `@orkestrel/*` runtime dependencies without a further install step is unmeasured.

## Scope

Read-only. You own no files and write none. Read first-hand: `AGENTS.md`, every applicable file
in `.claude/rules/` — in particular `tests.md`, `workspace.md`, and `architecture.md` —
`src/core/types.ts`, `src/core/compilers.ts`, `src/core/templates.ts`, `src/core/constants.ts`,
`src/bin/CLI.ts`, `.orkestrel/campaign/distribution-design-reconciliation.md`, and
`.orkestrel/campaign/provision-evidence-correction.md`. The four sibling checkouts are at
`/home/user/orkestrel/{mcp,terminal,ollama,process}`.

## Execution

Perform this assignment directly and spawn nothing.

## Deviation contract

A conflict with the objective stops you and you report it. Where a subordinate detail is yours to
settle, settle it, record the decision, and carry on.

## Output

Return, in this order, with no process diary and no restatement of this brief:

1. **Recommendation** — one paragraph per half, naming the mechanism you choose.
2. **Rulings** — one short numbered answer per item 1 through 15.
3. **Units** — the bounded work items, each with owned files and its acceptance criterion.
4. **Risks** — what your design gets wrong if a stated assumption is false.
5. **Unknowns** — what you could not settle, and what would settle it.
