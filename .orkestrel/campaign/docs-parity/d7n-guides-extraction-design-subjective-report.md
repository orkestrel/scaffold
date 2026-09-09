**Lane held: subjective (planner).** I read the brief, the canonical scaffold and guide checkouts, and the captured diff and status. I did not edit files or run commands.

# Design

## The two rulings

1. **Guide gains one entity, `Parity`**, that turns a pure inventory plus manifest rows into per-row views, rewrites, and refusals. `Drift` gains a `category` discriminant so no consumer ever reconstructs which site a disagreement came from. Guide stays core-only and gains no dependency.
2. **Scaffold drops `RETIRED_HOST_PATHS` and gains no replacement list.** The obsolete vendored file leaves each target through the per-repo visit the align skill already owns. Widening ownership to `scripts/` is refused, with the exact file it would destroy named. A durable retirement mechanism exists but does not reach this file, so it is surfaced as the owner's choice rather than folded in.

---

## A. `Drift` names its own site

`findDrift` returns an untagged `Drift` (`guide/src/core/helpers.ts:2392`). The scaffold entry recovers the site by counting example drifts, subtracting them from the authoritative list, and asserting the remainder is a matching suffix, throwing on disagreement (`scaffold/tests/guides.test.ts:167-205`). That arithmetic is the single largest piece of duplicated guide mechanics downstream, and it is unrecoverable in principle: an `@example` title may spell any string, including `class Widget`, so the key cannot tell a summary key from an example title.

The producer knows the axis and the reader cannot derive it, so the value carries it:

```ts
/** Names the compared site one disagreement came from. */
export type DriftCategory = 'summary' | 'example'

export interface Drift {
	readonly key: string
	readonly category: DriftCategory
	readonly guide?: string
	readonly source?: string
}
```

`computeDrift(key, category, guide, source)` takes the category from its caller. `driftShape` (`guide/src/core/shapers.ts:86`) and `isDrift` (`guide/src/core/validators.ts:114`) gain the member from one frozen `DRIFT_CATEGORIES` constant, the way `EXPORT_KEYWORDS` already feeds `ExportKeyword` (`guide/src/core/types.ts:10`).

A `## Surface` row and a `## Methods` row are both `summary`. Both write through `replaceCell` on the guide side (`guide/src/core/helpers.ts:2680`) and `replaceSummary` on the source side (`guide/src/core/helpers.ts:2802`), and `replaceCell` locates either row itself. A third member would label a fact the key's own shape already carries, which the design laws refuse.

## B. `Parity`: the one new entity

`Parity` is a pure view over one inventory and one manifest row list. It parses each guide once, reflects each module scope once, and answers both the read-only assertions and the explicit rewrite from those same views.

```ts
export interface ParityOptions {
	readonly files: Readonly<Record<string, string>>
	readonly entries: readonly ManifestEntry[]
}

export interface ParityRow {
	readonly entry: ManifestEntry
	readonly guide: GuideInterface
	readonly source: SourceInterface
}

/** Names the side a rewrite writes into. */
export type ParityDirection = 'guide' | 'source'

/** Names why a requested rewrite left a disagreement standing. */
export type ParityRefusal = 'authority' | 'site' | 'content'

export interface ParityReport {
	readonly spec: string
	readonly drift: Drift
	readonly refusal: ParityRefusal
}

export interface ParityResult {
	readonly files: Readonly<Record<string, string>>
	readonly reported: readonly ParityReport[]
}

export interface ParityInterface {
	row(spec: string): ParityRow | undefined
	rows(): readonly ParityRow[]
	rewrite(direction: ParityDirection): ParityResult
}
```

`createParity(options)` joins `createGuide`, `createSource`, and `createSourceManager` in `guide/src/core/factories.ts:45-106`; the class sits at `guide/src/core/Parity.ts` and takes a barrel row, matching `Guide.ts` placement.

The accessor pair `row(spec)` / `rows()` is the manager shape the pattern rules fix. `rows()` covers the entries whose `spec` the inventory carries; an entry naming an absent spec is the consumer's refusal, taken before construction, which is where the missing-index and missing-spec exits already live.

`rewrite` returns only the file texts it changed, keyed by inventory key. Accumulation across rows into one text is Guide's job, which is what makes the shared-file case — one source file two guide rows both rewrite — an engine invariant instead of a consumer loop.

`ParityRefusal` keeps mechanism in the library and the sentence in the package:

| Refusal | The engine found | The consumer's sentence names |
| --- | --- | --- |
| `authority` | The authoritative side carries no text at that key | Which side is empty, read from `drift.guide` and `drift.source` |
| `site` | The destination the key names does not exist: no `Summary` cell, no titled fence, no doc block | The destination, read from `drift.category` and the direction |
| `content` | The site exists and the replacer refused the text | The refusal the replacer documents |

Each maps to a different repair, so each is a real domain state. The consumer keeps every sentence it prints today, including the `absent` rendering and the trailing reason.

## C. The boundary

| Guide owns | The package owns |
| --- | --- |
| Row construction, per-row caching, drift with its category | Which globs form the inventory, which file is the index, which file is the README |
| Rewrite accumulation, the changed-text set, refusals | Disk reads, disk writes, `wrote` and `next: npm run format` lines |
| The first-fence-per-title rule and the first-block-per-key rule | Argument parsing, the usage line, exit codes |
| The doc-block site index and the titled-example lookup | Vitest orchestration through `createVitest`, worker detection, runner failure reading |
| | The README pitch pair, which compares two guides rather than a guide and its source |
| | Every executable fence assertion and every package-specific claim |

The pitch pair stays downstream deliberately. It compares `README.md` against `guides/<name>.md` through `tagline()` and reads the manifest's own bare name, which is package policy about file identity rather than guide mechanics.

## D. What the caller becomes

```ts
const files = readInventory(ROOT)
const index = files[INDEX_FILE]
if (index === undefined) { /* exit 2 */ }
const entries = parseManifest(index, 'guides')
const absent = entries.filter((entry) => files[entry.spec] === undefined)
if (absent.length > 0) { /* exit 2 */ }

const parity = createParity({ files, entries })
const { files: written, reported } = parity.rewrite(direction)
for (const path of Object.keys(written).toSorted()) { /* write, print */ }

const fresh = createParity({ files: readInventory(ROOT), entries: /* reparsed */ })
for (const row of fresh.rows()) {
	for (const drift of findDrift(row.guide, row.source)) { /* report */ }
}
```

These entry declarations go: `Row`, `Comparison`, `buildComparisons`, `matchesDrift`, `buildRows`, `buildIndex`, `findExample`, `splitExample`, `formatExample`, `writeGuide`, `writeSource`, `collectMissing`, `flushTexts`'s comparison half, and `buildReasonKey`. The colliding summary and example key case stops being a consumer concern outright: the reason map keyed `spec\ncategory\nkey` (`scaffold/tests/guides.test.ts:155`) disappears because `ParityResult.reported` is a list of records rather than a keyed map.

`registerGuides` reads `parity.rows()` in place of its own `inspected` construction (`scaffold/tests/guides.test.ts:499-509`), which removes the second copy of guide-and-source construction from the same file. Every assertion in that block survives unchanged.

## E. Markdown reuse, and the approximation that goes

The compared example text `${language}\n${code}` exists only so `findDrift` can compare a fence against a doc block. The entry re-parses that encoding back into a record with `splitExample` (`scaffold/tests/guides.test.ts:129-134`) and re-encodes it with `formatExample` (`scaffold/tests/guides.test.ts:159-161`). That round trip is the parallel local approximation the brief names, and the engine deletes it by never leaving the parsed form:

- Writing a guide fence takes the `SourceExample` record `collectTitles` already returns (`guide/src/core/helpers.ts:2446`) and hands it to `replaceFence`, which renders through `buildFence` and `renderMarkdown` (`guide/src/core/helpers.ts:2508`, `2741`).
- Writing a doc block takes the `GuideFence` record `guide.fences()` returns — its `language`, `code`, and `title` are parser output — and pairs it with the matched example's declaration `name`. No string is split on a newline to recover a language.

An absent language stays `undefined` end to end and `buildFence` emits an untagged fence, so the absent-language case is preserved by construction instead of by an empty first line.

Every span rewrite keeps using the provenance the Markdown package supplies: `createMarkdown(...).span(node)` inside the replacers, and `spliceSpan` for the doc-block region `locateComment` reports (`guide/src/core/helpers.ts:2532`, `2951`). No second parser enters, and no Markdown call is added to code that reads TypeScript.

## F. Core-only, and the dependency consequences

Pure inventory composition keeps Guide core-only. `Parity` reaches strings, `Map`, and `Object` alone; it opens no file, resolves no path, and imports no runner.

- Dependencies stay `@orkestrel/contract` and `@orkestrel/markdown` (`guide/package.json:75-78`). Vitest stays a development dependency and gains no peer entry.
- No `src/server/` tree, no second `exports` condition, no `check:src:server` scope. `check:src` stays `check:src:core` (`guide/package.json:53`), and `sideEffects: false` holds.
- The published surface moves, so Guide bumps and scaffold re-pins. Scaffold declares `@orkestrel/guide` at `^0.0.17` while the checkout carries `0.0.18` (`scaffold/package.json:105`, `guide/package.json:3`), so a re-pin is owed before this work as well as after it.
- Per-entry source mappings stay possible: `ParityOptions.entries` accepts any `ManifestEntry[]`, including hand-built rows, and `ManifestEntry.source` already carries a directory list — scaffold's own index row names `src/core` and `src/server` together (`scaffold/guides/README.md:10`).

## G. Scaffold ownership: the population, and why the requested deletion needs an owner ruling

The owned population that produces a `foreign` finding is exactly:

- every hydrated planned artifact path;
- every file directly beneath each expanded host root, where the roots are the manifest's declared directories (`scaffold/src/server/Materializer.ts:639-648`, `662-677`; `scaffold/host.json:730`);
- every canon path the target holds, filtered to the plan's groups (`scaffold/src/server/helpers.ts:864-874`).

`planToFindings` then marks an unplanned snapshot path `foreign` only when `inferGroup(path)` is in `plan.groups` (`scaffold/src/core/compilers.ts:2184-2198`). The deletion verb is `remove`: it refuses a dirty tree, re-derives the candidate set, reconfirms it against the supplied audit, and takes only a `foreign` finding that git tracks and `matchesProtectedPath` does not refuse, quarantining each file rather than unlinking it (`scaffold/src/server/Materializer.ts:467-495`). Protection covers `.git`, `src/`, and `app/` (`scaffold/src/server/helpers.ts:105-131`).

`scripts/docs.ts` is in none of those populations. `scripts/` is not a manifest root, and it is not a `CANON_PATHS` member (`scaffold/src/core/constants.ts:190-205`); the vendored set names individual files there (`scaffold/src/core/constants.ts:136-139`). That absence is why the predecessor invented a list, and no rename of that list changes the fact.

**The boundary that must not be crossed.** Making `scripts/` an owned root turns every unplanned file beneath it into a tracked deletion candidate. `scripts/service.sh` is planned only when the blueprint declares vendors (`scaffold/src/core/compilers.ts:1547-1559`), so a workspace that drops its vendors loses the provisioner it still uses. A maintainer's own script under `scripts/` is unprotected, because protection reaches `src/` and `app/` alone. Refuse directory ownership.

**The recommendation.** Delete `RETIRED_HOST_PATHS`, its `#derive` branch, its guide row, its prose, and its test. Remove `scripts/docs.ts` in this checkout, which the staged diff already does, and remove it in each fleet target as a named step of that target's next visit in the align skill's per-repo procedure. That step is deleted when the wave completes, so the historical path lives in a procedure with an end rather than in a shipped constant with none. Nothing in scaffold's deletion authority moves.

**The owner choice, stated whole.** A retirement that the mechanism performs needs one datum: that the path was scaffold's. That datum can live in scaffold's source, which the owner rejects; in the target's tree, which no target holds today; or in the maintainer's procedure, which is the recommendation. A durable mechanism is available — scaffold writes a delivery receipt beneath `.orkestrel/` in each target, and a recorded delivery the current plan no longer names becomes a foreign candidate in its selected group. It cannot reach a package-owned file, because a receipt names only what scaffold wrote. It also cannot reach `scripts/docs.ts` in any target materialized before receipts exist, so it does not close this file and is not the smallest change. Take it as its own design round if the owner wants the mechanism.

## H. What the dirty diff must lose

Reviewed against the captured diff and status. Each item names the unit that carries it.

- The `RETIRED_HOST_PATHS` constant, its `#derive` branch, the `MaterializerInterface` and `Materializer` remarks describing it, the guide's `## Surface` row, the retirement paragraph in `guides/scaffold.md`, and the `Materializer` test that writes `project/scripts/docs.ts` — all rejected (`design.diff:2116-2117`, `2203-2205`, `2213-2234`, `55`, `136-139`, `4666-4697`). **U6.**
- `expect(planned).not.toContain('scripts/guides.ts')` and its sibling assert a path no version of scaffold ever emitted, so the assertion cannot fail for the defect it names (`design.diff:3696-3697`). The real claim is that the vendored set omits the authored proof, read from `GUIDES_TEST_PATH`. **U7.**
- The surviving `not.toHaveProperty('docs')` assertions sit in a test whose subject is now the guides command (`design.diff:3671-3674`). Nothing emits `docs`, so they are remnants. **U7.**
- `expect(paths).not.toContain('tests/guides.test.ts')` replaces a positive membership assertion in the vendored-imports proof (`design.diff:4710-4711`). The population's non-emptiness now rests on `tests/config.test.ts` alone; keep a positive membership row beside the negative. **U7.**
- No mechanism prunes a stale manifest script. `replaceManifestScripts` writes named scripts and retains everything else (`scaffold/src/core/compilers.ts:1865-1879`), and `docs` is no longer emitted, so every fleet target keeps a `docs` script naming a file the same change deletes. The visit step must remove the key alongside the file. **U10.**
- The `blueprintToHostArtifacts` example now spells `'tests/guides.test.ts'` as a literal where it previously named the constant (`design.diff:2077-2078`). Read `GUIDES_TEST_PATH` in the fence and in the guide fence that mirrors it. **U7.**
- `host.json` carries the digest changes for the two edited vendored files and drops the seed entry (`design.diff:161-198`). That regeneration must run after the last vendored edit lands, not before. **U8.**
- The toolchain `package.json` and staged `package-lock.json` edits are approved for the product commit and need no change beyond the `@orkestrel/guide` re-pin. **U5.**

---

# Alternatives

**Alternative one: tag the drift, extract nothing else.** Add `category` to `Drift` and leave the rewrite accumulation, the doc-block index, and the titled-example lookup in every package's `tests/guides.test.ts`.

Cost: the suffix arithmetic dies, which is the sharpest defect, and the change to Guide is a single member. But `buildIndex`, `findExample`, `writeGuide`, `writeSource`, and the shared-file accumulation stay duplicated in every fleet package's authored file, and each package re-derives the first-fence-per-title rule that Guide already owns. The documentation rule change tells every fleet package to author this file before its release (`design.diff:11-17`), so the duplication multiplies across the fleet exactly when the rule lands. The proposed design wins because the duplication it removes is per package, not per repository.

**Alternative two: a direction-free API with two named rewrites.** Replace `rewrite(direction)` with two entity methods, one writing guides from source and one writing source from guides, so no literal selects a behavior.

Cost: the two methods need verb names that do not collide with the `guide` and `source` nouns the package already fixes for the two sides, and the CLI's `--to guide|--to source` contract then maps onto names that do not match it, which breaks one term per concept at the surface a developer reads. The proposed design wins because `guide` and `source` are a conventional value pair naming one axis the `Drift` type already models with those exact member names, and the two directions are one traversal parameterized by locator and replacer rather than two algorithms. This is the closest call in the design and it is filed as a Tension.

# Constraints

Not this lane's section. The objective lane owns it.

# Refusals

Not this lane's section. The objective lane owns it.

# Measurements

Not this lane's section. The objective lane owns it.

# Units

Serialize every unit that writes the same checkout. `U1` and `U2` write the guide checkout; `U5`, `U6`, `U7`, and `U10` write the scaffold checkout.

**U1 — `guide-drift-category`.** Role `sol`, engine Sol. Owns `guide/src/core/{types,constants,helpers,shapers,validators}.ts`, `guide/guides/src/guide.md`, `guide/tests/src/core/helpers.test.ts`. Depends on nothing. Adds `DriftCategory` and its frozen constant, the `Drift.category` member, the `computeDrift` parameter, the `findDrift` tagging, and the shape and guard members, with the guide rows the parity gate requires. Acceptance: a direct test proves `findDrift` tags a `## Surface` row and a `## Methods` row `summary` and a titled fence `example`; `npm run check`, `npm run test:src:core`, and `npm run test:guides` green in the guide checkout, each reading reported with its command.

**U2 — `guide-parity-engine`.** Role `implementer`, engine Opus. Owns `guide/src/core/{types,helpers,factories,index}.ts`, `guide/src/core/Parity.ts`, `guide/guides/src/guide.md`, `guide/tests/src/core/Parity.test.ts`. Depends on U1. Adds the `Parity` types, the class, `createParity`, the site-collection helper, the barrel row, and the guide's `## Surface` and `## Methods` rows with a runnable example. Acceptance: a direct test proves a row per carried spec; a rewrite in each direction returning only changed texts; one source file two rows rewrite accumulating into one text; a refusal of each kind reported with its drift and spec; a rewrite that resolves everything returning an empty report; guide parity and the guide checkout's gates green.

**U3 — `guide-audit`.** Roles `analyst` and `reviewer`, engines Sol and Opus. Reads U1 and U2's diffs and reports. Depends on U2. Acceptance: numbered falsifiable claims with per-claim verdicts, at least one lane on an engine that did not write the code.

**U4 — `guide-pack`.** Orchestrator-owned tracked command. Builds and packs the guide checkout and installs the tarball into scaffold, recording the range it replaced. Depends on U3. Acceptance: the install log, the replaced range recorded beside it, and `node_modules/@orkestrel/guide` resolving `createParity`.

**U5 — `scaffold-guides-entry`.** Role `implementer`, engine Opus. Owns `scaffold/tests/guides.test.ts` and the `@orkestrel/guide` range in `scaffold/package.json`. Depends on U4. Rewrites the entry onto `Parity`, deletes the listed local declarations, and keeps every printed sentence and exit code. Acceptance: `npm run test:guides` green read-only; a seeded scratch run in each direction writing and reporting; a named case for each preserved behavior the brief lists — default no-write, strict worker detection, invalid-direction preflight, missing index and missing spec refusal, shared-file accumulation, colliding summary and example keys, repeated titles, absent language, fresh worker import, runner failure, and unresolved drift.

**U6 — `scaffold-ownership-retraction`.** Role `sol`, engine Sol. Owns `scaffold/src/core/constants.ts`, `scaffold/src/server/{Materializer,types}.ts`, `scaffold/guides/scaffold.md`, `scaffold/tests/src/server/Materializer.test.ts`, `scaffold/tests/src/core/helpers.test.ts`. Depends on the owner's ruling in Tensions. Removes the constant, the derive branch, the remarks, the guide row, the retirement prose, and the test. Acceptance: no source or test names a retired path; `npm run check`, `test:src:core`, `test:src:server` green; the guide's surface bijection green.

**U7 — `scaffold-diff-remnants`.** Role `builder`, engine Sonnet. Owns `scaffold/tests/src/core/compilers.test.ts`, `scaffold/tests/src/server/helpers.test.ts`. Depends on U6. Applies the fully specified assertion corrections listed under § What the dirty diff must lose. Acceptance: each corrected assertion reddens when its subject is reverted, recorded with the command and its reading.

**U8 — `scaffold-inventory`.** Orchestrator-owned tracked command. Rebuilds and regenerates `host.json` after the last vendored edit. Depends on U5, U6, U7, U10. Acceptance: the regenerated inventory committed with its build log, and `scaffold audit` on this checkout reporting no vendored drift.

**U9 — `scaffold-gates`.** Role `verifier`, engine Sonnet. Depends on U8. Runs the gate chain in order and reports exit codes and output. Acceptance: the chain's readings recorded with each command.

**U10 — `fleet-visit-step`.** Role `implementer`, engine Opus. Owns `scaffold/.agents/skills/orkestrel-align-packages/references/*` and `scaffold/.claude/rules/documentation.md` where the rewrite command's wording lands. Depends on the owner's ruling. Records the one-time per-target removal of the retired seed and its stale manifest script as a visit step with a stated end. Acceptance: the step names the file, the script key, and the condition that retires the step; the policy sweep and the guide's link parity green.

# Tensions

Named for the objective lane to challenge, or for the Orchestrator to rule.

1. **`ParityDirection` as a two-literal union.** The design laws make a binary behavioral switch a boolean, and the naming rules keep a conventional value pair as a union. I ruled it a pair naming one axis the `Drift` type already spells with the same member names, and matching the accepted `--to guide|--to source` contract. The objective lane can argue the two directions are two algorithms behind a discriminator parameter and must split.
2. **Storing `category` against the derive-state law.** I ruled the site unrecoverable because a title may spell a symbol key. The objective lane can attempt to derive it — from the key's shape against the guide's own projections — and break the ruling with a case.
3. **`ParityRefusal` collapses the entry's distinct reasons.** Two of the entry's current sentences map to `authority`. I ruled one of them unreachable by construction under the new engine. The objective lane can produce an input that reaches it.
4. **No shape, guard, or contract factory for the new Parity types.** Guide gives every other public data type all three. I ruled that the minimal-API creation gate refuses them without a consumer. The objective lane can argue the package's own consistency is the consumer.
5. **The ownership ruling is the owner's, not mine.** I recommend the visit-step migration and refuse directory ownership. The receipt mechanism is available and does not close this file. The Orchestrator must put the choice to the owner before U6 and U10 dispatch, because both units' briefs depend on it.
6. **Readings I do not have.** No command ran in this lane. Unmeasured and needed before U5's acceptance: whether the guide checkout's own `test:guides` project passes against a `Drift` carrying a new member; whether `node --experimental-strip-types` accepts the rewritten entry on the declared minimum Node runtime; and the guide checkout's gate chain reading after U2. Each belongs to the unit that lands it, taken on the host rather than inside a bench exec.

# Risks

- **Fleet breakage on the `Drift` change.** Every package authoring a guides entry reads `findDrift`. The member is additive for a reader that ignores it and breaking for `computeDrift` callers. Evidence needed: a search across the fleet checkouts for `computeDrift` call sites, bounded by the packages the catalog lists, before U1's brief is written.
- **The guide mirror and the layer order.** Scaffold vendors `guides/guide.md` as a mirror fetched from the guide repository's default branch (`scaffold/guides/README.md:47-48`). The mirror refresh, the `host.json` digest, and the scaffold bump all follow the guide branch landing on its default branch. Evidence needed: the guide repository's branch state at the moment U8 runs.
- **`Parity` holds the whole inventory.** Each row keeps a parsed guide and a reflected source for the life of the entity, and the write path builds a second entity from fresh bytes. Evidence needed: the entry's wall time and peak memory on the scaffold checkout, read from a real run in U5, against the reading the predecessor entry produced.
- **The stale `docs` script key.** Every fleet target keeps a script naming a file this change deletes, and no gate reports it. Evidence needed: a reading of one fleet target's manifest confirming the key, taken before U10's brief fixes the visit step's wording.
- **The direct-entry requirement on every fleet package.** The generated command runs the authored file through plain Node, which resolves no Vite alias. A package whose authored file imports an alias at module scope fails the generated command. Evidence needed: the alias imports at module scope in each fleet package's existing guides entry, surveyed before the documentation rule's instruction reaches those packages.
- **An all-confirmed audit round.** U3's claims must be falsifiable by evidence the round can obtain. Evidence needed: each claim paired with the input, state, or interleaving that would break it, written into U3's brief rather than left to the auditor.
