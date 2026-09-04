## Lane

I held the **objective** lane — correctness, constraints, and what the code and contracts actually permit — as the recorded substitution for the dark Sol bench. Claim 8's gate reading is NOT-EVIDENCED for a read-only lane, stated in its verdict.

## Per-claim verdicts

**1. Coverage — REFUTED.**

The export half and the data-table half hold; the `file:line` half fails.

Sweep: pattern `^export` over `/home/user/scaffold/tests/setup.ts` and `/home/user/scaffold/tests/setupServer.ts`. Every value export the sweep returned is named in the report's coverage table, and every one is imported by the matching proof file (`tests/setup.test.ts:2-33`, `tests/setupServer.test.ts:9-77`). Sweep: pattern over the table names across `/home/user/scaffold/tests/src/**` returned exactly the consuming suites the report names — `PATH_CASES` at `tests/src/core/validators.test.ts:67`, `RANGE_CASES` and `MANIFEST_SAMPLE` at `tests/src/core/helpers.test.ts:629,668`, `BROWSER_RESOLVER_EXPORTS` at `tests/src/core/templates.test.ts:1148`, `FILESYSTEM_PATH_CASES` at `tests/src/server/validators.test.ts:64`, the digest and match tables at `tests/src/server/helpers.test.ts:111-283`, `UPSTREAM_ENDPOINT_CASES` at `tests/src/server/Upstream.test.ts:43`, the command tables at `tests/src/bin/helpers.test.ts:243-302`, the manifest and catalog texts at `tests/src/server/Materializer.test.ts:1153-1408` and `tests/src/bin/CLI.test.ts:99-4112`.

The refutation: a contiguous tail of the `tests/setupServer.ts` rows cites lines 11 short of the case they name, against the landed file. The smallest failing input is the `buildCLIOptions` row, which cites `tests/setupServer.test.ts:715`. Line 715 is `// The held request is the one a suite would otherwise leak, so destroy is what` — a comment inside a different case. The `buildCLIOptions` case begins at `tests/setupServer.test.ts:726`. The landed diff confirms the file, not the report, is current: `/home/user/work/evidence/followon-scaffold-setup-proof.diff:1058` adds that `it(` at file line 726.

Smallest correct fix — renumber these rows in the report (add 11): `buildCLIOptions` 715→726; `buildOptionArgv` 726→737; `FILESYSTEM_PATH_CASES` and the `GIT/PROTECTED/SENSITIVE/STORAGE` group 745→756 and 762→773; `DIGEST_CASES` 777→788; `COMMAND_CASES, USAGE_CASES, AUDIT_EXIT_CASES` 762→773 and 783→794; `UPSTREAM_ENDPOINT_CASES` 762→773; `UPSTREAM_PATHS, FLEET_UPSTREAM_PATHS` 791→802; `HOSTILE_ARGUMENT, HOSTILE_BYTES` 808→819; `CORE_GENERATED …` 814→825; `buildCompiledPlan, buildVendoredPlan` 830→841; and the `buildFleetManifest` row's trailing `:814`→`:825`.

**2. Contract, not production — CONFIRMED.**

I read every case of both proof files against the helper it names. No case constructs a `Compiler`, drives the CLI, drives `Materializer`, or drives `Upstream`. `tests/setup.test.ts` imports `vitest` and `./setup.js` and nothing else (`tests/setup.test.ts:1-33`). `tests/setupServer.test.ts` reaches production once, importing `ScaffoldError` from `@src/core` (`:7`), and uses it only to raise the input the refusal readers narrow (`:388`, `:393`, `:400`, `:414`).

The cases that touch production behaviour reach it through a fixture record and assert the record's own truthfulness, which is the invariant the helper declares: `guardCase.guard(value)` at `tests/setup.test.ts:210` and `tests/setupServer.test.ts:360`, `parserCase.parse` at `tests/setup.test.ts:228-232`, `unionCase.guard` at `:243-244`, `purityCase.call()` at `:261`. `buildCompiledPlan` and `buildVendoredPlan` run a real compiler inside the helper; the case at `tests/setupServer.test.ts:841` reads the returned plan's own fields, and the vendored plan's `groups` assertion at `:849` reads a literal the fixture declares at `tests/setupServer.ts:1401` rather than anything the compiler decides. The derived-total case at `tests/setupServer.test.ts:825` asserts the constants agree with each other and with the filter each applies (`tests/setupServer.ts:1343-1386`).

**3. Wiring — CONFIRMED.**

`vite.config.ts:159-168` declares the `setup` factory with `include: ['tests/setup*.test.ts']`, `setupFiles: ['./tests/setup.ts']`, `environment: 'node'`, and `browser: { enabled: false }`; `vite.config.ts:217` carries `setup` in `test.projects`. `package.json:84` declares `test:setup` after `test:bench` at `:83` and before `build` at `:85`, so it is the last `test:` key. `package.json:74` runs `npm run test:config && npm run test:setup && npm run test:guides`. No other project's include reaches a root `tests/setup*.test.ts` file, so the proofs collect exactly once. This satisfies `.claude/rules/workspace.md:137-139` and the vendored gate at `tests/config.test.ts:133-138`, which requires that exact include and setup-file pair whenever the glob matches. `tests/src/core/compilers.test.ts:1171` declares `setup: true`, and the diff hunk at `/home/user/work/evidence/followon-scaffold-setup-proof.diff:1189-1194` adds that line and nothing else in that file.

**4. Controls — CONFIRMED.**

`.orkestrel/campaign/conform/units/followon/scaffold-setup-proof/setup-red-control.txt:53` reads `Tests 2 failed | 67 passed (69)`, and `:12` and `:35` name exactly the cases the report names. The planted defects are visible in the capture's own diffs: `blocking` received `false` where `true` was expected (`:19-20`), and the digest over `hi` differed from the anchor (`:38-39`). Both point at the landed proof files — `:25` cites `tests/setup.test.ts:78:27`, which is the `buildQuestion` assertion at `tests/setup.test.ts:78`, and `:41` cites `tests/setupServer.test.ts:136:60`, which is the anchor assertion at `tests/setupServer.test.ts:136`. `setup-green.txt:11` reads `Tests 69 passed (69)`; the landed files register 69 cases (sweep: pattern `^\t(it|describe)\(` over both proof files returned 21 in `tests/setup.test.ts` and 48 in `tests/setupServer.test.ts`), so the green run covered the landed case set. Neither setup module appears in `/home/user/work/evidence/followon-scaffold-setup-proof.status` nor in any diff header of `/home/user/work/evidence/followon-scaffold-setup-proof.diff`, so no plant residue survives.

**5. Resource hygiene — REFUTED.**

Sweep: pattern `createUpstreamServer\(|createScratch\(|\.destroy\(\)|finally \{` over `/home/user/scaffold/tests/setupServer.test.ts`. Every scratch is paired with a `finally` calling `destroy` (`:97/:101`, `:118/:124`, `:197/:207`, `:213/:222`, `:228/:247`, `:253/:264`, `:270/:275`, `:281/:303`, `:423/:441`). Every loopback server is paired with a `finally` except one.

The refutation: `tests/setupServer.test.ts:701`, `drops the connection it is holding open when the suite destroys it`, opens a real listener at `:702` and releases it at `:714` in the case body, with no `finally`. The failing input is any earlier failure inside that case — `expect(answered.status).toBe(200)` at `:707` returning a non-200, or `server.arrival('/held')` at `:713` rejecting. The case then leaves a bound `127.0.0.1` listener and a held request open for the rest of the worker's life. The helper's own contract states the discipline this case departs from: `tests/setupServer.ts:1802` reads `@returns The running fixture, which the caller destroys in a `finally`.`, and the file's own header comment at `tests/setupServer.test.ts:80` claims every resource is released in the same case.

Smallest correct fix — wrap the body and keep the in-body `destroy` the case asserts on, which `destroy` supports because it is idempotent (`guides/test.md:1148`: "It is idempotent — the first call's promise is returned to every later one"):

```ts
const server = await createUpstreamServer({ /* unchanged */ })
try {
	// the existing body, including the `await server.destroy()` the case asserts on
} finally {
	await server.destroy()
}
```

The remaining conditions of the claim hold: every write goes through a scratch the case owns (`workspace.write`, `workspace.ensure`, and the `createHostRoot`, `createCheckout`, `createFleet`, `createCatalogFleet`, `createStagedHost` fixtures, each rooted at the scratch), the git repository is created inside a scratch (`:283-284`), and the only repository access is a read — `listExecutablePaths` runs `git ls-files --stage` (`tests/setupServer.ts:261`) and the anchor case reads with `existsSync` and `readFileSync` (`tests/setupServer.test.ts:87-93`).

**6. Placement — CONFIRMED.**

`tests/setup.test.ts:1-33` imports `vitest` and `./setup.js` and no `node:*` module. `tests/setupServer.test.ts:8-77` imports `./setup.js` and `./setupServer.js`, and owns the Node resources at `:1-3`. Sweep: pattern `describe\(|\bit\(|expect\(` over `tests/setup.ts` and `tests/setupServer.ts` returned nothing, so neither setup module gained a registration symbol, and neither appears in the diff or the status. Sweep: pattern `^(const|function|let|class|type|interface|export)` over `tests/setup*.test.ts` returned nothing, so neither proof file declares a module-scope helper that belongs in a setup module.

**7. Scope — CONFIRMED.**

`/home/user/work/evidence/followon-scaffold-setup-proof.status:1-5` lists `M package.json`, `A tests/setup.test.ts`, `A tests/setupServer.test.ts`, `M tests/src/core/compilers.test.ts`, `M vite.config.ts`. Sweep: pattern `^diff --git|^@@` over the diff returned hunks only at `package.json` (the `test` chain at `:9-10` and the `test:setup` key at `:18`), the two new proof files, the single `setup: true` line at `:1193`, and the `vite.config.ts` factory and `projects` row at `:1205-1224`. No vendored file, no `src/**`, no `guides/**`.

**8. Gates — NOT-EVIDENCED for the gate reading; the audit half CONFIRMED.**

I cannot run a gate in this lane, so the exit codes are NOT-EVIDENCED by me. The landing log records them: `.orkestrel/campaign/conform/units/followon/land-scaffold-setup-proof.log.txt:1-5` reads `format:check exit=0`, `lint:check exit=0`, `check exit=0`, `build exit=0`, `test exit=0`, and `:8` records the commit `1da0a353` over 5 paths.

The audit half I checked by reading both captures. `audit-after.txt` is `audit-before.txt` with its first line removed and nothing else: `audit-before.txt:1` carries the `setup` advisory, `audit-after.txt:1-10` matches `audit-before.txt:2-11`, `audit-after.txt:100-103` matches `audit-before.txt:101-104`, and `audit-after.txt:105-106` matches `audit-before.txt:106-107`, ending `2 of 42 planned paths drifted from the plan.` and `EXIT=1`. That is `1d0`.

Note for the record: the landing run's own audit invocation did not produce a reading — `land-scaffold-setup-proof.log.txt:6` reads `scaffold scaffold audit --offline exit=127 FINDINGS`, an unresolved command, consistent with the unit's deviation about the missing `node_modules/.bin/scaffold` shim. The `1d0` evidence therefore rests on the unit's captures taken through `node dist/bin/main.js`, not on the landing run.

**9. Residue and record — REFUTED.**

The residue half holds. Sweep: pattern `\.skip\(|\.only\(|\.todo\(|TODO|\bany\b|\bas [A-Z]|debugger|console\.|@ts-|oxlint-disable|eslint-disable` over `tests/setup*.test.ts` returned nothing; sweep: pattern `[\w\)\]]![^=]` over the same paths returned nothing, so no non-null assertion entered. Every case name states what it proves.

The refutation is the report's prose. Sweep: pattern `\b(one|two|three|both|One|Two|Three|Both|below|above|Below|Above)\b` over `/home/user/scaffold/tmp/units/followon/scaffold-setup-proof-report.md`:

- `:243` reads `**3. The two setup modules were edited and restored for the controls.**` — a count of a set that grows, since `.claude/rules/tests.md:192-194` names `tests/setupBrowser.ts` and `tests/setupStyles.ts` as further members. Fix: `The setup modules were edited and restored for the controls.`
- `:137` reads `Restored by editing the same two lines back` — a count. Fix: `Restored by editing the same lines back`.
- `:254` reads `and the two links to `tests/guides.test.ts`` — a count. Fix: `and the links to `tests/guides.test.ts``.
- `:231` reads `The control below it (`tests/src/core/compilers.test.ts:1201`)` — `below` as a pointer, refused by `.claude/rules/writing.md` § Code tokens, references, and links. Fix: `The control that follows it`.
- `:5` reads `One gate is red` and `:125` reads `Planted, one helper body per module` — both marginal, because each names its members in the same sentence; correct them with the same edit if the report is revised.

No list item is named by position: `the last declared `test:` key was `test:bench`` at `:108` states the ordering requirement itself rather than substituting a position for a name.

## Findings outside the claims

**O-1. The retained unit record does not carry the report it says it carries.** `.orkestrel/campaign/conform/units/followon/scaffold-setup-proof-opus-result.md:1` reads "Report written to `/home/user/scaffold/tmp/units/followon/scaffold-setup-proof-report.md`; it is reproduced below", and the file ends at its own line 38 with no reproduction — a sweep for `buildCLIOptions|buildOptionArgv|CORE_GENERATED` over it returned nothing. The export-coverage table, which is the unit's principal deliverable under its brief's Output section, exists only under `tmp/`, which `.agents/orchestration.md` § Dispatch anatomy sweeps at acceptance while requiring the returned report be copied into `.orkestrel/<package>/`. Fix: copy the full report to `.orkestrel/campaign/conform/units/followon/scaffold-setup-proof-report.md`, with claim 1's renumbering applied, before the sweep runs.

**O-2. The scratch-prefix case passes for every value its subject could take.** `tests/setupServer.test.ts:96-104` allocates a scratch with `{ prefix: SCRATCH_PREFIX }` and asserts `workspace.path.includes(SCRATCH_PREFIX)`. That assertion re-derives its answer from the same value it feeds in, so it holds whatever `SCRATCH_PREFIX` is set to and reports on `createScratch` from `@orkestrel/test/server` rather than on the constant — the shape `.claude/rules/tests.md:35` refuses. This breaks no numbered claim: the constant's body does nothing, so claim 1 does not reach it, and `createScratch` is outside claim 2's named production surfaces. Fix: assert the property the consuming suites depend on — that the prefix is one path segment carrying no separator, which is what stops an allocation escaping its parent per `guides/test.md:737`.

**O-3. Observation, no change required.** The `setup` project spawns real `git` children (`tests/setupServer.test.ts:290-301` and `listExecutablePaths` at `:107`) under Vitest's default per-test budget, where `src:bin` raised its own budget to `15_000` for that reason (`vite.config.ts:127-130`). `.claude/rules/tests.md:168` requires such a budget be sized from a contended run. The measurement argues the margin is wide: `setup-green.txt:13` reports `Duration 1.98s` with `tests 616ms` for the whole project, and each project in the `test` chain runs in its own invocation rather than beside the others.

## Referrals

**R-1 — to the subjective lane.** The coverage table's drift at claim 1 was possible because the table addresses cases by line number rather than by the case name each case already carries. Whether the report should cite the case name, which survives an edit, instead of a line, which does not, is a question about the record's form rather than its correctness. I hold no verdict on it.

## Claims attacked and held

Claims 2, 3, 4, 6, and 7 were attacked and could not be broken. Claim 2 was attacked by reading every case against the helper it names and by tracing each production symbol the proof files reach; claim 3 by reading the vendored gate that constrains the project registration; claim 4 by matching the capture's cited lines and case count against the landed files; claim 6 and claim 7 by sweeping the proof files and the landed diff for anything outside the declared scope.

VERDICT: FAIL 1, 5, 9; outside the claims: O-1, O-2
