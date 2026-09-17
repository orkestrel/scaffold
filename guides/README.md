# Guides

An index into this repository's guides, by concept and by directory, following the
documentation contract in [`.claude/rules/documentation.md`](../.claude/rules/documentation.md).

## By concept

| Concept  | Spec                         | Source                                                   | Tests                                                                            |
| -------- | ---------------------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Scaffold | [`scaffold.md`](scaffold.md) | [`src/core`](../src/core), [`src/server`](../src/server) | [`tests/src/core`](../tests/src/core), [`tests/src/server`](../tests/src/server) |

`scaffold.md` documents the union of the package's library faces: the pure core
([`src/core`](../src/core)) and the server face ([`src/server`](../src/server)). The server face
carries the `Materializer` that writes a target, the `Upstream` reader that fetches releases and
guide mirrors, and the `WriteTransaction` those writes stage through. The `scaffold` executable
([`src/bin`](../src/bin)) publishes no barrel, so it is documented in prose and sits outside the
surface bijection.

The [Blueprint reference](scaffold.md#blueprint) describes the journey axis and its adopter-edited
`configs/app/vite.journey.config.ts` wrapper, the `SetupRuntime` list, and the `setup:browser`
project. The generated workspace runs journey variants and browser setup proofs through its
`test` chain.

That bijection is the row's contract, and [`tests/guides.test.ts`](../tests/guides.test.ts)
enforces it: every symbol the guide documents exists in the core barrel or the server barrel, and
every symbol either barrel exports is documented.

## By directory

| Directory    | Guide                        |
| ------------ | ---------------------------- |
| `src/core`   | [`scaffold.md`](scaffold.md) |
| `src/server` | [`scaffold.md`](scaffold.md) |
| `src/bin`    | [`scaffold.md`](scaffold.md) |

## Line reference

This repository vendors a byte-identical guide mirror for **every published `@orkestrel/*`
package**, not only its own dependencies. Scaffold is the line's blueprint compiler: `new` seeds a
workspace with the mirrors named by `SEED_GUIDE_PATHS`. The `catalog` command refreshes the
mirrors — the declared set by default, or the complete published line under `--all`. Each mirror is
fetched from its own repository's `main` at `guides/<name>.md`.

Every file in this directory ships inside the published package as well, at
`dist/host/guides/<name>.md`, so an installed `@orkestrel/scaffold` carries the whole line as
readable data. `catalog` writes that staged copy into a target whose mirror is absent and whose
upstream read returned no bytes, and the `surface` policy rule reads the same set to decide which
package owns an exported name.

These subsets carry extra weight:

- **Runtime dependencies** — `@orkestrel/console` ([`console.md`](console.md)),
  `@orkestrel/contract` ([`contract.md`](contract.md)), `@orkestrel/emitter`
  ([`emitter.md`](emitter.md)), `@orkestrel/markdown` ([`markdown.md`](markdown.md)),
  `@orkestrel/process` ([`process.md`](process.md)), and `@orkestrel/template`
  ([`template.md`](template.md)). The library faces reach contract, emitter, markdown, and
  template; the `scaffold` executable reaches console, contract, markdown, and process.
- **Development** — `@orkestrel/guide` ([`guide.md`](guide.md)) backs this repository's
  guides-parity suite, [`tests/guides.test.ts`](../tests/guides.test.ts); the
  `readSurfaceCollisions` helper in the server face, which loads it at call time; and the `surface`
  rule in [`tests/setupPolicy.ts`](../tests/setupPolicy.ts). A consumer calling
  `readSurfaceCollisions` supplies the package itself, because scaffold declares it for development
  alone.

Every mirror documents **that package's** surface, not anything sourced in this repository. A mirror
that drifts from its upstream `main` is a defect: refresh it rather than editing it here.

## See also

- [`AGENTS.md`](../AGENTS.md) and [`.claude/rules/documentation.md`](../.claude/rules/documentation.md) — the repository rules and documentation contract.
