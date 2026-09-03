# Unit browser-prose — report

## Sites

- `tests/setupServer.ts:455` — `Guaranteed teardown safety net for every fake browser process created through \`createFakeBrowserProcess\` — SIGKILLs any still-alive registered pid`
- `tests/setupServer.ts:516` — `Sever the active CDP WebSocket socket (through an HTTP control request to the`
- `tests/setupServer.ts:527` — `spawned as \`node <script> <cdp-flags...>\` (through \`executable\`/\`args\`) rather`
- `tests/setupServer.ts:539` — `process serving it. With none of these options the process idles (never`
- `tests/setupServer.ts:560` — `No shebang: the script is spawned through \`node <script>\`, never executed`
- `tests/setupServer.ts:639` — `.cjs entry point (resolved by using \`createRequire\` at script-GENERATION`
- `tests/setup.ts:51` — `via \`onSend\` for that method. Tests drive` → `through \`onSend\` for that method. Tests drive`
- `tests/src/server/Browser.test.ts:232,234` — `connect() via CDP discovery` → `connect() through CDP discovery` (comment and `describe` title)
- `tests/src/server/Browser.test.ts:458` — `page creation via the CDP test server` → `page creation through the CDP test server`
- `tests/src/server/Browser.test.ts:712` — `Reattach via CDP discovery on the same port.` → `Reattach through CDP discovery on the same port.`
- `tests/src/server/Browser.test.ts:1003` — `wires construction-time hooks via the on option` → `wires construction-time hooks through the on option`
- `tests/src/server/helpers.test.ts:164` — `dedupes a candidate reachable via two sources` → `dedupes a candidate reachable through two sources`
- `tests/src/core/compilers.test.ts:97` — `recognizes the real guard throw via the anchored, distinctive pattern` → `recognizes the real guard throw through the anchored, distinctive pattern`
- `tests/src/core/compilers.test.ts:133` — `embeds a selector containing quotes safely via JSON-safe quoting` → `embeds a selector containing quotes safely through JSON-safe quoting`
- `tests/src/core/BrowserCodegen.test.ts:120` — `No subscriptions should remain armed after the failed start` → `No subscriptions remain armed after the failed start`

## Sweep with rulings

Command: `grep -rniE '\bvia\b|e\.g\.|\bi\.e\.|\bsimply\b|\bjust\b|\bshould\b' /home/user/fleet/browser/tests`

Before edits, the sweep returned the sites listed under Sites, plus:

- `tests/setupServer.ts:212` — `An in-process HTTP+WebSocket server speaking just enough raw CDP to drive` — ruled **permitted**: `just enough` is the idiomatic sense meaning "exactly enough," not the filler `just` the substitution table bans.
- `tests/setupServer.ts:539` — `the process just idles` — ruled a banned filler sense and edited (see Sites).

After edits, the sweep returns only the permitted `tests/setupServer.ts:212` hit; no other banned sense remains in the Owned files.

## Gates

- `npm --prefix /home/user/fleet/browser run format:check` — exit 0
- `npm --prefix /home/user/fleet/browser run lint:check` — exit 0
- `npm --prefix /home/user/fleet/browser run check` — exit 0
- `npm --prefix /home/user/fleet/browser run build` — exit 0
- `npm --prefix /home/user/fleet/browser test` — exit 0 (module suites and guide parity all passed; `test:service` not run, per brief)

## Audit

`cd /home/user/fleet/browser && npx scaffold audit --offline` — `0 of 40 planned paths drifted from the plan. Audit compared bytes at 25, existence at 5, and nothing at 10.` — exit 0

`git -C /home/user/fleet/browser status --short` lists only Owned paths: `tests/setup.ts`, `tests/setupServer.ts`, `tests/src/core/BrowserCodegen.test.ts`, `tests/src/core/compilers.test.ts`, `tests/src/server/Browser.test.ts`, `tests/src/server/helpers.test.ts`.
