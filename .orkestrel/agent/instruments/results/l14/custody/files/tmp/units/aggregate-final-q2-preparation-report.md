# Aggregate final q2 preparation report

Verifier: native GPT-6 Luna high. This records the fixed resource and full-view preparation commands, their artifacts and custody. It makes no answer-quality or adoption ruling.

## Inputs and command sequence

Session HEAD remained `708553ef9f50cf9f5458e481d0c879439f9b39f4`. The live build manifest remained SHA-256 `d361e9d8ec607ae7e21bcee966904effa2be9a0ccaa972eef8d25b540e977c54`; the full read-only census at closure had zero mismatches across 494 sources, 202 compiler inputs, the compiler executable, 624 outputs and one resource. The frozen daemon deployment SHA-256 remained `c20472169bc4a0767cfa9882d7674825d84fa4be338b9bab1de386425c743eed`; q2-think0 freeze SHA-256 `05d1cff15102d356c24b992ebf1d86abaa0935f2b5d067657d98ed5d3a3b0939`; q2 strict-refusal diagnosis SHA-256 `0f0916f97fc6dc9f8cc39cfbb4a8d7b431b581a334eae655d22849add4a19b20`; released labels SHA-256 `4bd1f0d7f1e8a92ed976ece1d1c189dcbd36202755a652460300acedaa199d13`. The service PID 26472 was present before launch and remained alive at closure. Resource and full outputs/logs were absent before their respective launches.

The exact nested commands, each run once through the dispatch launcher with `--status`, were:

```text
["node", ".orkestrel/agent/instruments/harness/.build/bench5/matrix.js", "resource", "--frozen", ".orkestrel/agent/instruments/results/l14/q2-think0/freeze/manifest.json", "--out", ".orkestrel/agent/instruments/results/l14/q2-think0/resource", "--live"]
["node", ".orkestrel/agent/instruments/harness/.build/bench5/matrix.js", "full", "--frozen", ".orkestrel/agent/instruments/results/l14/q2-think0/freeze/manifest.json", "--resource", ".orkestrel/agent/instruments/results/l14/q2-think0/resource/manifest.json", "--out", ".orkestrel/agent/instruments/results/l14/q2-think0/full", "--live"]
```

Resource nested cap was 3,600 seconds; full nested cap 2,400 seconds. Both remained uncapped. No retry, source/build/HEAD mutation, broad test, score readout or command beyond these phases was performed.

## Resource result

Resource exited 0 after 381,774 ms: dispatch PID 30784 and matrix child PID 24204; both are closed. The complete outer stdout, outer stderr, stage journal and terminal errors were read. Emitted `readFrozen`, `readResource`, `readAttempt`, `verifyMatrixFeasibility` and `measureMatrixCosts` readers validated the result using the exact frozen file reference. The resource manifest SHA-256 is `584c87c6cd4b3ff342858b8dbdd8721056b20b06b8ddc1cf068cf383f37f12d6`. It is accepted with one attempt at reserve 512, window 3072, ceiling 3072, predict 0; attempt failures are empty. The resource tree has 67 files, inventoried with hashes in `tmp/units/aggregate-final-q2-preparation-artifact-inventory.json` (SHA-256 `798bc621915c376ce5a1bbc7a9e87039938a58c1fdf5aab7ae586fc55a137e5b`). Canonical reader/cost output is `tmp/units/aggregate-final-q2-preparation-resource-validation.json` (SHA-256 `6882dfd93d8d2ffe9278a0a9db6c183571134696896b4b89f71beb129586cd70`).

`measureMatrixCosts` found 78 fresh sent requests, 101,937 prompt tokens and 3,294 completion tokens; missing usage 0. By role and phase: calibration agent, 2 requests / 10,803 ms / 4,413 prompt + 2 completion; trajectory agent, 52 / 222,833 ms / 96,996 + 3,268; trajectory flush, 24 / 120,977 ms / 528 + 24. No failures were reported.

## Full-view result

Full exited 1 after 182,687 ms: dispatch PID 44228 and matrix child PID 19792; both are closed. Complete bare stdout and stderr plus the stage journal and terminal errors were read. Stdout reports `exit=1`, `signal=null`, `capped=false`. The command emitted `bound.json` (SHA-256 `48ea94cc1371aab799b3d57d16f085f6c67721160d09a1517886ab4d03848a57`) and `manifest.json` (SHA-256 `4040e2ad56f3e3cb9452bebaca19cb21ba73726c8519f60b8a754423786dd8f9`). The manifest has one preflight attempt marked `accepted=false`, reserve 512, window 1,068,663, ceiling 262,144, predict 0.

This is an operational failure, not a valid measured full-view refusal. The retained run status is `failed`; it records `request 20: transport` and `request 21: transport`. The outer command’s terminal error is `Error: operational matrix fault is not configuration infeasibility`, thrown by emitted `verifyMatrixFeasibility` after the manifest was written. No full feasibility classification was accepted, and the command was not retried. Read-only parsing and `measureMatrixCosts` retained 20 fresh sent wire requests: calibration agent 2 / 17,229 ms / 4,413 prompt + 2 completion; trajectory agent 13 / 102,570 ms / 40,883 + 567, with one request missing usage; trajectory flush 5 / 23,091 ms / 110 + 5. Total known usage is 45,406 prompt and 574 completion tokens, with one request’s usage unknown. Full cost receipt: `tmp/units/aggregate-final-q2-preparation-full-costs.json`, SHA-256 `2b7acba9fb68f8a5c6233c064f9b50715b88723562eb1e1907f794dd4eba8888`. The 29 resource/full artifact paths, byte sizes and hashes are in the artifact inventory above.

The conforming static-import TypeScript full validator `tmp/units/aggregate-final-q2-preparation-validate-canonical.ts` (SHA-256 `4b540a942fd8c549797ad8e4d7cf2b3d85f804295cf3264d6eb4418d08741b06`) was prepared but not run after the operational failure. A separate read-only cost reader `tmp/units/aggregate-final-q2-preparation-full-costs.ts` (SHA-256 `5bfc496096936621ed3881287a65462216c40eb7eae3f13e55d11ae79e62663a`) used emitted `readAttempt` and `measureMatrixCosts`; it did not invoke feasibility classification.

## Complete log hashes and process closure

| Stage | Capture | Bytes | SHA-256 |
|---|---|---:|---|
| resource | `tmp/units/aggregate-final-q2-preparation-resource.stdout.txt` | 1246 | `376b19125aa32d4179e3575bd2555c8f9656399a52f44667f44b04d382cb68ee` |
| resource | `tmp/units/aggregate-final-q2-preparation-resource.stderr.txt` | 0 | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` |
| resource | `.../logs/q2-think0-resource.jsonl` | 1464 | `8080252c9534fa845770a47c941903a0becc2454ced338889cc293fa62cd3772` |
| resource | `.../logs/q2-think0-resource.err` | 52 | `20a5c1fbd9b68c1cd97fe4e14a223472c68226547b61b29cce20548d1753e237` |
| full | `tmp/units/aggregate-final-q2-preparation-full.stdout.txt` | 1214 | `b8b0ea5fe829b27b58a96fa11f945bae3e02a2151071e2e636ff4eea335302aa` |
| full | `tmp/units/aggregate-final-q2-preparation-full.stderr.txt` | 0 | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` |
| full | `.../logs/q2-think0-full.jsonl` | 243 | `eec2434595c6eaa9ac7bd09f88f2bb7cd0691693c4535f4f9ae0d00e67dc1539` |
| full | `.../logs/q2-think0-full.err` | 1036 | `7e3bc3c65edc4b90a0abedddad5f77227fa9a3f35fc353c378284b4d42dc14ab` |

At closure, dispatch and matrix child PIDs 30784, 24204, 44228 and 19792 were absent; service PID 26472 remained present. Final custody recheck matched HEAD, build, deployment, freeze, diagnosis, labels and accepted resource hashes above; the 494/202/624/1 file census found zero mismatches. No cleanup or Git operation was performed. Root-owned prose changes remain outside this unit’s source/build custody.
## Verifier tooling note

The first read-only resource-helper call passed the parsed freeze object where the emitted eadResource API requires the frozen file reference; it returned invalid resource custody. I corrected the call to match Matrix.ts and the emitted reader then validated the resource successfully. This helper-only error caused no model call, output change, or stage retry. The initial helper and a later conforming static-import TypeScript successor are temporary receipts only; neither was added to campaign source.

