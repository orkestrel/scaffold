# Design brief — the ephemeral probe mechanism

## Objective

Design the mechanism that lets an agent working in this repository prove a thought
immediately, in one call, with typecheck + lint + execution evidence returned together.
Work back from the most aggressive possible design to the one this repository can actually
adopt. Return a ruling, not a survey.

## The user's stated want (verbatim intent, do not soften)

- Probes today are written to `tmp/probe/` and run with `npm run test:probe`. Too slow, too
  manual, too easy to skip.
- Wanted: "as close to the agent's fully thought idea tested, checked, and linted
  immediately, in memory with all the configurations applied, and even in its own
  environment and isolated so that it can run concurrently and won't mess with other stuff
  and has its own snapshot to run and not get messed up by anything else."
- Wanted: stay away from writing files to disk.
- Wanted: "get an agent to prove its thoughts instead of just thinking constantly and coming
  up with ideas instead of making them concrete."
- Wanted: enforcement — "almost not even giving the agent a chance or option to opt out
  regardless of intention."
- Hard constraint on observability: the user does NOT see the agent's thoughts or its chat.
  Whatever the mechanism produces must surface evidence without depending on the agent
  choosing to report honestly.
- A probe that proves useful must be promotable into a real test.

## Measured ground truth (taken in this container, on this checkout, 2026-08-18)

Every number below was measured; do not re-derive them, and do not contradict them without
running your own measurement and showing the command.

1. `npm run test:probe` cold = 3874 ms, warm = 2751 ms.
2. A runtime probe is NOT typechecked. A probe file containing
   `const wrong: number = 'not a number'` runs and `test:probe` exits 0.
3. A runtime probe is NOT lintable. `oxlint --config .oxlintrc.json tmp/probe/x.test.ts`
   reports `No files found to lint`, because `.gitignore:11` ignores `tmp` and oxlint honors
   VCS ignore. `--no-ignore` does not change it.
4. oxlint CAN lint an arbitrary absolute path outside the repo: linting
   `/dev/shm/probe-check.ts` with the repo config applied the repo's rules and reported
   `import(no-default-export)`. tmpfs `/dev/shm` has 16G available.
5. oxlint latency: `npx oxlint` = 636–672 ms; `./node_modules/.bin/oxlint` = 257–258 ms.
   The difference is npx resolution overhead.
6. TypeScript 6.0.3 `ts.createLanguageService` over the real root `tsconfig.json` with one
   virtual in-memory file: cold semantic diagnostics = 1198 ms, warm re-check after editing
   the virtual file = 11 ms, 29 ms, and 57 ms. The virtual file never touched disk.
7. Vitest 4.1.10 exposes `createVitest`, `runTestSpecifications`, `createSpecification`,
   `invalidateFile`, and `experimental_getSourceModuleDiagnostic` from `vitest/node`.
8. Warm Vitest, resident instance, fresh file path per revision: boot 358 ms, cold run
   771 ms, warm runs 243–270 ms (median 255 ms).
9. INSTRUMENT WARNING, and it is a designed-in hazard you must account for: a first
   measurement reusing ONE file path and calling `rerunFiles` reported 2–4 ms and reported
   `state=pass` for a test asserting `expect(2).toBe(3)`. That is a stale-cache phantom.
   Using a fresh path per revision and `runTestSpecifications`, the same failing test
   correctly reported `state=fail`. Any warm-process design MUST make the phantom
   impossible, not merely unlikely.
10. A probe reaches real source: `import { createBlueprint } from '@src/core'` passed, and
    `import { nope } from '@src/core'` failed. Root `tsconfig.json` `paths` declares only
    `@src/core` and `@src/server`.
11. Repo toolchain: node v22.22.2, vitest 4.1.10, oxlint 1.78.0, tsc 6.0.3. No
    `@modelcontextprotocol` SDK installed. `.mcp.json` registers only `codex mcp-server`.
12. `vite.config.ts:210` defines the `probe` project; `vite.config.ts:216` includes
    `tmp/probe/**/*.test.ts`; `package.json:82` defines `test:probe`. No gate runs `probe`.
13. `.claude/rules/tests.md:92-117` states the current probe law: two kinds (type probe read
    by tsc, runtime probe in `tmp/probe/`), three rules (probe is not a test, promote or
    delete, never commit a probe).

## The seams you must rule on

Rule on each. A seam you cannot close is an open question, stated as one.

- **Latency and residency.** What process holds the warm state, who starts it, what happens
  on first call, and what the agent pays per probe.
- **The disk question.** The user wants no file writing. oxlint takes a path and has no
  stdin mode (measured: no stdin flag in `--help`). TS and Vitest can both take virtual
  content. Rule on what "in memory" can honestly mean here, and whether tmpfs counts.
- **Isolation and concurrency.** Multiple probes at once, no cross-contamination, no
  interference with the main checkout or with a live gate run, and immunity to the phantom
  in fact 9.
- **Enforcement.** How the mechanism makes proving cheaper than not proving. The user asked
  to remove the opt-out. Rule on what is actually enforceable in this harness given that no
  one can read the agent's thoughts, and be honest about what is not.
- **Surface and API shape.** What the agent literally calls. `AGENTS.md` mandates
  single-word entity APIs, types in `*/types.ts` first, no `any`, no assertions.
- **Promotion.** How a probe that settled a claim becomes a real test, and how every other
  probe is guaranteed gone.

## Constraints that bind your answer

- `AGENTS.md`, `.claude/rules/tests.md`, `.claude/rules/quality.md`,
  `.claude/rules/workspace.md`, `.claude/rules/architecture.md` bind. Read them.
- NEVER propose adding an npm package. The user must explicitly request any dependency.
  Native APIs and already-installed capability only. `typescript`, `vitest`, `oxlint`, and
  `vite` are already installed and are fair game.
- This repository publishes `@orkestrel/scaffold`, whose `dist/host` surface is vendored
  into 44 target repositories. Any mechanism that lands in the vendored host propagates to
  all of them. Rule on whether yours should.
- Do not design a polling architecture. `AGENTS.md` forbids it.
- Greenfield: no compatibility shims. If `tmp/probe/` and `test:probe` should die, say so.

## Output

Return under 900 lines, in this shape. No process diary.

1. `RULING` — one paragraph: the mechanism you would build.
2. `OPTIMAL` — the most aggressive version, and precisely which measured fact makes each
   part reachable or unreachable.
3. `REALISTIC` — what you would actually build, as bounded units with acceptance criteria.
4. `SEAMS` — your ruling on each of the six seams, one short section each.
5. `SURFACE` — the concrete API the agent calls, with real signatures.
6. `REJECTED` — designs you considered and killed, with the reason each died.
7. `RISKS` — what breaks this, ranked, each with the cheapest probe that would expose it.
8. `UNKNOWNS` — what you could not settle.
