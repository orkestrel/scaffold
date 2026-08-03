# Guides

A dual-axis index into this repository's guides — by concept, and by directory, following the
documentation contract in [`.claude/rules/documentation.md`](../.claude/rules/documentation.md).

## By concept

| Concept  | Spec                                 | Source                                                   | Tests                                                                            |
| -------- | ------------------------------------ | -------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Scaffold | [`src/scaffold.md`](src/scaffold.md) | [`src/core`](../src/core), [`src/server`](../src/server) | [`tests/src/core`](../tests/src/core), [`tests/src/server`](../tests/src/server) |

The one guide documents the union of the package's LIBRARY faces — the pure core
([`src/core`](../src/core)) and the server face ([`src/server`](../src/server)), which carries
BOTH the `Materializer` (writes) and the `Sync` entity (live dependency-guide + registry-version
freshness; covered by [`tests/src/server/Sync.test.ts`](../tests/src/server/Sync.test.ts)). The
`scaffold` bin ([`src/bin`](../src/bin)) is an executable build target with NO public exports, so
it is documented in prose only and is excluded from the doc↔source parity scan.

## By directory

| Directory    | Guide                                |
| ------------ | ------------------------------------ |
| `src/core`   | [`src/scaffold.md`](src/scaffold.md) |
| `src/server` | [`src/scaffold.md`](src/scaffold.md) |
| `src/bin`    | [`src/scaffold.md`](src/scaffold.md) |

## Line reference

This repo vendors a byte-identical guide mirror for **every published `@orkestrel/*` package**,
not only its own dependencies. Scaffold is the line's blueprint compiler: `new` seeds a
workspace's vendored dependency guides, `pull` refreshes those declared dependencies, and `mirror`
refreshes the complete published line. The mirrors therefore track the exact npm org membership
`catalog` and `mirror` share, and each is fetched from its own repository's `main` at
`guides/src/<name>.md`.

Two subsets carry extra weight:

- **Runtime dependencies** — `@orkestrel/contract` ([`src/contract.md`](src/contract.md)),
  `@orkestrel/emitter` ([`src/emitter.md`](src/emitter.md)), `@orkestrel/markdown`
  ([`src/markdown.md`](src/markdown.md)), and `@orkestrel/template`
  ([`src/template.md`](src/template.md)).
- **Bin-only** — `@orkestrel/terminal` ([`src/terminal.md`](src/terminal.md)) and
  `@orkestrel/console` ([`src/console.md`](src/console.md)), consumed exclusively at the
  `scaffold` executable boundary; plus `@orkestrel/guide`
  ([`src/guide.md`](src/guide.md)), the devDependency powering this repo's guides-parity
  suite (`tests/guides/src/parity.test.ts`).

Every mirror documents **that package's** surface, not anything sourced in this repo. A mirror
that drifts from its upstream `main` is a defect: refresh it rather than editing it here.

## See also

- [`AGENTS.md`](../AGENTS.md) and [`.claude/rules/documentation.md`](../.claude/rules/documentation.md) — the repository rules and documentation contract.
