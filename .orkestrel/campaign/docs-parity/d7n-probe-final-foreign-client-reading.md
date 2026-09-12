# Probe final foreign-client reading

Root drove the canonical built Probe entry after the final registry prepublish
and actual packing finished. The registry visit pins MCP0.0.29 and preserves
the optional external peers. The archive's complete dist equals canonical dist.
No writer or build intervened after packing.

Root ran the retained observer from canonical Scaffold:

```text
node tmp/pass/observe-probe-bin-claim.mjs constants
```

Exit 0. It uses the installed MCP legacy client transport with its pinned
fallback protocol, initializes the real stdio server and calls prove. The case
has clean type, lint and runtime stages. The numeric control fails at type
while its other stages remain clean. The actual formatted closing line is:

```text
receipt probe:d3bab33cfc7e97de41527d770a87b9e8:type:typescript@6.0.3:oxlint@1.82.0:vitest@4.1.11:configs/src/tsconfig.core.json@434f59254d58cf2683d453a26bd0d837
```

Root also ran the existing foreign-client cases in canonical Probe:

```text
node node_modules/vitest/vitest.mjs run --config vite.config.ts --no-cache --reporter=verbose --project src:bin tests/src/bin/main.test.ts --testNamePattern 'answers a driven third-party client|answers a pinned legacy client'
```

Exit 0; duration 21.90s. The modern driven client and pinned legacy initialize
case passed with their verdict/receipt assertions unchanged. The filter excludes
other cases; the preceding full prepublish covers the package suite. Raw output
and exits are retained under evidence/d7n-probe-final-foreign-client.

This proves the released dependency graph's built package path, not the harness
registration that still loads a different installed graph. Do not reinterpret
its retained legacy transport error as a failed result from this run.

The completed registry visit is retained under
evidence/d7n-probe-final-registry-visit-complete. The earlier similarly named
directory without the complete suffix remains its immutable landing-time
snapshot. Final prepublish and pack evidence retain their ordinary suffixes.
