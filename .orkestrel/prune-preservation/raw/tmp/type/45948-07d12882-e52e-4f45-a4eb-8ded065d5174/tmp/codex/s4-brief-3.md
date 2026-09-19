# Unit S4-3 — successor to `tmp/codex/s4-brief.md` and `tmp/codex/s4-brief-2.md`

Read both earlier briefs first and in full; they stay unedited, and every section of them binds
here except where this file changes it. **What changed and why:** round 2 landed
(`tmp/codex/s4-report-2.md`, checkpoint `bfc4ef5f`); the fix-round audit
(`.orkestrel/campaign/s-fix-audit-verdict.md`, lane reports beside it) broke the chain arm, the
configuration arm, the `-c` reading, the advisory's remedy, and two guide sentences, each with an
Orchestrator reproduction under `.orkestrel/campaign/s-fix-audit-reproduction/`. This round adopts
the lanes' prescriptions verbatim. Baseline `24285b95`, clean.

## The rulings to implement, replacing round 1's ruling 2 where they overlap

1. **The `-c` shorthand.** `scriptToInvocations` reads `-c <path>` as a configuration beside
   `--config <path>` and `--config=<path>` (Vitest declares `c` as the shorthand; `--project` has
   none), refuses an unresolved `-c` value the way it refuses the long forms, and answers
   `undefined` for a dangling `-c`. Pin each in `tests/src/bin/helpers.test.ts`. Update the
   `ScriptInvocations` and `scriptToInvocations` doc blocks (`src/bin/types.ts`,
   `src/bin/helpers.ts`) so each names the three spellings, and the guide rows equal them.
2. **The chain arm is transitive.** Replace the direct read of `scripts.test` in
   `src/bin/CLI.ts` `#projectQuestion` (the missing-invocation arm) with membership in the same
   transitive walk the `reachable` set already takes from the gate chains: the arm fires only when
   no chain from `test` reaches `test:journey` through any number of intermediate `npm run`
   scripts. Pin in `tests/src/bin/CLI.test.ts`: a manifest whose `test` invokes `test:gui` and
   whose `test:gui` invokes `test:journey` raises no `projects` question (red before, green after);
   the existing missing-invocation case stays green.
3. **The configuration arm is bounded to Vitest scripts.** In the same function, skip a `test:*`
   script whose text does not name `vitest`, matching the bound the absent-project loop already
   honours. Pin: `"test:e2e": "playwright test --config playwright.config.ts"` in a fresh browser
   target raises no `projects` question (red before, green after).
4. **The remedy names the invocation.** Reword the absent-configuration advisory so its remedy
   reads: add the configuration, or remove the script that names it and its invocation from the
   `test` chain. Update the expected message in the landed `CLI.test.ts` case.
5. **The guide.** Rewrite `guides/scaffold.md` where it states the classifier bound
   (`:652-654`) so the sentence is true of both loops; rewrite the chain sentence (`:666-668`) to
   say the question fires when no chain from `test` reaches `npm run test:journey`; beside the
   one-question sentence (`:673`), state that `audit` reports the earliest of the facts it finds
   and that settling it and re-running surfaces the next. Keep every Summary cell equal to its doc
   block.
6. **`import.meta.resolve`.** Name it in `tests/setupServer.ts`'s TSDoc beside `require.resolve`
   as a form outside the reading, and add the case to the existing member-expression proof in
   `tests/setupServer.test.ts`.

## Scope, as changed

**Owned.** Round 2's owned list, unchanged: `src/bin/CLI.ts`, `src/bin/helpers.ts`,
`src/bin/types.ts`, `tests/src/bin/CLI.test.ts`, `tests/src/bin/helpers.test.ts`,
`tests/setupServer.ts`, `tests/setupServer.test.ts`, `guides/scaffold.md`. Everything else in
round 1's Off-limits list stays off-limits, and round 2's other owned files
(`tests/setupPolicy.ts`, `tests/src/core/templates.test.ts`, the fixtures) are off-limits this
round.

## Controls

`S4-3-C1` — ruling 1's three `-c` cases red before and green after. `S4-3-C2` — ruling 2's grouped
chain case red before and green after. `S4-3-C3` — ruling 3's Playwright case red before and green
after. `S4-3-C4` — ruling 4's message case red before and green after. `S4-3-C5` — `npm.cmd run
test:guides` exit 0 and `npm.cmd run test:setup` exit 0. `S4-3-C6` — scoped format and lint over
owned files exit 0; `npm.cmd run check`, `test:src:bin`, `test:src:core` exit 0. Name a test for
what it proves, never for the control label.

## Everything else

The Output, the Deviation contract, the Execution line, and the Review evidence sections stand as
round 1 states them. Report the standing `host.json` inventory condition as an observation
(`tests/setupServer.ts` is vendored). Write the report as your final message; the Orchestrator
takes it from `--output-last-message`.
