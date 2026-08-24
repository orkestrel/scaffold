## Where browser fences transcribe

**Verdict: ADOPT — use `tests/src/browser/integration.test.ts` in the existing `src:browser` project.**

Load-bearing reasons:

- The fixed project matrix permits no `guides:browser` project.
- The `guides` project must remain Node-only.
- A nested `integration.test.ts` may compose browser APIs and is collected by the existing `tests/src/browser/**/*.test.ts` glob.
- A root or nested `guides.browser.test.ts` would violate the fixed cross-cutting names or mirror rule.

Exact parity mechanism:

- Put a `describe('guide fences')` block in `tests/src/browser/integration.test.ts`.
- Precede each case with the established `guides/test.md → Patterns → "<heading>"` comment.
- Reproduce each fence’s inputs and assert its comment-claimed behavior for `contrast`, `readRing`, and `createJournal`.
- Add a presence guard in `tests/guides.test.ts` that reads the browser test through the existing inventory and requires each source marker. The presence guard locates the transcription; the browser cases prove the behavior.
- Replace the skip comment with: “This Node block transcribes Node-capable fences. Browser fences transcribe in `tests/src/browser/integration.test.ts`. Fences that spawn a process or require a real registry transcribe in `tests/distribution.test.ts`. A fence is never omitted without naming its executing project.”

Owned files:

- `tests/src/browser/integration.test.ts`
- `tests/guides.test.ts`

Pins:

- `npm run test:src:browser`
- `npm run test:guides`
- `npm test` reaches the browser transcription through `test:src`.

## Where the wait fence’s child-exit half runs

**Verdict: ADOPT — transcribe it in `tests/distribution.test.ts`. Do not add `service`.**

Load-bearing reasons:

- A real child makes this an expensive proof.
- The fixed expensive-proof names are `distribution` and `service`.
- `service` requires a live external service and `tests/setupService.ts`; this fence has neither.
- The publishing workspace already registers `distribution`, isolates it from `npm test`, and invokes it from `prepublishOnly`.

Use the staged consumer already built by `tests/distribution.test.ts`. Write a consumer driver that imports `waitForEvent` from the installed `@orkestrel/test` package, spawns a real Node child, returns cleanup that removes the `exit` listener, and reports exit code `0`. Assert the driver’s status, output, and listener cleanup.

Owned files:

- `tests/distribution.test.ts`
- `tests/guides.test.ts` for the placement marker and routing comment

Script wiring:

- Keep `test:distribution` unchanged.
- Keep `prepublishOnly` invoking `npm run test:distribution -- --mode release`.
- Do not change `vite.config.ts` or add a package script.

Pins:

- `npm run test:distribution`
- The publication gate is `npm run test:distribution -- --mode release`, reached by `prepublishOnly`.

## Unit decomposition

Run the writing units serially.

- **Browser fence transcriptions** — `implementer`, GPT-5.6 Sol. Owns `tests/src/browser/integration.test.ts`. Acceptance requires real Chromium execution through public barrels, exact source comments, the documented contrast result and refusal, the focused and worn ring readings, the journal steps and empty output, and a green `test:src:browser` run.

- **Child-exit distribution transcription** — native `implementer`, GPT-5.6 Sol. Owns `tests/distribution.test.ts`. The native route is required because a bench cannot reliably prove a child’s pipes or a grandchild process. Acceptance requires the installed public package, a real child, exit code `0`, listener cleanup, and a green release-mode distribution run on a host with registry access.

- **Parity routing and presence guards** — `builder`, Terra. Owns `tests/guides.test.ts` after the behavior units land. Acceptance requires the replacement routing comment, exact target-file marker checks, a negative-control mutation that reddens the presence test, and a green `test:guides` run.

- **Cross-engine audit** — `reviewer`, Claude Opus 5, read-only. Acceptance requires ruling on the actual diff and status evidence, including project placement, public-barrel use, real browser execution, installed-package execution, child cleanup, and script reachability.

- **Gate verification** — `verifier`, Terra, read-only. Acceptance requires exit code `0` from `format:check`, `lint:check`, `check`, `build`, `npm test`, and the release-mode distribution command.

The observed transcription residue remains outside this brief’s named scope. The bounded review of value-claim TypeScript fences leaves the surface overview scenario; “Capture a throw, then assert on it”; “Narrow without `!` or `as`”; “Drain an async source”; the condition and retry portions of “Wait for a named condition”; “Copy a JSON value”; “Prove a guard is total”; “Prove a wire fixpoint”; “Read a source inventory”; the scratch-directory fences; “Give everything back in one hook”; “Answer a real request on a loopback port”; “Probe what the host supports”; “Refuse an escaping path in your own fixture”; “Build and mount a fixture”; “Drive an interface the way a person does”; “Drive a field the component listens to”; “Read the tokens and colors a theme declares”; “Find a rule in the cascade”; “Remove an IndexedDB database”; and “Place a capture portfolio.” Existing module tests do not retire this residue because they lack the guide-source transcription marker.

LANE: objective COMPLETE.