# Database portable path expectations

Act as bounded builder. Read canonical Scaffold AGENTS.md, orchestration,
portability/tests/typescript/architecture/names/quality/writing rules, harden
structural skill and centralization reference, and Database guide index and
matching setup-server test/helper contract. You are not alone. Own only
C:/Users/mikes/WebstormProjects/database/tests/setupServer.test.ts and report
tmp/units/d7n-database-path-expectations-report.md in Scaffold. Do not touch the
frozen guides entry, source, helpers, metadata, generated files or other repos.
No installs, whole gates, commits, pushes, copied checkouts or auth. Spawn nothing.

Root's complete prepublish failure is retained in
tmp/pass/d7n-database-following-source-prepublish. Root reruns the same full chain
alone in d7n-database-following-source-prepublish-alone before dispatch. The
failure is in path expectations, not the parsers: readModuleStatements reports
the actual native path, while Probe.scanDiagnostics returns normalized portable
diagnostic paths. Canonical Probe src/server/helpers.ts confirms normalizePath
on the parsed diagnostic path; retained Probe0.0.13 now supplies those helpers.

Apply only these prescribed corrections:

- In readModuleStatements's broken-file expectation, replace the slash-only
  regexp with the exact error-prefix string built using node:path join on
  project.scratch.path, src and broken.ts. Keep the existing .toThrow and all
  adjacent assertions; do not weaken to a generic error or platform branch.
- In readProjectDiagnostics's broken-file expectation, compare diagnostic.path
  to posix.join('src', 'broken.ts'), importing posix from node:path. It is a
  compiler diagnostic identifier, not a host filesystem path. Keep location,
  message, population and clean-project assertions unchanged.

Run the existing setup project by explicit tests/setupServer.test.ts path after
the edit, plus scoped format/lint and diff check. These cases drive the real
parser and compiler processes, outside the prove tool's staged draft model.
Record exact command/exit and old/new assertion binding. Do not extract helpers,
reformat unrelated files, redesign setup infrastructure or add coverage here.
Freeze on return. Root will run final ordered gates and independent diff review.
Use apply_patch, saved multistep commands, forward-slash invocation paths and
git -C. No counts or model identifiers in report prose.
