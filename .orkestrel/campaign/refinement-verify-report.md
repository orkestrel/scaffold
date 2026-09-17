# Gate report — scaffold refinement acceptance run

Checkout: C:\Users\mikes\WebstormProjects\scaffold
Date: 2026-09-17

## Gates

1. `npm run format:check` — PASS (exit 0). "All matched files use the correct format." 227 files checked.
2. `npm run lint:check` — PASS (exit 0). oxlint reported no output beyond the run banner, denying warnings.
3. `npm run check` — PASS (exit 0). tsc --noEmit across the root project and configs/src/tsconfig.{core,server,bin}.json.
4. `npm run build` — PASS (exit 0). vite builds for core, server, bin all succeeded; build:host staged 175 files into dist/host; build:inventory staged 175 entries into host.json.
5. `npm test` — PASS (exit 0). All sub-projects (src:core 422 passed, src:server 466 passed/7 skipped, src:bin 257 passed, policy 102 passed, config 172 passed/1 skipped, setup 118 passed/3 skipped, guides 23 passed) passed.
6. `npm run test:distribution` — PASS (exit 0). 5 passed, 1 skipped. Duration 68.16s (packs and installs as expected).

## Anomalies (all expected, non-failing)

- `tests/src/core/templates.test.ts > emitted workspaces under their own gates > refuses a non-object peer dependency declaration at config load` prints stderr lines `[MIXED_EXPORTS]` and `failed to load config from ...malformed\vite.config.ts`. This is the test deliberately exercising a malformed config file; the test still passed.
- `npm run test:distribution` prints Node's `(node:19368) [DEP0190] DeprecationWarning: Passing args to a child process with shell option true...`. This is a Node warning from invoking `npm.cmd` through a shell, unrelated to test outcome; the suite still passed.
- API Extractor prints `*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.` during build:src:core, build:src:server, and during config tests. Informational only; build and tests still passed.

## Tree state

`git status --short`: 57 entries total — 43 modified, 2 deleted, 12 untracked.

Deleted: `.claude/agents/implementer.md`, `.codex/agents/implementer.toml`.
Untracked additions include `.claude/agents/opus.md`, `.codex/agents/sol.toml`, `.claude/agents/distiller.md`, `.codex/agents/distiller.toml`, `.agents/transports/cursor.md`, and five `.orkestrel/campaign/*` files. The `implementer` role deletions each pair with a corresponding addition (`opus`/`sol` split, plus a new `distiller` role), so this reads as a completed rename/split rather than a half-landed one.

`git diff --check`: exit 0, no whitespace errors.

`git diff --stat host.json`: 118 lines changed (68 insertions, 50 deletions). host.json changed because the vendored .agents/.claude/.codex role-file set changed (rename/split of implementer, new distiller and cursor.md, etc.). Per instructions this is not treated as drift. Entry count after build: 175.

## Verdict

GATES: GREEN
