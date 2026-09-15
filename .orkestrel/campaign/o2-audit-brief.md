# Unit O2-audit — falsification of unit O2 (`OllamaProvider` rebuilt on `AgentProvider`)

## Role and engine

`reviewer` on Claude Opus 5, native, read-only, clean context: the deciding lane, because GPT 6
Astra wrote the subject and the Orchestrator shares its engine with this lane. A `checker`
(Sonnet) runs the mechanical rows in parallel on the same brief. Perform the assignment directly
and spawn nothing. You cannot write or run: rule from the diff, the report, the tree, and the
records the brief names.

## Objective

Rule on every numbered claim with `CONFIRMED`, `BROKEN`, or `UNRESOLVED` and evidence
(`file:line`), per the `orkestrel-falsify` value set; name findings outside the claims; end with
one `VERDICT:` line. Attack each claim: what would make it false, and whether the diff and its
tests close that door.

## Context

- Subject: the ollama checkout's isolated worktree `C:/Users/mikes/WebstormProjects/ollama-audit`
  at commit `4ce25b3` (O2 committed over `e92a327`), tree clean. The worktree carries no
  `node_modules`; read the installed base's declaration from the main checkout at
  `C:/Users/mikes/WebstormProjects/ollama/node_modules/@orkestrel/agent/dist/src/core/index.d.ts`
  (the tarball packed from agent `5d288d7`; read only) and the base's source at
  `C:/Users/mikes/WebstormProjects/agent/src/core/AgentProvider.ts` at that commit.
- Diff: `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/o2-diff.txt`
  (`git diff e92a327 `4ce25b3``). Status at `4ce25b3`: `git status --porcelain` printed nothing.
- Unit brief and report: `o2-brief.md` and `o2-report.md` in the same folder; the wire recordings
  `o2-wire-before.json` and `o2-wire-after.json`; host gates `o2-gates.log.txt`.
- Design: `design-reconciliation.md` rows 1–5 and 15 and "Decisions made on the user's behalf";
  `plan.md` § "The ruled contract" → "Ollama after the rebuild", in the same folder.
- Law: `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md` and, under
  `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`, `names.md`, `typescript.md`,
  `architecture.md`, `patterns.md`, `tests.md`, `writing.md`, `documentation.md` (TSDoc voice).
- A test is named for what it proves, never for the control that specified it.

## Claims

1. `OllamaProvider extends AgentProvider implements AgentProviderInterface` with
   `readonly name = 'ollama'` and only the fields `#model`, `#keepAlive`, `#think`, `#options`;
   the constructor calls `super` with `url` (defaulting to `DEFAULT_OLLAMA_URL`),
   `path: OLLAMA_CHAT_PATH`, and only the `ProviderOptions` keys that are present; the file
   contains no `generate`, `stream`, transport, header, delta-folding, `Timeout`, `AbortSignal.any`,
   `TextDecoder`, `createThinkSplitter`, or `ProviderAbortError` mechanics.
2. `OllamaOptions extends ProviderOptions` with `model` required and `url`, `keepAlive`,
   `options`, `think` optional; `timeout`, `fetch`, `headers`, `format` are inherited; every option
   a caller could set before keeps its name and default, and the factory-defaults suite proves it.
3. `frame()` returns `createNDJSONParser()` and `finish(parser)` returns `parser.parse('\n')`,
   which recovers a final unterminated line exactly as the pre-change tail flush did (pinned).
4. `body(request)` returns the `WireChatRequest` the pre-change provider sent, byte for byte,
   except `stream: true`: the recording-proxy test pins the complete request text, and the two
   recordings agree with it.
5. `read(record)` returns content, thinking, and tools from the record and a `usage` key only when
   `done` is `true` and the counts are present; a delta contributes no `usage` key at all (pinned
   both through the provider and directly).
6. The exports `OllamaResponse`, `OllamaHTTPError`, `isOllamaHTTPError`, `OllamaHTTPErrorOptions`,
   `MAX_ERROR_BODY_LENGTH`, `DEFAULT_PROVIDER_TIMEOUT`, `buildResult`, `joinThinking`, and
   `parseBody` are gone with their tests; `src/core/errors.ts` and `src/core/parsers.ts` are
   deleted; `OLLAMA_CHAT_PATH` is added in `constants.ts`; the barrel star-exports every remaining
   kind file and re-exports no `@orkestrel/agent` symbol.
7. Every retained provider case now proves the base through the concrete provider — transport
   seam, deadline, abort, canned NDJSON fold, unterminated tail, tool, usage, and think separation
   — and the three assertions the unit re-pinned (a pre-aborted call and an expired header hook no
   longer reach the transport) assert the base's ruled behaviour rather than a weakened one.
8. `WireChatRequest` is unchanged and `tests/conformance.test.ts` is unchanged.
9. `tests/service/OllamaProvider.test.ts` keeps every live case and changes only the
   error-taxonomy expectations (`isProviderError`, `code === 'HTTP'`, the status).
10. The two red-then-green pins (`stream: true` on `generate`; usage only on `done`) bind: name any
    listed test that would pass against the pre-change provider.
11. Law and scope: the diff touches only the files the brief owns; no `any`, assertion, non-null
    assertion, suppression, access modifier, parameter property, or nested function declaration;
    every declaration sits in its centralized file; entity members are single words; new prose
    carries no banned term and no count of a growable set; TSDoc is third person present.

## Output

Per-claim verdicts with evidence; findings outside the claims (label them F1, F2, …); attacked and
held; one terminal line `VERDICT: PASS` or
`VERDICT: FAIL <claim numbers>; outside the claims: <labels or none>`, as your final message.
