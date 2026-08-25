# Unit VISIT-reason — report

## Outcome

The setup proof landed, `test:guides` and the `test` chain took their planned values, `repair` ran
clean, and every gate closes green. The `setup:` advisory is gone. Nothing is committed.

## The advisory as taken

`npx --no-install scaffold audit` at the start of the unit, at `/home/user/orkestrel/reason`:

```text
scripts: The manifest at . declares a planned script with a differing value: test:guides. Keep the declared value unchanged or replace it with the planned value: "test:guides" declares "vitest run --config vite.config.ts --reporter=dot --project guides"; planned "vitest run --config vite.config.ts --no-cache --reporter=dot --project guides".
setup: The target at . carries a test setup module that no proof covers: tests/setup.ts. Add tests/setup.test.ts to cover it. The proof's subject is behavior only this workspace can assert, so scaffold does not write it.
dependencies: typescript declares major 6, while the registry serves major 7.
48 of 126 planned paths drifted from the plan. Audit compared bytes at 101, existence at 19, and nothing at 6. The plan does not own 7 further paths beneath its groups.
```

The `setup:` line names one module, so the work list is one proof file: `tests/setup.test.ts` over
`tests/setup.ts`. The `dependencies:` line is the fleet-wide advisory the brief scopes out.

## Touched files

- `/home/user/orkestrel/reason/tests/setup.test.ts` — new. The proof of the workspace's
  host-independent test infrastructure.
- `/home/user/orkestrel/reason/package.json` — `test:guides` took the planned value, `repair --groups manifest` wrote `test:setup`, the `test` chain took the planned order, and `repair` re-pinned `@orkestrel/scaffold` to `^0.0.52`.
- `/home/user/orkestrel/reason/vite.config.ts` — `repair` added the `setup` project and placed it in `projects` between `config` and `guides`.
- The orchestration group `repair` regenerated: `CLAUDE.md`, `.agents/**`, `.claude/agents/*`, `.claude/rules/documentation.md`, `.claude/skills/**`, `.codex/agents/*`.
- `/home/user/orkestrel/reason/package-lock.json` — arrived dirty from the re-pin; untouched by this unit.

## The proof file

`tests/setup.test.ts` — 26 cases in seven groups. Every expected value is derived by a route
`tests/setup.ts` does not share: hand-written literals, structural unwinding, `Object.keys` /
`Object.getOwnPropertySymbols` / `Object.getOwnPropertyDescriptor` reads, and `in` membership.
`tests/setup.ts` is host-independent, so no browser or service split applies and no case is deferred
to another project.

- **Result narrowers.** One case per contract across all four narrowers, driven from one local
  table: each returns its matching single result by identity; each refuses a batch array with
  `Expected a single result, got a batch array`; each refuses a neighbour's reasoning and names the
  reasoning it found. The result values are inert literals conforming to `QuantitativeResult`,
  `LogicalResult`, `SymbolicResult`, and `InferentialResult` — the narrowers read `reasoning` and
  nothing else, so no `reason()` run is needed and no production behavior is re-proven.
- **Deep freezing.** `deepFreeze` freezes in place, returns the same reference, and reaches every
  nested plain object and array — proven by `Object.isFrozen` at each level plus a write to the
  deepest array throwing `TypeError` under module strict mode. A `Date`, a `Map`, and a primitive
  come back unfrozen and unchanged, which pins the `isRecord` boundary the module documents.
- **Subject fixtures.** `BASIC_SUBJECT` spans `string`, `number`, and `boolean` (asserted as the
  set of `typeof` values, not as a name census); `NESTED_SUBJECT` carries its two nested records
  with the values the descent cases read; `DRIVER_SUBJECT` carries its named factors as numbers.
- **Definition and reasoner builders.** `buildStaticDefinition('rate', 7)` equals a hand-written
  definition literal — one sum group, one static factor, id echoed into `name`; the no-argument call
  defaults to `static-quant` and factor value `42`. `createThrowingReasoner` reports id `throwing`,
  supports the reasoning it was registered under, validates clean, and throws its scripted message;
  a `'logical'` instance refuses a quantitative definition and throws its own message.
- **Sequence and fill builders.** `runTwice` calls its scenario twice and returns the outcomes in
  call order (proven by a side-effect log, not by the return alone); `sequence` counts up from its
  start and defaults to `0`; `sequence`, `repeatValue`, and `buildSubjects` all return empty for a
  non-positive count; `repeatValue` puts the one reference in every slot; `buildSubjects` numbers
  each subject by index; `sparse` leaves real holes, proven by `Object.keys` and the `in` operator
  rather than by reading `undefined`.
- **Expression builders.** `deepCompound` and `deepAddition` are proven by unwinding the tree and
  counting layers, never by rebuilding it with the same factories: each compound layer is a
  single-operand `'and'`, each addition layer is an `'add'` whose `right` is the same step
  reference, the innermost node is the leaf by identity, and a non-positive depth returns the leaf
  unwrapped.
- **Frozen data tables.** `EXTREME_NUMBERS` is frozen, holds no non-finite entry, and holds `0` and
  `-0` as distinct entries (`Object.is`). `TRICKY_KEYS` is frozen, has no duplicate, contains the
  prototype-pollution names, the empty key, and the dotted key, and carries one entry whose UTF-16
  length exceeds its code-point length — located by that property, not by its literal.
  `INTEGER_KEY_SUBJECT` is frozen and enumerates `['1', '2', '10', 'zeta', 'id', 'alpha']`, with
  every non-`id` value a number. `ADVERSARIAL_VALUE_SUBJECT` is frozen, keeps its symbol-keyed
  property out of `Object.keys` while the descriptor still reads `'hidden'`, and types every
  string-keyed value as `string`, `bigint`, `symbol`, or `function` — none of them `'object'`.

## Mutation control

One control, on the proof file's own expectation, restored after the reading.

- **Mutated:** the `INTEGER_KEY_SUBJECT` enumeration expectation, swapped to `['1', '2', '10', 'id', 'zeta', 'alpha']`.
- **Command:** `npm run test:setup`.
- **Failing line:** `tests/setup.test.ts:327:44` — `Tests  1 failed | 25 passed (26)`, the diff
  reporting `- "id"` before `+ "zeta"`.
- **Restored:** the expectation is back to `['1', '2', '10', 'zeta', 'id', 'alpha']`; the file is
  green.

## Retained differing values

`repair` named none. The only differing script value the opening audit reported was `test:guides`,
which this unit adopted at the planned value before running `repair`. Beyond it, the unit set only
the `test` chain the blocked `configs` group forces:
`npm run test:src && npm run test:policy && npm run test:config && npm run test:setup && npm run test:guides`.

The visit order ran as the brief fixes it: proof written → `test:guides` set through `npm pkg set` →
`npx --no-install scaffold repair --groups manifest` (`1 written, 1 unchanged, 0 removed in .`,
writing `test:setup`) → `test` chain set through `npm pkg set` → full `npx --no-install scaffold repair`
(`49 written, 78 unchanged, 0 removed in .`) → `npm run format` → gates. A confirming second full
`repair` reports `0 written, 127 unchanged, 0 removed in .`.

## Gate evidence

Each gate run bare at `/home/user/orkestrel/reason`, closing line quoted.

| Gate                  | Closing line                                                        |
| --------------------- | ------------------------------------------------------------------- |
| `npm run format:check` | `Finished in 2520ms on 166 files using 4 threads.` (preceded by `All matched files use the correct format.`) |
| `npm run lint:check`  | no output after the script echo — no diagnostic, exit 0             |
| `npm run check`       | no output after the `check:src:core` script echo — exit 0           |
| `npm run build`       | `Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts`     |
| `npm test`            | `Tests  83 passed (83)` for the final `test:guides` leg             |

`npm test` legs in chain order: `test:src` `Tests  1039 passed (1039)`; `test:policy`
`Tests  93 passed (93)`; `test:config` `Tests  46 passed (46)`; `test:setup`
`Tests  26 passed (26)`; `test:guides` `Tests  83 passed (83)`. Every leg reports
`Test Files  1 passed (1)` except `test:src`.

## Acceptance criteria

1. **Met.** `npx --no-install scaffold audit` at exit reports only
   `dependencies: typescript declares major 6, while the registry serves major 7.` and
   `0 of 126 planned paths drifted from the plan. Audit compared bytes at 115, existence at 5, and nothing at 6. The plan does not own 7 further paths beneath its groups.`
   No `setup:` line and no `scripts:` line.
2. **Met.** Every gate closes green, each read bare — see the preceding table.
3. **Met.** One mutation control per proof file (one file, one control), failing line reported,
   restored.

## Observations

Two doc comments in `tests/setup.ts` state facts the module's own data contradicts. The module is
off-limits to this unit, so the proof asserts the real behavior and these stand as findings for
whoever owns that file.

- `INTEGER_KEY_SUBJECT`'s comment claims `Object.keys` yields
  `['1', '2', '10', 'id', 'zeta', 'alpha']`. The real order is
  `['1', '2', '10', 'zeta', 'id', 'alpha']`: `zeta` is authored before `id`, and ordinary string
  keys enumerate in insertion order. This is the contract the mutation control broke and restored.
- `TRICKY_KEYS`'s comment claims a combining-sequence key and an NFC-labile `Å` ANGSTROM SIGN. The
  authored bytes are `é` U+00E9 (precomposed) and `Å` U+00C5 (LATIN CAPITAL LETTER A WITH RING
  ABOVE), both already NFC-stable, so neither key exercises normalization. Verified by reading the
  file's code points and by `'Å'.normalize('NFC') === 'Å'` returning `true`. The proof therefore
  asserts the membership consumers rely on — prototype-pollution names, the empty key, the dotted
  key, an astral key — and makes no normalization claim.

The unit ran no git state change and committed nothing.

## Deviation state

None. No deviation condition fired: every export of `tests/setup.ts` is provable under the fixed
shape in the Node `setup` project, and no gate failed for a cause outside the owned files.
