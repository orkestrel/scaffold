# Unit R10 report — bound the enterprise-bootstrap trigger

## Outcome

The `enterprise-bootstrap` skill's `description` now names its trigger and its boundary against the
`orkestrel-polish-surface` skill. The canonical file and the Claude bridge carry the same bytes. The
`agents/openai.yaml` file's `short_description` is ruled unchanged, with the reason recorded here.

No deviation. Nothing outside the owned files was written. No git command changed state, and no
commit was made.

## Touched files

| File                                              | Change                                                   |
| ------------------------------------------------- | -------------------------------------------------------- |
| `.agents/skills/enterprise-bootstrap/SKILL.md`    | Frontmatter `description` bounded; body untouched        |
| `.claude/skills/enterprise-bootstrap/SKILL.md`    | Same `description` bytes; bridge body untouched          |

Diffstat:

```text
 .agents/skills/enterprise-bootstrap/SKILL.md | 20 ++++++++++++--------
 .claude/skills/enterprise-bootstrap/SKILL.md | 20 ++++++++++++--------
 2 files changed, 24 insertions(+), 16 deletions(-)
```

## The description before

```yaml
description: >-
  Design and build distinctive, production-grade user interfaces with Bootstrap
  5.3 and intentional frontend craft. Use for ANY UI work — creating, restyling,
  reviewing, or extending pages, screens, components, layouts, app shells,
  dashboards, admin panels, SaaS tools, data tables, filter bars, forms,
  wizards, navigation, modals, empty/loading/error states, dark mode, marketing
  surfaces — whenever the task touches HTML/CSS/visual design, mentions
  Bootstrap or its components, or must look professional and avoid templated
  defaults. Covers aesthetics, typography, color modes, design tokens,
  accessibility (WCAG 2.2 AA), responsive layout, and enterprise app patterns.
```

## The description after

```yaml
description: >-
  Design and build distinctive, production-grade user interfaces with Bootstrap
  5.3 and intentional frontend craft, in any host project and on any stack. Use
  for Bootstrap user-interface work — creating, restyling, reviewing, or
  extending pages, screens, components, layouts, app shells, dashboards, admin
  panels, SaaS tools, data tables, filter bars, forms, wizards, navigation,
  modals, empty/loading/error states, dark mode, marketing surfaces — whenever
  the task touches HTML/CSS/visual design, mentions Bootstrap or its components,
  or must look professional and avoid templated defaults. Covers aesthetics,
  typography, color modes, design tokens, accessibility (WCAG 2.2 AA),
  responsive layout, and enterprise app patterns. The `orkestrel-polish-surface`
  skill owns driving a surface that already renders to shipped quality through
  capture-evidence verdict rounds. Use this skill for the Bootstrap craft that
  campaign's fix units are built from.
```

## What changed and why each clause is derived from a body

Three edits, each traced to text in one of the skills.

**`ANY UI work` became `Bootstrap user-interface work`.** This was the unbounded half of finding S14
(`instr-audit-subjective.md:241`): the claim reads broader than the `orkestrel-polish-surface`
skill's trigger, so a dispatcher choosing between them has no rule. The replacement is the subject
the body actually works — `.agents/skills/enterprise-bootstrap/SKILL.md:17` opens "build it from
Bootstrap 5.3 components and utilities", and the whole reference table is Bootstrap layers. The item
list, the `whenever the task touches` clause, and the `Covers` sentence are unchanged, so nothing the
skill genuinely covers was narrowed away.

**`in any host project and on any stack` was added.** Derived from § Portability: "Assume no stack.
Infer it from the workspace" (`:40`) and "Follow the project's code law" (`:42`). It is the clause
that separates this skill from the `orkestrel-` family, whose members open with a
`## Load authority` section binding this repository's contract, and it is the same property R7 ruled
the name exception on.

**The boundary sentence was added.** Derived from the deference the body already states at `:80` —
"For a full review-round campaign built on that evidence, use the `orkestrel-polish-surface` skill
instead of improvising one here" — and from that skill's own description and § Select the scope,
which claim verdict, round, and campaign alike. The boundary is therefore written on the mechanism,
`capture-evidence verdict rounds`, rather than on the word `review`: any scope of verdict work over a
surface that already renders is the other skill's, at every size, which is what its own `Run one
round for a narrow request` sentence claims.

`reviewing` stays in this skill's item list, and that is not a contradiction. The critique this skill
performs is step "Critique the render" inside its own build loop (`:71`), which runs on a surface it
is building. The mechanism clause is what keeps that from reading as a claim over the other skill's
subject.

## The `agents/openai.yaml` ruling

**No change. It does not repeat the unbounded trigger.** Its current value:

```yaml
  short_description: 'Design and build distinctive, production-grade UI with Bootstrap 5.3'
```

That string carries the build verbs and the framework, and nothing of the `ANY UI work` claim, the
review verb, or the polish verb. The overlap S14 identified is absent from it, so bounding it would
add prose to a display string that already excludes the overlapping work. Adding the boundary there
would also push a one-line label into a paragraph, and `.claude/rules/documentation.md` § Workflow
skills fixes that file at exactly `display_name`, `short_description`, and `default_prompt` as
single-quoted scalars. The file is untouched and is not in the diff.

## Validation

Scoped, read-only, and over the owned files' governing gate.

**`npm run test:policy`** — the project that owns skill frontmatter shape, the `Use ` trigger, and
canonical-to-bridge description parity:

```text
 Test Files  1 passed (1)
      Tests  93 passed (93)
   Duration  1.56s
```

The relevant assertions inside that run are `inspectPolicyWorkspace(process.cwd())`, which reaches
the real `.agents/skills/enterprise-bootstrap/SKILL.md` file through `inspectSkillFamily` and
`inspectSkillBridges`, and asserts an empty violation list.

**Instrument controls.** The same run executed the negative controls that make that green mean
something, each asserting exactly one violation from a real fixture workspace:

- `rejects a description without a Use sentence` (`tests/setupPolicy.ts:1922`), message
  `SKILL.md description names when to use the skill in a sentence beginning Use`;
- `rejects a bridge description that drifts from its canonical twin`
  (`tests/setupPolicy.ts:2208`), message `bridge frontmatter description matches its canonical twin`;
- `rejects an unsupported description scalar shape`, `rejects a single-quoted description scalar`,
  and `rejects a double-quoted description scalar`, which fix the permitted YAML shapes.

Coverage limit: `test:policy` proves the shape, the trigger sentence, and byte parity. It reads no
meaning, so it says nothing about whether the boundary sentence is the right boundary. That judgment
is the auditor's, against the two bodies cited earlier.

**Byte parity, independently of the suite.** The first 17 lines of each file, which span the whole
frontmatter block:

```text
$ diff <(sed -n '1,17p' .agents/skills/enterprise-bootstrap/SKILL.md) \
       <(sed -n '1,17p' .claude/skills/enterprise-bootstrap/SKILL.md) && echo IDENTICAL
IDENTICAL
```

**Formatter**, non-mutating and scoped to the two edited files:

```text
$ npx oxfmt --config .oxfmtrc.json --check .agents/skills/enterprise-bootstrap/SKILL.md .claude/skills/enterprise-bootstrap/SKILL.md
All matched files use the correct format.
Finished in 249ms on 2 files using 4 threads.
```

**Text integrity.** The two em dashes (U+2014) survive the rewrite and no replacement character
entered either file; checked with `grep -c` over the frontmatter block.

**`test:config` was not run**, per the brief's standing condition: it is red at HEAD on the stale
host inventory, and `host.json:28` and `host.json:388` vendor both files I edited, so this change
restales those digests exactly as the condition predicts. The Orchestrator regenerates at
integration. I did not diagnose that red and did not touch `host.json`.

## Acceptance criteria

1. **The `description` names the trigger and the boundary, keeps its `Use ` sentence, and stays in
   the permitted YAML shape.** Met. The trigger is `Bootstrap user-interface work` with the item
   list; the boundary is the `orkestrel-polish-surface` sentence; the shape is still `>-`, which
   `test:policy` accepts and whose quoted-scalar and unsupported-scalar controls both failed as
   designed. There are two `Use ` sentences, the original one and the boundary's.
2. **Canonical and bridge descriptions are byte-identical.** Met, by the `diff` shown earlier and by
   `inspectSkillBridges`, which compares the raw source lines rather than the parsed value.
3. **The report file exists.** Met, at `/home/user/scaffold/tmp/units/r10-bounding-report.md`.

## Deviation state

**No stop.** The bounding is statable without contradicting either body; the derivation for each
clause is recorded earlier, including the one place where a contradiction was possible — the word
`reviewing` — and how the mechanism clause resolves it. The `agents/openai.yaml` unknown was ruled
from its current text, as the brief directed.

## Observation: `CLAUDE.md` moved during this unit, and not by me

`git status --short` at the end of the unit:

```text
 M .agents/skills/enterprise-bootstrap/SKILL.md
 M .claude/skills/enterprise-bootstrap/SKILL.md
 M CLAUDE.md
```

The tree was clean when this unit started — the same command ran at dispatch, alongside
`git log --oneline -1` reporting `ad83fe1`, and printed nothing. The `CLAUDE.md` change therefore
landed inside this unit's interval. I did not make it, my tools touched no file outside the two
owned `SKILL.md` files, and I left it in place rather than undoing it. Its diff:

```diff
-  `analyst` and `sol`. Never put an external model in `model:`. Both bridges bind the transport
-  contract at `.agents/transports/codex.md`, which is a contract rather than a dispatchable role.
+  `analyst` and `sol`. Never put an external model in `model:`. Treat
+  `.agents/transports/codex.md` as the transport contract for those bridges, never as a
+  dispatchable role.
```

That is R8's subject, not R10's. One hypothesis, offered once: a concurrent or overlapping writer
still held `CLAUDE.md` when this unit ran. The Orchestrator owns that reading; the two owned files
carry only the description edit shown in the diff earlier.
