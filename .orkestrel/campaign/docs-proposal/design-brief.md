# Unit docs-design — candidate designs for a single-source documentation pipeline across scaffold, guide, and the fleet

## Role and lane

Four blind lanes read this one brief. Each is told at launch which lens it holds and holds no other:

- Lens A, `planner` on Opus 5 (subjective): TSDoc as the single source, guides as generated build products.
- Lens B, `planner` on Opus 5 (subjective): authored narrative with generated reference regions.
- Lens C, `planner` on Opus 5 (subjective): one voice for humans and LLMs, with prose law enforced by lint and format.
- Lens O, `reviewer` on Opus 5 holding the objective lane, the recorded substitution for the dark Sol bench (`codex` is not installed in this container on 2026-09-05): constraints, correctness, cost, and falsification of each lens's central claim. Lens O proposes no design of its own.

Each lane performs the assignment directly and spawns nothing. Each lane is read-only, writes no file, and returns its report as its final message.

## Objective

Return candidate designs (Lenses A, B, C) and the constraint ruling (Lens O) an Orchestrator needs to choose the three options a `PROPOSAL.md` presents to the repository owner, each with a mechanism, a worked example on real scaffold code, an edit-cost account, a statement of which existing checks survive, and a fleet migration path.

## The owner's ask, verbatim

> Let's look at options for simplifying, deduplicating, and cutting down on waste. I feel that guides are important but so are the TS Doc comments, especially for IDE's and when reading source code, but guides are also important documentation that summarizes without having to do deep into the source code. I think having to write out the guides is a lot of duplication, so I'm thinking of having comprehensive tsdocs and then generating guides from them using tsdocs but I also don't want to get rid of all the important checks that guide does, maybe we can move some to oxlint or oxfmt like we have for other. My main concern has been all the work we did simply updating prose, especially at more than one site. Also, how can we come up with something for both LLMs and humans, especially with the voice and time and conventions we have come up with for our instructions in AGENTS.md/CLAUDE.md/agents/rules/skills. Do your research, pay special attention to scaffold and guide. Also check on tsdoc and how it works as well as oxfmt and oxlint.

## Context

**Distillates.** Read these first; they are the absorbed evidence and carry `file:line` pointers you must cite rather than re-derive:

- `/home/user/scaffold/tmp/cursor/docs-absorb.result.md` — the repository terrain: guide anatomy, the `@orkestrel/guide` check catalog, TSDoc in use, duplication pairs, multi-site edit cost from `git log`, vendoring and regeneration mechanics, the oxlint `policy` JS plugin, installed tool surfaces, rendering primitives, README overlap.
- `/home/user/scaffold/tmp/cursor/docs-research.result.md` — primary sources: TSDoc, api-extractor and its doc model, TypeDoc, the TypeScript compiler API, oxlint jsdoc rules and JS plugin API, oxfmt, llms.txt, single-source precedents in other ecosystems, prose linters.
- `/home/user/scaffold/tmp/units/docs-research-web-report.md` — the web rows the Grok lane could not reach (its CLI's web tools were rejected), re-run on the native `researcher`: tsdoc.org semantics, api-documenter, TypeDoc, oxc.rs documentation, llms.txt, single-source precedents in other ecosystems, prose linters.
- `/home/user/scaffold/tmp/units/docs-orchestrator-measurements.md` — the Orchestrator's own probes: oxfmt 0.65.0 already formats and checks every Markdown file in the tree under `npm run format:check`, and TSDoc (`@remarks`, `@example`, `{@link}`) survives the api-extractor rollup into the published `dist/src/core/index.d.ts`.
- `/home/user/scaffold/tmp/units/docs-ecosystem-report.md` — the fleet map: per-package guide, parity suite, README, `@packageDocumentation`; rendering primitives by layer; dependents of `@orkestrel/guide`; blast radius by edge class.

**Terrain facts measured by the Orchestrator on 2026-09-05 at commit `792a9739`:**

```text
$ grep -c '^\s*/\*\*' src/core/*.ts (summed) → 215 doc blocks over 212 top-level exports; src/server 141 over 101; src/bin 73 over 69
$ grep -n '^## ' guides/scaffold.md → Surface:45 Methods:426 Command line:475 Blueprint:758 Compile:868 Ownership and drift:956 Fleet catalog:1075 Dependency floors:1120 Vendored data root:1194 Generated workspace:1318 Library:1379 Limits:1522 Tests:1756 See also:1794 (1798 lines)
$ cat .oxlintrc.json → "jsPlugins": [{ "name": "policy", "specifier": "./configs/policy.ts" }]; rules policy/no-mocking, policy/no-keyword-privacy — the precedent for a repository-owned lint rule
$ package.json devDependencies → @microsoft/api-extractor (already pinned fleet-wide through DECLARATION_DEV_DEPENDENCIES at src/core/constants.ts:508-511, used by vite-plugin-dts to roll up declarations), oxfmt, oxlint, typescript
$ guides/README.md § Line reference → every guides/<name>.md other than scaffold.md is a byte-identical mirror fetched from that package's main; scaffold new seeds them and scaffold catalog refreshes them
$ .claude/agents/orkestrel.md → carries a catalog table `scaffold catalog` regenerates inside an authored file — the precedent for a generated region
$ guides/guide.md § The check catalog → checks SB (surface bijection), MB (methods bijection and class-no-extra), LI (link integrity), TE (tests-link existence), NV (non-vacuousness), FL (fence-language listing), EX (examples presence, from fences or an @example tag), FI (fence-import reality); tests/guides.test.ts additionally executes flagship fences under `describe('guide examples')`
```

**Law.** `AGENTS.md` (§ Non-negotiable rules — no new npm package without the owner's request; § Design laws; § Writing; § Instruction files), `.claude/rules/documentation.md`, `.claude/rules/typescript.md` lines 76-88 (the TSDoc rules), `.claude/rules/writing.md`, `.claude/rules/quality.md` § Ecosystem reuse, `.claude/rules/architecture.md`; skill: none; guides: `guides/README.md`, `guides/scaffold.md`, `guides/guide.md`, `guides/markdown.md`, `guides/template.md`.

**Host.** Read-only tools over `/home/user/scaffold` and `/home/user/fleet/<package>`; no shell, no network.

**Measurements.** The counts in the terrain block. Take none yourself; cite the distillates.

**Control identifiers.** none.

**Standing conditions.** The Sol bench is dark, so the objective lane runs on Opus as `reviewer`; that substitution is recorded here and in the routing ledger. The three guides distillates may name unknowns; treat an unknown as a constraint your design must state, never as a fact to invent.

## Unknowns

- Whether oxfmt formats Markdown at the installed version, and whether an oxlint JS plugin rule can read comment text: the research distillate answers or names each as open. Where open, state your design's dependence on the answer as a labelled assumption.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## What each lens produces

**Lenses A, B, C.** Return one to three options inside your lens. For every option give these blocks, in this order, under an `## Option <lens><n> — <name>` heading:

1. **Mechanism.** Which artifact is the source of truth for which fact; what reads it; what is generated, where it lands, and what regenerates it (name the verb — for instance a `scaffold` subcommand — and the trigger). Name the line primitives used (`@orkestrel/markdown`, `@orkestrel/template`, the TypeScript compiler API, api-extractor's doc model) with pointers into the distillates, and name every new npm dependency the option would need, or `none`.
2. **Worked example.** Take one real scaffold symbol with TSDoc today (`createBlueprint` in `src/core/factories.ts` or `helpers.ts`, `Materializer` in `src/server/Materializer.ts`, or a `CatalogEntry`-class type in `src/core/types.ts`) and show, in fenced blocks: its TSDoc as the option would have it written, and the guide passage the option would produce or keep for it. Then show the AGENTS.md-voice consequences: which writing rules apply to the TSDoc, and how the guide's noun-phrase tagline and Surface-row description relate to the TSDoc's third-person sentence (derived, transformed, or authored separately).
3. **Edit cost.** For each change kind — rename an export, add an options field, change a behaviour claim, add a documented limit, add a CLI flag — list the files a developer edits before the option and after it, and the check that catches a site they forgot.
4. **Checks.** For each catalog check SB, MB, LI, TE, NV, FL, EX, FI and the executed fences: survives unchanged, changes (say to what), becomes tautological (say why), or moves (say where — an oxlint rule in the `policy` plugin, an oxfmt pass, a `scaffold` verb, a vitest project). Add every new check the option needs.
5. **Humans and LLMs.** What an IDE hover shows, what a human reading GitHub sees, and what an LLM agent loads, under the option; and where the voice conventions (`AGENTS.md` § Writing, `.claude/rules/writing.md`, § Instruction files) live so they are stated once.
6. **Migration.** The order across scaffold, `@orkestrel/guide`, and the fleet (by the ecosystem distillate's layers and edge classes), what a package edits to adopt, and what stays byte-identical for mirrors.
7. **Risks and open questions.** Named, with the evidence that would settle each.
8. **Claims.** Three to five numbered falsifiable claims the option rests on, each with the evidence that would refute it.

**Lens O.** Return, under these headings: `## Constraints every option must satisfy` (from the installed tool surfaces, the no-new-dependency rule, the vendoring model, the fleet blast radius, and the writing rules — each with a pointer); `## What the existing checks actually catch` (from the roadmap and git history in the absorb distillate: which checks found real drift, which never fired); `## Cost model` (a table of edit sites before any change for the five change kinds in block 3, with pointers, as the baseline the options are measured against); `## Falsification of the three lenses' central claims` (state each lens's central claim as the brief defines the lens, and the evidence that would refute it); `## Evaluation criteria` (the criteria an Orchestrator uses to rank options, each measurable). Propose no option.

## Output

Return only the sections named for your lens, then exactly one terminal line: `DESIGN <LENS>: <n> option(s)` for A, B, C, or `DESIGN O: ruled` for O. No process diary.

## Deviation contract

A distillate file that does not exist stops the lane: report the path and end. A distillate that names an unknown does not stop the lane: carry it as a labelled assumption.

## Acceptance criteria

- Every option carries all eight blocks; Lens O carries all five headings.
- Every factual claim about the repository or a tool cites a distillate pointer or a `file:line`.
- No option adds an npm dependency without saying so in block 1.
- No count appears in prose outside a table cell or a measurement quoted with its command.
