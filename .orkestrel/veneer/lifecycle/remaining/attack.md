# attack

**Verdict:** most proposals stand. Corrections are needed to probe P1, P3, P10, P11 and P12, to mcp-13's spec reading and P1, and to mcp-14 P3. I read code and logs only. Nothing was run or edited.

## probe-load

- **P1: corrected.**
  - **Fact:** the test reads `frames[0]`, which is the first line to arrive, not the reply to id 1 (main.test.ts:779-782). `indexFrames` already exists for that (:125).
  - **Fact:** the server's refusal line on stderr has no "Error" in it (compare the expected line at :1454-1455). Line 780 therefore passed, and stderr was captured but never printed.
  - **Fact:** the handshake waits on `#starting` (ProbeServer.ts:155), which waits on the lint and runtime warms (Probe.ts:237, 265). Both warms are bounded by `PROBE_DEADLINE` (Probe.ts:584).
  - **Fact:** `PROBE_DEADLINE` has no sizing record at all (constants.ts:86-98). So the claim that `LINT_DEADLINE` is "the only bound sized without contention headroom" is false. The cause is either bound.
  - **Corrected proposal:** assert on `indexFrames(frames).get(1)` with the frame and the stderr text as the message. Rule on no bound until a loaded rerun names it.
- **P2: confirmed, with a correction.** Derive the 15 s wait and the 25 s case timeout from the bounds that call crosses:
  - the type warm, which runs at the same time as the lint and runtime warms;
  - one replacement warm each, because `PROBE_RESTARTS` is 1;
  - each boot and proof inspection under `PROBE_DEADLINE`.

  Line 1441 must print the frame, or a product refusal reads as `undefined`.
- **P3 and P7: confirmed, with additions.**
  - The `deadline: 3_000` value also bounds the lint and runtime warms (Probe.ts:584), so it does three jobs, not two.
  - P3 must also raise `warm` (:95) above the new deadline plus the hold. Otherwise its breaking edit cannot go red.
  - Cost: every green run pays the larger hold.
- **P4: confirmed.**
- **P5: confirmed.** :231 breaks tests.md:226. The disposal bound is the deadline (Probe.ts:618).
- **P6: confirmed.** Also convert `armed` (:280) to `waitForEvent`, because tests.md:235 counts a hand-built deferred on an event as a defect.
- **P8: confirmed, with an addition.** The same deferred defect is at :479.
- **P9: confirmed.**
- **P10: corrected.**
  - **Missed:** `waitForDelay(50)` at :662 waits for a refusal that another process produces, which tests.md:226 forbids. Replace it with a wait on the event.
  - **Missed:** :640 is a hand-built deferred that never unsubscribes.
  - The budget for the exit at :649 is `LINT_DEADLINE + max(deadline, LINT_TEARDOWN)`, not `LINT_TEARDOWN`.
- **P11: corrected.** The lint disposal bound is `max(this.#deadline, LINT_TEARDOWN)`, which is 30 s at the default (Probe.ts:618). The proposed formula undercounts by 14 s per spent warm. Lines 508-512 use `LINT_TEARDOWN` only because that case sets `deadline: 500`.
- **P12: corrected.** "Cannot shrink" is false. An injected specification limit on `RuntimeStage` (constructor at :132) would shrink the 65-run cost. That is a public contract change, because the class is exported (src/server/index.ts:9), so it needs the user's ruling.

  Recommend the tests.md:175 measured budget now. All twelve cases spawn processes, so tests.md:164-175 governs every one of them.

## mcp-13

- **Spec reading: partly refuted.**
  - **Confirmed:** pings are allowed before the `initialize` response (Lifecycle). The receiver must answer "promptly with an empty response" (Ping).
  - **Omitted:** for servers that require a session id, the transport page says they should answer requests without `MCP-Session-Id`, other than initialization, with 400.
  - So the spec does not require the session layer to answer. Answering `{}` is a ruling that departs from that 400 recommendation. My opinion: honor the ping requirement, because a client cannot hold a session id before the `InitializeResult`. Record the departure in the guide.
- **P1: corrected.**
  - As written, the guard returns true for a modern-shaped ping, which contradicts its own proof.
  - Build it from `isJSONRPCRequest` (validators.ts:2175) plus `method === 'ping'`.
  - Drop the modern-shaped false case, or add `!isModernRequest`.
- **P2: confirmed.** inferers.ts:96-97 and handlers.ts:184-196 match. The ping reaches `MCPLegacy`, which answers `{}` unconditionally (MCPLegacy.ts:176-177).
- **P3: confirmed as a design choice.** The pass-through skips the state write, header supply, and stamp (middlewares.ts:198-234). It now rests on a ruling, not on a spec requirement.
- **P4: confirmed.** Add the departure note.
- **P5: confirmed.** The project is `src:server` (vite.config.ts:248). The breaking-edit split holds.
  - **Unverified:** the claim "fails as a status, not a timeout" assumes the ping is not queued behind the pending `initialize`.

## mcp-14

- **F1-F6: confirmed.** The elimination down to :1164 holds, and the round-1 selector runs before :1312.
  - One fix to F4: the post-selector half is always safe, not "by about 40 ms", because 60 > ttl.
- **P3: refuted, and it becomes the fix.**
  - **Fact:** the package already ships a clock seam, `clock?: () => number` (src/server/types.ts:179, 215).
  - **Fact:** it already has a manual clock helper for tests, `createManualClock`, documented "so idle-TTL eviction is deterministic under any suite load" (tests/setup.ts:1292-1310).
  - **Fact:** tests.md:319-320 sanctions an injected collaborator, and says to add the seam where a sibling collaborator is already injected. Here `continuation` is that sibling.
  - The no-fake-clock law forbids replacing the host clock, not injecting one.
  - **Corrected proposal:** add `clock` to `MCPInputOptions` (types.ts:785-796), defaulting to `Date.now`, and read it at MCPServer.ts:1164, 1210, 1305, 1312 and 1360. In the case, the round-2 selector advances the clock past the expiry.
  - **Proof:** green with no real timers. Removing :1210 turns it red. This is a medium change, so one review pass.
- **P2: superseded by P3.** Keep it only if the seam is rejected. In that case, size the ttl by tests.md:28.
- **P1: unneeded after P3.**
- **P4: confirmed** as the record of the failure before the fix (failing command and count).
- **P5: confirmed.** The ttl-25 cases pass without reaching the reseal (same wording at :1171-1175). Add the `sealed` length pin. Convert :5259-5315 to the manual clock as well, which makes the pin deterministic.

## Ordered plan

**probe:**
1. P1 diagnostic, then a loaded rerun that names the bound.
2. Rule on `LINT_DEADLINE`/`PROBE_DEADLINE` from that rerun, with a contended measurement if either changes.
3. The P5, P6, P8 and P10 wait fixes (tests.md:226 and :235).
4. The P2-P11 budget derivations with the corrected formulas.
5. P12: measured budget; seam only on the user's ruling.
6. Fix the guides receipt drift (Oxlint 1.86.0 vs 1.87.0). It blocks a release on its own (suite-quiet.err:17).
7. Gates.

**mcp:**
1. Item 14: record the failure first (P4), then the P3 seam with its types first, then the cases migrated to it, then the P5 pin.
2. Item 13: P1, P2, P3, then P5 red before the fix and green after, then P4 guide.
3. A separate roadmap item for the 404-vs-400 response to a request with no session header (middlewares.ts:195).
