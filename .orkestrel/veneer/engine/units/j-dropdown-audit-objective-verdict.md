# J-DROPDOWN audit round 1 — the objective lane's verdict (GPT-6 Astra through codex exec, read-only)

Thread `01a0d1cd-8a90-7af0-849a-a0d0b032f35d`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-dropdown-audit.jsonl` (launch copy under `tmp/codex/`); 36 commands; 584 s; usage {"input_tokens":4113463,"cached_input_tokens":3887360,"cache_write_input_tokens":0,"output_tokens":16088,"reasoning_output_tokens":6607}. Retained verbatim from the exec's last message.

---

1. **CONFIRMED — Construction, menu, and options. Objective lane.** Attacked with invalid vocabulary, invalid attributes overridden by constructor values, sibling decoys, duplicate ownership, and an already-aborted signal. Validation precedes the claim; constructor overrides bypass the corresponding attribute parser; menu search preserves the stated order; destruction releases ownership before restoration. Evidence: `src/browser/Dropdown.ts:82`, `:115`, `:122`, `:149`, `:150`, `:163`, `:216`; `src/browser/helpers.ts:212`.

   Proof bindings hold for the mutations actually recorded in `j-dropdown-mutations.log.txt`:
   - Menu search (`Dropdown.test.ts:733`): removing preceding-sibling and parent fallback lookup fails the selected menu assertions; log `:30`.
   - Validation (`:671`): accepting an invalid class and accepting an invalid dismissal attribute fail the error assertions; log `:28`, `:29`.
   - Ownership (`:763`): removing `claim` fails duplicate-owner rejection; log `:31`.
   - Hooks and signal (`:792`): the recorded mutation breaks already-aborted construction; log `:32`. Its label “the signal is ignored” overstates its scope: it does not remove the later abort listener.
   - Restoration (`:828`): omitting placement destruction fails promotion and attribute cleanup; log `:33`.
   - Offset/reference (`:236`): dropping the attribute readers fails independently measured geometry; log `:12`, `:13`.
   - Vocabulary replacement (`:596`): ignoring each group fails the replacement-only assertions; log `:25`, `:26`, `:27`.

2. **BROKEN — Show, hide, and their doors.**

   **Canceled native promotion is reported as a successful show.** On a connected menu, install a `beforetoggle` listener that prevents an opening event, then call `dropdown.show()`. Native cancellation returns without opening the popover. `Placement` nevertheless completes; Dropdown’s door checks only lifetime, identity, and the menu token. It then focuses the toggle, writes expansion and tokens, emits `shown.vn.dropdown`, and returns `true` while the menu is not `:popover-open`. Evidence: [Placement.ts:93](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/dropdown/src/browser/Placement.ts:93), [Dropdown.ts:281](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/dropdown/src/browser/Dropdown.ts:281), `src/browser/Dropdown.ts:288`. Native opening cancellation is specified by the [HTML show-popover algorithm](https://html.spec.whatwg.org/multipage/popover.html#show-popover).

   The smallest correction is to make failed promotion observable to Dropdown, restore the partial placement, and refuse the show before writing expansion or tokens.

   The write trace also exposes the D5 boundary:
   - Pre-change dispatch: `#refused` correctly rechecks destruction, disablement, state, and an in-flight change.
   - Existing placement destruction: `#reveal` has **no intervening door** before constructing its replacement (`Dropdown.ts:262`, `:266`). A preceding token takeover can leave that old placement present; a closing `beforetoggle` listener can then destroy Dropdown during this destruction.
   - Placement construction: its internal writes and native dispatches run before Dropdown’s next door. Claim 3 rules this boundary.
   - Focus and expansion: the following door requires the menu token absent. Destruction or addition of that token stops subsequent Dropdown writes.
   - Menu-token addition, toggle-token addition, and placement update: the following door requires the menu token present. Removal stops subsequent Dropdown writes.
   - Hide: placement destruction is followed by the token-present door; menu removal, toggle removal, and expansion each have a token-absent door.
   - Reentrant show/hide/toggle calls during these guarded writes encounter `#change` and resolve `false`. Completion dispatch occurs after clearing it; a completion listener can therefore start another change.

   Proof bindings:
   - Opening/closing (`Dropdown.test.ts:88`) distinguishes omitted promotion, focus, expansion, toggle token, side update, and demotion; log `:2` through `:8`.
   - Disabled/already-correct state (`:305`) distinguishes dropping the disabled refusal; log `:21`.
   - Prevention (`:349`) distinguishes ignoring pre-change cancellation; log `:22`.
   - Events/hooks (`:386`) distinguishes cancelable completion and acceptance of payload-less events; log `:23`, `:24`.
   - Destruction inside expansion (`:864`) distinguishes dropping `#apply`’s door; log `:35`.
   - Destruction during `show` dispatch (`:911`) and nested show (`:939`) distinguish dropping the post-dispatch refusal; log `:36`, including its named joined failure.
   - In-flight reentry (`:976`) distinguishes removing the change refusal; log `:37`.
   - Focus/promotion destruction (`:1015`) distinguishes removing eventual placement cleanup; log `:38`. Its final-state assertions do **not** prove an absence of intervening writes after destruction.
   - Menu-token takeover during show (`:1050`) and hide (`:1084`) distinguishes dropping the corresponding token door; log `:39`, `:40`.
   - Public update (`:574`) would distinguish replacing `Dropdown.update()` with a no-op at `:590`. The recorded show-update mutation, log `:6`, instead leaves the side unsaved until the explicit update; restoration can then retain the test’s `"stale"` value. That whole-file failure does not bind public-update forwarding.

3. **BROKEN — Position and placement.**

   **D5 violates the governing lifetime rule.** Let an opening `beforetoggle` listener call `dropdown.destroy()` and begin recording mutations after that call returns. Dropdown has not yet assigned its placement. Placement resumes afterward, writes inline positioning and the reference anchor, registers its observer/listener, and only then returns to Dropdown’s abort check. Eventual restoration does not erase those post-destruction writes. Evidence: `src/browser/Dropdown.ts:266`, `:275`, `:276`; `src/browser/Placement.ts:93`, `:106`, `:127`, `:128`; `j-engine-design-verdict.md:84`, which retains “no mutation after `destroy()`.”

   The contract needs an abortable placement-opening boundary, partial-construction cleanup, and checks before further forward writes. `PlacementOptions` lacking `signal` (`types.ts:454`) identifies the contract change needed; it does not authorize the exception. Preserve restoration of already-written state.

   **The cascade premise is also false.** Bootstrap’s `_dropdown.scss` does not contain the claimed `data-popper-placement` prefix selectors. Its relevant selectors use `data-bs-popper` (`node_modules/bootstrap/scss/_dropdown.scss:65`, `:95`, `:104`, `:116`). The prefix selectors belong to `_popover.scss:164` and `_tooltip.scss:97`. Correct the claim’s attribution; this is not evidence that Dropdown needs an edge suffix.

   **D4 holds within the supplied Chromium evidence.** Removing the fixed-position write is the negative control for the tall-page case (`Placement.test.ts:241`, assertions `:254`, `:255`; log `:43`). Keeping `position: fixed` is supported for viewport flipping.

   Placement proof bindings:
   - Default promotion (`Placement.test.ts:53`): omit `showPopover` or restoration; log `:41`, `:54`.
   - Positions/sides (`:86`): force bottom-start or report only bottom; log `:44`, `:55`.
   - Offset (`:162`): zero the offset margins; log `:45`.
   - Fallbacks (`:196`): disable default flipping or ignore the supplied list; log `:46`, `:47`.
   - Tall-page flipping (`:241`): omit fixed positioning; log `:43`.
   - Static placement (`:260`): execute dynamic placement instead; log `:48`.
   - UA reset (`:279`): omit restoration of promotion-changed properties; log `:42`.
   - Hint promotion (`:319`): removing promotion fails its open-state assertion as a joined failure in log `:41`; forcing `"manual"` would distinguish the hint-specific assertion at `:327`, but that control was not recorded.
   - Update/resize/scroll (`:333`): omit observation or change the scroll event; log `:49`, `:50`.
   - Existing anchor/restoration (`:372`): replace existing anchor names; log `:51`; removing restoration also fails it, log `:54`.
   - Attribute replacement (`:403`): ignore the attribute group; log `:52`.
   - Invalid inputs (`:426`): remove disconnected-element refusal; log `:53`.
   - Frozen placement tables (`:18`): no recorded behavioral red binds this case; see claim 6.

   Dropdown’s direction and static-placement cases distinguish ignored direction/alignment and navbar detection (`Dropdown.test.ts:132`, `:194`; log `:9`, `:10`, `:11`). Its promoted-cascade comparison (`:274`) appears among the failures when promotion is disabled, but its earlier `:popover-open` assertion already fails. That row proves the promotion prerequisite, not the reset comparison; the reset mutation was run against `Placement.test.ts`.

4. **CONFIRMED — Light dismissal, including D1.** Attacked the inside/outside matrix, toggle exclusion, secondary button, form controls, non-Tab releases, Tab movement within the menu, and Tab leaving it. The engine applies the stated switches and passes the dismissing click into the paired events. Evidence: `src/browser/Dropdown.ts:324`; `node_modules/bootstrap/js/src/dropdown.js:356`.

   Engine-owned dismissal is an acceptable shape: the engine already owns the resolved dismissal rules, click detail, and lifetime. A directly constructed engine has the same dismissal behavior without requiring a delegate. Adding readable `dismiss` and a click-bearing public `hide` solely to move these listeners is unnecessary. Listener removal is bound to the engine’s abort controller (`Dropdown.ts:155`, `:158`, `:218`).

   Proof bindings hold: dismissal matrix (`Dropdown.test.ts:537`) versus ignored switches, log `:14`; exceptions (`:494`) versus removed toggle/form/button/key guards, log `:15` through `:18`; click detail and document delivery (`:440`) versus discarded detail and unheard document clicks, log `:19`, `:20`. The trusted Tab assertions distinguish removal of keyup handling, although that separate mutation is not recorded.

5. **BROKEN — Delegate routes and E12.**

   **The keyboard route includes CSS-invisible entries.** Place a `.dropdown-item` with `visibility: hidden` between visible entries. `checkVisibility()` without options does not test CSS visibility, so the hidden entry remains in the neighbor list and receives the attempted focus instead of the next visible entry. Bootstrap explicitly tests computed visibility. Evidence: [Delegate.ts:290](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/dropdown/src/browser/Delegate.ts:290), `node_modules/bootstrap/js/src/util/index.js:104`, `dropdown.js:328`; [CSSOM View’s visibility options](https://drafts.csswg.org/cssom-view/#dom-element-checkvisibility). Enable the visibility-property check and bind it with that fixture. Do not add an opacity exclusion: Bootstrap’s predicate does not require one.

   **A destroyed delegate continues its Escape focus write.** Start with an open dropdown. In its `hide.vn.dropdown` listener, destroy the delegate and focus another connected button. `engine.hide()` returns after its destruction refusal, but `#press` then calls `toggle.focus()` unconditionally. Evidence: [Delegate.ts:278](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/dropdown/src/browser/Delegate.ts:278), `Dropdown.ts:297`. Recheck the delegate’s lifetime after engine calls and before subsequent focus work. Ordinary Escape focus restoration remains correct while the delegate is live.

   **The disabled-click comparison in the claim is false.** Bootstrap’s dropdown click handler uses `SELECTOR_DATA_TOGGLE`, which already excludes `.disabled` and `:disabled` (`dropdown.js:55`, `:444`). `component-functions.js` implements dismiss triggers, not this toggle route. Leaving a disabled dropdown toggle’s default action untouched matches this Bootstrap route; do not “repair” it to match the claim.

   E12’s preflight holds for the source inspected: the conflict set contains only in-root hosts whose route registry is empty; refusal happens before marking or prevention (`Delegate.ts:193`, `:202`). Existing engines remove only their own construction candidate. Nested delegates share route-and-host marks. A delegate destroyed during an earlier click route stops before marking Dropdown (`:251`), leaving that route available to a live outer delegate.

   Proof bindings:
   - Click routing/prevention (`Delegate.test.ts:1017`): omit the route or prevention; log `:56`, `:57`.
   - Replaced vocabulary (`:1055`): ignore selectors/classes; log `:58`, `:59`.
   - Arrow navigation (`:1087`): omit the key listener, enable wrapping, or remove entry filters; log `:60`, `:61`, `:62`. Its hidden fixture uses `display: none`, not `visibility: hidden`.
   - Escape/text fields (`:1128`): remove the text-field guard or toggle focus; log `:63`, `:64`.
   - Disabled toggles (`:1169`): remove disabled selector exclusions; log `:65`.
   - Menu-to-toggle lookup (`:1197`): remove preceding-sibling lookup; log `:66`.
   - Nested roots (`:1231`): remove the **click** mark; log `:67`. This does not bind the keyboard mark. With that keyboard mark removed, the outer Escape route sees an already-hidden menu and returns at `Delegate.ts:277`; the existing event assertions still pass. Use a prevented hide so duplicate key routing becomes observable.
   - Same-host conflict (`:1263`): omit Dropdown’s construction candidate; log `:68`.
   - Observer release (`:1286`): discard live Dropdown ownership; log `:69`.
   - Vocabulary validation (`:1305`): substitute selector validation for class validation; log `:70`.

   The listener-count assertion at `Delegate.test.ts:248` distinguishes omission of root registration by inspection, but the retained key-listener mutation changes its event name and preserves the registration count.

6. **UNRESOLVED — Guard, tables, parsers, helper, and their proof bindings.** The ordinary source behavior survives the attacks inspected: malformed and throwing event payloads are contained; dismissal values map correctly; offsets reject malformed arity, string array members, blanks, and non-finite values through the installed `parseNumber`; static display accepts the stated literals; neighbor selection wraps and clamps for the entry population. Evidence: `validators.ts:162`, `parsers.ts:49`, `:72`, `:99`, `helpers.ts:311`; installed Contract `dist/src/core/index.js:6891`.

   Recorded bindings hold for:
   - Event shape and containment (`validators.test.ts:172`, `:197`): accept any click or remove containment; log `:71`, `:72`.
   - Dismissal mapping/rejection (`parsers.test.ts:47`, `:56`): swap inside/outside or accept unknown values; log `:73`, `:74`.
   - Offset rejection (`parsers.test.ts:81`): relax arity or permit string array members; log `:75`, `:76`.
   - Static/dynamic mapping (`parsers.test.ts:99`): map dynamic to true; log `:77`.
   - Neighbor wrap, absent current, and clamp (`helpers.test.ts:605`, `:612`, `:597`): remove the corresponding branch; log `:78`, `:79`, `:80`. The singleton case at `:620` genuinely distinguishes missing clamping and is named in the joined failures.
   - Dropdown table freezing (`Dropdown.test.ts:21`): unfreeze the nested center table; log `:34`.
   - Barrel exports (`index.test.ts:17`): remove the class exports; log `:81`.

   The report’s complete behavioral-red binding remains unproved for the positive offset case, invalid static-value case, and frozen Placement tables. Their assertions would distinguish, respectively, reversing the returned pair, accepting an unknown display value, and unfreezing `PLACEMENT_DEFAULTS.offset`; those controls are absent from the instrument. The initial missing-export failures are collection failures, not substitutes (`j-dropdown-red.log.txt:14`). Record those behavioral controls to settle this clause.

7. **BROKEN — Guide and returned patch.** The statement that Placement promotes every nonstatic menu (`guides/veneer.md:834`) and the successful-show description (`:813`) are false for the canceled native opening in claim 2. The keyboard focus description (`:938`) also promises movement that the hidden-entry vector in claim 5 prevents. The returned patch changes neither behavior.

   The returned contract changes correctly add in-flight refusal and token takeover to `types.ts:852` and `:862`, and account for the key listener at `:113` and `:140`. They do not close the placement lifetime boundary. The guide explicitly documents D5 at `:926`; that accurately describes the implementation but conflicts with the governing no-post-destruction-write rule.

   Attacks against the example’s connection prerequisite and constructor shape failed: the example connects the wrapper before showing and supplies supported options (`guides/veneer.md:469`). The Surface summaries and returned method-summary replacement agree by source inspection. The exclusion of `boundary` and `popperConfig` follows amended R9. Omitting the returned Delegation hunk respects the stated W5 ownership boundary.

   Post-application guide parity is **UNRESOLVED**: the recorded guide gate tested the current, unpatched tree. The Orchestrator must apply the accepted hunks and obtain the corresponding parity reading.

8. **UNRESOLVED — Scope, gates, and mutation custody.** The required `j-dropdown-mutations-orchestrator.log.txt` is absent. The Orchestrator’s replay settles that clause.

   The retained status and diff support the stated file boundary, including the declared helper exception. The prohibited-syntax attack found no new forbidden assertion, suppression, access modifier, or runtime Bootstrap wire name. The `as const` tuples are permitted by `typescript.md`; the unchanged Compatibility obligation retains Bootstrap names intentionally. Existing invoked guards outside the new route are the separately assigned J-ISINSTANCE work, not a new Dropdown finding.

   The Orchestrator’s supplied gate results are accepted as established and were not rerun. The accepted mutation log contains successful baselines and ends:

   `receipt: restored byte for byte`

   That receipt certifies the writer’s restoration comparison, not independent replay. The earlier log records missed hide-token, fixed-position, and preceding-toggle controls (`j-dropdown-mutations-first-run.log.txt:40`, `:43`, `:66`); the final assertions address those mechanisms (`Dropdown.test.ts:1115`, `Placement.test.ts:249`, `Delegate.test.ts:1200`). The exact historical claim that no mutation row was weakened cannot be established from logs containing labels and outcomes without the earlier instrument version.

**Findings fitting no claim:** none.

**Attacked and held:** Construction performs no DOM writes before ownership; pre-change prevention leaves the pending operation unwritten; ordinary show-dispatch reentry completes the inner show and refuses the outer one. These differ from native promotion cancellation, which never changes the menu token the existing door checks. Reactions that remove the newly added menu token or restore the removed token stop subsequent Dropdown writes; their partial states are intentional takeover outcomes, not grounds to force completion. E12 remains per delegate: separately configured nested roots can acquire different engine classes without violating that ruling. Existing CSS-hidden-by-`display` entries are excluded; the visibility defect concerns elements that retain a box.

**Referrals:** Carry promotion refusal, abortable Placement construction, and the missing post-restoration door into the Dropdown/Placement fix unit, with the necessary `types.ts` change returned for integration. Carry keyboard visibility, post-destruction focus, and keyboard-mark proof binding into the Delegate fix. Correct the claim’s disabled-click and dropdown-SCSS attributions. Retain D1 and D4; reject D5 as an exception to the lifetime invariant. Reconcile the shared helper, key route, and named Dropdown vocabulary at landing without reintroducing duplicate implementations.

**Bounds:** This is a source-and-record review. The new behavioral interleavings are derived from the code and platform specifications, not newly executed Chromium observations; the Orchestrator must reproduce them before prescribing fixes. No browser test, build, mutation, file write, or subagent was run. No `prove` call was made or refused. Tool discovery listed `mcp__probe__prove`, contrary to the brief’s availability premise; executing browser proofs or mutations remained outside this lane’s permission. Source/test paths refer to the Dropdown worktree; evidence basenames refer to the brief’s `engine/units` directory.

VERDICT: FAIL 2, 3, 5, 6, 7, 8; outside the claims: none
