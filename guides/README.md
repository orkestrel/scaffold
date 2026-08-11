# Guides

A dual-axis index into this repository's guides — by concept, and by directory, following the
documentation contract in [`.claude/rules/documentation.md`](../.claude/rules/documentation.md).

## By concept

| Concept  | Spec                         | Source                                                   | Tests                                                                            |
| -------- | ---------------------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Scaffold | [`scaffold.md`](scaffold.md) | [`src/core`](../src/core), [`src/server`](../src/server) | [`tests/src/core`](../tests/src/core), [`tests/src/server`](../tests/src/server) |

The one guide documents the union of the package's library faces: the pure core
([`src/core`](../src/core)) and the server face ([`src/server`](../src/server)). The server face
carries the `Materializer` that writes a target, the `Upstream` reader that fetches releases and
guide mirrors, and the `WriteTransaction` those writes stage through. The `scaffold` executable
([`src/bin`](../src/bin)) publishes no barrel, so it is documented in prose and sits outside the
surface bijection.

That bijection is the row's contract, and [`tests/guides.test.ts`](../tests/guides.test.ts)
enforces it: every symbol the guide documents exists in one of the two barrels, and every symbol
either barrel exports is documented.

## By directory

| Directory    | Guide                        |
| ------------ | ---------------------------- |
| `src/core`   | [`scaffold.md`](scaffold.md) |
| `src/server` | [`scaffold.md`](scaffold.md) |
| `src/bin`    | [`scaffold.md`](scaffold.md) |

## Line reference

This repo vendors a byte-identical guide mirror for **every published `@orkestrel/*` package**,
not only its own dependencies. Scaffold is the line's blueprint compiler: `new` seeds a
workspace's vendored dependency guides, and `catalog` refreshes them — the declared set by
default, or the complete published line under `--all`. Each mirror is fetched from its own
repository's `main` at `guides/<name>.md`.

Two subsets carry extra weight:

- **Runtime dependencies** — `@orkestrel/console` ([`console.md`](console.md)),
  `@orkestrel/contract` ([`contract.md`](contract.md)), `@orkestrel/emitter`
  ([`emitter.md`](emitter.md)), `@orkestrel/markdown` ([`markdown.md`](markdown.md)),
  `@orkestrel/template` ([`template.md`](template.md)), and `@orkestrel/terminal`
  ([`terminal.md`](terminal.md)). The two library faces reach contract, emitter, markdown, and
  template; the `scaffold` executable reaches console.
- **Development** — `@orkestrel/guide` ([`guide.md`](guide.md)) powers this repository's
  guides-parity suite, [`tests/guides.test.ts`](../tests/guides.test.ts).

Every mirror documents **that package's** surface, not anything sourced in this repo. A mirror
that drifts from its upstream `main` is a defect: refresh it rather than editing it here.

## See also

- [`AGENTS.md`](../AGENTS.md) and [`.claude/rules/documentation.md`](../.claude/rules/documentation.md) — the repository rules and documentation contract.
