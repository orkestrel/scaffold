# Aggregate final calibration driver report

Verifier: native GPT-6 Luna high. This records fixed-sequence execution and custody only. It makes no label, calibration-quality, fit, adoption, or release verdict.

## Fixed inputs and custody

Executed the checked first 16 commands of `tmp/units/aggregate-final-calibration-command-plan-2.json` exactly once, serially, via `tmp/units/aggregate-final-calibration-run.ts` and the dispatch launcher with `--status`, outer cap 10,800 seconds, journal `tmp/units/aggregate-final-calibration-root.jsonl`, and errors `tmp/units/aggregate-final-calibration-root.err`. Plan SHA-256: `1fbb63293257db03c53d4da97242534e69ad6b9a9b1d7e8bea56ec10fed4477d`. The fixed command identities and actual argument arrays are preserved in that plan and `tmp/units/aggregate-final-calibration-sequence.jsonl` (SHA-256 `8fe4157a92486f9c3579f359712ba9dddd9116cfb1cfd3f5e2b23c1b15aa3d61`).

The 16 stages were, in order: `q2-think0-freeze`, `q2-think1-freeze`, `g2-think0-freeze`, `g2-think1-freeze`, `g4-think0-freeze`, `g4-think1-freeze`, `q4-think0-freeze`, `q4-think1-freeze`; then `q2-calibration-corpus`, `q2-calibration-generate`, `g2-calibration-corpus`, `g2-calibration-generate`, `g4-calibration-corpus`, `g4-calibration-generate`, `q4-calibration-corpus`, and `q4-calibration-generate`. Freeze/corpus stages had 240-second nested caps; generations had 1,800-second nested caps. The plan's full argument arrays distinguish model, key, think setting, seed, output and deployment for every command.

The session HEAD remained `5b99354304e901ce1ea9c848ad93d954b79b34d6`. The final `.orkestrel/agent/instruments/harness/.build/build-manifest.json` SHA-256 remained the accepted `d361e9d8ec607ae7e21bcee966904effa2be9a0ccaa972eef8d25b540e977c54`. A post-run file-hash census against its exact entries found zero mismatches: all 494 sources, all 202 compiler inputs, the compiler entry, all 624 emitted outputs and the one canonical resource. This was a read-only identity check; no build was run. The current Git status includes root-disclosed campaign prose changes, the pre-existing `bench4/Driver.mjs` and nested `harness/.orkestrel/` dirt, and this run's create-only l14 result directory. No source, build, or HEAD change occurred during the driver.

All four frozen decision manifests reference the same temporary deployment file: `C:\Users\mikes\WebstormProjects\scaffold\tmp\units\aggregate-final-daemon-deployment.json`, 5,148 bytes, SHA-256 `c20472169bc4a0767cfa9882d7674825d84fa4be338b9bab1de386425c743eed`, matching the manifests' recorded hash. The file remains at that path for reproducibility. Root had confirmed package-service closure before this sequence. The public model daemon PID 26472 remained present at terminal; this report does not stop it.

## Stage records

Every stage exited 0, with `signal=null` and `capped=false`. `driver PID` is the command process recorded by the sequence driver; `dispatch PID` is the nested launcher child recorded in the outer journal. Durations are milliseconds. The fixed caps are shown in seconds.

| # | Command identity | Cap (s) | Driver PID | Dispatch PID | Exit | Duration (ms) |
|---:|---|---:|---:|---:|---:|---:|
| 1 | `q2-think0-freeze` | 240 | 33740 | 34056 | 0 | 2055 |
| 2 | `q2-think1-freeze` | 240 | 23352 | 72408 | 0 | 1617 |
| 3 | `g2-think0-freeze` | 240 | 36408 | 57088 | 0 | 1565 |
| 4 | `g2-think1-freeze` | 240 | 76728 | 40216 | 0 | 1548 |
| 5 | `g4-think0-freeze` | 240 | 10120 | 16868 | 0 | 1662 |
| 6 | `g4-think1-freeze` | 240 | 16236 | 37588 | 0 | 1553 |
| 7 | `q4-think0-freeze` | 240 | 37664 | 56988 | 0 | 1490 |
| 8 | `q4-think1-freeze` | 240 | 50496 | 60188 | 0 | 1504 |
| 9 | `q2-calibration-corpus` | 240 | 1488 | 23404 | 0 | 2878 |
| 10 | `q2-calibration-generate` | 1800 | 27172 | 6988 | 0 | 594801 |
| 11 | `g2-calibration-corpus` | 240 | 36472 | 3392 | 0 | 2875 |
| 12 | `g2-calibration-generate` | 1800 | 13004 | 45124 | 0 | 1155940 |
| 13 | `g4-calibration-corpus` | 240 | 24496 | 54852 | 0 | 2853 |
| 14 | `g4-calibration-generate` | 1800 | 28916 | 76268 | 0 | 1456410 |
| 15 | `q4-calibration-corpus` | 240 | 49524 | 64576 | 0 | 3737 |
| 16 | `q4-calibration-generate` | 1800 | 62508 | 25252 | 0 | 1281189 |

The complete outer dispatch closed with PID 9316, exit 0, no signal, `capped=false`, duration 4,513,834 ms (75m 13.834s). Its terminal UTC record is `2026-10-12T00:17:05.661Z`. The outer journal SHA-256 is `41df1493977b5521b0299c78356d290a2ba8c5fc789ff7658bcaccda68afb8f1`; the outer errors file SHA-256 is `3bfdb9a9a2d8658c9b50eccb2630a6d3f8835966bccbb182550fb81f21795c52`, containing only `exit=0 signal=none capped=false duration_ms=4513834`. I read the complete combined stdout/liveness journal and outer terminal errors to EOF. All 16 stage error files were read to EOF; each contains only its successful terminal record. Their empty stage journal files and the complete stdout/liveness records are retained under `.orkestrel/agent/instruments/results/l14/logs/` and the outer journal. No command refusal or operational failure occurred.

All 34 recorded process IDs (outer launcher/driver plus both per-stage PID sets) were absent at closure. The model daemon remained alive. No retry, rebuild, command 17–20, fit, policy, label inspection, or model-quality assessment was performed.

## Closed opaque generation packets

Packet record counts below are JSONL line counts. The packet bytes were hashed and counted without inspecting their contents or labels. Each corresponding `manifest.json` is the completed generation receipt.

| Generation | Packet path | Records | Packet SHA-256 | Receipt path | Receipt bytes | Receipt SHA-256 | Generation duration (ms) |
|---|---|---:|---|---|---:|---|---:|
| q2 | `.orkestrel/agent/instruments/results/l14/calibration/q2/generation/packet.jsonl` | 168 | `d261b832f1574c64add6c602a42a3af8fa35b6d41e41ceb8e8906c2047286124` | `.orkestrel/agent/instruments/results/l14/calibration/q2/generation/manifest.json` | 39231 | `aae21943f6f88fea1296f390963e347683765c00826799dc500b7f849108b94f` | 594801 |
| g2 | `.orkestrel/agent/instruments/results/l14/calibration/g2/generation/packet.jsonl` | 174 | `1e198b860a4a0b8c5933a2cafccc0b4dca3a1a75b0bbbc959008fb5d894ca672` | `.orkestrel/agent/instruments/results/l14/calibration/g2/generation/manifest.json` | 39240 | `d98564e5f1133c1cfeed653b6d66f28027917f4cdad56022c128559638822cd8` | 1155940 |
| g4 | `.orkestrel/agent/instruments/results/l14/calibration/g4/generation/packet.jsonl` | 179 | `9c7632d7224759d227d119d5609e5280cf8a2ad480a842df2bfcdeb4d29488c3` | `.orkestrel/agent/instruments/results/l14/calibration/g4/generation/manifest.json` | 39240 | `e1398536c7713997fd8f4a1ce1bf63d4b75ffaeb4c1f5454ef69b9c72d43b069` | 1456410 |
| q4 | `.orkestrel/agent/instruments/results/l14/calibration/q4/generation/packet.jsonl` | 171 | `8a80bfbce51cb4040aedad1dfd834351d821c37506a08218a70ef3a2a5e7e4aa` | `.orkestrel/agent/instruments/results/l14/calibration/q4/generation/manifest.json` | 39231 | `f08a8642244839dfc66738c1971ca6ee25ea24dfd70d2ff3c7fd7c8cd8167e8b` | 1281189 |

The four packets are now available for independent labeling and root adjudication. No results from either step feed back into this completed driver.
