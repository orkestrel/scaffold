<!-- Grok lane exit-evidence, session 8266f728-7be6-41d2-bf67-a1cbd537a55d -->

I'll read the brief and follow it exactly.The brief asks for read-only evidence on each J-ENGINE exit item. I'll start with the verdict, session brief, and E26.Exit items are nine verdict criteria, six kickoff criteria, and the J-ORACLE addition. Next I’ll match each one against Veneer’s tree and the landing records.The plan still lists later units as queued. I’ll pin the commit and then match each exit item to source, proofs, and the guide.Plugin rows are `shipped` with test-file proofs; the cross-cutting `engine` rows are still `accepted`. I’ll map the five proof concerns and the remaining mechanisms.Question

At Veneer `origin/main` `0865c67`, which J-ENGINE exit items hold, and where is the evidence?

Evidence

**Exit 1.** holds. Public contracts are in `veneer/src/browser/types.ts:4` through `veneer/src/browser/types.ts:2372`, re-exported by `veneer/src/browser/index.ts:1`. `veneer/src/core/types.ts:8`–`16` holds only `TokenLeaf`, `TokenMap`, and `TokenName`. The unchanged-core ruling is `scaffold/.orkestrel/veneer/engine/j-engine-design-verdict.md:59`.

**Exit 2** (item 2 plus R19). holds. Events: `veneer/src/browser/helpers.ts:32` (`emitEvent`); first consumer `veneer/src/browser/Button.ts:109`; `.vn.` wire in `scaffold/.orkestrel/veneer/engine/j-engine-design-verdict.md:85`. Ownership: `veneer/src/browser/Registry.ts` with `HostSnapshot` consumed from `veneer/src/browser/Button.ts`. Delegation: `veneer/src/browser/Delegate.ts:231`. Transition completion: `veneer/src/browser/helpers.ts:96`, first consumer `veneer/src/browser/Collapse.ts:193`. R19 groups: `veneer/src/browser/types.ts:51` (`ButtonClassMap` and the later `*ClassMap` / `*AttributeMap` / `*SelectorMap` interfaces). No `TRANSITION_END`, `executeAfterTransition`, or fixed fallback in `veneer/src`. Fallback refusal: `veneer/tests/src/browser/Alert.test.ts:180`.

**Exit 3** (sanitizer port and native adapter). holds. Focus: `veneer/src/browser/Isolation.ts:132`, rove `veneer/src/browser/helpers.ts:332` (`computeNeighbor`), return `veneer/src/browser/Delegate.ts:888`. Placement: `veneer/src/browser/Placement.ts`, first consumer `veneer/src/browser/Dropdown.ts`. `boundary` and `popperConfig` excluded: `veneer/guides/veneer.md:1755` and `veneer/guides/veneer.md:2830`. Backdrop `veneer/src/browser/Backdrop.ts` (Modal `veneer/src/browser/Modal.ts`). Scroll lock `veneer/src/browser/ScrollLock.ts`. Swipe `veneer/src/browser/Swipe.ts` (Carousel). Sanitizer port: `veneer/src/browser/sanitizers/ConfigSanitizer.ts:87` over `veneer/src/browser/constants.ts:632`, first consumer `veneer/tests/src/browser/Tooltip.test.ts:469`. Template: `veneer/src/browser/helpers.ts:521` and `veneer/src/browser/helpers.ts:554`.

**Exit 4.** partly. Eleven `plugin` rows and Button have proofs under `veneer/tests/src/browser/`, but not every component has all five concerns. Gap, per kickoff item 3 below: Dropdown motion; ScrollSpy cancellation, focus, and motion; Popover cancellation; Button focus and motion.

**Exit 5.** partly. All eleven `plugin` rows are `shipped` with a Proof path: Collapse `veneer/guides/veneer.md:10518`, Dropdown `:10519`, Tab `:10520`, ScrollSpy `:10521`, Alert `:10522`, Carousel `:10523`, Offcanvas `:10524`, Tooltip `:10525`, Popover `:10526`, Modal `:10527`, Toast `:10528`. Cascade keys had landed (`scaffold/.orkestrel/veneer/engine/plan.md:51`). The cross-cutting `engine` rows stay `accepted` with Proof `—`, including carried rows R15 says flip to `shipped` (`scaffold/.orkestrel/veneer/engine/j-engine-design-verdict.md:25`; identity `veneer/guides/veneer.md:10497`, config merge `:10507`, data `:10510`). Gap: J-ROWS, still queued (`scaffold/.orkestrel/veneer/engine/plan.md:42` and `:70`).

**Exit 6.** holds. R14 as amended: `scaffold/.orkestrel/veneer/engine/j-engine-design-verdict.md:95`. User rulings E8 and E9: `scaffold/.orkestrel/veneer/engine/decisions.md:35` and `:39`. Runtime dependency is only `@orkestrel/contract` (`veneer/package.json:92`–`94`).

**Exit 7.** holds. `./browser/auto` refused: `veneer/ROADMAP.md:100`. jQuery excluded: `veneer/guides/veneer.md:10547`. `isRTL` recorded as not swapping arrows: `veneer/guides/veneer.md:1992`. `CloseWatcher` not adopted: `veneer/guides/veneer.md:2307`. None of those names appear under `veneer/src`.

**Exit 8.** holds. `veneer/src/browser/ColorMode.ts:72`–`78` and `:89`–`94` return before any write once destroyed. Proofs: `veneer/tests/src/browser/ColorMode.test.ts:263` and `:286`.

**Exit 9.** partly. Engine sections present: `veneer/guides/veneer.md:781`, Vocabulary `:813`, Events `:846`, Delegation `:862`, Ownership `:915`, Motion `:1000`, Components `:1014`. `test:guides` exited 0 at the J-HOLDERS landing (`scaffold/.orkestrel/veneer/engine/units/j-holders-landing.log.txt:52`). Gap: no `### Focus`, `### Placement`, or `### Content` under `## Engine` (R18, `scaffold/.orkestrel/veneer/engine/j-engine-design-verdict.md:98`); those sections are still on J-ROWS (`scaffold/.orkestrel/veneer/engine/plan.md:72`). The landing log’s chain is not `npm run test` or `npm run test:service`.

**Kickoff 1.** holds. Same contracts as exit 1. Verdict retained at `scaffold/.orkestrel/veneer/engine/j-engine-design-verdict.md`. Routing ledger: `scaffold/.orkestrel/veneer/engine/plan.md:99`–`111`.

**Kickoff 2.** partly. Mechanisms and first consumers are the exit-2 files, with proofs in `veneer/tests/src/browser/Registry.test.ts`, `HostSnapshot.test.ts`, `Delegate.test.ts`, and `helpers.test.ts`. `./browser/auto`, jQuery, and `isRTL` stay refused as in exit 7. Fixed fallback stays refused: `veneer/tests/src/browser/Alert.test.ts:180`. Gap: the mutation logs those assertions were killed against are not in the retained `units/` set; the plan prunes them (`scaffold/.orkestrel/veneer/engine/plan.md:13`).

**Kickoff 3.** partly. Each `plugin` row is `shipped` and its Proof cell names the test file (exit 5). Cascade availability: `scaffold/.orkestrel/veneer/engine/plan.md:51`. Gap: the five concerns are not all present, and the retained landing log does not name Chromium 141.

| Plugin | lifecycle | cancellation | focus | motion | cleanup |
| --- | --- | --- | --- | --- | --- |
| Collapse | `Collapse.test.ts:66` | `:282` | `:370` | `:400` | `:463` |
| Dropdown | `Dropdown.test.ts:88` | `:395` | `Delegate.test.ts:2149` | missing | `Dropdown.test.ts:954` |
| Tab | `Tab.test.ts:277` | `:353` | `Delegate.test.ts:1537` | `Tab.test.ts:405` | `:562` |
| ScrollSpy | `ScrollSpy.test.ts:61` | missing | missing | missing | `:734` |
| Alert | `Alert.test.ts:52` | `:244` | `Delegate.test.ts:1075` | `Alert.test.ts:91` | `:322` |
| Carousel | `Carousel.test.ts:111` | `:457` | `:1289` | `:340` | `:1473` |
| Offcanvas | `Offcanvas.test.ts:160` | `:320` | `:644` | `:209` | `:777` |
| Tooltip | `Tooltip.test.ts:152` | `:665` | `:953` | `:245` | `:2498` |
| Popover | `Popover.test.ts:106` | missing | `:106` (focus trigger off) | `:166` | `:569` |
| Modal | `Modal.test.ts:130` | `:275` | `:482` | `:185` | `:739` |
| Toast | `Toast.test.ts:79` | `:559` | `:406` | `:79` | `:649` |
| Button | `Button.test.ts:66` | `:439` (non-cancelable) | missing | missing | `:496` |

**Kickoff 4.** holds. Same ruling as exit 6. No runtime dependency beyond `@orkestrel/contract` (`veneer/package.json:92`–`94`), which is the “no `package.json` change” ruling at `scaffold/.orkestrel/veneer/engine/j-engine-design-verdict.md:95`.

**Kickoff 5.** partly. At `0865c67`, the J-HOLDERS log records `format:check`, `lint:check`, `check`, `test:guides`, `test:policy`, `test:src:browser`, the three source builds, `test:conformance`, `test:setup`, and `test:setup:browser` each `exit=0` (`scaffold/.orkestrel/veneer/engine/units/j-holders-landing.log.txt:21`–`291`). Gap: that log has no `npm run test` and no `npm run test:service` (`veneer/package.json:60` and `:77`). The landing procedure’s chain is the shorter one (`scaffold/.orkestrel/veneer/engine/plan.md:125`).

**Kickoff 6.** open. `veneer/ROADMAP.md:368` records session rules, not closure. J-ROWS, J-ORACLE, J-OVERLAYS, and J-COLLAPSE-SIZE are still queued (`scaffold/.orkestrel/veneer/engine/plan.md:39`–`47`). Engine records are not pruned to a promotion-only archive; live unit files remain (`scaffold/.orkestrel/veneer/engine/plan.md:13`).

**E26 J-ORACLE.** open. The addition is `scaffold/.orkestrel/veneer/engine/decisions.md:183`. J-ORACLE-RECORD through J-ORACLE-GATE are queued (`scaffold/.orkestrel/veneer/engine/plan.md:45`). A `plugin` Proof cell is accepted when the named test file exists (`veneer/tests/setupServer.ts:3233`–`3237`), not when it matches an independent Bootstrap recording.

Distillate

Exit 1 holds; Exit 2 holds; Exit 3 holds; Exit 6 holds; Exit 7 holds; Exit 8 holds; Kickoff 1 holds; Kickoff 4 holds.
Exit 4 gap: Dropdown motion; ScrollSpy cancellation, focus, and motion; Popover cancellation; Button focus and motion.
Exit 5 gap: carried `engine` rows still `accepted` with Proof `—`; J-ROWS has not flipped them.
Exit 9 gap: no `### Focus`, `### Placement`, or `### Content`; landing chain omits `test` and `test:service`.
Kickoff 2 gap: mutation logs not retained after prune.
Kickoff 3 gap: the missing five-concern cells above; Chromium 141 not in the landing log.
Kickoff 5 gap: `npm run test` and `npm run test:service` absent from the retained landing log.
Kickoff 6 gap: `### The engine session` has no closure, and the queue is still open.
E26 gap: no `plugin` proof compares against an independent Bootstrap recording.

Unknowns

Whether any engine landing besides the six retained logs ran `npm run test` and `npm run test:service` to exit 0.
Whether the plugin proofs were run on Chromium 141; the J-HOLDERS log does not name a browser build.
Whether a pruned mutation log still shows a kill for every assertion; those files are not in `units/`.

Journal

Read the exit criterion, its amendment line, kickoff items 1–6, and E26. Compared them with `veneer/src/browser`, `veneer/tests/src/browser`, the Compatibility rows, `plan.md` § Landed, and `j-holders-landing.log.txt`. Did not read `veneer/tmp/**`.

Deviation

None.
