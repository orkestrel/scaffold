# Documentation pipeline proposal

> Start with Option 3, the voice gate: it changes no artifact's shape, adds no dependency, and turns
> the prose law you already wrote into a red gate over the TSDoc block and the Markdown files this
> repository owns. Then take Option 1 in stages: mark the guide's `## Surface` tables, then its
> `## Methods` tables, then the `README.md` head as generated regions rendered from the TSDoc first
> sentence, so a summary is written at the declaration and appears everywhere else without being
> retyped. That removes the Surface, Methods, and README-head edit sites and keeps every authored
> narrative section, every executed fence, and the guide as one file a reader loads whole. It costs a
> vendored-only `@orkestrel/scaffold` release with a per-target `repair` and gate run for Option 3; a
> `@orkestrel/guide` development bump for Option 1, where each package re-pins and proves its gates
> and no package republishes its own surface; a `@orkestrel/scaffold` release carrying the seeded
> `docs` script and the markers in the `new` templates, which reaches each target as files through a
> re-pin and `repair` and can ride Option 3's vendored release rather than adding a second one; and
> one amendment to `.claude/rules/documentation.md:35`. Option 2, the whole guide generated from
> TSDoc, stays on the table and is not the place to start.

## Summary

Take Option 3 first, then Option 1 in its stages, and re-read the multi-site edit rate over one
release cycle before ruling on Option 2.

- **Option 3, the voice gate, is the floor.** It removes no edit site. It converts the drift class
  that the checks pass over today — a TSDoc summary and a guide row disagreeing, a banned term
  entering prose — into a failing gate. It composes with Option 1 and Option 2 rather than competing
  with them, and it is what makes their generated output checkable rather than merely regenerated.
- **Option 1, reference regions rendered from TSDoc, is the recommended pipeline.** The guide keeps
  its authored narrative. Marker-bounded regions carry the reference tables, rendered from the TSDoc
  first sentence by `@orkestrel/guide`'s existing text-only scanner, extended from the `@example`
  chain reader it already has. The dependency delta is none. The blast radius is a
  `@orkestrel/guide` development bump each package re-pins and proves its gates against, with no
  republish of any package's own surface, plus a `@orkestrel/scaffold` release carrying the seeded
  `docs` script and the `new` templates' markers to each target through a re-pin and `repair`.
- **Option 2, the guide generated whole, is the maximal alternative.** It is the only option that
  closes the `birth` substance disagreement and the `Compiler` example disagreement mechanically,
  because it moves the narrative into `@remarks` and reads every fence from `@example`. It costs an
  editorial pass per package, it deletes authored prose, and its central claim is unproven: the
  guide's cross-cutting H2 sections have no owning symbol yet. Take it after Option 1 Stage 2 has
  landed and the multi-site commit rate has been re-measured, and only if the section-ownership walk
  succeeds.

Every option meets these constraints, which are stated in full under § The constraints every option
must satisfy: no added npm package (`AGENTS.md` § Non-negotiable rules); no second source-language
analyzer (`AGENTS.md` § Project model); `typescript` `7.0.2` and its `@typescript/typescript6`
bridge stay on the development edge unless you rule otherwise; guide mirrors stay fetched bytes and
are never rewritten (`.claude/rules/documentation.md` § Parity); the executed fences at
`tests/guides.test.ts:212-361` survive; and the guide's checked structure — methods under `## Methods`, one table per interface,
readonly data properties in the `## Surface` row — is preserved.

Refused on the evidence, each with its reason under § Refused on the evidence: TypeDoc and
`typedoc-plugin-markdown`, `@microsoft/api-documenter`, the api-extractor doc model as a reader, a
split `guides/reference.md` file, a frozen `SUMMARY_VERBS` opener table, and `llms.txt` as an
authored second index.

### The options at a glance

The table ranks the options under Lens O's evaluation criteria, as the Orchestrator reconciled them
in `tmp/units/docs-reconciliation.md`.

| Rank | Option                                                           | Removes                                                                        | Adds                                                                                                        | Dependency delta                                                                       | Fleet cost                                                                                                                                                                                                                                                                                                               | Reversibility                                             |
| ---- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------- |
| 1    | Option 1 — reference regions rendered from TSDoc                 | The Surface, Methods, and README-head edit sites; the narrative stays authored | Region currency replacing the tautological SB and MB halves; a check over `README.md`, which has none today | none                                                                                   | `@orkestrel/guide` development bump: re-pin and gates, no republish; plus a `@orkestrel/scaffold` release for the seeded `docs` script and the `new` templates' markers, reaching each target through a re-pin and `repair`, and able to ride Option 3's vendored release; each package adds markers on its own schedule | Delete the generator, keep the files                      |
| 2    | Option 2 — TSDoc as the single source, the guide generated whole | Every prose site collapses into `src/**` where a symbol owns it                | Byte equality over the whole guide as a generator invariant                                                 | none on the scanner path; `typescript` on scaffold's runtime edge on the compiler path | Every adopting package moves its narrative into `@remarks`; the largest editorial pass                                                                                                                                                                                                                                   | Authored prose is deleted; only the generator restores it |
| 3    | Option 3 — the voice gate                                        | Nothing                                                                        | Silent voice and term drift becomes red; the summary-equality pairing                                       | none                                                                                   | Vendored-only scaffold release, one rewrite per target                                                                                                                                                                                                                                                                   | Remove the rules                                          |

## What the evidence shows

### Where one fact lives at more than one site

The absorb lane measured the duplication pairs directly. The table names each pair, its source site,
its guide site, and whether the sites agree.

| Fact                   | Source site                                                                                                                     | Guide site                                                                                                 | State                                      |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `Materializer` summary | `src/server/Materializer.ts:85-86`, "Represents the mutation spine: read the vendored host, re-derive the target, stage, swap." | `guides/scaffold.md:422`, "The mutation spine: read the vendored host, re-derive the target, stage, swap." | Agree, in a source voice and a guide voice |
| `Origin` summary       | `src/core/types.ts:9-10`, "Names how an artifact's content is produced."                                                        | `guides/scaffold.md:68`, "How an artifact's content is produced."                                          | Agree, in a source voice and a guide voice |
| `HOST_PATHS` summary   | `src/core/constants.ts:111-112`, "Lists the paths a target receives from the vendored data root, frozen."                       | `guides/scaffold.md:136`, "The paths a target receives from the vendored data root, frozen."               | Agree, in a source voice and a guide voice |
| The `Origin` members   | `src/core/types.ts:13-16`, the `@remarks` paragraph naming `host`, `template`, and `computed`                                   | `guides/scaffold.md:961-965`, the same members as a table                                                  | Agree, in prose and in rows                |
| The `Compiler` usage   | `src/core/Compiler.ts:74-77`, the `@example` fence                                                                              | `guides/scaffold.md:878-886`, the Compile fence                                                            | Diverged; see the following list           |

A voice disagreement, a substance disagreement, and an example disagreement are live in the tree,
and every parity check passes over each of them.

- **Voice.** `src/core/helpers.ts:61` reads "Encodes text as the exact lowercase hexadecimal form of
  its UTF-8 bytes." and `guides/scaffold.md:221` reads "Encode text as the exact lowercase
  hexadecimal form of its UTF-8 bytes." Each site answers to a different rule. The doc block answers
  to `.claude/rules/typescript.md:78-79`, which fixes the first sentence as third person with an `-s`
  verb, and satisfies it. The guide row answers to `.claude/rules/documentation.md:35`, which fixes a
  Surface-row description as a noun phrase, and violates it with an imperative.
  `ROADMAP.md:127-128` records the same class of repair — "imperative TSDoc summaries across `helpers.ts`
  where the rule asks the third person" — as an open seam of the `contract` package, inside the
  bullet that runs from `ROADMAP.md:67` to `:129`, not as a scaffold seam. The same shape recurs here
  at `src/core/factories.ts:8` ("Constructs a `Blueprint` from …"), which satisfies the doc-block
  rule, against `guides/scaffold.md:281` ("Construct a `Blueprint` from …"), which violates the guide
  rule.
- **Substance.** `src/core/types.ts:27-29` states that for `birth` ownership "audit never compares it
  and always reports it aligned, and a write creates it only while it is absent."
  `guides/scaffold.md:999-1002` states that "A later `repair` or `overwrite` call treats that path as
  aligned whether it is present or absent, so it neither restores missing bytes nor replaces present
  bytes." Those are different claims about the same behaviour.
- **Example.** `src/core/Compiler.ts:78` asserts `scaffolding.plan?.hash?.length // 16`. The guide's
  Compile fence at `guides/scaffold.md:884-885` reads `scaffolding.plan?.artifacts` and
  `scaffolding.stages`. Neither site executes. The fences transcribed at
  `tests/guides.test.ts:212-245` are the blueprint defaults, the compile refusal, and the error-code
  narrowing; the Compile fence at `guides/scaffold.md:878-886` carries no transcription, so each site
  states a behaviour nothing runs.

`README.md` restates the guide without any check over the restatement. The absorb lane recorded these
shared facts: the compile-compare-write pitch (`README.md:3-4`; `guides/scaffold.md:3-7`), the
vendored-set paragraphs (`README.md:6-23`; `guides/scaffold.md:9-27`), the install line
(`README.md:27-28`; `guides/scaffold.md:35-36`), the Node 22.12 line and the `npx` line
(`README.md:31-34`; `guides/scaffold.md:39-42`), the authority sentence (`README.md:39-40`;
`guides/scaffold.md:477-478`), the exit codes (`README.md:40`; `guides/scaffold.md:547-550`), the
verb list (`README.md:45-100`; `guides/scaffold.md:480-486`), the `--target` and `--json` flags
(`README.md:42-43`; `guides/scaffold.md:542-543`), the library split (`README.md:102-105`;
`guides/scaffold.md:1379-1383`), and the `createBlueprint` fence (`README.md:107-116`;
`guides/scaffold.md:1367-1376`). One of those pairs already disagrees: the
README's verb examples read `npx scaffold new router --src core,server` (`README.md:48`) where the
guide's command reference reads `scaffold <verb> [options]` (`guides/scaffold.md:518-530`).

### What the multi-site edits cost

The command `git log --since=2026-08-20 --name-only --format='%h %s' -- src guides tests README.md`
produced the commit set, filtered to the commits whose file list spans a `src/**` path,
`guides/scaffold.md`, and a `tests/**` path. The table gives each hash and its logged subject.

| Hash       | Subject                                                                                                                             |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `c16e3817` | Land the publish wave's debrief: peer edges in the catalog and the wave's laws in the canon                                         |
| `2146454a` | Conform scaffold to the fleet rules: the vendored-set prose, the documented compilers, the blueprint proof, the capability skips    |
| `f75f7c05` | Apply the verified src-audit fixes                                                                                                  |
| `43cf8ac8` | Prune the directories a removal empties, and teach the wave the pre-publish visit                                                   |
| `54e00824` | Close the A2 round: the helper extraction, the migration step, and the true sentences                                               |
| `1878fe7f` | Close the A1 round: state the canon invariant everywhere it ships                                                                   |
| `9e65e2f0` | 0.0.54                                                                                                                              |
| `ef1602b5` | Adopt the audit's prose fixes: delete the emphasis word and the two set counts                                                      |
| `25005961` | State the blocked-configs remedy from the disk manifest, anchor a written script to its key family, and pin the range-region ruling |
| `fa3a33b5` | Write the scripts region per script                                                                                                 |
| `85f8df30` | Let repair append the absent writable scripts instead of blocking                                                                   |
| `1b39fa01` | Refresh the writable scripts through repair and delegate prepack                                                                    |
| `dd3f986f` | Fire the mirror assertion only on a declared CommonJS claim                                                                         |
| `6447cd99` | Resolve declarations as TypeScript does, and restore Node's require set                                                             |
| `4369c32f` | Decide compile membership by the declaration, and runtime by the target                                                             |
| `c70b3fe0` | Enumerate Node's require formats completely, and bind the instrument by AST                                                         |
| `df941ec0` | Decide CommonJS support by what the target is                                                                                       |
| `e4af5459` | Make the guide describe the code two units left behind                                                                              |
| `ba948a53` | Write the manifest script region, and refuse a customized chain                                                                     |
| `06309dfa` | Refuse a plan that claims the manifest is not birth-owned                                                                           |
| `ecb8b778` | Leave a peer range to the author who declared it, and scope a refusal to what it blocks                                             |
| `6fece98b` | Take the accurate verb, and say what a digest actually covers                                                                       |
| `08bb37d3` | Verify the bytes a fetch actually returned, and settle two term collisions                                                          |
| `c9a57525` | Document the baselines a run reads and the note the release carries                                                                 |
| `807bfcd0` | Give every verb one baseline per surface and say which ruled                                                                        |
| `6e55db2a` | Make the live host baseline reachable, nameable, and discriminable                                                                  |
| `88f8ab88` | Carry the online-first fetch campaign to the verbs boundary                                                                         |
| `f6aa3633` | 0.0.47                                                                                                                              |
| `e4a990c0` | Windows wave: policy plugin method walk, hardened instruments, prepack emission                                                     |
| `641494b8` | Close the audit residue: the temporal words, the derivation TSDoc, the seam annotation                                              |
| `2efbb882` | Close the prose-and-shape readiness rows; register the execution function domain                                                    |
| `0db39212` | Delete the pass-through factories and make remove re-derive from the plan                                                           |
| `6f60abac` | Close the doors the toolchain repair did not visit, and gate what vendors to the fleet                                              |
| `a4e94883` | Raise the toolchain a target receives to the one this package runs                                                                  |
| `d22a2bfe` | Delete every count from the canon, and from the package that vendors it                                                             |

Lens O's reading of that list decides the shape of every option: the set is **dominated by prose
corrections, not by symbol renames**. "Make the guide describe the code two units left behind"
(`e4af5459`), "Take the accurate verb, and say what a digest actually covers" (`6fece98b`), "Adopt
the audit's prose fixes" (`ef1602b5`), and "Delete every count from the canon, and from the package
that vendors it" (`d22a2bfe`) are sentence repairs across a source file, the guide, and a test. A
mechanism that generates only the reference tables closes the derivable half of that cost and leaves
the narrative half where a human still writes it. That is the honest boundary of Option 1, and it is
the reason Option 2 stays on the table.

`ROADMAP.md` already carries the same class of work as open seams. `ROADMAP.md:120-129` records a
`below` cross-reference, a `both` naming no members, a `createStringFaults` read-count sentence, a
membership paragraph closing on its own editing history, the imperative `helpers.ts` TSDoc summaries,
and an aphoristic register shared by the guide and the test comments. `ROADMAP.md:274-277` records a
"Guide wording" row at `guides/src/supervisor.md:3321` and a "TSDoc voice" row over
`app/server/helpers.ts` and `app/core/factories.ts`. Every one of those rows is a prose repair that
no gate reports.

### What the checks prove and what they miss

Each catalog check in the following table runs in this repository and can still fail, and the table
gives its site and its failure meaning.

| Check                  | Site                                                   | What a failure means                                                                                                     |
| ---------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| NV, FL                 | `tests/guides.test.ts:80-97`                           | A renamed heading, an empty `Surface`, `Methods`, or `Tests` extraction, or an unlisted fence language                   |
| SB, barrel to guide    | `tests/guides.test.ts:99-107`                          | A public export nobody documented                                                                                        |
| SB, guide to barrel    | `tests/guides.test.ts:109-117`                         | A guide row naming a symbol no barrel exports                                                                            |
| MB plus class-no-extra | `tests/guides.test.ts:119-151`                         | A method table disagreeing with the declared members, or a class exposing undocumented public behaviour                  |
| LI                     | `tests/guides.test.ts:171-180`                         | A relative link resolving to nothing                                                                                     |
| FI                     | `tests/guides.test.ts:182-197`                         | A fence importing a name the package does not export                                                                     |
| Usage alignment        | `tests/guides.test.ts:201-210`                         | The guide's `scaffold --help` block differing from `renderUsage()` — the one exact generated-shape assertion in the tree |
| Executed fences        | `tests/guides.test.ts:212-245`, `:247-300`, `:302-361` | A documented behaviour returning something else                                                                          |
| Pinned removals        | `tests/guides.test.ts:153-169`                         | `Copy`, `Repository`, or the `files` method returning                                                                    |
| TE, `guide.tests()`    | `tests/guides.test.ts:89`                              | An empty `## Tests` section, asserted inside NV; the emitted bullets' own resolution is folded into LI                   |

What the catalog declares and this repository does not run, or cannot reach, is the other half.

| Check or surface       | State here                                                                                                   | Pointer                                                                                                                                    |
| ---------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| EX, `findUnexampled`   | Declared in `@orkestrel/guide` and absent from the import list, so scaffold never runs it; emitter does      | `tests/guides.test.ts:3-16`; `/home/user/fleet/emitter/tests/guides.test.ts:116-125`; `/home/user/fleet/guide/src/core/helpers.ts:749-759` |
| SB, direct to barrel   | Not run here, because `source.hidden()` and `source.exports()` are never called; emitter and markdown run it | `tests/guides.test.ts:3-16`; `/home/user/fleet/emitter/tests/guides.test.ts:73-88`                                                         |
| EX content             | Presence-only by specification: "fence and JSDoc **content** are never checked"                              | `guides/guide.md:409`                                                                                                                      |
| TSDoc text             | Nothing in the tree reads it                                                                                 | `tmp/cursor/docs-absorb.result.md` § Distillate                                                                                            |
| Doc-comment shape      | `.oxfmtrc.json` sets no `jsdoc` key, so no comment body is normalized                                        | `.oxfmtrc.json`                                                                                                                            |
| The substitution table | Not swept: the sweeps in the following paragraph return no substitution-table term in a banned sense         | `configs/policy.ts:197`, `:300`; `src/core/templates.ts:1442`                                                                              |
| `README.md`            | No bijection partner and no assertion anywhere in `tests/**`                                                 | `tmp/cursor/docs-absorb.result.md` § Distillate                                                                                            |

**The substitution-table row rests on these sweeps.** `grep -rniE '\b(should|simply|leverage)\b' src
configs tests` returns no hit. `grep -rniE 'substitution|banned' src configs tests` returns the
policy plugin's `banned` doc comment and mock-API message (`configs/policy.ts:197`, `:300`), the
templates' `declaration substitution` comment (`src/core/templates.ts:1442`), and the same terms on
the test side as a fixture prefix, a code identifier, and a test title
(`tests/src/core/templates.test.ts:1382`, `tests/setupPolicy.ts:1819`, `tests/guides.test.ts:363`).
No hit is an instrument that sweeps for a substitution-table term, and the first pattern covers
`should`, `simply`, and `leverage` alone, so the sweep bounds the claim to those terms.

**TE runs here, and its resolution pass is folded into LI.** `tests/guides.test.ts:89` calls
`guide.tests()` inside the NV assertion, so an empty `## Tests` section reds already.
`guides/scaffold.md:1756-1792` is a bullet list of
Markdown links (the `grep -c` count of `](` over that span returned `18`), and `Guide.links()`
(`/home/user/fleet/guide/src/core/Guide.ts:64`, from `extractLinks` at `helpers.ts:1349`) collects
every link in the document, so the LI check at `tests/guides.test.ts:171-180` already resolves each
test path. Any option's check table must score TE as asserted for non-vacuity and covered for
resolution by a broader check, rather than as an absent one.

**The presence guard is the trap.** `tests/guides.test.ts:249`, `:304-306`, and `:363-369` assert
`toContain` on guide sentences. `.claude/rules/documentation.md` § Parity rules on exactly that
shape: "Asserting that the sentence appears is not asserting that it is true." An option that scores
itself on retained checks must score those as `none` against a behaviour claim, and name them as
presence guards. This proposal does so in every check block that follows.

Reading across the check tables: the gates that exist are strong on **symbol identity** and
near-absent on **sentence truth**, and every change kind you named as expensive falls in the
sentence-truth class. The `birth` substance disagreement, the `Encodes`/`Encode` voice disagreement, and the
`Compiler` example disagreement are all live in the tree with every gate green.

### What the installed tools permit

The table gives each tool at its installed version, what it reads, what it emits, what it lints or
formats, whether an oxlint JS plugin can reach it, and whether using it declares a package.

| Tool                                  | Installed version                              | Parses                                                                                                                              | Emits                                                                                        | Lints or formats                                                                                                                                                           | Reachable from a JS plugin                     | Dependency delta                                                                               |
| ------------------------------------- | ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `@microsoft/tsdoc`                    | `0.16.0`, transitive only                      | TSDoc into a `DocComment` tree                                                                                                      | Plain text and TSDoc                                                                         | no                                                                                                                                                                         | not applicable                                 | Declaring it is a manifest change                                                              |
| `@microsoft/api-extractor`            | `7.59.0`, declared                             | TypeScript declarations and their TSDoc                                                                                             | `.d.ts` rollup; an `.api.md` report; an `.api.json` doc model when `docModel.enabled` is set | no                                                                                                                                                                         | not applicable                                 | none, and the doc model needs a second configured invocation                                   |
| `@microsoft/api-extractor-model`      | `7.33.11`, transitive only                     | `.api.json`, exposing `tsdocComment` per item                                                                                       | no                                                                                           | no                                                                                                                                                                         | not applicable                                 | Declaring it is a manifest change                                                              |
| `typescript`                          | `7.0.2`, development edge                      | JSDoc through `typescript/unstable/ast`'s `getJSDocTags` and `typescript/unstable/sync`'s `Symbol.getDocumentationComment(checker)` | Declarations that keep the whole doc block                                                   | no                                                                                                                                                                         | not applicable                                 | none as a development edge; a runtime import moves it                                          |
| `oxlint`                              | `1.80.0`, declared                             | JS, JSX, TS, TSX, and DTS only (`plugins-dev.d.ts:4129`)                                                                            | no                                                                                           | JSDoc structure rules; comment text through `getAllComments` (`plugins-dev.d.ts:2697`) and `CommentType.value` (`:1315-1318`), reported through `context.report` (`:3835`) | yes, for source comment text; no, for Markdown | none                                                                                           |
| `oxfmt`                               | `0.65.0`, declared                             | JS, TS, JSON, YAML, Markdown, MDX, and more                                                                                         | Formatted bytes                                                                              | Formats Markdown today; the `jsdoc` option normalizes doc comments and defaults to disabled                                                                                | not applicable                                 | none                                                                                           |
| `@orkestrel/guide`                    | `^0.0.17`, development edge fleet-wide         | Text-only line scanners, explicitly not the compiler API (`/home/user/fleet/guide/src/core/sources/Source.ts:24-28`)                | Check populations, no Markdown                                                               | The catalog checks                                                                                                                                                         | not applicable                                 | none                                                                                           |
| `@orkestrel/markdown`                 | Runtime edge of scaffold and guide             | `parseDocument`, `parseProvenance` keeping source spans                                                                             | `renderMarkdown`, canonical Markdown                                                         | no                                                                                                                                                                         | not applicable                                 | none                                                                                           |
| `@orkestrel/template`                 | Runtime edge of scaffold                       | Template definitions                                                                                                                | `fillTemplate`                                                                               | no                                                                                                                                                                         | not applicable                                 | none                                                                                           |
| TypeDoc and `typedoc-plugin-markdown` | Not installed                                  | TSDoc plus unenforced JSDoc tags                                                                                                    | HTML natively; Markdown through the plugin                                                   | no                                                                                                                                                                         | not applicable                                 | `typedoc` `0.28.20` adds `lunr`, `yaml`, `minimatch`, `markdown-it`, and `@gerrit0/mini-shiki` |
| `@microsoft/api-documenter`           | Not installed, `7.30.13` on the registry       | `.api.json`                                                                                                                         | Markdown and DocFX YAML                                                                      | no                                                                                                                                                                         | not applicable                                 | Adds a package and its dependencies                                                            |
| Vale, textlint, markdownlint          | Not installed                                  | Prose                                                                                                                               | no                                                                                           | Prose rules; Vale reaches comment text inside source through `comment.line` and `comment.block` scopes                                                                     | not applicable                                 | Each adds a package or a separate binary                                                       |
| `llms.txt`                            | Not installed, because it is a file convention | no                                                                                                                                  | no                                                                                           | no                                                                                                                                                                         | not applicable                                 | none                                                                                           |

**Every fetched precedent keeps the comment on the declaration.** Rust, Go, Python, Elixir,
Deno/JSR, and Java each attach documentation to the symbol it describes, in the same source file
(`tmp/units/docs-research-web-report.md` § Distillate). Rust, Go, and Python go further and execute
the embedded example: rustdoc compiles and runs each doc-test at `cargo test` time, Go compiles and
optionally runs each `Example` function inside `go test` against a `// Output:` comment, and Python's
`doctest` executes each `>>>` line against a copy of the module's globals. Deno's `deno doc` renders
JSDoc to text, HTML, or JSON, and JSR's score rewards documenting a share of a package's exported
symbols, requiring at least 80% before the Documentation category scores fully. None of them
maintains a parallel authored summary. That is the pattern Option 1 and Option 2 both adopt, and it
is the pattern this repository already breaks at each pair listed under § Where one fact lives at
more than one site.

**No prose linter is installed, and Vale is the one that could read comment text.** Vale maps a file
extension to a markup format so that format's parser applies inside a source file, exposing
`comment.line` and `comment.block` scopes. Adopting it declares a Go binary, a Rust language server,
or a TypeScript action plus style packages, which `AGENTS.md` § Non-negotiable rules bars without
your explicit request. Option 3 reaches the same comment text through the `policy` plugin that is
already registered at `.oxlintrc.json:5`, at no dependency cost.

### The constraints every option must satisfy

Lens O fixed these constraints, each with the pointer that establishes it. Every option in this
proposal is scored against them.

- **C1 — No added npm package without your explicit request.** `AGENTS.md` § Non-negotiable rules.
  `@microsoft/api-extractor` `7.59.0` is already declared, but `@microsoft/tsdoc` `0.16.0` and
  `@microsoft/api-extractor-model` `7.33.11` are transitive only, so importing either from repository
  code is a manifest change and an option reporting `none` beside such an import has misstated its
  delta.
- **C2 — oxfmt formats Markdown and cannot carry a prose rule.** `npx oxfmt --config .oxfmtrc.json
--check .` returned `Finished in 8083ms on 221 files`, red on `ROADMAP.md` alone, in a run taken at
  `792a9739`; `ROADMAP.md` was repaired as `a74686b8`. Its configuration
  surface is formatting only: `proseWrap`, `printWidth`, `embeddedLanguageFormatting`, `jsdoc`, and
  `ignorePatterns`. It can move whitespace and wrapping. It cannot move a substitution-table rule, a
  bijection, or a voice rule.
- **C3 — An oxlint JS plugin cannot read Markdown, and can read comment text.**
  `plugins-dev.d.ts:4129` declares `type Language = "js" | "jsx" | "ts" | "tsx" | "dts"`, and oxc.rs
  states non-JavaScript formats are "explicitly not supported yet". Comment text is reachable through
  `getAllComments` (`:2697`) and `CommentType.value` (`:1315-1318`); `getJSDocComment` is
  `@deprecated` at `:2749-2756`. So a TSDoc prose rule can move into the `policy` plugin and a guide
  prose rule cannot.
- **C4 — The JS plugin surface is alpha and outside semver.**
  `node_modules/oxlint/configuration_schema.json:59-60`; `dist/index.d.ts:523-529`. The repository
  already carries that exposure through `.oxlintrc.json:5`, so adding a rule to the existing plugin
  adds no risk class. Depending on a capability the installed typings do not expose does:
  `definePlugin` and `defineRule` are absent from `node_modules/oxlint/`.
- **C5 — TSDoc is already a shipped surface, and the doc model is not wired.**
  `dist/src/core/index.d.ts` measured at 229169 bytes carries `@remarks` 129, `@example` 87, and
  `{@link` 77 (`grep -c` over the built rollup), and plain `npx tsc --declaration
--emitDeclarationOnly` keeps the whole block. Separately, `unplugin-dts` hard-codes `docModel: {
enabled: false }` at `unplugin-dts.BU1tibsL.mjs:549-554` and this repository configures no
  `docModel`, so a doc-model path needs a second api-extractor invocation with its own configuration
  and a build inside the documentation loop.
- **C6 — A mirror is fetched bytes and is never rewritten.** `guides/README.md:33-37` states that
  every `guides/<name>.md` file is byte-identical to that package's `main`, and
  `src/core/constants.ts:122-123` states that a workspace never mirrors its own guide, which is why
  `scaffold.md` is this repository's exception.
  `.claude/rules/documentation.md` § Parity adds that "a rewritten copy is a translation".
  `HOST_PATHS` vendors `guides/guide.md` and `guides/scaffold.md` as host-owned bytes
  (`src/core/constants.ts:111-152`), and `.agents/orchestration.md` § Publishing the fleet forbids
  editing a vendored file inside a target because `repair` restores it and `scaffold audit` reports
  the edit as drift.
- **C7 — The `@orkestrel/guide` edge is development-only, and the suite it powers is
  package-owned.** Every fleet package except `guide` itself (`table` included, per `/home/user/fleet/table/package.json:70`), plus `scaffold`, declares
  `"@orkestrel/guide": "^0.0.17"` in
  `devDependencies`, consumed only from `tests/guides.test.ts`, and `host.json` names no
  `tests/guides.test.ts` destination. So a check-contract change obliges a re-pin plus gates per
  package and no runtime republish, but a non-additive change obliges a hand edit in each package's
  own `tests/guides.test.ts`.
- **C8 — A runtime-primitive change is a republish cascade.** Direct runtime dependents of
  `@orkestrel/markdown` are `@orkestrel/guide` and `@orkestrel/scaffold` at L3; of
  `@orkestrel/template`, `@orkestrel/interpret` and `@orkestrel/scaffold` at L3; the cascade reaches
  `@orkestrel/brief` at L4. A vendored-byte change instead bumps and publishes `scaffold`, then
  obliges a per-target re-pin, `repair`, and a gate run.
- **C9 — The writing law binds generated bytes, and it fixes different grammatical forms.**
  `.claude/rules/typescript.md:78-79` fixes the TSDoc first sentence as third person with an `-s`
  verb that never repeats the symbol's name. `.claude/rules/documentation.md:35` fixes a guide
  tagline and a Surface-row description as noun phrases. A generator therefore cannot copy a TSDoc
  summary into a Surface row without either transforming it or amending the rule — and a transform is
  a specified, tested mechanism rather than a projection anyone can assume.
- **C10 — The guide's structure is a checked contract.** `.claude/rules/documentation.md` § Parity
  fixes methods under `## Methods`, one method table per interface keyed by its backticked name, an
  exact match against call-signature members, readonly data properties in the `## Surface` row, and
  the export-to-documentation bijection in each direction. `guides/README.md` § By concept is the
  manifest `parseManifest` reads at `tests/guides.test.ts:61-73`. Generated output that misses a
  shape reds the suite that already exists.
- **C11 — Executed fences survive whatever produces the prose.** `.claude/rules/tests.md` §
  Cross-cutting proofs assigns `tests/guides.test.ts` the obligation that "every executable fence
  returns what the guide says it returns" and requires transcribing each flagship fence. An option
  that relocates a fence into an `@example` tag relocates that transcription and must name where it
  moves to.
- **C12 — No second source-language analyzer.** `AGENTS.md` § Project model. `typescript` `7.0.2`
  already exposes the JSDoc readers through its `unstable/ast` and `unstable/sync` entries, and `@orkestrel/guide`'s `Source` is text-only by
  construction and explicitly not the compiler API
  (`/home/user/fleet/guide/src/core/sources/Source.ts:24-28`). Reading TSDoc is a capability `guide`
  does not have, so an option must place that reader deliberately.
- **C13 — Markdown generation primitives are already declared runtime dependencies.**
  `renderMarkdown` (`/home/user/fleet/markdown/guides/markdown.md:119`), `parseProvenance` keeping
  source spans (`:75`), `parseDocument` (`:74`), and `fillTemplate`
  (`/home/user/fleet/template/guides/template.md:104`) all sit in packages scaffold declares at
  `guides/README.md:41-46`. Node ships no Markdown renderer, so `AGENTS.md` § Non-negotiable rules
  requires reusing those rather than writing a local equivalent.
- **C14 — The generated-region precedent exists and is narrow.** `.claude/agents/orkestrel.md:44-99`
  sits between `<!-- orkestrel:catalog -->` and `<!-- /orkestrel:catalog -->`, defined at
  `src/core/constants.ts:290-299` and regenerated by `Materializer.catalog`
  (`src/server/Materializer.ts:386-396`) through `#recatalog` (`:1112-1161`). No such markers exist
  in `guides/scaffold.md`.
- **C15 — `src/bin` has no barrel and sits outside the bijection while carrying doc blocks.**
  `guides/README.md:16-17`. Measured: `grep -c '^\s*/\*\*' src/bin/*.ts` returned 73 doc blocks, and
  `grep -rhE '^export (const|function|class|interface|type|enum)' src/bin | wc -l` returned 69
  top-level exports. A TSDoc-sourced generator must state what it does with a face the bijection does
  not reach.

## Option 1 — reference regions rendered from TSDoc (recommended)

### Mechanism

The guide stays one authored document. Its reference tables become marker-bounded regions rendered
from the TSDoc block on each declaration. The table names the source of truth for each documentary
fact and the reader that resolves it.

| Fact                               | Source of truth                                                       | Reader                                                     |
| ---------------------------------- | --------------------------------------------------------------------- | ---------------------------------------------------------- |
| A `## Surface` row's summary       | The TSDoc first sentence on the declaration                           | `@orkestrel/guide`'s text-only scanner                     |
| Export membership and kind         | The environment barrel, `src/core/index.ts` and `src/server/index.ts` | The scanner's existing `surface` and `exports` populations |
| A `## Methods` row's summary       | The interface member's TSDoc first sentence                           | The same scanner                                           |
| The `README.md` head regions       | The guide passages named under Stage 3, one region per span           | The same renderer                                          |
| Every `README.md` per-verb section | `README.md`, authored                                                 | A human                                                    |
| Every narrative section            | `guides/scaffold.md`, authored                                        | A human, and `tests/guides.test.ts`                        |
| The H1 blockquote tagline          | `guides/scaffold.md`, authored                                        | A human                                                    |

**The carrier is a marker-bounded region inside the authored guide.** Each generated table sits
between an HTML comment pair modelled exactly on `CATALOG_OPENING_MARKER` and
`CATALOG_CLOSING_MARKER` (`src/core/constants.ts:290-299`), the pair `Materializer.catalog` already
splices at `src/server/Materializer.ts:386-396`. HTML comments render as nothing, so a reader on
GitHub sees the guide unchanged. The opening marker carries an environment qualifier and a kind
qualifier, so the marker text is designed for a file that holds several regions. The existing
splice does not write them: `Materializer.catalog` (`src/server/Materializer.ts:386-396`) rewrites
`CATALOG_AGENT_PATH` alone through `#rewrite` (`:953-974`), and `#recatalog` (`:1112-1161`) is
private, bound to the catalog markers (`src/core/constants.ts:290`, `:299`), and emits only the
package table, so the render carries its own splice, per R4.

**The extractor is `@orkestrel/guide`'s text-only scanner, extended to summaries.** `Source` already
walks a declaration's leading doc-comment chain: `Source.examples()`
(`/home/user/fleet/guide/src/core/sources/Source.ts:115-120`) reaches `extractExampleLines` and
`extractExamples` (`helpers.ts:1398`, `:1492`). A first-sentence reader is an extension of that same
scan, not a second analyzer, which keeps C12 satisfied and the dependency delta at none. The
TypeScript compiler API stays the **control** the scanner is measured against —
`typescript/unstable/ast`'s `getJSDocTags` and `typescript/unstable/sync`'s
`Symbol.getDocumentationComment(checker)`, which returns a string rather than display parts and read
the summary and every tag over the core project in 61 ms — and is never a shipped import, because a
`scaffold` verb importing `typescript` would move it onto scaffold's runtime edge (C1, C5).

**The render lives in `@orkestrel/guide`, and scaffold seeds and vendors.** The proposed shape is a
`render` direction beside the existing `Guide` and `Source` extraction — a single-word entity API per
`AGENTS.md` § Design laws. Treat that name as a proposal the first unit settles, not as an existing
symbol; `@orkestrel/guide` exports no such member today. It is invoked by a package `docs` script
(`npm run docs`) and by the region-currency assertion in each package's own `tests/guides.test.ts`.
No build is required, because nothing reads `dist/`. Scaffold's part is to seed the script and the
markers in the `new` templates and to carry the prose rules in the vendored `configs/policy.ts`,
which is Option 3.

**One rule amendment is required, and it is the decision you must take before Stage 1.**
`.claude/rules/documentation.md:35` reads "The TSDoc voice rule governs a doc block; a guide tagline
and a Surface-row description are noun phrases." Amend it so a Surface-row description and a
Methods-row summary are the symbol's TSDoc first sentence with each `{@link X}` rendered as
`` `X` ``, and so the noun-phrase form scopes to the H1 blockquote tagline alone. The tagline stays
authored until `@packageDocumentation` exists fleet-wide; only `test` declares one today, on
`src/browser/index.ts`.

**A frozen opener table is refused.** Lens B proposed `SUMMARY_VERBS` in `src/core/constants.ts`,
mapping each sanctioned opening verb to a noun-phrase form and an imperative form, so the generator
could keep the existing guide voice. The ruling refuses it: a frozen opener table is a second wording
that must be maintained and can be wrong, and C9 requires any transform to be specified and tested,
which verbatim derivation avoids entirely. Lens B's own risk row concedes the set is unproven over
the real corpus.

**The stages, in order.** Stage 1 marks the `## Surface` tables and derives their summaries, landed
only after a dry-run diff against the committed `guides/scaffold.md`. Stage 2 marks the `## Methods`
tables the same way. Stage 3 marks one region per `README.md` span, each rendered from a named
guide passage: the pitch (`README.md:3-4`, from the blockquote at `guides/scaffold.md:3-7`), the
vendored-set paragraphs (`:6-23`, from `guides/scaffold.md:9-27`), the install line (`:27-28`, from
`:35-36`), the runtime and `npx` lines (`:31-34`, from `:39-42`), the authority and exit-code sentence
(`:39-40`, from `:477-478` and `:547-550`), the `--target` and `--json` flags (`:42-43`, from
`:542-543`), and a verb-table region inserted at `README.md:44`, between the flags and the per-verb sections,
rendered from the guide's command reference (`:518-530`). The per-verb sections at `README.md:45-100`
sit outside every region and stay authored, so Stage 3 does not reach them. Lens
B's carry-forward mode —
membership and order generated, the summary cell carried forward verbatim by backticked name and left
empty for a symbol the guide does not yet cover — is the **fallback** for a package whose dry-run
diff shows the scanner misreading, not a separate stage. An empty carried cell fails the region
check, so an author writes the sentence before the gate goes green.

### Worked example

`Origin` shows what Option 1 leaves alone. Its TSDoc is unchanged — that is the point of the option
(`src/core/types.ts:9-18`).

```ts
/**
 * Names how an artifact's content is produced.
 *
 * @remarks
 * `host` is byte-copied from this package's vendored data root. `template` is
 * filled from a frozen template definition. `computed` is derived by this
 * package's own combination logic. Origin says nothing about what scaffold
 * claims at the path; {@link Ownership} says that.
 */
export type Origin = 'host' | 'template' | 'computed'
```

The generated `## Surface` region that TSDoc produces carries the first sentence verbatim.

```md
#### Types

<!-- orkestrel:surface core types -->

| Name        | Kind | Summary                                           |
| ----------- | ---- | ------------------------------------------------- |
| `Origin`    | type | Names how an artifact's content is produced.      |
| `Ownership` | type | Names what scaffold claims at an artifact's path. |

<!-- /orkestrel:surface core types -->
```

The `Origin` narrative and its per-member table stay authored (`guides/scaffold.md:961-965`), because
a per-member table over a free-prose `@remarks` block is a transformation no projection rule can
check.

```md
| `Origin`   | Content comes from                          |
| ---------- | ------------------------------------------- |
| `host`     | Byte-copied from the vendored data root     |
| `template` | Filled from a frozen template definition    |
| `computed` | Derived by this package's combination logic |
```

`createBlueprint` shows what the derivation repairs. The declaration reads "Constructs a
{@link Blueprint} from a name and the fields that differ from the defaults." (`src/core/factories.ts:8`)
and the guide row reads "Construct a `Blueprint` from a name and the fields that differ from the
defaults." (`guides/scaffold.md:281`). Under the amended rule the row is derived, and the pair closes.

```md
| Name              | Kind     | Summary                                                                            |
| ----------------- | -------- | ---------------------------------------------------------------------------------- |
| `createBlueprint` | function | Constructs a `Blueprint` from a name and the fields that differ from the defaults. |
```

The `{@link Blueprint}` inline tag renders as the backticked token `` `Blueprint` ``, resolved by
looking the name up in the surface population the scanner already holds. A `{@link}` naming a symbol
outside the barrel renders as inline code, and the renderer reports it.

### Edit cost

The table gives the files a developer edits today and under Option 1, with the gate that reds on a
forgotten site in each state.

| Change kind               | Edited today                                                                                                                                                                                                                                  | Edited under Option 1                                                                                                                                                                                                         | Gate that catches a forgotten site                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Rename an export          | The declaration and its TSDoc; every call site; every `{@link}` naming it; the `## Surface` row; the `## Methods` row where behavioural; every fence importing it; `README.md` where named; the fence transcription in `tests/guides.test.ts` | The declaration and its TSDoc; every call site; every `{@link}` carried on another declaration; every fence importing it; every authored prose mention; the fence transcription in `tests/guides.test.ts`; run `npm run docs` | Today: the typecheck for call sites and for the transcription, SB in each direction for the rows, MB for the method rows, FI for the fences, and nothing for `README.md` or for a `{@link}`. Under Option 1: the typecheck for call sites and for the transcription, FI for the fences, region currency for the generated rows, the README regions at Stage 3, the renderer's own report for a `{@link}` in a rendered first sentence that names no export, `none` for a `{@link}` inside an `@remarks` block, and `none` for an authored prose mention |
| Change a symbol's summary | The TSDoc block and the `## Surface` cell, in different words each time                                                                                                                                                                       | The TSDoc block; run `npm run docs`                                                                                                                                                                                           | Today: nothing. Under Option 1: region currency                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Add an options field      | The interface in `*/types.ts`; the implementation; the `@remarks` describing the short field; the authored guide passage                                                                                                                      | Unchanged                                                                                                                                                                                                                     | Today and under Option 1: nothing. SB compares symbol keys and MB compares call-signature members, so a readonly data property is invisible to each                                                                                                                                                                                                                                                                                                                                                                                                     |
| Change a behaviour claim  | The TSDoc block; the guide passage; `README.md` where the pitch repeats it; `## Limits` where it bounds one                                                                                                                                   | Unchanged for the narrative; the summary sentence follows the declaration                                                                                                                                                     | Today and under Option 1: nothing, unless the claim sits under an executed fence. The `birth` disagreement is the proof this row stays open                                                                                                                                                                                                                                                                                                                                                                                                             |
| Add a documented limit    | `## Limits`; the owning symbol's `@remarks`; the test or observation that bounds it                                                                                                                                                           | Unchanged                                                                                                                                                                                                                     | Today and under Option 1: nothing. `## Limits` has no bijection partner                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Add a CLI flag            | `src/bin/CLI.ts`; `renderUsage` in `src/bin/helpers.ts`; the guide's `## Command line` section and its `scaffold --help` block; `README.md`; tests                                                                                            | The same, minus the `README.md` verb table at Stage 3                                                                                                                                                                         | Today: the `--help` block alone, at `tests/guides.test.ts:201-210`. Under Option 1 at Stage 3: the README region as well                                                                                                                                                                                                                                                                                                                                                                                                                                |

Option 1 removes the Surface site, the Methods site, and the README-head site. It removes no
narrative site. Measured against the commit list under § What the multi-site edits cost, that closes
the mechanically derivable half of the cost and leaves the half a human still writes.

### Checks

The table rules on every check in the catalog, naming each tautology and its replacement.

| Check                           | Ruling under Option 1                                                                                                                                                                                                                                                    | Where it lives                                                                            |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| SB, barrel to guide             | **Becomes tautological.** The generator writes the guide's rows from the same barrel SB reads, so the assertion can only fail when regeneration was skipped. Replaced by region currency, which regenerates and compares bytes and covers the summary text SB never read | `tests/guides.test.ts:99-107`, retained as the regeneration guard beside its replacement  |
| SB, guide to barrel             | **Becomes tautological**, on the same reasoning: the generator writes each row from the barrel, so a guide row naming a symbol no barrel exports can appear only when regeneration was skipped. Replaced by region currency                                              | `tests/guides.test.ts:109-117`, retained as the regeneration guard beside its replacement |
| SB, direct to barrel            | **Adopted.** Unrun in scaffold today, real everywhere, and unaffected by generation because it compares the declaring files against the barrel                                                                                                                           | `tests/guides.test.ts`, calling `source.hidden()` and `source.exports()`                  |
| MB, bijection half              | **Becomes tautological at Stage 2**, on SB's reasoning, and is replaced by region currency over the Methods regions                                                                                                                                                      | `tests/guides.test.ts:119-151`                                                            |
| MB, class-no-extra              | **Stays real and unchanged.** It compares the implementing class against its interface, a source fact no projection touches                                                                                                                                              | Unchanged                                                                                 |
| LI                              | **Survives and widens.** It covers the guide's links, the `## Tests` bullets (which is where TE is folded in), and the links inside the README regions at Stage 3                                                                                                        | `tests/guides.test.ts:171-180`                                                            |
| TE                              | **Survives unchanged.** Non-vacuity is asserted inside NV and the emitted bullets' resolution stays with LI, per the ruling under § What the checks prove and what they miss                                                                                             | `tests/guides.test.ts:89`; `:171-180`                                                     |
| Pinned removals                 | **Survives unchanged.** It asserts that `Copy`, `Repository`, and the `files` method stay absent, a source fact no projection touches                                                                                                                                    | `tests/guides.test.ts:153-169`                                                            |
| EX                              | **Adopted in scaffold** through `findUnexampled`, reading a leading `@example` tag. Presence-only by specification, and named as such                                                                                                                                    | `tests/guides.test.ts`, importing `findUnexampled`                                        |
| NV                              | **Survives and gains force.** A region that regenerates empty fails NV rather than shipping an empty table                                                                                                                                                               | `tests/guides.test.ts:80-97`                                                              |
| FL                              | **Survives unchanged.** Regions hold tables, never fences                                                                                                                                                                                                                | `tests/guides.test.ts:80-97`                                                              |
| FI                              | **Survives unchanged**                                                                                                                                                                                                                                                   | `tests/guides.test.ts:182-197`                                                            |
| Executed fences                 | **Survive unchanged**, and remain the only proof a prose claim is true                                                                                                                                                                                                   | `tests/guides.test.ts:212-361`                                                            |
| The `toContain` presence guards | **Stay presence-only and are named as such.** They score `none` against a behaviour claim                                                                                                                                                                                | `tests/guides.test.ts:249`, `:304-306`, `:363-369`                                        |
| Usage alignment                 | **Survives unchanged**, and stays the exact generated-shape precedent this option follows                                                                                                                                                                                | `tests/guides.test.ts:201-210`                                                            |

Option 1 adds these checks, each falsifiable by a hand edit.

| Added check            | What it proves                                                                                                                                          | Where it lives                     |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| Region currency        | Rendering each region from source reproduces the file's bytes exactly. Hand-edit a generated row and it reds                                            | `tests/guides.test.ts`             |
| Region containment     | No authored byte sits inside a region, and no Surface or Methods table sits outside one                                                                 | The same recompute                 |
| Marker integrity       | A file that lost a marker fails loudly rather than silently skipping regeneration                                                                       | The same recompute                 |
| README region currency | Each marker-bounded span in `README.md` matches the render. `README.md` has no assertion anywhere in `tests/**` today, so this is the check it acquires | `tests/guides.test.ts`, at Stage 3 |
| Formatter stability    | `npx oxfmt --config .oxfmtrc.json --check guides/scaffold.md` stays green after a regeneration                                                          | The `format:check` gate            |

### Humans and agents

One artifact serves both readers, and Option 1 adds no second one.

- **The voice law is stated once and enforced by Option 3.** `AGENTS.md` § Writing governs prose
  everywhere, `AGENTS.md` § Instruction files governs an executed file, `.claude/rules/writing.md`
  adds what a developer audience decides, and `.claude/rules/typescript.md:76-88` owns the doc block.
  Option 1 adds one _derivation_ rule at `.claude/rules/documentation.md:35` and no second _statement_
  site. The renderer's own source restates no convention, because a rule gets one home.
- **The hover, the guide row, and the rollup carry one sentence.** The amended rule makes the
  Surface-row description the TSDoc first sentence, so a developer hovering `Origin` in an editor, a
  reader scanning `guides/scaffold.md` § Surface, and a consumer reading the installed
  `dist/src/core/index.d.ts` all read the same words. The rollup keeps them: measured at 229169 bytes
  with `@remarks` 129, `@example` 87, and `{@link` 77, and plain `tsc --declaration
--emitDeclarationOnly` behaves the same way.
- **An agent's entry stays `AGENTS.md`, the rule map, and `guides/README.md`.** Option 1 adds no
  agent-facing index. `guides/scaffold.md` loads as one file with the reference tables inline, which
  is the property a split file destroys and the reason `guides/reference.md` is refused.
- **A human on GitHub sees today's guide.** The markers are HTML comments and render as nothing. The
  reader who wants the summary without opening the source still gets it in the same place.

### Migration

The order follows the edge classes, so nothing republishes that need not.

1. **`@orkestrel/guide` gains the render direction and the region check, then bumps and publishes on
   its own account**, because its own published surface moved. Every consumer holds it on a
   development edge — every fleet package except `guide` itself (`table` included, per `/home/user/fleet/table/package.json:70`), plus `scaffold`, declares
   `"@orkestrel/guide": "^0.0.17"` in
   `devDependencies`, consumed only from `tests/guides.test.ts` — so each consumer re-pins, proves its
   gates green, and commits to `main` **without bumping or republishing**. No cascade starts here.
2. **Scaffold seeds the script and the markers in the `new` templates.** That moves `dist/src`, so
   `@orkestrel/scaffold` bumps and publishes on its own account, and propagates to targets as files
   through a re-pin and `repair` rather than as a runtime cascade. Where Option 3 lands first, this
   seed rides that vendored release rather than adding a second one. This is the publish Option 1
   costs, and the blockquote, § Summary, the glance table, and Claim 5 all price it.
3. **Each package adds its markers and runs `npm run docs` on its own schedule.** The region check is
   inert where no marker exists, and `tests/guides.test.ts` is package-owned — `host.json` names no
   destination for it — so adoption is per-package and reversible. A package that adopts nothing keeps
   a fully authored guide and its existing suite.
4. **`probe` is named explicitly.** Its `tests/guides.test.ts` hand-rolls an equivalent parity harness
   from `@src/core` and `@src/server` rather than importing `@orkestrel/guide`
   (`/home/user/fleet/probe/tests/guides.test.ts:1-9`), so a fleet-wide check change misses it. It
   either adopts the package or keeps an authored guide.

**What stays byte-identical for mirrors: everything.** A `guides/<name>.md` mirror is fetched bytes
from that package's own `main` at one path — `Upstream.#guideURL` resolves
`{repositoryBase}/{ORKESTREL_SCOPE}/{bare}/refs/heads/{branch}/{nameToGuide(name)}`
(`src/server/Upstream.ts:737-740`) and `Materializer.mirror` writes what it fetched
(`src/server/Materializer.ts:323-366`). A mirror carries whatever the upstream committed, regions
included. Because oxfmt already formats every Markdown file in this tree and each upstream runs the
same formatter, a region emitted formatter-stable upstream arrives formatter-stable here. One
obligation is added: `guides/scaffold.md` is itself a `HOST_PATHS` seed, so scaffold's own guide must
be regenerated before a release or every target receives a stale seed, which belongs in `prepack`.

**The fleet's stale `guides/scaffold.md` mirrors are stale fetches, not a broken refresh path.** The
table gives each reading with the command or the record behind it.

| Reading                                                                                                                   | Command or record                                                                                              |
| ------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| This repository's own `guides/scaffold.md` is 1798 lines                                                                  | `tmp/units/docs-ecosystem-report.md:59`, § Map                                                                 |
| Fleet checkouts hold a 1770-line group and a 1795-line group                                                              | `tmp/units/docs-ecosystem-report.md:65-67`                                                                     |
| `43cf8ac8` (2026-08-27) rendered 1770 lines, `2146454a` (2026-09-03) rendered 1795, `c16e3817` (2026-09-05) rendered 1798 | `git show <rev>:guides/scaffold.md \| wc -l` per revision, as recorded at `tmp/units/docs-reconciliation.md:8` |

Each stale group is the mirror as fetched at the earlier commit its line count matches, and each
target's next `scaffold catalog` closes the gap. Option 1 neither causes that drift nor is blocked by
it.

### Risks and open questions

Each risk names the evidence that settles it, and the coverage risk names the drifts Option 1 leaves
open.

- **The scanner's miss rate against the compiler API is unmeasured.** `Source` is text-only by
  construction, and a doc block on an overload set, on a re-exported symbol, or inside a template
  literal is the risk. Scaffold's `src/core/index.ts` is re-exports only, so the scanner must follow
  each row to its declaring file. Settle it with the probe named under § Probes before the first unit,
  and fall back to the carry-forward mode for any package whose diff shows a misread.
- **The first regeneration rewrites real cells.** The tree already disagrees at
  `src/core/helpers.ts:61` against `guides/scaffold.md:221` and at `src/core/factories.ts:8` against
  `guides/scaffold.md:281`. The dry-run diff against the committed guide is the gate on Stage 1, and
  it is where you read what the amended rule actually changes.
- **The render needs its own splice.** `Materializer.catalog` and `#recatalog` splice one region in
  one file, and that splice is single-marker, single-path, and catalog-content-bound
  (`src/server/Materializer.ts:386-396`, `:953-974`, `:1112-1161`), so nothing in `@orkestrel/guide`
  can reuse it. The ruling puts the render and its splice in `@orkestrel/guide`; the splice is the
  first unit's design, proven on a fixture carrying two qualified marker pairs, regenerated twice and
  diffed for stability.
- **oxfmt stability of a generated region.** oxfmt formats Markdown in this tree today, so a region
  that emits non-canonical bytes turns every regeneration into `format:check` churn. Settle it by
  generating a region and running the checker.
- **Option 1 does not close the `birth` disagreement or the `Compiler` example disagreement.** The
  `Encodes`/`Encode` voice pair closes under Stage 1, because the row is derived. The `birth`
  substance disagreement between `src/core/types.ts:27-29` and `guides/scaffold.md:999-1002` stays
  authored on each side and closes only under Option 2, or by an executed assertion added by hand. The
  `Compiler` `@example` against the Compile fence closes when the fence transcription reads the
  `@example` tag, which is Option 2's mechanism; under Option 1 it is a hand fix. Fix each by hand in
  the same change, and say so in the commit rather than letting the option claim coverage it lacks.
- **Verbatim derivation carries a doc-block writing defect into the guide.** `src/core/factories.ts:31`
  writes `{@link Question}s`, a pluralized code token that `.claude/rules/writing.md` § Code tokens
  forbids. Under R1 the row takes the doc block's first sentence verbatim, so a writing defect inside
  that sentence derives into the guide rather than stopping at the source. The `{@link Question}s`
  token sits in an `@remarks` paragraph, which Option 1 never renders, so it derives only under
  Option 2. Neither instrument Option 3 proposes reads either position:
  `policy/tsdoc-voice` reads the first sentence, and `policy/prose` reads substitution-table terms.
  Option 3 § Mechanism defines `policy/tsdoc-voice` and `policy/prose` and flags each id as a
  proposal. A code-token
  inflection rule is the candidate successor to `policy/prose`; until it exists, this class stays
  review-owned, and this proposal claims no coverage of it.
- **A refused alternative worth recording.** Lens B recommended the `SUMMARY_VERBS` projection so the
  existing guide voice survives derivation, and the ruling refuses it in favour of amending
  `.claude/rules/documentation.md:35`. If you prefer keeping the noun-phrase Surface voice, the
  projection is the only mechanism that delivers it, and its cost is a maintained opener table plus a
  `Question` raised for every unmapped opener.

### Claims

Each claim is falsifiable, and each names the evidence that refutes it.

1. `@orkestrel/guide`'s existing `Source` populations plus a first-sentence reader supply every field
   the generated `## Surface` and `## Methods` regions need. **Refuted by** a required field no
   existing `Source` method returns and no extension of the doc-comment chain scan can produce.
2. Option 1 adds no npm dependency and moves no dependency between manifest sections. **Refuted by** a
   `package.json` diff in `@orkestrel/guide` or `@orkestrel/scaffold` showing either.
3. Region currency is strictly stronger than the SB half it replaces, because it compares the whole
   region including its summary text. **Refuted by** a drift case SB reports that a byte comparison of
   the regenerated region does not.
4. A generated region leaves `npm run format:check` green. **Refuted by** `npx oxfmt --config
.oxfmtrc.json --check guides/scaffold.md` reporting the file after a regeneration that changed no
   summary text.
5. Adopting Option 1 moves the published surface of `@orkestrel/guide`, which gains the render, and
   of `@orkestrel/scaffold`, which gains the seeded `docs` script and the `new` templates' markers.
   Every other fleet package re-pins `@orkestrel/guide`, runs `repair` for the scaffold seed, and
   proves its gates, without bumping or republishing its own surface. **Refuted by** a package other
   than `@orkestrel/guide` and `@orkestrel/scaffold` whose own published surface moves as a result.

## Option 2 — TSDoc as the single source, the guide generated whole

### Mechanism

Every documentary sentence moves into the TSDoc of the symbol that owns it, and the guide holds no
authored prose. The table names each fact's home under Option 2.

| Fact                                              | Source of truth                                                                                                                                                                                                                      |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| The package tagline and the opening pitch         | `@packageDocumentation` on each barrel                                                                                                                                                                                               |
| A `## Surface` row's summary                      | The doc block's first sentence                                                                                                                                                                                                       |
| A `## Methods` row's summary                      | The interface member's doc block first sentence                                                                                                                                                                                      |
| A concept chapter — Ownership, Blueprint, Compile | `@remarks` on the type or class that owns the concept                                                                                                                                                                                |
| Every fence                                       | `@example`                                                                                                                                                                                                                           |
| Every cross-reference                             | `{@link}` and `@see`. A `{@link X}` in a chapter body renders as a link to the guide's own anchor where `X` sits in the rendered surface, and as `` `X` `` otherwise; a `{@link}` in a first sentence always renders as code, per R1 |
| The `## Tests` index                              | The `tests/**` inventory                                                                                                                                                                                                             |
| A cross-cutting limit                             | `@packageDocumentation` on the barrel                                                                                                                                                                                                |

The renderer emits `guides/<name>.md` whole and `tests/guides.test.ts` asserts byte equality against
the committed file, so a forgotten regeneration reds `npm test` with no added gate step. Lens A's
multi-render extension adds `README.md` as a region and a generated agent digest as further targets of
the same model, so one sentence reaches every artifact.

**The extractor choice decides the dependency delta, and it must be stated honestly.** The
text-only scanner path — the same `@orkestrel/guide` extension Option 1 uses — keeps the delta at
none and needs no build. The TypeScript compiler API path resolves the barrel's export set and each
symbol's doc comment exactly, through `ts.createProgram`, `checker.getExportsOfModule`,
`Symbol.getDocumentationComment` (`typescript.d.ts:6548`), `Symbol.getJsDocTags` (`:6549`), and
`ts.displayPartsToString` (`:11426`) — and a shipped `scaffold` verb importing `typescript` moves an
existing development dependency onto scaffold's runtime edge, enlarging the installed closure of
every consumer of `@orkestrel/scaffold/server`. That needs your explicit request under `AGENTS.md` §
Non-negotiable rules, and it is one of the decisions named under § Recommendation and order. The
api-extractor doc model is refused as a reader on C5's evidence.

**Markdown text comes from the declared runtime primitives.** `renderMarkdown` writes canonical
Markdown, `parseProvenance` locates spans, and `fillTemplate` fills the fixed section scaffolding,
each already a declared runtime dependency of the package that would call it.

### Worked example

The TSDoc block Option 2 requires for `createBlueprint` absorbs the chapter paragraph the guide
states separately today. The summary, the tags, and the leading remark paragraphs are the block at
`src/core/factories.ts:7-43` verbatim, re-wrapped to the fence's width. The closing remark paragraph
is the guide's sentence at `guides/scaffold.md:864-866`, moved rather than rewritten, with
`questions` left as the prose the guide already writes rather than promoted to a `{@link}` tag. The
source's own closing paragraph (`src/core/factories.ts:29-34`) is what the move replaces, because the
guide's sentence and the source's say the same thing and Option 2 keeps one of them.

````ts
/**
 * Constructs a {@link Blueprint} from a name and the fields that differ from the defaults.
 *
 * @param name - The bare workspace name.
 * @param input - The fields to set; every omitted field takes its default.
 * @returns The filled blueprint, owned by the caller and sharing nothing with `input`.
 * @throws {@link ScaffoldError} coded `INVALID` when the filled record is not a
 * blueprint.
 *
 * @remarks
 * A blueprint is a closed record, and most of its fields have one sensible
 * starting value: an empty list, a cleared flag, `DEFAULT_VERSION`, and
 * `DEFAULT_ENGINES`. Filling them here is what lets a caller state only what its
 * workspace actually declares.
 *
 * This is the construction door, and {@link parseBlueprint} is the coercing one.
 * They differ in every part: this fills the defaults and takes a partial
 * specification, where the parser fills nothing and takes an untrusted value; and
 * this refuses by throwing, where the parser refuses by answering `undefined`.
 * What they share is the law — both accept exactly what `isBlueprint` accepts.
 *
 * `createBlueprint` enforces shape only. Whether the name is a name, the version a
 * version, and the axis combination one this package can generate are the gate's
 * laws, and the gate answers them with questions. A blueprint the gate will refuse
 * is still constructible, so one law lives in one place.
 *
 * @example
 * ```ts
 * import { createBlueprint } from '@orkestrel/scaffold'
 *
 * createBlueprint('router', { src: ['core'] }).version // '0.0.1'
 * createBlueprint('Router').name // 'Router' — the gate refuses it, this does not
 * ```
 */
````

The guide passage that block produces carries the row and the chapter from one source, under the
cross-reference rule the mechanism table fixes: `{@link Blueprint}` in the first sentence renders as
`` `Blueprint` `` per R1, and `{@link parseBlueprint}` in the body renders as a link to the guide's
own anchor because `parseBlueprint` sits in the rendered surface.

````markdown
| `createBlueprint` | function | Constructs a `Blueprint` from a name and the fields that differ from the defaults. |

### `createBlueprint`

Constructs a `Blueprint` from a name and the fields that differ from the defaults.

A blueprint is a closed record, and most of its fields have one sensible starting value: an empty
list, a cleared flag, `DEFAULT_VERSION`, and `DEFAULT_ENGINES`. Filling them here is what lets a
caller state only what its workspace actually declares.

This is the construction door, and [`parseBlueprint`](#parseblueprint) is the coercing one. They
differ in every part: this fills the defaults and takes a partial specification, where the parser
fills nothing and takes an untrusted value; and this refuses by throwing, where the parser refuses
by answering `undefined`. What they share is the law — both accept exactly what `isBlueprint`
accepts.

`createBlueprint` enforces shape only. Whether the name is a name, the version a version, and the
axis combination one this package can generate are the gate's laws, and the gate answers them with
questions. A blueprint the gate will refuse is still constructible, so one law lives in one place.

```ts
import { createBlueprint } from '@orkestrel/scaffold'

createBlueprint('router', { src: ['core'] }).version // '0.0.1'
createBlueprint('Router').name // 'Router' — the gate refuses it, this does not
```
````

### Edit cost

The table gives the file list today and under Option 2 for each change kind.

| Change kind               | Edited today                                                                                                                                                                                | Edited under Option 2                                                                                                                                                                                                  | Gate that catches a forgotten site                                                                                                                                                                                        |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Rename an export          | The declaration and its TSDoc; every call site; every `{@link}`; the Surface row; the Methods row; every fence importing it; `README.md`; the fence transcription in `tests/guides.test.ts` | The declaration and its TSDoc; every call site; every `{@link}` carried on another symbol's declaration; every `@example` fence on another declaration importing it; the fence transcription in `tests/guides.test.ts` | The typecheck for call sites and for the transcription; byte equality for every rendered row, chapter, and fence; the render's own import resolution for a fence, and its refusal for a `{@link}` that no longer resolves |
| Change a symbol's summary | The TSDoc block and the Surface cell                                                                                                                                                        | The TSDoc block                                                                                                                                                                                                        | Byte equality                                                                                                                                                                                                             |
| Add an options field      | `src/core/types.ts`; the implementation; the options `@remarks`; the authored guide passage                                                                                                 | `src/core/types.ts` and its `@remarks`                                                                                                                                                                                 | Byte equality                                                                                                                                                                                                             |
| Change a behaviour claim  | The TSDoc block; the guide passage; `README.md`; `## Limits` where it bounds one                                                                                                            | The `@remarks` alone                                                                                                                                                                                                   | Byte equality, which is what closes the `birth` disagreement                                                                                                                                                              |
| Add a documented limit    | `guides/scaffold.md` § Limits, with no source anchor                                                                                                                                        | The owning symbol's `@remarks`, or `@packageDocumentation` for a cross-cutting limit                                                                                                                                   | Byte equality                                                                                                                                                                                                             |
| Add a CLI flag            | `src/bin/CLI.ts`; `renderUsage`; the guide's `## Command line` section; `README.md`; tests                                                                                                  | `src/bin/CLI.ts` and its TSDoc                                                                                                                                                                                         | Byte equality, plus the usage alignment assertion                                                                                                                                                                         |

This is the option that answers the cost you named directly: every prose site collapses into `src/**`
where a symbol owns it. Lens O's falsification A4 is the caution to hold beside that: generating the
guide from TSDoc **moves** a prose edit from `guides/scaffold.md` into `src/**`, and removes
duplication only where the guide sentence and the TSDoc sentence were the same fact. The measured
duplication pairs are Surface summaries, the `@remarks` against the Origin table, and the `@example`
against the Compile fence — not the workflow prose that dominates the commit list.

### Checks

The table rules on each check under Option 2. The pattern is that most checks stop being test
assertions and become generator invariants, which is stronger where the generator refuses and weaker
where nobody proves the generator itself.

| Check                                   | Ruling under Option 2                                                                                                                                                                                                                                                                         |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SB, barrel to guide and guide to barrel | **Becomes tautological**, in each direction. The guide's surface is projected from the barrel's. Replaced by byte equality, which is strictly stronger because it also covers the summary text SB never read                                                                                  |
| SB, direct to barrel                    | **Stays real and is adopted here, as under Option 1**, because generation touches neither side of it: the check compares the declaring files against the barrel                                                                                                                               |
| MB, bijection half                      | **Becomes tautological**, on the same reasoning, and is replaced by byte equality                                                                                                                                                                                                             |
| MB, class-no-extra                      | **Survives unchanged**, because it compares the implementing class against its interface                                                                                                                                                                                                      |
| LI                                      | **Moves into the generator.** An unresolvable `{@link}` or `@see` target is a refusal at render rather than a red test afterwards. Keep the test-side check for the hand-written links in `guides/README.md`, which stays authored                                                            |
| TE                                      | **Becomes a regeneration guard**, as SB does. The generator emits `## Tests` from the same `tests/**` inventory LI resolves against, so LI over the emitted bullets can fail only where regeneration was skipped                                                                              |
| NV                                      | **Becomes a generator refusal**, with the assertion retained in `tests/guides.test.ts` as the guard that the render itself did not go vacuous                                                                                                                                                 |
| FL                                      | **Moves to source.** The generator refuses an `@example` fence whose language the package did not list                                                                                                                                                                                        |
| EX                                      | **Moves to source and stops being tautological.** Generation supplies presence in the guide, so the check becomes "every `function`-keyword export carries an `@example` tag", computed from `findUnexampled` over the tag population                                                         |
| FI                                      | **Moves into the generator**, which resolves each fence import against the model it built                                                                                                                                                                                                     |
| Executed fences                         | **Survive, and their sites become one.** The transcription reads the `@example` block, so the guide fence and the `@example` stop being separate sites and the `Compiler` disagreement closes. Execution still requires a transcription in `tests/guides.test.ts`; generation supplies no run |
| The `toContain` presence guards         | **Disappear as a category**, because the sentence they guard is generated from the source the executed assertion tests                                                                                                                                                                        |

Option 2 adds byte equality between the committed `guides/<name>.md` file and the render, a formatter
stability assertion so the emitted Markdown passes `format:check` without a rewrite, and — at the
multi-render extension — README region equality, digest link resolution, and marker integrity.

### Humans and agents

The artifact a human reads is unchanged in shape, and the artifact an agent reads gains substance.

- **An IDE hover shows the whole chapter**, including the paragraphs that live only in the guide
  today. That reaches a consumer too, not only this repository: the rollup measurement under C5 shows
  every tag class surviving into `dist/src/core/index.d.ts`.
- **A human on GitHub sees `guides/scaffold.md` exactly as today** — same headings, same tables, same
  fences. The file stays committed, which is not optional: `Upstream.#guideURL` fetches each mirror
  from `main`, so a git-ignored guide is a `404` for every mirror in the fleet.
- **An agent loads the same guide, or the declaration rollup, and gets identical sentences from
  either.** The voice law stays stated once, and Option 2 makes it enforceable across the whole
  documentation surface for the first time, because every sentence sits in comment text an oxlint JS
  plugin can read.
- **A generated `llms.txt` digest is permitted here and nowhere else.** The ruling refuses `llms.txt`
  as an authored second index, because `.claude/rules/documentation.md` § Authority and workflow
  forbids competing instruction copies and `AGENTS.md`, the rule map, and `guides/README.md` are the
  agent's entry already. Under Option 2's multi-render it is a _generated_ projection of the guide's
  own head and headings, which cannot go stale, and it is worth adding only where a crawler consumer
  exists.

### Migration

The order is `@orkestrel/guide` first on the scanner path, or `@orkestrel/scaffold` first on the
compiler path, and then the fleet in any order.

- **The renderer's owner bumps and publishes on its own account.** On the scanner path that is
  `@orkestrel/guide`, a development edge for every consumer, so each consumer re-pins, proves its
  gates, and commits to `main` without republishing. On the compiler path that is
  `@orkestrel/scaffold`, and the `typescript` manifest move rides with it.
- **What a package edits to adopt.** It moves each guide chapter into the `@remarks` of the symbol
  that owns it, moves the tagline into `@packageDocumentation` on the barrel, deletes the authored
  `guides/<name>.md` file, runs the render, and commits it. That is the largest editorial pass of any
  option in this proposal, and it is per-package. The fleet's guides run from 95 lines
  (`/home/user/fleet/ndjson/guides/ndjson.md`) to 5452 lines (`/home/user/fleet/mcp/guides/mcp.md`),
  each reading taken by `wc -l` and recorded per package in `tmp/units/docs-ecosystem-report.md`
  § Map, so the cost is not uniform.
- **A package that adopts nothing keeps its authored guide and its existing suite**, because
  `tests/guides.test.ts` is package-owned.
- **Mirrors stay byte-identical**, on Option 1's reasoning and the same pointers: a generated guide
  committed on `main` is the same fetched bytes to every consumer.

### Risks and open questions

Each risk names the evidence that settles it, and the section-ownership risk is the one that decides
the option.

- **The option's central claim is unproven, and the walk that proves it is cheap.** `guides/scaffold.md`
  carries `## Command line` (`:475`), `## Blueprint` (`:758`), `## Compile` (`:868`), `## Ownership and
drift` (`:956`), `## Fleet catalog` (`:1075`), `## Dependency floors` (`:1120`), `## Vendored data
root` (`:1194`), `## Generated workspace` (`:1318`), `## Library` (`:1379`), `## Limits` (`:1522`),
  and `## Tests` (`:1756`).
  Each needs an owning declaration. The file's remaining H2 headings are outside the walk because the
  generator produces or structures them: `## Surface` (`:45`) and `## Methods` (`:426`) are the
  generated reference tables, and `## See also` (`:1794`) is the link block LI already resolves. Some
  sections already have an owner — the whole Origin table sits in `src/core/types.ts:12-16` and the
  whole Ownership table in `:23-29`. Others are cross-symbol workflow prose over `src/bin`, a face
  with no barrel, and `## Library` is exactly that class. **A section with no owner falsifies Option 2**, and the
  walk is the test that decides the option. Run it before committing to this path.
- **Source files become prose-heavy.** `Materializer`'s doc block already runs
  `src/server/Materializer.ts:84-128` before the class starts. Absorbing chapters lengthens that
  further. Measure the ratio of comment lines to code lines after one real migration of
  `src/core/types.ts` and rule on the result.
- **`typescript` on the runtime edge needs your request.** If you refuse it, the compiler path is dead
  and the scanner path carries the option, with the scanner's miss rate as the gating measurement.
- **The `jsdoc` formatting question is open and it matters more here.** Under Option 2 the comment
  _is_ the product, so enabling `jsdoc` in `.oxfmtrc.json` is both attractive and dangerous:
  enabling it canonicalizes tag aliases, capitalizes descriptions, wraps long lines, and collapses
  short comments. Read the diff before flipping it, as Option 3's mechanism requires.
- **The generated bytes must be stable under the formatter and the vendoring round trip.**
  `guides/scaffold.md` is a `HOST_PATHS` entry and `oxfmt --check` covers every Markdown file, so
  generated bytes that red the checker, or a regeneration inside a target that reds `scaffold audit`,
  refute the option's format claim.
- **Reversibility is the sharpest cost.** Authored prose is deleted, and only the generator restores
  it. Option 1 is reversible by deleting a generator and keeping every file; Option 2 is not.
- **This is the option that closes the drifts Option 1 leaves open.** The `birth` substance
  disagreement closes because the narrative moves into `@remarks` and there is no second site to
  disagree with. The `Compiler` `@example` against the Compile fence closes because the fence
  transcription reads the `@example` tag, which makes the sites one; neither site executes today, and
  execution still takes a transcription in `tests/guides.test.ts`. Weigh that against the editorial
  pass and the reversibility cost.

### Claims

Each claim is falsifiable, and each names the evidence that refutes it.

1. Every H2 section of `guides/scaffold.md` has an exported declaration that owns its subject, or
   belongs to `@packageDocumentation`. **Refuted by** naming one section whose subject no export owns.
2. Replacing SB and MB with byte equality against the render loses no defect class those checks catch.
   **Refuted by** a drift case SB or MB reports that byte equality does not.
3. On the scanner path Option 2 adds no npm dependency and moves no dependency between manifest
   sections. **Refuted by** a manifest diff showing either, which is also the honest report for the
   compiler path: it moves `typescript`.
4. The generated guide passes `npm run format:check` without a formatter rewrite. **Refuted by** an
   `oxfmt --check` run that reports the generated file.
5. Committing the render keeps every fleet mirror byte-identical to what `Upstream` fetches.
   **Refuted by** a mirror comparison that differs after a target adopts.

## Option 3 — the voice gate: the prose law enforced where the prose lives

### Mechanism

The prose law stays exactly where it is, and Option 3 builds the instruments that read it. Nothing
restates the law: `.claude/rules/documentation.md` § Authority and workflow forbids a competing copy,
so each instrument derives from the rule file rather than paraphrasing it.

**`configs/policy.ts` gains the doc-comment rules.** The oxlint JS plugin reaches comment text
through `sourceCode.getAllComments()` (`plugins-dev.d.ts:2697`) and `CommentType.value`
(`:1315-1318`), and reports through `context.report` (`:3835`). These rules land beside `no-mocking`,
`no-keyword-privacy`, and `no-nested-functions` (`configs/policy.ts:337-345`, registered at
`.oxlintrc.json:5`):

- **`policy/tsdoc-voice`** refuses a doc block whose first sentence is not third person with an `-s`
  verb, or that repeats the symbol's own name, per `.claude/rules/typescript.md:78-79`.
- **`policy/prose`** refuses a substitution-table term inside a doc block, per
  `.claude/rules/writing.md` § Substitutions.

Treat each id as a proposal the first unit settles, the way the `render` name is a proposal. Each
sibling names what it refuses — `no-mocking`, `no-keyword-privacy`, `no-nested-functions` — so the
first unit may take that form instead and land `no-imperative-summary` and `no-banned-term`.

Each visitor stays a one-line context-binding arrow delegating to a module-scope `report{Noun}`
function, per `.claude/rules/workspace.md` § Policy instruments, and each ships a `PolicyControl`
entry beside `RULES_POLICY_CONTROLS` (`tests/setupPolicy.ts:2737-2741`) whose negative control is
drawn from **outside** its membership rule, per `.claude/rules/quality.md` § Instruments. The plugin
half cannot be suppressed, because the policy sweep already refuses every `eslint-disable` and
`oxlint-disable` directive in source, test, config, and script files.

**The vendored policy sweep gains the Markdown term sweep**, because a JS plugin cannot reach
Markdown (C3). `.claude/rules/workspace.md` § Policy instruments assigns path- and text-shaped rules
to `tests/setupPolicy.ts`, so this is placement by law rather than by convenience, and the sweep
already reads Markdown with a `guides/sample.md` control (`tests/policy.test.ts:327-340`).

**The denylist travels as frozen data, with a currency check where the canon exists.**
`.claude/rules/writing.md` sits under the `.claude/rules` member (`src/core/constants.ts:195`) of
`CANON_PATHS` (`:186-201`), staged for
reading inside the installed package and never copied into a target, so a check that reads the rule
file at run time is inert in every target — the sweep's existing rule-map check already degrades that
way, returning an empty violation list when the directory yields nothing
(`tests/setupPolicy.ts:1654-1660`). Option 3 ships the denylist as a frozen constant in the vendored
`tests/setupPolicy.ts`, derived from `.claude/rules/writing.md` § Substitutions, and adds a currency
check that runs only where the canon is present. The rule file stays the single home; the constant is
a derived copy with a gate at its source.

**The Markdown population excludes what a rule forbids editing.** Every `guides/<other-package>.md`
mirror is fetched upstream bytes, and `.claude/rules/documentation.md` § Parity requires refreshing a
mirror rather than rewriting it, so a prose rule over a mirror would demand an edit the mirror rule
forbids. Fenced regions and backticked tokens are excluded too, because
`.claude/rules/writing.md` § Substitutions states the exemption: "A literal code identifier is data,
and so is a sample string inside a code fence or a test fixture." Each exclusion carries a control
inside it.

**The summary-equality pairing is the cross-site instrument.** It pairs each TSDoc first sentence
with its `## Surface` row and reds when they disagree. Under the amended
`.claude/rules/documentation.md:35` the row is the sentence with each `{@link X}` rendered as
`` `X` ``, so the pairing is an equality rather than a transform. This is the instrument that would
have reported the `Encodes`/`Encode` pair and the `Constructs`/`Construct` pair the day each landed.

**The oxfmt `jsdoc` flip happens only after the measured diff.** `.oxfmtrc.json` sets no `jsdoc` key,
and the option defaults to disabled. Enabling it canonicalizes tag aliases, capitalizes descriptions,
wraps long lines, and collapses short comments across a population measured by `grep -c '^\s*/\*\*'` at `src/core` 215 doc blocks,
`src/server` 141, and `src/bin` 73. `format:check` is an acceptance gate, so the rewrite
becomes mandatory the moment the key is set. Run `oxfmt --write` over a copy of `src/core/` first,
read the diff for any capitalization or collapse that alters a first sentence the `-s` rule governs,
and flip the key only if the diff is clean.

**The dependency delta is none.** oxfmt `0.65.0`, oxlint `1.80.0`, `typescript` `7.0.2`, and the
`@typescript/typescript6` bridge are all declared already. Option 3 writes no Markdown, so it needs neither `@orkestrel/markdown` nor
`@orkestrel/template`.

**Option 3 removes no edit site, and that is the whole trade.** It converts a class of silent drift
into a red gate, and it makes each pair cheap to repair because the correct text is already written
at the other site. It composes with Option 1 and Option 2 without modification: under either of them
the summary-equality pairing becomes the proof that the generator's output matches its source, which
is what keeps a generated region from being a check that compares a program against itself.

### Worked example

`createBlueprint` is the pair Option 3 reports on its first run. The TSDoc is unchanged
(`src/core/factories.ts:7-14`).

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

The guide row it must equal differs in one letter from what `guides/scaffold.md:281` carries today.

```markdown
| `createBlueprint` | function | Constructs a `Blueprint` from a name and the fields that differ from the defaults. |
```

The same shape recurs at `src/core/helpers.ts:61`, which reads "Encodes text as the exact lowercase
hexadecimal form of its UTF-8 bytes." against `guides/scaffold.md:221`, which reads "Encode text as
the exact lowercase hexadecimal form of its UTF-8 bytes." Under the amended rule the guide side takes
the source sentence, and `policy/tsdoc-voice` reds any doc block that drifts to the imperative.
`ROADMAP.md:127-128` lists that repair as an open seam of the `contract` package, inside the bullet that
runs from `ROADMAP.md:67` to `:129`. Option 3 closes scaffold's own pairs when this repository goes
green, and reaches contract's row only after contract re-pins `@orkestrel/scaffold` and runs
`repair`.

### Edit cost

The table gives the file list today and under Option 3, and the gate in each state.

| Change kind               | Edited today                                                                                                | Edited under Option 3                         | Gate that catches a forgotten site                                                                              |
| ------------------------- | ----------------------------------------------------------------------------------------------------------- | --------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Rename an export          | The declaration, every `{@link}`, the Surface row and prose passages, guide fences, `README.md`, `tests/**` | The same set                                  | Today: SB, FI, and the typecheck. Under Option 3: the same plus summary equality                                |
| Change a symbol's summary | The TSDoc block and the Surface cell                                                                        | The same set, and the pair must match exactly | Today: nothing. Under Option 3: summary equality                                                                |
| Add an options field      | `src/core/types.ts`, the implementation, the owning `@remarks`, the guide passage                           | The same set                                  | Today and under Option 3: nothing. Option 3 adds no field-level check                                           |
| Change a behaviour claim  | The TSDoc block, the guide passage, `README.md`, the executed fence where one proves it                     | The same set                                  | The executed fences where the claim sits under a flagship fence. A `toContain` guard proves presence, not truth |
| Add a documented limit    | `guides/scaffold.md` § Limits and the owning `@remarks`                                                     | The same set                                  | Today and under Option 3: nothing                                                                               |
| Add a CLI flag            | `src/bin/CLI.ts`, the guide's `## Command line` section, the `README.md` verb list                          | The same set                                  | The usage alignment assertion at `tests/guides.test.ts:201-210`. `src/bin` sits outside the surface bijection   |

### Checks

Every catalog check survives unchanged, because Option 3 generates nothing. The table records that
ruling explicitly rather than leaving it implied.

| Check                           | Ruling under Option 3                                                                                                         |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| SB, MB, LI, NV, FL, FI          | Survive unchanged, with no tautology introduced                                                                               |
| TE                              | Survives: non-vacuity asserted inside NV, resolution covered by LI, as ruled under § What the checks prove and what they miss |
| EX                              | Survives unchanged, and stays uncalled by this package's suite. Adopting it is Option 1's work                                |
| Executed fences                 | Survive unchanged, and remain the only proof a prose claim is true                                                            |
| The `toContain` presence guards | Stay presence-only and are named as such                                                                                      |

Option 3 adds these instruments, each with a negative control drawn from outside its membership rule.

| Added instrument             | What it proves                                                                                                                                          | Where it lives                                    |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| `policy/tsdoc-voice`         | No doc block's first sentence breaks the third-person `-s` form or repeats the symbol's name                                                            | `configs/policy.ts`                               |
| `policy/prose`               | No doc block carries a substitution-table term                                                                                                          | `configs/policy.ts`                               |
| The Markdown term sweep      | The package's own guide, `README.md`, `.claude/rules/**`, `.agents/**`, and the skills carry no banned term outside a fence or a backticked token       | `tests/setupPolicy.ts` and `tests/policy.test.ts` |
| The denylist currency check  | The frozen constant matches `.claude/rules/writing.md` § Substitutions, where the canon is present                                                      | `tests/setupPolicy.ts`                            |
| Summary equality             | Each TSDoc first sentence equals its `## Surface` row under the amended derivation rule                                                                 | `tests/guides.test.ts`                            |
| The oxfmt `jsdoc` shape pass | Every doc block is formatter-normalized. Conditional: it is adopted only if the measured `oxfmt --write` diff over `src/core/` alters no first sentence | `npm run format:check`                            |

### Humans and agents

One artifact serves both readers, and Option 3 changes what each reader can trust rather than what
each reader loads.

- **An IDE hover shows what it shows today.** Where the measured diff lets the `jsdoc` key be
  flipped, oxfmt normalizes the block's shape rather than review doing it; where the diff alters a
  first sentence, the key stays unset and the hover is unchanged in every respect.
- **A human on GitHub sees the same guide structure**, with each Surface row identical to the hover's
  first sentence, so moving between the guide and the source costs no re-reading.
- **An agent loads `.claude/rules/writing.md` for the law and the published rollup for the symbol
  facts.** The rollup measurement under C5 is what makes the rollup a usable source, and
  `CANON_PATHS` (`src/core/constants.ts:186-201`), whose `.claude/rules` member sits at `:195`, is
  what publishes the law for reading.
- **The voice conventions stay stated once** — `AGENTS.md` § Writing, `AGENTS.md` § Instruction files,
  and `.claude/rules/writing.md` — and Option 3 adds enforcement sites, never statement sites.

### Migration

Every file Option 3 changes is vendored or canon, so this is a **vendored-only scaffold release**.

1. Amend `.claude/rules/documentation.md:35` in this repository. `.claude/rules/writing.md` needs no
   amendment: the denylist derives from § Substitutions as that table stands, and the currency check
   reads it.
2. Add `policy/tsdoc-voice` and `policy/prose` to `configs/policy.ts` (`src/core/constants.ts:143`), the
   term sweep and the denylist to `tests/setupPolicy.ts` (`:139`), and its control to
   `tests/policy.test.ts` (`:140`).
3. Measure the `oxfmt --write` diff over a copy of `src/core/` and flip `jsdoc` in `.oxfmtrc.json`
   (`:147`) only if that diff alters no first sentence.
4. Repair this repository's own prose until the gates are green, which is where the
   `Encodes`/`Encode` and `Constructs`/`Construct` pairs close.
5. Bump and publish `@orkestrel/scaffold`, because a vendored byte moved.
6. Each target re-pins `@orkestrel/scaffold`, runs `repair`, runs `oxfmt --write` once, and proves its
   own gates — **one rewrite per target**. `.agents/orchestration.md` § Publishing the fleet carries
   the warning that applies here: `repair` restores `tests/setupPolicy.ts` and `tests/policy.test.ts`,
   so a vendored-only release can turn a green target red, and each target's prose repair is its own
   work.

`@orkestrel/guide` is untouched, so no package re-pins the `^0.0.17` development edge. No runtime edge
moves, so no publish cascade follows. Mirrors stay byte-identical, because the formatter already
passes on fetched upstream bytes and the prose population excludes every mirror.

### Risks and open questions

Each risk names the evidence that settles it.

- **The `jsdoc` flip rewrites every doc block in every target once.** `.oxfmtrc.json` is vendored, so
  the flip lands fleet-wide. The measured diff over `src/core/` is the gate on it, read specifically
  for a capitalization or a collapse that alters a first sentence the `-s` rule governs.
- **A text scan can miss a doc block.** The controls must come from outside the scanner's membership
  rule: a doc block preceding a declaration but separated from it by a blank line, and a doc block inside a template
  literal. Where the scan proves unsound, the reader becomes `typescript/unstable/sync`'s
  `Symbol.getDocumentationComment(checker)`, which a Vitest sweep can import at no dependency cost
  because `typescript` is already a development dependency. `ts.getJSDocCommentsAndTags` and
  `ts.displayPartsToString` are gone at the 7 major.
- **Whether an oxlint plugin rule can report a diagnostic on a comment is unproven here.**
  `context.report(diagnostic)` exists, and no distillate shows a comment as a diagnostic target.
  A throwaway rule settles it, and it is the cheapest probe in this proposal.
- **JS plugins are alpha and outside semver.** Pin oxlint exactly and read the gate after each bump.
- **A precedent already ruled against one mechanical prose sweep.** `ROADMAP.md:139-142` records that
  the version-catalog half stays review-owned because "every mechanical form tried reds a healthy
  reference". Judged against that precedent, the denylist's membership rule is the substitution
  table's own exemption list, which the version catalog has no equivalent of — a judgment, not a
  measured property, and unsettled until the instrument runs with its controls. That precedent is the
  reason each rule ships with a stated membership rule and an outside control rather than a best
  effort.
- **A term denylist can fire on a code identifier or a fixture string.** The fence and backtick
  exclusions are the mechanism, and each carries a control inside it.

### Claims

Each claim is falsifiable, and each names the evidence that refutes it.

1. A prose rule over Markdown cannot live in the oxlint JS plugin. **Refuted by** an oxlint `1.80.0`
   plugin rule that receives a `.md` file and reports on it.
2. A sweep rule that reads `.claude/rules/writing.md` at run time is inert in every fleet target.
   **Refuted by** a target that holds a `.claude/rules` tree after `scaffold repair`, or by evidence
   that `CANON_PATHS` content reaches a target's filesystem.
3. The Surface-row description and the TSDoc first sentence carry the same fact at every row where
   both exist, so one can be derived from the other without loss. **Refuted by** a Surface row whose
   description states something the TSDoc first sentence does not, and must not.
4. Enabling `jsdoc` in oxfmt `0.65.0` leaves every first sentence in `src/core/` satisfying
   `.claude/rules/typescript.md:78-79`. **Refuted by** a diff from `oxfmt --write` that changes a
   first sentence's verb form or its opening word.
5. Option 3 reduces no edit site for any change kind in its edit-cost table. **Refuted by** a change
   kind whose site list shortens under Option 3.

## Recommendation and order

Take the work in this order. Each step is independently valuable and independently reversible.

1. **Option 3, the voice gate.** It changes no artifact's shape, so nothing downstream depends on it,
   and it makes the later options' output checkable rather than merely regenerated. It also repairs
   the `Encodes`/`Encode` and `Constructs`/`Construct` pairs as a side effect of going green. The
   `ROADMAP.md:127-128` row is the `contract` package's, so Option 3 reaches it only after contract
   re-pins `@orkestrel/scaffold` and runs `repair`. Cost: a vendored-only `@orkestrel/scaffold`
   release, and one rewrite per target.
2. **Option 1 Stage 1, the `## Surface` regions**, after the probes under § Probes before the first
   unit return. The dry-run diff against the committed `guides/scaffold.md` is the gate: land Stage 1
   only after reading it. Repair the `birth` substance disagreement and the `Compiler` example
   disagreement by hand in the same change, because this option does not close either.
3. **Option 1 Stage 2, the `## Methods` regions**, and **Stage 3, the `README.md` head regions**.
   Stage 3 gives `README.md` the check it has never had, one region per span: the pitch, the
   vendored-set paragraphs, the install line, the runtime and `npx` lines, the authority and exit-code
   sentence, the flags, and a verb-table region inserted between the flags and the per-verb sections,
   rendered from the guide's command reference. The per-verb sections at `README.md:45-100` stay
   outside every region. The `npx scaffold` at `README.md:48` against the guide's `scaffold <verb>` at
   `guides/scaffold.md:518-530` is a register difference — an `npx` invocation against the installed
   binary form pinned at `tests/guides.test.ts:201-210` — and the region removes it only inside the
   region, leaving the authored example as it is.
4. **Re-read the multi-site edit rate over one release cycle**, using the same command that produced
   the commit list under § What the multi-site edits cost, before ruling on Option 2. If the remaining
   multi-site commits are dominated by narrative prose that no symbol owns, Option 2's whole-guide
   render is worth its editorial pass; if they are dominated by workflow prose over `src/bin`, it is
   not, because Option 2 has no owner for those sections either.

These decisions are yours before the first unit is dispatched.

- **The `.claude/rules/documentation.md:35` amendment.** Do you accept that a Surface-row description
  and a Methods-row summary become the symbol's TSDoc first sentence verbatim, with each `{@link X}`
  rendered as `` `X` ``, and that the noun-phrase form scopes to the H1 blockquote tagline alone?
  Option 1 and Option 2 both need it; Option 3's summary-equality pairing needs it to be an equality
  rather than a transform. Refusing it forces the `SUMMARY_VERBS` projection back onto the table, with
  a maintained opener table as its cost.
- **The render's home.** The ruling puts it in `@orkestrel/guide` as a `render` direction beside
  `Guide` and `Source`, invoked by a package `docs` script and by each package's own
  `tests/guides.test.ts`. That keeps `@orkestrel/guide` on its development edge and keeps `typescript`
  where it is. The alternative is a `scaffold` verb, which is a runtime-surface change with a
  per-target `repair` behind it.
- **Whether `typescript` may ever move to a runtime edge.** It is a development dependency today. The
  compiler-API extractor is the only reader that resolves a doc comment exactly rather than by text
  scan, and importing it from `src/server` enlarges the installed closure of every consumer of
  `@orkestrel/scaffold/server`. The recommended path never needs it — the compiler API stays the
  control the scanner is measured against — so answer this only if the scanner's measured miss rate is
  nonzero and matters.

## Refused on the evidence

Each refusal names its one reason and the pointer that establishes it.

| Refused                                 | Reason                                                                                                                                                                                                                     | Pointer                                                                                   |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| TypeDoc and `typedoc-plugin-markdown`   | Declaring a package without your explicit request. `typedoc` `0.28.20` adds `lunr`, `yaml`, `minimatch`, `markdown-it`, and `@gerrit0/mini-shiki`                                                                          | `AGENTS.md` § Non-negotiable rules; `tmp/units/docs-research-web-report.md` § Distillate  |
| `@microsoft/api-documenter`             | Declaring a package without your explicit request                                                                                                                                                                          | `AGENTS.md` § Non-negotiable rules; `tmp/units/docs-research-web-report.md` § Evidence 2b |
| The api-extractor doc model as a reader | `unplugin-dts` invokes api-extractor with `docModel: { enabled: false }`, so reading the model needs a second configured invocation and a build inside the documentation loop                                              | `unplugin-dts.BU1tibsL.mjs:549-554`; constraint C5                                        |
| A split `guides/reference.md` file      | `Upstream.#guideURL` fetches one path per package, so every fleet mirror would arrive without its reference half, silently                                                                                                 | `src/server/Upstream.ts:737-740`; `guides/README.md:33-37`                                |
| A frozen `SUMMARY_VERBS` opener table   | A second wording that must be maintained and can be wrong, where C9 requires any transform to be specified and tested. Verbatim derivation avoids the transform entirely                                                   | Constraint C9; `.claude/rules/documentation.md:35` as amended                             |
| `llms.txt` as an authored second index  | A competing instruction copy, where `AGENTS.md`, the rule map, and `guides/README.md` are the agent's entry already. Permitted only as a _generated_ digest under Option 2's multi-render, where a crawler consumer exists | `.claude/rules/documentation.md` § Authority and workflow                                 |
| Vale, textlint, and markdownlint        | Each declares a package or a separate binary without your explicit request                                                                                                                                                 | `AGENTS.md` § Non-negotiable rules                                                        |

## Probes before the first unit

Each probe names the command or the comparison that settles it. Run them before Option 1 Stage 1 is
dispatched; the oxlint one gates Option 3.

1. **The scanner's miss rate.** Run the extended scanner over `src/core/types.ts`,
   `src/core/helpers.ts`, `src/server/Materializer.ts`, and `src/bin/CLI.ts`, and diff its extracted
   first sentences against `ts.getJSDocCommentsAndTags` on the same files. A nonzero miss rate selects
   the carry-forward fallback for the affected package and reopens the `typescript` decision.
2. **The first regeneration's diff.** Render the `## Surface` regions and diff them against the
   committed `guides/scaffold.md`, reading which cells change under the amended
   `.claude/rules/documentation.md:35`. This is the gate on Stage 1.
3. **Formatter stability of a generated region.** Run `npx oxfmt --config .oxfmtrc.json --check
guides/scaffold.md` after a regeneration and read the exit status.
4. **The `jsdoc` rewrite.** Run `oxfmt --write` over a copy of `src/core/` with `jsdoc: true` and read
   the diff, specifically for a capitalization or a collapse that alters a first sentence.
5. **An oxlint rule reporting on a comment.** Write a throwaway plugin rule that reports a diagnostic
   on a comment and run it against one file. Nothing in the distillates shows a comment as a
   diagnostic target, and `policy/tsdoc-voice` and `policy/prose` both depend on it.

## Record

The campaign artifacts for this proposal live in the orchestrator's repository under
`.orkestrel/campaign/docs-proposal/`: the absorb brief and distillate, the research brief and
distillate, the web research brief and report, the ecosystem brief and report, the design brief with
the Lens A, Lens B, Lens C, and Lens O reports, the orchestrator measurements, the reconciliation
carrying rulings R1 to R10, the routing ledger, the instruments directory, and this unit's own brief
and report.

The campaign recorded these bench substitutions, and each is named here because it changed which
engine ruled on what.

- **The Codex bench is dark** (`codex` not installed, 2026-09-05), so the design round's objective
  lane ran on Opus 5 as `reviewer` rather than on GPT-5.6 Sol as `analyst`. Lens O's report records
  the substitution in its own header.
- **The Cursor CLI's web tools were rejected** — every `WebFetch` and `WebSearch` call returned
  `User Rejected` in session `43b1dc08-413c-41f2-ab96-6a65e288c597` — so the primary-source rows
  stepped past Grok to the native `researcher` on Sonnet, brief
  `tmp/units/docs-research-web-brief.md`. The Luna step was unavailable while the Codex bench is dark.

This file is spent the moment you rule on it.
`.agents/skills/orkestrel-debrief/references/retention.md:44` fixes its lifecycle: "A proposal for
work nobody has ruled on yet. Deleted after the work lands or the proposal is refused. The ruling
goes in the prune commit message." Delete `PROPOSAL.md` in the commit that lands the chosen option or
records the refusal, and carry the ruling in that commit message.
