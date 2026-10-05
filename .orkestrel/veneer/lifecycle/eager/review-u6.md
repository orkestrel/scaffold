# U6 review of probe's eager start (probe `dee8845..23ddcea`, unpushed), Opus 5.5 reviewer, 2026-10-05

Objective lane: the contract and the risky seams. Terminal: **FAIL**. 3 REFUTED, 9 CONFIRMED, 1 assertion that cannot fail, 2 referrals.

## Seams

1. **`#dispose` branches:** CONFIRMED in code (`Probe.ts:611-631`).
   - A failed-warm survivor refuses lint creation before anything spawns (`:567-575`), and is retained (`:602`).
   - REFUTED: teardown makes no second kill. `LintStage.destroy` memoizes `#closing` (`LintStage.ts:108-111`). Referred.
   - Gap: under a short `deadline`, the deadline branch abandons lint disposal first, and the L-3 `timeout` branch becomes unreachable. Referred.
2. **`exit` against `#translate`:** CONFIRMED.
3. **Acquire before await:** CONFIRMED.
4. **`release` against `token.destroy()`:** CONFIRMED. No lease is held without a holder.
5. **The spent-floor kick:** CONFIRMED.
6. **Teardown during the boot and the type warm:** CONFIRMED.
7. **The handshake:** CONFIRMED. `createHandshakeError` carries `{ origin, code }`. The listener detach is untestable, because no legacy client cancels `initialize`.
8. **`Probe.start()` rejects only with `ProbeError`:** CONFIRMED.
9. **Unobserved promises:** CONFIRMED.
10. **The warm bound:** REFUTED after arm. A type refill failure leaves `#refusal` set (`Probe.ts:596`), and a later healthy `prove` is refused with that stale cause (`:540-544`).
11. **The guide:** partly REFUTED.
    - "A failed type warm reaches the next call" is false after arm.
    - `types.ts:395` and `ProbeServer.ts:35` still say "full arm".
12. **Tests:**
    - The `arm-` assertion at `Probe.test.ts:678-682` cannot fail.
    - No case covers the after-arm refusal.
    - The remaining `NOT-EVIDENCED` branches need a child that survives a kill, or a cancelled `initialize`.

## Rulings on the referrals (the Orchestrator, 2026-10-05)

- **Survivors at teardown:** the ruling is reworded. Teardown re-reads and reports; it makes no second kill.
- **Lint disposal:** bounded by the larger of `deadline` and the lint teardown bound (`probe-design.md`, L-3, "Added after U6").

Both rulings are recorded in `probe-design.md`. Repair unit: `eager-probe-u6fix` (probe `tmp/codex/eager-probe-u6fix-brief.md`).
