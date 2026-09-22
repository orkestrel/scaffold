# Unit REALIGN-DESIGN — Realign the Veneer plan and foundation to the tenets

## Role and engine

Two lanes receive this identical brief, blind to each other:

- `planner` on Opus 5, a native Claude subagent (read-only: `Read`, `Grep`, `Glob`; no shell). Holds
  the **subjective** lane.
- `analyst` on GPT-6 Astra (`gpt-6-astra`, the user's routing ruling of 2026-09-22, superseding the
  transport's `gpt-5.6-sol` pin), reached through `codex exec --sandbox read-only` rooted at
  `/home/user/scaffold`. Holds the **objective** lane. The bench engine reads this brief inside its
  own CLI: perform the assignment directly and spawn nothing. Read-only commands (`grep`, `ls`,
  `node -e` that writes nothing, `git log`, `git diff`) are permitted; run no gate, no test project,
  and no build.

Each lane says which lane it held.

## Objective

Propose the realigned plan: the units, ordering, ownership, acceptance criteria, and exit criterion
that bring the Veneer campaign and the `@orkestrel/veneer` checkout into faithful conformance with
every tenet in `tenets.txt`, starting from the landed tree at Veneer `a04fb7c`, and name every
departure the current plan and tree carry.

## Context

**What this round decides.** Whether the campaign continues on the current plan or on a replacement,
which foundation defects are repaired before any further component family opens, and which
questions go to the user. The Orchestrator reconciles the two lanes into the plan the user rules on.

**Evidence.** All paths relative to `/home/user/scaffold/` unless absolute.

- The judging standard: `.orkestrel/veneer/tenets.txt` (read whole, first).
- The current plan's spine: `.orkestrel/veneer/plan.md` lines 1–130 (authority, standing
  conditions, product, exit criterion), 552–645 (closing rule, component queue, deferrals), and
  2154–2192 (the family-closing entry). The rest of that file is a re-baseline diary; do not read it
  whole. `.orkestrel/veneer/handoff.md` whole.
- Distilled evidence (Grok 4.7 distillates, evidence not rulings):
  `.orkestrel/veneer/units/g1-record-report.md` (the plan and folder against the tenets),
  `.orkestrel/veneer/units/g2-veneer-report.md` (the Veneer checkout),
  `.orkestrel/veneer/units/g3-references-report.md` (Elements and Mailbox as references).
- Measurements the Orchestrator took (see **Measurements**), each retained with its instrument:
  `.orkestrel/veneer/units/veneer-baseline.log.txt`, `veneer-baseline-2.log.txt`,
  `veneer-projects.log.txt`, `test-tip-vendor.md`, `event-target-probe.md`.
- The previous session's own measurements: `.orkestrel/veneer/units/value-accounting-finding.md`,
  `units/remaining-surface.md`, `units/capability-question-finding.md`, `cl13-verdict.md`
  § Findings.
- The Veneer checkout at `/home/user/veneer` (HEAD `a04fb7c`, clean): read `src/core/types.ts`,
  `src/browser/types.ts`, the barrels, `src/browser/*.ts`, `src/styles/index.scss`,
  `src/styles/_tokens.scss` (its head and structure), `tests/setupStyles.ts`,
  `tests/setupBrowser.ts`, `tests/setupConformance.ts`, `guides/veneer.md` § Compatibility and
  § Deferred selectors, `package.json`, `vite.config.ts`.
- The reference checkouts at `/home/user/elements` and `/home/user/mailbox` through the G3
  distillate; open a cited file only to check a citation.
- The `orkestrel/test` tip at `/home/user/orkestrel/test` (`00e2b87`), read-only clone.

**Law.** `AGENTS.md`; `.claude/rules/names.md`, `typescript.md`, `architecture.md`, `patterns.md`,
`tests.md`, `workspace.md`, `browser.md`, `styles.md`, `documentation.md`, `quality.md`,
`writing.md`, `portability.md`; `.agents/orchestration.md` § Execution loop (design step) and
§ Re-baselining is not rescoping; skills `orkestrel-harden-package`, `orkestrel-prove-journey`
(§ SKILL.md and `references/layer.md`), `orkestrel-falsify`, `orkestrel-polish-surface`,
`enterprise-bootstrap`, and `orkestrel-debrief/references/retention.md`; guide
`/home/user/veneer/guides/veneer.md`; `guides/test.md` § Surface in the scaffold checkout for the
installed `@orkestrel/test` surface.

**Installed primitives.** `@orkestrel/test` `0.0.18` on the registry; the tip `00e2b87` adds
`stageMedia`, `releaseMedia`, `holdAccessible`, `hoverAccessible`, `releasePointer`, `sendProtocol`,
`POINTER_HOLD`, `MEDIA_STAGE` (`/home/user/orkestrel/test/src/browser/helpers.ts`, `constants.ts`).
`@orkestrel/contract` `0.0.17` (`guides/contract.md`). `@orkestrel/scaffold` `0.0.76`. Veneer
declares no runtime `dependencies` (`/home/user/veneer/package.json`).

**Host.** Linux container, bash. Node `v22.22.2`, npm `10.9.7` on the host while Veneer's manifest
pins `devEngines.packageManager` npm `>=11.6.0` (installs run through an npm 11 in the
Orchestrator's scratchpad). Playwright `1.63.0` expects `chromium-1243` (Chrome for Testing 153);
the host carries `chromium-1194` (Chromium `141.0.7390.37`) and downloads are disabled, so every
browser receipt here is Chromium 141. Codex execs deny network. The Cursor agent's shell is
allowlisted to `ls` only.

**Measurements.** Taken 2026-09-22 by the Orchestrator on this host.

- Veneer `a04fb7c` from its lockfile alone: `format:check` 0, `lint:check` 0, `check` 2, `build` 0,
  `test` 1 — `check` and the browser suites fail because `tests/**` import Test helpers the locked
  `0.0.18` does not export (`units/veneer-baseline.log.txt`).
- With the Test tip tarball installed `--no-save` (`units/test-tip-vendor.md`): `check` 0, `build` 0,
  `test` 1 — two `src:browser` cases fail on `event.target` read after dispatch on a detached host,
  which this Chromium nulls (`units/event-target-probe.md`); every other project's reading is in
  `units/veneer-projects.log.txt`.
- The `orkestrel/test` tip's lockfile does not satisfy its manifest (`@types/node` `26.6.1` against
  `26.6.2`): `npm ci` refuses it (`units/test-tip-vendor.log.txt`).
- Registry: `@orkestrel/test` latest `0.0.18` (2026-09-17T23:50Z).
- Campaign folder: 41 MB, 2490 tracked files (160 at the top, 1686 under `units/`, 24 under
  `research/`), unpruned; `plan.md` is 2190 lines of which the executable plan is about 640 and the
  rest a diary.
- Both reference repositories declare `@vue/reactivity` as a runtime dependency
  (`/home/user/elements/package.json`, `/home/user/mailbox/package.json`).

**Control identifiers.** None; this round writes no test.

**Standing conditions.** The Veneer tree is clean. The scaffold tree carries untracked retained
records under `.orkestrel/veneer/units/` (this round's inputs). Two zero-byte tracked files `This`
and `TypeScript` sit at the scaffold root (redirect debris). `git status` inside a Codex exec reads
normally; the exec cannot write `.git`.

**Standing rulings from the user (binding, from `handoff.md` § Standing rulings and the current
session):** Codex lanes on `gpt-6-astra`, never Sol; Cursor lanes on Grok 4.7; Opus lanes native.
One guide, `guides/veneer.md`; surfaces core, browser, styles, with Vue deferred; no invented
surfaces or rule amendments; Veneer pilots the styles environment by hand; no RTL work; Orkestrel
packages may be runtime dependencies, any other dependency is the user's call; publishing is
OTP-only; every selector a key carries ends shipped, excluded with a recorded reason, or recorded as
a departure, in the machine-checkable form; implementation over prose; nothing in `src/` or
`tests/` is sacred — this is greenfield and the foundation is being established.

## Questions the design must answer

Rule on each, with evidence. Where a question is the user's, say so and give the options with cost
and a recommendation.

1. **Plan shape.** Does the campaign continue on `plan.md` or on a replacement written to the
   tenets' efficiency constraint (direct, concise, actionable, useful to another model)? What does
   the replacement carry, and what moves to git history through the retention prune?
2. **Foundation self-containment.** Veneer cannot install and pass its gates from its lockfile
   because its proofs need an unpublished Test tip. Which unit closes that (Test `0.0.19` release
   with its lockfile repaired, then a Veneer re-pin), and what does Veneer do until it lands?
3. **Host-dependent assertions.** The two `src:browser` failures and any sibling assertion that
   reads a host-varying property after the fact. What rule closes the class, not the two cases?
4. **The selector grammar in `tests/setupStyles.ts`.** A hand-written CSS selector reader against
   `AGENTS.md` ("Do not add a second parser … to duplicate … CSS") and the tenet on ASTs. Does it
   stay, move to the CSSOM the browser already parses, or move to `postcss` (declared)? What does
   each option cost the accounting proofs that depend on it?
5. **Value accounting.** The accounting runs one way and compares no declaration values
   (`units/value-accounting-finding.md`). The user's ruling requires every change to be noticed.
   Is the reconciliation unit the first cross-cutting unit before any family opens, and what is
   its machine-checkable shape (departure table keyed by selector and property, extra-name
   refusal)?
6. **The compatibility ledger's home.** `research/ledger.md` records every row other than Button
   as `open` after 31 keys shipped. Which artifact is the definition of done — the prose ledger,
   the guide's Compatibility and Deferred tables, `research/inventory.json` plus the gates — and
   how does the plan keep exactly one?
7. **Elements as the reference.** The grid was judged against Bootstrap's page rather than an
   Elements specimen, and the rendered-appearance questions in `handoff.md` § Open questions await
   the user. What does the plan owe Elements for layout, and what evidence closes each open
   appearance question?
8. **Vue.** The tenet requires a Vue adapter over the engine "without making Vue a Veneer runtime
   dependency" and forbids hiding a forbidden runtime "behind a peer dependency"; the plan's
   deferred design declares `vue` as an optional peer. Which delivery satisfies the tenet's letter:
   an adapter that takes the consumer's reactivity primitives by injection and imports nothing, a
   `./vue` entry treating `vue` as an undeclared external, or a separate package? Give cost and a
   recommendation; the choice is the user's.
9. **Tailwind.** The tenet requires proven supported combinations in the browser. Where does the
   Tailwind unit sit now that Button and the Content/layout family are landed?
10. **Semantic tags and class control.** From the G2 distillate's selector evidence: does any
    shipped selector infer a component from tag position, and does class override work at equal
    or lower specificity through layers against an unlayered consumer rule (`plan.md` re-baseline
    after CL8b names a utility that still wins)?
11. **The engine's shape for the remaining families.** The shipped engine is `Button`, `ColorMode`,
    and `Delegate`. From the G3 distillate: which Mailbox and Elements mechanisms (initialisation,
    lifecycle, events, focus, motion coordination, native platform use) does the plan adopt for
    Collapse, Dropdown, Modal, Offcanvas, Tooltip, Popover, Toast, Carousel, and the passive
    families, and which does it refuse, with the reason?
12. **Process cost.** The Button family and the Content/layout family consumed the retained record's
    1686 unit files for 31 keys and one engine class. Which protocol per family and per unit
    (design round, writer, audit lanes, fix rounds, landing) meets `.agents/orchestration.md` and
    `.claude/rules/quality.md` § Rounds and verdicts at the least cost, and where does the current
    protocol spend rounds the rules do not require?
13. **Carriers.** Every open question and carried bound in the G1 distillate § D with
    `no carrier named`: name the unit that carries each, or propose the drop with its reason.
14. **Exit criterion.** Restate the campaign's exit criterion against the tenets so it is
    enumerated and closable, per `.agents/orchestration.md` § Execution loop (design step).

## Unknowns

- Whether the user will publish Test `0.0.19` before the next Veneer unit; report as a plan
  dependency with both branches.
- Whether Elements specimens exist for layout and grid; the G3 distillate reports what it found —
  cite it and name the gap where none exists.
- The user's answers to the rendered-appearance questions; propose the evidence that would settle
  each rather than an answer.

## Scope

Read-only. No owned files. Every proposal returns as the lane's final message.

## Execution

A native subagent, or a bench engine reading this brief inside its own CLI: perform the assignment
directly and spawn nothing.

## Output

The `planner` role's return shape, in this order and nothing else: `Design`, `Alternatives`,
`Constraints`, `Refusals`, `Measurements`, `Units`, `Tensions`, `Risks`. The subjective lane fills
`Design` and `Alternatives`; the objective lane fills `Constraints`, `Refusals`, and
`Measurements`; each lane fills `Units`, `Tensions`, and `Risks`; leave a section the lane does not
own empty rather than renaming it. Inside `Units`, one row per unit: name, role and engine
(`sol` on Astra, `opus` on Opus 5, `builder` on Sonnet, or a user action), checkout, owned files,
dependencies, and acceptance criteria that close on owned files. Answer the fourteen questions
inside those sections, numbered as here. Cite `file:line` for every constraint and every
measurement. No process diary. Keep the answer under 400 lines.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — when a file this brief names does not resolve or a measurement here contradicts a
file you read. Decide, record, and carry on from where a section sits and how a unit is named.

## Acceptance criteria

1. Every one of the fourteen questions is answered inside the return shape, or named as the
   user's with options, cost, and a recommendation.
2. Every unit row names its role and engine, its checkout, its owned files, and acceptance
   criteria that close on owned files.
3. Every open question and bound in the G1 distillate § D ends with a named carrier or a proposed
   drop with a reason.

## Review evidence

This subject is a policy, design, and process proposal: the proposal is this brief and the plan
spine it names, the canon is `tenets.txt` and the law, and the record of what motivated it is the
G1 distillate and the Orchestrator's measurements named under **Measurements**.
