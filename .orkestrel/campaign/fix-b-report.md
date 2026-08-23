# FIX-B report — the two silent-pass holes

Role `implementer`, Opus 5, clean context, sole serial writer.
Brief: `.orkestrel/campaign/fix-b-brief.md`.

## Hole 1 — the generated proof now partitions rather than drops

Every published subpath lands in exactly one of `entries`, `undeclared`, or `excluded`, and a
totality assertion pins the three against the map's own subpath list. A dropped subpath cannot
survive that.

The predicate the unit settled: a target is a runtime module when it ends `.js`, `.mjs`, or `.cjs`.
Classification reads **every** target the entry names under any condition rather than the `import`
one alone, so a `require`-only CommonJS subpath with no declaration reddens too, and a `.d.ts` or
`.d.cts` target never satisfies the module test, so a types-only condition cannot mask a missing
declaration.

A `./package.json` pointer and a `.css` stylesheet land in `excluded` and are named there. That
split was ruled right by an objective lane and the fix preserves it.

## Hole 2 — a core-only proof reddens when a browser face appears

A core-only workspace's proof carries an assertion that no browser face exists. A workspace that
later publishes one fails that assertion instead of skipping, and the emitted guard names the
remedy. The unit verified the remedy rather than asserting it: deleting the proof and running
`repair` reported `1 written, 119 unchanged`, and `audit` on the deleted file reports it `missing`
with exit 1.

## Ruling: the guard, not unconditional emission

The brief asked for a reasoned ruling and the unit measured it. The browser branch imports
`playwright`, `@vitest/browser-playwright`, `vite`, and `../configs/browsers.js`. A core-only
workspace has none of them — `configs/browsers.ts` is not emitted for it at all — so an
unconditional branch fails that workspace's own `check` and `lint:check` on an unresolvable import
before any dependency question arises. Closing that would force scaffold to emit the resolver
everywhere and declare a browser download on every publishing workspace that ships no browser face.
The branch stays conditional; the guard carries the coverage.

## The controls, all executed in real workspaces

**Hole 1, red then green.** A published `./legacy` with a module target and no `types`:
`AssertionError: expected [ './legacy' ] to strictly equal []`, exit 1. Adding a `types` target:
`9 passed | 1 skipped`, exit 0. The skip is that subpath's CommonJS case, which it does not declare.

**Hole 1, negative control.** `./package.json` and a `./styles` stylesheet beside the typed entries:
green. That the excluded pair is *recorded* rather than dropped was proved by mutating the
instrument — deleting `else excluded.push(subpath)` from the installed proof leaves them in no
bucket and the totality assertion names both. Restored immediately.

**Hole 2, the audit's exact state.** The core-only workspace given the `@orkestrel/indexeddb` shape,
its browser face at the root subpath. With the **pre-fix** proof: `4 passed | 2 skipped`, exit 0 —
the reading the audit reported. With the fixed proof, same manifest and tree:
`AssertionError: expected [ '.' ] to strictly equal []`, exit 1. Root restored to a core face:
`8 passed`, exit 0.

Both committed regression tests were shown red against restored `HEAD` sources before passing.

## The unknown, answered

No published `@orkestrel` package has a subpath resolving no `.d.ts`. Swept with the exact predicate
this fix ships across all eleven checkouts: `undeclared` empty everywhere, `excluded` exactly
`./package.json` everywhere, and no package publishes a stylesheet or other non-module subpath.
Hole 1 therefore reddens no real target on adoption, and hole 2's guard reddens none either —
`indexeddb` already carries the browser-branch variant.

## Named, not closed

The browser-face variant was not driven end to end, because running it needs a Playwright browser
download. Its selection is proved at the template level by the new sweep across every `src`
selection.

Guide text is untouched and belongs to FIX-E. Nothing in the guide is now false, but it records
neither the partition nor the guard. The unit supplied a drafted insertion for FIX-E to own.
