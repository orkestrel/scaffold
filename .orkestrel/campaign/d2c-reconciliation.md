# D2c reconciliation — the probe backlog

Lanes: planner (Opus 5, subjective) and analyst (GPT-5.6 Sol, journaled exec
`tmp/codex/d2c-analyst.jsonl`). Ruled by the Orchestrator, 2026-08-24. Evidence corrections from
the subjective lane, verified against the installed trees: `tests/setup.ts` exists empty and is
wired into every project; `resolveRoot` IS published by `@orkestrel/test`
(`resolveRoot(meta: ImportMeta): URL`); `experimental.fsModuleCache` does not exist in the
installed Vite 8.2.2.

## Rulings

1. **Coordinator deadline (repair).** Extract the `#inspectStage` race into a `#bound` helper and
   run `TypeStage.resolve` under it (recycle on expiry). Yields land after the root `#configure`,
   after each loop `#configure`, and after each `#issues` pair; the existing `#unblock` sites
   stay. A `resolve` never interleaves a live inspection — the implementer picks the honest
   mechanism (queue admission or a coordinator serial gate) since `ProbeServer` does not
   serialize `prove`. Documented bound: an overrun is the budget plus the longest single
   language-service call.
2. **Unrelated Control (retain + one identity refusal).** No relatedness invariant — any
   approximation refuses controls the guide deliberately allows; the receipt attests outcomes and
   binds bytes, and the guide states relatedness as the reader's obligation with an end-to-end
   unrelated-control-earns-receipt proof. ONE total refusal lands: a control whose
   `computeDigest` equals the case's is refused at admission (`claimant`/`refused`) — through
   `prove` a byte-identical control can only break by nondeterminism, and a flake-earned receipt
   is the worst output the package can produce. The `Claim` "must differ" remark widens to the
   whole case and the `@throws` doc moves with the refusal.
3. **Re-warm (repair, objective mechanism).** `#vitest: Promise<Vitest> | undefined`; a rejected
   warm or replacement clears the slot (identity-checked); the next `inspect` warms fresh; a
   failed fresh warm clears again and rejects that inspection with the coded translation — never
   loops in one call, never a permanently rejected stage, and the workspace fault SURFACES
   instead of being masked by an aging resident runner. Pin: the sentinel-file fixture (config
   throws while the sentinel exists) driven through `prove`, recovery proven after removal.
4. **Bare-Error (row's vectors closed; the door generalizes).** One door per stage: `inspect`,
   `resolve`, and `destroy` translate any escaping non-`ProbeError` into `origin: 'instrument'`,
   `code: 'malformed'`, with `cause` — except a warm failure of the workspace's own
   `vite.config.ts`, which is `origin: 'workspace'`. Named unwrapped sites from the evidence:
   `createSpecification` before the try, `#invalidate`'s Vitest calls, the language-service
   calls.
5. **destroy() (mechanism + honest prose).** `Probe.#destroy` races each stage teardown against
   the deadline through `#bound` and proceeds — the signal path must not hang on a wedged
   `vitest.close()`; worker threads are collected at process exit and the lint child already
   takes SIGKILL. The stage-level prose stops claiming every stage holds a local bound: the lint
   bound, the type stage's uninterruptible-call limit, and the coordinator-bounded runtime
   teardown are stated distinctly.
6. **The `#issue` prose door (subjective party ruling).** A file-less diagnostic on an INFERRED
   project becomes `origin: 'workspace'` (Issue, message translated workspace-relative) — the
   inferred project is the workspace's own, and the current `instrument` label makes every claim
   permanently unprovable while blaming probe (`computeReceipt` refuses on instrument issues).
   The caller-selected door stays `claimant`/`refused`. Message hygiene generalizes:
   `relativeWorkspaceMessage` exported from server helpers; the runtime `#issue` rewrites
   revision filenames out of messages (closes the suffix leak).
7. **Shadowing (close the query rule, detect the rest).** Overlay lookup strips at the first `?`;
   the serve-detection mechanism lands: `#reads` recorded in `#load`, and after a run every
   overlay path present in a module graph but absent from `#reads` reports (`workspace` when the
   target's config defeated the overlay, `instrument` when probe's own resolution missed). The
   detection ships issue-producing only after a full-suite reading shows no false findings —
   otherwise recording-only with a successor. Boundaries documented: bare specifiers (Vite's
   resolver is not duplicated) and the type/runtime test-draft asymmetry.
8. **fsModuleCache (documented unknown with a standing guard).** The option does not exist in the
   installed toolchain, so the sketched probe would set an unread key — refused as a
   never-arrives vector. The guide's receipt-limits passage gains the dated sentence, and ruling
   7's detection is the guard that fires if any future cache serves a covered path from disk.
9. **realpathSync (documented, narrowed).** The final component is closed by `wx` exclusive
   creation; a directory component swap is open because Node exposes no descriptor-relative
   no-follow traversal. The remarks and guide say exactly that.
10. **Revision suffix (retain + document + pin).** `import.meta.url` names the `.probe-` sibling;
    sibling resolution survives (pinned); the parent directory is unchanged (pinned); a test
    asserting its own filename reads the declared path instead — sentence in Revisions.
11. **Helper debt.** `WORKSPACE_ROOT = resolveRoot(import.meta)` exported from `tests/setup.ts`
    as a URL (host-independent — no `node:*` needed; the objective placement), consumers derive
    native paths; root-level suites call `resolveRoot` directly. The process-ending family
    (`readFixtureServer`, `waitForFixtureServer`, `killFixtureServer`, `isProcessLive`,
    `readSignalEnding`) moves to `tests/setupServer.ts`; `readHostEnding`/`readInputRefusal`
    stay local (scenario-bound). The `setup` project registers with `tests/setup.test.ts` +
    `tests/setupServer.test.ts`, the `test:setup` script joins `test`. The wait-conversion row
    folds into the same unit (the conversion map from g-probe-tests; settling waits stay).
    `createTeardown` adoption is bounded to `finally` blocks holding more than one teardown call
    (the leak it exists to fix); single-call finallys stay. The vendored set
    (`tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`) is off-limits to
    every unit.
12. **mintty (exclude on evidence).** Windows-host work; the row stays with its trigger named. The
    Linux acceptance lands now: confirm the two `/usr/bin/script`-guarded proofs execute here
    rather than skip.

## Units (probe checkout, one writer at a time; per-unit local checkpoint commits)

| Unit | Role / engine | Subject |
| --- | --- | --- |
| PD1 | sol | `#bound`, resolve serialization + budget, yields, `#destroy` bound (rulings 1, 5) |
| PD2 | sol | re-warm recovery + stage fault doors (rulings 3, 4), after PD1 |
| PD3 | sol | overlay query strip + serve detection (rulings 7, 8), after PD2 |
| PD4 | implementer / Opus | byte-identical control refusal + Claim remark (ruling 2), after PD1 |
| PD5 | implementer / Opus | issue party + message hygiene (ruling 6), after PD3 |
| W1 | builder | `WORKSPACE_ROOT` adoption (ruling 11), after PD5 |
| W2 | sol | process-helper family + setup project + wait conversions (ruling 11), after W1 |
| W3 | builder | bounded `createTeardown` adoption (ruling 11), after W2 |
| PD6 | implementer / Opus | guide prose for every documented ruling, last writer |
| PDV | verifier | host gate chain at integration |

Audits: Sol-written units by reviewer/checker; Opus-written units by analyst. Bench limits: the
probe suites spawn children and language servers — authoritative suite runs are the
Orchestrator's host runs.
