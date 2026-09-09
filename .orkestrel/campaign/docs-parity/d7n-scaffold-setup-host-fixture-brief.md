# Align the setup fixtures with scripts ownership

Act as native Terra builder. Perform this fully specified fixture update directly;
spawn nothing. You are the sole scaffold writer. Preserve all other dirty and
staged paths. Work in C:/Users/mikes/WebstormProjects/scaffold, never a package copy
or worktree. No installs, Git mutations, builds, publication or secret access.

Read AGENTS.md, .agents/orchestration.md, the tests, TypeScript, names,
architecture, portability, writing and quality rules, orkestrel-harden-package
and its centralization reference, guides/README.md and the scripts ownership
contract in guides/scaffold.md. Ruling 35 and d7n-scripts-ownership-fix-brief.md
in the campaign settle directory ownership. Do not reopen that policy.

Own tests/setupServer.ts only within createCheckout/buildCheckoutManifest and
their comments, tests/setupServer.test.ts only the affected setup assertions,
tmp/pass/scaffold-setup-host-fixture for saved validation scripts and evidence,
and tmp/units/d7n-scaffold-setup-host-fixture-report.md. Use apply_patch. Do not
touch any other path. The prior writers are frozen.

Root reproduced the full-suite failures with the isolated command below, terminal
c374b1 exit 1. Read tmp/pass/d7n-scaffold-setup-root-red/test.log.txt. The old
fixtures still assert no fleet root and an individual codex script plan. The
synthetic checkout now puts sample.md inside scripts and lost its executable
member. Preserve that coverage by making the synthetic scripts member sample.sh;
do not weaken the executable assertion to false.

Apply these exact changes:

- In createCheckout, select sample.sh for the scripts root and sample.md for
  other nonempty roots. Write the selected destination text as before. Keep
  .claude/skills empty. Use a local destination value with the conditional filename.
- In buildCheckoutManifest, make the same fixture filename selection, preserving
  the independent expected membership and matchesExecutablePath classification.
- In the fleet-manifest assertion, expect roots toStrictEqual(['scripts']) and
  name the case as declaring the script root and planned file membership.
- In the real-checkout case, retain the executable assertion and additionally
  assert that the executable destination list equals ['scripts/sample.sh'].
- In the vendored-plan case, expect scripts instead of scripts/codex.sh.
- Remove stale prose about these fixtures carrying no roots or individual script
  artifacts in the touched comments; do not sweep unrelated text.

Validate with a saved script sourcing tmp/pass/pass-env.sh through explicit
C:/Users/mikes/scoop/apps/git/current/bin/bash.exe. Run the exact root command:

```text
node node_modules/vitest/vitest.mjs run tests/setupServer.test.ts --config vite.config.ts --no-cache --reporter=dot --project setup
```

Run scoped lint and format checks on the owned TypeScript paths. Retain raw logs
and exit receipts. Root owns the ordered full gate chain. Stop on any needed
deviation from this patch; report the exact issue. Use readonly collections, no
assertions or suppression directives, no dependency addition, no nested helpers.
Use forward-slash paths and never state prose counts. Return the report with
changed paths, commands, exits, evidence paths and any remaining failure. Root's
independent Astra actual-diff review covers this change with the parent extraction.
