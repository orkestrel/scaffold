# J-ORACLE-FIX-OFFCANVAS-DESIGN — the subjective lane's proposal (planner on Opus 5.5, 2026-09-25; brief units/j-oracle-fix-offcanvas-design-brief.md)

I held the **subjective lane** (`planner` on Opus 5.5). All source citations are from the worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-fix-offcanvas` at `43fa73d`. I read no file whose name contains `proposal`.

## 1. The ruling

**Stop asking whether focus moved. Ask whether the isolation's trigger took focus.** Rounds 1 to 4 each read focus from the panel's side, and each scope had a boundary that hid something. The press needs one fact: did the release land focus on a known element? That element's own root answers exactly, whatever roots sit between it and the panel.

**Invariant.** A backdrop press cancels its `mousedown` default action exactly when both of these hold:
- its hide released the panel's isolation;
- the isolation's trigger took focus during that hide. Its own document or shadow root reads it as focused after the hide, and did not before.

**Limit on over-correction.** The press never protects focus the hide did not give the trigger. That covers a move somewhere else, a refused or prevented hide, a trigger that takes no focus, and a trigger that already had focus. Each of those presses keeps Bootstrap's default action.

**Where consumers meet it.**
- `IsolationInterface` gains `readonly trigger: HTMLElement | undefined`. It is the element that destruction returns focus to: the `trigger` option, or else the HTML element focused at construction.
- A new exported helper, `holdsFocus(element): boolean`, in `helpers.ts`. It checks whether the element is the focused element of its own document or shadow root.
- The § Offcanvas sentence in the guide.

**Shape of `#press`:**
```ts
const isolation = this.#isolation
const trigger = isolation?.trigger
const before = trigger !== undefined && holdsFocus(trigger)
void this.hide()
if (this.#isolation !== isolation && trigger !== undefined && !before && holdsFocus(trigger)) {
	event.preventDefault()
}
```

**Evidence at `43fa73d`:**
- `src/browser/Offcanvas.ts:580-590`: `#press` compares `readFocusedElement(scope)` from the panel's root. The rule replaces this.
- `Offcanvas.ts:352-359`: refusal and the `hide` dispatch come before any write. A prevented, refused, or superseded hide leaves `#isolation` untouched.
- `Offcanvas.ts:367-369`: the hide's first write clears `#isolation` and destroys the isolation. So "the isolation is no longer held" means exactly "this hide released it".
- `Offcanvas.ts:388`: the first `await`. Everything up to and including the release runs synchronously inside the listener.
- `Offcanvas.ts:325-340`: the isolation is constructed at the end of the show, with the show's `trigger`.
- `src/browser/Isolation.ts:46`, `:78-79`, `:132`: the stored trigger, its fallback (`ownerDocument.activeElement`), and `destroy` focusing it.
- `src/browser/types.ts:471-495`: `IsolationOptions.trigger` and `IsolationInterface`, which has no `trigger` member yet.
- `src/browser/Delegate.ts:957-962`: the data API passes the clicked trigger to `toggle` and focuses it again at `hidden`, as Bootstrap's data API does. The isolation's trigger and the data API's trigger are the same element.

**Why the trigger's own root and not `:focus` (candidate B as briefed).**
- `getRootNode()` returns the element's root whatever the shadow root's mode is. The `activeElement` of a closed root read through a held reference is already measured: in `units/j-oracle-fix-offcanvas-4-focusin-probe.log.txt`, the closed-root row reads `held` → `return`.
- `:focus` goes through the selector engine. I believe Chromium's `:focus` also requires the frame to be focused and active. If so, it reads `false` inside a `mousedown` listener in a frame that has not yet taken focus, such as an embedded demo. That belief is unverified, and the first probe measures it.
- A `holdsFocus` built on `activeElement` depends on neither question.

**Candidates refused:**
- **A (a state read or'd with `focusin`).** It keeps two mechanisms for one question and still leaves the closed-root move unseen. Worse, it answers "did anything move", which is the wrong question. Take a `hide.vn.offcanvas` listener that moves focus to X while the trigger cannot take focus. A detects the move, cancels, and keeps focus on X. Bootstrap's default action moves focus to the body, and its data API finds no visible trigger at `hidden`, so Bootstrap ends on the body.
- **C (always cancel a dismissing press).** It fails the guard rows at `tests/src/browser/Offcanvas.test.ts:843-849`:
  - `prevented`: the host keeps focus, where Bootstrap reads the body.
  - `unfocusable`: the host keeps focus at the press's return.
  - `sliding`: the opener keeps focus.
- **C with "cancel when the hide released the isolation".** It still fails `unfocusable`, and it fails the listener-moves-to-X row the same way A does.

## 2. Readings

**The placements the four rounds found.** In every row, the hide releases the isolation, and before the press the trigger does not hold focus.

| Placement | Trigger's root | After the hide | Press |
|---|---|---|---|
| Light tree (`:605`) | document | reads `opener` | cancels ✓ |
| Panel and trigger in one open shadow root (round 1's miss, `:663` open row) | that shadow root | reads the trigger | cancels ✓ |
| Panel and trigger in one closed shadow root (`:663` closed row) | the closed root, through `getRootNode()` | reads the trigger | cancels ✓ |
| Two open levels | the inner root | reads the trigger | cancels ✓ |
| Open shadow root the panel carries (round 2's miss, `:732`) | the panel's shadow root | reads the trigger | cancels ✓ |
| Closed shadow root the panel carries (round 3's miss) | the closed root | reads `return` (round-4 log) | cancels ✓; fixes round 3's `prevented: [[false]]` |
| Panel in a shadow root, light-tree trigger | document | reads `opener` (round-4 log) | cancels ✓ |
| Panel in a shadow root, focus on a light element outside it (round 3's miss) | document | reads `opener` (round-4 log) | cancels ✓; fixes round 3's `prevented: [[false]]` |

**The guard rows** (`:807`, expectations at `:843-849`):

| Guard row | Reading | Result |
|---|---|---|
| `prevented` | Not released: `#isolation` is unchanged. | Keeps the default, body ✓ |
| `unfocusable` | The removed trigger's root is itself, not a document or a shadow root. | Keeps the default, body ✓ |
| `sliding` | `#isolation` was already `undefined` from the earlier hide, and the hide is refused. | Keeps the default, body ✓ |
| `static` | The `#prevent` path runs and no hide starts. | Keeps the default, body ✓ |

**The two rows the brief asked about:**
- **A fallback trigger that is a shadow host H.** H reads as focused while focus is anywhere in its shadow tree, so the rule reads a change in that status. If H takes focus (focusable, or `delegatesFocus` entered from outside), the press cancels ✓. If H takes nothing, the press keeps its default and focus ends on the body. That is Bootstrap's end state for a show with no trigger, which has no data API return. If focus already sat in H's tree (for example, a panel inside H's shadow), "not before" fails, so the press keeps its default ✓. Only "did not before" makes this row correct, so the clause stays.
- **A hide listener that moves focus to X.** The release then focuses the trigger. The press cancels and focus ends on the trigger, which Bootstrap's data API also reaches at `hidden` ✓. If the trigger takes no focus, the press keeps its default and focus ends on the body, as Bootstrap's does ✓. A listener that focuses the trigger and then prevents the hide releases nothing, so the press keeps its default and focus ends on the body ✓.

## 3. The limits the rule states

- **Reduced-motion ordering.** Under reduced motion, the hide completes in the microtasks after the listener, before the default action runs. Any focus move made after the press's read is then undone by the default action when the press did not cancel. That covers a `hidden.vn.offcanvas` hook, and a consumer's listener to the trigger's own `focus` event that moves focus on.
  - Reachable through documented hooks, the reduced-motion preference, and a consumer's own DOM listeners.
  - With motion, the data API's refocus at `hidden` restores parity at settle.
  - This limit exists at `43fa73d` too, unstated.
- **A trigger that already holds focus.** The press keeps its default action.
  - When the trigger sits inside the panel, Bootstrap also ends on the body.
  - When the trigger sits outside a shadow root that holds the panel, the trigger can hold focus only because `Isolation` stops at the shadow boundary. With the data API under reduced motion, Bootstrap ends on the trigger and Veneer on the body. J-ISOLATION-SHADOW's inert walk removes this case.
- **A trigger inside the panel.** It keeps focus only until the panel's `visibility` turns `hidden`. This is the platform's rule, and guide lines 2618-2619 already state it.
- **A fallback trigger that is a shadow host.** When `show` gets no trigger and focus sits inside a shadow root, the isolation returns focus to that root's host, not to the element that held it. This is the isolation's limit, not the press rule's. J-ISOLATION-SHADOW owns it and narrows it for open roots. The press reads the host correctly either way.

## 4. The unit

**Role and engine.** `opus` on Opus 5.5, native, because its proofs launch Chromium (Bench law 5). Audit: `analyst` on Astra, cross-engine, and `reviewer` on Opus 5.5.

**First probe, run before any source edit.** Add `tmp/probe/holds-probe.sh`, which appends a block derived from `units/j-oracle-fix-offcanvas-4-focusin.block.ts.txt` at `43fa73d`.
- **Rows:** the round-4 probe's rows (its six placements and its two guard rows), plus these:
  - the trigger inside the panel with focus on it before the press;
  - a hide listener that focuses the trigger and then prevents the hide;
  - a hide listener that moves focus to `outer` after the trigger was removed;
  - fallback H, not focusable, with the panel inside H's shadow;
  - fallback H with `delegatesFocus`.
- **Readings around `void offcanvas.hide()`:** `trigger.getRootNode().activeElement === trigger` before and after, `trigger.matches(':focus')` before and after, `trigger.getRootNode()` identity against the kept closed root, and `document.hasFocus()`.
- For the fallback rows, the probe takes the trigger from `document.activeElement` just before `show()`.
- If the host allows it, add a row whose document lacks focus. Otherwise record it as unmeasured.
- **Acceptance:** the root read is true after the hide and false before it exactly on the dismissing rows. The `:focus` column settles the brief's Unknown.

**Owned files:**
- `src/browser/Offcanvas.ts`: `#press`, its comment, and the class TSDoc.
- `src/browser/Isolation.ts`: the `trigger` getter only.
- `src/browser/types.ts`: `IsolationInterface.trigger`.
- `src/browser/helpers.ts`: `holdsFocus` replaces `readFocusedElement` at `:458-484`.
- `tests/src/browser/Offcanvas.test.ts`, `Isolation.test.ts`, `helpers.test.ts`, and `index.test.ts` (the export list at `:208`).
- `guides/veneer.md`:
  - the Surface rows at `:90` and `:97`;
  - `#### IsolationInterface` at `:388`;
  - the Isolation bullet at `:2193-2194`;
  - § Offcanvas at `:2605-2627`;
  - the Bootstrap-difference bullet at `:2800-2806`.
- **Off-limits:** `Delegate.ts`, `Modal.ts`, and the styles session's oracle files.

**Dependencies.** None on J-ISOLATION-SHADOW: the rule changes neither the walk nor the fallback. But `Isolation.ts` belongs to J-RELEASE-PRIMITIVES (E35, unit 3), so the Orchestrator serializes the getter against that unit. J-OVERLAYS follows this unit, as E35 unit 7 already states.

**Proofs:**
- **Red first at `43fa73d`:**
  - the closed root the panel carries (press cancelled, trigger focused at the press's return with motion);
  - the panel in a shadow root with focus outside it;
  - a hide listener that moves focus to X after the trigger was removed (expects the body);
  - a hide listener that focuses the trigger and prevents the hide (expects the body).
- **Staying green:** `:605`, `:663`, `:732`, and `:807`. Add the row with the trigger inside the panel and already focused (expects the body at the press's return), and the fallback-H rows.
- **Mutations, each reddening a named row:**
  - read `ownerDocument.activeElement` instead of the trigger's root;
  - drop "not before";
  - drop the release half;
  - restore `43fa73d`'s move comparison;
  - always cancel;
  - never cancel.
  - Also run `matches(':focus')` and record whether any row tells it apart.
- **Helper and getter cases:**
  - `holdsFocus`: a document, an open root, a closed root, a host with focus inside it, and a disconnected element.
  - The `Isolation` `trigger` getter: the option; the fallback; the retargeted host, pinned as it behaves at `43fa73d`.
- **Census and gates:**
  - The census comparison against round 3 reads unchanged: 66 departures, all `attribute`, none on focus.
  - The scoped gates pass: `check`, `lint:check`, `format:check`, `test:policy`, and `test:guides`.

**`readFocusedElement` goes.** Nothing consumes it under this rule. A grep of `C:/Users/mikes/WebstormProjects/veneer/src` finds no `readFocusedElement`, so it exists only on the unit branch and removing it takes nothing away from a shipped API. The round-3 ruling already gives its re-creation to J-ISOLATION-SHADOW.

## 5. What I could not settle

- **The brief's Unknown**, whether `matches(':focus')` reads true on a trigger in a closed root, and whether Chromium's `:focus` depends on frame focus. The rule doesn't depend on either. The first probe records both.
- **Bootstrap's readings for the new rows** (trigger already focused, listener moves focus, listener focuses the trigger and prevents). I derived them from Bootstrap's order of events, not from a recording; the census has no such scenario. Recording them is the oracle files' owner's decision.
- **`holdsFocus` as an export.** I chose an exported helper over inline code because it is read twice and its closed-root and host behaviour need their own cases. Inlining is the other option under AGENTS.md's one-use rule.
- **Disagreements between the record and the code:**
  - The census says the reduced-motion hide completes "inside the `mousedown` listener". In the code it finishes in the microtasks after the listener and before the default action. That difference is what the reduced-motion limit rests on.
  - The round-3 probe's `outside` row reads `active: ""` and `body: false`. So inside a shadow placement, the default action does not always land on the body. The rule decides before the default action runs, so this does not change the ruling. Bootstrap's reading in that placement is unrecorded.
- **Ordering with J-RELEASE-PRIMITIVES** on `Isolation.ts` is the Orchestrator's call.

The dispatch carried no defects: it named no report path and assigned no command.
