# G2 think0 pilot launch deviation

## Outcome

The aggregate pilot did not run. The requested cap/status launcher invocation failed before loading the Matrix entry, so this is an invocation fault, not a measured feasibility refusal or pilot result. Per the checked brief's stop/no-retry rule, I did not try an alternate launcher or repeat the command.

## Verified inputs and custody

Immediately before the attempted launch, HEAD was `c03a09f86cbe96a4a418263c216b6370268b4a81`; the output directory `.orkestrel/agent/instruments/results/l14/g2-think0/pilot` was absent; Ollama PID 26472 was present. Input hashes matched the released identities: build manifest `d361e9d8ec607ae7e21bcee966904effa2be9a0ccaa972eef8d25b540e977c54`, freeze manifest `2cc6f94dabd536d93914b5b650dfc1c9eb18fbdfbe8ec154123b75a062a8536e`, resource manifest `f0598ea5f76090c23312fbc512b7df1adc2c895a586133fc43bf8bdd0d3f2cf1`, and strict fit `515ba2af23418808f425177a534d40c36c5f57943ee5697da6e1a3baf5f53d8f`. The prior accepted resource and fit status are carried from the released parent records; no pilot attempt was produced to classify.

## Attempted argv and observed failure

Cwd: `C:/Users/mikes/WebstormProjects/scaffold`.

Attempted launcher argv:

`node .orkestrel/agent/instruments/harness/bench5/launch.ts --cap 7200 --status -- node .orkestrel/agent/instruments/harness/.build/bench5/matrix.js pilot --frozen .orkestrel/agent/instruments/results/l14/g2-think0/freeze/manifest.json --resource .orkestrel/agent/instruments/results/l14/g2-think0/resource/manifest.json --fit .orkestrel/agent/instruments/results/l14/calibration/g2/fit/fit.json --out .orkestrel/agent/instruments/results/l14/g2-think0/pilot --live`

The wrapper returned launcher exit 1. Node stderr reports `MODULE_NOT_FOUND` for `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\agent\instruments\harness\bench5\launch.ts`. There is no launcher child PID, Matrix PID, terminal stage journal, or pilot manifest; output directory remains absent. The retained stdout file is empty (SHA-256 `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`). The retained stderr file `tmp/units/aggregate-final-g2-pilot.stderr.txt` is 2340 bytes, SHA-256 `ad79a5fd3eafc37e9f5e412908528121f888e315d026488633c0c17d9fe0a8da`.

No inference request was made, no scores or pilot costs exist, and no service lifecycle or source/build/HEAD change occurred. The service PID remained 26472. **Expected:** the checked cap/status launcher starts the exact pilot. **Found:** Node cannot resolve the attempted launcher path, before Matrix invocation. **Done:** preserved the failure and stopped without retry. **Hypothesis:** the launcher path was supplied through a different dispatch location than `harness/bench5/launch.ts`; I did not search for or substitute another entrypoint under the no-retry contract.
