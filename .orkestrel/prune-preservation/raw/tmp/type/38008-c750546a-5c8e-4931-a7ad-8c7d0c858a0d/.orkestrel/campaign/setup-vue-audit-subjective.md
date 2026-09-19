1. **CONFIRMED — Generated Vue rendering.** Held the subjective lane on GPT-5.6 Sol, substituting unavailable Opus. I attacked Sol’s assumption that importing Vue elsewhere suffices. The installed baseline consumer failed at `SetupComponent.vue:3` through `tests/setupBrowser.ts`; the rebuilt consumer passed the same command. See `tmp/release/scaffold-0.0.75/tmp/setup-vue-consumer-red.log.txt:35` and `setup-vue-consumer-green-2.log.txt:18`. The fixture supplies no plugin override and checks rendered text and DOM data in `tests/setupServer.ts:888`.

2. **CONFIRMED — Selection boundary.** I executed the built compiler across every `src` and `app` environment subset crossed with empty, Node, browser, and combined setup selections. Compared with `dc98373`, output differed only by the selected setup Vue plugin line; dependency output stayed equal. Non-Vue selections emitted no Vue import or call. This matches `src/core/compilers.ts:624`, `:219`, and the guide at `guides/scaffold.md:924`.

3. **CONFIRMED — Emission and override fit.** I attacked malformed conditional emission, unresolved tokens, and changed merge behavior. Representative generated roots remained formatter-identical, and the selection matrix contained no unresolved token. Controls detected malformed TypeScript, an unresolved token, and omission of the setup plugin. Executing the actual emitted `mergeOverride` with real Vite merging preserved named replacement, append behavior, other array merging, invocation-record handling, and frozen inputs. The factory retains that boundary at `src/core/templates.ts:512`.

4. **UNRESOLVED — Regression cannot pass through skipping.** The transform-omission control binds: its collected outer regression rejected the child import failure. However, `tests/distribution.test.ts:1033` checks only exit status, project text, and file text. Those assertions don't establish that the child test passed rather than skipped. I requested an executable control; its evidence hasn't arrived.

   The minimal settling instrument changes the fixture registration at `tests/setupServer.ts:883` from `it(...)` to `it.skip(...)`, runs:

   ```text
   npm.cmd run test:distribution -- --mode release tests/distribution.test.ts -t "renders a Vue SFC through the generated browser setup project"
   ```

   Then restore exactly that registration. No rebuild is required. An outer green would falsify the skipped-case claim. Scratch destruction remains inside `finally` at `tests/distribution.test.ts:1037`; the supplied red already demonstrates child failure propagation.

5. **CONFIRMED — Scope, contracts, and guide fit.** I attacked an unnecessary public switch, dependency expansion, misplaced fixture data, and an overbroad guide promise. The actual patch introduces none of those changes. The compiler fills centralized template data using existing machinery; test fixture data remains in shared setup infrastructure. Public types and package declarations remain unchanged. The executed selection attack supports the guide’s conditional statement. The supplied status matches the isolated snapshot, and `git diff --check` exited `0`.

**Findings fitting no claim:** None substantiated.

**Attacked and held:** An empty plugin override retains the base plugin; that adjacent behavior follows the existing documented merge contract. Setup/browser without app/browser remains non-Vue, as the guide states.

**Unresolved:** The skipped-child control must settle the proof assertion in claim 4. The successful rendering observation alone doesn't settle that assertion.

VERDICT: FAIL 4; outside the claims: none
