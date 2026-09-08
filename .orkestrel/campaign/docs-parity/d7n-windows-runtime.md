# Windows runtime registry

Use this registry with the handoff. Keep a running unit's journal in tmp until its
terminal result; retain the result projection with its report and verdict.

| Unit | Lane and ownership | Baseline | Journal and session | Supervisor | State |
| --- | --- | --- | --- | --- | --- |
| d7n-agent-converge-fix | documentation writer in agent; ported fix brief and Windows supplement revision | 54e7199 | tmp/claude/d7n-agent-converge-fix-windows.jsonl; 559ee679-07fa-42ee-889b-168bf87e58a0 | exec session 60983 exited 0 with a deviation report | returned without edits; shell calls denied |
| d7n-guide-heading-scout | read-only guide contract and dependency map | guide 1d5afa3 | tmp/cursor/d7n-guide-heading-scout.jsonl; fabbd6f5-c285-4dbf-b5d3-680126b8f9dc | terminal result read on host | returned; exact result retained |
| d7n-guide-heading-design | objective design lane | guide 1d5afa3 | native guide_heading_design_objective | native task | returned; reconciled with the direct host proof |
| d7n-guide-heading-design | subjective design lane | guide 1d5afa3 | tmp/claude/d7n-guide-heading-design-subjective.jsonl; efbe4adf-85ec-4382-9d11-65d60e355dd4 | exec session 9959 exited 0 | returned; reconciled in the design verdict |
| d7n-agent-host-instruments-check | mechanical instrument checker | scratch instruments | native agent_host_instruments_check | native task | successor PASS; host preflight reproduced the audit red |
| d7n-agent-converge-fix-host | read/edit-only documentation writer; host owns shell validation | agent 54e7199 | tmp/claude/d7n-agent-converge-fix-host.jsonl; 17a051e7-2d5b-45fe-8caa-3ecde5989869 | exec session 86832 exited 0 | host readings passed; landed and branch pushed as 305af91; closure pending |
| d7n-guide-heading-fix | native objective writer in guide | guide 1d5afa3 | native guide_heading_fix | native task | returned; focused red and green recorded; independent acceptance pending |
| d7n-guide-final-instruments | native mechanical instrument author | scratch instruments | native guide_final_instruments | native task | successor returned; independent script check PASS |
| d7n-ollama-host-instruments-check | mechanical instrument checker | scratch instruments | native agent_host_instruments_check | native task | successor PASS; final preflight reproduced the audit red |
| d7n-guide-heading-fix-review | read-only subjective fix audit | guide 1d5afa3 plus supplied diff | tmp/claude/d7n-guide-heading-fix-review.jsonl; 779bc6a0-a3db-4381-9773-38f01d5edfef | exec session 69079 exited 0 | returned; supported fixture and prose corrections recorded in the verdict |
| d7n-guide-heading-validate | root-owned full gate chain | guide 1d5afa3 plus returned fix | tmp/pass/d7n-guide-heading-validate.YG8PtL | exec session 5158 exited 1 | config policy-rule test failed again in the isolated host rerun |
| d7n-guide-config-scout | read-only diagnostic evidence map | guide and canonical policy seam | tmp/cursor/d7n-guide-config-scout.jsonl; 01359254-696d-4eda-800d-8a560e54b83c | exec session 58932 exited 0 | returned; host observation confirms the rule emits a file-URL diagnostic that the test compares with a relative path |
| d7n-ollama-converge-fix-host | read/edit-only documentation writer; host owns validation | ollama 98e9c34 | tmp/claude/d7n-ollama-converge-fix-host.jsonl; 3abd79b7-45f4-4714-afef-0e7c44639890 | exec session 6858 exited 0 | returned; report and candidate retained; host validation and independent review pending |
| d7n-scaffold-path-map | bounded read-only diagnostic and propagation map | scaffold c87021bd | tmp/cursor/d7n-scaffold-path-map.jsonl; b7c3d2dd-ed6e-4b61-9e4d-7f9f54330116 | exec session 51231 exited 0 | returned; root confirmed session and terminal result |
| d7n-scaffold-path-design | objective design | scaffold c87021bd | native scaffold_path_design_objective | native task | returned and reconciled in d7n-scaffold-path-plan.md |
| d7n-scaffold-path-design | subjective design | scaffold c87021bd | tmp/claude/d7n-scaffold-path-design-subjective.jsonl; 932f3564-5915-4b6a-982d-b09037d6138b | terminal result read; no error or denials | returned and reconciled; projection retained |
| d7n-scaffold-path-host | isolated bootstrap | scaffold c87021bd | tmp/pass/scaffold-path-log.UOq5l7 | root command exited 1 | install passed; named config regression reproduced; root owner readings unchanged |
| d7n-scaffold-path-fix | native implementer, Sol | isolated scaffold c87021bd | native scaffold_path_fix | native task | successor returned; real-binary regression green; bootstrap host and guide readings corrected; direct-test audit findings carried to bounded successor |
| d7n-scaffold-path-fix-3 | native builder, Terra | isolated path candidate | native scaffold_path_fix_controls | native task | returned; mutation controls and scoped checks passed; root independently reproduced negative controls and restored green |
| d7n-scaffold-path-audit | objective analyst, Sol | frozen path candidate | native scaffold_path_audit_objective | native task | returned; direct-test gap retained in audit verdict |
| d7n-scaffold-path-audit | subjective reviewer, Opus | frozen path candidate | tmp/claude/d7n-scaffold-path-audit-subjective.jsonl; 2db26d0a-a70f-49a7-bde4-5f61439a7ae2 | terminal result read without error or denials | returned; direct mutation evidence and fixture/TSDoc corrections carried to bounded successor |
| d7n-scaffold-path-prepare-check | mechanical checker through Cursor Grok | completed isolated preparation run | native scaffold_path_prepare_check bridge | native task | running; root-authored preparation deviation is explicit |
| d7n-scaffold-path-verify | independent verifier, Terra | final isolated candidate after preparation | no journal | launch refused at thread limit | not run; wait for final source and regenerated host inventory |
| d7n-layer-inventory-instrument | native builder, Terra | scratch instrument only | native layer_inventory_instrument | native task | predecessor and successor returned; incomplete-state and actual-control gaps rejected; no collection ran |
| d7n-layer-inventory-instrument-3 | native implementer, Sol | preserved scratch predecessors | native layer_inventory_fix | native task | actual-mechanism controls ran red; correction in progress; independent acceptance precedes live collection |

The previous probe writer returned and its test changes landed as 93fc01d. The
owner-main comparison returned; its result projection is retained. Those processes
are not active units.

Prepare agent's successor as a read/edit-only writer with host-owned validation.
The denied shell commands remain denied; do not change role permissions or invoke
their binaries through another interpreter. Retain the original denial report and
result projection. The successor keeps the package scope and acceptance gates.

Use tmp/pass/land-p2.sh for current landings. Its current allowlist form is retained
as instruments/d7/windows/land-p2-ollama.sh. The prior executed trailer form remains
at instruments/d7/windows/land-p2-trailers.sh. Do not replace the current script with
an earlier retained copy. The host supplement used by the current writer is retained as
d7n-resume-writers-windows-2-brief.md. It forbids permission-control overrides.
