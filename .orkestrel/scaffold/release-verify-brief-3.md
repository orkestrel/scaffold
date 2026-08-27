# Successor brief: run the release gate chain over the 0.0.57 bump

Supersedes `tmp/units/release-verify-brief-2.md`, which proved the canon correction at 0.0.56.
Everything in the original `tmp/units/release-verify-brief.md` still binds.

What changed:

- The registry serves 0.0.56. The manifest now reads 0.0.57, because the canon correction moved
  `dist/host`, which is published surface.
- The working tree carries the bump: `package.json`, `package-lock.json` (its version fields
  alone), and the three generated-manifest fixtures under `tests/src/core/fixtures/`, which pin
  `@orkestrel/scaffold` at the manifest version. `npm run build` already ran, so `dist/` emits
  `^0.0.57`. The tree is dirty by design; do not commit it.
- The `src:core` project is the one that reads those fixtures, through
  `tests/src/core/compilers.test.ts` and its `toMatchFileSnapshot` cases. Report its count
  explicitly: a stale fixture surfaces there and nowhere else.
- `test:distribution` under `--mode release` packs and installs the bumped artifact. Report its
  duration with its result.

Report exactly what the original brief's Output section names.
