# Unit A3-fix-4-check — mechanical conformance of units A3-fix-3 and A3-fix-4

## Role and engine

`checker`, native Claude (Sonnet), read-only, clean context. Perform the assignment directly and
spawn nothing. Return the verdict as your final message.

## Objective

Rule on each claim from the diff and the files at the agent commit named under § Context, per
the `orkestrel-falsify` value set (`CONFIRMED`, `BROKEN`, `UNRESOLVED`, with `file:line`
evidence), then findings outside the claims, then one terminal `VERDICT:` line.

## Context

- Checkout: `C:/Users/mikes/WebstormProjects/agent`, read only, at commit A3FIX4_SHA, tree clean
  apart from `node_modules`.
- Briefs and reports: `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/a3-fix-3-brief.md`,
  `a3-fix-3-report.md`, `a3-fix-4-brief.md`, `a3-fix-4-report.md`; the findings they close:
  `a3-fix-2-audit-objective.md` claims 1, 7, 8, 9, 11 and `a3-fix-2-audit-mechanical.md` claim 11.
- Diff: `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/a3-fix-4-diff.txt`
  (`git diff 610a567 A3FIX4_SHA`, both units); gates `a3-fix-3-gates.log.txt` and
  `a3-fix-4-gates.log.txt`.
- Law: `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `.claude/rules/documentation.md`
  (a titled `@example` equals the guide fence under its heading), `writing.md`, `typescript.md`.

## Claims

1. No `ts` fence in `guides/agent.md` places a value import before an `import type` line; the one
   titled source twin (`createConversation`'s example) was reordered identically.
2. The engine clause's excerpt sentence no longer promises the decoded excerpt never exceeds the
   bound in bytes; it says the excerpt is decoded from at most `MAX_ERROR_BODY_LENGTH` source
   bytes, that the read may pull one whole source chunk, and that a multibyte character cut at
   the bound decodes to a replacement character that can push the excerpt's encoded length past
   the bound; the same rule is stated wherever `readText`'s or `AgentProvider`'s doc blocks make
   the promise, with each description paragraph still equal to its Summary cell.
3. The "Bounding any provider call" fence declares `messages`, in the guide and in any titled
   source twin.
4. `constants.ts` reads "the `authorize` callback returns" and the guide reads "The `serve`
   function is the entry" (or equivalent token-plus-noun forms).
5. The server half of the relay pattern imports from `@orkestrel/server`, constructs the server
   with the dispatcher and the state the installed declaration requires, awaits `start`, and
   shows `stop`; `createRelay`'s titled `@example` is byte-equal to the guide fence; the
   transcription's substitution comment and the guide's substitution sentence say the server
   start-up is not executed there; every presence guard in `tests/guides.test.ts` quotes lines
   that exist.
6. The two diffs touch only the files the two briefs own; no banned construct; no count of a
   growable set in the touched prose.
7. The gate logs show `format:check`, `lint:check`, `check`, `test:src:core` (753), `test:setup`
   (54), `test:guides` (43), and `build` exit 0 at both commits.

## Output

Per-claim verdicts with evidence, findings outside the claims, and one line `VERDICT: PASS` or
`VERDICT: FAIL <claim numbers>; outside the claims: <labels or none>`.
