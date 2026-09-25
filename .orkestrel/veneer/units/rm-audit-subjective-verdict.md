Lane held: subjective (`reviewer`, Opus 5.5, clean context). The claims were written by `opus` on Opus 5.5, which is my own engine, so I attacked this work harder. The dispatch has no defect: it names no report path for me and assigns me no command.

## Per-claim verdicts

**1. The fix: CONFIRMED.**
- The template span is `src/core/templates.ts:119-126`. The own-config span is `vite.config.ts:58-65`. The diff shows the same code at both sites (`rm.diff:81-89` and `rm.diff:505-513`).
- The invocation record returns `{ ...base, mode: override.mode }`. Only the base is spread, so `command`, `isPreview`, `isSsrBuild` and every other record field are dropped.
- A record whose `mode` is not a string throws `The project invocation carries no string mode`.
- The `undefined` path and the `mergeConfig` path are unchanged.
- The comments differ only by template-literal escapes. Claim 5's mutation run corroborates the byte identity: the compilers self-comparison stayed green while both sites were mutated.
- Voice note, not a finding: "returns the base in the record's `mode`" (templates.ts:102-103) reads better as "returns the base with the record's `mode`".

**2. The vendored contract: BROKEN, on one clause.**
- The claim says the file imports only `node:` modules and `vitest`. `tests/config.test.ts:21-62` also imports `vite`, `oxlint/plugins-dev`, `../configs/helpers.js`, `../configs/policy.js`, `../vite.config.js`, `../tsconfig.json` and `./setupPolicy.js`.
- The change added no import: its only hunk starts at `@@ -370`. So the code breaks no rule.
- The claim restates the design verdict's paraphrase ("keeps the vendored file to `node:` modules and `vitest`"). The unit report repeats it ("as before"). The actual law is the vendored-file import law in `.claude/rules/workspace.md`: `node:` modules, packages in `BASE_DEV_DEPENDENCIES`, and the vendored set.
- Fix: correct the claim and the report sentence to "the change adds no import, and the file's imports stay within the vendored-file import law". The code needs no edit.
- Every other clause holds:
  - Every root entry is driven with the sentinel record (`config.test.ts:397-414`).
  - Each result must carry the record's `mode` and no other record field (`config.test.ts:416-421`).
  - The ignoring, spreading and inline controls are pinned to their own readings and fail the same predicate (`config.test.ts:422-434`).
  - The throw is asserted (`config.test.ts:438-443`).
  - Both old cases are gone.
- Mutations, and whether the assertions tell each one apart from the passing case:
  - `return base` gives `mode: undefined` for every project, and line 416 fails with an AssertionError (`rm-mutation-config.log.txt`). Distinguished.
  - A whole-record merge makes `leaked` non-empty, so line 416 fails. Distinguished, by reading the code.
  - Removing the throw makes lines 440-442 fail. Distinguished, by reading the code.
  - The unit ran only the `return base` mutation.

**3. The end-to-end pin: CONFIRMED.**
- The case compiles and materializes a generated `proof` workspace (`distribution.test.ts:707-719`).
- The fixture is the existing `createUpstreamServer` on loopback, and it stays alive across every `await execute(...)` until the `finally` block (lines 703-705 and 855).
- The release reading is pinned exactly: `code: 1`, the proof `failed` on the registry message, `statuses: []` and `pinged: 1` (lines 829-844).
- The ordinary run must exit 0 with `['passed','skipped']` (lines 845-851).
- None of the rival runs (malformed configuration, collection failure, unrelated assertion, timeout) may equal the release reading (lines 852-853).
- Mutation: `return base` turns the release reading into `code: 0`, `passed`, `['passed','skipped']`, which fails with an AssertionError (`rm-mutation-distribution.log.txt`). A Vitest change that ignores a project's `mode` produces the same reading, so the case distinguishes the defect it is placed to catch.
- The rival predicate can fail: with the malformed rewrite removed, `not.toContainEqual` failed (`rm-control-check.log.txt`).
- Title (line 701): accurate.

**4. Failing first, then green: UNRESOLVED.**
- The red logs are real assertion failures, and the green logs pass.
- Only the writer's report says the red runs used the `392aa1e0` bytes. The red readings are byte-for-byte the same as the mutation readings (compare `rm-red-config.log.txt:10-79` with `rm-mutation-config.log.txt:24-93`), so the logs cannot tell baseline bytes from the mutation.
- To settle it: re-run both red commands with `git show 392aa1e0:src/core/templates.ts` and `git show 392aa1e0:vite.config.ts` in place, and record each site's digest in the log header.

**5. Mutation: CONFIRMED.**
- `rm-mutation.diff.txt` has no file names. Its hunks resolve to `templates.ts:125` and `vite.config.ts:64`.
- The config case and the end-to-end case each fail with an AssertionError that shows the mutation's reading (see claims 2 and 3).
- The `src:core` failure is the pinned-text `toContain` at `compilers.test.ts:1778`. That is a byte pin, as the claim says, not a behaviour proof.

**6. Host log: CONFIRMED.**
- The release run exits 1 and every registry case throws `The distribution release gate requires a reachable npm registry.` (`rm-host-release.log.txt:12-54`).
- The ordinary run exits 0 with `5 passed | 4 skipped` (`rm-host-ordinary.log.txt`).
- The `skipIf(!registry && !release)` guards (`distribution.test.ts:1006, 1106, 1165`) only fire under release if the project reads `release`, so the release log tells fixed code from unfixed code.
- The one case skipped in both runs is the npm-floor case (`distribution.test.ts:1247`). It is unrelated.

**7. Prose: CONFIRMED, as worded (presence, within the owned files).**
- The guide sentence is present (`guides/scaffold.md:2118-2119`).
- The template comments describe the code: `templates.ts:98-108`, `templates.ts:1290-1291` and `vite.config.ts:37-47`.
- In the owned files, "base unchanged" survives only in `.orkestrel/` records.
- Whether the guide sentence is true everywhere is ruled in F2.

**8. Scope and law: BROKEN, on the title clause.**
- `tests/config.test.ts:373` is titled `runs every project in the mode Vitest was invoked with`. The case never involves Vitest: it calls the factories through `Reflect.apply` with a synthetic record.
- If Vitest stopped honouring a project's returned `mode` (the design verdict's named risk), this case stays green while its title turns false. That is the same overclaim the verdict ruled against in the case this one replaces (`emits every project as a factory so the release mode reaches its proof`).
- Only the end-to-end case observes Vitest running the project.
- Fix: retitle it for what it proves, for example `returns the invocation mode and no other invocation field from every registered project factory`.
- The other clauses hold:
  - Every changed path is owned or named (`rm-status.txt`).
  - `src/core/constants.ts` and `package.json` did not change.
  - The diff adds no `any`, `as`, `!`, suppression or hidden helper.
  - The arrows at `config.test.ts:393-396` are passed directly to `Object.defineProperty`, which is the permitted exception to the no-nested-functions rule.
  - The end-to-end title is accurate.

## Findings outside the claims

**F1. Inline scenario table and a duplicated Vitest JSON report reader.**
- Where: `tests/distribution.test.ts:748-779` (the `scenarios` table) and `tests/distribution.test.ts:805-823` (the projection of the JSON report).
- Why it breaks a rule:
  - `.claude/rules/tests.md` § Shared test infrastructure says: "Data tables and case matrices belong in a setup file at any size; test registration does not." It also says to extract a scenario or data builder "as soon as it could serve another test".
  - The repository follows this convention: `{ label: '…' }` rows appear 82 times in `tests/setupServer.ts`, 22 times in `tests/setup.ts`, and 10 times in `tests/setupPolicy.ts`. In test files they appear only in this case.
  - The report projection is a second inline reader of the Vitest JSON reporter format (`testResults` → `name` / `assertionResults`). The first is at `distribution.test.ts` around lines 1210-1229.
  - The case runs to about 160 lines, which hides its three real assertions.
- Right fix:
  - Export a reader for the Vitest JSON report and a builder for the release-run scenarios from `tests/setupServer.ts`.
  - Prove both in `tests/setupServer.test.ts`.
  - Route both report-reading sites through the one reader.
- Carrier: a successor brief that grants `tests/setupServer.ts` and its proof. That file was outside RM-SCAFFOLD's owned set.

**F2. The guide sentence overclaims "each project", and one pronoun is ambiguous.**
- Where: `guides/scaffold.md:2118-2119`.
- The overclaim:
  - The root factory `appJourney` (`src/core/templates.ts:362-382`, named "the root `appJourney` factory" in `.claude/rules/workspace.md`) takes no override and returns no `mode`.
  - The birth-owned wrapper registers `() => appJourney(variant, VARIANTS)` (`templates.ts:869`), which drops the record.
  - The Orchestrator's probe measured that a factory which drops the record reads `test`. So in a workspace that selects the journey axis, each `journey:<variant>` project runs in `test` under any `--mode`.
  - This is derived from source on that measured premise. I did not execute it.
- The pronoun: in "in its own `test` mode", "its" can attach to the project as easily as to Vitest (`.claude/rules/writing.md` § Sentence and paragraph order).
- Right fix, as prose: "The project factories the root configuration registers carry the invocation mode into each of their projects, because Vitest runs a project whose factory returns no mode in Vitest's own `test` mode, where the proof skips."
- Making `appJourney` carry the record would be a design change beyond the verdict's list of sites. That belongs to the Orchestrator.

**Report-only patch to `src/core/compilers.ts`: not a finding.**
- The existing comment (`compilers.ts:815-818`) states a necessary condition ("only inside a project it calls"). That stays true, so leaving it breaks no rule.
- The patch is truer, because it names the `mergeOverride` step.
- If you integrate it, fix one pronoun: "and `mergeOverride` returns it" can attach "it" to the project. Write "and `mergeOverride` sets that mode on the project it returns".

**Journey observation: not a finding in code.**
- No journey proof reads the mode, and the wrapper is birth-owned and outside the verdict's list of sites.
- Its effect on the prose is F2.

## Attacked and held
- Whether the config-case controls are circular. They are not: each control is pinned to its own reading, and a separate loop refuses each one against the forwarded predicate.
- Whether "every added case title states what the case proves" holds for the end-to-end title. It does.
- Placement of the end-to-end pin in `tests/distribution.test.ts`. It sits where the verdict placed it. It must stay outside the vendored set because it imports `Compiler` and `Materializer` from `@src` and helpers from `setupServer.js`, which a fleet target (a workspace that receives scaffold's vendored files) lacks. It does not rest on the misstated import rule in claim 2.
- The mutation's `src:core` red. It is disclosed, and it cannot be avoided while `compilers.test.ts` pins the whole span.
- Behaviour an auditor might mistake for a defect: under `vitest bench` the record's mode is `benchmark`. That is the value projects already read, so the bench guard is unchanged.

## Referrals
- **To the objective lane: `host.json`.** It changes the digests for `.agents/orchestration.md` and `.claude/rules/styles.md`. The report attributes both to the committed inventory already being stale at `392aa1e0`, which only the writer reports. Settle it by digesting those blobs at `392aa1e0`, and rule whether the landing carries entries the change did not cause.
- **To the objective lane: claim 4.** The byte-provenance re-run described under claim 4.
- **To the Orchestrator: the `compilers.ts` comment.** The brief scoped out the comment describing the changed mechanism without naming a carrier (`.agents/orchestration.md` § Check the brief before you send it). Carry the patch or rule it out.

VERDICT: FAIL 2, 4, 8; outside the claims: F1, F2
