# Refresh the measured receipt example

Act as the bounded builder directly; spawn nothing. Read Scaffold AGENTS.md,
orchestration and rules writing, documentation, TypeScript, portability and
quality. Read the Probe guide's receipt example and matching Probe class TSDoc.
Work only in canonical C:/Users/mikes/WebstormProjects/probe. Preserve all
existing edits. Own src/server/Probe.ts TSDoc only, guides/probe.md prose only,
and scaffold/tmp/units/d7n-probe-receipt-refresh-report.md.

Root staged the supported release tools without changing tracked metadata.
The native run d7n-probe-supported-receipt-red exited 1 only at the documented
receipt assertion. The real claim and project digests remain unchanged. The
returned receipt differs from the documented value only at oxlint@1.82.0 where
the prior example says oxlint@1.81.0. Root read the actual expected line:

```text
verdict.receipt // 'probe:fcb88a2dee987b8673c1fc7107979470:type:typescript@6.0.3:oxlint@1.82.0:vitest@4.1.11:configs/src/tsconfig.core.json@434f59254d58cf2683d453a26bd0d837'
```

In src/server/Probe.ts, replace only that example's oxlint@1.81.0 segment with
oxlint@1.82.0. Do not change the other historical receipt examples or cost data.
Do not change runtime code, public contracts, CLAIM, DIGEST or assertions.

In guides/probe.md, replace the added phrase "the claim above" with "the
preceding claim". Replace the sentence "These things in it are load-bearing:"
with "The full Probe example depends on these details:" so the added runtime
example does not obscure the paragraph's subject. Do not edit the guide receipt
literal manually. Root will run test:guides with --to guide to propagate the
source TSDoc authority, then run native parity again.

Use apply_patch. No installs, builds, package commands, commits, pushes, auth,
vendored-file edits, assertions, any, ignored diagnostics or mocks. Return the
exact bounded diff and report; root owns execution and independent acceptance.
