# Unit design — redesign of `enterprise-bootstrap` and `orkestrel-prove-journey`

## Role and engine

`planner` on Opus 5, native Claude Code subagent. Two dispatches open this same brief: one holds
the **subjective** lane (shape, vocabulary, ergonomics, what a model using the skill should feel),
one holds the **objective** lane (what the rules, the packages, and the toolchain actually permit;
where a proposal would fail a gate, a rule, or a real browser). The dispatch prompt names the lane
you hold. Hold it in full and say which one you held. You are an Executor: do the design yourself
and spawn nothing.

## Objective

Propose the coherent redesign of the two skills — and any reference, helper, or package addition
they need — that gives a model working in an Orkestrel Bootstrap application:

1. rules for representing data and conveying input in ways a person understands and can use:
   a default Bootstrap affordance for every `@orkestrel/form` control and every affordance
   Bootstrap ships no component for, with the states each must handle;
2. checks and inspections a model must run on its own markup: class use, class combinations,
   utility hacks, `style` attributes, `<style>` blocks, custom CSS, and token discipline, each
   proven against the shipped cascade with a negative control;
3. testing that centers the journey: real keystrokes and clicks, assertions on styles the browser
   actually resolved, every viewport and color mode the surface ships, statechart-driven visual
   runs a person can watch and decide on, an integration-test shape with options, and a fast
   decision loop through `probe` or a rendered artifact.

The deliverable of this round is the set of decisions the user must take before implementation.
Write every tension as a question with your recommended answer and the cost of each option.

## Context

**Evidence.** Read `.orkestrel/scaffold/evidence.md` first: it is the Orchestrator's first-hand
reading of the subject, the published `@orkestrel/test/browser` surface, the `@orkestrel/form`
vocabulary, how `taverna`, `terrain`, `lloyds`, and `mailbox` render inputs, and the statechart,
playground, inspector, rendered-golden, and probe tooling in `elements`, `veneer`, and `probe`.
Every path in it resolves from `C:\Users\mikes\WebstormProjects\`. Open the cited files where a
design decision turns on them; the skills themselves are under `.agents/skills/` in this checkout
and you must read both in full, with every reference they name.

The user's own words, 2026-09-02: "I still very much believe in the principals of the enterprise
bootstrap skill, we just need to improve it, especially checks and inspections for the use of
classes, combinations of classes, inline/custom styles, etc. … we need to really improve on
testing, it needs to focus on the journey, styles that are truly generated and applied on the
browser, taking viewports and color modes into consideration, using statecharts to test visually
especially for the human to make decisions and easily test with a form of integration tests and
options provide, we even have probe test from our probe package that we can use and have models
directed to that to do simple stuff for easy decision making, similar to how you use artifacts."
On the examples: "Terrain and Lloyds … are the closest to what I look for in how an application
with bootstrap ui would look … Terrain has the best colors and makes the most use of the css
variables." On `elements`, `mailbox`, `veneer`: "took bootstrap and make everything custom and
went a bit too far but are valuable with tools that we can use." On `form`: "the categories of
inputs that we need to explain and determine the default design for as well as mapping to the
components of bootstrap." On `taverna`: "good information on how inputs are handled, especially
its custom components and how it goes about it with bootstrap."

**Law.** `AGENTS.md` (§ Writing and § Instruction files bind every line you propose);
`.claude/rules/documentation.md` § Workflow skills (the skill directory shape — `SKILL.md`,
`agents/openai.yaml`, named `references/*.md`, nothing else; the `enterprise-bootstrap` naming
exception); `.claude/rules/writing.md`; `.claude/rules/tests.md`; `.claude/rules/styles.md`;
`.claude/rules/browser.md`; `.claude/rules/quality.md` § Instruments. Skills: the two subjects
and `orkestrel-polish-surface` with `references/capture-harness.md`. Guide or spec: none owns a
skill; `guides/README.md` is the map. The skill-creator principles the user asked to apply:
progressive disclosure (`SKILL.md` under about 500 lines, references loaded when named),
explain why rather than shout MUST, generalize past the examples, bundle a tool once several runs
would each rebuild it.

**Host.** Windows 11. Read-only lane: no shell, no edits. Paths under `.agents/skills/` and
`.orkestrel/scaffold/` are in this checkout; sibling packages are at
`C:\Users\mikes\WebstormProjects\<name>\`.

**Measurements.** `@orkestrel/test` is at 0.0.11 and publishes the browser surface the evidence
file lists; `@orkestrel/form` is at 0.0.3 with core only; `@orkestrel/probe` is at 0.0.11;
`terrain` and `taverna` pin `bootstrap ^5.3.8` and render through the Halfmoon skin.

**Control identifiers.** none.

**Standing conditions.** The Codex bench is dark; the objective lane runs on Opus 5 rather than
Sol, and the Orchestrator records that. Three Grok absorption slices (`absorb-inputs`,
`absorb-tooling`, `absorb-skills`) are running in parallel with this round and are not available
to you; where a decision needs a fact they will settle, name it under Risks as pending evidence
rather than guessing.

## Unknowns

- Whether `probe`'s runtime stage can serve a claim whose test path names a browser Vitest
  project. Design for both outcomes and say which parts change.
- Whether the user wants the new material inside the two existing skills, in a third skill, or
  partly in `@orkestrel/test` as published code. Propose, and put the choice under Tensions.

## Scope

**Owned.** Nothing. This lane writes no file.

**Shared (report-only).** Everything you read.

**Off-limits.** Every write. Never open a `.env*`, `auth.json`, `.npmrc`, or key file.

**What asserts the state this change ends.** Not applicable to a design lane.

**Tools and limits.** Read, search, and list.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

Return, as your final message, exactly the `planner` shape: `Design`, `Alternatives`, `Units`,
`Tensions`, `Risks`. Inside `Tensions`, number every item and write it as a question the user
must answer, followed by `Options:` with the cost of each and `Recommendation:` with yours.
Write every proposed skill line you quote in the register `AGENTS.md` § Instruction files
fixes. Name each unit's role and engine, its owned files, its dependencies, and its acceptance
criteria. Keep the whole return under about 400 lines.

## Deviation contract

Stop and report when the evidence file or either skill cannot be read. Decide, record, and carry
on when a cited line number is off by a few lines.

## Acceptance criteria

1. Every design element maps to one of the three objectives or is struck.
2. Every reference or helper you propose names the file it lives in and the rule that permits it
   there.
3. Every tension is a question with options, costs, and one recommendation.

## Review evidence

This is a design proposal: the proposal, the canon it must satisfy (the Law section), and the
record of what motivated it (the user's words and the evidence file) are supplied above.
