# Unit voice-table — report

Every TSDoc block under `src/` of `/home/user/fleet/table` opens with a third-person `-s` verb
sentence, and every boolean `@returns` reads `True if …; false otherwise`. The acceptance
instrument reports `table files= 17 blocks= 224 imperative= 0 verbless= 0 returnsBad= 0`. The tree
has no `app/` directory.

## Counts by kind

| Kind                                            | Count |
| ----------------------------------------------- | ----- |
| First sentence from the imperative               | 134   |
| First sentence given a verb                      | 83    |
| First sentence reworded to drop the symbol's name | 0     |
| Boolean `@returns`                               | 33    |

No first sentence in the tree repeated its symbol's name, so that kind is empty. The first-sentence
kinds together account for every line the launch listing printed.

## Files touched

- `/home/user/fleet/table/src/core/Table.ts` — class doc, constructor, and every getter and method
  first sentence.
- `/home/user/fleet/table/src/core/cloners.ts` — `Clone` → `Clones` on both exports.
- `/home/user/fleet/table/src/core/constants.ts` — each constant's noun phrase gains `Lists` or
  `Names`.
- `/home/user/fleet/table/src/core/errors.ts` — class, properties, constructor, guard, and the
  guard's boolean `@returns`.
- `/home/user/fleet/table/src/core/factories.ts` — `Open` → `Opens`.
- `/home/user/fleet/table/src/core/helpers.ts` — every exported helper's first sentence and its
  boolean `@returns` lines.
- `/home/user/fleet/table/src/core/parsers.ts` — `Parse` → `Parses` on both exports.
- `/home/user/fleet/table/src/core/tables/ExpansionManager.ts` — class, getter, and every overload
  signature.
- `/home/user/fleet/table/src/core/tables/FilterManager.ts` — class, constructor, and every method
  and overload signature.
- `/home/user/fleet/table/src/core/tables/KeyManager.ts` — class doc and the `keys` getter.
- `/home/user/fleet/table/src/core/tables/PaginationManager.ts` — class, constructor, getters, and
  methods.
- `/home/user/fleet/table/src/core/tables/RowManager.ts` — class, constructor, and every method and
  overload signature.
- `/home/user/fleet/table/src/core/tables/SelectionManager.ts` — class, getter, and every overload
  signature.
- `/home/user/fleet/table/src/core/tables/SortManager.ts` — class, constructor, and every method and
  overload signature.
- `/home/user/fleet/table/src/core/types.ts` — every type, interface, member, and overload first
  sentence, plus its boolean `@returns` lines.
- `/home/user/fleet/table/src/core/validators.ts` — every guard's first sentence and boolean
  `@returns`.

Diffstat: 16 files changed, 262 insertions(+), 259 deletions(-).

## Gate chain

| Command                | Exit | Result                                          |
| ---------------------- | ---- | ----------------------------------------------- |
| `npm run format:check` | 0    | All matched files use the correct format         |
| `npm run lint:check`   | 0    | No output                                       |
| `npm run check`        | 0    | `tsc --noEmit` on the root and core projects    |
| `npm run build`        | 0    | Built `dist/src/core` and copied the `.d.cts` file |
| `npm test`             | 0    | src 103, policy 111, config 46, setup 12, guides 82, all passed |

No gate failed, so there is no failure excerpt. The `npm test` result is an observation: it ran
inside this unit's own exec, and the authoritative run is the Orchestrator's landing chain.

## Evidence paths

- `/home/user/scaffold/tmp/units/voice/voice-table.diff`
- `/home/user/scaffold/tmp/units/voice/voice-table.status`

## Wording decisions

- A constant takes `Names` and a constant list takes `Lists`.
- A type or an interface takes `Represents`, except where a better third-person verb was already in
  the sentence: a schema `Holds`, a literal union `Names`, an event map `Lists`, an options
  interface `Describes`.
- A manager class and a manager-returning member take `Manages`, which avoids the repetition
  `Holds the rows the table holds`.
- A computed getter takes `Returns` and a stored one takes `Holds`, matching what each does.
- A `How many …` property takes `Counts`, again to avoid repeating the sentence's own verb.
- A boolean getter takes `Reports whether`.

## Observations

- The `isTableSchema` guard in `validators.ts` and the `clear(key)` overloads of
  `SelectionManagerInterface` and `ExpansionManagerInterface` in `types.ts` needed their line break
  moved so that the literal phrase `; false otherwise` stays on one line. The acceptance
  instrument's compliance test requires that substring contiguously, and the first wrap split it.
  The sentences' words are unchanged; only the wrap point moved.
- Other `@returns` blocks re-flowed for a related reason: the third-person `@returns` first
  sentence is longer than the `` `true` when … `` form it replaced, so the following sentence moved
  across the line boundary. Its text is byte-identical; only its line break moved. Criterion 3 reads
  on sentence text, and no `@example`, `@param`, `@remarks`, or `@throws` line changed at all
  (`git diff -U0 | grep -E "^[+-].*@(param|example|remarks|throws|deprecated)"` returns nothing).
- No line the change added exceeds the `printWidth` of 100 in `.oxfmtrc.json`, counting a tab as the
  configured `tabWidth` of 2.
- Every added and removed diff line begins with a comment marker, so no code token moved.

## Deviations

none
