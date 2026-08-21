# Unit S-docs: scaffold's documentation obligations and the ROADMAP rewrite

## Role and engine

Role `implementer`, engine **Opus 5**, native subagent, sole writer in
`C:/Users/mikes/WebstormProjects/scaffold`. You perform the assignment directly and spawn
nothing.

## Objective

Land every scaffold-side documentation obligation the rulings rounds produced, and bring
`ROADMAP.md` to the reconciled dispositions so it carries only what remains open.

## Context

Authority: `AGENTS.md` (§ Writing — never state a count; delete counts your edits touch),
`.claude/rules/writing.md`, `.claude/rules/documentation.md` (you also edit it — follow its own
idiom). The authoritative disposition record you implement:
`.orkestrel/campaign/design3-reconciliation.md` (read in full) plus the landed-unit facts
below. Where this brief and that file disagree on a row's wording, THIS BRIEF wins and you
record the disagreement.

Landed facts (each closes a row): the toolbox shaper proofs landed (117 passing including the
two new describes); the program validate-path guards landed with a failing-first pair; the
agent `Channel` comment and `@example` landed; the qualifier `Premise` prose and
described-mode proofs landed; the w3 re-proof ran green-red-green on this host with both reds
naming the removed file; the prepack compiler emit, rule row, and scaffold manifest key landed;
`prepack` sits in every fleet manifest except contract, program, probe, and test (writers
live), which take it when free.

## The edits

### 1. `guides/scaffold.md`

- Trim the two passages the 0.0.45 round recorded discretionary: the Finding-shape rationale
  essay (`:810-818`, beginning "The shape a `Finding` admits is wider…") and the
  creating-verb policy note (`:1098-1105`, beginning "**The library does not enforce the
  creating verb's policy.**"). Keep any single load-bearing rule sentence a trimmed passage
  carried; delete the argumentation. Surrounding sections stay.
- Add the blueprint `file:`-range note where dependency ranges are documented: a dependency
  range is structurally admitted at parse (`isDependency` accepts any bounded string) and
  refused at the question gate — `dependenciesToQuestions` tests each range against the
  field's pattern (`ORKESTREL_RANGE_PATTERN`, the floor and extra patterns), none of which
  admit a `file:` specifier, so `audit` refuses
  `@orkestrel/form declares the range file:vendor/….tgz, which dependencies does not accept.`
  State it as the mechanism (admitted shape, refusing gate, the message a consumer meets);
  the consumer-side text already in `guides/terminal.md:60-78` is your reference for the
  refusal's exact voice.
- In the vendored-set section: state that `.claude/settings.json` is content-owned and
  restored by `repair`, and that an operator grant belongs in `.claude/settings.local.json`,
  which is not vendored. Name both paths in backticks.

### 2. `.claude/rules/documentation.md`

In § Workflow skills, directly after the clause fixing the `agents/openai.yaml` key set, add
one sentence: a consumer needing a key outside `display_name`, `short_description`, and
`default_prompt` is what reopens the external schema's research, and no key is added before
then.

### 3. `ROADMAP.md`

Apply the dispositions. Struck entirely (each closed by a ruling or a landed unit): the
Prepack decision row in § 1; the interned-class canon row; the toolbox shapers row; the
qualifier `Premise` row; the object-type ban row; the settings-vendoring row; the
order-gating row; the `agents/openai.yaml` row; the w3 row; the program validate-path row.
Section 1 (User decisions, open) becomes empty — remove the section rather than leaving a
heading over nothing.

Added to § 2:

> - **fleet**: declare `"prepack": "npm run build"` in every publishing manifest.
>   `blueprintToScripts` emits it at birth; manifests are birth-owned, so existing targets take
>   it by direct edit — landed everywhere except contract, program, probe, and test, which
>   take the line at their next free moment. The vendored `tests/config.test.ts` assertion
>   that reddens a publishing target lacking it lands in the release wave's first round.

Replaced (keep, new wording — verbatim from `design3-reconciliation.md`): the mirror row
(§ 3, the S5 merged wording); the sweeps row (S10 wording — model-routing/version-catalog half
stays review-owned; the template-TODO and strict-inventory sweeps are scheduled as units and
the row says so); the setTimeout row (S11 two-part wording); the mcp `createTeardown` row (S12
wording, kept until its in-flight unit lands).

Unchanged rows stay byte-identical: the test `waitForCondition` row (its unit is in flight),
the test guide-population row, the probe rows, the probe `stop()` row, the sea row, the
contract row (its unit is in flight), the process rows, the mcp guide/parity rows if any, the
scaffold policy row (nested-function plugin rule — still open), the fleet skill/bridge sweep
row, and the scaffold-guide rows THIS unit closes (strike the two trim rows and the
blueprint-note row as you land their edits).

Preserve the file's list idiom and formatting; run the formatter after editing.

## Scope

- Owned: `guides/scaffold.md`, `ROADMAP.md`, `.claude/rules/documentation.md`.
- Off-limits: everything else.
- Standing entries, all expected, none yours: ` M .claude/rules/workspace.md`,
  ` M package-lock.json`, ` M package.json`, ` M src/core/compilers.ts`,
  ` M tests/setupServer.ts`, ` M tests/src/core/compilers.test.ts`,
  ` M tests/src/core/fixtures/setup-false-manifest.txt`,
  ` M tests/src/server/WriteTransaction.test.ts`, `?? .orkestrel/`. `ROADMAP.md` is ALSO
  already modified (an earlier session's cleanup) — your edits land on top of its current
  working-tree content, not on HEAD.
- No commits, installs, or git checkout/restore/stash/reset/clean. Use `npx.cmd`.

## Acceptance criteria, in this order

1. `git status --porcelain` shows the standing entries plus (only) your two newly-modified
   files beyond the already-modified `ROADMAP.md`.
2. `npx.cmd oxfmt --config .oxfmtrc.json --check guides/scaffold.md ROADMAP.md .claude/rules/documentation.md`
   exits 0.
3. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project guides`
   exits 0 (guide parity holds after the trims and the note).
4. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project policy`
   exits 0 (the documentation.md edit obeys the skill/rule policy sweeps).
5. Report: every ROADMAP row's disposition as a table (row → struck / reworded / added /
   unchanged), the trimmed spans' surviving sentences if any, and every count you deleted.

## Output

The diff; raw output and exit code per criterion; the criterion 5 report. No process diary.

## Deviation contract

Stop if a strike's target row is absent or materially different from the reconciliation's
description (the plan of record moved under you), or if guide parity reds outside your edits.
Wording within the fixed dispositions, placement of the blueprint note, and which single
sentences survive the trims are yours: decide, record, carry on.
