# J-ORACLE-FIX-OFFCANVAS rounds 3 to 5 — the Orchestrator's verdict (2026-09-25)

**Subject.** Veneer `88d06f4` on `unit/oracle-fix-offcanvas` over `dcff520`, on the claims in `units/j-oracle-fix-offcanvas-audit-claims-5.md`.

**Lanes.** Both ran blind on that one claims file.
- **Objective:** `analyst` on GPT-6 Astra (`units/j-oracle-fix-offcanvas-audit-5-objective-verdict.md`; journal `scaffold/tmp/codex/j-oracle-fix-offcanvas-audit-5.jsonl`, session `01a0d7dd-1430-7b01-95bb-6e27360bcf27`). VERDICT: FAIL 6.
- **Subjective:** `reviewer` on Opus 5.5 (`units/j-oracle-fix-offcanvas-audit-5-subjective-verdict.md`). VERDICT: FAIL 6.

Opus 5.5 wrote the rounds, so the Astra lane is the cross-engine auditor. The lanes' citations resolve at `88d06f4`: the press at `src/browser/Offcanvas.ts:586-596`, `holdsFocus` at `src/browser/helpers.ts:476-480`, the `hide` event before the isolation's release at `Offcanvas.ts:357` and `:370-372`.

## Rulings

| Claim | Ruling | Basis |
| --- | --- | --- |
| 1. The press rule | CONFIRMED | Both lanes. Dropping the release condition, always cancelling, and never cancelling each fail by an assertion in the Orchestrator's replay (`units/j-oracle-fix-offcanvas-replay-5.log.txt`). |
| 2. `holdsFocus` | CONFIRMED | Both lanes. The document-read mutation fails `helpers.test.ts` by an assertion in the replay. The shadow-host reading matches the platform's own `:focus` meaning for a host, and the remarks name it. |
| 3. `IsolationInterface.trigger` | CONFIRMED | Both lanes. |
| 4. The proofs bind | CONFIRMED | Astra. Six cases are red at `43fa73d` by assertions and green at `88d06f4`. The replay reads the five owned files whole and green, and the tree clean. |
| 5. The mutations bind | CONFIRMED | Astra, with the `:focus` question ruled by the probe that follows. |
| 6. The prose | DROPPED | The claim asserted properties of guide and comment prose. Under the user's ruling that audits weigh implementation, a claims file carries no prose claim, and this one was the Orchestrator's error. Both lanes' prose findings are real. They are recorded in § Bounds, each against the unit that next owns that prose. None is sent back to this unit's writer. |
| 7. The census | CONFIRMED | Astra, by independent SHA-256 comparison: 66 departures, all `inert` attribute rows. |
| 8. Removal and scope | CONFIRMED | Both lanes. `git grep readFocusedElement 88d06f4` is empty, and the changed paths are the report's nine. |
| 9. The probe's release stand-in | CONFIRMED for the probe's fixtures | Astra. The probe is evidence, not a general proof of equivalence, and the unit's proofs do not rest on it. |

**The `:focus` question.** Both lanes asked whether `holdsFocus(trigger)` equals `trigger.matches(':focus')`. If it did, `holdsFocus` would be a wrapper over a platform primitive, which `AGENTS.md` forbids. The Orchestrator measured it (`units/j-oracle-fix-offcanvas-audit-5-focus-probe.mjs`, log `-focus-probe.log.txt`, Chromium 153.0.8010.12 through Veneer's Playwright 1.63.0):
- With the page focused, headless or headed, the root reading and `:focus` agree for a light-tree button and a closed-root button.
- On a headed page behind another page, with focus emulation off, `document.hasFocus()` reads `false`. The root's `activeElement` still reports the element, and `matches(':focus')` reads `false`, for both buttons.

So `holdsFocus` reads focus within the element's root whatever the window's system focus is, and `:focus` does not. That is a contract of its own. The helper stays.

**One code finding (D1, subjective lane).** `holdsFocus`'s `root === scope` conjunct cannot change the result:
- in the shadow-root branch, `scope` is `root`;
- a document never reports a node outside its own tree as its `activeElement`.

It is dead logic. It is carried, with its prescription `return scope.activeElement === element`, and does not hold the landing.

## Bounds, each with one carrier

- **J-OVERLAYS** (it restates the press on the lifetime's release result, so it owns the press and its prose):
  - **P1:** "moves focus off the trigger" (`guides/veneer.md`, § Offcanvas) is false for the guard rows. Write "which moves focus to the nearest focusable element containing the backdrop, or to the body when none does".
  - **P2:** the example "one a hide listener's focus move leaves behind" does not occur on its own, because the isolation's return runs after the `hide` event. Replace it with "such as a trigger the platform cannot focus, one removed before the press included".
  - **P3:** "The press rule has two limits" and "§ Offcanvas states both limits" are counts. Recast them without the number, as the subjective verdict prescribes.
  - **P4:** the fallback-host outcome holds only when that host's shadow tree also holds the panel. State that condition at the class TSDoc, § Offcanvas, and the Bootstrap-difference bullet, and in the fallback case's test title.
  - **The focusable fallback host (objective lane, claim 6).** A fallback host that takes focus itself (`tabindex="-1"`, no `delegatesFocus`) keeps focus after the panel hides, so "then on the body" is unproved for it. Add that row to the fallback case, and word the prose to the measured outcome.
  - **The redirected trigger (objective lane, residual).** A connected trigger whose own `focus` listener redirects the restoration is unmeasured. `Delegate`'s return at `hidden` also makes direct and delegated operation differ. The unit measures both and rules the outcome against Bootstrap.
- **J-ISOLATION-SHADOW** (it owns `Isolation`'s shadow-root semantics and focus reading):
  - **P5:** delete the prose paragraph under `#### IsolationInterface`, so the section is its methods table. In § Modal's `Isolation` bullet, correct "or else the element that held focus at construction": the isolation records the shadow host when focus sat inside a shadow root. Add the `trigger` property there, and point to § Offcanvas for the press.
  - **D1:** remove `holdsFocus`'s `root === scope` conjunct.
  - **The `:focus` difference:** add one remarks sentence to `holdsFocus`. It must say that the helper reads focus within the element's root whatever the window's system focus is, where `:focus` stops matching. Cite this probe.
  - The objective lane's two source findings, both pre-existing and already carried: `Isolation` stops its walk at a shadow boundary, and an omitted trigger records the retargeted host.

**The unit closes.** Every code and proof claim is confirmed by both lanes and the replay. J-ORACLE-FIX-OFFCANVAS lands next, after J-CONCERNS-B's landing clears the main checkout.

VERDICT: PASS
