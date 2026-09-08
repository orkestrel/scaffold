# Abort staging authoring path correction

The builder's initial invocation returned without edits. It looked for campaign
records under tmp/units rather than .orkestrel/campaign/docs-parity. The records
were present in the campaign folder. Root made their absolute paths explicit in
the same bounded brief and resumed authoring. No package command ran.

Returned body:

Stopped: required campaign inputs are missing.

Expected: `tmp/units/d7n-layer-wave-design-reading.md` and `tmp/units/d7n-contract-foundation-verdict.md`.

Found: `Get-Content` reported each path absent; `rg --files tmp` found neither file.

Done: read the orchestration contract, assigned brief, root rules, relevant skills/references, and Abort API material.

Not done: no files were authored; syntax checks and package execution are unrun.

Hypothesis: the campaign records were moved or have not been staged into this checkout.
