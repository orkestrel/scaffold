**RED — staged receipt identity mismatch**

- Staged membership matches `stage-targets.txt`; no staged path falls outside it. Excluded archive, PNG, JSONL, `node_modules`, secret, backup-patch, and backup-payload patterns are absent. `.codex/config.toml` is refused by the in-memory membership control.
- Landing manifest records and publication manifest records match their retained bytes and still-existing sources. Required landing, publication, recovery-current, and root-acceptance links resolve.
- Protected paths are unstaged and retain the dispatch SHA-256 values. The raw landing verifier report hash is `778D0F9C5DC5D79065B36AD42F2C63526DF680C783E4FF95B70DD5FA79E023DE`.
- `raw-index-identity.json` has a raw receipt mismatch for `.orkestrel/campaign/roughnotes-records-commit/stage.ps1`:
  - recorded blob and disk hash: `a3051238f1def4a6e077da237224e4d76339019d`
  - actual staged blob, unfiltered disk hash, and filtered disk hash: `2564a0f45b410124ed2434c10d5c79d6a2a82e16`

The staged receipt cannot be accepted until its `stage.ps1` identity record matches the frozen staged bytes.
