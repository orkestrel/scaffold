# Unit voice-agent-fixup — close the subjective lane's residues

## Role and engine

`implementer` on Claude Opus 5, a native subagent. You perform the assignment directly and
spawn nothing.

## Objective

Every first sentence or boolean `@returns` in `@orkestrel/agent` that the subjective lane ruled
BROKEN reads the ruled text, and nothing else in the tree changes.

## Context

The voice unit (`voice-agent-brief.md`) left an uncommitted comment-only sweep in `/home/user/fleet/agent`.
The subjective lane's full output is `/home/user/scaffold/tmp/units/voice/voice-agent-audit-subjective.md` and the checker's is
`/home/user/scaffold/tmp/units/voice/voice-agent-audit-checker.md`; read both in full. Apply every change the subjective lane
marks BROKEN or REQUIRED, using its "What right looks like" (or "Right:") wording verbatim;
where it offers two wordings take the first; apply a "recommended" or "lesser" item only where
the rulings below name it; leave observations, referrals, and findings outside the claims
untouched unless a ruling names them. Keep every later clause and every other block
byte-identical, and rewrap a line that crosses `printWidth: 100` the way the file already wraps.

**Rulings by the Orchestrator** (these settle the lane's open questions and override its wording
where they differ):

- Claim 1: restore the subject noun the pronoun depends on in `Conversation.ts:21` (open with `Represents a conversation —` or the lane's wording); in `Channel.ts:4` and `types.ts:918` keep `channel` as the domain noun (the value's own name) and drop `stream`.
- Claim 2: conjugate the third verb at `types.ts:1731` (`emits`); `AgentContext.ts:31` takes the verb its interface twin uses (`Assembles …`); `types.ts:821` reads `Holds the summed {@link TokenUsage} …` (or the lane's wording). The `If `true`, …` openers at `types.ts:1080`, `:1443`, `:1465` STAND: the rule's boolean-parameter form governs a boolean field (ruled for the fleet). The checker's claim 2 (a new `false` token inside that form) is permitted: the form itself introduces it. No change for either.

**Standing rulings of the wave.** A domain term that is the value's own name stays; the rule's
boolean-parameter form governs a boolean field; a boolean `@returns` and a boolean-summary opener
drop their backticked `true`/`false` tokens by design; a rewrapped later sentence is
word-identical and satisfies the byte-identical criterion.

**Law.** `.claude/rules/typescript.md` § Comments and API documentation — the vendored copy at
`node_modules/@orkestrel/scaffold/dist/host/claude/rules/typescript.md` where the checkout has
no `.claude/rules/`.

**Host.** Linux, bash. Repository `/home/user/fleet/agent`, uncommitted voice sweep in place, `node_modules`
installed. Do not run `npm install`. Other units write in other checkouts at the same time;
keep every instrument you build under a directory of your own beneath the session scratchpad
(`/tmp/claude-0/-home-user-scaffold/249f2596-6386-5f66-868c-31383bbd6eeb/scratchpad/voice-agent-fixup/`),
never at the scratchpad root.

## Scope

**Owned.** TSDoc text under `src/**` of `/home/user/fleet/agent` at the sentences the lane names. **Off-limits.**
Every non-comment token; every other file and checkout.

**Tools and limits.** Read, Grep, Glob, Edit, Bash. No commit, stage, push, install, or discarding
`git` command.

## Execution

Apply the edits, then run `npm run format:check && npm run lint:check && npm run check` (the
Orchestrator's landing chain runs build and test). Then refresh the evidence:

```text
git diff > /home/user/scaffold/tmp/units/voice/voice-agent.diff
git status --short > /home/user/scaffold/tmp/units/voice/voice-agent.status
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
