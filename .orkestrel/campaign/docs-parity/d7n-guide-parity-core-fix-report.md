# Guide parity composition report

## Outcome

Implemented the accepted host-independent Guide parity composition in
`C:/Users/mikes/WebstormProjects/guide`. The source project, focused defect proof,
focused core suite, full core test project, scoped lint check, scoped format check,
and Guide self-parity project passed before handoff. Root owns the ordered gate,
build, local pack, scaffold adoption, and independent review.

## Product changes

- `src/core/types.ts` defines `DriftCategory`, the required `Drift.category`, and
  the readonly Parity option, row, finding, report, direction, change, rewrite,
  and interface contracts.
- `src/core/constants.ts` publishes frozen drift categories with assertion-free
  literal typing. The existing export-keyword population now uses the same
  assertion-free form because this owned file could not retain a prohibited type
  assertion.
- `src/core/helpers.ts`, `src/core/shapers.ts`, `src/core/validators.ts`, and
  their focused tests carry explicit drift categories through computation,
  contract shaping, guarding, generation, and examples.
- `src/core/Parity.ts` implements pure row composition, grouped inspection, and
  guide- or source-directed inventory rewrites. It accumulates changes by path,
  returns changed texts only, rechecks unresolved drift against accumulated
  output, and leaves caller inputs unchanged.
- `src/core/factories.ts` publishes `createParity`. `src/core/index.ts` exports
  `Parity` through the sole core barrel.
- `tests/setup.ts` supplies a real Guide, Source, and Markdown-backed parity
  fixture. `tests/src/core/Parity.test.ts` covers report subjects, categorized
  key collisions, repeated-title behavior, absent languages, source-file
  accumulation, changed-only output, missing specs, missing guide targets, safe
  source refusal, and caller-inventory preservation.
- `tests/guides.test.ts` routes the generic self-parity families through
  `Parity.inspect()`. The README API check, paired-title population guard, and
  executed flagship examples remain package-specific.
- `guides/guide.md` documents the new contracts, constant, factory, class,
  methods, categorized drift output, and in-memory composition example.

## Markdown and source reuse

The implementation reuses Guide's parsed `GuideFence` views and Source's parsed
`SourceExample` views. Targeted guide writes stay in `replaceCell` and
`replaceFence`, which use `@orkestrel/markdown` parsing, node provenance, spans,
and rendering. Targeted source writes stay in `locateComment`, `replaceSummary`,
`replaceExample`, and `spliceSpan`. The implementation uses `collectTitles` and
`collectExamples` for pairing and does not add a Markdown regex parser, a whole
guide renderer, a format/split round trip, filesystem access, or host imports.

## Defect proof

The retained red output is
`C:/Users/mikes/WebstormProjects/guide/tmp/d7n-parity-core/red.log.txt`.

Command:

```text
npm run test:src:core -- tests/src/core/Parity.test.ts
```

Before implementation, the command exited `1`:

```text
Test Files  1 failed (1)
Tests       1 failed (1)
```

The failure was `publishes the parity composition factory`; the observed value
was `false` and the required value was `true`.

The retained green output is
`C:/Users/mikes/WebstormProjects/guide/tmp/d7n-parity-core/green.log.txt`.

After implementation, the same command exited `0`:

```text
Test Files  1 passed (1)
Tests       9 passed (9)
```

## Scoped validation

`npm run check:src:core` exited `0`.

`npm run test:src:core` exited `0`:

```text
Test Files  9 passed (9)
Tests       636 passed (636)
```

The focused related run exited `0`:

```text
npm run test:src:core -- tests/src/core/helpers.test.ts tests/src/core/shapers.test.ts tests/src/core/validators.test.ts tests/src/core/factories.test.ts tests/src/core/Parity.test.ts
Test Files  5 passed (5)
Tests       526 passed (526)
```

`npm run test:guides` exited `0`:

```text
Test Files  1 passed (1)
Tests       34 passed (34)
```

The scoped lint command exited `0`:

```text
.\node_modules\.bin\oxlint.cmd --config .oxlintrc.json --deny-warnings src/core/types.ts src/core/constants.ts src/core/helpers.ts src/core/shapers.ts src/core/validators.ts src/core/factories.ts src/core/index.ts src/core/Parity.ts tests/setup.ts tests/src/core/Parity.test.ts tests/src/core/helpers.test.ts tests/src/core/shapers.test.ts tests/src/core/validators.test.ts tests/src/core/factories.test.ts tests/guides.test.ts
```

The scoped format check exited `0`:

```text
.\node_modules\.bin\oxfmt.cmd --config .oxfmtrc.json --check src/core/types.ts src/core/constants.ts src/core/helpers.ts src/core/shapers.ts src/core/validators.ts src/core/factories.ts src/core/index.ts src/core/Parity.ts tests/setup.ts tests/src/core/Parity.test.ts tests/src/core/helpers.test.ts tests/src/core/shapers.test.ts tests/src/core/validators.test.ts tests/src/core/factories.test.ts tests/guides.test.ts guides/guide.md
All matched files use the correct format.
```

`git diff HEAD --check` produced no diagnostics.

The registered Probe capability appeared in tool metadata. Its invocation failed
before the case ran with `TypeError: tools.mcp__probe__prove is not a function`.
No Probe receipt is claimed. Permanent real-project controls provide the retained
proof instead.

## Diff and status evidence

`git status --short` at handoff:

```text
 M guides/guide.md
AM src/core/Parity.ts
 M src/core/constants.ts
 M src/core/factories.ts
 M src/core/helpers.ts
 M src/core/index.ts
 M src/core/shapers.ts
 M src/core/types.ts
 M src/core/validators.ts
 M tests/guides.test.ts
 M tests/setup.ts
AM tests/src/core/Parity.test.ts
 M tests/src/core/factories.test.ts
 M tests/src/core/helpers.test.ts
 M tests/src/core/shapers.test.ts
 M tests/src/core/validators.test.ts
```

`git diff HEAD --numstat` at handoff:

```text
150 101 guides/guide.md
462 0 src/core/Parity.ts
8 1 src/core/constants.ts
14 1 src/core/factories.ts
14 5 src/core/helpers.ts
1 0 src/core/index.ts
3 2 src/core/shapers.ts
134 1 src/core/types.ts
7 2 src/core/validators.ts
33 136 tests/guides.test.ts
144 1 tests/setup.ts
201 0 tests/src/core/Parity.test.ts
1 1 tests/src/core/factories.test.ts
35 12 tests/src/core/helpers.test.ts
13 4 tests/src/core/shapers.test.ts
12 3 tests/src/core/validators.test.ts
```

`src/core/Parity.ts` and `tests/src/core/Parity.test.ts` entered the index while
the unit was active. This role made no Git mutation. The actor is unknown. Root
confirmed that the index additions are limited to these new paths and directed
the role to preserve the state. No checkout, reset, restore, or restaging ran.
No unexpected source-content change was observed.

## Integration needs

- Decide whether to add a direct duplicate-source-title control after the running
  root gate. The implementation selects sorted source paths and the earliest
  matching comment span, and existing Source/helper tests cover source ordering,
  but the new Parity suite does not plant duplicate titled source sites and assert
  the selected path. The brief names this rule for a permanent pin.
- Run the root-owned ordered Guide gate carrier and inspect its exact output.
- Build Guide to produce declarations and runtime artifacts for the local pack.
- Apply root's temporary future-range overlay only for local packing, then restore
  the canonical manifest and lock bytes exactly.
- Install the provisional Guide archive into scaffold, land scaffold adoption,
  and run the integrated parity and package gates.
- Run the independent review over the integrated Guide and scaffold diffs before
  any product commit or publication.

No manifest, lock, dependency, version, configuration, launcher, scaffold product,
build output, package archive, commit, push, or publication was changed by this
unit. Shared-file patches: none.
