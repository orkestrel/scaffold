# Correct Probe bin claim paths

Act as the bounded implementer directly; spawn nothing. Read the native-entry
brief and the root authority it names, especially tests, architecture, quality,
portability and writing. Read the current Probe guide and the bin test file.
Preserve every existing change. Work only in canonical WebstormProjects/probe.
Own tests/src/bin/main.test.ts and the report at
scaffold/tmp/units/d7n-probe-bin-fixtures-report.md.

Root reproduced the pinned legacy-client receipt failure alone with MCP0.0.29.
The observer sends the same CLEAN/BROKEN/PASSING payload to the built canonical
bin through the real legacy client. At src/core/diagnostic.ts, the case lint
stage refuses module data outside a data-kind file. Its closing line is:

```text
no receipt
```

Changing only the draft path to src/core/diagnostic/constants.ts returned:

```text
receipt probe:d3bab33cfc7e97de41527d770a87b9e8:type:typescript@6.0.3:oxlint@1.81.0:vitest@4.1.11:configs/src/tsconfig.core.json@434f59254d58cf2683d453a26bd0d837
```

Correct the data draft paths in buildClaim to src/core/${name}/constants.ts.
Correct the inline wire, throwing and stderr draft paths to the matching
src/core/<name>/constants.ts spelling. Update a path assertion only if it refers
to a changed draft. Change no other test behavior. Preserve CLEAN, BROKEN,
PASSING, THROWING, WIDE and WIDER texts and workloads, control stages, deadlines,
thresholds, protocol versions, skipped-platform conditions and receipt checks.
Do not centralize unrelated existing helpers in this unit.

The registered harness tool still returns the legacy stream transport error; the
observer's receipt proves only the canonical built package with MCP0.0.29.
Do not present it as a refreshed harness registration or a completed gate.

Do not edit public types, runtime source, manifests, lockfiles, guides, vendored
files or scripts. No installs, builds, package commands, commits, pushes or auth.
Use apply_patch. Do not use mocks, any, assertions, ignores or lint waivers.
Root will rerun the same isolated red and then the bin file before prepublish.
Report exact touched paths and the bounded correction without prose counts.
