# Capture review inputs

The `capture-agent-probe-review.sh` script captures the requested Agent, Probe, and scaffold evidence under an unused safe label.

The script records predecessor and successor deltas, their exit receipts, and SHA256 receipts for each successor script.

Validation: `bash -n tmp/pass/capture-agent-probe-review.sh` exited 0.
