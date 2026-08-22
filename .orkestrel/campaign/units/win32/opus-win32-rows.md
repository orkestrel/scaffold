# Brief: close the remaining win32 portability rows in the test suite

Role and engine: implementer, Opus 5, native. You perform this assignment directly in /home/user/test and spawn nothing. This is the successor unit to the portable-temp-override fix; the sweep table at /home/user/scaffold/tmp/cursor/grok-win32-sweep.log is the finding source, and every row here names its pointer.

Read before editing: /home/user/test/AGENTS.md, .claude/rules/tests.md (the host-varying-property rule and the conditional-skip rule), .claude/rules/typescript.md.

Standing condition: these rows PASSED on the observed Windows host (2026-08-21) — they are rule violations that a different win32 host can turn red, not observed defects. Close each per the tests rule: probe the host-varying property at runtime and assert what the probe returned, or name the mechanism, never the platform alone.

Rows, verify each against the live file before acting:
1. tests/src/server/factories.test.ts:212 — `toThrow('EISDIR')` pins a POSIX errno for writing onto the allocation directory; win32 hosts report EPERM or EACCES. Capture the error and assert its `code` is a member of the set the hosts actually produce, with a comment naming the per-platform codes, or assert the throw plus the property that matters (the write refuses and the directory survives). Keep the comment at 210-211 truthful.
2. tests/src/browser/factories.test.ts:187, 191-194, 212-214, 239 and tests/src/browser/helpers.test.ts:1500 — exact `toBe` equality between provider-returned capture paths and `${server.config.root}/tmp/capture/...` strings goes red where the provider returns native separators. Compare through one separator-normalized form: normalize BOTH sides with a shared helper (an existing shipped or setup helper if one fits; otherwise a small exported setup helper per tests.md shared-infrastructure rules), keeping the assertions' substance — same file, same directory, same membership.
3. tests/src/server/helpers.test.ts:218-232 and 235-251 — the live-directory `createLink` cases run ungated while the dangling and occupied cases nearby are gated; a win32 volume that cannot create junctions throws here. Gate them on the same capability constant the sibling cases use (DIRECTORY_LINKS), citing the mechanism.

Scope: owned tests/** in /home/user/test except the vendored tests/setupPolicy.ts and tests/policy.test.ts. Off-limits: package.json, package-lock.json, src/**, guides/**, configs/**, vite.config.ts, tsconfig.json, .claude/**, .orkestrel/**. No mutating git, no npm install, no tree-wide format; scoped oxfmt over edited files allowed.

Validation, bare exits: npm run check; npx vitest run --project src:server tests/src/server/helpers.test.ts tests/src/server/factories.test.ts; npx vitest run --project src:browser tests/src/browser/factories.test.ts tests/src/browser/helpers.test.ts.

Output: Delivered (per row) / Validation (commands, bare exits) / Deviations (or none) / Flags.

Deviation contract: stop and report on any conflict with the primary objective; ancillary conflicts (helper name, comment wording) are yours to decide and record.
