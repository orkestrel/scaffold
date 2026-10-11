# Source-clause calibration

The source-clause successor has completed Qwen 2B generation and entered independent blind support review. No successor fit or downstream quality verdict exists. The original cohort remains in [the original calibration record](resumption-live-calibration.md).

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

The recorded completion usage reaches the unchanged 160-token limit in 6 attempt occurrences. Prose length ranges from 100 to 545 characters. These measurements describe output size, not support or coverage. The independent analyst receives only the byte-identical opaque packet under `support-audit-93d1`, without model identity, scores, generation metadata, or other audits. The review keeps omission alone separate from support errors and reports prominent coverage losses independently. Root will settle labels before inspecting scores or fitting.

Gemma 2B, Gemma 4B, and Qwen 4B generation are assigned serially to native verifier Luna. Completed packet reviews can overlap a later model's generation. Only the verifier's active generation uses the local daemon; no concurrent local model client is assigned. Resource feasibility, pilots, matrix answer comparisons, the judge shadow, and the mandatory continuous comparison follow the declared prerequisites. See [the baseline execution finding](resumption-baseline-execution.md) for preserving records and full-view results when aggregate admission refuses.
