# Qwen 4B thinking-false cell: stopped at full-stage operational fault

The fixed Q4 cell ran its resource phase and received an accepted resource record. Its dependent full phase stopped with an operational error while checking capacity custody. The driver correctly stopped before pilot. This run therefore does not establish either a full-phase strict refusal or full-phase infeasibility.

The exact released outer argv was:

```text
node .agents/skills/orkestrel-dispatch/scripts/launch.ts --journal tmp/units/aggregate-final-cell-driver-q4-think0-live.jsonl --errors tmp/units/aggregate-final-cell-driver-q4-think0-live.err --cap 25920 --status -- node tmp/units/aggregate-final-cell-driver.ts q4-think0 --live
```

The dispatcher first reported child PID 23300. Its journal retained the exact nested argv. Resource ran as nested dispatcher PID 27236 and Matrix PID 10456; full ran as nested dispatcher PID 23608 and Matrix PID 73304. Their phase argv were the declared driver entries: resource used `launch.ts --journal .orkestrel/agent/instruments/results/l14/logs/q4-think0-resource.jsonl --errors .orkestrel/agent/instruments/results/l14/logs/q4-think0-resource.err --cap 7200 --status -- matrix.js resource --frozen .orkestrel/agent/instruments/results/l14/q4-think0/freeze/manifest.json --out .orkestrel/agent/instruments/results/l14/q4-think0/resource --live`; full used the same launcher/cap with `--journal .orkestrel/agent/instruments/results/l14/logs/q4-think0-full.jsonl --errors .orkestrel/agent/instruments/results/l14/logs/q4-think0-full.err` and `matrix.js full --frozen .orkestrel/agent/instruments/results/l14/q4-think0/freeze/manifest.json --resource .orkestrel/agent/instruments/results/l14/q4-think0/resource/manifest.json --out .orkestrel/agent/instruments/results/l14/q4-think0/full --live`.

| Phase | Matrix PID | Start–finish (UTC) | Exit | Cap | Duration | Emitted result |
| --- | ---: | --- | ---: | --- | ---: | --- |
| Resource | 10456 | 2026-10-12 02:10:23.197–02:19:07.535 | 0 | 7200 s, not reached | 524,338 ms | `readResource` accepted; manifest `63195146d3ec631b50ca7a00dc7b74b3aabb5ed13bc32fbd370f47fd197ae683` |
| Full | 73304 | 2026-10-12 02:19:18.742–02:44:08.817 | 1 | 7200 s, not reached | 1,490,075 ms | Operational failure; not a valid strict refusal |
| Outer driver | 23300 | 2026-10-12 02:10:22.343–02:44:08.817 | 1 | 25920 s, not reached | 2,028,863 ms | Stopped after full; pilot was not launched |

The decisive full-stage error is retained verbatim in the nested stderr: `Error: operational matrix fault has invalid capacity custody`, thrown by emitted `verifyMatrixFeasibility`. The emitted `listCapacityFailures` receipt identifies request 52 as `Error: unmatched, stale, ambiguous, or changed loaded capacity`. Its frozen raw snapshot `capacity-52.json` records status 200; the retained body is `{"models":[]}`. The run record also says `status: failed`, `error: Error: decision qualification failed: observation`, and preserves 53 requests, 52 sent requests, 23 turns, and all 24 planned goals. It records later request 53 transport, role, and thinking-policy failures. These findings describe the reached request evidence; they do not qualify the full phase as infeasible or as an accepted refusal.

One hypothesis is that the live endpoint returned an empty model inventory during request 52, interrupting the configured capacity observation. The retained evidence does not establish why that response occurred.

`measureMatrixCosts` recomputed the following totals from retained `readResource` and `readAttempt` evidence. Every sent wire request had prompt and completion usage; missing counts were zero. Judge and summarizer wire requests were zero in both phases.

| Phase / role | Requests | Prompt tokens | Completion tokens | Wire wall ms |
| --- | ---: | ---: | ---: | ---: |
| Resource agent calibration | 2 | 4,413 | 2 | 27,254 |
| Resource agent trajectory | 41 | 74,622 | 2,534 | 350,910 |
| Resource flush trajectory | 24 | 528 | 24 | 121,007 |
| Full agent calibration | 2 | 4,413 | 2 | 34,518 |
| Full agent trajectory | 27 | 141,807 | 1,728 | 1,278,992 |
| Full flush trajectory | 23 | 506 | 23 | 128,506 |

Resource had 43 retained capacity observations (47 ms total); full had 29 (790 ms). Emitted cost totals report resource elapsed 505,841 ms and flush 121,031.6686 ms; full elapsed 1,448,716 ms and flush 128,530.0168 ms. These are observed costs for this run, not a performance or quality verdict.

The operational result is **expected: accepted resource followed by a full result the emitted readers can validate as either accepted or a strict refusal; found: accepted resource, then a capacity-custody operational fault and driver exit 1; evidence: request 52 capacity mismatch plus the retained run and stderr above; done: execution stopped without pilot, no retry occurred, and all launched stage processes closed**. The later pilot output directory and all pilot log/sidecar paths remain absent. Daemon PID 26472 stayed alive.

Post-run `readBuild()` validated the complete sealed build/source custody: 494 sources, 1 resource, 202 compiler inputs, 624 outputs, and 76 matrix files. HEAD remained `648943d43d538436a0a125bdc9f27b315e4de2c3`. Build manifest, deployment, freeze, fit, and driver hashes match the released seals. PIDs 23300, 27236, 10456, 23608, and 73304 are absent at closure. Launch status snapshots show only the declared Q4 outputs plus root-owned campaign prose/report updates; pre-existing unrelated bench4 Driver.mjs and nested harness state remain outside this unit.

| Retained evidence | SHA-256 |
| --- | --- |
| Resource manifest | `63195146d3ec631b50ca7a00dc7b74b3aabb5ed13bc32fbd370f47fd197ae683` |
| Full manifest | `52869d2ea3167896efd638f457e9690a95dfdff87fe128d1e7065f260a13f7b8` |
| Full bound | `ad1546769b2943635ef70e3318c441fc4c0472bb0821fbf0aa90c993f9ffcd34` |
| Full run.json | `8e20d6b79e023badb91eecca08f3cee7d3c7e2ca160b0ada84bc08590ca2b0e0` |
| Request 52 capacity snapshot | `5b57739c9a861447d69590b8408cf949456550d5a9e0a2cfb1494c0d4a71f84f` |
| Resource bare journal / stderr | `648de7f3d55d6409c8ac77daf1ed35724bcf7f77210a68e154200d9be5a1ff9a` / `738077c6ae8fc3b500f6412024510d6e6fc4267f6e36d117449e18c04b156de0` |
| Full bare journal / stderr | `c9b3ca0d6f5de0afbb1e257ec4ff99a5b6053d8e6544433948a8f788f026c584` / `a4f02e7809d902d2d69860cc6a4b63690fd8236043a04438fddcc598b1eab826` |
| Outer journal / stderr | `1b1d619d9301882651a6d213b53f4ccdc6c54f18aa8cc190ed49958338a443507` / `f2acd009379e89bb7aeab305b0d0bdcd2cb5558d6a7dad5583729fcc8e2faaa9` |
| Driver sequence receipt | `5089da675c96d5b97ab081c71513548e621a183b149fb68f541b04a3b8790fec` |
| Emitted cost/capacity receipt | `ed336ae5866042c7ef235350a9cf39f977f2751c458fecec53f4f8bc79bbe780` |
| Post-run source/build custody receipt | `f5e31b3f676bd399248d95f49f5e2b5f28289d7a0c03f24a41913c21465d43a4` |

The full `run.json` and failure artifacts remain intact for root review. No source, build, deployment, freeze, fit, label, service, or Git state was changed by this unit. No private evaluation result was consulted.