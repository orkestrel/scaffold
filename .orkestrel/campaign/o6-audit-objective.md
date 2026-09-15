Lane: objective (analyst, GPT 6 Astra)

1. **BROKEN — M1 names the wrong mirror revision.** The mirror’s SHA-256 is `1787ad573b1328e912e5226e3e3cfd5da074d32fc76824e3c457ecf59c31919c`, matching the sibling agent guide and the `f994872` commit’s recorded `d84b1a2` refresh. It differs from the `610a567` digest in `../scaffold/.orkestrel/campaign/o6-mirror-receipt.md:6`. The required APIs and referenced sections exist (`guides/agent.md:738`, `:971`, `:1099`, `:1129`); every agent link resolves. **Fix:** update the claim and receipt to the later mirror revision; preserve the refreshed guide.

2. **CONFIRMED — M2.** Executing the guide’s stream fence against source transpiled in memory produced:
   - Plain records: joined content `Hello`; settled content `Hello`; thinking `weighing it`.
   - Reclassification records: joined content `reasoninganswer`; settled content `answer`; thinking `reasoning`.

   The old equality assertion failed on the reclassification control. The guide and README read the settled answer, and the transcription asserts the differing result (`guides/ollama.md:53`, `:62`; `README.md:61`; `tests/guides.test.ts:189`, `:221`).

3. **CONFIRMED — M3, M6.** The contract names the published entry without tallying entries, the span comment names its members, and the cited possessives are removed (`guides/ollama.md:121`, `:123`, `:285`; `tests/guides.test.ts:160`). The “at least one” test names express minimum population requirements, not inventory counts (`tests/guides.test.ts:55`, `:64`).

4. **CONFIRMED — M4.** The server construction, startup, shutdown instruction, URL handoff, adapter obligations, and dependency links are present (`guides/ollama.md:215`, `:230`, `:236`, `:246`, `:374`). I executed the composition over a real loopback socket, using the documented transport seam for daemon records. It returned `Hello`, thinking `weighing it`, and usage `{prompt:3, completion:4, total:7}`, then stopped. Browser-side cancellation returned partial `Hel` and cancelled the daemon response. The retained transcription runs this composition through the existing server fixture (`tests/guides.test.ts:329`; `tests/setupServer.ts:139`).

5. **CONFIRMED — M7.** The browser clause identifies this package, Chrome 148, and `2026-09-14`, without citing a private campaign artifact (`guides/ollama.md:123`). Its direct generation, direct cancellation, relayed generation, and HTTP 401 statements match `../scaffold/.orkestrel/campaign/b2-receipt.md:20`.

6. **CONFIRMED — M8–M13.** The setup bullets match their test subjects (`guides/ollama.md:354`; `tests/setup.test.ts:1`; `tests/setupServer.test.ts:1`). Timeout wording is present tense; inherited options are named; relay and routing inputs are declared (`guides/README.md:33`; `guides/ollama.md:86`, `:112`, `:246`, `:268`). Compiler-derived import inventory matches clause 2. An executed user-role message carrying calls produced `tool_calls`, confirming the role-independent wording (`src/core/helpers.ts:28`; `guides/ollama.md:113`).

7. **CONFIRMED — M14.** The README equality claim is removed. Its replacement lines have presence guards beside the guide’s executed settlement assertions (`README.md:61`; `tests/guides.test.ts:252`).

8. **BROKEN — the identifier and alias conjuncts fail.** The titled generation fence calls undeclared `charge` (`guides/ollama.md:145`). Executing it with a usage-bearing response returned `ReferenceError: charge is not defined`. The guide also contains `@src/core` at lines 12 and 112, although its fence imports use published specifiers. **Fix:** declare or explicitly mark the billing integration, synchronizing the matching source example at `src/core/factories.ts:51`; remove the prose aliases if retaining the claim’s blanket prohibition.

   The supplied host log reports guides **33 passed**, core **99 passed**, and setup **96 passed**, with file totals matching the configured populations (`../scaffold/.orkestrel/campaign/o6-gates.log.txt:38`, `:52`, `:80`). My corresponding commands stopped before collection on Vite’s denied temporary-config write. Those local failures establish no test regression.

9. **CONFIRMED — law and scope.** The diff contains only `README.md`, `guides/README.md`, `guides/ollama.md`, `tests/guides.test.ts`, and the authorized mirror (`../scaffold/.orkestrel/campaign/o6-diff.txt:1`, `:36`, `:51`, `:640`, `:812`). The added prose contains no prohibited-sense substitution, growable inventory count, or possessivized token. The vocabulary sweep covered those authored files case-insensitively, including inflections; its prohibited-term control matched.

10. **UNRESOLVED — browser usability still needs an origin-specific proof.** The relay fence serves only its inference route. A real preflight carrying origin `http://localhost:5173` and requested headers `authorization,content-type` returned **204**, with `Allow: POST, OPTIONS` but no CORS permission headers. The guide specifies neither same-origin page hosting nor the required cross-origin configuration (`guides/ollama.md:227`, `:236`, `:246`). The linked middleware example supplies no permission headers either (`guides/server.md:476`). No browser was connected for an independent browser reading. **To settle:** document the page-to-relay origin arrangement and execute the browser fence under it.

### Findings outside the claims

- **F1 — cancellation recovery duplicates content.** After the stream yielded `Hel`, cancelling caused `answer.push(error.partial.content)` to produce `['Hel', 'Hel']` (`guides/ollama.md:55`). The partial is cumulative, as the installed engine implements at `node_modules/@orkestrel/agent/dist/src/core/index.js:2849`. **Fix:** retain the partial separately or replace the displayed aggregate; add the cancellation case to the transcription. Successful settlement remains correct.

- **F2 — the introduction contradicts the repaired imports clause.** `guides/ollama.md:12` still says this surface imports “the error” from `@orkestrel/agent`. The compiler-derived import inventory contains no provider error; clause 2 correctly says so (`guides/ollama.md:112`; `src/core/OllamaProvider.ts:1`). **Fix:** distinguish imports from errors received through the base in the introduction too.

### Attacked and held

- A changed-byte control failed mirror equality; the actual mirror matched the sibling guide.
- A wrong bearer returned HTTP 401 without entering the daemon transport.
- Per-call thinking, schema forwarding, empty-tool omission, unfinished-usage suppression, and unterminated-record recovery held.
- Ordinary stream concatenation remains correct; reclassification changes the authoritative settlement. Cancellation returns the correct cumulative partial—the guide’s append operation duplicates it.

VERDICT: FAIL 1, 8, 10; outside the claims: F1, F2