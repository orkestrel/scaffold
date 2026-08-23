# Gate evidence — after the fix round

Run by an independent `verifier` at commit `07f9a96`, working tree clean, no writer or auditor live.

| Gate                     | Exit |
| ------------------------ | ---- |
| `npm run format:check`    | 0    |
| `npm run lint:check`      | 0    |
| `npm run check`           | 0    |
| `npm run build`           | 0    |
| `npm test`                | 0    |
| `npm run prepublishOnly`  | 0    |

Per-project counts: `src:core` 347, `src:server` 413, `src:bin` 196, `policy` 93, `config` 44,
`guides` 14. `prepublishOnly` re-ran the whole chain and then
`test:distribution -- --mode release`: 5 tests in 50.70s against the live registry.

`prepublishOnly` is the gate that decides whether this package can publish, and it is green.

The load-sensitive peer-resolution case passed without an isolated re-run. The verifier was told to
take a second reading alone if it failed, and did not need to.

Two anomalies, both expected: a negative-path fixture prints a config-load failure it asserts on, and
API Extractor notes its bundled TypeScript differs from the project's.
