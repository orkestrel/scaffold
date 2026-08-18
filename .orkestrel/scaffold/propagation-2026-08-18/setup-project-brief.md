# Design brief: the fleet has a proof the canon registers no project for

Two blind lanes, one brief. `planner` (Opus 5, subjective) and `analyst` (GPT-5.6 Sol, objective).
Neither sees the other's answer. Read-only; propose, do not implement.

## The situation, measured

A propagation wave took all 44 Orkestrel targets onto a new vendored host. 43 accepted it. One did
not. `scaffold overwrite` refused `/workspace/ollama` with:

```
TARGET: The manifest at /workspace/ollama names a Vitest project the planned configuration does not
register: setup. To continue, remove the script that names it or do not use scaffold writing verbs
on a workspace that needs a custom Vitest project.
```

`ollama/package.json` declares `"test:setup": "vitest run --config vite.config.ts --no-cache
--reporter=dot --project setup"`, and `ollama/vite.config.ts:134-135` registers a `setup` project
including `tests/setup.test.ts`.

That file is 558 lines. Its own header states its subject:

> The shared test infrastructure's own proof. Every helper, fixture, recorder, and guard exported
> from `tests/setup.ts` and `tests/setupServer.ts` is real code that the module, integration, and
> live-service suites rely on, so each one is proved here rather than trusted. It covers the whole
> workspace's fixtures rather than one module, which is why it sits at the tests root in its own
> `setup` project.

`ollama` is the only target of 44 with such a file or such a project. `scaffold` itself has neither.

## The tension inside the canon

Both of these are current law, and together they leave a hole:

- `.claude/rules/tests.md`, mirror rule: "Resolve a `setup*` module test against its sibling
  `setup*.ts` module inside `tests/`." So `tests/setup.test.ts` is a **sanctioned filename**.
- `.claude/rules/workspace.md` fixes the cross-cutting project list — `policy`, `config`, `guides`,
  `conformance`, `distribution`, `integration`, `service` — and says "Define a cross-cutting project
  only for a proof the package actually has." `setup` is **not on that list**, and no listed
  project's include collects `tests/setup.test.ts`.

Related law that bears on whether the proof should exist at all:

- `AGENTS.md`: "Export and test reusable logic. No hidden module helpers or declarations… export it
  from the correct centralized module and test it."
- `.claude/rules/tests.md`: setup files own and export every reusable helper, fixture type, factory,
  constant, and guard.
- `.claude/rules/quality.md`, discovery and adequacy audit: "prove every declared project is
  reachable from a gate" and "confirm helpers do not reimplement production behavior."
- `.claude/rules/tests.md`: "Do not create test files solely for `constants.ts`, barrels, error
  definitions, or `types.ts`."

Note also that `scaffold`'s own `vite.config.ts` excludes `tests/setup.test.ts` from its `guides`
project — an exclusion for a file that does not exist in that repository.

## The question

Rule on which fork the canon's own spirit requires, and say why.

- **Fork A — register it.** Add `setup` to the canon's cross-cutting project list and to scaffold's
  generated plan, conditional on `tests/setup*.test.ts` existing. Cost: a new project in the fixed
  list, a new script, rule edits in two files, and a change to the generated `vite.config.ts`
  template that reaches all 44 targets.
- **Fork B — fold it.** `ollama` moves its 558 lines into a project that already exists, and drops
  the custom project so `overwrite` accepts it. Say exactly which project, and whether the mirror
  rule and the scope rules permit the destination.
- **Fork C — leave it opted out.** scaffold's refusal message already sanctions this: a workspace
  needing a custom Vitest project does not use the writing verbs. Cost: `ollama` permanently stops
  receiving vendored rules, agents, skills, and the policy plugin, and drifts from the fleet.

## What your answer must decide

1. Which fork, and the one-line reason.
2. Whether a `tests/setup*.test.ts` proof is a thing the canon **wants** at all, or an artifact of one
   package over-testing its own fixtures. If the latter, Fork B or C follows and Fork A is wrong.
3. If Fork A: exactly which existing rule text changes, and whether the project is unconditional or
   conditional on the file existing. An unconditional empty project fails — Vitest exits non-zero on
   "no test files found", which `.claude/rules/tests.md` names explicitly.
4. If Fork B: the destination project, and how the mirror rule tolerates a root-level `tests/*.test.ts`
   that is not one of the reserved cross-cutting filenames.
5. The blast radius on the other 43 targets, stated concretely.

## Constraints on any proposal

- Do not propose adding a dependency.
- Do not propose a per-target exception mechanism; the vendored set is byte-identical by design.
- Bound the proposal to this question. Do not redesign the project matrix.
- A rule edit must be written in the instruction-file voice `AGENTS.md` mandates.

## Output

The fork, the reason, the exact rule text you would change with its file, the blast radius, and the
risks your ruling accepts. No process diary.
