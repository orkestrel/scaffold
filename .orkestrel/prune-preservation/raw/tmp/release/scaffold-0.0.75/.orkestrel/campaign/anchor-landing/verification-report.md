GATE REPORT — GREEN

- Recovery receipt: `git add -f -- .orkestrel/campaign/anchor-unit` exited `0` (`c7ea10`).
- Candidate HEAD is `2f78b38a7c938d7e4f5b5c8f2030385bfcb5d6eb`.
- The index contains only the accepted source paths and `.orkestrel/campaign/anchor-unit`; no unexpected staged path exists.
- Every manifest raw blob, disk blob, and staged blob matches SHA-256. `staged-identity.json` matches disk and index, including itself.
- Source disk and staged SHA-256 values match the manifest. Git clean-filter hashes equal the staged blob IDs.
- Unit-local `* -text` applies to all retained files.
- Required manifest records resolve on disk and in the index. Operational relative links resolve.
- Scoped whitespace check excluding immutable `raw/` exited `0`.
- Historical `.orkestrel/campaign/capture-recipe-unit/` remains untracked and unstaged: `git status --porcelain ...` exited `0`, output `?? .orkestrel/campaign/capture-recipe-unit/`.

Anomaly: the unrestricted `git diff --cached --check` reports whitespace in immutable raw records, including:

```text
.../raw/candidate/tmp/units/anchor-release-gates-node/stdout.log.txt:171: new blank line at EOF.
.../raw/candidate/tmp/units/anchor-repair-evidence-3/after.diff:27: space before tab in indent.
```

This is excluded from the required scoped whitespace acceptance check to preserve raw bytes. No source or non-raw whitespace failure occurred.
