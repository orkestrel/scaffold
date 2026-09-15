<!-- checker on Claude Sonnet, native, read-only, clean context, on the ollama checkout at e689e5b with o7-diff.txt; returned 2026-09-15 after 58 s; retained verbatim from the returned message -->

Lane: mechanical (checker, Sonnet)

## Per-claim verdicts

**Claim 1 — byte-equal `charge` fence.** CONFIRMED. `guides/ollama.md:134-150` and `src/core/factories.ts:37-51` (stripped of the TSDoc `* ` prefix) declare `import type { TokenUsage } from '@orkestrel/budget'` and `declare function charge(usage: TokenUsage): void // your billing integration` identically, with the same body through `if (result.usage) charge(result.usage) // fold into a token budget`.

**Claim 2 — origin sentence.** CONFIRMED. `guides/ollama.md:262` reads: "A page calling the relay from another origin needs CORS permission headers the relay route does not send, so serve the page from the relay server's own origin (as the recorded Chrome 148 run did) or put an origin-checking, CORS-answering middleware in front of the route (see the server guide), naming the `OPTIONS` preflight the browser sends with `authorization` and `content-type` as the requested headers."

**Claim 3 — cancel recovery.** CONFIRMED. `guides/ollama.md:56-59`: `const recovered = error.partial.content // everything that streamed before the cancel; answer.push(recovered)` — recorded standalone, not appended to `answer` before capture. `tests/guides.test.ts:270-303` adds the cancellation case: `createOpenTransport`, abort after one delta, asserts `expect(answer).toEqual(['Hel'])` and `expect(recovered).toBe('Hel')`. `README.md` has no matching `catch`/cancel arm, so no twin site needed the change.

**Claim 4 — introduction agrees with clause 2.** CONFIRMED. `guides/ollama.md:12` now reads "this surface imports the base and the contract types from `@orkestrel/agent` and reaches errors through that base," matching clause 2 at `guides/ollama.md:113`.

**Claim 5 — scope honesty and prose law.** CONFIRMED. `o7-diff.txt` touches only `guides/ollama.md`, `src/core/factories.ts`, `tests/guides.test.ts` — all inside the brief's Owned set; the report's `Status` block matches. No banned-term-table hit, no growable-set count, and no possessivized code token in the added prose ("server's own origin" possessivizes the English word `server`, not a backticked code token).

**Claim 6 — gate log.** CONFIRMED. `o7-gates.log.txt`: `format:check`, `lint:check`, `check`, `test:src:core` (99), `test:setup` (96), `test:conformance` (17), `test:guides` (34), `test:policy` (90 passed | 1 skipped), and `build` all exit 0.

## Findings outside the claims

None found. `@src/core` remains only in prose sentences describing the repository alias (`guides/ollama.md:12`, `:113`), which the brief explicitly permits to stay, and no fence imports it.

VERDICT: PASS
