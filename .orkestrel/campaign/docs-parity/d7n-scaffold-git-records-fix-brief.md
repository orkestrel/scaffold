# Remove the manifest limit from Git inventory reads

Act as the bounded implementer on the native objective engine. Continue the
serial Scaffold release preparation rooted at 502428f11b792feab233120d1de395b197117610.
Root's catalog, mirrors, package pins, lock, host inventory and pin fixtures are
present and off-limits. The owned source paths still match that committed tip.
Preserve all existing edits; no other writer owns Scaffold. Spawn nothing.

Read AGENTS, orchestration, names/typescript/architecture/patterns/tests/workspace/
portability/documentation/writing/quality rules; harden skill with centralization,
contract and hardening references; guides/README.md, guides/scaffold.md Git and
inventory limits, Process raw Session guide, exact installed Session and Worktree
types, and d7n-scaffold-git-records-boundary-brief.md. This is a constrained repair,
not a new public API or a general process runner. No installs, dependencies,
manifests, lockfiles, vendored files, whole-suite builds, commits, refs, pushes,
authentication, publication, secrets, worktrees or package copies.

Root reconciles the independent recommendations by preserving the existing
inventory bounds before retaining output. Use the installed Process createSession
raw-byte mechanism, not Number.MAX_SAFE_INTEGER or a new arbitrary buffer cap.
The old helper uses MAX_MANIFEST_BYTES, which governs manifests. Root's actual
Git diagnostic at limit 1048576 failed/truncated with SIGKILL, while diagnostic
larger limits returned 1614828 UTF-8 bytes and exit 0. The existing real-repository
case failed in prepublish and alone. A maximum-limit passing run answers capacity,
not enforcement of the existing inventory bounds.

Own src/bin/helpers.ts, src/bin/CLI.ts, tests/src/bin/helpers.test.ts,
tests/setupServer.ts only if reusable Git fixture setup is required, and the Git
section of guides/scaffold.md. Public core/server contracts do not change. If
setupServer gains a reusable export, own its direct mirrored setup test and guide
coverage only as required; report the exact paths before touching them. Source
and test declarations stay centralized, with no nested named functions, mocks,
assertions, suppressions, wrappers or private undeclared reusable helpers.

Make readGitRecords async and await it from async #worktree and the already-async
overwrite caller. Register stdout observation before eager spawn through Session's
on port. Decode Git's NUL protocol across arbitrary chunk boundaries with native
streaming UTF-8 decoding; do not introduce a stricter Unicode policy than before.
Retain complete nonempty records only. Enforce MAX_INVENTORY_PATHS while collecting
and bound the unfinished record by MAX_PATH_LENGTH plus the porcelain status
prefix. The existing isWorktree path guards remain authoritative after status
prefix normalization; do not replace them with new path parsing. Use an abort
signal to stop a rejected stream promptly. Preserve spawn, nonzero exit, signal,
listener failure, drain cutoff and incomplete final record as TARGET refusals,
never partial success. Await terminal exit and destroy in finally. Do not leak
listeners, input handles or children. Report actual Git query failure accurately
instead of claiming every failure means the directory is not a repository.

Insert the regression before changing production: a real scratch Git repository
whose actual NUL listing exceeds MAX_MANIFEST_BYTES but fits the existing path
and inventory limits. Populate the real Git index efficiently with valid portable
paths and a real blob via Git plumbing; do not create a package copy or depend on
campaign membership. Assert complete exact tracked membership, including a record
beyond the old byte boundary; exercise porcelain status too. Retain the real
non-repository refusal and add a failed-query refusal if needed. All Git processes
use the declared Process primitive, '-C' and the scratch path, never a shell or
global Git config. Cleanup through the existing scratch lifecycle in finally.

Run the smallest exact regression command red before the fix and green after.
Root's Probe transport currently fails with the legacy stream error and issues
no receipt; call it when the rule applies and record that fact, not a fake proof.
Run only scoped read-only checks and tests, not a full suite or build. Format
owned files only. Stop on a required edit outside scope. Return exact diffs,
red/green command receipts, preservation of existing dirty files and any deviation
in tmp/units/d7n-scaffold-git-records-fix-report.md. Astra reviews the actual fix
independently; root reruns the recorded release gates and decides acceptance.
