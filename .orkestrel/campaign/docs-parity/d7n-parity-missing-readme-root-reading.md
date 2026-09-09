# Missing README control

The independent Astra reviewer asked whether an indexed own guide with no root
README contradicts scaffold's statement that no compared pitch line is printed.
Root ran inspect-parity-missing-readme.mjs against built Guide and its real
createParityFixture. The command exited 0, terminal 5ccb34.

For explicit guide and source destinations, the fixture has valid indexed input,
no changes, and no rewrite findings. After rereading the resulting inventory,
report.pitch contains the missing-file finding:

```json
{"spec":"README.md","text":"README.md is absent from the inventory."}
```

That is not a compared README/guide pitch-pair line. The control therefore does
not establish the proposed wording contradiction. The entry prints that finding
and raises exit 1 at tests/guides.test.ts:174; that exit statement is source
tracing, not a measured native child exit in this control. The instrument directly
executes the built upstream primitive and changes no product file.

The retained instrument is
instruments/d7/guides-extraction/inspect-parity-missing-readme.mjs. Keep this
observation separate from the review's substantiated helper-placement finding.
