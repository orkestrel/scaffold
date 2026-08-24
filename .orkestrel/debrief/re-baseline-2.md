# Re-baseline 2 — after R5 (2026-08-24)

R5 created `.agents/templates/brief.md` and reported it sits outside `HOST_PATHS`, so the
vendored `.agents/orchestration.md` — which every fleet target receives and which points at the
template — would dangle in every target repository.

Ruling: vendor the template. A vendored contract pointer resolves in every tree that carries the
contract.

Unit added — work the exit criterion already required, no criterion moved:

- **R11** (`builder`): add `.agents/templates` to `HOST_PATHS` in `src/core/constants.ts` as a
  directory entry beside `.agents/skills`, and add the `.agents/templates/brief.md` row to the
  expanded inventory in `tests/distribution.test.ts` in sort order. The `host.json` and
  `dist/host` regeneration stays with the integration step, which now also requires
  `npm run build` first because `src/core` moved.
