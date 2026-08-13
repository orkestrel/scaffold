# Fix round 4 — integration record

Sol wrote the source, types and tests. The Orchestrator found two errors in that work and closed both
before the prose unit was dispatched.

## What Sol closed

| Finding | Repair |
| --- | --- |
| R1 dangling symlink | `read` returns `undefined` when the entry cannot be followed, via `statSync(candidate, { throwIfNoEntry: false })` rather than a catch, so an unrelated failure such as `EACCES` still surfaces. `exists` keeps `lstatSync` and still reports the link entry present. Permanent test added. |
| R2a `exclude` TSDoc | now states root-relative path keys, and that a directory key takes its descendants |
| R2b `read` `@throws` | now includes the directory case |
| R3 timer floor | `delay - clockSlop` with `clockSlop = 2`, named rather than a bare proportion. Proved red at 10.32ms against the 18ms floor, green on restore. |

## Orchestrator findings against the fix

**A symbolic-link cycle still surfaced a raw `ELOOP`.** `throwIfNoEntry: false` covers a missing
entry only, so the raw-`node:fs`-error class was narrowed rather than closed:

```text
LOOP  exists: true    LOOP  read: Error: ELOOP: too many symbolic links encountered, stat '…/loop'
CHAIN read: undefined
```

Ruled: document, do not catch. Distinguishing `ELOOP` from a permission failure means matching errno
strings, an unresolvable link is a defect in the test's own fixture, and the host's error naming the
path serves that test better than `undefined` does. The `@throws` clause now says reading follows
links and surfaces the host's error for one the host cannot resolve. The defect the audit found was
an incomplete contract, and completing it is the fix.

**The parameter rename Sol declined was not blocked.** Its report gave the reason as "renaming the
public parameter would require an off-limits guide update". Measured: the guide's `## Methods` table
has Method, Returns and Behavior columns and no parameter column, and the guide declares no `@param`
anywhere. The implementation already called it `target`, so the contract said `relative` while the
code said `target`, and `relative` had become false when `resolveContained` started accepting
absolute contained paths. Renamed to `target` throughout; nothing else moved.

A unit's stated reason for declining an option is a claim like any other. This one was checkable in
one grep.

## A deviation that was the brief's fault

Sol reported that the restore command the brief specified could not run:

```text
$ git checkout -- src/core/helpers.ts
fatal: Unable to create '/home/user/test/.git/index.lock': Read-only file system
```

The `workspace-write` bench sandbox mounts `.git` read-only. Sol restored the file by rewriting the
original line and proved it with `git diff --exit-code`, which reads the index without locking it.
The recovery was correct and the brief was wrong: it asserted a mechanism without checking the
executor's sandbox permits it, which is the measurement check in the brief-check list.

Promoted to `.claude/agents/codex.md`, beside the section recording that the same sandbox denies
network, so the next brief does not rediscover it.
