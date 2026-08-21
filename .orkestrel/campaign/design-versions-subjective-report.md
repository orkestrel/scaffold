I held the **subjective** lane (shape, naming, ergonomics, design fit). I read the brief, amendment 1, `AGENTS.md`, the architecture/names/typescript/workspace/patterns/tests rules, and the terrain first-hand.

# Design

## The spine: three layers, each with one home

Version authority is a chain, and each link lives where it can be read without lying:

| Layer | Where it lives | What it answers |
| --- | --- | --- |
| Registry | `Upstream.lookup` (server) | The newest published version a declared range admits |
| Manifest | `C:\Users\mikes\WebstormProjects\scaffold\package.json` | Scaffold's own version, and the major each shared row is proven against |
| Floor | the frozen tables in `src/core/constants.ts` | The complete offline answer a pure compile emits |

Core never reads the registry and never reads a file. The registry's answer arrives as **data on the blueprint**. That single decision preserves every property the repository already depends on: `blueprintToDevDependencies` keeps its signature, `blueprintToManifest` stays deterministic, the byte digest at `tests/src/core/compilers.test.ts:154` stays meaningful, and `src/core` stays host-independent.

## Q1 — Derivation mechanism: none of the three. The blueprint carries the resolution.

**Recommendation.** Add one field to `Blueprint`:

```ts
readonly toolchain: readonly Dependency[]
```

`blueprintToDevDependencies` merges it over the literal floor, before extras and peers. An empty `toolchain` emits the floor verbatim — so a library consumer, a test fixture, and an offline compile all get the same deterministic bytes they get today. `src/bin/CLI.ts` fills it before compiling: the self-pin from its own manifest, fleet rows from an unbounded registry read, foreign rows from a major-bounded one.

`toolchain` is already this repository's word for exactly this set — `compilers.ts:201` says "The shared toolchain is the baseline every generated workspace carries" and the gate message at `compilers.ts:1844` says "is pinned by the shared toolchain." One concept, one term, and the term already exists. It reuses `Dependency`, so `isDependencies` validates it, `parseBlueprint` extends by a line, and `Materializer.declare` consumes it unchanged.

**(a) `constants.ts` imports its own `package.json` — loses, and it is blocked three ways.**
- `configs/src/tsconfig.core.json` sets `rootDir: ../../src/core`. A resolved JSON file outside that root is a program input outside `rootDir`, and the `dts()` emit in `configs/src/vite.core.config.ts` runs with `noEmit: false`. The failure lands in `build`, not in `check`.
- `environmentBoundary('src/core')` in `configs/helpers.ts:536` refuses a source resolving outside the environment root.
- `.oxlintrc.json` restricts conventional relative imports for `src/core/**`.

Beyond the instruments, it is wrong in shape: it imports scaffold's entire dependency graph into a data file so that a handful of rows can be read out of it.

**(b) The compiler takes a versions input — loses on the published surface.** `blueprintToDevDependencies(blueprint, versions)` breaks every consumer, and it splits the workspace specification across two arguments that must be passed together everywhere. The blueprint is already "the closed, JSON-serializable workspace specification"; a resolution the workspace is built from belongs in it.

**(c) Build-time define — loses hardest.** `tsc --noEmit -p configs/src/tsconfig.core.json` runs with `types: []`, so the replaced identifier has no declaration it can reach without widening core's ambient types. And a constant whose value is a token nothing can read is not data.

## Q1b — The self-pin, derived rather than remembered

Two facts are being conflated, and they take different authorities.

**The self-pin's authority is the manifest, never the registry.** The registry serves the *previous* release while the working tree holds the next one, so a registry read would pin every generated workspace one release behind. `src/bin/CLI.ts` reads its own manifest through `import.meta.url` — `../../package.json` resolves to the package root from both `src/bin/main.ts` and `dist/bin/main.js` — and projects it through a new core helper:

```ts
export function manifestToVersion(manifest: string): string | undefined
```

That is the exact sibling of the existing `manifestToName` at `src/core/helpers.ts:742`, same `{noun}To{Noun}` projection form, same file.

The literal `'@orkestrel/scaffold': '^0.0.47'` stays in `BASE_DEV_DEPENDENCIES` as the floor, because a floor that omits the row making a generated workspace self-maintaining is not a floor. `tests/src/core/constants.test.ts:49` is what keeps it honest, and it is correct to be red today.

## Q2 — Instruments: all three survive, one gains teeth, and the population becomes the assertion

The mirror is **not** a tautology under this design, because the table is a literal floor and the manifest is an independent mechanism that can disagree with it. That is precisely what `.claude/rules/tests.md` asks for: "Compare the answer to a declaration, a fixture, or a second mechanism that could disagree with it."

**Survives unchanged.** `constants.test.ts:49` (self-pin equals manifest version) and `:54` (self-pin matches `ORKESTREL_RANGE_PATTERN`).

**Survives with its hole closed.** `constants.test.ts:66`. Today it reads only `devDependencies` and skips any name the manifest does not declare (`own !== undefined`), so an empty population passes. Two live defects it cannot see:
- `@orkestrel/contract` sits in `dependencies` at `^0.0.13` while `APP_DEV_DEPENDENCIES` pins `^0.0.12`. The comparison never reaches it.
- A row scaffold stops installing leaves the comparison silently.

Replace the skip with an asserted membership: read every manifest section, then assert three named sets — the compared set, the set excluded because the manifest declares no such row, and the set excluded because scaffold installs it at a different layer. A row moving between those sets moves the test.

**Survives, restated.** `constants.test.ts:90` (TypeScript refuses `7.0.2`). Do **not** promote it to a `TYPESCRIPT_CEILING` constant. The caret already is the bound: `matchesRange('^6.0.3', '7.0.2')` is false by npm's own caret semantics, which `src/core/helpers.ts:681-694` already implements including the `0.x` correction. A separate ceiling constant would be a second copy of a fact the range states, which the derive-state law forbids. Keep the named TypeScript case because it carries the stated compatibility reason, and generalize it with a new caret-form instrument (following).

**New: the caret-form instrument.** Every foreign row in every shared table, and every foreign row in scaffold's own `devDependencies`, matches:

```ts
export const TOOLCHAIN_RANGE_PATTERN = /^\^(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)$/
```

Caret plus an exact triple. It refuses `~8.2.2`, `&gt;=8.0.0`, a bare `8.2.2`, and a prerelease. It is distinct from `EXTRA_RANGE_PATTERN` (which admits `~` and a bare version, and stays that way for consumer-declared extras) and from `ORKESTREL_RANGE_PATTERN` (which fixes the fleet's `^0.x.y`).

## Q3 — Foreign-range form: caret, normalized at the source, not at emission

**Retire the tilde.** `vite: '~8.2.1'` becomes `'^8.2.2'` in the table, and `package.json` moves to `"vite": "^8.2.2"` in the same change. `EXTRA_RANGE_PATTERN` keeps admitting `~` — a consumer's own extra is the consumer's business, and narrowing it would refuse a workspace that tilde-pins a tool of its own. Mechanism, not product policy.

**Emission copies the table verbatim; the table is normalized against the manifest.** Do not normalize at emission. Normalizing at emission means a `~` typed into `package.json` is silently laundered into a caret nobody notices; normalizing at the source means the gate refuses it and the person editing the manifest learns immediately. One rule, one home.

**"Checks care only about the major," concretely.** A check reports drift when `matchesRange(declared, newest) === false`, and never because the declared minor or patch is behind. That is the whole rule, it needs no new helper, and it inherits npm's `0.x` correction for free (`oxfmt: '^0.64.0'` correctly treats `0.64` as its bound).

The repair split follows from it:
- **Inside the major:** `repair` and `overwrite` raise a foreign range's floor to the newest version the declared range admits. This is "latest minor, then latest patch, always float."
- **Across a major:** never rewritten automatically. `audit` reports it as a non-blocking `Question` naming the declared major and the version the registry now serves. An unattended major bump is the one thing caret exists to prevent, and the TypeScript case is this repository's own evidence that it matters.

## Q4 — @orkestrel latest in the verbs

`manifestToDependencies` at `src/core/helpers.ts:784` already scans `dependencies`, `devDependencies`, and `peerDependencies`, and `Materializer.#redeclare` at `src/server/Materializer.ts:997` rewrites every occurrence of a name wherever it sits. So `overwrite` already satisfies policy 2 for fleet packages across all three sections. The gaps are elsewhere.

| Verb | Reads the registry today | Change |
| --- | --- | --- |
| `new` | `--deps` only, through `#resolve` | Resolve the whole toolchain and set `blueprint.toolchain` before `#compile` |
| `audit` | never — `#inspect` is synchronous | Becomes async; adds `#versionQuestion` beside `#projectQuestion` and `#dependencyQuestion` |
| `repair` | never — `#restore` is synchronous | Becomes async; calls `materializer.declare` with the same pin set `#reconcile` builds |
| `overwrite` | fleet rows only, through `#reconcile` | Extends the pin set with foreign rows bounded by their declared major |
| `catalog` | fully | Unchanged. It owns the fleet list, not the target's manifest |

`#versionQuestion` is the right seam because it already exists: `#targetQuestions` collects advisories in a fixed order, and `auditToExit` ignores a non-blocking question, so staleness reports without changing an exit code. `#targetQuestions` and `#assertTarget` become async with it; `#dispatch` already returns a promise.

**`#dependencyQuestion`'s comment at `src/bin/CLI.ts:819-822` is reversed by this design** — "Ranges are deliberately out of scope … a workspace may deliberately pin any other tool" is no longer the policy. Rewrite it rather than leaving a stale rationale in the tree.

**Offline.** Settled by the amendment for generation: `new` fails with a coded `FETCH` naming the packages it could not reach. For the reading verbs I rule differently and deliberately: `audit` reports rather than crashes. `Release.lookup === 'failed'` already models "no answer for this package," and `#reconcile` already models a partial online failure as a `note`. An audit that refuses to run without a network is unusable in the place audits run.

**One registry request, not two.** `Upstream.#release` already fetches the abbreviated packument, and `#edges` at `src/server/Upstream.ts:391-397` already reads `parsed.versions` out of it. The version list needed for "newest under the pinned major" is in the document the reader already has. `lookup` gains no request, no endpoint, and no option — only a selection.

**And no new method.** `lookup` keeps one rule: *the newest published version the declared range admits*, with `'*'` meaning unbounded. `src/bin/CLI.ts:1008` already passes `{ name, range: '*' }` to mean "give me the absolute latest," so the convention is native here. Fleet rows pass `'*'` per policy 2; foreign rows pass their declared caret per policy 3. The discriminant is data, which `.claude/rules/names.md` permits explicitly, and no mode flag or second verb appears.

## Q5 — The non-installed literals: the manifest layer is skipped, and the skip is asserted

First, the brief's list is partly wrong, measured against `package.json`: `@orkestrel/html` is installed at `^0.0.4` (devDependencies) and `@orkestrel/contract` is installed at `^0.0.13` (dependencies). The genuinely non-installed rows are `vue`, `vue-tsc`, `@vitejs/plugin-vue`, `vite-plugin-singlefile`, and the `APP_SERVER_DEV_DEPENDENCIES` set (`@orkestrel/emitter` excepted — it is a runtime dependency).

**Ruling: a row scaffold does not install takes the chain registry → floor, skipping the manifest layer.** The literal's major is the compatibility statement (Vue 3, not Vue 4); the caret makes minor and patch float; the registry supplies the newest inside it. The resolver needs no special case — it already resolves by declared range.

The special case is in the **instrument**, and it is the fix for the hand-maintained exclusion comment at `constants.test.ts:60-65`. Derive the exclusion from `Object.hasOwn(declaredAcrossEverySection, name)`, then **assert the excluded set by name**. Today the comment is prose nothing checks; under this change a row silently leaving scaffold's manifest reddens the test.

## Q6 — Blast radius

**`blueprintToDevDependencies` keeps its signature.** That is the design's principal win and the reason `toolchain` sits on the blueprint.

Moves once with this change:
- `tests/src/core/compilers.test.ts:154` — the digest. The floor moves (self-pin, `@orkestrel/probe`, `@orkestrel/test`, `@microsoft/api-extractor`, `vite`), so the default emitted manifest moves. Thereafter it moves only on a release, exactly as its comment promises.
- `tests/src/core/fixtures/setup-false-manifest.txt` — regenerate.
- `tests/src/core/templates.test.ts:390` — asserts the `'^2.3.3'` literal.

**The distribution census is the trap.** `src/core/constants.ts:418` carries `SHOWCASE_DEV_DEPENDENCIES['vite-plugin-singlefile'] // '^2.3.3'`, which is a **driven** claim in `tests/distribution.test.ts`: the suite executes shipped `@example` fences against the built declarations and pins the census with `expect(shaped).toBe(171)` at line 442. Any version-literal verdict in a TSDoc example makes a routine pin bump a distribution-test failure.

Change that verdict to prose — `// the showcase plugin pin` — which moves the line out of `driven` and into the `glossed` list at `tests/distribution.test.ts:461`, keeping the census total at 171. Then no future pin bump reaches that suite again. Make the same sweep over every shared-table example.

**Nothing in the vendored host set moves.** `HOST_PATHS` at `src/core/constants.ts:123` carries no version literal, `tests/config.test.ts` asserts no dependency versions, and `configs/helpers.ts` and `configs/policy.ts` declare none. `.claude/agents/orkestrel.md` carries the catalog table, which `scaffold catalog` regenerates and this change does not touch. **No `dist/host` bump obligation arises from this change** — `dist/src` moves, so scaffold bumps and publishes on its own account.

**Also moves:** `src/core/types.ts` (`Blueprint.toolchain`, `Release` TSDoc), `validators.ts`, `parsers.ts`, `factories.ts`, `compilers.ts` (merge plus a gate row), `src/server/types.ts` (`lookup` TSDoc), `src/server/Upstream.ts`, `src/bin/CLI.ts`, `package.json` (`vite`), `guides/scaffold.md` (surface rows for `TOOLCHAIN_RANGE_PATTERN`, `manifestToVersion`, the `toolchain` field, the restated `lookup`), and every `buildBlueprint` helper in `tests/setupServer.ts`.

## Test list, each with its negative control

| Instrument | Population | Negative control (drawn from outside it) |
| --- | --- | --- |
| Self-pin equals manifest version | Ranges the manifest version generates | `^0.0.0` and a bare `0.0.47` rejected — the existing control at `constants.test.ts:100` |
| Table equals manifest, every section | Names both a table and the manifest declare | Assert the two excluded sets by name: `@orkestrel/markdown` (manifest-only) is absent from the compared set; `vue` (table-only) is present in the manifest-absent set |
| Caret form over shared foreign rows | Foreign rows in the shared tables | `TOOLCHAIN_RANGE_PATTERN` rejects `~8.2.2`, `&gt;=8.0.0`, `8.2.2`, `8.2.2-beta.1`; accepts `^0.64.0` |
| Caret form over scaffold's own manifest | Foreign `devDependencies` rows | A fleet row (`@orkestrel/guide`) is excluded by rule and checked by `ORKESTREL_RANGE_PATTERN` instead |
| TypeScript stays below 7 | `BASE_DEV_DEPENDENCIES.typescript` | `matchesRange('^6.0.3', '6.9.9')` is true — the bound refuses a major, not an upgrade |
| Resolver returns newest under the declared major | Versions a loopback fixture registry publishes | Publish `6.9.9` and `7.0.2` under `typescript`; assert `6.9.9`. Publish only `7.x`; assert no answer rather than a `7`. Resolve `'*'` against the same fixture; assert `7.0.2` — proving the bound comes from the range, not from a hidden filter |
| `audit` reports staleness without changing its exit code | A target whose foreign major is behind the fixture registry | The same target with an aligned major reports no question; a target with a *blocking* question still exits drift |
| `repair` raises a floor inside a major and never crosses one | A target declaring `^8.0.0` against a fixture serving `8.9.0` and `9.1.0` | Assert the manifest reads `^8.9.0` after the run, and that `9.1.0` appears only as an advisory |
| Emitted manifest byte stability | The default blueprint with an empty `toolchain` | A blueprint carrying a `toolchain` row emits that row instead of the floor, so the digest test is measuring the floor path deliberately |

Replace the self-referential assertions at `tests/src/core/compilers.test.ts:113`, `:124`, `:141` and `tests/src/bin/CLI.test.ts:520`, which compare emitted output against the constants that produced it. `.claude/rules/tests.md` bans exactly that: they pass for every value the source ever returns.

# Alternatives

**Alternative A — resolve inside the compilers, making them async.** `blueprintToDevDependencies` becomes `Promise`-returning and reads the registry itself. Cost: `src/core` acquires a network dependency, which the workspace's own scoped TypeScript project and `environmentBoundary` plugin both refuse; every emission becomes non-deterministic, so the digest and the fixture at `tests/src/core/fixtures/setup-false-manifest.txt` can no longer exist; and a pure published function becomes an I/O function. The recommended design gets the same behaviour by moving *when* the data arrives rather than *where* the read happens.

**Alternative B — drop the floor entirely; the registry is the only authority.** The tables shrink to a name list plus a compatibility major, and `blueprintToDevDependencies` returns names with no ranges until a resolution supplies them. Cost: the published pure function stops answering the question it exists for, every library consumer must run a resolver, and the amendment explicitly retains the table as the fallback floor. Its one genuine advantage — no hand-updated version literal anywhere — is bought back by the manifest instrument at a fraction of the price.

# Units

| Unit | Role / engine | Owns | Depends on | Acceptance |
| --- | --- | --- | --- | --- |
| **U1 — Contract** | `implementer` / Opus 5 | `src/core/types.ts`, `src/core/constants.ts`, `src/core/validators.ts`, `src/core/parsers.ts`, `src/core/factories.ts`, `src/core/helpers.ts` | none | `Blueprint.toolchain` and `TOOLCHAIN_RANGE_PATTERN` declared; `manifestToVersion` exported and unit-tested; every drifted table row equals the manifest; `vite` caret-formed in both the table and `package.json`; every shared-table `@example` verdict is prose; `npm run check` green |
| **U2 — Merge and gate** | `implementer` / Opus 5 | `src/core/compilers.ts` | U1 | `blueprintToDevDependencies` applies `toolchain` over the floor before extras and peers, signature unchanged; `blueprintToQuestions` refuses a `toolchain` row whose range fails its family's pattern and one naming a package no shared table carries; `npm run test:src:core` green except the digest and fixture rows U4 owns |
| **U3 — Registry resolution** | `sol` / GPT-5.6 Sol | `src/server/Upstream.ts`, `src/server/types.ts` | U1 | `lookup` returns the newest published version the declared range admits, reading `versions` from the packument already fetched, with `'*'` unbounded and no added request; a version at or above the declared major is never returned; driven by a loopback fixture registry with the controls in the test table; `npm run test:src:server` green |
| **U4 — Fixture and census** | `builder` / Sonnet | `tests/src/core/compilers.test.ts` (digest line), `tests/src/core/fixtures/setup-false-manifest.txt`, `tests/src/core/templates.test.ts:390`, `tests/distribution.test.ts` `glossed` list | U1, U2 | Digest regenerated from the run that produced it; fixture regenerated; the `vite-plugin-singlefile` line sits in `glossed` and `shaped` stays 171; no other census row moves |
| **U5 — Verbs** | `sol` / GPT-5.6 Sol | `src/bin/CLI.ts` | U2, U3 | `#toolchain` fills the blueprint before `#compile`; the self-pin comes from `manifestToVersion` over the executable's own manifest; `audit`, `repair`, `#targetQuestions`, `#assertTarget` async; `#versionQuestion` reports staleness as non-blocking; `repair` calls `declare`; `overwrite` pins foreign rows bounded by major; `#dependencyQuestion`'s reversed comment rewritten; `npm run test:src:bin` green |
| **U6 — Instruments** | `implementer` / Opus 5 | `tests/src/core/constants.test.ts`, `tests/src/core/compilers.test.ts` (self-referential rows), `tests/src/bin/CLI.test.ts:520` | U1, U2, U5 | Every row of the test table implemented with its named control; each control observed red before the subject lands and green after; no assertion compares emitted output against the constant that produced it |
| **U7 — Parity** | `implementer` / Opus 5 | `guides/scaffold.md` | U1–U5 | Surface rows for `TOOLCHAIN_RANGE_PATTERN`, `manifestToVersion`, `Blueprint.toolchain`; the restated `lookup` description; `npm run test:guides` green |
| **U8 — Gates** | `verifier` / Sonnet | none | U1–U7 | `format:check → lint:check → check → build → test` read bare, output quoted |

Serial order: U1 → U2 and U3 in parallel (disjoint files) → U4 and U5 in parallel → U6 → U7 → U8. U1 and U2 both write `src/core`; keep them serial in the main checkout.

# Tensions

**T1 — `repair` becomes a network verb that bumps dependencies.** This is the sharpest call. Every target runs `scaffold repair` after a vendored-only scaffold release, per `.agents/orchestration.md`. Under the amendment that routine call now reaches the registry and rewrites ranges. A fleet-wide `repair` becomes a fleet-wide dependency bump. I recommend it because the amendment states it plainly; the objective lane must rule whether the release-wave procedure survives it, or whether range rewriting stays in `overwrite` alone with `repair` reporting only.

**T2 — `audit` becomes async and network-bound.** I keep it reporting rather than crashing offline, against the amendment's "crashing offline is acceptable," because that ruling was made about the generation path. An `audit` that fails without a network cannot run where audits run.

**T3 — The self-pin stays a literal in the floor.** "Derived, never hand-updated" is satisfied for every real user by the CLI's runtime derivation, and the literal is held correct by a gate that cannot be wrong for longer than one test run. The alternative — removing the row from the floor entirely — is genuinely available and produces a floor that omits the row making a generated workspace self-maintaining. The Orchestrator rules.

**T4 — `toolchain` on `Blueprint` records a point-in-time registry reading in a "closed specification."** It can go stale relative to the registry. So can `dependencies`. I judge it the same class of fact; a reader may judge it a stored answer that can drift.

**T5 — No `TYPESCRIPT_CEILING` constant.** I ruled the caret is the bound and a constant would duplicate it. If a future row needs a ceiling *below* its caret's natural bound, this ruling reverses and the constant appears then, with its first real consumer.

**T6 — `EXTRA_RANGE_PATTERN` keeps admitting `~`.** Scaffold retires the tilde from its own shared toolchain and permits it in a consumer's declared extra. A reader may want one range law everywhere.

# Risks

**R1 — The `rootDir` claim behind rejecting option (a) is unrun.** I read the configuration, not a compiler. Settle it with the `prove` tool: project `configs/src/tsconfig.core.json`, case a JSON import from `src/core/constants.ts`, control the same import from `vite.config.ts` (which already does exactly this at line 3 and must pass). Quote the receipt line before the ruling is relied on. My confidence is high and the ruling does not depend on it alone — `environmentBoundary` and `.oxlintrc.json` block the same import independently.

**R2 — The abbreviated packument's `versions` map may be pruned for a large package.** `#edges` reads it, so it is present; whether `application/vnd.npm.install-v1+json` returns *every* published version for a package the size of `typescript` is unverified. Settle it by fetching that media type for `typescript` and counting the keys against the registry's full packument. If it is pruned, the resolution falls back to `dist-tags.latest` clamped by `matchesRange`, which returns nothing when the latest crosses the major — an honest answer, and the floor covers it.

**R3 — `MAX_COLLECTION_ITEMS` is 1000 and `typescript` publishes more versions than that.** Any bounded read over the version list must select before it limits, or the newest version falls off the end. Name the bound in U3's brief.

**R4 — The distribution census may move for a reason U4 does not predict.** `expect(shaped).toBe(171)` covers every shipped `@example` in both declaration bundles. Changing one verdict from a value to prose should move exactly one row between two lists. Have U4 report the `driven`, `glossed`, `elided`, and `undriven` list diffs, not just the total.

**R5 — Making `audit` and `repair` async ripples through `tests/src/bin/CLI.test.ts` more widely than the diff suggests.** Any call site that treats the return as a number rather than a promise passes typecheck through inference and fails at runtime. Require U5 to report the count of changed call sites with the command that produced it.

**R6 — Scaffold's own `package.json` becomes the source of truth for the tables, and nothing yet forces someone to update it.** The mirror instrument catches a table that disagrees with the manifest; it catches nothing about a manifest that is itself stale. That gap closes only when scaffold runs its own `overwrite`, which is the design's intent and worth stating in `guides/scaffold.md` rather than leaving implied.