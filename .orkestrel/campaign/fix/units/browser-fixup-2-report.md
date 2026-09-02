# Report — unit browser-fixup-2 (builder, Sonnet)

Finding closed: `src/core/CDPClient.ts:216` emits `close` before the throw in the connect-race
teardown, so the race path fires `close` once; `src/core/types.ts:44` reads "`close` fires after
an explicit teardown, including one that interrupted a pending `connect()`";
`tests/src/core/CDPClient.test.ts:374-393` wires `close` and `drop` recorders before the race and
asserts `close.count` 1 and `drop.count` 0 after both promises settle. `guides/browser.md`
restates no `close` sentence (its `:1352` lists the event names only), so it is unchanged.

Red-then-green (`npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/CDPClient.test.ts`):
before the emission, `expected +0 to be 1` at `:392` (`close.count`), 1 failed | 35 passed; after,
36 passed.

Gates: format:check 0, lint:check 0, check 0, build 0, test 0 (src 515, policy 111, config 46,
setup 42, guides 68). `git status --short`: `src/core/CDPClient.ts`, `src/core/types.ts`,
`tests/src/core/CDPClient.test.ts`. No deviation.
