# Guide parity leaf extraction report

## Outcome

Moved the confirmed stateless parity computations from private `Parity` methods
to exported helpers. `Parity` now consumes those helpers directly and retains its
row traversal, inspection accumulation, rewrite accumulation, reader composition,
and replacer composition.

Corrected the Guide direction paragraph. The caller's named destination now
governs summaries and examples alike: `guide` copies source text into the guide,
and `source` copies guide text into the source.

Root owns ordered gates, rebuild, pack, downstream archive replacement, supported
mirror refresh, and independent correction review. This role does not accept its
own work.

## Bounded outcome and ownership

- `src/core/helpers.ts` exports `compareMembership`, `identifyDrift`, `formatSide`,
  and `formatDrift`. Each helper computes only from its arguments.
- `compareMembership` returns a `ParityFinding` or `undefined`. It sorts copied
  populations, preserves duplicates, and retains the existing diagnostic text.
- `identifyDrift` retains the inventory-key, category, and compared-key identity
  separated by line feeds.
- `formatSide` retains the distinction between `undefined`, an empty string, and
  present text. `formatDrift` composes that helper without changing output.
- `src/core/Parity.ts` appends returned membership findings and calls the exported
  identity and formatting helpers directly. No private forwarding method remains.
- `tests/src/core/helpers.test.ts` directly discriminates matching and differing
  membership, duplicate membership, category identity, absent, empty, and present
  side text, and drift formatting.
- `guides/guide.md` documents the supported signatures, summaries, and examples.
  Its direction paragraph now matches the existing explicit rewrite behavior.

The existing `src/core/index.ts` star export already exposes `helpers.ts`, so this
successor did not edit the barrel. No reusable type was absent, so it did not edit
`src/core/types.ts`. No manifest, lock, dependency, version, setup, Parity test,
script policy, installed package, scaffold product, or other package path changed.

## Retained defect proof

The exact command was:

```text
npm run test:src:core -- tests/src/core/helpers.test.ts
```

Before implementation, the command exited `1`:

```text
Test Files  1 failed (1)
Tests       1 failed | 440 passed (441)
```

The permanent proof failed because `compareMembership` was absent from the public
helper exports. The tool result has chunk id `c4c2e0`; the completed command did
not issue a terminal session id. Raw output is retained at
`C:/Users/mikes/WebstormProjects/guide/tmp/d7n-parity-leaves/red.raw.log.txt`.

After implementation, the same command exited `0`:

```text
Test Files  1 passed (1)
Tests       444 passed (444)
```

The focused green tool result has chunk id `f9ebd5`. Raw output is retained at
`C:/Users/mikes/WebstormProjects/guide/tmp/d7n-parity-leaves/green.raw.log.txt`.
The final carrier repeated the command on formatted source with the same passing
result.

## Scoped validation

The saved carrier is
`C:/Users/mikes/WebstormProjects/guide/tmp/d7n-parity-leaves/validate.sh`.
It sources `C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh` and ran
through the explicit Git Bash executable at
`C:/Users/mikes/scoop/apps/git/current/bin/bash.exe`.

The final carrier exited `0` with tool chunk id `70aca6`:

- `npm run check:src:core` passed without diagnostics.
- `npm run test:src:core -- tests/src/core/helpers.test.ts` passed with
  `Tests 444 passed (444)`.
- `npm run test:src:core -- tests/src/core/Parity.test.ts` passed with
  `Tests 16 passed (16)`.
- `npm run test:guides` passed with `Tests 37 passed (37)`.
- Scoped Oxlint passed without diagnostics.
- Scoped Oxfmt check reported `All matched files use the correct format.`
- Scoped `git diff HEAD --check` passed without diagnostics.

The authoritative carrier output is retained at
`C:/Users/mikes/WebstormProjects/guide/tmp/d7n-parity-leaves/scoped.final.raw.log.txt`.
The earlier `scoped.raw.log.txt` records a PowerShell stderr-redirection wrapper
that returned exit `1` after the internal script reached its final successful
check. It is not acceptance evidence.

After freeze, root's package-wide `check` gate reported `TS2379` at
`tests/src/core/helpers.test.ts:133`. The drift-format fixture supplied
`source: undefined`, while the exact optional `Drift.source` property requires
omission. The scoped `check:src:core` command did not typecheck tests. Root owns
the authorized fixture-only omission and its retained diagnostic; this role made
no post-freeze product or test edit.

The registered Probe call named `configs/src/tsconfig.core.json`, a passing helper
consumer, and a TypeScript control that supplied a numeric membership value. The
tool returned:

```text
Mcp error: -32000: Legacy protocol 2025-11-25 cannot represent a stream result
```

No case/control result or receipt was returned. The refusal is retained at
`C:/Users/mikes/WebstormProjects/guide/tmp/d7n-parity-leaves/probe.log.txt`.

## Diff and checkout status

The successor touched these product and test paths:

```text
guides/guide.md
src/core/Parity.ts
src/core/helpers.ts
tests/src/core/helpers.test.ts
```

The cumulative `git diff HEAD --numstat` readings for those paths are:

```text
193 106 guides/guide.md
569 0 src/core/Parity.ts
101 5 src/core/helpers.ts
86 12 tests/src/core/helpers.test.ts
```

Those readings include the retained parity core, source-site, and population work.
The full cumulative checkout status at freeze is:

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

The externally staged paths remain:

```text
src/core/Parity.ts
tests/src/core/Parity.test.ts
```

This role made no Git mutation and preserved the index. No shared-file patch is
required.

## Root integration needs

- Run the authoritative ordered Guide gates and inspect their exact output.
- Rebuild and pack Guide through the guarded root carrier.
- Replace the provisional Guide archive in scaffold without saving metadata.
- Refresh the Guide mirror through `Materializer.mirror`.
- Run the affected scaffold chain and independent correction review.
- Apply and verify root's authorized omission of the explicit undefined fixture
  property before the ordered Guide chain resumes.

Source is frozen at this report. The root-owned fixture correction remains before
package acceptance.
