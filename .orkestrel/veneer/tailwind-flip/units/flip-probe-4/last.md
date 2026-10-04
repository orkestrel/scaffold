P4 derived **73 rows**: 44 reproduce the current table, 29 are outside it, and 2 current rows were not reproduced: `:where(.table) tr` and `tfoot`.

The corpus comparison derived 12 of 13 row identities; 61 derived rows fall outside that list. The missing `img-thumbnail` restore reads `inline → block` on its specimen, which signature deduplication did not select.

In the final 1280 light closed condition:

- Residuals: **0 preflight, 0 unattributed**, against probe-3’s 0 and 18.
- `resolved`: **288**, or 4,650 across the final matrix. Largest matrix groups: scoped table headers 1,120; `.ratio::before` 896; scoped table cells 336.
- Copy-check hits: **1,960 across the final matrix**, 3,920 across all iterations per run.
- Signatures/elements: **2,493/15,431** at 1280 and **213/1,084** at 390, closed.

Both runs exited 0. **`cmp` exited 0: byte-identical output.** Durations were 481.044 s and 491.081 s; iteration durations are recorded in the report. Chromium: 141.0.7390.37.

Artifacts:

- [report.md](/home/user/veneer/tmp/probes/flip5/report.md)
- [curation.json](/home/user/veneer/tmp/probes/flip5/curation.json)
- [out/p4.json](/home/user/veneer/tmp/probes/flip5/out/p4.json)

All required runs completed. `git status --porcelain` is empty. No tracked file changed; nothing committed.