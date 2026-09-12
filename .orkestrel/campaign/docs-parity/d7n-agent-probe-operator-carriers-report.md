# Carrier update report

## Changes

- Updated `tmp/pass/commit-agent-probe-native-entry.sh` to allow `src/server/Probe.ts` only for the Probe source-landing branch.
- Created `tmp/pass/confirm-agent-probe-layer.sh` from the dependent-layer carrier with the Agent `0.0.21` and Probe `0.0.13` confirmations.
- Created `tmp/pass/commit-agent-probe-operator.sh` from the dependent operator carrier with the Agent-and-Probe verdict, parser, confirmation carrier, and commit-subject replacements.

## Validation

`bash -n tmp/pass/commit-agent-probe-native-entry.sh`, `bash -n tmp/pass/confirm-agent-probe-layer.sh`, and `bash -n tmp/pass/commit-agent-probe-operator.sh` exited `0` with no output.

No carrier ran. No package, retained instrument, prompt, or campaign record changed.
