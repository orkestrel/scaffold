Completed the prescribed successor fix:

- `scripts/ollama.sh`: explicitly requires `2xx` status for version, pull, and warm responses while preserving multiline JSON bodies.
- `tests/setupServer.ts` and `tests/src/server/helpers.test.ts`: added redirect controls and permanent version, pull, and warm refusal coverage. Version uses `[::ffff:127.0.0.1]` to reach the real fixture while remaining outside approved local-startup hosts.
- `src/core/types.ts` and `guides/scaffold.md`: corrected inventory and HTTP-status contracts.
- `tests/distribution.test.ts`: added the missing Bootstrap reference paths to the exact membership list.

I read the retained distribution failure output. No gate or runtime command was run.
