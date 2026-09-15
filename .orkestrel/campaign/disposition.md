# Disposition — the AgentProvider campaign (agent, ollama, guide), 2026-09-15

Filled at acceptance and refilled after the user took decision 3 (router and server as agent
development dependencies; the relay transcription executes the route and the server start-up).

## What landed

| Checkout | Tip | Commits this campaign |
| -------- | --- | --------------------- |
| agent | `debd1c5` | `cef565d` base, wire contracts, provider errors · `573ba71` reader-owned cancellation · `c50aee6` relay · `0fa4090` coherence · `5d288d7` relay repairs · `8dbe522` guide · `c052711` `AgentProvider` row · `611e24e` snapshot as the only mechanism · `057871c` guide made true · `610a567` serializer rule stated · `f0784a2` fence import order · `d84b1a2` excerpt bound, server start-up · `0102259` router and server declared as development dependencies · `0af0785` the relay fences driven over a started server · `c9b35b2` the transcription's comments and the guide made true, the fence's stop comment corrected · `debd1c5` two comment tokens given their nouns |
| ollama | `7e733e7` | `e92a327` environment move (O1) · `4ce25b3` rebuild on the base · `24662ef` relay round trips · `dcb64fe` test tidy-ups · `4f0d357` guide · `d874d91` merge of the relay tests' fixes · `2178171` timeout as a development dependency · `655ebec` / `f994872` mirror refreshes · `9231b3d` guide made true · `e689e5b` the billing hook, the origin sentence, the cancel recovery · `7e733e7` mirror refreshed at agent `debd1c5` |
| guide | `9863e77` | the key grammar admits `export abstract class` |

Evidence: V6-2 at agent `debd1c5` GREEN, run alone (`v6-verdict-2.md`; V6-1 reddened the vendored
config project's temp-folder check while V5 rolled declarations in the other checkout at the same
moment, `v6-verdict-1.md`); V5 at ollama `7e733e7` GREEN without the service project
(`v5-verdict.md`: the daemon is stopped and the runtime did not move — the repacked tarball differs
from the previous one by one documentation comment, `a4-4-receipt.md`); the earlier readings V1
(`d84b1a2`), V2 (`e689e5b`, with the service project), V3 (`0af0785`), and V4 (`c9b35b2`); the guide
package's chain (`g1-gates.log.txt`); the Chromium receipts `b1-receipt.md` and `b2-receipt.md`;
the A5 probes over a real loopback listener (`a5-probe-*.log.txt`) and the audit round A5-R1
(`a5-audit-*.md`, reconciled in `design-reconciliation.md`).

## Decisions taken on the user's behalf, to confirm or reverse

- `OllamaProvider.generate` sends `stream: true` on every call (one wire path); the previous
  non-stream body is gone.
- Removed from `@orkestrel/ollama`'s public surface, because the base owns them: `OllamaResponse`,
  `OllamaHTTPError`, `isOllamaHTTPError`, `OllamaHTTPErrorOptions`, `MAX_ERROR_BODY_LENGTH`,
  `DEFAULT_PROVIDER_TIMEOUT`, `buildResult`, `joinThinking`, `parseBody`; a consumer narrows a
  failed call with `isProviderError` and `error.code` from `@orkestrel/agent`.
- The ollama package moved from a server face to a core face (`src/server` → `src/core`), so the
  same build serves a Node process and a browser page.
- `@orkestrel/timeout` moved from ollama's `dependencies` to `devDependencies`.
- The relay's error frame carries `channel` and `message` only (the decorative `code` struck).
- No npm dependency was added beyond the two the user asked for. The agent guide names
  `@orkestrel/ndjson` as the browser application's own install, and its transcription keeps a
  test-infrastructure parser in its place.
- In the relay transcription: one loopback listener per case bound to `127.0.0.1` (the fence
  keeps binding every interface, as a deployed server does); the fence's `SIGTERM` listener is
  substituted by the fence's own `stop()` call in each case's `finally`; the byte-limit case stays
  a direct handler call; the cancel case parks the upstream's first pull on a gate.
- The fence's stop comment reads "signal cancellation, drain, then close the listener" in the
  guide and its titled twin, because that is what the installed `@orkestrel/server` does.

## Decisions that are the user's

1. **Publishing.** `@orkestrel/guide` 0.0.19 (its grammar fix; a development dependency, so it
   propagates as re-pins), then `@orkestrel/agent` 0.0.22 (the base, the relay, and the loopback
   transcription with `@orkestrel/router` and `@orkestrel/server` as development dependencies),
   then `@orkestrel/ollama` 0.0.16 after it re-pins `^0.0.22` and re-runs its gates against the
   registry copy. No version field was bumped in this campaign.
2. **Pushing** the agent, ollama, and guide commits: the scaffold's `mirror` verb fetches a
   consumer's dependency guides from the repository's pushed main, so ollama's mirrored agent
   guide (a byte copy at `debd1c5`) reproduces through the verb only after the push.
3. **The prune** of `scaffold/.orkestrel/campaign/` (per `orkestrel-debrief`'s retention
   procedure) once the carry, promotion, measurement, and orientation checks are presented.

Decision 3 of the earlier disposition (router and server as agent development dependencies) was
taken by the user on 2026-09-14 and is closed by A5.

## Carry-forwards (recorded, not reopened)

- `@orkestrel/server` 0.0.19 documents `stop()` as refusing new connections; measured, it accepts
  and dispatches a fresh connection during the drain window with the request's signal already
  aborted, and refuses only after the stop completes (`a5-probe-stopping.log.txt`). Its TSDoc and
  the scaffold's `server.md` mirror state the documented order; the owner rules whether the code
  or the sentence moves.
- After a completed call and a browser-side cancel on one `@orkestrel/server` listener, `stop()`
  waits ~3 s in `server.close()` on the client's aborted keep-alive socket, which
  `closeIdleConnections` does not reach (`a5-probe-stop-3.log.txt`); the transcription keeps one
  listener per case and says why.
- `isSection` / `isConversationSnapshot` totality and the `AbortSignal.any` dependent
  accumulation in `Agent.ts` (A1-R1 F7 and the design round).
- The fleet convention on a type name as a sentence subject (`writing.md`'s owner).
- Re-pinning the toolbox and supervisor packages onto the new agent release.
- The cross-origin arrangement for a browser page calling a relay on another origin (documented
  in the ollama guide as same-origin hosting or CORS middleware; no middleware ships here).

## Remaining risk

Every gate on the agent and ollama sides rests on tarballs installed `--no-save`: the guide
package from `9863e77` in agent, the agent package from `debd1c5` in ollama. The declared ranges
are unchanged, so a clean install in either checkout reinstates the pre-fix guide grammar failure
in agent and removes the base ollama extends, until the releases in decision 1 land. The
`a5-install.sh.txt` receipt shows the reify of an ordinary `npm install` reverting the guide
tarball; the script reinstalled it.

## Instruments retired

The audit worktrees `agent-audit` and `ollama-audit` with their `node_modules` junctions, the
`.claude/launch.json` receipt entries, and the Ollama daemon started for the live proofs. The A5
probes ran as Node scripts from the Orchestrator's scratchpad against the built `dist` and the
installed router and server; their copies are in this folder.
