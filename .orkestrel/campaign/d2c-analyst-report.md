1. **REPAIR — coordinator deadline**

   - Start a coordinator timeout before `TypeStage.resolve`, and recycle the type stage when that timeout expires.
   - In `TypeStage`, yield before the first synchronous unit and after each `#service`, `#configure`, and `#issues` call. Apply the same boundary inside `#warm`, `resolve`, and `inspect`.
   - The deadline can then stop the remaining project setup, configuration diagnostics, test diagnostics, and later candidate checks. It cannot interrupt a TypeScript language-service call already executing. An overrun becomes observable at the following yield.
   - **Owned files:** `src/server/Probe.ts`, `src/server/stages/TypeStage.ts`, `src/server/types.ts`, `src/core/types.ts`, `tests/src/server/Probe.test.ts`, `tests/src/server/stages/TypeStage.test.ts`, `guides/probe.md`.
   - **Pin:** Use a nonresident caller-named tree-wide project whose aggregate synchronous units exceed the deadline. Assert `origin: 'claimant'`, `code: 'deadline'`, type-stage replacement, and a clean later claim. State in `guides/probe.md` that one synchronous compiler call is uninterruptible and can overshoot the deadline until the next yield.

2. **RETAIN — unrelated `Control` is permitted**

   - Admission must enforce shape, containment, project selection, and a nonempty reason. It must not infer semantic relatedness between independently supplied programs.
   - A legitimate independent control must still run every stage, fail with a claimant issue only at its declared stage, produce no instrument issue, and satisfy every existing receipt condition.
   - The receipt attests the recorded outcomes and binds the case and control bytes through the digest. It does not attest that the control is a mutation of the case.
   - **Owned files:** `src/core/types.ts`, `guides/probe.md`, `tests/src/core/validators.test.ts`, `tests/src/server/Probe.test.ts`, `tests/guides.test.ts`.
   - **Pin:** Replace the `Claim` remark that drafts “must differ” with the actual receipt obligation. Add an end-to-end case proving that an unrelated valid control is admitted and can earn a receipt, while the guide explicitly states that relatedness remains a reader obligation.

3. **REPAIR — rejected runtime re-warm must recover**

   - Do not retry the rejected promise. Represent absence with `#vitest: Promise<Vitest> | undefined`.
   - When a stored warm or replacement rejects, clear it only if its identity still matches. The following `inspect` starts one fresh warm. A failed fresh warm clears the slot again and rejects that inspection; it never loops inside one call.
   - **Owned files:** `src/server/stages/RuntimeStage.ts`, `tests/src/server/stages/RuntimeStage.test.ts`, `guides/probe.md`.
   - **Pin:** Use a scratch workspace whose real `vite.config.ts` throws while a sentinel exists. Warm successfully, cross the 64-specification bound, create the sentinel, observe the replacement failure, remove the sentinel, and prove that the next inspection starts a real Vitest runner and passes. No mock or module replacement is needed.

4. **REPAIR — the named bare-`Error` vectors are closed, but another survives**

   - Missing test-directory and specification-write faults do not escape bare: `#specification` folds them into coded findings or `ProbeError`.
   - A replacement failure still can reject `prove` as Vitest’s bare error. The path is `RuntimeStage.#replace` or `#warm` → `#runner` → `inspect` → `Probe.#inspectStage`, which rethrows a fast non-deadline failure unchanged.
   - Translate a target-config warm failure to `ProbeError` with `origin: 'workspace'`, `code: 'malformed'`, `context: { stage: 'runtime', path: 'vite.config.ts' }`, and the native value as `cause`. Translate a resident-runner close fault as `origin: 'instrument'`, `code: 'malformed'`.
   - **Owned files:** the runtime source, test, and guide files named for question 3, plus `tests/src/server/Probe.test.ts`.
   - **Pin:** Drive the real re-warm failure through `Probe.prove` and assert `isProbeError`, classification, context, and retained cause.

5. **SATISFIED — lint teardown is bounded; the shared prose is false**

   - `LintStage` bounds the unanswered `initialize` exchange and shutdown/release at 2,000 ms, then sends `SIGKILL`. The real fixture tests already prove silent initialization, unanswered shutdown, and ignored exit.
   - `TypeStage` has no child to signal. A synchronous TypeScript call blocks entry into `destroy` and cannot be interrupted.
   - `RuntimeStage.destroy` also has no stage-local deadline around `vitest.close`; only coordinator recycling has an outer bound. The shared `StageInterface` and guide must not claim every stage has a local bound.
   - **Owned files:** `src/server/types.ts`, TSDoc in `TypeStage.ts` and `RuntimeStage.ts`, `guides/probe.md`, `tests/guides.test.ts`.
   - **Pin:** In the Lifecycle section, state the lint bound, the type-stage synchronous limit, and the distinction between direct runtime teardown and coordinator-bounded recycling. Retain the existing real `LintStage.test.ts` proofs.

6. **REPAIR — translate the type-stage prose door**

   - For an inferred project’s file-less diagnostic, throw `ProbeError` with `origin: 'instrument'`, `code: 'malformed'`, and `context: { stage: 'type', project }`. Translate the compiler message through `#translate` so it contains no workspace-absolute spelling.
   - Preserve the caller-selected door as `origin: 'claimant'`, `code: 'refused'`.
   - `RuntimeStage.#issue` must not take the same translation. It receives a completed test run’s thrown value, which is claimant-owned candidate behavior and correctly remains an `Issue`; its stack mapping supplies the reported path and line.
   - **Owned files:** `src/server/stages/TypeStage.ts`, `tests/src/server/stages/TypeStage.test.ts`, `guides/probe.md`, `tests/guides.test.ts`.
   - **Pin:** Drive a real inferred project with a file-less compiler diagnostic and assert the coded failure, context, and absence of the absolute workspace path. Retain runtime tests proving arbitrary thrown test values remain claimant issues.

7. **REPAIR — query fallback is a defect; package and test resolution are boundaries**

   - A query-qualified covered path must never fall through to disk. Normalize the Vite id for overlay lookup by removing the complete query or fragment, while returning the original suffix so `?raw`, `?url`, and other downstream transforms retain their semantics.
   - A bare package absent from disk remains outside the overlay’s resolution contract. The runtime overlay does not synthesize package metadata or package resolution. When Vite resolves a bare import to an existing covered file, `load` must still serve the overlay.
   - The type stage’s overlay of `subject.test` and the runtime stage’s generated sibling are intentionally different. TypeScript checks the declared test path; Vitest executes the generated revision file.
   - **Owned files:** `src/server/stages/RuntimeStage.ts`, `src/server/helpers.ts` if id normalization extracts there, matching helper and runtime tests, `guides/probe.md`, and `tests/guides.test.ts`.
   - **Pin:** Change the `?raw` shadowing test to expect overlay bytes, retain the version-query assertion, retain the unresolved bare-package test, and document the bare-resolution and generated-test boundaries.

8. **BLOCKED — `experimental.fsModuleCache` remains unmeasured**

   - **Missing fact:** whether a warmed runner with `test.experimental.fsModuleCache: true` returns a disk-derived transform after the same path becomes overlay-covered.
   - Build a scratch workspace with the cache enabled and a real on-disk `src/value.ts` exporting `'disk'`. Run a baseline test that imports it and expects `'disk'`, and assert that the filesystem cache was created. Then inspect with an overlay exporting `'overlay'` and a test that expects `'overlay'`. Serving cached disk text makes the latter fail.
   - **Owned files:** initially only `tests/src/server/stages/RuntimeStage.test.ts`. Runtime source becomes owned only if the probe fails.
   - **Pin:** Promote this exact real-Vitest probe, including the disk baseline and overlay-distinguishing assertion, into the runtime-stage suite.

9. **SATISFIED — retain the `realpathSync` race as documented**

   - The guide and `RuntimeStage` remarks already limit physical containment to the tree as inspected and exclude a concurrent component swap before the write or delete.
   - Closing the race requires descriptor-relative component traversal with no-follow semantics. Node’s portable filesystem API does not expose the required `openat`-style operation, and a native dependency is not authorized.
   - **Owned files:** none.
   - **Pin:** Retain the sentence in `guides/probe.md` under “What containment reaches” and the matching `RuntimeStage` class remark. Keep the existing containment tests as proof of the covered, nonconcurrent boundary.

10. **RETAIN — revision `import.meta.url` is acceptable but must be explicit**

   - Rewriting `import.meta.url` would misrepresent the file Vitest executes. It would also redirect file operations toward the caller’s declared path, which might not exist or might be developer-owned.
   - Relative fixture resolution remains correct because the generated file is a sibling. Only the filename identity differs.
   - **Owned files:** `src/server/stages/RuntimeStage.ts` TSDoc, `guides/probe.md`, `tests/src/server/stages/RuntimeStage.test.ts`, `tests/guides.test.ts`.
   - **Pin:** State that `import.meta.url` names the `.probe-<pid>-<uuid>` sibling, not `Draft.path`. Add a runtime assertion for the suffix and for the unchanged parent directory.

11. **DECOMPOSE — helper debt**

   - **Setup-and-process unit:** Own `tests/setup.ts`, `tests/setupServer.ts`, `tests/setup.test.ts`, `tests/setupServer.test.ts`, `vite.config.ts`, `package.json`, `tests/config.test.ts`, and the imports changed in `LintStage.test.ts` and `main.test.ts`. Move `readFixtureServer`, `waitForFixtureServer`, `killFixtureServer`, `isProcessLive`, and the generic signal-ending helper to `tests/setupServer.ts`. Keep `readHostEnding` and `readInputRefusal` local because they encode LintStage fixture scenarios. Register the `setup` project, `test:setup` script, and test-chain entry in this unit. Acceptance requires real child-process proofs for announcement, liveness, signal ending, and release.
   - **Root-adoption unit:** Own the test files that hand-compute the repository root. `tests/setup.ts` exports `WORKSPACE_ROOT = resolveRoot(import.meta)`, and consumers derive native paths from that URL. Acceptance requires no remaining repository-root construction from test-file depth.
   - **Teardown-adoption units:** Split ownership across root/core proofs, server and stage proofs, and bin/server proofs so each writer owns disjoint test files. `tests/setup.ts` exports a per-test-module teardown list and registers `afterEach(() => teardown.destroy())`. Register each resource immediately after acquisition. Keep explicit cleanup local where cleanup timing, failure, or idempotence is the behavior under test.
   - `tests/setup.ts` becomes the host-independent home for `WORKSPACE_ROOT`, the shared teardown list, and its `afterEach` hook. It imports no `node:*` module.
   - **Pin:** `tests/setup.test.ts` proves root resolution and that the hook clears registered cleanup before the following test. `tests/setupServer.test.ts` proves moved process helpers with real children. Configuration tests assert project discovery, `test:setup`, and inclusion in `npm test`.

12. **EXCLUDE — retain the mintty row for Windows**

   - A Linux run cannot prove behavior under a mintty-backed TTY or the Windows environment where `/usr/bin/script` is unavailable.
   - Linux can exercise adjacent non-mintty fallback logic, but that result does not close the named host integration.
   - **Owned files:** no probe-package files in this session; retain the carrier in `/home/user/scaffold/ROADMAP.md`.
   - **Pin:** The Windows session must run the real entry from mintty with no `script` executable resolvable, assert the intended refusal or fallback, and record the exact host and shell. Until then, the row remains open and host-scoped.

LANE: objective COMPLETE