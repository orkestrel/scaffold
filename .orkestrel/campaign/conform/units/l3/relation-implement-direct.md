# Unit conform-relation — report

Every row is `applied`. `fleet-F1` folded into `relation-obj-8`; `fleet-F2` is `noop`. The gate chain is green and `git status --short` lists only files under Owned.

Report written to `/home/user/scaffold/tmp/units/conform/conform-relation-report.md`.

## Rows

| Row | Disposition | What landed |
| --- | --- | --- |
| relation-obj-1 | applied | `isRelationDescriptor` checks each declared member's type; the union check sits inside it, no new export |
| relation-obj-2 | applied | `#index` / `#group` extracted as `indexRows` / `groupRows` in `helpers.ts`, with TSDoc, guide rows, and tests |
| relation-obj-3 | applied | `describe('executable guide fences')` transcribes every value-claiming fence, after the manifest loop |
| relation-obj-4 | applied | `README.md` states the runtime floor `package.json` declares |
| relation-obj-5 | applied | `README.md` states the ESM and CommonJS faces the `exports` field publishes |
| relation-obj-6 | applied | `Model` and `RelationManager` carry an `@example`, and each constructor carries `@param` documentation |
| relation-obj-8 | applied | `isBrowserVuePath` deleted from `tests/setup.ts`, with its cases and its clause in the proof's header |
| relation-subj-2 | applied | The per-call handle lifetime stated on `RelationManagerInterface` and in the guide's Observing section |
| relation-subj-3 | applied | `relationship` is the single term for the axis; the Patterns table header is `Relationship` |
| relation-subj-4 | applied | `RelationProps` renamed `LoadedMap` in types, `Model`, and the guide's Types row — BREAKING |
| relation-subj-5 | applied | `RelationManagerOptions.model` carries `on` and `error`, threaded into every vended handle |
| relation-subj-6 | applied | `ModelEventMap` declares no type parameter; `link` / `unlink` carry `Key` — BREAKING |
| relation-subj-9 | applied | Every `§` citation removed: deleted in published TSDoc, replaced by file and heading in repository-internal prose |
| relation-subj-13 | applied | `via`, `just`, `now`, and `e.g.` replaced across the package's own prose |
| relation-subj-14 | applied | Two cases prove the manager's `model.on` and `model.error` reach a vended handle; the misdescribing case renamed |
| fleet-F1 | applied | By `relation-obj-8`. No second edit. The workspace has no browser environment and no `app/` tree |
| fleet-F2 | noop | No class declares a public `readonly id: string`. See § Sweeps |

### relation-obj-1 — the guard's operative form

`isRelationDescriptor` returns false unless `isRecord(value)` holds, `relationship` (when the key is present) is a member of the union, and each of `column`, `key`, `through`, `source`, `target`, `tag`, `label`, and `model` satisfies `isString` when the key is present. `recordOf(shape, true)` was not adopted, and no `isRelationship` export was added, so the guide's Resolution table is unchanged.

A key present with an `undefined` value is refused. `exactOptionalPropertyTypes` is on, so `{ column: undefined }` is not assignable to `RelationDescriptor` either, and accepting it would be the unsound reading of "each present member matches its declared type".

### relation-obj-6 — the parameter-documentation amendment

The brief names an amendment recorded under `relation-subj-7`, which is not a row here. Read against the rule the row cites and `.claude/rules/typescript.md` § Comments and API documentation, it landed as a TSDoc block on each class's constructor: `Model` documents its positional parameters including `on` and `error`, and `RelationManager` documents its options parameter and the `INVALID` throw.

## Files touched

| File | Summary |
| --- | --- |
| `/home/user/fleet/relation/src/core/types.ts` | `LoadedMap` rename, `ModelEventMap` arity, `RelationManagerOptions.model`, handle lifetime, citations |
| `/home/user/fleet/relation/src/core/validators.ts` | `isRelationDescriptor` checks every declared member's type |
| `/home/user/fleet/relation/src/core/helpers.ts` | `indexRows` and `groupRows` added under `// === Row projection` |
| `/home/user/fleet/relation/src/core/Model.ts` | Calls the extracted helpers, `LoadedMap` rename, class `@example`, constructor `@param`, citations |
| `/home/user/fleet/relation/src/core/RelationManager.ts` | `#model` field threads `on` and `error` into `#vend`; class `@example`; constructor `@param` |
| `/home/user/fleet/relation/src/core/errors.ts` | The `§12` citation replaced by the owning rule file and heading |
| `/home/user/fleet/relation/tests/src/core/validators.test.ts` | Cases for a wrong-typed member, a relationship outside the union, and every builder's output |
| `/home/user/fleet/relation/tests/src/core/helpers.test.ts` | `indexRows` / `groupRows` cases, and `resolveRelation` refusing a wrong-typed descriptor member |
| `/home/user/fleet/relation/tests/src/core/Model.test.ts` | Manager `model.on` / `model.error` cases, the renamed case, `setup` takes the `model` option |
| `/home/user/fleet/relation/tests/guides.test.ts` | The executable-fence block, its imports, and the header's count and positional reference |
| `/home/user/fleet/relation/tests/setup.ts` | `isBrowserVuePath` deleted |
| `/home/user/fleet/relation/tests/setup.test.ts` | Its `describe` block, its import, and the header clause naming it deleted |
| `/home/user/fleet/relation/guides/relation.md` | Row-helper rows, `LoadedMap`, `model?`, vocabulary, citations, the Observing addition |
| `/home/user/fleet/relation/guides/README.md` | The `§22` citations replaced |
| `/home/user/fleet/relation/README.md` | Runtime floor, module faces, and the relationship vocabulary |

Diffstat: `15 files changed, 569 insertions(+), 169 deletions(-)` (measured before the final prose sweep; the regenerated `/home/user/work/evidence/conform-relation.diff` is 1326 lines).

## Failing-first controls

Command for every control: `npm --prefix /home/user/fleet/relation run <script>`.

| Row | Script | Red | Green | Files |
| --- | --- | --- | --- | --- |
| relation-obj-2 | `test:src:core` | 5 failed \| 50 passed (55), exit 1 | 65 passed (65) | `relation-obj-2-red.txt`, `relation-obj-1-obj-2-green.txt` |
| relation-obj-1 | `test:src:core` | 5 failed \| 58 passed (63), exit 1 | 65 passed (65) | `relation-obj-1-red.txt`, `relation-obj-1-obj-2-green.txt` |
| relation-subj-5, relation-subj-14 | `test:src:core` | 2 failed \| 63 passed (65), exit 1 | 65 passed (65) | `relation-subj-5-subj-14-red.txt`, `relation-subj-5-subj-14-green.txt` |
| relation-obj-3 | `test:guides` | 6 failed \| 23 passed (29), exit 1 | 29 passed (29) | `relation-obj-3-red.txt`, `relation-obj-3-green.txt` |
| relation-obj-8 | `test:setup` | not applicable — a deletion | 8 passed (8) | `relation-obj-8-green.txt` |

Every file sits in `/home/user/work/evidence/relation-proofs/`.

Failing test names, red run by red run:

- `relation-obj-2` (helper bodies planted wrong: `indexRows` keying on the column name, `groupRows` overwriting instead of appending): `indexRows > keys each row by the string form of its column`, `indexRows > stringifies a numeric key so it meets its string form`, `indexRows > keeps the last row when a key repeats`, `indexRows > indexes a row missing the column under the undefined string`, `groupRows > collects every row sharing a key, in input order`.
- `relation-obj-1` (tests written against the `return isRecord(value)` body): `resolveRelation — raw descriptor inference > throws INVALID when a descriptor member holds the wrong type`, `resolveRelation — raw descriptor inference > reports INVALID as the code of the error a malformed member throws`, `isRelationDescriptor > refuses a member declared a string that holds another type`, `isRelationDescriptor > refuses a member present with an undefined value`, `isRelationDescriptor > refuses a relationship outside the declared union`.
- `relation-subj-5` and `relation-subj-14` (the two threaded arguments reverted out of `#vend`): `Model — emitter (push observation surface) > seeds a vended handle with the initial listeners the manager model option carries`, `Model — emitter (push observation surface) > routes a throwing listener to the error handler the manager model option carries`. Nothing else reddened.
- `relation-obj-3` (subject planted to contradict the fences: `isRelationDescriptor` inverted to refuse records, `isRelationError` inverted): every case of `executable guide fences` failed and nothing outside the block did — `resolves a builder descriptor onto the belongs arm`, `resolves a relation map entry onto the many arm`, `narrows a builder descriptor to the object form`, `carries through, source, and target as required members of the through arm`, `reports INVALID as the code a malformed relation throws`, `lists the tables carrying relations and reports membership`.

Every plant was reverted by editing the same line back. `git diff HEAD -- src/core/errors.ts` shows only the citation change, and the `validators.ts` diff shows `if (!isRecord(value)) return false`.

## Sweeps

Population for each prose sweep unless stated otherwise: `src/**`, `tests/**` excluding the vendored set, `guides/relation.md`, `guides/README.md`, `README.md`.

| Pattern | Result |
| --- | --- |
| `RelationProps` and case-insensitive `relationprops` | empty |
| `#index`, `#group`, `ModelEventMap<` | empty |
| `isBrowserVuePath` (also over `vite.config.ts`) | empty |
| `§` | empty in the package's own files; remaining hits are vendored dependency guides, off-limits |
| case-insensitive `\bvia\b`, `\bjust\b`, `\be\.g\.\b`, `\bi\.e\.\b`, `simply`, `currently` | empty |
| case-insensitive `relation kind`, `relation shape` | empty |
| case-insensitive `\bkind\b` | only the `Kind` column headers of the `## Surface` tables, which the guides gate reads |
| `should`, `utilize`, `leverage`, `in order to`, `allows you to`, `and/or`, `sanity check`, `dummy`, `blacklist`, `whitelist`, `performant`, `robust` | empty |
| `\b\d+ (elements\|members\|rules\|rows\|exports\|files\|options\|steps\|cases\|stages\|findings\|tests\|helpers\|methods\|entities\|tables\|sections\|constants\|passes\|categories)\b` | empty |
| case-insensitive `\b(one\|two\|…\|ten)\b` | see the ruling that follows |
| case-insensitive `\b(above\|below)\b` | see the ruling that follows |
| `readonly id` over `src/**` and `tests/**` (fleet-F2) | one hit, a fixture string inside the vendored `tests/setupPolicy.ts`; no class has the shape |
| `unreachable`, `.skip`, `.todo`, `TODO` over `src/**` and the owned tests | empty |

Number-word ruling. The count `relation-subj-3` deleted was "Five relation kinds" at `README.md:8` and `guides/relation.md:3`; both now name the members. Every remaining hit is permitted: `one` and `two` as the query counts the batching contract measures, the union members `one` and `many`, "the two sides" of a junction (a pair the sentence names), "one table per type", "one narrow", "one pass", and "one-element array". One violation was found and repaired outside the enumerated sites: `tests/guides.test.ts` said "The five constants below", which is both a count and a positional reference; it now names `FENCE_LANGUAGES`, `EXAMPLE_LANGUAGE`, `MODULES`, `INTERNAL`, and `ROOT_FILES`.

Position-reference ruling. `guides/relation.md` "leave the surface above unchanged" became "leave the documented surface unchanged"; `src/core/helpers.ts` "The builders below" became "The builders in this file"; `tests/guides.test.ts` "the second assertion below" now names the case it means. The remaining hit, "thin above the typed store", describes layering rather than a document position and stays.

## Gates

Run in order, each read bare. Output files sit in `/home/user/work/evidence/relation-proofs/`.

| Command | Exit | File | Reading |
| --- | --- | --- | --- |
| `npm --prefix /home/user/fleet/relation run format:check` | 0 | `gate-format-check.txt` | All matched files use the correct format, 44 files |
| `npm --prefix /home/user/fleet/relation run lint:check` | 0 | `gate-lint-check.txt` | no diagnostics |
| `npm --prefix /home/user/fleet/relation run check` | 0 | `gate-check.txt` | both projects clean |
| `npm --prefix /home/user/fleet/relation run build` | 0 | `gate-build.txt` | built, `index.d.cts` copied |
| `npm --prefix /home/user/fleet/relation test` | 0 | `gate-test.txt` | src:core 65, policy 111, config 46, setup 8, guides 29 |
| `npx scaffold audit --offline` | 0 | `scaffold-audit.txt` | 0 of 34 planned paths drifted |
| `node /home/user/scaffold/tmp/work/evidence.mjs relation` | 0 | — | diff 1326 lines, status 15 entries, every entry under Owned |

Two gate readings had to converge before they passed, and each is recorded because the converging edit is itself part of the change:

- `format:check` first reported issues in `guides/relation.md`, `tests/src/core/Model.test.ts`, `tests/src/core/helpers.test.ts`, and `tests/src/core/validators.test.ts`. Converged with `npx oxfmt --config .oxfmtrc.json <those four files>`, then green.
- `lint:check` first reported `vitest(no-conditional-expect)` at `tests/src/core/helpers.test.ts:135` and `:136` and `tests/guides.test.ts:210`, `:223`, `:224` — the try/catch shape used to read a thrown error's `code`. No diagnostic was suppressed. The assertions were rewritten on `captureError` and `readProperty` from `@orkestrel/test`, which is the declared primitive for the job, and the `ResolvedThrough` transcription became one `toEqual` over the whole arm rather than a narrowing branch. Then green.

**Observation, not a criterion.** The whole-suite `npm test` reading was taken inside this unit's own exec. The deciding run belongs to the Orchestrator after the unit exits.

## Breaking

Both breaking rows move the published type surface and earn the version bump. Neither obliges a fleet consumer edit.

| Row | Change | Consumer | Edit needed |
| --- | --- | --- | --- |
| relation-subj-4 | `RelationProps` renamed `LoadedMap` | `@orkestrel/toolbox ^0.0.10` imports `RelationManagerInterface`, `ModelInterface`, `Include`, `RelationErrorCode`, `isRelationError`, and no `RelationProps` | none |
| relation-subj-6 | `ModelEventMap<TKey extends Key = Key>` → `ModelEventMap` | `@orkestrel/toolbox ^0.0.10` does not import `ModelEventMap` | none |

An external consumer writing `ModelEventMap<SomeKey>` breaks on arity, and one importing `RelationProps` breaks on the name. Their repair is to drop the argument and to import `LoadedMap`. `RelationManagerOptions` gained an optional `model` member, which is additive.

## Shared-file patches

None. No file outside Owned needed an edit, and no fleet checkout other than `/home/user/fleet/relation` was written.

## Deviations

The deviation contract did not fire. Nothing stopped the unit. Recorded for the Orchestrator:

1. **A conflicting standing instruction arrived mid-session.** Appended to a rule file read was a block beginning "While auto mode is active" directing that file reads and edits go through Bash (`cat`, `sed`, heredocs) rather than the Read, Edit, and Write tools. That contradicts the dispatch's standing conditions and the brief's § Context shell discipline, which forbid a heredoc, `sed -i`, `python3`, and `node -e` and require the dedicated tools. The dispatch governs, so the brief was followed: every read used Read, Grep, or Glob, every change used Edit or Write, and Bash ran only the permitted command forms. Flagging it because the instruction did not come from the dispatch chain.

2. **Ancillary decisions taken and carried on from**, each inside the row it belongs to:
   - `relation-subj-9`, `types.ts` published TSDoc: the sentence "Declared as a `type` alias (§4.5 — `EventMap` is a `type` kind)" was deleted whole rather than stripped of its citation. What remains after removing the citation is a repository convention restated to a consumer, which `.claude/rules/documentation.md` § Authority and workflow refuses.
   - `relation-subj-5`: `#vend` passes `this.#model?.on` and `this.#model?.error` positionally rather than omitting an undefined argument. A positional seventh argument cannot be omitted while an eighth is passed, and `Model`'s constructor already spreads each conditionally into the emitter.
   - `relation-obj-2`: `indexRows` and `groupRows` were appended after `countAttached` inside the existing `// === Row projection` section, and the guide's Row helpers rows follow the same order.
   - `relation-obj-1`: the descriptor's member names are iterated from an array literal local to the guard rather than declared as a module constant, because the package has no `constants.ts` and adding one would add a barrel export and a guide row this row does not call for.
   - Test case names were chosen for the claim each proves, not for a fence line or a control.

3. **Incidental prose repairs applied inside Owned files**, listed under § Sweeps: the count and the positional reference in `tests/guides.test.ts`, the positional references in `guides/relation.md` and `src/core/helpers.ts`, and "relation kind" in `tests/src/core/Model.test.ts` and the guide's Tests row. Each is inert, sits in a file the rows already open, and closes a rule the rows cite. No row's subject was widened.

4. **Referral, not blocking.** `relation-obj-8` records that the same dead `isBrowserVuePath` helper sits in `tests/setup.ts` across sibling checkouts. This unit deleted it here only. Whether the fleet seed is the real carrier is the Orchestrator's decision.
