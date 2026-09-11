# Brief dependent registry objective review

I held the reused objective correctness lane. Accepted source and native-entry
criteria stayed closed. I attempted to falsify the frozen final preparation and
closure readiness from the actual visit, prepublish, pack, and live read-only state.

## REGISTRY — CONFIRMED

- The final manifest declares Brief `0.0.8`; Contract `^0.0.17`, Emitter
  `^0.0.10`, Interpret `^0.0.13`, and Reason `^0.0.10` remain in dependencies.
  Guide `^0.0.18`, Scaffold `^0.0.64`, Test `^0.0.14`, and the deferred Probe
  `^0.0.12` remain in devDependencies. The visit's pin receipts report the same
  values with exit `0`.
- The visit records successful supported-major observations and exact final ranges:
  api-extractor `7.59.1`, Node types `26.5.1`, Oxfmt `0.67.0`, Oxlint `1.82.0`,
  TypeScript `6.0.3`, Vite `8.3.0`, and Vitest `4.1.11`. The structured observations
  preserve newer-major advisories without adopting them.
- `registry-lock-local.exit.txt` is `1` with empty stdout and stderr, which is the
  carrier's required no-match result for local tarball, link, workspace, or lock-link
  resolutions. `roots.exit.txt` is `0`.

## OVERWRITE — CONFIRMED

- `overwrite.exit.txt`, `audit.exit.txt`, `native-manifest.exit.txt`,
  `guide-mirror.exit.txt`, and `scaffold-mirror.exit.txt` are `0`.
- `scripts/docs.ts` and `scripts/guides.ts` are absent. The manifest has no `docs`
  script, and `test:guides` directly runs
  `node --experimental-strip-types tests/guides.test.ts`.
- `authored-before.sha256` and `authored-after.sha256` bind identical hashes for
  `guides/brief.md` and `tests/guides.test.ts`.
- The frozen diff changes only the generated catalog, declared dependency guide
  mirrors, manifests, and retired `scripts/docs.ts`. No Brief-owned source, guide,
  or native test appears in the changed-path set.

## ARTIFACT — CONFIRMED

- The final prepublish action exited `0`. Its retained output reaches the release-mode
  distribution project after format, lint, check, build, native tests, policy,
  config, setup, and guide execution.
- The visit, prepublish, and pack captures have identical SHA-256 values for status,
  binary diff, index, manifest record, HEAD, and branch. Their HEAD is the required
  preparation commit `aeea7a504f9cff8342797bd26b35213536df73f1`.
- A fresh read of the frozen checkout matches the visit's status, binary diff, and
  index without a line delta. Its branch and HEAD match the captured values.
- Canonical `package.json` and the extracted packed manifest share SHA-256
  `B13AB80B9C7905A559B6C5E0A064D57C28DDA8C7E514F76C4B97DD87C7BBFED1`.
  `final-dist.exit.txt` is `0` and its diff is empty. The archive's actual SHA-256
  matches retained value
  `ad1afafe3d5d4a3f40c81d2597a5c0a2439b2d73cf79bb0a37dd12debddc819f`.
- The registry baseline download exited `0`. Its complete dist differs from the
  candidate, including the runtime and declaration outputs, so the pending bump is
  supported independently of dependency-pin changes.
- Resume revalidated the installed Guide `0.0.18` and Scaffold `0.0.64` versions and
  their complete dist against accepted artifacts; the version and dist receipts exit
  `0`.

## CLOSE — CONFIRMED

- The previously accepted closure carrier binds the prepared verdict, exact visit,
  pack, prepublish, manifest, full dist, archive, current diff/index, installed tool
  identities, and registry-backed final ranges before staging.
- Its changed-path allowlist covers this frozen Brief diff. It stages each admitted
  path explicitly, commits with the required identity and trailers, pushes campaign
  and main, selects clean canonical local main, and then checks release refs,
  manifest, and full dist again.
- The live branch, HEAD, status, diff, index, and manifest still match the inputs the
  carrier expects. No closure, authentication, upload, or publication action is
  claimed here.

## Scope limit

This verdict establishes Brief's readiness for root-owned closure. It does not claim
a completed closure, registry upload, later MCP-to-Probe run, or Linux rerun.

VERDICT: PASS
