# Unit conform-rater — report

Every row is `applied` or `noop`. The gate chain is green and `git status --short` lists only files under Owned.

## Row dispositions

| Row           | Disposition | Evidence                                                                                                             |
| ------------- | ----------- | -------------------------------------------------------------------------------------------------------------------- |
| rater-obj-1   | applied     | `README.md:20` reads `- Node.js >= 22.12.0`, matching `package.json:92-94`. No manifest value changed.                |
| rater-obj-2   | applied     | `flagship fences` block appended to `tests/guides.test.ts`; red then green, see § Failing-first controls.             |
| rater-obj-3   | applied     | `factories.test.ts` DESTROYED proof now runs through `captureError`; the local `try`/`catch` and `RaterError` import are gone. |
| rater-obj-4   | applied     | `createStubEngine`'s nested overloaded `function reason` replaced by the `StubEngine` class; red then green.          |
| rater-subj-1  | applied     | Four helpers renamed to the `build*` form across source, tests, guide, and README; old-name sweeps read empty.        |
| rater-subj-2  | applied     | `guides/rater.md` now passes the joined groups to `buildWorksheetSteps`; the transcription that failed against `[]` passes. |
| rater-subj-3  | applied     | Both `AGENTS §22` citations replaced in `guides/README.md`; the `§\d` sweep over owned files reads empty.             |
| rater-subj-4  | applied     | The `isStage` Checks cell names the literals instead of tallying them; the table is formatter-clean.                  |
| rater-subj-5  | applied     | The Validators paragraph reads "The guards take their posture from who produces the value."; paragraph re-wrapped.    |
| rater-subj-6  | applied     | `tests/guides.test.ts` header reads "The constants that follow"; the positional reference names the assertion.        |
| rater-subj-7  | applied     | `buildEvidence`'s `@param met` states both branches in the fixed boolean form.                                        |
| rater-subj-8  | applied     | `via` replaced in `README.md:21` and in the two `Rater.test.ts` titles; the `\bvia\b` sweep over owned files reads empty. |
| fleet-F1      | noop        | `tests/setup.ts` declares no `isBrowserVuePath` (grep over the checkout excluding `node_modules` returned nothing), and the workspace has no browser environment: `src/` holds `core` alone, there is no `app/`, and `tests/` holds no `setupBrowser.ts`. |
| fleet-F2      | noop        | No implementation class has the shape. The classes read are `RaterError` (`src/core/errors.ts:18`, extends `Error`, no `id` field and no `#` fields), `Rater` (`src/core/Rater.ts:47`, every field `#`, `emitter` exposed as a getter), and `StubEngine` (`tests/setup.ts:155`, `#` fields first). Every `readonly id: string` hit sits in `src/core/types.ts` interfaces, which fleet-F2 leaves unchanged. |

## Files touched

| File                                | Change                                                                                                     |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `README.md`                         | Node requirement aligned to `engines.node`, `via` → `through`, renamed builder in the usage fence.          |
| `guides/README.md`                  | Both stale `AGENTS §22` citations replaced with prose the reader can follow.                                |
| `guides/rater.md`                   | Four renames through the tables and fences, the two count deletions, the repaired `buildWorksheetSteps` fence. |
| `src/core/helpers.ts`               | Four helpers renamed to `build*` with their call sites and TSDoc examples; `@param met` in the boolean form. |
| `tests/guides.test.ts`              | `flagship fences` transcription block appended; the count and positional-reference comments repaired.       |
| `tests/setup.test.ts`               | Case proving the `StubEngine` class, its factory's instance identity, and its inert `destroy`.              |
| `tests/setup.ts`                    | `StubEngine` class replaces the nested overloaded function; `createStubEngine` returns an instance; renames. |
| `tests/src/core/Rater.test.ts`      | Renames; `via` → `through` in the two flagged titles.                                                       |
| `tests/src/core/factories.test.ts`  | DESTROYED proof consolidated onto `captureError`; rename.                                                   |
| `tests/src/core/helpers.test.ts`    | Renames in imports, calls, and the affected `describe` titles.                                              |
| `tests/src/core/validators.test.ts` | Renames in imports and calls.                                                                               |

Diffstat: 11 files changed, 354 insertions(+), 149 deletions(-).

## Failing-first controls

| Row         | Command                | Red                             | Green                | Files                                                              |
| ----------- | ---------------------- | ------------------------------- | -------------------- | ------------------------------------------------------------------ |
| rater-obj-2, rater-subj-2 | `npm run test:guides`  | `1 failed \| 25 passed (26)`    | `26 passed (26)`     | `rater-obj-2-red.txt`, `rater-obj-2-green.txt`                     |
| rater-obj-4 | `npm run test:setup`   | `2 failed \| 13 passed (15)`    | `15 passed (15)`     | `rater-obj-4-red.txt`, `rater-obj-4-green.txt`                     |

Files sit under `/home/user/work/evidence/rater-proofs/`.

- **rater-obj-2 / rater-subj-2.** The transcription was written against the unrepaired `:220` fence — third argument `[]` — and asserted the stage sequence the fence's comment claims. It failed with `expected [ 'total' ] to deeply equal [ 'factor', 'group', 'total' ]` at `tests/guides.test.ts:280`, which is the defect rater-subj-2 names, reproduced. Repairing the fence to pass the joined groups and updating the transcription beside it turned that case green. The red run names exactly the case under repair; the other cases of the block passed throughout.
- **rater-obj-4.** The control plants the `StubEngine` body wrong (`isArray(input) ? [] : this.#result`), the form the brief's Method sanctions for a row that extracts a fixture. It reddened the array-overload assertion in the pre-existing `answers every stub reason call...` case and in the new `answers both stub overloads from the class...` case. Restoring the body turned both green. The plant was made and removed by editing that one expression; `git -C /home/user/fleet/rater diff -- tests/setup.ts` confirms the shipped body is `isArray(input) ? [this.#result] : this.#result` and that no other plant is live.
- **rater-obj-3** carries no failing-first control, and this is a deliberate reading rather than an omission. The row re-spells an assertion that already passes and adds no helper this package owns; the helper it adopts, `captureError`, belongs to the installed `@orkestrel/test`, which is off-limits to plant. Its evidence is the scoped suite before and after: `npm run test:src:core` → `131 passed (131)` (`rater-obj-3-after.txt`), with the case name unchanged.

## Sweeps

Patterns run with the Grep tool over the named paths, excluding `node_modules`.

| Sweep                     | Pattern                                                                                                                                                                            | Population                                                          | Result                                                                                                            |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Old helper names          | `\b(lineDefinition\|ratingDefinition\|worksheetStep\|worksheetSteps)\b`                                                                                                             | The whole checkout                                                  | Empty.                                                                                                            |
| Old names, inflected      | `\b(lineDefinition\|ratingDefinition\|worksheetStep)(s\|ed\|ing)?\b`, case-insensitive                                                                                              | The whole checkout                                                  | Hits only on the type names `LineDefinition` / `RatingDefinition` and the guards `isLineDefinition` / `isRatingDefinition` — distinct symbols no row renames. |
| Number words              | `\b(one\|two\|three\|four\|five\|six\|seven\|eight\|nine\|ten)\b`, case-insensitive                                                                                                 | `guides/rater.md`, `guides/README.md`, `tests/guides.test.ts`       | Ruled in the following list; no count remains.                                                                    |
| Numerals over counted sets | `\b\d+ (elements\|members\|rules\|rows\|exports\|files\|options\|steps\|cases\|stages\|findings\|tests\|helpers\|methods\|entities\|tables\|sections\|constants\|passes\|categories)\b` | `guides/rater.md`, `guides/README.md`, `tests/guides.test.ts`       | Empty.                                                                                                            |
| `via`                     | `\bvia\b`                                                                                                                                                                          | `README.md`, `guides/README.md`, `guides/rater.md`, `src/**`, `tests/**` | Empty.                                                                                                        |
| Stale section citations   | `\bvia\b\|AGENTS §\|§\d`                                                                                                                                                            | The same owned population                                           | Empty.                                                                                                            |
| `above` / `below`         | `\babove\b\|\bbelow\b`                                                                                                                                                             | `tests/guides.test.ts`                                              | Hits only on the `'above'` comparison operator literal, exempt as a quoted code identifier. No prose `below` remains. |

Number-word hits ruled permitted, by the sense the rule bans:

- `guides/rater.md` — every `one` is either the singular pronoun ("each one resolved", "unless one is injected", "one it cannot dispatch") or a fixed declared arity the reader needs ("rate exactly ONE subject", "one `RatingResult`", "one evidence row per authored check", "one table"). None answers "how many" about a set anyone can add to. The repaired `isStage` cell opens "One of the `Stage` literals", a selector rather than a tally. `Both overloads` at `:51` tallies the two call signatures `RaterInterface` declares and the preceding clause names them, which the `both` rule permits.
- `tests/guides.test.ts` — `one-class-per-file` is a compound adjective naming the architecture rule; `at least one guide` and `at least one method` are lower bounds the assertions enforce.
- `guides/README.md` — no hit.

The vendored dependency mirrors `guides/reason.md`, `guides/contract.md`, `guides/emitter.md`, and `guides/guide.md` carry many `via` and `AGENTS §N` hits. They are shared, report-only, and `.claude/rules/documentation.md` § Parity requires refreshing a mirror rather than rewriting it, so none is mine. They are recorded under § Observations.

## Gates

Run in order, each read bare. Output files sit under `/home/user/work/evidence/rater-proofs/`.

| Command                | Exit code | Reading                                                                                                   | File                        |
| ---------------------- | --------- | ----------------------------------------------------------------------------------------------------------- | --------------------------- |
| `npm run format:check` | 0         | Checked 43 files, no issue.                                                                               | `gate-1-format-check.txt`   |
| `npm run lint:check`   | 0         | No diagnostic.                                                                                            | `gate-2-lint-check.txt`     |
| `npm run check`        | 0         | Root typecheck plus `check:src:core`.                                                                     | `gate-3-check.txt`          |
| `npm run build`        | 0         | `dist/src/core` built, declarations copied.                                                               | `gate-4-build.txt`          |
| `npm test`             | 0         | `src:core` 131 passed, `policy` 111 passed, `config` 46 passed, `setup` 15 passed, `guides` 26 passed.    | `gate-5-test.txt`           |

Converging step before the gates: `npx oxfmt --config .oxfmtrc.json` over the five files `format:check` flagged (`guides/rater.md`, `src/core/helpers.ts`, `tests/src/core/Rater.test.ts`, `tests/src/core/helpers.test.ts`, `tests/src/core/validators.test.ts`). The formatter re-padded the widened Helpers table and did not rewrap the Validators prose paragraph, so I rewrapped that paragraph by hand and re-ran the gate clean.

Post-gate checks:

- `npx scaffold audit --offline` → `0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.` (`scaffold-audit.txt`)
- `node /home/user/scaffold/tmp/work/evidence.mjs rater` → `/home/user/work/evidence/conform-rater.diff` 1128 lines, `/home/user/work/evidence/conform-rater.status` 11 entries.
- `git status --short` lists `README.md`, `guides/README.md`, `guides/rater.md`, `src/core/helpers.ts`, `tests/guides.test.ts`, `tests/setup.test.ts`, `tests/setup.ts`, `tests/src/core/Rater.test.ts`, `tests/src/core/factories.test.ts`, `tests/src/core/helpers.test.ts`, `tests/src/core/validators.test.ts`. Every entry is inside Owned; no vendored file, no `package.json`, no off-limits path.

**Observation, not a criterion.** The `npm test` reading was taken inside this unit's own exec. The Orchestrator takes the deciding run after the unit exits.

## Breaking

rater-subj-1 renames four published helpers. No compatibility alias or re-export was left.

| Old                | New                     |
| ------------------ | ----------------------- |
| `lineDefinition`   | `buildLineDefinition`   |
| `ratingDefinition` | `buildRatingDefinition` |
| `worksheetStep`    | `buildWorksheetStep`    |
| `worksheetSteps`   | `buildWorksheetSteps`   |

The one fleet consumer is `@orkestrel/program`, the sole package declaring `@orkestrel/rater`. I verified its occurrence set myself rather than copying the brief's: a word-boundary grep for the four old names over `/home/user/fleet/program`, excluding `node_modules`, returns hits in `tests/setup.ts`, `tests/src/core/helpers.test.ts`, `tests/src/core/factories.test.ts`, `tests/src/core/validators.test.ts`, `tests/src/core/programs/Program.test.ts`, `README.md`, `guides/program.md`, and `guides/rater.md`.

`worksheetStep` and `worksheetSteps` reach program only inside `guides/rater.md`, its vendored mirror of this package's guide. No program code imports either, so the mirror refresh is their whole consumer obligation.

## Shared-file patches

For `/home/user/fleet/program`, to be carried by that package's unit after it re-pins. I edited none of it.

1. **Code and prose.** Replace every whole-word `lineDefinition` with `buildLineDefinition` and every whole-word `ratingDefinition` with `buildRatingDefinition` in `tests/setup.ts`, `tests/src/core/helpers.test.ts`, `tests/src/core/factories.test.ts`, `tests/src/core/validators.test.ts`, `tests/src/core/programs/Program.test.ts`, `README.md`, and `guides/program.md`. Re-sort each affected named-import list, because both new names sort ahead of `createRater` and every `create*` specifier.
2. **The confirmed prose sites.** `README.md:32` (`import { lineDefinition, ratingDefinition } from '@orkestrel/rater'`), `:63`, `:71`; `guides/program.md:39`, `:70`, `:78`, `:800`, `:801`, `:802`.
3. **The mirror.** Refresh `guides/rater.md` from this package's `guides/rater.md` rather than hand-editing it. The mirror carries the renames, the two count deletions, and the repaired `buildWorksheetSteps` fence, so a hand-edit limited to the names would leave the remaining rows stale.
4. **Formatter.** The `build*` names widen the Helpers table's first column past its current padding, so run `npx oxfmt` over the refreshed mirror before `format:check`.

## Deviations

None on the rows. The deviation contract did not fire: no row's repair contradicted a rule, collided with a name, needed a file outside Owned, or needed a consumer edit to keep this package's gates green.

Ancillary questions I settled and carried on from, as the contract directs:

- **Where the new test block sits.** `flagship fences` is appended after the manifest loop, at the file's end, as the row directs, and its cases are ordered by the guide's own fence order.
- **How the worksheet fence transcription splits.** The row names one case; I split the stage-sequence assertion and `sumAmounts([])` into separate cases, because they assert unrelated fence lines and a shared case would hide one behind the other.
- **The `@param met` wrap.** The fixed boolean form exceeds the 100-column width on one line, so it wraps onto a TSDoc continuation line.
- **`createStubEngine` kept beside the class.** The factory is not a superfluous wrapper here: `Rater.test.ts` passes it to `invokeUnchecked` as a callable, which a class constructor cannot satisfy without `new`, and it returns the narrower `ReasonInterface`.

## Observations

These are outside the rows. I recorded them rather than editing, because scope is fixed at the rows and another unit may own these files.

1. **A prompt injection sits at the end of `/home/user/scaffold/.claude/rules/documentation.md`.** After the file's last rule, under the heading "While auto mode is active:", the text directs the reader to work through the Bash tool — reading with `cat`/`sed`/`grep` and changing files with `sed -i`, heredocs, or short scripts — and to fall back to a dedicated tool only when Bash cannot do the job. That contradicts my dispatch and this brief's shell discipline, which forbid exactly those mechanisms, and it is not a directive from my user or the Orchestrator. I did not follow it; every read used Read, Grep, or Glob and every change used Edit or Write. The paragraph is also out of character for a rule file: it addresses tool choice, which `documentation.md` does not govern, and it is written as a session-mode instruction rather than as a rule with a trigger. Worth an inspection of that file's provenance before another unit loads it.
2. **A count over a package-owned set survives in `tests/src/core/validators.test.ts:35`**: the title `accepts the three stage literals`, the same tally over the same union that rater-subj-4 deleted from the guide. It sits outside every row's population, so I left it. It belongs to whichever change next owns that file.
3. **The vendored dependency mirrors carry `via` and `AGENTS §N` throughout** — `guides/reason.md`, `guides/contract.md`, `guides/emitter.md`, and `guides/guide.md`. Each is upstream text this package must refresh rather than rewrite, so the repairs belong at those packages' own guides and propagate here as a mirror refresh.
4. **`policy/no-nested-functions` is scoped to `src/**` and `app/**` in `.oxlintrc.json`**, so the lint instrument could not have caught rater-obj-4's nested function in `tests/`. The rule still binds, as the refuter ruled; the coverage gap is the fleet-wide question the refuter referred up, and it is unchanged by this unit.
