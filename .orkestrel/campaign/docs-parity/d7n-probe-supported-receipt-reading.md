# Probe release-toolchain receipt reading

Root ran install-probe-release-head.sh after the bin fixture checks ended. Its
registry-selected external roots are API Extractor7.59.1, Node types26.5.1,
Oxfmt0.67.0, Oxlint1.82.0, TypeScript6.0.3, Vite8.3.0 and Vitest4.1.11.
The install, installed-version and accepted Guide/Scaffold distribution checks
passed. HEAD, index, status and manifest/lock hashes remained unchanged. Tracked
registry pins and optional peer updates remain the final visit's responsibility.

The native run d7n-probe-supported-receipt-red exited 1 at the documented receipt
assertion. Its result has the unchanged claim digest and project digest. The
expected guide line from the actual result is:

```text
verdict.receipt // 'probe:fcb88a2dee987b8673c1fc7107979470:type:typescript@6.0.3:oxlint@1.82.0:vitest@4.1.11:configs/src/tsconfig.core.json@434f59254d58cf2683d453a26bd0d837'
```

The preceding accepted example differs only at oxlint@1.81.0. Restoring that
field gives the exact preceding literal; no claim or project digest was reset.
The builder changed the matching Probe class TSDoc field and clarified the added
runtime example's surrounding prose. It did not change runtime or public types.

Root propagated source authority through the supported native entry:

```text
npm run test:guides -- --to guide
```

The d7n-probe-supported-receipt-rewrite run wrote guides/probe.md and exited 0
after executing parity and the real examples. Root then ran format, which
exited 0. The full source prepublish is d7n-probe-source-final-prepublish; its
terminal reading is required before source acceptance. No final gate result is
inferred from the rewrite.

The harness's registered tool remains distinct. These package runs do not
claim that its installation or connection was refreshed.
