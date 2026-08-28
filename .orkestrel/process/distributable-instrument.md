# Instrument: does the move change the distributable

## Question

Does relocating `execute`, `executeSync`, and `detach` from `src/server/execution/` into
`src/server/helpers.ts` change what a consumer installs, and does that oblige a republish.

## Instrument

Byte comparison of the built artifacts against the artifact consumers actually hold: the
`@orkestrel/process@0.0.8` tarball fetched from the registry on 2026-08-28 and unpacked at
`tmp/baseline/package/`. Compared files are `dist/src/{core,server}/index.{js,cjs,d.ts}`.
Sourcemaps are excluded, per the bump rule's material-content test.

Coverage: this instrument reads the packed artifact's emitted bytes. It does not read runtime
behaviour, and it does not read the `files` list or the `exports` map, which
`tests/distribution.test.ts` owns.

## Controls

Positive control — the baseline reproduces. Building the unmodified tree at `HEAD` produced
`dist/src/{core,server}/index.{js,cjs,d.ts}` byte-identical to the published 0.0.8 tarball. So the
toolchain is not itself drifting the artifact, and any later difference is caused by the change.

Determinism control — rebuilding the unmodified tree a second time reproduced every artifact
byte-for-byte, `index.js.map` included. So the comparison carries no build nondeterminism.

Location control — an isolated copy of the tree outside the repository, built against the same
`node_modules`, reproduced the baseline byte-for-byte. So the measurement is not sensitive to
where the tree sits.

Negative control — the instrument must be able to report a difference. Appending one exported
function to `src/server/helpers.ts` in the isolated copy and rebuilding reported `DIFFERS` for
both `src/server/index.js` and `src/server/index.d.ts`. The control was drawn from outside the
population the measurement covers: it adds a declaration rather than relocating one, so it tests
the instrument against the class of change the measurement is not making. Both directions of the
instrument are therefore certified.

## Reading, from the relocation of `detach` alone

`src/core/index.{js,cjs,d.ts}` — identical. The core entry does not move.

`src/server/index.js` and `.cjs` — differ. The emitted `detach` body is token-identical and
changes position only: it leaves the `//#region src/server/execution/detach.ts` section and joins
the helpers section. The file shrinks by 54 bytes across 2 lines, which is the two build-generated
`//#region` provenance comments that no longer have a module to name.

`src/server/index.d.ts` — differs by one line. The published 0.0.8 declaration reads
`export declare function detach(command: ProcessCommand_2, options?: DetachOptions): void`; after
the relocation it reads `ProcessCommand`. `ProcessCommand_2` is a de-duplication alias the
declaration bundler emits when one symbol is imported for two source modules: published line 10 is
`import { ProcessCommand } from '@orkestrel/process'` and line 11 is
`import { ProcessCommand as ProcessCommand_2 } from '@orkestrel/process'`. Both name the same
symbol from the same specifier, so the alias collapse changes no type a consumer can observe.

In the published 0.0.8 declarations the `_2` aliases are used by exactly `detach`, `execute`, and
`executeSync` — the three relocating functions — at lines 195, 230, and 256.

## Ruling on this evidence

The relocation moves the artifact's bytes without moving its surface. No export is added, removed,
or renamed; no type changes shape; no logic changes. The differences are build-generated
provenance comments, declaration order, and the collapse of duplicate import aliases.

Under the bump rule's material-content test that is a superfluous diff, so the relocation alone
obliges no version bump and no publish.

This reading covers the relocation alone. A rename of any of the three is a different change: it
moves the published surface and obliges a bump.

## Reading, from the full relocation of all three functions

Measured in the isolated copy after moving `execute`, `executeSync`, and `detach` into
`src/server/helpers.ts`, deleting `src/server/execution/`, and dropping the three barrel rows.
The build ran clean.

`src/core/index.{js,cjs,d.ts}` — identical. The core entry does not move at all.

`src/server/index.js` — 78019 to 77851 bytes. `src/server/index.cjs` — 79824 to 79656 bytes. The
168-byte reduction in each is the three `//#region src/server/execution/*.ts` provenance comment
pairs the bundler no longer emits, because those modules no longer exist. The function bodies are
token-identical and change position only.

`src/server/index.d.ts` — 49864 to 49708 bytes. The complete diff is: two duplicate import lines
removed (`import { ExecuteResult as ExecuteResult_2 }` and
`import { ProcessCommand as ProcessCommand_2 }`), and the three signatures rewritten to name
`ProcessCommand` and `ExecuteResult` directly. Each removed alias imported the same symbol from the
same specifier as the name it collapses into, so no declared type changes shape.

## Runtime surface proof

Both built server bundles were imported and their export surfaces compared directly, rather than
compared as text. Baseline and moved each expose 37 exports; the sorted name sets are equal, and
every export matches on `typeof` and on function arity. No export is added, removed, renamed, or
re-shaped.

Control — the comparator must be able to report a difference. Run against the core bundle instead
of the moved server bundle, it reported 37 against 15 exports and unequal name sets. The comparator
is certified in both directions.

## Ruling

The move changes the artifact's bytes and does not move its published surface. The whole
difference is build-generated provenance comments, declaration order, and the collapse of
duplicate declaration-bundler import aliases. Under the bump rule's material-content test that is
a superfluous diff.

The relocation alone therefore obliges no version bump and no publish.

## Final reading, against what landed

Measured after the independent `verifier` ran `npm run build` on the accepted tree, compared with
the unpacked `@orkestrel/process@0.0.8` tarball.

`dist/src/core/index.{js,cjs,d.ts}` — identical. The core entry did not move at all.

`dist/src/server/index.js` — 78019 to 78069 bytes. `dist/src/server/index.cjs` — 79824 to 79877.
`dist/src/server/index.d.ts` — 49864 to 49411.

The published type surface changed in exactly these ways, read from the declarations rather than
from a byte diff:

- removed `export declare class Retention implements RetentionInterface`
- removed `export declare interface RetentionInterface`
- added `export declare function captureChunk(chunk: unknown, room: number): Buffer | undefined`
- the `detach`, `execute`, and `executeSync` signatures now name `ProcessCommand` and
  `ExecuteResult` directly, because the two duplicate declaration-bundler import aliases
  `ProcessCommand_2` and `ExecuteResult_2` collapsed when the three functions joined one module

The runtime surface holds at 37 exports, with `Retention` out and `captureChunk` in and no other
name, type, or arity changed.

## The republish answer, separated by cause

**The relocation obliges nothing.** Moving `execute`, `executeSync`, and `detach` into
`helpers.ts`, measured on its own before the `Retention` ruling, left the runtime surface identical
at 37 exports with matching names, types, and arities, and changed only the bundler's `//#region`
provenance comments, declaration order, and the two duplicate import aliases. Under the bump rule's
material-content test that is a superfluous diff.

**The `Retention` removal obliges a bump and a publish.** It deletes two names from the published
`@orkestrel/process/server` surface and adds one. Any consumer importing `Retention` or
`RetentionInterface` breaks. It also changes `execute`'s observable output for a run whose capture
bound falls inside a multibyte sequence, which now returns the shorter clean string instead of one
ending in a replacement character.

So the release this change requires is entirely the consequence of the owner's ruling to remove
`Retention`, and none of it is the consequence of the move the owner asked for.
