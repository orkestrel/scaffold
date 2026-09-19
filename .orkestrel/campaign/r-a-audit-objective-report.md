# Roughnotes unit R-A audit — objective lane report (`analyst`, gpt-6-astra, 2026-09-17)

Retained from `tmp/codex/r-a-audit-objective-last.md` by the Orchestrator. Journal `tmp/codex/r-a-audit-objective.jsonl` (swept at acceptance), thread `01a0b19a-0a8c-7221-889b-d96e081317c2`, read-only sandbox, 452 s. Brief: `.orkestrel/campaign/r-a-audit-objective-brief.md`; claims: `.orkestrel/campaign/r-a-audit-claims.md`.

---

1. **UNRESOLVED — announced state at every readable frame.** The supplied verifier run establishes the normal collapsed → expanded → collapsed test. It does not settle interrupted transitions, navigation during opening, or reopening after navigation. `hideMenu()` requires `show`, while Bootstrap uses `showing` during opening; `watch(view, …)` also observes the view name rather than every location change. These are concrete attack vectors, not reproduced failures.

   I attempted:
   ```powershell
   npm.cmd run test:app:browser -- tests/app/browser/App.test.ts -t "announces the compact menu trigger|names every shell destination|leaves no reachable control"
   ```
   Vite failed before collection with `EPERM` opening `node_modules/.vite-temp/vite.config.ts.timestamp-….mjs`.

   To settle this, the Orchestrator must add transition cases to `App.test.ts`, recording Bootstrap events alongside the attribute: open → navigate → reopen; close during opening; navigation between locations sharing a view; and compact-open → wide viewport. Run them with:
   ```powershell
   npm.cmd run test:app:browser -- tests/app/browser/App.test.ts -t "audit menu transitions"
   ```
   R-B must preserve the wide-viewport refusal branch: the trigger remains in the DOM but is hidden.

2. **UNRESOLVED — Bootstrap measurement.** The installed Bootstrap implementation supports the source claim: offcanvas writes `aria-modal` and `role`, not trigger `aria-expanded`. Its opening completion callback adds `show` and synchronously emits `shown.bs.offcanvas`, which argues against an ordinary polling read observing only a manually painted intermediate class.

   However, the historical binding-removed runtime measurement is supplied only through the writer’s report. Reproduce it with an event recorder armed before the trusted click, and require `shown.bs.offcanvas` before reading the trigger. The Orchestrator can add that case and run:
   ```powershell
   npm.cmd run test:app:browser -- tests/app/browser/App.test.ts -t "audit native offcanvas state"
   ```
   Record the binding-removed reading and the restored reading separately.

3. **CONFIRMED — naming composition and vocabulary.** The attacks against foreign region vocabulary, reversed word order, and a missing separator failed. An in-memory execution of the actual `buildName` declaration returned the literal `Label, Region` outputs for the named product, menu, site, contact, and community examples. A bare-label comparison was rejected. This instrument proves string output, not spoken punctuation.

   The independent shell-name test compares rendered names against literals, and the supplied verifier run passed it. `Menu` and the theme-toggle names remain unchanged. No composed name inspected removes or precedes its visible label.

4. **UNRESOLVED — the compact-menu exception’s human-reachability rationale.** The measured premise establishes resolver reachability, not human reachability. Installed `isReachable` checks geometry, visibility, focusability, disabled state, and inert ancestors; it does not check occlusion or modal exclusion. Bootstrap also activates a focus trap inside the offcanvas.

   Settle the distinction at 390×844 after `shown.bs.offcanvas`, using keyboard traversal, a pointer hit test, and Chromium’s accessibility tree. The installed Playwright declarations support this command:
   ```js
   await (await page.context().newCDPSession(page)).send('Accessibility.getFullAXTree')
   ```
   A screen-reader reading is still needed to establish what that reader announces.

   Retaining `Get started, Menu` is consistent with the destination’s region; the census alone does not justify adding `inert`. If a successor makes the masthead inert, R-B’s `waitForState('button', 'Menu', 'expanded')` would target a control that the installed resolver rejects. That change requires a corresponding settling design.

5. **UNRESOLVED — census completeness beyond route landings.** The missing-route attack failed: the census includes the guide’s route families, with representative detail slugs. Its actual population is the default catalog at route landings, at the declared widths, plus the compact menu-open state. It does not exercise the guide’s full data-state table.

   A concrete omitted vector is `/media` with `createCatalog({ assets: [] })`. I executed the real `MediaView`, `ApplicationController`, and `Catalog` through Vue’s server renderer, with compilation held in memory. The full-catalog control emitted one bare `Contact` link. The empty catalog emitted four: the channel recoveries and the screen continuation, all pointing to `#/contact`. This proves duplicate markup labels; it does **not** establish the browser resolver’s refusal.

   The Orchestrator must mount the shell with that catalog, navigate through the interface, and read the exact refusal at the declared widths:
   ```powershell
   npm.cmd run test:app:browser -- tests/app/browser/App.test.ts -t "audit media names"
   ```
   If ambiguity is confirmed, distinguish the recovery links using existing channel vocabulary and retain the screen continuation’s bare label. Extend the census to that state. Nonfocusable headings and regions are outside this interactive census; their exclusion alone is not a control collision.

6. **CONFIRMED — changed journeys retain their destinations and refusal assertions.** The attack that bare-name resolution selects a shell link failed against the changed markup and literal shell-name assertions. The footer counterparts carry suffixes; the listing or publication entries retain `RoughNotes-Pro`, `Rough Notes magazine`, `The Insurance Marketplace`, and `Newsletter`. Their destination assertions remain.

   Replacing the former `RoughNotes-Pro` ambiguity assertion with `toBeUndefined()` correctly asserts successful resolution after the repair. The other exact refusal messages remain unchanged. The independent journey log records the suite passing. This confirms the changed sites, not additional journey coverage.

7. **UNRESOLVED — guide truth.** The attack on “every link in the cluster announces it” failed: the utility and footer loops bind each member’s name using `group.title`, and the titles come from `COPY`. The documented example spellings match `buildName`.

   The broader guarantees remain unsettled. The empty-media vector challenges the assertion that a screen continuation has a name no other reachable control shares. The compact-masthead rationale depends on claim 4. Also, “the shell hides the dialog when `location` changes” exceeds the watcher’s literal subject, `view`; the same-view navigation case in claim 1 must establish the consequence. Resolve those host probes before retaining those sentences without qualification.

8. **UNRESOLVED — mutation controls bind as claimed.** The proposed never-expanded mutation is addressed by the test’s explicit wait for `expanded`; retaining a permanently false attribute cannot satisfy that assertion. Returning a bare label for an exercised shell region also contradicts the independent literal `SHELL_NAMES` expectation.

   Those are source conclusions. I could not execute either mutation, and the supplied independent verifier proves the repaired tree’s green result rather than independently reproducing the reported reds. The Orchestrator must apply each mutation separately, run the following command, restore it, and rerun:
   ```powershell
   npm.cmd run test:app:browser -- tests/app/browser/App.test.ts
   ```
   Require failure in the intended assertion, with collection intact. The controls cover their exercised states and regions; they do not certify omitted data states.

9. **UNRESOLVED — least-certain claims and their owners.** The rulings supported by this round are:

   - **Modal reachability:** carry to the application and test-layer boundary; claim 4 needs the host reading before choosing inertness or changing resolution.
   - **Viewport coverage:** record the declared widths as a bound. Do not generalize to breakpoint transitions.
   - **Data-state coverage:** carry the empty-media vector into a successor proof. The route census cannot establish the guide’s broader uniqueness guarantee.
   - **Hash navigation:** valid evidence for direct route landing; not evidence that a navigation control works. R-B must preserve interface-driven journeys.
   - **`buildName` coverage:** the literal shell-name test provides behavioral evidence. The missing mirrored helper proof remains successor test debt; it is not an observed naming failure.
   - **The reported 154-row red:** retain as a historical host measurement, never as a portable invariant.

   Claim 4’s unresolved reading prevents a complete ruling on this claim.

10. **UNRESOLVED — shipping the screen-reader interface.** No supplied screen-reader record establishes the compact interaction. The earliest candidate for a misleading state is the opening interval: the trigger still carries `aria-expanded="false"` while the offcanvas is opening, and Bootstrap moves focus into the dialog before emitting `shown`. Whether the reader announces that stale state requires observation.

    The desktop naming attacks found no misleading spelling in `Products, Site` or the listing’s bare `RoughNotes-Pro`. Before acceptance, record the compact activation, announcement, menu-action traversal, navigation, and reopening sequence. A green resolver test cannot substitute for that reading.

**Findings fitting no claim.**

- **O1 — BROKEN: added census infrastructure violates the shared-test placement contract.** The diff introduces `SHELL_NAMES`, `ROUTES`, `readHeading`, `followRoute`, and `readShared` directly in [App.test.ts](C:/Users/mikes/WebstormProjects/roughnotes/tests/app/browser/App.test.ts:69). The scaffold [testing contract](C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/tests.md) places data tables in setup modules and requires reusable helpers to be exported there. The census reader is also the infrastructure the omitted-state proof needs. Move those additions into the applicable setup module under an explicitly owned successor change. Existing test-local declarations do not exempt these additions. This is a source-placement finding, not a browser failure.

**Attacked and held.**

- Error-summary links include explanatory text beyond the field label; the inspected markup does not give them the field’s exact name.
- The accepted contact recovery says `Call 800-428-4384`; it does not repeat the office panel’s bare telephone label.
- Repeated heading and link text is not automatically an interactive ambiguity: role and focusability constrain the resolver’s population.
- An attribute remaining collapsed during opening does not itself make an **expanded** wait resolve early. The unresolved attacks concern interrupted transitions and reads made without awaiting expansion.

VERDICT: FAIL 1, 2, 4, 5, 7, 8, 9, 10; outside the claims: O1