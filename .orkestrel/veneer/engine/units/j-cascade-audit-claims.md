# J-CASCADE — audit claims (2026-09-25)

**Subject.** Veneer commits `4765f6f` (the six test files) and `a963585` (the Orchestrator's integration of the unit's three report-only guide patches) on `unit/cascade`, over `6dd5034`. A read-only snapshot of `src`, `tests`, and `guides` at `a963585` sits in `C:/Users/mikes/AppData/Local/Temp/claude/C--Users-mikes-WebstormProjects-scaffold/ae9013d2-d803-4f77-889d-b615fd892f79/scratchpad/snapshot-cascade-a963585/`. Beside it are the diff `j-cascade.diff`, its changed paths `j-cascade-status.txt`, the writer's report `j-cascade-report.md`, and the Orchestrator's replay `j-cascade-mutations-orchestrator.log.txt`. A shell reads `git -C C:/Users/mikes/WebstormProjects/veneer show a963585:<path>`. Never read the worktree.

**What this unit answers.** The brief `units/j-cascade-brief.md` (C1, C2, and C3) and the carried row in `plan.md` § Carried findings that names the Alert, Tab, Toast, Tooltip, and Delegate proofs. The Delegate stand-in and the Modal and Offcanvas cases are carried to J-OVERLAYS and are not claimed here.

## Claims

1. **The stand-ins are gone.** No test-local `.fade` rule, and no comment saying the shipped cascade lacks a fade, remains in the six owned files. Every Alert, Tab, Toast, and Tooltip case that waits on a fade loads the shipped `_tokens.scss` and `_fade.scss` with the component's own sheet.
2. **The Toast reworks keep what each case proved.** Each of the four Toast cases the report lists as reworked still asserts the engine behaviour its original title named, now on a path the shipped cascade does fade: a show of a shown toast. None was weakened to a case the engine passes whatever it does.
3. **The completed events follow the motion factor.** For each of Alert, Tab, Toast, Tooltip, and Popover, one case proves this:
   - at `--vn-factor-motion: 0` on the root, the event arrives with no running animation;
   - at `4`, the running transition's duration reads 600ms, the event has not arrived one frame in, and it arrives only after the transition's `finished`.

   The case fails for an engine that waits a fixed time, waits for nothing, or reads a fixed duration in place of the token.
4. **Popover's default animated path holds.** A Popover case constructed with the default `animated: true`, under the shipped `_tokens.scss`, `_fade.scss`, and `_popover.scss`, dispatches `shown` and `hidden` only after each fade finishes, driven by trusted clicks.
5. **A trusted touch drag swipes the carousel.** A Carousel case drags with trusted `Input.dispatchTouchEvent` points under the shipped `_carousel.scss`. It slides next on a leftward drag and previous on a rightward one, and it fails when the swipe reports the opposite direction.
6. **The proofs bind.** In the Orchestrator's replay, every KILLED row fails through an assertion, the refusal row is refused as a `ReferenceError`, and the control holds. For each proof claim you confirm, name the mutation that makes the proof fail, and say whether its assertions distinguish that mutation from the passing case.
7. **The guide sentences are true.** The three sentences `a963585` writes in the guide's § Alert, § Tab, and § Toast hold for the shipped `_fade.scss`, `_toast.scss`, `_nav.scss`, and `_tokens.scss`, and for the engines' waits. That includes the Toast sentence that a show of a hidden toast dispatches `shown.vn.toast` in a microtask, before the fade in.
8. **Scope and greenfield.** The changed paths are the six test files and `guides/veneer.md`, and no source changed. No constant, import, or helper is left without a use in the six files.

Rule each claim CONFIRMED, FAIL, or UNRESOLVED, with `file:line` evidence at `a963585`. Then report any behaviour defect outside the claims, with the smallest input that reaches it. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
