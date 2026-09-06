# docs-parity design — objective lane (Workflow wf_e45a4f92-edf, agent a0b276a2fec64bcd4)

# Objective lane — design round, guide/TSDoc parity

Lane held: **objective** (`reviewer`, Claude Opus 5, recorded substitution for the dark Sol bench). Evidence is source reading only. I ran no command, so every reading marked as needing a run stays open.

## Decision 1 — the normalized form

**Forbidden: "the TSDoc first sentence" as the compared unit.** `guides/scaffold.md:438` carries "Tear the compiler down. Every later call throws, and teardown is idempotent." against `src/core/types.ts:615` "Tears the compiler down. Every later call throws, and teardown is idempotent." The guide cell holds the doc block's whole description paragraph. A first-sentence projection deletes the second sentence, which is correct today and is the only statement of the idempotence contract in the guide. Name the compared unit as **the description paragraph up to the first block tag**, or accept a documented deletion and say where the deleted sentence goes.

**Forbidden: the Returns column against `@returns`.** The fleet's Returns cells carry the return **type** — `/home/user/fleet/guide/guides/guide.md:202-207` (`readonly SurfaceSymbol[]`, `readonly MethodGroup[]`), database's `Promise<Row \| undefined>` per the distillate — while `@returns` carries a description: `/home/user/fleet/guide/src/core/types.ts:101` "The document's `##` heading names, in document order", and `/home/user/scaffold/src/core/types.ts:617` `@returns Nothing.` against a `void` signature. Compare the Returns column against the declaration's return type, or place it outside the comparison. Never against `@returns`.

**Forbidden: byte equality across Markdown markup without a stated transform.** Guide cells carry emphasis and links that no TSDoc sentence carries: `/home/user/fleet/guide/guides/guide.md:213` `**declares**`, `:214` `**import**`, `:217` `**lacking**`, and `:42-44` `[`## Methods`](#methods)`. Under equality those are deleted, and deleting the `:42-44` links removes rows the LI check resolves today (`/home/user/fleet/guide/guides/guide.md:390-393`).

**Forbidden: `{@link X}` → `` `X` `` as the whole transform.** The corpus carries dotted member targets — `/home/user/fleet/guide/src/core/helpers.ts:31-34` `{@link SourceLine.code}`, `/home/user/scaffold/src/core/types.ts:305` `{@link Finding.observed}`, `src/core/compilers.ts:1791` `{@link ManifestScript.accepted}`, `src/server/Upstream.ts:97` `{@link Upstream.destroy}` — and an inflected form, `src/core/factories.ts:31` `{@link Question}s`, which `.claude/rules/writing.md` § Code tokens already forbids. Rule the dotted target's rendered form, and refuse the inflected form at the source rather than deriving it into the guide.

**Outside the comparison, and say so explicitly:** `@param` (no fleet table carries a partner column in anything I read), `@remarks` (free prose against per-member tables such as `guides/scaffold.md:961-965` is a transformation no equality can check), and the H1 tagline — `Guide` extracts only level-2 headings (`/home/user/fleet/guide/src/core/Guide.ts:41-44`), so nothing today can read the tagline at all.

**Collision with the ruling.** The ruling says "if one moves, so should the other", and `.claude/rules/documentation.md:35` currently fixes a Surface-row description as a noun phrase while `.claude/rules/typescript.md:78-79` fixes the doc block as third person with an `-s` verb. The amendment closes that, and its cost is the editorial pass named under Risks — no plan I have read prices it.

## Decision 2 — the guide structure that carries it

**Permitted today: the name and the Kind column only.** `extractSurface` takes column 0's first code span (`/home/user/fleet/guide/src/core/helpers.ts:1261-1263`) and locates Kind by exact case-sensitive header text (`findKindIndex`, `:953-964`). `extractMethods` takes column 0 of the table following an H4 code span (`:1315-1331`). There is no summary-column locator anywhere in the package.

**Forbidden: reading a summary cell by header name across the fleet as written.** The header varies by kind and by package — `Summary` (`/home/user/scaffold/guides/scaffold.md:76`, `:419`, `:434`), `Shape` (`/home/user/fleet/guide/guides/guide.md:32`), `Behavior` (`:56`, `:200`), and `Signature` **plus** `Behavior` for Helpers (`:72`), which also varies the column arity. Either converge the header per kind, or locate the cell by position, and state which.

**The `Shape` column is not a sentence at all.** `/home/user/fleet/guide/guides/guide.md:35` reads `` `{ name, keyword }` — one documented / exported symbol. `` against `/home/user/fleet/guide/src/core/types.ts:12-14` "Represents one documented / exported symbol — its identifier plus its declaration keyword." Equality here either deletes the shape literal a reader uses, or rules the Shape column outside the comparison. Both are choices; neither is free.

**Collision the ruling cannot resolve inside scaffold.** `guides/guide.md` is a fetched mirror in this repository (`src/core/constants.ts:151`; `guides/README.md:33-37`), and `.claude/rules/documentation.md` § Parity requires refreshing a mirror rather than rewriting it. Any header convergence in the guide package's own guide lands in `/home/user/fleet/guide` and arrives here by fetch. Scaffold must not edit its copy.

**Markers are not needed for an equality gate, and they cost a second structure.** Under equality the table's own rows are the region. A marker set adds region containment and marker integrity as new obligations in each package's `tests/guides.test.ts`, which is package-owned: it is absent from `HOST_PATHS` (`src/core/constants.ts:132-153`), so every package hand-edits.

**Example pairing has no key today.** `EX` is presence-only by specification (`/home/user/fleet/guide/guides/guide.md:403-410`): a bare name in a fence body of the example language, **or** an `@example` tag. `extractFences` returns language and verbatim body and nothing else (`/home/user/fleet/guide/src/core/helpers.ts:1551-1557`), so no fence carries a symbol key, a title, or a position. Pairing a fence to an `@example` is a new field on `GuideFence`, not a configuration.

**The concrete pair the ruling must settle.** `src/core/factories.ts:36-42` and `guides/scaffold.md:762-773` are different programs, and the guide fence is the one the suite executes (`tests/guides.test.ts:212-221`). Making the guide fence equal the `@example` deletes the `dependencies` and `bin` fields the narrative at `guides/scaffold.md:775-784` describes in prose. Making the `@example` equal the guide fence moves what the executed transcription reads. Name the direction and name the transcription's owner afterwards.

## Decision 3 — the readers on each side

**Permitted: extending the existing scan.** `SourceLine.jsdoc` retains every genuine JSDoc span at its physical column (`/home/user/fleet/guide/src/core/types.ts:37-44`), and `extractExampleLines` already walks the leading chain with last-span authority and severance on intervening source (`helpers.ts:1398-1474`). A description reader is a sibling of that walk and keeps `Source` text-only (`sources/Source.ts:24-28`).

**Forbidden: a control written against `Program`.** `@oxc-project/types` `Program` carries no `comments` member; comments sit on `ParseResult.comments` (rolldown `binding-Og__jmUi.d.mts:261-266`, `:280-284`). `readStatements` reads `parsed.program.body` and ignores comments (`tests/setupServer.ts:888-889`), so the control is new code, not a call already present.

**Permitted at no dependency cost, in the test tier.** `tests/guides.test.ts:32` already imports from `vite`, and `tests/setupServer.ts:18` imports `parseSync`. Neither file is vendored (`src/core/constants.ts:132-153`), so a control placed there stays local to the checkout that runs it.

**Interface risk the plan must state.** `computeSymbolKey` is `${keyword} ${name}` (`helpers.ts:1000`), so adding a field to `SurfaceSymbol` does not move the bijection key — but `surfaceSymbolShape` (`shapers.ts:22`) and `isSurfaceSymbol` (`validators.ts:40`) govern the shape, and a **required** new field breaks every hand-built `SurfaceSymbol` in every consumer's suite. That is the non-additive case C7 names (`PROPOSAL.md:325-331`). Make the field optional, or carry the summary on a separate row type.

**A silent hole in the guide reader.** `extractSurface` skips a row whose Kind text is not an export keyword (`helpers.ts:1271`) and a row with no code-span name (`:1264`). Such a row is invisible to the equality gate, so a documented symbol can disagree with its TSDoc and never be compared. Name the behavior for a skipped row before the gate is written.

## Decision 4 — the projection and the equality gate

**The decisive unmeasured constraint: `renderMarkdown` and the committed bytes are not the same table.** `renderMarkdown` documents its canonical table form as "GFM tables (1-space-padded cells, `\|`-escaped pipes, an alignment delimiter row)" (`/home/user/fleet/markdown/src/core/helpers.ts:1719-1720`), while every committed guide table is column-aligned (`/home/user/scaffold/guides/scaffold.md:76-89`; `/home/user/fleet/guide/guides/guide.md:32-49`). If that doc block is true, a render-and-compare gate reds on padding before it reads a single summary. A prose claim is not proof (`.claude/rules/documentation.md` § Parity), so this is the cheapest probe in the plan and it must run before the gate's form is fixed. Design the comparison over a shared canonicalization, or write then format then check.

**`renderMarkdown` also escapes.** It backslash-escapes text that would re-parse as markup (`helpers.ts:1721-1723`), and committed cells already carry `\|` inside code spans. State which side of the comparison is escaped.

**Per-row, not per-table.** The symmetry invariant in the brief requires the gate to name both sites. A whole-table byte comparison reports one difference for a whole table and cannot name the row. Key the comparison on column 0's identifier, report a row present on one side only as its own finding naming the side that has it, and report a symbol with no row and a row with no symbol as separate findings — the existing SB halves already cover symbol identity (`tests/guides.test.ts:99-117`), so the new gate owns sentence disagreement alone.

**The propagation tool must not run inside the gate**, and not only by ruling: `tests/guides.test.ts` runs under the `guides` Vitest project (`.claude/rules/workspace.md` § Test project matrix), and a proof that rewrites source is a mutating gate. The `docs` script is the only writer.

**Publishing, as the edges permit it.** `render` moves `@orkestrel/guide`'s published surface, so it bumps from `0.0.17` (`/home/user/fleet/guide/package.json:3`) and publishes. Every consumer holds it on a development pin, and a caret pins one exact release in this fleet (`.agents/orchestration.md` § What a bump obliges), so each consumer re-pins, proves its gates, and starts no cascade.

## Decision 5 — the voice gate

**Forbidden as drafted: a rule reading comments through today's vendored context.** `configs/policy.ts:49-54` declares `PolicyContext` as `filename`, `cwd`, and `report`. No `sourceCode`, no comment getter. Widening it is a vendored-byte change, so it costs a `@orkestrel/scaffold` bump, a per-target re-pin and `repair`, and each target's own prose repair.

**Forbidden: importing oxlint's typings into that file.** `.claude/rules/workspace.md` § Configuration authority requires `configs/policy.ts` to import nothing at all. The comment shape is therefore re-declared structurally in the vendored file with no compile-time link to oxlint's runtime shape, and the negative control is the only evidence the declaration matches. Say that in the brief so the unit does not reach for the `oxlint` specifier.

**Unresolved: whether a diagnostic can target a comment.** `PolicyDiagnostic.node` is a `PolicyExpression` (`configs/policy.ts:42-46`), and `PROPOSAL.md:1166-1168` records that nothing shows a comment as a diagnostic target. Both proposed rules depend on it. Probe before the unit.

**Version skew across checkouts breaks a single measurement.** Scaffold's readings are oxlint `1.80.0` and oxfmt `0.65.0` (`PROPOSAL.md:253-254`), while `/home/user/fleet/guide/package.json:84-85` declares oxfmt `^0.66.0` and oxlint `^1.81.0`. A `jsdoc` rewrite diff or a reporting probe taken in scaffold does not bind in guide. Take each per checkout, or pin before measuring.

**One denylist, one home.** `.claude/rules/documentation.md` § Authority forbids a competing instruction copy, and `.claude/rules/workspace.md` § Policy instruments puts text-shaped rules in the sweep. One frozen constant in the vendored `tests/setupPolicy.ts`, read by the doc-block rule and the Markdown sweep, with the currency check against `.claude/rules/writing.md` § Substitutions, is the only shape that does not drift.

## Decision 6 — `src/bin` and the README

**`src/bin` is outside the bijection by the manifest's own statement** (`guides/README.md:16-17`), and `Source.surface()` reads conventional root `index.ts` barrels only (`/home/user/fleet/guide/src/core/types.ts:172-211`). Reaching `src/bin` exports as a compared population is a new `Source` capability with its own guide and tests, not a configuration of the existing one. Rule it in or out explicitly; the plan must not leave it implied.

**The README has no partner and no pairing key.** `guides/README.md` is the manifest `parseManifest` reads (`tests/guides.test.ts:61-73`); `README.md` is not a row. `Guide` extracts sections, surface, methods, links, tests, and fences (`Guide.ts:41-49`) — no paragraphs and no spans — so a passage-level comparison needs a new projection.

**A known pair is already ruled correct and would red under naive equality.** `README.md:48` (`npx scaffold new router --src core,server`) against `guides/scaffold.md:518-530` (`scaffold <verb> [options]`) is a register difference, not drift, per `PROPOSAL.md:1216-1220`. Bound whatever the README gate compares to what a rule declares equal, or it reports a correct difference as a defect.

## Decision 7 — order and units

**The order is fixed by the publication edges, not by preference.** `@orkestrel/guide`'s readers and `render` land and publish first, because every consumer holds it as a development pin. Scaffold's vendored bytes — `configs/policy.ts`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `.oxfmtrc.json` (`src/core/constants.ts:139-147`) — and the `docs` seed land and publish second. Targets adopt third.

**Landing the `.claude/rules/documentation.md:35` amendment before an instrument exists makes every guide in the fleet non-conforming against a rule nothing enforces.** Land the amendment in the change that lands its gate.

**Scaffold's own guide is a seed.** `guides/scaffold.md` sits in `HOST_PATHS` (`src/core/constants.ts:152`), so it must be converged and current before any scaffold release, or every target receives stale seed bytes.

**Each package's gate is hand work.** `tests/guides.test.ts` is package-owned and absent from `HOST_PATHS`, so the wave carries one unit per checkout for the gate itself, beside the editorial unit. `probe` hand-rolls its own harness (`PROPOSAL.md:608-611`) and needs its own unit or an explicit exclusion.

## Decision 8 — the probes before the first unit

Restated under symmetry, each with its control and its coverage named:

- **Render fidelity.** Render one committed table through `renderMarkdown` and diff it against the committed bytes. This decides whether byte equality is reachable at all, and every later probe's design depends on it. Control: a table the render is known to reproduce, and a hand-edited cell that must diff.
- **Description-paragraph extraction against `ParseResult.comments` by range**, over the shapes the text scanner cannot see: an overload set (`/home/user/fleet/guide/src/core/sources/Source.ts:115-117`), a doc block separated from its declaration by a blank line, a doc block inside a template literal, and a re-export-only barrel (`src/core/index.ts`). Report per-file misses with their sites, not a rate.
- **The first equality run over scaffold's own guide**, reported as the list of disagreeing sites. Report it as sites, not as a total: a total over prose reprices itself on every edit and has no closing condition (`.claude/rules/quality.md` § Rounds and verdicts).
- **`oxfmt --check` after a render**, per checkout, at that checkout's own oxfmt version.
- **An oxlint rule reporting on a comment**, per checkout, at that checkout's own oxlint version.
- **The `@example` body against the executed fence** for `createBlueprint`, `Materializer`, and `Compiler`, each reported with the transcription site that would move.

## Missing measurements, before any unit can be briefed

- Whether `renderMarkdown`'s emitted table matches committed bytes, or matches only after oxfmt.
- Whether `context.report` accepts a comment as a diagnostic target at each checkout's oxlint version.
- Whether `ParseResult.comments[].value` carries the `/**` wrapper or the inner text — the range-based control's comparison depends on it, and the declaration gives `value` as a bare string with `start` and `end`.
- The text scanner's misses against that control, per shape, on real files.
- The size of the voice conversion: which Surface and Methods cells in each fleet guide change under the amendment, per package, as a site list.
- Whether the `Shape`, `Signature`, `Role`, and `Value` columns are inside or outside the comparison — a ruling, not a measurement, but no unit can be briefed without it.
- Whether `guides/README.md` gains a row for `README.md`, and what its source column would name.

## Risks the subjective lane will understate

- **The formatter is a third party to every render.** A design that reads as "render and compare" is an agreement between the renderer, oxfmt, and the committed bytes. Two of those are not in `@orkestrel/guide`.
- **The editorial pass is the real cost, and the mechanism hides it.** Every Surface Summary cell and every Methods cell in every fleet guide is a noun phrase or an imperative today (`guides/scaffold.md:60-72`, `:434-472`; `/home/user/fleet/guide/guides/guide.md:200-218`). The amendment makes each a third-person sentence. That work is larger than the instrument work and belongs in the plan as units.
- **Projection deletes correct guide content.** `guides/scaffold.md:438` and `/home/user/fleet/guide/guides/guide.md:215` each carry more than a first sentence. A gate that reds on the difference will be satisfied by deleting the surplus, and the deletion is silent.
- **Reversibility does not hold for the rule amendment.** Deleting a generator leaves the files; reverting the voice rule after every cell has been rewritten leaves every guide violating the noun-phrase rule it returns to.
- **Mirrors put the guide package's own guide out of scaffold's reach**, so a fleet-wide header convergence has an ordering the plan must carry, not a single sweep.
- **A vendored `PolicyContext` widening reaches every target through `repair`**, and `repair` restores `tests/setupPolicy.ts` and `tests/policy.test.ts`, so a vendored-only release can turn a green target red (`.agents/orchestration.md` § Publishing the fleet).

## Numbered claims the plan must survive

1. A Surface-row description equals the symbol's TSDoc first sentence at every row where both exist. **BROKEN** — `/home/user/fleet/guide/guides/guide.md:35` against `/home/user/fleet/guide/src/core/types.ts:12-14`; `guides/scaffold.md:421` against `src/server/Materializer.ts:85-86`.
2. A Methods-row summary equals the symbol's TSDoc first sentence. **BROKEN** — `guides/scaffold.md:438` against `src/core/types.ts:615`.
3. The Returns column can be compared against `@returns`. **BROKEN** — `/home/user/fleet/guide/guides/guide.md:202-207` and `src/core/types.ts:617` carry a type against a description.
4. Rendering `{@link X}` as `` `X` `` covers the corpus. **BROKEN** — dotted targets at `/home/user/fleet/guide/src/core/helpers.ts:31-34`, `/home/user/scaffold/src/core/types.ts:305`, `src/core/compilers.ts:1791`, `src/server/Upstream.ts:97`; an inflected target at `src/core/factories.ts:31`.
5. Making a guide fence and its `@example` the same code preserves every executed transcription and every narrative claim. **BROKEN** — `src/core/factories.ts:36-42` against `guides/scaffold.md:762-773`, whose fields the prose at `:775-784` names and whose body `tests/guides.test.ts:212-221` executes.
6. A `render` from `@orkestrel/guide` reproduces a committed guide table byte for byte. **UNRESOLVED** — `/home/user/fleet/markdown/src/core/helpers.ts:1719-1720` declares 1-space padding against column-aligned committed bytes; settle by running it.
7. An oxlint plugin rule can report a diagnostic on a comment at the installed version. **UNRESOLVED** — `PROPOSAL.md:1166-1168`; and the version differs per checkout (`/home/user/fleet/guide/package.json:84-85`).
8. `configs/policy.ts` can read comment text while importing nothing. **UNRESOLVED** — `configs/policy.ts:49-54` lacks the surface, `.claude/rules/workspace.md` § Configuration authority forbids the import, so only a control settles the structural declaration.
9. The equality gate names both sites for every disagreement. **UNRESOLVED** — true only for a per-row keyed comparison; a table-level byte comparison cannot.
10. Adding a summary to `SurfaceSymbol` obliges no hand edit in any consumer's suite. **UNRESOLVED** — true only where the field is optional; `shapers.ts:22` and `validators.ts:40` govern it and C7 (`PROPOSAL.md:325-331`) fixes the cost of the non-additive case.
11. Adopting the mechanism moves the published surface of `@orkestrel/guide` and `@orkestrel/scaffold` and of no other package. **CONFIRMED** on the edges read — `/home/user/fleet/guide/package.json:74-89` and every consumer's development pin; `src/core/constants.ts:132-153` for the vendored set. Each package still hand-edits its own `tests/guides.test.ts` and its own guide.
12. `src/bin` stays outside the compared population. **CONFIRMED** as the current contract — `guides/README.md:16-17`, `/home/user/fleet/guide/src/core/types.ts:172-211`. Reaching it is a new capability the plan must name in or out.

VERDICT: FAIL 1, 2, 3, 4, 5, 6, 7, 8, 9, 10; outside the claims: none
