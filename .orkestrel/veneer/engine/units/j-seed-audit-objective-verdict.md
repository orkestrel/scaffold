# J-SEED audit round 1 — the objective lane's verdict (returned 2026-09-23 by analyst on GPT-6 Astra, gpt-6-astra at high effort, read-only codex exec)

Thread `01a0cf16-e8cf-7150-a72b-6b00bc4c474b`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-seed-audit.jsonl` (launch copy under `tmp/codex/`); 34 commands; 167 s; usage {"input_tokens":492842,"cached_input_tokens":417664,"cache_write_input_tokens":0,"output_tokens":4296,"reasoning_output_tokens":1189}. Retained verbatim from the exec's last message.

---

1. **CONFIRMED** — Attacked restoration from an original attribute and from absence, followed by `apply('dark')` with storage supplied. The guard at [ColorMode.ts:49](C:/Users/mikes/WebstormProjects/veneer-seed/src/browser/ColorMode.ts:49) precedes the attribute and storage writes. Assertions at [ColorMode.test.ts:166](C:/Users/mikes/WebstormProjects/veneer-seed/tests/src/browser/ColorMode.test.ts:166) and line 188 cover those states. The Orchestrator’s established browser run passed.

2. **CONFIRMED** — Attacked a stale return value after another owner changes the restored root from `light` to `dark`. [ColorMode.ts:57](C:/Users/mikes/WebstormProjects/veneer-seed/src/browser/ColorMode.ts:57) returns the live getter without calling `apply`; the getter selects `dark` only for the exact attribute value. [ColorMode.test.ts:174](C:/Users/mikes/WebstormProjects/veneer-seed/tests/src/browser/ColorMode.test.ts:174) asserts the external owner’s mode. The established run passed.

3. **CONFIRMED** — Attacked accidental treatment of an absent original attribute as destruction, loss of restoration, and repeated destruction after an external write. Construction captures a string or `null`; the added guards reject only `undefined`. The original method bodies and pre-existing cases are unchanged in `j-seed.diff`. The Orchestrator’s established run includes those cases. [ColorMode.ts:35](C:/Users/mikes/WebstormProjects/veneer-seed/src/browser/ColorMode.ts:35), [ColorMode.test.ts:98](C:/Users/mikes/WebstormProjects/veneer-seed/tests/src/browser/ColorMode.test.ts:98).

4. **BROKEN** — The stated write-state invariant is false during ordinary destruction. With an original attribute, `destroy()` saves that value, assigns `#original = undefined` at [ColorMode.ts:66](C:/Users/mikes/WebstormProjects/veneer-seed/src/browser/ColorMode.ts:66), and then writes the root at line 68. An originally absent attribute reaches the removal at line 67 under the same state. This is required restoration, not a demonstrated post-return mutation defect. The smallest correct resolution is to bound the invariant to subsequent calls and exempt destruction’s restoration; moving the sentinel merely to satisfy this claim is unwarranted. The mechanical restrictions hold: the diff adds no flag, import, assertion, `any`, or accessibility modifier.

5. **UNRESOLVED** — The independent green run is established; the inherited-source failures and mutation runs are supported only by the unit’s report. Source inspection predicts that the assertions distinguish the reported mutations:

   - Removing the `apply` guard changes the attribute assertions at lines 166 and 188.
   - Removing the `toggle` guard changes the return assertions at lines 168 and 190.
   - Moving storage persistence before the `apply` guard changes the storage assertions at lines 167 and 189.
   - Removing the second-call guard in `destroy` changes the assertions at lines 176 and 194, and the existing repeated-destruction cases.

   To settle this, the Orchestrator must run `npm.cmd run test:src:browser -- tests/src/browser/ColorMode.test.ts` from `C:/Users/mikes/WebstormProjects/veneer-seed` against the inherited implementation with the added cases, then against each isolated mutation, restoring the repaired source between runs. Capture the failing assertion locations. No browser test was run in this sandbox.

6. **UNRESOLVED** — The storage fixture exists: [ColorMode.test.ts:5](C:/Users/mikes/WebstormProjects/veneer-seed/tests/src/browser/ColorMode.test.ts:5) registers an `afterEach` hook that clears `sessionStorage` and removes the document root’s theme attribute. Neither `tests/setup.ts` nor `tests/setupBrowser.ts` supplies storage cleanup. Other cases read the key, so isolation depends on the file’s hook.

   The negative control is to remove `sessionStorage.clear()` and place “restores a stored dark mode and preserves storage during destruction” immediately before “toggles, persists, and writes the light attribute.” The latter’s assertion at line 31 distinguishes leaked `dark`: construction restores it, so toggling returns `light` instead of the expected `dark`. To settle the execution claim, the Orchestrator must run `npm.cmd run test:src:browser -- tests/src/browser/ColorMode.test.ts` with that ordering and intact cleanup, repeat it, then run the cleanup mutation and capture the expected failure. Those order and rerun controls are not independently evidenced.

7. **CONFIRMED** — Attacked scope expansion through type edits, parity summaries, file creation, and moves. The supplied actual diff and independently established status restrict changes to the owned source, mirrored test, and Surface sentence. The class summary at [ColorMode.ts:6](C:/Users/mikes/WebstormProjects/veneer-seed/src/browser/ColorMode.ts:6), the interface, and the [method table](C:/Users/mikes/WebstormProjects/veneer-seed/guides/veneer.md:76) remain unchanged. No parity-compared surface moved.

Findings outside the claims: none.

**Attacked and held:** Claims 1–3 and 7 held against the attacks recorded above. Adjacent correct behavior: initial destruction restores the construction reading, including absence; subsequent calls preserve another owner’s changes. Destruction preserves the stored preference. The assertion evidence covers changed values; it does not independently measure redundant writes of identical values.

VERDICT: FAIL 4, 5, 6; outside the claims: none
