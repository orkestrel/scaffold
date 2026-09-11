# Compare Markdown's staged output

Act as Terra builder. Read AGENTS.md, orchestration, portability/writing/quality
rules and publish skill with wave/window references. Own only the new
tmp/pass/compare-following-markdown.sh. Return the report as your final message.
No package edits, installs, gates, commits, pushes, credentials or delegation.

Create a new Bash measurement script; there is no predecessor to preserve.
Source pass-env.sh. Require a safe fresh output-label argument under SCR.
Verify old archive SHA256 02c46ebab1a401365ba73aafc9b644b7d21cf8924ee104364138dada2b10f9c3
at SCR/d7n-markdown-stage.87s5ja/packed/orkestrel-markdown-0.0.14.tgz. Verify the
final archive with packed/d7n-markdown-following-final-pack/archive.sha256.
Extract only package/dist from the old archive into the new output directory.
Compare that extracted dist to canonical FLEET/markdown/dist, recording raw
recursive, no-map, and no-map/whitespace comparisons and actual exit codes.
Diff exit1 is measured movement; any other failure refuses. Compare final pack
extract/package/dist with canonical dist and require exit0. Capture canonical
HEAD/status/manifest hashes before and after and require them unchanged.

Use actual node-independent Git Bash tar/diff/sha256sum and path arguments from
pass-env. git -C everywhere. No working copy or source tree is created; only a
verified packed distribution is extracted. No deletion. Do not assume old/new
equality; root reads the measurements. Use apply_patch, run Bash syntax only,
and return the authored path and exact syntax result. Root executes after review.
