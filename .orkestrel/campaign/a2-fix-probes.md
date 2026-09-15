# A2-fix mutation probes (Orchestrator, 2026-09-14, worktree `agent-audit` at `5d288d7`)

Instrument: `a2-fix-mutations.sh.txt` driven by the rows in `a2-fix-mutations.tsv.txt`; full log
`a2-fix-probes.log.txt`. Each row applies one mutation to the committed source, runs the named
test file with the real Vitest core project, records the reading, and restores the file; a
whole-project control run follows on the restored tree.

| Row | Mutation | Reading | Pins that reddened |
| --- | --- | --- | --- |
| F10 (helper) | `readText` reports `complete: true` unconditionally | 12 failed / 111 passed in `helpers.test.ts` | exact limit then EOF; exact limit without waiting for another chunk; empty chunk after an exact limit; limit plus one with one overshoot chunk; BOM-prefixed completion; abort and already-aborted reads; zero-byte limit; multibyte prefix |
| F10 (relay) | the same mutation | 4 failed / 55 passed in `factories.test.ts` | valid JSON at exactly the default limit refused; default limit plus one; custom limit with a BOM; inbound abort during a pending read stays `413` |
| F11 (serializer) | the callable-`toJSON` refusals on `parameters` and `schema` neutralized | 2 failed / 9 passed in `RelayProvider.test.ts` | synthetic parameters serializer before fetching; synthetic schema serializer before fetching (each mutant reached the transport: `fetch failed`) |
| F11 (snapshot) | `cloneJSONValue` bypassed, the projection returned as is | 1 failed / 10 passed | owns a valid request snapshot without changing its JSON values |
| F12 (body error) | the body-read catch answers `413` unconditionally | 2 failed / 57 passed in `factories.test.ts` | `400` when the body errors after a prefix; `400` when authorization consumes the body |
| F12 (upstream) | the `502` arm rethrows | 1 failed / 58 passed | `502` when stream construction throws without leaking text or listeners |
| F13 | `#cancel` skips the iterator return | 2 failed / 6 passed in `RelayStream.test.ts` | returns and finalizes the generator on an inbound abort with a queued unread frame; aborts upstream before iterator return and suppresses a late pending pull |
| F16 | the separator emitted unconditionally | 1 failed / 49 passed in `AgentProvider.test.ts` | omits the separator for an empty error excerpt (`provider error: 401 - ` observed) |

Control: the restored tree, whole core project — 751 passed (751), exit 0; `git status --porcelain`
printed nothing.

Ruling: every carried behavioural finding's pin binds to its repair. F14's pins share F16's
message form and are corroborated in a real browser by `b1-receipt.md` (a refused token reaches
Chrome 148 as `ProviderError HTTP 401 "provider error: 401"`). F18 is pinned at the type level and
by the contract's refusal of a `code` member; no mutation was run on it, because the closed shape
admits no member to strike. F15, F17, and F19 are prose and fall to the reviewer.
