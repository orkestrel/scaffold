# Unit U8 audit — falsify the skills campaign before acceptance

## Role and engine

Two blind lanes on one brief. Subjective lane: `reviewer` on Opus 5, native Claude Code subagent.
Objective lane: Cursor Grok (`cursor-grok-4.6-high`) through the versioned CLI, per the user's
standing ruling that Grok stands in for the dark Sol bench, with Opus outranking on conflict.
Mechanical lane: `checker` on Cursor Grok. Each lane is an Executor: audit yourself, spawn nothing,
and return the `orkestrel-falsify` verdict shape with its single terminal line.

## Subject and chain

The skills campaign of 2026-09-02, at these tips:

| Repository | Range | Units |
| --- | --- | --- |
| scaffold | `f453f00..HEAD` | U2 bootstrap-skill, U2b voice, U4 journey-skill, U5 polish-harness, U7 records |
| test | `95fcf3a..ce75175` | U1 test-additions, U1b successor |
| form | `7779e6b..2f07735` | U3 form-crosswalk |
| terrain | working tree, uncommitted | U6 terrain-reference |

Read `.orkestrel/scaffold/plan.md` (the exit criterion) and `design-reconciliation.md` (the
accepted direction) before the claims. Every unit's brief and report sit in `.orkestrel/scaffold/`.

## What the round decides

Whether the campaign is accepted: whether the two skills, the polish-surface fold, the test
package additions, the form crosswalk, and the terrain reference implementation ship in the
release wave. A finding is worth more than a clean pass: after the wave the skill files are
vendored into every fleet target and the test package is re-pinned everywhere.

## Already established — do not re-run

Verified by the Orchestrator directly, not taken from a writer's report:

- `format:check` and `test:policy` green in scaffold at `4c7225f`; `format:check` and
  `test:guides` green in form at `2f07735`; build and the whole suite green in test at `ce75175`
  (`.orkestrel/scaffold/test-additions-gates.md`).
- `prove` cannot serve a browser project in `@orkestrel/probe` 0.0.11
  (`.orkestrel/scaffold/probe-browser-finding.md`, two runs).
- Every published name the journey skill cites resolves in the test checkout
  (`journey-skill-report.md` § Every published name).
- The narration sweep reads zero over the three bootstrap files (`bootstrap-voice-report.md`).

## Review evidence

Code change: `git diff f453f00..HEAD --stat` and `git status --porcelain` in scaffold;
`git diff 95fcf3a..ce75175` in test; `git diff 7779e6b..2f07735` in form; `git diff` and
`git status --porcelain` in terrain. The Orchestrator pastes each into the lane's dispatch.
Rendered surface: the terrain capture portfolio under `terrain/tmp/capture/` for every declared
variant, produced by the Orchestrator's capture runs, is the primary evidence for claims about
what terrain renders; source corroborates.
Proposal: the two skills and the harness reference are process proposals; the canon they must
satisfy is `AGENTS.md` § Writing and § Instruction files and `.claude/rules/documentation.md`
§ Workflow skills; the motivation is the user's words in `design-brief.md` § Context.

## Numbered falsifiable claims

Attempt to refute each. `CONFIRMED` requires naming the attack you tried that failed. A claim you
cannot decide is `UNRESOLVED`; say what would settle it. Do not hedge toward an imagined consensus.

### The skills as instruments

1. Every line of `enterprise-bootstrap/SKILL.md`, `references/inputs.md`, and
   `references/inspection.md` is a directive an executing agent can act on, in the voice of
   `.claude/rules/*.md`. Attack: find a sentence that narrates, persuades, or explains a rule to a
   person, or a rule with no observable trigger.
2. The same holds for `orkestrel-prove-journey/SKILL.md` and every file under its `references/`,
   and for `orkestrel-polish-surface/references/capture-harness.md`.
3. Every instrument in `inspection.md` names a property, a population, a reading, a control drawn
   from outside that population, and a coverage statement, and no instrument's control can pass
   while the instrument is broken. Attack: construct a broken instrument its stated control would
   not catch.
4. `inputs.md` covers every category the accepted design lists, every row handles the fixed state
   set, and every class token in its fences exists in Bootstrap 5.3.8's compiled CSS. Attack: read
   `terrain/node_modules/bootstrap/dist/css/bootstrap.css` for each token.
5. `enterprise-bootstrap` names no `@orkestrel/*` package and no rule file beyond
   `.agents/orchestration.md` and `.claude/rules/quality.md`, so the naming exception in
   `.claude/rules/documentation.md` § Workflow skills still holds.
6. The custom-CSS exception in `SKILL.md` and `inspection.md` opens only on a measured vendor
   failure, cites the reading, restores the bar and nothing else, and is written over tokens; no
   sentence elsewhere in the skill still says rung four is never taken.
7. Every rule in the journey skill has one home: the `variant` axis, the never-split rule, the
   families table, the `data-bs-theme` rule, the statechart requirement, and each instrument's
   property appear once across `SKILL.md`, its references, and `inspection.md`. Attack: find a
   restatement.
8. Every backticked helper, type, constant, and member the journey skill cites resolves to an
   export in the test checkout at `ce75175`, spelled identically.
9. `captures.md` keeps as suite assertions exactly what `createPortfolio` leaves to the suite
   (expansion uniqueness always on, placement set-equality every run, disk membership and non-empty
   read-back under the flag) and claims nothing the package already refuses. Attack: read
   `test/src/browser/factories.ts:106–145` against each sentence.
10. `decide.md` routes every rendered question away from `prove` and states the two probe defects
    as the limit; nothing in any skill tells a model to send a browser claim to `prove`.
11. `capture-harness.md` makes the journey run the portfolio source wherever a Vitest browser
    project can drive the surface, keeps the spawned script only for the rest, and its portfolio
    table names a source per artifact including the statechart outcome.
12. Each skill directory holds only `SKILL.md`, `agents/openai.yaml`, and the `references/*.md`
    files its `SKILL.md` names; each bridge under `.claude/skills/` carries its canonical `name`
    and `description` byte for byte; `SKILL.md` stays under about 500 lines in each skill.

### The package additions

13. `executeScenario` runs arrange, act, assert in order, awaits each, and rethrows with the row's
    name prefixed and the original as `cause`; `executeScenarios` is serial and stops at the first
    failure. Attack: an `act` that resolves after `assert` would have run, a non-`Error` throw, a
    rejected `build`.
14. `readClasses` returns every class token the root and its descendants carry, SVG included,
    in document order of first sighting, and its difference against `readCascade()` is the
    authored-class census with a control the cascade lacks.
15. `extractStyles` returns the markup of every element with a non-whitespace `style` attribute and
    every `<style>` element, root included in both populations, each once, in document order, and
    nothing else. Attack: a `style` attribute holding only whitespace, an SVG `path` with `style`,
    a `<style>` root, a `DocumentFragment` root.
16. No published `@orkestrel/*` package provides a primitive with matching semantics for any
    addition (`ecosystem-reuse-ruling.md`), and `@orkestrel/test` still declares zero runtime
    dependencies.
17. `guides/test.md` documents every new export with parity green, the § Limits statechart row
    carries the reuse reasoning, and every fence transcribed in `tests/guides.test.ts` asserts the
    value the guide prints.

### The consumers

18. `form/guides/form.md` maps every `FieldControl` member to one category from the fixed list,
    verbatim, prints the catalog path as a target receives it, and adds no markup or class name.
19. Terrain's `integration.test.ts` drives every step by role and accessible name through the
    published verbs, with no selector, instance, or store reach; asserts the exact refusal voices;
    declares the variants as `CaptureVariant` values; measures through `contrast` and `readRing`
    with the negative control still under 3:1; and its statechart family runs through
    `executeScenarios`. Attack: run it in terrain's `app:browser` project and read the result.
20. The capture portfolio the Orchestrator produced for terrain shows each registered state in
    each variant, and each capture shows the state its filename claims.

### The whole

21. The campaign is coherent as a whole: a model opening `enterprise-bootstrap` to build a
    Bootstrap form and `orkestrel-prove-journey` to prove it receives one vocabulary
    (`control`, `affordance`, `state`, `transition`, `variant`, `instrument`) with no term used in
    two senses across the four skills and the test guide. Would you ship this?
22. No refusal was widened into a regression: no rule the skills stated before the campaign was
    dropped without a recorded ruling. Attack: diff each skill against its snapshot at
    `tmp/skill-workspace/snapshot/` and name a dropped law.

## Unknowns

- Whether the terrain capture runs complete for every variant before the round; if a variant is
  missing, mark claim 20 `NOT-EVIDENCED` naming it.
- Whether the `app:browser` project in terrain is runnable by the objective lane's engine; where it
  is not, the Orchestrator supplies the run's bare output as evidence and the lane reads it.

## Where a probe may live

A probe in scaffold, test, or form lives under `tmp/probe/` and runs through the `probe` project;
in terrain, a probe that needs the browser lives at `tests/app/browser/probe-<lane>.test.ts` run by
explicit path with `--project app:browser`, and is deleted before the lane returns. Distinct
filenames per lane; never a whole-project run while another lane is live.

## Output

The `orkestrel-falsify` verdict shape: numbered per-claim verdicts with evidence, findings outside
the claims substantiated to the `BROKEN` standard, and exactly one terminal line.
