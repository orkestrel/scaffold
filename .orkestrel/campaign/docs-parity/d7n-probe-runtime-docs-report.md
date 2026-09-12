# Probe RuntimeStage documentation handoff

## Outcome

`RuntimeStage.inspect` and `RuntimeStage.destroy` now carry the summaries and method documentation established by `StageInterface`. Their signatures and runtime behavior are unchanged.

The Probe guide now shows how to run the documented claim's case through `RuntimeStage` in the configured current workspace. The example reads the runtime check's stage and issues, tears the stage down in `finally`, and states that this path does not run the type or lint stage or issue a `Probe` receipt.

The guide parity entry executes that transcription against the real `RuntimeStage` and `CLAIM.case`, requires the runtime stage with no issues, pins the matching guide lines, and destroys the stage deterministically.

## Changed paths

- `C:/Users/mikes/WebstormProjects/probe/src/server/stages/RuntimeStage.ts`: documents the public `inspect` and `destroy` methods.
- `C:/Users/mikes/WebstormProjects/probe/guides/probe.md`: adds the runtime-only guide example.
- `C:/Users/mikes/WebstormProjects/probe/tests/guides.test.ts`: executes and pins the guide transcription.
- `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/d7n-probe-runtime-docs-report.md`: records this handoff.

No package command ran. No public type, runtime implementation, CLAIM, DIGEST, full-Probe workload, receipt assertion, manifest, or lockfile changed.
