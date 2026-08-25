# Unit VISIT-qualifier — report

Setup proof landed, `test:guides` and the `test` chain adopted, `scaffold repair` clean, every gate
green. Not committed.

## The advisory as taken

`npx --no-install scaffold audit` at `/home/user/orkestrel/qualifier`, before any edit:

```text
scripts: The manifest at . declares a planned script with a differing value: test:guides. Keep the declared value unchanged or replace it with the planned value: "test:guides" declares "vitest run --config vite.config.ts --reporter=dot --project guides"; planned "vitest run --config vite.config.ts --no-cache --reporter=dot --project guides".
setup: The target at . carries a test setup module that no proof covers: tests/setup.ts. Add tests/setup.test.ts to cover it. The proof's subject is behavior only this workspace can assert, so scaffold does not write it.
dependencies: typescript declares major 6, while the registry serves major 7.
```

The `setup:` advisory named one module, `tests/setup.ts`, so the proof work list was one file:
`tests/setup.test.ts`. The `dependencies:` advisory is the fleet-wide one the brief scoped out.

At exit the audit reports no `setup:` advisory and no `scripts:` advisory. Only
`dependencies: typescript declares major 6, while the registry serves major 7.` remains, plus the
foreign `orkestrel-human-journey`, `.claude/agents/codex.md`, and `.codex/agents/claude.toml` rows
the Orchestrator removes at commit.

## Touched files

| File                             | Change                                                                          |
| -------------------------------- | ------------------------------------------------------------------------------- |
| `tests/setup.test.ts`            | New. The `setup` project's proof of the exported behavior of `tests/setup.ts`   |
| `package.json`                   | `test:guides` planned value, `test:setup` from `repair`, `test:setup` in `test` |
| `vite.config.ts`                 | `setup` project written by `repair` and registered in the project list          |
| Vendored orchestration file set  | Rewritten by `repair` at scaffold 0.0.52                                        |
| `package-lock.json`              | Arrived dirty from the pre-dispatch re-pin; untouched by this unit              |

Diffstat over the tracked tree:

```text
 37 files changed, 690 insertions(+), 750 deletions(-)
```

`tests/setup.test.ts` is untracked, so it sits outside that stat. Its own size is 337 lines. The
tracked rows the unit decided rather than inherited are `package.json` (9 changed lines) and
`vite.config.ts` (13 changed lines); the remaining rows are `repair` output and the re-pin.

## What the proof asserts

`tests/setup.test.ts` derives its fixture population from the module's own exports rather than from
a written list: `collectDefinitionBuilders` calls every zero-argument export and keeps the ones
`isQualificationDefinition` accepts. A builder added to `tests/setup.ts` later joins every
definition case without an edit here, and each such case asserts its population is non-empty so it
reddens rather than passing vacuously.

Cases, by the contract each one pins:

- **`closes a cycle a structural walk meets`** — `buildCyclicRecord` returns `id: 'cycle'` with
  `record.self === record`. The cycle is confirmed by `JSON.stringify` throwing `TypeError`, a
  detection route the builder does not share.
- **`nests one level per requested depth above a leaf`** — `buildDeepRecord(200)` carries exactly
  200 `nested` links above `{ value: 'leaf' }`. 200 is the depth
  `tests/src/core/validators.test.ts` drives the guards with. The walk and a `"nested"` count over
  the serialized form are independent routes to the same number.
- **`returns the bare leaf at zero depth`** — the zero boundary returns the leaf with no link.
- **`builds a prototype-free record without polluting the shared prototype`** —
  `buildHostileRecord` returns a null-prototype record carrying `id: 'hostile'`, so `'toString' in
  record` and `'hasOwnProperty' in record` are false and a guard walking the prototype chain
  reaches nothing. `Object.hasOwn(Object.prototype, 'polluted')` stays false, which is what keeps
  the builder's `__proto__` literal from reaching every other suite.
- **`exports a qualification definition builder`** — the derived population is non-empty.
- **`points every ruling at a logical rule its own definition declares`** — every ruling's `pass`
  resolves to a declared pass, that pass is logical, and its `rule` resolves to a rule that pass
  declares. Ruling ids and rule ids are authored in separate places, so they can disagree.
- **`reads a prior pass only after that pass is declared`** — every field path rooted at
  `QUALIFICATION_KEY` names either the reading pass itself or a pass declared earlier. Paths come
  from `extractAtoms` over each rule's premises and conclusion and from each factor's field source;
  the namespace token comes from the exported `QUALIFICATION_KEY` rather than a literal.
- **`names a declared pass in every qualification message placeholder`** — every
  `{{qualification.X}}` placeholder in a ruling message names a pass that definition declares.
- **`returns an equal but unshared definition on every call`** — repeated calls return values that
  serialize identically and share neither the definition object nor its `passes` array, so one
  suite's use cannot reach another's.
- **`fails every pass with the same trace and error`** — `createFailingEngine` returns
  `success: false` with `trace: ['engine trace']` and `errors: ['engine boom']` for a quantitative
  pass, an identical result for a logical pass, one failed result per subject on the batch call
  (length derived from the input array), and the same result after `destroy()`.
- **`claims support and validity while holding no reasoner`** — `supports` reports true for
  `logical` and for `symbolic`, `validate` reports valid with no errors and no warnings, and
  `reasoners()` stays empty and `reasoner('quantitative')` stays undefined even after `register`.
  This is what keeps a querying consumer on the path to the fixed failure.
- **`accepts a browser Vue path spelled with a forward slash or a backslash`** — the same segment
  list joined with `/` and with `\` both accept.
- **`refuses a sibling environment and a prefix lookalike`** — `app/core/...`, `src/browser/...`,
  the prefix lookalike `app/browserless/...`, and a `vendor/`-anchored copy of the accepting path
  all refuse.

Nothing here re-proves production behavior. What the guards and the qualifier do with these
fixtures stays in `tests/src/core/validators.test.ts` and `tests/src/core/Qualifier.test.ts`.
`describe`, `it`, and `expect` do not enter `tests/setup.ts`; the proof imports the module and
asserts. The module is host-independent, so the `setup` project's Node environment with the browser
disabled reaches every contract it exports — no browser or service split applies.

## Mutation control

One control for the one proof file, run against the final file after the lint-driven restructure.

**Mutation.** In `reads a prior pass only after that pass is declared`, the inspected input became a
copy with its passes reversed: `inspectPassReads({ ...definition, passes: [...definition.passes].reverse() })`.

**Failing line** from `npm run test:setup`:

```text
 FAIL  |setup| tests/setup.test.ts > qualification fixtures > reads a prior pass only after that pass is declared
```

The report named the reversed fixtures specifically — `buildCapExcessGatesDefinition` reporting
`pass gates reads pass excess before it is declared` and `pass excess reads pass cap before it is
declared`, and `buildEvidenceSnapshotDefinition` reporting `pass p2 reads pass p1 before it is
declared` — with `Tests  1 failed | 12 passed (13)`. The mutation was reverted and the project
returned to `Tests  13 passed (13)`.

## The visit

Order run, exactly as the brief fixes it:

1. `npm pkg set 'scripts.test:guides=vitest run --config vite.config.ts --no-cache --reporter=dot --project guides'`.
2. `npx --no-install scaffold repair` blocked, as expected:
   `TARGET: The configs group is blocked because the manifest at . does not reach a Vitest project the planned configuration registers: setup. No chain from test or prepublishOnly invokes it. test:setup is already declared, so the gate is missing rather than the script: invoke it by name from the test or prepublishOnly chain.`
3. `npx --no-install scaffold repair --groups manifest` wrote `test:setup`
   (`1 written, 1 unchanged, 0 removed in ..`).
4. `npm pkg set 'scripts.test=npm run test:src && npm run test:policy && npm run test:config && npm run test:setup && npm run test:guides'`.
   The placement matches the installed scaffold's compiler, which emits `test:setup` between
   `test:config` and `test:guides` in `scripts.test`.
5. `npx --no-install scaffold repair` ran clean: `49 written, 78 unchanged, 0 removed in ..`. It
   added the `setup` project to `vite.config.ts` and registered it in the project list. A second
   `repair` reported `0 written, 127 unchanged, 0 removed in ..`, so the result is idempotent.
6. `npm run format`.

**Retained differing values `repair` named.** None. The first full `repair` named only the blocked
`configs` group quoted earlier, and that block cleared once the `test` chain invoked `test:setup`.
The one differing script value was the `test:guides` advisory the audit reported, adopted at step 1
as the brief directs. No other script value was adopted.

## Gates

Each run bare from `/home/user/orkestrel/qualifier`, closing line and exit code:

| Gate                   | Closing line                                                    | Exit |
| ---------------------- | --------------------------------------------------------------- | ---- |
| `npm run format:check` | `Finished in 2874ms on 141 files using 4 threads.`              | 0    |
| `npm run lint:check`   | no diagnostics printed                                          | 0    |
| `npm run check`        | `tsc --noEmit -p configs/src/tsconfig.core.json`, no output     | 0    |
| `npm run build`        | `Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts` | 0    |
| `npm test`             | see the per-project table that follows                          | 0    |

`format:check` also printed `All matched files use the correct format.` The `npm test` chain, by
project:

```text
> @orkestrel/qualifier@0.0.11 test:src
      Tests  167 passed (167)
> @orkestrel/qualifier@0.0.11 test:policy
      Tests  93 passed (93)
> @orkestrel/qualifier@0.0.11 test:config
      Tests  46 passed (46)
> @orkestrel/qualifier@0.0.11 test:setup
      Tests  13 passed (13)
> @orkestrel/qualifier@0.0.11 test:guides
      Tests  18 passed (18)
```

## Deviations

None. Every export of `tests/setup.ts` was provable under the fixed shape, and no gate failed.

## Observations, not criteria

- **`isBrowserVuePath` has no consumer in this workspace.** A search of `tests/**/*.ts` for the name
  found only its declaration in `tests/setup.ts` and the cases in the new proof. The brief fixes its
  proof shape, so it is proven; whether the export earns its place in a repository with no `app`
  tree is a question for whoever owns `tests/setup.ts`, which this unit does not.
- **`buildHostileRecord`'s `__proto__` literal is inert.** In
  `Object.assign(Object.create(null), { id: 'hostile', __proto__: { polluted: true } })` the
  `__proto__` key sets the source literal's own prototype rather than becoming an own property, and
  `Object.assign` copies own enumerable properties only. The returned record therefore carries `id`
  alone, measured directly: own property names `['id']`, prototype `null`, `polluted` undefined,
  `Object.hasOwn(record, '__proto__')` false. The hostility a guard meets is the null prototype, not
  a hostile key. The proof asserts the null prototype and the absence of pollution — the properties
  that hold whatever the builder's internals become — and deliberately does not pin
  `Object.hasOwn(record, '__proto__')` to false, so attaching a real hostile own key later would not
  redden a case that is not about it. `tests/setup.ts` is off-limits to this unit; the doc comment
  reading "carrying hostile keys" overstates what the builder produces.
- **`repair` reported `test:setup is already declared` while it was not.** The blocked-`configs`
  message named `test:setup` as declared at a moment when `npm pkg get scripts` showed no such key
  and `git status` showed no manifest write. The remedy the message gives is still the right one, so
  this cost nothing here, but the sentence is false as printed and would mislead an operator who
  trusted it instead of reading the manifest. Raise it against scaffold, not against this target.

## Scope honesty

Files written: `tests/setup.test.ts` (authored), `package.json` (the `test:guides` value, the `test`
chain, and what `repair` regenerated), `vite.config.ts` and the vendored orchestration set (`repair`
output). `src/**`, `guides/**`, `tests/setup*.ts`, and every other test file are untouched. No git
state-changing command ran and nothing was committed. The throwaway probe used to measure
`buildHostileRecord` and `buildDeepRecord` before writing the assertions lived at
`tmp/probe/setupshape.test.ts` and was deleted; `tmp/` now holds `units/` only.
