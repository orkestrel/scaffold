<!-- D4-O — analyst (GPT-6 Astra, codex exec read-only -C WebstormProjects), objective design lane; journal tmp/codex/D4-design.jsonl. Retained verbatim from --output-last-message, 2026-09-15. Immutable. -->

OBJECTIVE lane — analyst, GPT-6 Astra (`gpt-6-astra`).

## Constraints

References are relative to `C:/Users/mikes/WebstormProjects`. The decisions below specify implementation; they do not claim that the proposed gates have passed.

### 1. Hosting the guides

**Add a separate `REFERENCE_PATHS` staging list.** Put `guides` and the proposed `collisions.json` file there. Remove `guides/guide.md` and `guides/scaffold.md` from `HOST_PATHS`, and preserve their existing target presence claims explicitly in `blueprintToHostArtifacts`, with `selectHostPaths` still excluding the target’s own guide. Staging membership and target ownership are already separate concepts: the compiler explicitly claims the catalog agent although `CANON_PATHS` stages it. (`scaffold/src/core/constants.ts:133`, `scaffold/src/core/compilers.ts:1583`, `scaffold/src/core/compilers.ts:1602`, `scaffold/src/core/helpers.ts:458`.)

Make the staging lists disjoint by prefix. Extend the existing `stageHost` traversal, containment checks, storage-name collision refusal, byte verification, and manifest generation to include `REFERENCE_PATHS`. Publish the guides at `dist/host/guides/<bare>.md`; do not introduce another storage layout or a manually maintained guide filename list. (`scaffold/src/core/constants.ts:169`, `scaffold/src/server/helpers.ts:1515`, `scaffold/src/server/helpers.ts:1568`, `scaffold/src/server/helpers.ts:1621`.)

**Refuse `guides` in `CANON_PATHS`.** Canon membership also drives discovery of superseded target files. Putting the directory there would expose legitimate target guides to foreign-file reporting and `overwrite` deletion. **Refuse the whole directory in `HOST_PATHS`** because that changes target ownership unnecessarily, includes the target-authored index, and defeats the existing exact-file exclusion of the target’s own guide. (`scaffold/src/server/helpers.ts:864`, `scaffold/guides/scaffold.md:1319`, `scaffold/src/core/helpers.ts:458`.)

The guide completeness check must compare the catalog package names with actual guide filenames, excluding `README.md` from package membership. It must refuse missing guides and malformed ownership inputs before publishing the host. The catalog table is already staged through `.claude/agents`; its installed storage spelling is `claude/agents/orkestrel.md`. (`scaffold/src/core/constants.ts:192`, `scaffold/host.json:352`, `scaffold/guides/README.md:33`.)

**`supervisor` blocks complete hosting until its owner supplies a guide.** Author and validate `supervisor/guides/supervisor.md`, then refresh scaffold’s mirror from those canonical bytes. Do not omit the catalog row or create an empty placeholder: supervisor declares core and server barrels. Its published catalog version and checkout version also require reconciliation before selecting the guide snapshot. (`scaffold/.claude/agents/orkestrel.md:86`, `supervisor/package.json:3`, `supervisor/src/core/index.ts:1`, `supervisor/src/server/index.ts:1`.)

Use these read paths:

| Caller | Authoritative guide location |
|---|---|
| Target policy gate | Its installed `@orkestrel/scaffold/dist/host/guides/`, verified against that host’s manifest |
| Scaffold checkout policy gate | Its own `guides/`, regardless of whether a built host exists |
| Installed scaffold CLI | Its resolved package host, or the explicitly selected `--from` root |

Determine the checkout branch from the exact package identity and checkout structure, not the directory basename. Never substitute a target’s local guide mirrors, sibling repositories, or network reads when the installed policy host is missing. The existing host reader distinguishes checkout destinations from installed storage paths and verifies declared file digests. (`scaffold/src/server/helpers.ts:1211`.)

**Give `catalog` an actual hosted-guide fallback.** On a guide fetch failure or guide `404`, use the verified hosted bytes while preserving the observed target bytes as the write precondition. Report the hosted baseline and the original failure; a forced fallback returns exit `1`. When neither upstream nor the host supplies a guide, preserve any existing mirror and report the unresolved path. `Materializer.mirror` already supports exact observed-byte preconditions and skips results without content. (`scaffold/src/server/Upstream.ts:429`, `scaffold/src/server/Materializer.ts:339`.)

A guide fallback alone is insufficient: `CLI.#fetch` calls `upstream.catalog()` before fetching guides, and organization discovery can throw. On registry unavailability, perform a **guide-only partial catalog operation**: use declared package names by default and the hosted catalog membership for `--all`; exclude the target’s own package; preserve its catalog table and dependency ranges. Extend the command result to carry a partial-operation `note` and omit unperformed membership/version results. Do not publish an empty catalog or claim live version evidence. (`scaffold/src/bin/CLI.ts:790`, `scaffold/src/server/Upstream.ts:299`, `scaffold/src/bin/types.ts:293`.)

**Report mirror differences without inventing chronology.** During `audit`, compare present foreign mirrors with hosted bytes and emit a non-blocking `Question` identifying the path, the hosted baseline, and `catalog` as the refresh action. Say “differs from the hosted guide,” not “older”: byte inequality does not establish which copy is newer. Keep these questions outside the repair findings so `repair` does not acquire ownership of existing mirror contents. (`scaffold/src/core/types.ts:327`, `scaffold/src/core/types.ts:461`, `scaffold/src/core/types.ts:525`, `scaffold/src/bin/helpers.ts:299`.)

### 2. The rule

**Name the `PolicyRule` member `collision`.** Implement `inspectPolicyCollisions(root)` in the vendored `tests/setupPolicy.ts` file and append it to `inspectPolicyWorkspace`. Keep the live assertion against an empty violation array. (`scaffold/tests/setupPolicy.ts:16`, `scaffold/tests/setupPolicy.ts:1574`, `scaffold/tests/policy.test.ts:470`.)

Retain the existing violation shape. A planted helper must produce a diagnostic of this form, with the actual declaration line:

```ts
{
	rule: 'collision',
	path: 'tests/setupBrowser.ts',
	line: declarationLine,
	message:
		'waitForCondition conflicts with @orkestrel/test in guides/test.md; import the owning primitive or rename the distinct concept.',
}
```

Normalize paths and sort diagnostics by path, line, name, and competing package. Deduplicate repeated barrel routes to the same declaration. The existing constructor already supports the required shape and optional line. (`scaffold/tests/setupPolicy.ts:277`, `scaffold/tests/setupPolicy.ts:312`.)

**Subject population:**

- Every export reachable through the target’s `src/**` barrels.
- Every export from its own root `tests/setup*.ts` modules, excluding `*.test.ts`.
- Exclude setup modules selected by the installed vendored path set, rather than excluding all setup files or relying on byte equality.
- Exclude `app/**`, ordinary test modules, guide examples, and dependencies as subject declarations.

The existing setup-module glob is broader than the requested root population, and `tests/setupPolicy.ts` itself belongs to `HOST_PATHS`; neither can be reused without the stated boundary. (`scaffold/tests/setupPolicy.ts:145`, `scaffold/src/core/constants.ts:137`.)

**Use `createSource({ files, module }).surface()` for conventional barrels, with a TypeScript completeness and origin check.** Gather the file inventory explicitly; `Source` performs no filesystem discovery. Use the installed compiler to enumerate barrel and setup-module exports, locate declarations, and follow export aliases. Compare that reading with the guide projector and inspect any additional compiler-resolved names. Missing targets, unresolved origins, and unsupported reflection must produce a violation rather than disappear as an empty population. This reuses the existing compiler; it does not introduce another source parser. (`guide/src/core/sources/Source.ts:26`, `guide/src/core/types.ts:448`, `scaffold/node_modules/typescript/lib/typescript.d.ts:6279`, `scaffold/node_modules/typescript/lib/typescript.d.ts:6282`, `scaffold/AGENTS.md:34`.)

Do not replace barrel reachability with `extractExports` over every source file: that would also judge intentionally unbarrelled declarations. Use direct extraction for the setup population and as supporting evidence for the compiler-origin reading. (`guide/src/core/sources/Source.ts:95`, `guide/src/core/sources/Source.ts:177`, `scaffold/.claude/rules/architecture.md:271`.)

**Comparison population:** every other hosted package guide’s `## Surface` table column-0 names. Match the bare exported name, case-sensitively. Ignore environment headings and declaration kind when deciding a collision.

`Guide.surface()` is useful as a cross-check, but it is not exactly that population: it admits standalone H3 class headings and drops rows with an unrecognized `Kind`. Add `readGuideCatalog` in scaffold’s server helpers to read and validate the hosted guide set and project table-column names through scaffold’s already-declared Markdown parser. Keep its public return types in `src/server/types.ts`. This helper supplies filesystem validation and the specifically required table-only, kind-independent contract; do not write another Markdown parser. (`guide/src/core/helpers.ts:1422`, `guide/src/core/helpers.ts:1517`, `scaffold/package.json:99`, `scaffold/.claude/rules/architecture.md:16`.)

**Re-export ruling:** an unchanged-name forwarding export is not an independent declaration. Exempt a comparison only when compiler resolution proves that the export refers to the declaration owned by the compared package. Follow alias chains; do not infer identity from equivalent signatures, an import elsewhere in the file, or an `extends` clause. A local type alias declaration remains a local declaration.

The reverse direction needs a publication invariant: a hosted guide must not claim ownership of dependency-forwarded symbols. The release census must reject such guide rows until the owner removes the forwarding export and updates its consumers and guide. That avoids inventing provenance from a Surface row that carries none. Existing architecture already prohibits dependency re-exports, and guide parity compares direct declarations, barrel exports, and documented exports. (`guide/src/core/types.ts:16`, `guide/src/core/Parity.ts:219`, `scaffold/.claude/rules/architecture.md:254`.)

Vendored imports may use `node:` modules, existing vendored siblings, and packages in `BASE_DEV_DEPENDENCIES`, including `@orkestrel/guide`, `@orkestrel/scaffold/server`, and `typescript`. They must not directly import `@orkestrel/markdown` or `@orkestrel/contract`. Scaffold’s published server implementation can use its declared runtime Markdown dependency. (`scaffold/.claude/rules/workspace.md:77`, `scaffold/src/core/constants.ts:511`, `scaffold/package.json:95`.)

### 3. Phase-in

**Adopt a hosted ratchet in `scaffold/collisions.json`, shipped as `dist/host/collisions.json`.**

Each accepted entry must identify:

- The bare name.
- The exact participating package pair.
- The existing source declaration path in each package.
- A concrete resolution reason and owning follow-up unit.

Match exact source occurrences. Never accept a name globally or admit another participating package automatically. **No setup-module occurrence receives an allowance.** Consequently, a reintroduced `waitForCondition` fails immediately even while unrelated source collisions remain accepted. The triggering duplication is specifically recorded in MCP’s setup module. (`scaffold/.orkestrel/campaign/G6-reuse-sweep-distillate.md:7`.)

Generate proposed entries from the complete guide comparison and verified source declarations. The Orchestrator approves the initial boundary; implementation units may remove entries after their fixes land. Targets have no editing authority over this file.

Recompute active collisions on every gate run. At each scaffold release, prune entries whose source occurrences or guide comparisons have disappeared, and verify that the accepted set has not expanded against the preceding published ratchet. Do not regenerate an unrestricted allowlist from the current collisions. The source of live facts remains the scanner; the JSON file records temporary decisions only. (`scaffold/.agents/orchestration.md:487`.)

Do not seed the file from P6 without verification. P6 groups names, not independent declarations or source occurrences, and omits supervisor’s undocumented surface. (`scaffold/.orkestrel/campaign/P6-surface-collisions.txt:1`, `scaffold/.claude/agents/orkestrel.md:86`.)

The scaffold phase can close with this transitional gate deployed. **Fleet uniqueness closes only after the later resolution units leave the ratchet empty.** Do not describe the transitional release as collision-free.

### 4. Resolving a collision

**Choose ownership by semantics and dependency direction.** Reuse an existing owning primitive when its contract matches. When contracts differ, rename the narrower or domain-specific declaration. Do not award ownership by alphabetical order, source-file order, or whichever implementation was added first. Existing reuse law requires proving semantic differences before retaining local variants. (`scaffold/.claude/rules/patterns.md:12`, `scaffold/.claude/rules/quality.md:99`.)

Apply that rule as follows:

| Collision | Proposed resolution |
|---|---|
| `createChannel` | Keep agent’s async channel name. Rename test’s console-forwarding factory to `createConsoleChannel`, after checking the proposed name against the full host. Their implementations construct different things. (`agent/src/core/factories.ts:600`, `test/src/browser/factories.ts:172`.) |
| `isRecord` | Keep contract’s plain-record guard. Rename msg’s broader non-null, non-array predicate to a name expressing that contract, such as `isNonArrayObject`; do not substitute contract’s guard without proving the behavioral change acceptable. (`contract/src/core/validators.ts:620`, `msg/src/core/validators.ts:10`.) |
| Contract/test outcomes and `JSONValue` | Treat them as independent declarations. Preserve contract ownership of the general names; either adopt contract directly when the dependency change is authorized and semantics match, or qualify test’s declarations. `Result` also has a different default error type. (`test/src/core/types.ts:54`, `test/src/core/types.ts:66`, `test/src/core/types.ts:78`, `test/src/core/types.ts:198`.) |
| LSP/MCP JSON-RPC families | Qualify package-owned protocol contracts in the resolution units. Do not extract a shared package from name equality alone. An extraction requires equivalence proofs and an explicitly owned dependency change; identical wire spelling does not establish identical validation and lifecycle contracts. (`lsp/src/core/types.ts:10`, `mcp/src/core/types.ts:30`, `scaffold/.claude/rules/patterns.md:18`.) |
| HTML/Markdown walkers, parsers, and renderers | Qualify the operations by their input domain. The source contracts consume different node/document types. Keep existing cross-package projections; do not create a shared tree engine merely to remove names. (`html/src/core/helpers.ts:1290`, `markdown/src/core/helpers.ts:2784`, `html/src/core/parsers.ts:43`, `markdown/src/core/parsers.ts:209`.) |
| Database/table row operations | Qualify the UI-table operations and types where their contracts differ from database rows. Extract or reuse only an operation whose equivalence has been demonstrated. (`database/src/core/helpers.ts:451`, `table/src/core/helpers.ts:279`, `database/src/core/types.ts:762`, `table/src/core/types.ts:846`.) |

Every rename unit owns consumer imports, barrels, examples, tests, canonical guide changes, mirror refreshes, and ratchet removal. Keep no compatibility re-export. Permanent acceptance solely because declarations share a domain is refused. (`scaffold/.claude/rules/architecture.md:280`, `scaffold/.agents/skills/orkestrel-align-packages/references/integration.md:25`.)

## Refusals

The implementation must reject these shortcuts:

- **A per-target allowlist:** it fragments fleet policy and gives the target a way to exempt the defect being checked. Vendored policy changes belong in scaffold and propagate through `repair`. (`scaffold/.agents/orchestration.md:877`.)
- **Immediate fleet-wide fail-closed rollout:** it would make accepted source collisions block target adoption and turn the scaffold release into a prerequisite for completing the entire rename campaign. Use the hosted ratchet; retain immediate failure for setup duplication and unaccepted source collisions. The existing collision population includes scaffold itself. (`scaffold/.orkestrel/campaign/P6-surface-collisions.txt:8`, `scaffold/.orkestrel/campaign/P6-surface-collisions.txt:65`.)
- **Silent missing-guide or failed-parser exclusions:** the hosted set is a required comparison population, not optional evidence. (`scaffold/tmp/codex/D4-design-brief.md:29`.)
- **Environment-qualified identities:** they would miss the user’s expressly named agent/test `createChannel` conflict. (`scaffold/tmp/codex/D4-design-brief.md:51`.)
- **Import-only checks or signature comparison:** neither proves that an export forwards the compared declaration. Surface records contain no ownership provenance. (`guide/src/core/types.ts:16`.)
- **A green result obtained by deleting the failing export, suppressing the sweep, or editing a target’s vendored policy:** these violate the coding and propagation laws. (`scaffold/AGENTS.md:47`, `scaffold/.claude/rules/workspace.md:260`, `scaffold/.agents/orchestration.md:887`.)

## Measurements

The read-only Node probes ran on **2026-09-15**, using the installed `@orkestrel/guide` **0.0.18** and TypeScript compiler. These are extraction and source-review measurements, not implementation gate results. (`scaffold/node_modules/@orkestrel/guide/package.json:3`, `scaffold/src/core/constants.ts:519`.)

| Measurement | Result and coverage |
|---|---|
| Guide projection | Across the package guides, `Guide.surface()` returned **5,031** deduplicated name/kind entries and **113** names shared between guides. The independent Markdown-table projection returned **5,036** recognized rows; repeated entries occurred in MCP and middleware. The brief’s **5,033** figure is therefore not an acceptance constant. (`scaffold/tmp/codex/D4-design-brief.md:69`, `guide/src/core/helpers.ts:1521`.) |
| Barrel census | The TypeScript syntax census inspected **71** `src/**/index.ts` files in the sibling checkouts named by the available guides. Their statements used conventional relative `.js` star exports. It excluded supervisor because supervisor had no guide, and it did not prove complete declaration reflection or future syntax coverage. (`guide/src/core/sources/Source.ts:206`, `scaffold/.claude/agents/orkestrel.md:86`.) |
| Enumerator control | An in-memory star barrel returned `waitForCondition`; replacing its row with a named re-export returned no symbols. Direct `extractExports` still found the declaration. This confirms why an empty projector result cannot certify absence. (`guide/src/core/sources/Source.ts:207`, `guide/src/core/types.ts:466`.) |
| Forwarding exports | The same guide-named checkout population contained no `ExportDeclaration` statements in non-barrel `src/**/*.ts` modules. The named test outcome types are visibly local declarations, not re-exports. (`test/src/core/index.ts:1`, `test/src/core/types.ts:54`, `test/src/core/types.ts:198`.) |
| Import floor correction | `BASE_DEV_DEPENDENCIES` contains test, guide, scaffold, and TypeScript; it does **not** contain contract. Contract is a scaffold runtime dependency. The brief’s assertion that contract belongs to the base development set is incorrect. (`scaffold/src/core/constants.ts:511`, `scaffold/package.json:97`, `scaffold/tmp/codex/D4-design-brief.md:115`.) |
| Host correction | The filesystem read found `scaffold/dist/host/manifest.json`, contrary to the brief’s absent-host measurement. Its presence does not change the required checkout read path. The existing reader explicitly distinguishes source destinations from staged storage. (`scaffold/tmp/codex/D4-design-brief.md:116`, `scaffold/src/server/helpers.ts:1211`.) |

## Units

### 5. Units and order

Use the following units. Role names follow the Claude campaign vocabulary; Astra occupies the objective Sol seat. Run writers serially within scaffold. Independent audits and gate evidence remain separate from implementation acceptance. (`scaffold/.agents/orchestration.md:152`, `scaffold/.agents/orchestration.md:208`, `scaffold/.agents/orchestration.md:345`.)

| Unit | Role | Engine | Owned files | Acceptance criteria | Dependencies |
|---|---|---|---|---|---|
| D4.1 — Close guide membership and ownership | `implementer`; `checker` | Opus 5; Cursor Grok | `supervisor/guides/supervisor.md`, supervisor’s `tests/guides.test.ts`; subsequently scaffold’s fetched `guides/supervisor.md` and catalog region | Supervisor guide matches the selected owner revision; its Surface has real parity; catalog membership has a guide for every package; foreign-forwarded symbols receive no ownership row | Version/revision reconciliation |
| D4.2 — Stage references and expose the guide reader | `sol` | GPT-6 Astra | Scaffold `src/core/constants.ts`, `src/core/compilers.ts`, `src/server/types.ts`, `src/server/helpers.ts`; mirrored compiler/helper tests | Reference roots are disjoint; every guide stages byte-identically with valid digests; ordinary targets receive only planned guide copies; own guide/index survive; table projection excludes headings and examples and ignores Kind for name identity | D4.1 |
| D4.3 — Implement collision sweep and ratchet | `sol` | GPT-6 Astra | Scaffold `tests/setupPolicy.ts`, `tests/policy.test.ts`, `collisions.json`; serial addition to `src/core/constants.ts`; scaffold-only `tests/setupPolicy.test.ts`; import-law controls in `tests/src/server/helpers.test.ts` | Exact violations for barrel and setup collisions; controls without collisions pass; unrelated package/environment matches fail; forwarding identity is proved; malformed/missing inputs fail; allowances match exact existing source occurrences; setup allowances are refused | D4.2 |
| D4.4 — Complete catalog fallback and audit reporting | `sol` | GPT-6 Astra | Scaffold `src/server/Upstream.ts`, `src/server/Materializer.ts`, `src/bin/CLI.ts`, relevant `src/bin/types.ts`/`helpers.ts` and guards; mirrored Upstream, Materializer, CLI, and helper tests; `tests/setupServer.ts` | Guide failure and `404` use hosted bytes; registry failure still permits guide-only fallback; table/ranges remain intact on partial operation; observed-byte conflicts refuse writes; audit reports differences without repair overwriting present mirrors | D4.2 |
| D4.5 — State the contract and regenerate inventory | `implementer`, then `builder` | Opus 5, then Sonnet | Scaffold `guides/scaffold.md`, `guides/README.md`, `tests/guides.test.ts`, relevant architecture/tests/documentation rule paragraphs; generated `host.json` | Documentation states populations, fallback results, ratchet ownership, and phase boundary; public helper parity closes; inventory reflects final bytes, including the supplied Condition and brief-template edits | D4.3, D4.4 |
| D4.6 — Audit and prove the artifact | `analyst`, `reviewer`, `checker`, `verifier` | Astra, Opus 5, Cursor Grok, Sonnet | Read-only audits; scaffold distribution proof additions owned by a preceding writer in `tests/distribution.test.ts` and its setup | An installed packed scaffold supplies every guide offline; a repaired fixture target fails on a planted collision and passes without it; deleting one hosted guide fails; stale target mirrors cannot change policy results; import floor and authoritative gates pass | D4.5 |
| D4.7 — Release and propagate | Orchestrator; `builder`; `verifier` | Campaign Orchestrator; Sonnet; Sonnet | Scaffold release manifest/lockfile and generated inventory; every target’s scaffold pin/lockfile and repaired vendored files; refreshed mirrors where needed | Publish scaffold; every target re-pins, runs `repair`, and passes gates against the installed release; no target-local policy patches; material published changes receive their own bumps | D4.6 and release authorization |
| D4.8 — Resolve accepted collisions | `sol` or `implementer`, with independent audits | Astra or Opus 5 | Per-pair owning source/types/barrels, consumers, tests, canonical guides; scaffold mirrors and ratchet removals at subsequent releases | Named ownership decision implemented without aliases; consumer contracts pass; originating guides refresh; resolved allowance disappears | D4.7; dependency order for each resolution |

D4.3 must include physical controls for named exports, multiline declarations, arrow-function exports, type exports, alias chains, unresolved modules, repeated barrel routes, vendored setup exclusion, package self-exclusion, an added participant in an accepted collision, and an accepted source name planted in a setup module. Existing physical controls run through the production workspace route; extend their fixtures so the required host is present rather than weakening host validation for tests. (`scaffold/tests/setupPolicy.ts:1594`, `scaffold/tests/policy.test.ts:479`.)

D4.6 must test the installed tarball, not a link to scaffold’s checkout. Run the artifact/process proofs on a host capable of executing them, then run the authoritative gate chain and release distribution project. (`scaffold/.agents/orchestration.md:810`, `scaffold/package.json:93`.)

Sequence hosting before activation of the sweep, then audit and release scaffold before the remaining campaign publish wave. Complete the G6 setup-helper cleanup before requiring affected targets to pass the new gate. Re-pin every target, but bump a target only when its own published artifact moves. This refines the campaign’s U11/U12 work while retaining its scaffold-first release ruling. (`scaffold/.orkestrel/campaign/plan.md:82`, `scaffold/.orkestrel/campaign/plan.md:83`, `scaffold/.agents/orchestration.md:874`.)

### 6. Exit criterion

The scaffold phase ends when these capabilities close:

1. **Complete hosted references:** catalog membership and package guides agree, including supervisor; packed host contents and manifest digests verify.
2. **Offline collision enforcement:** every target uses its installed host; scaffold uses its checkout guides; missing inputs fail.
3. **Complete subject accounting:** barrel and owned setup exports are enumerated; unresolved reflection cannot report clean; declaration origins distinguish forwarding from independent declarations.
4. **Bounded phase-in:** only approved existing source occurrences are admitted; setup duplication and unaccepted collisions fail; ratchet expansion and obsolete entries are rejected.
5. **Usable catalog fallback:** guide and registry outages still permit the specified hosted mirror service, with honest partial results and preserved version/catalog state.
6. **Correct ownership reporting:** audit exposes mirror differences; repair preserves present catalog-owned mirror contents and the target’s own guide.
7. **Published adoption:** scaffold is released, targets re-pin and repair, artifact controls and target gates pass, and documentation matches the shipped behavior.

The later collision-resolution phase ends when no accepted independent collision remains.

## Tensions

- **A separate staging list adds vocabulary but preserves ownership.** Reusing `CANON_PATHS` would also reuse its deletion semantics; that is the decisive cost. (`scaffold/src/server/helpers.ts:864`.)
- **The ratchet delays absolute uniqueness.** It permits the scaffold gate to deploy before every source rename, while keeping the triggering setup defect unconditionally red. Its exact source-path boundary also makes moving an accepted declaration a decision-bearing change.
- **Compiler assistance costs execution time.** The conventional-barrel census supports using `Source.surface()`, but the executed named-export control disproves using that projector as the sole completeness instrument. (`guide/src/core/types.ts:466`.)
- **Guide names need a narrower projection than guide parity.** The required identity ignores Kind and excludes heading-only declarations; the existing `Guide.surface()` contract does neither. (`guide/src/core/types.ts:349`.)
- **Registry outage fallback changes the catalog contract.** The guide expressly says organization membership failure refuses the operation. The implementation must document and test the proposed partial guide service instead of concealing that change. (`scaffold/guides/scaffold.md:488`.)
- **Re-export exclusion depends on an ownership invariant at publication.** A Surface row alone cannot prove declaration provenance. Keep the existing prohibition on foreign re-exports and validate ownership before hosting guides. (`guide/src/core/types.ts:16`, `scaffold/.claude/rules/architecture.md:263`.)

## Risks

- **Snapshot lag:** an installed host knows the guide set shipped with its scaffold release. Later package exports require a refreshed scaffold host and propagation; target network access cannot silently repair this limitation. (`scaffold/src/server/types.ts:101`.)
- **Incomplete guide population:** supervisor can introduce collisions absent from P6. Seed the ratchet only after completing its guide. (`scaffold/.claude/agents/orkestrel.md:86`.)
- **False confidence from hashes:** a self-consistent smaller manifest does not prove complete membership. Keep the independent catalog-to-guide membership check. (`scaffold/src/server/types.ts:74`.)
- **Ratchet persistence within a release:** removing and reintroducing an allowed occurrence before the next ratchet reduction remains indistinguishable from retaining it. Resolution units must retire allowances promptly.
- **Stale generated state:** source policy reads must not depend on an old `dist/host`; release verification must run against quiescent final bytes. (`scaffold/src/server/helpers.ts:1200`, `scaffold/guides/scaffold.md:1308`.)
- **Implementation remains unproved:** the probes establish extraction boundaries and source facts. The units still owe executed collision, fallback, packaging, and propagation proofs under the [package-alignment skill](C:/Users/mikes/WebstormProjects/scaffold/.agents/skills/orkestrel-align-packages/SKILL.md:41).