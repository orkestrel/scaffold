# Prepare the native-adoption root carrier

Act as a Terra builder. Perform this fully specified assignment directly and
spawn nothing. Read canonical Scaffold AGENTS.md, .agents/orchestration.md,
applicable portability, workspace, tests, writing, and quality rules, and the
orkestrel-align-packages skill with integration.md and fleet.md. Read the
accepted Guide command contract in Guide guides/guide.md and src/server/types.ts.
Use apply_patch for authored files. You are not alone in the workspace; preserve
the Guide writer's returned test edit and every other unit's files.

Own only tmp/pass/check-guide-native-adoption.sh and the report
tmp/units/d7n-guide-native-root-carrier-report.md in canonical Scaffold. Do not
edit or install into any package. Do not run the carrier, gates, build, pack, Git
mutations, or publication. Root runs the carrier after supported tooling
application and ordered Guide gates. No fresh verifier is requested.

Read tmp/pass/run-parity-gates.sh and tmp/pass/compare-guide-test-export.sh as
existing mechanics. Author a successor carrier with these exact behaviors:

- Use Bash with set -euo pipefail. Source the absolute forward-slash pass-env.sh
  path at the beginning. Every Git command uses git -C on canonical Guide.
- Accept a safe unused evidence label as the sole argument. Reject empty or
  unsafe labels and existing evidence targets. Create only $SCR/<label>.
- Require the accepted prior extracted archive directory
  $SCR/packed/d7n-guide-api-correction/extract/package/dist/src to exist. Record
  its archive SHA256 and canonical Guide HEAD. Do not modify that prior evidence.
- Capture Guide's full git diff HEAD, porcelain status, and staged metadata
  entries before running commands. Hash package.json and package-lock.json.
- Run npm run test:guides, npm run test:guides -- --to guide, and npm run
  test:guides -- --to source from canonical Guide. Bound each command with the
  root-supplied 180s timeout and 15s kill grace. Write each stdout/stderr log and
  actual exit to distinct paths. A nonzero exit stops the carrier.
- These are aligned no-op controls. Reject a log containing a line that begins
  with wrote and capture the whole diff and status after each run; require each
  to equal the initial captures. Check manifest hashes and staged metadata too.
  Do not claim a nonempty rewrite proof from these controls.
- Compare the entire canonical Guide dist/src tree against the extracted prior
  archive using diff -r, then against Scaffold's installed Guide dist/src tree.
  Retain actual outputs and exit files. Nonzero comparisons stop; never suppress
  or normalize output differences. Compare README.md with the prior archive.
- Print concise command exits and the final evidence directory. No prose counts,
  manual edits to generated files, source aliases, package copies, links, secrets,
  undeclared dependency changes, or fallback registry installs.

Run bash -n only after authoring. Return the carrier path, syntax result, output
paths it will create, and any deviation. Root reviews and executes the carrier;
your report does not accept its unexecuted claims.
