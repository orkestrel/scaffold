# conform-budget report (2026-09-03)

Package `@orkestrel/budget` at `/home/user/fleet/budget`, baseline `aa92b5f` (clean at unit start). Every row is applied and the gate chain is green. No file was created, so `git add -N` had nothing to mark.

## Rows

| Row | Disposition | Note |
| --- | --- | --- |
| budget-obj-1 | applied | `README.md:21` reads `- Node.js >= 22.12.0, matching the \`engines\` field in \`package.json\``; `package.json` untouched. |
| budget-obj-2 | applied | `README.md:22` reads `- ESM (\`import\`) and CommonJS (\`require\`) through the \`exports\` field`; `package.json` and the Vite configuration untouched. |
| budget-obj-3 | applied | `describe('flagship fences')` appended to `tests/guides.test.ts` after the manifest loop, importing `createBudget` and `createTokenBudget` through `@src/core`, `createRecorder` from `@orkestrel/test`, and `createTokenUsage` from `./setup.js`. Transcribes the Surface fence (remaining `6_000`, then `signal.aborted` and a recorder count of exactly one), the stream loop over a local byte-length list (stops after the tally crosses `1_000_000`), the agent-loop bound (`AbortSignal.any` trips on the token budget alone; `AbortSignal.timeout(50)` never awaited), and the `clear()` fence (`exhausted`, then `consumed === 0`, `remaining === 1_000`, `signal.aborted === false`, `consume(200)` → `200`). A presence guard sits beside each transcription; the agent-loop guard transcribes the post-subj-5 comment `// fires budget.signal after the ceiling is crossed`. |
| budget-obj-4 | applied | `tests/setup.ts` exports `createTokenUsage(prompt, completion, total)` with the `TokenUsage` type import before the value imports; `factories.test.ts:14-16` deleted and the six call sites (`66`, `122`, `219`, `220`, `236`, `251`) call `createTokenUsage`; `tests/setup.test.ts` asserts `createTokenUsage(100, 15, 115)` is exactly `{ prompt: 100, completion: 15, total: 115 }`. |
| budget-obj-5 | applied | `tests/setup.ts` exports `createReadingProxy<T extends object>(target)` returning the proxy and the SAME live `reads` array; the handler is an object literal passed directly to `new Proxy` (method syntax, which `configs/policy.ts` `isPolicyMethod` exempts). `helpers.test.ts:7-22` deleted; both `reads each declared property exactly once` cases allocate a fresh recorder inside the case. `tests/setup.test.ts` asserts two reads yield `['scope', 'max']` in read order and that the proxy returns the target's own values. |
| budget-obj-6 | applied | `tests/setup.ts` exports `defineThrowingProperty<T extends object>(target, key): T` installing the native `aborted` descriptor and throwing `Expected the native aborted descriptor` when absent. All six inline blocks replaced with the ruled call forms; every existing assertion unchanged. `validators.test.ts` gains the `../../setup.js` import. `tests/setup.test.ts` asserts the installed key throws a `TypeError`, a sibling key still reads, and the same target is returned. |
| budget-obj-7 | applied | `isBrowserVuePath` and its doc comment deleted from `tests/setup.ts`; its `describe` block and import binding deleted from `tests/setup.test.ts`. `captureContractError` and `selectCharge` keep the file and the `setup` project populated. |
| budget-obj-8 | applied | `src/core/Budget.ts` declares `readonly #id: string` as the first `#` field, assigns it in the constructor, and exposes `get id(): string` as the first getter before `get signal()`. `src/core/types.ts` `BudgetInterface.id` unchanged. Consequence recorded, not repaired: `JSON.stringify(budget)` yields `{}` after the change; no test or fence serializes a Budget. |
| budget-subj-1 | applied | Every `§N` citation removed from `guides/budget.md` (`:71`, `:75` twice, `:81`, `:87`, `:89`, `:90` twice, `:99`, `:190`) and `guides/README.md` (`:3`, `:34`) with the ruled wording; the `AGENTS.md` link kept and described as the pointer to the `@orkestrel/scaffold` coding and orchestration authority. |
| budget-subj-4 | applied | `consumer` standardized at `guides/budget.md:23`, `:31`, `:80` and `README.md:9`, `:42`, `:50`; option key and the `extracts` TSDoc verbs at `types.ts:5`, `:20` untouched. The second `extractor` on `guides/budget.md:23` (`A thrown extractor`) was replaced too so the sweep reads empty — see § Deviations. |
| budget-subj-5 | applied | `via` → `through` at `guides/budget.md:25`, `:92`, `:93`, `:94`, `:176` and `README.md:49`; `e.g.` → `for example` at `:90`, `:159`; `(Surface rows, above)` → `(the preceding Surface rows)` at `:67`; temporal `once` → `after` at `:3`, `:88`, `:138`, `:144`. The exclusions at `:23`, `:48`, `:49`, `:92` (`computed once per arm`), `:95`, `:112`, `:185` untouched. |
| budget-subj-6 | applied | `types.ts:16` and `:95` read `Holds the trace label for the budget. Default: a random UUID.`; `types.ts:87` and `factories.ts:102` read `` `scope` — Default: `completion`. ``; `types.ts:100` reads `Names the token usage field charged per provider response. Default: \`completion\`.` No behaviour or type changed. |

## Files touched

- `/home/user/fleet/budget/README.md` — Node floor `22.12.0`, dual-format requirement line, `extractor` → `consumer`, `via` → `through`.
- `/home/user/fleet/budget/guides/README.md` — `(AGENTS §22)` dropped from the tagline; `See also` describes `AGENTS.md` as the scaffold pointer.
- `/home/user/fleet/budget/guides/budget.md` — every `§N` citation removed, `extractor` → `consumer`, `via`/`e.g.`/`above`/temporal `once` replaced, Methods table realigned by the scoped formatter.
- `/home/user/fleet/budget/src/core/Budget.ts` — `readonly #id` first `#` field, constructor assigns it, `get id()` first getter.
- `/home/user/fleet/budget/src/core/factories.ts` — `createTokenBudget` `@remarks` states `scope` in the `Default:` form.
- `/home/user/fleet/budget/src/core/types.ts` — `id` member docs and `TokenBudgetOptions` `@remarks`/`scope` member doc in the `Default:` form.
- `/home/user/fleet/budget/tests/guides.test.ts` — imports for the executed half; `flagship fences` block with four transcriptions and four presence guards.
- `/home/user/fleet/budget/tests/setup.ts` — `createTokenUsage`, `createReadingProxy`, `defineThrowingProperty` added; `isBrowserVuePath` deleted; `TokenUsage` type import added.
- `/home/user/fleet/budget/tests/setup.test.ts` — `isBrowserVuePath` block and binding deleted; `createTokenUsage`, `createReadingProxy`, `defineThrowingProperty` cases added.
- `/home/user/fleet/budget/tests/src/core/Budget.test.ts` — hostile-getter block replaced by `defineThrowingProperty({ consumer: selectCharge }, 'max')`.
- `/home/user/fleet/budget/tests/src/core/factories.test.ts` — local `usage` builder deleted; `createTokenUsage` at every call site; two hostile-getter blocks replaced.
- `/home/user/fleet/budget/tests/src/core/helpers.test.ts` — module-scope read logs and handlers deleted; `createReadingProxy` in both exactly-once cases; two hostile-getter blocks replaced.
- `/home/user/fleet/budget/tests/src/core/validators.test.ts` — setup import added; hostile-getter block replaced.

Diffstat: 13 files changed, 335 insertions(+), 134 deletions(-).

## Failing-first evidence

- budget-obj-4, budget-obj-5, budget-obj-6 (setup helpers): the three `tests/setup.test.ts` cases were written before the helpers existed. `npm run test:setup` → exit 1, `3 failed | 4 passed (7)`, failing `createTokenUsage > returns exactly the three named counts`, `createReadingProxy > records every property read in read order and returns the target values`, `defineThrowingProperty > installs a key that throws a TypeError on read and leaves a sibling readable`. After the helpers landed: `npm run test:setup` → exit 0, `7 passed (7)`.
- budget-obj-3 (executed fences): `npm run test:guides` → `26 passed (26)` with the block in place (baseline `18 passed (18)`). Mutation probes, each restored: `guides/budget.md` `// remaining 6_000` → `// remaining 5_000` reddens the presence guard, `1 failed | 25 passed (26)`; `src/core/Budget.ts` `remaining` off by one reddens the Surface and `clear()` transcriptions, `2 failed | 24 passed (26)`; restored `26 passed (26)`.
- budget-obj-8 (runtime immutability of `id`): a throwaway `tmp/probe/id.test.ts` asserting `Reflect.set(budget, 'id', 'other')` is `false` and `budget.id` unchanged. `npm run test:probe` at baseline → `1 failed (1)` (`expected true to be false`); after the `#id` getter → `1 passed (1)`. Probe deleted and `tmp/` removed before the gates.
- Every other row is a placement, naming, or documentation row: the sweeps that follow prove the old form is gone.

## Sweeps

Population: `README.md guides/README.md guides/budget.md src/core/*.ts tests/setup.ts tests/setup.test.ts tests/guides.test.ts tests/src/core/*.test.ts` (the vendored `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, and the vendored guide mirrors excluded). `grep -n -i -E`, each pattern empty unless noted: `\bextractor\b`, `AGENTS §`, `§[0-9]`, `\bvia\b`, `e\.g\.`, `i\.e\.`, `\babove\b`, `isBrowserVuePath`, `\busage\(`, `budgetReads|tokenReads|budgetHandler|tokenHandler`, `omission generates`, `Node\.js >= 24`, `ESM-only`.

- `extract(or|ors|ed|ing|s)\b` matches only the TSDoc verbs at `src/core/types.ts:5`, `:20`, `:58` the row keeps and the pre-existing case title `tests/guides.test.ts:69` (`extracts a non-empty documented surface`) — permitted.
- `readonly id: string` matches only `src/core/types.ts:40`, the interface member the row keeps.
- `defaults to` matches only guide prose at `guides/budget.md:96`, outside the TSDoc row.
- `getOwnPropertyDescriptor\(AbortSignal\.prototype` matches only `src/core/validators.ts:34` and `tests/setup.ts:103` — the six inline copies are gone.
- `\bonce\b` hits ruled by sense: `README.md:31`, `guides/budget.md:112`, `tests/guides.test.ts:216` are the `{ once: true }` identifier; `README.md:44`, `guides/budget.md:23`, `:88` (`exactly once per armed signal`, `trips it once`), `:92` (`computed once per arm`), `:95`, `:185`, `src/core/helpers.ts:9`, `:106`, `tests/guides.test.ts:182` mean one time; `guides/budget.md:48`, `:49`, `:95` are `once-read`. No temporal hit remains.
- `\bbelow\b` matches `tests/guides.test.ts:2` and `:37`, pre-existing header prose outside every row — recorded under § Deviations as an observation.

## Gates

| Command | Exit | Excerpt |
| --- | --- | --- |
| `npm run format:check` | 0 | `All matched files use the correct format.` (39 files) |
| `npm run lint:check` | 0 | no diagnostics |
| `npm run check` | 0 | root `tsc` and `check:src:core` clean |
| `npm run build` | 0 | `Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts` |
| `npm test` | 0 | src:core 131 passed, policy 111 passed, config 46 passed, setup 7 passed, guides 26 passed |

`git status --short` lists only Owned files (`/home/user/work/evidence/conform-budget.status`). Observation: `npm test` ran with no concurrent load in this checkout; the Orchestrator's deciding run is still owed per the brief.

## Breaking

None. No published symbol was renamed or removed. `Budget.id` moved from an own data property to a prototype getter; `BudgetInterface.id` is unchanged, every in-package reader reads it as a property, and the only observable difference is that `JSON.stringify(budget)` yields `{}` and a runtime write to `id` is refused.

## Shared-file patches

None.

## Deviations

None stopping. Ancillary decisions and observations:

- `guides/budget.md:23` carried a second `extractor` on the row's own line (`A thrown extractor, invalid charge`) that budget-subj-4 did not quote. Replaced with `A thrown consumer`, because the row's rule is one term per concept and acceptance criterion 6 requires the old-name sweep to read empty.
- `guides/budget.md:88` reads `consuming further after exhaustion never re-aborts`: the ruled `after` with the noun the grammar needs, rather than the literal `after exhausted`.
- The three new `tests/setup.ts` doc blocks use the third-person first sentence `.claude/rules/typescript.md` § Comments fixes (`Creates …`, `Defines …`) with the file's existing block structure; the two pre-existing imperative blocks (`captureContractError`, `selectCharge`) are outside every row and were left as they were.
- The subj-5/obj-3 sequencing note is discharged inside this unit: both rows landed here and the agent-loop presence guard transcribes the post-subj-5 fence comment.
- Scoped `oxfmt --write` was run on `guides/budget.md` and `tests/guides.test.ts` only, to realign the Methods table and wrap the appended block. No tree-wide mutating command was run outside the gate chain.
- Observations for the next matrix, not edited: `tests/guides.test.ts:2` (`The four constants below` — a count and `below`) and `:37` (`the second assertion below`); `src/core/types.ts:6` `BudgetOptions` `@remarks` still states the `id` default as `Omitted \`id\` values generate a random UUID`, the same prose form budget-subj-6 repaired at `:16` and `:95` but not one of its named sites.
