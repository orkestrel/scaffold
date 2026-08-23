# Design brief — propagate the distribution proof across the Orkestrel fleet

## Objective

Decide what `@orkestrel/scaffold` must do so every published Orkestrel package carries a
`tests/distribution.test.ts` proof, and so `scaffold overwrite` propagates that proof to a
target that lacks one. Return a design, not an implementation.

## The measured ground

Run on 2026-08-23 over every directory under `/home/user` whose `package.json` declares an
`@orkestrel/*` name. Command: a Node one-liner reading each manifest and testing
`fs.existsSync('<repo>/tests/distribution.test.ts')`.

Carrying the proof today: `brief`, `mcp`, `probe`, `process`, `scaffold`.

Lacking it: `abort`, `agent`, `browser`, `budget`, `console`, `contract`, `csv`, `database`,
`emitter`, `form`, `guide`, `html`, `indexeddb`, `interpret`, `markdown`, `middleware`, `msg`,
`ndjson`, `ollama`, `pool`, `program`, `qualifier`, `queue`, `rater`, `reason`, `relation`,
`router`, `sea`, `server`, `sqlite`, `sse`, `supervisor`, `table`, `template`, `terminal`,
`test`, `timeout`, `tool`, `toolbox`, `websocket`, `worker`, `workflow`, `workspace`.

Every one of those declares `prepublishOnly`, declares `private: false`, and has a `src`
directory. Each package lacking the proof also lacks the `test:distribution` script, which is
the consequence rather than a separate fact.

## How scaffold treats the proof today

`src/core/constants.ts:241` declares `DISTRIBUTION_TEST_PATH = 'tests/distribution.test.ts'`.

`src/bin/CLI.ts:960` and `:981` derive the blueprint's `distribution` field from that path's
presence in the target:

```ts
const distribution = resolveContainedPath(target, DISTRIBUTION_TEST_PATH)
// ...
distribution: distribution !== undefined && isExactCaseFile(distribution),
```

`src/core/compilers.ts:298` computes `const distributes = blueprint.distribution && publishes`,
and from that flag alone emits the `distribution` Vitest project (`:805`, `:806`), the
`test:distribution` script (`:377`), and the `prepublishOnly` row
`npm run test:distribution -- --mode release` (`:427`).

`host.json` carries no entry whose storage or destination names `distribution`: a grep for
`distribution` in that file returns nothing. So the proof is not vendored.

`overwrite` (`src/bin/CLI.ts:437` onward) derives the blueprint, repairs vendored files against
the host plan, removes stale vendored paths, and re-pins dependencies. It authors no proof file.

**The consequence:** a package with no `tests/distribution.test.ts` gets `distribution: false`,
so `overwrite` emits no project, no script, and no `prepublishOnly` row — permanently, because
nothing ever creates the file.

## What an existing proof contains

`/home/user/process/tests/distribution.test.ts` is 320 lines. It packs with
`npm pack --ignore-scripts`, installs the tarball into a scratch consumer, copies the runtime
`@orkestrel` dependencies in, asserts every `exports` target file exists, asserts an absent
subpath throws `Package subpath`, parses each entry's `.d.ts` with the TypeScript compiler API
to collect declared export names, drives the package through both an ESM `import` and a CJS
`require` and compares each key set against the declarations, and compiles a consumer under
`node16`, `nodenext`, `bundler`, and `node10` — the last as a firing control that must fail.

It is heavily package-specific in places: it asserts `core` has 15 exports and `server` has 35,
calls `isProcessError` and `formatCommand` by name, and constructs a `ProcessError` to prove the
brand survives the module-format boundary.

Sibling proofs differ in size: `scaffold` 873 lines, `mcp` 726, `brief` 286, `probe` 221.

## The question

Design the mechanism. At minimum rule on each of these, and say which you recommend and why:

1. **Authorship.** Does scaffold **generate** `tests/distribution.test.ts` into a target that
   lacks one, **vendor** it byte-identically the way it vendors `tests/policy.test.ts` and
   `tests/setupPolicy.ts`, or something else? Name the cost of the option you reject.
2. **Package-specificity.** How much of the proof can be derived at runtime from the installed
   package alone — the manifest's `exports` map, its `dependencies`, and the built `.d.ts`
   files — with no package-specific literal? Name precisely what cannot be derived.
3. **The five packages that already carry a proof.** A vendored file is restored by `repair`
   and reported as drift by `audit`, so vendoring would revert `process`'s brand check and
   `scaffold`'s 873 lines. What happens to them under your recommendation?
4. **Idempotence and ownership.** If scaffold generates the file, does it overwrite on every
   run, write only when absent, or write to a path the package then owns? What does `audit`
   report for a target missing the proof, and what does `repair` do about it?
5. **Shape variance.** The fleet includes core-only packages, packages with browser and server
   faces, packages with a `bin`, and packages with no CJS build. Which of those does a single
   generated proof handle, and which need a branch?
6. **Cost.** Roughly how large is the scaffold change, and how many of the packages lacking the
   proof would need per-package work beyond what the generated file gives them?

## Constraints that bind the answer

- `AGENTS.md` at `/home/user/scaffold/AGENTS.md` and every applicable file in
  `/home/user/scaffold/.claude/rules/`. Read them. In particular
  `.claude/rules/tests.md` § Cross-cutting proofs and § Expensive proofs,
  `.claude/rules/workspace.md` § Test project matrix and its vendored-file import law, and
  `.claude/rules/architecture.md`.
- A vendored file is byte-identical across every target and may import no `@orkestrel/*`
  package, because every such package is itself a target.
- `.claude/rules/tests.md` fixes that a `distribution` proof reads `import.meta.env.MODE` and
  **fails** rather than skips on an unreachable registry under `--mode release`.
- No new npm dependency.
- Scaffold's version is 0.0.50 locally, and the registry serves 0.0.49. This change ships in
  0.0.50, so it must be publishable in one release.

## Execution

Perform this assignment directly and spawn nothing. Read the files named here first-hand.

## Output

Return, in this order:

1. **Recommendation** — one paragraph naming the mechanism you choose.
2. **Rulings** — one short numbered answer per question 1 through 6.
3. **The generated proof's content** — what it asserts, stated as a list of properties, and
   for each, whether it is derived at runtime or emitted as a literal.
4. **Units** — the bounded scaffold work items your design implies, each with its owned files
   and its acceptance criterion.
5. **Risks** — what your design gets wrong if a stated assumption is false.

No process diary. No restatement of this brief.
