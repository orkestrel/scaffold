# Middleware dependent registry objective review

I held the reused objective correctness lane. Accepted source and native-entry
criteria stayed closed. I attempted to falsify the frozen final preparation and
closure readiness from the actual visit, prepublish, pack, and live read-only state.

## REGISTRY — CONFIRMED

- The final manifest declares Middleware `0.0.20`; Abort `^0.0.10`, Budget
  `^0.0.10`, Contract `^0.0.17`, and Timeout `^0.0.10` remain in dependencies.
  Guide `^0.0.18`, Scaffold `^0.0.64`, Test `^0.0.14`, and deferred Probe
  `^0.0.12` remain in devDependencies. Visit pin receipts match with exit `0`.
- Database `^0.0.14` and Server `^0.0.19` remain peers and dev dependencies.
  Router `^0.0.14` remains a dev dependency and is absent from peer dependencies.
  `peerDependenciesMeta.@orkestrel/database.optional` remains `true`; its dedicated
  receipt exits `0` with `true`.
- The visit records successful supported-major observations and exact final ranges
  for api-extractor `7.59.1`, Node types `26.5.1`, Oxfmt `0.67.0`, Oxlint `1.82.0`,
  TypeScript `6.0.3`, Vite `8.3.0`, and Vitest `4.1.11`. Structured observations
  preserve newer-major advisories without adopting them.
- The no-local-resolution scan exits `1` with empty stdout and stderr, the required
  no-match result. The installed-root check exits `0`.

## OVERWRITE — CONFIRMED

- Supported overwrite, audit, native-manifest validation, Guide mirror comparison,
  and Scaffold mirror comparison each exit `0`.
- `scripts/docs.ts` and `scripts/guides.ts` are absent. The manifest has no `docs`
  script, and `test:guides` directly invokes
  `node --experimental-strip-types tests/guides.test.ts`.
- `authored-before.sha256` and `authored-after.sha256` retain the same hashes for
  `guides/middleware.md` and `tests/guides.test.ts`.
- The frozen changed paths are the generated catalog, declared dependency guide
  mirrors, manifests, and retired `scripts/docs.ts`. Middleware-owned source, its
  guide, and its native guide entry are absent from that path set.

## ARTIFACT — CONFIRMED

- The final prepublish action exits `0`, including the release-mode distribution
  project after the package's format, lint, check, build, native, policy, config,
  setup, and guide commands.
- Visit, prepublish, and pack captures have identical SHA-256 values for status,
  binary diff, index, manifest record, HEAD, and branch. Their HEAD is the required
  preparation commit `e301b917415b54a6090fcb4cadce6be49e6026ad`.
- A fresh read of the frozen checkout matches captured status and index. A native
  Git Bash hash of the live binary diff equals the retained diff SHA-256
  `c0e44f126b9b40edd197b868b813dacc5799c59fb58c4eb0d7643c582c6d5e4b`.
  The current branch and HEAD also match the captures.
- Canonical `package.json` and the extracted packed manifest share SHA-256
  `DAF6D54E4452ACB18966044599619E305D4915C0C2C16430460E2FFF3E576564`.
  Full packed-dist comparison exits `0` with an empty diff. The archive's actual
  SHA-256 matches retained value
  `03a520c6773a8c5e9797aef8ce5c02417d9bb2358f2a905d91ed8ed068dcac42`.
- The registry baseline download exits `0`. Its core and server runtime,
  declaration, and map outputs differ from the candidate, which supports the
  pending bump independently of changed dependency pins.
- Installed Guide `0.0.18` and Scaffold `0.0.64` version and complete-dist
  comparisons exit `0` before and after final installation.

## CLOSE — CONFIRMED

- The accepted closure carrier's Middleware arrays exactly match the runtime,
  Database/Server peer and dev, Router dev-only, optional peer metadata, and tooling
  declarations observed in this final manifest.
- The carrier binds the prepared verdict, exact visit, pack, prepublish, manifest,
  full dist, archive, current diff/index, installed tool identities, and accepted
  registry observations before staging. Its guide allowlist admits only mirrors
  named by those declarations.
- Its changed-path allowlist covers the frozen Middleware diff. It stages each
  admitted path explicitly, commits with the required identity and trailers, pushes
  campaign and main, selects clean canonical local main, and rechecks release refs,
  manifest, and full dist.
- The live frozen state still matches the inputs the carrier expects. No closure,
  authentication, upload, or publication action is claimed here.

## Scope limit

This verdict establishes Middleware's readiness for root-owned closure. It does not
claim completed closure, registry upload, a later MCP-to-Probe run, or a Linux rerun.

VERDICT: PASS
