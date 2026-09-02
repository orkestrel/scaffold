# Unit U2b bootstrap-voice — report

Done. All three files rewrite into directive voice, the narration sweep reads zero on each, no file
grew, and both gates are green. No deviation.

## Narration sweep

Pattern, run under Git Bash on each file separately:

```
grep -nE "^(This|These|The following|Here|We |Let|In this|As you)|this file|this reference|each one states|stands, and" <file>
```

Paths swept: `.agents/skills/enterprise-bootstrap/SKILL.md`,
`.agents/skills/enterprise-bootstrap/references/inputs.md`,
`.agents/skills/enterprise-bootstrap/references/inspection.md`.

### Before (at `HEAD` = 718deef)

```
=== .agents/skills/enterprise-bootstrap/SKILL.md ===
36:| Operate        | `SKILL.md` (this file)                                      | Process, decision rules, checklist                                                |
185:This is rung 4 of the styling ladder, so it is the developer's decision. Propose it, name what it
191:One exception stands, and a measurement rather than a judgment opens it: take an authored rule
=== .agents/skills/enterprise-bootstrap/references/inputs.md ===
57:  production. That section owns labels, validation timing, and the error summary; this file owns
482:These categories have no shipped component, so each one is a build-or-buy decision before it is a
=== .agents/skills/enterprise-bootstrap/references/inspection.md ===
3:These instruments settle what a capture cannot. Each one states a property of the surface, the
11:These rules bind every entry here.
142:exception stands, and a measurement rather than a judgment opens it. Write an authored rule without
145:- an instrument in this file reports the vendor cascade failing a stated bar — the focus ring under
```

### After

```
.agents/skills/enterprise-bootstrap/SKILL.md: 0
.agents/skills/enterprise-bootstrap/references/inputs.md: 0
.agents/skills/enterprise-bootstrap/references/inspection.md: 0
```

### Every before-hit, accounted for

| File           | Line | Hit                                          | Disposition                                                                                                                                  |
| -------------- | ---- | -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| SKILL.md       | 36   | `` `SKILL.md` (this file) `` in Layer table  | Self-reference cut. Row, column, and cell contents otherwise unchanged.                                                                       |
| SKILL.md       | 185  | `This is rung 4 of the styling ladder…`      | Rewritten as `Treat custom CSS as rung 4 and the developer's decision: propose it, name what it buys, and never take it unprompted.`          |
| SKILL.md       | 191  | `One exception stands, and a measurement…`   | Opener cut; the exception's four conditions now open the sentence as a directive (`Take an authored rule without asking only where…`).        |
| inputs.md      | 57   | `…this file owns which affordance carries…`  | Rewritten as `Take labels, validation timing, and the error summary from that section, and the affordance that carries them from The catalog.` |
| inputs.md      | 482  | `These categories have no shipped component…` | Section now opens `Work the native-first ladder…`; the build-or-buy rule survives as `Settle each row as a build-or-buy decision…`.           |
| inspection.md  | 3    | `These instruments settle what a capture…`   | Opener now `Reach for an instrument here where a capture cannot settle the claim. Run every one with its control…`.                           |
| inspection.md  | 11   | `These rules bind every entry here.`         | Rewritten as `Take each entry's property, population, reading, control, and coverage as written, and hold every entry to these rules.`        |
| inspection.md  | 142  | `exception stands, and a measurement…`       | Opener cut; section opens `Leave rung 4 to the developer… Write an authored rule without asking only when every one of these holds:`.         |
| inspection.md  | 145  | `an instrument in this file reports…`        | `in this file` → `here`. Condition otherwise verbatim.                                                                                        |

## Line counts

| File          | Before | After | Delta |
| ------------- | ------ | ----- | ----- |
| SKILL.md      | 252    | 249   | −3    |
| inputs.md     | 501    | 501   | 0     |
| inspection.md | 152    | 149   | −3    |

## Markup, controls, and coverage preserved

Counted at `HEAD` and after, per file, with `git show HEAD:<path> | grep -c …` against `grep -c …`:

| File          | Fences (`^```) | `^- **Control.**` | `^- **Coverage.**` |
| ------------- | -------------- | ----------------- | ------------------ |
| SKILL.md      | 2 → 2          | 0 → 0             | 0 → 0              |
| inputs.md     | 40 → 40        | 0 → 0             | 0 → 0              |
| inspection.md | 0 → 0          | 7 → 7             | 7 → 7              |

Every fence body is byte-identical to `HEAD`; the diff touches no line inside a fence, including the
`Production checklist` fence in `SKILL.md` and its `control failed` row. Every backticked class name
and attribute is carried through unchanged.

## Gates

`npm run format:check`:

```
npm notice run @orkestrel/scaffold@0.0.59 format:check
npm notice run oxfmt --config .oxfmtrc.json --check .
Checking formatting...

All matched files use the correct format.
Finished in 3594ms on 215 files using 16 threads.
```

`npm run test:policy`:

```
npm notice run @orkestrel/scaffold@0.0.59 test:policy
npm notice run vitest run --config vite.config.ts --no-cache --reporter=dot --project policy

 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/scaffold

···············································································································

 Test Files  1 passed (1)
      Tests  111 passed (111)
   Start at  15:43:25
   Duration  2.02s (transform 254ms, setup 310ms, import 316ms, tests 1.23s, environment 0ms)
```

## Review evidence

`git diff --stat`:

```
 .agents/skills/enterprise-bootstrap/SKILL.md       | 151 ++++++++++-----------
 .../enterprise-bootstrap/references/inputs.md      |  78 +++++------
 .../enterprise-bootstrap/references/inspection.md  |  85 ++++++------
 .orkestrel/scaffold/plan.md                        |   8 +-
 4 files changed, 161 insertions(+), 161 deletions(-)
```

`git status --porcelain`:

```
 M .agents/skills/enterprise-bootstrap/SKILL.md
 M .agents/skills/enterprise-bootstrap/references/inputs.md
 M .agents/skills/enterprise-bootstrap/references/inspection.md
 M .orkestrel/scaffold/plan.md
?? .orkestrel/scaffold/bootstrap-voice-brief.md
?? .orkestrel/scaffold/ecosystem-reuse-brief.md
?? .orkestrel/scaffold/ecosystem-reuse-report.md
?? .orkestrel/scaffold/ecosystem-reuse-ruling.md
?? .orkestrel/scaffold/form-crosswalk-brief.md
?? .orkestrel/scaffold/test-additions-successor-brief.md
```

The `.orkestrel/scaffold/` entries are not this unit's. `plan.md` was clean at the unit's start and
the five other untracked files appeared during the run; the unit wrote nothing under `.orkestrel/`
and nothing to `host.json`.

## Rules judged at risk of loss, and how each was kept

- **The exception that lets an authored rule land without asking.** Both openers that carried it
  matched the sweep. The four conditions — an instrument reporting the vendor cascade under a stated
  bar, the rule citing that reading, the rule restoring the bar and doing nothing else, the rule
  written over tokens — are carried verbatim in `inspection.md` → When an authored rule is already
  earned, and `SKILL.md` still restates them and still points at that section for the whole
  condition. `Anything wider is still a proposal` survives as `Treat anything wider as a proposal`.
- **The `SKILL.md` ↔ `inspection.md` cross-reference pair.** Each file still names the other's
  section by title.
- **Every instrument's Control and Coverage sentence.** Kept whole; the only change is that a
  Coverage row now opens `The instrument …` instead of a bare `It`, so the pronoun in the second
  sentence has a named antecedent.
- **`style escapes covers those`** in Token discipline's Coverage. Kept, and upgraded to the working
  in-file link `[Style escapes](#style-escapes)`.
- **The forbidden rung-4 list and its consequence sentence.** `a style="…" attribute`, `a <style>
  block`, and `a new stylesheet rule for something a utility already does` are unchanged, and the
  sentence naming what each escape costs is kept.
- **The locked-select rule.** Reordered to lead with the instruction; both halves kept — `disabled`
  stops the value submitting, and a hidden input beside it carries the value.
- **`Its cross-category rules … are laws, not suggestions`** in `SKILL.md` → Forms. The force is now
  carried by the verb: `obey its cross-category rules — read-only chrome, the locked select, the
  chosen filter's variant, the non-drag path for a file drop`. All four named rules survive.
- **The state-set definitions in `inputs.md`.** Left as the fixed labelled set they are; only
  `required` was reworded to an imperative, because it alone stated a requirement without naming an
  action.
- **Every `X: [reference]` pointer.** Converted to `Take X from [reference]` rather than dropped, so
  no destination lost its inbound link. `references/` file coverage from `SKILL.md` is unchanged, so
  the skill-family policy check still resolves every reference.

## What was cut, deliberately

- **`inspection.md`, Declared class combinations:** the sentence `An instrument that flags the best
  existing answer gets switched off, and then nothing is checked.` It persuades rather than turning a
  decision — the rule it follows (`Never substitute a cancellation heuristic`) is absolute, and the
  legitimate case it must not refuse is named in the preceding clause. The rule and its named
  counter-example both stand.
- **`SKILL.md`, Layer table:** the `(this file)` self-reference.
- Narrating openers in all three files, per the preceding hit table.

Nothing else was removed. No rule, control, coverage sentence, fence, class name, or cross-reference
was dropped.

## Substitutions applied beyond the sweep

Swept case-insensitively across all three files for `should`, `simply`, `easy`, `easier`, `just`,
`currently`, `utilize`, `leverage`, `via`, `in order to`, `e.g.`, `i.e.`, `etc.`, `performant`,
`robust`, `allows you to`, `and/or`, `please`, `dummy`, `blacklist`, `whitelist`, `above`, `below`,
`we `, `our `, `let's`, `may`, `once`, `new`, `latest`. All hits are cleared or ruled permitted:

- `may` → `can`: `a marketing page may open` and `A class with no rule of its own may still inherit
  one` in `SKILL.md`.
- `above` / `below` cleared: `the styling ladder below` → `that follows`; `the one above` → `the
  preceding one`; `matching the description above` → `matching the frontmatter description`.
- `once` (temporal) → `when`: `show a direction only once it satisfies the brief`.
- Permitted hits kept, each a frequency or a value rather than a banned sense: `once per theme`
  (`SKILL.md`), `declared once by name` and `read the resolved value once per mode`
  (`inspection.md`), `declared once by name` (`inputs.md`), and `a new stylesheet rule for something
  a utility already does` (`SKILL.md`), where `new` names a rule that did not exist rather than
  dating one.

## Claims I could not close

- **`captures at both viewports and both themes`** in `SKILL.md` → Rendered proof, and the matching
  checklist row. `AGENTS.md` § Writing keeps `both` where the sentence names the members, and this
  sentence names neither the viewports nor the themes. I kept the wording: every rewrite I could
  find either narrows the requirement (`at the viewports you claim`) or broadens it (`at each
  viewport`), and the deviation contract stops me from changing a rule's meaning. Flagging it for
  the Orchestrator rather than deciding it.
- **Voice below the sweep's reach.** The sweep proves the named narration patterns are gone; it
  cannot prove every remaining line reads as a directive. I read all three files end to end and
  converted every declarative opener I judged to be describing the file or the section rather than
  instructing the reader, but that judgment is mine and is not mechanically checked.
