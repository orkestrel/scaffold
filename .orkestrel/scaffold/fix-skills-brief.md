# Unit FX1 — fix round on the two skills and the harness reference

## Role and engine

`implementer` on Opus 5, native Claude Code subagent. Sole writer in
`C:\Users\mikes\WebstormProjects\scaffold`. Perform the assignment directly and spawn nothing.

## Objective

Close every reconciled finding the audit round raised against `enterprise-bootstrap`,
`orkestrel-prove-journey`, and `orkestrel-polish-surface/references/capture-harness.md`, without
widening any skill's API surface or changing any bridge frontmatter.

## Context

Law: `AGENTS.md` § Writing and § Instruction files, `.claude/rules/writing.md`,
`.claude/rules/documentation.md` § Workflow skills, `.claude/rules/names.md`. Evidence:
`.orkestrel/scaffold/audit-subjective-verdict.md` and `tmp/cursor/audit-objective.log` (the two
lanes' verdicts, with line numbers as of commit `3df4e22`). The rulings that follow are the
Orchestrator's reconciliation; where a lane said more, this brief wins.

Host: Windows 11, Git Bash. `npm run format` reflows Markdown; `npm run build` regenerates
`host.json` from the vendored skill files.

## Findings carried, each with its ruling

- **C1, C2 — voice.** For each line the objective lane named — `enterprise-bootstrap/SKILL.md`
  81, 125–126, 138–144; `references/inputs.md` 160–161; `references/inspection.md` 14–15;
  `orkestrel-prove-journey/references/layer.md` 329–330; `references/styles.md` 26–27;
  `orkestrel-polish-surface/references/capture-harness.md` 26–27 — rule per `AGENTS.md`
  § Instruction files: keep a rationale only where it changes a judgment call and keep it
  subordinate to the directive; cut a clause that explains, persuades, or narrates; give a line
  with no observable trigger one, or delete it. Record each line's ruling in the report.
- **C3 — controls that enter downstream of extraction.** In `inspection.md`, *Authored class in
  the shipped cascade* and *Declared class combinations* gain a second negative control that
  enters through the extraction door: an element built in the harness carrying an undefined token
  on an SVG `class` attribute, appended to the read tree, still outside the population the
  membership rule names. *Composited contrast* gains a negative control that a reader skipping
  compositing passes: a stack with a translucent layer whose composited ratio sits under the bar
  while its top layer alone reads above it. State each new control's coverage.
- **C4 — the step row.** `inputs.md` 477–479: keep the substance; word the States line so the
  fixed set's scope (the step controls) and the indicator's own set (`rest` plus a current mark)
  read as one rule rather than as an exception to the catalog's claim.
- **C6 — rung 4.** `enterprise-bootstrap/SKILL.md` 117 and 119: point rung 4 at
  `inspection.md` → When an authored rule is already earned, and remove or condition every absolute
  never-take sentence so the ladder and the exception agree.
- **C7 — one home per rule.** Cut the restatements to pointers: `styles.md` 54–56, 59–63, 67–68,
  71–73 (against `inspection.md` 11–12, 30–31, 36–39, 62, 67–71); `styles.md` 21 (against
  `SKILL.md` 59–60); `captures.md` 50 (the variant axis, owned by `SKILL.md` → Read the variant
  once). Keep one statechart trigger: strike `SKILL.md` 45–46 and let the families table row at 39
  carry the requirement, worded to cover a control that carries state whether or not the surface
  declares a table.
- **C9 — captures.md against the package.** `captureFrame` reads every written file back and
  compares bytes (`test/src/browser/helpers.ts` 1930–1931) and refuses a path mismatch with
  `Capture frame was written to <path> where <path> was asked for` (1926–1928). Strike the
  Read-back row (69) and the sentences at 80–81; keep Disk membership; add the path-mismatch voice
  to the refusal table.
- **C10 — one word.** `decide.md` 22: "the declared class allowlist's own declaration".
- **C21 — one term per concept.** Write `negative control` wherever the instrument sense is meant
  (`inspection.md` 13 and every **Control.** entry, `styles.md` 47–48, `captures.md`,
  `enterprise-bootstrap/SKILL.md` 243, and every other hit a sweep finds); reserve bare `variant`
  for the capture axis and name Bootstrap's chrome by its class family or as a tone; qualify
  `state` as affordance state, capture state, or entity state wherever a sentence could be read
  with more than one. Sweep case-insensitively and record the pattern and the paths.
- **C25 — the checklist meta-row.** Move `SKILL.md` 243 to open the checklist and word it as
  binding the deliverable's checks file: every check it lists, instrument or not, carries a
  population, a negative control, and a coverage statement, or is listed as open. The remaining
  rows name what to check.
- **F5 — the reading's name.** The export stays `extractStyles` (ruled in
  `.orkestrel/scaffold/ecosystem-reuse-ruling.md`: `escape` carries the encoding sense in
  `@orkestrel/html` and `@orkestrel/console`). Keep "style escapes" as the property's name and
  name the reading by its export everywhere the prose says "the escape reading"
  (`orkestrel-prove-journey/SKILL.md` 154 and any other hit).

## Scope

**Owned.** `.agents/skills/enterprise-bootstrap/**`, `.agents/skills/orkestrel-prove-journey/**`,
`.agents/skills/orkestrel-polish-surface/references/capture-harness.md`, `host.json` (regenerate
with `npm run build`). **Off-limits.** Bridge frontmatter under `.claude/skills/`, every rule
file, every other path. Commit nothing; no `git checkout`/`restore`/`stash`/`reset`/`clean`.

## Output

Write `tmp/units/fix-skills-report.md` and return it: per finding, the edit and the line; per
voice line, the ruling; the sweep patterns and paths for C21; `git diff --stat`; the gate
readings; the claims you could not close.

## Deviation contract

Stop and report when a fix needs a change to a rule file, a bridge, or `@orkestrel/test`. Decide
and record wording.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, `npm run build`, `npm run test:config` green.
2. A sweep for bare `control` in the instrument sense, for `variant` in the chrome sense, and for
   a restated block finds none; the sweep's pattern and paths are in the report.
3. Every finding above names its edit in the report, or names why it stays.
