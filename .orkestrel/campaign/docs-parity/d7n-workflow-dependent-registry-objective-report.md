# Workflow dependent registry objective review

I held the reused objective correctness lane. Accepted source, native-entry, and
historical scanner criteria stayed closed. I attempted to falsify the frozen final
preparation and closure readiness from the actual visit, prepublish, pack, and live
read-only state.

## REGISTRY — CONFIRMED

- The final manifest declares Workflow `0.0.18`; Abort `^0.0.10`, Budget
  `^0.0.10`, Contract `^0.0.17`, Database `^0.0.14`, Emitter `^0.0.10`, Queue
  `^0.0.13`, and Timeout `^0.0.10` remain in dependencies. Guide `^0.0.18`,
  Scaffold `^0.0.64`, Test `^0.0.14`, and deferred Probe `^0.0.12` remain in
  devDependencies. Visit pin receipts match with exit `0`.
- The visit records successful supported-major observations and matching final
  ranges for api-extractor `7.59.1`, Node types `26.5.1`, Oxfmt `0.67.0`, Oxlint
  `1.82.0`, TypeScript `6.0.3`, Vite `8.3.0`, Vitest `4.1.11`, the Vitest browser
  runner `4.1.11`, and Playwright `1.63.0`. Structured observations retain
  newer-major advisories without adopting them.
- The no-local-resolution scan exits `1` with empty stdout and stderr, the required
  no-match result. The installed-root check exits `0`.

## OVERWRITE — CONFIRMED

- Supported overwrite, audit, native-manifest validation, Guide mirror comparison,
  and Scaffold mirror comparison each exit `0`.
- `scripts/docs.ts` and `scripts/guides.ts` are absent. The manifest has no `docs`
  script, and `test:guides` directly invokes
  `node --experimental-strip-types tests/guides.test.ts`.
- `authored-before.sha256` and `authored-after.sha256` retain the same hashes for
  `guides/workflow.md` and `tests/guides.test.ts`.
- The frozen changed paths are the generated catalog, declared dependency guide
  mirrors, manifests, and retired `scripts/docs.ts`. Workflow-owned source, its
  guide, and its native guide entry are absent from that path set.

## ARTIFACT — CONFIRMED

- The final prepublish action exits `0`, including release-mode distribution after
  the package's format, lint, check, browser/core/server build, native, policy,
  config, setup, and guide commands.
- Visit, prepublish, and pack captures have identical SHA-256 values for status,
  binary diff, index, manifest record, HEAD, and branch. Their HEAD is the required
  preparation commit `4cbf69287ebd60f1db72f86a4d66a1879e4e9860`.
- A fresh read of the frozen checkout matches captured status, path set, branch, and
  HEAD. A native Git Bash hash of the live binary diff equals retained SHA-256
  `2db9c68654019b751fd8833ac6f71c8d63c47717f42618aeffa131c0d674fa65`.
- Canonical `package.json` and the extracted packed manifest share SHA-256
  `22BB2E2D262A3C558E4F0725DA482E635145AC32B7C78131BB433BA9F698B754`.
  Full packed-dist comparison exits `0` with an empty diff. The archive's actual
  SHA-256 matches retained value
  `f7b89c454aa2b63a267479c87a2a33ff9d69ddd02793137cc00b382cfa3073e5`.
- The registry baseline download exits `0`. Its browser, core, and server runtime,
  declaration, and map outputs differ from the candidate, supporting the pending
  bump independently of changed dependency pins.
- Installed Guide `0.0.18` and Scaffold `0.0.64` version and complete-dist
  comparisons exit `0` before and after final installation.

## CLOSE — CONFIRMED

- The accepted closure carrier's Workflow arrays match the final runtime,
  development, browser-tooling, and supported tool declarations.
- The carrier binds the prepared verdict, exact visit, pack, prepublish, manifest,
  full dist, archive, current diff/index, installed tool identities, and accepted
  registry observations before staging. Its guide allowlist admits only mirrors
  named by declared fields.
- Its changed-path allowlist covers the frozen Workflow diff. It stages each
  admitted path explicitly, commits with the required identity and trailers, pushes
  campaign and main, selects clean canonical local main, and rechecks release refs,
  manifest, and full dist.
- The live frozen state still matches the carrier's expected inputs. No closure,
  authentication, upload, or publication action is claimed here.

## Scope limit

This verdict establishes Workflow's readiness for root-owned closure. It does not
reopen the historical scanner qualification or claim completed closure, registry
upload, MCP-to-Probe verification, or a Linux rerun.

VERDICT: PASS
