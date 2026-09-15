# Unit A2-fix-r2-audit — falsification of unit A2-fix-r2 (the second relay fix round)

## Role and engine

Two lanes on one brief, blind to each other: the objective lane is the `analyst` route on GPT 6
Astra (`gpt-6-astra`) through `codex exec --sandbox read-only` rooted at the isolated worktree
`C:/Users/mikes/WebstormProjects/agent-audit`, the deciding lane because Claude Opus 5 wrote the
subject; a `checker` (Sonnet) runs the mechanical rows. Each lane performs the assignment
directly and spawns nothing, and returns per-claim verdicts (`CONFIRMED`, `BROKEN`,
`UNRESOLVED`, with `file:line` evidence), findings outside the claims, and one terminal
`VERDICT:` line as its final message.

## Context

- Subject: the worktree at agent commit `611e24e` (A2-fix-r2 committed over `c052711`), tree clean.
  The worktree's `node_modules` is a junction to the main checkout's, which holds the packed
  `@orkestrel/guide` from its commit `9863e77`. The Astra lane may run the read-only scripts
  (`npm.cmd run test:src:core -- <file>`, `npm.cmd run test:guides`) and record readings, or
  name the vector when the sandbox refuses.
- Diff: `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/a2-fix-r2-diff.txt`
  (`git diff c052711 `611e24e``); the unit brief `a2-fix-r2-brief.md` (items R1–R9) and report
  `a2-fix-r2-report.md`; the round it repairs, `a2-fix-audit-subjective.md` and
  `design-reconciliation.md` § "Audit round A2-fix-R1"; the host gates `a2-fix-r2-gates.log.txt`
  and the Orchestrator's mutation reading `a2-fix-r2-probes.md`; all in that folder.
- Law: `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md` and, under
  `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`, `patterns.md` § Foreign contracts,
  `names.md`, `typescript.md`, `tests.md`, `documentation.md`, `writing.md`.
- The labels R1–R9 are control identifiers; a test is named for what it proves.

## Claims

1. **R1.** `RelayProvider.body` reads no `toJSON` and refuses no serializer; the owned
   `cloneJSONValue` snapshot of the validated projection is what the base serializes, for
   `arguments`, `parameters`, and `schema` alike; three tests prove that a `get` trap supplying
   `toJSON` on each of those members cannot reach the wire (the transport's received body equals
   the JSON of the guard's view and the call does not throw); the class remarks and `body`'s
   `@throws` say a custom serializer is never consulted and what the refusal covers.
2. **R2.** `body`'s refusal carries the thrown value as `cause`, pinned by a test whose projection
   the contract rejects.
3. **R3.** `RelayStream`'s constructor guards the pre-aborted inbound signal once; the existing
   pre-aborted case still holds.
4. **R4.** No `#abort` field remains; the inbound-cancellation field, `#cancel`, `#abortProvider`,
   and `#release` carry one term per concept and single-word names.
5. **R5.** The full browser-and-server composition appears once, on `createRelay`'s `@example`,
   equal to the guide fence under "Relaying a browser provider through your own server";
   `createRelayProvider` and `RelayProvider` carry short fences (construction and one call) that
   link to it with `{@link createRelay}`; the fences' `connectRelay` declarations annotate their
   return type; `test:guides` is green.
6. **R6.** The exact-limit relay refusal test asserts the encoded body's byte length equals
   `DEFAULT_RELAY_LIMIT`.
7. **R7.** The stalled exact-bound 503 case arms a 200 ms deadline and still binds: the transport
   signal's `aborted` reads false and the rejection is `ProviderError` with code `HTTP`.
8. **R8 and R9.** The error arm of `relayFrameShape` sits on one line; `RelayStream`'s remarks
   state that after an inbound abort the body is neither closed nor errored, that a server
   runtime cancels it on disconnect, and that a consumer that aborts the inbound signal must
   cancel the body.
9. **Binding.** The report's red-then-green rows (R1, R2, R6, R7) each name a test that fails
   against `c052711` and passes at `611e24e`; name any listed test that would pass against
   `c052711`.
10. **Law and scope.** The diff touches only the files the brief owns; no `any`, assertion,
    non-null assertion, suppression, access modifier, parameter property, or nested function
    declaration; declarations in their centralized files; entity members single words; new prose
    without banned terms or counts; TSDoc third person present.
11. **No regression.** `test:src:core`, `test:setup`, and `test:guides` are green at `611e24e` with
    every file collected, and no test outside the brief's ownership changed.

## Output

Per-claim verdicts with evidence; findings outside the claims (labels F1, F2, …); attacked and
held; one terminal line `VERDICT: PASS` or
`VERDICT: FAIL <claim numbers>; outside the claims: <labels or none>`.
