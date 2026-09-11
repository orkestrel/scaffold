# Program dependent registry objective review

I held the reused objective correctness lane. Accepted source, native-entry, and
execution-paragraph criteria stayed closed. I attempted to falsify the frozen final
preparation and closure readiness from the actual visit, prepublish, pack, and live
read-only state.

## REGISTRY — CONFIRMED

- The final manifest declares Program `0.0.13`; Contract `^0.0.17`, Emitter
  `^0.0.10`, Qualifier `^0.0.14`, Rater `^0.0.14`, and Reason `^0.0.10` remain in
  dependencies. Guide `^0.0.18`, Scaffold `^0.0.64`, Test `^0.0.14`, and deferred
  Probe `^0.0.12` remain in devDependencies. Visit pin receipts match with exit `0`.
- The visit records successful supported-major observations and matching final
  ranges for api-extractor `7.59.1`, Node types `26.5.1`, Oxfmt `0.67.0`, Oxlint
  `1.82.0`, TypeScript `6.0.3`, Vite `8.3.0`, and Vitest `4.1.11`. Structured
  observations preserve newer-major advisories without adopting them.
- The no-local-resolution scan exits `1` with empty stdout and stderr, the required
  no-match result. The installed-root check exits `0`.

## OVERWRITE — CONFIRMED

- Supported overwrite, audit, native-manifest validation, Guide mirror comparison,
  and Scaffold mirror comparison each exit `0`.
- `scripts/docs.ts` and `scripts/guides.ts` are absent. The manifest has no `docs`
  script, and `test:guides` directly invokes
  `node --experimental-strip-types tests/guides.test.ts`.
- `authored-before.sha256` and `authored-after.sha256` retain the same hashes for
  `guides/program.md` and `tests/guides.test.ts`.
- The frozen changed paths are the generated catalog, declared dependency guide
  mirrors, manifests, and retired `scripts/docs.ts`. Program-owned source, its guide,
  and its native guide entry are absent from that path set.

## ARTIFACT — CONFIRMED

- The final prepublish action exits `0`, including release-mode distribution after
  the package's format, lint, check, build, native, policy, config, setup, and guide
  commands.
- Visit, prepublish, and pack captures have identical SHA-256 values for status,
  binary diff, index, manifest record, HEAD, and branch. Their HEAD is the required
  preparation commit `32f21e93dec3ccb49153f04b6c1131c69d8e8cdc`.
- A fresh read of the frozen checkout matches captured status, path set, branch, and
  HEAD. A native Git Bash hash of the live binary diff equals retained SHA-256
  `11bbbbb478ebcb62069662f7644a2012619813ed1699036ecae3e81f4f9d6791`.
- Canonical `package.json` and the extracted packed manifest share SHA-256
  `FC2ADFDE25A26C63BA892C1DB7E308E63D68895D4C9854E3191EFA0ECE87E776`.
  Full packed-dist comparison exits `0` with an empty diff. The archive's actual
  SHA-256 matches retained value
  `14531aac23bcadacb11b2d344591f58e3f0ed8ff0ccc895864906d69448c7201`.
- The registry baseline download exits `0`. Its runtime, declaration, and map outputs
  differ from the candidate, supporting the pending bump independently of changed
  dependency pins.
- Installed Guide `0.0.18` and Scaffold `0.0.64` version and complete-dist
  comparisons exit `0` before and after final installation.

## CLOSE — CONFIRMED

- The accepted closure carrier's Program arrays match the final runtime,
  development, and supported tool declarations.
- The carrier binds the prepared verdict, exact visit, pack, prepublish, manifest,
  full dist, archive, current diff/index, installed tool identities, and accepted
  registry observations before staging. Its guide allowlist admits only mirrors
  named by declared fields.
- Its changed-path allowlist covers the frozen Program diff. It stages each admitted
  path explicitly, commits with the required identity and trailers, pushes campaign
  and main, selects clean canonical local main, and rechecks release refs, manifest,
  and full dist.
- The live frozen state still matches the carrier's expected inputs. No closure,
  authentication, upload, or publication action is claimed here.

## Scope limit

This verdict establishes Program's readiness for root-owned closure. It does not
reopen the execution-paragraph ruling or claim completed closure, registry upload,
MCP-to-Probe verification, or a Linux rerun.

VERDICT: PASS
