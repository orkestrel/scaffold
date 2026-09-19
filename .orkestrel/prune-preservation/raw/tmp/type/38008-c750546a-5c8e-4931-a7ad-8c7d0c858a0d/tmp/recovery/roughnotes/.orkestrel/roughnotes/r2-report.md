# Unit R2 report — close the port's audit round

Done. Every defect both lanes raised is closed, the ported bodies are untouched, and the gate chain
is green.

Touched files:

- `C:\Users\mikes\WebstormProjects\roughnotes\vite.config.ts` — the doc block's `@returns` line and
  its `tests/config.test.ts` sentence. No body byte moved.
- `C:\Users\mikes\WebstormProjects\roughnotes\tests\conformance.test.ts` — the discriminant
  control rebuilt, the nested case's coverage stated, one helper folded, three helpers imported
  from the setup module, `keyByName` renamed.
- `C:\Users\mikes\WebstormProjects\roughnotes\tests\setup.ts` — three exported test helpers. The
  file was tracked and empty.
- `C:\Users\mikes\WebstormProjects\roughnotes\tmp\units\r2-red-control-discriminant.py` and
  `r2-compare-bodies.py` — new instruments, with their logs.

Diffstat: `tests/conformance.test.ts` 129 insertions, `tests/setup.ts` 23 insertions,
`vite.config.ts` 72 insertions and 16 deletions, 208 insertions and 16 deletions in total against
the last commit. `git status --porcelain` reports those three files modified and nothing else
outside the Orchestrator's untracked `.orkestrel/roughnotes/` records.

## 1. Done or not done, per criterion

| Criterion | State | Evidence |
| --------- | ----- | -------- |
| 1. `oxfmt --check` on owned files | Done | `npx oxfmt --config .oxfmtrc.json --check vite.config.ts tests/conformance.test.ts tests/setup.ts` reports "All matched files use the correct format." |
| 2. `oxlint --deny-warnings` on owned files | Done | `npx oxlint --config .oxlintrc.json --deny-warnings vite.config.ts tests/conformance.test.ts tests/setup.ts` reports no diagnostic, exit 0 |
| 3. `npm run check` passes, no banned syntax | Done | `npm run check` exit 0. A scan of the added lines for `any`, ` as `, a non-null assertion, `@ts-`, and `eslint-disable` matched only the English words "any" and "as" in two comments |
| 4. The `@returns` line predicts the base-repeat case | Done | § 2 walks it |
| 5. The discriminant control builds the rival and reds | Done | § 3 |
| 6. The `tests/config.test.ts` sentence is true here | Done | § 6 |
| 7. Every added helper folded or moved, `keyByName` renamed | Done | § 4 |
| 8. The nested case states its coverage | Done | § 6 |
| 9. The ported bodies are byte-identical to scaffold | Done | § 5 |
| 10. `npm run test:conformance` passes | Done | `Tests 11 passed (11)`, `Test Files 1 passed (1)` |
| 11. `npm test` exits 0, no `deprecat` line in build or test output | Done | `npm test exit: 0`; app `186 passed (186)`, journey `76 passed, 4 skipped (80)`, policy `111 passed (111)`, config `46 passed (46)`, conformance `11 passed (11)`. `npm run build` exit 0. A case-insensitive `deprecat` search over `tmp/units/r2-build.log.txt` and `tmp/units/r2-test.log.txt` returned 0 in each; its control, a search for `built in` over the build log, returned 1 |

Every run behind criteria 3, 5, 9, 10, and 11 was taken after the last edit to any owned file.

The tree-wide gates ran too, read-only, because this checkout has one writer:
`npm run format:check` exit 0 over 122 files, `npm run lint:check` exit 0.

## 2. The `@returns` line

The delivered sentence:

```text
 * @returns The merged configuration. Each base position carries its own entry, or the override
 * entry that replaced it, and an override entry replaces one base position at most. Every
 * override entry that replaced none follows in the order the caller wrote it. The base itself
 * when the override is absent or is Vitest's invocation record.
```

It departs from the subjective lane's wording by one clause: `and an override entry replaces one
base position at most`. Without it, a reader meeting a base that repeats a name can read the single
override entry as replacing every matching position, and predict `[replacement, replacement]`.

Base `[originalBase, repeatedBase]` with override `[replacement]`, all three carrying
`conformance-alpha`, walked through the delivered sentence:

1. Base position 0 carries its own entry or the override entry that replaced it. `replacement`
   replaced it, so position 0 carries `replacement`.
2. An override entry replaces one base position at most, and `replacement` has already replaced
   position 0. So nothing replaced position 1, and it carries its own entry, `repeatedBase`.
3. No override entry replaced none, so nothing follows.
4. The predicted result is `[replacement, repeatedBase]`.

That is what the merge returns. `tests/conformance.test.ts` case `replaces one base entry per
override entry where the base repeats a name` asserts exactly `[replacement, repeated]`, and the
objective lane's own execution against installed Vite returned `[replacement, repeatedBase]`.

The final sentence names the refusal the previous line omitted, so a reader who hands the function
an invocation record finds the return stated rather than inferred.

## 3. The control

The discriminant case's control now builds the rival and reads the subject against it:

```ts
// Control: the discriminant keyed on `command` alone that this merge departs from, applied
// to the value carrying `command` without `mode`. It reads one key rather than the pair,
// so it refuses that value and returns the base for it, and the merged reading this case
// opens with must differ from what it returns.
const refusesOnCommand = 'command' in COMMAND_ONLY
const narrowed: UserConfig = refusesOnCommand ? browser : mergeConfig(browser, COMMAND_ONLY)
expect(refusesOnCommand).toBe(true)
expect(narrowed).toBe(browser)
expect(() => expect(merged.base).toBe(narrowed.base)).toThrow(/expected/u)
```

The ternary is the rival rule applied to the value under test: refuse when `command` is present,
merge otherwise. `refusesOnCommand` is asserted true, so the case records that the rival does refuse
the value the shipped discriminant merges, and `narrowed` is asserted to be `browser` itself, so the
case records what the rival returns. The closing line reads the subject's result against the rival's
and requires them to differ.

That last line is what the old control could not be: it depends on the subject. Under the shipped
merge `merged.base` is `/conformance-command-only/` and `narrowed.base` is `undefined`, so the inner
expectation throws and the control passes. Mutate the subject to the rival and the two readings
become equal, the inner expectation stops throwing, and the control fails.

**The red, isolated.** `tmp/units/r2-red-control-discriminant.py` applies the rival mutation to
`vite.config.ts` and removes the case's opening `expect(merged.base).toBe(COMMAND_ONLY.base)`
assertion, which would otherwise fail first and stop the case before the control runs. Both files
are restored in a `finally` block. Its log, `tmp/units/r2-red-control-discriminant.log.txt`:

```text
Tests  1 failed | 10 passed (11)
FAIL  |conformance| tests/conformance.test.ts > configuration conformance > merges a value carrying command alone and refuses one carrying command and mode
  284|   expect(() => expect(merged.base).toBe(narrowed.base)).toThrow(/expec...
exit: 1
```

The failing line is the control itself.

**The case still reds under the existing mutation.** `python tmp/units/r1-red-discriminant.py`
reports `Tests 1 failed | 10 passed (11)`, exit 1, unchanged from the R1 record.

**The instrument's coverage.** The isolation script establishes that the control line fails when the
subject is the rival, with the case's other assertions in place. It does not establish that the
control fails for any other mutation, and it is not meant to. Its negative control is the delivered
file: with the subject unmutated and the assertion present, the same command reports
`Tests 11 passed (11)`.

**Every other red re-runs unchanged.** After the helper move and the rename, all six R1 scripts
reproduce their recorded counts: nested `1 failed | 10 passed`, caller-duplicate
`1 failed | 10 passed`, position `2 failed | 9 passed`, taken-once `1 failed | 10 passed`,
numbered-name `1 failed | 10 passed`, discriminant `1 failed | 10 passed`. The position overlap is
the one § What is settled rules honest.

## 4. The helpers

**The setup module is not vendored.** `scaffold repair` restores exactly three test paths, and
`tests/setup.ts` is not among them. Read from the installed host inventory:
`node_modules/@orkestrel/scaffold/dist/host/manifest.json` carries `tests/config.test.ts`,
`tests/policy.test.ts`, and `tests/setupPolicy.ts`, and `dist/host/tests/` holds those three files
alone. So moving a helper into `tests/setup.ts` was available, and I used it.

| Helper | Choice | Why |
| ------ | ------ | --- |
| `createNamedEntry` | Moved to `tests/setup.ts`, exported | A data builder with callers in four cases. `.claude/rules/tests.md` § Shared test infrastructure requires extracting a scenario builder "as soon as it could serve another test", and this one already serves several |
| `readPlugins` | Moved to `tests/setup.ts`, exported | Callers in five cases. Its absence check is now `requireValue` from `@orkestrel/test`, which the rule's "never reimplement a framework helper" line requires and which this workspace's browser suites already use. What remains around that call is the narrower contract — a `UserConfig` in, its entry list out — so it is not a rename of `requireValue` |
| `keyByName` → `selectByName` | Moved to `tests/setup.ts`, exported, and renamed | Callers in three cases. Renamed because it returns a list, and `keyBy` is a borrowed form the naming rules do not carry. It no longer reads through `readField`: it keys on `plugin.name` directly, into a `Map<unknown, Plugin>`, which is both the plainest statement of the rival mechanism and what a naive implementation writes. The `Map`'s `unknown` key type is what makes the non-string name honest rather than asserted |
| `createNumberedEntry` | Folded into its single caller | Its only caller is the case `treats an entry whose name is not a string as unnamed`. `AGENTS.md` § Design laws takes the fold branch for one-use logic. The fold is two object literals and two `Reflect.set` calls in the case body, so no function is declared inside the `it` block |

Three things bound this choice, and each is worth the next reader's time:

- **`createPluginOverride` cannot move.** It calls `vue()`, and `.claude/rules/tests.md` fixes
  `tests/setup.ts` as host-independent with no Vue. So the conformance file keeps module-scope
  helpers whatever I do, and the split between imported and local helpers is the rule's, not a
  choice I made.
- **`tests/setup.ts` takes no runtime `vite` import.** It is a setup file for the browser and
  journey projects as well as the Node ones, so a value import of `mergeConfig` there would pull
  Vite's Node entry into a browser suite. Its `vite` imports are type-only and erase. This is why
  the discriminant rival is built inside the case rather than exported beside `selectByName`.
- **No `tests/setup.test.ts` was added.** The vendored `tests/config.test.ts` registers a `setup`
  project if and only if a `tests/setup*.test.ts` file exists (`tests/config.test.ts:133`), so
  adding that proof would force a new entry in `vite.config.ts`'s factory list, which this brief
  puts off limits. The three exports are asserted where they are used: each conformance control
  reads `selectByName`'s own output, and `readPlugins` and `createNamedEntry` carry every entry
  assertion in five cases. § 7 records the gap this leaves.

`readField` stays local in `tests/conformance.test.ts`, unmoved and unedited. It is R1's inheritance
rather than its addition, and `.claude/rules/tests.md` bars a setup-module export whose job matches
an installed one — `readProperty` from `@orkestrel/test` does that job. Moving it would have created
the defect the rule names.

Every existing case body is byte-unchanged. The only line the pre-existing cases see differently is
the file's import list.

## 5. The byte comparison

`tmp/units/r2-compare-bodies.py` extracts the text from `export function mergeOverride(` through the
close of `isNamedPlugin` out of this workspace's `vite.config.ts` and out of the scaffold checkout
read through `git show`, which writes nothing there. Line endings are normalised to `\n` on the
scaffold side only, because `git show` emits the committed bytes.

```text
python tmp/units/r2-compare-bodies.py
f83ee063 identical: True bytes: 1274
HEAD identical: True bytes: 1274
control differs from local: True
```

Both scaffold revisions agree: the commit R1 ported from, and scaffold's current `HEAD`, which had
not moved. The extracts are retained as `tmp/units/r2-local-bodies.txt`,
`r2-scaffold-f83ee063-bodies.txt`, and `r2-scaffold-HEAD-bodies.txt`.

**Coverage and control.** The instrument compares those two declarations and nothing else in the
file, which is the claim. Its negative control alters one byte inside the local extract — the
`taken` set's type parameter — and the comparison reports the difference, so an identical reading is
not the instrument reporting "same" to everything.

## 6. The two prose repairs

**The `tests/config.test.ts` sentence** now reads:

```text
 * `tests/config.test.ts` file hands a record of that shape to every registered factory and
 * refuses any configuration carrying a field of it.
```

Verified against the vendored file rather than carried across. Its case
`keeps Vitest invocation fields out of project configurations` filters `test.projects` to functions,
refuses an empty set, applies every one of them to a sentinel carrying `command`, `isPreview`,
`isSsrBuild`, `mode`, and `sentinel`, and asserts `toBeUndefined()` for every one of those fields on
every returned configuration. It says nothing about whether a factory forwards its argument, which
is the half the old sentence got wrong here: of this workspace's registered factories only
`appBrowser` takes an override at all.

I read "hands a record of that shape" rather than "hands that record" deliberately: the vendored
file builds its own sentinel, which carries the invocation fields plus a `sentinel` key.

**The nested case** now states its coverage beside the count:

```ts
// This count reads top-level entries, because the reader stringifies the nested array
// rather than descending into it. It establishes that the merge adds no second top-level
// entry carrying the base name. It does not establish deduplication, which the merge does
// not claim: Vite flattens plugins recursively at resolve time, so this nested override
// entry does reach the resolved configuration beside the base entry that shares its name.
expect(countPlugin(merged, 'conformance-alpha')).toBe(1)
```

## 7. What I did not close

- **The three setup exports have no `tests/setup.test.ts` proof of their own.** They are asserted
  through the conformance cases that consume them, which is where their controls already live, but
  the dedicated proof the rules give a home to is absent, and adding it needs a `setup` project
  entry in `vite.config.ts`'s factory list that this brief puts off limits. This is a successor
  unit, not a deferral inside this one: the work it needs is a registration I am not allowed to
  make.
- **The conformance file's pre-existing helpers stay local.** `readField`, `readPluginNames`,
  `countPlugin`, `readOutputDirectory`, and `createPluginOverride` are R1's inheritance rather than
  its addition, so the finding does not reach them, and `createPluginOverride` cannot move at all.
  Whether the other four belong in `tests/setup.ts` is a question about this file's history, not
  about this port.
- **The nested residual is documented, not changed.** § What is settled rules it scaffold's
  committed contract, so the case states what its count covers and the consequence stays a
  successor for scaffold's own prose.
- **I did not commit.** The working tree carries the three modified files.

## 8. Observations

- **Durations.** app 30.49s, journey 39.19s, policy 1.40s, config 1.65s, conformance 802ms, build
  3.4s, `npm run check` about 40s. These are one reading each, taken under this unit's own exec.
- **The journey run still skips one case per variant**, `writes every frame this run owes`. That
  skip predates R1.
- **The `config` project passed 46 unchanged** after `tests/setup.ts` gained exports and an
  `@orkestrel/test` import, so the vendored project-registration case reads the setup file's role
  rather than its contents.
- `.claude/rules/writing.md` bars `above` in developer prose. The existing control comments in
  `tests/conformance.test.ts` use it; I did not add another, and I did not edit theirs.
