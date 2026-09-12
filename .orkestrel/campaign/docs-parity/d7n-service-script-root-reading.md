# Preserve Ollama's service script before overwrite

Root reproduced the foreign classification through the installed public CLI:

```text
node C:/Users/mikes/WebstormProjects/ollama/node_modules/@orkestrel/scaffold/dist/bin/main.js audit --groups orchestration --offline --target C:/Users/mikes/WebstormProjects/ollama
```

Exit1 reports scripts/docs.ts and scripts/service.sh as foreign. This is a
read-only audit. Root has not called remove or overwrite on Ollama. The analyst's
source-backed deletion prediction is not a performed deletion.

The CLI's JSON output includes observed hex and exceeded the tool output budget.
audit.stdout.txt retains that truncated tool transcript, not a complete JSON
receipt. The bounded human report in audit-report.stdout.txt is complete. Use
the latter and the earlier repair capture as the direct classification evidence.
The returned analyst report used Windows backslashes in its suggested command;
root used forward-slash paths and retains the report unchanged.

A supported Scaffold correction is required before Ollama's release visit.
Preserve the birth-owned exact-path service script without reconstructing vendor
names or exempting retired docs/custom script paths. The CI invocation and guide
promise remain current requirements. Toolbox source/release preparation is
independent of this ownership defect. Root keeps Scaffold's accepted product
unchanged until that pending visit no longer depends on its canonical guide bytes.
