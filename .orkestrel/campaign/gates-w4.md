# Gate evidence — after the manifest writer

Run by an independent `verifier` at commit `5a8a54d`, working tree clean, no writer live.

| Gate                  | Exit |
| --------------------- | ---- |
| `npm run format:check` | 0    |
| `npm run lint:check`   | 0    |
| `npm run check`        | 0    |
| `npm run build`        | 0    |
| `npm test`             | 0    |

Per-project counts: `src:core` 8 files and 341 tests; `src:server` 5 files and 413 tests; `src:bin`
3 files and 191 tests; `policy` 1 file and 93 tests; `config` 1 file and 44 tests; `guides` 1 file
and 14 tests. The `config` project's inventory-alignment case reports 108 entries.

`readHostFloor` passes, confirmed by a filtered rerun. `tests/distribution.test.ts` is byte-untouched.

## The red this replaced, and its cause

The run at `ba948a5` was red at `tests/src/server/helpers.test.ts > readHostFloor` with "The
vendored host cannot read the declared file at guides/scaffold.md". `readHostFloor` compares each
staged file's bytes against the digest `host.json` declares and refuses to hydrate when they
disagree.

`guides/scaffold.md` is a vendored host file, declared at `host.json:604`. The Orchestrator applied
the guide-parity patch to it and committed after running only `test:guides` and `format:check`,
neither of which can see a stale inventory. The rule that editing a vendored file restales the
inventory was already recorded in the W1 brief and was not applied to the Orchestrator's own
integration.

Rebuilding and regenerating moved two digests: the guide's entry and the inventory's own.

The gate run that caught it also short-circuited: `npm test` is an `&&` chain, so the failure hid
every project after `src:server`, and the requested `test:guides` confirmation came back unmet
rather than green or red. A gate dispatch now asks for each link separately whenever the chain
fails, so no project's result is left unknown.
