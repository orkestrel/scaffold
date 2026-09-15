# Unit A3-fix-2-audit — falsification of units A3-fix-2 and A2-fix-r3 (the agent guide made true)

## Role and engine

Two lanes on one brief, blind to each other: the objective lane is the `analyst` route on GPT 6
Astra (`gpt-6-astra`) through `codex exec --sandbox read-only` rooted at the isolated worktree
`C:/Users/mikes/WebstormProjects/agent-audit`, the deciding lane because Claude Opus 5 wrote the
subject; a `checker` (Sonnet) runs the mechanical rows. Each lane performs the assignment
directly and spawns nothing, and returns per-claim verdicts (`CONFIRMED`, `BROKEN`,
`UNRESOLVED`, with `file:line` evidence), findings outside the claims, and one terminal
`VERDICT:` line as its final message.

## Context

- Subject: the worktree at agent commit `610a567` (A3-fix-2 and then A2-fix-r3 committed over
  `611e24e`; the diff covers both), tree clean;
  the worktree's `node_modules` is a junction to the main checkout's (the packed
  `@orkestrel/guide` from `9863e77` installed). The Astra lane may run the read-only scripts
  (`npm.cmd run test:guides`, `npm.cmd run test:src:core -- <file>`, `npm.cmd run test:probe`)
  and record the reading, or name the vector when the sandbox refuses; the source probes it ran in
  round A3-R1 are the baseline to re-run against the new sentences.
- Diff: `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/a3-fix-2-diff.txt`
  (`git diff 611e24e `610a567``); the unit brief `a3-fix-2-brief.md` (items D1–D17) and report
  `a3-fix-2-report.md`; the round it repairs: `a3-audit-objective.md`, `a3-audit-subjective.md`,
  `design-reconciliation.md` § "Audit round A3-R1"; the host gates `a3-fix-2-gates.log.txt`; all
  in that folder.
- Product truth: `src/core/**` at `610a567` and its tests; `b1-receipt.md`.
- Law: `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md` (§ Writing) and, under
  `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`, `documentation.md`, `writing.md`,
  `tests.md` § Cross-cutting proofs, `typescript.md`.
- The labels D1–D17 are control identifiers; a test is named for what it proves.

## Claims

1. **D1–D3.** The bounded-read sentence, the identity sentence, and the `502` sentence in
   `guides/agent.md` state what `readText`, `AgentProvider`'s constructor, and `createRelay` do:
   re-run the round's three source probes (an 8192-byte chunk against the 2048 bound yields a
   2048-byte excerpt; the id survives repeated calls and differs across instances; a synchronous
   `stream()` throw yields `502` with one upstream entry) and read each sentence against them.
2. **D4, D12, D13.** `OVERSIZED_RELAY_STATUS`'s description says "at or above"; each of the named
   constants' description paragraphs states its value; the four status paragraphs use the "Names
   the status …" form; the Summary cells equal them and `test:guides` is green.
3. **D5–D7, D9.** The substitution sentence names the parser stand-in and the direct handler
   drive, without "equivalent", and says the published parser skips a malformed line while the
   stand-in throws; the relay transcription asserts method `POST` and the fence's route pathname
   from the `Request` its `fetch` receives; the engine-configuration fence is transcribed and
   executed; the relay pattern is two fences (server, browser) under two sub-headings, the server
   half naming the runtime adapter and `@orkestrel/server`, parity kept between each titled
   source example and its guide fence.
4. **D8, D17.** The token-noun slips at the cited README and index lines are fixed; "One guide" no
   longer counts a growable set; the concept cell backticks its class names.
5. **D10.** § The HTTP provider engine names `TRecord`, its meaning, and its default; the subclass
   fence's `AgentProvider<string>` is explained beside it.
6. **D11, D14–D16.** The sentence saying `AgentProvider` carries no Surface row is gone; the
   engine fence declares `token`, `messages`, and `abort`; the receipt sentence names Chrome 148
   and what was driven, and cites no campaign; the wire-contract fence does what its introduction
   promises and discards no generator.
7. **No regression.** `test:guides` and `test:src:core` are green at `610a567` at their prior counts;
   every fence a consumer would copy names only identifiers it declares or imports; no `@src/*`
   alias in the guide.
8. **Law and scope.** The diff touches only the files the brief owns; new prose carries no banned
   term, no count of a growable set, addresses the developer as `you`, and writes code tokens in
   backticks followed by a noun (a type name as a sentence subject follows the guide's existing
   convention and is not a finding).
9. **Usable alone.** From the guide alone a developer can choose the record type for a new wire
   and stand up the relay's two halves: name any remaining step that needs the source.
10. **A2-fix-r3 P1.** The serializer rule in `RelayProvider`'s class remarks and in the guide's
    relay paragraph and wire-shapes clause distinguishes a serializer reachable only through a
    `get` trap or a prototype (never consulted; the snapshot reads through property descriptors)
    from an own function-valued property such as a `toJSON` method (a value outside JSON, refused
    before fetching with the clone's failure as the `cause`); re-run the round's executed checks:
    the proxy case sends `{x:1}` without reading `toJSON`; the own-method case throws
    `ProviderError` with a `ContractError` cause.
11. **A2-fix-r3 P2–P4.** `RELAY_RESULT_FRAME` lives in `tests/setup.ts` with a doc block and is
    imported by `RelayProvider.test.ts`; every fence's `import type` line precedes its value
    imports, the source fence and its guide mirror byte-equal; no "the two" count phrase remains
    in the relay `@remarks`.

## Output

Per-claim verdicts with evidence; findings outside the claims (labels F1, F2, …); attacked and
held; one terminal line `VERDICT: PASS` or
`VERDICT: FAIL <claim numbers>; outside the claims: <labels or none>`.
