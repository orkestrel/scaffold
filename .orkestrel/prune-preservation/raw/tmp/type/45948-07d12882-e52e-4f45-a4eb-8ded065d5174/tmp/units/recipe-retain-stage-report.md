# Retain and stage capture recipe evidence report

Authored `tmp/release/retain-stage-capture-recipe.ps1` without running it. The instrument requires the specified candidate HEAD, an empty index, frozen hashes for the journey skill, captures reference, and `host.json`, and no tracked modification outside those paths.

The instrument copies only the named canonical and candidate records. It preserves evidence-directory basenames, records SHA256 values for original and retained files, rewrites copied Markdown through an explicit longest-first path map, and refuses unmapped `tmp/units` or `tmp/audit` references.

The index records the effective and predecessor pairs, audit prescription, full-gate exit `0`, the absent full-log limitation, and unchanged original log, diff, and `.mjs` instrument bytes. The script stages only the journey skill, captures reference, `host.json`, and retained unit directory with explicit paths. It excludes raw `.diff` payloads from `git diff --cached --check` and reports the staged status and diffstat.

Syntax check: `powershell -NoProfile -Command "[void][scriptblock]::Create((Get-Content -Raw -LiteralPath 'tmp/release/retain-stage-capture-recipe.ps1'))"`.
