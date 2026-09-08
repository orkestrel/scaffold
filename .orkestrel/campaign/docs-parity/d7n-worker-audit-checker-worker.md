Lane held: checker worker

## Claim-by-claim verdicts

**1. PASS.** `git diff --stat`/status for `f5ddbd0` (`d7n-worker-prep.diff.txt`, `d7n-worker-prep.status.txt`) touch exactly `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `package-lock.json`, `package.json`, `tests/config.test.ts`, `tests/guides.test.ts`, `tests/policy.test.ts`, `tests/setup.ts`, `tests/setupPolicy.ts`, `tests/setupServer.ts`, `tsconfig.json` — the P.1 brief's repair list, the drop-in, and the report's named voice-sweep files (`tests/setup.ts`, `tests/setupServer.ts`). `package.json` diff (`d7n-worker-prep.diff.txt:1605-1626`) shows only the version bump `0.0.11`→`0.0.12` and the `docs` script row; the `@orkestrel/contract` dependency range (`^0.0.16`) is untouched and no `@orkestrel/guide` range line appears in the diff, confirming no `@orkestrel/*` range moved.

**2. PASS.** `tests/guides.test.ts` diff (`d7n-worker-prep.diff.txt:2139-2213`) and the converged tree (`/home/user/fleet/worker/tests/guides.test.ts:166-248`) show the exact adaptation the brief prescribes: `members`/`documented` mapped to `.name` once per `describe`, `findMissing` calls passing names, the examples-case mapping `source.examples().map((example) => example.name)`, and the examples-loop `documented`/`examples` bound once above the `describe` at lines 231-238. `findMissing(names, surface)` at the import-walk site is unchanged. No other line in the file changed per this diff.

**3. PASS.** The six voice-rule hunks in `tests/setup.ts` (`d7n-worker-prep.diff.txt:2380-2410`) and `tests/setupServer.ts` (`:3433-3463`) each rewrite only the description's opener to a third-person verb, carry every fact forward, move no code token, and change no assertion. `npx oxlint` reads clean after (report line 82), and `test:policy`'s prose rule named no line in `guides/**`/`README.md` (report line 84).

**4. PASS.** `guides/worker.md` table headers (`grep -n '^| '` in the converge report, criterion 2) show every `## Surface`/`## Methods` table heading `Summary` beside only `Kind`/`Shape`/`Returns`; `### Entities` renamed `### Classes` (`grep -c Entities` → `0`, every row's `Kind` is `class`); the `Shape` idiom convention sentence sits at `guides/worker.md:104`, directly above the `### Types` table at `:106-117`, matching the pilot's placement (`abort.md:60` above `:62`).

**5. PASS.** Spot-checked the widest cell (`WorkerInterface`), a Types row (`WorkerHandler`), and every Methods row against `src/core/types.ts` and `src/core/factories.ts`: each guide `Summary` cell is byte-identical to its doc block's description paragraph (`worker.md:57` = `factories.ts:5-7`; `worker.md:110-117` = `types.ts` interface/type descriptions; `worker.md:135-143` = `types.ts:97-131` method doc comments). `WorkerInterface`'s cell is recast distinct from `Worker`'s class cell (report, Criterion 3 table). The gate itself (`findDrift`) mechanically enforces this and reports `disagreements found: 0` on a real run.

**6. PASS.** `grep -n '^#\+ A resource-backed worker' guides/worker.md` returns exactly one hit (`:394`, heading-scoped). `grep -rn '@example' src` shows exactly one titled block (`src/core/factories.ts:25`). The fence body (`worker.md:398-411`) is byte-identical to the `@example` block body (`factories.ts:26-39`), same language (`ts`), no three-backtick run, no `*/` terminator.

**7. PASS.** The H1 blockquote in `guides/worker.md:3-5` and the blockquote under `README.md`'s H1 (`README.md:3-5`) are byte-identical: one noun phrase, same line breaks, no link, no bold. The displaced sentences sit in the guide's opening prose (`:7-28`); neither that prose nor the README's opening paragraph (`README.md:7-16`) restates the tagline's composition clause — the guide prose covers construction/validation/observability detail the tagline never states, and the README covers onboarding (`createWorker`, `emitter`, `createNodeWorker`, the `{ id, signal }` contract) the tagline never states.

**8. PASS.** `tests/guides.test.ts` matches `/home/user/fleet/abort/tests/guides.test.ts` byte for byte from `const root = new URL('../', import.meta.url)` (verified by direct comparison of both files, lines 47-124 of abort vs. 61-130 of worker) through the manifest loop's closing brace, apart from worker's own constants and its trailing file-scope case, exactly as the converge report's hunk table states. `README.md` is in `ROOT_FILES` (`:59`); `GUIDE_SPEC` is declared (`:39`); the pin sits at file scope in the guard-and-continue form (`:86-108`) with no local type predicate; the README case (`:115-124`) carries two `not.toBeUndefined()` guards before `toBe`. Each test is named for what it proves.

**9. PASS.** The converge report's `cells.py` instrument reports `non-Summary cells moved: 0` across 32 compared rows (Criterion 3). Every `src/**` diff hunk reviewed (`d7n-worker-converge.diff.txt`, `src/core/factories.ts`, `src/core/types.ts`, `src/server/factories.ts`) sits inside a doc block; no code token moved. `## Tests` section exists (`worker.md:496-597`) and names the equality gate descriptively with no SQ/MQ/EQ/RQ identifier (grep for `SQ|MQ|EQ|RQ` in the guide: no match). No genuine all-caps emphasis remains in the current tree (the residual `[A-Z]{3,}` hits are acronyms — `CPU`, `JSON`, `FIFO`, `API` — not emphasis). No banned count in the guide's own prose was found.

**10. PASS.** `d7n-worker-converge.status.txt` lists only `README.md`, `guides/worker.md`, `src/core/factories.ts`, `src/core/types.ts`, `src/server/factories.ts`, `tests/guides.test.ts` — matching the diff and the brief's scope exactly.

**11. PASS.** The converge report's Criterion 6 and Criterion 7 sections quote `npm run docs` (`rows read: 1, disagreements found: 0`), `--to guide`/`--to source` (`written: 0` each), `oxfmt --check`, scoped `oxlint`, `npm run check`, `npm run test:guides` (`26 passed`), and `npm run test:policy` (`90 passed | 1 skipped`) with their exit codes, each attributed to a run the report names.

**12. FAIL.** File:line citations checked (`guides/worker.md:51-53`, `:104`, `:131`, `:394`, `:453`, `:500-508`; `src/core/factories.ts:25`) all match the tree. But the converge report states counts in its own authored prose, which the brief's Output section explicitly forbids ("No count in prose: name the members or recast the sentence"), and `AGENTS.md` § Writing bans unconditionally for a growable set such as "cases," "rows," or "steps":
- `d7n-worker-converge-report.md:21` — "Header lines replaced with the pilot's **three** lines"
- `:28` — "**Two** `not.toBeUndefined()` guards before `toBe`"
- `:182` — "a **two**-line explanatory comment"
- `:207` — "**Two** paragraphs now carry:"
- `:220` — "**Two** sentences were dropped as duplicates"
- `:315` — "The **three** bijection cases passed on arrival" (`cases` is a named banned set in the rule)
- `:348` — "In **two** paragraphs between the blockquote and `## Surface`"
- `:383` — "**Two** lines I edited exceeded the guide's wrap width"

These are the report author's own claims, not quoted tool output or fixture data, so none is exempt.

**13. Reader/seed defects — ruled real, not blocking.**
- Decision 1 (`converge-report.md:290-317`): `@orkestrel/guide`'s `collectGroups` requires a level-4 `#### \`Interface\`` heading before a `## Methods` table enters `guide.methods()`. Confirmed real against `/home/user/fleet/abort/guides/abort.md` and `.claude/rules/documentation.md` § Parity's "one method table per interface, keyed by its backticked name." Not blocking worker's release — the unit closed it in-tree (`worker.md:131`) and the gate reads `disagreements found: 0`.
- Finding 1 (all-caps survives outside rewritten blocks, `converge-report.md:403-409`): verified real — `src/core/Worker.ts:14,15,36,38,50` carry `ACQUIRES`, `RELEASES`, `RE-EXPOSES`, `OWN`, `PUSH`. Not blocking: none sits in a compared `Summary` cell. Carrier: the fleet's closing sweep, as the report states.
- Finding 2 (a `## Methods` table with no interface heading is silently outside the gate, `converge-report.md:410-414`): real, general risk for other packages in the fleet, not specific to worker. Not blocking worker's own release. Carrier: the closing sweep or a fleet-wide `checker` claim, as the report proposes.

## Findings outside the numbered claims

- The converge report's count violations (claim 12) recur in a pattern: every instance sits in the "Decisions" / hunk-table narrative sections the writer composed freeform, while the sections built from templated criteria (1, 6, 7, 8) stay clean. Right looks like: route every narrative section through the same substitution-table sweep the brief already required for `guides/worker.md` and `README.md`, applied to the report itself before it is filed. Package: worker.

VERDICT: FAIL 12
