# Unit A2-fix-audit — falsification of unit A2-fix (relay repairs F10–F19)

## Role and engine

`reviewer` on Claude Opus 5, native, read-only, clean context: the deciding lane, because GPT 6
Astra wrote the subject and the Orchestrator shares its engine with this lane. Perform the
assignment directly and spawn nothing. You cannot write or run: rule from the diff, the report,
the tree, and the evidence the Orchestrator staged.

## Objective

Rule on every numbered claim with `CONFIRMED`, `BROKEN`, or `UNRESOLVED` and evidence
(`file:line`), per the `orkestrel-falsify` value set; name findings outside the claims; end with
one `VERDICT:` line. Attack each claim: the question is what would make it false, and whether the
diff and its tests close that door.

## Context

- Subject: the agent checkout's isolated worktree `C:/Users/mikes/WebstormProjects/agent-audit`
  at commit `5d288d7` (A2-fix committed over `0fa4090`), tree clean.
- Diff: `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/a2-fix-diff.txt`
  (`git diff 0fa4090 `5d288d7``). Status at `5d288d7`: `git status --porcelain` printed nothing.
- Unit brief and successor: `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/a2-fix-brief.md`
  and `a2-fix-brief-2.md` (the findings F10–F19 and their carriers). Unit report:
  `a2-fix-report-2.md` in the same folder. Host gates and mutation-probe readings the
  Orchestrator took: `a2-fix-gates.log.txt` and `a2-fix-probes.md` in the same folder.
- The round this repairs: `a2-audit-subjective.md` (the A2-R1 verdict), `a2-probe-vectors.md`,
  `a2-probe-relay-body-error.md`, and `design-reconciliation.md` § "Audit round A2-R1", all in
  the same folder. The ruled contract: `plan.md` § "The ruled contract" there.
- Law: `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md` and, under
  `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`, `typescript.md`, `architecture.md`,
  `patterns.md`, `tests.md`, `names.md`, `writing.md`, `documentation.md`. Skill: none beyond the
  `orkestrel-falsify` value set named earlier.
- A test is named for what it proves, never for the control that specified it; the finding labels
  F10–F19 are control identifiers and appear in no test name.

## Claims

1. **F10.** `readText` performs no read after its byte budget is exhausted; `complete` is `true`
   only when the reader observed `done` within the budget and `false` when the budget ran out or
   the signal aborted; an exactly-`limit` body that then closes reports `false`, `limit - 1`
   reports `true`, `limit + 1` reports `false` with one overshoot chunk; and no lookahead remains
   in `helpers.ts` or in the `TextRead` TSDoc.
2. **F10 at the relay.** `createRelay` answers `413` to a body of exactly `DEFAULT_RELAY_LIMIT`
   bytes and accepts `DEFAULT_RELAY_LIMIT - 1` bytes of valid JSON, and `RelayOptions.limit`'s
   TSDoc states that rule.
3. **F10 at the base.** The base's non-OK path with a body that lands exactly on
   `MAX_ERROR_BODY_LENGTH` and then stalls rejects promptly with `ProviderError` `HTTP` and the
   bounded excerpt, the byte-count assertion in `AgentProvider.test.ts` reads
   `MAX_ERROR_BODY_LENGTH` again, and the stalled case is pinned in that file with a budget that
   would fail if the read waited for the deadline.
4. **F11.** `RelayProvider.body` returns an owned JSON snapshot of the validated projection, so
   the base serializes what the guard saw; a `get` trap supplying `toJSON` on `parameters` or on
   `schema` yields `ProviderError` with code `PROTOCOL` before any fetch; a plain valid request
   round-trips unchanged; and the snapshot mechanism is the installed contract's primitive, named
   in the report, not a hand-written deep clone. The unit recorded mid-run that `cloneJSONValue`
   strips a synthetic `toJSON` rather than rejecting it, and chose to refuse a callable `toJSON`
   on `parameters` and `schema` before cloning: rule whether that refusal is the record's ruled
   posture at a hostile boundary (refuse rather than coerce) or a second mechanism the snapshot
   makes unnecessary, and whether it is placed and tested as a mechanism of its own.
5. **F12.** `createRelay` answers `INVALID_RELAY_STATUS` (`400`) when the request body's read
   throws, with no provider call; answers `UPSTREAM_RELAY_STATUS` (`502`) when the provider's
   `stream()` throws synchronously, with an empty body and no upstream text anywhere in the
   response; leaves no abort listener registered on either path; and an inbound abort during the
   read still answers `413`.
6. **F13.** When the inbound request signal aborts while a frame sits unread and no consumer acts,
   `RelayStream` returns the provider's iterator and the generator's `finally` runs within the
   test's budget, the stream is marked settled, and the listener is released; the consumer-cancel
   path is unchanged and still pinned.
7. **F14.** `integration.test.ts` drives `401`, `413`, and `400` through
   `RelayProvider → Request → handler → Response`, each asserting `ProviderError` with code `HTTP`,
   the matching status, the browser-visible message, and that the scripted provider recorded no
   entry into `stream()` itself.
8. **F15 and F19.** The `@example` fences on `RelayProvider`, `createRelayProvider`, and
   `createRelay` are compositions a reader can copy: published imports only (`@orkestrel/agent`,
   `@orkestrel/router`, and `createNDJSONParser` from `@orkestrel/ndjson` as the consumer's own
   import), the browser `headers` hook attaching a custom bearer, the server's `authorize` reading
   it, no undefined identifier; every code token in the new TSDoc is backticked and followed by a
   noun.
9. **F16.** A non-OK response whose excerpt is empty rejects with the message
   `provider error: <status>` and no trailing separator; a non-empty excerpt keeps
   `provider error: <status> - <excerpt>`; the `401` empty-body case is pinned and the existing
   `503` cases hold.
10. **F17.** `RelayOptions.authorize`'s TSDoc states that the hook must not consume the body and
    that the mechanism performs no origin or method check (so an ambient credential needs origin
    and CSRF middleware in front); `createRelay`'s `@remarks` names `401`, `400`, `413`, and
    `502` with when each is answered; `RelayProvider`'s remarks state that a refusal reaches the
    browser as `ProviderError` with code `HTTP` and the status.
11. **F18.** `RelayFrame`'s error arm is `{ readonly channel: 'error'; readonly message: string }`;
    `relayFrameShape`, `RelayStream`'s error frame, and `RelayProvider.read` follow; the compiled
    contract refuses a frame carrying `code`; no `code: 'PROVIDER'` literal remains in `src/` or
    `tests/` as a frame member.
12. **Binding.** Each test the report lists as red-then-green pins the repaired behaviour and not
    a weaker one: name any listed test that would pass against the pre-fix code at `0fa4090`
    (reason from the diff; the Orchestrator's mutation readings in `a2-fix-probes.md` are
    corroboration, not your source).
13. **Law and scope.** The diff touches only the files the two briefs own; no `any`, assertion,
    non-null assertion, suppression, access modifier, parameter property, or nested function
    declaration; every new declaration sits in its centralized file; entity members are single
    words; new prose carries no banned term and no count of a growable set.

## Output

Per-claim verdicts with evidence; findings outside the claims (label them F1, F2, …); attacked and
held (what you tried that did not break); one terminal line
`VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <labels or none>`, as your
final message.
