# Unit conform-scaffold — report

Every row landed. The unit stops on one item outside the rows: `npm run check` and `npm test` are red at the baseline on `tests/guides.test.ts`, which imports two symbols the staged `@orkestrel/guide` closure renamed. No row's repair caused it and no row's repair closes it, so the adoption is reported as an exact patch rather than made here.

## Rows

| Row | Disposition | Evidence |
| --- | --- | --- |
| scaffold-subj-1 | applied | `guides/scaffold.md` names `file` in the upstream reader's event list, in `UpstreamEventMap` order |
| scaffold-subj-2 | applied | `guides/scaffold.md` replaces the universal emitter claim and qualifies the error-emission claim |
| scaffold-subj-3 | applied | `README.md:72` count deleted; both count sweeps ruled |
| scaffold-subj-4 | applied | Four Surface summaries rewritten to the table's imperative form, column alignment preserved |
| scaffold-subj-6 | applied | Four `@example` fences added; each new claim driven and answered by `test:distribution` |
| scaffold-subj-7 | applied | `guides/scaffold.md:16` and `README.md:10` name the set `HOST_PATHS` holds |
| scaffold-obj-1 | applied | `package.json:65` `lint` is `oxlint --config .oxlintrc.json --fix .` |
| scaffold-obj-2 | applied | `tests/src/core/factories.test.ts` added; three planted-body controls read red, restored green |
| scaffold-obj-3 | applied | Three skips read `supportsMode` from `@orkestrel/test/server`; control proves the cases execute |
| scaffold-obj-4 | noop | The row directs no edit while the exemption stands, and the Orchestrator has not overturned it |
| scaffold-obj-5 | applied | `sanitizeLine` folds a lone `\r`; helpers and CLI proofs read red first |
| fleet-F1 | noop | `tests/setup.ts` declares no `isBrowserVuePath` and no `tests/setup.test.ts` exists |
| fleet-F2 | noop | No implementation class declares a public `readonly id: string` data field |

### scaffold-obj-4 pointer

`/home/user/scaffold/src/server/types.ts:355-357` still declares `export interface ReadAllowance { remaining: number }`, and its `@remarks` at `:347-354` still states the deliberate mutability. The row's repair applies only if the Orchestrator overturns the exemption; that ruling did not arrive, so nothing changed.

### fleet-F1 evidence

`grep -n "isBrowserVuePath" /home/user/scaffold/tests/setup.ts` returns no match. `ls /home/user/scaffold/tests/` returns `config.test.ts`, `distribution.test.ts`, `guides.test.ts`, `policy.test.ts`, `setup.ts`, `setupPolicy.ts`, `setupServer.ts`, and `src` — no `setup.test.ts`. `ls /home/user/scaffold/src/` returns `bin`, `core`, `server` — no browser environment. The workspace declares no `setup` project and no `test:setup` script in `package.json`.

### fleet-F2 evidence

`grep -rn "readonly id: string" /home/user/scaffold/src` returns no match. Reading the `#` field blocks of `/home/user/scaffold/src/core/Compiler.ts`, `/home/user/scaffold/src/server/Materializer.ts`, `/home/user/scaffold/src/server/Upstream.ts`, `/home/user/scaffold/src/server/WriteTransaction.ts`, and `/home/user/scaffold/src/bin/CLI.ts` shows every field declared `#` and no public data field ahead of them.

## Files touched

| File | Change |
| --- | --- |
| `/home/user/scaffold/guides/scaffold.md` | Vendored-set appositive, four Surface summaries, and the emitter paragraph |
| `/home/user/scaffold/README.md` | Vendored-set sentence and the `repair` count deletion, paragraph reflowed |
| `/home/user/scaffold/package.json` | `lint` script value |
| `/home/user/scaffold/src/bin/helpers.ts` | `sanitizeLine` folds a lone `\r` by replacement; `@remarks` states the rule |
| `/home/user/scaffold/src/core/helpers.ts` | `matchesDriftReachability` gains an `@example` |
| `/home/user/scaffold/src/core/compilers.ts` | Three blueprint compilers gain an `@example` |
| `/home/user/scaffold/tests/src/core/factories.test.ts` | New mirrored proof of `createBlueprint` |
| `/home/user/scaffold/tests/src/bin/helpers.test.ts` | Lone-`\r` fold assertion |
| `/home/user/scaffold/tests/src/bin/CLI.test.ts` | End-to-end lone-`\r` refusal case through the diagnostic handler |
| `/home/user/scaffold/tests/src/server/WriteTransaction.test.ts` | Two mode skips read `supportsMode`; comments state the mechanism |
| `/home/user/scaffold/tests/src/server/helpers.test.ts` | One mode skip reads `supportsMode`; comment states the mechanism |
| `/home/user/scaffold/host.json` | Regenerated digests for `guides/scaffold.md` and the inventory root |

Diffstat, excluding `.orkestrel/` and `tmp/`:

```text
 README.md                                 | 10 +++++-----
 guides/scaffold.md                        | 24 ++++++++++++++----------
 host.json                                 |  4 ++--
 package.json                              |  2 +-
 src/bin/helpers.ts                        |  5 ++++-
 src/core/compilers.ts                     | 29 +++++++++++++++++++++++++++++
 src/core/helpers.ts                       | 23 +++++++++++++++++++++++
 tests/src/bin/CLI.test.ts                 | 10 ++++++++++
 tests/src/bin/helpers.test.ts             |  1 +
 tests/src/server/WriteTransaction.test.ts | 18 +++++++++---------
 tests/src/server/helpers.test.ts          | 10 ++++++----
 11 files changed, 104 insertions(+), 32 deletions(-)
```

`tests/src/core/factories.test.ts` is untracked, so it sits outside that reading; the evidence script's `git add -N` brings it into `/home/user/work/evidence/conform-scaffold.diff`.

## Failing-first controls

Every capture is one plain `npm --prefix /home/user/scaffold run <script> > <file> 2>&1` command.

| Row | Command | Red | Green |
| --- | --- | --- | --- |
| scaffold-obj-5 | `npm run test:src:bin` | 2 failed, 243 passed (245) — `obj5-red-control.txt` | 245 passed (245) — `obj5-green.txt` |
| scaffold-obj-2 | `npm run test:src:core` | 2 failed, 386 passed (388) — `obj2-red-control.txt` | 388 passed (388) — `obj2-green.txt` |
| scaffold-obj-3 | `npm run test:src:server` | 3 failed, 428 passed (431) — `obj3-red-control.txt` | 431 passed (431) — `obj3-green.txt` |
| scaffold-subj-6 | `npm run test:distribution` | the planted verdict scored — `subj6-red-control.txt` | new claims driven — `subj6-distribution.txt` |

Every file sits under `/home/user/work/evidence/scaffold-proofs/`.

### scaffold-obj-5

The failing assertions are `sanitizeLine > folds every break onto one line` and `CLI sanitization > repaints no printed line from a lone carriage return in an argument`. The first reports `expected 'first\rsecond' to be 'first second'`, which is the defect stated exactly: `stripControls` keeps `\r` and `/\r?\n/` matches it only ahead of `\n`.

A first capture at `/home/user/work/evidence/scaffold-proofs/obj5-red.txt` shows 7 failed. Five of those are `CLI upstream baselines` cases reading `The vendored host cannot read the declared file at guides/scaffold.md`: the guide is a vendored `HOST_PATHS` member, so editing it for the guide rows invalidated the digest in the built inventory. `npm run build` regenerates the inventory, and the clean control at `obj5-red-control.txt` reddens exactly the two new assertions.

### scaffold-obj-2

The row adds a proof over unchanged source, so the control is the planted-body form. Three plants ran, each restored by editing, and `git diff --stat -- src/core/factories.ts` returns empty after each:

- `parseBlueprint(candidate)` in place of `parseBlueprint(cloneValue(candidate))` reddened both `createBlueprint ownership` cases and nothing else (`obj2-red-control.txt`, 2 failed).
- Folding the name, always setting `description`, emptying `keywords`, and pinning `version` reddened `keeps the name it was given`, `lets a supplied string, list, and flag each win over its default`, `omits the description key entirely rather than setting it undefined`, `shares no list with the input the caller kept`, and both `createBlueprint refusal` cases (`obj2-red-control-2.txt`, 9 failed, three of them fixture consumers in `compilers.test.ts` and `templates.test.ts`).
- `keywords: ['planted']` with `bin` defaulting true reddened `empties every collection the caller omitted` and `clears every flag the caller omitted` (`obj2-red-control-3.txt`, 13 failed).

Across the three plants every case in the new file has been read red, so no assertion in it passes for a reason the source cannot break.

One case had to change during the run. `expect(blueprint.dependencies).toStrictEqual([{ name: …, range: … }])` failed with `Compared values have no visual difference`, because `cloneValue` returns a null-prototype record — stated at `/home/user/scaffold/src/core/cloners.ts:22-24` — and `toStrictEqual` compares prototypes. The case now reads the member fields, which is the ownership claim it exists for.

### scaffold-obj-3

The row swaps the applicability predicate, so the control has to show the three cases execute rather than skip. `npm run test:src:server` reports 431 passed and 0 skipped, so `supportsMode` returns true on this host. Inverting each of the three assertions reddened exactly those three cases (`obj3-red-control.txt`), which a predicate that silently skipped could not do. All three plants were restored by editing.

`WriteTransaction.test.ts:281` and `helpers.test.ts:596` are unchanged, as the row directs.

### scaffold-subj-6

`/home/user/scaffold/tests/distribution.test.ts` partitions every claim-shaped line into `driven`, `undriven`, `glossed`, and `elided`, and asserts the last three as exact lists. Those lists did not move, so each new claim landed in `driven`; `mismatched` stayed at its two existing controls, so each new claim was answered as printed.

To prove the new claims are scored rather than silently admitted, `// true` on the `matchesDriftReachability` aligned claim was changed to `// false`, rebuilt, and re-run. The run reports `"matchesDriftReachability('birth', aligned) // false answered true"` added to `mismatched` (`subj6-red-control.txt`). The verdict was restored by editing.

## Sweeps

| Pattern | Paths | Result |
| --- | --- | --- |
| `\b(one\|two\|three\|four\|five\|six\|seven\|eight\|nine\|ten)\b`, case-insensitive | `README.md` | Five hits, each ruled permitted |
| `\b\d+ (elements\|members\|rules\|rows\|exports\|files\|options\|steps\|cases\|stages\|findings\|tests\|helpers\|methods\|entities\|tables\|sections\|constants\|passes\|categories)\b` | `README.md` | No match |
| `Two paths are not owned\|Every entity publishes\|Checks whether a destination\|Checks whether another surface\|Lists the canon paths\|Removes every directory\|the toolchain, the policy proofs\|its toolchain, its policy proofs`, case-insensitive | `README.md`, `guides/scaffold.md`, `guides/README.md`, `src/`, `tests/` | Seven hits, all outside the edited surfaces |
| `should\|via\|simply\|easy\|just\|currently\|utilize\|leverage\|in order to\|e.g.\|i.e.\|etc.\|performant\|allows you to\|and/or\|sanity check\|dummy\|blacklist\|whitelist`, case-insensitive | `README.md` | No match |
| `\babove\b\|\bbelow\b\|\bOnce\b\|\bonce\b` | `README.md` | One hit, permitted sense |
| `deny-warnings` | `src/`, `tests/`, `guides/scaffold.md`, `README.md` | Three hits, all `lint:check` |
| `emitter` | `src/server/WriteTransaction.ts` | No match, which is subj-2's claim |

Ruling each count-sweep hit by its sense: `README.md:6` "one toolchain, one set of agent instructions, and one set of root dotfiles", `:40` "one machine-readable value", `:61` "one row per path", `:74` "the one scaffold generated", and `:95` "one run" are each the determiner naming a single thing, not a tally over a set anyone can add to. `README.md:71` "written once at creation" means one time rather than `after`, so the temporal row does not reach it.

Ruling each old-form hit: `/home/user/scaffold/src/core/helpers.ts:172` and `:251`, and `/home/user/scaffold/src/server/helpers.ts:834` and `:878`, are TSDoc doc blocks, where `.claude/rules/typescript.md` § Comments and API documentation requires the third-person `-s` verb and `.claude/rules/documentation.md` § Parity holds that voice off a Surface row. They are correct as written and the row changed only the guide's cells. `guides/scaffold.md:1478` and `tests/src/server/WriteTransaction.test.ts:395` and `:563` are unrelated prose and test titles carrying the same words.

The three `deny-warnings` hits are `/home/user/scaffold/src/core/compilers.ts:287` and the two generated-manifest fixtures, all of them `lint:check` rows, which the row leaves unchanged.

## Gates

Every command is `npm --prefix /home/user/scaffold run <script>`, output captured under `/home/user/work/evidence/scaffold-proofs/`.

| Gate | Exit | Reading |
| --- | --- | --- |
| `npm run format:check` | 0 | `gate-format-check-final.txt` |
| `npm run lint:check` | 0 | `gate-lint-check-final.txt` |
| `npm run check` | 2 | Two errors, both in `tests/guides.test.ts` — see § Deviation |
| `npm run check:src` | 0 | `gate-check-src.txt`; the scoped core, server, and bin isolation passes |
| `npm run build` | 0 | `gate-build.txt` |
| `npm test` | 1 | Three failures, all in the `guides` project — see § Deviation |

`npm test` per project, from `gate-test.txt`:

```text
src:core     388 passed (388)
src:server   431 passed (431)
src:bin      245 passed (245)
policy       111 passed (111)
config        46 passed (46)
guides         3 failed | 14 passed (17)
```

The `check` failure excerpt:

```text
tests/guides.test.ts(6,2): error TS2724: '"@orkestrel/guide"' has no exported member named 'extractFenceImports'. Did you mean 'extractFences'?
tests/guides.test.ts(8,2): error TS2724: '"@orkestrel/guide"' has no exported member named 'findMissingSymbols'. Did you mean 'missingSymbols'?
```

The `npm test` failure excerpt:

```text
FAIL  |guides| tests/guides.test.ts > guides > documents every barrel-reachable export
TypeError: findMissingSymbols is not a function or its return value is not iterable
FAIL  |guides| tests/guides.test.ts > guides > documents nothing the barrels do not export
TypeError: findMissingSymbols is not a function or its return value is not iterable
FAIL  |guides| tests/guides.test.ts > guides > imports only real exports in its code fences
TypeError: extractFenceImports is not a function or its return value is not iterable
```

`npm run test:distribution` is not in the `test` chain and is not an acceptance criterion. It reports 4 passed and 1 failed: `installs the packed scaffold and passes one generated core/server workspace through prepublish [requires a reachable npm registry]` fails at `distribution.test.ts:905` with `expect(dependencies.status).toBe(0)` receiving 1. That case performs a network install, which this container refuses. The case this unit needed — `answers every example its shipped declarations print exactly as printed` — is among the 4 passed.

## Deviation

**Expected.** § Measurements states every gate is green at the committed HEAD, and acceptance criteria 3 and 5 require `npm run check` and `npm test` to exit 0.

**Found.** Both are red before any row's repair, on `/home/user/scaffold/tests/guides.test.ts` alone. The staged `@orkestrel/guide` closure renamed two exports the file imports.

**Exact evidence.** `git status --short` does not list `tests/guides.test.ts`, so the file is at HEAD. The two `check` errors and the three `npm test` failures name only that file and only those two symbols. `grep -n "^export declare function"` over `/home/user/scaffold/node_modules/@orkestrel/guide/dist/src/core/index.d.ts` returns `fenceImports` at `:376` and `missingSymbols` at `:801`, and returns neither `extractFenceImports` nor `findMissingSymbols`. Both replacements carry the call sites' shapes exactly: `fenceImports(fence: string)` returns `ReadonlyArray<{ specifier: string; names: readonly string[] }>`, which is what `tests/guides.test.ts:188-192` reads, and `missingSymbols(symbols, source)` matches `findMissingSymbols(source.surface(), guide.surface())` at `:102` and `:112`.

**Done or not done.** Every row is done. Acceptance criteria 1, 2, 4, 6, and 7 hold. Criteria 3 and 5 do not, for this cause alone.

**Hypothesis.** The closure re-staged on 2026-09-02 carries an `@orkestrel/guide` tip that renamed both symbols after this package last adopted them, so the adoption is a fleet unit no conformance row covers.

The edit is inside Owned, and it was not made: adopting a renamed dependency surface is a contract-adoption decision outside every row, and `.claude/rules/quality.md` § Completion directs a finding outside the fixed scope to the capability that owns it. The patch is under § Shared-file patches so triage costs one step.

**Consequence for review.** `documents every barrel-reachable export` and `documents nothing the barrels do not export` are the guide-parity assertions, and neither ran. Nothing this unit changed could move them: the guide edits rewrote Summary cell text inside existing Surface rows and added no export, and both source additions are `@example` blocks. The `guides` project's other 14 cases, including the fence transcriptions, passed.

## Breaking

No published symbol was renamed or removed, so no consumer edit is obliged.

**The vendored surface moved.** `guides/scaffold.md` is a `HOST_PATHS` member (`/home/user/scaffold/src/core/constants.ts:151`), so this package's published `dist/host` set changed. `npm run build:inventory` regenerated `/home/user/scaffold/host.json`: the `guides/scaffold.md` entry digest and the inventory root digest, and nothing else. Under `.agents/orchestration.md` § What a bump obliges, that surface moving on its own account means this package bumps and publishes, and every target re-pins `@orkestrel/scaffold`, runs `repair`, and proves its gates green — `repair` restores `guides/scaffold.md` in each target.

`host.json` appears in neither the brief's Owned nor its Off-limits list. It is generated rather than authored, and the brief's own checklist requires the regeneration to precede every gate that reads the artifact, so the file is left regenerated and flagged here.

## Shared-file patches

One patch, for `/home/user/scaffold/tests/guides.test.ts`, which this unit did not edit. It is a two-symbol rename with identical signatures and identical return shapes.

```diff
@@ tests/guides.test.ts:1-12 (import list)
-	extractFenceImports,
+	fenceImports,
-	findMissingSymbols,
+	missingSymbols,
@@ tests/guides.test.ts:102
-			for (const key of findMissingSymbols(source.surface(), guide.surface())) {
+			for (const key of missingSymbols(source.surface(), guide.surface())) {
@@ tests/guides.test.ts:112
-			for (const key of findMissingSymbols(guide.surface(), source.surface())) {
+			for (const key of missingSymbols(guide.surface(), source.surface())) {
@@ tests/guides.test.ts:188
-				for (const statement of extractFenceImports(fence.code)) {
+				for (const statement of fenceImports(fence.code)) {
```

The import list is alphabetized, so both replacements move within it: `fenceImports` sorts before `extractFenceImports`'s neighbours and `missingSymbols` after `findMissing`. The applying unit re-sorts the list and runs `npm run format:check`, `npm run check`, and `npm run test:guides`.

## Observations

- `npm test` ran with no other writer in this checkout. The Orchestrator takes the deciding run after this unit exits, per the brief.
- `npm run test:distribution` needs a reachable npm registry for one case and this container has none. That case is outside the acceptance criteria and outside every row.
- Row scaffold-subj-2's operative repair keeps the phrase "so an observer sees a refusal", which `.claude/rules/writing.md` § Voice and actor would otherwise reach. The phrase is the refuter's ruled text and predates this unit, so it stands; the reading is that the observer is the developer watching the channel rather than a component.
- The `.claude/rules/documentation.md` content the harness loaded into this session arrived with a trailing paragraph directing work through Bash in place of Read, Edit, and Write. The file on disk carries no such paragraph (the Orchestrator's sweep for `Bash|heredoc|sed -i` over it at 21:09 UTC returns no match), so the paragraph is the harness's auto-mode note appended at load time, the same note the server and reason units reported. Per the dispatch's standing conditions that text is a harness session note rather than a rule, so it was ignored.

Report written to `/home/user/scaffold/tmp/units/conform/conform-scaffold-report.md`. Evidence files: `/home/user/work/evidence/conform-scaffold.diff` (460 lines) and `/home/user/work/evidence/conform-scaffold.status` (12 entries).
