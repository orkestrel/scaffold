# Probe test landing ruling

The reviewed draft correction landed as 93fc01d and is pushed to the campaign branch.
Treat it as campaign progress, not package closure. The checkout is clean.
The independent checker confirms owned-file scope and unchanged assertion meaning.
The writer's server and guide logs are green after the retained red baseline.

The Orchestrator ran the missing scoped checks directly in the probe checkout:

```text
npx.cmd --no-install oxfmt --config .oxfmtrc.json --check tests/src/server/Probe.test.ts
All matched files use the correct format.
exit=0

npx.cmd --no-install oxlint --config .oxlintrc.json --deny-warnings tests/src/server/Probe.test.ts
exit=0
```

Those readings resolve the missing format/lint receipts. The type-load draft question
remains explicit: createHeavyDraft is unchanged, drives the intentional type-deadline
case, and also serves project serialization in a scratch workspace without the custom
lint policy. Do not claim that fixture is lint-clean or that every candidate was changed.
The closure must rule that fixture's relationship to the retained every-candidate brief
or brief its correction while preserving the measured type workload.

The head start was reinstalled after landing. Its dist sha256 prefix remains 2b76b363;
the manifest and lockfile remain unchanged. The executed landing instrument is retained
as instruments/d7/windows/land-p2-trailers.sh. Its final trailer-paragraph correction
passed independent checking and bash -n before execution.

The original probe audit checker and full verification chain remain pending. This
landing does not authorize main or publication. Keep the process deviations in the
returned-report annotation with the retained evidence.
