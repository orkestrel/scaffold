Lane held: subjective.

## Design

**Recommendation: option 2, with the seam narrowed to one composed entry — the seed stays a vendored, content-owned `HOST_PATHS` row that imports nothing, and takes its reader module as a positional argument.**

The rule the seed collided with is not an obstacle to route around; it states the design law of the vendored set. A vendored file is a program that has to run in a workspace holding nothing but Node, because `HOST_PATHS` is filtered only by the own-guide rule (`/home/user/scaffold/src/core/helpers.ts:458-461`, `/home/user/scaffold/src/core/constants.ts:133-154`), so `scripts/docs.ts` lands in a core-only target that declares no `@orkestrel/guide` and whose root `tsconfig.json` has no `include` list (`/home/user/scaffold/tsconfig.json:28`) — the static import breaks that target's typecheck, not only the guide package's. Every other vendored program already obeys the same law by construction: `configs/policy.ts` imports nothing at all, `configs/helpers.ts` imports only what a core-only workspace declares. So the seed's dependency on the readers becomes what it actually is — a run-time input the workspace supplies — and the manifest script is where the workspace supplies it. That single change keeps every property the campaign bought with vendoring: one copy of the program, checked by scaffold's own `lint:check` and `check`, digested in `host.json`, and propagated to every target by `repair` rather than by a delete-and-repair ritual nobody performs across a fleet.

**The command shape, unchanged for the developer.**

```text
npm run docs                     report every disagreement, write nothing
npm run docs -- --to guide       rewrite each Summary cell from its source side
npm run docs -- --to source      rewrite each description paragraph and each titled @example body
```

The manifest carries the wiring the developer does not type:

```json
"docs": "node --experimental-strip-types scripts/docs.ts @orkestrel/guide"
```

`blueprintToScripts` emits that line under the one `blueprint.guides` branch it already uses (`/home/user/scaffold/src/core/compilers.ts:349-352`), and `blueprintToWritableScripts` keeps admitting `docs` (`:445-452`). The guide package edits its own value by hand to name its build output, and `repair` retains it: `replaceManifestScripts` overwrites a declared script only when its value is one of the planned predecessors, and otherwise keeps the author's string byte-identical (`/home/user/scaffold/src/core/compilers.ts:1795-1799`). So the different argument comes from a hand edit the write path is already built to respect, never from a branch in the compiler — which is what keeps scaffold on the mechanism side of "mechanism, not product policy".

**The seam: one composed entry per direction, in `@orkestrel/guide`.**

A seed that dynamically imports a whole toolkit has to re-declare that toolkit's signatures locally to stay off `any`, and a locally re-declared foreign contract in a file vendored across the fleet is a copy that drifts with nothing able to see it drift. Move the composition into the package Ruling 3 already gives it (`/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md:7`): the package takes an inventory and returns what to print and what to write; the seed keeps the filesystem, the argument parsing, the formatting, the exit codes, and nothing else. That is the functional-core/imperative-shell split `AGENTS.md` § Design laws states, and it leaves the seed narrowing one module shape and one plain record instead of a signature table.

The package's added surface:

```ts
interface ParityInput {
	readonly files: Readonly<Record<string, string>>
	readonly name?: string
}

interface ParityFinding {
	readonly spec: string
	readonly key: string
	readonly guide?: string
	readonly source?: string
	readonly reason?: string
}

interface ParityPitch {
	readonly readme?: string
	readonly tagline?: string
}

interface ParityResult {
	readonly findings: readonly ParityFinding[]
	readonly files: Readonly<Record<string, string>>
	readonly found: number
	readonly written: number
	readonly pitch?: ParityPitch
}

function computeParity(input: ParityInput): ParityResult
function replaceGuides(input: ParityInput): ParityResult
function replaceSources(input: ParityInput): ParityResult
```

Three entries rather than one taking a `direction` value, because writing a `Summary` cell and rewriting a doc block are different algorithms, and `.claude/rules/names.md` § Split behavioral variants refuses a literal that selects a different action. `ParityResult.files` holds only the changed files, keyed by path; the seed writes each and prints `wrote <path>`. The reported tally the seed prints derives from `findings.length`, so no `left` member exists — `AGENTS.md` § Design laws forbids storing a fact the record can compute. An absent `guides/README.md` and an index row naming a guide the workspace does not carry become findings with a reason rather than the seed's current thrown errors, so a vendored program in an unexpected workspace reports instead of crashing.

**What the seed keeps.** `USAGE`, `INVENTORY`, `MANIFEST_FILE`, `README_FILE`, `readInventory`, `readShortName`, `formatSide`, `formatDrift`, `formatLeft`, `formatPitch`, the argv parse, the write loop, the print loop, and the exit codes. Its output contract — the line shapes, the quoted-or-`absent` sides, the miss reasons, `0`/`1`/`2` — is the substance the constraints hold fixed, and it stays in the seed because it is presentation and the reader package stays presentation-free.

**What the seed gains.** Two guards over foreign data, which is what `.claude/rules/patterns.md` § Foreign contracts prescribes: `isReader` checks that the imported module carries the three callables the seed dereferences, and `isResult` checks the returned record's members. A module that fails `isReader` prints one line naming the specifier and the member that is missing, and exits `1`; a missing argument prints the usage line and exits `2`.

**The gate and the seed become one composition.** `tests/guides.test.ts` is package-owned and imports the package directly, so it can call `computeParity` and assert `findings` equal to the empty list. That writes nothing, so the campaign's exit criterion ("the gate calling no writer") holds, and it closes D4's retained finding F4 (`/home/user/scaffold/.orkestrel/campaign/docs-parity/d4-audit-subjective.md:52-53`): the gate's failure prints the same readable worklist `npm run docs` prints, from the same code, instead of a truncated object diff read from a separate probe.

**Names the shape needs.** Package exports `computeParity`, `replaceGuides`, `replaceSources`; types `ParityInput`, `ParityResult`, `ParityFinding`, `ParityPitch`; members `files`, `name`, `findings`, `found`, `written`, `pitch`, `spec`, `key`, `guide`, `source`, `reason`, `readme`, `tagline`. Seed-local guards `isReader` and `isResult`. The manifest key stays `docs`; the option stays `--to guide|--to source`; the usage line is unchanged, because the specifier is wiring rather than user interface.

## Alternatives

**Option 1, a presence-owned template artifact — refused.** It is the right shape for a seed and the wrong shape for a tool. `tests/distribution.test.ts` earns presence ownership because it is a proof derived from one workspace's own shape (`/home/user/scaffold/guides/scaffold.md:1045-1055`); the parity seed is shared machinery whose per-workspace variance is a single import specifier. The costs are concrete: the program's text moves into `src/core/templates.ts` as the largest frozen string in the file, scaffold's own working copy becomes a second copy held equal only by a new pin test, a defect fix reaches no target without a delete-and-repair the fleet will not perform, the `HOST_PATHS` row and its digest go away with the propagation, and the guide package ends up owning a fork of machinery the whole fleet runs. Its one genuine advantage — a guides-less workspace receives no seed at all — is available to the recommended shape too, as a later narrowing of the vendored set, and is not worth forking the program for.

**Option 3, a `scaffold` verb — refused, and already ruled out.** `rulings.md:7` says the projection is "invoked by a package's `docs` script and its `tests/guides.test.ts`, never a `scaffold` verb". Beyond the ruling: the verb law admits no `--to` option (`/home/user/scaffold/guides/scaffold.md:476-477`), so the direction would have to become verbs inside a five-verb vocabulary about workspace files; `audit`'s findings are artifact paths rather than compared cells, so the report mode has no home in the existing result; `@orkestrel/guide` would move to scaffold's runtime dependencies and reach every consumer of the tool; and the guide package would then check its own prose with readers scaffold installed from the registry, one release behind its own tip — a drift report against a stale reader is worse than no report.

**Option 4, a bin in `@orkestrel/guide` — refused.** The package's tagline is its contract: "A pure, I/O-free guides-parity toolkit … never touching disk itself" (`/home/user/fleet/guide/guides/guide.md:3-9`), and its manifest ships `dist/src` alone with an `exports` map carrying `.` and `./package.json` (`/home/user/fleet/guide/package.json:22-43`). A bin needs a server layer, a subpath export, a `bin` field, and a `files` entry, and it puts filesystem I/O inside the package whose purity is the reason its readers take an inventory from the caller. Its real advantage is that no seam exists at all, so revisit it only if signature drift across the fleet proves unmanageable, and then as a `@orkestrel/guide/server` entry rather than in the core.

**A fifth shape ruled and rejected: the seed infers its reader from the manifest.** It would resolve `@orkestrel/guide` where `package.json` declares it and fall back to a local build otherwise, keeping one command everywhere. It hides the wiring in a heuristic inside a vendored file and makes the guide package a special case in shared bytes. The positional argument is the honest wiring point, and it sits in the file the workspace owns.

## Constraints

## Refusals

## Measurements

## Units

Each names its role and engine so the routing ledger is derivable. The Sol bench is recorded dark for this round, so the objective lane runs on Opus 5 as the recorded substitution; re-read bench liveness at dispatch and prefer `sol` and `analyst` where it round-trips.

**G1 `guide-parity`** — `implementer` (Opus 5, native), checkout `/home/user/fleet/guide`.
Owns `src/core/types.ts`, `src/core/helpers.ts` (or the kind file each new function belongs in), `guides/guide.md`, `README.md` where the tagline moves, `tests/**`. Depends on D2-fix having landed. Acceptance: the three entries exist with the declared types; each composes the landed readers and replacers rather than re-deriving them; a fixture workspace inventory produces the report, the guide-side rewrite, and the source-side rewrite the D5 report records (`/home/user/scaffold/.orkestrel/campaign/docs-parity/d5-scaffold-seed-report.md:104-146`); an absent index and an unindexed guide return findings rather than throwing; the package's own gates green; the guide and the parity gate updated for the new exports.

**G1-audit** — `reviewer` (Opus 5) for the subjective lane and `analyst` (GPT-5.6 Sol, or `reviewer` on Opus 5 with the substitution recorded) for the objective lane, on numbered falsifiable claims, plus `checker` (Grok, then the ladder) for the export list and the guide parity rows.

**H1 `guide-headstart`** — Orchestrator's own tracked command, host. Fetch and merge the guide's default branch, build, pack, and install the tarball into `/home/user/scaffold`, recording the replaced range. Never link. Repack whenever G1's source moves.

**D5-fix `seed-seam`** — `implementer` (Opus 5, native), checkout `/home/user/scaffold`.
Owns `scripts/docs.ts`, `src/core/compilers.ts` (the emitted `docs` command and its `@remarks`), `package.json` (scaffold's own `docs` value), `guides/scaffold.md` § Ownership and drift, `host.json` by regeneration, `tests/src/core/compilers.test.ts`, `tests/src/core/Compiler.test.ts` (D5's report-only patch P1), and `tests/guides.test.ts` for the F4 adoption. Off-limits: `.claude/rules/workspace.md` and `tests/src/server/helpers.test.ts` — the rule and its gate stay as they are. Depends on H1. Carries D4's retained finding F4.

**D5-fix-audit** — the objective lane and the subjective lane as the execution loop's audit step names them, at least one on an engine that did not write the work, plus `checker` for the mechanical criteria.

**V1** — `verifier` (Sonnet), the authoritative gate chain after D5-fix integrates.

### What D5-fix deletes from D5's landing

The `import type` and value import block at `/home/user/scaffold/scripts/docs.ts:19-37`, and with it the `Row` and `Outcome` interfaces, `buildSummaries`, `buildIndex`, `splitExample`, `findExample`, `reportRow`, `writeGuide`, `writeSource`, `INDEX_FILE`, and the two thrown errors — all of which move into G1's composed entries. The header paragraph at `:14-17` is rewritten to state the specifier contract instead of the self-containment justification. Nothing else from D5's landing is removed: the `HOST_PATHS` row at `src/core/constants.ts:140` stays, the emission at `src/core/compilers.ts:351` keeps its home and gains the argument, and the manifest script stays.

### Acceptance criteria, cheap first

1. `grep -n "@orkestrel/" scripts/docs.ts` returns nothing, and the file's only imports are `node:*`.
2. `npm run format:check`, `npm run lint:check`, and `npm run check` each exit 0.
3. `npm run test:src:server` exits 0, with the vendored-imports case at `tests/src/server/helpers.test.ts:174-201` green — the case D5's report predicted red as P2.
4. `npm run test:src:core` exits 0, with the artifact tally at `tests/src/core/Compiler.test.ts:71,74` landed at D5's measured values and the seed's fixture cases re-run against the installed reader passed as the argument.
5. `npm run test:guides` reports the same standing disagreements through `computeParity` that `npm run docs` prints, so the gate and the seed disagree about nothing.
6. `npm run build` regenerates `host.json`, and a second `npm run build:inventory` leaves it byte-identical.
7. `npm run docs` over this checkout reports the key set D4 recorded and the pitch line, and exits 1.
8. A generated fixture workspace with no guides and no `@orkestrel/guide` installed typechecks with the vendored seed present.
9. `scaffold audit` against a fixture whose `docs` value was hand-customized reports no drift at that script and does not rewrite it.

### What the owner must decide

- `@orkestrel/guide` gains three exports and a release inside this campaign. The exit criterion already requires `npm run docs` propagating in each direction, so this is a re-baseline rather than a rescope, but it moves the guide package back onto the critical path and adds a bump the publish plan must carry.
- The guide package's own `docs` value chains its build (`npm run build:src:core && node --experimental-strip-types scripts/docs.ts ./dist/src/core/index.js`), so its parity run reads its built tip rather than its source. Confirm that, or accept a stale reading when the build is old.
- Scaffold's emitted default names `@orkestrel/guide` in a generated script. Confirm that scaffold may name its sibling package there, the way `blueprintToDevDependencies` already names the fleet.

## Tensions

- **Three entries against one with a `direction` value.** I ruled the direction a magic mode under `.claude/rules/names.md` and split it. The objective lane may hold that the two writes are one algorithm over a side selector, and that one export costs the fleet less surface. Rule it.
- **The seed re-declares `ParityResult` locally to narrow the dynamic import.** That is a small foreign-contract copy inside a vendored file, and it is the residual of the cost option 2 was accused of. I hold that a record checked by a total guard is a different thing from a signature table nothing can check, but the objective lane owns whether the guard is total enough.
- **The guide package's argument may not need to differ at all.** Node resolves a package's own name through its `exports` map, and `/home/user/fleet/guide/package.json:31-43` declares one, so `import('@orkestrel/guide')` inside that checkout might resolve to its own `dist`. I have not run it, the design does not depend on it, and the objective lane should settle it — if it holds, the guide package's only customization is the build prefix.
- **The gate adopting `computeParity` reopens `tests/guides.test.ts`, which D4's audit accepted.** I folded it into D5-fix because F4 is a retained finding needing a carrier and this is the seam that closes it. The Orchestrator may prefer a separate unit so D4's acceptance is not disturbed.
- **The vendored set could stop shipping the seed to a guides-less workspace.** That narrowing is available and would remove the strongest fit argument against every option here, including mine. I left it out of scope because it changes `HOST_PATHS` selection for one member, which is its own ruling.

## Risks

- **Signature drift is caught at run time, not by a compiler.** A guide release that changes an entry's shape fails inside every target's `npm run docs` rather than in a diagnostic. Evidence needed: the guard's failure message driven against a module missing an entry and against one returning a malformed record, both as tests in the seed's fixture cases.
- **A stale head-start tarball goes green against a fix that no longer exists in the guide's tree.** Evidence: the pack's source commit recorded beside the install, and a repack whenever G1's tip moves.
- **The gate and the seed diverge if the gate keeps its hand-written composition.** Evidence: criterion 5, a planted disagreement reported identically by both.
- **`--experimental-strip-types` and a dynamic import of a built ESM entry.** Unverified together. Evidence: a bounded probe running the seed under that flag against a real installed `@orkestrel/guide` and against a relative `dist` path, in a workspace with no guides and in one with them.
- **`exactOptionalPropertyTypes` against the optional members of the locally declared result.** A guard that admits an explicit `undefined` member types differently from the package's own declaration. Evidence: `npm run check` over the seed with a fixture result carrying explicit `undefined`.
- **A target whose installed `@orkestrel/guide` predates the entries `repair` just vendored.** The seed fails the guard on an otherwise healthy workspace. Evidence: the range each target declares, read against the release G1 produces, and the failure message naming the range to raise.
