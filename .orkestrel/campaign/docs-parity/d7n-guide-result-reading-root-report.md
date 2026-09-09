# Reproduce the foreign result-reading defect

The source helper reports success for an admitted result whose module property
changes between reads. This is a source-runtime control, not a claim that the
installed Vitest implementation returns that object.

Root inspected and ran the authored instrument through this command:

```text
node C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/probe-guide-result-reading.mjs
```

Receipt 06f799 returned exit 1. The raw result was:

```json
{"adversarial":{"reads":2,"result":true},"controls":{"empty":false,"failed":false,"passed":true}}
```

The stable passed, failed and empty module controls returned their expected
values. The adversarial getter returned a failed module at arrival and an empty
array on its later reading. The helper returned true. Root used the actual
canonical source helper and native Node type stripping; no runner was mocked
and no project-owned method was replaced.

This control supports the source finding that the foreign property is reread
without ownership. It does not establish TypeScript admission by compilation,
real Vitest getter behavior, package export resolution or an installed-artifact
result. The permanent successor must carry the same boundary case under Guide's
real test project and prove it green after the correction.
