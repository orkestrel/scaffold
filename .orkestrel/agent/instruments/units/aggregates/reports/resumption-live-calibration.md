# Live calibration progress

The corrected model conditions froze successfully on 2026-10-11. Qwen 2B calibration completed with an admission refusal. Gemma 2B generation completed and is under independent blind review; Gemma 4B generation is active. No goal-quality comparison or adoption verdict follows from calibration alone.

Native verifier Luna ran the accepted primary preparation driver on session checkpoint `2897ba0e4`, using canonical harness build `eb254fd9ff13d2a95fcde5c856a1b0e977e9c9dd363c43c9938498bc1af00b57`. Every requested Qwen/Gemma size and decision-thinking condition froze with exit 0 uncapped. Each freeze binds the same 75 source files, settings, seed, model census, and tag identities; independent hashing found no mismatch. Freeze manifests are under [the l6 result directory](../../../results/l6/).

The q2 corpus contains 162 contexts across 24 request points, with 49 distinct initial prompts. Corpus preparation exited 0 uncapped in 2435 ms. Generation exited 0 uncapped in 271800 ms, under the declared operational watchdog. It produced 251 attempt occurrences covering every context with contiguous ordinals inside the fixed retry limit. The packet contains the same unique IDs. Generation is complete, errors are empty, and all retained source and output hashes matched. The recorded process and descendants exited before the next model started.

The accepted q2 artifacts have these identities.

| Artifact | SHA-256 |
| --- | --- |
| corpus/corpus.json | `c4986d177601b5cffa142d20181a4c8c77c052b001baf72dd48925bbe37abb39` |
| generation/attempts.jsonl | `c0b1ce66f5a8508368fc834b24aa26d235016c8da7b25e009e6fd11664d0dbb8` |
| generation/packet.jsonl | `6b09f8b596108a2119a6905168c23f5f1e561415b23a4dcdd38c8f29afaa8f89` |
| generation/evidence.json | `b77aae8a7a0c6a87dd885d0237453289f63662ef8791eb5801e4e86d8cebb724` |
| generation/manifest.json | `079414f70453989f2f74a5cd52ce72a6491583cdccf9fcf2de77531035be0ebb` |

These paths resolve under `.orkestrel/agent/instruments/results/l6/calibration/q2`. Root read the complete verifier report and launcher result and verified the packet's byte identity before staging an opaque copy for a clean-context Astra analyst. That analyst receives the packet without model names, settings, scores, attempts, or the private generation path. Root adjudicates proposition evidence before fitting.

The immutable native report is primary `tmp/units/aggregate-live-freeze-calibration-q2-report.md`, SHA-256 `580f7c08f93b840199ca304e208cbd9749064fb9714aa736ed1462f259d66e02`. Raw launcher evidence remains under l6/logs. Root accepted the unit and dispatched the remaining g2, g4, and q4 calibrations sequentially; independent cloud labeling can overlap later model generation.

Qwen 2B's adjudicated labels contain 1 supported, 122 unsupported, 123 contradicted, and 5 ambiguous occurrences. The fit returned child exit 3 uncapped in 2273 ms, with end-to-end supported admission 0 against the required 0.5. The supported draft's spelled-out dates failed the exact-number check before scoring. The candidate cutoff 0.91 is not an accepted fit. See [the root adjudication and diagnosis](resumption-q2-adjudication.md).

Root accepts Gemma 2B generation after reading the complete verifier report and raw launcher results and independently checking retained artifact hashes. Corpus preparation exited 0 uncapped in 2439 ms; generation exited 0 uncapped in 828161 ms. Its 162 packet occurrences cover every corpus context, with exact attempt/packet ID membership and no errors. The verifier checked every corpus and generation file binding; the model process exited before Gemma 4B started. The immutable custody report is primary `tmp/units/aggregate-live-calibration-g2-report.md`, SHA-256 `1210e1eaf2980e2040b559e84f56583cd4866585801c877d882c663956ed90fa`.

The accepted g2 artifacts have these identities.

| Artifact | SHA-256 |
| --- | --- |
| corpus/corpus.json | `d96d5b0df18c952e86b94cc44196eb17a23459a6a31b216520babf27c710f44d` |
| generation/attempts.jsonl | `6290ed2d3d369fa3539c5afbec86d2243320736aa4140415799a969cabc2ce04` |
| generation/packet.jsonl | `d634d4b39f4993a80452e8a579772e8b07d1db15dbaf7482605076a1a1880bb9` |
| generation/evidence.json | `d0b0182bacb877669d60b38b5d705c926e8fb65231e22ef908e6e82b642ba8b4` |
| generation/manifest.json | `28fb1257f768651ce636ef3475491aef22e466502f2890ebbcb66a2f48819650` |

These paths resolve under `.orkestrel/agent/instruments/results/l6/calibration/g2`. Root supplied only a byte-identical opaque packet copy to a separate clean-context Astra analyst under `support-audit-c38f`. Semantic adjudication and fitting remain pending.

Resource preflight, pilots, matrix quality, separate judge runs, and the mandatory continuous comparison remain pending. Publication remains held.
