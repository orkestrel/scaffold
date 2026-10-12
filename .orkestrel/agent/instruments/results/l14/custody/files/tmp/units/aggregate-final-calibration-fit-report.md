# Aggregate final calibration fit report

Verifier: native GPT-6 Luna high. This report records the fixed fit sequence and mechanical recomputation only; it does not make a calibration-quality or adoption ruling.

## Custody and method

Executed plan entries 17–20 from `tmp/units/aggregate-final-calibration-command-plan-2.json` in declared order, exactly once, via each fixed argument array and dispatch launcher. Plan SHA-256: `1fbb63293257db03c53d4da97242534e69ad6b9a9b1d7e8bea56ec10fed4477d`. Each stage retained its declared 240-second nested cap and `--status`; no retries, tests, rebuild, inference, Git mutation, install, or source/build writes occurred.

The sealed session HEAD is `5b99354304e901ce1ea9c848ad93d954b79b34d6`. The live build manifest is `d361e9d8ec607ae7e21bcee966904effa2be9a0ccaa972eef8d25b540e977c54`. Final read-only file census against that manifest found 0 mismatches across 494 sources, 202 compiler inputs, the compiler executable, 624 emitted outputs, and one resource. The four released label hashes matched the fixed values. Each diagnosis recomputed against its corpus, attempts, packet, generation manifest and labels hashes shown below; every `readRefitAssessment` result had zero operational errors. Costs were recomputed through the emitted `readRefitCosts`; all missing counters were zero and the failures list was empty. Exploratory cutoffs are outputs of the emitted `selectMajorityCutoff` helper, not accepted production cutoffs.

The helper used to collect the emitted readers is `tmp/units/aggregate-final-calibration-fit-assess.mjs`, SHA-256 `41b36299f41722a0d6c9c3aeacef03f1b9b8cd289f528628766bbe1357c2d3b9` (no spaces; full hash: `41b36299f41722a0d6c9c3aeacef03f1b9b8cd289f528628766bbe1357c2d3b9`). The existing calibration deployment dependency remains at `C:\Users\mikes\WebstormProjects\scaffold\tmp\units\aggregate-final-daemon-deployment.json`, 5,148 bytes, SHA-256 `c20472169bc4a0767cfa9882d7674825d84fa4be338b9bab1de386425c743eed`.

## Results

All durations are milliseconds. `strict` is the actual recomputed refit assessment. “Exploratory” is the separately emitted majority-cutoff helper result.

| Model / command | PID | Exit / capped / duration | Strict result | Exploratory | Diagnosis / controls / fit SHA-256 | Occurrence supported/scored/admitted; distinct supported/scored/admitted |
|---|---:|---|---|---:|---|---|
| q2 / `q2-calibration-fit` | 54424 | 3 / false / 2756 | Refused, cutoff 0.93; reason: end-to-end admission below 0.5; operational errors 0 | 0.67 | `diagnosis.json` `0f0916f97fc6dc9f8cc39cfbb4a8d7b431b581a334eae655d22849add4a19b20`; `controls.json` `ef68d00bb430d3b6cd56a8ccf7076f862694fcbf2d08761a38090e0daeb9c499`; no `fit.json` | 132/131/0; 34/33/0 |
| g2 / `g2-calibration-fit` | 60788 | 0 / false / 2697 | Accepted, cutoff 0.59; reasons/errors none | 0.68 | `diagnosis.json` `3dd68a1db8087014d224620f91cdf25086dcd006b165b64921b4f7f0362c6d67`; `controls.json` `ef68d00bb430d3b6cd56a8ccf7076f862694fcbf2d08761a38090e0daeb9c499`; `fit.json` `515ba2af23418808f425177a534d40c36c5f57943ee5697da6e1a3baf5f53d8f` | 131/130/112; 29/28/21 |
| g4 / `g4-calibration-fit` | 75924 | 3 / false / 2636 | Refused, cutoff 0.79; reason: end-to-end admission below 0.5; operational errors 0 | 0.57 | `diagnosis.json` `33b6a195fab165210bc8a6913146e650e08d387cb122ba118b2cd248cdf929e0`; `controls.json` `ef68d00bb430d3b6cd56a8ccf7076f862694fcbf2d08761a38090e0daeb9c499`; no `fit.json` | 137/137/35; 37/37/5 |
| q4 / `q4-calibration-fit` | 61872 | 0 / false / 2743 | Accepted, cutoff 0.61; reasons/errors none | 0.68 | `diagnosis.json` `91278d634c41e4ebc8daae61f56e28197cd5814fd8c0d160c16d8a6d7a2e37cd`; `controls.json` `ef68d00bb430d3b6cd56a8ccf7076f862694fcbf2d08761a38090e0daeb9c499`; `fit.json` `f694c01ffd924c8c59a17a3e190c4a2e90f4bcc89b4c82024a281f4954f1be56` | 154/152/136; 43/41/35 |

For both accepted fits, the emitted fit reader reported `separated=true`, `agree=0.59` and `change=0.56` (g2), and `separated=true`, `agree=0.61` and `change=0.56` (q4). Valid exit-3 refusals emitted diagnosis and controls without a fit file; they are not operational errors.

| Model | Corpus SHA-256 | Attempts SHA-256 | Packet SHA-256 | Generation manifest SHA-256 | Released labels SHA-256 |
|---|---|---|---|---|---|
| q2 | `0f68f52d2ce826655ced2fc17cba23bfa853740c53f809637ccadba39e3c7aa5` | `6e9363b1e0809dd9a71292891bbbe53217d6d70e6b4fe6bd2921a9d5cc9c2481` | `d261b832f1574c64add6c602a42a3af8fa35b6d41e41ceb8e8906c2047286124` | `aae21943f6f88fea1296f390963e347683765c00826799dc500b7f849108b94f` | `4bd1f0d7f1e8a92ed976ece1d1c189dcbd36202755a652460300acedaa199d13` |
| g2 | `e5c5cc803b37dfdfe03b6b217bf8ce2ed0a12c9f7c552aa4ed53ed36e5857e77` | `66cc4ab3bbc692ecfd8ffe03c4c1e2f6afa979d9aa0d67084a8745bde826b49e` | `1e198b860a4a0b8c5933a2cafccc0b4dca3a1a75b0bbbc959008fb5d894ca672` | `d98564e5f1133c1cfeed653b6d66f28027917f4cdad56022c128559638822cd8` | `f18e6850756b11dd052b70eac1b593a1775b6a0d7654708ca45fb917da7f56f3` |
| g4 | `813793e774da0aa1a9d2690cf8c5e2cd699005a0fa60682bab00aa9c475f2507` | `89b884abc1aa073a283192d43fcfa02753341975737e17ddcbc84ea47c37d8ca` | `9c7632d7224759d227d119d5609e5280cf8a2ad480a842df2bfcdeb4d29488c3` | `e1398536c7713997fd8f4a1ce1bf63d4b75ffaeb4c1f5454ef69b9c72d43b069` | `63a760f538eb02726f553f143b3b496ce56115e9dfac76927d37f8ee97ab631f` |
| q4 | `538ae80653d68f94e71ca45b863c2a102ee640c6c8766208456eb5b54eac9344` | `29068831031914f1dc0dcf6e85cb5e4103c7ab991c3415c340d3252370706a02` | `8a80bfbce51cb4040aedad1dfd834351d821c37506a08218a70ef3a2a5e7e4aa` | `f08a8642244839dfc66738c1971ca6ee25ea24dfd70d2ff3c7fd7c8cd8167e8b` | `05f9ed02d11ff82eb3083364b1afa5ec88b61eaecaa376500672f7153ab2a69e` |

## Cost completeness

Each tuple is `requests / wall ms / prompt tokens + completion tokens / missing`.

| Model | Trajectory summarizer | Trajectory judge | Controls judge | Replay | Failures |
|---|---|---|---|---:|---|
| q2 | 52 / 116326.7499 / 37215 + 5764 / 0 | 152 / 418011.6953 / 165311 + 152 / 0 | 25 / 55135.5195 / 18236 + 25 / 0 | 388 | none |
| g2 | 54 / 460554.3815 / 38219 + 6558 / 0 | 165 / 630206.0534 / 183173 + 165 / 0 | 25 / 60484.2594 / 18236 + 25 / 0 | 459 | none |
| g4 | 53 / 736586.3388 / 37103 + 6333 / 0 | 167 / 658113.7797 / 180272 + 167 / 0 | 25 / 56761.2946 / 18236 + 25 / 0 | 446 | none |
| q4 | 54 / 523871.0543 / 38552 + 6792 / 0 | 176 / 695180.0694 / 191979 + 176 / 0 | 25 / 56569.6032 / 18236 + 25 / 0 | 465 | none |

## Logs and closure

For every fit, the complete top-level stdout was read (1,242 bytes) and the top-level stderr was read (0 bytes; SHA-256 `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`). Each stdout contains dispatch PID followed by terminal JSON with exit, `signal=null`, `capped=false`, duration and log paths. Nested JSONL journals are empty (0 bytes, same empty-file hash); each nested errors file was read to EOF and contains only `exit=<code> signal=none capped=false duration_ms=<duration>` (50 bytes). Exact top-level stdout hashes: q2 `f019e57642ae8afc9a312c7fee357e938171b21aae36f9cc6114e4e8515330ec`; g2 `c6d070c7ee7301822a887a41ee3d958cf9ac5536dded497e6c9fff2e37727c47`; g4 `b5c5cd6687453758c58ce11bae84c17cb8602a971ec660f4310f204fcfc49954`; q4 `dbeef33014a6effb8f6d21c98631dea1f28ad19932b31c05b3eb6b10cd415852`. Nested terminal error-file hashes: q2 `8f1bf689816cbeece01046fd1ed8031b268490aadb7f6e1886973a1895cf610d`; g2 `72a1d5cda3d215a95501a56180551d904d19b8c1e6fa53d7bfed234ae0b08134`; g4 `b55eb8d596070f2f528c9f046cf12924e52830987723fdfe005f45e4a24a38d7`; q4 `b1087c5277ee1209dca71f2b496560d286b534f1fb47a019c31f073185ef88fc`.

All four dispatch PIDs (54424, 60788, 75924, 61872) were absent at final closure. HEAD and source/build manifest identities remained as stated. Root-owned prose changes and pre-existing unowned bench4/nested-harness dirt were outside the source/build census; no changes to those areas were made by this unit. All fit artifacts and complete logs remain at their plan paths; no cleanup was performed.
A TypeScript successor for future read-only recomputation is retained at `tmp/units/aggregate-final-calibration-fit-assess.ts`; it was not run after closure. The execution helper was the recorded .mjs file above.
