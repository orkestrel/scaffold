# Source-clause calibration

The source-clause successor's Qwen 2B fit refuses supported admission despite improved factual support. Gemma 2B generation is complete and under blind review; Gemma 4B generation runs before Qwen 4B. No downstream quality verdict exists. The original cohort remains in [the original calibration record](resumption-live-calibration.md).

The accepted source checkpoint is `8c9176feae3ea8e8060bdc0cfca1b49f1e1f6aad`; canonical build manifest SHA-256 is `09c7d936ffaec46ed9deb5bdd300deb0f9643ad639519762d8d84e38ef513ecf`. See [the bounded revision and verification](resumption-prompt-l7.md). The judge, fit rule, lexical checks, budgets, and source population remain unchanged. The result root is `results/l7`; manifest protocol and generated run names retain the unchanged `l6` schema.

Native verifier Luna froze every requested model/thinking condition on 2026-10-11. Each phase exited 0 uncapped, with durations from 1054 ms to 1092 ms. The verifier checked every frozen manifest's 79 bindings against disk; none differed. The installed model digests match the preceding cohort. The completed custody report is primary `tmp/units/aggregate-l7-freeze-calibration-report.md`, SHA-256 `bc75f16eb3f1eb8784dfde0a5b0db705b236e116f40a20509e4bb1fd60750b9f`.

Qwen 2B corpus preparation exited 0 uncapped in 2497 ms. Its development corpus contains 24 points and 162 contexts. Generation exited 0 uncapped in 259460 ms, producing 168 attempts and matching packet records with `complete: true` and no listed errors. Every generation-manifest binding matched disk. The recorded process and descendants exited; root read the custody report and complete raw launch outputs before accepting the packet for review.

The Qwen 2B artifacts under `results/l7/calibration/q2` have these identities.

| Artifact | SHA-256 |
| --- | --- |
| `corpus/corpus.json` | `ebe04c8ca9a3e80adaa925e550536d3c81077a41d659b184c03350f23cc8cbfa` |
| `corpus/manifest.json` | `088df4f15a5773fba398d5ec0a9fa43529138ff8f6f71226b49640c42f2e825f` |
| `generation/attempts.jsonl` | `6258734af06361ee0337236311c04eb970f79e190ea103082dd8d5af6db66a8d` |
| `generation/packet.jsonl` | `64f575e39f5b1cae6237fedb67e3559103ee1bf535c2655fee610bda9094a67e` |
| `generation/evidence.json` | `24fddf4bfc7d870a49395ad72b62d5bf8429ebb27e56d18e8f3d666fc1ba81b2` |
| `generation/manifest.json` | `7cc0e6af513f8f9a65d0cdf35afa6b94b7ab350465328a95e380f42ac9b79216` |

The recorded completion usage reaches the unchanged 160-token limit in 6 attempt occurrences. Prose length ranges from 100 to 545 characters. These measurements describe output size, not support or coverage. The independent analyst received only the byte-identical opaque packet under `support-audit-93d1`, without model identity, scores, generation metadata, or other audits. Root settled 131 supported, 12 unsupported, 10 contradicted, and 15 ambiguous occurrences before reading scores. The unchanged fit refused in 2079 ms: candidate cutoff 0.85 admits only 1 of 131 supported occurrences. See [the complete adjudication and fit](resumption-l7-q2-adjudication.md).

Gemma 2B corpus preparation exited 0 uncapped in 2541 ms, with 24 points and 162 contexts. Generation exited 0 uncapped in 758004 ms, producing 174 attempts and matching packet records, `complete: true`, and no listed errors. The verifier checked every generation-manifest binding against disk. The recorded PID 22980 and descendants exited; root read the complete custody report and raw logs before staging the independent audit. Completion usage reaches the 160-token limit in 31 attempt occurrences; prose lengths range from 227 to 493 characters. Repeated occurrences are not independent model requests.

The Gemma 2B artifacts under `results/l7/calibration/g2` have these identities.

| Artifact | SHA-256 |
| --- | --- |
| `corpus/corpus.json` | `c224e6bdb03cb40371a45b0d3096900cd390d0352257b262a1f0539aa607b397` |
| `corpus/manifest.json` | `cf703128bbcdca5d0c95f12ef910e4c0e616242218e9f53a9ac399cb535c0ff1` |
| `generation/attempts.jsonl` | `3fc356f66e3d26caaf1b0fbd7d78b6efcaae75ebddf3fcfb95073abf7576786b` |
| `generation/packet.jsonl` | `962fdb27b0043304631d65eca1620e5e69db8c908bfb43aca0f39273f40ca23c` |
| `generation/evidence.json` | `2043850d86095b9a2ae5f115a43af13d6cfff8f79cd7097d2c18b6a2020c00cb` |
| `generation/manifest.json` | `c9451e0a2b405b23a553bb90a3e3e2a09cdfe9265e3d8918f02573df122d4a0e` |

The Gemma 2B custody report is primary `tmp/units/aggregate-l7-g2-calibration-report.md`, SHA-256 `696e2aa034a112df27edbb444c6d42bd784ce14ab8371515ee03f97da29cceca`. Clean-context analyst Astra owns the byte-identical opaque `support-audit-b47e` packet. Its brief explicitly applies the same provenance reading to source-date and role headings and keeps useful-information omissions separate from support. Root retains adjudication before score inspection.

Gemma 4B and Qwen 4B generation continue serially under native verifier Luna. Completed packet reviews and offline fitting overlap later generation. Only the verifier's active generation uses the local daemon; no concurrent local model client is assigned. Resource feasibility, pilots, matrix answer comparisons, the judge shadow, and the mandatory continuous comparison follow the declared prerequisites. See [the baseline execution finding](resumption-baseline-execution.md) for preserving records and full-view results when aggregate admission refuses.
