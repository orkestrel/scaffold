<!-- Retained from u7b-audit-analyst-last.md. Subjective lane (lane swap: Astra wrote the unit): analyst on Astra, codex exec read-only -C scaffold, journal u7b-audit-analyst.jsonl, thread 01a0c1e6-ae31-7990-bb73-08b663921993, exit 0, 2026-09-21. -->

This is a subjective source review with recorded browser-run evidence. I ran a read-only `AppError` source check; I did not rerun browser gates. Paths below are relative to Veneer unless marked Scaffold.

1. **CONFIRMED.** The positional host, optional hooks, flat class placement, and class-private ownership match the design. `src/browser/Button.ts:22` holds the static `WeakSet`; `:35` implements the distinct `AppError` refusals; `:51` snapshots state and binds signal-controlled hooks. Ownership belongs inside the class, not exported from constants.

2. **REFUTED — forces a test fix round.** The implementation writes class, attribute, then event at `src/browser/Button.ts:68`. However, [the mutation-order case](C:/Users/mikes/WebstormProjects/veneer/tests/src/browser/Button.test.ts:43) observes only `build('button')`. No anchor receives a `MutationObserver` anywhere in `tests/src/browser`. The anchor assertions inspect resulting state, not mutation order. **Failure scenario:** an anchor-specific ordering regression lacks the claimed assertion. Add the anchor ordering case. `tmp/u7b/verification.log.txt:28` and `:74` corroborate the existing native-host control failing and passing after restoration.

3. **CONFIRMED.** The event shape and lifecycle fit the agreed consumer contract. `src/browser/helpers.ts:18` fixes bubbling and non-cancelability; `Button.ts:74` aborts hooks, restores only managed state, and releases ownership. `tests/src/browser/Button.test.ts:69`, `:102`, `:122`, `:140`, `:158`, `:193`, and `:206` cover the stated lifecycle scenarios. Returning the completed toggle result despite destruction during dispatch matches the retained decision.

4. **CONFIRMED.** `src/browser/Delegate.ts:31`, `:42`, and `:50` implement root registration, teardown, containment, cancellation, disabled refusal, and engine reuse. The private retention set supports destruction after hosts leave the root. `tests/src/browser/Delegate.test.ts:8`, `:37`, `:48`, `:67`, `:80`, `:97`, `:137`, and `:155` cover the claimed scenarios. `tmp/u7b/verification.log.txt:92` and `:128` corroborate the leak control and restoration.

5. **CONFIRMED.** Registration occurs in `Delegate` construction, not module initialization (`src/browser/Delegate.ts:33`). `tests/src/browser/index.test.ts:5` checks import registration, and `:28` supplies the imported-listener control. `tests/src/browser/Delegate.test.ts:113` asserts the root registration.

6. **CONFIRMED.** `emitEvent` and `bindEventMap` accurately name dispatch and subscription binding under the helper naming rules. Their implementations add event-policy and typed-hook boundaries rather than rename-only wrappers (`src/browser/helpers.ts:17`, `:33`). `tests/src/browser/helpers.test.ts:8`, `:31`, and `:45` cover dispatch, release, and malformed-event refusal.

7. **CONFIRMED.** The guards contain prototype and payload access inside their exception boundaries (`src/browser/validators.ts:28`, `:46`). Hostile-prototype and throwing-accessor cases exist at `tests/src/browser/validators.test.ts:19` and `:61`.

8. **CONFIRMED.** `src/core/errors.ts:9` supplies the specified error shape, native cause forwarding, and total narrower; `src/core/index.ts:2` exports them. The read-only source execution exited `0`, checking fields, inheritance, cause, absent context, and guard refusals. Browser refusal assertions use the guard and distinct codes at `tests/src/browser/Button.test.ts:158`. The source contains no `TypeError` throw.

9. **CONFIRMED.** `src/browser/types.ts:27` declares the agreed readonly contracts and single-word members. `constants.ts:8` fixes the wire name separately from the `toggle` hook. The classes use runtime-private fields without accessibility keywords or parameter properties.

10. **CONFIRMED.** `src/browser/index.ts:1` contains precisely the claimed star exports. The supplied diff and status contain no manifest or configuration change. The live browser directory contains no auto entry or adapter; the prohibited Bootstrap method spellings are absent from `src`.

11. **CONFIRMED.** `tests/src/browser/index.test.ts:11` asserts the claimed runtime export set. `tests/src/core/index.test.ts:19` and `:29` include `AppError` and `isAppError`. The rendered diff preserves existing test subjects.

12. **CONFIRMED.** Scaffold’s `tmp/audit/u7b-status.txt` stays within the effective brief’s ownership. The added declarations follow placement, export, callback, and assertion rules. The inspected helpers add DOM dispatch and hook-binding semantics absent from the installed Test and Contract exports. Handwritten domain guards follow the explicit retained ruling against adding a runtime dependency. No control residue or skipped case remains in the changed tests.

13. **UNDECIDABLE — does not itself require an implementation fix.** The reports and original logs record successful gates. This claim expressly assigns the authoritative reading to the verifier lane; that lane’s result was not supplied. Its host run must settle this claim.

No additional implementation finding.

Verdict: fix round with claim 2