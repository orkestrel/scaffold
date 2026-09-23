# J-SEED audit round 1 — the subjective lane's verdict (returned 2026-09-23 by `reviewer` on Opus 5.5, native, read-only; the alias served `claude-opus-5-5[1m]`; retained verbatim from the subagent's final message)

---

Subjective lane: `reviewer`, served by Opus 5.5 (`claude-opus-5-5[1m]`).

## Verdicts

1. **CONFIRMED.** The only writes in `apply` are the `setAttribute` and `setItem` calls. A guard, `if (this.#original === undefined) return`, now sits before both, at `C:/Users/mikes/WebstormProjects/veneer-seed/src/browser/ColorMode.ts:49`. The `destroy` method sets `#original` to `undefined` at line 66, so every later `apply` returns before writing.
   - **Attack: can the guard block construction?** No. The constructor calls `apply` (line 37) only after line 35 sets `#original` from `getAttribute`, which returns `string | null` and never `undefined`. An empty attribute value is `''`, so it doesn't trip the guard either.
   - **Attack: are both root shapes covered?** Yes. The case at test line 157 uses a root that carried `light`. The case at line 180 uses a root that carried nothing. Both supply `sessionStorage`. Each asserts the attribute and storage after `apply('dark')` (lines 166–167 and 188–189). The unguarded source would write `dark` to both.
   - **Attack: a guard mis-spelled as `!this.#original` or `== null`.** Either version would also block `apply` on a root with no attribute (`null`) before `destroy`. Line 186 would then read `null` instead of `'light'`, so the no-attribute case catches it.
   - These cases are in the file the Orchestrator ran green (`14 passed (14)`).

2. **CONFIRMED.** The guard at line 57 returns `this.mode`, and the `mode` getter (line 45) returns `dark` for a `dark` attribute and `light` otherwise.
   - **Attack: a constant return.** A toggle that returns `'light'` after `destroy` passes lines 168 and 190. It fails line 174, which expects `dark` after another owner writes `dark` at line 173.
   - **Attack: a hidden write after the other owner's change.** The test calls a second `destroy` and then asserts the root still reads `dark` and storage still reads `light` (lines 176–177). A `toggle` that wrote either value would fail there.
   - **Attack: the flip returned without a write.** If the `toggle` guard is dropped, `toggle` returns the flipped `dark` while `apply` writes nothing. Lines 168 and 190 fail on that.

3. **CONFIRMED.**
   - **Unchanged before destruction.** Before `destroy`, `#original` is `string | null`, so neither new guard fires, and the `destroy` method's diff is empty.
   - **Existing cases untouched.** The test hunk starts at line 153 and only adds lines. The file has 12 earlier cases (lines 11, 26, 40, 51, 65, 76, 87, 98, 110, 125, 135, and 144) and 2 new ones. That matches the Orchestrator's own `14 passed (14)` run.
   - **Second `destroy`.** The guard in the unchanged `destroy` (line 65) still returns early.

4. **CONFIRMED, on the claim's headline property: no write path survives destruction.**
   - **Where the writes are.** The writes are at lines 50–51 in `apply` (guarded at line 49) and lines 67–68 in `destroy` (guarded by the local `original` check at line 65). The constructor and `toggle` write only through `apply`, and `toggle` has its own guard too.
   - **Literal wording.** Read word for word, the claim is false. The restoring writes at lines 67–68 run after line 66 has already set `#original` to `undefined`. Those writes are the act of destruction, not a write that survives it, so the property holds. I ruled on the property, and the wording is referred (Referral A).
   - **Attack: a second flag.** None was added. The field comment at lines 25–29 names `undefined` as the destroyed state, which follows the AGENTS.md rule to derive state rather than store it.
   - **Remaining checks.** The diff adds no `any`, no `as`, no `!`, no `public`, `private`, or `protected` keyword, and no import (imports at lines 1–3 are unchanged).
   - **Design attack: why two guards?** Guarding `toggle` separately is required. With only the `apply` guard, `toggle` would return a mode it never wrote. The report's deviation note says the same.

5. **UNRESOLVED.**
   - **What is report-only.** The only evidence for the red run on the inherited source (`2 failed | 12 passed (14)`) and for the four mutation runs is the writer's report. The Orchestrator's own run covers only the green state.
   - **Source derivation agrees on every point.** This is a reading, not a run:
     - Inherited source: the first failures land at lines 166 (`'dark'` vs `'light'`) and 188 (`true` vs `false`), matching the report's output.
     - Mutation A (no `apply` guard): lines 166 and 188.
     - Mutation B (no `toggle` guard): lines 168 and 190, each returning `'dark'`.
     - Mutation C (storage write moved before the guard): lines 167 and 189.
     - Mutation D (no early return in `destroy`): the second `destroy` runs `setAttribute(…, undefined)` and writes the string `"undefined"`. Lines 176 and 194 fail in the new cases, and lines 107 and 154 fail in the existing cases, giving `4 failed | 10 passed`. The case at line 65 has no assertion after its second `destroy`, so it passes.
   - **Extra mutation.** Deleting line 66 (so `#original` is never cleared) also fails line 166, so the key link between `destroy` and the guards is pinned.
   - **What settles it.** The Orchestrator runs `npm run test:src:browser -- tests/src/browser/ColorMode.test.ts` in `C:/Users/mikes/WebstormProjects/veneer-seed` five times, each under a temporary edit to `src/browser/ColorMode.ts` that is undone as that exact edit:
     - the file's hunks reversed, expecting `2 failed | 12 passed (14)` with failures at lines 166 and 188;
     - mutations A to D in turn, expecting the counts and first-failing lines listed above.

6. **CONFIRMED.**
   - **Attack: dirty storage at entry.** Suppose a previous case left `color-mode=dark` in storage. Construction applies `dark`, and each new case's own `apply('light')` then sets storage to `light` before any assertion reads it. `destroy` restores the original `light` attribute at line 163 and removes the attribute at line 185. Every assertion still holds.
   - **Attack: leaked state into other cases.** The `afterEach` at lines 5–8 clears `sessionStorage`. Neither new case touches `document.documentElement`. Each uses its own element from `build`, and no other case reads it.

7. **CONFIRMED.**
   - **Scope.** `j-seed-status.txt` lists exactly `guides/veneer.md`, `src/browser/ColorMode.ts`, and `tests/src/browser/ColorMode.test.ts`. `src/browser/types.ts` is absent from it.
   - **Guide edit.** The guide hunk (lines 45–53 of the diff) rewrites only the sentence beginning "Destruction writes that construction reading back". The following "Storage operations…" sentence is re-wrapped but its text is unchanged.
   - **Parity.** The class description paragraph (`ColorMode.ts:6`) is unchanged and still equals the guide's `ColorMode` Summary cell (`guides/veneer.md:19`). The edit sits in `@remarks`, which parity doesn't compare, and the `@example` is unchanged. The `ColorModeInterface` method table (`guides/veneer.md:78–82`) is unchanged.
   - **Attack: a moved or added file.** The status shows only ` M` rows.

## Findings outside the claims

None.

Prose bounds, recorded as bounds per the claims file and not as findings:

- **B1: the `toggle` summary is now false after destruction, and no unit carries the fix.** `C:/Users/mikes/WebstormProjects/veneer-seed/src/browser/types.ts:20` and `guides/veneer.md:81` both still say "Flips the mode and returns the applied mode." A destroyed controller neither flips nor applies. The sibling `ButtonInterface.toggle` summary (`types.ts:53`, `guides/veneer.md:88`) already states its post-destroy behaviour: "…or returns its state without writing after destruction." `j-types-brief.md` and `plan.md` contain no matching change. The brief put `types.ts` off-limits, which explains the gap, but the gap still needs a named carrier. J-TYPES owns the file.
- **B2: the word "live" means two things.** In the new `@remarks` (`ColorMode.ts:13`) "the root's live mode" means the attribute's current reading. In `ButtonInterface.toggle` "the live host" means not yet destroyed. The guide paragraph uses a third phrase, "the mode the root carries."
- **B3: the test titles misdescribe the behaviour.** The titles at test lines 157 and 180 say "toggles to the live mode", but after destruction `toggle` doesn't toggle. It returns the live mode.

## Attacked and held

- **Design attack: throw after destruction instead of returning.** Returning the root's mode without writing matches the Button controller's post-destroy `toggle` contract, keeps the `ColorModeState` return type honest, and adds no error vocabulary.
- **Design attack: a private `#live` getter or a separate flag instead of reading `#original`.** Either would be a second fact that can drift. The single field keeps state derived, and its comment names both roles.
- **Adjacent behaviour that looks like the defect and is correct:**
  - The `root` and `mode` getters still read the element after `destroy`, although the guide says destruction "releases the root". They are reads, not writes, and they predate this unit.
  - Mutation D's `setAttribute(…, undefined)` wouldn't typecheck, but a browser Vitest run executes it anyway. Its red result is real and not a harness artifact.

## Referrals

- **A (to the objective lane): claim 4's literal wording.** Claim 4 says every root or storage write "runs only while `#original` is not `undefined`". `ColorMode.ts` lines 67–68 run after line 66 sets it to `undefined`. Decide whether the claim is judged on its wording (false) or on its headline property (holds).
- **B (to the Orchestrator): claim 5's runs.** Take the five runs named under claim 5. They are the only way to move claim 5 from UNRESOLVED.

VERDICT: FAIL 5; outside the claims: none
