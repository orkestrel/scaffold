# Recipe stage finalization report

Authored `tmp/release/finalize-recipe-stage.ps1` without executing it. The script preserves prior retention outputs and adds completion artifacts only to `.orkestrel/campaign/capture-recipe-unit-2`.

The script excludes raw `.txt`, `.diff`, and `.tsv` evidence from the cached prose/code whitespace check. It writes unit-local `* -text` attributes, renormalizes the staged unit, and compares every staged unit file's unfiltered disk object with its index blob. It checks the comparison report itself after staging it.

Syntax invocation: `powershell -NoProfile -Command "[void][scriptblock]::Create((Get-Content -Raw -LiteralPath 'tmp/release/finalize-recipe-stage.ps1'))"`.
