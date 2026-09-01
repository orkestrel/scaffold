# Campaign context block (pasted into every unit brief of the second contract performance campaign)

**Law.** `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/names.md`, `typescript.md`, `architecture.md`, `patterns.md`, `tests.md`, `documentation.md`, `writing.md`, `quality.md`; skill: none unless the brief names one; guide `/home/user/contract/guides/contract.md`.

**Host.** Linux container, bash, 4 CPUs, node v22.22.2, npm 10. Working path `/home/user/contract` (git branch `claude/method-memoization-contracts-yus26p`, baseline commit named in the brief, clean tree at dispatch). Outbound HTTPS goes through a proxy; nothing in a unit needs the network. Foreground commands are capped at 10 minutes. `oxfmt` and `oxlint` are the formatter and linter (`npm run format:check`, `npm run lint:check`); `npm run check` is the typecheck; scoped tests run as `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core <test file>`. A whole-suite run (`npm test`) takes minutes and is an observation, never a criterion, for a unit.

**Gates the Orchestrator runs after the unit exits.** `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, `npm test`, in that order, plus the paired A/B and the answer-parity differential against the 0.0.15 dist. A unit reports its own scoped readings; the authoritative runs are the Orchestrator's.

**Standing conditions.** No file is expected dirty at dispatch. No gate is red at the baseline. No role commits, pushes, installs, or runs `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`. Write instruments only under `/home/user/contract/tmp/` (gitignored) and remove them before returning. Never read or print credentials or environment values.

**Measurement doctrine for this campaign.** Every performance claim rests on the Orchestrator's paired A/B (6 fresh processes, load order swapped, admission: median across replicates ≤ 0.95 and every replicate ≤ 0.98 on the target family) and on the answer-parity differential reading IDENTICAL. A unit never claims a magnitude; it reports what it measured under what conditions.

**Test doctrine.** Real implementations only: no mocks, spies, module replacement, or fake clocks. A pin is named for what it proves, never for the control that specified it. A behaviour change lands with the test that turns red without it: record the exact command and its failing count before the fix, then the same command green after it.

**Retention.** The Orchestrator copies the brief and the returned report to `/home/user/scaffold/.orkestrel/contract/`. The unit writes its report as its final message.

# Unit U2f — fix round for U2: TSDoc parity for `preview`, one term for the encoder, the margin note, and the `subject` containment repair

Successor of `u2-readvalue-preview-brief.md` (U2, report `u2-readvalue-preview-report.md`). What changed and why: the audit round (`u2-audit-verdict.md`) found the `preview` TSDoc's first paragraph still describing the indexed encoder as the only string path, the added paragraph naming the encoder as bare `stringify`, and a reproduced pre-existing containment gap in `readValue`; the timing pin was ruled admissible with one sentence to add beside its threshold.

## Role and engine

`builder` on Sonnet, native Claude subagent, clean context (fully specified unit). Perform the assignment directly and spawn nothing.

## Objective

Four exact edits in the U2 working tree: the `preview` TSDoc summary sentence carries the guide's qualifier; the added derivation paragraph writes `JSON.stringify` followed by a noun wherever it wrote bare `stringify`; the timing pin's threshold carries a comment recording its measured margin; `readValue` reads `options?.subject` exactly once, inside its eager `attempt`, so a `subject` accessor that alternates its answer can no longer throw a raw error from the message template, pinned red-first.

## Context

**Evidence.** The tree is dirty with U2's edits over checkpoint `e81ba64` (`git status --porcelain`: `guides/contract.md`, `src/core/helpers.ts`, `tests/src/core/helpers.test.ts`); that is the state you correct. Reproduction of the containment gap on this tree (`/home/user/scaffold/.orkestrel/contract/results/subject-alternating.out`): with `{ get subject() { reads += 1; return reads === 1 ? 'thing' : { toString() { throw new Error('hostile toString') } } } }` and a throwing callback, `readValue` throws `RAW Error: hostile toString` after two `subject` reads. The guide row for `readValue` (`guides/contract.md:215`) promises a `ContractError` for every failed read. Sites: `src/core/helpers.ts:802` (`subject: isString(options?.subject) ? options.subject : 'value'`), `:1794-1798` (the `preview` summary sentence), `:1804-1817` (the added derivation paragraph), and the timing pin `renders text far past the limit without encoding the text it never renders` in `tests/src/core/helpers.test.ts` (its threshold line reads `expect(rendering * 20).toBeLessThan(encoding)`; the unit measured the ratio at about 2600).

**Standing conditions.** Dirty tree at dispatch, as stated. Nothing else.

## Edits (exact)

1. `src/core/helpers.ts`, `preview` TSDoc, replace the sentence beginning `One bounded indexed encoder appends only complete escaped code-point tokens within {@link PREVIEW_LIMIT};` with: `Every other string and every symbol renders through one bounded indexed encoder that appends only complete escaped code-point tokens within {@link PREVIEW_LIMIT};` keeping the rest of that sentence (the clipping clause) as it is. Then, in the same `@remarks`, the string that takes the whole-string encode must be stated before that sentence: move the added paragraph's first sentence (`A string of at most {@link PREVIEW_LIMIT} code units takes its answer from one whole-string encode when that encode fits the same limit, …`) so the summary reads: the whole-string case first, then "Every other string and every symbol renders through …". Keep the derivation sentences after it.
2. In that derivation paragraph, replace each bare `` `stringify` `` with `` `JSON.stringify` `` followed by a noun: `what one `JSON.stringify` call returns`, `one `JSON.stringify` call over that same string measures `PREVIEW_LIMIT + 1``, `not what a `JSON.stringify` call returns`. Leave the code (`INTRINSICS.stringify`) untouched.
3. `tests/src/core/helpers.test.ts`, beside the timing threshold line, add one comment sentence: `// The threshold is 20 times; the gate measured about 2600 times on an idle host, so a red reading here is host noise or a lost gate, and the Orchestrator's idle re-run decides which.`
4. `src/core/helpers.ts`, `readValue`: inside the eager `attempt`, read `const subject = options?.subject` once beside the existing `const requested = options?.code`, and build the record's `subject` from that local: `subject: isString(subject) ? subject : 'value'`. Update the comment or TSDoc only if a sentence there states the read count. Add the pin in the `readValue` describe of `tests/src/core/helpers.test.ts`, named `refuses through its own error when a subject accessor changes its answer between reads`: options whose `subject` getter returns `'thing'` on the first read and an object whose `toString` throws on any later read, a callback that throws; assert the thrown value is a `ContractError` (narrow with `instanceof`), its message is `door: thing could not be read` (use the reader name `door`), and the getter was read exactly once. Record the scoped helpers suite with this test on the pre-fix tree (it must fail with the raw error) and after the fix (green).

## Scope

**Owned.** `src/core/helpers.ts` (the two TSDoc regions and the `readValue` `subject` read), `tests/src/core/helpers.test.ts`. **Off-limits.** Every other file, including `guides/contract.md` (already correct) and `src/core/types.ts`.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, push, install, or history-rewriting git command; undo an edit only by editing.

## Execution

Perform the assignment directly and spawn nothing.

## Output

Return, as your final message: the four edits as landed (quote the new TSDoc sentences and the new `subject` lines); the scoped helpers suite command with its pre-fix failing count and name, and its post-fix count; `git status --porcelain` and `git diff --stat`; any deviation. No process diary.

## Deviation contract

Stop and report on: a pre-existing test going red; a needed change outside the owned files; a formatter or lint failure you cannot converge on your owned files. Decide, record, and carry on from: the exact placement of the moved sentence and of the comment.

## Acceptance criteria

1. `grep -n 'One bounded indexed encoder appends only' src/core/helpers.ts` finds nothing; `grep -n -E '[^.]`stringify`' src/core/helpers.ts` finds no bare `stringify` token in the `preview` TSDoc.
2. `npm run format:check`, `npm run lint:check`, `npm run check` exit 0.
3. The scoped helpers suite exits 0 with the new pin present, recorded red before the fix and green after.
4. `npm run test:guides` exits 0.
5. `git status --porcelain` lists only `src/core/helpers.ts`, `tests/src/core/helpers.test.ts`, and `guides/contract.md` (the last unchanged by this unit).

## Review evidence

The Orchestrator re-runs the hostile records (with the alternating-subject vector added), parity, and the scoped suite, and dispatches `checker`.
