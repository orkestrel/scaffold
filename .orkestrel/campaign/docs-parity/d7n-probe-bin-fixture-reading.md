# Probe bin fixture diagnosis

The updated canonical dependency graph removes the legacy stream refusal. The
remaining receipt failure is a case-side lint error in the bin test draft.

Root reran the pinned legacy-client test alone after installing MCP0.0.29:

```text
node node_modules/vitest/vitest.mjs run --config vite.config.ts --no-cache --reporter=verbose --project src:bin tests/src/bin/main.test.ts --testNamePattern 'answers a pinned legacy client through the initialize path'
```

Working directory: C:/Users/mikes/WebstormProjects/probe. Exit 1. The assertion
received a complete verdict without a receipt; the test ran for 10.930s.

Root then ran the retained observe-probe-bin-claim.mjs observer against that
checkout's built bin and installed MCP0.0.29 legacy client. It sends the exact
CLEAN/BROKEN/PASSING texts used by the failing fixture. It validates a complete
Verdict and prints its content; exit 0 means observation succeeded, not acceptance.

```text
node tmp/pass/observe-probe-bin-claim.mjs baseline
```

The case's lint stage reports:

```text
Move this module data to constants.ts or another data-kind file.
```

The reported draft is src/core/diagnostic.ts. Type and runtime case stages are
clean. The control also reports the intended string-to-number type error. Closing
line:

```text
no receipt
```

Root ran the path-only alternate:

```text
node tmp/pass/observe-probe-bin-claim.mjs constants
```

Exit 0. The src/core/diagnostic/constants.ts case has clean type, lint and runtime
stages. The control fails at type with the intended string-to-number error and
has clean lint and runtime stages. Closing line:

```text
receipt probe:d3bab33cfc7e97de41527d770a87b9e8:type:typescript@6.0.3:oxlint@1.81.0:vitest@4.1.11:configs/src/tsconfig.core.json@434f59254d58cf2683d453a26bd0d837
```

This establishes the correction for these bin data drafts. It does not establish
the whole bin file, the release gate, or the harness registration. The registered
probe tool was called again with a constants-path case and numeric type control;
it still returned the legacy stream error and supplied no closing receipt line.
That registration uses a different installed graph from canonical Probe.

The native guide run d7n-probe-native-corrected-parity exited 1. Its full receipt
case passed, but RuntimeStage.inspect and RuntimeStage.destroy lacked source
summaries, and RuntimeStage.inspect lacked an executed guide example. The scoped
documentation unit owns that drift. No runtime API change is authorized.
