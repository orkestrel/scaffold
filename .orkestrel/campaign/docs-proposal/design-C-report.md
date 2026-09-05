# Unit docs-design — Lens C report (planner on Opus 5)

Returned by Workflow wf_50dace1e-3ab node design:C on 2026-09-05; captured verbatim by the Orchestrator.

# Option C1 — The voice gate

## 1. Mechanism

**Source of truth per fact.** The prose law stays where it is: `AGENTS.md` § Writing, `AGENTS.md` § Instruction files, and `.claude/rules/writing.md` § Substitutions (`.claude/rules/writing.md:83-109`, docs-absorb.result.md row 7). `.claude/rules/documentation.md` § Authority and workflow refuses a competing copy — "Do not create competing instruction copies in guides" — so every instrument reads that law rather than restating it. A symbol's summary sentence has one home, the TSDoc first sentence on the declaration, whose form `.claude/rules/typescript.md:80-83` fixes.

**The one law amendment.** `.claude/rules/documentation.md:35` reads "The TSDoc voice rule governs a doc block; a guide tagline and a Surface-row description are noun phrases." That sentence authorizes a second voice for one fact and is the seam the measured pairs drifted across. C1 replaces it with a projection rule: a Surface-row description is the symbol's TSDoc first sentence with each `{@link X}` rendered as `` `X` ``; a guide tagline is the H1 blockquote and takes the `@packageDocumentation` summary where the package declares one.

**What reads what.**

- **oxfmt owns shape.** `.oxfmtrc.json` gains `jsdoc: true`. The oxc.rs formatter reference states that enabling it canonicalizes tag aliases, capitalizes descriptions, wraps long lines, and collapses short comments (docs-research-web-report.md § 6b); the option defaults to disabled and `.oxfmtrc.json` does not set it today (docs-absorb.result.md row 7). Markdown needs no configuration change: `npx oxfmt --config .oxfmtrc.json --check .` already reads every `.md` file in the tree, reporting `ROADMAP.md` as the only red file out of 221 files (docs-orchestrator-measurements.md § oxfmt already checks Markdown in this tree).
- **`configs/policy.ts` owns doc-comment prose.** The plugin API reaches comment text: `sourceCode.getAllComments(): CommentType[]` and `CommentType.value: string` (docs-research.result.md row 5, `plugins-dev.d.ts:2697,1315-1318`), and `Program.comments` (docs-absorb.result.md row 8, `dist/index.d.ts:1325`). Add `policy/prose`, which refuses a substitution-table term inside a doc block, and `policy/summary`, which refuses a first sentence that is not third-person with an `-s` verb or that repeats the symbol's own name. Each visitor stays a one-line context-binding arrow delegating to a module-scope `report{Noun}` function, per `.claude/rules/workspace.md` § Policy instruments.
- **The policy sweep owns Markdown prose and the cross-site equality.** A JS plugin cannot reach Markdown: its `Language` union is `"js" | "jsx" | "ts" | "tsx" | "dts"` (docs-research.result.md row 5, `plugins-dev.d.ts:4129`), and oxc.rs states that custom file formats are "explicitly not supported yet" (docs-research-web-report.md § 5b). `.claude/rules/workspace.md` § Policy instruments assigns "the rules that are path- or text-shaped" to `tests/setupPolicy.ts`, so this is placement by law rather than by convenience. The sweep already reads Markdown, with a `guides/sample.md` control (`tests/policy.test.ts:327-340`).
- **Why the plugin half cannot be suppressed.** `.claude/rules/architecture.md` § What the policy sweep proves records that the sweep refuses every `eslint-disable` and `oxlint-disable` directive in source, test, config, and script files. That is the condition `.claude/rules/workspace.md` § Policy instruments sets before a rule may live in the plugin.

**The term table must travel as data.** `.claude/rules/writing.md` sits in `CANON_PATHS`, staged for reading inside the installed package and never copied into a target (`src/core/constants.ts:125-131`). A target holds no `.claude/rules` tree, and the sweep's existing rule-map check returns an empty violation list when that directory yields nothing (`tests/setupPolicy.ts:1654-1660`). A prose check that reads the rule file at run time is therefore dead in every target. C1 ships the denylist as a frozen constant in the vendored `tests/setupPolicy.ts`, derived from the rule file, and adds a currency check that runs only where the canon exists — the same degradation shape the rule-map check already has. The rule file stays the single home; the constant is a derived copy with a gate at its source, which is the mechanism `.agents/orchestration.md` § Where campaign artifacts live prefers over a second document.

**Controls.** Each new rule ships a `PolicyControl` entry beside `RULES_POLICY_CONTROLS` (`tests/setupPolicy.ts:2737-2741`), which already carries a `membership` field — the shape `.claude/rules/quality.md` § Instruments requires.

**Line primitives.** None. C1 writes no Markdown, so `@orkestrel/markdown` and `@orkestrel/template` stay out of it.

**New npm dependency: none.** oxfmt 0.65.0, oxlint 1.80.0, and typescript 6.0.3 are already declared (docs-research.result.md rows 4-6).

**Labelled assumption.** The sweep reads a TSDoc first sentence with a text scan, in the idiom `@orkestrel/guide`'s `Source` already uses — "text-only line scanners rather than the TypeScript compiler API or the filesystem" (`/home/user/fleet/guide/src/core/sources/Source.ts:24-28`). Where a negative control shows that scan unsound, the reader becomes `ts.getJSDocCommentsAndTags` (`typescript.d.ts:8889`) and `ts.displayPartsToString` (`typescript.d.ts:11426`), which are available to a Vitest sweep at no new dependency cost. `AGENTS.md` § Project model forbids a second source-language analyzer, so a hand-written TypeScript parser is not an option either way.

## 2. Worked example

`createBlueprint` today carries this TSDoc, which C1 leaves unchanged (`src/core/factories.ts:7-14`):

```ts
/**
 * Constructs a {@link Blueprint} from a name and the fields that differ from the defaults.
 *
 * @param name - The bare workspace name.
 * @param input - The fields to set; every omitted field takes its default.
 * @returns The filled blueprint, owned by the caller and sharing nothing with `input`.
 * @throws {@link ScaffoldError} coded `INVALID` when the filled record is not a
 * blueprint.
 */
```

The guide passage C1 keeps for it is the Surface row, changed in one letter (`guides/scaffold.md:281`):

```markdown
| `createBlueprint` | function | Constructs a `Blueprint` from a name and the fields that differ from the defaults. |
```

**Voice consequences.** `.claude/rules/typescript.md:80-83` governs the TSDoc sentence: third person, `-s` verb, never repeating the symbol's name. `.claude/rules/writing.md` § Voice and actor and § Substitutions govern the same sentence, because it is the sentence the guide renders. The Surface-row description is **derived mechanically** — the TSDoc first sentence with each inline `{@link X}` rendered as `` `X` `` — rather than transformed or authored separately, which is the change to `.claude/rules/documentation.md:35`. The tagline stays authored, and the amended rule names its node (the H1 blockquote) so the site is no longer implicit; docs-absorb.result.md Unknowns records that no named law file defines the tagline as that blockquote today.

**The drift this closes.** The pair differs by one letter — `Constructs` in `src/core/factories.ts:8` against `Construct` in `guides/scaffold.md:281` — and the same shape recurs elsewhere: `Encodes text as the exact lowercase hexadecimal form of its UTF-8 bytes.` (`src/core/helpers.ts:61`) against `Encode text as the exact lowercase hexadecimal form of its UTF-8 bytes.` (`guides/scaffold.md:221`), recorded as a wording disagreement in docs-absorb.result.md row 4. Neither site satisfies `.claude/rules/documentation.md:35` as written, because neither is a noun phrase. The law and its sites disagree, and nothing reads either.

## 3. Edit cost

The table gives the files a developer edits, before C1 and after it, and the check that catches a forgotten site.

| Change kind | Before | After C1 | Check that catches a forgotten site |
|---|---|---|---|
| Rename an export | `src/<env>/<file>.ts`, every `{@link}` naming it, the Surface row and prose paragraphs in `guides/scaffold.md`, guide fences importing it, `README.md` where named, `tests/**` | Same set | SB barrel↔guide (`tests/guides.test.ts:99-116`), FI (`:182`), typecheck; after C1 also the summary-equality rule |
| Add an options field | `src/core/types.ts`, the implementation, the owning `@remarks` (`.claude/rules/patterns.md` § Options), the guide prose paragraph | Same set | Nothing before or after. C1 adds no field-level check |
| Change a behaviour claim | The TSDoc sentence, the guide paragraph, `README.md` where repeated, the executed fence where one proves it | Same set, and the paired summary must match exactly | The executed fences (`tests/guides.test.ts:201-245`) where the claim sits under a flagship fence; `.claude/rules/documentation.md` § Parity records that a substring check guards presence and nothing about behaviour |
| Add a documented limit | `guides/scaffold.md` § Limits (`:1522`), the owning symbol's `@remarks` | Same set | Nothing before or after |
| Add a CLI flag | `src/bin/CLI.ts`, `guides/scaffold.md` § Command line (`:475`), the `README.md` verb list (`README.md:45-100`) | Same set | The command-reference alignment assertion (`tests/guides.test.ts:201-245`, docs-absorb.result.md row 2). `src/bin` sits outside the surface bijection (`guides/README.md:12-21`) |

C1 removes no site. It converts a class of silent drift into a red gate, and it makes the pair cheap to fix because the correct text is already written at the other site.

## 4. Checks

The table rules on each catalog check and names what C1 adds.

| Check | Ruling under C1 |
|---|---|
| SB | Survives unchanged |
| MB | Survives unchanged |
| LI | Survives unchanged |
| TE | Survives unchanged |
| NV | Survives unchanged |
| FL | Survives unchanged |
| EX | Survives unchanged, and stays uncalled by this package's suite (docs-absorb.result.md row 2) |
| FI | Survives unchanged |
| Executed fences | Survive unchanged |

C1 adds these checks: `policy/prose` and `policy/summary` in the oxlint plugin; a Markdown term sweep over the package's own guide, `README.md`, `.claude/rules/**`, `.agents/**`, and the skills; a summary-equality rule pairing each TSDoc first sentence with its Surface row; a currency check proving the vendored denylist constant matches `.claude/rules/writing.md` § Substitutions; and the oxfmt `jsdoc` shape pass inside `npm run format:check`.

The Markdown population excludes every mirror. `guides/<other-package>.md` files are upstream bytes fetched from `main` (`guides/README.md` § Line reference, docs-absorb.result.md row 6), and `.claude/rules/documentation.md` § Parity requires refreshing a mirror rather than rewriting it. A prose rule over a mirror would demand an edit the mirror rule forbids.

## 5. Humans and LLMs

An IDE hover shows what it shows today, with shape normalized by oxfmt rather than by review. A human reading GitHub sees the same guide structure, with each Surface row now identical to the hover's first sentence, so moving between the guide and the source costs no re-reading. An LLM agent loads `.claude/rules/writing.md` for the law and the published rollup for the symbol facts: `dist/src/core/index.d.ts` carries 202 doc blocks, 129 `@remarks` occurrences, 87 `@example` occurrences, and 77 `{@link` occurrences after the api-extractor rollup (docs-orchestrator-measurements.md § TSDoc survives the declaration rollup), and TypeScript 6.0.3 copies the whole block into declaration emit without a flag (same file, § tsc declaration emit keeps TSDoc). The voice conventions stay stated once, in `AGENTS.md` § Writing, `AGENTS.md` § Instruction files, and `.claude/rules/writing.md`, published for reading through `CANON_PATHS` (`src/core/constants.ts:125-131`).

## 6. Migration

Every file C1 changes is vendored or canon, so the fleet path is a vendored-only release. The order is: amend `.claude/rules/documentation.md:35` and `.claude/rules/writing.md` in this repository; add the rules to `configs/policy.ts` (`src/core/constants.ts:143`), `tests/setupPolicy.ts` (`:139`), and `tests/policy.test.ts` (`:140`); flip `jsdoc` in `.oxfmtrc.json` (`:147`); repair this repository's own prose until the gates are green; bump and publish `@orkestrel/scaffold`, because a vendored byte moved. Each target then re-pins `@orkestrel/scaffold`, runs `repair`, runs `oxfmt --write` once, and proves its own gates — the sequence `.agents/orchestration.md` § Publishing the fleet states for a vendored-only release, including its warning that `repair` restores `tests/setupPolicy.ts` and `tests/policy.test.ts` and can turn a green target red.

`@orkestrel/guide` is untouched, so no package re-pins the `^0.0.17` development edge every fleet package declares (docs-ecosystem-report.md § Map, § Health row 3). No runtime edge moves, so no publish cascade follows. Mirrors stay byte-identical: the formatter already passes on fetched upstream bytes (docs-orchestrator-measurements.md § oxfmt already checks Markdown in this tree), and the prose population excludes them.

## 7. Risks and open questions

- **The `jsdoc` flip rewrites every doc block in every target once.** `.oxfmtrc.json` is vendored (`src/core/constants.ts:147`), so the flip lands fleet-wide. Settle it by running `oxfmt --write` on a copy of `src/core/` and reading the diff, specifically for a capitalization or a collapse that alters a first sentence the `-s` rule governs.
- **A text scan can miss a doc block.** Settle it with a negative control drawn from outside the scanner's membership rule, per `.claude/rules/quality.md` § Instruments: a doc block above a declaration separated by a blank line, and a doc block inside a template literal.
- **Whether an oxlint plugin rule can report a diagnostic on a comment.** `context.report(diagnostic)` exists (`plugins-dev.d.ts:3835`), and no distillate shows a comment as a diagnostic target. Settle it with a throwaway rule that reports on a comment, run against one file.
- **JS plugins are alpha and outside semver** (`configuration_schema.json:59-60`, docs-research.result.md row 5). Settle the exposure by pinning oxlint exactly and reading the gate after each bump.
- **A term denylist over prose can fire on a code identifier or a fixture string.** `.claude/rules/writing.md` § Substitutions states the exemption: "A literal code identifier is data, and so is a sample string inside a code fence or a test fixture." Settle the instrument by excluding fenced regions and backticked tokens, with a control inside each.

## 8. Claims

1. **C1.1.** A prose rule over Markdown cannot live in the oxlint JS plugin. Refuted by an oxlint 1.80.0 plugin rule that receives a `.md` file and reports on it.
2. **C1.2.** A sweep rule that reads `.claude/rules/writing.md` at run time is inert in every fleet target. Refuted by a target that holds a `.claude/rules` tree after `scaffold repair`, or by evidence that `CANON_PATHS` content reaches a target's filesystem.
3. **C1.3.** The Surface-row description and the TSDoc first sentence carry the same fact at every row where both exist, so one can be derived from the other without loss. Refuted by a Surface row whose description states something the TSDoc first sentence does not, and must not.
4. **C1.4.** Enabling `jsdoc` in oxfmt 0.65.0 leaves every first sentence in `src/core/` satisfying `.claude/rules/typescript.md:80-83`. Refuted by a diff from `oxfmt --write` that changes a first sentence's verb form or its opening word.
5. **C1.5.** C1 reduces no edit site for any change kind in block 3. Refuted by a change kind whose site list shortens under C1.

# Option C2 — The voice gate, and the summary written once

## 1. Mechanism

C2 keeps every part of C1 and adds generation for the facts C1 only checked.

**Source of truth per fact.** The TSDoc first sentence owns the symbol summary, as in C1. The guide's `## Surface` tables stop being authored text and become a generated region. A repository-root `llms.txt` becomes a generated projection of the guide's head and section headings.

**The region mechanism already exists.** `scaffold catalog` rewrites the catalog table inside `.claude/agents/orkestrel.md` between `<!-- orkestrel:catalog -->` and `<!-- /orkestrel:catalog -->` (`src/core/constants.ts:290-299`, `.claude/agents/orkestrel.md:44-99`, `src/server/Materializer.ts:369-395` and `:1112-1117`, docs-absorb.result.md row 6). That is a generated region inside an authored file, which is exactly the shape a Surface table needs. No such marker exists in `guides/scaffold.md` today (docs-absorb.result.md row 6).

**The verb.** A new single-word verb, `scaffold document`, sits beside `new`, `audit`, `repair`, `catalog`, and `overwrite` (`README.md:45-100`) and honours the same authority model: "Authority is the verb's: every verb except `audit` writes when it is typed, and no option grants a write" (`README.md:39-40`, `guides/scaffold.md:477-478`). Its trigger is a developer run, a `prepack` run so a pack ships a current guide, and an `audit` report naming a stale region as a `Finding`. Extending `catalog` instead loses, because that verb's subject is the fleet registry rather than this workspace's own documentation.

**What it reads.** `scaffold document` scans `src/**` for each exported declaration and its preceding doc block, using the line-scanner idiom `@orkestrel/guide`'s `Source` already uses (`/home/user/fleet/guide/src/core/sources/Source.ts:24-28`), then writes the rows. Reading the built rollup instead is available — `dist/src/core/index.d.ts` carries the blocks (docs-orchestrator-measurements.md § TSDoc survives the declaration rollup) — and costs a build before every documentation run.

**Line primitives.** `parseProvenance` locates the region with source spans intact (`/home/user/fleet/markdown/guides/markdown.md:75`), `renderMarkdown` writes canonical Markdown for the table (`:119`), and `fillTemplate` fills the row shape (`/home/user/fleet/template/guides/template.md:104`). `@orkestrel/markdown` and `@orkestrel/template` are already runtime dependencies of `@orkestrel/scaffold` (docs-ecosystem-report.md § Work order row 4).

**New npm dependency: none**, on the line-scanner path. The compiler-API fallback is not free: `ts.getJSDocCommentsAndTags` (`typescript.d.ts:8889`) reaches the summaries exactly, and `typescript` 6.0.3 is a development dependency today, so a shipped verb that imports it moves an existing package onto the runtime edge of `@orkestrel/scaffold` and into every consumer's install. Name that move to the owner before taking it; `AGENTS.md` § Non-negotiable rules governs the decision.

**`llms.txt`.** The `/llms.txt` specification, version 2 (modified 2026-08-10), proposes an H1 title, an optional blockquote summary, and H2-delimited sections of curated links (docs-research-web-report.md § 7). Each fleet guide already opens with an H1 and a blockquote (docs-absorb.result.md row 1), and `guides/README.md` is already the map with a concept index and a directory index (`.claude/rules/documentation.md` § Authority and workflow). `scaffold document` writes `llms.txt` from those nodes and the Surface rows. It is package-owned generated content, not a vendored path, so it never joins `HOST_PATHS`: that list holds files the fleet shares verbatim (`src/core/constants.ts:111-120`), and no two packages share this file's bytes.

## 2. Worked example

The TSDoc for `createBlueprint` is unchanged from C1 and from the tree (`src/core/factories.ts:7-43`). The guide passage C2 produces is a region rather than authored text:

```markdown
<!-- orkestrel:surface -->

| Name              | Kind     | Summary                                                                            |
| ----------------- | -------- | ---------------------------------------------------------------------------------- |
| `createBlueprint` | function | Constructs a `Blueprint` from a name and the fields that differ from the defaults. |

<!-- /orkestrel:surface -->
```

The `llms.txt` entry C2 produces for the same package draws on the H1 and the blockquote at `guides/scaffold.md:1-7`:

```markdown
# Scaffold

> Scaffold compiles a workspace specification into an ordered list of files, compares that list to a real directory, and writes the difference.

## Guides

- [Scaffold](guides/scaffold.md): the package guide, with Surface, Methods, Command line, and Limits.
```

**Voice consequences.** The writing rules that apply to the TSDoc are the ones C1 names, and they now apply once for the whole chain: the sentence the developer writes at `src/core/factories.ts:8` is the sentence the IDE hovers, the sentence the guide row prints, and the sentence `llms.txt` carries. The Surface-row description is **derived**, and the derivation is a program rather than a rule a reviewer applies. The tagline stays **authored**, because the projection would need a `@packageDocumentation` block and only `test` declares one fleet-wide, on `src/browser/index.ts` (docs-ecosystem-report.md § Map). C2 states the tagline rule and leaves its site authored, which is the honest close for that unknown.

## 3. Edit cost

The table gives the files a developer edits before any change and under C2.

| Change kind | Before | After C2 | Check that catches a forgotten site |
|---|---|---|---|
| Rename an export | Source, `{@link}` sites, the Surface row, guide prose, guide fences, `README.md`, `tests/**` | Source, guide prose naming it, guide fences, `README.md`; run `scaffold document` | `audit` reports a stale region; SB, FI, and typecheck as before |
| Add an options field | `src/core/types.ts`, the implementation, the owning `@remarks`, the guide prose paragraph | Same, minus nothing — no Surface row changes for a field | Nothing. C2 adds no field-level check |
| Change a behaviour claim | TSDoc sentence, guide paragraph, `README.md`, the executed fence | TSDoc sentence, guide paragraph, the executed fence; the row follows | The executed fences (`tests/guides.test.ts:201-245`); the summary-equality rule from C1 for the row |
| Add a documented limit | `guides/scaffold.md` § Limits, the owning `@remarks` | Same | Nothing |
| Add a CLI flag | `src/bin/CLI.ts`, § Command line, the `README.md` verb list | Same. `src/bin` sits outside the surface bijection (`guides/README.md:12-21`), so no region covers it | The command-reference alignment assertion (`tests/guides.test.ts:201-245`) |

The measured win is the rename row and every summary edit. The rows C2 does not shorten are the prose rows, which is the honest boundary of a projection: a projection moves a sentence, and it does not decide what a limit is.

## 4. Checks

The table rules on each catalog check under C2.

| Check | Ruling under C2 |
|---|---|
| SB | **Becomes tautological** in the barrel↔guide direction, because both sides now derive from one scan of the same source. The direct↔barrel direction stays real, and this package's suite does not run it today (docs-absorb.result.md row 2) |
| MB | Survives unchanged. C2 leaves the method tables authored (`guides/scaffold.md:426-437`), so the bijection stays a comparison of independent populations |
| LI | Survives unchanged, and now covers generated link text too |
| TE | Survives unchanged |
| NV | Survives unchanged. A region that regenerates empty is a red `audit`, not a vacuous guide |
| FL | Survives unchanged |
| EX | Survives unchanged |
| FI | Survives unchanged |
| Executed fences | Survive unchanged |

C2 keeps every C1 addition and adds these: a region-currency assertion in `tests/guides.test.ts`, which regenerates and compares rather than trusting the file; an `audit` `Finding` for a stale region, so the drift is reported by the same verb that reports byte drift; and a `document`-verb proof under `tests/src/bin/**`.

Replacing SB's tautological half matters, because a check that can no longer fail is worse than no check: it reports green about a population it no longer measures. The region-currency assertion is its replacement, and it is falsifiable — hand-edit a row and it reddens.

## 5. Humans and LLMs

An IDE hover is unchanged. A human reading GitHub sees the same guide, with the Surface tables inside markers that name them as generated, so a reader knows which text to edit and which text to regenerate. An LLM agent gets a curated entry point it does not have today: `llms.txt` at the repository root, in the format the specification fixes (docs-research-web-report.md § 7), pointing at the guide and the published rollup rather than at the whole tree. The voice conventions still live once, in `AGENTS.md` § Writing, `AGENTS.md` § Instruction files, and `.claude/rules/writing.md`, and `scaffold document` states no convention of its own — it renders the sentence the source already carries.

## 6. Migration

The order runs scaffold first, then the fleet, and `@orkestrel/guide` moves only if the owner wants EX and SB re-cut.

- **Scaffold.** Implement `document`, add the markers to `guides/scaffold.md` § Surface, generate `llms.txt`, and add the region-currency assertion and the `audit` `Finding`. This moves `dist/src`, so `@orkestrel/scaffold` bumps and publishes on its own account (`.agents/orchestration.md` § What a bump obliges). It moves `dist/host` only if a vendored byte changes, which under C2 is the C1 set.
- **`@orkestrel/guide`.** Untouched. Its checks keep their contract; SB simply compares two derived populations for this package. A later unit can retire SB's barrel↔guide half, and that is a `guide` change with a development-edge blast radius: every fleet package plus `scaffold` re-pins and re-runs its gates, and none republishes (docs-ecosystem-report.md § Health row 4).
- **A package adopting C2.** It re-pins `@orkestrel/scaffold`, runs `repair` for the C1 vendored files, runs `scaffold document` once, commits the region and `llms.txt`, and proves its own gates. A package that adopts nothing keeps an authored Surface table and loses only the generation.
- **Mirrors stay byte-identical.** `document` writes the workspace's own guide alone. `HOST_PATHS` never vendors a workspace's own guide (`src/core/constants.ts:122-123`), and the other `guides/*.md` files are fetched upstream bytes (`guides/README.md` § Line reference).

## 7. Risks and open questions

- **A region inside a package-owned file is a new ownership case.** `Origin` today is `'host' | 'template' | 'computed'` (`src/core/types.ts`, quoted at docs-absorb.result.md row 4), and the Ownership section states what `audit` compares (`guides/scaffold.md:956`). Whether a region is a `computed` artifact with a narrower comparison or a new member is open. Settle it by reading `Artifact`, `Ownership`, and `Drift` in `src/core/types.ts` and running `audit` against a hand-edited region.
- **A line scanner over `src/**` can attach the wrong doc block to a declaration.** Settle it with a control outside the scanner's membership rule and by comparing the scan's output against `ts.getJSDocCommentsAndTags` on the same files, which is a probe rather than a shipped dependency.
- **A generated Surface table can lose information an author added by hand.** The tree's tables carry Name, Kind, and Summary only (`guides/scaffold.md:54-72`), so the risk is bounded; settle it by regenerating against the current file and reading the diff for lost cells.
- **`prepack` running `document` writes during a publish chain.** `.agents/orchestration.md` § Long-running commands binds that chain. Settle it by having `prepack` run `audit` and refuse, rather than write.
- **The compiler-API fallback moves `typescript` onto the runtime edge.** Settle it by measuring the scanner's miss rate first, and take the decision to the owner if the rate is nonzero.

## 8. Claims

1. **C2.1.** The marker mechanism at `src/core/constants.ts:290-299` works unchanged inside a file that is neither vendored nor canon. Refuted by a `Materializer` path that resolves a region only for a `HOST_PATHS` or `CANON_PATHS` entry.
2. **C2.2.** A line scanner over `src/**` recovers every exported symbol's first sentence that the compiler API recovers. Refuted by one export where the scan and `ts.getJSDocCommentsAndTags` disagree.
3. **C2.3.** Generating the Surface table makes SB's barrel↔guide direction tautological. Refuted by an input where the generated region and the barrel disagree without the generator being broken.
4. **C2.4.** `scaffold document` adds no npm dependency on the line-scanner path. Refuted by a `package.json` diff that adds a runtime edge.
5. **C2.5.** The rename row in block 3 shortens under C2 and every other row does not. Refuted by a rename that still requires a Surface-row edit, or by another row that shortens.

# Option C3 — One document head, two renderings

## 1. Mechanism

C3 keeps C1 and C2 and extends the projection to the duplication no option so far touches: the `README.md` head and the per-interface method tables.

**The measured overlap.** `README.md` and `guides/scaffold.md` share the compile-compare-write pitch (`README.md:1-8`, `guides/scaffold.md:1-13`), the vendored-set-against-canon paragraph (`README.md:10-23`, `guides/scaffold.md:15-27`), the install line (`README.md:27-28`, `guides/scaffold.md:35-36`), the Node 22.12 line and the `npx` line (`README.md:31-34`, `guides/scaffold.md:39-42`), the authority sentence (`README.md:39-40`, `guides/scaffold.md:477-478`), the exit codes (`README.md:40`, `guides/scaffold.md:547-549`), the verb list (`README.md:45-100`, `guides/scaffold.md:480-486`), the `--target` and `--json` flags (`README.md:42-43`, `guides/scaffold.md:542-543`), and the Library split with its `createBlueprint` fence (`README.md:103-115`, `guides/scaffold.md:1381`) — all recorded in docs-absorb.result.md row 10, with **no bijection test over any of it**. The same row records a live inconsistency: the README verb examples write `npx scaffold …` (`README.md:48`) where the guide's command reference writes `scaffold <verb>` (`guides/scaffold.md:518-530`).

**What C3 generates.** `scaffold document` gains two more regions. The `README.md` head — pitch, install, runtime line, verb table, flags — becomes a region projected from the guide's corresponding sections. The guide's `## Methods` tables become regions projected from each interface's call-signature members, which is exactly the population `.claude/rules/documentation.md` § Parity already fixes: "The table's methods exactly match the interface's call-signature members."

**Line primitives and dependencies.** The same as C2: `parseProvenance`, `renderMarkdown`, `fillTemplate`. **New npm dependency: none.**

## 2. Worked example

`Materializer` is the pair to show, because its summary is already duplicated word for word. The TSDoc reads (`src/server/Materializer.ts:85-86`):

```ts
/**
 * Represents the mutation spine: read the vendored host, re-derive the target, stage, swap.
```

The guide's Surface row reads (`guides/scaffold.md:422`):

```markdown
| `Materializer`     | class | The mutation spine: read the vendored host, re-derive the target, stage, swap.     |
```

Under C3, the row is generated from the TSDoc sentence and the method table beneath it is generated from `MaterializerInterface`:

```markdown
<!-- orkestrel:methods MaterializerInterface -->

| Method | Summary |
| ------ | ------- |
| `materialize` | Writes the plan's artifacts into the target, staging every byte before the swap. |

<!-- /orkestrel:methods -->
```

**Voice consequences.** The TSDoc summary is third person with an `-s` verb, per `.claude/rules/typescript.md:80-83`. The Surface row is that sentence, so the guide's noun-phrase form at `guides/scaffold.md:422` — "The mutation spine: …" — is **transformed today and derived under C3**, and the transformation is what let the pair state the same fact in two grammars. The method summary is derived the same way from each method's TSDoc first sentence. The README head is a **rendering** of the guide's own prose rather than a second draft of it, which is what removes the `npx scaffold` against `scaffold <verb>` split.

## 3. Edit cost

The table gives the site count in file terms, before any change and under C3.

| Change kind | Before | After C3 | Check that catches a forgotten site |
|---|---|---|---|
| Rename an export | Source, `{@link}` sites, Surface row, method row, guide prose, fences, `README.md`, `tests/**` | Source, guide prose naming it, fences; run `scaffold document` | `audit` reports a stale region; typecheck |
| Add an options field | `src/core/types.ts`, implementation, `@remarks`, guide prose | Same | Nothing |
| Change a behaviour claim | TSDoc sentence, guide paragraph, `README.md`, the executed fence | TSDoc sentence, guide paragraph, the executed fence | The executed fences (`tests/guides.test.ts:201-245`) |
| Add a documented limit | § Limits, the owning `@remarks` | Same | Nothing |
| Add a CLI flag | `src/bin/CLI.ts`, § Command line, the `README.md` verb list | `src/bin/CLI.ts`, § Command line; run `scaffold document` and the README verb table follows | The command-reference alignment assertion (`tests/guides.test.ts:201-245`) |

C3 is the only option that shortens the CLI-flag row, which docs-absorb.result.md row 5 shows as one of the recurring multi-site commits.

## 4. Checks

The table rules on each catalog check under C3.

| Check | Ruling under C3 |
|---|---|
| SB | Becomes tautological in the barrel↔guide direction, as in C2 |
| MB | **Splits.** The bijection half becomes tautological, because the table is generated from the interface it is compared against. The class-no-extra half survives real and unchanged, because it compares a class against its interface — a source fact no guide projection touches (docs-absorb.result.md row 2) |
| LI | Survives unchanged, over the guide and the README head |
| TE | Survives unchanged |
| NV | Survives unchanged |
| FL | Survives unchanged |
| EX | Survives unchanged, and gains a population: a generated method row obliges an `@example` on the method, which `findUnexampled` already accepts from a leading `@example` tag (docs-absorb.result.md row 2) |
| FI | Survives unchanged, and now also covers the README head's fences |
| Executed fences | Survive unchanged |

C3 keeps every C1 and C2 addition and adds a README-region currency assertion. That assertion is the **first** check any part of `README.md` has ever had, on the evidence in docs-absorb.result.md row 10.

## 5. Humans and LLMs

An IDE hover is unchanged. A human reading GitHub sees a README whose head cannot contradict the guide, which is the surface the npm registry renders and the first thing a new reader meets. A human reading the guide sees the same method tables, now provably matching the interfaces. An LLM agent loads `llms.txt`, the guide, and the rollup, and finds one wording for each fact across all of them — which is the condition that makes retrieval over the package's documentation safe to trust. The voice conventions stay in `AGENTS.md` § Writing, `AGENTS.md` § Instruction files, and `.claude/rules/writing.md`.

## 6. Migration

The order matches C2's, with a longer per-package step and one extra fleet obligation.

- **Scaffold.** Add the README and Methods regions to `document`, adopt them in this repository, and publish on its own account.
- **`@orkestrel/guide`.** Untouched unless the owner retires MB's tautological half. That retirement is a development-edge change: every fleet package plus `scaffold` re-pins `^0.0.17` and re-runs its gates, and none republishes (docs-ecosystem-report.md § Health row 4).
- **A package adopting C3.** It re-pins `@orkestrel/scaffold`, marks its README head and its method tables, runs `scaffold document`, and proves its gates. The per-package cost is real: every fleet package carries a README between 35 and 220 lines and a guide between 95 and 5452 lines (docs-ecosystem-report.md § Map), so the marking is a per-package editorial pass, not a mechanical one.
- **Mirrors stay byte-identical.** `document` writes the workspace's own files alone.
- **A fleet-wide `scaffold.md` staleness already exists** and C3 does not create it: fleet checkouts hold 1770-line and 1795-line copies against this repository's 1798-line original (docs-ecosystem-report.md § Health row 5). Refresh that before measuring any C3 adoption, or the readings mix two subjects.

## 7. Risks and open questions

- **A generated README head can read worse on the registry than an authored one.** `.claude/rules/writing.md` § Structure requires a complete sentence introducing every list and table, and a projection must carry those sentences. Settle it by generating this repository's own README head and reading the rendered result.
- **Marking regions in a 5452-line guide is an editorial pass, not a mechanical one** (`/home/user/fleet/mcp/guides/mcp.md`, docs-ecosystem-report.md § Map). Settle the cost by marking one large guide and one small guide and recording the time each took.
- **MB's tautological half must be replaced, not merely noted.** A check that can no longer fail reports green about a population it stopped measuring. Settle it by adding the region-currency assertion in the same change that generates the table, and by hand-editing a row to prove it reddens.
- **`probe` hand-rolls its own parity harness** rather than importing `@orkestrel/guide` (`/home/user/fleet/probe/tests/guides.test.ts:1-9`, docs-ecosystem-report.md § Health row 3), so a fleet-wide check change misses it. Settle it by reading that file before counting the fleet as uniform.
- **A package with no `@packageDocumentation` block has no source for a generated tagline.** Only `test` declares one, on `src/browser/index.ts` (docs-ecosystem-report.md § Map). C3 leaves the tagline authored for that reason and states the rule; settle a later projection by adding the block fleet-wide, which is its own unit.

## 8. Claims

1. **C3.1.** No check today reads any part of `README.md`. Refuted by an assertion in `tests/**` that reads `README.md`.
2. **C3.2.** The `npx scaffold` against `scaffold <verb>` split between `README.md:48` and `guides/scaffold.md:518-530` survives every gate the repository runs today. Refuted by a gate that reddens on it.
3. **C3.3.** Generating a method table from an interface's call-signature members makes MB's bijection half tautological and leaves its class-no-extra half real. Refuted by an input where the generated table and the interface disagree, or where class-no-extra can no longer fail.
4. **C3.4.** C3 shortens the CLI-flag row of block 3 and C1 and C2 do not. Refuted by a CLI-flag change that still requires a README edit under C3, or by one that requires none under C2.
5. **C3.5.** C3 adds no npm dependency beyond C2's. Refuted by a `package.json` diff.

**Recommendation for the Orchestrator's ranking.** C1 is the floor and buys correctness without buying cost reduction; C2 is the option to present as the recommended path, because it closes the rename and summary rows that docs-absorb.result.md row 5 shows recurring across commits; C3 is the increment that reaches the largest unchecked duplication in the evidence and costs a per-package editorial pass to adopt.

DESIGN C: 3 option(s)
