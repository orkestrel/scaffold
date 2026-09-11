# MCP dependent registry objective review

I held the reused objective correctness lane. Accepted source, native-entry, and
historical Summary-red scope stayed closed. I attempted to falsify the frozen final
preparation and closure readiness from the actual visit, prepublish, pack, and live
read-only state.

## REGISTRY — CONFIRMED

- The final manifest declares MCP `0.0.29`; Codec `^0.0.3`, Contract `^0.0.17`,
  Emitter `^0.0.10`, Process `^0.0.11`, SSE `^0.0.7`, Tool `^0.0.14`, and
  WebSocket `^0.0.12` remain in dependencies. Guide `^0.0.18`, Scaffold
  `^0.0.64`, Test `^0.0.14`, and deferred Probe `^0.0.12` remain in
  devDependencies. Visit pin receipts match with exit `0`.
- Router `^0.0.14` and Server `^0.0.19` remain peers and dev dependencies. Their
  dedicated peer and dev receipts exit `0` with the same values.
- `@modelcontextprotocol/conformance` remains exactly `0.2.0-alpha.11`. Its before
  and final receipts exit `0` and match byte-for-byte.
- The visit records successful supported-major observations and matching final
  ranges for api-extractor `7.59.1`, Node types `26.5.1`, Oxfmt `0.67.0`, Oxlint
  `1.82.0`, TypeScript `6.0.3`, Vite `8.3.0`, Vitest `4.1.11`, the Vitest browser
  runner `4.1.11`, and Playwright `1.63.0`. The structured observations retain
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
  `guides/mcp.md` and `tests/guides.test.ts`.
- The frozen changed paths are the generated catalog, declared dependency guide
  mirrors, manifests, and retired `scripts/docs.ts`. MCP-owned source, its guide,
  and its native guide entry are absent from that path set.

## ARTIFACT — CONFIRMED

- The final prepublish action exits `0`. Its retained command trace includes format,
  lint, scoped checks and builds, native tests, policy, config, setup, guide,
  conformance, integration, and release-mode distribution execution.
- Visit, prepublish, and pack captures have identical SHA-256 values for status,
  binary diff, index, manifest record, HEAD, and branch. Their HEAD is the required
  preparation commit `2d980cd7877d0d0016b685b78b702a97b0dc9bb5`.
- A fresh read of the frozen checkout matches the captured status, path set, branch,
  and HEAD. A native Git Bash hash of the live binary diff equals retained SHA-256
  `6e7018857b3af083308b0c5a5ed35eb3b5f522f1221e00e4013cc2e454528e84`.
- Canonical `package.json` and the extracted packed manifest share SHA-256
  `744B9A2ABCC13EB1830DF2F29B66EA6E904FD789A2906FE59B8AD3822AD954D8`.
  Full packed-dist comparison exits `0` with an empty diff. The archive's actual
  SHA-256 matches retained value
  `0a9a407c083aa9f4907d93e03fac095d9254a4f57d930fdfd5a3df364d09a97e`.
- The registry baseline download exits `0`. Its browser, core, and server runtime,
  declaration, and map outputs differ from the candidate, supporting the pending
  bump independently of dependency-pin changes.
- Installed Guide `0.0.18` and Scaffold `0.0.64` version and complete-dist
  comparisons exit `0` before and after final installation.

## CLOSE — CONFIRMED

- The accepted closure carrier's MCP arrays match the runtime prerequisites,
  Router/Server peer-dev fields, browser tooling, and preserved conformance value in
  the final manifest.
- The carrier binds the prepared verdict, exact visit, pack, prepublish, manifest,
  full dist, archive, current diff/index, installed tool identities, accepted
  registry observations, and preserved conformance before staging. Its guide
  allowlist admits only mirrors named by declared fields.
- Its changed-path allowlist covers the frozen MCP diff. It stages each admitted
  path explicitly, commits with the required identity and trailers, pushes campaign
  and main, selects clean canonical local main, and rechecks release refs, manifest,
  and full dist.
- The live frozen state still matches the carrier's expected inputs. No closure,
  authentication, upload, publication, or MCP-to-Probe action is claimed here.

## Scope limit

This verdict establishes MCP's readiness for root-owned closure. It does not claim
a completed closure, registry upload, MCP-to-Probe release verification, a Linux
rerun, or recovery of the unavailable historical Summary-red transcript.

VERDICT: PASS
