# Unit D4-S — `@orkestrel/supervisor`: author the package guide the fleet's hosted set lacks

## Role and engine

`implementer` on Opus 5, a native Claude subagent (tools: Read, Grep, Glob, Edit, Write, Bash).
Perform the assignment directly and spawn nothing. You are the sole writer in the
`C:/Users/mikes/WebstormProjects/supervisor` checkout while this unit runs.

## Objective

Write `guides/supervisor.md` so that `@orkestrel/supervisor` has the guide every other published
package has: a tagline, the `## Surface` tables for `src/core` and `src/server`, the `## Methods`
tables for its behavioural interfaces, `## Contract`, `## Patterns`, `## Tests`, and `## See also`,
in parity with the source (`npm run test:guides` green). The scaffold's hosted guide set (design
round D4, `.orkestrel/campaign/plan.md` § Re-baseline 3) refuses to stage while a catalog row has
no guide, and `@orkestrel/supervisor` is that row.

## Context

**Evidence.** The checkout is clean at `edf80e6`, version `0.0.2` (`package.json:3`; the fleet
catalog row still reads `0.0.1` — `scaffold catalog` regenerates it, not you). `guides/` holds
mirrors of other packages and no `supervisor.md` (`ls guides`). `src/core/index.ts` re-exports
`types`, `constants`, `errors`, `validators`, `parsers`, `shapers`, `helpers`, `factories`,
`ExecutorManager`, `RunManager`, `UnitManager`, `Supervisor`; `src/server/index.ts` re-exports
`types`, `constants`, `helpers`, `factories`, `executors/ProviderExecution`,
`executors/ProviderExecutor`, `providers/ClaudeProvider`, `providers/CodexProvider`,
`providers/CursorProvider`. `tests/guides.test.ts` runs `@orkestrel/guide`'s checks over the
`GUIDE_MANIFEST` that `tests/setupGuides.ts` parses from `guides/README.md` (`documents every
source export`, `documents only real exports`, `exposes no hidden module-scope declarations`,
methods tables, fence imports, links). `README.md`'s pitch (the blockquote under the H1) must
equal the guide's tagline. The model guide for a package with a core and a server face:
`C:/Users/mikes/WebstormProjects/scaffold/guides/scaffold.md` (section order and voice) and
`C:/Users/mikes/WebstormProjects/agent/guides/agent.md` (a core-only guide of the same line).
`@orkestrel/guide` is installed (`^0.0.15`): read `node_modules/@orkestrel/guide/dist/src/core/index.d.ts`
and, where `guides/guide.md` in this checkout documents it, the rewrite direction
`npm run test:guides -- --to guide`, which writes Surface rows from the doc blocks — use it to
seed the tables where the installed version supports it, then author the prose.

**Law.** scaffold `AGENTS.md`; `.claude/rules/documentation.md` (parity: every backticked API
resolves, every export documented, `Summary` equals the doc-block description paragraph, Methods
tables per behavioural interface, README pitch equals tagline), `.claude/rules/writing.md`,
`.claude/rules/typescript.md` (TSDoc voice), `.claude/rules/names.md`.

**Host.** Windows 11, Git Bash; `npm run <script>` works. No network. Do not run tree-wide
`format` or `lint --fix`; scoped `npx oxfmt --config .oxfmtrc.json --write <owned files>` is
permitted.

**Measurements.** Before editing: `npm run test:guides` (record the reading; it may already
pass over the mirrors alone) and `npm run check`.

**Standing conditions.** The checkout's `@orkestrel/scaffold` pin is `^0.0.60` and its vendored
files are that release's; do not run `scaffold repair` or touch the vendored set. Do not bump
`version`. Add no package.

## Unknowns

- Whether every exported declaration carries a doc block whose first paragraph can be a `Summary`
  cell: where one is missing or malformed, add or correct the TSDoc (comments only; no code
  change) and list each in the report.

## Scope

**Owned.** `guides/supervisor.md` (new), `guides/README.md` (the concept and directory rows for
this package's guide), `README.md` (the pitch, only if it must equal a tagline you author),
`tests/setupGuides.ts` and `tests/guides.test.ts` (only if the manifest shape must admit the new
guide), TSDoc comments in `src/**` (no code). **Off-limits.** Code in `src/**`, `app/**`,
`package.json`, `package-lock.json`, the `scaffold repair` set, other guide mirrors, `dist/**`.

## Execution

Perform the assignment directly and spawn nothing. Seed the Surface tables from the source
(the guide command's rewrite direction where available, else by reading each declaration), then
write the prose sections in the voice the rules fix: tagline as a noun phrase; the opening
paragraphs naming the nouns (`Supervisor`, `RunManager`, `UnitManager`, `ExecutorManager`, the
provider executors) and what each owns; `## Contract` as the numbered invariants the code keeps;
`## Patterns` with fences importing through `@orkestrel/supervisor` and `@orkestrel/supervisor/server`;
`## Tests` naming the suites that exist.

## Output

Final message: the guide's section list with line counts; `git diff --stat`; `git status
--porcelain`; the baseline and final `npm run test:guides` readings; the TSDoc edits made (file
and symbol); deviation state. No process diary.

## Deviation contract

Stop and report on: a parity failure that needs a code change; a manifest shape the guide cannot
enter without editing a vendored file. Decide, record, carry on for section wording and fence
choice.

## Acceptance criteria

1. `npm run test:guides` exit 0 with `guides/supervisor.md` in the manifest.
2. `npm run format:check` and `npm run lint:check` exit 0.
3. `npm run check` exit 0 (TSDoc-only edits cannot move it; confirm).
4. `README.md`'s pitch equals the guide's tagline.
5. Only owned files changed.
