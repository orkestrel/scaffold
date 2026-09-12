# Probe bin fixture correction reading

Root reran the isolated red with the same command in canonical Probe:

```text
node node_modules/vitest/vitest.mjs run --config vite.config.ts --no-cache --reporter=verbose --project src:bin tests/src/bin/main.test.ts --testNamePattern 'answers a pinned legacy client through the initialize path'
```

Exit 0. The pinned legacy initialize case passed in 11.024s. Other cases were
excluded by the explicit test-name filter, not accepted by this reading.

Root then ran the bin file without the filter:

```text
node node_modules/vitest/vitest.mjs run --config vite.config.ts --no-cache --reporter=verbose --project src:bin tests/src/bin/main.test.ts
```

Exit 0; duration 69.15s. The verdict record, oversized record, oversized rendering,
driven third-party client and pinned legacy initialize cases passed. Existing
host-specific stdout/stderr and signal-handling skips remain unchanged. The
signal readings state that this Windows host ends the child without running its
handler; this run does not prove cooperative signal teardown on Linux.

The diff changes draft data paths to constants.ts and wraps the resulting long
lines. It preserves candidate/control texts, workloads, deadlines, protocols,
receipt assertions and skip conditions. The preceding red/path-only observer
reading is d7n-probe-bin-fixture-reading.md. The actual observer receipt is:

```text
receipt probe:d3bab33cfc7e97de41527d770a87b9e8:type:typescript@6.0.3:oxlint@1.81.0:vitest@4.1.11:configs/src/tsconfig.core.json@434f59254d58cf2683d453a26bd0d837
```

Native guide parity also passed at d7n-probe-runtime-docs-parity. These scoped
readings do not replace the source or final registry prepublish gate.

The toolchain-head writer stopped without edits because the manifest-field
reader does not accept dependency keys. Root confirmed that limit and executed
the final visit's npm pkg get mechanism successfully. The reader successor brief
uses that supported command rather than widening a shared reader.
