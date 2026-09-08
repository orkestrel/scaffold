Lane held: checker queue

**Claim 1 — PASS.** `d7n-queue-prep.status.txt` lists exactly: `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `package-lock.json`, `package.json`, `tests/config.test.ts`, `tests/guides.test.ts`, `tests/policy.test.ts`, `tests/setup.ts`, `tests/setupPolicy.ts`, `tests/src/core/Queue.test.ts`, `tsconfig.json`, `?? scripts/docs.ts` — the P.1 repair list + `tests/guides.test.ts` (item 2) + `tests/setup.ts`/`tests/src/core/Queue.test.ts` (item 3 voice sites). `d7n-queue-prep.diff.txt:1605-1626` shows `package.json`'s only hunk is the version bump `0.0.12`→`0.0.13` and the added `docs` script row; `grep '@orkestrel'` over the whole diff (`d7n-queue-prep.diff.txt`) returns no `+`/`-` line inside a dependency range — no `@orkestrel/*` range moved.

**Claim 2 — PASS.** `tests/guides.test.ts:156-181` (methods loop) binds `members`/`documented` once above `describe(group.interface, …)`; `tests/guides.test.ts:219-228` (examples loop) binds `documented`/`examples` once above `describe(`${group.interface} examples`, …)`; `tests/guides.test.ts:211-216` maps `source.examples()` inline (the "examples case"). Diffed against `/home/user/fleet/abort/tests/guides.test.ts:146-228`: identical outside `GUIDE_SPEC`/`MODULES`/module specifiers. No case's assertions or names changed. `d7n-queue-prep-report.md:145` quotes `Test Files 1 passed (1)`, `Tests 26 passed (26)` from a run.

**Claim 3 — PASS.** `d7n-queue-prep.diff.txt:3445-3477` (`tests/src/core/Queue.test.ts`) and `:2384-2415` (`tests/setup.ts`) show comment-only hunks: no code token moved, no assertion changed. Each `tests/setup.ts` rewrite opens with a third-person verb (`Lists`, `Pairs`, `Represents`) naming no symbol. The `just`→`only` recast at `Queue.test.ts:1473` deviates from the substitution table's bare "Delete" but is authorized by the prep brief itself (`d7n-queue-prep-brief.md:284`: "`just`, `simply`, `easy` deleted or recast"), so the unit followed its own dispatch; flagged as a finding below.

**Claim 4 — PASS.** `guides/queue.md:54,62,73,90,119,141,157` head `Summary` beside only `Kind`/`Shape`/`Returns`; the `Event map` table (`:235`, outside `## Surface`/`## Methods`) is exempt. `### Entities`→`### Classes` (`:60`); no other H3 documents a class. The `Shape` idiom sentence sits at `:71`, directly above the `### Types` table at `:73`, and every `Shape` cell follows it.

**Claim 5 — PASS.** Sampled the widest cell, every Types row, and every Methods row against `src/core/types.ts`, `factories.ts`, `errors.ts`: `guides/queue.md:75-86` (Types Summary + Shape) and `:143-151,159-162` (Methods Summary) match `types.ts:106,128,144,168,201-203,62-64,4,23,33,48,249,270-271` and `:228-245,289-296` verbatim (`{@link}` flattened to code token). Distinct descriptions confirmed (`QueueInterface` vs `Queue` carry different sentences).

**Claim 6 — PASS.** `grep '@example' src/core` (evidence above) returns exactly one titled block, `factories.ts:31 * @example Create a queue`; every other `@example` line is bare. `guides/queue.md:247-264` fence body is byte-identical to `factories.ts:32-49`; `grep -n '^#\+ Create a queue' guides/queue.md` region (`:245`) is the sole occurrence; no three-backtick run or `*/` inside.

**Claim 7 — PASS.** `guides/queue.md:3-5` and `README.md:3-5` carry the identical three-line blockquote, plain text + code spans, no link, no bold. The displaced sentences (wake-park, L1 cancellation, durability, observability, what's cut) sit in the guide's opening prose (`:7-31`); the README's opening paragraph (`:7-11`) is onboarding-specific and restates no tagline clause; Install/Usage/Guide sections are untouched.

**Claim 8 — PASS.** `tests/guides.test.ts:191-199` (equality case) sits directly after the methods loop (`:156-181`) and before the examples case (`:201-217`); the pin (`:82-104`) is the guard-and-continue loop with no local type predicate and the both-sides failure line; the README case (`:111-120`) has two `not.toBeUndefined()` guards before `toBe`; `ROOT_FILES` (`:55`) includes `README.md`; `GUIDE_SPEC` (`:41`) is used by both. `d7n-queue-converge-report.md:9-34` records each case red with its first failure lines on the unconverged tree, and `:262` records `Tests 29 passed (29)` after.

**Claim 9 — PASS.** `d7n-queue-converge.diff.txt:344-687` shows every `src/**` hunk sits inside a `/**…*/` doc block; no code line changed. `{@link}` tags remain `{@link}` in source (`types.ts`); no description repeats its own `@remarks` (spot-checked `readOption`, `QueueEventMap`, `QueueInterface`). Diffing old vs. new table rows directly from `d7n-queue-converge.diff.txt:109-263`: every `API`/`Type`/`Method`/`Kind`/`Returns` cell is byte-identical across the change; only `Shape` (permitted) and `Summary`/renamed headers moved. `guides/queue.md:325-334` (`## Tests`) names the equality gate descriptively with no SQ/MQ/EQ/RQ identifier. No count or all-caps residue found in the current `guides/queue.md`/`README.md` text (the diff confirms `PARK`, `ALONGSIDE`, `AFTER`, `NOT`, `OWN`, `NOT`/`NEVER`/`AND`/`OUTSTANDING`/`SAME` all lowercased); `200 entries` at `:343` is a fixture size, not a count.

**Claim 10 — PASS.** `d7n-queue-converge.status.txt` lists only `README.md`, `guides/queue.md`, `src/core/Queue.ts`, `src/core/errors.ts`, `src/core/factories.ts`, `src/core/helpers.ts`, `src/core/stores/DatabaseQueueStore.ts`, `src/core/stores/MemoryQueueStore.ts`, `src/core/types.ts`, `src/core/validators.ts`, `tests/guides.test.ts` — matching the claim's list exactly (`src/**` confirmed doc-block-only under claim 9).

**Claim 11 — PASS.** `d7n-queue-converge-report.md:249-263` quotes `npm run docs` (`exit 0: rows read: 1, disagreements found: 0`), `--to guide`/`--to source` (`written: 0`), and the scoped gates (`oxfmt --check`, `oxlint`, `check`, `test:guides`, `test:policy`), each with exit codes, from runs.

**Claim 12 — FAIL.** The converge report states counts in prose, outside quoted command output, in violation of `AGENTS.md` § Writing's count ban:
- `d7n-queue-converge-report.md:9-10`: "The three new cases were the three failures."
- `d7n-queue-converge-report.md:96`: "Every one of the twelve is a `### Types` `Shape` cell…"
- `d7n-queue-converge-report.md:156-157`: "`AFTER` (twice)… and the two `DEFAULT` cells the write replaced."

File:line citations checked against the tree were accurate (for example `Queue.ts:330` is `clear(): Promise<void> {`, matching the report's claim about that method), so the citation-accuracy half of this claim holds; the count-in-prose half does not.

**Claim 13 — PASS (vacuous).** Both reports name no reader or seed defect (`d7n-queue-prep-report.md` "Deviations: None"; `d7n-queue-converge-report.md:324-329` "Reader and seed defects met: None"), so there is nothing to rule on for blocking.

**Findings outside the claims**

- `d7n-queue-prep-brief.md:284` authorizes "deleted or recast" for `just`/`simply`/`easy`, which is wider than `.claude/rules/writing.md`'s table row ("Delete"). The prep unit's `only`-recast at `Queue.test.ts:1473` is traceable to that brief clause, not to the unit inventing latitude, so this is a brief/table reconciliation question for the Orchestrator, not a unit defect. What right looks like: either the table gains an explicit recast allowance for this row, or briefs stop widening it.
- Ruling 13's amendment (`rulings.md:68-70`) requires the drop-in's first line read "The constants that follow are this package's own"; `tests/guides.test.ts:1-3` (current tree) satisfies that exactly, so the earlier apparent divergence from the pilot's header is not a defect — the pilot has simply not yet taken the amendment (as the converge report itself states).

**Referrals**

- Whether "A concurrent, cooperative FIFO job queue: … and hands back one promise per `enqueue` that settles with that job's result" reads as one noun phrase under Ruling 4, versus a compound sentence, is a subjective-lane call; I ruled claim 7 PASS on structural grounds (no verb-first independent clause) but flag it for the subjective lane's own reading.

VERDICT: FAIL 12
