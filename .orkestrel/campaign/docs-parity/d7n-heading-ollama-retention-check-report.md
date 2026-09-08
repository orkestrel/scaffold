# Returned-work retention check

1. R1 — CONFIRMED

Evidence: `tmp/pass/retain-heading-ollama.sh:9-17` requires each source, compares any existing destination byte-for-byte with `cmp`, and copies only when absent. The explicit source lists at lines 25-48, 50-63, and 65-91 contain the named unit records, instruments, logs, and guide evidence only; no journal stream, secret, node_modules, tarball, or unrelated tree is listed. Directory creation at lines 19-23 is limited to the named evidence directory. `set -euo pipefail` preserves top-level failures. `bash -n tmp/pass/retain-heading-ollama.sh` exited 0.

VERDICT: PASS
