# Veneer campaign handoff

Written 2026-09-21 for the next Claude Code session on this machine. Read this file, then the
appended entries at the end of `plan.md` (the last entries of the file, after its earlier
re-baseline record), then the latest verdict named under § State, before dispatching anything.
The law is unchanged: `AGENTS.md`, `.agents/orchestration.md`, and `.claude/rules/*.md` in the
scaffold checkout, read before every dispatch.

**How paths read here.** A bare file name (`plan.md`, `cl2-audit-verdict.md`) and a `units/…`
path resolve under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/`, the campaign
folder. `TMP/…` is the scaffold checkout's ignored launch folder, the literal lowercase
`C:/Users/mikes/WebstormProjects/scaffold/tmp/`, spelled in capitals so that
`units/retention-rewrite.mjs` (which is also told to skip this file by name) never rewrites
it. `AGENTS.md`, `.agents/…`, and `.claude/…` sit at the scaffold root. Veneer paths name the
checkout `C:/Users/mikes/WebstormProjects/veneer` in full.

## The campaign in one paragraph

Veneer is `@orkestrel/veneer`, a Bootstrap-compatible styles package piloting scaffold's styles
environment by hand. The plan is `plan.md` and the design tenets `tenets.txt`. U1 to U7 (the
Button family) are closed and landed. The Content/layout family is under way, designed in
`content-layout-design-verdict.md` as units CL0 to CL13 in mechanism order: CL0 calibration
(landed as `research/calibration-content.md`), CL1 the proof contract (landed), CL2 tokens and
breakpoint mixins (landed), CL3 the reset partial and the text Reboot tags (landed), CL3b the
muted-text and raised-surface tokens (landed), CL4 the remaining Reboot
tags flipping the `reboot` key, CL5 typography classes, CL6 links, CL7 containers, CL8 grid,
CL8b the gutter and gap step utilities, CL9 tables, CL10 the icon-link, ratio, and vertical-rule
keys, CL11 the journey and helper bounds, CL12 the guide pass, CL13 the portfolio verdict against
Elements. The image and figure keys are not CL10's: they shipped with the content work and are
already listed. Routing: CL1, CL3, CL4, CL6 to CL9 on Astra
(`sol`); CL2, CL3b, CL5, CL10 to CL12 on Opus (`opus`); CL13 the portfolio verdict lanes. Every
unit is scope-read before dispatch, audited on the adversarial lanes plus a checker and a
verifier, and landed by a script that refuses any file outside the owned set.

## State at handoff

| Checkout | HEAD | Meaning |
| --- | --- | --- |
| Veneer | `eb1cd71` | CL11 landed and pushed; the tracked tree is clean unless a unit is live |
| Scaffold | confirm with `git log --oneline -1` | every record through CL11's landing retained and pushed |

Landed in Veneer: CL1 `00a5bdc`, CL2 `9f5ffda`, CL3 `9bb306e`, CL3b `d822d59`, CL4 `bc580c1`,
CL4b `5240e36`, CL5 `ea82419`, CL5b `4f817db`, CL5c `c1c81a4`, CL6 `c8f53f8`, CL7 `a9172df`,
CL8 `d2c5bb3`, CL8b `8c70787`, CL9 `5e011a3`, CL10 `0e0b055`, CL11 `eb1cd71`. Each has a verdict file
named for it.

**The whole surface is measured**, in `units/remaining-surface.md`: the record carries 135 keys, and
the conformance listing admits 31 after CL10 closed the Content/layout family. That leaves 104 keys to
the six later families. That file groups the remainder by family with sizes, so each family's design
round starts from a measurement — but it was written after CL9, so re-derive its selector totals from
the listing rather than reading its counts as current.

**Five standing proofs enforce the accounting, and each catches a different class.**

- `scanStyleBlocks` sweeps every partial under `src/styles/` recursively and a case asserts no
  cross-file shared declaration block, with a guard that the sweep discovered each folder so it cannot
  pass by finding nothing. **When a brief tells a unit to copy a pattern from another partial, grant
  that partial**: the honest fix reaches both copies.
- A case in `tests/setupStyles.test.ts` compiles the real `breakpoints()` map and binds its non-zero
  names to the registry's container keys and its zero names to the ramp's own zero keys.
- A case in the same file compares the built cascade's selector and media-condition **multiset**
  against the pinned record minus the guide's deferrals, for the keys its tuple names. It understands
  both breakpoint directions: an upward condition by a spelling rewrite, a downward one by arithmetic,
  because the record's downward boundary is the named one less two hundredths. **It is the only
  assertion that catches an extra emitted selector anywhere in the admitted vocabulary** — the presence
  scan reports a missing name and never an extra one, and the family bindings compare against the
  record rather than a token source. CL10's round 1 narrowed that claim from "the only assertion in the
  tree": CL10's own icon-class binding pins the selectors mentioning the icon class to an exhaustive
  list and so rejects an extra one within that subset. Its tuple and its selector prefix cover
  different populations on purpose.
  **It compares selectors and enclosing conditions only — never declaration values.** Its own doc block
  says so. Do not write a brief predicting it will redden on a changed value; it cannot.
  **Its selector boundary carried a latent defect through CL10**, measured in
  `units/cl10-fix-terrain.md`: the negated class is ASCII-only, so a longer name whose extension is
  non-ASCII or backslash-escaped was admitted as if it belonged to the prefix's family. CL10's fix
  round closes it for every prefix. Nothing false shipped, because no such selector exists in the
  cascade or in Bootstrap's distribution.
- The utilities' density independence is read at the document root with a positive control proving the
  factor arrived.
- The table key's custom-property layering is read with sentinel values, and its accent fallback
  discriminates a dropped chain, a literal substitution, and a wrong precedence.

**Two gaps in the accounting are measured and waiting on the user**, in
`units/value-accounting-finding.md`: nothing compares declaration values at all, and nothing rejects
an unrecorded selector outside the keys the comparison's tuple names. Both are the same gap — the
accounting runs one way — and closing them is one unit with a departure table beside the deferral
table. It moves the family's exit criterion, so it is a rescope rather than a re-baseline. **CL8b's
gap-triple question is also still open**: whether to pull the `gap` and `column-gap` keys forward to
sit with `row-gap`, which CL8b shipped because the `row` key required it.

## What to do first: CL12, the guide

CL12 owns `guides/veneer.md` and `guides/README.md`. It routes to `opus`, so its audit lanes swap:
Astra objective, the Opus reviewer subjective.

It carries every guide bound a unit reported, including CL7's stale token-table sentence, the missing
container and gutter token rows, and the sentence still promising component surfaces will consume the
raised-surface token. **It also carries new parity drift**: CL11 added exports to the browser setup
module's public surface — the renamed button reader, the specimen reader, the frame sampler, the
capture controls, and the cascade state table — and `.claude/rules/documentation.md` requires every
public export documented.

Measure its terrain against the post-CL11 tree before writing its brief. Scope-read the brief before
dispatching, and tell the scope read to derive each population by searching for the members the tree
already holds — that method is what caught an unscoped file on CL11 and what a scope read missed on
CL10.

## Then CL13

Per `content-layout-design-verdict.md` § Units (the routing ledger is there). Brief each from
the design row, the planner's criteria (`units/content-layout-design-planner-report.md`), and
the analyst's unit (`units/content-layout-design-analyst-report.md`); scope-read first.

- **CL10** the icon-link, ratio, and vertical-rule keys. **CL11**
  journeys and captures. **CL12** the guide. **CL13** the portfolio verdict.
- **A candidate successor unit** carries CL8's built-side findings with the measurement in
  `units/value-accounting-finding.md`: the projects that read the built artifact run no build of
  their own, and the emitted-vocabulary population misses a re-layered or descendant-combinator
  emission. Both sit with the value-accounting proposal, which is the user's call.
- **CL11** carries `visitBreakpoint`'s bare `finally`, the hold's uncased refusals, the U7c
  `resolveButton` rename, and `driveOracle` root scoping.
- **CL12** carries every guide bound a unit reported, including CL7's: a token-table sentence that
  stopped being true of the code when the gutter became its own token, and the container and gutter
  tokens having no token-table row.
- **CL13** reuses the U7f portfolio shape (`u7f-verdict.md`, `units/u7f-harness-3.mjs`,
  `units/u7f-recapture.sh`).
- The bounds CL5 was to carry that no landed unit closed — the stripe light-scope assertion, the
  shell's document-global `main` id, and the description-list case field's name — pass to the next
  unit that owns each file.

After this family: six more families — Passive, Forms, Disclosure and navigation, Overlays and
feedback, Helpers and utilities, and Cross-cutting — then the package is finished and published.
Publishing is the user's decision and runs on a one-time code.

## Standing rulings from the user (binding)

- **The Content/layout family is the baseline, and conformance is the deliverable.** The user's
  framing, stated during CL6: these units exist to nail down the source and the proofs, with
  Bootstrap fully accounted for and every addition, removal, and change recorded, so movement is
  noticed and a future Bootstrap major can be tracked rather than guessed at. Read every unit's
  obligations in that light. **Every selector a key carries ends shipped, excluded with a
  recorded reason, or recorded as a departure, and none ends unaccounted for.** A departure only
  a person would notice is not recorded; a departure a scan or a proof catches is. Prefer the
  machine-checkable form of any accounting over the prose form, which is the same ruling as
  implementation over prose applied to the ledger.

- Implementation over prose. Comments and guides are the bare minimum to pass; audits cover
  implementation only (correctness, rule compliance, test sufficiency, scope honesty). A
  wording finding is a bound folded into the next implementation unit, never a fix round.
  Reaffirmed by the user during CL5's round 1, with the mechanism that enforces it: **a claims
  file carries no guide-row claim at all.** A claim asserting a property of a guide row invites
  every lane to audit prose, which is how CL5's round produced two guide findings under a ruling
  that bars them. Judge a guide row only where a unit's own criterion names it, and carry its
  facts as a bound for the unit that owns the guide.
- **Write a claim only from a source you read, never from the unit's report.** The claim-drafting
  defects across this campaign share one root: the report said something, the Orchestrator
  restated it as a claim, and a lane found the nuance the report had smoothed over. Every claim
  must either carry the Orchestrator's own check of the primary source, or be written as what the
  unit reports rather than as what is true. Each of these was caught by a lane:
  - Stating what a failing run left passing, when the later assertions never executed.
  - Claiming two artifacts identical without taking the measurement first.
  - Claiming something of every member of a set, contradicting an exception the same claims file
    named a few lines earlier.
  - Writing a guide-row claim under a ruling that bars auditing prose, which instructs every lane
    to audit prose whatever the brief says beside it.
  - Claiming a unit exceeded its brief without reading the Unknown in that brief which had told
    the unit to settle exactly that question.
  - Crediting a proof with a guard it does not carry, when a neighbouring assertion is what
    actually reddens.
  - Writing two acceptance criteria that cannot both hold, so the unit must break one to close
    the other. Read a brief's criteria against each other before dispatch, not only against the
    tree.
- **A derived launch artifact is rewritten in every field that names the subject.** The rule and
  the fields it covers now live in `.agents/orchestration.md` § Dispatch anatomy, landed in
  scaffold `27aa5dfd`. It got there because this campaign produced the defect in four consecutive
  rounds, each caught by a lane: a brief's lane focus arguing the previous round's claim numbers;
  its evidence paths naming the previous round's brief and report; its subject files naming the
  previous unit's files, so CL7's objective lane was handed CL6's partials and never told about
  the files CL7 created; and CL7's round-2 workflow carrying CL5's description with its objective
  node labelled subjective. A substitution over paths catches one of those and misses the rest.
  Rewrite each by hand, then read the artifact start to finish as its executor will receive it.
- **Every file a brief names must exist when the round launches.** CL7's round-2 objective lane
  was told to read a verdict file the Orchestrator had not yet written, and wrote the finding up as
  a dispatch defect. The contract already required this; the failure was writing a record during
  the round it documents instead of before dispatch.
- **The rules live in the scaffold checkout, not in the subject.** Every lane brief through CL7
  said "the law under the Veneer checkout (`AGENTS.md`, `.claude/rules/…`)". That checkout holds
  `AGENTS.md` and `CLAUDE.md` only, and its `AGENTS.md` redirects to scaffold. Name it correctly:
  `AGENTS.md` at the subject checkout root, and the rule files under
  `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`.
- One guide per package: `guides/veneer.md` only. Surfaces are core, browser, server, styles
  only; Vue is a deferred service; no invented surfaces (no subpath export, side-effect entry,
  build wrapper, or rule amendment beyond scaffold's shape).
- Veneer pilots the styles environment by hand; implement nothing in scaffold for it.
- A lone class sits flat at its environment root; families live in lowercase plural folders.
- No RTL work. Orkestrel packages may be declared as dependencies; any other dependency is
  the user's call. Publishing is OTP-based only; never paste a token or password; never read
  `~/.npmrc` or a credential file.
- Routing: Codex bench lanes on `gpt-6-astra` only (never Sol); Cursor only for Grok 4.6; Opus
  lanes native; one bench lane at a time per bench.
- Exclusions and open design questions are reported to the user at the owning unit's
  acceptance (the family's, for Content/layout).

## How every unit runs

1. The brief is a file first: `TMP/units/<unit>-brief[-n].md` from `.agents/templates/brief.md`,
   scope-read against the live tree before a bench dispatch (CL2's read found mixins that did
   not exist; CL3's found a barrel and a guide row that did not). A scope read is mechanical
   conformance evidence, which `.agents/orchestration.md` § Tedious work routes to `grok` first
   and to the native `checker` only after the ladder steps past Grok: dispatch `grok` with the
   scope-read brief and record the step. The last session sent CL1's to CL3's scope reads
   straight to the native `checker` without recording a ladder step; that is a recorded
   deviation, not the rule.
2. Stage it into `C:/Users/mikes/WebstormProjects/veneer/tmp/units/` and verify `diff -q`. A
   bench writer opens the staged copy.
3. Launch: a bench unit through `TMP/codex/<unit>[-n].sh` (derive it from `TMP/codex/cl3-2.sh`;
   the script's own `timeout 7200` is the cap and its prompt names the brief and the report) as
   a background Bash command, with a Monitor over `TMP/codex/<unit>-watch.sh`; a native unit
   through the Agent tool (`opus` for the writer) in the background. Confirm the journal grew
   past its header before recording the launch.
4. The report returns as the unit's last message and as
   `C:/Users/mikes/WebstormProjects/veneer/tmp/units/<unit>-report[-n].md`; retain it under
   `units/`, with the bench journal path and thread id in a header comment. Retained reports
   written before this session's fix of `retention-rewrite.mjs` cite their journal as
   `units/<unit>.jsonl`; read that as the swept launch path `TMP/codex/<unit>.jsonl`, and rely on
   the thread id for provenance.
5. Evidence for read-only lanes: `units/render-<unit>.sh` renders the diff and status into
   `TMP/audit/`; retain both. Claims: `TMP/audit/<unit>-audit-claims[-n].md`, the one authority
   for claim numbers, retained beside the verdict.
6. Lanes, launched together and blind to each other: the Opus reviewer and the Astra analyst
   hold opposite lanes, swapped so the writer's engine does not hold the objective lane (after
   an Astra unit: Opus objective, Astra subjective; after an Opus unit: reversed); a checker
   rules the `[mechanical]` claims; a verifier runs the gate brief. The Workflow script names
   `agentType` and `model` per node.
7. Verdict `<unit>-audit-verdict.md`: one table per round with a column per lane, findings,
   carried bounds, one terminal line per round; a fix round is a delta brief
   `<unit>-brief-<n>.md` on the writer's engine, audited by the engine that did not write it.
8. Land with `TMP/units/<unit>-land.sh` (refuses any changed file outside ALLOWED; commits by
   pathspec with `-c core.hooksPath=/dev/null -F <message>`; pushes). Retain the log, add the
   plan entry, update memory, `node units/retention-rewrite.mjs`, commit scaffold by pathspec,
   push.

## Instruments (retained under `units/`)

| File | Use |
| --- | --- |
| `retention-rewrite.mjs` | run from the scaffold root before every commit; rewrites `tmp/` paths inside retained copies to their retained names (journals and `.err` streams keep their launch paths), so a retained launcher points at `units/`: derive a new launcher from the `TMP/codex/` copy, never from the retained one; this handoff is excluded |
| `dump-lanes.mjs` | `node units/dump-lanes.mjs <runId> <prefix> [journalPath]`; finds the Workflow journal under any session folder of this project and writes `units/lane-<prefix>-<role>.md` per lane from the agents' role files |
| `render-cl3.sh`, `render-cl2.sh` | render a unit's audit evidence into `TMP/audit/`; `render-cl3.sh [suffix]` diffs over `9f5ffda` |
| `cl3-audit-wf.js` (and the `cl1-`, `cl2-` scripts) | the Workflow scripts of the audit rounds, reading the `TMP/units/` briefs; a `-2` script names the `-2` briefs |
| `cl3-land.sh`, `cl2-land.sh`, `cl1-land.sh` | landing scripts with their allowlists (retained copies; the runnable ones are under `TMP/units/`) |
| `cl3-2.sh`, `cl3-2-watch.sh`, `cl3-audit-analyst.sh`, `cl3-audit-analyst-watch.sh` | the bench launchers (paths rewritten in the retained copies; the runnable copies are under `TMP/codex/`) |
| `u7f-harness-3.mjs`, `u7f-recapture.sh` | the Elements capture harness and the recapture that runs last before assembling a portfolio |
| `handoff-check-wf.js`, `handoff-check-verifier.md`, `handoff-check-critic.md` | the lanes that verified this file; re-run the Workflow after editing it |

## Bounds carried and open questions

Carried bounds, each with its carrier: CL4b took the horizontal rule's `border: 0` pin and the
content section's name control and is landed; CL5 takes the markup half of that control, which
CL4b's brief scoped out (`cl4b-audit-verdict.md` reviewer 7), the stripe light-scope assertion
(`cl2-audit-verdict.md` round 2), the heading letter-spacing row and the shell's document-global
`main` id (`cl3-audit-verdict.md` round 2), the description-list case field's name and the
mode-invariant token case's duplicate registration (`cl3b-audit-verdict.md`); CL6 takes the link
map's retune and the anchor's `--vn-link-*` versus `--bs-*` binding (`cl3-audit-verdict.md`
round 1); CL11 takes `visitBreakpoint`'s bare `finally` restore, the hold's two uncased refusals
(`cl1-audit-verdict.md` round 2), the U7c `resolveButton` prefix rename, and `driveOracle` root
scoping; CL12 takes every guide bound a unit reported, including the sentence that still
promises component surfaces will consume `--vn-surface-raised` now that it carries the code
block's reading; the first unit that lands a component surface reading that token measures its
own value rather than assuming this one; the Test 0.0.19 release (user-directed, OTP) takes the
`captureFrame` element bounds and the forced-colours `MediaOptions` axis.

Open questions for the user, to report at the family's acceptance, grouped by the decision each
one asks for. Report them in these groups rather than as one list: the groups are what makes the
report answerable.

**Rendered appearance the user may want to overrule.** Each is a value the package ships that a
reading justifies and a person might still reject.

- The outline pair's ghost on its own canvas.
- Dark primary's white text below the 4.5:1 contrast floor, shared with Elements.
- The latched `.active` equalling the `:active` mix, and dimmed against active cyan in dark.
- The repaired control sitting near Outline secondary.
- The fixed heading scale: Veneer's headings are smaller than Bootstrap's at every level but the
  sixth, and CL5's class twins follow the tag rather than Bootstrap's fluid sizes.
- The mark highlight following the system colours Elements measured rather than Bootstrap's
  highlight properties, so retuning those Bootstrap properties moves nothing (CL5c's ruling).
- The link colours moving to the values the record measured, so a consumer who matched the
  current link colour sees it change (CL6's ruling).
- The link-styled button's colour moving with them, because it reads the link tokens directly.
  That is a visible change to a component of the closed Button family. The foundation calibration
  record carries no link rows, so those values were derived rather than measured, which is why
  following the retune is ruled correct rather than a regression (CL6's ruling, from the scope
  read).

**Accepted differences from Bootstrap.** Each ships knowingly and needs no decision unless the
user disagrees.

- The grid judged against the pinned Bootstrap page rather than an Elements specimen.
- The build dropping vendor prefixes it judges redundant for its targets.
- The `::-moz-focus-inner` exclusion, so no Gecko inner-focus repair ships.
- The two deferral grammars.
- The container key's navigation combinators shipping while the navigation family stays deferred,
  so those rules reference a class this cascade never defines (CL7's ruling).

- The older highlight token pair now has no consumer under `src/styles/`, because the mark class
  was their only reader through the Bootstrap aliases. A consumer retuning that pair sees nothing
  move. Whether it stays as a Bootstrap-compatibility alias with no Veneer consumer or is removed
  is a decision, not a defect (CL5c's audit, subjective 13).

**Decisions that are the user's alone.**

- The registry's later majors: `@vitest/browser-playwright`, `typescript`, `vitest`.
- The `pool: 'forks'` pin in scaffold's vendored `vite.config.ts`.

**Cross-package.**

- The forced-colours axis, which is Test-side.

## Gotchas that cost time last session

- A user message typed while a Workflow runs is relayed into its live subagents as a
  superseding instruction; the lanes answer it instead of their briefs and return no verdict.
  Send nothing into the session while lanes run, and treat a lane that answered something
  other than its brief as not run.
- The `src:styles` project loads the built cascade: rebuild with `npm run build:src:styles`
  after any `.scss` edit before a styles proof is read, or a plant reports green against the
  stale build.
- A heredoc with quotes in Bash on this host fails the shell or the approval classifier; write
  files with the Write tool and run scripts from files.
- `retention-rewrite.mjs` rewrites every `tmp/` path inside a retained copy, including a watch
  script's journal path and prose that names the launch folder; derive runnable scripts from
  the launch copies, and keep any file that must name the launch folder out of its reach.
- A bench lane's `-last.md` is the report; its thread id is in the journal's first line.
- The conformance presence scan reads only the guide's Compatibility rows, so bare-tag
  selectors are not scanned until CL4 adds the `reboot` row.
- `RETAINED_COLOR_ALIASES` in `tests/setupStyles.ts` does not pin `--bs-code-color`; the
  presence name lists do.

- Never put backticks inside a program you pass to `node -e` or any other shell argument: Git Bash
  runs them as command substitution before the program is parsed, and the text that reaches the
  program is silently stripped. Write the program to a file and run the file, and pass any text
  it inserts as a file path rather than as a literal. `units/splice-handoff.mjs` does that
  for this file.

## Memory

The auto-memory index `C:/Users/mikes/.claude/projects/C--Users-mikes-WebstormProjects-scaffold/memory/MEMORY.md`
points at `veneer-campaign-state.md` (the campaign state), `codex-bench-dark.md` (routing),
`codex-exec-sandbox-facts.md`, `desktop-harness-facts.md`, `brief-scope-derivation.md`,
`implementation-over-prose.md`, and the other standing rulings. Update
`veneer-campaign-state.md` at every landing.
