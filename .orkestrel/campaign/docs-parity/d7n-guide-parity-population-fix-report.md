# Guide parity population fix report

## Outcome

Implemented the reconciled parity population boundary in canonical Guide. The
public report now preserves independent caller-selectable populations without
changing `ParityOptions` or rewrite behavior.

Root owns the ordered package gates, build, pack, downstream archive adoption,
and independent Astra review. This role does not accept its own work.

## Owned changes

- `src/core/types.ts` adds `ParityExampleReport`; makes
  `ParityFinding.spec` optional; adds `sections` and `declarations` to
  `ParityReport`; and replaces the flat `examples` findings with `fences`,
  `functions`, `methods`, and `titles` groups.
- `src/core/Parity.ts` reports required headings, absent documented method-group
  populations, exact documented-group membership, source-driven behavioral
  declarations, configured-language fence presence, separate function and method
  evidence, and top-level title intersection per manifest row.
- `src/core/Parity.ts` uses `Guide.sections()` with `SURFACE`, `METHODS`, and
  `TESTS`. It uses cached Guide/Source projections and does not add Markdown or
  source-language parsing.
- Declaration comparison sorts copied name lists and compares their serialized
  arrays through a shared class method. Duplicate documented names remain visible.
  Behavioral declarations with no reflected methods stay outside the population.
  A class with a declared `${name}Interface` is compared exactly with that
  interface; another behavioral declaration owes its own method table.
- Title presence compares guide fence titles with `row.source.examples()` titles
  without filtering by language. Member examples and `collectTitles` remain in
  their existing example-evidence and drift roles.
- Workspace findings omit `spec`; indexed findings retain their inventory key.
- `tests/src/core/Parity.test.ts` carries permanent controls for the separated
  populations, required sections, absent and empty method groups, per-guide title
  scope, unequal paired examples, exact duplicate membership, class/interface
  mismatch, memberless class exclusion, missing indexed specs, and the prior
  rewrite invariants.
- `tests/guides.test.ts` asserts `report.input` before its row assertions,
  preserves the package-row existence check, and selects Guide's function,
  method, and own-spec title groups. It does not select scaffold's sections,
  declarations, or configured-language presence policies.
- `guides/guide.md` aligns the public type and method tables with the corrected
  report shape and removes prose counts from the touched Parity summaries.

No helper, constant, setup-fixture, factory, barrel, README, manifest, lock,
dependency, version, configuration, launcher, installed package, or scaffold
product path changed in this successor.

## Retained defect proof

Exact command:

```text
npm run test:src:core -- tests/src/core/Parity.test.ts
```

The pre-fix run exited `1`:

```text
Test Files  1 failed (1)
Tests       7 failed | 8 passed (15)
```

The original tool reading has chunk id `079932`. The completed command did not
issue a terminal session id. Its output showed the prior flat examples array,
missing sections and declarations groups, the empty-string workspace spec, and
absent independent example populations.

Evidence paths:

- `C:/Users/mikes/WebstormProjects/guide/tmp/d7n-parity-population/red.log.txt`
  retains the command summary.
- `C:/Users/mikes/WebstormProjects/guide/tmp/d7n-parity-population/red.raw.log.txt`
  retains the assertion excerpts and measured result. The tool reading identified
  above remains the authoritative complete stream.

After the fix, the same command exited `0`:

```text
Test Files  1 passed (1)
Tests       16 passed (16)
```

Green evidence is retained at
`C:/Users/mikes/WebstormProjects/guide/tmp/d7n-parity-population/green.raw.log.txt`.

## Scoped validation

Raw scoped output is retained at
`C:/Users/mikes/WebstormProjects/guide/tmp/d7n-parity-population/scoped.log.txt`.

- `npm run check:src:core` exited `0`.
- `npm run test:src:core -- tests/src/core/Parity.test.ts` exited `0` with
  `Test Files 1 passed (1)` and `Tests 16 passed (16)`.
- `npm run test:src:core -- tests/src/core/factories.test.ts` exited `0` with
  `Test Files 1 passed (1)` and `Tests 8 passed (8)`.
- `npm run test:guides` exited `0` with `Test Files 1 passed (1)` and
  `Tests 37 passed (37)`.
- Scoped Oxlint exited `0` without diagnostics.
- Scoped Oxfmt check exited `0` with `All matched files use the correct format.`
- `git diff HEAD --check` exited `0` without diagnostics.

The registered Probe call was applicable to optional `ParityFinding.spec`. The
tool returned:

```text
Mcp error: -32000: Legacy protocol 2025-11-25 cannot represent a stream result
```

No case/control result or receipt was returned. The exact refusal is retained at
`C:/Users/mikes/WebstormProjects/guide/tmp/d7n-parity-population/probe.log.txt`.

## Diff and checkout status

The canonical checkout remains on the campaign branch. The cumulative dirty
status at handoff is:

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

The cumulative `git diff HEAD --numstat` readings for successor-owned paths are:

```text
151 101 guides/guide.md
593 0 src/core/Parity.ts
152 1 src/core/types.ts
47 156 tests/guides.test.ts
374 0 tests/src/core/Parity.test.ts
```

These readings include the earlier retained parity core and source-site work.
The externally staged paths remain:

```text
src/core/Parity.ts
tests/src/core/Parity.test.ts
```

This role made no Git mutation and preserved the index state.

## Root integration needs

- Run the authoritative ordered Guide gates and inspect their exact output.
- Build Guide so the new public report declarations enter the provisional archive.
- Pack and install that archive through root's guarded metadata-overlay carrier.
- Run scaffold's population successor against the installed artifact.
- Run the integrated objective audit and the owner's independent Astra review.

No unresolved owned-scope conflict remains. The new public declaration requires
root's build for downstream artifact consumption; source checks need no declaration
refresh.
