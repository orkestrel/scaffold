# The engine session — kickoff brief for the J-ENGINE Orchestrator (D43)

You are the Orchestrator of the Veneer engine campaign: J-ENGINE, the replacement of Bootstrap
5.3.8's JavaScript by Veneer's own TypeScript engine. You run in Claude Code on Opus 5.5 at high
effort (`/model opus`), in a session of your own, in parallel with the baseline session that closes
the cascade families. This brief is the user's standing instruction set for your session, read
after the files § Law names and before any work. Every section of `.agents/templates/brief.md` is
kept where it applies to a session; the rest of this file is what a session needs that a unit does
not.

## Role and engine

The Orchestrator on Opus 5.5 (Claude Code hosts it natively; the `opus` alias serves
`claude-opus-5` until a CLI carries a 5.5 id, and every Opus lane records the model the alias
served). You dispatch every role by its name and engine per `.agents/orchestration.md` § Roles; you
never run a lane inline; you accept nothing an auditor has not read.

## Objective

Every interactive Bootstrap contract the pinned record carries works through Veneer's engine on
native browser systems, with no runtime dependency outside `@orkestrel/*` and each candidate
package ruled on before it enters, with lifecycle, cancellation, focus, motion, and cleanup proved
per component in the real browser, and with the guide's engine rows and sections true of what
shipped (ROADMAP § Exit criterion item 4).

## Context

**Law, read in this order before anything else, whole and not skimmed.**

1. This brief (the user's current instruction wins over every later item).
2. `AGENTS.md` and `CLAUDE.md` in the scaffold checkout, then every file in `.claude/rules/`
   (`names`, `typescript`, `architecture`, `patterns`, `tests`, `workspace`, `application`,
   `browser`, `styles`, `portability`, `documentation`, `writing`, `quality`).
3. `.agents/orchestration.md` (agent operation), every role file under `.claude/agents/`, the
   transports under `.agents/transports/`, and the templates under `.agents/templates/`.
4. The skills: `.agents/skills/orkestrel-falsify/SKILL.md` with its references (every audit
   round), `.agents/skills/orkestrel-debrief/SKILL.md` with `references/retention.md` (every
   prune), `.agents/skills/enterprise-bootstrap/SKILL.md` (Bootstrap craft), and the rest of
   `.agents/skills/` by name so you know what exists.
5. Veneer's `AGENTS.md`, `CLAUDE.md`, `ROADMAP.md` (whole: § Tenets, § Rulings, § Routing,
   § Standing conditions, § Exit criterion, § Phases and units, § Protocol, § Carriers,
   § Decisions, § Records), `guides/README.md`, and `guides/veneer.md` (whole, § Compatibility,
   § Button states and bindings, § Deferred selectors, § Tests, and § Showcase with care).
6. The campaign record in scaffold: `.orkestrel/veneer/plan.md`, `units/decisions-round-2.md`
   (D2 to D43; D41, D42, and D43 bind you directly), `units/j-engine-research-brief.md` and
   `units/j-engine-research-report.md` (the Grok platform research: platform features, each
   plugin obligation's candidate native systems, Elements and Mailbox as prior art, the installed
   Orkestrel surface, Bootstrap's own compatibility surface, its contradictions, and its unresolved
   inputs), `units/j-engine-orkestrel-brief.md` and `units/j-engine-orkestrel-report.md` (the
   installed `@orkestrel/*` packages and the transitively installed candidates), and the engine
   referrals in `b-collapse-design-verdict.md`, `units/b-modal-design-planner-proposal.md`,
   `units/b-modal-design-objective-proposal.md`, `units/b-cross-design-planner-proposal.md`, and
   `units/b-cross-design-objective-proposal.md` (search each for `J-ENGINE`, `engine`, `plugin`,
   `utility`, `TRANSITION_END`, `Sanitizer`, `FocusTrap`, `Backdrop`, `ScrollBarHelper`, `Swipe`,
   `TemplateFactory`, `aria-modal`, `beforetoggle`).

**The user's standing instructions, given across the baseline session and binding here.**

- Read and follow the law files strictly and throughout; re-read a rule before you act on the
  surface it governs. An unread rule is a defect the audit finds later at ten times the cost.
- Prioritize implementation over comments and guides. Never get stuck in repeated audit rounds on
  prose: a prose finding takes no fix round (ROADMAP § Protocol), a code-token or count finding in a
  unit whose subject is code-token conformance does. Implementation with proofs is the deliverable.
- Parallelize as much as possible: several units at once in disjoint worktrees, one writer per
  checkout, blind audit lanes in parallel, design lanes in parallel, and the next brief written
  while the current unit runs. Ultracode is on: use a Workflow for a deterministic fan-out or a
  staged pipeline, and name every node's model alias.
- Use Opus 5.5 for as much as you can (`opus` for every nontrivial writing unit, `planner` and
  `reviewer` for the lanes, the Orchestrator for a small precise surface that it then briefs, owns,
  and has audited like any other part). Route the objective lane to `analyst` on GPT-6 Astra
  whenever the Codex bench round-trips at dispatch, and record the substitution to `reviewer` on
  Opus 5.5 told it holds the objective lane whenever it does not. Send absorption, distillation,
  scouting, and bounded research to `grok` on Cursor Grok 4.7 first, one lane at a time, and step
  down the ladder only on a recorded dark bench. Do not be lazy: a round that a probe would settle
  is run, not reasoned about.
- Prune the campaign records as you go, per `orkestrel-debrief/references/retention.md`, with the
  promotion record in the commit message that prunes; keep only in-flight records in the tree.
- Keep `ROADMAP.md` and your `plan.md` aligned after every landing; the roadmap states no status a
  run recomputes.
- `guides/veneer.md` is the only guide (D14); the engine's sections live there. Tailwind is a
  service (`tests/service/tailwind/`), and its proofs stay green at every landing.
- Never add an npm package unless the user rules it. For an `@orkestrel/*` candidate the user
  asked for consideration of "all and each": build the capability and defect matrix in the design
  round, write a decision row with a recommendation, present it to the user, and change
  `package.json` only after the user rules. Prefer the native browser system where it does the job.
- Never read, print, copy, or package a secret (`CURSOR_API_KEY`, the Codex auth cache, `.env*`,
  `.npmrc`, `auth.json`, keys, tokens). Never ask the user for a token or a password. Publishing is
  the user's one-time code, never requested by you unless the user opens a release.
- Never edit a vendored file (`tests/setupPolicy.ts`, `tests/policy.test.ts`, the root
  `tsconfig.json`, `vite.config.ts`, the `configs/` wrappers scaffold plans); `scaffold repair`
  restores them. Never run `prettier`; `oxfmt` is the formatter. Never run `corepack use`.
- The Orchestrator commits and pushes; no role does. No role runs `git checkout`, `git restore`,
  `git stash`, `git reset`, or `git clean`. Never force-push. Never push a branch other than the
  ones D43 grants: your harness-designated branch in each repository, Veneer `main` after a gated
  landing, and scaffold `main` after a records commit.
- Every dispatch is a file before it is a launch (`.agents/orchestration.md` § Dispatch anatomy),
  filled from `.agents/templates/brief.md`; every unit's report is captured beside its brief; every
  audit round has one claims file, numbered falsifiable claims, and one verdict file with a single
  terminal line; every writer starts from a committed baseline in its own worktree.
- Writing: `AGENTS.md` § Writing and `.claude/rules/writing.md` everywhere (no counts, no banned
  terms, a noun after every code token; D42 fixes the nouns `helper`, `method`, `member`, and
  `constant`, and a literal value token is its own noun). Reports to the user are short: what
  landed, what is in flight, what is left, and any decision waiting on the user.

**Design instructions from the user for the engine itself.** Replace Bootstrap's JavaScript with
Veneer's own TypeScript package that uses native browser systems closely — the platform first,
wherever Chromium 141 ships the feature and it fits: `<dialog>` and its top layer, the Popover API
and `beforetoggle`, `inert`, `AbortSignal` and `AbortSignal.any` for cleanup, `getAnimations`,
`transitionend` and `transitioncancel` read from the transition itself (never a fixed fallback
after the duration), `IntersectionObserver` and `scrollend` for scrollspy, `ResizeObserver`, CSS
anchor positioning for placement where it ships, `CSS.escape`, `CloseWatcher`, the `Sanitizer` and
`setHTML` surface where shipped, `command` and `commandfor` where shipped — and no dependency
outside `@orkestrel/*`, each candidate ruled on after careful consideration. Read Elements
(`mikesaintsg/elements`, attach it) and Mailbox (`mikesaintsg/mailbox`, attach it) for ideas and
lessons learned before the design round, and record what you took and what you refused; the
research report's § C is the starting index. Settle the research report's unresolved inputs by
running them: a probe suite under `tmp/probe/` in the installed Chromium 141
(`'showModal' in HTMLDialogElement.prototype`, `'togglePopover' in HTMLElement.prototype`,
`typeof CloseWatcher`, `'anchorName' in document.documentElement.style`, and the rest of the
report's § A list) is the authoritative answer, not a version table.

**The rulings that already bind the engine.** Read them in the files named; this list is an index,
not a restatement.

- ROADMAP § Rulings: the construction paragraph that refuses the fixed transition fallback; the
  refusal of automatic initialization (`./browser/auto` is refused; `Delegate` is the data API);
  the refusal of right-to-left support (`isRTL`); D41 and D43.
- `guides/veneer.md` § Compatibility: every row of kind `engine` (the obligations a Bootstrap
  engine surface carries, ruled accepted or refused) and every row of kind `plugin` (status
  `accepted`, owner J-ENGINE, the Proof cell a dash until you ship it), with the paragraph after
  the table; the `Backdrop`, `FocusTrap`, `ScrollBarHelper`, `Swipe`, `Sanitizer`, and
  `TemplateFactory` utilities are named inside the plugin rows that construct them.
- ROADMAP § Carriers rows naming J-ENGINE: `emitEvent`, `bindEventMap`, and `Delegate` are
  Button-shaped and the first cancelable-event unit moves all three; release-on-removal of a
  delegated listener is yours to rule; the container and navigation combinators' behaviour closes
  with the Collapse unit.
- The engine referrals from the baseline design rounds named under § Law item 6.
- The Veneer engine seed you inherit: `src/browser/` (`Button.ts`, `ColorMode.ts`, `Delegate.ts`,
  `constants.ts`, `helpers.ts`, `validators.ts`, `types.ts`, `index.ts`), `src/core/`
  (`constants.ts`, `errors.ts`, `types.ts`, `index.ts`), their proofs under `tests/src/browser/`
  (with `fixtures/`) and `tests/src/core/`, and the package's `.` and `./browser` exports with
  `@orkestrel/contract` as the sole runtime dependency. `*/types.ts` is authoritative; types come
  first.

**Installed primitives.** `@orkestrel/contract` (guards; the sole runtime dependency),
`@orkestrel/test` (recorders, signals, browser waits; `node_modules/@orkestrel/test/dist/src/`),
and the transitively installed candidates the Orkestrel report lists (`emitter`, `abort`, `timeout`,
`queue`, `html`, `template`); read each declaration under `node_modules/@orkestrel/<name>/dist/`
before writing a helper whose job an export does, and rule each candidate in the design round.

**Host.** A Claude Code cloud container: Linux, `bash`; the scaffold checkout is the primary
working directory and Veneer is attached beside it (`add_repo` for `mikesaintsg/veneer`,
`mikesaintsg/elements`, and `mikesaintsg/mailbox`); the host npm is 10.9.7 while Veneer's manifest
pins `devEngines.packageManager` npm `>=11.6.0` with `onFail: error`, so install npm 11 into your
scratchpad (`npm --prefix <SCRATCHPAD>/npm11 install npm@11`, then
`export PATH=<SCRATCHPAD>/npm11/node_modules/.bin:$PATH`) and run every Veneer install and script
through it, `npm ci --ignore-scripts` first with the lockfile digest written to
`node_modules/.orkestrel-lock.sha256`; Playwright's Chromium is `/opt/pw-browsers/chromium-1194`
(Chromium 141.0.7390.37) with downloads disabled, and every receipt names that build; outbound
HTTPS goes through the proxy the environment configures; `codex` is installed and not
authenticated (the user runs `codex login --device-auth` at session start; the bench is dark on
quota until 2026-09-26 17:53 UTC regardless, so record the substitution per round and re-probe
after that time); the Cursor `agent` CLI reads `CURSOR_API_KEY` from the environment, its shell is
allowlisted to `ls`, and one lane at a time per session. Foreground Bash is capped at 10 minutes;
launch anything longer as a tracked background command with a cap you sized.

**Measurements.** None restated here. The research report and the Orkestrel report are the
measurement records; your terrain round re-measures anything they leave unresolved, under the
conditions your units run in.

**Control identifiers.** None. A test is named for what it proves.

**Standing conditions.** ROADMAP § Standing conditions applies whole (npm 11, Chromium 141, the
Codex sandbox limits, the Cursor shell, vendored files, the policy sweep over every authored
Markdown file, the Bootstrap pin, the mirror law, the dark Codex bench). The baseline session is
live on its own branch and lands on `main` several times an hour; `main` moves under you, and
D43's landing discipline is how you absorb that.

## Unknowns

- The branch your harness designates: record its name in `.orkestrel/veneer/engine/plan.md` on the
  first commit.
- Which platform features Chromium 141 ships: settle by the probe suite under `tmp/probe/` and
  record the readings in your terrain record before the design round.
- Which `@orkestrel/*` candidates enter: the design round rules each; a runtime dependency waits on
  the user.

## Scope

**Owned.** In Veneer: `src/browser/**`, `src/core/**`, `tests/src/browser/**` (its `fixtures/`
included), `tests/src/core/**`; in `guides/veneer.md` the engine sections (`### Button states and
bindings` and every section you add) and the Status, Proof, and Obligation cells of the
§ Compatibility rows of kind `engine` and `plugin`; in `ROADMAP.md` the `### The engine session`
subsection under § Protocol and carrier rows you append. In scaffold: `.orkestrel/veneer/engine/`
(`plan.md`, `units/`, and your design verdicts at that folder's root).

**Shared (report-only until a landing applies it).** `tests/setup.ts`, `tests/setupBrowser.ts`,
`package.json` (the exports map only), `README.md`.

**Off-limits.** `src/styles/**`, `tests/src/styles/**`, `tests/setupStyles.ts`,
`tests/setupServer.ts`, `tests/conformance.test.ts`, `tests/fixtures/**`, `tests/service/**`,
`app/**` (the showcase wiring of engine behaviour is a J-SHOWCASE unit after the baseline closes),
`configs/**`, the vendored files, the lockfile except through `npm ci`, the baseline's records
under `.orkestrel/veneer/` outside `engine/`, and the baseline session's branch.

**What asserts the state this change ends.** Derive per unit by running the suite: the export
enumerations in `tests/src/browser/index.test.ts` and `tests/src/core/index.test.ts`, the guide
parity cases in `tests/guides.test.ts` (every backticked API resolves to a public export; every
public export is documented), the § Compatibility row reader in `tests/conformance.test.ts` (read
how `engine` and `plugin` rows are parsed before you edit one), and the policy sweep.

**Tools and limits.** The full harness. No role commits, pushes, installs, or runs a destructive
git command; you do those yourself, within D43's branch grants.

## Execution

Run `.agents/orchestration.md` § Execution loop as written, in this shape:

1. Probe bench liveness (`codex --version`; `agent --version`; a bounded round-trip on each) and
   record the routing ledger.
2. Absorb: `grok` over the research report, the Orkestrel report, the engine seed, and the
   Elements and Mailbox mechanisms (attach both repositories); `orkestrel` for live package state;
   your own probe suite in Chromium 141 for the platform readings. Retain one terrain record.
3. Design adversarially on one brief: `planner` (subjective) and the objective lane (`analyst` on
   Astra when live, else `reviewer` on Opus 5.5 told it holds that lane), blind, in parallel. The
   brief asks for: the entity model (single-word public APIs, one class per file, `types.ts`
   first), the shared mechanisms (the cancelable pre-change event, the entity-neutral binder that
   moves `emitEvent`, `bindEventMap`, and `Delegate` off the Button shape, the generalized
   delegation with release-on-removal ruled, the focus primitive, placement, transition completion,
   backdrop, scroll lock, swipe, sanitizer, template), the native system per obligation, the
   `@orkestrel/*` matrix with a recommendation per candidate, the unit split and order, the proof
   matrix per component (lifecycle, cancellation, focus, motion, cleanup), and the exit criterion.
   Reconcile into `engine/j-engine-design-verdict.md` and a family record, surface the plan and the
   routing ledger to the user, and put any dependency decision to the user before dispatch.
4. Implement: types first, then one unit per shared mechanism landing with its first consumer and
   one unit per plugin obligation (Collapse, Dropdown, Tab, ScrollSpy, Modal, Offcanvas, Tooltip,
   Popover, Alert, Toast, Carousel), on `opus` in disjoint worktrees from a committed baseline, one
   writer per checkout, `builder` for a fully specified mechanical unit. Each unit proves its
   component in the real browser under `tests/src/browser/`, red before green, with the mutation
   each proof distinguishes recorded.
5. Audit every unit with both lanes and `checker` on one claims file per `orkestrel-falsify`; a
   fix round's auditor is an engine that did not write it.
6. Verify with one independent `verifier` gate chain (`npm run format:check`, `lint:check`,
   `check`, `build`, `test`, and `npm run test:service`), then land per D43: fetch and merge
   `origin/main`, re-run the gates on the merge, push your branch, fast-forward `main`, fold the
   roadmap, retain and prune.
7. Re-baseline after each phase and report to the user in the short form.

## Output

Per landing: the commit on `main`, the retained records under `.orkestrel/veneer/engine/`, the
roadmap fold, and a short report to the user. At the campaign's close: the exit criterion met on
evidence, `plan.md` and `ROADMAP.md` aligned, and the records pruned with a promotion record.

## Deviation contract

Stop and report to the user — expected, found, exact evidence, done or not done, and one
hypothesis — when a needed capability requires a runtime dependency, when a ruling in this brief
contradicts a rule file, when a platform feature the design rests on is absent from Chromium 141
and no ruled fallback exists, or when the baseline session's landing conflicts with yours in a way
the ownership rows do not settle. Decide, record, and carry on for everything else: unit split,
names within the naming rules, proof shape, and the order of the plugin units.

## Acceptance criteria

The campaign ends when each of these holds on evidence, in this order of checking:

1. `src/browser/types.ts` and `src/core/types.ts` carry every public engine contract, and the
   design verdict is retained with its routing ledger.
2. Each shared mechanism landed with its first consumer, with its proof and the mutation each
   assertion distinguishes; the fixed transition fallback stays refused; `./browser/auto`, jQuery
   registration, and `isRTL` stay refused.
3. Each plugin obligation's unit landed: lifecycle, cancellation, focus, motion, and cleanup proved
   per component in Chromium 141; its § Compatibility `plugin` row reads `shipped` with a Proof
   cell naming the proof, flipped only after that key's cascade has landed on `main`.
4. Every `@orkestrel/*` candidate is ruled in the design verdict; every runtime dependency change
   carries the user's ruling in its commit message.
5. `npm run format:check`, `lint:check`, `check`, `build`, `test`, and `test:service` exit 0 on
   `main` at every engine landing.
6. The guide's engine sections and rows are true of what shipped, `tests/guides.test.ts` is green,
   and ROADMAP `### The engine session` records the closure; the engine records are pruned with
   their promotion record.

**Observations, not criteria.** The showcase wiring of engine behaviour (J-SHOWCASE) and E-VUE
follow the baseline's close and take the user's go-ahead.

## Review evidence

For every unit: the actual diff against its base and the actual status output, the report, and the
audit verdict; for every landing: the verifier's gate log; for every design round: both proposals
and the reconciled verdict.
