# J-OFFCANVAS audit round 2 — the objective lane's verdict (GPT-6 Astra, retained 2026-09-24)

Thread `01a0d419-d880-7d30-b7a8-5aed5d134df2`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-offcanvas-audit-2.jsonl` (launch copy under `tmp/codex/`); 35 commands; 533 s; usage {"input_tokens":3006582,"cached_input_tokens":2815360,"cache_write_input_tokens":0,"output_tokens":14153,"reasoning_output_tokens":4790}. Retained verbatim from the exec's last message.

---

OBJECTIVE lane — source audit, with supplied execution evidence. Paths below are relative to `veneer/tmp/worktrees/offcanvas`; audit artifacts are under `scaffold/.orkestrel/veneer/engine/units`.

1. **CONFIRMED — Backdrop removal is a guarded hide step.**

   I attacked the stopped hide by restoring `shown` during its removal, changing it during settlement, destroying the panel, and destroying a backdrop never shown. `Backdrop.hide()` performs no removal after its await; `destroy()` removes even a never-shown element. Offcanvas retains its backdrop reference when the settlement or attribute doors fail and reaches removal only after those doors (`src/browser/Backdrop.ts:76`, `src/browser/Offcanvas.ts:298`).

   The sequence reads are:

   | Sequence step | Read after the step; attempted reaction |
   |---|---|
   | Show pre-event | `#refused(true)` repeats after dispatch; destruction or a listener-started show prevents the outer call from proceeding (`Offcanvas.ts:211`). |
   | Scroll-lock construction | `#holds(false)`; destruction propagates through its signal, and token takeover releases the newly constructed lock (`:225`). |
   | Set `aria-modal`, set `role`, add `showing` | Each expects `shown` absent; a reaction adding it stops before the next write (`:252`). |
   | Add `shown` | Expects it present; a reaction removing it stops immediately (`:256`). |
   | Await slide and backdrop; remove `showing`; construct isolation; focus | Each expects `shown` present and a live panel; destruction or token removal stops completion (`:257`, `:269`, `:275`). |
   | Hide pre-event | Repeats refusal after dispatch, containing destruction and listener-started hides (`:288`). |
   | Release isolation; add `hiding` | Each expects `shown` present; focus-return listeners and attribute reactions can stop the call (`:298`). |
   | Start backdrop fade; remove `shown` | Fade changes the generated backdrop; the host removal then expects `shown` absent (`:303`). |
   | Await slide and fade; remove transition tokens; remove attributes | Each expects `shown` absent; adding it stops subsequent cleanup (`:305`). |
   | Destroy backdrop; release lock | Each is an `#apply(false, …)` step; a lock-release reaction stops `hidden` (`:314`). |

   Re-entry during these writes is refused by `#changing`. Completed-event listeners may begin another change after `#changing` clears; that does not retroactively fail the completed call (`Offcanvas.ts:277`, `:318`). I found no listed host-token door that admits the opposite token state and then overwrites it.

   Proof binding:

   - The stopped-hide proof observes the document through fade completion and checks connectivity, absence of `hidden`, and eventual removal on destruction (`tests/src/browser/Offcanvas.test.ts:1462`). Restoring removal inside `Backdrop.hide`, or scheduling destruction from its promise before Offcanvas’s door, distinguishes the defect. The named assertion fails in `tmp/j-offcanvas/r2-red-Offcanvas.log.txt:76`; the mutation rows identify this same case (`j-offcanvas-mutations-2.log.txt:31`).
   - The animated Backdrop proof distinguishes restored post-fade removal through mutation records and connectivity (`Backdrop.test.ts:43`; `r2-red-Backdrop.log.txt:12`).
   - The non-animated proof distinguishes immediate removal through connectivity and subsequent reuse (`Backdrop.test.ts:71`; `r2-red-Backdrop.log.txt:33`). The Offcanvas-only mutation row does **not** independently certify these Backdrop cases; their own red logs provide that evidence.

   Modal’s successful hide still awaits the fade, checks its door, and destroys the backdrop (`src/browser/Modal.ts:324`). A failed door now retains it; subsequent show reuses it (`Modal.ts:254`). The guide states this split (`guides/veneer.md:1968`). `Modal.test.ts:188` checks successful completion with the backdrop absent; it does not pin removal after a stopped hide. Retention at that stopped door is the documented ownership rule, not an orphaned reference.

2. **BROKEN — Another live isolation can leave the active panel’s backdrop inert.**

   Source-derived counterexample using sibling panels A and B, each constructed through `new Offcanvas(...)`:

   - Complete A’s show. Its isolation observes their parent’s children (`Isolation.ts:108`).
   - Start B’s show. B appends its backdrop before awaiting settlement (`Offcanvas.ts:250`, `:257`; `Backdrop.ts:69`).
   - A’s observer receives that insertion and claims B’s backdrop inert: it belongs to neither A’s chain nor A’s spare set (`Isolation.ts:49`).
   - B constructs its isolation after settlement. Its `spare` set contains B’s backdrop, so construction skips it and preserves the `inert` value A wrote (`Offcanvas.ts:262`; `Isolation.ts:104`).
   - B’s host becomes non-inert, but its backdrop remains inert. The post-construction door checks only lifetime and the host’s `shown` token, then permits `shown` (`Offcanvas.ts:269`, `:353`).

   Mutation-observer delivery occurs through a queued microtask, and inert nodes are excluded from normal pointer hit-testing. Thus preserving this value defeats the backdrop listener’s trusted-input path. This conclusion is derived from source and the platform rules, not a browser run in this lane. [DOM mutation observers](https://dom.spec.whatwg.org/#mutation-observers), [HTML inert subtrees](https://html.spec.whatwg.org/multipage/interaction.html#inert-subtrees).

   **Repair boundary:** give the active panel’s backdrop a non-inert claim that participates in isolation precedence and restoration. Preserve `spare`’s published “leave as they are” behavior for ordinary callers; merely removing `inert` loses the shared claim invariant. The Orchestrator should reproduce the sibling-panel sequence and pin trusted dismissal before selecting the contract change.

   The supplied proofs establish the isolated-panel behavior:

   - Dropping either spare check fails `Isolation.test.ts:75`; retaining the caller’s mutable list instead of copying it would fail the inserted-element assertion after `spare.length = 0` (`:86`, `:91`).
   - Omitting Offcanvas’s spare option fails the backdrop-inert assertion (`Offcanvas.test.ts:507`).
   - Restoring containment-based document listening fails the container dispatch; listening on the parent fails the inside-panel press (`Offcanvas.test.ts:538`).
   - Reintroducing the construction-time document listener fails the listener-target assertion (`Offcanvas.test.ts:123`; `r2-red-Offcanvas.log.txt:12`).

   Those cases distinguish their mutations, but none retains another live isolation while showing the tested panel. Their passing results do not exclude this counterexample.

3. **BROKEN — The press departure overstates what becomes inert.**

   `guides/veneer.md:2491` says everything outside the panel except its backdrop is inert. A direct SVG sibling falsifies that sentence: the construction and observer paths explicitly skip non-HTML elements (`Isolation.ts:52`, `:104`), while their shared HTML ancestors belong to the non-inert chain (`:96`).

   The press proof puts its SVG **beneath** the backdrop (`Offcanvas.test.ts:477`). That establishes backdrop reception over the SVG, not inertness of the SVG. It cannot support the guide’s universal statement about elements painted above the backdrop.

   **Smallest correction:** describe HTML branches beside the ancestor chain and their descendants, with the backdrop exception; state that a non-HTML sibling remains outside that inert claim. Preserve the proven HTML-above and SVG-below behavior. The same qualification belongs in the adjacent focus departure (`guides/veneer.md:2488`).

   The other named edits withstand source comparison: the selector sentences describe delegate routing, `relatedTarget` names `show` and `shown`, destruction says “removes,” and the Backdrop hide/element contract describes retention (`types.ts:434`, `:447`, `:1383`, `:1424`, `:1434`, `:1508`). Bootstrap’s `showing`-then-`show` and `show hiding` timelines differ exactly as documented (`node_modules/bootstrap/js/src/offcanvas.js:113`, `:120`, `:142`, `:146`; `guides/veneer.md:2465`). The Modal mechanism bullets contain the revised split and spare wording.

4. **UNRESOLVED — Independent mutation replay remains outstanding; the supplied instrument otherwise binds its named cases.**

   `j-offcanvas-mutations-2-orchestrator.log.txt` is absent, as the brief anticipated. The Orchestrator’s replay against these source bytes settles this clause.

   I attacked the writer’s evidence for false attribution:

   - The instrument reads failed assertion titles from Vitest’s JSON, matches the named case, and distinguishes joined failures; it does not treat a nonzero file exit alone as a successful control (`j-offcanvas-mutations-2.py:250`, `:291`).
   - The missing lifetime mutation removes precisely `#reach`’s aborted check (`:219`). The consumer-owned branch of `Delegate.test.ts:4203` bypasses acquisition cleanup, so its `owned.shown` assertion distinguishes that mutation. The corresponding named failure appears at `j-offcanvas-mutations-2.log.txt:59`.
   - `void (host.parentElement ?? backdrop.element).addEventListener(...)` still installs the parent listener. `void` prevents the preceding expression from absorbing the parenthesized expression; it does not suppress the call (`mutations-2.py:120`). The first log records the invalid `TypeError`; the corrected log records the named behavioral assertion failure (`mutations-2-first.log.txt:27`; `mutations-2.log.txt:27`).
   - Current source SHA-256 values match the before/after values recorded at `mutations-2.log.txt:1` and `:73`.

   The log’s closing line is:

   `receipt: restored byte for byte`

   That is a restoration receipt, not a `prove` receipt or evidence of the pending independent replay. Whole-file rows bind only the named failing cases and mutations they record; they do not establish untested rows inside a table-driven case or the overlapping-isolation behavior in claim 2.

   The generated, untouched backdrop has no custom-element reaction at removal, so the report correctly identifies no distinguishing control for that removal step’s own post-write door. This boundary does not assert the same property for arbitrary consumer-modified descendants.

5. **CONFIRMED — The recorded gates and scoped source-policy claims hold.**

   I attacked scope by comparing the retained status and diff with the owned files, and syntax by parsing the changed TypeScript files with the installed compiler parser. No forbidden assertion, access modifier, default export, mutable interface property, or assigned nested function appeared. `as const` is the explicit rules exception. The in-memory negative control reported those forbidden constructs, including an assigned function inside a class-expression method. The Backdrop, Isolation, and Offcanvas modules contain imports and their class declaration.

   The retained status contains the claimed files and no Modal source edit (`j-offcanvas-2-status.txt:1`). The Orchestrator’s gate exits and results appear at `j-offcanvas-gates-2.log.txt:21`, `:36`, `:39`, `:46`, `:86`, `:99`, and `:112`. They were not rerun. The report explicitly records no `prove` call (`j-offcanvas-report-2.md:5`).

**Findings fitting no claim**

- **F1 — `BackdropOptions.animated` retains the old removal contract.** `src/browser/types.ts:428` says the false branch “adds and removes it at once.” For `new Backdrop({ animated: false })`, `show(); await hide()` leaves the element connected: `Backdrop.ts:76` has no removal, and `Backdrop.test.ts:72` explicitly asserts connectivity. Replace the false-branch sentence with immediate token changes without an animation wait; reserve element removal for `destroy()`. This is a contract correction, not a request to restore removal in `hide()`.

**Attacked and held**

- Nested delegate roots: the existing per-event Offcanvas host mark is checked before hiding another panel, and destruction is checked again before marking the target (`Delegate.ts:947`, `:954`). An inner delegate destroyed by the earlier button route or other-panel hide leaves the target available to the outer delegate. The corresponding cases distinguish omitted checks (`Delegate.test.ts:4031`, `:4102`, `:4135`).
- E12 refusal: enabled, unowned Offcanvas destinations enter the same-host conflict set once; refusal precedes routing and default prevention (`Delegate.ts:519`, `:586`). A pre-existing engine, disabled Offcanvas trigger, or different host correctly avoids that construction conflict (`Delegate.test.ts:4217`, `:4247`, `:4280`).
- Dismissal after delegate destruction: `#reach` refuses acquisition and driving before marking (`Delegate.ts:687`). Its earlier anchor default prevention remains the shared dismiss-route behavior; the toggle route’s stronger “prevents nothing” sentence is not applied to it.
- Timing: removing either backdrop promise from the wait changes the recorded completion order (`Offcanvas.test.ts:267`; `mutations-2.log.txt:44`). Waiting on finite animations is the documented departure from Bootstrap’s panel-only transition callback.
- Guard and parser: throwing prototype/detail/target accessors remain contained by `isOffcanvasEvent`; `parseBackdrop` delegates boolean coercion to the installed `parseBoolean`, preserving exact `static` matching (`validators.ts:375`; `parsers.ts:218`). Constructor precedence still requires overriding every path fed by an invalid backdrop attribute (`Offcanvas.ts:136`).

**Referrals**

Carry claim 2 to the Offcanvas/Isolation owner for independent reproduction and a precedence-preserving repair. Carry claim 3 and F1 to the contract/guide correction. Complete claim 4 with the scheduled Orchestrator replay.

**Bounds**

This is a source audit with supplied browser evidence, not an independently executed behavioral audit. No browser test, build, mutation, or filesystem write ran. No `prove` call was attempted or refused; no `prove` receipt is claimed. The runtime interleaving in claim 2 requires Orchestrator reproduction before implementation.

VERDICT: FAIL 2, 3, 4; outside the claims: F1
