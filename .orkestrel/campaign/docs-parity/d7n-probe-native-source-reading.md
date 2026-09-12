# Probe source gate reading

Root's d7n-probe-native-corrected-prepublish exited 1 after format, lint, type
checks and build passed. The runtime suite reported bin-entry failures. The
legacy wire case returned:

```text
Legacy protocol 2025-11-25 cannot represent a stream result
```

Root reran that case alone from the canonical Probe checkout:

```text
node node_modules/vitest/vitest.mjs run --config vite.config.ts --no-cache --reporter=verbose --project src:bin tests/src/bin/main.test.ts --testNamePattern 'carries the verdict record beside the rendered text'
```

The command exited 1 and reproduced the same protocol refusal at main.test.ts:556.
The full-suite receipt failures are not separately diagnosed by that result.
Root's npm ls reading confirms installed Contract0.0.16, LSP0.0.6 and MCP0.0.28.
The published lower-layer graph must be staged before the next source gate.
Keep source manifests unchanged until their reviewed registry preparation.

The independent review also found a CRLF helper defect. Root reproduced it at
d7n-probe-helper-line-endings-result.md. The helper's LF behavior and Guide-backed
comment extraction remain valid. The bounded CRLF successor carries that finding;
the objective lane's HELPERS confirmation does not override the executed red.

No Probe source acceptance, registry readiness or registered receipt is claimed.
