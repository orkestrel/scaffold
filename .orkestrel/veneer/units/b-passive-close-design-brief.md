# Design brief — B-PASSIVE-CLOSE (the passive family's closing unit)

## Role and engine

Two lanes on one brief, blind to each other: `planner` on Opus 5.5 (native subagent, clean context,
read-only) holds the **subjective** lane (shape, naming, the feel of the prose and the tables a
reader meets, the consolidation's ergonomics); `analyst` on GPT-6 Astra (`codex exec --sandbox
read-only` rooted at `/home/user/veneer`) holds the **objective** lane (correctness, constraints,
what the code, the gates, and the registry permit). Each lane performs the design directly, spawns
nothing, edits nothing, and returns a proposal; the Orchestrator reconciles the two into the plan.

## Objective

A unit plan for B-PASSIVE-CLOSE: the units that close every `ROADMAP.md` § Carriers row whose
carrier cell opens with `B-PASSIVE-CLOSE ` (the family close; not `-A` or `-B`), plus the rows and
referrals listed under Obligations, each with its owned files, its order, its acceptance criteria,
the mutation each proof must distinguish, and its risks, and the rulings the Orchestrator must take
before dispatch.

## Context

**Terrain.** `/home/user/scaffold/.orkestrel/veneer/units/b-passive-close-terrain-report.md` (the
Cursor Grok distillate over the obligations at `a4654a8`, with `file:line` pointers; lines are
approximate and sites are named by symbol or heading). It wins over any restatement here; stop and
report where the tree disagrees with it.

**Obligations.** The `B-PASSIVE-CLOSE ` rows of `/home/user/veneer/ROADMAP.md` § Carriers: the
§ Showcase region paragraph (rewrite it once for the family); § Customization's retune claim
(bound it once for the family); the component-section barrel-neighbour sentences (rewrite each to
the barrel's Bootstrap order); the per-family driven-key lists (consolidate into one driven table
appended the way `CASCADE_KEYS` is, D20); the § Tests stem table (every registered stem once, or
derive the table from the registry under a parity check); the reduced-motion query literal (one
shared test constant every proof routes through); the guide-wide token-noun sweep (the whole guide
against `writing.md` § Code tokens, references, and links) plus the `FORM_CHECK_SPECIMENS` doc
block's bare `id` token. Carried referrals from the label family's audits: the `### Form select
classes` sentence "loads after the validation partial" (false under D35); the § Showcase paragraph
B-FORMS-LABEL-SHOW returned says regions "follow the Table region" while Pagination and Button
group sit between; the `form-floating.test.ts` components-layer case's `rule.selectorText.split(',')`
idiom where the sibling proofs use `splitTopLevelList`.

**Decisions.** `/home/user/scaffold/.orkestrel/veneer/units/decisions-round-2.md`: D20, D35;
`/home/user/scaffold/.orkestrel/veneer/b-passive-design-verdict.md` (the family design; family
ruling 10 on the driven-key lists) and `/home/user/scaffold/.orkestrel/veneer/units/b-passive-family.md`
and `b-passive-baseline.md` (the family records every B unit binds).

**Tree.** `/home/user/veneer` at the session branch tip (`7398772` or later; B-FORMS-LABEL-CASCADE
lands next and moves the forms sections of the guide into the release's order, splits the pooled
forms table, and adds the `form` key; treat the terrain's forms-section pointers as pre-landing).
The guide is `guides/veneer.md`.

**Law.** `/home/user/scaffold/AGENTS.md`;
`/home/user/scaffold/.claude/rules/{tests,browser,names,documentation,writing,architecture}.md`.
The dispatch anatomy in `/home/user/scaffold/.agents/orchestration.md` § Dispatch anatomy.

**Host facts for the units.** Linux; npm 11 on `PATH` through
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`;
Chromium installed; `npm run test:guides` runs the guide parity through `@orkestrel/guide`
(`tests/guides.test.ts`); `npm run test:setup` runs the registry proofs; the vendored
`tests/setupPolicy.ts` and `tests/policy.test.ts` are off-limits to every unit.

## Unknowns

- Whether the stem table is derived (a parity case in `tests/guides.test.ts` or the setup proofs
  asserting the guide's rows equal the registry's scenario stems, with the guide carrying the
  generated rows) or written once by hand (114 absent scenarios today, per the terrain): rule on
  the cost of each and on what keeps the table true at the next family's landing.
- The driven table's shape: one `DRIVEN_KEYS` table of `CaptureKey` rows with a named discriminant
  for the family it belongs to, or one flat frozen array in landing order with no family axis; how
  `CAPTURE_KEYS` and its assertion change; whether the per-family proofs pinning `LIST_GROUP_KEYS`
  and `FORM_CHECK_KEYS` subjects move onto the table.
- The shared reduced-motion constant's home and name (`tests/setupStyles.ts` exports it; every
  proof imports it) and whether the inline copies in the pagination, progress, spinner, and
  icon-link proofs join.
- The § Customization bound: one sentence naming the tiers that follow a `--vn-color-primary-base`
  retune and the rules that read a palette entry instead (the terrain's table), or a reference to
  the per-section sentences that already state it.
- The § Showcase paragraph's shape: one paragraph naming every region in the constructor's order,
  or a sentence stating the rule (the regions render in the order `Showcase` constructs them, pinned
  by the Showcase proof) with no enumeration to go stale.
- The token-noun sweep's bound: whole guide after B-FORMS-LABEL-CASCADE lands, sampled by the
  terrain's pattern; how a unit proves the sweep is complete (a probe pattern the checker reruns).
- Decomposition: which obligations are one guide-prose unit (one writer on the guide at a time),
  which are code units on the registry and the proofs, and what can run in parallel worktrees.

## Scope

Read-only. Read the terrain, the rows, the decisions, the family records, the guide, and the tree.
Edit nothing. Propose; do not decide for the Orchestrator.

## Execution

**A native subagent (planner):** perform the design directly and spawn nothing. **The bench engine
(analyst) reading this inside its own CLI:** perform the design directly and spawn nothing.

## Output

Return one proposal with these sections: `Units` (each with a name, role and engine route, owned
files, shared report-only files, off-limits files, order and dependencies, acceptance criteria
ordered cheap-first, the mutation each proof distinguishes, and the risks); `Rulings needed` (each
unknown, with the option, its cost, and a recommendation); `Files the result makes false` (per
unit, derived from the terrain's distillate); `Exit criterion` (the enumerated capabilities whose
closure ends B-PASSIVE-CLOSE); and, for the analyst, `Journal` (the journal path and session id).
No process diary.

## Deviation contract

§ Deviation protocol in `/home/user/scaffold/.agents/orchestration.md`. A lane that finds the
terrain and the tree disagreeing reports the disagreement and rules on the tree.

## Acceptance criteria

The proposal names every obligation's closure, every unit's owned files are disjoint from every
other unit's, and every proof named carries the mutation it distinguishes.
