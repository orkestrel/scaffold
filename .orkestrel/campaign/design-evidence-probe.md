# Orchestrator probe: `Process.evidence` lifetime, 2026-08-21

Taken before reconciling the two design lanes, because both rest on it and neither could
settle it without executing. Driven against the real `@orkestrel/process` build installed in
the mcp checkout, with a real spawned child writing a sentinel to its own `stderr`.

```text
A alive           : "SENTINEL-STDERR-LINE\n"
A after destroy() : "SENTINEL-STDERR-LINE\n"
B after own exit  : "SENTINEL-STDERR-LINE\n"
B after destroy() : "SENTINEL-STDERR-LINE\n"
C silent child    : ""
```

Rulings this fixes:

- **The tail survives teardown.** `Process.evidence` answers identically before `destroy()`,
  after `destroy()` resolves, and after the child's own exit settles. The supervisor retains
  the decoded tail rather than releasing it with the child, so a capture may sit on either
  side of teardown without losing bytes. The subjective lane's U1 unknown is closed and its
  recommended placement carries no risk of an empty read.
- **A silent child answers `''`, not `undefined`.** The absence table — `undefined` for no
  child, `''` for a child that ran and wrote nothing — is measured rather than argued.
- **What the probe does NOT settle:** whether bytes a child writes during the bounded
  `SIGTERM` window reach the supervisor before a `close()` capture. That is a race, not a
  retention question, and it stays the guide's stated caveat.
