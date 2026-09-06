# docs-parity design — subjective lane (Workflow wf_e45a4f92-edf, agent a74c3521d83d5a6f8)

Holding the **subjective** lane (`planner`, Claude Opus 5). The objective-lane sections — `Constraints`, `Refusals`, `Measurements` — are not mine and stay empty.

# Decision 1 — The normalized form

**The two sides project into the same types, and the gate diffs those types. Neither side renders the other to be compared.**

Rationale: a symmetric gate built from two renders has two projections that can each be wrong, and a disagreement between them cannot say which side moved. Reading both sides into one shape makes the comparison a set difference over a pairing the bijection already computes, and it makes the failure name both sites by construction.

What is compared:

| Fact | Guide side | Source side | Transform |
| --- | --- | --- | --- |
| A Surface row's summary | the `Summary` cell | the declaration's TSDoc first sentence | `{@link X}` → `` `X` ``; `\|` unescaped; internal whitespace collapsed; nothing else |
| A Methods row's summary | the `Summary` cell | the member's TSDoc first sentence | the same |
| A titled example | the fence under a heading of that title | the `@example` block's body and its title | doc-comment continuation `* ` stripped; per-line and trailing whitespace trimmed; the fence language compared too |
| The README pitch | the README's opening paragraph | — | equal to the guide's H1 blockquote (Decision 6) |

What is deliberately outside the comparison, each with its reason:

- **`@param`.** No guide partner exists, and inventing a Parameters table adds public structure with no consumer. The minimal-API law forbids it.
- **`@returns`.** The Methods table's `Returns` column carries a type expression, not a sentence. Comparing a type against a sentence is a category error, and reading the declared return type pulls a signature reader into a package that refuses one. `Returns` stays guide-only data.
- **`@remarks` and the guide narrative.** Both are authored, both bound by the prose law through the voice gate, neither compared. Comparing them forbids the guide any narrative voice, which is the Option 2 shape the ruling retired.
- **The H1 blockquote tagline.** Authored, noun phrase, no TSDoc partner while only `test` declares `@packageDocumentation`. The amendment scopes the noun-phrase form to it alone.

The first sentence is the text up to the first `.` followed by whitespace or end, outside a code span and outside a `{@link}`. That grammar's miss rate is Probe 1.

# Decision 2 — The guide structure that carries it

**Every Surface and Methods table has exactly one compared column, named `Summary`, and every other column is guide-only data.**

Rationale: the fleet's header variation is not noise. `Shape` on a type row carries `{ name, keyword }`, `Value` on a constant row carries the literal, `Signature` on a helper row carries the type — none of those is a sentence and none has a TSDoc partner. Forcing one header word onto the compared position would erase real information; leaving the compared column ambiguous would make the reader guess. Naming one column and letting the others stand as themselves keeps both.

The structure changes:

- The compared column is `Summary` in every Surface table and every Methods table, fleet-wide. `Behavior`, `Role`, and `Value` sitting in the compared position rename to `Summary`. A `Shape`, `Signature`, `Value`, or `Returns` column that carries a genuinely different fact stays as its own column beside `Summary` — the `| Name | Kind | Signature | Behavior |` form in `/home/user/fleet/guide/guides/guide.md:72` already proves the shape works. `| Name | Kind | Shape |` becomes `| Name | Kind | Shape | Summary |`.
- The name column stays column 0's code span and `Kind` stays located by header text. `findKindIndex` (`/home/user/fleet/guide/src/core/helpers.ts:953`) is unchanged, so `API`, `Class`, and `Type` remain acceptable column-0 headers. The reader locates `Summary` the same way `Kind` is located.
- **No marker-bounded regions.** They were Option 1's generator seams. Under an equality gate over parsed cells the table's own rows are the region, and the propagation tool writes by replacing the located node's source span through `@orkestrel/markdown`'s `parseProvenance`. That deletes region currency, region containment, and marker integrity from the check set, and keeps generator chrome out of a file a reader loads on GitHub.
- **A guide names its symbol the way it already does**: the backticked identifier in column 0, normalized through `normalizeIdentifier`. No compiler, no second key.
- **Examples pair by title.** A TSDoc `@example` carries a title, which `extractExampleLines` already permits (`helpers.ts:1398`). The guide's fence carries the same text as its nearest preceding heading — the convention `## Patterns` already uses at `guides/guide.md:437`. "Handled nicely" means: the fence and the `@example` body are the same code, byte for byte, and the reader's signpost is the pairing key, so the guide gains no syntax it did not have.
- A titled `@example` claims a guide partner. An untitled one does not, and stays presence-evidence for the existing EX check. That asymmetry is Tension 3.

# Decision 3 — The readers, on both sides, in `@orkestrel/guide`

Interface changes, under the single-word entity API laws:

- **`SurfaceSymbol` gains `readonly summary?: string`.** Widen rather than add a parallel `SurfaceRow`: the concept is unchanged — one documented or exported symbol — and the summary is a property of it. `computeSymbolKey` is untouched, so every existing bijection keeps working and the summary rides on the pairing the bijection already computes. That is the single strongest reason to prefer this over a second type.
- **`MethodEntry { readonly name: string; readonly summary?: string }` is new**, and `MethodGroup.methods` becomes `readonly MethodEntry[]`. Here no type existed — a method was a bare string — so this introduces one rather than duplicating one. `SourceInterface.methods(name)` returns `readonly MethodEntry[]` for the same reason: **one type is what each side projects into**, which is the symmetry made concrete. `Entry` already means "one table row" in this package (`ManifestEntry`).
- **`GuideFence` gains `readonly title?: string`** — the flattened text of the fence's nearest preceding heading. Widen rather than add `GuideInterface.examples()`: a title is a property of a fence, and `guide.fences()` keeps serving every consumer.
- **`SourceExample { readonly name: string; readonly title?: string; readonly code: string }` is new**, and `SourceInterface.examples()` and `examples(name)` return `readonly SourceExample[]`. `name` keeps the carrying symbol, so EX survives as `examples().map((example) => example.name)`.
- **`Drift { readonly key: string; readonly guide?: string; readonly source?: string }` is new.** The member names are the two entities of the package, one word each. An absent side is `undefined`, which is how a row missing on one side reports.
- **`findDrift(guide, source): readonly Drift[]`** in `helpers.ts` joins the package's published `find*` family and names its return. It reduces each new check to `expect([]).toEqual([])`, which is the contract `guides/guide.md:378` states. I refused `scanDrift` despite the `scan*` prefix rule: this package's published family is `find*`, and a second verb for one act breaks one-concept-one-term inside the package.
- `surfaceSymbolShape`, `methodGroupShape`, `isSurfaceSymbol`, and `isMethodGroup` follow their types.

Reader mechanics: the first-sentence reader extends the existing `SourceLine.jsdoc` span walk (`helpers.ts:56`) and the `@example` chain (`:1398`), so no analyzer is added and `Source` stays text-only. `parseSync` from `vite` reads `ParseResult.comments` in a throwaway probe and in one permanent control inside the guide package's own suite — it is the measurement the text reader is scored against, never an import from any `src/**`.

# Decision 4 — The projection and the equality gate

**The gate compares entries per symbol, never table bytes. `render` is propagation the developer runs, and the gate never calls it.**

Rationale: byte currency over a whole table forces the guide's column set, order, and chrome to be whatever the renderer emits, which makes the guide generated again under a different name. Per-entry comparison rules neither side authoritative, survives the fleet's column variation, and reports one actionable line per disagreement.

The `render` direction is a family of module helpers in `helpers.ts`, not an entity method and not one overloaded symbol: `renderSurface`, `renderMethods`, `renderExample`. `.claude/rules/names.md` fixes `render*` as a helper prefix producing text from a value, and `{verb}{Noun}` is the self-describing-helper form. The source direction is `replaceSummary(source, name, sentence)` and `replaceExample(source, title, code)`, using the `replace*` verb scaffold already carries (`replaceManifestRanges`, `replaceManifestScripts`). All of them return text; the package writes nothing, exactly as `SourceOptions.files` already makes the consumer supply I/O.

New checks, joining the catalog in `/home/user/fleet/guide/guides/guide.md:376`:

- **SQ — Surface summary equality.** Over the barrel-to-guide pairing SB already computes, so SQ never double-reports a symbol SB is failing on.
- **MQ — Methods summary equality.** Per `MethodGroup`, over the pairing MB already computes.
- **EQ — Example equality.** Over the titles the source declares. A title with no guide fence, and a fence whose body differs, each report with both sites.
- **RQ — README pitch equality** (Decision 6).

The propagation tool is `npm run docs`, seeded by scaffold as a vendored `scripts/docs.ts` and run per package. With no flag it prints the drift; `--to guide` and `--to source` rewrite the named side. `--to` names the axis the value varies, which is the named-discriminant law. The gate imports the readers and `findDrift`, and imports no writer.

# Decision 5 — The voice gate

Keep Option 3's instruments and take the sibling naming form, because every rule beside them names what it refuses: **`policy/no-imperative-summary`** and **`policy/no-banned-term`** in `configs/policy.ts`, beside `no-mocking`, `no-keyword-privacy`, and `no-nested-functions`. `PolicyContext` gains `sourceCode`, which is a vendored change.

The doc-block half and the Markdown half read **one** denylist: a frozen constant in the vendored `tests/setupPolicy.ts`, derived from `.claude/rules/writing.md` § Substitutions, with a currency check that runs where the canon is present and returns empty in a target where it is not. The rule file stays the single home. The Markdown sweep lives in `tests/setupPolicy.ts` because an oxlint JS plugin cannot read Markdown, and it excludes every `guides/<other-package>.md` mirror, every fence body, and every backticked token, each exclusion carrying a control inside it.

The `jsdoc` key in `.oxfmtrc.json` stays unset until Probe 4 reports a rewrite that alters no first sentence. Under this design that probe is load-bearing rather than optional: a capitalization or a collapse inside a first sentence changes the compared text on the source side and reds SQ across the fleet.

# Decision 6 — `src/bin` and the README

**`src/bin` stays outside the bijection, and the usage-alignment assertion is its parity.** `tests/guides.test.ts:201-210` already compares the guide's `scaffold --help` block against `renderUsage()` exactly. That is the symmetric gate for the command line, it is the precedent this design follows, and it stands unchanged. `no-imperative-summary` still reaches every `src/bin` doc block, so the voice law binds there without a guide partner.

**The README stops restating the guide.** Delete the verb list, the flag list, and the exit codes from `README.md` and link to the guide's sections. What remains is the pitch, the install line, the runtime line, and one fence. The pitch is made equal to the guide's H1 blockquote and checked by RQ; the fence is already bound by FI and by the executed-fence obligation.

Rationale: the README's drift is duplication, and removing the duplication is cheaper and more honest than generating it. A marker-region README was Option 1 Stage 3, and it needs the markers this design refuses. The cost is that a reader on npm gets fewer facts without a click, and I take that trade because every one of those facts is currently a fact that can be wrong.

# Decision 7 — Order and units

Order in one line: the guide package's readers and renderers first, then scaffold's instruments and rules, then scaffold's own convergence, then one package per checkout across the fleet.

# Decision 8 — Probes before the first unit

Each names what settles it. The Orchestrator runs them on the host, not inside a unit.

1. **First-sentence miss rate.** Run the extended reader over `src/core/types.ts`, `src/core/helpers.ts`, `src/server/Materializer.ts`, and `src/bin/CLI.ts`, and diff its sentences against `ParseResult.comments` by range. A nonzero rate selects the affected package for hand review and reopens nothing about `vite`, which stays the control.
2. **The first equality run over scaffold's own guide.** Report which Surface rows, which Methods rows, and which titled examples disagree today. That reading sizes U7 and is the gate on starting it.
3. **`oxfmt --check` over a rendered table.** Render one Surface table, splice it, and read the exit status.
4. **The `jsdoc` rewrite.** `oxfmt --write` with `jsdoc: true` over a copy of `src/core/`, read for any capitalization or collapse that alters a first sentence.
5. **An oxlint rule reporting on a comment.** A throwaway plugin rule reporting a diagnostic on a comment node. Both policy rules depend on it.
6. **Provenance spans.** Read `@orkestrel/markdown`'s installed declaration for whether a table node and a fence node carry a source span. The whole splice design rests on it, and no fallback is designed.
7. **`@example` against the executed fence** for `createBlueprint`, `Materializer`, and `Compiler` — the three pairs already known to disagree — to fix what U7's hand repairs must produce.

# Exit criterion

The campaign ends when each capability closes as implemented, repaired, retained, or intentionally excluded on evidence:

1. `@orkestrel/guide` reads a Surface `Summary` cell, a Methods `Summary` cell, and a titled fence body from a guide, and the matching first sentence and titled `@example` body from source.
2. `findDrift` returns `Drift` rows naming both sides, with a negative control drawn from outside its membership rule.
3. `renderSurface`, `renderMethods`, and `renderExample` produce text whose re-parse round-trips to the same entries and whose bytes leave `oxfmt --check` green.
4. `replaceSummary` and `replaceExample` splice into an existing doc block and round-trip through the reader.
5. `no-imperative-summary` and `no-banned-term` report on a doc block; the Markdown sweep reports on a guide, a README, a rule file, and a skill file, each with a control.
6. `.claude/rules/documentation.md:35` is amended, and `.claude/rules/typescript.md` names the guide partner of a first sentence.
7. Scaffold's `tests/guides.test.ts` runs SQ, MQ, EQ, and RQ, and each reds on a planted disagreement in a file its unit did not touch.
8. Scaffold's guide, README, and TSDoc are green under all of them, with the `birth` substance disagreement and the `Compiler` example closed by hand.
9. `npm run docs` propagates in each direction, and the gate calls no writer.
10. Each fleet package is green under the same checks, or its exclusion is recorded with its reason — `probe` hand-rolls its own harness at `/home/user/fleet/probe/tests/guides.test.ts:1-9` and must be ruled on explicitly.
11. The owner has ruled on the publish question in Tension 1, and the wave has run as ruled.

# Units

Default engine first, then the substitution the dark Codex bench forces. Each writing unit is one writer per checkout, dispatched from a committed baseline.

| Unit | Role (engine) | Checkout | Owns | Depends on | Acceptance |
| --- | --- | --- | --- | --- | --- |
| **U1 `guide-readers`** | `sol` (GPT-5.6 Sol); substitute `implementer` (Opus 5) | `/home/user/fleet/guide` | `src/core/types.ts`, `helpers.ts`, `Guide.ts`, `sources/Source.ts`, `shapers.ts`, `validators.ts`, `guides/guide.md`, `tests/src/core/**` | Probes 1, 6 | Guide package gates green; `findDrift` has an outside control; the reader's miss rate against `ParseResult.comments` recorded as a permanent control in the suite; `guides/guide.md` Types, Helpers, and Methods tables updated in the same unit |
| **U2 `guide-render`** | `implementer` (Opus 5) | `/home/user/fleet/guide` | `src/core/helpers.ts`, `types.ts`, `guides/guide.md`, `tests/src/core/**` | U1, Probes 3, 6 | A rendered table re-parses to the same entries; a two-table fixture regenerated twice is byte-stable; `oxfmt --check` green on the rendered output |
| **U3 `guide-replace`** | `sol` (Sol); substitute `implementer` (Opus 5) | `/home/user/fleet/guide` | `src/core/helpers.ts`, `types.ts`, `guides/guide.md`, `tests/src/core/**` | U2 | `replaceSummary` and `replaceExample` round-trip through the reader on a doc block carrying a chain, a continuation marker, and a nested fence |
| **U4 `scaffold-policy`** | `sol` (Sol); substitute `implementer` (Opus 5) | `/home/user/scaffold` | `configs/policy.ts`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `.oxfmtrc.json` | Probes 4, 5 | Each rule ships a `PolicyControl` with a control from outside its membership rule; `npm run lint:check` and `npm run test:policy` green |
| **U5 `scaffold-rules`** | `implementer` (Opus 5) | `/home/user/scaffold` | `.claude/rules/documentation.md`, `.claude/rules/typescript.md` | none | The amendment states the equality and scopes the noun phrase to the tagline; the policy sweep's rule-map check stays green |
| **U6a `scaffold-gate`** | `sol` (Sol); substitute `implementer` (Opus 5) | `/home/user/scaffold` | `tests/guides.test.ts` | U1, U2, U5 | SQ, MQ, EQ, and RQ each red on a planted disagreement in a file this unit did not touch, and the plant's removal is named in the brief |
| **U6b `scaffold-seed`** | `builder` (Sonnet) | `/home/user/scaffold` | `scripts/docs.ts`, `src/core/constants.ts` (`HOST_PATHS`), `src/core/templates.ts`, `package.json` | U6a, U3 | `npm run docs` prints drift and rewrites each side; `scaffold audit` reports no drift on the vendored set; serialized after U6a |
| **U7 `scaffold-converge`** | `implementer` (Opus 5) | `/home/user/scaffold` | `guides/scaffold.md`, `README.md`, `src/**` doc blocks | U6a, U6b, Probes 2, 7 | Every scaffold gate green including SQ, MQ, EQ, RQ; the `birth` disagreement and the `Compiler` example closed by hand and named in the commit message |
| **U8.n `fleet-<package>`** | `implementer` (Opus 5) per checkout, parallel across checkouts | one fleet checkout each | that package's `tests/guides.test.ts`, its guide, its `src/**` doc blocks, its `package.json` pins | U1–U7 published, and Tension 1 ruled | That package's gates green under the new checks; its `MethodEntry` edit landed; its bump decision recorded per the ruling on Tension 1 |

Parallelism: U1 → U2 → U3 run serially in the guide checkout. U4 and U5 are parallel with U1 and U2 because they share no file with them. U6a, U6b, and U7 are serial in the scaffold checkout. U8 fans out one writer per checkout.

Auditing: every nontrivial unit takes the subjective and objective lanes on numbered falsifiable claims, with at least one lane on an engine that did not write it. U1, U3, U4, and U6a are objective-heavy and take `checker` in addition, because their acceptance is mechanical.

# Risks

- **The `Summary` rename erases the `Shape`, `Value`, and `Signature` distinctions** if a converging unit renames the column instead of splitting it. Evidence that settles it: a per-guide diff showing the shape token preserved in its own column beside the new `Summary`.
- **The text-only first-sentence grammar misreads a sentence carrying an abbreviation, a decimal, or a `{@link}` ending in a period.** Evidence: Probe 1's miss rate against `ParseResult.comments`, and the permanent control U1 lands.
- **Verbatim equality carries a doc-block writing defect into the guide.** `src/core/factories.ts:31` writes `{@link Question}s`, a pluralized code token `.claude/rules/writing.md` § Code tokens forbids. Neither `no-imperative-summary` nor `no-banned-term` reads that position. Evidence: a code-token inflection rule is the named successor, and this design claims no coverage of the class.
- **The title-keyed pairing has no partner where a fence sits under a task heading no symbol can carry.** Evidence: a census of scaffold's fences and their preceding headings, which Probe 7 must widen to cover.
- **`parseProvenance` may not carry a table node's byte span**, in which case the splice has no designed fallback and markers return as the only mechanism. Evidence: Probe 6, which must run before U1 is briefed.
- **The `MethodEntry` break costs a hand edit in every package's `tests/guides.test.ts`**, and `probe` hand-rolls its harness so a fleet-wide check change misses it. Evidence: `/home/user/fleet/probe/tests/guides.test.ts:1-9`.
- **A vendored-only scaffold release can turn a green target red**, because `repair` restores `tests/setupPolicy.ts` and `tests/policy.test.ts`. Each U8 unit owns its own prose repair, and its brief names that standing condition.

# Tensions

Named for the objective lane to challenge, and for the owner to rule where marked.

1. **Owner ruling required — does a TSDoc-only edit oblige a publish?** TSDoc ships in the declaration rollup (`dist/src/core/index.d.ts`, measured at 229169 bytes carrying `@remarks`, `@example`, and `{@link}` occurrences, `PROPOSAL.md:310-312`). `.agents/orchestration.md` § What a bump obliges calls a material `dist/` diff a published-surface move and names "tokens, declarations, logic" as material. A doc comment is none of those words and is every consumer's editor hover. My reading: a doc comment is part of the documented contract a consumer reads, so a converging package's surface moved and it bumps and publishes on its own account — which makes U8 a full fleet republish rather than a re-pin-and-prove. That is the campaign's largest cost and the owner rules it before U8 is planned.
2. **Per-entry comparison over table-byte currency.** I chose per-entry. Byte currency catches column reordering and header drift that per-entry ignores. I take that loss because byte currency makes the guide generated under another name and cannot survive the fleet's deliberate column variation.
3. **A titled `@example` claims a guide partner; a guide heading does not claim a source partner.** EQ's population is the titles the source declares, so a guide fence can drift from the symbol it demonstrates without reporting. The strict alternative — pairing over the union of titles — reds every existing `## Patterns` heading in the fleet on its first run. I chose the asymmetry and named its cost rather than hiding it behind an allowlist, which is the maintained second wording the `SUMMARY_VERBS` refusal already rejected.
4. **`MethodGroup.methods` breaks rather than gaining a parallel derived view.** A derived `members` beside `methods` keeps every consumer green and puts two names for one fact in a published type. I took the break because `AGENTS.md` forbids compatibility shims and every package is visited anyway.
5. **The README shrinks rather than gaining checked regions.** I removed the duplication instead of generating it. The objective lane must rule whether the npm landing page can lose its verb list.
6. **`@returns` compares against nothing.** The alternative reads the declared return type, which needs a signature reader `Source` refuses to be.

## Readings the design needs that the dispatch did not supply

- Whether `@orkestrel/markdown`'s installed `parseProvenance` exposes a source span for a table node and a fence node (Probe 6). The splice has no fallback without it.
- Whether `HOST_PATHS` vendors any path under `scripts/`, which decides whether `scripts/docs.ts` is a vendored seed or a per-package file.
- The headings above scaffold's Blueprint fence (`guides/scaffold.md:762-773`), Compile fence (`:878-886`), and Library fence (`:1415-1426`), which decide whether the title-keyed pairing works on the pairs already known to disagree.
- The set of scaffold Surface and Methods rows whose `Summary` cell already equals the TSDoc first sentence under the stated transform, versus those that do not — the reading that sizes U7 (Probe 2).
- Whether a doc-comment-only source edit produces a material `dist/src/core/index.d.ts` diff against the published tarball, which is the evidence Tension 1 turns on.
