# Audit claims — TIP (`tp`), rounds 2 and 3

Subject: rounds 2 and 3 together — `tp-2.diff` and `tp-2-status.txt` (the owned files, unchanged in
round 3, so `tp-3.diff` and `tp-3-status.txt` equal them), `tp-shared-3.patch` (one unified diff against
`2a3f223` that supersedes `tp-shared.patch` and `tp-shared-2.patch` whole), the reports
`b-modal-tp-report-2.md` and `b-modal-tp-report-3.md`, and the instruments and logs under
`tp-instruments/` (round 2's `tp-mutations-2.log.txt`, `tp-mutate-2.py`, `tp-gates-2.log.txt`,
`tp-shared-2-vs-1.diff`, `tp-owned-2-vs-1.diff`; round 3's `tp-guide-3-vs-2.diff`, `tp-check-3.log.txt`,
`tp-gates-3.log.txt`) — against the successor briefs `b-modal-tp-brief-2.md` and `b-modal-tp-brief-3.md`,
the round-1 verdict `tp-audit-verdict.md` and its lane verdicts, round 1's record (`tp.diff`,
`tp-shared.patch`, `b-modal-tp-report.md`), and the mid-campaign notes `w2-w3-note-1.md` and
`w2-w3-note-2.md`. The unit was written by `opus` on Opus 5.5. Each claim is falsifiable; a lane rules
CONFIRMED or BROKEN with `file:line` evidence, and before confirming a claim about a proof names the
mutation that would make the proof fail and whether its assertions distinguish that mutation from the
passing case.

Orchestrator rulings the lanes take as given, and rule wrong where the evidence says so: the round-1
verdict's rulings stand, and every claim it confirmed stays confirmed unless rounds 2 and 3 changed its
subject; the § Compatibility table re-pads under the formatter and integrates by re-running it; the
stacking paragraph stays as the base has it because MODAL rewrites it; the validation copies were
deleted before the reports, so a lane rules the gate and mutation claims from the code's assertions and
the retained logs, and names which it read.

1. **Scope and delta.** `tp-2-status.txt` lists round 1's owned paths and nothing else;
   `tp-shared-3.patch` applies with `git apply --check` to a fresh extract of `2a3f223`; against round 1
   it changes only `app/browser/constants.ts`, `guides/veneer.md`, `src/styles/_mixins.scss`,
   `tests/setup.ts`, and `tests/setupStyles.test.ts`, at the sites P1 to P7 name and the paragraphs they
   re-flow; against `tp-shared-2.patch` it changes only the Tooltip and Popover `plugin` rows and the
   table's padding; the owned files change only at the P2, P3, P5, and P6 sites.
2. **P1: the box mutations.** `tp-mutations-2.log.txt` records the T-box inset and size runs and the
   P-box inset and size runs, each with a rebuild, a red summary, and the failing case; the tooltip box
   and popover box cases' assertions distinguish each literal from the token binding through the
   density and type retunes.
3. **P2 and P3: the untitled popover and the headers.** The `Untitled popover` specimen carries the bottom
   placement, an empty `h3` header, a populated body, and its own `id`; its `CaptureSubject` member and
   its `CASCADE_KEYS` row read a property a popover rule sets on the body, on a box a computed style can
   read; the decline text is gone from the TSDoc, the registry remarks, and the guide; every popover
   header is the release template's `h3` element; the section proofs' populations include the untitled
   specimen while the explicit-side assertions derive from `TIP_PLACEMENTS`; the retained `h2` and
   titled-header runs redden the contract case, and its assertions distinguish them.
4. **P4 and P5: the arrow utilities and the arrow table.** Every sentence that names the arrow's
   stand-ins names the `position-absolute` utility with the `start-50` and `translate-middle-x`
   utilities, or the `top-50` and `translate-middle-y` utilities; the binding case derives the arrow
   properties from the inventory's arrow selectors and equals `TIP_ARROW_PROPERTIES`, and the retained
   run with one property dropped reddens it; no arrow property the release records escapes the table.
5. **P6: the prose, titles, width limit, and owners.** The Tooltip and Popover rows say the release sets
   the `show` class and the `fade` class only when the tip is animated, as `tooltip.js` bears out; the
   arrow sentence and the retitled arrow cases say the triangle paints the tip's fill on its border
   facing the tip and points at the host, and the retained placement runs redden them; no added line
   names a triangle by position or says "on each side of its host"; both arrows' literals carry the
   geometry reason; the width case asserts every popover narrower than `276px` at 390 and equal to it at
   1280, and its inverted run reads red; the `reset-text` comment writes "the `start` keyword"; the
   outside-ledger sentence names J-ENGINE and CROSS-FADE.
6. **P7: the plugin rows keep every obligation.** The Tooltip row carries "constructed by a consumer",
   the `sanitize: true` default, and the `setContent` method, and the Popover row "inheriting its
   construction, methods, sanitizing, and ARIA", beside every round-2 clause; each clause of both rows
   agrees with `node_modules/bootstrap/js/src/tooltip.js`, `popover.js`, and
   `util/template-factory.js` at the worktree.
7. **The round-1 confirmations.** The claims round 1 confirmed (the partials against the oracle, the
   `reset-text` mixin, the registries and orders) still hold on rounds 2 and 3's files.
8. **Law and report.** The owned files and the patch add no `any`, no `as` beyond a const assertion, no
   `!`, no suppression, no mock, spy, or fake, and no nested function beyond a callback passed
   directly; added comments, TSDoc, and guide text follow the writing rule; the reports record each
   gate's command as it ran with its result line; a lane lists every count the reports state as a
   finding outside the claims for the record.
