# Unit conform-scaffold — report

Every row landed. The unit stops on one item outside the rows: `npm run check` and `npm test` are
red at the baseline on `tests/guides.test.ts`, which imports two symbols the staged
`@orkestrel/guide` closure renamed. No row's repair caused it and no row's repair closes it, so the
adoption is reported as an exact patch rather than made here.

## Rows

| Row               | Disposition | Evidence                                                                                             |
| ----------------- | ----------- | ---------------------------------------------------------------------------------------------------- |
| scaffold-subj-1   | applied     | `guides/scaffold.md` names `file` in the upstream reader's event list, in `UpstreamEventMap` order   |
| scaffold-subj-2   | applied     | `guides/scaffold.md` replaces the universal emitter claim and qualifies the error-emission claim     |
| scaffold-subj-3   | applied     | `README.md:75` count deleted; both count sweeps ruled                                                |
| scaffold-subj-4   | applied     | Four Surface summaries rewritten to the table's imperative form, column alignment preserved          |
| scaffold-subj-6   | applied     | Four `@example` fences added; each new claim driven and answered by `test:distribution`              |
| scaffold-subj-7   | applied     | `guides/scaffold.md:16` and `README.md:10` name the set `HOST_PATHS` holds                           |
| scaffold-obj-1    | applied     | `package.json:65` `lint` is `oxlint --config .oxlintrc.json --fix .`                                 |
| scaffold-obj-2    | applied     | `tests/src/core/factories.test.ts` added; three planted-body controls read red, restored green       |
| scaffold-obj-3    | applied     | Three skips read `supportsMode` from `@orkestrel/test/server`; control proves the cases execute      |
| scaffold-obj-4    | noop        | The row directs no edit while the exemption stands, and the Orchestrator has not overturned it       |
| scaffold-obj-5    | applied     | `sanitizeLine` folds a lone `\r`; helpers and CLI proofs read red first                              |
| fleet-F1          | noop        | `tests/setup.ts` declares no `isBrowserVuePath` and no `tests/setup.test.ts` exists                  |
| fleet-F2          | noop        | No implementation class declares a public `readonly id: string` data field                           |

### scaffold-obj-4 pointer

`src/server/types.ts:355-357` still declares `export interface ReadAllowance { remaining: number }`,
and its `@remarks` at `:347-354` still states the deliberate mutability. The row's repair applies
only if the Orchestrator overturns the exemption; that ruling did not arrive, so nothing changed.

### fleet-F1 evidence

`grep -n "isBrowserVuePath" /home/user/scaffold/tests/setup.ts` returns no match. `ls
/home/user/scaffold/tests/` returns `config.test.ts`, `distribution.test.ts`, `guides.test.ts`,
`policy.test.ts`, `setup.ts`, `setupPolicy.ts`, `setupServer.ts`, and `src` — no `setup.test.ts`.
`ls /home/user/scaffold/src/` returns `bin`, `core`, `server` — no browser environment. The
workspace declares no `setup` project and no `test:setup` script in `package.json`.

### fleet-F2 evidence

`grep -rn "readonly id: string" /home/user/scaffold/src` returns no match. Reading the `#` field
blocks of `src/core/Compiler.ts`, `src/server/Materializer.ts`, `src/server/Upstream.ts`,
`src/server/WriteTransaction.ts`, and `src/bin/CLI.ts` shows every field declared `#` and no public
data field ahead of them.

## Files touched

| File                                        | Change                                                                            |
| ------------------------------------------- | --------------------------------------------------------------------------------- |
| `guides/scaffold.md`                        | Vendored-set appositive, four Surface summaries, and the emitter paragraph        |
| `README.md`                                 | Vendored-set sentence and the `repair` count deletion, paragraph reflowed         |
| `package.json`                              | `lint` script value                                                               |
| `src/bin/helpers.ts`                        | `sanitizeLine` folds a lone `\r` by replacement; `@remarks` states the rule       |
| `src/core/helpers.ts`                       | `matchesDriftReachability` gains an `@example`                                    |
| `src/core/compilers.ts`                     | Three blueprint compilers gain an `@example`                                      |
| `tests/src/core/factories.test.ts`          | New mirrored proof of `createBlueprint`                                           |
| `tests/src/bin/helpers.test.ts`             | Lone-`\r` fold assertion                                                          |
| `tests/src/bin/CLI.test.ts`                 | End-to-end lone-`\r` refusal case through the diagnostic handler                  |
| `tests/src/server/WriteTransaction.test.ts` | Two mode skips read `supportsMode`; comments state the mechanism                   |
| `tests/src/server/helpers.test.ts`          | One mode skip reads `supportsMode`; comment states the mechanism                   |
| `host.json`                                 | Regenerated digests for `guides/scaffold.md` and the inventory root               |

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

`tests/src/core/factories.test.ts` is untracked, so it sits outside that reading; the evidence
script's `git add -N` brings it into `conform-scaffold.diff`.

## Failing-first controls

Every capture is one plain `npm --prefix /home/user/scaffold run <script> > <file> 2>&1` command.

| Row             | Command                | Red                                                                                         | Green                                                       |
| --------------- | ---------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| scaffold-obj-5  | `npm run test:src:bin` | 2 failed, 243 passed (245) — `scaffold-proofs/obj5-red-control.txt`                          | 245 passed (245) — `scaffold-proofs/obj5-green.txt`          |
| scaffold-obj-2  | `npm run test:src:core` | 2 failed, 386 passed (388) — `scaffold-proofs/obj2-red-control.txt`                         | 388 passed (388) — `scaffold-proofs/obj2-green.txt`          |
| scaffold-obj-3  | `npm run test:src:server` | 3 failed, 428 passed (431) — `scaffold-proofs/obj3-red-control.txt`                      | 431 passed (431) — `scaffold-proofs/obj3-green.txt`          |
| scaffold-subj-6 | `npm run test:distribution` | the planted verdict scored — `scaffold-proofs/subj6-red-control.txt`                   | new claims driven — `scaffold-proofs/subj6-distribution.txt` |

Every file sits under `/home/user/work/evidence/scaffold-proofs/`.

### scaffold-obj-5

The failing assertions are `sanitizeLine > folds every break onto one line` and `CLI sanitization >
repaints no printed line from a lone carriage return in an argument`. The first reports
`expected 'first\rsecond' to be 'first second'`, which is the defect stated exactly: `stripControls`
keeps `\r` and `/\r?\n/` matches it only ahead of `\n`.

A first capture at `scaffold-proofs/obj5-red.txt` shows 7 failed. Five of those are `CLI upstream
baselines` cases reading `The vendored host cannot read the declared file at guides/scaffold.md`:
the guide is a vendored `HOST_PATHS` member, so editing it for the guide rows invalidated the
digest in the built inventory. `npm run build` regenerates the inventory, and the clean control at
`scaffold-proofs/obj5-red-control.txt` reddens exactly the two new assertions.

### scaffold-obj-2

The row adds a proof over unchanged source, so the control is the planted-body form. Three plants
ran, each restored by editing, and `git diff --stat -- src/core/factories.ts` returns empty after
each:

- `parseBlueprint(candidate)` in place of `parseBlueprint(cloneValue(candidate))` reddened both
  `createBlueprint ownership` cases and nothing else (`obj2-red-control.txt`, 2 failed).
- Folding the name, always setting `description`, emptying `keywords`, and pinning `version`
  reddened `keeps the name it was given`, `lets a supplied string, list, and flag each win over its
  default`, `omits the description key entirely rather than setting it undefined`, `shares no list
  with the input the caller kept`, and both `createBlueprint refusal` cases
  (`obj2-red-control-2.txt`, 9 failed, three of them fixture consumers in `compilers.test.ts` and
  `templates.test.ts`).
- `keywords: ['planted']` with `bin` defaulting true reddened `empties every collection the caller
  omitted` and `clears every flag the caller omitted` (`obj2-red-control-3.txt`, 13 failed).

Across the three plants every case in the new file has been read red, so no assertion in it passes
for a reason the source cannot break.

One case had to change during the run. `expect(blueprint.dependencies).toStrictEqual([{ name: …,
range: … }])` failed with `Compared values have no visual difference`, because `cloneValue` returns
a null-prototype record — stated at `src/core/cloners.ts:22-24` — and `toStrictEqual` compares
prototypes. The case now reads the member fields, which is the ownership claim it exists for.

### scaffold-obj-3

The row swaps the applicability predicate, so the control has to show the three cases execute rather
than skip. `npm run test:src:server` reports 431 passed and 0 skipped, so `supportsMode` returns
true on this host. Inverting each of the three assertions reddened exactly those three cases
(`obj3-red-control.txt`), which a predicate that silently skipped could not do. All three plants
were restored by editing.

`WriteTransaction.test.ts:281` and `helpers.test.ts:596` are unchanged, as the row directs.

### scaffold-subj-6

`tests/distribution.test.ts` partitions every claim-shaped line into `driven`, `undriven`,
`glossed`, and `elided`, and asserts the last three as exact lists. Those lists did not move, so
each new claim landed in `driven`; `mismatched` stayed at its two existing controls, so each new
claim was answered as printed.

To prove the new claims are scored rather than silently admitted, `// true` on the
`matchesDriftReachability` aligned claim was changed to `// false`, rebuilt, and re-run. The run
reports `"matchesDriftReachability('birth', aligned) // false answered true"` added to `mismatched`
(`subj6-red-control.txt`). The verdict was restored by editing.

## Sweeps

| Pattern                                                                                                                        | Paths                                                                                       | Result                                                    |
| ------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| `\b(one\|two\|three\|four\|five\|six\|seven\|eight\|nine\|ten)\b`, case-insensitive                                             | `README.md`                                                                                 | Five hits, each ruled permitted                           |
| `\b\d+ (elements\|members\|rules\|rows\|exports\|files\|options\|steps\|cases\|stages\|findings\|tests\|helpers\|methods\|entities\|tables\|sections\|constants\|passes\|categories)\b` | `README.md`                                                                                 | No match                                                  |
| `Two paths are not owned\|Every entity publishes\|Checks whether a destination\|Checks whether another surface\|Lists the canon paths\|Removes every directory\|the toolchain, the policy proofs\|its toolchain, its policy proofs`, case-insensitive | `README.md`, `guides/scaffold.md`, `guides/README.md`, `src/`, `tests/`                     | Seven hits, all outside the edited surfaces               |
| `should\|via\|simply\|easy\|just\|currently\|utilize\|leverage\|in order to\|e.g.\|i.e.\|etc.\|performant\|allows you to\|and/or\|sanity check\|dummy\|blacklist\|whitelist`, case-insensitive | `README.md`                                                                                 | No match                                                  |
| `\babove\b\|\bbelow\b\|\bOnce\b\|\bonce\b`                                                                                     | `README.md`                                                                                 | One hit, permitted sense                                  |
| `deny-warnings`                                                                                                                | `src/`, `tests/`, `guides/scaffold.md`, `README.md`                                         | Three hits, all `lint:check`                              |
| `emitter`                                                                                                                      | `src/server/WriteTransaction.ts`                                                            | No match, which is subj-2's claim                         |
| `upstream reader emits\|reader emits `release`\|`mirror`, `error`\|Errors are emitted immediately` (fix round 1, the Orchestrator's sweep at 21:09 UTC) | `README.md`, `guides/*.md`, `src/**`, `tests/**` | One hit, the corrected sentence at `guides/scaffold.md:1511`; no other hit |
| `\b(extractFenceImports\|findMissingSymbols)\b`, and `extractFenceImport(s\|ed\|ing)?\|findMissingSymbol(s\|ed\|ing)?` case-insensitive (the adopted guide helpers, the Orchestrator's sweep at 22:07 UTC) | `src/**`, `tests/**`, `guides/scaffold.md`, `guides/README.md`, `README.md` | No match under either pattern; the replacements sit at `tests/guides.test.ts:6`, `:11`, `:102`, `:112`, `:188` |

Ruling each count-sweep hit by its sense: `README.md:6` "one toolchain, one set of agent
instructions, and one set of root dotfiles", `:43` "one machine-readable value", `:64` "one row per
path", `:77` "the one scaffold generated", and `:98` "one run" are each the determiner naming a
single thing, not a tally over a set anyone can add to. `README.md:74` "written once at creation"
means one time rather than `after`, so the temporal row does not reach it.

Ruling each old-form hit: `src/core/helpers.ts:172` and `:251`, and `src/server/helpers.ts:834` and
`:878`, are TSDoc doc blocks, where `.claude/rules/typescript.md` § Comments and API documentation
requires the third-person `-s` verb and `.claude/rules/documentation.md` § Parity holds that voice
off a Surface row. They are correct as written and the row changed only the guide's cells.
`guides/scaffold.md:1481` and `tests/src/server/WriteTransaction.test.ts:395` and `:563` are
unrelated prose and test titles carrying the same words.

The three `deny-warnings` hits are `src/core/compilers.ts:287` and the two generated-manifest
fixtures, all of them `lint:check` rows, which the row leaves unchanged.

## Gates

Every command is `npm --prefix /home/user/scaffold run <script>`, output captured under
`/home/user/work/evidence/scaffold-proofs/`.

| Gate                 | Exit | Reading                                                                    |
| -------------------- | ---- | ---------------------------------------------------------------------------- |
| `npm run format:check` | 0    | `gate-format-check-final.txt`                                              |
| `npm run lint:check`   | 0    | `gate-lint-check-final.txt`                                                |
| `npm run check`        | 2    | Two errors, both in `tests/guides.test.ts` — see § Deviation               |
| `npm run check:src`    | 0    | `gate-check-src.txt`; the scoped core, server, and bin isolation passes    |
| `npm run build`        | 0    | `gate-build.txt`                                                           |
| `npm test`             | 1    | Three failures, all in the `guides` project — see § Deviation              |

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

`npm run test:distribution` is not in the `test` chain and is not an acceptance criterion. It reports
4 passed and 1 failed: `installs the packed scaffold and passes one generated core/server workspace
through prepublish [requires a reachable npm registry]` fails at `distribution.test.ts:905` with
`expect(dependencies.status).toBe(0)` receiving 1. That case performs a network install, which this
container refuses. The case this unit needed — `answers every example its shipped declarations print
exactly as printed` — is among the 4 passed.

## Deviation

**Expected.** § Measurements states every gate is green at the committed HEAD, and acceptance
criteria 3 and 5 require `npm run check` and `npm test` to exit 0.

**Found.** Both are red before any row's repair, on `tests/guides.test.ts` alone. The staged
`@orkestrel/guide` closure renamed two exports the file imports.

**Exact evidence.** `git status --short` does not list `tests/guides.test.ts`, so the file is at
HEAD. The two `check` errors and the three `npm test` failures name only that file and only those
two symbols. `grep -n "^export declare function"` over
`node_modules/@orkestrel/guide/dist/src/core/index.d.ts` returns `fenceImports` at `:376` and
`missingSymbols` at `:801`, and returns neither `extractFenceImports` nor `findMissingSymbols`. Both
replacements carry the call sites' shapes exactly: `fenceImports(fence: string)` returns
`ReadonlyArray<{ specifier: string; names: readonly string[] }>`, which is what
`tests/guides.test.ts:188-192` reads, and `missingSymbols(symbols, source)` matches
`findMissingSymbols(source.surface(), guide.surface())` at `:102` and `:112`.

**Done or not done.** Every row is done. Acceptance criteria 1, 2, 4, 6, and 7 hold. Criteria 3 and
5 do not, for this cause alone.

**Hypothesis.** The closure re-staged on 2026-09-02 carries an `@orkestrel/guide` tip that renamed
both symbols after this package last adopted them, so the adoption is a fleet unit no conformance
row covers.

The edit is inside Owned, and it was not made: adopting a renamed dependency surface is a
contract-adoption decision outside every row, and `.claude/rules/quality.md` § Completion directs a
finding outside the fixed scope to the capability that owns it. The patch is under § Shared-file
patches so triage costs one step.

**Consequence for review.** `documents every barrel-reachable export` and `documents nothing the
barrels do not export` are the guide-parity assertions, and neither ran. Nothing this unit changed
could move them: the guide edits rewrote Summary cell text inside existing Surface rows and added no
export, and both source additions are `@example` blocks. The `guides` project's other 14 cases,
including the fence transcriptions, passed.

## Breaking

No published symbol was renamed or removed, so no consumer edit is obliged.

**The vendored surface moved.** `guides/scaffold.md` is a `HOST_PATHS` member
(`src/core/constants.ts:151`), so this package's published `dist/host` set changed. `npm run
build:inventory` regenerated `host.json`: the `guides/scaffold.md` entry digest and the inventory
root digest, and nothing else. Under `.agents/orchestration.md` § What a bump obliges, that surface
moving on its own account means this package bumps and publishes, and every target re-pins
`@orkestrel/scaffold`, runs `repair`, and proves its gates green — `repair` restores
`guides/scaffold.md` in each target.

`host.json` appears in neither the brief's Owned nor its Off-limits list. It is generated rather than
authored, and the brief's own checklist requires the regeneration to precede every gate that reads
the artifact, so the file is left regenerated and flagged here.

## Shared-file patches

One patch, for `/home/user/scaffold/tests/guides.test.ts`, which this unit did not edit. It is a
two-symbol rename with identical signatures and identical return shapes.

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

The import list is alphabetized, so both replacements move within it: `fenceImports` sorts before
`extractFenceImports`'s neighbours and `missingSymbols` after `findMissing`. The applying unit
re-sorts the list and runs `npm run format:check`, `npm run check`, and `npm run test:guides`.

## Observations

- `npm test` ran with no other writer in this checkout. The Orchestrator takes the deciding run
  after this unit exits, per the brief.
- `npm run test:distribution` needs a reachable npm registry for one case and this container has
  none. That case is outside the acceptance criteria and outside every row.
- Row scaffold-subj-2's operative repair keeps the phrase "so an observer sees a refusal", which
  `.claude/rules/writing.md` § Voice and actor would otherwise reach. The phrase is the refuter's
  ruled text and predates this unit, so it stands; the reading is that the observer is the developer
  watching the channel rather than a component.

### Orchestrator integration (20:5x UTC)

The § Shared-file patches entry for `tests/guides.test.ts` — `extractFenceImports` → `fenceImports` and `findMissingSymbols` → `missingSymbols`, the two helpers guide's landed tip `be14c1b` renamed — was applied by the Orchestrator as the exact returned patch, with the import list re-sorted, and `format:check`, `check`, and `test:guides` re-run on the tree (readings in the landing log). The unit's deviation is closed by that adoption, which the guide reconcile's breaking sweep did not surface for this checkout because scaffold's own guide test is not the fleet drop-in. Ruling on scaffold-obj-4: the `ReadAllowance.remaining` mutability exemption stands as its `@remarks` states it; the row stays `noop`. The `host.json` regeneration records that the vendored surface moved: scaffold bumps and publishes on its own account at the wave, and every target re-pins and runs `repair`.

## Fix round 1 (Orchestrator-owned, 21:09–21:15 UTC)

The round-1 objective lane (`units/l3/scaffold-objective-r1.md`) refuted claim 2 on `README.md:14` (the scaffold-subj-7 replacement landed without the reflow the row names) and claim 4 on this report (no sweep row for scaffold-subj-1's old form), confirmed every other claim, and referred R1: the repaired vendored-set sentences name neither `tests/config.test.ts` nor `configs/helpers.ts`, and `scripts/deps.sh` is a session-start hook rather than a bench probe. The Luna checker refuted claim 7 on `host.json` sitting outside Owned; the objective lane confirmed claim 7 with the note that `build:inventory` regenerates it. Brief: `briefs/conform-scaffold-fix1-brief.md`.

- Claim 2 — `README.md:10-22` reflowed at the file's wrap, no word of the scaffold-subj-7 replacement changed except as R1 requires.
- R1 — the vendored-set sentence at `README.md:10-13`, `guides/scaffold.md:16-19`, and `guides/scaffold.md:1195-1199` names every `HOST_PATHS` member by kind: the licence, the harness permission file, the session-start hooks, the policy register and plugin, the configuration leaf and its proof, the root dotfiles, and the guide mirrors. The README's next sentence states what the two hook kinds do.
- Claim 4 — the scaffold-subj-1 sweep row in § Sweeps, from the Orchestrator's own run.
- Claim 7 — `host.json` is the generated inventory `build:inventory` rewrites; the landing's gate chain runs `build` after the last edit and stages the regenerated file. The brief's Owned scope is read as including it; the verdict records the amendment.
- O1 — the retained result `units/l3/scaffold-implement-direct.md` now states that the harness appended the auto-mode paragraph to the loaded rule content and that the file on disk carries none.
- O2 — `units/l3/scaffold-implement-direct.md` is the unit's returned result and `reports/conform-scaffold-report.md` its report file, the retention pair every unit keeps; the verdict names the report file as the audit subject.

`guides/scaffold.md` is a `HOST_PATHS` member, so `host.json` moves again at the landing's `build`.

## Fix round 2

The objective lane is
`/home/user/scaffold/.orkestrel/campaign/conform/units/l3/scaffold-objective-r2-sol.md`.

- `README.md:10-14`: “Each target carries its own copy of the paths it selects from the vendored set
  — its licence, its harness permission file, its session-start hooks, its policy register, its
  policy proof, its policy plugin, its configuration leaf and its proof, its root dotfiles, and the
  guide mirrors it starts from, never its own guide — and the verbs write them and compare them.”
- `guides/scaffold.md:16-20`: “`HOST_PATHS` names the vendored set — the licence, the harness
  permission file, the session-start hooks, the shared policy register, the shared policy proof, the
  shared policy plugin, the shared configuration leaf and its proof, the byte-identical root
  dotfiles, and the guide mirrors a generated workspace starts from, never its own guide — and each
  target carries its own copy of the paths it selects, which the verbs write and compare.”
- `guides/scaffold.md:1195-1199`: “`HOST_PATHS` is the vendored set, and a target receives a copy of
  each path it selects: the licence, the harness permission file, the session-start hooks, the shared
  policy register, the shared policy proof, the shared policy plugin, the shared configuration leaf
  and its proof, the byte-identical root dotfiles, and the guide mirrors a generated workspace starts
  from.”
- `src/core/constants.ts:114-119`: “These are the files the fleet shares verbatim, and each target
  holds a copy of the paths it selects: the licence, the harness permission file, the session hook
  scripts, the shared policy register, the byte-identical root dotfiles, and the guide mirrors a
  generated workspace starts from.”

### Orchestrator integration (21:30 UTC, after fix round 2 returned)

The `HOST_PATHS` TSDoc at `src/core/constants.ts:114-119` named the policy register alone where the README and the guide name the register, the proof, the plugin, and the configuration leaf with its proof; the Orchestrator aligned the member list to the guide's wording (a one-phrase edit, `npx oxfmt --check` exit 0). Round 3 audits it with the fix round's passages.

## Fix round 3 (Orchestrator-owned, record only, 22:07 UTC)

The round-3 Sol objective lane (`units/l3/scaffold-objective-r3-sol.md`) confirmed every tree conjunct and refuted claims 3 and 9 on this report: the adopted-name sweep was unrecorded, and the disposition and ruling pointers had drifted from the audited tip after the fix rounds moved lines. The Orchestrator added the sweep row from its own run and refreshed each pointer from the tree (`README.md:75` for scaffold-subj-3; the count-sweep rulings at `README.md:6`, `:43`, `:64`, `:77`, `:98`, and `:74`; the old-form ruling at `guides/scaffold.md:1481`). R1 answered by a one-phrase edit: `src/core/constants.ts`'s "the harness wiring" read as contradicting the members it names, so the sentence reads "the bench and MCP wiring", which is what `CANON_PATHS` holds. The round-3 Luna checker's claim-7 refutation is the round-1 ruling on `host.json` and the campaign record, carried by the brief's amendment.
