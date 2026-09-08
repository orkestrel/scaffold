Receipt: GREEN within recorded-evidence scope.

Commands used: PowerShell `Get-Content`, `ConvertFrom-Json`, `Test-Path`, `Get-FileHash -Algorithm SHA256`, and `Join-Path` against `.orkestrel/campaign/docs-parity/evidence/d7n-layer-survey-diagnostic/`.

- `run.json` population matches `d7n-layer-capture-brief.md`.
- Retained package directories, expected rows, streams, file digests, before/after captures, and Git-output comparisons match.
- Command records identify argument vectors and stream files. Each retained `npm view` vector names `https://registry.npmjs.org/`.
- No expired, aborted, truncated, signalled, failed, or nonzero command reading was found.
- Retained npm stdout parses as JSON with the expected `@orkestrel/<package>` name and a version.
- Mismatches: none.

Evidence pointers: [run.json](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/docs-parity/evidence/d7n-layer-survey-diagnostic/run.json), [rows.jsonl](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/docs-parity/evidence/d7n-layer-survey-diagnostic/rows.jsonl).

Limit: `origin/main` readings are cached. This receipt establishes no remote freshness, graph result, package health, installed-tree state, or carrier-source acceptance.
