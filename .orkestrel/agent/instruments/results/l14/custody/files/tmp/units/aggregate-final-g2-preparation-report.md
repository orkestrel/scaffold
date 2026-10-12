# G2 think0 preparation verification

## Outcome

The fixed resource preparation and dependent full-view preflight both completed successfully and were accepted. This report records protocol feasibility and custody only; it makes no quality or adoption judgment.

## Inputs and custody

Before launch, the checked brief recorded HEAD `708553ef9f50cf9f5458e481d0c879439f9b39f4`, canonical build manifest SHA-256 `d361e9d8ec607ae7e21bcee966904effa2be9a0ccaa972eef8d25b540e977c54`, deployment SHA-256 `c20472169bc4a0767cfa9882d7674825d84fa4be338b9bab1de386425c743eed`, and frozen g2-think0 manifest SHA-256 `2cc6f94dabd536d93914b5b650dfc1c9eb18fbdfbe8ec154123b75a062a8536e`. The resource/full outputs were absent and Ollama PID 26472 was the exclusive service owner.

Post-run, `git rev-parse HEAD` remained `708553ef9f50cf9f5458e481d0c879439f9b39f4`. The conforming `readBuild()` custody reader verified the canonical manifest and every bound source, compiler input, and emitted output: 494 sources, 202 compiler inputs, 624 outputs, plus the declared endurance resource. Manifest SHA remained `d361e9d8ec607ae7e21bcee966904effa2be9a0ccaa972eef8d25b540e977c54`; TypeScript compiler identity was `node_modules/typescript/bin/tsc`, SHA-256 `8d5fa5bd883fec0979fc2004f1fe1d99aef40570155d550eadc0b03b55513bf0`, version 6.0.3. The frozen and resource manifests remained respectively `2cc6f94dabd536d93914b5b650dfc1c9eb18fbdfbe8ec154123b75a062a8536e` and `f0598ea5f76090c23312fbc512b7df1adc2c895a586133fc43bf8bdd0d3f2cf1`. The supplied emitted reader validated the frozen input and its bindings during both stages. No source, build, frozen input, or Git mutation was made. Parent-owned campaign prose edits were outside this seal.

## Executed stages

Both commands were launched through the existing `launch.ts` with `--status`, using the listed cap and child argv. All cwd values were `C:/Users/mikes/WebstormProjects/scaffold`.

1. **Resource** — launcher cap 7200 seconds. Child argv: `node .orkestrel/agent/instruments/harness/.build/bench5/matrix.js resource --frozen .orkestrel/agent/instruments/results/l14/g2-think0/freeze/manifest.json --out .orkestrel/agent/instruments/results/l14/g2-think0/resource --live`. Dispatcher PID 69088; matrix PID 8100. Exit 0, signal none, uncapped, 518644 ms. The completed resource manifest SHA-256 is `f0598ea5f76090c23312fbc512b7df1adc2c895a586133fc43bf8bdd0d3f2cf1`; emitted reader acceptance is true, one attempt, reserve 512, window/ceiling 3072, predict 0, no failures.

2. **Full view** — run only after the accepted resource. Launcher cap 4800 seconds. Child argv: `node .orkestrel/agent/instruments/harness/.build/bench5/matrix.js full --frozen .orkestrel/agent/instruments/results/l14/g2-think0/freeze/manifest.json --resource .orkestrel/agent/instruments/results/l14/g2-think0/resource/manifest.json --out .orkestrel/agent/instruments/results/l14/g2-think0/full --live`. Dispatcher PID 53728; matrix PID 20328. Exit 0, signal none, uncapped, 797218 ms. Full manifest SHA-256 `b62ff8689b9485d7db44ed198a5364e66f4e92c48956a3d9614ecb76fdbcf58d`; emitted reader acceptance is true, one attempt, reserve 512, window 1040014, ceiling 131072, predict 0. The emitted `readFrozen`, `readResource`, `readAttempt`, and `verifyMatrixFeasibility` readers accepted the exact references. The full execution was phase/arm `full`, copy 1. `buildMatrixBound` recomputation matched both `full/manifest.json` and `full/bound.json` byte-structurally. The retained run status was complete with no failures. Bound inputs/results include 24 goals, 9 turns, reserve 512, seed 4666, 62 resource requests, payload 3636, growth 512, observed 2301, and window 1040014; the emitted bound retains its stated empirical-envelope limitation.

## Measured wire usage

Values below come from `measureMatrixCosts` over the validated retained runs. No request had missing token usage.

| Stage | Fresh requests | Prompt tokens | Completion tokens | Missing usage |
| --- | ---: | ---: | ---: | ---: |
| Resource | 67 | 69553 | 2775 | 0 |
| Full view | 55 | 161945 | 2120 | 0 |

Resource breakdown: calibration agent 2 requests / 4072 prompt / 2 completion; trajectory agent 41 / 65025 / 2749; trajectory flush 24 / 456 / 24. Full breakdown: calibration agent 2 / 4072 / 2; trajectory agent 29 / 157417 / 2094; trajectory flush 24 / 456 / 24. Other roles/phases recorded zero requests. These are actual ledgered wire totals, not price estimates.

## Retained evidence and closure

Bare logs were read through terminal closure. Resource journal `.orkestrel/agent/instruments/results/l14/logs/g2-think0-resource.jsonl`: 1487 bytes, SHA-256 `9042bc7c8352367f2e81f001f2fbd9e4e14cb2e35e05d29b3399919dd17f76b5`; terminal `.err`: 52 bytes, SHA-256 `a37ec33862b89f89e19f9a7404fb19cb97219746530de7d09137f424bd49b55b`, exit 0, uncapped, 518644 ms. Full journal `.orkestrel/agent/instruments/results/l14/logs/g2-think0-full.jsonl`: 1475 bytes, SHA-256 `3ce7dab14dc2f22724b94e3039f837b2c85d8b8dc1fa1d44bd177af80d490dea`; terminal `.err`: 52 bytes, SHA-256 `acce133dc5b85728b90fb0e98f36d9072858cb9df33b50d54200fcf0a5ba66c8`, exit 0, uncapped, 797218 ms. Launcher stdout captures are retained at `tmp/units/aggregate-final-g2-preparation-{resource,full}.stdout.txt` (1242 and 1214 bytes); both stderr captures are empty (SHA-256 `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`). Resource manifest is 16375 bytes; full manifest 30169 bytes; full bound file SHA-256 `a28d1afc9f4ce2665cafe855e4973c1ffe4d6a46d0d16d6b80af04973b0a4973`. The full emitted validation receipt `tmp/units/aggregate-final-g2-preparation-full-validation.json` is 92030 bytes, SHA-256 `460590f0455ed714bba9478efee72c399bf360e84879337684984f6894b0e48e`; it inventories 101 resource/full artifacts totalling 7227081 bytes and carries each path, byte count, and SHA-256.

Both dispatcher/child pairs (69088/8100 and 53728/20328) were absent after their terminal statuses. Ollama service PID 26472 remained present and was not stopped. No retry or extra model request occurred.

One custody-receipt helper invocation initially passed the build directory to `hashFile`, producing `EISDIR` after `readBuild()` had succeeded. I corrected the temporary receipt to hash `build-manifest.json`; the successful receipt is `tmp/units/aggregate-final-g2-preparation-custody.json` (1518 bytes, SHA-256 `7f4d3465cd252cd4839cf88499c5418eae9f629bb2ccf09830941db79e0ff37c`). The initial helper error caused no source/build/model activity and did not alter either matrix stage or its evidence.
