# scaffold readiness fix unit 2 — the shape-and-prose half, plus the fleet register

## Role and engine

Claude Opus 5 `implementer`, native, writing in the main checkout at `/home/user/scaffold`.

## Objective

Close the remaining scaffold rows of the `tmp/readiness-matrix.md` file — SR2 with SR16 and SR3,
SR4 through SR9, SR11, SR15 — and register the process function domain in the fleet register.

## Context

- Read before editing: the `AGENTS.md` file, `.claude/rules/names.md`,
  `.claude/rules/typescript.md`, `.claude/rules/architecture.md`, `.claude/rules/writing.md`,
  `.claude/rules/tests.md`, `.claude/rules/documentation.md`, the `guides/scaffold.md` guide, and
  the `tmp/readiness-matrix.md` file (the row evidence with exact lines).
- The tree is committed and clean at 0db3921 (fix unit 1 landed: the pass-through factories are
  deleted and `remove` takes the plan). You are on the host; scoped runs are your criteria and
  whole-suite readings are observations under concurrent load.
- The rows:
  - **SR2 + SR16 + SR3** — the substitution-table sweep: `should` (guide:691, README:98,
    WriteTransaction.ts:230, :269, server/types.ts:193, :201, Materializer.ts:327, :356,
    Compiler.ts:133, compilers.ts:1660), `currently` (guide:765, Upstream.ts:197, CLI.ts:504),
    `simply` (guide:1125), `just` (guide:454 and bin/constants.ts:118, which ships in `--help`),
    `easy` (compilers.ts:1038), `via` (templates.ts:694), `newer` as a version range (guide:25,
    README:16), temporal `once` (guide:1146), and the `should` the templates emit into every
    generated workspace (templates.ts:946, :991). Line numbers predate fix unit 1 — re-locate by
    pattern. Rule every hit by sense, keep the recorded permitted senses (registry `latest`,
    temporal `just` in Materializer, frequency `once`, member-naming `both`), and name the pattern
    and paths of your sweep. The template halves land together: `templates.ts` and this
    repository's own materialized copy of the affected template output.
  - **SR4** — `WriteTransaction.directory()` is a bare-noun method performing the class's only
    eager mutation; its own TSDoc verb and private-method name say `establish`. Rename to
    `establish`, updating `Materializer`, tests, and the guide table.
  - **SR5** — `Scaffolding.blueprint?: never` refuses consumer values with no narrowing work.
    Delete the member, keep the corrected `@remarks` (noting `scaffolding.plan.blueprint` serves
    the completed case).
  - **SR6** — guides/README.md:41-46 states the dependency set wrong in both directions (names
    terminal, omits process). Correct it from the actual manifest.
  - **SR7** — guide absolutes the code contradicts: the `--help` exception (guide:466), the
    `--json` premise (guide:573 against CLI.ts:167), the `endsWith` example claim (guide:993).
    The matrix carries the subjective lane's corrected sentences as the prescription.
  - **SR8** — platform-conditioned `skipIf` sites: read each; where the mechanism is cited beside
    the skip, record it permitted; where only the platform is named, move the mechanism into the
    skip's reason.
  - **SR9 + SR15** — ROADMAP.md: strike the rows the catalog table already carries (the `form`
    mirror row stays open), and add one row recording the owed Windows anchor-swap interleaving
    proof (WriteTransaction.test.ts's skipped attack needs a Windows host this campaign lacks).
  - **SR11** — the canonical `.agents/orchestration.md` in this repository (the host inventory
    owns the vendored copies): add one sentence under § Where campaign artifacts live permitting a
    single shared `.orkestrel/campaign/` folder for a campaign spanning several packages. One
    sentence, directive form, nothing else.
  - **The fleet register** — `tests/setupPolicy.ts:187` (this repository's copy is the canonical
    host-inventory source that `stageHost` stages into `dist/host`): add `'src/server/execution'`
    to `FUNCTION_DOMAIN_FOLDERS`, so the process repository can home its one-shot execution
    functions as single-function modules. The entry is data; it makes the path eligible
    everywhere and obliges nothing where the folder is absent.
- The vendored-surface edits (`tests/setupPolicy.ts`, `.agents/orchestration.md`, `templates.ts`)
  are published `dist/host` and `dist/src` surface; the wave's scaffold bump already carries them.

## Unknowns

- Whether the affected template output has a materialized copy in this repository is yours to
  establish by running the sweep over `configs/` and the generated files; report what you found
  and changed.

## Scope

- Owned: `src/`, `tests/src/`, `tests/setupPolicy.ts` (the named line's array only),
  `guides/scaffold.md`, `guides/README.md`, `README.md`, `ROADMAP.md`, `.agents/orchestration.md`
  (the named sentence only), `configs/`, `bin/` if the `--help` constant lives there.
- Off-limits: `package.json`, `vite.config.ts`, `tsconfig.json`, `tests/policy.test.ts`,
  `tests/guides.test.ts` unless a rename breaks its parity (then the parity row moves with the
  rename and you record it), `tmp/` except your own report file.
- Permission limits: no commit, no push, no install, no `git checkout`/`restore`/`stash`/`reset`/
  `clean`, no secrets.

## Execution

You perform this assignment directly and spawn no agent.

## Output

Write your report to the `tmp/fix2-report.md` file: per row, what changed with file:line, the
sweep pattern and paths with per-hit rulings (permitted senses recorded, not dropped), the SR8
per-site table, the SR4 residue sweep, and any claim of your own you flag. End with the diffstat.
No process diary.

## Deviation contract

A conflict with a row's prescription stops the unit with the standard report. An ancillary choice
(sentence form, row placement) is yours to decide and record.

## Acceptance criteria (in order)

1. `npm run lint:check` exits 0.
2. `npm run check` exits 0.
3. `npm run format:check` exits 0 (run `npm run format` first if needed).
4. The sweep result names its pattern and paths and leaves no banned-sense hit in the named files;
   every kept hit carries its permitted-sense ruling.
5. `rg -n "\.directory\(" src/ tests/ guides/scaffold.md` returns no hit on the renamed method,
   and `establish` appears in the guide's method table.
6. `rg -n "blueprint\?: never" src/` returns no hit.
7. `FUNCTION_DOMAIN_FOLDERS` in tests/setupPolicy.ts contains `'src/server/execution'`, and
   `npm run test:policy` exits 0.
8. The SR11 sentence is present in `.agents/orchestration.md` under § Where campaign artifacts
   live, and `.orkestrel/campaign` appears nowhere else in the file.
9. Scoped vitest runs over the files you touched pass; whole-suite readings are observations.

## Review evidence

Return the actual `git diff --stat` and `git status --short` output in the report. The full diff
stays in the tree for the auditor.
