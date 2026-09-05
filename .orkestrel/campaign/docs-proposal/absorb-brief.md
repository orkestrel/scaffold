# Unit docs-absorb — how documentation is produced, duplicated, and checked across scaffold and the fleet

## Role and engine

`grok` on Cursor Grok (`cursor-grok-4.6-high`), reached through the `agent` CLI in `--mode=ask`. You are the bench engine reading this brief inside your own CLI. Perform the assignment directly and spawn nothing.

## Objective

Return a distillate, with `file:line` pointers, of how prose documentation is authored, duplicated, generated, vendored, and checked in the `@orkestrel/scaffold` repository at `/home/user/scaffold` and across the fleet checkouts at `/home/user/fleet/<package>`, so an Orchestrator can design a single-source documentation pipeline without reading those trees itself.

## Question

Where does the same documentary fact live at more than one site today, which mechanism owns each site, and what does each existing check (guides parity, policy sweep, oxlint policy plugin, oxfmt) prove about it?

## Context

**Evidence.** Commands run by the Orchestrator on 2026-09-05 from `/home/user/scaffold`:

```text
$ ls guides/            → README.md plus one <package>.md mirror per published @orkestrel package (49 files)
$ ls /home/user/fleet/  → one checkout per package: abort agent brief browser budget codec console contract csv database emitter form guide html indexeddb interpret lsp markdown mcp middleware msg ndjson ollama pool probe process program qualifier queue rater reason relation router sea server sqlite sse table template terminal test timeout tool toolbox websocket worker workflow workspace
$ node -e 'require("./package.json").scripts' → lint: "oxlint --config .oxlintrc.json --fix .", format: "oxfmt --config .oxfmtrc.json --write .", test:guides: "vitest run ... --project guides"; devDependencies include @microsoft/api-extractor, @orkestrel/guide, oxfmt, oxlint, typescript, vite-plugin-dts
$ cat .oxlintrc.json    → "jsPlugins": [{ "name": "policy", "specifier": "./configs/policy.ts" }]; rules policy/no-mocking, policy/no-keyword-privacy
$ grep -c '^\s*/\*\*' src/core/*.ts (summed) → 215 doc blocks over 212 top-level exports; src/server 141 over 101; src/bin 73 over 69
$ grep -n '^## ' guides/scaffold.md → Surface:45 Methods:426 Command line:475 Blueprint:758 Compile:868 Ownership and drift:956 Fleet catalog:1075 Dependency floors:1120 Vendored data root:1194 Generated workspace:1318 Library:1379 Limits:1522 Tests:1756 See also:1794 (1798 lines)
$ grep -n '^## ' guides/guide.md → Surface:26 Methods:193 The extraction model:248 The check catalog:376 The pure file-inventory model:424 Patterns:435 Tests:537 (553 lines)
$ grep -nE '^\s*(describe|it)\(' tests/guides.test.ts → 'documents every barrel-reachable export' :99, 'documents nothing the barrels do not export' :109, 'documents the members of every behavioural declaration' :119, 'resolves every relative link to a real file' :171, 'imports only real exports in its code fences' :182, 'executes the blueprint defaults example' :212, and further executed-fence cases
$ grep -rn api-extractor src/core/constants.ts → DECLARATION_DEV_DEPENDENCIES pins '@microsoft/api-extractor' beside 'vite-plugin-dts' (:508-511)
```

**Law.** `AGENTS.md` § Writing and § Instruction files; `.claude/rules/documentation.md`; `.claude/rules/typescript.md` (the TSDoc bullets at lines 76-88); `.claude/rules/writing.md`; skill: none; guide: `guides/README.md` and `guides/guide.md`.

**Host.** Linux container, bash, working path `/home/user/scaffold`; `/home/user/fleet/<package>` are sibling checkouts you may read. Network: none needed; do not fetch. `node_modules/` under `/home/user/scaffold` is installed and readable; read package sources and READMEs there for the installed oxlint, oxfmt, `@microsoft/api-extractor`, `@microsoft/tsdoc`, `typescript`, and `@orkestrel/guide` surfaces. Never run `npm install` or any mutating command; an `npm` shim on `PATH` refuses install-class subcommands.

**Measurements.** The counts in the evidence block were taken on 2026-09-05 at commit `792a9739` with a clean tree. Take any count you report yourself with the command that produced it.

**Control identifiers.** none.

**Standing conditions.** Every `guides/<name>.md` other than `guides/scaffold.md` is a byte-identical mirror fetched from that package's own repository (`guides/README.md` § Line reference), so read a mirror as evidence about its package and never as a site this repository authors. `tests/guides.test.ts` under a fleet checkout may be a scaffold-vendored file or a package-owned file; report which by reading `host.json` at `/home/user/scaffold/host.json` (the inventory of vendored paths).

## Unknowns

- Whether oxfmt, at the installed version, formats Markdown, JSON, YAML, or comment bodies. Report from `node_modules/oxfmt/` files (README, schema, binary help text if a README lacks it) with the version from `node_modules/oxfmt/package.json`.
- Whether an oxlint JS plugin rule can read comments and JSDoc/TSDoc blocks at the installed version. Report from `node_modules/oxlint/` typings and README with the version.
- Whether the published `dist/**/index.d.ts` files keep TSDoc blocks after `vite-plugin-dts` and api-extractor roll them up. Report from `/home/user/scaffold/dist/src/core/index.d.ts` if it exists (do not build).

## Scope

**Owned.** none — this lane is read-only.

**Shared (report-only).** none.

**Off-limits.** Every file: create, edit, and delete nothing; run no command that changes the tree; never touch `.git/`, `.env*`, `.npmrc`, `auth.json`, or any credential.

**What asserts the state this change ends.** none — no change.

**Tools and limits.** Read-only file reading and searching; `git log` and `git show` are permitted for history reading. No installs, no builds, no network.

## Execution

A bench engine reading this brief inside its own CLI: perform the assignment directly and spawn nothing.

## Evidence sought

Cover every row. Give `file:line` pointers for every fact, and quote at most three lines per pointer. Never dump a file.

1. **Guide anatomy.** From `.claude/rules/documentation.md`, `guides/README.md`, and `guides/scaffold.md`: what sections a guide must carry, what the `## Surface`, `## Methods`, and `## Tests` sections encode, and what a "Surface row" and a "tagline" are. Then read the same shape in three fleet guides of different sizes: `/home/user/fleet/emitter/guides/emitter.md`, `/home/user/fleet/markdown/guides/markdown.md`, `/home/user/fleet/contract/guides/contract.md`.
2. **The check catalog.** From `guides/guide.md` § The check catalog and `/home/user/fleet/guide/src/core/*.ts`: list every check the `@orkestrel/guide` package can run (name, what it proves, what input it reads), and mark which of them `tests/guides.test.ts` in scaffold runs and which `/home/user/fleet/emitter/tests/guides.test.ts` and `/home/user/fleet/markdown/tests/guides.test.ts` run. Say what `createSource` reads (text scanners, per the guide's tagline) and what it cannot see (types, TSDoc content).
3. **TSDoc as it stands.** From `src/core/types.ts`, `src/core/helpers.ts`, `src/server/Materializer.ts`, and `src/bin/CLI.ts`: which TSDoc tags are in use (`@remarks`, `@example`, `@param`, `@returns`, `@throws`, `@see`, `{@link}`, `@packageDocumentation`, `@defaultValue`, `@typeParam`, others) with one pointer each, and how often `@example` appears per file. Report whether `src/core/index.ts` carries a `@packageDocumentation` block.
4. **Duplication pairs.** Find five concrete pairs where a TSDoc block in `src/` and a passage in `guides/scaffold.md` state the same fact (a Surface row description matching a doc summary; a `@remarks` paragraph matching a guide paragraph; an `@example` matching a fence). Quote both sides briefly with pointers. Then find two pairs where the two sites disagree in wording or in substance.
5. **Multi-site edit cost.** Run `git log --since=2026-08-20 --name-only --format='%h %s' -- src guides tests README.md` and report the commits whose file list touches a `src/**` file together with `guides/scaffold.md` and a `tests/**` file, with the subject line of each. Then report, from `ROADMAP.md` lines 120-135 and 265-280, what the roadmap already records about guide and TSDoc voice repair.
6. **Vendoring and generation mechanics.** From `src/server/Upstream.ts`, `src/server/Materializer.ts`, `src/core/constants.ts` (`ARTIFACT_TEMPLATES`), and `guides/scaffold.md` § Vendored data root and § Generated workspace: how guide mirrors are fetched and refreshed, what `scaffold new` seeds for a package's own guide, whether `tests/guides.test.ts` is vendored or package-owned (read `host.json`), and how `.claude/agents/orkestrel.md`'s catalog table is regenerated (the precedent for a generated region inside an authored file, if one exists — find any marker comments such as `<!-- ... -->` that bound a regenerated region in `.claude/agents/orkestrel.md` or `guides/*.md`).
7. **Existing lint and format enforcement of prose.** From `configs/policy.ts`, `.oxlintrc.json`, `.oxfmtrc.json`, `.prettierignore`, `.oxlintignore`, and `tests/policy.test.ts`: which rules exist in the `policy` JS plugin (rule names, what each visits, where messages live), how a rule is registered, whether any rule or test reads Markdown or comment text, and whether the `.claude/rules/writing.md` § Substitutions table is enforced by any mechanism (search `tests/`, `configs/`, `src/` for `should`, `simply`, `leverage` as data, and for the words `substitution` and `banned`).
8. **Installed tool surfaces.** From `node_modules/oxlint/` (README, `package.json` version, any `.d.ts`), `node_modules/oxfmt/` (same), `node_modules/@microsoft/api-extractor/` and `node_modules/@microsoft/tsdoc/` (README and `package.json` version): the JS plugin API shape oxlint exposes (`definePlugin`, `defineRule`, context methods, whether comments are reachable), the file types oxfmt formats and its config keys, and whether api-extractor produces an `.api.json` doc model and what consumes it. Report the installed version of each.
9. **Rendering primitives in the line.** From `guides/markdown.md` § Surface and `guides/template.md` § Surface (mirrors): the exported symbols that parse or render Markdown (`parse`, `render`, `stringify`, table helpers) and that fill templates, with pointers, so the Orchestrator knows what the line already owns for generating Markdown from data.
10. **README and guide overlap.** Compare `/home/user/scaffold/README.md` with `guides/scaffold.md` § Command line: which facts appear in both, with pointers.

## Output

Return only these sections, in this order:

- `Question`: one line.
- `Evidence`: numbered to match the ten rows, each row a list of facts with `file:line` pointers.
- `Distillate`: the smallest reading the next engine needs — the sites where one fact lives twice, the mechanism that owns each site, and the checks that prove each site, in at most 40 lines.
- `Unknowns`: every row or sub-question the distillate did not reach, and each of the three named unknowns with its answer or the reason it stayed open.
- `Journal`: the journal path and the session id from the `init` event.
- `Deviation`: `none`, or the exact command that failed and its output.

## Deviation contract

Stop and report if a path in this brief does not exist, if a read is refused, or if any command changes the tree. A missing pointer for a single fact is not a deviation: report the fact as unreached under Unknowns.

## Acceptance criteria

- Every row of Evidence sought has facts with `file:line` pointers or is named under Unknowns.
- No decision, recommendation, or design appears anywhere in the return.
- `git status --porcelain` is unchanged by the run.
