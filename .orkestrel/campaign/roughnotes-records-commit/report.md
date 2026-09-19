# Roughnotes records staging report

The index contains the named Roughnotes acceptance, landing, publication, and records-commit paths, plus `recovery-current.md` and `recovery-live-tasks.md`. The stage-membership control excludes `.codex/config.toml` and `.orkestrel/campaign/rebaseline-2.md`.

The protected before and after hashes in `protected-before.json` and `protected-after.json` match the dispatch values. The staged inventory is in `staged-inventory.txt`. `raw-index-identity.json` records each staged blob and working-file hash.

The initial `git add -f` command exited `0` and staged the target set, but PowerShell treated Git's CRLF warning as a terminating native error before the script wrote its receipt outputs. The completed identity check records allowed Git line-ending normalization for unit `.gitattributes` files and generated receipt text. The retained raw evidence entries match their unfiltered disk hash. No evidence byte was rewritten.

The target exclusion preflight found no archive, PNG, JSONL, `node_modules`, user backup patch, or backup product/Codex payload. This report records explicit staging only and makes no final acceptance claim.
