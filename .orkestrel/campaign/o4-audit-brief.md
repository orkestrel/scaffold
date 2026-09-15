# Unit O4-audit — falsification of unit O4 (the `@orkestrel/ollama` guide, README, and parity)

## Role and engine

Two lanes on one brief, blind to each other: the objective lane is the `analyst` route on GPT 6
Astra (`gpt-6-astra`) through `codex exec --sandbox read-only` rooted at the isolated worktree
`C:/Users/mikes/WebstormProjects/ollama-audit` (its `node_modules` is a junction to the main
checkout's); the subjective lane is `reviewer` on Claude Opus 5, native, read-only, reading the
same worktree. Opus wrote the subject, so the Astra lane is the one on an engine that did not
write it. A `checker` (Sonnet) runs the mechanical rows. Each lane performs the assignment
directly and spawns nothing, and returns per-claim verdicts (`CONFIRMED`, `BROKEN`,
`UNRESOLVED`, with `file:line` evidence), findings outside the claims, and one terminal
`VERDICT:` line as its final message.

## Context

- Subject: the worktree at ollama commit `2178171` (O4 committed over `dcb64fe`), tree clean. The
  Astra lane may run the read-only scripts (`npm.cmd run test:guides`,
  `npm.cmd run test:src:core -- <file>`) and record the reading, or name the vector when the
  sandbox refuses.
- Diff: `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/o4-diff.txt`
  (`git diff dcb64fe 4f0d357`, O4's own commit) and `o5-diff.txt` (the Orchestrator's cleanup
  commit on top of the O3-fix merge: `@orkestrel/timeout` moved from `dependencies` to
  `devDependencies` with the lockfile synced, the two guide sentences that recorded the stale
  runtime declaration rewritten, and the conformance test header naming `tests/src/core`); the
  unit brief `o4-brief.md` and report `o4-report.md`; the host gate logs `o4-gates.log.txt` and
  `o5-gates.log.txt`; the pre-O4 parity reading in `o2-fix-gates.log.txt`; the export list
  `o4-exports.txt`; all in that folder. Audit the guide as it stands at `2178171`, the cleanup
  included, and rule on the cleanup's sentences under claim 3.
- The product truth the guide must match: `src/core/**` at `2178171` and the tests that pin it
  (`tests/src/core/OllamaProvider.test.ts`, `factories.test.ts`, `helpers.test.ts`,
  `integration.test.ts`, `tests/service/OllamaProvider.test.ts`, `tests/service/relay.test.ts`);
  the base's guide `C:/Users/mikes/WebstormProjects/agent/guides/agent.md` at agent `c052711`;
  the design record `design-reconciliation.md` ("Decisions made on the user's behalf", § O2-R1)
  and `plan.md` § "The ruled contract" → "Ollama after the rebuild"; the Chromium receipts
  `b1-receipt.md` (the relay's browser half on the base) and `b2-receipt.md` (`OllamaProvider`
  in Chrome 148 direct to the daemon and through the relay); the live run `o3-service.log.txt`.
- Law: `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md` (§ Writing) and, under
  `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`, `documentation.md`, `writing.md`,
  `tests.md` § Cross-cutting proofs, `typescript.md` (TSDoc voice).

## Claims

1. `npm run test:guides` exits 0 at `2178171`: every export in `o4-exports.txt` has a Surface row,
   every Summary equals its doc-block description paragraph, the `OllamaProvider` Methods table
   lists the members this package declares (`frame`, `body`, `read`, `finish`) — the parity
   engine compares a class's table against the package's own declarations, so `generate` and
   `stream` are stated in the Methods lead paragraph and clause 15 as the base's, with a link to
   the agent guide (the Orchestrator's ruling on O4's deviation) — and the README pitch equals the
   tagline.
2. No removed export (`OllamaResponse`, `OllamaHTTPError`, `isOllamaHTTPError`,
   `OllamaHTTPErrorOptions`, `MAX_ERROR_BODY_LENGTH`, `DEFAULT_PROVIDER_TIMEOUT`, `buildResult`,
   `joinThinking`, `parseBody`) is named anywhere in `guides/ollama.md` or `README.md`;
   `OLLAMA_CHAT_PATH` has a row; `process.stdout` and `process.stderr` appear in no fence.
3. The contract clauses state what the code does: the imports clause names the base, the
   contract types, and the error from `@orkestrel/agent`, `createNDJSONParser` from
   `@orkestrel/ndjson`, and the guards from `@orkestrel/contract`, and nothing the manifest no
   longer declares; the body clause says `stream: true` always and names `think`, `keep_alive`,
   `options`, `format` from a per-call `schema`, function tools, and the base's `ProviderError`
   with code `HTTP` for a non-OK status; one NDJSON path with `finish` recovering an unterminated
   final line; one clause for what the base owns, pointing at `agent.md`; the `format` clause; the
   tests clause naming the moved paths and the relay suites; the method bijection naming the six
   members; a browser clause naming the core scope's typecheck, the bound `fetch` receiver, and
   the Chromium receipt — attack every sentence a consumer would act on against the source and the
   tests, and name any the code contradicts.
4. The patterns: the two lead fences carry no `process.stdout`; "Routing through your own server
   (obfuscated tokens)" stays as the transparent wire proxy and says what it cannot do; "Relaying
   through your own server" composes `createRelayProvider({ url, parser: createNDJSONParser,
   headers })` with `createRelay({ provider: createOllama({ model }), authorize })` on an
   `@orkestrel/router` dispatcher; "Running in the browser" shows the same `createOllama` call in
   a browser module; the error-narrowing pattern uses `isProviderError` and `error.code` /
   `error.status` from `@orkestrel/agent`; every fence imports through published specifiers; each
   changed or new flagship fence is transcribed in `tests/guides.test.ts` with the values its
   comments claim asserted against a canned transport.
5. The five TSDoc lines in `src/core/helpers.ts` that described the deleted non-stream path now
   describe the NDJSON record alone, and every Summary cell that quotes one of those paragraphs
   still equals the source (audit O2-R1 finding F1).
6. `README.md`'s pitch equals the tagline; `guides/README.md`'s concept index and toolchain
   paragraph name the runtime dependencies as `package.json` declares them.
7. The touched prose carries no banned term from `writing.md` § Substitutions, no count of a
   growable set, addresses the developer as `you`, writes `must`/`can`/`might`, and writes every
   code token in backticks followed by a noun.
8. `npm run test:src:core` at `2178171` reports the pre-O4 count (4 files, 99 tests): no source
   behaviour changed; every TSDoc edit outside item 5 is named in the report.
9. The diff touches only the files O4 owns (`guides/ollama.md`, `guides/README.md`, `README.md`,
   `tests/guides.test.ts`, the five `helpers.ts` TSDoc lines, and TSDoc description paragraphs
   in `src/core/**` where parity required).
10. The guide is usable as the brief's objective states: a developer can build the provider in a
    browser against the daemon or through their own relay from the guide alone — name the step a
    reader could not take without opening the source.

## Output

Per-claim verdicts with evidence; findings outside the claims (labels F1, F2, …); attacked and
held; one terminal line `VERDICT: PASS` or
`VERDICT: FAIL <claim numbers>; outside the claims: <labels or none>`.
