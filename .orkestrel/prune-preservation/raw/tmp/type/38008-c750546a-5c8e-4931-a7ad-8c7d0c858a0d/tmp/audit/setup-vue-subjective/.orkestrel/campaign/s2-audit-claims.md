# Unit S2 — audit claims

## Subject

The chain: unit S2 round 2 (brief `tmp/codex/s2-brief-2.md`, stopped on the vendored lint policy
against the `typescript` compiler API, partial tree checkpointed at `a8bb50d8`), then round 3
(brief `tmp/codex/s2-brief-3.md`, report `tmp/codex/s2-report-3.md`) on the successor brief, which
moved the reader to `parseSync` from `vite` and closed the gates. Baseline before the unit:
`4c4edd93`. Subject tree: the scaffold checkout at its current uncommitted tip. Writer: `sol` on the
Codex bench (`gpt-6-astra`).

What it claims to close: ROADMAP items 16 (a skill sweep that proves an instructed API exists in the
installed package's public entry) and 30 (a local refusal case duplicating a stronger vendored
proof), with rulings D20 and D21 of `tmp/units/design-verdict.md`.

## What the round decides

Whether this change ships in the next `@orkestrel/scaffold` release as vendored bytes
(`tests/setupPolicy.ts`, `tests/setupPolicy.test.ts`, `tests/policy.test.ts`) that every target's
`repair` installs and every target's `test:policy` runs. A defect here reddens every workspace in
the fleet at once, or passes a dangling skill import everywhere at once.

## Already established — verified by the Orchestrator directly, not taken from the writer

- `.oxlintrc.json:437-451` (vendored) forbids importing `typescript` under `tests/**`; the policy
  stands and the reader must not use the compiler API.
- `BASE_DEV_DEPENDENCIES` (`src/core/constants.ts:532-544`) holds `@orkestrel/guide`,
  `@orkestrel/probe`, `@orkestrel/scaffold`, `@orkestrel/test`, `@types/node`, `oxfmt`, `oxlint`,
  `typescript`, `vite`, `vitest`. The baseline `tests/setupPolicy.ts` already imported
  `@orkestrel/guide`, `@orkestrel/scaffold` (`HOST_PATHS`), `vite` (`parseSync`), `node:*`, and
  `../configs/policy.js`.
- ROADMAP 30's site: `tests/src/core/compilers.test.ts` "refuses the Vitest invocation record a
  project row is called with" duplicated `tests/config.test.ts` "keeps Vitest invocation fields out
  of project configurations", which drives every registered factory with the sentinel and carries
  a planted-factory control.
- No skill under `.agents/skills/` carried a fenced `@orkestrel/*` import before this unit.
- The Orchestrator's own gate reading over the subject tree is recorded in
  `tmp/verify/s2-*.log.txt` and summarized in the lane briefs.

## Review evidence

- The diff against the baseline: `tmp/audit/s2-diff.patch` (six files, 565 insertions, 43
  deletions).
- The writer's reports: `tmp/codex/s2-report-2.md` (round 2) and `tmp/codex/s2-report-3.md`.
- The briefs: `tmp/codex/s2-brief-2.md`, `tmp/codex/s2-brief-3.md`.
- The tree itself, readable at `C:/Users/mikes/WebstormProjects/scaffold`.

## Numbered claims — attempt to refute each

1. **Coverage of the fence population.** The sweep reads every fenced `import … from '@orkestrel/…'`
   statement in `SKILL.md` and in each reference `SKILL.md` names — including a fence nested in a
   list or blockquote, a multi-line import, an aliased binding (`a as b`), a `type` binding inside
   a value import, a binding preceded by a comment, and a fence whose language tag is `ts`,
   `typescript`, or absent — and refuses a binding the installed declaration entry does not export
   with a violation naming the skill file, the specifier, and the binding.
2. **Soundness of the declaration reading.** `readSkillExports` resolves the installed entry through
   the package's `exports` map for the root and an environment subpath, reads every export form the
   tsc declaration roll-up emits (function, const, class, enum, interface, type alias, a local
   `export { … }` list, `export * from` and `export { … } from` relative re-exports with aliases and
   `type` forms), follows re-exports across files including a cycle, and refuses — never silently
   passes — a form outside that set. Attack it with a form the fleet's `.d.ts` files carry that the
   reader does not list: overloaded function declarations, `export declare namespace`, a
   `declare const X: …; export { X }` split, a `.d.mts`/`.d.cts` sibling, `export type { A } from`.
3. **No runtime import.** Nothing in the sweep evaluates a package's runtime entry, so the `policy`
   project runs it in Node in a browser workspace and in a core-only workspace alike. Attack:
   find any `import()`, `createRequire`, or `require` of an `@orkestrel/*` specifier introduced by
   the diff.
4. **The out-of-base ruling.** A fenced import of a package outside `BASE_DEV_DEPENDENCIES` is
   refused naming the package; a package inside the set whose declaration entry is not installed is
   reported as an unmet prerequisite and never skipped. Attack: a workspace where `@orkestrel/test`
   is installed at a version lacking the entry subpath; a specifier with a trailing subpath the
   `exports` map maps through a wildcard.
5. **The controls bind.** Each of `S2-C1`–`S2-C5` is drawn from outside the population the reader
   covers — the planted binding names are absent from the installed entries, and the planted
   out-of-base package is genuinely outside the set — and each recorded red is a red the mechanism
   alone turns green (no test passes for a reason unrelated to the sweep).
6. **The blind spot is stated truthfully.** An identifier in prose, in a table cell, in indented
   code, a default or namespace binding, and a non-Orkestrel import are outside the sweep, and the
   documentation rule, the guide passage, and the reader's TSDoc say exactly that and nothing
   wider. Attack: find a sentence claiming more coverage than the code has, or a covered case the
   prose omits.
7. **The vendored import law holds.** `tests/setupPolicy.ts` imports only `node:*` modules and
   packages in `BASE_DEV_DEPENDENCIES`, no `typescript`, and the vendored-import proof in
   `tests/src/server/helpers.test.ts` still admits it.
8. **ROADMAP 30 loses nothing.** Every discrimination the deleted `compilers.test.ts` case made is
   made by the surviving `tests/config.test.ts` case: the same sentinel shape, every registered
   factory, and the planted-factory control. Attack: name an input the deleted case rejected that
   the surviving case accepts, including a factory registered only in this checkout's root
   configuration and not in a generated one.
9. **The prose is a directive.** The two sentences added to `.claude/rules/documentation.md`
   § Workflow skills and the `guides/scaffold.md` passage obey `AGENTS.md` § Instruction files and
   `.claude/rules/writing.md` (no counts, no `should`, no history, one home per rule) and do not
   restate a law that already binds elsewhere.
10. **Every refusal is reachable and every read form is pinned.** Each member of
    `SKILL_DECLARATION_REFUSALS` is produced by a fixture in `tests/setupPolicy.test.ts`, and each
    read form has a fixture; no proof asserts an implementation against itself.
11. **Coherence.** Names follow `{verb}{Noun}`; readers sit in `tests/setupPolicy.ts` as shared
    infrastructure and not in a test file; no nested function declarations, no `any`, no `as`, no
    non-null assertion, no suppression; TSDoc in the package voice; `inspectSkill` and
    `inspectSkillFamily` keep their existing call sites working (the added `installation` parameter
    defaults to `root`). Would you ship this to every workspace in the fleet?

## Unknowns

- Whether a fleet package's rolled-up `.d.ts` carries an export form the reader lists as refused.
  Report which forms you found in the installed `@orkestrel/*` entries under `node_modules` and
  whether any is refused; the Orchestrator sweeps the fleet's built declarations on request.
- The audit lanes hold no write tool and a read-only sandbox. Name a vector you could not run as
  `UNRESOLVED` with the exact command and fixture; the Orchestrator runs it and returns the output
  before ruling.

## The threshold

A finding is worth more than a clean pass. This change is vendored: a false negative teaches every
executor in the fleet that a dangling import is fine, and a false positive reddens every target's
gate on the next `repair`. CONFIRMED requires naming the attack you tried that failed. A claim you
cannot decide is UNRESOLVED, not CONFIRMED — say what would settle it. Do not hedge toward an
imagined consensus.
