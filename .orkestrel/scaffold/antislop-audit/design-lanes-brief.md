# Design-round brief: what to adopt from the anti-slop oxlint plugin

One brief, two blind lanes. The subjective lane is `planner` (Opus 5, native subagent). The
objective lane is `analyst` (GPT-5.6 Sol, journaled CLI, sandbox read-only). Each lane argues its
own perspective in full and never sees the other's answer.

## Objective

Rule on the Orchestrator's draft adoption matrix below: which learnings from the vendored
"anti-slop" oxlint plugin this project should adopt to make its existing conventions durable, which
it must reject, and how the adopted ones should be shaped. The deliverable of the campaign is a
recommendation to the user, not an implementation; your lane's output is input to that
recommendation.

The user's standing constraint: adopt only what enforces conventions this repository ALREADY
states in AGENTS.md and .claude/rules/. Do not import anti-slop's philosophy where it differs.

## Context — read before ruling

Repository (this checkout, /home/user/scaffold):

- `AGENTS.md` — non-negotiables and design laws (the coding contract).
- `.claude/rules/typescript.md`, `.claude/rules/names.md`, `.claude/rules/architecture.md`,
  `.claude/rules/patterns.md`, `.claude/rules/tests.md`, `.claude/rules/workspace.md`,
  `.claude/rules/quality.md` — the applicable rules.
- `.oxlintrc.json` — current lint surface (built-in rules + environment-boundary
  no-restricted-imports). `.oxfmtrc.json`, `package.json` (scripts/gates), `tsconfig.json`.
- `tests/setupPolicy.ts` + `tests/policy.test.ts` — the vendored fleet policy sweep (the sanctioned
  custom analyzer; it is part of scaffold's published `dist/host` vendored surface, restored into
  every fleet target by `repair`).
- Skill: none is dispatch-named for this round. Guide/spec: none governs lint tooling specifically;
  `.claude/rules/workspace.md` § Tooling is the closest authority.

Subject under evaluation (read-only, outside the repo):

- `/tmp/claude-0/-home-user-scaffold/75034726-f81c-5f56-9643-b4a6748f097d/scratchpad/antislop/anti-slop-main/`
  — the unzipped anti-slop repository: `README.md`, `AGENTS.md`, `src/index.ts`,
  `src/rules/*.ts`, `src/shared/*.ts`, `skills/install-anti-slop/SKILL.md`.

Evidence pack (probe commands and outputs, already run): `tmp/design-lanes-evidence.md` in this
checkout. Treat its outputs as measurements taken on this host today.

Standing conditions: `node_modules/` is installed; `tmp/` holds campaign files and codex journals
and is expected dirty; the scratchpad anti-slop copy has its own `node_modules` (scratch-only
install, not this repo's); network is unavailable to the objective lane's sandbox and no step here
needs it.

## Draft adoption matrix — the claims to attack

ADOPT (each encodes an existing convention; each reported ZERO violations on this tree, so each
lands as a pure regression guard):

- C1. Adopt the oxlint `jsPlugins` mechanism as the durable home for AST-local convention
  enforcement, with rules authored as plain ESLint-shape objects (evidence E6: zero new
  dependencies needed). Rules are Orkestrel-authored and vendored fleet-wide through scaffold's
  `dist/host` surface like `tests/setupPolicy.ts`; anti-slop's code is MIT-licensed prior art for
  implementation patterns (scope resolution, alias resolution with visited sets), not a vendored
  import.
- C2. Author a `no-mocking` rule banning test-framework module mocks AND the spy/fake surface the
  repo's non-negotiable names: `vi.mock`, `vi.doMock`, `vi.unmock`, `vi.hoisted`, `vi.fn`,
  `vi.spyOn`, `vi.useFakeTimers`, `vi.setSystemTime`, `vi.stubGlobal`, `vi.stubEnv`, and the jest
  equivalents. (Anti-slop's rule deliberately allows `vi.spyOn`; ours must not.)
- C3. Author a `no-accessibility` rule banning TS `private`/`protected`/`public` member and
  parameter-property syntax (the `#`-privacy law) including `readonly` parameter properties.
- C4. Author a `no-directive` rule banning `eslint-disable*` and `oxlint-disable*` comments. This
  closes a real hole: today a disable comment silently defeats every configured rule and nothing
  reports it (AGENTS.md bans the practice in prose only).
- C5. Adopt anti-slop's per-rule test discipline: every authored rule gets RuleTester coverage
  (`oxlint/plugins-dev`, already installed) with valid AND invalid cases — the instrument must fail
  before it is trusted.
- C6. Record the `as const` ruling explicitly: the installed `consistent-type-assertions: never`
  exempts const assertions (evidence E2); the assertion ban in prose should say whether `as const`
  is sanctioned so the exemption is a decision rather than an accident.

REJECT (each conflicts with a stated convention; violation counts from evidence E5):

- C7. `no-runtime-typeof` (64 hits) — the repo's total guards and parsers ARE its boundary
  parsing; `typeof` inside them is the mechanism, not slop.
- C8. `no-unknown-parameters` (34) — "accept `unknown` and narrow with guards" is a
  non-negotiable; total guards take `unknown` by contract.
- C9. `no-unsafe-dictionary-type` (44) — `Record<string, unknown>` is the honest type for owned
  JSON-ish surfaces and guard results under the foreign-contract rules.
- C10. `no-shape-in-symbol-names` (43) — collides with fleet vocabulary: `ContractShape`,
  `shapers.ts`, the `*Shape` derivation form in names.md.
- C11. `no-conditional-empty-object-spread` (36) — `...(x === undefined ? {} : { y })` is the
  sanctioned omission idiom under `exactOptionalPropertyTypes` and the absence-is-`undefined` law.
- C12. `no-reflect-get`/`no-reflect-apply` (4) — with type assertions banned outright, `Reflect.get`
  is the total-safe property read off hostile `unknown` (see src/server/helpers.ts:64); their rule
  assumes assertions are available.
- C13. `require-safety-comment-for-type-assertion`, `no-chained-type-assertions`,
  `no-widen-then-assert` — subsumed by the stricter total assertion ban already enforced.
- C14. `no-known-value-widening` (47) — mandating inference/`satisfies` over explicit annotation
  conflicts at scale with the types-first annotation style.
- C15. `no-object-parameters` and `no-unknown-type-aliases` are candidates, not automatic adopts:
  both report zero today and are consistent with existing conventions, but each rule carries
  permanent maintenance and test cost. Rule on whether their value clears that cost.

OPEN QUESTIONS (recommend, with reasoning):

- Q16. Rule homes. The policy sweep (TypeScript API, vendored, path-aware) owns placement/mirror
  law; the proposed plugin owns AST-local/token law (mocks, accessibility, directives). Is that the
  right split? Specifically: the no-nested-functions law is today enforced only at module scope and
  in directly-passed callbacks (evidence E7) — bodies of declared functions and class methods are
  review-only. Should the nested-function law (a) stay split as-is, (b) be extended inside the
  policy sweep, or (c) move wholesale to an oxlint plugin rule? One rule must end with one home.
- Q17. Where do the plugin file and its tests live in this workspace's structure (workspace.md,
  tests.md), given the plugin must join the vendored `dist/host` set so `repair` propagates it
  fleet-wide, and given `.oxlintrc.json` must reference it by a path that exists in every target?
- Q18. Testing form: RuleTester (official toolchain harness) vs running the real oxlint binary over
  fixture trees, under the repo's no-mocks law and its conformance/config test taxonomy. Which
  project (config? conformance? a new one?) should own these tests fleet-wide?
- Q19. Anything in the anti-slop repository worth adopting that the matrix above misses, or any
  adopted claim whose blast radius on the wider fleet (not just this repo) the matrix
  underestimates. Name it concretely or state none.

## Unknowns

- Fleet-wide violation counts outside this repository are unmeasured; only this repo was swept.
  Flag any claim whose verdict depends on fleet state you cannot see.
- Whether oxlint jsPlugins reach `.vue` SFC script blocks is unprobed. If a ruling depends on it,
  state the dependency; do not guess.

## Scope

Read-only. No owned files. Report-only: your output is text returned to the Orchestrator.

## Execution

Perform the assignment directly. Spawn nothing. Do not edit files, run mutating commands, or
launch agents.

## Output

- The subjective lane returns its role file's shape (Design / Alternatives / Units / Tensions /
  Risks), arguing shape, naming, vocabulary, ergonomics, and fleet feel across C1–C15 and Q16–Q19.
- The objective lane returns one verdict per claim C1–C15 — CONFIRMED (with the evidence that
  convinced) or BROKEN (with the exact counter-evidence: file:line, measurement, or contract
  text) — then a reasoned recommendation per open question Q16–Q19. Attempt refutation first;
  drop any statement you cannot substantiate, and say you dropped it.

## Deviation contract

You are a read-only lane. A path that is missing or unreadable, a probe output that contradicts
what this brief states, or a rule file that does not say what this brief claims it says: report it
as a deviation finding in your output and continue with the rest. Do not investigate around it.

## Acceptance criteria

- Every claim C1–C15 carries a verdict with evidence; every question Q16–Q19 carries a
  recommendation with reasoning.
- No verdict rests on fleet state outside this checkout unless labelled as assumption.
- Nothing beyond the matrix's scope is proposed as new work except under Q19.

## Review evidence

The measurements this round rests on are in `tmp/design-lanes-evidence.md` with their exact
commands. The subject type is a proposal/ruling; the actual diff/status evidence class does not
apply — no code change exists yet.
