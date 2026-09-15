# Unit A3-audit — falsification of unit A3 (the `@orkestrel/agent` guide, README, and parity)

## Role and engine

Two lanes on one brief, blind to each other: the objective lane is the `analyst` route on GPT 6
Astra (`gpt-6-astra`) through `codex exec --sandbox read-only` rooted at the isolated worktree
`C:/Users/mikes/WebstormProjects/agent-audit`; the subjective lane is `reviewer` on Claude Opus 5,
native, read-only, reading the same worktree. Opus wrote the subject, so the Astra lane is the one
on an engine that did not write it. A `checker` (Sonnet) runs the mechanical rows. Each lane
performs the assignment directly and spawns nothing, and returns per-claim verdicts (`CONFIRMED`,
`BROKEN`, `UNRESOLVED`, with `file:line` evidence), findings outside the claims, and one terminal
`VERDICT:` line as its final message.

## Context

- Subject: the worktree at agent commit `c052711` (A3 committed over `5d288d7`), tree clean. The
  worktree's `node_modules` is a junction to the main checkout's; the Astra lane may run the
  read-only scripts (`npm.cmd run test:guides`, `npm.cmd run test:src:core -- <file>`) and record
  the reading, or name the vector when the sandbox refuses.
- Diff: `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/a3-diff.txt`
  (`git diff 5d288d7 `c052711``); the unit brief `a3-brief.md` and report `a3-report.md`; the host
  gate log `a3-gates.log.txt`; the pre-A3 parity reading `a3-guides-before.log.txt`; the export
  list `a3-exports.txt`; all in that folder.
- The product truth the guide must match: `src/core/**` at `c052711` and the tests that pin it
  (`tests/src/core/AgentProvider.test.ts`, `providers/RelayProvider.test.ts`, `RelayStream.test.ts`,
  `factories.test.ts`, `helpers.test.ts`, `integration.test.ts`, `contracts.test.ts`,
  `shapers.test.ts`); the design record `design-reconciliation.md` and `plan.md` § "The ruled
  contract"; the Chromium receipt `b1-receipt.md`.
- Law: `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md` (§ Writing) and, under
  `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`, `documentation.md` (parity, Summary
  cells, Methods tables, executed fences, "falsify a prose claim"), `writing.md` (voice,
  substitutions, no counts, code tokens), `tests.md` § Cross-cutting proofs, `typescript.md`
  (TSDoc voice).

## Claims

1. `npm run test:guides` exits 0 at `c052711`: every export in `a3-exports.txt` has a Surface row, every
   Summary equals its doc-block description paragraph, every Methods table matches its
   interface's call-signature members, and the README pitch equals the tagline.
2. The Methods tables for `AgentProviderInterface` (`generate`, `stream`, `frame`, `body`, `read`,
   `finish`) and `ProviderParserInterface` (`parse`, `clear`) exist, and every declaration the
   pre-A3 parity log named as lacking a table has one.
3. Contract clause 2 no longer states that the module defines only the contract; the clauses for
   the base and its seams (what the base owns, what a subclass fills, `split` and `strict`, the
   local cancel winning and a remote abort passing through, the bounded error read and its
   one-chunk overshoot, reader-owned cancellation), for the wire shapes and compiled contracts
   (JSON projections strictly narrower than the domain types, `caller` never crossing, the owned
   snapshot as the wire body), for the relay protocol (`413` for a body at or above the limit,
   `401`, `400`, `502`, the fixed error message, the error frame as `{ channel, message }`, the
   `authorize` obligations, abort in each direction, a refusal reaching the browser as
   `ProviderError` `HTTP`), and for `ProviderError`'s codes and the `provider error: <status>`
   message form, each state what the code at `c052711` does — attack every sentence a consumer would
   act on against the source and the tests, and name any that the code contradicts.
4. The patterns "Writing a provider for a new wire" and "Relaying a browser provider through your
   own server" exist; every fence imports through `@orkestrel/agent` (and `@orkestrel/ndjson`,
   `@orkestrel/router`), never an `@src/*` alias; each fence is transcribed and executed in
   `tests/guides.test.ts` asserting the values its comments claim, with the test-infrastructure
   parser standing in for the `@orkestrel/ndjson` import and the guide stating that substitution.
5. The browser limit is stated as proven by the core scope's typecheck, the bound `fetch`
   receiver, and the Chromium receipt, not by a browser test project.
6. `README.md`'s pitch equals the guide's tagline; `guides/README.md`'s concept index names the
   new classes beside `Agent`.
7. The touched prose carries no banned term from `writing.md` § Substitutions, no count of a
   growable set, addresses the developer as `you`, writes `must`/`can`/`might`, and writes every
   code token in backticks followed by a noun.
8. `npm run test:src:core` at `c052711` reports the pre-A3 count (23 files, 751 tests): no source
   behaviour changed; every TSDoc description edit is named in the report.
9. The diff touches only the files A3 owns (`guides/agent.md`, `guides/README.md`, `README.md`,
   `tests/guides.test.ts`, TSDoc description paragraphs and `@example` titles in `src/core/**`
   where parity required, `tests/setup.ts` additions for a parser stand-in).
10. The guide is usable as the brief's objective states: a developer can write a provider for a
    new wire and relay a browser provider through their own server from the guide alone — name
    the step a reader could not take without opening the source.

## Output

Per-claim verdicts with evidence; findings outside the claims (labels F1, F2, …); attacked and
held; one terminal line `VERDICT: PASS` or
`VERDICT: FAIL <claim numbers>; outside the claims: <labels or none>`.
