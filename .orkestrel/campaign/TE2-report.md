# Unit TE2 report — test: guide claims match proven hosts

Implementer (Opus 5) returned 2026-08-26. Acceptance met.

- `guides/test.md` rewritten at the POSIX-claim sites (rule 6, rule 7, threat model): each claim
  now names the mechanism and the probe (`supportsMode`, the `sep`-reading gate) instead of a host
  or CI roster. Surviving `posix` hits enumerated and each stands as a mechanism name.
- Acceptance: guides 37 passed | 1 skipped; format:check green (149 files); grep audit quoted.
- Brief premise falsified by measurement and corrected: Node-on-NTFS does not record permission
  bits (`mkdtemp` reads back `0666`; `chmodSync 0o500` reads back `0444` — only the read-only
  attribute reflects); the guide states the measured reading.
- Cross-evidence: the key-shape proof runs on this host (1 passed in targeted run), so the guide's
  "proven where the reading holds" text is live.
