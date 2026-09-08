# Map the owner-main differences

Act as a read-only evidence scout. Spawn nothing. Read scaffold AGENTS.md,
.agents/orchestration.md, the portability, writing, quality, and documentation rules,
the orkestrel-align-packages skill with its fleet reference, and the campaign handoff.
Read each scoped package's retained audit verdict, fix/check/verify briefs, closure
verdict where present, and matching guide before interpreting its source differences.

The owner asks to reconcile fixes from origin/main in contract, mcp, probe, and database.
The Orchestrator fetched each origin on 2026-09-08 and ran merge-base --is-ancestor
origin/main HEAD with exit 0 in each. The HEAD and origin/main readings are:

- contract: fd3fce2 and fd3fce2; clean.
- mcp: a01d5e8 and 292c966; clean.
- probe: 135aab7 and b816749; tests/src/server/Probe.test.ts has the resumed unit diff.
- database: cdbf66a and 57eb898; clean.

Map the remaining origin/main-to-HEAD diffs. Identify the owner fix's named source and
test paths, the campaign's changed paths, and any source hunk outside comments at an
owner-fixed implementation site. Keep probe's uncommitted test-draft diff separate from
the committed branch comparison. Read merge commits where needed to identify resolution.
Contract is identical; do not survey it further once that reading is confirmed.

Return a compact file:line evidence map. Name the main corrections by their actual
commit subjects and source responsibilities. State which source paths are byte-identical
to origin/main and which differ only in doc blocks where the evidence permits it.
If an implementation hunk differs, quote the bounded hunk and name its originating commit.
Do not decide whether a behavioral change is safe or correct, design a fix, run package
suites, or mutate anything. The Orchestrator owns reconciliation.

Use C:/Users/mikes/WebstormProjects/PACKAGE, git -C with the explicit checkout, and
forward-slash paths. Write program-carrying shell commands to scripts before execution.
Do not install, commit, push, publish, read credentials, or use discard-class commands.
Do not change types, runtime source, tests, dependencies, or vendored files.
Return missing evidence as unknown, not an inferred result. No counts in report prose.
