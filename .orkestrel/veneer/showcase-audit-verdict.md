# Showcase audit verdict — falsify round `showcase` at veneer `419245d`

Subject: the veneer showcase at `419245d` (2026-10-03): the page `showcase/browser.html` built from `app/browser`, the journeys and 21 statechart tables, and `guides/veneer.md` § Showcase. Claims: veneer `tmp/units/showcase-claims.md` (23 claims, the four open readings of `showcase/status.md` among them). Evidence: a fresh `CAPTURE=1` portfolio of 304 captures, three identical page builds, and this host's 128 GiB.

Ruling: `FAIL`. Three fix units carry § Carried; the round's open readings close with them.

## Lanes

| Lane | Role | Engine | Mode | Verdict |
| --- | --- | --- | --- | --- |
| objective | `analyst` | GPT-6 Astra | `codex exec`, effort high, with executed browser probes and a process-tree memory sampler, all deleted | `FAIL 2 3 4 5 7 9 10 11 12 13 14 15 16 17 18 19 20 21; outside: none` |
| subjective | `reviewer` | Claude Opus 5.5 | Agent tool, read-only, captures read as images | `FAIL 2 9 11 12 16 18 19 21; outside: F1 to F8` |

The verdicts are kept at veneer `tmp/codex/showcase-audit-verdict.md` and `tmp/units/showcase-subjective-verdict.md`.

## Rulings per claim

- **Confirmed:** 1 (every leaf renders somewhere reachable, by a rendering census after opening the menus), 6 (the Tailwind readings and subjects), 8 (dropping either `boot: true` or the popover plugin from `main.ts` fails the entry test, by executed mutants), 22 (the page is current and reproducible; `build-id` recomputes), and 23 (the journey fits this host: 188 s plain and 325 s with captures, sampled peaks 6.35% and 4.80% of physical memory, no timeout under contention).
- **Broken, reproduced by both lanes or by an executed probe, carried:** 2, 4, 5, 9, 11, 12, 15, 16, 18, 19, 21.
- **Ruled overbroad, carried as a guide correction:** 3. The engine's placement writes inline styles on the reference, the panel, and the arrow while a placed component is open, as stage A rules and as Popper does; the page's "no `style` attribute" holds for the authored page at rest, which both lanes measured, and the guide must say exactly that.
- **Ruled overbroad, carried as a proof:** 13. A swapped row can be a legitimate inverse transition, so a surviving swap shows nothing; the proof is a no-op-act and a sibling-reader mutation over all 21 tables.
- **Unresolved, carried as proofs:** 7 (the frozen population, with active tabs), 10 (the reference census after every table), 14 (Chromium does deliver `mouseover` to a parked pointer after a rebuild, at both widths; the fix is the pointer rule, not a sweep), 17 (an isolated output directory for the no-capture assertion), and 20 (a control reachability census at both widths).

## Carried

The units run in order, each in its own worktree from veneer `main`.

- **`showcase-page` (the page, `app/browser`).**
  - Claim 18 and F1: drop every light frame in dark mode and every dark frame in light mode around a token that is not `light`, `white`, `dark`, or `black` (`buttons.html:31-40`, `:161-164`; `button-group.html:4-7`, `:28-31`, `:56-58`, `:82-84`; `checks-radios.html:187-190`; `colored-links.html:9`, `:37`; `icon-link.html:80`; `factories.ts:83-90`), and rewrite their captions.
  - Claim 11: one focusable `.disabled` trigger per refusing family (alert, toast, modal, and offcanvas dismiss; offcanvas toggle; tab, pill, and list; dropdown), live on the engine's routes.
  - Claim 2: one frozen `alert alert-dismissible` carrier whose close button has no `data-bs-dismiss`, captioned as frozen.
  - Claims 16 and 19, F3, F4: the Overflow matrix shows its values (no `overflow-hidden` frame, padded cells) with a hint before every sideways scroller; a hint before the section-level scrollers (`tailwindcss.html:6-13`, the engine-states table at `factories.ts:465`); a flex template whose items wrap onto two lines in a container taller than its lines, for the Flex wrap and Align content rows.
  - Claim 9: `Showcase` destroys only the toasts it created.
  - F2, F7, F8, claim 21's caption parts: section leads that name the live and the frozen specimens; one caption class; class names in prose as `code`; no duplicate in `placeholders.html:22`; the Shadows rows ordered none, sm, default, lg; no caption breaking inside a class or attribute name.
  - Bound: keep every licensed fixed-tone frame; keep the live dismiss and toggle behavior; rebuild `showcase/browser.html`.
- **`showcase-proofs` (the showcase section of `tests/setupBrowser.ts` and `tests/app/browser`), after `showcase-page`.**
  - Claim 12: a row whose `from` equals its `to` records the family's lifecycle events and requires the state and the record stable across the component's transition window; a delayed-reaction mutation reddens it.
  - Claim 11: a keyboard row per disabled trigger reading the state unchanged; removing that family's `restricted: true` reddens it.
  - Claim 15: the burst rows' expectations are true under each motion preference, and the tables whose rows depend on a transition run under both.
  - Claims 4 and 5: the face comparison reads the chrome and the paired open engine states under both faces, and the generated-pseudo inventory gains a control outside the preflight list; the guide states the remaining limits.
  - Claim 2: a post-interaction census after every dismissal and close.
  - Claim 7: the frozen population derived from markup, active tabs included, with byte-identical classes and ARIA through boot, keys, Escape, outside click, and a resize.
  - Claim 10: a global id and reference census after every table, inserted tips included.
  - Claim 13: the no-op-act and sibling-reader mutations over all 21 tables, as a run recorded in the unit's report; a table that survives a no-op is a defect the unit fixes.
  - Claim 14: every case that moves the real pointer moves it to `(-1, -1)` in its `finally` (scaffold's rule in `.claude/rules/tests.md` § Browser tests).
  - Claim 16: J3's scroller population comes from computed overflow and geometry, not the optional `role`.
  - Claim 17: the no-capture assertion reads an isolated, initially empty output directory.
  - Claim 20: a census of every enabled control's Tab and pointer reachability at both widths, and every disabled control's refusal.
  - Claim 9: the departure proof in `main.test.ts` distinguishes a leaked `Showcase` listener.
  - F5 and F6: the capture portfolio boots `startJourneyVeneer` before it places the states, and captures after scrolling settles.
  - Bound: no proof weakened; the journey keeps four concurrent projects and its time stays inside its timeouts.
- **`showcase-guide` (`guides/veneer.md` § Showcase), after both.** Claims 3, 4, 5, 18, and 21: the page's style rule scoped to the authored page at rest; the face comparison's population as certified; the generated-pseudo limits; the fixed-tone license as the page applies it; equal card heights and frozen captions as the page shows them.

## Open readings of `showcase/status.md`

- (a) Disabled refusal rows: claim 11, carried.
- (b) The toggle-button figure's light surface in dark mode: claim 18, carried.
- (c) Journey memory: closed by claim 23 on this host (peaks 6.35% and 4.80% of 137,153,998,848 bytes).
- (d) A parked pointer: claim 14, carried as the pointer rule.
