# Native separation verdict

This verdict rules how the native browser surfaces separate from the drop-in Bootstrap engine in `@orkestrel/veneer`. It answers the user's restatement of ruling 3 on 2026-10-06 (`rulings:18`). It rules R1, R6 to R10, R12 to R14, and the brief's other items, and it puts four questions to the user (Q1 to Q4). R2 rules the sort rule except the two tiers that wait on Q1 and Q2, R3 and R4 wait on Q1, R5 waits on Q3, and R11 waits on Q4. Q5 is dropped, because the boundary reading shows that the generic law works (§ What the user must rule).

The inputs are the outputs of the separation design round, workflow `wf_d23b0308-398`, run on 2026-10-06:

- the terrain scout (`round/scout.json`);
- three blind proposals: the judge's Proposal 1 is `p0`, Proposal 2 is `p1`, and Proposal 3 is `p2`;
- the judge (`judge`) and the critic (`critic`);
- the Orchestrator's rulings brief (`brief`), which governs wherever it differs from the judge (`brief:12`, `:40`);
- three scout readings dispatched after the round: the boundary reading, the names reading, and the withdrawal and departures reading. They were delivered in the dispatch and have no file, so this verdict cites the paths they read.

Every citation reads veneer at `66f80b5` on branch `ccr-d15a48b1-yyyll6`, whose `src/` equals `af0b945`. The later commits `1a0bd4c` (`showcase/browser.html` only) and `11f01e9` (`tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`, and `tests/src/browser/Scrollspy.test.ts`) leave `src/` unchanged (`git show --stat`, run 2026-10-06), so every `src/` citation holds at the branch tip. Test-file citations read `66f80b5`. At `11f01e9`, the `DEPARTURE_FAMILIES` declaration and its read move from `tests/setupBrowser.ts:7548` and `:7679` to `:7591` and `:7722`, and the pin at `tests/setupBrowser.test.ts:975` moves to `:1024`. Scaffold citations read `/home/user/scaffold` at `76bcf8c7`.

This verdict supersedes `verdict` § Decision and § The opt-in rule (`verdict:37-85`), including the typed-leaf shape for `native` (`:66-71`) and the lead rewrite of `### Engine departures` (`:82`). § Owed records lists every other section it supersedes or amends.

Citations use the following shortened roots.

| Short form | Path |
| --- | --- |
| `src/`, `tests/`, `app/`, `configs/` | `/home/user/veneer` at `66f80b5` |
| `G` | `/home/user/veneer/guides/veneer.md` |
| `RM` | `/home/user/veneer/ROADMAP.md` |
| `runs/` | `/home/user/veneer/tmp/units/journey-cost/runs/` |
| `rec/` | `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/` |
| `verdict` | `rec/browser-stage-b-verdict.md` |
| `rulings` | `rec/stage-b/user-rulings-2026-10-06.md` |
| `elements` | `rec/stage-b/rulings-research-2026-10-06/elements.json` |
| `sbm` | `rec/stage-b/codex/stage-b-measurements.md` |
| `round/` | `/home/user/scaffold/tmp/claude/native-separation/` |
| `brief`, `judge`, `critic` | `round/rulings-brief.md`, `round/judge.json`, `round/critic.json` |
| `p0`, `p1`, `p2` | `round/proposal-0.json`, `round/proposal-1.json`, `round/proposal-2.json` |
| `scaffold/` | `/home/user/scaffold` at `76bcf8c7` |
| `arch`, `names` | `scaffold/.claude/rules/architecture.md`, `scaffold/.claude/rules/names.md` |

## The separation rule

The user's words carry two requirements, and every ruling here honors both (`brief:7-10`):

- **Code separation.** "I don't want to introduce issues into the engine we have that is drop-in for bootstrap versus what we are introducing for our veneers styles" (`rulings:18`). The drop-in engine's source, the root files of `src/browser`, carries no code that serves a native surface: no native branch, no option that serves a native surface, and no extraction made so a native class can share it. The one exception is the environment barrel `index.ts`: its one `export * from './dialogs/index.js'` row publishes the native module through `./browser`, as R1 rules (`brief:14`). A page that composes no native plugin constructs no native component and gains no native listener (part 3), and N8's consumer-bundle reading checks that a bundle without `dialogs` imports carries no native token.
- **Behavior opt-in.** "I don't just want to accept these limits and gaps and differences without it being an opt-in" (`rulings:18`). Every departure from Bootstrap that a native surface brings exists only on a page that composes that surface's plugin or calls its factory.

The rule that follows has these parts. When a later lane adds a feature, it applies them in this order:

1. **Classify the feature.** A feature is a native surface when it changes the host element, the layer, focus, inertness, or event cancelability (`judge:31`). Every native surface goes to a native module. A root file keeps a native API only where that API keeps Bootstrap's observable contract on identical markup and needs no option. Stage A's `Placement` (`G:607`) and transition wait (`G:603`) fail that test on the 37 rows and the clip departure that Q2 lists, so they stay in the root only as the user's answer to Q2 rules.
2. **Place it.** A native module is a folder `src/browser/<plural entity>/`, named for its entity (`names:214`), with its own kind files and barrel. `src/browser/index.ts` re-exports that barrel (`arch:223`). Publication stays `./browser` (`package.json:42-47`).
3. **Gate it behind composition.** A page reaches a native surface only by composing its plugin or calling its factory. A plugin can take a Bootstrap plugin's name and replace it in its scope (`src/browser/helpers.ts:158-162`). No markup attribute and no key on a Bootstrap family's options record switches a native surface on. A page that composes no native plugin and loads no native fence keeps stage A. It gains no listener, because the scope derives its listeners from the plugin list (`src/browser/Veneer.ts:66-73`). It also receives no non-cancelable `.bs.` event and produces no native row. Loading a fence is a separate opt-in (`verdict:80`): a loaded fence restyles a Bootstrap-path `dialog.modal` that carries an authored `closedby`, and under R9's fallback it restyles every `dialog.modal`.
4. **Point imports one way.** Module files import root files. No root file other than `index.ts` imports a module folder, and no root file imports its own environment barrel. The S48 policy rule and the token check enforce this (R1).
5. **Share without touching the root.** A module uses root declarations that exist unchanged. Where it needs a root block changed or extracted, it repeats that code inside the module. A drift guard then reruns the matching stage A scenarios through the module's plugin. A declaration that two native modules share stays in the module that declared it first, and the later module imports that module's barrel. Promoting it to the root would put native code into the drop-in engine.
6. **Record its departures in the native table.** Every native difference is a row of `### Native departures`, which uses the six columns of `### Engine departures` (`tests/setup.ts:1513-1557`). The proof sits in the module's mirrored test folder. `### Engine departures` keeps only stage A rows under its lead (`G:681`).
7. **Ship its CSS as a fence.** A native stylesheet is a guide fence in `@layer reset` until chunk 3 gives it a `./styles` home. The Bootstrap sheet takes no native rule (`G:1162`).
8. **Put its error codes in core.** Native error codes join `VeneerErrorCode` in `src/core/types.ts:55-62`, because core is shared and is not the drop-in engine (`brief:20`).

The rule overrides three scaffold laws for the native modules and the drop-in root, and it meets a fourth. The user's instruction outranks the rules (`scaffold/AGENTS.md:8`), and this verdict records each override:

- `arch:311` ("Centralize any pattern repeated twice"): `Dialog` repeats `Modal`'s orchestration (R8).
- The one-engine reading of `scaffold/AGENTS.md:65`: `Dialog` is a second engine behind `ModalInterface`.
- `arch:221-222`. The Bootstrap-only declarations stay at the `src/browser` root, because that root is the drop-in engine. Moving them into a module would rewrite every root file against code separation. A declaration that two native modules share does not move to the root (part 5).

The rule meets `arch:224` (each module API receives its own guide parity) through the guide's `## Native surfaces` section and the `### Native` Surface table. The package keeps one authored guide that gives each published surface its own section (`/home/user/veneer/guides/README.md:7`, `:13`).

## Rulings

Each ruling states its decision, its reason, the refused alternatives, and its citations. A ruling that depends on the user's answer names the question.

### R1 Boundary and its enforcement

- **Decision.** The native modal lives in the module folder `src/browser/dialogs/` (R12 rules the name). One row, `export * from './dialogs/index.js'`, joins `src/browser/index.ts:1-27`. Publication stays `./browser`. The toolchain enforces the boundary through scaffold item S48, a policy-plugin rule named `policy/no-inverted-import`. An environment root file other than `index.ts` never imports into one of its own environment's module folders, meaning a subfolder that holds its own `index.ts`, and never imports its own environment barrel. S48 turns the rule on in the policy override that covers `src/**` and `app/**` (`.oxlintrc.json:101-115`), in the vendored file that veneer receives from scaffold. The raw-text token check stays beside the rule, in `tests/src/browser/index.test.ts`. It refuses `showModal`, `closedby`, `beforetoggle`, `showPopover`, and `hidePopover` in every root file except `index.ts`, and it pins the names and order that `createBootstrapPlugins()` returns (`src/browser/plugins.ts:382-397`).
- **Reason.** The module law admits a module folder (`arch:221-224`), and `src/vue/index.ts:1` is the nested-barrel precedent. `scaffold/AGENTS.md:30` requires toolchain enforcement (`critic:30`). The generic law is green across the fleet. A search of the checkouts `browser`, `contract`, `html`, `markdown`, `mcp`, `ollama`, `scaffold`, `server`, `tool`, and `veneer` under `/home/user` for `index.ts` files at module depth found one module folder, `src/vue/composables/` in veneer, and only its barrel imports it (`src/vue/index.ts:1`; `find src app -mindepth 3 -maxdepth 3 -name index.ts`, run 2026-10-06). A rule in the policy plugin works out whether a file is a root file from `context.filename` and `context.cwd`, as `isPolicyDomain` does (`scaffold/configs/policy.ts:449-459`). It decides whether a folder is a module folder by checking that the folder's `index.ts` exists, so it repeats no folder list (`scaffold/AGENTS.md:58`). The plugin already runs inside Oxlint (`.oxlintrc.json:5`), so the route adds no second parser (`scaffold/AGENTS.md:30`).
- **Refused.** The ruling refuses the following:
  - **A `./native` face** (`p1:3`). It needs a scaffold canon change for one consumer (`scaffold/.claude/rules/workspace.md:25-26`), and composition already carries the opt-in (`judge:161`).
  - **A `no-restricted-imports` pattern.** The rule matches import text, so it cannot tell a module folder from an entity or category folder. A pattern for every subfolder refuses required factory imports, such as `/home/user/browser/src/core/factories.ts:19`, which `arch:229` requires. A barrel-only pattern lets `./dialogs/Dialog.js` through.
  - **A named Oxlint block for `src/browser` root files.** It repeats the block's patterns at `.oxlintrc.json:188-223`, because a later override replaces the earlier block's options. Its owner derivation misreads a root-file glob (`scaffold/tests/config.test.ts:2682-2686`). It also names one target's folder and costs another block and another release for each added folder.
  - **A scoped TypeScript project.** It needs an added composite config and check script, which the user's ruling against superfluous configs refuses (`rulings:8`). `exclude` in the template-owned `configs/src/tsconfig.browser.json` refuses nothing (`scaffold/src/core/compilers.ts:1323-1337`).
  - **A Vite graph check.** It runs only at build time, not in `lint:check`.

### R2 Sort rule

- **Decision.** The separation rule in the preceding section replaces the judge's three tiers (`judge:162`). The judge's first tier (a native API that keeps Bootstrap's contract stays in the root) stands pending Q2. Its third tier (anything that changes the host, layer, focus, inertness, or cancelability is a native class) is part 1 of the rule. Its second tier, typed technique leaves on Bootstrap families, waits on Q1. Under the recommended answer, that tier is withdrawn.
- **Reason.** The technique test admits only a leaf that "changes nothing beyond writes the class already makes" (`judge:31`). `intrinsic` adds an inline `interpolate-size` write that `Collapse` never made (`src/browser/Collapse.ts:129-132`; `G:686`), so the test excludes it (`critic:28`).

### R3 The landed `intrinsic` leaf and R4 the gutter scope

Both wait on Q1. The recommended answer withdraws `intrinsic` and puts `stable` on the native dialog only. R4's mechanism under that answer has one consequence for the shared lock:

- **Mechanism.** The shared lock's state is a private static of `Lock` (`src/browser/Lock.ts:13`). Its width is the viewport's measured scrollbar while unlocked (`:29-38`), and `Lock.ts` stays byte-identical under code separation. A reserved `Dialog` therefore cannot join the shared lock and still compensate nothing.
- **Consequence.** N5 gives `Dialog` its own reserved path, written through its own `Hold`, with Bootstrap's zero-width footprint (`verdict:604-610`).
- **Gate.** N5 reads the reserved path in both open orders and both release orders against a Bootstrap-path offcanvas. If any save attribute or inline value is restored wrong, N5 returns "drop", and `stable` does not land in this cut.

### R5 The four native-dialog limits

R5 waits on Q3.

### R6 Events

- **Decision.** `Dialog` dispatches the `MODAL_EVENTS` names (`src/browser/constants.ts:93-99`) with Bootstrap's cancelability. The exception is the forced close: a `close()` call by page code, or a `method="dialog"` submit unless R14's reading reroutes it. The forced close dispatches `hide.bs.modal` with `cancelable: false` at the synchronous closing `beforetoggle` (`verdict:157-159`, `:492-496`). It goes through the dialogs module's own dispatcher, `emitDialogEvent` (R12). The root `emitEvent` stays byte-identical, including its `cancelable: true` at `src/browser/helpers.ts:800`. The root `ComponentEvent` remark (`src/browser/types.ts:183`) and the guide sentence at `G:599` stay unchanged. The scoping sentence lives in the `DialogEventMap` TSDoc and in the guide's `## Native surfaces` section, and N9's pointer after `G:579` tells the reader that `## Browser entry` describes the drop-in engine.
- **Reason.** This is code separation (`brief:15`). Keeping the `.bs.modal` names keeps tip hiding (`src/browser/Tip.ts:96-98`) and every listener a page migrates. A consumer tells the contracts apart by `event.cancelable` and by an `HTMLDialogElement` target.
- **Refused.** The ruling refuses the following:
  - A `cancelable` parameter on the root `emitEvent` (`p2:6`), because it is an extraction made for a native class.
  - A clause in the root remark (`judge:166`), for the same reason.
  - A `.vn.dialog` namespace (`p1:6`), because it breaks `Tip.ts:96-98` and renames every listener.

### R7 Markup

- **Decision.** The native modal uses Bootstrap's markup on `<dialog class="modal">`: `.modal-dialog`, `.modal-content`, `data-bs-toggle`, `data-bs-target`, and `data-bs-dismiss`. The platform invokers `commandfor` with `command` also drive it. No `data-vn-*` attribute exists. A `<dialog class="modal">` on a page without the native plugin keeps Bootstrap's path.
- **Reason.** Bootstrap's chrome reads `--bs-modal-*` from `.modal` (`judge:167`), and the host's element type is the only per-element switch under a composed plugin.
- **Refused.** A bare `<dialog>` (`p1:5`). It loses Bootstrap's chrome and belongs to the later bare-dialog surface (`rec/plan.md:21`).

### R8 Sharing

- **Decision.** `Modal.ts`, the root `helpers.ts`, the root `plugins.ts`, and the root `types.ts` stay byte-identical for the native work, and so does every other root file except `index.ts` and the Q1 withdrawal files. N1, the extraction, is withdrawn.
  - `Dialog` imports only root declarations that exist unchanged: `emitEvent`, `awaitTransition`, `reflow`, `bindEventMap`, `activateOverlay`, `restoreFocus`, `resolveModalOptions`, `resolveTargets`, `resolveDismiss`, and `buildPlugin` (`src/browser/helpers.ts:68`, `:184`, `:362`, `:706`, `:787-812`, `:824`, `:852`, `:875`, `:904`, `:917`), plus `Backdrop`, `Trap`, `Lock`, `Hold`, `MODAL_EVENTS`, and `CLASS_NAMES`.
  - `Dialog` repeats the orchestration it needs from `src/browser/Modal.ts:37-257`, about 190 lines (`p2:4`).
  - `src/browser/dialogs/plugins.ts` repeats the toggle and dismiss route inputs from `src/browser/plugins.ts:209-230`.
  - The drift guard reruns the stage A modal scenarios (`tests/src/browser/Modal.test.ts:33`, `:152`, `:223`, `:382`) through `createDialogPlugin` on `<dialog class="modal">`, with only `dialog*` rows permitted (`judge:34`).
  - The private field `#dialog` (`src/browser/Modal.ts:18`) keeps its name, and the verdict's rename to `#content` is withdrawn (`verdict:98`, `:507`).
- **Reason.** N1 rewrote drop-in source so a native class could share it (`critic:29`), and its own extraction list contradicted itself (`critic:9`).
- **Refused.** The ruling refuses the following:
  - The judge's narrowed N1 (`judge:168`).
  - The verdict's leaves on `Modal` (`verdict:388-447`).
  - A subclass (`scaffold/AGENTS.md:40`).
  - A host seam inside `Modal`.

### R9 Fence

- **Decision.** The dialog fence selects `dialog.modal[closedby]` and its `::backdrop` in `@layer reset`, with the declarations at `verdict:533-546`. It ships as a guide fence under `### Native stylesheet`, and its `./styles` home in `_reset.scss` waits for chunk 3. This re-cuts D-11 (`verdict:1059`). N4 owns four readings:
  - a forced-close fade beside a Bootstrap-path control;
  - an authored `closedby` on a Bootstrap-path `dialog.modal`, with and without the fence (`critic:21`);
  - the one-sided fence's effect on the rerun transcript, listing every reading that differs outside the `dialog*` rows (`critic:22`);
  - a fenced `dialog.modal` under each showcase face (`critic:23`).

  If any reading fails, the selector falls back to `dialog.modal`, and the guide records the coupling that `verdict:549` states.
- **Reason.** Only `Dialog` writes `closedby`, from the display write until after the lock release (`verdict:467`, `:480`), so the selector normally restyles no Bootstrap-path host. Chunk 3's `./styles` is the user's "veneers styles" (`rulings:18`).
- **Refused.** The ruling refuses the following:
  - `dialog.modal:modal`. It drops `:modal` before a forced close's fade ends (`verdict:551`).
  - The Bootstrap sheet (`G:1162`).
  - The engine's constructed sheet (`verdict:554`).

### R10 `topmost` (B5)

- **Decision.** `topmost` leaves the schedule. It returns as a native module behind a first consumer and its gate (`judge:39`).
- **Reason.** P0 found that the engine's fixed menu already escapes plain overflow clipping (`verdict:827`). That leaves a transformed clipping ancestor as the only gain. Composing through public events also cannot reconcile an external `hidePopover()` without a `Tip` change (`judge:170`).

### R11 Ruling 5 scope items

R11 waits on Q4. § Owed records holds the per-item assessment.

### R12 Names and codes

- **Folder: `dialogs/`.** The names reading refuses `native`:
  - It is not a lowercase plural entity (`names:214`).
  - It is not a technology or protocol domain (`names:148`).
  - It describes the implementation, not the thing (`names:112`).
  - It is not an extension category (`arch:245-251`).

  `dialogs/` is the plural of the module's one entity, `Dialog`, and no centralized kind or fleet folder uses it (`arch:234`). The other candidates are refused, and the name scout's evidence decides each:
  - `natives/` names no entity.
  - `surfaces/` and `elements/` are cascade layers (`src/styles/_tokens.scss:2`), and `elements/` is also a styles folder.
  - `overlays/` names the Bootstrap side (`activateOverlay` at `src/browser/helpers.ts:824`; `OverlayDismissOptions` at `src/browser/types.ts:862`).
  - `layers/` is cascade vocabulary.
  - `platform/` names no entity.

  "Native" stays in prose and data only: the `## Native surfaces` heading, the `### Native departures` table, and the showcase group id.
- **Symbols admitted.** The names reading admits each of these:
  - the `Dialog` class (`names:174`), with `DialogInterface`, `DialogOptions`, `DialogEventMap`, and, with N5, `DialogPluginOptions`;
  - `createDialogPlugin` (`names:177`), placed in `dialogs/plugins.ts` and kept out of `createBootstrapPlugins` (`src/browser/plugins.ts:382-397`);
  - `createDialog` (`names:176`), placed in `dialogs/factories.ts`;
  - `isBrowserDialog` (`names:178`), placed in `dialogs/validators.ts`. Its summary says that it narrows to `HTMLDialogElement`, so no reader takes it for `@orkestrel/browser`'s `BrowserDialogInterface` (`/home/user/veneer/guides/browser.md:987-988`).
- **Codes.** `DIALOG_OPEN` and `DIALOG_HOST` join `VeneerErrorCode` in `src/core/types.ts:55-62`, in the `{ENTITY}_{WORD}` shape of `DROPDOWN_MENU` and `VENEER_ROOT`.
  - `DIALOG_OPEN` replaces the verdict's `MODAL_OPEN` (`verdict:186`, `:420-421`), which never landed. `show()` throws it after its guards when page markup or script already opened the host (`verdict:463-465`).
  - The `Dialog` constructor throws `DIALOG_HOST` for a host that `isBrowserDialog` rejects (`judge:40`).
  - A constant that holds the `dialog.modal` selector cannot take the name `DIALOG_HOST`.
- **Helpers ruled from the names reading.** The brief's R12 names neither of the judge's helpers (`brief:20`; `judge:172`), so the names reading rules them:
  - **`emitNotice` is refused and replaced by `emitDialogEvent`.** "Notice" would be a second word for "event" (`names:110`; `scaffold/AGENTS.md:54`), and `src/browser/helpers.ts:66` already uses "notice" as a fictional entity. Cancelability is a datum of the same operation (`names:79-81`), so it is a boolean parameter (`names:119`). `emitDialogEvent` takes `emitEvent`'s parameters plus a final `cancelable` that defaults to `true`. `Dialog` dispatches every event through it. The `Dialog` qualifier keeps it clear of a star-export collision with the root `emitEvent` (`arch:273`), and the repeat is the R8 override.
  - **`narrowContext` is refused and replaced by `contextToModal`.** `narrow` has no fixed meaning among the helper prefixes (`names:91-105`), and `Context` already names four browser concepts (`ComponentContext` at `src/browser/types.ts:1999`). The judge's N3 fixes the helper's contract: it filters lookups to `Modal` and passes `own` and `release` through (`judge:92`). That contract is a projection from a whole to a derived view, so the helper takes the `{noun}To{Noun}` form (`names:193`). It lives in `dialogs/helpers.ts`, and the native plugin hands its result to the root `Modal` it builds for a non-dialog host.
- **Wording clashes.** The names reading settles the following clashes:
  - N7 retitles the showcase's "Dialog example" (`app/browser/sections/live-components.html:243`) as "Modal example", and N9 updates `G:2753` and `:2756`.
  - The `ModalInterface` TSDoc's "modal dialog" (`src/browser/types.ts:609`) and "the dialog's" (`:637`) stay, because the root `types.ts` is byte-identical (R8). "Dialog" there is the ARIA role that `Modal` writes (`src/browser/Modal.ts:199-200`).
- **Refused.** The ruling refuses the following:
  - `isDialogElement`, which breaks the realm-guard family (`src/browser/validators.ts:11`).
  - `MODAL_OPEN` beside `DIALOG_OPEN`, which would give one failure two codes (`scaffold/AGENTS.md:54`).
  - A `guides/dialogs.md` file. The package keeps one authored guide (`/home/user/veneer/guides/README.md:7`, `:13`).
  - A `createNativePlugins()` collection, because each native plugin is its own opt-in.

### R13 Showcase

- **Decision.** A Native group in the showcase composes `[...createBootstrapPlugins(), createDialogPlugin()]` in a nested scope over its own subtree and loads the dialog fence. That amends the no-extra-stylesheet sentence at `RM:144`. N7 owns every file the group touches (`critic:5`).
- **Reason.** It is the one place where the separation can be shown and checked on the page (`judge:173`).
- **Refused.** The B4 showcase half as planned (`rec/lanes.md:104`). Under Q1's recommended answer, it has no leaf left to show.

### R14 A `method="dialog"` submit

- **Decision.** The submit is ruled after N4's reading. It stays a forced close, as `verdict:157` specifies, unless N4 reads that a `submit` event cancelled at capture keeps the dialog open. In that case, the native plugin intercepts the submit and routes it through `hide()`, so `hide.bs.modal` keeps its veto.
- **Reason.** No record reads a cancelled dialog submit (`judge:174`).

### Plugin shape

- **Decision.** `createDialogPlugin()` returns a frozen plugin named `modal`, which replaces Bootstrap's modal plugin in place in its scope (`src/browser/helpers.ts:158-162`).
  - Its guard admits `Modal` or `Dialog`.
  - Its `create` chooses by host. An `HTMLDialogElement` that `isBrowserDialog` admits gets `Dialog`. Any other host gets the unchanged root `Modal`, built with `contextToModal(context)`. That is composition, not modification.
  - Its routes are the repeated toggle and dismiss inputs, plus two capture routes with no `execute`: `{ event: 'command', selector: 'dialog.modal' }` and `{ event: 'beforetoggle', selector: 'dialog.modal' }` (`verdict:503-505`).
  - `Dialog` resolves Bootstrap's keys through the root `resolveModalOptions` (`src/browser/helpers.ts:362`), so markup never sets `stable` (`verdict:69`).
  - `DialogPluginOptions` and the `options` parameter land with N5's `stable` and do not land when N5 returns "drop", because an options record with no key has no consumer (`scaffold/AGENTS.md:65`).
  - `DialogPluginOptions.stable` reaches `Dialog` hosts only. A `div.modal` that the native plugin builds keeps Bootstrap's compensation (`critic:8`).
  - `createDialog` settles under the `modal` name with a guard that admits only `Dialog`. A live `Modal` on that host then yields `REGISTRY_CONFLICT` (`src/browser/Registry.ts:66-71`), and the call never returns it (`judge:37`, `:50`).
- **Reason.** One import path and one composed plugin, and a page migrates by changing `div` to `dialog` (`judge:10`).

### Cross-scope ownership

- **Decision.** N4 reads both orders:
  - A document-scope `data-bs-toggle` trigger reaches a `dialog.modal` inside a native subtree first. The Bootstrap plugin builds a `Modal`, and the native guard then returns that `Modal` (`src/browser/Registry.ts:46`).
  - The native subtree builds a `Dialog` first. A later Bootstrap route throws `REGISTRY_CONFLICT`, which the scope reports through `reportError` (`src/browser/Veneer.ts:203`).

  N8 proves the two page shapes the guide recommends:
  - page-level composition;
  - a native subtree that holds both its triggers and its hosts.

  An invoker (`commandfor`) routes through the host's scope, because its event targets the host (`src/browser/Veneer.ts:189`, `:195`). N9 owns the family-identity sentence at `G:583`.
- **Reason.** A click route belongs to the trigger's nearest scope, and a command route belongs to the host's (`critic:7`).

## What the user must rule

Each question lists its options, the evidence, one recommendation, and what the answer changes in the unit cut.

### Q1 Where native techniques live (R2, R3, R4)

The question is whether the drop-in engine's public API equals Bootstrap's.

The options are the following:

- **(a) Recommended: the drop-in options records carry no key that serves a native surface.**
  - Withdraw `intrinsic` from `Collapse.ts`, `types.ts`, and `plugins.ts` with `git revert 6b99552`. Stage A bytes return.
  - Re-home its measured gain in a native disclosure surface on `<details>` (`::details-content` with `interpolate-size`), scheduled after the native modal lands (N10).
  - `stable` lives only on `DialogOptions` and `DialogPluginOptions`. Bootstrap-path overlays keep Bootstrap's compensation exactly, including the double compensation under a declared root gutter (`verdict:121`). The guide documents that behavior as faithful to Bootstrap and names the native remedy.
  - This supersedes ruling 1's Bootstrap-overlay scope (`rulings:7`), so you confirm it.
- **(b) The judge's alternative: keep both leaves, default off, documented in the native section** (`judge:163-164`). The cost is a key that only native work uses inside the Bootstrap options records, and native branches in drop-in source: `Collapse.ts:126-140` today, and `Lock.ts`, `Modal.ts`, `Offcanvas.ts`, and the root `plugins.ts` and `types.ts` for `stable`. It fails code separation (`critic:28`).
- **(c) Refused: `stable` as a root `Lock` option that only `Dialog` passes** (`p2:3`). It is still an option that serves a native surface, inside a root file.

The evidence for the withdrawal comes from the withdrawal reading:

- **The revert is clean and complete.** The reverse patch applies cleanly at `66f80b5` (`git diff 6b99552^ 6b99552 | git apply -R --check` exits 0, run 2026-10-06). It touches the 7 files of `6b99552` and nothing else. Four of the six code files return to stage A's close bytes at `419245d`, and the other two keep only their stage A fixes (`git diff --shortstat 419245d 6b99552^`, run 2026-10-06).
- **Nothing depends on the leaf.** No `app/` file passes it, and the showcase prediction states that no row moves (`rec/lanes.md:102`).
- **Count.** `src:browser` goes from 799 to 788. The 799 is a run (`rec/showcase/redesign-2026-10-06/review-2026-10-06/hb1-report.md:97-98`). The 788 is a count of the removed cases: Collapse 9, helpers 1, plugins 1. N6 runs it under Chromium 141 and 153.
- **The gain is transient.** The leaf's gain lasts only during the transition. At the late sample, Chromium 141 reads 195.97 px with the engine on against 97.98 px off and 97.98 px for Bootstrap, and Chromium 153 reads 192 px against 95.98 px and 98 px. Every path of the growing panel completes at 240 px (`rec/stage-b/b4-gate-3.md:8`, `:10`), because completion clears the inline height (`src/browser/Collapse.ts:219`).
- **Nothing measures the gain on `<details>`.** No reading covers a growing `<details>` panel (`rec/stage-b/codex/stage-b-measurements.md:137`).
- **Cost of the recommended answer.** Under (a), a reserved `Dialog` does not share the document lock with a Bootstrap-path overlay (R3 and R4). N5's overlap gate decides whether `stable` lands.

The answer changes the unit cut as follows:

- **(a):** N5 is the dialog-only gutter, N6 is the withdrawal, N10 enters the schedule after the close-out, and N7 shows no intrinsic collapse. The close-out's diff lists `index.ts`, `Collapse.ts`, `plugins.ts`, and `types.ts`.
- **(b):** N5 is the judge's gutter unit on the root files (`judge:106-112`), N6 re-homes the two rows (`judge:115-121`), N7 shows an intrinsic collapse, and N10 is not created. The close-out's diff lists `index.ts`, `Lock.ts`, `Modal.ts`, `Offcanvas.ts`, `plugins.ts`, and `types.ts`. `Collapse.ts` keeps its landed bytes (`judge:118`).

### Q2 Stage A's own native-API departures (critic breach 1)

The drop-in engine already uses two native APIs, and their departures carry ledger rows. Of the 267 stage A rows at `G:687-953`, 37 come from a native-API choice:

| Mechanism | Rows | Lines |
| --- | --- | --- |
| Anchor positioning in place of Popper: `Placement` | 7 | `G:689-690`, `:864-868` |
| Anchor positioning: `Dropdown` | 7 | `G:908-911`, `:913-915` |
| Anchor positioning: `Tip` | 20 | `G:916-935` |
| `getAnimations()` wait with no synthetic `transitionend` | 3 | `G:708`, `:713`, `:869` |

The prose departure at `G:607` adds a fixed menu that stays hit-testable where Bootstrap's is clipped. The case at `tests/src/browser/Placement.test.ts:972` pins it. The other 230 stage A rows are 2 input-contract refusals, where the engine refuses a callback that Bootstrap evaluates or keeps (`G:705`, `:706`), and 228 engine ownership, teardown, and addition rows that no native API forces. The 2 stage B rows (`G:685-686`) belong to Q1.

The options are the following:

- **(a) Recommended: keep the 37 rows and the clip sentence as the drop-in engine's documented stage A behavior.** Each one is the engine's implementation, pinned by a ledger row, and visible only under the named conditions. The user's ruling of 2026-10-02 made the engine "beholden to Bootstrap's classes, data attributes, and markup contracts" while it leans on native APIs (`rec/plan.md:16`).
- **(b) Restore Bootstrap's synthetic `transitionend` in the drop-in.** This retires the 3 wait rows at 2 root sites: the timer in `awaitTransition` (`src/browser/helpers.ts:945`) and `Carousel.pause` (`src/browser/Carousel.ts:182`). Anchor positioning stays. It is the cheaper exact path, but it reverses stage A's ruling (`rec/browser-design-verdict.md:23`), and no record measures the restored variant.
- **(c) Order an opt-in.** The drop-in would gain a Popper-equivalent absolute path, and anchor positioning would move into a native module. That path needs Popper itself or a reimplementation of its default modifiers (`rec/stage-b/native-research-agent-1.md:133`). Both conflict with the packaging ruling that the browser graph packs without Popper (`rec/browser-design-verdict.md:26`). The literal absolute anchor recipe also misplaced the menu, at 182 px against 212 px (`rec/stage-b/browser-feasibility-report.md:15`), and no native mechanism takes a custom boundary element (`rec/stage-b/native-research-agent-1.md:163`).

The answer changes the unit cut as follows. Under (a), nothing changes. Under (b), one stage A repair unit lands before N4, so the dialog's drift guard compares against the repaired engine; no record estimates its cost. Under (c), the cut gains a Placement unit pair that a separate design round sizes.

### Q3 The four native-dialog limits (R5; ruling 3 still owed)

The question is whether the following limits, lettered as the research letters them, become the documented contract of the `createDialogPlugin` opt-in only:

- **(a)** Toasts and body-level tips outside the open dialog are inert (`elements:4-11`).
- **(b)** An ordinary-layer tip paints beneath the dialog's content until its `container` sits inside the dialog (`elements:14-21`).
- **(c)** Tab from the last control leaves a framed document (`elements:24-31`).
- **(d)** With `focus: false`, browser modality still keeps focus inside (`elements:34-41`).

Each limit is measured (`verdict:1190`), and each becomes a row with a proof: `dialog:order`, `dialog:paint`, `dialog:tab`, and `dialog:focus-off`, renamed from `verdict:519-522`. The container remedy is the one `G:595` already gives. Two readings that the research recommends become N4 acceptance items:

- an ordinary `.toast-container` inside the native host, read before the guide offers it as a toast remedy (`elements:10-11`);
- a top-level-document Tab reading, which decides whether limit (c) holds only in frames (`elements:25`, `:31`).

N9 also lists the limit that a `returnValue` persists across closes and that a forced close carries no reason (`elements:64`).

The options are the following:

- **(a) Recommended: accept the four limits as the opt-in's contract, each with its row, its proof, and its remedy.** No Bootstrap-path page meets any of them.
- **(b) Elements' approach: promote toasts and tips into the top layer** (`elements:11`, `:21`). Refused, because promotion repairs paint and leaves inertness (`verdict:169`, `:197`).
- **(c) Keep the `focus` key out of `DialogOptions`** (`p2:4`). Refused, because the refusal of outside focus remains, and `data-bs-focus="false"` markup would then be ignored silently (`judge:52`).

The answer changes the unit cut as follows. Under (a), N4's rows and N9's prose stand as listed. If N4's top-level reading shows that Tab also leaves a top-level document, limit (c) widens, and the user re-rules it. The remedy then offered is a `Dialog`-owned keydown wrap inside `dialogs/` (`elements:31`), which leaves the root `Trap` byte-identical.

### Q4 Ruling 5 scope items (R11)

§ Owed records gives the assessment of each item with its evidence.

The options are the following:

- **Recommended:** confirm the verdict's scope refusals. Re-home G1 to G5 and the bare-element surfaces of `rec/plan.md:21` as native modules, each behind its gate and a first consumer.
- **Alternative:** reverse any refusal. The item then becomes an unscheduled native module with a gate reading of its own.

Under the separation rule, no item touches the drop-in root. The answer changes no scheduled unit: every item stays unscheduled.

### Q5 is dropped

Q5 applied only if a generic boundary law proved impossible (`brief:36`). The boundary reading shows that it is possible: the fleet holds one module folder, and only its barrel imports it (`src/vue/index.ts:1`). The law works as a policy-plugin rule, which R1 rules as S48.

## Owed records

### Ruling 4: what a page author meets with the forced close

You accepted non-cancelable forced-close events and asked what to worry about (`rulings:10`). The consequences on a page that composes `createDialogPlugin` or calls `createDialog` on a `<dialog class="modal">` host are the following:

- **The forced close cannot be vetoed.** A `close()` call by your own code, and a `method="dialog"` submit unless R14's reading reroutes it, dispatch `hide.bs.modal` with `cancelable: false`. The close is already committed when the event fires: the closing `beforetoggle` cannot be cancelled, and `open` and `:modal` still hold while it runs, because the browser removes `open` and takes the dialog out of the top layer after the event returns (`/home/user/mikesaintsg/elements/guides/w3c/elements/interactives.md:727`; `verdict:157`).
- **A veto is ignored.** A listener that calls `preventDefault()` on that event changes nothing and reads `defaultPrevented` as `false`.
- **Bootstrap-path hosts keep every veto.** A page that relied on vetoing every hide, such as an unsaved-changes guard, keeps that only on Bootstrap-path hosts. On a native host, call `hide()` or `requestClose()` instead of `close()`. `requestClose()` fires a cancelable `cancel` that the engine routes through the `hide.bs.modal` veto (`verdict:491`).
- **User close requests keep their veto.** Escape, the backdrop click, `data-bs-dismiss`, and the `close` and `request-close` commands go through `hide()` (`verdict:483-485`, `:499-500`).
- **`hidden.bs.modal` still follows** after the hide transition. Tips inside the dialog still hide, because they listen for `hide.bs.modal` (`src/browser/Tip.ts:96-98`).
- **A forced close during an accepted hide adds no second before-event** (`verdict:496`). A forced close while the dialog opens aborts the open, so no `shown.bs.modal` fires (`verdict:494`).
- **Read `event.cancelable` to tell the contracts apart.** It is `true` on every event you can veto and `false` only on the forced close.
- **`returnValue` persists across closes, and a forced close carries no reason** (`elements:64`).

### Ruling 5: the assessment per item

You asked for the reasons behind each refusal and deferral (`rulings:11`). The following table gives each item of `verdict:1193-1194` and the bare-element surfaces of `rec/plan.md:21`, with the evidence, what the separation changes, and the recommendation.

| Item | Ruling and evidence | Under the separation | Recommendation |
| --- | --- | --- | --- |
| Manual-popover offcanvas | Refused as scope. `sbm:33` tested `auto` and `hint` only, and a manual popover has no close watcher. The refusal keeps one host path for G1 and the responsive in-flow variants (`verdict:193-195`, `:327`). | A promoted offcanvas changes the layer, so it would be a native surface. | Confirm the refusal; the top-layer need folds into G1. |
| Toast promotion | Refused as scope. A promoted body toast stays inert under a modal (`sbm:105`), and promotion takes the toast out of `.toast-container` layout (`verdict:196-198`, `:359`). Elements' promoted toast carries float ARIA and per-frame script layout (`elements:60`). | It would be a native surface. N4's `.toast-container` reading offers the in-dialog remedy instead. | Confirm the refusal. |
| `@starting-style` | Refused as scope. On the alert, close removes `show` without a display flip (`verdict:237`). On the modal, the retained reflow fade shows the same sampled motion, so the addition has no measured gain (`verdict:313`). | No change. | Confirm the refusal. |
| Carousel `hidden="until-found"` | Refused as scope. A reveal forces a `select` past the cancelable `slide.bs.carousel`, rewrites `hidden` on every outgoing item, and fights `ride` (`verdict:265`). The costs are a scope reason, not an impossibility. | It would be a native carousel surface that replaces the `carousel` plugin. | Confirm the refusal. |
| `ariaNotify` | Refused as scope. The markup already carries a live region, and only a tree change was measured, not speech (`verdict:239`, `:360`). | No change. | Confirm the refusal. |
| G1 `<dialog class="offcanvas">` | Deferred: no reading exists (`verdict:325`, `:1126`). | A native module beside `dialogs/`, behind G1. | Re-home behind G1 and a first consumer. |
| G2 until-found on collapse | Deferred. The integrated reveal is unmeasured, and the sampled panel stayed `display: none` (`verdict:163-167`, `:1127`). The forced show dispatches with `cancelable: false` (`verdict:807`). | A native surface, in the disclosure family with N10. | Re-home behind G2. |
| G4 until-found on tab | Deferred, with a forced `hide.bs.tab` and `show.bs.tab` as `cancelable: false` (`verdict:358`, `:1129`). | A native surface. | Re-home behind G4. |
| G3 `CloseWatcher` with Android Back | Deferred. Its only gain is Android Back, which no reading covers, and its `cancel` is not cancelable without activation (`verdict:808`, `:1128`). | A native surface. | Re-home behind G3. |
| G5 custom `--` commands | Deferred: no consumer (`verdict:821`, `:1130`; `scaffold/AGENTS.md:65`). | A command route on a Bootstrap family's markup is a native plugin. | Re-home behind G5 and a first consumer. |
| Bare `dialog`, `details`, customizable `select`, form validation, clipboard, fullscreen | No Bootstrap counterpart; each is driven through typed JavaScript and pinned against a source (`rec/plan.md:21`). | Each is its own native module. | Each lands with its first consumer. |

### Supersession list

This verdict supersedes or amends the following parts of `verdict`:

- **§ Decision (`:37-60`).** The separation rule replaces the five-outcome sort.
  - `<dialog>` modal hosting moves from a typed leaf to the `Dialog` class.
  - The gutter scope (`:43`) and `intrinsic` (`:46-48`) wait on Q1.
  - `topmost` (`:45`) leaves the schedule (R10).
  - The deferrals (`:49-53`) re-home under Q4.
  - The trigger search (`:59`) narrows to the root files of `src/browser`, as the token check.
- **§ The opt-in rule (`:62-82`).** It is replaced, including the typed-leaf shape for `native` (`:66-71`). The lead rewrite (`:82`) is withdrawn, and `### Engine departures` keeps its lead at `G:681`.
- **W1 rulings.** The following W1 rulings change:
  - Ruling 4 (`:151-156`): the routing stands and moves into `Dialog`.
  - Ruling 5 (`:157-162`): the forced close stands. The shared `emitEvent` parameter (`:160`) and the remark and guide exception (`:162`) are replaced by R6.
  - Ruling 9 (`:179-185`): the `native` leaf name is withdrawn. `stable` and `reserved` wait on Q1. The `modal-native` prefix becomes `dialog`.
  - Ruling 10 (`:186-192`): `MODAL_OPEN` becomes `DIALOG_OPEN`.
  - Ruling 14 (`:203`): the `[open]` reading moves to N4.
- **W1 tables and shared mechanisms.** The Modal rows "within `native`" (`:305-309`) move to `Dialog`. The reserved-gutter rows (`:316`, `:329`) wait on Q1. The `Hold` slots and capture routes of the shared mechanisms (`:370-371`, `:377`) move to `Dialog` and its plugin.
- **§ Added: Modal `native` (`:382-554`).** Its parts change as follows:
  - The contract (`:388-449`) is replaced by the `dialogs/` types. The root `emitEvent` parameter (`:423-426`) and the remark (`:418`) are withdrawn.
  - The mechanics (`:451-507`) carry into `Dialog`, except the `#content` rename (`:507`).
  - The rows (`:509-526`) become the `dialog*` rows of `### Native departures`.
  - The stylesheet (`:528-554`) takes the R9 selector.
- **§ Added: `Lock` reserved gutter (`:556-635`).** It waits on Q1, and under (a) N5's gate decides it.
- **§ Added behind a gate: Collapse `intrinsic` (`:637-691`).** It waits on Q1.
- **§ Added behind a gate: `topmost` (`:693-772`).** It is unscheduled (R10).
- **W2.** Rulings 1 and 3 (`:794-799`, `:809-812`) apply to `Dialog` only. Ruling 6 (`:817-822`) routes the built-in commands only through the native plugin.
- **W3 (`:839-919`).** Units N0 to N9 replace the inventory and the TypeScript fence. The heading `### Opt into native surfaces` stays inside `## Native surfaces`.
- **W4.** D-11 (`:1059`) is re-cut by R9.
- **W5 (`:1081-1169`).** Its parts change as follows:
  - This cut replaces units B0 to B7.
  - P0 is closed (`rulings:12`).
  - "One overlay unit" (`:1104`) is withdrawn.
  - The classic instrument (`:1108`) is replaced by the adopted resolver (`configs/browsers.ts:302-311`) and the classic-row selection rule.
  - The serial-applier rule (`:1107`, `:1133-1140`) and the predictions (`:1142-1156`) are replaced by the rules in § Units.
- **What the user must rule.** Item 3 (`:1184-1190`) becomes Q3, item 5 (`:1192-1194`) becomes Q4, and item 1's overlay scope (`:1177`) is re-asked in Q1.

## Units

The following table re-cuts the judge's units (`judge:60-158`) under the brief's changes (`brief:40`). Lane-hours are planning estimates. They come from the judge where a unit is unchanged and from `p2`'s units where that proposal supplies the re-cut unit. An estimate marked "this verdict" comes from this verdict. A unit marked with a question waits on the user's answer to it.

| Unit | Engine | Owns | Change | Acceptance | Order | Lane-hours |
| --- | --- | --- | --- | --- | --- | --- |
| N6 `intrinsic-withdrawal` (Q1) | Orchestrator | Under (a): the revert commit. Under (b): the `G:685-686` move and `tests/src/browser/Collapse.test.ts`. The `rec/lanes.md` entry | Under (a): `git revert 6b99552` as one commit. Under (b): the judge's re-home of `G:685-686` into `### Native departures`, with the ledger at `tests/src/browser/Collapse.test.ts:979` reading both tables | Under (a): `src:browser` under Chromium 141 and 153 reads 788 passed; `test:guides` and `test:policy` pass; the trigger search `git grep -nE TRIGGER_PATTERN -- ':(glob)src/browser/*.ts'`, where `TRIGGER_PATTERN` is the pattern at `verdict:59`, returns nothing (at `66f80b5` it matches only `src/browser/Collapse.ts:130-131` and `src/browser/types.ts:1294`, run 2026-10-06). Under (b): `Collapse.test.ts` at its count, with both tables read and no unused or unclaimed row | Under (a): first, after Q1. Under (b): after N2 (`judge:120`) | 1.5 (`p2`) |
| N0 `dialog-contract` | opus, edits only | `src/browser/dialogs/types.ts`: `DialogInterface extends ModalInterface`, whose `@remarks` carry the limits and the forced close and whose `show` carries `@throws DIALOG_OPEN`; `DialogOptions { dismiss, focus, on }`; `DialogEventMap` with the forced-close scoping. Also `src/browser/dialogs/index.ts`. Patches: the barrel row; `DIALOG_OPEN` and `DIALOG_HOST`; the guide skeleton (`## Native surfaces` headings, an empty `### Native departures` table, the fence, the `### Native` Surface rows). A held patch for `stable` and `DialogPluginOptions`, applied with N5 | Writes the contract first and changes no root `types.ts` | `check:src:core` and `check:src:browser` pass; `lint:check` passes over the skeleton (`configs/policy.ts:141-164`, `:404-406`); `test:guides` passes; the `src:browser` count is unchanged from its pre-N0 run | Under Q1 (a): after N6. Under (b): first, after Q1 | 3 (judge) |
| S48 `boundary-law` (scaffold) | opus | `scaffold/configs/policy.ts` (the `policy/no-inverted-import` rule and its helpers, with the first `node:fs` import); one line in `scaffold/.oxlintrc.json:101-115`; RuleTester cases on real scratch folders in `scaffold/tests/config.test.ts` (`createPolicyScratch`, `:117`) and the population case at `:2917`; one line in `arch:218-224` | Adds the generic law of R1. Veneer copies the three vendored files from the candidate by hand (`rec/scaffold-defects/briefs/scaffold-s46-brief.md:62`) and takes the release at its next `overwrite` (`scaffold/src/core/constants.ts:201`, `:203`, `:208`) | Admitted: `index.ts` re-exporting `./dialogs/index.js`; a module file importing `../types.js`; `factories.ts` importing a subfolder without an `index.ts`. Refused: `./dialogs/index.js`, `./dialogs`, `./dialogs/Dialog.js`, `export * from`, `import type`, `import()`, and `@src/browser` from a root file. Scaffold gates pass, and the law is green in the checkouts `browser`, `contract`, `html`, `markdown`, `mcp`, `ollama`, `scaffold`, `server`, `tool`, and `veneer` under `/home/user` | Parallel with N6 and N0; the hand copy lands in veneer before N4 | 4 (this verdict) |
| N1 | | | Withdrawn (R8) | | | 0 |
| N2 `native-harness` | astra | The engine section of `tests/setupBrowser.ts` (`BROWSER_PROOFS` at `:125-127` widened to `./src/browser/**/*.test.ts`, plus the readers); `tests/setupBrowser.test.ts`; `tests/setup.ts` (`readDepartures` reads `Native departures`, and `createDepartureFamilies` at `:1449-1477` gains the `Dialog` family); `tests/setup.test.ts` (coverage over both tables) | Adds the native-table plumbing and the verdict's B1 readers (`verdict:1119`) | Readers for `open`, `:modal`, and `closedby`; a hit-order reader with a known `z-index` control; a pixel reader with a two-color control; transient focus capture; the fence loader in both realms with a raw `dialog.modal` control; a planted native row with no family fails coverage; `BROWSER_PROOFS` resolves a `dialogs/` path; `test:setup:browser` and `test:setup` pass | After N0; parallel with N3 | 8 (judge) |
| N3 `dialog-primitives` | astra | `src/browser/dialogs/validators.ts` (`isBrowserDialog`); `src/browser/dialogs/helpers.ts` (`emitDialogEvent`, `contextToModal`); their mirrored tests; export-pin patch | Adds the kinds that no class owns | `isBrowserDialog` holds in the test document and in a child frame, and refuses a `div` and a non-element. `emitDialogEvent` with `cancelable: false` leaves `defaultPrevented` false after `preventDefault`, with the default as control, and matches `emitEvent`'s bubbling and legacy properties. `contextToModal` filters lookups to `Modal` and passes `own` and `release` through. A typecheck case refuses the union context where the projection is admitted | After N0; parallel with N2 | 3 (judge) |
| N4 `dialog` | astra, worktree | `src/browser/dialogs/Dialog.ts`, `plugins.ts`, and `factories.ts`; `tests/src/browser/dialogs/{Dialog,plugins,factories}.test.ts`; patches: the `dialog*` rows, the export pin, and the token check in `tests/src/browser/index.test.ts` | Implements `verdict:451-507` in `Dialog`, repeating `Modal`'s orchestration (R8), under the plugin shape | Routing (`verdict:1120`) and the native-modal half of `verdict:1121`. The drift guard over the four stage A scenarios with only `dialog*` rows. Separation controls: a Bootstrap-only page keeps its counts; `dialog.modal` under the bare plugin equals stage A; `div.modal` under the native plugin equals the oracle with zero rows; a `createModal` pin holds; `REGISTRY_CONFLICT` holds for both factories; no `command` or `beforetoggle` listener exists without the native plugin. Both cross-scope orders. The four R9 fence readings and R14's cancelled submit. The two elements readings (Q3). The token check and the S48 law pass. Everything runs on Chromium 141 and 153 | Starts after N2 and N3; lands after the S48 hand copy | 20 (`p2`'s 18 plus the readings the brief adds, this verdict) |
| N5 `dialog-gutter` (Q1) | astra, worktree | Under (a), as patches through the serial applier: the held N0 patch; the reserved path in `Dialog.ts` and the `stable` copy in `dialogs/plugins.ts`; the gutter cases in `Dialog.test.ts`; the `lock-stable:dialog` rows. Under (b): root `types.ts` (`LockOptions`, `LockContext.reserved`, `ModalOptions.stable`, `OffcanvasOptions.stable`, `ModalPluginOptions`, `OffcanvasPluginOptions`, and `LockInterface.compensation`, from `judge:63`), `Lock.ts`, `Modal.ts` (passes `stable`, and `update` reads the lock's `compensation` in place with no N1 leaf), `Offcanvas.ts`, root `plugins.ts`, and their tests, with the `lock-stable` rows and the `Dialog` patches through the serial applier (`judge:108` without the N1 dependency). Under both answers: `tests/src/browser/Lock.test.ts:153` moved to the runtime reading, and the classic-row filter, a patch through the serial applier to `DepartureLedger` (`tests/setupBrowser.ts:7679`) and its case in `tests/setupBrowser.test.ts`, which keeps a `lock-stable` row selected only when the measured scrollbar width is positive | Under (a): adds `stable` on `Dialog` through a `Dialog`-owned reserved path (R3 and R4). Under (b): adds `stable` on `Modal`, `Offcanvas`, and `Dialog` (`judge:109`) | Under `PLAYWRIGHT_SCROLLBARS=classic`: the 15 px control; then `verdict:1121`'s gutter list minus the offcanvas; then both open orders and both release orders against a Bootstrap-path offcanvas, restoring every save attribute and inline value. A failed overlap returns "drop". The leaf-off rerun equals stage A. The default-launch `src:browser` keeps its count and selects no classic-only row. Each ledger that selects a `lock-stable` row reports no unused row at the default launch and consumes each one under `PLAYWRIGHT_SCROLLBARS=classic`. The `Lock.test.ts:153` move lands even on "drop". Under (b), the judge's acceptance (`judge:110`) replaces the overlap gate | After N4 | 6 (`p2`) |
| N7 `native-showcase` | astra; opus writes the captions | A Native group in `app/browser/constants.ts:76-86` and its fragment under `app/browser/sections/`. The nested scope and its pagehide teardown in `app/browser/main.ts:10-17` or `app/browser/Showcase.ts`. `tests/app/browser/main.test.ts:108-123`; `tests/app/browser/constants.test.ts:199-209` and the routing analog at `:214`. The journey and statechart rows; the three faces' preservation and partition cases over the Native specimens in `tests/app/browser/integration.test.ts` (`:1327`, `:1829`) and their collectors in `tests/setupStyles.ts`; the fence load; the "Modal example" retitle. Patches: the guide's § Showcase rows (`G:2753`, `:2756`) and `RM:144`; through the serial applier, the journey specimens at `tests/setupBrowser.ts:5493`, `:5574`, and `:5693`, the claim placements at `tests/setupBrowser.ts:6063`, and the pin at `tests/setupBrowser.test.ts:975` | Shows the opt-in boundary: one subtree opts in while the page stays stage A | `dialog.modal` beside `div.modal` with identical content. Opens by `data-bs-toggle` and by `commandfor` with `show-modal`. Closes by `data-bs-dismiss`, `command=close`, `request-close` with a veto switch that holds, Escape, the backdrop, and a `method=dialog` form. An event log prints each `cancelable`. A body toast is clickable over `div.modal` and inert under the dialog. Tooltip containers are compared outside and inside. Pagehide destroys both scopes' components. Every row outside the group is unchanged. `test:journey`, `test:setup:browser`, and both showcase builds pass | After N4, and after N5 when it lands | 10 (`p2`) |
| N8 `native-integration` | astra | `tests/src/browser/integration.test.ts` | Proves the separation on whole pages | The native surface beside the Bootstrap surfaces on one page. A control page with no native plugin and no fence equals stage A, and every `.bs.` event it records is cancelable. The two recommended page shapes. A native subtree under a document scope routes each event to its nearest scope. Claim coverage over both tables. A consumer bundle that imports only `createVeneer` and `createBootstrapPlugins` contains none of `showModal`, `closedby`, or `beforetoggle`. The unit records the size of `dist/src/browser/index.js` with its run beside the baseline of 264,773 B (`stat` of the landing build's output, 2026-10-06 21:57:12; `runs/landing-66f80b5-build/stdout.log:47` reads 264.77 kB) | After N4, N5, and N7 | 4 (judge) |
| N9 `native-guide` | opus | `G`: `## Native surfaces` prose (lead, `### Opt into native surfaces`, `### Native dialog` with its limits and remedies, `### Native stylesheet`, `### Move between the engines`, the `### Native departures` lead); the pointer after `:579`; `:542` (error codes); `:583`; `:955` (both tables); `:957`; the `### Native` Surface rows; the `DialogInterface` methods table. Also `guides/README.md`; `RM:3`, `:51`, `:145`, `:151` (the `0.0.94` adoption at `af0b945`), `:184`, and `:192`, with the `intrinsic` withdrawal status at `:145` and `:192` under Q1 (a); the transcription case in `tests/src/browser/dialogs/factories.test.ts` and its pin in `tests/guides.test.ts` | Writes the guide for two audiences after the code works | `test:guides` passes; `factories.test.ts` passes alone; a prose sweep against the writing substitutions reports no hit | After N8 | 6 (judge) |
| Close-out | opus reviewer; astra analyst; verifier | No source | One `orkestrel-falsify` round over the purity claims: the S48 law and the token check; `git diff --stat 66f80b5 -- ':(glob)src/browser/*.ts'` lists only the root files that Q1's answer names (§ Q1); `### Engine departures` holds only stage A rows; the cancelable control page; the suite counts; one classic run over the classic-only rows | `format:check`, `lint:check`, `check`, `build`, and `npm test`, each read bare | After N9 | 6 (judge) |
| N10 `native-disclosure` (Q1) | astra | A native module for `<details>` with `::details-content` and `interpolate-size: allow-keywords`, named for its entity when it lands | Re-homes the B4 gain on native markup | Gate first: the B4 growth protocol (`rec/stage-b/b4-brief.md:30-32`) on `<details>` under Chromium 141 and 153. Completion comes from a timer, because `awaitTransition` skips pseudo-element animations (`src/browser/helpers.ts:931`) | Not scheduled; after the close-out under Q1 (a) | Not estimated |

Under Q1 (a), the scheduled veneer units total 67.5 lane-hours, and S48 adds 4 in scaffold. The judge's cut totals 68.5 (`judge:31`).

### Serial applier

The Orchestrator applies every patch to a shared file, one unit at a time, and each unit delivers those changes as exact patches (`brief:25`). The shared files are the following:

- `src/browser/index.ts`;
- `tests/src/browser/index.test.ts`, which gains each unit's exports in its export pin (`:10-141`) and the token check;
- `src/core/types.ts`;
- `guides/veneer.md`;
- `ROADMAP.md`;
- `tests/setup.ts`, `tests/setupBrowser.ts`, and `tests/setupBrowser.test.ts`, outside N2.

After N4 lands, `src/browser/dialogs/types.ts`, `Dialog.ts`, and `plugins.ts`, and `tests/src/browser/dialogs/Dialog.test.ts` and `factories.test.ts`, join the shared files, and N5 and N9 deliver their changes to them as patches.

No unit edits a root file of `src/browser` other than `index.ts`, except N6 under Q1 (a) and N5 under Q1 (b).

### Classic-row selection

A row that only a classic scrollbar can show is selected by a runtime reading, a positive measured scrollbar width. It is never selected by `import.meta.env.MODE`, which the adopted resolver never sets (`configs/browsers.ts:302-311`). N5 moves `tests/src/browser/Lock.test.ts:153` to that reading. N5's patch to `DepartureLedger` (`tests/setupBrowser.ts:7679`) filters the `lock-stable` rows out of a family's selection when the width is 0, so `ledger.unused` stays empty at the default launch (`critic:3`). Default-launch gates select none of them. A classic run (`PLAYWRIGHT_SCROLLBARS=classic`) is part of the owning unit's acceptance and of the close-out, and never a standing gate (`configs/browsers.ts:280-281`).

### Predictions

Each unit returns its prediction in its report, and the Orchestrator logs it in `rec/lanes.md` before the unit lands, because the records are read-only for lanes (`brief:3`). Every row outside the predicted set stays unchanged.

The predictions are the following:

- **N6:** no statechart row moves, because the showcase passes no `intrinsic` leaf (`rec/lanes.md:102`).
- **N0 to N5:** no statechart row moves, because the showcase composes no native plugin until N7.
- **N7:** names every row the Native group adds, and every row that the "Modal example" retitle changes.
- **N8 and N9:** no statechart row moves.
- **The token search** over the root files of `src/browser` returns nothing at every landing. Matches in `src/browser/dialogs/` and in the Native group's fragment are expected.
- **N9** re-cuts `RM:184`, whose "no moved statechart row" no longer holds for the showcase track.

## Corrections to the round

### Judge refutations the critic overturned

The critic overturns the following judge findings:

- **Refutation 10 is wrong** (`judge:55`). `DEPARTURE_FAMILIES` exists: `export const DEPARTURE_FAMILIES = createDepartureFamilies()` sits at `tests/setupBrowser.ts:7548` at `66f80b5`, and `DepartureLedger` reads it at `:7679`. The critic read it at `:7545` at `af0b945` (`critic:19`), and `66f80b5` moved it to `:7548`. The brief named the wrong file, not a missing symbol.
- **Refutation 6 falls in substance** (`judge:51`). Proposal 3 read `Collapse.ts:130-131` as the mixing that the user's words refuse. The critic shows that the leaf adds a write the class never made (`critic:28`), and the brief's reading of code separation adopts that view (`brief:9`, `:32`).
- **Graft 6's size baseline is stale** (`judge:38`). The baseline is `dist/src/browser/index.js` at 264,773 B, built at `66f80b5` by the landing gate (`stat` of the build's output, 2026-10-06 21:57:12; `runs/landing-66f80b5-build/stdout.log:47` reads 264.77 kB; `critic:20`).

The brief replaces the narrowed N1 (`brief:17`; `critic:29`), the scoping clause in the root remark (R6; `brief:15`), the raw-text boundary as the only enforcement (R1; `brief:14`), and the `cancelable: false` token (`brief:14`; `critic:12`). Q1 puts technique tier 2 to the user. The names reading replaces the `native` folder and the `emitNotice` and `narrowContext` names (R12).

### Critic items and what resolves them

Every critic gap, unverified item, and breach maps to the ruling or unit that resolves it, as the following table shows.

| Critic item | Resolved by |
| --- | --- |
| Gap 1, classic-only rows in standing gates (`critic:3`) | Classic-row selection; N5; the close-out's classic run |
| Gap 2, the unowned export pin (`critic:4`) | Serial applier: each unit's exports reach `tests/src/browser/index.test.ts` through it |
| Gap 3, N7's missing files (`critic:5`) | N7 owns `main.ts` or `Showcase.ts`, `main.test.ts`, `constants.test.ts` with the routing analog, and the three faces' readings |
| Gap 4, the broken predictions and `RM:184` (`critic:6`) | Predictions; N9 re-cuts `RM:184` |
| Gap 5, cross-scope ownership (`critic:7`) | Cross-scope ownership: N4 reads both orders, N8 proves the page shapes, and N9 owns `G:583` |
| Gap 6, `stable` for `div` hosts and Dialog's resolver (`critic:8`) | Plugin shape: `stable` reaches `Dialog` hosts only, and `Dialog` resolves through `resolveModalOptions` |
| Gap 7, N1's self-contradiction (`critic:9`) | R8: N1 withdrawn |
| Gap 8, N5 editing N1's files (`critic:10`) | R8 and N5: under Q1 (a), N5 edits no root source file. Its changes reach `dialogs/` source and tests, the `lock-stable:dialog` guide rows, and `DepartureLedger` as patches, and it moves `Lock.test.ts:153`. Under (b), `Modal.ts` reads `compensation` in place, with no N1 leaf |
| Gap 9, units contradicting the serial applier (`critic:11`) | Serial applier: N6, N7, and every guide and roadmap change arrive as patches |
| Gap 10, the boundary test failing its own barrel row (`critic:12`) | R1: the token check exempts `index.ts`, the token list drops `cancelable: false`, and the root remark stays unchanged (R6) |
| Gap 11, owed deliverables (`critic:13`) | § Owed records: ruling 4, ruling 5, and the supersession list |
| Gap 12, the two elements readings (`critic:14`) | Q3; N4 acceptance |
| Gap 13, unowned guide and roadmap sites (`critic:15`) | N9 owns `G:542`, `:583`, `:955`, `:957` and `RM:3`, `:51`, `:145`, `:151`, `:184`, `:192` |
| Gap 14, selective module law and unrecorded overrides (`critic:16`) | § The separation rule records the overrides of `arch:221-222`, `:311`, and `scaffold/AGENTS.md:65`, and meets `arch:224` |
| Unverified 1, `DEPARTURE_FAMILIES` (`critic:19`) | Corrections: refutation 10 overturned |
| Unverified 2, the size baseline (`critic:20`) | Corrections; N8 records its size beside 264,773 B |
| Unverified 3, an authored `closedby` (`critic:21`) | R9; N4 reading |
| Unverified 4, the one-sided parity fence (`critic:22`) | R9; N4 reading |
| Unverified 5, the fence under the Tailwind faces (`critic:23`) | R9; N4 reading; N7's preservation readings |
| Unverified 6, the folder name (`critic:24`) | R12: `dialogs/` |
| Breach 1, stage A native-API departures (`critic:27`) | Q2 |
| Breach 2, leaves threaded through Bootstrap classes (`critic:28`) | Q1; R2 withdraws tier 2 under (a) |
| Breach 3, N1 changing drop-in source (`critic:29`) | R8 |
| Breach 4, raw-text enforcement (`critic:30`) | R1; S48 |

## Amendment of 2026-10-07: the user's ruling on the native track

The user ruled on 2026-10-07 (`rulings` § Fourth round) that the native track builds only surfaces with no Bootstrap counterpart, from scratch, and never against the drop-in engine. Under that ruling: Q1 resolves to (a) with no `stable` leaf anywhere (N6 withdraws `intrinsic` with `git revert 6b99552`; N5 is cut); Q2 stands as (a), the drop-in engine's documented stage A behavior; Q3 is moot, because no native dialog over `modal` is built (N0, N1, N3, N4, N7, N8, N9 are cut); Q4 is confirmed, and the re-home list is replaced by the catalog round's shortlist. The separation rule (§ The separation rule), R1's boundary enforcement (S48), R12's naming, and the serial-applier, classic-row, and prediction rules stay in force for every native module the catalog round opens. The first native module's folder name follows its entity, not `dialogs`.
