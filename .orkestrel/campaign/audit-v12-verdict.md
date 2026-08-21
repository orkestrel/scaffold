# Verdict — units V1 and V2, version authority (subjective / design-fit lane)

Lane held: **subjective** (design acceptance, API and vocabulary, architecture fit, simplification, guide/product coherence). Evidence: the working tree's `src/` files, `guides/scaffold.md`, and the ruling records under `.orkestrel/campaign/`. No executed evidence of my own — I am read-only; where a reading needs a run I name the settling command.

---

## 1. The derivation matches the ruling — CONFIRMED

Self-pin and every scaffold-installed row derive from the imported manifest, with no residual literal among them: `src/core/constants.ts:373-401` (`BASE_DEV_DEPENDENCIES`, `DECLARATION_DEV_DEPENDENCIES`, `SOURCE_BROWSER_DEV_DEPENDENCIES`, `APP_DEV_DEPENDENCIES`), `:406` (`@orkestrel/html`), `:428` (`@orkestrel/emitter`). The self-pin is `` `^${manifest.version}` `` at `:376`, so a release moves it without an edit.

Full-triple floors after amendment 2 hold on both sides. `package.json:102-115` carries a caret over a whole triple for every foreign row, including the row the design was written around (`oxfmt: "^0.64.0"`) and the row that was a tilde before (`vite: "^8.2.2"`). The seeds returned to their triples: `src/core/constants.ts:407-409` (`^6.0.8`, `^3.5.40`, `^3.3.7`), `:423` (`^2.3.3`), and the uninstalled app-server fleet rows keep exact-caret offline seeds at `:429-431`.

No second normalizer sits at emission: `src/core/compilers.ts:230-251` spreads the tables verbatim and sorts, and adds no range rewriting.

I could have falsified this claim and did not: a single literal left behind in a derived table, or a bare `^MAJOR` surviving in either the manifest or the seed set, would have broken it. Neither exists.

## 2. `blueprintToDevDependencies` signature unchanged, `replacePlanRanges` re-hashes — CONFIRMED

`src/core/compilers.ts:230` still reads `(blueprint: Blueprint): Readonly&lt;Record&lt;string, string&gt;&gt;`, and the V1 diff touches nothing inside the function body's merge order. `replacePlanRanges` recomputes identity in the same compiler that moved the bytes: `src/core/compilers.ts:1562-1564` calls `planToHash(compiled)` on the replaced artifacts and refuses the whole plan when the hash cannot be computed. The refusal is total in both directions — `:1561` returns `undefined` when no manifest artifact was replaced *or* when any named range was undeclared, so a partial replacement can never reach a materializer.

## 3. The verbs implement the reconciliation's table — **BROKEN**

Most of the table is present. Offline outcomes are correct at every verb: `new` evaluates `#pin` before `replacePlanRanges` and therefore before the materializer exists (`src/bin/CLI.ts:226`); `audit` collects failed verdicts into `releasesToExit` and writes nothing (`:284`); `repair` resolves and pins before `materializer.repair` (`:310-315`); `catalog` pins and asserts before any write (`:348-355`); `overwrite` keeps the offline half, collects the network failure into `note`, and returns `EXIT_DRIFT` (`:444-480`, `:430-432`). Complete-set-or-nothing is enforced in one place, `#pin` at `:577-592`, which throws before returning any partial list. Exact fleet comparison is at `src/bin/helpers.ts:294`. A foreign major is never auto-crossed.

**The floor-raise for a foreign row does not work for the case the ruling was written to solve.**

`src/bin/CLI.ts:491` hands the registry the row's **declared range**, not its declared major:

```ts
range: unbounded || dependency.name.startsWith('@orkestrel/') ? '*' : dependency.range,
```

`Upstream` then selects the newest version that range admits (`src/server/Upstream.ts:470-484`, `#admits` at `:488-495`), and for a caret over a major-zero triple `matchesRange` locks the minor: `src/core/helpers.ts:722` returns `false` whenever `left[0] === 0` and the minors differ. So for `oxfmt ^0.64.0` the lookup can only ever return `0.64.x`. `#pin` writes `^0.64.x`. `^0.65.0` is unreachable through `repair`, through `overwrite`, and through `catalog`.

The audit advisory has the same ceiling. `src/bin/helpers.ts:322-335` compares the found `latest` against the declared triple, but `latest` is already minor-locked, so the question it emits reads `oxfmt declares the floor ^0.64.0, while the registry serves 0.64.9 within major 0` — it can never name `0.65.0`. The crossed-major advisory at `:336-344` fires only on a different **major**, which for a major-zero package means major 1.

Two artifacts in the tree assert the opposite of what the code does, which is what makes this a design-acceptance break rather than a preference:

- `src/bin/CLI.ts:482-483` — the method's own comment: "each foreign row against the newest release **its declared major** admits."
- `guides/scaffold.md:909-913` — "Inside the declared major the verbs raise the floor themselves, which is what makes the caret's own width beside the point: `^0.64.0` admits no `0.65.0`, and `repair` rewrites the range to `^0.65.0` rather than widening it." And `:937-939`: "A foreign row is compared inside its declared major."

Why it matters: amendment 2's entire justification for full-triple floors over bare `^MAJOR` was that the verbs would raise the floor by rewrite. For every nonzero-major row the caret already spans the major, so the mechanism is invisible; the only rows where it is load-bearing are the major-zero ones, and those are exactly the rows where it does nothing. Scaffold's own `oxfmt` pin is one, and the released package propagates that frozen floor to every generated workspace.

The machinery for the correct behaviour is already built and currently unreached by any shipped call: `src/server/Upstream.ts:493` handles a bare `^MAJOR` range explicitly (`extracted[0] === major`), and `extractRangeMajor` is imported into `CLI.ts`'s neighbourhood through `src/bin/helpers.ts:8`.

**What right looks like.** At `src/bin/CLI.ts:491`, resolve a foreign row under its declared major rather than its declared range — substitute `` `^${String(major)}` `` where `extractRangeMajor(dependency.range)` answers, and fall back to the declared range where it does not. That single edit makes `#pin` write `^0.65.0`, makes the `src/bin/helpers.ts:322` floor question name the real newest-in-major, and leaves the never-cross-major guarantee intact because the substituted range is still bounded by the major. Then re-read `src/bin/CLI.ts:482-483` and `guides/scaffold.md:909-913` against the result; today they describe the fix, not the code.

Settling command, for the Orchestrator to confirm before re-dispatch:

```
npx.cmd vitest run tmp/probe/floor-raise.test.ts --config vite.config.ts --no-cache --project probe
```
asserting `matchesRange('^0.64.0', '0.65.0') === false` and that a loopback fixture packument serving `0.64.9` and `0.65.0` returns `0.64.9` from `new Upstream(...).lookup([{ name: 'oxfmt', range: '^0.64.0' }])`.

## 4. The registry seam and the selection rule — CONFIRMED

The seam is one option row carrying the whole reader's option bag: `src/bin/types.ts:175-179` declares `readonly upstream?: UpstreamOptions`, held once at `src/bin/CLI.ts:134` and read by every verb that reaches the network, and `src/bin/main.ts:11-15` maps `ORKESTREL_SCAFFOLD_REGISTRY` onto `upstream.registry.base` and nothing else. `main.ts` stays an entry: it declares no module-scope constant and no function, per `.claude/rules/architecture.md`. Passing the whole `UpstreamOptions` rather than a narrower copy is the right call and the TSDoc at `src/bin/types.ts:163-173` earns it — a second type would have drifted from the first.

Selection reads the packument already fetched, opens no second request, and applies no collection bound before choosing: `src/server/Upstream.ts:470-484` iterates the whole `versions` map with no `MAX_COLLECTION_ITEMS` cap, keeps the maximum by `compareVersions`, and only then falls back to `dist-tags.latest` clamped by the declaration. `'*'` is unbounded at `:491`. The named risk — the newest falling off a truncated list — is closed.

I note without deducting: this claim being confirmed is what makes claim 3 broken. The seam is right; the range handed to it is wrong.

## 5. Design fit — naming, placement, API shape — **BROKEN**

Placement and naming are sound. `replaceManifestRanges` and `replacePlanRanges` sit in `compilers.ts` as shape compilers; `extractRangeMajor` sits in `helpers.ts:623` beside `extractVersion`, and choosing `extract*` over the reconciliation's suggested `rangeToMajor` was the better read — `{noun}To{Noun}` would have implied a compiler. `CLIOptions.upstream` is a single-word grouped entity key. `Materializer.declare` routes through the shared replacement (`src/server/Materializer.ts:376`, `:998-1005`), and the private-text-rewrite duplicate is gone. The reversed `#dependencyQuestion` comment is rewritten correctly at `src/bin/CLI.ts:936-938`.

Three contract statements no longer describe the shipped surface, and one architecture seam reads as a bolt-on.

**5a. `declare` still claims a fleet-only contract.** `src/server/types.ts:199` and `src/server/Materializer.ts:355` both open with "Rewrite the `@orkestrel/*` range set in the target's manifest." Amendment 2 made the resolved set include foreign rows, and `src/bin/CLI.ts:310-316` proves it: `manifestToPlannedDependencies` returns fleet rows **plus** planned foreign rows (`src/bin/helpers.ts:257-272`), and that whole set goes through `#pin` into `declare`. Why it matters: the first sentence of a TSDoc is the method's contract under `.claude/rules/typescript.md`, and this one tells a consumer the method will not touch their `typescript` pin while it does. Right: state the actual subject — "Rewrite the declared dependency ranges the caller names in the target's manifest" — in the interface and the class together.

**5b. `Release`'s remark is false for every fleet row the CLI produces.** `src/core/types.ts:220` was narrowed by V1 to "the newest version upstream selected under `range`". That is true at the `Upstream` boundary and false at the CLI boundary, because `src/bin/CLI.ts:491` substitutes `'*'` for a fleet row and `:504` then writes the **declared** range back onto the verdict. Why it matters: `releases` is now public machine-readable output on `AuditResult`, `RepairResult`, `CatalogResult`, and `OverwriteResult`, and a consumer reading the documented invariant concludes `matchesRange(range, latest)` holds for a found row — when the entire purpose of the fleet row is that it usually does not. The previous wording, "the version upstream reported", was true. Right: state the invariant the type actually holds — `range` is the declared range and `latest` is the version the producer selected — and leave the selection rule documented on `Upstream.lookup`, where it already is at `src/server/Upstream.ts:163-167`.

**5c. `#admits` calls the abandoned form canonical.** `src/server/Upstream.ts:486-487`: "The registry reader adds the unbounded request form and canonical major carets used by foreign tooling." Amendment 2 struck bare `^MAJOR` as the canonical form. The branch is still worth keeping as tolerance for a foreign target's own text, but the comment names it as this package's convention. Right: say it tolerates a bare major caret a consumer's manifest may declare.

**5d. `audit` opens two registry readers and fetches every foreign packument twice.** `src/bin/CLI.ts:260` and `:261-264` each call `#lookup`, and `#lookup` constructs its own `Upstream` at `:486` and destroys it at `:507`. The second pass exists only to answer "what major does the registry serve", which the packument the first pass already downloaded also answers. Why it matters: this is the architecture symptom of 3. One document carries both answers; the seam returns one, so the caller compensates by paying for the document twice — doubling foreign request count and giving the run two independent 16 MiB byte allowances instead of one bounded call. It reads as a bolt-on because it is one. Right: once the foreign lookup is bounded by the declared major (the 3 fix), decide whether the crossed-major question can be answered from the same read; if it genuinely needs the unbounded answer, make that a single reader's second question rather than a second reader.

---

## Findings outside the claims

**F1. `src/bin/CLI.ts:484` — a positional boolean at a call site that cannot be read.** `#lookup(declared, unbounded = false)` is invoked as `this.#lookup(declared.filter(…), true)` at `:261-264`. The flag is a boolean rather than a two-literal union, which is correct, but `true` at the call site names nothing. Private surface, low severity. Fold the second call into a named private method, or take the substituted range as the parameter so the call site reads what it asks for.

**F2. `--help` never names the registry seam.** `guides/scaffold.md:467-470` documents `ORKESTREL_SCAFFOLD_REGISTRY`, and the executable's own option reference (`guides/scaffold.md:443-453`, generated from `OPTION_SUMMARY`) does not. An operator debugging a run against a private registry reads `--help` first. Add one line to the reference naming the variable and what it maps to; the env-var form itself is the right choice for a host-level fact and I retain it over a flag.

---

## Referrals — objective lane / Orchestrator

**R1. Packument size against the reader's own bounds.** `src/server/Upstream.ts:145` sets the per-response limit to `MAX_ARTIFACT_BYTES` = 5 MiB (`src/core/constants.ts:352`) and the per-call budget to 16 MiB (`Upstream.ts:83`). `audit` now looks up every planned foreign row in one call, and the abbreviated packument for a package with typescript's release history is the largest single answer the fleet will fetch. If it exceeds 5 MiB the row fails; if the call's rows together exceed 16 MiB the later rows fail with a spent-allowance note and `audit` exits 1 with no code defect visible. Settle with a bounded read: `curl -sH 'accept: application/vnd.npm.install-v1+json' https://registry.npmjs.org/typescript | wc -c`, plus the same for `vite`, `vitest`, and `playwright`, summed. No verdict from me.

**R2. `replaceManifestRanges` replaces every name-keyed quoted value in the manifest.** `src/core/compilers.ts:1482-1518` loops over every occurrence of the quoted name followed by `:` and a string, anywhere in the document. Its remark at `:1461-1463` states this deliberately, to keep duplicate declarations aligned across dependency sections. An `overrides`, `resolutions`, or `pnpm.overrides` entry has the same syntactic shape and is not a dependency declaration; a consumer's deliberate override would be silently rewritten to the registry's newest. Whether that is reachable and whether it is intended is a correctness and blast-radius question, not a design-fit one. Settle by driving `declare` against a fixture manifest carrying an `overrides` block for a declared name.

**R3. Whether the 3 fix moves the never-cross-major guarantee.** Substituting `` `^${major}` `` routes the foreign lookup through `#admits`'s bare-major branch (`src/server/Upstream.ts:493`) rather than through `matchesRange`. That branch's boundary behaviour under prerelease and off-form registry versions is a correctness reading the objective lane owns before the fix lands.

---

VERDICT: FAIL — 2 broken, 0 unresolved, 0 not-evidenced, 2 findings outside the claims