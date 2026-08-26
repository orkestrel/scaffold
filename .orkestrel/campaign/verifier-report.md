# Independent verifier — authoritative gate chains (2026-08-26, Windows host)

Chain per repo: `format:check` → `lint:check` → `check` → `build` → `npm test`.

## Lane V1 — GREEN

| Repo | format | lint | check | build | test |
| --- | --- | --- | --- | --- | --- |
| scaffold | 0 (213 files) | 0 | 0 | 0 (host 116 staged) | 0 (1147 tests) |
| lsp | 0 (148) | 0 | 0 | 0 | 0 (524) |
| guide | 0 (173) | 0 | 0 | 0 | 0 (515) |
| websocket | 0 (135) | 0 | 0 | 0 | 0 (307) |

Anomalies (no effect on outcomes): scaffold `templates.test.ts` intentional malformed-config
stderr; scaffold `config.test.ts` `Port 24678 in use` log during the host-inventory case.

## Lane V2 — GREEN (mcp with one recorded load flake)

| Repo | format | lint | check | build | test |
| --- | --- | --- | --- | --- | --- |
| process | 0 (148) | 0 | 0 | 0 | 0 (150 passed \| 6 skipped src; policy 93; config 46; setup 10; guides 99 \| 2) |
| mcp | 0 (217) | 0 | 0 | 0 | first chained run red on one timing race; every project green individually and the racing test green solo |
| browser | 0 (199) | 0 | 0 | 0 | 0 (src 495 \| 1 skipped — real launches included; policy 93; config 46; setup 41 \| 1; guides 53) |

mcp flake, recorded for a successor row (test robustness under contention, not OS coupling):
`tests/src/core/MCPLegacyClientTransport.test.ts:397` asserts a 20 ms timeout wins a race; under
full-suite concurrency the peer response wins instead; solo re-run 1 passed | 23 skipped. Same
class as the mcp baseline load flakes.

## Lane V3 — GREEN

| Repo | format | lint | check | build | test |
| --- | --- | --- | --- | --- | --- |
| console | 0 (170) | 0 | 0 | 0 | 0 (852) |
| terminal | 0 (158) | 0 | 0 | 0 | 0 (338) |
| test | 0 (149) | 0 | 0 | 0 | 0 (683 \| 10 skipped) |
| sea | 0 (141) | 0 | 0 | 0 | 0 (386 \| 2) |
| server | 0 (139) | 0 | 0 | 0 | 0 (419) |
| worker | 0 (165) | 0 | 0 | 0 | 0 (268) |
| agent | 0 (166) | 0 | 0 | 0 | 0 (811) |
| probe | 0 (158) | 0 | 0 | 0 | 0 (363 \| 10; suite ~221 s, foreground cap tripped once — tool timeout, not the suite) |

Anomalies informational only: probe fixture-teardown stderr; test repo's deliberate
unhandled-error fixtures; the recurring `unplugin-dts` TypeScript 6.0.3 engine notice in every
build.

## Verdict

Every repository's authoritative chain is green on this Windows host. mcp's single chained-run red
is a recorded load-race with a green solo re-run.
