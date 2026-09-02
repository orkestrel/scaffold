# Unit fixup-queue — correct the guide's option-leaf sentence

## Role and engine

`builder` on Claude Sonnet, reached as a native subagent. Fully specified, taste-free.

## Objective

Rewrite the one false prose claim the fix-round audit retained for queue: `guides/queue.md:116`
describes a repair the verification replaced.

## Context

**Evidence.** `/home/user/fleet/queue/guides/queue.md:116` reads that the constructor and
`enqueue` share both option leaves ("one read boundary and one guard boundary serve both"). The
shipped code: `readOption` is called only from `enqueue` (`src/core/Queue.ts:144,149,159,169`);
the constructor reads bare (`Queue.ts:81,88,95`) and uses `validateOption` alone. Audit ruling:
`.orkestrel/campaign/fix/audit-1-verdict.md` § queue.

**Law.** `AGENTS.md` § Writing; `.claude/rules/writing.md`; `.claude/rules/documentation.md`
§ Parity. Skill: none. Guide: `guides/queue.md` itself.

**Host.** Linux, bash. Repository `/home/user/fleet/queue`, branch
`claude/orkestrel-npm-audit-deps-14ibta`, clean, `node_modules` installed.

**Measurements.** `grep -n "readOption(" src/core/Queue.ts` returns lines 144, 149, 159, 169 only.

**Control identifiers.** none.

**Standing conditions.** none.

## Unknowns

none.

## Scope

**Owned.** `guides/queue.md` (the paragraph at line 116 only).

**Shared (report-only).** none.

**Off-limits.** everything else.

**What asserts the state this change ends.** `tests/guides.test.ts` (name parity only; no fence
quotes the sentence). Verify with `grep -n "one read boundary" guides/queue.md` returning nothing.

**Tools and limits.** Read, Grep, Glob, Edit, Bash. No commit, no `npm install`, no mutating
tree-wide command except `npm run format` if `format:check` fails on the guide.

## Execution

A native subagent: perform the assignment directly and spawn nothing. Replace the paragraph with
this text, adjusted only to keep the surrounding Markdown intact:

"Two option leaves back the queue's option handling. `readOption` reads one named property of a
caller-supplied `QueueEntryOptions` exactly once and turns a throwing getter into a coded
`QueueError`; `enqueue` uses it because entry options are foreign. `validateOption` applies a
guard to an already-read value and throws the coded invalid-value failure with the option and the
refused value in its context; both `enqueue` and the constructor use it."

Then run `npm run format:check` and `npm run test:guides` from the repository root.

## Output

The diff (`git diff`), the two command results, and `git status --short`. No process diary.

## Deviation contract

Stop and report if line 116 no longer carries the sentence described, or if either command fails
for a cause outside the edited paragraph.

## Acceptance criteria

1. `grep -n "one read boundary" guides/queue.md` returns nothing.
2. `npm run format:check` exits 0.
3. `npm run test:guides` exits 0.

## Review evidence

The diff and the status output at return.
