# Unit absorb-skills — the two skills against what the fleet now publishes

## Role and engine

`grok` on Cursor Grok (`cursor-grok-4.6-high`), reached through the versioned Cursor CLI entry in
`-p --trust --mode=ask`. You are the bench engine reading this brief inside your own CLI: perform
the reading yourself and spawn nothing.

## Objective

Return a numbered list of every instruction in the `enterprise-bootstrap` and
`orkestrel-prove-journey` skills that is now contradicted by, automatable through, or silent about
what `@orkestrel/test/browser`, `@orkestrel/form`, and `@orkestrel/probe` publish, each with a
`path:line` on both sides.

## Context

**Evidence.** These repositories sit as siblings under `C:\Users\mikes\WebstormProjects\`. The
working directory of this run is that parent directory. Paths are relative to it.

- The skills under `scaffold/.agents/skills/`:
  - `enterprise-bootstrap/SKILL.md` and `references/frontend-design.md`, `components.md`,
    `utilities.md`, `bootstrap-reference.md`.
  - `orkestrel-prove-journey/SKILL.md` and `references/layer.md`, `captures.md`.
  - `orkestrel-polish-surface/references/capture-harness.md`, which `captures.md` routes review to.
- `test/src/browser/helpers.ts` and `test/src/browser/factories.ts` — the published journey
  layer — and `test/guides/test.md` § Browser (lines 172–460), § Voices (757–820), and the
  patterns from line 2005 to 2300.
- `form/src/core/types.ts` and `form/guides/form.md` § Controls (200–428).
- `probe/guides/probe.md` § Prerequisites (411–454) and § What a probe proves (268–348).

**Law.** Read-only. `scaffold/.claude/rules/documentation.md` § Workflow skills fixes the shape a
skill may take (`SKILL.md`, `agents/openai.yaml`, `references/*.md` named from `SKILL.md`, and
nothing else). Read it, and report where a finding would need a file that shape forbids.

**Host.** Windows 11, Git Bash launcher, no network. Skip every `node_modules/` and `dist/`
directory.

**Measurements.** `grep -n "resolveAccessible\|readPerception\|traverseAccessible\|createPortfolio\|contrast\|readCascade" scaffold/.agents/skills/orkestrel-prove-journey/references/layer.md scaffold/.agents/skills/enterprise-bootstrap/SKILL.md`
bounds which published names the skills already speak. Run it and cite the hits.

**Control identifiers.** none.

**Standing conditions.** `layer.md` says to implement its signatures as a contract in the
workspace's browser test setup module and never to copy them as source; `@orkestrel/test`
0.0.11 publishes them. Report that as a finding with both lines; do not resolve it.

## Unknowns

- Whether `captures.md`'s state registry and variant rules match `createPortfolio`'s refusals
  one for one. Report each rule with `matches`, `stricter`, or `looser` and the two lines.

## Scope

**Owned.** Nothing. This lane writes no file.

**Shared (report-only).** Every file named under Evidence.

**Off-limits.** Every other path. Never open a `.env*`, `auth.json`, `.npmrc`, or key file.

**What asserts the state this change ends.** Not applicable to a reading lane.

**Tools and limits.** Read, search, and list. No edits, no commands that change the tree, no
`--force`.

## Execution

You are the bench engine reading this brief inside your own CLI: perform the assignment directly
and spawn nothing.

## Output

Return, as your final message and nothing else, Markdown with these sections:

- `Question`: one line.
- `Evidence`: a numbered list. Each item: `Skill line` (`path:line`), `Instruction` (quoted, at
  most one sentence), `Relation` (`contradicted`, `automatable`, `silent`), `Package line`
  (`path:line`), `Fact` (one clause). Cover, at minimum: the journey-layer contract, the capture
  registry and variants, the contrast instrument, the authored-classes instrument, the glyph
  instrument, the form-control vocabulary, inline and custom style detection, viewport and color
  mode coverage, and any statement about statecharts or interactive human review (there may be
  none; say so).
- `Distillate`: at most ten bullets.
- `Unknowns`: unresolved facts, not recommendations.
- `Deviation`: an unreadable path or a sweep that could not run; otherwise `none`.

No raw file dumps. No rewrites of the skills. No verdicts on quality.

## Deviation contract

Stop and report when a listed file does not exist. Decide, record, and carry on when a section
range in this brief is off by a few lines.

## Acceptance criteria

1. Every item cites a `path:line` on both sides.
2. The `layer.md` contradiction appears as an item.
3. The captures-versus-`createPortfolio` unknown is answered rule by rule.

## Review evidence

The Orchestrator reads each item against both cited lines before using it.
