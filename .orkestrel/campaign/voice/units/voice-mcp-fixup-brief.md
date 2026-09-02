# Unit voice-mcp-fixup — close the subjective lane's residues

## Role and engine

`implementer` on Claude Opus 5, a native subagent. You perform the assignment directly and
spawn nothing.

## Objective

Every first sentence or boolean `@returns` in `@orkestrel/mcp` that the subjective lane ruled
BROKEN reads the ruled text, and nothing else in the tree changes.

## Context

The voice unit (`voice-mcp-brief.md`) left an uncommitted comment-only sweep in `/home/user/fleet/mcp`.
The subjective lane's full output is `/home/user/scaffold/tmp/units/voice/voice-mcp-audit-subjective.md` and the checker's is
`/home/user/scaffold/tmp/units/voice/voice-mcp-audit-checker.md`; read both in full. Apply every change the subjective lane
marks BROKEN or REQUIRED, using its "What right looks like" (or "Right:") wording verbatim;
where it offers two wordings take the first; apply a "recommended" or "lesser" item only where
the rulings below name it; leave observations, referrals, and findings outside the claims
untouched unless a ruling names them. Keep every later clause and every other block
byte-identical, and rewrap a line that crosses `printWidth: 100` the way the file already wraps.

**Rulings by the Orchestrator** (these settle the lane's open questions and override its wording
where they differ):

- Claim 1a: restore `modern` (`… exposed over the modern resource methods.`). 1b: restore `all` (`… all continuation and expiry policy is consumer-supplied.`). Every further claim-1 and claim-2 item: the lane's "What right looks like" wording; where the lane offers two, take the first.
- The checker's claim 2 (`Flags a failed tool …` dropping the backticked `true` on `isError`) is permitted as a boolean-summary opener; no change. The five over-width `@returns` lines stay as the writer left them.

**Standing rulings of the wave.** A domain term that is the value's own name stays; the rule's
boolean-parameter form governs a boolean field; a boolean `@returns` and a boolean-summary opener
drop their backticked `true`/`false` tokens by design; a rewrapped later sentence is
word-identical and satisfies the byte-identical criterion.

**Law.** `.claude/rules/typescript.md` § Comments and API documentation — the vendored copy at
`node_modules/@orkestrel/scaffold/dist/host/claude/rules/typescript.md` where the checkout has
no `.claude/rules/`.

**Host.** Linux, bash. Repository `/home/user/fleet/mcp`, uncommitted voice sweep in place, `node_modules`
installed. Do not run `npm install`. Other units write in other checkouts at the same time;
keep every instrument you build under a directory of your own beneath the session scratchpad
(`/tmp/claude-0/-home-user-scaffold/249f2596-6386-5f66-868c-31383bbd6eeb/scratchpad/voice-mcp-fixup/`),
never at the scratchpad root.

## Scope

**Owned.** TSDoc text under `src/**` of `/home/user/fleet/mcp` at the sentences the lane names. **Off-limits.**
Every non-comment token; every other file and checkout.

**Tools and limits.** Read, Grep, Glob, Edit, Bash. No commit, stage, push, install, or discarding
`git` command.

## Execution

Apply the edits, then run `npm run format:check && npm run lint:check && npm run check` (the
Orchestrator's landing chain runs build and test). Then refresh the evidence:

```text
git diff > /home/user/scaffold/tmp/units/voice/voice-mcp.diff
git status --short > /home/user/scaffold/tmp/units/voice/voice-mcp.status
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
