<!-- Design round, objective lane: `analyst` on GPT-6 Astra (codex exec, read-only, rooted at scaffold), returned 2026-09-22. Brief: units/realign-design-brief.md. Journal: tmp/codex/realign-design-analyst.jsonl (launch journal, swept at acceptance); thread 01a0c93f-b663-78e3-8eec-271d2b9a35f1. Blind report, retained verbatim. -->

## Design

## Alternatives

## Constraints

I held the **objective analyst lane on GPT-6 Astra**. This is a read-only proposal. I ran no gate, test, build, or delegate. Paths below use `S` = `/home/user/scaffold`, `V` = `/home/user/veneer`, `T` = `/home/user/orkestrel/test`, and `C` = `S/.orkestrel/veneer`. (`S/tmp/units/realign-design-brief.md:5`)

**1. Plan shape.** Replace the diary-shaped plan with an executable `V/ROADMAP.md`. Carry the tenets, standing rulings, fixed exit criterion, unit ownership, dependencies, unresolved decisions, and links to decisive evidence. Keep product requirements in `guides/veneer.md`; the roadmap specifies execution. Retire the old plan, handoff, duplicated research status, and closed records through RETENTION. Git history holds the retired record. This follows the efficiency tenet and the retention rule that preserves a plan of record while dissolving orientation documents. (`C/tenets.txt:57`; `S/.agents/skills/orkestrel-debrief/references/retention.md:43`; `S/.agents/skills/orkestrel-debrief/references/retention.md:94`)

**2. Foundation self-containment.** TEST-RELEASE must repair Test’s lockfile, finish the required browser helper surface, and prepare `0.0.19`. TEST-PUBLISH precedes VENEER-PIN. A clean registry-backed install must then reproduce Veneer’s proofs. A successful run against the unpublished tarball cannot close this requirement. (`C/units/test-tip-vendor.md:3`; `C/units/test-tip-vendor.md:13`; `V/package.json:99`; `C/tenets.txt:7`)

Until publication, continue the plan, evidence mapping, and Test preparation. Keep any tarball experiment isolated and labelled diagnostic. Open no further Veneer component family and claim no distribution readiness. If the user declines publication, the dependency remains open; reducing the proof surface to fit `0.0.18` is not an equivalent solution. (`C/tenets.txt:48`; `C/units/test-tip-vendor.md:16`; `S/.agents/orchestration.md:408`)

**3. Host-dependent assertions.** HOST-OBSERVATIONS must review event and browser observations across the affected test helpers and their callers. Capture dispatch-time facts inside the listener. Retain attached and detached coverage. Where the property itself is host-dependent, probe the required mechanism and state the supported claim; do not branch on a browser name or accept arbitrary output. Change production behavior only if the resulting proof identifies a production defect. (`C/units/event-target-probe.md:3`; `S/.claude/rules/tests.md:35`; `S/.claude/rules/quality.md:70`)

**4. Selector grammar.** Remove the handwritten selector grammar and its dependent syntax scanners. Use declared PostCSS for lossless rule, declaration, and at-rule accounting. Treat selector text as opaque there. Use the browser’s CSSOM for browser parsing and serialization, and real fixtures for selector effects. Do not assume PostCSS supplies a selector AST. Preserve source declarations that Chromium rejects so browser parsing cannot erase an exclusion from the accounting. (`V/tests/setupStyles.ts:2101`; `V/tests/setupStyles.ts:2146`; `V/tests/setupConformance.ts:269`; `V/package.json:107`; `C/tenets.txt:54`; `S/AGENTS.md:32`)

ACCOUNTING must replace every consumer of the removed grammar, including normalization, semantic-selector checks, vocabulary comparison, declaration-value splitting, and shadow readings. A grammar deletion that weakens those proofs is incomplete. Use exact admitted selector records and browser controls instead of another general selector classifier. (`V/tests/setupStyles.ts:655`; `V/tests/setupStyles.ts:1301`; `V/tests/setupStyles.ts:1331`; `V/tests/setupStyles.ts:1958`; `S/.claude/rules/quality.md:72`)

**5. Value accounting.** ACCOUNTING is the first cross-cutting Veneer unit after the dependency prerequisites. It precedes appearance repairs and every further family. It must reconcile independently pinned Bootstrap evidence with authored and emitted Veneer CSS in each direction. (`C/units/value-accounting-finding.md:57`; `C/handoff.md:160`; `C/tenets.txt:40`)

The machine-readable guide tables must identify:

- Compatibility key, selector, property, enclosing conditions, declaration priority, and occurrence/order where relevant.
- Independent upstream value and expected Veneer declaration.
- Disposition: retained, changed, added, or excluded; reason, owner, and proof.
- Token substitution, fallback, alias, logical-property conversion, prefix removal, and build transformation explicitly.
- Every emitted selector, declaration, custom property, and keyframe absent from the upstream contract as an intentional addition.

Reject an unrecorded difference, an extra name, an overlapping disposition, a stale exclusion, and an orphaned proof. Do not collapse duplicate declarations or equate textual changes merely because a default rendering matches. Prove token changes separately against real consumers. (`C/units/value-accounting-finding.md:28`; `C/units/value-accounting-finding.md:40`; `V/tests/setupConformance.ts:857`; `C/tenets.txt:34`)

**6. Compatibility authority.** Make `V/guides/veneer.md` the sole authority for required scope, dispositions, departures, and completion evidence. Its structured tables must be machine-readable through the declared Markdown tooling. Keep `V/tests/fixtures/oracle/inventory.json` as independent upstream evidence, without a competing completion status. Reconcile the research inventory into that fixture, verify provenance, then retire `research/ledger.md` and the duplicate inventory. An `accepted` scope row is not a shipped capability. (`V/guides/veneer.md:894`; `V/guides/veneer.md:1026`; `V/tests/setupConformance.ts:585`; `C/units/g1-record-report.md:115`)

**7. Elements reference.** ELEMENTS-EVIDENCE must establish layout references before layout is treated as visually accepted. G3 identifies sampled layout mechanisms, but does not identify a matched Elements grid specimen. Locate one and record its provenance, or report the missing specimen and obtain a ruling on a constructed comparison. Bootstrap remains the markup and behavior oracle; it does not replace Elements as the appearance reference. (`C/units/g3-references-report.md:9`; `C/units/g3-references-report.md:45`; `C/handoff.md:322`; `C/tenets.txt:22`)

**8. Vue.** Preserve the framework-free engine and the existing core/browser/styles boundary. Remove the optional-peer design from the executable plan. The adapter remains a user dependency decision, detailed under Tensions. Deferral does not satisfy the adapter tenet. (`C/tenets.txt:16`; `C/tenets.txt:19`; `C/plan.md:109`; `C/plan.md:612`; `S/tmp/units/realign-design-brief.md:106`)

**9. Tailwind.** Run TAILWIND after ACCOUNTING, CAPTURE, CLASS-CONTROL, and the required appearance rulings. Do not wait for Card. Button, typography, links, tables, grid, and gap utilities already provide real consumers. Prove standalone Veneer and each supported Tailwind combination in the browser, including reset ownership, prefixes, layer order, normal declarations, important declarations, and token overrides. Extend the collision proof when Collapse lands. (`C/plan.md:599`; `V/src/styles/index.scss:43`; `V/src/styles/utilities/_gap.scss:17`; `C/tenets.txt:31`)

**10. Semantic tags and class control.** The shipped library’s cited table compositions require explicit `.table*` classes; they do not infer the component from bare tag position. The app shell’s `header button` does infer styling from tag ancestry and must become an explicit shell class. Extend the proof beyond the elements layer and remove the blanket mandated-tag-pair exemption. (`C/units/g2-veneer-report.md:152`; `V/app/browser/styles/_shell.scss:25`; `V/tests/setupStyles.ts:1301`; `C/tenets.txt:25`)

Do not claim universal class override from layer order. `.row-gap-*` declares `!important`; the guide already records important-rule precedence. CLASS-CONTROL must prove the normal-declaration contract and expose the important-declaration conflict for a user ruling. Test unlayered consumer classes at equal and lower specificity, semantic context changes, nested components, and caption placement. (`V/src/styles/utilities/_gap.scss:17`; `V/guides/veneer.md:843`; `C/tenets.txt:28`)

**11. Engine shape.** Retain explicit construction and opt-in delegation, typed contracts, ownership, abort-driven cleanup, and a side-effect-free browser import. Inspect Contract’s installed guards before retaining equivalent local guards; `isButtonHost` currently supplies contained `instanceof` behavior already offered by Contract. Do not add wrappers merely to preserve old helper names. (`V/src/browser/Button.ts:21`; `V/src/browser/Delegate.ts:32`; `V/src/browser/validators.ts:28`; `S/guides/contract.md:126`; `S/AGENTS.md:70`)

Adopt these mechanisms at their first real consumer:

| Consumer | Required mechanism and proof |
|---|---|
| Collapse and Accordion | Bootstrap class/markup states; trigger ARIA; intrinsic-size coordination; cancellation, reversal, repeated activation, reduced motion, and teardown during motion. |
| Dropdown | Explicit initialization; keyboard navigation, dismissal, focus return, positioning, and nested-container behavior. |
| Modal and Offcanvas | Focus containment and restoration, Escape/backdrop behavior, scroll ownership, interrupted transitions, and cleanup. Investigate native dialog/popover paths without requiring incompatible replacement markup. |
| Tooltip and Popover | Trigger ownership, accessible relationships, positioning, clipping, content sanitization, dismissal, and interrupted entry/exit. |
| Toast and Alert | Announcement and dismissal behavior; owned timers where required; no late mutation after destruction. |
| Carousel | Keyboard behavior, slide lifecycle, interruption, autoplay ownership, reduced motion, and cleanup. |
| Passive components | CSS, semantics, tokens, and motion where present; no runtime class without behavior that needs one. |
| Navs, Tabs, Navbar, Scrollspy | Selection and disclosure composition, keyboard behavior, responsive transitions, and native observation where it satisfies the contract. |

Use cancelable pre-change events and completed notifications where the compatibility contract requires them. Derive motion completion from the actual transition/animation and own its cancellation; do not copy the references’ fixed fallback as a universal completion clock. Native APIs must earn adoption through the same behavior and rendered proofs. (`C/units/g3-references-report.md:13`; `C/units/g3-references-report.md:15`; `C/units/g3-references-report.md:21`; `C/units/g3-references-report.md:23`; `C/plan.md:552`; `C/tenets.txt:43`)

**12. Process cost.** Use the existing distillates until a unit exposes a specific reading gap. Run the required blind design lanes over the family’s shared decisions, reconcile a fixed contract, then dispatch component units with bounded ownership. A new mechanism or changed acceptance criterion receives its own design decision. Keep a writer per checkout and serialize shared-file edits. (`S/.agents/orchestration.md:340`; `S/.agents/orchestration.md:343`; `S/.agents/orchestration.md:353`)

Audit each nontrivial implementation through the objective and subjective lanes, with an engine independent of the writer. Add the mechanical checker when the criteria require it. Supply executed attacks or request them from the Orchestrator; label an unexecuted behavioral review as source review. Use an independent verifier for the authoritative gates. (`S/.agents/orchestration.md:362`; `S/.agents/orchestration.md:389`; `S/.claude/rules/quality.md:93`)

Accept a falsifiable clean round. A verbatim prescribed fix may close through the permitted mutation proof; a changed prescription receives cross-engine review. Repeated failure at a seam changes the search strategy under the existing budget. Do not repeat whole-family discovery, add new aesthetic preferences to a fixed acceptance inventory, rerun clean gates without a changed subject, or reopen accepted claims without new evidence. (`S/.claude/rules/quality.md:80`; `S/.claude/rules/quality.md:84`; `S/.claude/rules/quality.md:87`; `S/AGENTS.md:114`; `S/.agents/skills/orkestrel-polish-surface/SKILL.md:78`)

**13. Carriers.** The carrier table under Tensions assigns every item in G1 §D. A historic “satisfied” statement requires a resolving closure citation; it does not automatically create another repair round. (`C/units/g1-record-report.md:147`; `S/.agents/skills/orkestrel-debrief/references/retention.md:66`)

**14. Exit criterion.** Close these capabilities explicitly:

- **Package foundation:** registry-backed clean installation; authoritative types and exports; environment isolation; declared dependency reuse; fresh builds; passing required gates and packed-consumer proofs.
- **Compatibility:** the complete accepted Bootstrap scope, including remaining passive, form, disclosure, navigation, overlay, utility, and shared-engine obligations. Every required item ends implemented or explicitly excluded by a user ruling.
- **Accounting:** complete selector/declaration/value reconciliation, intentional additions, documented exclusions, and mutation-tested detection of drift.
- **Owned engine:** required interactions work without Bootstrap JavaScript or another forbidden runtime; lifecycle, cancellation, focus, motion, and cleanup close with each component.
- **Elements identity:** layout and appearance decisions have matched evidence and recorded user rulings; unresolved palette or motion questions cannot be silently accepted.
- **Semantic defaults and control:** independent tag defaults, class-selected composition, proven overrides, and a ruled important-declaration contract.
- **Tokens and Tailwind:** real consumer customization and supported combinations pass rendered proofs; Veneer works independently.
- **Browser evidence:** reachable journeys, refusals, state transitions, resolved styles, comparable captures, accessibility, and the promised browser receipts.
- **Vue compatibility:** the approved adapter is implemented and proven without creating a forbidden Veneer runtime requirement.
- **Documentation and retention:** the sole guide agrees with the implementation and proofs; accepted records are promoted, closed artifacts are pruned with approval, and no current-scope obligation remains hidden.

These conditions restate the tenets and the existing closing rule. Reordering units cannot remove them. If Vue remains deferred, report an engine/styles milestone with the adapter outstanding; call the whole campaign complete only after delivery or an explicit user rescope. (`C/tenets.txt:7`; `C/tenets.txt:10`; `C/tenets.txt:19`; `C/tenets.txt:22`; `C/tenets.txt:25`; `C/tenets.txt:31`; `C/tenets.txt:34`; `C/tenets.txt:37`; `C/tenets.txt:40`; `C/tenets.txt:48`; `C/plan.md:552`; `S/.agents/orchestration.md:408`)

## Refusals

- **2:** Do not relabel an unpublished Test tarball as registry `0.0.18`, commit a scratchpad tarball dependency, or suppress missing-helper proofs to make the lockfile appear sufficient. (`C/units/test-tip-vendor.md:8`)
- **3:** Do not weaken event assertions to accept either host or `null`, remove detached coverage, or change event behavior merely to satisfy a post-dispatch observation. (`C/units/event-target-probe.md:8`)
- **4–6:** Do not retain a second CSS parser, normalize away unaccounted changes, use Veneer’s output as its own oracle, or preserve competing completion ledgers. (`S/AGENTS.md:32`; `C/tenets.txt:40`; `C/units/value-accounting-finding.md:57`)
- **8, 11:** Do not copy reference reactivity, import Bootstrap JavaScript into the implementation, bundle forbidden runtimes, hide them as peers, invent a Vue environment, or introduce speculative shared engines. (`C/tenets.txt:13`; `C/tenets.txt:16`; `S/AGENTS.md:71`; `S/tmp/units/realign-design-brief.md:106`)
- **9–10:** Do not add Tailwind without the required dependency ruling, call an untested combination supported, or claim that layers defeat every important utility. (`S/AGENTS.md:43`; `C/tenets.txt:31`; `V/src/styles/utilities/_gap.scss:18`)
- **12–14:** Do not substitute source review for behavioral falsification, treat record volume as proof of wasted rounds, lower the exit criterion during re-baselining, perform RTL work, or amend scaffold rules to excuse this package. (`S/.claude/rules/quality.md:93`; `S/.agents/orchestration.md:408`; `S/tmp/units/realign-design-brief.md:106`)
- **1, 13:** Do not delete campaign evidence or temporary files until the retention checks close and the owner explicitly approves the reviewed disposition. (`S/.agents/skills/orkestrel-debrief/references/retention.md:20`)

## Measurements

The command outcomes below are the Orchestrator’s retained measurements, not executions by this lane.

| Question | Evidence | What it establishes |
|---|---|---|
| 2 | `C/units/veneer-baseline.log.txt:10`, `:16`, `:22`, `:56`, `:141`, `:174` | Lockfile baseline: format and lint exit `0`; check exits `2`; build exits `0`; test exits `1`. Missing Test exports prevent acceptance. |
| 2–3 | `C/units/veneer-baseline-2.log.txt:46`, `:131`, `:148`, `:170`, `:195` | With the unpublished tip installed, check and build exit `0`; browser assertions still leave test at exit `1`. |
| 2 | `C/units/test-tip-vendor.md:13` | Test’s recorded manifest/lock mismatch is `@types/node` `26.6.2` versus `26.6.1`; `npm ci` refused it. |
| 2 | `C/units/test-tip-vendor.md:18` | Host npm `10.9.7` does not meet the package’s npm `>=11.6.0` requirement. Install receipts used npm 11. |
| 3 | `C/units/event-target-probe.md:3` | Chromium 141 retained the attached target after dispatch and cleared the detached target. The listener-time control saw the host in each fixture. |
| 2, 14 | `C/units/veneer-projects.log.txt:4109`, `:4137`, `:4141`, `:4283`, `:4299`, `:4315` | The recorded styles, journey, setup-browser, conformance, and guide projects exited `0`; the journey receipt includes skips. These receipts do not establish full campaign acceptance. |
| 2, 13 | `T/src/browser/types.ts:193`; `T/src/browser/helpers.ts:2995` | Tip media options expose print and motion. The implementation preserves forced-colours state, but those options do not activate it. Publication alone does not close the forced-colours carrier. |
| 4 | `V/tests/setupStyles.ts:2051`, `:2146`, `:2284`, `:2491` | The local reader handles escapes, grouping, identifiers, combinators, normalization, and unread forms. This is selector grammar, not merely a bounded lookup. |
| 5 | `V/tests/setupConformance.ts:881`; `C/units/value-accounting-finding.md:28` | The inventory reader returns selector strings and property names, discarding declaration values. Existing presence checks cannot notice every value change. |
| 6 | `V/guides/veneer.md:1026`; `C/units/g1-record-report.md:115` | Guide acceptance records scope; the research status is stale. Neither proves completion by itself. |
| 7, 13 | `C/cl13-verdict.md:71`, `:93`, `:105`, `:125` | Retained capture findings concern theme identity, filename alignment, accessibility format, and an uninformative link crop. |
| 10 | `V/app/browser/styles/_shell.scss:25`; `V/src/styles/utilities/_gap.scss:18` | The shell contains `header button`; row-gap utilities are important. The elements-only selector check cannot establish the broader class-control claim. |
| 11 | `V/src/browser/helpers.ts:17`; `V/src/browser/Delegate.ts:32` | The current event helper is non-cancelable; delegation installs a click listener explicitly. Future cancellable lifecycle behavior still needs a contract and implementation. |
| 11 | `C/units/g3-references-report.md:5`, `:7`, `:23` | The reference repositories require `@vue/reactivity`; the recorded transition fallback is `400 ms`, while carousel motion is documented as `600 ms`. Copying the reference engine unchanged would violate the boundary and carry a timing mismatch. |
| 12 | `C/units/g1-record-report.md:125` | The retained plan mixes executable instructions with a long re-baseline diary. Artifact volume alone does not identify which review rounds were unnecessary. |

## Units

These are proposed units. No file is owned or changed by this lane.

For component rows, **component files** means the named component’s style partial, mirrored tests, showcase section and fixtures, plus its entries in the existing types, constants, helpers, barrels, capture registry, and guide. Runtime files are included only where behavior requires them. Dispatches must expand these paths explicitly and serialize shared files. Each component closes contracts, styling, tokens, conformance, journeys, refusals, motion, and documentation before advancement.

| Unit | Role and engine | Checkout | Owned files | Dependencies | Acceptance |
|---|---|---|---|---|---|
| PLAN-RULING | User action | S | None | Reconciled design lanes | Rule on the replacement plan, dependency branches, and decisions identified below. |
| PLAN | `builder` on Sonnet | V | `ROADMAP.md`, `guides/veneer.md` | PLAN-RULING | Publish the concise execution plan and fixed exit; preserve all binding tenets and carriers without a diary. |
| PLAN-BRIDGE | `builder` on Sonnet | S | `C/plan.md`, `C/tenets.txt`, `C/handoff.md` | PLAN | Point execution to the replacement; mark superseded orientation; change no substantive tenet. |
| TEST-RELEASE | `sol` on Astra | T | `package.json`, `package-lock.json`, browser types/helpers/constants/barrel, mirrored tests, package guide | PLAN-RULING | Prepare `0.0.19`; clean install works; imported helpers and forced-colours activation/restoration are proven; package and consumer gates pass. |
| TEST-PUBLISH | User action | T | None | TEST-RELEASE | Publish through OTP; verify registry version, tarball integrity, and exported surface. |
| VENEER-PIN | `builder` on Sonnet | V | `package.json`, `package-lock.json`, mirrored Test guide | TEST-PUBLISH | Lock registry `0.0.19`; clean installation supplies the required exports without local tarball residue. |
| HOST-OBSERVATIONS | `sol` on Astra | V | Browser event tests, `tests/setupBrowser.ts`, its tests | VENEER-PIN | Adopt listener-time observations; preserve attached/detached behavior; close sibling uses with controlled regressions. |
| ACCOUNTING | `sol` on Astra | V | `tests/setupStyles.ts`, `setupConformance.ts`, `setup.ts`, their tests, conformance tests, oracle fixtures, guide tables | VENEER-PIN, HOST-OBSERVATIONS | Remove duplicated CSS grammar; reconcile names and values in each direction; extra names and altered conditions/priority/order fail; guide owns dispositions; every existing departure is classified. |
| FOUNDATION | `sol` on Astra | V | Browser validators/types/barrel and consumers; token registry/tests; policy/config/distribution tests; style wrappers; package scripts; guide | ACCOUNTING | Reuse matching Contract primitives; prove runtime/CSS independence positively; close manual styles-boundary obligations; prevent stale built-CSS receipts; repair token completeness and mirror instruments. |
| CAPTURE | `sol` on Astra | V | `tests/setupBrowser.ts`, its tests, journey suite, app capture registry and fixtures | ACCOUNTING | Frames match declared theme/state/viewport and subject; stems and accessibility outputs compare; palette and link coverage are complete; pixel controls test their claimed condition. |
| ELEMENTS-EVIDENCE | `sol` on Astra | V | Reference fixtures and provenance under `tests/fixtures/`, reference map in guide | CAPTURE | Supply matched Elements layout evidence or an explicit missing-reference finding; prepare reviewable appearance comparisons. |
| APPEARANCE-RULING | User action | V | None | ELEMENTS-EVIDENCE | Decide the appearance questions from the prepared portfolio and measured alternatives. |
| IDENTITY | `opus` on Opus 5 | V | Affected existing token, button, link, heading, mark, and layout styles; corresponding tests/fixtures; guide | APPEARANCE-RULING | Implement the ruled appearance; retain contrast and customization proofs; record every compatibility departure. |
| CLASS-RULING | User action | V | None | ACCOUNTING | Choose the important-utility contract and disposition of inactive highlight aliases. |
| CLASS-CONTROL | `sol` on Astra | V | Gap/reset/table styles, shell styles and markup, corresponding tests, guide | CLASS-RULING, CAPTURE | Replace contextual shell styling; prove consumer override cases; close caption opt-out and gap/column-gap/row-gap accounting. |
| TOOLING-RULING | User action | V and S | None | FOUNDATION evidence | Rule on requested Tailwind tooling and whether later toolchain majors or the vendored pool pin enter a separate scope. |
| TAILWIND | `sol` on Astra | V | Approved tooling manifests, dedicated consumer fixtures/configuration, browser proofs, guide recipes | FOUNDATION, IDENTITY, CLASS-CONTROL, TOOLING-RULING | Prove standalone and supported combinations; identify reset and utility ownership; no Tailwind runtime requirement. |
| PASSIVE | `opus` on Opus 5 | V | Component files for Close button, Badge, Breadcrumb, Button group, Card, List group, Pagination, Placeholder, Progress, Spinners | TAILWIND | Close each named component serially; cover disabled semantics, token effects, and reduced motion where applicable; add no unnecessary engine classes. |
| FORMS | `sol` on Astra | V | Component files for controls, Select, Checks, Switch, Range, Input group, Floating labels, Form layout, Validation | PASSIVE | Close each named capability serially, including native interaction, labeling, invalid/disabled states, theme islands, and class overrides. |
| COLLAPSE | `sol` on Astra | V | Collapse component files; first transition mechanism and its direct tests | FORMS | Close statechart, cancellation, reversal, intrinsic sizing, cleanup, and the Tailwind `.collapse` collision proof. |
| ACCORDION | `sol` on Astra | V | Accordion component files | COLLAPSE | Close group behavior and trigger state through the shared Collapse mechanism. |
| NAVS-TABS | `sol` on Astra | V | Nav and Tab component files | ACCORDION | Close selection, keyboard navigation, focus, transitions, and explicit class styling. |
| DROPDOWN | `sol` on Astra | V | Dropdown component files; first positioning/dismissal mechanisms and tests | NAVS-TABS | Close keyboard, dismissal, positioning, disabled targets, nesting, and teardown. |
| NAVBAR | `sol` on Astra | V | Navbar component files and container/navigation accounting | DROPDOWN | Close responsive composition and previously dangling navigation selectors. |
| SCROLLSPY | `sol` on Astra | V | Scrollspy component files and observer tests | NAVBAR | Prove real scrolling, active-target changes, offset behavior, and observer cleanup. |
| MODAL | `sol` on Astra | V | Modal component files; first focus/scroll ownership mechanisms and tests | SCROLLSPY | Close Bootstrap hosts, native-path decision, focus, backdrop/Escape, interrupted motion, and restoration. |
| OFFCANVAS | `sol` on Astra | V | Offcanvas component files | MODAL | Reuse focus/scroll mechanisms; prove each supported placement, responsive state, dismissal, and interrupted motion. |
| TOOLTIP | `sol` on Astra | V | Tooltip component files; first content-safety mechanism and tests | OFFCANVAS | Close triggers, accessible relationships, positioning, safe content, motion, and teardown. |
| POPOVER | `sol` on Astra | V | Popover component files | TOOLTIP | Close native capability decision, interactive content, dismissal, first-open visibility, positioning, and cleanup. |
| ALERT | `sol` on Astra | V | Alert component files | POPOVER | Close dismissal, notification semantics, transition completion, and removal ownership. |
| TOAST | `sol` on Astra | V | Toast component files | ALERT | Close announcements, autohide, pause/dismiss behavior, interruption, and timer cleanup. |
| CAROUSEL | `sol` on Astra | V | Carousel component files | TOAST | Close keyboard/sliding/autoplay/reduced-motion behavior; completion follows actual motion; teardown leaves no late work. |
| UTILITIES | `sol` on Astra | V | Remaining helper/utility partials, mirrored tests, consumer specimens, guide | CAROUSEL | Reconcile the remaining pinned utility scope; prove representative real consumers and every distinct mechanism; leave no unnamed helper subject. |
| VUE-RULING | User action | V | None | PLAN-RULING; adapter contract evidence | Choose delivery and timing, or explicitly rescope campaign completion. |
| VUE-ADAPTER | `sol` on Astra | V | Approved adapter files within existing browser surface, types/barrel, real Vue consumer tests, guide | VUE-RULING, sufficient completed engine consumers | Recommended injection delivery imports no Vue; real Vue mounting, updates, events, and unmount cleanup work; the engine remains independent. A different delivery requires revised ownership before dispatch. |
| BROWSER-RECEIPTS | `sol` on Astra | V | Browser receipt fixtures/manifests and guide support statement | Completed surface; promised browser hosts available | Record actual Chrome/Edge versions and behavior; run the agreed journeys and captures; never relabel Chromium 141 as the managed target. |
| EXIT | `sol` on Astra | V | Remaining parity/distribution proofs, guide, `ROADMAP.md` | All required implementation units and rulings | Reconcile every exit capability; independent audits and verifier close on the landed tree and packed artifacts. |
| RETENTION-PREPARE | `builder` on Sonnet | S | Carrier/disposition record; retained campaign inputs; attributable temporary records | PLAN-BRIDGE for realignment retirement; EXIT for final retirement | Close carry, promotion, dated-measurement, and orientation checks; preserve instruments as tests; identify exact deletion paths and promoted destinations. |
| RETENTION | User action | S | Only the reviewed deletion set, including attributable `This` and `TypeScript` debris | RETENTION-PREPARE; no live unit using the files | Approve deletion explicitly; commit the reviewed prune with its promotion record. Preserve the roadmap and all outstanding work. |

## Tensions

**1. Replacement location.** Recommend `V/ROADMAP.md`: it survives campaign retirement and keeps the executable plan beside the implementation. Replacing `C/plan.md` in place is cheaper immediately, but requires a later transfer before the campaign folder can be pruned. Do not maintain executable copies in each location. (`S/.agents/skills/orkestrel-debrief/references/retention.md:43`)

**2. Publication timing — user decision.** Publish Test `0.0.19` after TEST-RELEASE, then re-pin Veneer: this closes reproducibility and permits family work. Delaying publication permits independent preparation but leaves the family queue blocked. Recommend the release path. Publication is not authorized by this design brief.

**4. Parser choice.**

| Option | Cost and accounting consequence | Ruling |
|---|---|---|
| Keep the handwritten grammar | Retains current callers but continues the duplicate-parser departure and its maintenance burden. | Refuse. |
| CSSOM alone | Uses the browser parser, but loses rejected declarations and source provenance; cannot alone account for every upstream difference. | Insufficient alone. |
| Declared PostCSS alone | Preserves declarations and conditions, but does not provide the required selector grammar or prove rendered behavior. | Use for source accounting. |
| PostCSS plus CSSOM and browser fixtures | Requires replacing current grammar-dependent assertions; preserves source accounting and obtains browser semantics without another parser. | Recommend. |

**7. Appearance — user decisions.** ELEMENTS-EVIDENCE prepares the following comparisons; APPEARANCE-RULING decides them and IDENTITY lands the result.

| Question | Evidence that makes the decision reviewable | Options, cost, recommendation |
|---|---|---|
| Outline ghost and repaired control beside Outline secondary | Same canvas, theme, dimensions, labels, rest/hover/focus/pressed frames; contrast and hit-target readings. | Retain the measured treatment or adjust fill/border/spacing. Adjustments cost an explicit reference departure; recommend choosing only after matched frames. |
| Dark primary white text | Foreground/background readings and captures for every active state, with compliant foreground and fill alternatives. | Change foreground or fill; exact reference retention preserves the recorded contrast failure. Recommend a compliant alternative and record the visual departure. |
| Latched `.active` versus held `:active` | Separate click-latched and pointer-held journeys in each theme. | Preserve equivalence or distinguish persistent selection. The latter changes the state palette; recommend making the choice from the distinct state frames. |
| Fixed heading scale | Matched Elements and Veneer headings across breakpoints, including long text and class twins. | Retain fixed scale or adopt a ruled responsive scale. A responsive scale changes geometry and compatibility records; recommend retaining only after layout comparison. |
| Mark system colours | Ordinary and forced-colours frames; token and Bootstrap-alias override demonstrations. | Keep system-colour defaults or restore Bootstrap-controlled highlight behavior. Recommend system defaults only with a clear, proven customization contract. |
| Links and link-styled buttons | Matching link and button frames on their actual backgrounds, including hover/focus/active and measured colours. | Retain the calibrated values or retune the shared link tokens. Retuning affects the closed Button surface; recommend a shared ruling and regression coverage. |
| Layout/grid reference | Matched containers, gutters, wrapping, and responsive examples from Elements; provenance for each specimen. | Use an existing specimen, or approve a constructed reference where none exists. Recommend the existing specimen when found; never imply one was measured when it was not. |

These are unresolved acceptance inputs, not invitations for the analyst to choose the user’s preferred appearance. (`C/handoff.md:300`; `C/units/g1-record-report.md:151`; `C/units/g3-references-report.md:9`)

**8. Vue — user decision.**

| Delivery | Cost | Recommendation |
|---|---|---|
| Inject consumer-owned reactivity and lifecycle primitives; adapter imports no Vue | Requires a narrow integration contract and real Vue consumer proofs; avoids framework imports and a new environment. | Prefer. |
| `./vue` entry imports Vue as an undeclared external | Hides a runtime requirement and creates consumer resolution failures; conflicts with the tenet’s substance. | Refuse. |
| Separate integration package | Adds package ownership, release coordination, and consumer documentation; can keep Veneer independent if Veneer never depends on it. | Valid alternative only after explicit package/dependency scope approval. |

Do not replace the optional-peer proposal with another hidden dependency. If the user keeps Vue deferred, retain the adapter as an unmet tenet rather than silently changing the campaign exit. (`C/tenets.txt:16`; `C/tenets.txt:19`; `C/plan.md:612`)

**9. Tailwind tooling — user decision.** Approve a pinned development-only fixture dependency, or supply a pinned built reference fixture with reproducible provenance. The installed Veneer manifest does not currently declare Tailwind. Recommend approved development tooling so the supported combinations can be rebuilt and tested. (`V/package.json:91`)

**10. Important utilities — user decision.** Preserve Bootstrap’s important utility behavior and narrow the override promise explicitly, or remove that importance and record a compatibility departure. Recommend normal declarations for unrestricted consumer control, with every changed Bootstrap utility recorded. Do not silently remove importance from semantic mechanisms such as `[hidden]`; that needs its own behavior proof and ruling. (`V/src/styles/utilities/_gap.scss:18`; `V/src/styles/_reset.scss:6`; `V/guides/veneer.md:843`)

**12. Round cost.** The avoidable costs are duplicated context absorption, a fresh full audit where the prescribed mutation closure applies, repeated review of unchanged clean claims, open-ended aesthetic additions, and prose reconciliation without a falsifying instrument. Keep the mandated independent lanes and verifier. The retained file volume does not establish how often each avoidable activity occurred. (`S/.claude/rules/quality.md:80`; `S/.claude/rules/quality.md:84`; `C/units/g1-record-report.md:125`)

**13. Complete carrier disposition.**

| G1 §D item | Carrier or proposed drop |
|---|---|
| Outline ghost; dark primary contrast; latched active; repaired neighbouring control | ELEMENTS-EVIDENCE → APPEARANCE-RULING → IDENTITY. |
| Fixed headings; Mark defaults; link colours; link-styled button colours | ELEMENTS-EVIDENCE → APPEARANCE-RULING → IDENTITY. |
| Inactive highlight token pair | CLASS-RULING → CLASS-CONTROL. Recommend retaining required Bootstrap aliases with an honest non-consuming status, or restoring a consumer; remove only under an explicit incompatibility ruling. |
| Grid judged only against Bootstrap | ELEMENTS-EVIDENCE. Prior acceptance does not supply missing Elements evidence. |
| Dropped vendor prefixes | ACCOUNTING and BROWSER-RECEIPTS; record the exact omitted declarations and supported-host consequence. |
| `::-moz-focus-inner` exclusion | ACCOUNTING; retain the explicit Chromium-scope exclusion. No Gecko or RTL expansion. |
| Separate deferral grammars | ACCOUNTING; merge disposition semantics in the sole guide. |
| Container/navigation combinators before Navbar | ACCOUNTING classifies their current ownership; NAVBAR closes their behavior and specimens. |
| Later Vitest/provider/TypeScript majors | TOOLING-RULING. Recommend dropping an automatic upgrade from this campaign unless a required capability needs it. |
| Vendored `pool: 'forks'` pin | TOOLING-RULING. Recommend retaining the pin; a scaffold-wide change needs separate ownership and proof. |
| Forced colours | TEST-RELEASE → VENEER-PIN → CAPTURE; activation and restoration must be exercised. |
| Chrome receipt | BROWSER-RECEIPTS; remains open while the promised host is unavailable. |
| Legacy U1-del tree | RETENTION-PREPARE → RETENTION. Recommend history retention after proving no live consumer needs the working copy. |
| Cross-cutting reconciliation | ACCOUNTING, before family work. |
| `gap`, `column-gap`, `row-gap` | ACCOUNTING identifies the surface; CLASS-CONTROL closes the shared behavior and override decision. |
| U7c paint calibration | ELEMENTS-EVIDENCE → IDENTITY; preserve dated provenance and distinguish measured values from derived ones. |
| Frame grammar; filename stems | CAPTURE, before appearance rulings. |
| One-sided palette | CAPTURE supplies matched coverage; IDENTITY consumes the ruling. |
| Caption opt-out | CLASS-CONTROL supplies a working consumer class, visible specimen, and guide recipe. |
| Incomparable accessibility artifacts | CAPTURE uses matching subject and output format. |
| Portfolio finding 5: differing context | CAPTURE proves comparable context or records a bounded comparison; no unsupported identity claim. |
| Portfolio finding 7: ineffective link crop | CAPTURE includes the link’s actual background and relevant context. |
| Link frame captures only an anchor | CAPTURE includes the complete multi-element subject. |
| Helper without a subject region | CAPTURE establishes the subject contract; UTILITIES supplies each remaining real consumer. |
| Normalizer regression’s local inventory literal | ACCOUNTING centralizes the data or removes the obsolete case when replacing the grammar; retain the load-bearing regression. |
| Pixel guard only under capture flag | CAPTURE gives the guard an ordinary controlled regression and runs actual portfolio validation at acceptance. |
| Origin-pixel sampler | CAPTURE replaces or narrows the measurement to the claimed subject; a variation reading is not a contrast or completeness proof. |
| “Specimen” collision; mirror basename comparison; token-table completeness | CAPTURE owns vocabulary; FOUNDATION owns path identity and semantic token coverage. Drop mutable prose totals as acceptance claims. |
| Stripe light-scope assertion | CAPTURE repairs the theme-specific proof without presenting it as all-theme coverage. |
| Document-global `main` id | CLASS-CONTROL scopes shell ownership and proves repeated mounting. |
| Description-list case field name | FOUNDATION makes the case vocabulary conform and updates its consumers. |
| `visitBreakpoint` cleanup; hold refusals; `resolveButton` rename; `driveOracle` root scope | RETENTION-PREPARE verifies the cited CL11 closures against landed files. Drop the stale carry if satisfied; otherwise assign the exact unresolved behavior to CAPTURE. |
| CL12 guide bounds | RETENTION-PREPARE resolves each closure citation. Drop satisfied carries; assign any unresolved guide obligation to FOUNDATION with its exact subject. |

Carrier sources: `C/units/g1-record-report.md:151`, `:165`, `:174`, `:181`, `:187`; portfolio detail: `C/cl13-verdict.md:116`, `:125`.

**14. Completion versus deferral.** User-approved exclusions may close a named compatibility obligation. An unresolved choice, missing browser receipt, unpublished dependency, or deferred adapter does not. A narrower milestone can be accepted without representing it as completion of every tenet. (`S/.agents/orchestration.md:350`; `S/.agents/orchestration.md:408`)

## Risks

- **2–3:** Current browser receipts describe Chromium 141 and a substituted Test installation. They cannot certify the promised managed browser or a clean registry consumer. (`C/units/event-target-probe.md:3`; `C/units/test-tip-vendor.md:8`)
- **4–6:** Replacing the grammar can accidentally weaken accounting. Preserve raw upstream evidence and require controls for deleted values, altered conditions, extra selectors, declaration priority, and unsupported syntax before accepting the replacement. (`V/tests/setupConformance.ts:857`; `S/.claude/rules/quality.md:72`)
- **7, 11:** G3 is sampled reference evidence. Recorded browser defects and native mechanisms guide probes; they do not establish current behavior on Veneer’s target hosts. (`C/units/g3-references-report.md:9`; `C/units/g3-references-report.md:51`)
- **7, 10:** Exact Elements appearance, Bootstrap compatibility, contrast, and unrestricted overrides can conflict. Each conflict needs a visible alternative and a recorded ruling, not an implicit priority chosen during implementation. (`C/handoff.md:303`; `C/tenets.txt:10`; `C/tenets.txt:28`)
- **11:** Shared focus, positioning, motion, and lifecycle work can grow into a speculative framework. Introduce mechanisms with their named consumers and close reachable obligations only. (`S/AGENTS.md:71`; `S/.claude/rules/quality.md:85`)
- **12–14:** Retiring the diary before promoting its open obligations would lose scope. RETENTION remains dependent on resolving every carrier and on explicit approval. (`S/.agents/skills/orkestrel-debrief/references/retention.md:20`; `S/.agents/skills/orkestrel-debrief/references/retention.md:66`)