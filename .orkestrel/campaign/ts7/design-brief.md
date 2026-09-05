# Unit ts7-design — the plan for moving the line from TypeScript 6.0.3 to 7.0.2

## Role and lane

Two blind lanes read this one brief:

- Subjective lane, `planner` on Opus 5: the shape of the migration — its units, their order, what each package edits, what stays, and how the JavaScript-API retirement is phased so the line never carries two conventions at once.
- Objective lane, `reviewer` on Opus 5 holding the objective lane, the recorded substitution for the dark Sol bench (`codex` is not installed in this container on 2026-09-05): constraints, correctness, what each tool permits at its installed version, the fleet blast radius by edge class, and the falsification of the planner's central claims. Proposes no plan of its own.

Each lane performs the assignment directly and spawns nothing; each is read-only, writes no file, and returns its report as its final message.

## Objective

Return a migration plan (subjective lane) and its constraint ruling (objective lane) an Orchestrator can turn into implementation units: scaffold first, then the fleet through a scaffold release, ending with `typescript` at 7.0.2 as the type gate everywhere and every in-process API use either on the bridge or retired.

## The owner's ask, verbatim

> I fully agree with the proposal and it's recommendations, only issue would be the use of the typescript package since typescript 7 will break the API we use since they got rid of the runtime, they moved it to a different language and we can't use typescript directly like that. Look up what I'm talking about and then let me know the alternative in the meantime, I would even say to look up how we can move from 6.0.3 to the latest 7 version, and do that change first then look at what we can do once we have done that.

## Context

**Distillates.** Read these first and cite them rather than re-deriving:

- `/home/user/scaffold/tmp/cursor/ts7-absorb.result.md` — every site in scaffold and the fleet that imports `typescript` or runs `tsc`, the members each uses, the tsconfig options in use, the declaration build's plugin options, what `DECLARATION_DEV_DEPENDENCIES` and the templates pin, and the 7.0.2 package's API surface.
- `/home/user/scaffold/tmp/units/ts7-research-report.md` — the primary sources: the 7.0 and 6.0 announcements, the typescript-go notes, tooling support (`vite-plugin-dts`, api-extractor, vitest, vite, oxlint, `vue-tsc`, Playwright), the parser alternatives, `process.execve`.
- `/home/user/scaffold/.orkestrel/campaign/ts7/orchestrator-measurements.md` — the Orchestrator's probes with their commands: `tsc` 7.0.2 passes every scaffold tsconfig with `--noEmit` and emits declarations; `import ts from 'typescript'` under 7.0.2 yields a version object only; `typescript/unstable/sync` opens scaffold's core project in 61 ms and returns documentation comments and JSDoc tags through the checker; `typescript/unstable/ast` has 409 exports (guards, scanner, visitors, `getJSDocTags`) and no in-process parser; `vite-plugin-dts` fails under 7.0.2 until `@typescript/typescript6` (6.0.2, `main: lib/typescript.js`, the full 6.x API) is installed beside it, after which both plugin lines build the rollup unchanged; Node v22.22.2 carries `node:module`'s `stripTypeScriptTypes` (experimental) and `process.execve`.
- `/home/user/scaffold/PROPOSAL.md` § Option 3 and § Option 1 — the documentation proposal the owner accepted; its compiler-API control path is what this migration must re-home.

**Law.** `AGENTS.md` (§ Non-negotiable rules: no npm package without the owner's request — the owner's ask above requests the move to TypeScript 7 and asks for the alternative in the meantime, so name `@typescript/typescript6` as the bridge Microsoft prescribes and mark it for the owner's explicit confirmation; § Project model: no second source-language analyzer; § Design laws), `.claude/rules/workspace.md`, `.claude/rules/tests.md`, `.claude/rules/quality.md`, `.agents/orchestration.md` § Publishing the fleet (a vendored byte change bumps and publishes scaffold; each target re-pins, runs `repair`, and proves its gates), `.agents/skills/orkestrel-publish/references/wave.md` § Rule on the bump; skill: none; guides: `guides/scaffold.md` § Vendored data root, § Generated workspace, § Dependency floors.

**Host.** Read-only tools over `/home/user/scaffold`, `/home/user/fleet/<package>`, and `/home/user/scaffold/tmp/ts7/package` (the unpacked 7.0.2 tarball). No shell, no network.

**Measurements.** Those in the measurements file. Take none yourself.

**Control identifiers.** none.

**Standing conditions.** The Sol bench is dark; the objective lane runs on Opus as `reviewer`. `vue-tsc` has no TypeScript 7 support (research row 5); whether any package in the line runs `vue-tsc` is in the absorb distillate.

## Unknowns

- Whether the 7.1 API (announced as "new and different") will keep the `unstable/sync` shapes; treat every `unstable/*` use as a preview dependency and say so in the plan.

## What each lane produces

**Subjective lane.** Under `## Plan`: the units in order, each with owned files, the exact edits (dependency ranges, imports, scripts, templates, constants, host inventory), the gate that proves it, and its blast radius. Rule explicitly on: (1) the bridge — `@typescript/typescript6` declared where, and which sites import it in the meantime; (2) the retirement phases — which in-process API uses move to oxlint `policy` plugin rules (the AST-shaped policy checks), which to `node:module`'s `stripTypeScriptTypes` (fence transpile), which to `typescript/unstable/sync` (checker-level needs, a generated workspace's type check, the proposal's control path), and which stay on the bridge until 7.1 is read; (3) the engines floor (`process.execve` and `stripTypeScriptTypes` both need Node later than the line's stated 22.12); (4) `vue-tsc` and the browser environments; (5) the fleet order by edge class (scaffold release → per-target re-pin, `repair`, re-pin `typescript`, swap the package-owned `tests/guides.test.ts` import, gates), naming `probe`, `lsp`, and `database` where they need more than the shared two sites; (6) what the documentation proposal's Option 1 and Option 3 change as a result. Under `## Claims`: five falsifiable claims with the evidence that refutes each. Under `## Open questions`: what a probe settles before the first unit.

**Objective lane.** Under `## Constraints`: each with a pointer. Under `## Blast radius`: per edge class, which packages and files a scaffold release reaches and what each target must do. Under `## Falsification`: the planner's likely central claims (the bridge is a drop-in for every site; the type gate needs no config change; the declaration build is unchanged; the retirement can be phased; the engines floor can rise) and the evidence that would refute each. Under `## Evaluation criteria`: measurable criteria for the Orchestrator's ranking.

## Output

Return only your lane's sections, then exactly one terminal line: `DESIGN SUBJECTIVE: planned` or `DESIGN OBJECTIVE: ruled`. No process diary.

## Execution

A native subagent: perform the assignment directly and spawn nothing.
