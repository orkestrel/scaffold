# Guides

A dual-axis index into this repository's guides — by concept, and by directory (AGENTS §22).

## By concept

| Concept  | Spec                                 | Source                                                   | Tests                                                                            |
| -------- | ------------------------------------ | -------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Scaffold | [`src/scaffold.md`](src/scaffold.md) | [`src/core`](../src/core), [`src/server`](../src/server) | [`tests/src/core`](../tests/src/core), [`tests/src/server`](../tests/src/server) |

The one guide documents the union of the package's LIBRARY faces — the pure core
([`src/core`](../src/core)) and the server materialization face
([`src/server`](../src/server)). The `scaffold` bin ([`src/bin`](../src/bin)) is an
executable build target with NO public exports, so it is documented in prose only and is
excluded from the doc↔source parity scan.

## By directory

| Directory    | Guide                                |
| ------------ | ------------------------------------ |
| `src/core`   | [`src/scaffold.md`](src/scaffold.md) |
| `src/server` | [`src/scaffold.md`](src/scaffold.md) |
| `src/bin`    | [`src/scaffold.md`](src/scaffold.md) |

## Dependency reference

This repo vendors ONE byte-identical guide mirror per runtime dependency (the vendored-guides
law, one copy per dep) plus [`src/guide.md`](src/guide.md) — the mirror for `@orkestrel/guide`,
the devDependency powering this repo's guides-parity suite (`tests/guides/src/parity.test.ts`).
The runtime dependencies, and their mirrors kept here:

- **Core** — `@orkestrel/contract` ([`src/contract.md`](src/contract.md)), `@orkestrel/emitter`
  ([`src/emitter.md`](src/emitter.md)), `@orkestrel/markdown` ([`src/markdown.md`](src/markdown.md)),
  and `@orkestrel/template` ([`src/template.md`](src/template.md)).
- **Bin-only** — `@orkestrel/terminal` ([`src/terminal.md`](src/terminal.md)) and
  `@orkestrel/console` ([`src/console.md`](src/console.md)), consumed exclusively at the
  `scaffold` executable boundary.

Each mirror documents **that package's** surface, not anything sourced in this repo; it is kept
so a reader can see the primitives this package builds on without leaving the guide set.

## See also

- [`AGENTS.md`](../AGENTS.md) — the rules; §22 documentation-as-contracts.
