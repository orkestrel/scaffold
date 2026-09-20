# Scaffold 0.0.76 — the vendored-only release, 2026-09-20

Layer: `@orkestrel/scaffold` alone (a vendored-only release propagates as files, per
`.agents/orchestration.md` § Publishing the fleet). Registry before: 0.0.75 (2026-09-18).

- Bump: `652ed789 v0.0.76`; self-pins swept in `561d75ca` (three generated-manifest fixtures,
  `^0.0.75` to `^0.0.76`, regenerated with `npm run test:src:core -- -u`).
- The first upload attempt with the user's code ran the package's own `prepublishOnly` chain
  inside the code's life and stopped on the unswept fixtures before any upload
  (`units/scaffold-release-0.0.76.log.txt`); the code was not consumed.
- The layer was then prepared outside the window: `units/scaffold-release-gates.sh` ran
  `format:check`, `lint:check`, `check`, `build`, `test`, and `test:distribution -- --mode release`,
  every exit 0 (`units/scaffold-release-gates.log.txt`, 14:19:49Z to 14:24:18Z).
- `npm whoami` answered `401`: the stored session had expired, and the login's browser approval
  needs a real terminal on this host, so the user logged in and ran the upload themselves.
- Registry after: `0.0.76` at `2026-09-20T14:53:52.216Z` (`npm view @orkestrel/scaffold time`).

Obligations: Test re-pins from `^0.0.75` (declared) with 0.0.73 installed to `^0.0.76`, repairs,
and proves its gates (`units/test-repin-0.0.76.sh`); Veneer re-pins after U3 lands, before
U1-conform, with the U6 Test tarball reinstalled in the same install command.
