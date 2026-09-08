# Layer capture report

Created `tmp/pass/layer-capture/Capture.mjs`, `constants.mjs`, `helpers.mjs`, `main.mjs`, `child.mjs`, and `test.mjs`.

The carrier accepts absolute fleet-root, output-directory, npm CLI, and Git paths. It records fixed-population file copies, Git and npm command outcomes, stream files, digests, JSONL rows, and run metadata. Each command row retains the process settlement and the UTF-8 stream copies. It preserves `failed`, including Git ancestry exit `1`, as returned by the process primitive.

Validation ran:

```text
node --test tmp/pass/layer-capture/test.mjs
✔ copies file bytes and records their digest (10.5446ms)
✔ retains a missing file failure without contents (3.6603ms)
✔ refuses an occupied output without changing its sentinel (5.9601ms)
✔ retains unicode malformed output and a nonzero settlement (68.4096ms)
ℹ tests 4
ℹ suites 0
ℹ pass 4
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 181.2889
```

The installed formatter and linter do not admit the owned `.mjs` paths under their project configuration. `oxfmt --check tmp/pass/layer-capture/*.mjs` reported that the targets were excluded. `oxlint --deny-warnings tmp/pass/layer-capture/*.mjs` reported no files to lint. No live fleet or registry command ran.

The created-file diff is the full addition of the carrier directory's `Capture.mjs`, `child.mjs`, `constants.mjs`, `helpers.mjs`, `main.mjs`, and `test.mjs` files. Git ignores the owned `tmp/` paths, so normal status output does not list this carrier or this report. The captured root status follows.

```text
 M .orkestrel/campaign/docs-parity/d7-fleet-plan.md
 M .orkestrel/campaign/docs-parity/d7n-layer-alignment-plan.md
 M .orkestrel/campaign/docs-parity/rulings.md
M  package-lock.json
 M package.json
?? .orkestrel/campaign/docs-parity/d7n-capture-command-reading.md
?? .orkestrel/campaign/docs-parity/d7n-contract-npm-ls.err.txt
?? .orkestrel/campaign/docs-parity/d7n-contract-npm-ls.raw.txt
?? .orkestrel/campaign/docs-parity/d7n-contract-view-full.log.txt
?? .orkestrel/campaign/docs-parity/d7n-layer-capture-brief.md
?? .orkestrel/campaign/docs-parity/d7n-layer-reading-boundary-objective-report.md
?? .orkestrel/campaign/docs-parity/d7n-layer-reading-boundary-subjective-report.md
?? .orkestrel/campaign/docs-parity/d7n-layer-reading-boundary-verdict.md
```
