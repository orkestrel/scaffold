# Subjective-lane report (planner, Opus 5) — verbatim return

I read the brief, the evidence pack, `AGENTS.md`, the seven named rule files, `.oxlintrc.json`,
`tsconfig.json`, `package.json`, `tests/policy.test.ts`, the head of `tests/setupPolicy.ts`,
`src/core/constants.ts` (`HOST_PATHS`), `tests/config.test.ts` imports, and the anti-slop
`README.md`, `src/index.ts`, `src/rules/no-module-mocking.ts` + its test, and
`skills/install-anti-slop/SKILL.md`.

I held the **subjective** lane.

## Design

One law, one written home, two instruments, and a rule that decides which instrument owns what.

### The naming spine

The concept already has a term in this repository: **policy**. `tests/policy.test.ts`,
`tests/setupPolicy.ts`, `PolicyRule`, `PolicyViolation`, the `policy` Vitest project, and
architecture.md's "What the policy sweep proves" all use it. The oxlint plugin is the second
instrument of that same law, so it takes the same term rather than a new one.

- Plugin name: `policy`. Diagnostics read `error policy(no-mocking): …`, which tells a developer
  immediately that this is the fleet's convention law, enforced by the linter instead of the suite.
- Rejected: `orkestrel` (names the owner, and a diagnostic saying `orkestrel(...)` reads as coming
  from a dependency), `scaffold` (names the delivery vehicle, which is only a devDependency in a
  target), `anti-slop` (names someone else's philosophy).
- Rule ids keep the ecosystem `no-*` kebab form. `.oxlintrc.json` is a foreign schema whose every
  existing key (`no-var`, `prefer-const`, `consistent-type-assertions`) already uses it;
  introducing `policy/mock` beside `no-var` puts two naming systems in one map. The house one-word
  vocabulary stays where it belongs — inside the plugin's own identifiers and the sweep's
  `PolicyRule` union.

### The instrument rule

The matrix proposes "AST-local/token law to the plugin, placement/mirror law to the sweep." That
split is close but it does not decide the hard case. Use this instead, and write it down:

> **An instrument must not be suppressible by the thing it polices.** Everything else AST-local
> goes to the plugin; everything path-or-text-shaped, and anything whose subject is suppression
> itself, goes to the sweep.

That rule assigns all four proposed rules without judgment calls, and it is the reason
`no-suppression` moves (below).

### What ships

**`configs/policy.ts`** — one file, plain ESLint-shape default export, zero imports.

Home reasoning: the file's constraint profile is identical to `configs/helpers.ts` — vendored
byte-identical to every workspace, therefore forbidden from importing anything a core-only target
might lack. workspace.md already states that law for exactly that file and explains why.
`configs/` is also outside the policy sweep's population (`{app,src}/**` plus `tests/**/setup*.ts`
plus `tests/{app,src}/**/*.test.ts`), so no kind-table conflict. And tests.md already fixes where
a `configs/` leaf is proved: `tests/config.test.ts`. The placement law answers the testing
question for free.

This costs one amendment: workspace.md's "`configs/helpers.ts` and `configs/browsers.ts`: the only
permitted leaves under `configs/`" gains a third named leaf. That is a one-line honest amendment,
not a new structural concept.

Rejected home: a `tools/oxlint/` root (anti-slop's default). AGENTS.md's Project model enumerates
exactly four roots. Adding a fifth for one file is the largest design cost in the whole matrix and
it is the option that most reads as "we vendored someone else's repository."

**Rule shape inside the file.** The ESLint `create(context) { return { CallExpression(node) {…} } }`
form is structurally at odds with the no-nested-functions law — the visitor methods are function
expressions inside a function body, covered by neither stated exception. The matrix does not
mention this. Resolve it with an existing house idiom rather than an exception: `routes.ts` law
says a table maps to functions declared elsewhere and referenced by name, never to a function
expression written in place. So each visitor is a one-line context-binding arrow whose body is a
call to a named module-scope reporter:

- `create(context)` returns `{ CallExpression: (node) => reportMock(context, node) }`.
- `reportMock`, `reportPrivacy` hold the actual logic as named `{verb}{Noun}` leaves, independently
  readable and independently testable.

That leaves one residual adapter line per node type, which needs one sentence of sanction in
workspace.md § Tooling. That is the whole friction, and it buys back the difference between "we
vendored an ESLint plugin into a repo that bans that shape" and "we authored a plugin in this
repo's shape."

**Three rules, renamed.**

| Matrix name | Ship as | Why |
| --- | --- | --- |
| `no-mocking` | `no-mocking` | Correct. Our ban is wider than anti-slop's `no-module-mocking`, and the name says so. |
| `no-accessibility` | `no-keyword-privacy` | `no-accessibility` is a genuinely bad name in a repository with a browser environment and a styles bundle. Every human and every agent reads "accessibility" as a11y. The repo's term for this law is *privacy* ("Never use TypeScript `private`; use runtime-enforced `#` fields"), and the rule rejects the keyword form of it. |
| `no-directive` | `no-suppression` | "Directive" means `'use strict'` in JS and `v-if` in Vue. "Suppression" names exactly what is banned, matches documentation.md's "Never suppress a parity failure", and cannot be misread. |

**`no-mocking` is one rule with several `messageId`s**, not three rules. AGENTS.md states the law
in one sentence covering mocks, behavioral fakes, module replacement, framework spies, and fake
clocks; one law gets one rule and one config line. The messages differentiate: `mock`, `spy`,
`clock`, `stub`.

**The message text is the highest-leverage surface in this change.** It is what an agent reads
mid-task. tests.md already names every sanctioned replacement, so each message names the specific
one:

- `vi.fn` / `vi.spyOn` → "Use `createRecorder` from `@orkestrel/test`."
- `vi.useFakeTimers` / `vi.setSystemTime` → "Use a real short timer; `waitForDelay` from
  `@orkestrel/test`."
- `vi.mock` / `doMock` / `unmock` / `hoisted` → "Inject the collaborator; a missing seam is not an
  untestable truth."
- `vi.stubGlobal` / `stubEnv` → "Use a real implementation or a protocol-faithful fixture server."

A lint failure that names its own fix converts a red gate into an edit. A lint failure that says
"disallowed" costs a lookup.

`no-keyword-privacy` covers two AGENTS.md non-negotiables at once — the `#`-privacy law and "NEVER
put `readonly` on parameters" — because `constructor(private readonly x: string)` and
`constructor(readonly x: string)` are the same construct. Neither has any mechanical enforcement
today. Its message cites both.

**`no-suppression` goes to the sweep, not the plugin.** Two reasons, in order of force:

1. A file-level `/* oxlint-disable */` plausibly suppresses the plugin rule that bans it. If so,
   the rule is self-defeating in exactly the case it exists for, and every such file reports zero,
   which is indistinguishable from compliance. This needs a probe (R1), and the design should not
   wait on it: the sweep is not suppressible from inside a file, ever.
2. The check needs no AST at all. It is a substring scan, and it must cover files the sweep's
   current population misses and that the linter may not even lint — `configs/`, `scripts/`, root
   dotfiles, `vite.config.ts`. A flat text scan over a declared glob is exactly what the sweep is
   for. `PolicyRule` gains one member: `'suppression'`.

That also shrinks the plugin to two rules, which is the right size for a first vendored version.

**`.oxlintrc.json`** gains `jsPlugins: [{ "name": "policy", "specifier": "./configs/policy.ts" }]`,
two rule rows at `"error"`, and one `overrides` entry granting `configs/policy.ts` a default
export. Grant it by explicit filename, not by renaming the file to `policy.config.ts` to ride the
existing `*.config.ts` glob: an explicit row documents which file is permitted a default export
and why, where riding a glob is an accident the next rename breaks silently.

**Testing** is `tests/config.test.ts`, in the `config` project, in two layers:

1. RuleTester (`oxlint/plugins-dev`, an export of the already-installed `oxlint` — zero new
   dependencies) with valid and invalid cases per rule.
2. One real-binary wiring proof: run the repository's actual `.oxlintrc.json` over a
   `createScratch` fixture carrying one deliberate violation per rule, and assert each rule id
   appears in the output.

Layer 2 is not optional polish. RuleTester proves the rule object works; it cannot prove the
specifier resolves, the plugin loaded, or the rules are enabled. A vendored config whose specifier
is wrong is silently a no-op, and every rule then reports zero — which looks exactly like
compliance. quality.md's control law requires a control drawn from outside the instrument's
population; layer 2 is that control. C5 as drafted stops at layer 1.

`tests/config.test.ts` already imports `createScratch` from `@orkestrel/test/server` and drives a
real Vite `build`, so this project already spawns and drives real toolchains. Adding one oxlint
invocation is the same class of work in the same place.

**Label form:** each invalid case's `it` label carries `[membership: …]`, matching
`tests/policy.test.ts`'s existing `${control.label} [membership: ${control.membership}]`. One
label form across both instruments is real fleet-feel value.

### Verdicts

**ADOPT.**

- **C1 — Adopt, as shaped.** Plain-object, zero-dependency, `configs/policy.ts`, namespace
  `policy`, prior art read not vendored. The zero-dependency choice is not merely allowed by E6,
  it is *required* twice over: by the dependency non-negotiable, and by the byte-identical
  vendoring constraint that workspace.md already states for `configs/helpers.ts`. Vendoring
  anti-slop's files would also import its house style (semicolons, double quotes, two-space,
  `defineRule`) into a byte-identical fleet surface.
- **C2 — Adopt, as one rule with several `messageId`s and replacement-naming messages.** The wider
  ban (including `vi.spyOn`, which anti-slop deliberately permits) is correct: `createRecorder`
  exists precisely so a spy is never needed. Apply the rule tree-wide with no override; `vi`/`jest`
  only exist in tests, so a whole-tree rule costs nothing and catches a stray import in `src/`.
- **C3 — Adopt, renamed `no-keyword-privacy`.** Closes a non-negotiable with zero mechanical
  enforcement today, and closes the `readonly`-on-parameters law with it.
- **C4 — Adopt the ban, reject the home.** Renamed `no-suppression` and routed to the sweep.
- **C5 — Adopt, sharpened.** RuleTester per rule, plus the real-binary wiring control. Assert on
  rule id and `messageId`, never on message text.
- **C6 — Adopt.** Record the ruling in typescript.md § Types, one directive sentence, and say what
  `as const` *is* rather than that it is exempt: a literal-type suppression, not a type assertion,
  so the assertion ban does not reach it. Say where it earns its place (deriving a literal union
  from a value, fixing tuple arity) and where it does not (a `constants.ts` entry already typed
  `readonly string[]` and frozen). E3 shows two uses and six `satisfies`, so this is a vocabulary
  hole, not a mechanism hole, and it should not grow a rule.

**REJECT.** Each of C7–C14 is rejected, and the reasons matter more than the verdicts, because
they are what makes the standing constraint operational.

- **C7 `no-runtime-typeof` (64) — reject outright, not configure.** `validators.ts` is where
  `typeof` lives by law. The rule's `allowInTypeGuards: true` would cut most of the 64, and the
  residue sits in `parsers.ts`, which is legitimate coercion. Adopting it with an option would
  leave a rule that fires on the mechanism the repo mandates. It also presumes a schema library;
  adding one is a dependency, and hand-rolling one is banned outright ("Do not add a second parser
  or source-language analyzer").
- **C8 `no-unknown-parameters` (34) — reject.** It directly inverts a non-negotiable. This is the
  load-bearing philosophical difference between the two projects: anti-slop wants types at the
  boundary via schemas; this repo wants total guards taking `unknown`. Both are coherent; only one
  is this repository's.
- **C9 `no-unsafe-dictionary-type` (44) — reject.** patterns.md's foreign-contract law positively
  mandates the shape it bans: "Own a wide foreign record it merely carries and leave it
  unvalidated."
- **C10 `no-shape-in-symbol-names` (43) — reject with prejudice.** names.md fixes `*Shape` as a
  derivation form and architecture.md fixes `shapers.ts` as a centralized kind. Adopting this
  would rename a kind-table entry fleet-wide, break the sweep, and contradict
  `@orkestrel/contract`'s published vocabulary. It is the clearest illustration of why the user's
  standing constraint is right.
- **C11 `no-conditional-empty-object-spread` (36) — reject.** `exactOptionalPropertyTypes: true`
  is confirmed at `tsconfig.json:15`. Under it, `...(x === undefined ? {} : { y: x })` is the
  omission idiom that serves "Absence is `undefined`. Never invent sentinels."
- **C12 `no-reflect-get`/`no-reflect-apply` (4) — reject, and the matrix understates its own
  case.** With `as` banned outright, `Reflect.get` is the total-safe read off hostile `unknown`.
  The single site is not a bare hostile read: `src/server/helpers.ts:64` sits inside
  `matchesMissingPath(error: unknown): boolean`, a named, TSDoc'd, total helper whose docs
  explicitly claim totality for hostile values. The site is already well-shaped; there is no
  naming gap to close.
- **C13 assertion rules — reject on vocabulary, which is stronger than "subsumed."**
  `require-safety-comment-for-type-assertion` would institutionalize a `// SAFETY:` convention for
  a construct this repo bans entirely. A repository with zero assertions that ships a rule
  requiring comments on assertions is telling every reader that assertions are expected. That is a
  worse outcome than no rule.
- **C14 `no-known-value-widening` (47) — reject, and for a deeper reason than scale.** The rule
  mandates that inference or `satisfies` replace explicit annotation. That inverts the direction
  truth flows in this repository: "Types first. Public contracts precede implementation," and
  `*/types.ts` is authoritative with implementation conforming to it. `satisfies` makes the value
  the source of truth and the type a check. E3's six `satisfies` uses show the construct is
  available where it fits; mandating it would put the linter in contradiction with the most
  load-bearing design law.
- **C15 — reject both, on the standing constraint rather than on cost.**
  - `no-object-parameters`: no rule or law in this repository states a ban on `object` as a
    parameter type. It is anti-slop philosophy, and the standing constraint excludes it. Cost
    never enters.
  - `no-unknown-type-aliases`: this one nearly qualifies — a `type X = unknown` adds nothing but a
    name, which the wrapper test would delete. Reject anyway, because banning it forecloses a
    naming move the foreign-contract law wants available: a named alias for a carried, deliberately
    unvalidated foreign payload is the *honest* form of "own a wide foreign record and leave it
    unvalidated," and inlining `unknown` loses the name that says what the value is. If a bare
    alias ever reads as slop, that is a review finding under the wrapper test, which is not
    mechanically decidable in either direction.

### Open questions

**Q16 — Rule homes.** The split is right, but neither of the three stated options is. Adopt this:

- The **written law stays single-homed** in AGENTS.md and architecture.md. Only the instruments
  split.
- **Sweep keeps** the placement half: is a function declared at module scope in a file that
  permits functions. It must still descend into initializers to classify a nested arrow inside
  `constants.ts` — three of its existing negative controls exist for exactly that — so this is not
  separable and should not be moved.
- **Plugin takes** the body half wholesale: no function declaration or function-valued assignment
  inside any function body or method body, with the two stated exceptions. This is a pure
  AST-local question with no reference to path or file kind; the sweep reaches it today only
  accidentally.
- Do not extend the sweep to walk bodies. The moment a placement instrument walks bodies it
  becomes a general AST linter, and `PolicyRule = 'function'` would have to carry two meanings.
- The seam gets written down. architecture.md currently says the sweep "does not inspect
  class-expression members … cleanup and review enforce it." That sentence becomes false the day
  the plugin lands and must name the plugin instead.

Note this is *not* the same routing as `no-suppression`, and the difference is the instrument
rule: nested functions cannot suppress the tool that reports them; a disable directive can.

**Q17 — Home.** `configs/policy.ts`, vendored by adding one entry to `HOST_PATHS` in
`src/core/constants.ts` (not to `EXECUTABLE_PATHS`). Specifier `./configs/policy.ts`, which
resolves in every target because every generated manifest runs
`oxlint --config .oxlintrc.json … .` from the workspace root (`src/core/compilers.ts:295`) and
every target receives `configs/` (`configs/helpers.ts` is already in `HOST_PATHS`). Requires the
workspace.md third-leaf amendment and one `.oxlintrc.json` override row.

**Q18 — Testing form.** Both forms, in `tests/config.test.ts`, in the `config` project, as
described above. RuleTester is not a mock: it is the vendor's own harness running the real rule,
the same class of thing as `setupPolicy.ts` using the real `typescript` API. No new project. Not
`conformance` — that project's subject is drift from official tooling this package tracks, which
is a different question.

**Q19 — What the matrix misses.** Five items, in descending order of blast radius.

1. **The oxlint floor may not support the mechanism.** `src/core/constants.ts:367` declares
   `oxlint: '^1.77.0'` for every generated target. E1 measured `jsPlugins` and
   `oxlint/plugins-dev` on **1.78.0**. If 1.77.0 lacks either, the floor must move to `^1.78.0`,
   every target re-pins, and that is a manifest-surface move for scaffold under the publishing
   rules. Unmeasured, and checkable in one command.
2. **`tests/config.test.ts` is vendored byte-identical** (`HOST_PATHS`,
   `src/core/constants.ts:144`). Every rule test added there ships to every target. That is an
   *advantage* — the plugin's proof travels with the plugin — but it fixes two constraints: the
   tests must be fixture-only and must never read this repository's own sources, and they must
   assert on rule id and `messageId` so a message-text edit is not a fleet-wide test edit.
3. **"Pure regression guard" is true of this checkout and unmeasured elsewhere.** The ADOPT
   framing states zero violations from an E5 sweep of this repository, then generalizes.
   `.oxlintrc.json` is vendored byte-identical, so on the next `repair` every target inherits the
   rules. `vi.spyOn` is the single most common legitimate-looking test idiom in the ecosystem; a
   target carrying one goes red on re-pin. orchestration.md already anticipates this mechanism ("a
   vendored-only release can turn a green target red"), so the fix is sequencing, not retreat:
   sweep the fleet first, then release as a wave.
4. **Vue SFCs may be uncovered by both instruments.** The brief flags jsPlugin reach into `.vue`
   script blocks as unprobed; the sweep separately and deliberately excludes Vue from its
   placement population (its own control says so). If jsPlugins do not reach SFC script blocks,
   `no-keyword-privacy` is review-only inside every SFC in every browser target, and that limit
   must be written into architecture.md's companion paragraph rather than left implicit.
   Unprobeable here — this repository has no `.vue` files.
5. **Reject anti-slop's installer pattern outright.** The `install-anti-slop` skill and
   `scripts/install.mjs` are a second propagation mechanism for a job `scaffold repair`/`overwrite`
   already owns. documentation.md bans a skill carrying tooling policy, and two propagation
   mechanisms for one vendored surface is the drift the whole `HOST_PATHS` design exists to
   prevent.

Also worth noting from reading anti-slop's config, though outside the matrix: anti-slop ignores
agent directories and its own plugin path. This repository's `.oxlintignore` lists neither those
nor `tmp/`, and `tmp/probe/**` holds deliberately non-conforming throwaway probes that
`lint:check --deny-warnings .` would reach. I did not verify whether oxlint's default `.gitignore`
handling already covers it, so I am naming it as a question, not a finding.

### Deviation findings

- The brief's ADOPT preamble ("each reported ZERO violations on this tree, so each lands as a pure
  regression guard") states a measurement over this checkout and draws a conclusion over the
  deliverable's actual population, which is the fleet. Item 3 above.
- C12's description of `src/server/helpers.ts:64` as "a total-safe read off a hostile `unknown`"
  is accurate but understated; the site is wrapped in a named total helper with TSDoc claiming
  exactly that property. This strengthens the reject.
- Everything else in the brief and E1–E8 matched what I read first-hand. E7's account of
  `tests/setupPolicy.ts` is accurate.

## Alternatives

**A1 — No plugin. Extend the sweep with all four checks.** `tests/setupPolicy.ts` already loads
the real TypeScript API, already has the control-table idiom, is already vendored, and cannot be
suppressed from inside a file. Zero new mechanism, zero new config surface, one instrument, one
vocabulary.

Why the chosen design wins: feedback timing and population. The sweep runs at `npm test`; the
linter runs in the editor and at `lint:check`, which is where a developer and an agent actually
meet a shape violation, and it is the earlier of the two by minutes. The sweep's population also
deliberately excludes `configs/`, `scripts/`, and root files, and widening it turns a placement
instrument into a general analyzer. That said, A1 is right about `no-suppression`, and the design
already absorbs that: the one check whose subject is suppression itself goes to the sweep.

**A2 — Vendor anti-slop's plugin and configure only the rules we want.** Less code to write and to
maintain, MIT-licensed, already tested upstream, and the four adopted behaviors are two edits away
from its existing `no-module-mocking`.

Why the chosen design wins on three counts. It imports `@oxlint/plugins`, a dependency the user
did not request. It puts a foreign house style — semicolons, double quotes, two-space indent,
`defineRule`, and a rule shape that violates the no-nested-functions law — into a surface vendored
byte-identical to every fleet target. And it ties the fleet's lint gate to an upstream whose
philosophy this matrix rejects on eight of fifteen rules, so every scaffold release would have to
re-audit which of the fifteen became enabled by default. Two rules at roughly thirty lines each is
less total surface than a fifteen-rule vendored plugin plus its permanent suppression list.

## Units

Routing ledger is derivable from the role and engine on each unit. The plugin's implementation
goes to Sol because its judgment load is scope resolution, computed member access, aliased
imports, and parameter-property detection — the exact things anti-slop's own `no-module-mocking`
needed a visited-set resolver for. Every naming and message decision is fixed verbatim in U1
first, so no naming judgment is delegated across the split.

**U0 — Three probes.** Orchestrator-owned tracked commands. No dependencies. Note that `verifier`
cannot carry this: it has no write tools and these need fixture files.
- (a) Does a file-level `/* oxlint-disable */` suppress a jsPlugin rule?
- (b) Does oxlint 1.77.0 accept `jsPlugins` and export `oxlint/plugins-dev`?
- (c) Is `tmp/` reached by `lint:check` today?
- Acceptance: three recorded commands with their exact outputs. (a) gates U3's home; (b) gates
  whether `src/core/constants.ts:367` moves.

**U1 — The ruling and the vocabulary.** Role `implementer`, engine Opus 5. Owns
`.claude/rules/workspace.md`, `.claude/rules/architecture.md`, `.claude/rules/typescript.md`.
Depends on U0(a). Off-limits: everything else.
- workspace.md § Configuration authority admits `configs/policy.ts` as a third permitted leaf,
  with its zero-dependency reason stated as the existing leaf law states it.
- workspace.md § Tooling names both instruments of the policy law and the instrument rule that
  assigns work between them, and sanctions the one-line context-binding visitor adapter.
- architecture.md's "cleanup and review enforce it" sentence names the plugin.
- typescript.md § Types states the `as const` ruling (C6).
- Fixes verbatim, for downstream units: plugin name `policy`; rule ids `no-mocking`,
  `no-keyword-privacy`; every `messageId` and every message string; `PolicyRule` gains
  `'suppression'`.
- Acceptance: `npm run test:policy` and `npm run test:guides` green; no rule file restates
  another's rule; each added line is a directive naming an observable trigger and a required
  action.
- Note: `.claude/rules` is in `HOST_PATHS`, so this unit alone moves the published `dist/host`
  surface and obliges a scaffold bump.

**U2 — The plugin.** Role `implementer`, engine GPT-5.6 Sol. Owns `configs/policy.ts`,
`.oxlintrc.json`, `src/core/constants.ts` (the one `HOST_PATHS` row). Depends on U1 and U0(b).
Shared/report-only: none. Serialized after U1.
- Acceptance: `package.json` unchanged (zero new dependencies); `npm run lint:check` reports zero
  new findings on the tree; a deliberate-violation fixture fires both rules; `configs/policy.ts`
  passes `format:check`, `lint:check`, and `check`; neither authored rule can fire on the plugin's
  own source; the reporting logic sits in named module-scope functions with only a context-binding
  adapter in the visitor table.

**U3 — The suppression rule.** Role `implementer`, engine GPT-5.6 Sol. Owns
`tests/setupPolicy.ts`, `tests/policy.test.ts`. Depends on U1 and U0(a). Serialized after U2.
- Acceptance: `PolicyRule` gains `'suppression'`; the scan's glob is declared as an exported
  constant and covers `src`, `app`, `tests`, `configs`, `scripts`, and root config files; one
  `POLICY_CONTROLS` entry with a stated `membership` fires; `inspectPolicyWorkspace(process.cwd())`
  returns `[]`; `npm run test:policy` green.

**U4 — The rule tests.** Role `implementer`, engine GPT-5.6 Sol. Owns `tests/config.test.ts`.
Depends on U2. Serialized after U3.
- Acceptance: RuleTester valid and invalid cases per rule, each `it` labelled `[membership: …]`;
  one real-binary wiring proof through the actual `.oxlintrc.json` over a `createScratch` fixture
  asserting each rule id appears in the output; every assertion keyed on rule id or `messageId`,
  never on message text; no test reads this repository's own sources; the recorded failing count
  before U2's rules exist and the passing count after; `npm run test:config` wall clock recorded
  against its pre-change baseline.

**U5 — Fleet sweep.** Role `grok`, engine Cursor Grok. Read-only, no owned files. Runs in parallel
with U1.
- Acceptance: per-target counts with `file:line` for the Vitest/Jest mock-and-spy surface,
  TypeScript accessibility keywords and parameter properties, and `eslint-disable*`/
  `oxlint-disable*` directives, across every fleet target. Every target with a nonzero count
  named. This is the measurement the ADOPT framing currently assumes.

**U6 — Audits.** U1 (written by Opus) audits to `analyst`, engine GPT-5.6 Sol. U2, U3, U4 (written
by Sol) audit to `reviewer`, engine Opus 5, on design fit — rule ids, message text, vocabulary
consistency with `PolicyRule`, and whether the plugin file reads as this repository's code. Claims
stated as a numbered falsifiable list per `orkestrel-falsify`.

**U7 — Gates.** Role `verifier`, engine Sonnet. Runs
`format:check → lint:check → check → build → test` and reports exit codes and output. No fixes.

Release obligation, Orchestrator-owned and outside the units: this change moves `dist/host` (rules
files, `.oxlintrc.json`, `configs/policy.ts`, `tests/setupPolicy.ts`, `tests/policy.test.ts`,
`tests/config.test.ts`), so scaffold bumps and publishes, every target re-pins and runs `repair`,
and every target re-runs its gates. Sequence it as a release wave against U5's counts, not as a
flat pass.

## Tensions

Named for the objective lane to challenge.

1. **The namespace `policy` is shared** with the Vitest project, `tests/policy.test.ts`, and
   `PolicyRule`. I read that as one term for one concept across two instruments; it can be read as
   a collision that will send a developer seeing `policy(no-mocking)` to run `npm run test:policy`.
   Second choice if rejected: `canon`, which architecture.md already uses ("the fleet-canon
   register").
2. **Rule ids in ecosystem `no-*` kebab, not the house one-word vocabulary.** I ruled that
   `.oxlintrc.json`'s `rules` map is a foreign schema whose existing keys fix the form. The
   counter-reading is that a config option key is exactly what AGENTS.md's single-word law
   governs, and that `policy/mock` and `policy/privacy` would match `PolicyRule` exactly.
3. **`no-suppression` routed to the sweep, not the plugin.** This is my sharpest departure from
   the matrix and it rests on U0(a). If a plugin rule survives a file-level `oxlint-disable`, the
   case weakens to the population argument alone, which is still sufficient but no longer
   decisive.
4. **`configs/policy.ts` amends a stated rule** ("the only permitted leaves under `configs/`"). I
   chose amending one line over adding a fifth workspace root. The other lane may hold that a
   stated rule should bend for nothing and that `tools/` is the honest home.
5. **Rule tests in `tests/config.test.ts`** despite tests.md's "a test that spawns a process … is
   a proof, not a unit test, give it its own project." I ruled it stays because that file already
   drives a real Vite build and already imports `createScratch`, and because `configs/` leaves are
   proved there by the stated placement law. The measurable resolution is U4's recorded wall
   clock.
6. **The nested-function law splits across two instruments** rather than consolidating. I argued
   the seam is real (placement versus body) and that the sweep must descend into initializers
   regardless. The counter is that "one rule, one home" reads more naturally as one instrument.
7. **Two renames against the matrix**: `no-accessibility` → `no-keyword-privacy`, `no-directive` →
   `no-suppression`. Both are pure taste calls on collision risk in a repository with browser and
   Vue surfaces.
8. **C15 rejected on the standing constraint, not on maintenance cost.** The matrix framed it as a
   cost question. I ruled cost never enters, because neither rule encodes a convention this
   repository states. If the objective lane finds that `no-unknown-type-aliases` *is* backed by
   the wrapper test, my rejection rests only on the foreign-contract naming argument.
9. **One file with a stated growth threshold** rather than `configs/policy/` with an index. The
   threshold: at five rules, or when any single rule exceeds roughly a screen, it earns a
   directory.

## Risks

**R1 — A plugin rule may be suppressible by the directive it bans.** Design-fit consequence: if
`no-suppression` lives in the plugin, it is defeated in exactly the file that needs it, and that
file reports clean. Evidence: U0(a) — one fixture with a file-level `/* oxlint-disable */` and one
deliberate violation, run through the real config. The design already routes around this; the
probe decides whether the routing was necessary or merely correct.

**R2 — The declared oxlint floor may not carry the mechanism.** `src/core/constants.ts:367`
declares `^1.77.0`; every measurement in the evidence pack was taken on 1.78.0. Evidence: U0(b).
If it fails, the floor moves, every target re-pins, and the change acquires a manifest-surface
move it was not scoped for.

**R3 — The fleet's violation counts are unmeasured.** Three of the four proposed adopts are
described as pure regression guards on the strength of a sweep of one repository, and the
mechanism that delivers them is byte-identical vendoring to every target. Evidence: U5. Design-fit
consequence if counts are nonzero: this stops being a regression guard and becomes a fleet
migration, which changes the release shape and possibly the order of adoption (ship
`no-keyword-privacy` first, `no-mocking` after the targets are clean).

**R4 — Vue SFCs may fall outside both instruments.** The sweep excludes Vue from its placement
population by design; jsPlugin reach into `<script setup lang="ts">` is unprobed and unprobeable
in this checkout. Evidence: a probe in a browser-environment target, which does not exist here.
Design-fit consequence: either the privacy law holds inside SFCs or it does not, and whichever is
true has to be a written sentence rather than a silent gap, because a silent gap in a browser
target reads identically to coverage.

**R5 — Vendoring the rule tests couples every target to the plugin's internals.**
`tests/config.test.ts` is byte-identical fleet-wide, so a message-text edit becomes a fleet-wide
test edit and a rule rename becomes a breaking change for every target's `config` project.
Mitigation is in U4's acceptance: assert on rule id and `messageId` only. Evidence needed: none —
this is a design constraint to hold, not a question to settle.

**R6 — The plugin is linted and formatted by the tools it configures.** A rule that could fire on
the plugin's own source is circular and would be discovered only at the moment the plugin ships.
Neither `no-mocking` nor `no-keyword-privacy` can fire on it, but that is a property to check, not
to assume. Evidence: it is an acceptance criterion in U2.

**R7 — `tmp/` may be inside the lint population.** A live probe under `tmp/probe/` is deliberately
non-conforming, and `lint:check --deny-warnings .` would reach it if oxlint's default ignore
handling does not. I did not verify whether `.gitignore` covers it at the linter level, so this is
a question rather than a finding. Evidence: U0(c). Outside the matrix; raised under Q19 only.
