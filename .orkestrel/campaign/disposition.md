# Disposition — the AgentProvider campaign (agent, ollama, guide), 2026-09-15

Filled at acceptance; the final V2 reading and the O7 round close the last cell.

## What landed

| Checkout | Tip | Commits this campaign |
| -------- | --- | --------------------- |
| agent | `d84b1a2` | `cef565d` base, wire contracts, provider errors · `573ba71` reader-owned cancellation · `c50aee6` relay · `0fa4090` coherence · `5d288d7` relay repairs · `8dbe522` guide · `c052711` `AgentProvider` row · `611e24e` snapshot as the only mechanism · `057871c` guide made true · `610a567` serializer rule stated · `f0784a2` fence import order · `d84b1a2` excerpt bound, server start-up |
| ollama | `e689e5b` | `e92a327` environment move (O1) · `4ce25b3` rebuild on the base · `24662ef` relay round trips · `dcb64fe` test tidy-ups · `4f0d357` guide · `d874d91` merge of the relay tests' fixes · `2178171` timeout as a development dependency · `655ebec` / `f994872` mirror refreshes · `9231b3d` guide made true · `e689e5b` the billing hook, the origin sentence, the cancel recovery |
| guide | `9863e77` | the key grammar admits `export abstract class` |

Evidence: V1 at `d84b1a2` GREEN (`v1-verdict.md`); V2 at `f994872` GREEN with the service project
(`v2-verdict-2.md`); the final V2 after O7 (`v2-verdict-3.md`); the guide package's whole chain
green (`g1-gates.log.txt`); the Chromium receipts `b1-receipt.md` and `b2-receipt.md`.

## Decisions taken on the user's behalf, to confirm or reverse

- `OllamaProvider.generate` now sends `stream: true` on every call (one wire path); the previous
  non-stream body is gone (design row 2; the live service run is its proof).
- Removed from `@orkestrel/ollama`'s public surface, because the base owns them: `OllamaResponse`,
  `OllamaHTTPError`, `isOllamaHTTPError`, `OllamaHTTPErrorOptions`, `MAX_ERROR_BODY_LENGTH`,
  `DEFAULT_PROVIDER_TIMEOUT`, `buildResult`, `joinThinking`, `parseBody`; a consumer narrows a
  failed call with `isProviderError` and `error.code` from `@orkestrel/agent`.
- The ollama package moved from a server face to a core face (`src/server` → `src/core`), so
  the same build serves a Node process and a browser page.
- `@orkestrel/timeout` moved from ollama's `dependencies` to `devDependencies` (nothing under
  `src` imports it; the guide's bounding pattern does).
- The relay's error frame carries `channel` and `message` only (the decorative `code` struck).
- No new npm dependency was added anywhere. The guide fences that import `@orkestrel/ndjson`,
  `@orkestrel/router`, and `@orkestrel/server` name them as the consumer's own installs, and the
  transcriptions substitute a test-infrastructure parser and drive the handler directly.

## Decisions that are the user's

1. **Publishing.** `@orkestrel/guide` 0.0.19 (its grammar fix; a development dependency, so it
   propagates as re-pins), then `@orkestrel/agent` 0.0.22 (the base and the relay), then
   `@orkestrel/ollama` 0.0.16 after it re-pins `^0.0.22` and re-runs its gates against the
   registry copy. No version field was bumped in this campaign.
2. **Pushing** the agent, ollama, and guide commits: the scaffold's `mirror` verb fetches a
   consumer's dependency guides from the repository's pushed main, so ollama's mirrored agent
   guide (refreshed by byte copy at `d84b1a2`) reproduces through the verb only after the push.
3. **`@orkestrel/router` (and `@orkestrel/server`) as devDependencies of agent**, so the guide
   transcription can execute the relay's dispatcher route and server start-up instead of driving
   the handler directly and asserting the route's method and path.
4. **The prune** of `scaffold/.orkestrel/campaign/` (per `orkestrel-debrief`'s retention
   procedure) once the carry, promotion, measurement, and orientation checks are presented.

## Carry-forwards (recorded, not reopened)

- `isSection` / `isConversationSnapshot` totality and the `AbortSignal.any` dependent
  accumulation in `Agent.ts` (A1-R1 F7 and the design round).
- The fleet convention on a type name as a sentence subject (`writing.md`'s owner).
- Re-pinning the toolbox and supervisor packages onto the new agent release.
- The cross-origin arrangement for a browser page calling a relay on another origin (documented
  in the ollama guide as same-origin hosting or CORS middleware; no middleware ships here).

## Instruments retired

The audit worktrees `agent-audit` and `ollama-audit` with their `node_modules` junctions, the
`.claude/launch.json` receipt entries, and the Ollama daemon started for the live proofs.
