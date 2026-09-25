J-ORACLE-FIX-OFFCANVAS rounds 3 to 5 — subjective lane verdict (reviewer on Opus 5.5)

# J-ORACLE-FIX-OFFCANVAS rounds 3 to 5: subjective-lane verdict (`reviewer` on Opus 5.5)

I held the subjective lane, as the brief assigns, and ruled claims 2, 3, 6, and 8 from the design-fit side. Every path is under `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-fix-offcanvas/`, read at `88d06f4`.

**Result:** claims 2, 3, and 8 hold. Claim 6 fails: the guide carries four false sentences, one counting sentence, and a paragraph filed in the wrong section. The code's shape and names fit the project.

## Per-claim verdicts

| # | Claim | Verdict | Evidence |
|---|---|---|---|
| 2 | `holdsFocus(element)` | CONFIRMED | **Behaviour:** `src/browser/helpers.ts:476-480` reads the element's own root and compares its `activeElement` with the element. The remarks at `helpers.ts:465-469` state the shadow-host reading.<br>**Name:** `holdsFocus` follows the `{verb}{Noun}` predicate form that `names.md` § Standalone helpers shows with `belongsTo` and `hasMany`. `isFocused` would suggest a `Guard<T>`. `matches*` would suggest the `:focus` selector, which is a different mechanism. `hasFocus` would clash with the platform's `document.hasFocus()`, which means the window has focus.<br>**Home:** `helpers.ts` is correct for a pure leaf over a live host object. It sits between `readOutermost` and `matchesDisabled`, and its Surface row (`guides/veneer.md:90`) follows the same order. The press is its first consumer.<br>**Does the host reading mislead a caller?** No. It matches the platform's own `:focus` meaning for a shadow host, and the remarks name it. For the press it produces the fallback-H behaviour, which the guide documents and which ends in Bootstrap's final state.<br>**Mutations:**<br>- Reading the document's `activeElement`: `helpers.test.ts:991` and `:1007` go red (`button` reads `false`). The assertions tell it apart.<br>- Treating any connected element as focused: `:978` goes red (`other` reads `true`). Told apart.<br>- Excluding shadow hosts: `:1025` goes red (`host: true` is expected). Told apart.<br>- Dropping the `root === scope` conjunct: every case stays green. See design-fit finding D1. |
| 3 | `IsolationInterface.trigger` | CONFIRMED | **Behaviour:** `src/browser/Isolation.ts:78-79` stores the value and `:125-127` returns it. `src/browser/types.ts:484-485` declares it.<br>**Name:** `trigger` is one bare noun, and it is the same term the `IsolationOptions.trigger` option (`types.ts:473`) and the `show(trigger)` parameter use.<br>**Mutations** (test at `tests/src/browser/Isolation.test.ts:151`):<br>- A getter that reads focus at access time returns `before` instead of `sibling`. Told apart.<br>- Dropping the fallback yields `undefined`. Told apart.<br>- A fallback that reads the deepest focused element returns `shadowed` instead of `shadowHost`. Told apart. |
| 6 | The prose is true and states the limits | FAIL | Four sentences are false or conditioned wrongly, and one counting sentence breaks a writing rule: P1 to P4 in the next section. The `#### IsolationInterface` paragraph is in the wrong section: P5. |
| 8 | Removal and scope | CONFIRMED | A search of the worktree outside `tmp/` finds no `readFocusedElement`. `j-oracle-fix-offcanvas-5-status.txt` lists the nine paths. The diff at `-5.diff:931-951` swaps the export list, and no alias or re-export remains. |

**The press shape (`src/browser/Offcanvas.ts:591-595`).** `released` is derived from the field, not stored. `trigger` is read from the isolation. The condition is one line and matches the design verdict's rule. I retain it.

## Defects with the smallest fix

**P1.** In `guides/veneer.md:2631-2632`, the default action "moves focus off the trigger". That is false for the prevented, unfocusable, redirected, and static rows. In each of those, focus sits on the panel before the press, not on the trigger (`tests/src/browser/Offcanvas.test.ts:861`: `before: row === 'sliding' ? opener : host`).
- **Fix:** write "which moves focus to the nearest focusable element containing the backdrop, or to the body when none does".

**P2.** In `guides/veneer.md:2633-2634`, the example "or one a hide listener's focus move leaves behind" describes a case that does not happen on its own. The `hide.vn.offcanvas` event is dispatched at `Offcanvas.ts:357`, before the isolation is destroyed at `:370-372`. So the isolation's return overrides the listener's move whenever the trigger can take focus. The tested row removes the trigger first, and the test title says so accurately (`Offcanvas.test.ts:816`, "a listener that moves focus after the trigger is removed").
- **Fix:** replace the example with "such as a trigger the platform cannot focus, one removed before the press included".

**P3.** `guides/veneer.md:2637` says "The press rule has two limits." This is a count, which `AGENTS.md` § Writing forbids. The same paragraph also ends at `:2645` with "the isolation's limit, not the press's", which contradicts it. `guides/veneer.md:2827` says "§ Offcanvas states both limits.", and that sentence does not name the limits, so "both" counts too.
- **Fix:** delete the sentence at `:2637` and open the paragraph with "The press reads focus once, when its hide returns." Introduce the fallback part with "The isolation's fallback trigger also reaches the press." At `:2827`, write "§ Offcanvas states these limits."

**P4.** At `guides/veneer.md:2825-2827`, "A panel shown without a trigger while focus sat inside a shadow root … the press keeps focus inside that host until the panel's visibility turns `hidden`" is true only when that host's shadow tree also holds the panel.
- **Smallest counter-input** (my reading of the source, not a run): the panel is in the light tree, focus is on a button inside the open shadow root of a sibling `div` without `delegatesFocus`, `show()` is called with no argument, and the backdrop is pressed. `host.focus()` does nothing, `holdsFocus` reads `false`, the press keeps its default action, and focus ends on the body. With `delegatesFocus`, focus moves into the host and stays there after the panel hides.
- **Where it also appears:** `Offcanvas.ts:68-72` and `guides/veneer.md:2641-2645` only imply the condition, through "the panel inside it included".
- **Fix:** state "when that host's shadow tree also holds the panel" at all three sites. Add "that holds the panel" to the test title at `Offcanvas.test.ts:1067`.

**P5.** At `guides/veneer.md:388-397`, `#### IsolationInterface` is the only `####` section under § Methods that carries prose. `.claude/rules/documentation.md` gives that section one method table per interface. The paragraph also restates the press rule a third time, and the copies already disagree (P4).
- **Where the `trigger` text belongs:** the § Modal `Isolation` bullet at `guides/veneer.md:2202-2204` teaches the class. That bullet's "or else the element that held focus at construction" is itself false when focus sat inside a shadow root: the isolation records the host. The writer flagged this in `j-oracle-fix-offcanvas-report-5.md:172`, and the file was in the unit's scope.
- **Fix:**
  1. Delete the paragraph so the section is only its methods table.
  2. In the `:2202` bullet, correct the fallback sentence and add the `trigger` property there.
  3. Point from that bullet to § Offcanvas for the press.

**D1 (a simplification, not a failed claim).** In `src/browser/helpers.ts:479`, the `root === scope` conjunct cannot change the result. In the shadow-root branch `scope` is `root`. In the document branch, a document never reports a node outside its own tree as its `activeElement`. No case reddens when the conjunct is dropped (`helpers.test.ts:1041`).
- **Fix:** `return scope.activeElement === element`. The objective lane can confirm this with the mutation.

## Referrals to the objective lane

- **Claim 5, `holdsFocus` against `trigger.matches(':focus')`.** The helper is worth exporting only if the two differ; if they are the same, it wraps a platform primitive. The one row where they plausibly differ, a page without system focus, was not measured (`j-oracle-fix-offcanvas-report-5.md:31`). Settle whether Chromium's `:focus` stops matching while `activeElement` still reports the element. If it does, add one remarks sentence naming the difference. If it does not, replace the helper with `matches(':focus')` and remove the export.
- **P4's counter-input.** Run it to confirm the source reading.

VERDICT: FAIL 6
