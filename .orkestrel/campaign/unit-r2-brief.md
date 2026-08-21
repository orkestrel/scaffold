# Unit R2: the nested-function law as a plugin rule

## Role and engine

Role `implementer`, engine **GPT-5.6 Sol**, sandbox `workspace-write`, rooted at
`C:/Users/mikes/WebstormProjects/scaffold`. You perform the assignment directly and spawn
nothing: do the work yourself inside this session.

## Objective

The ROADMAP row: move the nested-function body law into `configs/policy.ts` as another plugin
rule, so a violation surfaces at lint time in the offending file rather than only through the
tree-wide sweep. The sweep's AST walk stays — the plugin adds the in-editor door; the two
instruments answer the same law from `tests/setupPolicy.ts`'s existing semantics.

## Context

Authority: `AGENTS.md` § Design laws ("No nested functions. Extract function declarations and
assignments from bodies. The only exceptions are an anonymous callback passed directly as an
argument and an anonymous function returned directly as a result"),
`.claude/rules/architecture.md` § Functions and orchestration (the full statement: bans local
`function`, `function*`, and `const fn = () => ...` regardless of caller count; the visitor-
table one-line arrow delegation exception for the plugin's own table),
`.claude/rules/workspace.md` § Policy instruments (each visitor is a one-line context-binding
arrow delegating to a named module-scope `report{Noun}` function; never inline rule logic in
the table), `.claude/rules/typescript.md`, `.claude/rules/tests.md`,
`.claude/rules/writing.md`.

Ground (F2, verified 2026-08-21): `configs/policy.ts` registers `no-mocking` (`MOCKING_RULE`,
`:132-152`) and `no-keyword-privacy` (`PRIVACY_RULE`, `:155-176`), wired in the default plugin
at `:179-185`; the declaration shape is `PolicyRuleInterface { meta: PolicyMeta; create }`
(`:53-57`) with `PolicyMeta { type: 'problem'; docs; messages }` (`:35-39`); the file imports
NOTHING (vendored leaf — self-contained; its own types/data/functions live in the file).
Plugin rules are proved in `tests/config.test.ts`'s `describe('policy plugin')` (`:499-574`)
through `RuleTester` from `oxlint/plugins-dev`, and `:576` loads each configured rule through
the real Oxlint binary. The sweep's own semantics to mirror: `hasModulePolicyFunction`,
`nestsPolicyFunction`, `hasNestedPolicyFunction` in `tests/setupPolicy.ts:359-428`, with the
accepting and rejecting controls at `tests/policy.test.ts:214-277` and the `POLICY_CONTROLS`
rows near `tests/setupPolicy.ts:1669-1738` (read them — they fix the boundary cases: a
callback parameter default function rejects; an assignment two direct callbacks down rejects;
an anonymous callback passed directly as an argument and an anonymous function returned
directly as a result are the only permitted in-body forms; the visitor-table arrow exception).

Both `configs/policy.ts` and `tests/config.test.ts` are vendored `dist/host` surface — the
change rides scaffold's next release; expected.

## The design

1. In `configs/policy.ts`: a new `NESTED_RULE: PolicyRuleInterface` — rule id
   `no-nested-functions` — whose `create` visitors detect a `function` declaration, a
   `function` expression, or an arrow function whose position is inside another function body
   AND is neither (a) an anonymous function passed DIRECTLY as a call argument, (b) an
   anonymous function returned DIRECTLY as a result, nor (c) the plugin's own visitor-table
   one-line arrow (the exception reaches only a property value inside an object literal
   RETURNED from `create` — scope it as narrowly as the workspace rule states, or narrower).
   Named function expressions and any assignment of a function to a local binding inside a
   body are violations. Follow the file's existing report-function idiom (`report{Noun}`
   module-scope functions; one-line arrows in the visitor table). Wire the rule into the
   default plugin object.
2. `.oxlintrc.json`: enable the rule at error beside the existing plugin rules (read how the
   two are enabled at `:58-59` and mirror).
3. Proofs in `tests/config.test.ts`'s `describe('policy plugin')`: `RuleTester` cases —
   accepting: a module-scope function; an anonymous callback passed directly; an anonymous
   arrow returned directly; the visitor-table shape. Rejecting: a local `function`
   declaration; a `const fn = () => {}` inside a body; a named function expression argument;
   a callback parameter default function; an assignment two callbacks down (mirror the
   sweep's control vocabulary — name each test for what it proves, never a control label).
   The real-binary case at `:576` must pick the new rule up automatically (verify).
4. IMPORTANT make-false risk, checked FIRST: enabling the rule lints the WHOLE TREE — run the
   real lint (`npx.cmd oxlint --config .oxlintrc.json --deny-warnings .`) with the rule
   enabled BEFORE finalizing; if any tracked source file violates (the sweep being green
   makes this unlikely but the plugin's reach may differ — for example `.ts` files the sweep
   exempts), report each hit and STOP if fixing it needs a file outside your grant.

## Scope

- Owned: `configs/policy.ts`, `.oxlintrc.json`, `tests/config.test.ts`.
- Off-limits: everything else. Standing entries: everything `git status --porcelain`
  currently lists (the campaign's accumulated scaffold state, including U10-A/U10-B's
  policy-instrument edits) is standing.
- No commits, installs, publishes, or credential reads. No
  `git checkout`/`restore`/`stash`/`reset`/`clean`. The sandbox denies network. Use `npx.cmd`.

## Acceptance criteria, in this order

1. The whole-tree lint reading with the rule enabled (criterion 4 of the design).
2. `git status --porcelain` adds exactly the owned files to the standing entries.
3. `npx.cmd oxfmt --config .oxfmtrc.json --check configs/policy.ts tests/config.test.ts`
   exits 0.
4. `npx.cmd oxlint --config .oxlintrc.json --deny-warnings configs/policy.ts tests/config.test.ts`
   exits 0.
5. `npx.cmd tsc --noEmit --project tsconfig.json` exits 0.
6. Failing-first: the rejecting RuleTester cases red before the rule lands (or with it
   unwired), green after; record both.
7. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project config`
   exits 0, and `--project policy` exits 0 (the sweep and the plugin coexist).

## Output

The complete diff; raw output and exit code per criterion including the failing-first pair and
the whole-tree reading; any deviation. No process diary.

## Deviation contract

Stop on: a whole-tree hit outside your grant; the exception scoping not expressible in the
visitor model (name what the AST gives you); a criterion unreachable. Message wording, report
function naming, and case naming are yours: decide, record, carry on.

## Amendment 1, 2026-08-21, after the whole-tree reading

The stop was correct and the reading is the ruling's input: the plugin's whole-tree reach
reds sites in `vite.config.ts`, `tests/setup.ts`, `tests/setupServer.ts`, and
`tests/config.test.ts` — files OUTSIDE the sweep's population (`src` and `app`), which is the
population the law's instrument has always governed. The Orchestrator rules: the plugin rule
is scoped to the SAME population. In `.oxlintrc.json`, enable `no-nested-functions` only for
`src/**` and `app/**` (use the overrides mechanism; keep the other plugin rules' scope
unchanged). Re-run the whole-tree lint — it must exit 0 with the scoped rule live — then close
every remaining criterion from the top. Your work in the tree (the rule, the RuleTester cases,
the wiring) stands; only the scope moves. The out-of-population sites are recorded by the
Orchestrator as a carried canon finding, not yours to fix or to lint.
