# Unit R3 report — close the port's second audit round

Done. Both converging defects are closed, the three referred gaps are closed, the ported bodies are
untouched, and the gate chain is green.

Touched files:

- `C:\Users\mikes\WebstormProjects\roughnotes\vite.config.ts` — the `@returns` line states the
  allocation; the `setup` project factory and its `projects` entry. No body byte moved.
- `C:\Users\mikes\WebstormProjects\roughnotes\tests\setup.test.ts` — new. Three cases, one per
  export, each carrying its rival reading as a control.
- `C:\Users\mikes\WebstormProjects\roughnotes\tests\setup.ts` — complete TSDoc on the three
  exports. No implementation byte moved.
- `C:\Users\mikes\WebstormProjects\roughnotes\tests\conformance.test.ts` — the `mode`-only case and
  its constant, the four prose repairs, and the helper-split reason.
- `C:\Users\mikes\WebstormProjects\roughnotes\package.json` — the `test:setup` script and its place
  in the `test` chain.
- `C:\Users\mikes\WebstormProjects\roughnotes\tmp\units\` — six new instruments with their logs:
  `r3-red-setup-read-plugins.py`, `r3-red-setup-select-order.py`, `r3-red-setup-named-entry.py`,
  `r3-red-mode-only.py`, `r3-red-control-mode-only.py`, `r3-returns-construction.py`, and the
  comparison successor `r3-compare-bodies.py`.

Diffstat against the last commit, carrying R1 and R2 as well: `package.json` 3, `tests/setup.ts` 41,
`vite.config.ts` 89, `tests/conformance.test.ts` 162 — 277 insertions and 18 deletions. R2 recorded
208 insertions and 16 deletions at the same baseline, so this unit's own tracked delta is 69
insertions and 2 deletions, plus the 68 lines of the untracked `tests/setup.test.ts`.
`git status --porcelain` reports those four files modified, `tests/setup.test.ts` untracked, and
nothing else outside the Orchestrator's untracked `.orkestrel/roughnotes/` records.

## 1. Done or not done, per criterion

| Criterion | State | Evidence |
| --------- | ----- | -------- |
| 1. `oxfmt --check` on owned files | Done | `npx oxfmt --config .oxfmtrc.json --check vite.config.ts tests/conformance.test.ts tests/setup.ts tests/setup.test.ts package.json` reports "All matched files use the correct format", 5 files |
| 2. `oxlint --deny-warnings` on owned files | Done | `npx oxlint --config .oxlintrc.json --deny-warnings vite.config.ts tests/conformance.test.ts tests/setup.ts tests/setup.test.ts` reports no diagnostic, exit 0 |
| 3. `npm run check` passes, no banned syntax | Done | `npm run check` exit 0 (root `tsc`, `check:app:core`, `check:app:browser`). A scan of every added line for `any`, ` as `, a non-null assertion, `@ts-`, `eslint-disable`, and `oxlint-disable` matched only the English words "any" and "as" in prose |
| 4. The `@returns` line determines the result | Done | § 2, and `tmp/units/r3-returns-construction.log.txt` |
| 5. `tests/setup.test.ts` exists, `setup` is registered, its script runs | Done | § 5. `npm run test:setup` reports `Tests 3 passed (3)`; `npm run test:config` reports `46 passed (46)` unchanged |
| 6. Each setup export reds from its own mutation, with a retained script | Done | § 3 |
| 7. The `mode`-only case exists, carries a failing control, reds under the rival | Done | § 4 |
| 8. The three exports carry complete documentation | Done | `tests/setup.ts` carries summary, `@param`, and `@returns` on each, and `@throws` on `readPlugins` |
| 9. Every prose defect in item 5 is closed with the supplied wording | Done | § 6 lists each replacement, and the discrepancy the brief's count carried |
| 10. The comparison instrument's control uses the committed extract | Done | `python tmp/units/r3-compare-bodies.py` prints `f83ee063 identical: True bytes: 1274 control identical: False` and `HEAD identical: True bytes: 1274 control identical: False` |
| 11. Every earlier retained red still re-runs | Done, with the total moved | § 3, closing table |
| 12. The ported bodies are byte-identical to scaffold's committed copies | Done | The same instrument: 1,274 bytes, identical against `f83ee063` and `HEAD` |
| 13. `npm test` exits 0, every project's count reported | Done | `npm test exit: 0`; app `186 passed (186)` over 43 files, journey `76 passed, 4 skipped (80)`, policy `111 passed (111)`, config `46 passed (46)`, setup `3 passed (3)`, conformance `12 passed (12)` |
| 14. `npm run build` succeeds, no `deprecat` line, CSS at 323.24 kB | Done | `build exit: 0`; `dist/app/browser/assets/index-hhVhdyP4.css 323.24 kB │ gzip: 48.09 kB`. A case-insensitive `deprecat` search over `tmp/units/r3-build.log.txt` and `tmp/units/r3-test.log.txt` returned 0 in each; the controls — `built in` over the build log, `Test Files` over the test log — returned 1 and 6 |

Every run behind criteria 3, 6, 7, 10, 11, 13, and 14 was taken after the last edit to any owned
file.

The tree-wide read-only gates ran too, because this checkout has one writer: `npm run format:check`
exit 0 over 123 files, `npm run lint:check` exit 0.

## 2. The `@returns` line

The delivered sentence:

```text
 * @returns The merged configuration. Each base position carries its own entry, or the override
 * entry that replaced it. The merge visits the base positions in order, and each named position
 * takes the earliest same-named override entry that no earlier position took, so an override
 * entry replaces one base position at most. Every override entry that replaced none follows in
 * the order the caller wrote it. The base itself when the override is absent or is Vitest's
 * invocation record.
```

One clause changed. The R2 line said "Each base position carries its own entry, or the override
entry that replaced it, and an override entry replaces one base position at most" and stopped. The
delivered line keeps that shape and adds the allocation: base positions are visited in order, and
each named position takes the earliest same-named override entry no earlier position took. The
at-most-once clause now follows from the allocation rather than standing beside it, so it is joined
with `so` rather than `and`. Nothing else in the block moved.

**Checked by construction, not by reading.** `tmp/units/r3-returns-construction.py` enumerates every
allocation of override entries to base positions for the repeated-name case — base
`[declared(alpha), repeated(alpha)]`, override `[replacement(alpha)]` — keeps the allocations the
sentence's clauses permit, and prints the distinct results those allocations produce. A sentence
that determines the result leaves one result standing.

```text
R3 (delivered) - allocations searched: 4
   admits: ['replacement', 'repeated']
   determines the result: True
R2 (control) - allocations searched: 4
   admits: ['declared', 'repeated', 'replacement']
   admits: ['declared', 'replacement']
   admits: ['replacement', 'repeated']
   determines the result: False
reverse traversal returns: ['declared', 'replacement']
   R2 permits it: True
   R3 permits it: False
```

**The implementation I tried and could not construct against it.** The objective lane's
reverse-traversal allocator: the same name-match rule walked from the last base position to the
first, so the last matching position takes the entry. The script implements it and asks both clause
sets about its answer. It returns `['declared', 'replacement']` — the lane's `[original,
replacement]` — the R2 sentence permits that answer, and the delivered sentence refuses it. Under
the delivered sentence base position 0 is named and there is an earliest same-named override entry
no earlier position took, so position 0 must take it; an answer where position 0 keeps its own
entry contradicts that clause. I found no other allocation the delivered clauses admit.

**The instrument's control and its coverage.** The control is the R2 clause set, drawn from outside
the population the delivered sentence covers: it is the sentence the objective lane already refuted,
and it reports three admitted results where the delivered set reports one. So a single result is the
sentence constraining the search rather than the search failing to find anything. Coverage: the
search covers allocations of override entries to base positions for one case — a base repeating one
name with one matching override entry. It does not search unnamed positions, several override
entries sharing a name, or the refusal branch; the delivered clauses about those are unchanged from
R2 and were confirmed there.

## 3. The setup proofs

`tests/setup.test.ts` runs in the new `setup` project. Each case carries the rival reading as its
control, matching the standard the conformance file's header sets for itself.

| Case | Asserts | Mutation | Red | Green |
| ---- | ------- | -------- | --- | ----- |
| `builds a distinct entry on every call, so a caller compares entries by reference` | Two calls with one name answer two objects, equal by shape and distinct by reference | `r3-red-setup-named-entry.py` — the memoizing rival, one cached entry per name | `Tests 1 failed \| 2 passed (3)`, exit 1 | `Tests 3 passed (3)`, exit 0 |
| `refuses a configuration carrying no plugins and accepts one carrying an empty list` | `readPlugins({})` throws `The configuration carries no plugins`; `readPlugins({ plugins: [] })` answers `[]` | `r3-red-setup-read-plugins.py` — the objective lane's surviving mutation, `requireValue(config.plugins ?? [], …)` | `Tests 1 failed \| 2 passed (3)`, exit 1 | `Tests 3 passed (3)`, exit 0 |
| `retains the last entry per name at the position that name was first inserted` | `selectByName([first(alpha), middle(beta), last(alpha)])` answers `[last, middle]`, asserted positively at both positions | `r3-red-setup-select-order.py` — the objective lane's surviving mutation, `[...keyed.values()].reverse()` | `Tests 1 failed \| 2 passed (3)`, exit 1 | `Tests 3 passed (3)`, exit 0 |

Each script restores `tests/setup.ts` in a `finally` block, and `git status --porcelain` after the
run reports the file unmodified beyond this unit's own edit. Each names the failing case in its log:

```text
FAIL  |setup| tests/setup.test.ts > root test setup > builds a distinct entry on every call, so a caller compares entries by reference
FAIL  |setup| tests/setup.test.ts > root test setup > refuses a configuration carrying no plugins and accepts one carrying an empty list
FAIL  |setup| tests/setup.test.ts > root test setup > retains the last entry per name at the position that name was first inserted
```

Both mutations the objective lane demonstrated surviving now red. The third mutation is the rival
builder that answers one entry per name; it makes reference comparison meaningless, which is the
property every conformance entry assertion rests on.

**The in-file controls.** `createNamedEntry`'s control builds the memoizing rival from a cache and
shows its two answers compare equal by reference, so the distinctness the case asserts fails
against it. `readPlugins`'s control is the absent-tolerant `config.plugins ?? []` reading, which
answers `[]` where the helper refuses. `selectByName`'s control is the selection that retains at the
last insertion's position rather than the first, built with `findLastIndex`; it answers the same
members in the other order, so the two position readings fail against it while the length reading
passes — which is why the case asserts positions rather than length alone.

**Every earlier retained red still re-runs**, at the same failing case set. The passed total moved
from 10 to 11 because `tests/conformance.test.ts` gained the `mode`-only case; the failing counts
are unchanged.

| Script | R2 record | This run |
| ------ | --------- | -------- |
| `r1-red-nested.py` | `1 failed \| 10 passed (11)` | `1 failed \| 11 passed (12)`, same case |
| `r1-red-caller-duplicate.py` | `1 failed \| 10 passed (11)` | `1 failed \| 11 passed (12)`, same case |
| `r1-red-position.py` | `2 failed \| 9 passed (11)` | `2 failed \| 10 passed (12)`, same two cases |
| `r1-red-taken-once.py` | `1 failed \| 10 passed (11)` | `1 failed \| 11 passed (12)`, same case |
| `r1-red-numbered-name.py` | `1 failed \| 10 passed (11)` | `1 failed \| 11 passed (12)`, same case |
| `r1-red-discriminant.py` | `1 failed \| 10 passed (11)` | `1 failed \| 11 passed (12)`, same case |
| `r2-red-control-discriminant.py` | `1 failed \| 10 passed (11)` | `1 failed \| 11 passed (12)`, same case, still failing at the control line |

## 4. The `mode` case

```ts
it('merges a value carrying mode alone rather than reading it as the invocation record', () => {
	const browser = appBrowser()
	const merged = mergeOverride(browser, MODE_ONLY)
	expect(merged.base).toBe(MODE_ONLY.base)
	expect(merged.mode).toBe(MODE_ONLY.mode)
	expect(readPluginNames(merged)).toStrictEqual(readPluginNames(browser))

	// Control: the discriminant keyed on `mode` alone that this merge departs from, applied to
	// the value carrying `mode` without `command`. It reads one key rather than the pair, so it
	// refuses that value and returns the base for it. The subject's merged reading must differ
	// from what the rival returns.
	const refusesOnMode = 'mode' in MODE_ONLY
	const narrowed: UserConfig = refusesOnMode ? browser : mergeConfig(browser, MODE_ONLY)
	expect(refusesOnMode).toBe(true)
	expect(narrowed).toBe(browser)
	expect(() => expect(merged.base).toBe(narrowed.base)).toThrow(/expected/u)
})
```

`MODE_ONLY` is `Object.freeze({ mode: 'development', base: '/conformance-mode-only/' })`, the vector
the subjective lane named. Both of the override's values reach the result: `merged.base` is
`/conformance-mode-only/` and `merged.mode` is `development`. The control follows the shape R2 built
for the `command`-only case — the rival rule applied to the value under test, its refusal asserted,
its return asserted, and the subject's reading required to differ from it.

**The red.** `tmp/units/r3-red-mode-only.py` mutates the discriminant to `'mode' in override`,
runs the `conformance` project, and restores the file:

```text
Tests  1 failed | 11 passed (12)
FAIL  |conformance| tests/conformance.test.ts > configuration conformance > merges a value carrying mode alone rather than reading it as the invocation record
exit: 1
```

One case fails and every other case passes, which is exactly the gap the subjective lane named: the
`mode`-alone rival refuses a legitimate override and no assertion in the file saw it.

**The control's own red, isolated.** Under that mutation the case reds on its first two readings, so
the control line never executes. `tmp/units/r3-red-control-mode-only.py` applies the same subject
mutation and removes those two readings, leaving the control as the only reading that can fail. It
restores both files in a `finally` block:

```text
Tests  1 failed | 11 passed (12)
FAIL  |conformance| tests/conformance.test.ts > configuration conformance > merges a value carrying mode alone rather than reading it as the invocation record
    314|   expect(() => expect(merged.base).toBe(narrowed.base)).toThrow(/expec?
exit: 1
```

The failing line is the control itself. Its negative control is the delivered file: with the subject
unmutated and the readings present, the same command reports `Tests 12 passed (12)`.

## 5. The registration

Three additions, following the `conformance` project's shape exactly.

`vite.config.ts`, between the `config` and `conformance` factories:

```ts
// Selected by any proof named `tests/setup*.test.ts`, so its include is the glob the vendored
// `tests/config.test.ts` file reads rather than one proof's path. `red` is the one label colour
// this workspace's other projects leave unused.
export const setup = (): UserConfig => ({
	resolve,
	test: {
		name: { label: 'setup', color: 'red' },
		include: ['tests/setup*.test.ts'],
		setupFiles: ['./tests/setup.ts'],
		environment: 'node',
		browser: { enabled: false },
	},
})
```

`setup` is added to the `projects` array between `config` and `conformance`. `package.json` gains
`"test:setup": "vitest run --config vite.config.ts --no-cache --reporter=dot --project setup"`,
placed beside `test:config`, and the `test` chain becomes `test:app && test:journey && test:policy
&& test:config && test:setup && test:conformance`.

**The unknown the brief named: does registration need anything beyond those three?** No. The
vendored `tests/config.test.ts` file requires four things of this project and nothing further, read
from the file rather than inferred:

- the row is a **named factory function** whose `name` is `setup` (`tests/config.test.ts:205`
  selects by that name, and the `emits every project as a factory` case rejects a plain object);
- the label is `setup`;
- the effective include is the **glob** `tests/setup*.test.ts`, not the proof's own path — the
  vendored case reads it from the same `globSync('tests/setup*.test.ts')` the generator reads
  (`tests/config.test.ts:129`);
- `setupFiles` is `['./tests/setup.ts']`.

It asserts nothing about a `test:setup` script. Its `registers proof scripts in the correct gate`
case reads `test:config`, `test:distribution`, `test:integration`, `test:conformance`,
`test:service`, and `prepublishOnly`, and no other script. `npm run test:config` reports
`46 passed (46)`, unchanged from R2.

**The unknown the brief named: where `setup` belongs in the chain.** In `test`, between
`test:config` and `test:conformance`. `.claude/rules/workspace.md` § Test project matrix fixes the
gate: the `setup` row's Gate column is `test`, and the paragraph after the table states "When
registered, emit `test:setup` and run it from `test`." The position within the chain follows the
same table's row order — policy, config, setup, guides, conformance — so the chain reads in the
order the rule lists the proofs. No gate enforces that position, so it is a rule reading rather than
a measured constraint; I record it as such.

The proof placement follows `.claude/rules/tests.md`: "Resolve each root `tests/setup*.test.ts`
proof against its sibling `tests/setup*.ts` module", and "Put each root `tests/setup*.test.ts` proof
in the `setup` project."

## 6. The prose repairs

Each was applied with the brief's supplied wording.

| Site | Before | After |
| ---- | ------ | ----- |
| The caller-duplicate control | "the readings above fail against it" | "the readings earlier fail against it" |
| The position control | "and both readings above fail" | ", and the position reading and the count fail" |
| The nested case's coverage | "because the reader stringifies the nested array" | "because `readPluginNames` stringifies the nested array" |
| The discriminant control's close | "and the merged reading this case opens with must differ from what it returns" | "The subject's merged reading must differ from what the rival returns." |

The position control's replacement took a comma before its `and`, because the supplied phrase lands
beside an existing `and` and the sentence is unreadable without it. That is the only wording
departure, and it is ancillary.

The helper split now carries its reason, on `createPluginOverride`:

```ts
/**
 * Builds an override carrying the Vue plugin the base configuration already declares.
 *
 * @remarks
 * This one stays in this file. It calls `vue()`, and `.claude/rules/tests.md` fixes
 * `tests/setup.ts` as host-independent with no Vue, so no helper reaching a framework plugin can
 * live beside the ones imported from there.
 */
```

**One discrepancy in the brief, reported rather than acted on.** Item 5 states that
`tests/conformance.test.ts` uses `above` in two comments. It uses it in five. I replaced the two the
brief supplied wording for. Three remain, each in a control comment that both lanes confirmed
verbatim in an earlier round, so changing them is reopening confirmed text without instruction:

- line 119, the showcase control: "so the comparisons above fail against it."
- line 154, the Vue-count control: "so the same override yields the Vue plugin twice and the count
  above fails."
- line 175, the invocation-refusal control: "so the refusal above fails against it."

A fourth site is adjacent: line 96, "Both readings must fail against it", is a `both` tally whose
sentence does not name its members. All four entered with R1's port. `earlier` replaces `above` in
each of the three, and "the emptied-output reading and the added-dependency reading fail against it"
replaces line 96's sentence, if the Orchestrator wants them closed.

## 7. The comparison instrument

`tmp/units/r3-compare-bodies.py` supersedes `r2-compare-bodies.py`. One change: the negative control
runs inside the revision loop and compares the altered text against the **committed** extract, so it
uses the same operands, the same extraction on both sides, and the same `git show` read the claim
rests on. The r2 control compared the altered text against the local extract, which exercised the
operator and never the comparison it certified.

```text
python tmp/units/r3-compare-bodies.py
f83ee063 identical: True bytes: 1274 control identical: False
HEAD identical: True bytes: 1274 control identical: False
```

The script's header also corrects the r2 header's inaccurate description: the alteration is a type
token, `Set<number>` to `Set<string>`, rather than one byte. The extracts are retained as
`tmp/units/r3-local-bodies.txt`, `r3-scaffold-f83ee063-bodies.txt`, and
`r3-scaffold-HEAD-bodies.txt`. Both ported bodies remain byte-identical to scaffold's committed
copies at 1,274 bytes, against the commit R1 ported from and against scaffold's `HEAD`.

Coverage: the instrument compares those two declarations and nothing else in either file, which is
the claim. It writes only into this repository's `tmp/units/`, and reads the scaffold checkout
through `git show`.

## 8. Observations

- **Durations**, one reading each, taken under this unit's own exec: app 30.75s, journey 39.65s,
  policy 1.41s, config 1.64s, setup 210ms, conformance 813ms, build 3.43s, `npm run check` about
  40s, `npm run format:check` 1.01s over 123 files.
- **Where `setup` sits in the chain**: between `test:config` and `test:conformance`. No gate reads
  that position, so it follows the rule's row order rather than a measured constraint.
- **`red` is the label colour**, because Vitest's `LabelColor` admits eight colours and this
  workspace's other projects already use the other seven. It is a leftover rather than a signal, and
  the factory's comment says so.
- **The journey run still skips one case per variant**, `writes every frame this run owes`. That
  skip predates R1.
- **The `policy` project passed 111 unchanged** after `tests/setup.test.ts` was added, so its mirror
  and placement rules accept a root setup proof without a mirrored source module.
- **The `setup` project's mutations also reach `conformance`.** The memoizing-builder mutation, run
  against the conformance project rather than the setup project, would red a control there too. Each
  script runs the `setup` project alone, because that is the proof under test.

## 9. What I did not close

- **The three remaining `above` comments and the `both` tally in `tests/conformance.test.ts`.**
  § 6 names each line and supplies its replacement. They sit in comments confirmed verbatim by both
  lanes in an earlier round, and the brief's item 5 enumerated two sites rather than five, so
  closing them is the Orchestrator's call rather than an expansion I take myself.
- **The `@returns` and `@remarks` vocabulary duplication.** § What is settled records it for the
  upstream carry-back. The delivered `@returns` change joins its at-most-once clause to the
  allocation rule with `so`, which shortens the overlap by one connective, and moves nothing else.
- **The pre-existing local helpers.** `readField`, `readPluginNames`, `countPlugin`, and
  `readOutputDirectory` stay in `tests/conformance.test.ts`. § What is settled rules their migration
  a successor, and `createPluginOverride`'s new `@remarks` states the end state: the Vue-dependent
  helper can never move, so the file keeps module-scope helpers whatever else migrates.
- **I did not commit.** The working tree carries four modified files and one new untracked test.
