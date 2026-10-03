{
  "gaps": [
    {
      "key": "forced-native-open",
      "issue": "The verdict reconciles only forced native close (W1 Modal, host `close` listener) and the routed commands. It never rules a native open that the engine did not start: page script calling `dialog.showModal()` or `dialog.show()` on a dialog-leaf host, or a native open on a `<dialog class=\"modal\">` before its component exists. Disagreement 4 itself says an unrouted native show \"would leave a modal, inert page under Bootstrap's `.modal { display: none }`\". The opening `beforetoggle` is cancelable (native-research-agent-3.md:35; stage-b-measurements.md:26), so a reconciliation route exists, but no listener, row, or B3 reading covers it.",
      "fix": "Add a host `beforetoggle` listener for the open direction, used when the engine-started flag is absent. It cancels the native open and calls `show()`, so the hide and show gates and the `MODAL_OPEN` precheck apply. Add a `modal-dialog:script-open` departure row and a matching reading to B3: a script `showModal()` and `show()` against a built host and an unbuilt host, each with a control."
    },
    {
      "key": "tip-under-dialog-unmeasured",
      "issue": "Ruling 7 rejects `TIP_CONTAINER` because \"a throw breaks non-interactive tooltips that paint correctly\". W2 ruling 1 and the `ModalInterface` remarks say body-level tips sit beneath the open dialog, and no reading shows how they paint. Pixel compositing is open in browser-feasibility-report.md:37, codex browser-stage-b-design-verdict.md:230, and stage-b-measurements.md:107. The only compositing reading sits in B5, which is gated and can return \"drop\". The dialog leaf, which creates the limit, lands ungated in B3.",
      "fix": "Remove the \"paint correctly\" claim. Move this reading into B3's list: an ordinary-layer body tooltip beside and over `.modal-content` of a dialog-leaf modal, with a `div.modal` control. Make ruling 7 (guide limit, no throw) depend on that B3 reading rather than on B5."
    },
    {
      "key": "gutter-detection-not-declinable",
      "issue": "Under the blank slate, \"each default [is] a separate convenience that forces nothing\" (brief:5). Gutter detection gives no way out. A page that declares `html { scrollbar-gutter: stable }` and composes only `createBootstrapPlugins()` loses Bootstrap's 15 px compensation, and no option restores it. Root gutters are common in resets: the Elements sheet declares one (native-research-agent-2.md:128). The verdict uses the reset argument against detection for `intrinsic` (disagreement 3: \"a root `interpolate-size` from any reset leaves the engine untouched\") but not for the gutter. W4 then has to keep `./styles` from declaring a gutter so the engine path does not switch. The user list frames the shape as \"Accept\".",
      "fix": "Present the gutter shape to the user as an open choice: detection against a typed leaf. A typed leaf would be `reserved` or a `LockOptions` leaf passed through `ModalPluginOptions` and `OffcanvasPluginOptions`, consistent with `dialog`, `topmost`, and `intrinsic`. Alternatively keep detection and add an explicit opt-out leaf. In either case, state which shape stays consistent with the `intrinsic` reasoning."
    },
    {
      "key": "w4-decides-user-decisions",
      "issue": "\"What the user must rule\" item 10 lists D-1 (tag-default layer), D-3 (meaning of the default pack), and D-6 (take-overs of Bootstrap classes) as open. W4 already decides each one. Component looks says \"Tag defaults go in `reset` only\" (D-1) and \"Refused: take-overs of Bootstrap classes (`.badge`, `.carousel`) (D-6)\". Theme pack says \"The default pack equals the `./styles` `:root` defaults\" (D-3).",
      "fix": "Recast those W4 rows as proposals that wait on D-1, D-3, and D-6, with the alternatives stated. Or, if the verdict rules them, remove them from the user list."
    },
    {
      "key": "unruled-candidates",
      "issue": "The Decision says every other candidate is \"Refused, with evidence\", but these candidates have no row and no evidence. `ElementInternals` and `:state()` are named for every subject and for the boot scope (native-inventory-1.md:15, :26; native-inventory-2.md:128, :139). `hidden=\"until-found\"` on carousel items is not ruled (native-research-agent-2.md:61, :183). Scrollspy `scrollend`, `beforematch` against the direction latch, and `focusgroup` are not ruled (native-research-agent-2.md:193; native-inventory-2.md:50). Dropdown `anchor-size()` is not ruled (native-research-agent-1.md:179). `TransitionEvent.animation` for the transition wait is not ruled (stage-b-measurements.md:53). `CSSPseudoElement` for `::backdrop` clicks is not ruled (native-research-agent-3.md:96).",
      "fix": "Add a ruling and evidence for each: the Carousel, Scrollspy, Dropdown, and Modal tables, plus the Transition wait and Boot scope entries under Shared mechanisms."
    },
    {
      "key": "deferrals-without-gate-unit",
      "issue": "The Decision says each deferral is \"blocked by a named reading\". Two readings have no owning probe. The tab-pane deferral \"follows G2, plus a `.tab-content > .tab-pane.fade` reading\". The custom `--` command gate is \"one toggle from a button that carries both a `--toggle` command and a `data-bs-toggle` route\" (W2 ruling 6). The W5 gate probes list only G1 (offcanvas), G2 (collapse until-found), and G3 (Android Back).",
      "fix": "Add gate probes for both readings (G4: tab-pane until-found under `.fade`; G5: the `--toggle` plus `data-bs-toggle` double-toggle reading). Or extend G2's scope explicitly, and list them in the W5 units table."
    },
    {
      "key": "w4-undefined-citations",
      "issue": "The W4 Token system cites `rep-d:58` and `plan-d:95`, which are not in the short-root table. W4 also cites M09, M11, M18, M19, M21, M23, M24, M25, T03, T12, T16, T-2, T-4, Q-I3, Q-I6, Q-I12, and Q-I13, plus \"styles § Proposed placement rule\" and \"W4.4–W4.7\". All of these point at a styles lane that has no path anywhere in the verdict. A reader cannot check these W4 entries, which breaks the `path:line` citation requirement (brief:50).",
      "fix": "Add short roots with paths for `rep-d` and `plan-d` (the `absorb-styles-reports` and `absorb-styles-plan` distillates) and for the styles inventory. Cite each M, T, or Q identifier as `path:line`."
    },
    {
      "key": "w3-parser-and-guard-ownership",
      "issue": "The W3 row \"Markup refusal of every stage B leaf | B2 | Parser case\" names no file. The resolvers it pins sit in `src/browser/helpers.ts:328-366`, which W5 makes report-only for every family unit, and B2's ownership list has no helpers test file. B2 also adds an exported realm-aware dialog guard in `validators.ts`. That guard is missing from the W3 inventory, which must list every created item with its proof.",
      "fix": "Name the parser-refusal test file and give it to B2, or to B0 or B3. Add a W3 row for the `validators.ts` dialog guard with subject Modal, unit B2, and its validators test as the proof."
    }
  ]
}