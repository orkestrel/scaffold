# analyze:probe-load

```json
{
  "findings": "FACTS (from the logs). Load: 14 spinning worker threads (teardown-load-worker.ts:5-8) started before `npm run test` (teardown-load2-suite.ts:11-15). Loaded: test:src failed with 12 failed, 257 passed, 12 skipped across 3 files; tests summed to 1684.21 s against 930.58 s quiet, 1.81x (suite-loaded.log:11-14; suite-quiet.log:11-14). The `&&` chain stopped there, so the policy, config, setup, and guides projects never ran under load. The quiet run passed test:src (281 cases) but failed `guides > earns the receipt` (suite-quiet.err:17), an Oxlint 1.86.0 vs 1.87.0 receipt drift. That failure has nothing to do with load, and it still blocks a release. Product bounds: PROBE_DEADLINE 30 s (constants.ts:98), PROBE_WARM 90 s, sized with stated contention headroom (constants.ts:104-112), LINT_DEADLINE 2 s on the Oxlint initialize reply, sized only from a quiet 155 ms measurement (constants.ts:131-140; LintStage.ts:169), and LINT_TEARDOWN 16 s (constants.ts:156). Release host: layer.ts:4 runs one layer's repositories in parallel, each running its own gates. The release failure in the original brief happened while worker's gates ran alongside. A realistic release host therefore sees bursts from one or more sibling suites, which is more than a solo run and less than 85% sustained for 14 minutes.\n\nPER CASE. 11 of the 12 failures are class (a): the case's budget or deadline was chosen for a quiet host, while the product stayed inside its own bounds. Case 1 is not (a) and is unconfirmed as (c) or (d).\n1. main.test.ts:731, 'carries the verdict record...'. Claim: both protocol eras carry the record beside the text. frames[0] carried no `result` (err:9-24), and the 300 s timeout did not fire. Initialize waits for the probe onset (ProbeServer.ts:142,155) and turns a refusal into a handshake error (ProbeServer.ts:159). That means the onset refused. The probable cause is the 2 s LINT_DEADLINE initialize bound under load, but readAnswer discards the error frame (main.test.ts:116-121), so the bound that fired is not recorded. Class: (c) if the product is not meant to promise an onset under this load, (d) if it is, because LINT_DEADLINE is the only bound sized without contention headroom. Unconfirmed.\n2. main.test.ts:1395, 'refuses initialize...repairs a blocked workbench'. Claim: a repaired workbench serves and exit code 1 is preserved. waitForCondition gives 15 s (1438-1440) for one real boot plus one proof. The product allows PROBE_WARM plus PROBE_DEADLINE per inspection. Under load the boot plus proof took longer than 15 s. Class (a).\n3. Probe.test.ts:56, 'waits for a type warm beyond the inspection deadline'. Claim: prove waits for a warm that outlasts the deadline. The test's `deadline: 3_000` (95) does two jobs: it is the threshold the held warm must outlast, and it also bounds the real boot type inspection after release. That inspection exceeded 3 s, and the arm was refused with 'type stage exceeded 3000 ms' (err:47-63). Class (a).\n4-11. The following eight cases each run at least one real tsc, Oxlint, and Vitest boot, and most also run real proofs, under a 20 s or 30 s timeout. The product's own bounds are PROBE_WARM plus PROBE_DEADLINE per inspection. Each case and its claim:\n- 131: a failed type warm is retained, then recovered.\n- 184: a type warm is bounded and replacements are spent. A fixed waitForDelay(8_000) races the refusal (231), which tests.md:226 forbids.\n- 252: a failed warm is reported after the replacement arms.\n- 316: a refill is consumed. It runs under `deadline: 3_000` (347), the same hazard as case 3. The arm event wait budget equals the 20 s test timeout (375), so a refused arm shows up as a bare timeout.\n- 472: construction is deferred and start is refused after teardown. The comment at 471 sizes the budget from a quiet 6 s boot.\n- 573: an idle lint exit is recovered (30 s timeout).\n- 626: the restart floor is spent and restored. The bare arm promise at 640 has no description.\n- 701: two unanswered-initialize warms, each bounded by LINT_DEADLINE plus a disposal under LINT_TEARDOWN, then a real boot. 20 s is thin even on a quiet host.\nAll eight timed out at the Vitest timeout, not at a product deadline (err:66-168). Class (a).\n12. RuntimeStage.test.ts:1298, 'recycles the resident runner after 64 written specifications'. Claim: the runner is replaced at PROBE_SPECIFICATIONS (64, constants.ts:196). It runs 65 sequential real Vitest inspections and 3 warms with no product bound (the stage is called directly), under a 60 s timeout. Class (a): an expensive proof in a shared project, against tests.md:164-175.\n\nNo class (b) failure appeared. 140c5bd's silent-initialize case passed under load (last.md:28).",
  "proposals": [
    {
      "id": "P1",
      "target": "tests/src/bin/main.test.ts:782 'carries the verdict record beside the rendered text on both eras'",
      "classification": "(c) or (d), unconfirmed",
      "change": "Make the handshake assertion name the frame it read: assert on the parsed frames[0] (or pass the frame as the expect message, as line 788 does), so a refusal reports its origin, code, and stage. Change no bound until a loaded rerun names which bound fired. If it is LINT_DEADLINE, rule on the product: either size LINT_DEADLINE from a contended measurement the way PROBE_WARM was (a constants.ts change with its measurement), or document that the onset is not promised beyond a stated load.",
      "proof": "Red: the existing loaded run reports 'expected undefined'. Green: the same loaded command prints the refusal frame and names the bound. If LINT_DEADLINE changes, a contended initialize measurement recorded with the host's load."
    },
    {
      "id": "P2",
      "target": "tests/src/bin/main.test.ts:1438 'refuses initialize, keeps discovery, repairs a blocked workbench, and preserves exit one'",
      "classification": "(a)",
      "change": "Derive the 'repaired workbench proof' budget, and the 25_000 case timeout, from the bounds the server enforces on that call: PROBE_WARM plus PROBE_DEADLINE for each boot control and proof inspection. Under that budget the server's own deadline answers first, and the frame read on the next line carries the diagnostic. The pin is unchanged.",
      "proof": "The case passes quiet at an unchanged duration. Under the declared load it passes or fails on a product deadline frame, never on a waitForCondition timeout."
    },
    {
      "id": "P3",
      "target": "tests/src/server/Probe.test.ts:95,120 'waits for a type warm beyond the inspection deadline and then proves'",
      "classification": "(a)",
      "change": "Split the two jobs the 3_000 value does. The socket gate controls how long the warm is held, so set `deadline` to a named value above the boot inspection cost measured in a full contended run (tests.md:175), write waitForDelay(deadline + one host turn), and derive the case timeout from `warm` plus that deadline. The pin 'settled.count is 0 after the deadline elapses' stays.",
      "proof": "The breaking edit still fails: route the warm through the deadline and the case goes red. Quiet and loaded runs pass."
    },
    {
      "id": "P4",
      "target": "tests/src/server/Probe.test.ts:131 'retains a failed type warm for the next prove and recovers after replacement'",
      "classification": "(a)",
      "change": "Derive the timeout from the product bounds the case crosses: a failed warm, then PROBE_WARM for the real replacement, plus PROBE_DEADLINE per boot control and proof inspection. Alternatively pass smaller `warm`/`deadline` options and derive from those. Remove the quiet-host constant.",
      "proof": "Green quiet at the same duration. Loaded: passes, or fails with a ProbeError naming a stage."
    },
    {
      "id": "P5",
      "target": "tests/src/server/Probe.test.ts:184,231 'bounds a type warm, spends replacements, and recovers for a later prove'",
      "classification": "(a)",
      "change": "Replace Promise.race([failed.promise, waitForDelay(8_000)]) with waitForEvent on 'error', with a budget of (PROBE_RESTARTS + 1) × (warm + the type disposal bound, which is the deadline). Derive the case timeout from that budget plus the healthy boot and proof under the product bounds.",
      "proof": "Remove PROBE_RESTARTS enforcement: the warm count assertion still goes red. Quiet and loaded runs pass."
    },
    {
      "id": "P6",
      "target": "tests/src/server/Probe.test.ts:252 'reports a failed type warm even when its automatic replacement has armed'",
      "classification": "(a)",
      "change": "Derive the timeout from PROBE_WARM plus the boot and proof inspections under PROBE_DEADLINE. Replace the bare `armed.promise` wait with waitForEvent with a description and a budget, so a refused arm is named.",
      "proof": "Green quiet at the same duration. A refused arm reports its description."
    },
    {
      "id": "P7",
      "target": "tests/src/server/Probe.test.ts:316,347,375 'consumes a failed type refill at the queued call and serves the next claim'",
      "classification": "(a)",
      "change": "Same split as P3: the 3_000 deadline also bounds the boot inspections. Size `deadline` from a contended boot measurement, and keep the held-inspection wait derived from it. Make the 'healthy probe arm' budget smaller than the case timeout, so it fails with its description.",
      "proof": "The expired/queued pins are unchanged. Green quiet and loaded."
    },
    {
      "id": "P8",
      "target": "tests/src/server/Probe.test.ts:471-474 'defers construction, joins onset, and refuses start after teardown'",
      "classification": "(a)",
      "change": "Delete the quiet-host '6 s' comment. Derive the timeout from PROBE_WARM plus the boot control inspections under PROBE_DEADLINE, plus the teardown bounds, LINT_TEARDOWN included.",
      "proof": "Green quiet at the same duration."
    },
    {
      "id": "P9",
      "target": "tests/src/server/Probe.test.ts:573 'recovers an idle lint exit and serves after an exit during a claim'",
      "classification": "(a)",
      "change": "Derive the 30_000 timeout from the boot, the lint replacement warm under the deadline, and three proofs under PROBE_DEADLINE. The 3_000 'idle lint replacement' budget waits on a spawn that the lint warm deadline bounds, so derive it from that deadline instead.",
      "proof": "Green quiet and loaded."
    },
    {
      "id": "P10",
      "target": "tests/src/server/Probe.test.ts:626,640 'spends the floor on used idle loss and restores it through start without a failed claim'",
      "classification": "(a)",
      "change": "Replace the bare arm promise with waitForEvent with a description and a budget derived from PROBE_WARM plus the boot inspections. Derive the 3_000 budgets from LINT_DEADLINE and LINT_TEARDOWN, which they wait on. Derive the case timeout from those bounds.",
      "proof": "The spawn count pin is unchanged. Green quiet and loaded."
    },
    {
      "id": "P11",
      "target": "tests/src/server/Probe.test.ts:701 'spends failed warms, unwraps their refusal, and rearms after repair'",
      "classification": "(a)",
      "change": "Derive the timeout as (PROBE_RESTARTS + 1) × (LINT_DEADLINE + LINT_TEARDOWN) plus one real boot and proof, the way 508-512 already derives from LINT_TEARDOWN.",
      "proof": "Green quiet and loaded. The spawn count pin is unchanged."
    },
    {
      "id": "P12",
      "target": "tests/src/server/stages/RuntimeStage.test.ts:1298 'recycles the resident runner after 64 written specifications...'",
      "classification": "(a)",
      "change": "Do not add a retry. Either move this expensive proof (65 real Vitest runs) into an isolated project with its own timeout (tests.md:164-170), or size the 60_000 budget from a full contended run measured with the host's load and recorded beside it (tests.md:175). PROBE_SPECIFICATIONS fixes the run count, so the cost cannot shrink without weakening the pin.",
      "proof": "A duration census of this case, quiet and contended, recorded with the load. Green under a contended full run."
    }
  ],
  "risks": "Opinion. Deriving a hang guard from product bounds (PROBE_WARM is 90 s) lengthens only a failing run; a green run costs the same. This does not hide a failure, because the product's own deadline answers first and carries the diagnostic. Even so, a reviewer has to check each derived budget against the bound it waits on, so that no derived budget falls below or merely approximates that bound. Case 1 cannot be classified without a rerun that captures the frame. If the cause is LINT_DEADLINE, then a 2 s bound sized from a quiet 155 ms measurement refusing the whole server onset is a product question (c vs d), not a test question. P3 and P7 raise a fixed waitForDelay along with the deadline, which is the cost of pinning 'beyond the deadline'. 85% sustained load from 14 spinning threads plus Vitest's own pool goes beyond what a release layer produces, so making the suite green under that load is not required. The target is a full contended run: probe's suite plus one sibling layer member's gates. Under this load, the policy, config, setup, and guides projects were never exercised. The quiet guides receipt failure (Oxlint 1.86.0 vs 1.87.0) blocks a release on its own. Read-only: nothing was run or edited."
}
```
