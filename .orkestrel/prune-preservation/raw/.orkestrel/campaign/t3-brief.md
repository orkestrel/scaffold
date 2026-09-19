# Unit T3 — fix round for the journey layer and the statechart harness

## Role and engine

`opus` on Opus 5, a native Claude subagent with `Read`, `Grep`, `Glob`, `Edit`, `Write`, and `Bash`,
the sole writer in the `C:/Users/mikes/WebstormProjects/test` checkout. You open this brief
yourself. Your engine wrote units T1 and T2; this round closes what two audit lanes and the
Orchestrator's own reproduction found.

## Objective

Close every finding the T1+T2 audit carried, adopting each prescription verbatim where one was
given, so the round can be accepted on mutation probes plus the Orchestrator's reproduction probe
turning green.

## Context

**Evidence.** Read, in order: `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/t-audit-verdict.md`
(the ruling and the finding table), `t-audit-objective-report.md` and `t-audit-subjective-report.md`
(the lanes' evidence and prescriptions — the subjective report carries the exact fixes for items 2,
3, 4, 7, 9, and 10), `t-audit-reproduction.log.txt` and `t-audit-probe.test.ts.txt` (the
Orchestrator's browser reproduction), then `tmp/units/t1-report.md` and `tmp/units/t2-report.md`
for what the units set out to do. The tree is at checkpoint `17d8b61`.

Measured directly by the Orchestrator (`t-audit-reproduction.log.txt`):

- A `createHarness` builder returning `undefined` under `StateScenario<…, undefined>`: phases
  `[]`, status `passed`, `passed` 1 — the `context !== undefined` guard at
  `src/browser/factories.ts:474` skips every phase.
- A `state` reader that throws: `execute()` rejects with the reader's error and the root stays
  `running` (`src/browser/factories.ts:483` sits outside every `try`).
- A hostile `tabIndex` getter throwing `undefined`: `readRefusal` returns `undefined` and throws
  nothing, because `captureError` conflates `throw undefined` with success.
- `createStorage({ quota: Number.MAX_SAFE_INTEGER + 1 })` is accepted (`isInteger` at
  `src/browser/factories.ts:317`).
- An abort reason shaped like the timeout voice is rethrown by identity by `waitForState`; five
  settled `waitForAnimations` waits leave no listener on a shared signal; two rows sharing a name
  carry the right per-row results. Those held and need no change.
- `npm run test:distribution -- --mode release` compiles a consumer under every module resolution
  (claim 9 settled); the writers' mutation passes reproduce their reds (claim 13 settled).

**Law.** `AGENTS.md`; `.claude/rules/names.md`, `.claude/rules/typescript.md`,
`.claude/rules/architecture.md`, `.claude/rules/patterns.md`, `.claude/rules/tests.md`,
`.claude/rules/browser.md`, `.claude/rules/documentation.md`, `.claude/rules/quality.md`
§ Instruments, `.claude/rules/writing.md` — all in the test checkout. Skill: none. Guide:
`guides/test.md`.

**Installed primitives.** `@orkestrel/test` itself and `@orkestrel/contract` 0.0.17
(`isSafeInteger` if it exists there — read `C:/Users/mikes/WebstormProjects/scaffold/guides/contract.md`
§ Surface; otherwise `Number.isSafeInteger`).

**Host.** Windows 11; Bash; Playwright Chromium; multi-line programs go to a file under
`tmp/probe/` and are run from there; write source through your editor tools.

**Measurements.** Baseline `17d8b61`, clean. Gates in the Orchestrator's reading
(`.orkestrel/campaign/t2-gates-summary.txt`): lint, format, check, build, core 116, browser 304,
server 143 (9 skipped), policy 101 (1 skipped), config 173 (1 skipped), setup 24, guides 48 (1
skipped), each exit 0.

**Control identifiers.** `T3-C1` through `T3-C16`, one per item. Name each test for what it
proves.

**Standing conditions.** None known to fail. Do not run `npm run test:distribution`.

## Unknowns

- **How a builder's success is distinguished from the context's value** (item 1). The
  prescription is the property, not the mechanism; a flag set after `await options.build(...)`
  returns is the obvious shape. Record what you did.
- **Whether `@orkestrel/contract` publishes a safe-integer guard** (item 5). Read its guide; use
  `Number.isSafeInteger` where it does not.

## Scope

**Owned.** `src/core/types.ts`, `src/core/helpers.ts`, `src/core/constants.ts`,
`src/browser/types.ts`, `src/browser/helpers.ts`, `src/browser/factories.ts`, `tests/src/core/**`,
`tests/src/browser/**`, `tests/guides.test.ts`, `guides/test.md`, `README.md`.

**Shared (report-only).** None.

**Off-limits.** `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`,
`tests/distribution.test.ts`, `package.json`, `package-lock.json`, `vite.config.ts`, `configs/**`,
`tsconfig.json`, `.claude/**`, `.agents/**`, `src/server/**`.

**What asserts the state this change ends.** `tests/guides.test.ts` (Surface bijection, transcribed
fences), the browser and core suites, the policy `surface` rule on any new export name.

**Tools and limits.** All of your tools. No commit, push, install, or `git checkout`,
`git restore`, `git stash`, `git reset`, `git clean`. `npm run lint` then `npm run format` before
the checks.

## Execution

A native subagent, or a bench engine reading this brief inside its own CLI: perform the assignment
directly and spawn nothing.

## The items

1. **A builder's success, not its value, decides whether the phases run.** A builder that returns
   `undefined` (or any value) runs every phase; a builder that throws or rejects is the refused
   build. `T3-C1`: the reproduction's fixture — a `StateScenario<'closed', 'toggle', undefined>`
   whose `assert` throws — reddens the run with the assertion's message and counts the row as
   failed. Mutation: restore the `context !== undefined` guard and watch it redden.
2. **A terminal status on every exit.** Wrap the row loop so an exceptional exit — a throwing
   `state` reader, a non-`Error` phase throw — writes `failed` on the root, narrates it, and
   rethrows the value by identity, without counting the row as failed (the subjective lane's
   exact shape); a successful completion is not touched by a `finally`. Restate
   `src/browser/types.ts:312`, the guide, and the constants' D4 sentences to say the run rejects
   after the harness writes `failed`. `T3-C2`: the existing reader-throw case retargeted to
   `'failed'` beside the rejection; a phase that throws a string. Mutation: drop the catch.
3. **A re-run clears the rendered state.** `state.removeAttribute(STATECHART_ATTRIBUTES.state)` and
   empty its text where the row results are cleared. `T3-C3`: construct, `execute`, `execute`
   again, and read the attribute absent at the start of the second run (assert inside a row's
   `build`, which runs before any reading). Mutation: drop the removal.
4. **Bound the `createStorage` claim; no `Proxy`.** Add the `Bounds a shipped helper carries` bullet
   and the `@remarks` sentence the subjective lane wrote (the store answers through its methods and
   intercepts no named-property access, so drive a consumer through `getItem` and `setItem`);
   replace the guide's "goes wherever a real one goes" sentence with the bounded one and strike
   "rather than a shaped object" from the Limits row. `T3-C4`: a test that reads `store.theme`
   after seeding `theme` and shows the property is `undefined` while `getItem` answers — pinning
   the bound the prose states, so a later `Proxy` would redden it and the sentence together.
5. **A safe integer quota.** Refuse a quota above `Number.MAX_SAFE_INTEGER` with the existing
   sentence. `T3-C5`: `Number.MAX_SAFE_INTEGER + 1` refused, `Number.MAX_SAFE_INTEGER` accepted.
6. **`readRefusal` with its own `try`/`catch`.** Catch the resolver's throw directly: an `Error`
   becomes its message, anything else — `undefined` included — is rethrown by identity; a resolver
   that returns yields `undefined`. `T3-C6`: the reproduction's fixture (a `tabIndex` getter
   throwing `undefined`) makes `readRefusal` throw; the string-throw and the three-voice cases
   stay. Mutation: route through `captureError` again.
7. **`waitForText`'s refusals have a Contract home and cover the unsatisfiable pair.** Refuse
   `absent` contained in `text` (and `absent === text`) before any reading with its own sentence
   naming the departure; state both refusals in Contract rule 14 beside `waitForText`'s entry, and
   keep the fence comment. `T3-C7`: the contained case refused eagerly with the new sentence; the
   `exact` mode covered.
8. **The guide's statechart fences are the executed table.** Rewrite § Patterns → Drive a
   statechart table so `SCENARIOS` declares all four rows in the compact shape the suite uses
   (shared phase functions), `MISMATCHED` carries its phases, and the harness fence's claimed
   `total`/`passed` values follow from the rows the fence declares; the fence text stays equal to
   what `tests/src/browser/factories.test.ts` drives, and the guide keeps saying where the values
   are pinned. `T3-C8`: the browser suite's mismatched-row case asserts the documented error
   sentence for the fence's exact `MISMATCHED` declaration, and `tests/guides.test.ts` keeps
   transcribing the attribute-and-status fence as today.
9. **`README.md` states the post-T1 dependency shape.** Strike "and nothing else" at the browser
   sentence and name the imports the way rule 13 names them; mirror the guide's dependency sentence
   into the README's. `T3-C9`: a `tests/guides.test.ts` presence guard that the README's browser
   sentence names `@orkestrel/contract` and the core entry (a substring guard beside the parity
   pitch check, stated as a presence guard).
10. **Contract rule 14 names `waitForAnimations` as the browser environment's parking member**,
    with the same interval note. `T3-C10`: none beyond the guide parity run; the sentence is
    prose.
11. **The `playState === 'running'` exclusion has a control.** A paused animation resolves
    immediately; a fill-mode finished animation resolves immediately. `T3-C11`: both cases;
    mutation: drop the `playState` clause and watch the paused case hang to its budget.
12. **One spelling of `build refused`.** Export from core the helper both the runner and the
    harness use to name a refused build (`{verb}{Noun}`, on the `buildRetryExhausted` precedent),
    give it a Surface row and a fence, and assert the harness's per-row refusal sentence in the
    harness suite. `T3-C12`: the harness's row announcer carries the runner's exact sentence for a
    throwing builder; mutation: respell it in the harness.
13. **Host readings become property assertions.** The `pending`→`idle` case asserts the order of
    the two attribute changes relative to the row mounts (total written before status leaves
    `pending`, rows mounted before that) without pinning how the browser batched `childList`
    records; the pause case asserts each between-row gap at or above the declared pause and the
    tail shorter than the pause, not a fixed 40 ms. `T3-C13`: the two cases rewritten; the
    between-row mutation still reddens them.
14. **`waitForState` augments on the recorded throw, not a message prefix.** Record the resolver's
    thrown value in the closure and compare by identity in the `catch`; the timeout is the case
    where the condition never threw. `T3-C14`: the existing augmentation case plus the abort-reason
    identity case from the reproduction.
15. **`buildCensus` derives its tokens per call** (a per-call suffix), so a consumer cascade cannot
    declare them in advance. `T3-C15`: two calls yield distinct tokens; each is absent from the
    cascade.
16. **The `STATECHART_STATUSES` example reaches the terminal pair by name**
    (`new Set<StatechartStatus>(['passed', 'failed'])`). `T3-C16`: the transcribed fence.

## Output

Write `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/t3-report.md` and return its path as
your final message: each item with the change, the control, and its red-then-green counts; the
mutation probe per prescription with the command and the reading; every gate command with exit
code and totals; what departs from a prescription, if anything, and why; the claims you flag as
least certain. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one hypothesis at most —
where a prescription cannot be adopted as written (say why and what you would do instead; do not
do it). Decide, record, and carry on on: message wording within the shape an item fixes, helper
names, fixture contents, TSDoc wording.

## Acceptance criteria

1. `npm run check` exits 0.
2. `npm run format:check` and `npm run lint:check` exit 0.
3. `npm run test:src:core` exits 0 with `T3-C7`, `T3-C12`'s core half, and `T3-C16`.
4. `npm run test:src:browser` exits 0 with every other control, each mutation recorded.
5. `npm run test:guides` exits 0 (Surface bijection, the rewritten fences transcribed, the README
   presence guard).
6. `npm run test:policy` exits 0 (a new export name passes the `surface` rule).
7. `npm run build` exits 0 and `dist/src/browser/index.js` still imports the map and the waits
   from `../core/index.js`.

**Observations, not criteria.** The whole `npm test` chain.

## Review evidence

The Orchestrator takes `git diff` and `git status --short` after you return and re-runs its
reproduction probe over the fixed tree.
