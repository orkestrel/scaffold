# Version-authority design — reconciliation, 2026-08-21

Lanes: planner (Opus, `design-versions-subjective-report.md`), analyst (Sol, executed
toolchain probes; `tmp/codex/design-versions-analyst-last.md`, captured beside this file).
The user's amendment 1 binds throughout: registry first, offline acceptable for generation,
the table as fallback floor with `audit` naming staleness and `repair`/`overwrite` closing it.

## Rulings

**Q1 mechanism — the analyst's JSON import wins on executed evidence.** The subjective lane
rejected it on three blockers it did not run (its own R1 admits this); the analyst ran them:
scoped `tsc` accepts the import under `types: []`, vitest resolves it, Vite 8.2.2 inlines it
into both bundles (~5 kB of already-public data), `vite-plugin-dts` and API Extractor emit
clean declarations, and the built entries return the version. `src/core/constants.ts`
imports `../../package.json` with `{ type: 'json' }`; the self-pin and every
scaffold-installed row derive from it. The subjective lane's `Blueprint.toolchain` field
loses: the analyst's carrier — a pure manifest-range replacement applied to the plan's
manifest artifact before materialization, with the plan hash recomputed, and
`Materializer.declare` routed through the same shared replacement — changes no public
compiler signature, adds no Blueprint field, and consolidates with the existing redeclare
machinery.

**Q2 instruments — retire the mirrors, adopt the analyst's set, keep one subjective
insight.** The self-pin and installed-row mirrors become tautologies under derivation and
retire. Replacements: the distribution-test coherence case (built core self-pin vs the
installed package's own manifest, controlled by mutating the installed copy without
rebuilding); the compiler projection case (emitted rows carry the derived values);
`TOOLCHAIN_RANGE_PATTERN`-class shape checks; the TypeScript bound restated on the emitted
range (names major 6, rejects `7.0.2`, keeps its stated reason). Kept from the subjective
lane: the seed population asserted BY NAME — the rows the manifest does not declare (the
Vue family, `vite-plugin-singlefile`, the uninstalled app-server fleet rows) are an
enumerated set, so a row silently entering or leaving scaffold's manifest moves a test.

**Q3 foreign form — bare `^MAJOR`, the analyst's catch adopted.** `^0.64.0` does not float
minors under major zero, so caret-triple fails the user's policy exactly where oxfmt-class
tools live; `^0` implements it. Scaffold's own manifest converts every foreign row to
`^MAJOR` (`typescript ^6`, `vite ^8`, `vitest ^4`, `oxfmt ^0`, `oxlint ^1`, `@types/node
^26`, `@microsoft/api-extractor ^7`, `vite-plugin-dts ^5`, `playwright ^1`, browser-runner
row alike); derived emission copies verbatim; no second normalizer at emission. Drift
checks compare the extracted major only, through a new tested range-to-major helper — never
`matchesRange`, which answers admission, a different question. `EXTRA_RANGE_PATTERN` keeps
admitting `~` for consumer-declared extras (subjective T6 upheld: mechanism, not policy).

**Q4 verbs — the analyst's table adopted verbatim** (it read the code: no `verify` verb
exists; `#lookup`/`#pin` are private; `audit`'s `#inspect` is synchronous today):
- `new` resolves every planned `@orkestrel` row across all three sections before
  materialization; offline → coded `FETCH`, exit 1, nothing written.
- `audit` looks up every declared fleet row; drift = declared ≠ `^latest` exactly; offline →
  failed release verdicts reported, exit 1, nothing written (subjective T2 satisfied: it
  reports, never crashes mid-report).
- `repair` resolves before any write and calls `declare` with the complete resolved set
  (subjective T1 ruled by the user's amendment: repair DOES fix ranges).
- `catalog` derives release verdicts from the packuments it already fetches and declares
  the resolved set with its write.
- `overwrite` requires a complete release set — never a partial pin set; a partial failure
  preserves offline work, sets `note`, exits 1 (fixes an existing partial-write hazard).
- Fleet comparison is exact (`^0.1.0` is stale when the registry serves `0.1.2`); the CLI
  JSON results gain `releases` evidence for `audit`, `repair`, and `catalog`.

**Q5 — convergent.** The brief's premise was wrong for `@orkestrel/contract` (installed,
`dependencies`) and `@orkestrel/html` (installed, `devDependencies`): both derive. The Vue
family and `vite-plugin-singlefile` become supported-major seeds (`^6`, `^3`, `^3`, `^2`);
uninstalled fleet rows stay release-time offline seeds every verb replaces or measures
against the registry.

**Q6 — merged blast radius.** The analyst's file list governs, plus the subjective lane's
distribution-census trap: the `vite-plugin-singlefile` TSDoc example verdict becomes prose
so the census row moves from `driven` to `glossed` and the total stays; sweep every
shared-table example the same way. Factual dispute settled by the Orchestrator's own read:
`guides/scaffold.md` IS a `HOST_PATHS` member (`src/core/constants.ts`), so the guide
update moves `dist/host` — already moving in 0.0.47, no new obligation. Digest and fixture
regenerate from the run that produces them.

**Tension rulings:** T1 yes per amendment; T2 report-not-crash; T3/T4 moot under the ruled
mechanism; T5 upheld (the `^6` range IS the bound); T6 upheld.

**Risks carried into briefs:** the abbreviated packument's `versions` completeness for a
package the size of typescript (fall back to `dist-tags.latest` clamped by the declared
major, an honest no-answer when it crosses); `MAX_COLLECTION_ITEMS` (select before
limiting, or the newest falls off); the async ripple through `CLI.test.ts` (report the
changed call-site count with the command); the self-referential emitted-vs-constant
assertions at `compilers.test.ts:113/:124/:141` and `CLI.test.ts:520` are replaced, never
kept.

## Units

| Unit | Engine | Owns |
| --- | --- | --- |
| V1 core authority | Sol | `package.json` (+lock), `src/core/constants.ts`, `src/core/helpers.ts`, `src/core/compilers.ts`, `src/core/types.ts` TSDoc |
| V2 verbs | Sol, after V1 | `src/server/Upstream.ts`, `src/server/Materializer.ts`, `src/server/types.ts`, `src/bin/CLI.ts`, `src/bin/types.ts`, `src/bin/helpers.ts` |
| V3 instruments and parity | Opus, after V2 | the test files in the analyst's list, fixtures, digest, distribution census, `guides/scaffold.md` |
| V4 gates | verifier | the full chain |

Serial in the scaffold checkout. V1 and V2 are Sol-written and prescription-bound; V3 is
Opus-written; the closing audit lane is the engine that did not write the half it rules on.

## Carried, found at integration (2026-08-21)

The bin suites' fixture registries seed foreign versions as literals, so the Orchestrator's
api-extractor floor raise redded 27 cases until the seeds were bumped. The literals are the
digest's class — regenerated at each release — but a derived seed (the fixture serving
exactly the source table's declared triple, caret stripped) would remove even that
regeneration. Carried to scaffold's next change; the raise procedure meanwhile includes the
bin fixture seeds beside the digest and manifest fixture.
