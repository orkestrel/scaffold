GATE REPORT — RED

- Command: `node.exe npm-cli.js run prepublishOnly`
- CWD: `C:\Users\mikes\WebstormProjects\scaffold\tmp\release\scaffold-0.0.75`
- Time: 2026-09-18T17:54:35.929Z–17:59:06.615Z
- Native exit: `0`; signal: `null`; cap expired: `false`; duration: `270.6861508` seconds.
- The summary’s ordered `&&` script establishes exit `0` for `format:check`, `lint:check`, `check`, `build`, `test`, and release-mode `test:distribution`. No gate failed.
- Full logs: candidate `../../../../raw/candidate/tmp/units/anchor-release-gates-node/summary.json`, `stdout.log.txt`, and `stderr.log.txt`.
- Root stdout contains only the candidate summary path; root stderr is empty. The wrapper ends with `exit $runner.ExitCode`, but neither retained root log records the actual PowerShell exit. Host exit `0` is therefore unretained and cannot be independently established from artifacts.
- Expected fixture diagnostic: malformed peer-dependency config emitted `[MIXED_EXPORTS]` and `failed to load config`; its enclosing test suite passed. Other stderr anomalies are API Extractor’s TypeScript 6.0.3-versus-5.9.3 warning and Node `DEP0190`.
- Skips were reported by source-server, config, setup, and release-distribution test projects.
- Built-reader command, run from the candidate: `node ../../../../raw/canonical/tmp/probe/anchor-built-reading.mjs` → `representation: "bigint"`, `untouched: true`, `altered: false`; direct built declarations expose `WriteAnchor.device` and `.inode` as `bigint`.
- Dependencies: declared `@orkestrel/test ^0.0.18`, `@orkestrel/contract ^0.0.17`; lock and installed manifests resolve `0.0.18` and `0.0.17` from npm registry tarballs.
- Candidate HEAD is `2f78b38a7c938d7e4f5b5c8f2030385bfcb5d6eb`. Its current dirty status matches the summary’s before/after status, including the listed source edits and capture-recipe directory.
- Missing required input: `../../../../raw/candidate/tmp/units/anchor-repair-report-3.md` does not exist.
- Limits: Windows-only run; cap-expiry termination was not exercised; no pack, archive, publication, or Linux claim.
