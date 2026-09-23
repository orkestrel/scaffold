# CONTRACT-ISINSTANCE — the campaign plan (2026-09-23)

## What the folder holds

This folder is the Orchestrator's record of one bounded campaign on `@orkestrel/contract` (the checkout `C:/Users/mikes/WebstormProjects/contract`, `main` at `743e4a3`, version 0.0.17 published), opened at the user's instruction during the Veneer engine session: fix the `isInstance` guard's declared narrowing before the engine's implementation units start. `units/` holds every brief, report, verdict, probe, and gate log; the Veneer engine campaign's own records stay under `../veneer/engine/`.

## The defect

`isInstance<C>(value: unknown, ctor: C): value is InstanceType<C & AnyConstructor<object>>` (`src/core/validators.ts` around line 387) narrows `value` to `object` rather than to the constructor's instance type, because `InstanceType`'s `infer` over an intersection of construct signatures picks the intersected `AnyConstructor<object>` signature. The guide row already promises `InstanceType<C>`. Measured by the Orchestrator's probe (`units/contract-isinstance-probe.ts`, TypeScript 6.0.3): the published guard leaves `Element | null` at `Element` (`TS2740` on assignment to `HTMLElement`); the candidate `isInstance<C extends abstract new (...args: never) => object>(value: unknown, ctor: C): value is InstanceType<C>`, the constraint the package's own `instanceOf` combinator already carries, narrows to `HTMLElement`, an abstract class, a class with required constructor arguments, and `Date`, and refuses a non-constructor at the call (`TS2345`). Every fleet call site wraps the guard in an explicit `value is X` predicate or a boolean context (the Orchestrator's sweep of every package on disk), so the corrected narrowing breaks no consumer; the Veneer engine's binder unit is the first caller relying on the narrowing and works around it with `instanceOf(HTMLElement)(value)` until the fix publishes.

## Exit criterion

The campaign ends when: `@orkestrel/contract` publishes a version whose `isInstance` narrows to `InstanceType<C>` under the constraint, with a compile-time proof and the guide's row and prose true of it; Veneer re-pins to that version and its binder mechanisms call `isInstance(value, HTMLElement)` as E10 states; and the fleet's other consumers need no change (proved by the sweep and the reviewers, and by the typecheck of any consumer re-pinned in this session).

## Units and routing

| Unit | Role | Engine | Subject |
| --- | --- | --- | --- |
| ISINSTANCE round 1 | a Workflow: `grok` (read), three refuters on Opus 5.5 (lenses A, B, C), `scout` on Sonnet (sweep) | Cursor Grok, Opus 5.5, Sonnet | `units/isinstance-round-1-brief.md`; synthesis `units/isinstance-round-1-synthesis.md` |
| ISINSTANCE-FIX | `sol` | GPT-6 Astra (objective, constraint-heavy) | the signature, its comment, the compile-time proofs, the guide's row and prose; `units/isinstance-fix-brief.md` |
| ISINSTANCE-FIX audit | `reviewer` (subjective) and `checker`; the objective lane is `analyst` on Astra only where Astra did not write the unit, else `reviewer` holds the objective lane too | Opus 5.5, Sonnet | `units/isinstance-fix-audit-claims.md` |
| ISINSTANCE-FIX verify | `verifier` | Sonnet | the package's gate chain and `test:distribution` |
| ISINSTANCE release | the Orchestrator with the user's one-time code | — | version 0.0.18, `npm publish --otp=<code>`, the registry read back |
| VENEER re-pin | the Orchestrator (install) and a J-BINDER follow-up (the `isInstance` call sites) | Opus 5.5 | `^0.0.18` in Veneer, `instanceOf(HTMLElement)(x)` becomes `isInstance(x, HTMLElement)` |

## Baseline readings

At `743e4a3`, installed from the lockfile (`npm ci --ignore-scripts`, marker written): `npm run check` exits 0; `npm run test:src` passes 19 files, 1350 tests (`units/contract-baseline-gates.log.txt`).

## Coordination with the baseline session

The baseline session read this campaign at scaffold `07b2ff80` and recorded (its `779223fb`) that `@orkestrel/test` depends on `@orkestrel/contract` at runtime, so its T4 harness release follows contract in layer order: it carries the re-pin to `^0.0.18` when that version is on the registry at its release time, else a re-pin release follows; Veneer re-pins both packages in one commit where both are published, so it never installs two copies of contract, and the session landing second regenerates the lockfile with npm. This campaign therefore publishes 0.0.18 as soon as its audit passes, records the registry read-back here and in the engine plan's marker, and Veneer's re-pin waits for the test release only where that release is imminent at the re-pin.

## Landing procedure

The fix lands on the contract's `main` by a direct commit after the audit and the verifier chain (`npm run format:check`, `lint:check`, `check`, `build`, `test`, then `test:distribution`), the version bump in the same release commit as `orkestrel-publish` § Rule on the bump states for a runtime change to a published surface, the push, then the upload with the user's one-time code at the keyboard, then the registry read back. Veneer's re-pin follows in its own commit on Veneer `main`.
