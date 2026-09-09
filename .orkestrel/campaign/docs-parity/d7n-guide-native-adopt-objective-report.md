Lane: objective correctness.

### ENTRY — CONFIRMED

- **Attack:** Trace native module evaluation for an `@src` alias or Vitest registration import before the public command, then search for retained command orchestration.
- **Evidence:** The runtime imports before execution are `GuideCommand`, `readInventory`, and `createVitest`; the `@src/core`, `vitest`, and setup imports occur only inside the worker callback ([tests/guides.test.ts](C:/Users/mikes/WebstormProjects/guide/tests/guides.test.ts:4), [tests/guides.test.ts](C:/Users/mikes/WebstormProjects/guide/tests/guides.test.ts:26)). The test file passes `readInventory` and `createVitest` directly to the accepted ports ([tests/guides.test.ts](C:/Users/mikes/WebstormProjects/guide/tests/guides.test.ts:18)). It retains no local command, runner wrapper, `Parity` construction, or launcher. Root’s direct Node command exited `0` and registered the assertions.

### POLICY — BROKEN

- **Input:** Change the package manifest name so it no longer selects `guides/guide.md`, while leaving that guide row present and making the README tagline disagree with the guide.
- **State:** `GuideCommand.#createOptions()` calls `selectGuidePitch` and omits the entire `pitch` option when selection returns `undefined` ([GuideCommand.ts](C:/Users/mikes/WebstormProjects/guide/src/server/GuideCommand.ts:96), [GuideCommand.ts](C:/Users/mikes/WebstormProjects/guide/src/server/GuideCommand.ts:113)). `Parity` therefore returns the valid empty optional pitch report. The authored consumer asserts only that `report.pitch` equals `[]` ([tests/guides.test.ts](C:/Users/mikes/WebstormProjects/guide/tests/guides.test.ts:110)).
- **Consequence:** The required README-to-guide pitch policy passes after its pairing has silently disappeared. The separate Guide-row assertion does not establish that the package name selected that row.
- **Owner:** `tests/guides.test.ts`.
- **Smallest correct fix:** Keep `report.pitch` as the generic command assertion and add a package-owned assertion that reads the fresh `README.md` and `GUIDE_SPEC` texts from `files`, requires each tagline, and compares them directly. This needs no public API or command change.

### EXAMPLES — CONFIRMED

- **Attack:** Compare the authored callback with the accepted assertion body and trace the explicit rewrite path back into worker registration.
- **Evidence:** The flagship cases still execute real constructors, comparisons, renderers, replacers, and path functions inside registered Vitest cases ([tests/guides.test.ts](C:/Users/mikes/WebstormProjects/guide/tests/guides.test.ts:171)). Text-presence checks remain adjacent guards rather than replacements for behavioral assertions. Every case reads the fresh callback inventory. The accepted command invokes the real runner after an explicit rewrite, and the worker branch invokes this same callback ([GuideCommand.ts](C:/Users/mikes/WebstormProjects/guide/src/server/GuideCommand.ts:148), [GuideCommand.ts](C:/Users/mikes/WebstormProjects/guide/src/server/GuideCommand.ts:164)).

### CONTRACT — CONFIRMED

- **Attack:** Inspect the authored delta for runtime-source changes, extra dependencies, host-path construction, forbidden assertions, misplaced orchestration, and incorrect direction wording.
- **Evidence:** Frozen status names only `tests/guides.test.ts`. The entry uses readonly policy types, a file URL for the root, published package specifiers at the native boundary, and direct declared dependency ports ([tests/guides.test.ts](C:/Users/mikes/WebstormProjects/guide/tests/guides.test.ts:4), [tests/guides.test.ts](C:/Users/mikes/WebstormProjects/guide/tests/guides.test.ts:9)). The comment correctly maps source authority to `--to guide` and guide authority to `--to source` ([tests/guides.test.ts](C:/Users/mikes/WebstormProjects/guide/tests/guides.test.ts:130)). The delta changes no public source, manifest, lockfile, or generated tooling.

### Findings fitting no claim

None.

### Attacked and held

- The type-only `@orkestrel/guide` import does not recreate the native `@src` resolution failure.
- Package-specific README API inspection remains inside assertion registration and does not duplicate the generic command shell.
- Explicit authority requests return to the same substantive worker assertions after rewriting.

VERDICT: FAIL POLICY; outside the claims: none
