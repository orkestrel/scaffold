# Registered transport baseline remains red

Root called the registered probe/prove tool with
d7n-agent-probe-transport-claim.json. It returned no verdict or closing receipt:

```text
tool call error: tool call failed for `probe/prove`

Caused by:
    Mcp error: -32000: Legacy protocol 2025-11-25 cannot represent a stream result
```

This is a registered transport failure, not a rejected TypeScript claim. The
canonical Probe checkout is still being prepared. Its later built-artifact
transport proof must not be reported as a refreshed harness registration.
No source, registration, credential or registry mutation ran in this observation.
