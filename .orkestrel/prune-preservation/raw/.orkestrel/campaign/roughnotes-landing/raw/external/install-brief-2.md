# Unit roughnotes-original-install — Use the accepted commit as lock authority

## Role and engine

builder on native Terra. Follow full install-brief.md and authorities. This successor replaces the unexecuted original implementation; preserve it unchanged.

## Objective

Provide a bounded PowerShell install launcher that admits the accepted clean source commit and verifies installed versions and artifact bytes.

## Context

**Evidence.** Root rejected install-original.mjs before execution: it does not enforce the pre-install declared/locked identity or status allowlist, omits registry URLs and public config digest, and uses a tautological target comparison. Its launcher can overwrite logs. No install ran. Root committed accepted recovery at57b738fd38d4553d0f4f6a31ff4fb1030432a389, then original main fast-forwarded to that exact hash. Root merge toolc75d72 exited0. Source gates and original staging/backup verification are GREEN.

**Law.** Same original authority; skill build-application and required references. No product behavior changes. No packages added. Prefer existing tested primitives; no generic install framework.

**Installed primitives.** Use native PowerShell/Git and the existing node/npm executable. The accepted commit pins already-verified manifest/lock bytes, so do not duplicate the JavaScript identity parser. After npm ci, run npm ls @orkestrel/scaffold @orkestrel/test --depth=0 --json through native Node/npm CLI, parse its ordinary JSON with PowerShell, and verify installed0.0.75/0.0.18. Hash installed public config against the known registry digest.

**Host.** Same original fixed root and scratch. PowerShell5.1. Long npm ci cap300seconds. Root remains sole source mutator.

**Measurements.** Literal expected original main HEAD57b738fd38d4553d0f4f6a31ff4fb1030432a389. Exact status must be only 'A  .codex/agents/orkestrel.toml' and 'A  .codex/hooks.json'. Verify Git top-level equals expected original path. Record package.json/package-lock.json/Codex SHA256 and index entries before/after; compare all records, HEAD and complete status. Installed public config expected C8364A20FCA401E65F3C092968B1F6B4D4E025A1EFD91E22BEB01B3FCD39E076.

**Control identifiers.** Syntax and a read-only -Check that validates all admission and destination exclusivity then returns before creating output or launching npm. Run -Check against the actual merged original. No actual ci by author.

**Standing conditions.** Original staged Codex files are user-owned and intentional. No other dirty source is permitted. Full gates were run on the exact committed source in recovery and remain closed.

## Unknowns

None; actual npm install outcome belongs to root.

## Scope

**Owned.** launch-install-original-2.ps1, install-report-2.md, install-author-evidence/successor-2/.

**Shared (report-only).** Prior install script/report, original source/index, backup, accepted registry records.

**Off-limits.** Running actual install, changing source/index, predecessors, commit/push/merge/delete, canonical files, delegation.

**What asserts the state this change ends.** Original installed deps lag accepted source; prior instrument did not enforce the assigned boundary.

**Tools and limits.** Author scratch successor and syntax/read-only checks only.

## Execution

Perform directly and spawn nothing. Use one PowerShell successor, fixed literal expected commit and fixed run directory original-registry-install-20260918 under scratch. Require output absent before creation. Run production admission before -Check returns. Actual path writes before.json and command logs, launches native node/npm ci --ignore-scripts --no-audit --no-fund with hidden window, captured streams, retained handle, immediate PID output and300second tree cap. Require native exit0 then npm ls exit0 and exact installed versions; verify public config digest. Record after.json, compare complete preservation snapshots, write terminal success only after every check. On failure retain logs/partial state, report nonzero and failure terminal where output exists. Do not silently reuse or overwrite evidence. No Node helper or parameterized version/commit needed.

## Output

Return successor pair, exact root invocation, syntax and real -Check results, source status, delta and known limits.

## Deviation contract

Follow original protocol. Choose evidence field names locally. Stop on real source drift rather than broadening admission.

## Acceptance criteria

- Admission binds to exact accepted source and user-only staged additions before npm.
- Actual npm native exit/logs/cap and installed versions/config are checked.
- Source, lock, user files/index, HEAD and status are unchanged after install.
- -Check executes actual admission without output/install mutation.

**Observations, not criteria.** Root runs actual ci; independent verifier checks resulting evidence.

## Review evidence

Return effective script/report and preflight output, preserving rejected predecessor unchanged.
