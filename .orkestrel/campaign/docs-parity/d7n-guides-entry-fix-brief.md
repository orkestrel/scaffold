# Absorb reporting and rewriting into test:guides

Act as the native implementer on Sol. Execute this bounded unit directly; do not
delegate or accept it. You are not alone in the workspace. Root owns the primary
scaffold checkout and its owner edits. Preserve every edit outside your scope.

## Authority and baseline

Read /c/Users/mikes/WebstormProjects/scaffold/.agents/orchestration.md, then the
isolated checkout's AGENTS.md and applicable rules: names, typescript, architecture,
patterns, tests, workspace, portability, documentation, writing and quality. Read
orkestrel-harden-package/SKILL.md with references/centralization.md,
references/contract.md and references/hardening.md. Read guides/README.md,
guides/scaffold.md and ROADMAP.md where present, authoritative src/core/types.ts,
src/server/types.ts and their barrels. Read the decision-bearing implementation.

The accepted plan is
/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/docs-parity/d7n-guides-entry-design-verdict.md.
Read it completely. Also read d7n-guides-cli-reading.md, d7n-parity-route-reading.md
and d7n-guide-artifact-stage-verdict.md beside it. The Guide public types and helpers
installed in the worktree govern the consumer composition. Inspect exact declared
and installed capabilities before writing overlapping logic.

Writable checkout:
/c/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-guides-entry

Branch: claude/docs-parity-guides-entry-unit.
Baseline: 9b3003d14ca73c5218a7cb2a968f8b35600d3280.
Root preparation exited 0. Its logs are under
/c/Users/mikes/WebstormProjects/scaffold/tmp/pass/d7n-scaffold-guides-prepare.ddZJDD.
Contract 0.0.17, HTML 0.0.9, Markdown 0.0.14, Guide 0.0.18 and Test 0.0.14 are
installed from accepted local tarballs without manifest or lock edits.

## Owned files and exclusions

Own the following paths inside the isolated checkout only:

- scripts/guides.ts and retirement of scripts/docs.ts;
- src/core/constants.ts and src/core/compilers.ts;
- src/server/Materializer.ts;
- src/server/types.ts for audit/remove TSDoc describing the exact retired-path population,
  without changing public signatures;
- tests/src/core/compilers.test.ts and tests/src/core/helpers.test.ts;
- tests/src/server/Materializer.test.ts and tests/src/server/helpers.test.ts;
- tests/distribution.test.ts;
- tests/setup.ts and tests/setupServer.ts for required shared fixture infrastructure;
- guides/scaffold.md and .claude/rules/documentation.md;
- tests/guides.test.ts for command comments only; preserve its substantive assertions;
- package.json for the exact test:guides script value and removal of docs only.

Treat host.json as generated output: report required membership changes, but root
regenerates it with the canonical build/stage mechanism. Do not edit package-lock.json,
dependency ranges, version, unrelated rules, configs, Vite templates or other source.
Report any needed shared-file patch outside this list and stop before applying it.
Primary scaffold, sibling fleet packages and old isolated worktrees are read-only.

Never add dependencies, use any, assertions, non-null assertions, suppression comments,
mocks, spies, fake clocks or behavioral fakes. Keep reusable types in types.ts and
centralize reusable declarations. The self-contained vendored runtime-entry exception
in architecture governs local declarations in scripts/guides.ts; do not import a
sibling helper that is absent from the vendored artifact. Use native path and URL
modules for filesystem boundaries. Do not replace host paths by string concatenation.
Preserve logical inventory keys as slash-normalized relative paths.

No installs, commits, pushes, publications, secret reads, destructive commands or
tree-wide mutating gates. Do not run discard-class Git commands. Always address Git
with git -C <checkout>. Use apply_patch for edits. Save every multi-step command to
a script and invoke the script with a plain shell call. Use forward-slash paths.
Validate scoped owned files only. Root owns full gates, build, packing and integration.
No count or positional prose in reports; raw command diagnostics remain evidence.

## Fixed behavior

Implement the accepted design without reopening its rejected alternatives:

- Generate test:guides as node --experimental-strip-types scripts/guides.ts.
- With no arguments, report drift without changing files, then run the existing
  guides project. Ordinary npm test also writes nothing.
- Accept only --to guide and --to source as explicit rewrite directions. Reject
  malformed or extra arguments with exit 2 before writes or Vitest startup.
- Preserve the seed's missing index/spec preflight and exit 2.
- Compose existing Guide readers, drift and replacement functions. Guide summaries
  may be rewritten; guide example fences are reported only. Source summaries and
  titled examples may be rewritten. README pitch remains authored by hand.
- Preserve shared-file incremental edits. Flush changed paths, reread inventory,
  recompute remaining drift and pitch, and report unresolved findings by reason/path.
  Keep the formatter notice. Retire authored count summaries and count-only state.
- Start the real guides project after the flush, so module-scope inventory sees fresh
  bytes. Use public createVitest('test', { config: 'vite.config.ts', project: ['guides'],
  cache: false, watch: false, reporters: ['dot'] }), start and close in finally.
  Import only public Vitest APIs. Do not add tests/setupGuides.ts, provided-context
  augmentation or setup-file configuration.
- Return nonzero for unresolved reported drift or a failing guides run. Reject empty
  module results, unhandled errors and non-passed module states. Preserve a stronger
  existing nonzero process exit code. Successful assertions cannot mask drift.
- Rename DOCS_SEED_PATH to GUIDES_ENTRY_PATH and update every owned consumer. Preserve
  the existing dormant host candidate for workspaces without guides; generate no
  test:guides script or guides project there. Do not vendor tests/guides.test.ts.
- Add exact RETIRED_HOST_PATHS metadata containing scripts/docs.ts. Admit selected-
  group retired paths into Materializer's snapshot before findings are derived.
  Preserve overwrite's derived-membership, observed-byte, tracked-file, clean-tree
  and protected-path guards. Never own scripts/ wholesale or delete unrelated files.
- Give test:guides the exact old generated Vitest command through ManifestScript.accepted.
  Remove docs only from the isolated package-owned manifest. Do not turn generic
  manifest replacement into a deletion engine or overwrite customized commands.
- Update matching guide rows, commands and documentation rules. No Guide API or
  reader change, no pending seed-guard work, no unrelated prose sweep.

## Proof and acceptance

Insert and run a failing proof before each defect correction. Record the exact scoped
command and actual red result, then the same command green. Root already reproduced
the prior npm --to failure and the omitted retired-path population, but the permanent
regressions must bind the implemented fixes. Call probe's prove tool for a claim with
a named TypeScript project, case and breaking edit as quality.md requires; retain its
receipt or exact failure. Do not claim an unavailable transport proves the edit.

Use real child-process/npm fixtures in temporary directories, including a path with
spaces. Exercise no-argument readonly reporting; --to guide and --to source; selected
bytes only; shared-file updates; fresh post-write assertions; repeat stability;
invalid arguments and missing inputs; reported unresolved drift despite passing tests;
test failure and cleanup. Test actual public runner outcomes without replacing Vitest.
Existing compiler seed fixtures may wire installed packages locally; do not install.
Keep unrelated package-owned parity assertions unchanged.

Run a permanent retired-path regression red before adding its snapshot admission,
then green. Cover group selection and preservation of unrelated scripts. Existing
overwrite guard tests remain substantive. If proof needs a tracked temporary Git
commit, return the exact root-run recipe rather than committing yourself.

Scoped commands include the relevant Vitest core/server cases and formatter/type
checks that do not build or mutate the tree. Do not use full npm test casually. Read
complete diagnostics. Stop when a required change exceeds ownership or contradicts
the accepted design; report expected, found, evidence, completed/pending work and a
short hypothesis. Do not invent a bypass or leave a hidden follow-up.

Return touched paths, diffstat, actual red/green/scoped commands and exit results,
any unexecuted root proof recipe, and required generated/shared-file patches. Root
retains the actual diff/status and runs the full chain. Independent Opus actual-diff
review and mechanical/gate verification follow; your report does not close the unit.
