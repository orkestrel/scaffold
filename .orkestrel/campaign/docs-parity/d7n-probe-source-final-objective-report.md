Objective lane held. Closed Probe source context was reused, but the successor corrections were rechecked against the frozen diff and root evidence.

### HELPERS — CONFIRMED

Attack: CRLF, LF, absent opening/heading, and lone-carriage-return inputs.

Evidence: [`tests/setupServer.ts:357`](C:/Users/mikes/WebstormProjects/probe/tests/setupServer.ts:357) splits only LF and CRLF for claim extraction; [`tests/setupServer.ts:404`](C:/Users/mikes/WebstormProjects/probe/tests/setupServer.ts:404) normalizes only CRLF for section extraction. Lone `\r` therefore retains the predecessor behavior. Existing absence assertions remain at [`tests/setupServer.test.ts:41`](C:/Users/mikes/WebstormProjects/probe/tests/setupServer.test.ts:41) and [`tests/setupServer.test.ts:87`](C:/Users/mikes/WebstormProjects/probe/tests/setupServer.test.ts:87). The permanent LF/CRLF vector is at [`tests/setupServer.test.ts:90`](C:/Users/mikes/WebstormProjects/probe/tests/setupServer.test.ts:90). Root’s unchanged instrument failed before the correction and exited `0` afterward.

### DOCUMENTATION — CONFIRMED

Attack: compare RuntimeStage comments with the authoritative interface, remove reliance on teardown success paths, and compare receipt literals field by field.

Evidence: [`RuntimeStage.ts:145`](C:/Users/mikes/WebstormProjects/probe/src/server/stages/RuntimeStage.ts:145) and [`RuntimeStage.ts:156`](C:/Users/mikes/WebstormProjects/probe/src/server/stages/RuntimeStage.ts:156) retain the StageInterface summaries, parameters, returns, failure boundary, and teardown semantics from [`types.ts:246`](C:/Users/mikes/WebstormProjects/probe/src/server/types.ts:246). The omitted repeated method-level example does not change that contract; the class TSDoc already demonstrates inspect followed by destroy.

The guide reuses the preceding `claim`, reads `stage` and `issues`, and destroys in `finally` at [`guides/probe.md:674`](C:/Users/mikes/WebstormProjects/probe/guides/probe.md:674). Its real transcription uses `CLAIM.case` and deterministic teardown at [`tests/guides.test.ts:402`](C:/Users/mikes/WebstormProjects/probe/tests/guides.test.ts:402).

The source and guide receipt literals agree at [`Probe.ts:94`](C:/Users/mikes/WebstormProjects/probe/src/server/Probe.ts:94) and [`guides/probe.md:670`](C:/Users/mikes/WebstormProjects/probe/guides/probe.md:670). Their only receipt-field change is `oxlint@1.81.0` to `oxlint@1.82.0`. `CLAIM`, `DIGEST`, the `type` receipt stage, runtime assertions, and historical contract examples remain. Root’s RuntimeStage parity and supported authority rewrite exited `0`.

### FIXTURES — CONFIRMED

Attack: compare the predecessor and final bin-test hunks for changes outside paths and formatting.

Evidence: [`main.test.ts:205`](C:/Users/mikes/WebstormProjects/probe/tests/src/bin/main.test.ts:205), [`main.test.ts:293`](C:/Users/mikes/WebstormProjects/probe/tests/src/bin/main.test.ts:293), [`main.test.ts:735`](C:/Users/mikes/WebstormProjects/probe/tests/src/bin/main.test.ts:735), and [`main.test.ts:925`](C:/Users/mikes/WebstormProjects/probe/tests/src/bin/main.test.ts:925) change only constant-data draft paths to `src/core/<name>/constants.ts`, with wrapping around long literals. Candidate and control text, stage and reason, workloads, timeouts, protocol metadata, receipt assertions, and platform skips are unchanged. Root’s path-only red/green observation and complete bin-file run exited `0`. Windows skips remain explicitly unproven on Linux.

### HEAD-START — CONFIRMED

Attack: inspect requested install roots, identity checks, and before/after tracked-state bindings.

Evidence: [`install-probe-release-head.sh:20`](C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/install-probe-release-head.sh:20) limits external tooling to the declared supported set. [`install-probe-release-head.sh:106`](C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/install-probe-release-head.sh:106) requests only the accepted Guide, Scaffold, Test, runtime roots, and selected external roots. Runtime and external versions are checked explicitly at [`install-probe-release-head.sh:141`](C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/install-probe-release-head.sh:141); Guide and Scaffold archive and distribution identities are checked at [`install-probe-release-head.sh:68`](C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/install-probe-release-head.sh:68) and [`install-probe-release-head.sh:124`](C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/install-probe-release-head.sh:124).

The retained run records install exit `0`, the expected installed versions, and byte-equal HEAD, status, index, manifest, and lock evidence before and after. `npm ls` records the expected stale tracked ranges and exits `1`; this supports the explicit boundary that final registry pins and graph coherence remain open. No refreshed registered harness is claimed.

### LANDING — CONFIRMED

Attack: compare the predecessor carrier with the frozen successor and attempt to route Probe-only paths through Agent.

Evidence: [`commit-agent-probe-native-entry.sh:7`](C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/commit-agent-probe-native-entry.sh:7) admits the exact Probe guide, Probe TSDoc, RuntimeStage TSDoc, setup-helper tests, and bin-test paths only under `package=probe`; the same paths fail under Agent. The carrier still requires a PASS verdict, expected branch and HEAD, green prepublish receipt, clean index/untracked state, generated-host equality, and exact current manifest, diff, and index agreement at [`commit-agent-probe-native-entry.sh:6`](C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/commit-agent-probe-native-entry.sh:6). The final carrier hash matches the frozen review input.

The carrier does not bind arbitrary verdict prose or ignored dist bytes. Root must still require the active full prepublish to finish green and compare its reviewed, gated, and current state before invoking this carrier.

Historical Summary-red evidence and registered-harness refresh remain outside the proven scope.

VERDICT: PASS
