## Fix round 1

Closes `relation-obj` round-1 findings F1 and F2 from `units/l3/relation-objective-r1.md`.

### F2 — the parsed descriptors, `tests/src/core/helpers.test.ts`

Each of the four sites now reads:

| Site (line) | Now |
| --- | --- |
| `:121` | `const column: unknown = JSON.parse('{"column": 42}')` |
| `:122` | `const through: unknown = JSON.parse('{"through": 7, "source": "s", "target": "t"}')` |
| `:123` | `const relationship: unknown = JSON.parse('{"relationship": "sideways", "column": "aId"}')` |
| `:131` (former, now removed) | its `resolveRelation` call is gone; see below |

No `: Relation =` annotation follows a parse (`grep -n 'JSON.parse' tests/src/core/helpers.test.ts` shows only the three `: unknown` bindings). The `Relation` type import was dropped from the file as unused.

The `it('throws INVALID when a descriptor member holds the wrong type', …)` case is replaced by
`it('refuses a descriptor whose member holds the wrong type', …)`: it binds each parse at `unknown`
and asserts `expect(isRelationDescriptor(value)).toBe(false)` for each of the three shapes, with no
`resolveRelation` call — the type checker refuses every literal `Relation` value that carries a
wrong-typed member (`column`, `through`, and `relationship` are each typed narrowly in
`RelationDescriptor` / `Relationship`), so no such value can reach `resolveRelation` without an
annotation trick. The surrounding comment states this as the reason the guard's refusal is the
proof.

The `it('reports INVALID as the code of the error a malformed member throws', …)` case is replaced by
`it('reports INVALID as the code of the error an unresolvable descriptor throws', …)`, using
`resolveRelation('a', {})` — an empty object is assignable to `Relation` with no annotation trick and
is malformed at runtime because `resolveRelation` cannot infer a relationship from a descriptor with
every optional member absent. That throw case, per the ruling, is the one this signature admits;
no site needed a new `tests/src/core/validators.test.ts` guard case, because the equivalent
wrong-typed-member shapes (`{ column: 42 }`, `{ through: 7, source, target }`,
`{ relationship: 'sideways', column: 'accountId' }`) are already asserted false there.

The deviation contract's stop condition — no value assignable to `Relation` reaches the `INVALID`
throw at all — did not fire: `{}` is that value.

Plant and captures, over `isRelationDescriptor`'s member-type check in `src/core/validators.ts`
(commented out, then restored by editing; `git diff -- src/core/validators.ts` after restore matches
the diff before the plant):

- `/home/user/work/evidence/relation-proofs/fix1-guard-red.txt` — 2 test files failed, 3 tests failed
  of 65, including the new `helpers.test.ts` guard case and two pre-existing
  `validators.test.ts` cases the same disabled loop backs.
- `/home/user/work/evidence/relation-proofs/fix1-guard-green.txt` — 5 test files passed, 65 tests
  passed, plant removed.

### F1 — the sweep record

`report.md:120`'s § Sweeps row for `§` is rewritten to the pattern that proves the old numbered form
gone: `AGENTS §[0-9]|\(§[0-9]|§[0-9]+`, case-insensitive, over `src`, the non-vendored `tests`,
`guides/relation.md`, `guides/README.md`, and `README.md`. The run (`grep -rniE` over that
population) returned no hits — table row updated to state the pattern and the empty result directly,
in place of the earlier "empty in the package's own files; remaining hits are vendored dependency
guides" wording that did not name what proved the old form gone.

A line beneath the sweep table now records the retained named-rule citation form (for example
`` `.claude/rules/documentation.md` § Parity ``, which the numbered pattern does not match) at
`guides/relation.md:105`, `:133`, `:138`, `:140`, and `guides/README.md:3`.

### Gates

| Gate | Command | Exit |
| --- | --- | --- |
| format | `npm --prefix /home/user/fleet/relation run format:check` | 0 |
| lint | `npm --prefix /home/user/fleet/relation run lint:check` | 0 |
| check | `npm --prefix /home/user/fleet/relation run check` | 0 |
| build | `npm --prefix /home/user/fleet/relation run build` | 0 |
| test | `npm --prefix /home/user/fleet/relation test` | 0 |

`npx scaffold audit --offline` (run from `/home/user/fleet/relation`): "0 of 34 planned paths drifted
from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6."

`node /home/user/scaffold/tmp/work/evidence.mjs relation` regenerated
`/home/user/work/evidence/conform-relation.diff` and `.status` against the tree carrying this
round's edits.

`git -C /home/user/fleet/relation status --short` lists only the conform-relation unit's paths:
`README.md`, `guides/README.md`, `guides/relation.md`, `src/core/Model.ts`,
`src/core/RelationManager.ts`, `src/core/errors.ts`, `src/core/helpers.ts`, `src/core/types.ts`,
`src/core/validators.ts` (content identical to before the plant), `tests/guides.test.ts`,
`tests/setup.test.ts`, `tests/setup.ts`, `tests/src/core/Model.test.ts`,
`tests/src/core/helpers.test.ts`, `tests/src/core/validators.test.ts`.

### Deviations

None. The plant required a transient edit to `src/core/validators.ts`, off-limits under this round's
Scope; F2's row explicitly names the plant-capture-restore cycle and its two artifact files, and the
edit was reverted by editing before any gate ran, verified byte-identical against the pre-plant
`git diff`.
