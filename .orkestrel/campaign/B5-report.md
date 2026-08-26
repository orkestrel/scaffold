# Unit B5 report — browser: CDP endpoint-owner adoption

Implementer (Opus 5) returned 2026-08-26. Acceptance met; no deviation.

- Mechanism (probe-decided): a clean launcher exit (code 0, no signal) yields to the existing
  readiness budget instead of failing; after connect, `#adoptEndpointOwner` reads
  `SystemInfo.getProcessInfo` and adopts the `type: 'browser'` pid; liveness and termination route
  through the owned identifier; POSIX group path byte-identical as the first branch. Probes: Edge
  launcher exits at 32 ms, endpoint at 333 ms; CDP and process enumeration name the same pid;
  killing the adopted pid alone drains the tree and frees the profile immediately — no tree-kill
  utility, no new dependency, no new budget.
- Failure paths preserved: nonzero exit rejects naming the exit; clean exit with no endpoint fails
  on the readiness clock; an endpoint naming no browser process sends `Browser.close` and rejects.
- Fake infrastructure extended (`launcher`, `unnamed`, `browser()` accessor, `getProcessInfo`
  reply); new `Browser launcher hand-off` suite: adoption plus three failure guards;
  red-then-green plus a revert proof reddening exactly the adoption case.
- Real proof: full `Browser.test.ts` under default discovery (Edge first) — 108 passed | 1
  skipped in 32.31 s; survivor sweep `edge=0 node=0 browserdirs=0` at t+0 (two out-of-job Edge
  helpers identified as non-leaks, self-exiting, profile already removed).
- Gates: check, format:check (199), lint:check, test:guides (53); plus src:server 155|1, setup
  41|1, policy 93 observed green.
- Scope note recorded for the reviewer lane: the CDP-result parse is inline in `Browser.ts`
  (an exported helper would have shipped untested — its test file was outside the owned set).
- `pid` and `destroy` TSDoc, guide teardown passage, and the `launchBrowserProcess` remark
  restated to the endpoint-owner model; type shapes unchanged.

## Revert-proof counts (audit 15e settlement)

The unit's returned message carried them; this file initially did not. Command both sides:
`npx vitest run --config vite.config.ts --project src:server tests/src/server/Browser.test.ts -t "launcher hand-off"`.
Pre-fix source: 1 failed | 2 passed | 105 skipped (108). Post-fix: 4 passed | 105 skipped (109).
Revert proof (clean-exit guard removed, then restored): 1 failed | 2 passed | 105 skipped (108),
reddening exactly `adopts the process serving CDP when the spawned launcher exits 0 before
readiness`.
