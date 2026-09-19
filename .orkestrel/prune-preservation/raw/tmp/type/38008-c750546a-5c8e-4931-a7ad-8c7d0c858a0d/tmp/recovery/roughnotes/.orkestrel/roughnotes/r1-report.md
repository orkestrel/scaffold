# Unit R1 report — adopt the hardened merge

Done. `vite.config.ts` carries scaffold's committed `mergeOverride` and `isNamedPlugin`
byte-for-byte, and `tests/conformance.test.ts` proves each behaviour the change adds, every case
recorded red first.

Touched files:

- `C:\Users\mikes\WebstormProjects\roughnotes\vite.config.ts` — the merge, the predicate, and their
  doc block replaced; no factory touched.
- `C:\Users\mikes\WebstormProjects\roughnotes\tests\conformance.test.ts` — new helpers, new
  constants, and one case per added behaviour; no existing case edited.

Diffstat: `tests/conformance.test.ts` 142 insertions, `vite.config.ts` 53 insertions and 16
deletions, 195 insertions and 16 deletions in total. `git status --porcelain` reports those two
files modified and nothing else.

## 1. Done or not done, per criterion

| Criterion | State | Evidence |
| --------- | ----- | -------- |
| 1. `oxfmt --check` on owned files | Done | `npx oxfmt --config .oxfmtrc.json --check vite.config.ts tests/conformance.test.ts` reports "All matched files use the correct format.", exit 0 |
| 2. `oxlint --deny-warnings` on owned files | Done | `npx oxlint --config .oxlintrc.json --deny-warnings vite.config.ts tests/conformance.test.ts` reports no diagnostic, exit 0 |
| 3. `npm run check`, no `any`, `as`, `!`, or suppression | Done | `npm run check` exit 0 (`tmp/units/r1-check.log.txt`). A scan of the added lines for `any`, ` as `, a non-null assertion, `@ts-`, and `eslint-disable` returns only the English word "as" in prose |
| 4. Bodies match scaffold's committed copy | Done | `diff tmp/units/r1-scaffold-merge.txt tmp/units/r1-local-merge.txt` exit 0, where the scaffold side comes from `git show f83ee063:vite.config.ts`. Every difference outside the bodies is named in § 2 |
| 5. A case per added behaviour, each red first | Done | § 3 |
| 6. Every red re-runs from a retained script | Done | The `tmp/units/r1-red-*.py` scripts, re-run against the delivered file in one pass. Each restores `vite.config.ts` in a `finally` block, and the restore was verified by diff after every run |
| 7. `npm run test:conformance` passes | Done | `Tests 11 passed (11)`, `Test Files 1 passed (1)`, 792ms |
| 8. `npm test` exits 0, journey green across its variants | Done | `npm test exit: 0` (`tmp/units/r1-test.log.txt`). app `186 passed (186)` in 30.53s; journey `Test Files 4 passed (4)` and `76 passed, 4 skipped (80)` in 38.66s; policy `111 passed (111)`; config `46 passed (46)`; conformance `11 passed (11)` |
| 9. `npm run build` succeeds, no Sass deprecation line | Done | `npm run build` exit 0, `built in 3.59s`. A case-insensitive search for `deprecat` returns nothing in `tmp/units/r1-build.log.txt` or `tmp/units/r1-test.log.txt` |

The runs behind criteria 3, 7, 8, and 9 were all taken after the last edit to `vite.config.ts`, so
every reading is of the delivered file.

## 2. The port

`mergeOverride` and `isNamedPlugin` are byte-identical to `f83ee063`. Everything that differs sits
outside those bodies:

- **Comment form.** Scaffold carries a `//` block above the merge. This workspace documents every
  exported symbol with TSDoc, and `policy/no-malformed-summary` reads the first sentence of that
  block, so the prose is carried into the existing TSDoc frame instead. Both paragraphs of
  scaffold's block are carried whole into `@remarks`.
- **Summary clause.** Scaffold writes "so a package's own configuration reaches the factory through
  its parameter". This workspace is a private application, so the sentence reads "so this
  workspace's own configuration reaches the factory through its parameter". The claim holds here:
  `configs/app/vite.browser.config.ts` calls `appBrowser()` rather than wrapping its result.
- **The `@returns` line.** The line this workspace carried said the merge returns one entry per
  plugin name. The hardened merge does not hold that property: a base repeating a name keeps both of
  its entries, and two caller entries sharing a name both survive. The line now states what the
  merge does hold — every base entry in the position the base gave it, and every override entry that
  replaced none in the order the caller wrote it.
- **`isNamedPlugin` stays unexported and undocumented**, as in scaffold. Its behaviour is reachable
  and proved through `mergeOverride`, which the conformance suite imports.
- **No factory name needed adapting.** Scaffold's block names no factory, and the `@example` names
  `appBrowser`, which is this workspace's own.
- **The `tests/config.test.ts` sentence was verified, not assumed.** That vendored file's case
  `keeps Vitest invocation fields out of project configurations` filters
  `configuration.test.projects` to its factories, refuses an empty set, and applies every factory to
  a sentinel carrying `command`, `isPreview`, `isSsrBuild`, `mode`, and `sentinel`. The sentinel
  carries the `command` and `mode` pair, so the hardened discriminant still refuses it. The sentence
  is kept.

## 3. The reds

Each script mutates the subject in `vite.config.ts`, runs the conformance project, and restores the
file. Every script runs the same command, which is what `npm run test:conformance` runs:

```text
node node_modules/vitest/vitest.mjs run --config vite.config.ts --no-cache --reporter=dot --project conformance
```

Green before and after every mutation: `Tests 11 passed (11)`.

| Behaviour | Case | Mutation | Script | Red |
| --------- | ---- | -------- | ------ | --- |
| A nested override entry keeps its nesting | `leaves a nested override entry nested rather than lifting it beside the base entries` | Flatten the candidates one level, which is what the first draft did | `tmp/units/r1-red-nested.py` | `Tests 1 failed, 10 passed (11)` |
| Two caller entries sharing a name both survive, in the order written | `keeps two override entries sharing a name, in the order the caller wrote them` | Key the appended entries by name | `tmp/units/r1-red-caller-duplicate.py` | `Tests 1 failed, 10 passed (11)` |
| A named override entry replaces the base entry in its position | `installs a named override entry in the position the base entry held` | Push the base entry where the replacement belongs | `tmp/units/r1-red-position.py` | `Tests 2 failed, 9 passed (11)` |
| A base repeating a name keeps its second entry, and one override entry is installed at most once | `replaces one base entry per override entry where the base repeats a name` | Drop the `taken` guard from the candidate search | `tmp/units/r1-red-taken-once.py` | `Tests 1 failed, 10 passed (11)` |
| An entry whose `name` is not a string is not treated as named | `treats an entry whose name is not a string as unnamed` | Drop `typeof plugin.name === 'string'` from the predicate | `tmp/units/r1-red-numbered-name.py` | `Tests 1 failed, 10 passed (11)` |
| A value carrying `command` alone merges, one carrying `command` and `mode` is refused | `merges a value carrying command alone and refuses one carrying command and mode` | Refuse on `command` alone | `tmp/units/r1-red-discriminant.py` | `Tests 1 failed, 10 passed (11)` |

Each script names the failing case in its own log, `tmp/units/r1-red-<name>.log.txt`. Every mutation
reddens its own case and no other, with one exception: dropping the replacement also reddens
`replaces one base entry per override entry where the base repeats a name`, because that case reads
the same installed entry.

Each case also carries an in-file control, following the convention the suite already used:

- The nested case controls against a one-level flattening, `[declared, nested].flat()`, which
  reports the inner array at the position the case reads the entry the caller wrote.
- The caller-duplicate, base-repeat, and non-string-name cases control against the name-keyed
  selection the first draft used, built in the test by `keyByName`.
- The position case controls against the bare `mergeConfig`, which concatenates the arrays.
- The discriminant case controls against a refusal keyed on `command` alone, by reading the merged
  value's `base` from the refused result.

## 4. The existing cases

Every existing case stayed, unedited, and all are green. No case asserted behaviour this change
reverses.

- `merges an override into the browser configuration` — unchanged. Its override carries no plugins,
  so the merge's plugin path never runs.
- `builds the showcase on the browser configuration instead of restating it` — unchanged. The
  showcase boundary replaces the browser boundary at the base's first position under the new rule,
  so the plugin names still match the browser's exactly.
- `merges an override into the showcase configuration` — unchanged.
- `carries the Vue plugin exactly once in every configuration these factories return` — unchanged
  text, still green, and green for a different reason. Under the first draft a name-keyed map
  collapsed the two Vue entries; under the hardened merge the override's Vue entry replaces the
  base's in the base's position. Its bare-`mergeConfig` control still reports the Vue plugin twice
  and still fails, so the case still discriminates. This answers the brief's first unknown: the case
  needed no change.
- `refuses the invocation record a registered factory receives in the override position` —
  unchanged. `INVOCATION` carries both `command` and `mode`, so the pair discriminant refuses it
  exactly as the `command` discriminant did.

## 5. Observations

- **No wrapper and no journey project moved**, which answers the brief's second unknown.
  `configs/app/vite.browser.config.ts` is the only wrapper, and it calls `appBrowser()` with no
  argument, so every factory call in this workspace reaches the merge with `override === undefined`.
  Measured rather than assumed: `tmp/units/r1-wrappers.py` captures `appBrowser()`, `appShowcase()`,
  all four `journey` projects, and the loaded wrapper, under the ported merge and again under the
  restored first draft, and reports `identical: True`. Its negative control,
  `tmp/units/r1-wrappers-control.py`, makes the merge's refusal return a changed base and reports
  `identical: False`, so the comparison discriminates. The capture instrument is
  `tmp/probe/r1capture.test.ts`. `tmp/probe/r1shape.test.ts` is the reading that established `vue()`
  returns one plugin object rather than an array, which is why the browser base carries three flat
  named entries and the new rule sees every one of them.
- **Durations.** app 30.53s, journey 38.66s, policy 1.36s, config 1.64s, conformance 792ms, build
  3.59s.
- **The journey run skips one case per variant**, `writes every frame this run owes`, the
  frame-capture case gated on its environment. That skip predates this change.
- **A stray file landed in the scaffold checkout and was removed.** A `cd` that persisted across a
  compound command wrote `C:\Users\mikes\WebstormProjects\scaffold\tmp\units\r1-local-merge.txt`,
  holding scaffold's own merge body. I created that file and deleted it in the next command.
  `git status` in that checkout reports only the untracked
  `.orkestrel/scaffold/post-landing-audit.log.txt` it already carried. No tracked scaffold file was
  opened for writing or changed.

## 6. What I did not close

- **A nested override entry can still put a duplicate plugin name into the resolved configuration.**
  The hardened merge selects over top-level entries only, and its doc block says so; Vite flattens
  recursively at resolve time. That is the contract scaffold committed, and changing it here would
  put this workspace's merge out of step with the generator. The case added here proves the stated
  behaviour — the entry keeps its nesting and adds no second top-level entry carrying a base name —
  rather than a deduplication the merge does not claim.
- **I ran no tree-wide `format:check` or `lint:check`.** The brief scopes those criteria to the
  owned files, and the authoritative tree-wide sweep belongs to `verifier`.
- **I did not commit.** The working tree carries the two modified files.
