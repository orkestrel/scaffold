# Registry confirmation carrier report

## Changes

- Created `tmp/pass/confirm-agent-probe-registry.ps1` with the accepted Agent and Probe release observations and the `d7n-agent-probe-registry-confirm-closed` output label.
- Created `tmp/pass/run-agent-probe-registry-confirm.sh` with the `d7n-agent-probe-registry-confirm-run` output label and successor PowerShell carrier path.

## Validation

`bash -n tmp/pass/run-agent-probe-registry-confirm.sh` exited `0` with no output.

The registry confirmation carrier did not run. The registry result remains for the root measurement.
