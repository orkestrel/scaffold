# Unit contract-merge — report (2026-09-02)

Writer: `implementer` on Opus 5 (native; Sol dark). Merged `origin/main` `c13cfae` (three
unpublished commits: canonical array copy; refusal-only read diagnostics with single-encoded
previews; compile-time capture of string refinement patterns) into the campaign branch at
`5b0ed57`; the Orchestrator committed the merge as `2c15840`. Conflicts resolved keeping both
intents: `ContractCompiler.ts` string leaves call `buildStringFaults(node, value, path, pattern)`
with main's `pattern` argument; `helpers.ts` `readValue` keeps main's hoisted `subject` and the
branch's `CONTRACT_CODES` membership; `readArrayEntries` takes main's hoist adopted to
`INTRINSICS.reflect.members`; `integration.test.ts` takes main's derived composition test in place
of the branch's census literal; the guide takes main's `readArrayEntries` row (with `inferArray`
→ "the array branch of `valueToSchema`"), main's `ownPattern` row beside the branch's `pinMembers`
and `refuseExpansion` rows, main's scope-claim paragraph without the count, and main's reporting
table with `create*Faults` → `build*Faults`. Adoptions inside main's new code: `create*Faults` →
`build*Faults` (call sites, main's new test block, guide table); `INTRINSICS.members` →
`INTRINSICS.reflect.members`. Main's tests assert no renamed symbol or message. Sweep for every
old name: no hit, with non-zero controls. `package.json` and `package-lock.json` unchanged. Gates
after one `npm run format` to converge the guide table: `format:check` 0, `lint:check` 0, `check`
0, `build` 0, `test` 0 (1327 src, 111 policy, 46 config, 61 setup, 65 guides). The staged diff
reproduces main's own diffstat file for file (662 insertions, 84 deletions across the eight files).
Merge base after the commit: `c13cfae`. Tarball `contract-2c15840.tgz` packed.
