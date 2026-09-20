# policy-styles-entry report (builder, native Sonnet, 2026-09-20, 142 s)

**Diff summary**

`tests/setupPolicy.ts`
- Added `POLICY_SURFACE_STYLES_ENTRY` and `POLICY_SURFACE_STYLES_MESSAGE` constants after `POLICY_SURFACE_BARREL_PATTERN` (around line 96–104).
- `readPolicySurface` (around line 2237): TSDoc `@remarks` added naming the styles-entry exception; the `barrels` filter now excludes `src/styles/index.ts`; a new block validates that entry independently, requiring exactly one `ImportDeclaration` with no specifiers whose source is `./index.scss`, pushing a `surface` violation with the offending line (line 1 for an empty/malformed body) otherwise.

`tests/setupPolicy.test.ts`
- Added two cases to `describe('readPolicySurface')` (before the existing "refuses an unresolved barrel target" case): one proving a valid `src/styles/index.ts` (bare `import './index.scss'`) alongside a normal barrel returns no violation; one proving `src/styles/index.ts` holding `export * from './tokens.js'` returns exactly the new violation at line 1 and no other.

**Red-then-green reading of the control**

Reverted the `readPolicySurface` change (restored the original single `barrels` filter, dropped the styles-entry block), ran `npm run test:setup -- -t "styles"`: both new cases failed — the valid-entry case reported the old barrel violation `surface population incomplete: barrel requires a relative .js star export on one line`, and the invalid-entry case returned `declarations: [{ name: 'token', ... }]` with no violation, instead of the new message. Restored the fix; both cases now pass (see `test:setup` result following).

**Gate commands**

- `npm run format -- tests/setupPolicy.ts tests/setupPolicy.test.ts` — exit 0 (`Finished in 3776ms on 228 files`). Note: the root `format` script appends its args after `--write .`, so this ran whole-tree; `git status --porcelain` afterward showed only the two owned files plus pre-existing `.orkestrel/veneer/` drift that predates this unit, confirming no other tree file was rewritten by formatting.
- `npm run format:check` — exit 0 (`All matched files use the correct format.`).
- `npm run lint:check` — exit 0 (no output beyond the run banner).
- `npm run check` — exit 0 (`tsc --noEmit` root, `check:src:core`, `check:src:server`, `check:src:bin`, all silent/clean).
- `npm run test:setup` — exit 0 (`Test Files 3 passed (3)`, `Tests 164 passed | 3 skipped (167)`).
- `npm run test:policy` — exit 0 (`Test Files 1 passed (1)`, `Tests 110 passed (110)`).

`git status --porcelain` shows only `tests/setupPolicy.ts` and `tests/setupPolicy.test.ts` modified beyond the pre-existing `.orkestrel/veneer/` entries.

Landed by the Orchestrator as scaffold `e8a34296` (`units/policy-styles-entry-land.sh`, log beside it) after `npm run build` staged the vendored copy; `host.json` moved with it.
