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
| d7n-scaffold-path-prepare-check | mechanical checker through Cursor Grok | completed isolated preparation run | tmp/cursor/d7n-scaffold-path-prepare-check.jsonl; 34f50011-8d4d-48ed-9f3a-8942cffd6abd | terminal result read | returned PASS; unsupported artifact statements rejected in d7n-scaffold-path-prepare-verdict.md; authoring deviation retained |
| d7n-scaffold-path-final-prepare | native builder, Terra | isolated successor bytes | native scaffold_path_fix_controls | native task | script returned without execution; root corrected the Git native-path comparison guard using the measured empty root-relative prefix |
| d7n-scaffold-path-final-check | mechanical checker through Cursor Grok | final source and actual staging script | tmp/cursor/d7n-scaffold-path-final-check-run.jsonl; 20c6844e-5901-4b53-9b03-b189f7563146 | terminal result read | returned PASS; source successor accepted; failed model-variable carrier retained separately |
| d7n-scaffold-path-final-prepare-run | root execution | checked isolated staging script | tmp/pass/d7n-scaffold-path-final-prepare.CFfNxy | command exited 1 under root cap | build:src passed; build:host refused populated dist/host; saved package/lock hashes still OK |
| d7n-scaffold-path-final-prepare-2 | native builder, Terra | checked staging predecessor | native scaffold_path_fix_controls | native task | returned; canonical clean-before-build successor independently checked PASS and root execution exited 0 |
| d7n-scaffold-path-final-prepare-2-check | mechanical checker through Cursor Grok | staging successor delta | tmp/cursor/d7n-scaffold-path-final-prepare-2-check.jsonl; 82274061-3301-4f60-a4ec-fbf4b590db69 | terminal result read | returned PASS; projection retained |
| d7n-scaffold-path-final-prepare-2-run | root execution | checked isolated staging successor | tmp/pass/d7n-scaffold-path-final-prepare-2.ZLIM4h | command exited 0 under root cap | clean and build staging completed; manifest and lock hash checks OK |
| d7n-scaffold-path-verify-2 | independent verifier, Terra | frozen isolated candidate after successful staging | native scaffold_path_verify_final | native task | returned GREEN; report and original logs retained |
| d7n-scaffold-path-verify-root | root authoritative reading after executor exit | exact isolated candidate | evidence/d7n-scaffold-path-verify-root | exec session 96679 exited 0 | ordered acceptance chain passed; exact source landed and pushed as c90089c9 |
| d7n-scaffold-path-landing | root integration and push | accepted isolated source | d7n-scaffold-path-landing-verdict.md | source commit c90089c9 | closed on main and campaign/session refs; owner edits preserved; consumer propagation pending |
| d7n-layer-supported-map | read-only Grok through Cursor | public scaffold contracts and retained pass instruments | tmp/cursor/d7n-layer-supported-map.jsonl; fa8de448-6bb1-432f-b23d-82d4d42b0240 | root exec session 96914 exited 0 | returned; source map retained with root limits and sibling-path correction; no fleet writes |
| d7n-layer-reading-boundary | objective analyst, Sol | retained collector findings and supported mechanism map | native layer_reading_boundary_objective | native task | returned; reconciled in the boundary verdict |
| d7n-layer-reading-boundary | subjective planner, Opus | same retained evidence and brief | tmp/claude/d7n-layer-reading-boundary-subjective.jsonl; 97b41046-ca6c-46c0-9b3f-1ec9abeeede8 | root exec session 1937 exited 0 | returned without error or denials; boundary verdict closed; Workflow substitution retained |
| d7n-layer-capture | builder, Terra | ruled raw capture boundary | native layer_capture | native task | frozen candidate returned; report/source retained; root supplied the omitted actual diff/status |
| d7n-layer-capture-verify | verifier, Terra | frozen raw carrier | native layer_capture_verify | native task | focused controls exited 0; formatter and linter not run over ignored mjs scope |
| d7n-layer-capture-audit | objective analyst, Sol | actual carrier diff, status and focused evidence | native layer_capture_audit_objective | native task | returned; root projection and reconciliation retained |
| d7n-layer-capture-audit | subjective reviewer, Opus | same brief and evidence | tmp/claude/d7n-layer-capture-audit-subjective.jsonl; ef530bdb-4ed1-412f-9a96-25a3a1935767 | exec 71269 exited 0 | returned; source findings retained, false native provenance rejected |
| d7n-layer-capture-check | mechanical checker, Cursor Grok | same brief and evidence | tmp/cursor/d7n-layer-capture-audit.jsonl; 59ad5b23-ccf5-4afc-89cc-92c69010743b | exec 61081 exited 0 | returned; missing cached label and row discriminant confirmed |
| d7n-layer-survey-diagnostic | root read-only production measurement | frozen carrier awaiting audit closure | tmp/pass/d7n-layer-survey-diagnostic | exec 48329 exited 0 | independent receipt accepted for graph reconciliation; cached remote limitation retained |
| d7n-layer-survey-verify | independent verifier, Terra | immutable raw survey | native layer_capture_verify | native task | GREEN; before/after identity and command/file evidence agree |
| d7n-layer-graph | ecosystem reconciler, Terra | verified raw manifests, locks and registry responses | native layer_graph | native task | returned; acyclic runtime/peer/optional graph retained; installed closure remains per-visit evidence |
| d7n-scaffold-path-verify | independent verifier, Terra | final isolated candidate after preparation | no journal | launch refused at thread limit | not run; wait for final source and regenerated host inventory |
| d7n-layer-inventory-instrument | native builder, Terra | scratch instrument only | native layer_inventory_instrument | native task | predecessor and successor returned; incomplete-state and actual-control gaps rejected; no collection ran |
| d7n-layer-inventory-instrument-3 | native implementer, Sol | preserved scratch predecessors | native layer_inventory_fix | native task | frozen candidate returned; actual-mechanism controls and root independent run passed; installed process primitive reused; collection not run |
| d7n-layer-inventory-instrument-3-audit | objective analyst, Sol | frozen returned instrument | native layer_inventory_audit_objective | native task | returned findings; report retained; reconciliation pending |
| d7n-layer-inventory-instrument-3-audit | subjective reviewer, Opus | frozen returned instrument | tmp/claude/d7n-layer-inventory-instrument-3-audit-subjective.jsonl; 05ced4cf-c73e-4e82-8fe8-24d23dc66323 | terminal result read without error or denials | returned findings; projection retained; reconciliation pending |

| d7n-layer-tools-check | mechanical checker, Cursor Grok | carrier successor and bootstrap pack script | tmp/cursor/d7n-layer-tools-check.jsonl; 6e0aed4e-16a5-4ed3-9c18-f827585f8fde | exec 43179 exited 0 | PASS; carrier closed |
| d7n-layer-wave-design | objective analyst, Sol | measured graph and accepted mechanism map | native layer_wave_objective | native task | returned; root reading retained |
| d7n-layer-wave-design | subjective planner, Opus | same graph and mechanism brief | tmp/claude/d7n-layer-wave-subjective.jsonl; c7594958-303f-4ceb-b9d0-fb429f80cad8 | exec 77507 exited 0 | returned; reconciled design retained |
| d7n-path-artifact-pilot-check | mechanical checker, Cursor Grok | frozen installed pilot and actual root receipt | tmp/cursor/d7n-path-artifact-pilot-check.jsonl; 6225e4d0-7f29-4eda-b7b4-21667b759e7f | exec 95859 exited 0 | PASS; empty-file lookup error annotated |
| d7n-path-artifact-pilot-verify | independent verifier, Terra | frozen installed pilot | native path_artifact_pilot_verify | direct host command exited 0 | GREEN; pilot closed |
| d7n-guide-path-bootstrap | builder, Terra | accepted selected-path pilot | native layer_capture_fix | author returned; root guide.sh exited 0 | repair applied; configured-policy red became green; full gates pending |
| d7n-guide-bootstrap-gates | builder, Terra; root run | existing Guide validation script | native layer_capture_fix; tmp/pass/d7n-guide-bootstrap-validate.YO5yk2 | exec 67947 exited 0 | full chain and docs passed; checkpoint 0accc15 pushed |
| d7n-guide-path-bootstrap-check | mechanical checker, Cursor Grok | driver diff and actual repair receipt | tmp/cursor/d7n-guide-path-bootstrap-check.jsonl; bd38c2d1-0afd-45c0-b100-4ab90e6fdea7 | exec 15980 exited 0 | PASS; selected propagation closed |
| d7n-guide-heading-close-fix | implementer, Opus | Guide checkpoint 0accc15 | tmp/claude/d7n-guide-heading-close-fix.jsonl; 9adca1da-f1cf-4d9c-96ea-1edb01135f1b | exec 47601 exited 0 | independent objective review PASS; root final gates and distribution passed; landed and branch pushed as ef6ada9 |
| d7n-guide-bootstrap-pack | builder, Terra; root run | Guide ef6ada9 | tmp/pass/d7n-guide-bootstrap-pack.vh8CeQ | root command exited 0 | corrected artifact packed; dist hash prefix 6455f6f9; clean source |
| d7n-foundation-visit | builder, Terra | accepted public repair and existing gate/pack carriers | native layer_capture_fix | author returned | syntax passed; root visits active |
| d7n-foundation-contract | root execution | Contract fd3fce2, version 0.0.17 | tmp/pass/d7n-foundation-contract.sAQxNo | exec 28694 exited 0 | independent receipt GREEN; closed and pushed as 1e235c0 to branch and main |
| d7n-foundation-codec | root execution | Codec 8c20e15, version 0.0.3 | tmp/pass/d7n-foundation-codec.sYfIas | exec 45155 exited 0 | accepted artifact; a492e90 clean on branch and main |
| d7n-foundation-msg | root execution | Msg 57128e9, version 0.0.10 | tmp/pass/d7n-foundation-msg.njodFP | exec 62560 exited 0 | accepted artifact; 0daaa2a clean on branch and main |
| d7n-foundation-sse | root execution | SSE 7778cff, version 0.0.7 | tmp/pass/d7n-foundation-sse.P4pdtt | exec 5801 exited 0 | accepted artifact; 93d174e clean on branch and main |
| d7n-foundation-test | root execution | Test 1b6ce04, version 0.0.14 | tmp/pass/d7n-foundation-test.uR3sHv | exec 8389 exited 0 | accepted artifact; a365945 clean on branch and main |
| d7n-foundation-receipts-verify | native verifier, Terra | completed Codec, Msg, SSE and Test visits | native foundation_receipts_verify | native task returned | GREEN; actual receipts and conditional Test export-drive exclusions verified |
| d7n-contract-abort-stage | native builder, Terra; root run | accepted Contract artifact and clean Abort 3dad185 | native contract_abort_stage; tmp/probe/d7n-contract-abort-stage.7huRJz/logs | exec 24847 exited 1 | source checks passed; pack selected caller directory; corrected cwd successor running in fresh disposable state |
| d7n-contract-abort-stage-2 | root execution | corrected working-directory runner | tmp/probe/d7n-contract-abort-stage.LQv86I/logs | exec 98577 exited 0 | source and foreign-consumer proofs passed; mechanism closed |
| d7n-contract-abort-stage-verify | native verifier, Terra | completed successor and installed foreign consumer | native contract_abort_stage_verify | native task returned | GREEN; existing smoke drivers each exited 0 |

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
