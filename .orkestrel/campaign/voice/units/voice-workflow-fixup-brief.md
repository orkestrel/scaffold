# Unit voice-workflow-fixup — close the subjective lane's residues

## Role and engine

`implementer` on Claude Opus 5, a native subagent. You perform the assignment directly and
spawn nothing.

## Objective

Every first sentence or boolean `@returns` in `@orkestrel/workflow` that the subjective lane ruled
BROKEN reads the ruled text, and nothing else in the tree changes.

## Context

The voice unit (`voice-workflow-brief.md`) left an uncommitted comment-only sweep in `/home/user/fleet/workflow`.
The subjective lane's full output is `/home/user/scaffold/tmp/units/voice/voice-workflow-audit-subjective.md` and the checker's is
`/home/user/scaffold/tmp/units/voice/voice-workflow-audit-checker.md`; read both in full. Apply every change the subjective lane
marks BROKEN or REQUIRED, using its "What right looks like" (or "Right:") wording verbatim;
where it offers two wordings take the first; apply a "recommended" or "lesser" item only where
the rulings below name it; leave observations, referrals, and findings outside the claims
untouched unless a ruling names them. Keep every later clause and every other block
byte-identical, and rewrap a line that crosses `printWidth: 100` the way the file already wraps.

**Rulings by the Orchestrator** (these settle the lane's open questions and override its wording
where they differ):

- Claim 2 (a): `TaskSnapshot.retries` and `.timeout` (`types.ts:481`, `:483`) open `Records …`; `TaskInterface.retries` and `.timeout` (`:913`, `:918`) open `Holds …`; every later clause byte-identical. Every further claim-2 item: the lane's wording.
- The three summary-less blocks the writer left (`TaskDefinition.retries`, `TaskDefinition.timeout`, `PhaseDefinition.bail` in `src/core/types.ts`) each gain a first sentence before their `@remarks` (blank comment line between), the `@remarks` byte-identical: a definition member is an input, so it opens `Sets …` (`Sets the extra attempts after the first on failure.`, `Sets the per-attempt deadline in milliseconds.`, `Sets the phase's failure policy.`), each within the print width.

**Standing rulings of the wave.** A domain term that is the value's own name stays; the rule's
boolean-parameter form governs a boolean field; a boolean `@returns` and a boolean-summary opener
drop their backticked `true`/`false` tokens by design; a rewrapped later sentence is
word-identical and satisfies the byte-identical criterion.

**Law.** `.claude/rules/typescript.md` § Comments and API documentation — the vendored copy at
`node_modules/@orkestrel/scaffold/dist/host/claude/rules/typescript.md` where the checkout has
no `.claude/rules/`.

**Host.** Linux, bash. Repository `/home/user/fleet/workflow`, uncommitted voice sweep in place, `node_modules`
installed. Do not run `npm install`. Other units write in other checkouts at the same time;
keep every instrument you build under a directory of your own beneath the session scratchpad
(`/tmp/claude-0/-home-user-scaffold/249f2596-6386-5f66-868c-31383bbd6eeb/scratchpad/voice-workflow-fixup/`),
never at the scratchpad root.

## Scope

**Owned.** TSDoc text under `src/**` of `/home/user/fleet/workflow` at the sentences the lane names. **Off-limits.**
Every non-comment token; every other file and checkout.

**Tools and limits.** Read, Grep, Glob, Edit, Bash. No commit, stage, push, install, or discarding
`git` command.

## Execution

Apply the edits, then run `npm run format:check && npm run lint:check && npm run check` (the
Orchestrator's landing chain runs build and test). Then refresh the evidence:

```text
git diff > /home/user/scaffold/tmp/units/voice/voice-workflow.diff
git status --short > /home/user/scaffold/tmp/units/voice/voice-workflow.status
```

## Output

Return, as data: each line changed (file, line, old → new); each lane item you left unchanged
under a ruling, named; each command with its exit code; `git diff --stat`.

## Deviation contract

Stop and report when a named line does not carry the text the lane quotes, or when applying a
ruling would change a code token.

## Acceptance criteria

1. Each ruled sentence is present verbatim at its file (`grep -n -F`).
2. `git diff --stat` lists only files under `src/`.
3. The static gates exit 0.
