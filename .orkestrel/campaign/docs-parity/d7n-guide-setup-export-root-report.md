# Shared fixture export integration

The shared fixture constant is exported and documented. Root retained the actual
pre-edit and post-edit files in evidence/d7n-guide-setup-export-before.ts and
evidence/d7n-guide-setup-export-after.ts. The exact delta adds its TSDoc and export
modifier; the carrier and runtime source remain unchanged.

The structural observation used this command:

```text
rg -q '^export const GUIDE_ROOT = ' C:/Users/mikes/WebstormProjects/guide/tests/setupServer.ts
```

Root received exit 1 before the edit at 0638d2 and exit 0 after it at 64ddae.
This command proves the named declaration's export spelling, not general API
conformance or a TypeScript compiler claim. The separate reviewer confirmed the
actual source correction in d7n-guide-setup-export-check-report.md.

Root ran the ordered Guide chain after the edit. It completed at f0ed00 with
exit 0; actual build and test output was read at 6f6c26 and 654581. The final
server controls ran without a skipped case. Existing vendored platform skips
and compiler warnings remain visible. Source and metadata/index preservation
checks passed. Read evidence/d7n-guide-setup-export-gates.

The artifact check at 57b785 exited 0. Root read artifact.json at dcc215; the
named core/server hashes still match canonical, packed and installed entries.
The whole dist/src tree comparison at c4bd3d also exited 0, including CommonJS
and source-map outputs; README matches the accepted archive. Read
evidence/d7n-guide-setup-export-artifact. The Git text comparison at 29abd9 is
not the byte-identity proof because it reports line-ending normalization.

The accepted capture at 296573 exited 0. Root's b9b913 hash reading matches the
Guide capture to the final gate diff at
3d051a7277d6fb4516face9efb08b7a826001c7490af9de3836d8d68995d8af9.
Scaffold's unchanged capture still matches its gate diff at
6f504df10efea41646b7b2935aae03410fd4b6c5156766f4306475df69e08969.
No replacement archive or Scaffold rerun is required for the test-only export.
