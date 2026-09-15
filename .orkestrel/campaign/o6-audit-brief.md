# Unit O6-audit — falsification of unit O6 (the ollama guide made true)

## Role and engine

Two lanes on one brief, blind to each other: the objective lane is the `analyst` route on GPT 6
Astra (`gpt-6-astra`) through `codex exec --sandbox read-only` rooted at the isolated worktree
`C:/Users/mikes/WebstormProjects/ollama-audit` (its `node_modules` is a junction to the main
checkout's), the deciding lane because Claude Opus 5 wrote the subject; a `checker` (Sonnet) runs
the mechanical rows. Each lane performs the assignment directly and spawns nothing, and returns
per-claim verdicts (`CONFIRMED`, `BROKEN`, `UNRESOLVED`, with `file:line` evidence), findings
outside the claims, and one terminal `VERDICT:` line as its final message.

## Context

- Subject: the worktree at ollama commit `f994872` (O6 committed over the mirror refresh), tree clean.
  The Astra lane may run the read-only scripts and record readings, or name the vector when the
  sandbox refuses; the in-memory checks it ran in round O4-R1 are the baseline to re-run against
  the new fences.
- Diff: `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/o6-diff.txt`
  (`git diff 2178171 f994872`: the first mirror refresh `655ebec`, O6 itself `9231b3d`, and the
  second mirror refresh at the agent tip `d84b1a2`); the unit brief `o6-brief.md` (items M1–M14)
  and report `o6-report.md` (written against the first mirror; the second differs only by the
  agent guide's fix rounds 3 and 4, which reorder fence imports and add the server start-up); the round it repairs: `o4-audit-objective.md`,
  `o4-audit-subjective.md`, `design-reconciliation.md` § "Audit round O4-R1"; the host gates
  `o6-gates.log.txt`; the mirror receipt `o6-mirror-receipt.md`; all in that folder.
- Product truth: `src/core/**` at `f994872` and its tests; the installed `@orkestrel/agent` (the
  tarball repacked from agent commit `610a567`, `a4-2-receipt.md`); `b2-receipt.md`.
- Law: `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md` (§ Writing) and, under
  `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`, `documentation.md`, `writing.md`,
  `tests.md` § Cross-cutting proofs.
- The labels M1–M14 are control identifiers; a test is named for what it proves.

## Claims

1. **M1.** `guides/agent.md` in the worktree is byte-identical to the agent checkout's
   `guides/agent.md` at `610a567` (the receipt records the digest), carries `AgentProvider`,
   `AgentProviderInterface`, `ProviderOptions`, `ProviderError`, `RelayProvider`, and
   `createRelay`, and every pointer `guides/ollama.md` makes into it resolves to a heading that
   exists.
2. **M2.** The driven-stream fence, the README streaming sample, and their transcription no longer
   claim that joined content deltas equal the settled content; the transcription asserts the
   plain case and the reclassification case (`reasoning` then `</think>answer` folding to content
   `answer` and thinking `reasoning`) — re-run the in-memory check from round O4-R1 against the
   fence as written.
3. **M3, M6.** No growable set is counted in the guide's contract prose or `tests/guides.test.ts`
   names; no possessivized code token remains at the two cited sites.
4. **M4.** "Relaying through your own server" is a server half that runs — `createServer` from
   `@orkestrel/server` in front of the router dispatcher mounting `createRelay` over
   `createOllama({ model })`, started and stopped, its `url` the browser half's target — and a
   browser half with real `fetch`; the runtime adapter's obligations and `@orkestrel/server` are
   stated; both halves are transcribed and executed; `router.md` and `server.md` are linked.
5. **M7.** The browser clause states this package's own Chrome 148 reading with its date and cites
   no campaign or file the reader cannot open; the reading matches `b2-receipt.md`.
6. **M8–M13.** The `tests/setup.test.ts` and `tests/setupServer.test.ts` bullets describe those
   files; the timeout sentences are present tense; a sentence under the Surface table names what
   `ProviderOptions` contributes; the relay browser fence and the routing fence declare or mark
   `messages` and `abort`; clause 3's `tool_calls` condition names no role; clause 2's import list
   names only what `src/core` imports.
7. **M14.** The README streaming sample carries no executed-nowhere equality claim, or its line is
   guarded beside the guide's.
8. **No regression.** `test:guides`, `test:src:core`, and `test:setup` are green at `f994872` with
   every file collected; no fence names an identifier it neither declares nor imports; no `@src/*`
   alias in the guide.
9. **Law and scope.** The diff touches only the files the brief owns plus the mirror; new prose
   without banned terms, counts, or possessivized tokens; `you` and `must`/`can`/`might`.
10. **Usable alone.** From the guide alone a developer can build the provider in a browser against
    the daemon or through their own served relay: name any remaining step that needs the source.

## Output

Per-claim verdicts with evidence; findings outside the claims (labels F1, F2, …); attacked and
held; one terminal line `VERDICT: PASS` or
`VERDICT: FAIL <claim numbers>; outside the claims: <labels or none>`.
