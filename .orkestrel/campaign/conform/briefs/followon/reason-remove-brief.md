# Unit reason-remove — `SubjectBuilderInterface` carries the whole `remove` batch family

## Role and engine

`implementer` on GPT-5.6 Sol through the Cursor bench (`tmp/work/sol5.sh`, model `gpt-5.6-sol-high`), the sole writer in `/home/user/fleet/reason`. Perform the assignment directly and spawn nothing.

## Objective

`SubjectBuilderInterface.remove` gains the no-argument overload `remove(): void` that every manager in this package already declares, the class implements it, the guide documents it, and a proof pins it.

## Context

Read before editing, in this order: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/patterns.md` § Managers › Batch operations and § Stateful emitters; `/home/user/scaffold/.claude/rules/names.md` § Entity-scoped names; `/home/user/scaffold/.claude/rules/tests.md` § Test contract; `/home/user/scaffold/.claude/rules/documentation.md` § Parity; `/home/user/scaffold/.claude/rules/writing.md`; `/home/user/fleet/reason/guides/reason.md`.

The finding (the round-1 objective lane's R-1 on unit conform-reason): after reason-subj-11 the managers declare the batch family in full — `remove(ids: readonly string[]): boolean`, `remove(id: string): boolean`, `remove(): void` (`src/core/types.ts:916-918` and the sibling managers, with the TSDoc at `:902-906` stating that no argument removes every member and emits one `remove` per member) — while `SubjectBuilderInterface` (`src/core/types.ts:1466-1478`) declares only `remove(keys: readonly string[]): boolean` and `remove(key: string): boolean` beside its own `clear(): void`. One package presents two `remove` contracts.

The ruling: `patterns.md` § Batch operations fixes one shape for a single-word batch verb — no argument applies to all, one id applies to one, an id list applies to those and returns true only when every one succeeds — and states that an entity owning both `clear` and a batch verb keeps both, because `clear` resets the entity's state and emits one `clear` while the no-argument batch verb applies the verb to every item and emits per item. `SubjectBuilder` owns both, so it takes the no-argument overload: `remove()` removes every field, emitting one `remove` per key removed in the builder's own key order, and returns nothing; `clear()` keeps its meaning and its single `clear` event. Both keep the destroyed-state refusal the interface documents.

Sites: the interface at `src/core/types.ts:1466-1478` (declare the overload first in the order the managers use: array, single, none; update the TSDoc so the `remove` sentence states the three forms and the per-key emission the way the manager block at `:902-906` does); the class `src/core/builders/SubjectBuilder.ts` (the overloads at `:102-104`, the implementation at `:104`); the guide `guides/reason.md` (the `SubjectBuilder` row at `:94`, the `SubjectBuilderInterface` row at `:390`, the `## Methods` table for `SubjectBuilderInterface` wherever it sits, and the `SubjectBuilderEventMap` row at `:389` if its wording changes); the mirrored test `tests/src/core/builders/SubjectBuilder.test.ts`. Read the managers' `remove()` implementation in `src/core/builders/managers/GroupManager.ts` and its siblings and mirror its emission order and destroyed-state handling rather than inventing another.

Host: POSIX shell; `node_modules` holds the fleet closure staged with `npm install --no-save`; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile (an npm shim on `PATH` refuses install-class subcommands and logs every npm invocation). Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; undo an edit by editing. Allowed commands, one per call: `npm run check`, `npm run format:check`, `npm run lint:check`, `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core <file>`, `npm run test:guides`, `npx oxfmt --config .oxfmtrc.json <file>`, `git status --short`, `git diff`, `grep -rn <pattern> src tests guides`, `ls`, `cat`, and `mkdir -p /home/user/work/evidence/reason-remove-proofs`. Capture a runner with `> /home/user/work/evidence/reason-remove-proofs/<name>.txt 2>&1`.

Standing conditions: the checkout is clean at the landed tip `ccd2baf` or later; every `.md` under `guides/` other than `guides/reason.md` and `guides/README.md` is a vendored mirror, off-limits.

## Unknowns

Whether the guide keeps a `## Methods` table for `SubjectBuilderInterface` or documents its methods in the Entities row alone; report which and edit the one that exists.

## Scope

Owned: `src/core/types.ts` (the `SubjectBuilderInterface` block only), `src/core/builders/SubjectBuilder.ts`, the test file mirroring it, `guides/reason.md` (the rows named under Sites), `/home/user/fleet/reason/tmp/units/reason-remove-report.md` (create `tmp/units/` if absent). Shared, report-only: `tests/setup.ts`. Off-limits: everything else, including `package.json`, `configs/**`, the vendored `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`, and every vendored guide mirror.

## Execution

Types first: edit the interface, run `npm run check`, and read the diagnostics naming the class as the failing-first reading for the contract. Then the class, then the proof, then the guide. Before the proof passes, capture it red against the implementation planted to emit nothing on the no-argument form (`red.txt`), then restore the line by editing and capture it green (`green.txt`). Perform every step yourself; spawn nothing.

## Output

Write the report to `/home/user/fleet/reason/tmp/units/reason-remove-report.md` and return its content as your final message. Sections: Rows (the contract, the class, the proof, the guide — each `applied` with `file:line`), Failing-first controls (command, red count, green count, capture paths), Sweeps (`\bremove\(` over `src`, `tests`, `guides/reason.md`, listing every declaration and its arity), Gates (`format:check`, `lint:check`, `check`, `test:guides`, and the scoped `src:core` run over the mirrored test — command and exit), Breaking (an added overload breaks no caller; state it), Deviations.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one hypothesis — when the managers' `remove()` semantics cannot be mirrored on the builder without changing `clear`, when a gate reddens on a file outside Owned, or when the guide's parity test fails on a row you did not edit. Decide, record, and carry on for an ancillary question: where a sentence sits, which existing test block the new case joins.

## Acceptance criteria

1. `npm run check` exits 0 with `SubjectBuilderInterface` declaring `remove(keys: readonly string[]): boolean`, `remove(key: string): boolean`, and `remove(): void` in that order.
2. The mirrored test carries a case proving `remove()` removes every field, emits one `remove` per key in the builder's key order, leaves `fields()` empty, and that a destroyed builder refuses it with `ReasonError('DESTROYED', …)`; its red capture reads the case failing and its green capture the file passing.
3. `npm run test:guides` exits 0 and `guides/reason.md` states the three forms for `SubjectBuilderInterface.remove` in the same words the manager rows use.
4. `format:check` and `lint:check` exit 0 over the tree.
5. `git status --short` lists only Owned files.

## Review evidence

The auditor receives `git diff` and `git status --short` from the Orchestrator's own run plus the captures under `/home/user/work/evidence/reason-remove-proofs/`.
