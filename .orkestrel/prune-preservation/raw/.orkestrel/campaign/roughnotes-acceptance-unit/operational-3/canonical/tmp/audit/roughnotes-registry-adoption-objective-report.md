Read this operational translation from its document directory. Commands name retained inputs but keep the historical working-root requirements of the [raw execution record](../../../../canonical/tmp/audit/roughnotes-registry-adoption-objective-report.md). Do not execute acceptance mutations from this retained folder. Historical image and portfolio tokens identify retained inventory carriers; image measurements and inspection statements describe the original PNGs.

Objective lane: GPT-5.6 Sol, independently auditing Sol-authored work.

1. **CONFIRMED — install admission guards.** The CLI validates version, integrity format, and run name before creating evidence. Physical target, Git root, branch, and HEAD checks precede installation and repeat immediately before it. Registry name/version/integrity must match. Existing run evidence refuses replacement. See `../../../../canonical/tmp/release/adopt-roughnotes-registry.mjs`, `:157`, `:165`, and `:172`.

   Independently executed controls admitted the accepted recovery identity and supplied registry integrity. Wrong version, malformed integrity, unsafe run name, and mismatching registry fields refused. Missing CLI parameters returned exit `1` with the usage message.

2. **CONFIRMED — bounded mutation and retained observations.** The spawn uses the fixed Node executable, npm JavaScript entry, recovery working directory, `shell: false`, and the exact named arguments including `--ignore-scripts`. Before mutation, the instrument records identities and hashes, copies manifest/lock bytes, and repeats source and manifest comparisons. Successful completion requires registry lock resolutions, installed identities, nonlinked directories, matching Scaffold integrity, and unchanged protected source. See `../../../../canonical/tmp/release/adopt-roughnotes-registry.mjs`, `:91`, `:140`, and `:166`.

   Independent read-only comparisons matched the supplied source, dependency identity, and manifest/lock baseline. Changed source hashes and deletion records refused. Boundary controls refused paths outside recovery. Sensitive-path controls excluded the named credential paths without reading their contents. The accepted manifest and lock are regular files.

   The failure path retains partial state, writes `success: false` and `rollback: false`, and returns nonzero. See `../../../../canonical/tmp/release/adopt-roughnotes-registry.mjs`.

3. **CONFIRMED — structural launcher and failure reporting.** The launcher redirects output, retains `Process.Handle`, reports the tracked PID, waits with its `900000` ms limit, invokes PID-scoped tree termination on expiry, records the termination result, and returns exit `124`. Completed runs propagate the Node exit. See `../../../../canonical/tmp/release/launch-roughnotes-registry.ps1`, `:20`, and `:24`.

   The script writes a success terminal record only after npm exit and postconditions pass. npm failure, source drift, and unreadable post-install identity cannot take that branch. Observation failures receive separate evidence records. See `../../../../canonical/tmp/release/adopt-roughnotes-registry.mjs` and `:190`.

   Actual installation and process-tree termination remain unexecuted limits, as the brief specifies.

Independent executed checks:

- The named Node executable with `--check ../../../../canonical/tmp/release/adopt-roughnotes-registry.mjs`: exit `0`.
- The named Node executable with `../../../../canonical/tmp/release/adopt-roughnotes-registry.mjs`, omitting parameters: exit `1`.
- PowerShell `Parser::ParseFile` against the launcher: exit `0`.
- `Get-FileHash -Algorithm SHA256` against the instruments: matched the brief.
- The named Node executable with `--input-type=module -e $auditCode`: executed the read-only guard and boundary controls described earlier. The initial boundary probe exited `1` because `../roughnotes/package.json` resolves inside recovery; the corrected outside-path probe exited `0`.

Writer-supplied controls in `../../../../canonical/tmp/units/roughnotes-registry-adoption-evidence/validation-results.txt` are corroboration, separate from these independent runs.

Findings fitting no claim: none.

Attacked and held: partial npm failure and failed post-install observations cannot produce the script’s success record. Intentionally dirty accepted source does not trigger a clean-tree requirement. Source/deletion comparisons bind to that accepted working state. Timeout evidence belongs to the launcher; killing Node need not produce a Node terminal record.

VERDICT: PASS
