# G2 think0 aggregate pilot verification

## Result

The strict pilot completed as an operationally clean measured refusal. Matrix returned exit 3, uncapped, with a complete retained run; the emitted feasibility, custody, pairing, exposure, and cost readers passed. The pilot manifest is not accepted, so these results do not support an aggregate qualification claim. No answer-quality scores were inspected or reported.

## Launch and closure

After the prelaunch typo, the exact supplied successor argv was run from `C:/Users/mikes/WebstormProjects/scaffold`:

`node .agents/skills/orkestrel-dispatch/scripts/launch.ts --journal .orkestrel/agent/instruments/results/l14/logs/g2-think0-pilot-2.jsonl --errors .orkestrel/agent/instruments/results/l14/logs/g2-think0-pilot-2.err --cap 7200 --status -- node .orkestrel/agent/instruments/harness/.build/bench5/matrix.js pilot --frozen .orkestrel/agent/instruments/results/l14/g2-think0/freeze/manifest.json --resource .orkestrel/agent/instruments/results/l14/g2-think0/resource/manifest.json --fit .orkestrel/agent/instruments/results/l14/calibration/g2/fit/fit.json --out .orkestrel/agent/instruments/results/l14/g2-think0/pilot --live`

Dispatcher PID 55404 and Matrix PID 18004 closed. The Matrix terminal was exit 3, signal none, uncapped, 1944308 ms. The `.err` terminal record is `exit=3 signal=none capped=false duration_ms=1944308`; the launcher status is retained in `.orkestrel/agent/instruments/results/l14/logs/g2-think0-pilot-2.jsonl` (1585 bytes, SHA-256 `9d7921d34673f8cbe9c4f608e422c2bbb7246a8a42c7b6b9713e69de1d6dab2c`) and `.orkestrel/agent/instruments/results/l14/logs/g2-think0-pilot-2.err` (53 bytes, SHA-256 `0e5324b3cbf237ace980bec2f0ee0d925a11bb886398d4afd6ade85e9bb6a270`). Both complete terminal logs were read. No pilot retry occurred.

The first attempted launcher path, recorded without alteration in `aggregate-final-g2-pilot-report.md`, failed with `MODULE_NOT_FOUND` before Matrix/model execution. Root authorized only correcting that demonstrated path typo; the corrected invocation above is the sole model run. A first receipt-only validation used forward-slash paths and failed exact `RefitFile` path equality. The diagnostic confirmed equal hashes and a valid resource with one attempt; correcting those temporary-reader paths to `node:path.join` made the emitted custody reader pass. Neither prelaunch/reader issue changed the run, source, or build.

## Binding, classification, and pair evidence

Released and post-run bindings match: HEAD `c03a09f86cbe96a4a418263c216b6370268b4a81`; build manifest `d361e9d8ec607ae7e21bcee966904effa2be9a0ccaa972eef8d25b540e977c54`; freeze `2cc6f94dabd536d93914b5b650dfc1c9eb18fbdfbe8ec154123b75a062a8536e`; resource `f0598ea5f76090c23312fbc512b7df1adc2c895a586133fc43bf8bdd0d3f2cf1`; fit `515ba2af23418808f425177a534d40c36c5f57943ee5697da6e1a3baf5f53d8f`. `readFrozen` and `readResource` accepted the exact references, and the pilot manifest binds those same identities. `readBuild()` verified 494 sources, 202 compiler inputs, and 624 emitted outputs with the unchanged build manifest. The deployment binding remained the released SHA-256 `c20472169bc4a0767cfa9882d7674825d84fa4be338b9bab1de386425c743eed`. No source/build/HEAD change occurred. The assigned service PID 26472 remained running and was not stopped.

The retained run is `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/agent/instruments/results/l14/g2-think0/pilot/development/l6-g2-think0-aggregate-v1`. Its status is complete; phase/arm/copy are `pilot` / `aggregate` / 1. All 24 paired goals were served; none remained unattempted. The pilot reports 14 exposed goals out of 24 and `accepted: false`.

`listMatrixPairFailures` found five paired row-scale drifts beyond its bound. The retained baseline-to-pilot values and relative deltas are:

| Goal | Baseline scale | Pilot scale | Relative delta |
| --- | ---: | ---: | ---: |
| g02-luis-card | 1.0992978936810431 | 1.1873920552677029 | 8.013675% |
| g05-luis-approval-note | 1.1139705882352942 | 1.1925465838509317 | 7.053687% |
| g06-kenji-shipping | 1.1065259117082533 | 1.1859861591695502 | 7.181056% |
| g08-halvorsen-credit | 1.1125703564727956 | 1.1824701195219123 | 6.282727% |
| g10-sigrid-callback | 1.105050505050505 | 1.2291169451073987 | 11.227219% |

The initial paired selection matches on digest, tail, and scale. The calibrated gauges also match exactly: scale `1.1326650943396226`, overhead `230`. Thus the initial pair/gauge check passed; the five later per-goal drift findings remain.

The run’s other three explicit findings are stale-phrase observations at request 63 and 64 for `g04-halvorsen-ticket` and request 66 for `g05-luis-approval-note`. The terminal attempt therefore has eight recorded refusal findings total: those three observations plus the five paired row-scale drifts. This is why the pilot manifest refused after `verifyMatrixFeasibility` accepted the completed run; it is not an operational transport fault.

## Wire costs and retained evidence

`measureMatrixCosts` reports 387 fresh sent requests, 386315 prompt tokens, 11293 completion tokens, and zero missing usage. Role/phase breakdown:

| Phase | Role | Requests | Prompt | Completion | Missing |
| --- | --- | ---: | ---: | ---: | ---: |
| calibration | agent | 2 | 4072 | 2 | 0 |
| trajectory | agent | 43 | 73921 | 2859 | 0 |
| trajectory | judge | 259 | 264256 | 259 | 0 |
| trajectory | summarizer | 59 | 43610 | 8149 | 0 |
| trajectory | flush | 24 | 456 | 24 | 0 |

Other role/phase cells record zero requests. The reader measured 45 capacity-metadata observations (40 ms total), 1902554 ms run elapsed, 1452324 ms stage time, and 114417 ms flush time. Token usage is fully observed for the 387 sent requests; missing/unknown prompt or completion counts are zero.

Pilot manifest SHA-256 is `396b37a5ab111f395da213243c131588ed252c666f642e66353bfa98007898c3`. The emitted-reader receipt `tmp/units/aggregate-final-g2-pilot-validation.json` is SHA-256 `f86ff7e686041d5f379e7670d8565e93d9e9da07463260cae335911a6daad5f5`; it includes the complete bound artifact path/hash inventory. Key retained run hashes are `run.json` `50b78ecf590d206d227d127b9c5a0ee61a9e179752dee14fe4f63d05c64166b8`, `requests.jsonl` `b1dc18477a82ae65cd43a6be7c9c3268f88eca223edb0c02e4d5f03241ac70ec`, `selections.jsonl` `c0357af0a5844a76a44fc42a19ac3169b25f3935e662537e95f06bc1014c3f01`, `rows.jsonl` `bda38223d84765e7bc60ba9fb70483d3bd4cf0d027c2f13db17ad4866996f0b2`, `calls.jsonl` `66f2c525c3be9b1b332a752e8c13663ad56e8f0c9548f2452365724a1ca17d95`, and `judgments.jsonl` `3d5c78be19dc2254e39a6435b1a286dd4ee2c1a56e1e321a1669ad2d4780b8b2`.

The final `readBuild` custody receipt is `tmp/units/aggregate-final-g2-pilot-custody.json` (SHA-256 `7f4d3465cd252cd4839cf88499c5418eae9f629bb2ccf09830941db79e0ff37c`). The original prelaunch report remains unchanged; this successor report records the actual run and corrections separately.
