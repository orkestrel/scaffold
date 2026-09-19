# Roughnotes acceptance retention report

The retained bundle is `.orkestrel/campaign/roughnotes-acceptance-unit`. It preserves the effective R-B source pair, the source freeze diffs and rejection/setup evidence, the final audit materials, the registry adoption and gate instruments with executed records, the capture metadata, and the final verifier pair.

`manifest.json` maps every copied source to its destination and records matching SHA-256 values. `retain.ps1` performed the copy with collision refusal. The copied raw reports have no path rewrites. The manifest records the source roots for canonical, recovery, and capture records, and names the existing campaign carriers for the retention map and acceptance rulings.

The effective source pair is `canonical/tmp/units/r-b-brief-11.md` and `recovery/tmp/units/r-b-report-11.md`. The effective registry pair is `canonical/tmp/units/roughnotes-registry-adoption-brief.md` and `canonical/.orkestrel/campaign/roughnotes-registry-acceptance.md`. The registry author report, gate successor report, host report, capture-retention report, final verifier report, execution records, control records, capture inventory, journey records, and executed instruments retain their source-root context in the manifest.

The SHA-256 verification command read every manifest source and retained path, compared the measured values with the manifest, and exited `0`. The exclusion command found no PNG, archive, or `node_modules` payload and confirmed the manifest has no rewritten navigation record. `git diff --check -- .orkestrel/campaign/roughnotes-acceptance-unit` exited `0`.

The initial directory command used `New-Item -LiteralPath`, which Windows PowerShell rejected before it created a directory or copied a file. The corrected command used `New-Item -Path`; it copied `brief.md` first and matched SHA-256 `65A1CB13C979035A40995E5D5141E68D54A90DE28BE60B6136F0517946E32C5C` against its source.

No named effective input is unresolved. The historical absent original R-A2 writer report remains reconstructed at `.orkestrel/campaign/r-a-2-recovered-report.md`, as the recovery-retention ruling requires; this bundle does not fabricate or absorb that predecessor. Global predecessor retention, campaign disposal, source integration, the field pass, and debrief remain outside this retention unit.

Root can stage `.orkestrel/campaign/roughnotes-acceptance-unit` after independent review. This report records retention work and makes no acceptance judgment.
