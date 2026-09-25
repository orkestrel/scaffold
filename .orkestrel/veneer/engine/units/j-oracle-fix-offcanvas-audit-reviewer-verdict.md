# J-ORACLE-FIX-OFFCANVAS round 1 — the subjective lane's verdict (reviewer on Opus 5.5, 2026-09-25; brief units/j-oracle-fix-offcanvas-audit-reviewer-brief.md)

**J-ORACLE-FIX-OFFCANVAS round 1: subjective-lane verdict (reviewer, Opus 5.5, design fit)**

I ruled claims 1, 2, 3, 7, and 8. The mechanism, the proofs, and the scope fit the engine. Claim 7 fails on two false sentences.

All `Offcanvas.ts`, `Offcanvas.test.ts`, and `veneer.md` line numbers refer to the worktree at `eaf3908`, `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-fix-offcanvas/`.

## Per-claim verdicts

| # | Claim | Verdict | Evidence |
| --- | --- | --- | --- |
| 1 | The mechanism | CONFIRMED | `src/browser/Offcanvas.ts:279` passes the `mousedown` to `#press`. `Offcanvas.ts:568-577`: a non-dismissing press calls `#prevent()` and returns without touching the default action. A dismissing press reads `ownerDocument.activeElement`, calls `void this.hide()`, and cancels only when focus changed. The diff (`j-oracle-fix-offcanvas.diff:55-82`) adds no timer, no frame loop, no polling, and no listener; the existing listener only forwards its event. **Design fit:** this is the shape a reader of this engine expects. The engine already returns focus when the isolation ends (`hide`, `Offcanvas.ts:361-363`, before the first `await`). The fix only stops the platform from undoing that move. It adds no field and derives "moved" from the page rather than storing it. The predicate says the intent directly. The rejected predicates (`released`, `outside`) are each shown wrong by a guard row. **E35 fit:** the press takes no resource and makes no host write, so J-OVERLAYS has nothing to enrol. The one coupling is that `hide()` must release the isolation synchronously before its first `await`. E35's `release(record)` gives the holding back at once, so the coupling survives, and case 1 reddens if a later unit breaks it. |
| 2 | The red-first proof binds | CONFIRMED | Case at `tests/src/browser/Offcanvas.test.ts:604-655`: a trusted `userEvent.click` beside the panel (`:633`), focus read at `hidden` (`:618`), when the press returns (`:634`), and after settling (`:641`), in both settings (`:608`). Replay `j-oracle-fix-offcanvas-replay-1.log.txt:34-37` shows `base exit 1`. `tmp/j-oracle-fix-offcanvas/mutation-2-base.log.txt:38-97` shows the assertion at `:654` failing, with `pressed` and `settled` reading `<body>` under `motion: true` and `motion: false`; the whole-file run at `:2-3` is green. **Mutations:** `never` reddens it by `pressed` and `settled` reading `<body>` (`mutation-2-never.log.txt:40-98`). `click` reddens it by `dismissed` reading `[[true]]` (`mutation-3-click.log.txt:21-37`). The assertion tells each mutation apart from the passing case. **Title:** it names what the case proves. |
| 3 | The guard binds | CONFIRMED | Case at `Offcanvas.test.ts:661-707`, with rows `prevented`, `unfocusable`, `sliding`, and `static` (`:663`) and one `toEqual` per row (`:691-703`). Each mutation reddens its own row by that assertion: `always` → `prevented` (`mutation-2-always.log.txt:14`, focus reads the panel `div`); `released` → `unfocusable` (`mutation-2-released.log.txt:14,38`); `outside` → `sliding` (`mutation-2-outside.log.txt:14,36`, focus reads the opener `button`); `static` → `static` (`mutation-2-static.log.txt:14,45`). The row's expected `focus: document.body` separates each mutation from the passing case. The loop stops at the first failing row, so a mutation that breaks several rows shows only the first; that doesn't weaken the binding. For the title's wording, see design-fit defect 1. |
| 7 | The prose is true | **FAIL** | The class TSDoc (`Offcanvas.ts:61-64`) and the new § Offcanvas sentences (`guides/veneer.md:2612-2618`) hold for the code. Two sentences are false; see required changes 1 and 2. The Bootstrap half of claim 7 holds: `node_modules/bootstrap/js/src/offcanvas.js:243-247` returns focus at `hidden.bs.offcanvas`, and Bootstrap never cancels the press, so the default action runs. When focus sits on the panel itself, `offcanvas.js:140` `blur()` has already moved it to the body. When focus sits on a descendant, the default action moves it. The sentence "lets that default action move focus to the body" is therefore true. |
| 8 | Scope | CONFIRMED | `j-oracle-fix-offcanvas-status.txt:1-3` lists exactly `guides/veneer.md`, `src/browser/Offcanvas.ts`, and `tests/src/browser/Offcanvas.test.ts`. The diff's hunks in `Offcanvas.ts` touch only the class TSDoc, the listener arrow, and `#press`. The hide's identity, doors, and returning step (`Offcanvas.ts:345-421`, `#reshow`, `#rehide`) are untouched. `#press` has one caller, and it was updated (`Offcanvas.ts:279`), so no compatibility path remains. `types.ts` carries no remark on this order (`types.ts:1583-1628`), so leaving it unchanged is correct. |

## Required changes (claim 7)

1. **`guides/veneer.md:2792-2793` is false for the `unfocusable` row.**
   - **What is wrong:** it says "A backdrop press that hides the panel therefore cancels its own `mousedown` default action, and focus stays on the trigger."
   - **Why it matters:** a press that hides a panel whose trigger can't take focus keeps its default action and ends on the body. The guard pins this (`Offcanvas.test.ts:684`, `:700-701` expects `shown: false` and `focus: document.body`). The guide's own § Offcanvas paragraph says the same (`veneer.md:2616-2618`), so the two passages contradict each other.
   - **What right looks like:** "A backdrop press whose hide moves focus to the trigger therefore cancels its own `mousedown` default action, so focus stays there."

2. **`src/browser/Offcanvas.ts:565` is false.**
   - **What is wrong:** it says "Bootstrap's panel returns focus after that default action, at its `hidden` event."
   - **Why it matters:** Bootstrap's `Offcanvas` class returns no focus; its `hide` method blurs the panel (`offcanvas.js:140`). The return belongs to its data API's click handler (`offcanvas.js:232-248`). The guide bullet names it correctly ("its data API"), so the comment disagrees with the guide.
   - **What right looks like:** "Bootstrap's data API returns focus after that default action, at the panel's `hidden` event."

3. **`src/browser/Offcanvas.ts:567` breaks `.claude/rules/writing.md` § Sentence and paragraph order (name the noun after `it`).**
   - **What is wrong:** "a press that moved no focus keeps it, as Bootstrap's does" follows "focus stays where the hide put it". A reader first attaches `it` to focus, which is the opposite of what the code does.
   - **What right looks like:** "a press that moved no focus keeps its default action, as Bootstrap's does."

## Design-fit defects outside the claims (non-blocking, one-line fixes)

1. **`Offcanvas.test.ts:661`, the case title.**
   - **What is wrong:** "keeps the press focus change when the press moves no focus" uses "the press" in two senses: the whole press including its default action, and the press's listeners. A reader meets an apparent contradiction on the first read (`AGENTS.md` § Writing). The comment at `:657` already has the plain wording.
   - **Smallest fix:** "keeps the press's default action, which moves focus to the body, when the hide moves no focus: a prevented hide, …"
2. **`Offcanvas.test.ts:602`, a comment.**
   - **What is wrong:** "The window hears the press" gives software a sensory faculty (`.claude/rules/writing.md` § Voice and actor).
   - **Smallest fix:** "The window's `mousedown` listener runs after the backdrop's".

## Referral (to the objective lane, claim 9)

When the panel and its trigger sit in the same shadow root, `document.activeElement` reads the shadow host both before and after `hide()`. The comparison at `Offcanvas.ts:573-576` would then see no change, and the default action would move focus to the body.

- **Probe input:** a shadow root holding `#opener` and `#panel`. The backdrop's parent is `host.parentElement`, inside the root, per `Offcanvas.ts:273`.
- **Question:** is this reachable through the documented surface? `veneer.md` requires only "an HTMLElement in the current realm".
- **Candidate fix, if it is:** read `activeElement` from `this.#host.getRootNode()` or from the retargeted chain.

I give no verdict on this.

VERDICT: FAIL 7
