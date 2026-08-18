# Adoption ruling: anti-slop oxlint plugin audit

Reconciled by the Orchestrator from two blind lanes over one brief — `planner` (Opus 5, subjective,
native subagent) and `analyst` (GPT-5.6 Sol, objective, journaled CLI session
01a01488-59fe-7662-8f5f-d35edc1f6ba5) — plus ten Orchestrator probes (`design-lanes-evidence.md`,
E1–E10). Subject: the vendored `dmmulroy/anti-slop` oxlint plugin (MIT). Standing constraint from
the user: adopt only what enforces conventions this repository already states.

## Verdict summary

Adopt the mechanism and three enforcement rules, all encoding existing non-negotiables, all at
zero new dependencies, all zero-violation on this tree. Reject eleven of anti-slop's fifteen rules
as doctrine conflicts and two as policy imports. Both lanes agree on every rejection; the adopted
design below reconciles their divergences, each fork settled by a probe or a cited law.

## Adopt

**A1 — The mechanism.** An Orkestrel-authored oxlint JS plugin, plain ESLint-shape default export,
zero imports, registered through `jsPlugins` in `.oxlintrc.json`. Namespace `policy` — the term the
repository already uses for this law (`tests/policy.test.ts`, `PolicyRule`, the `policy` project);
diagnostics read `policy(no-mocking)`. Home `configs/policy.ts`: its constraint profile is
identical to `configs/helpers.ts` (vendored byte-identical, so it may import nothing), it sits
outside the sweep's population, and the stated placement law already routes its proof to
`tests/config.test.ts`. Vendored fleet-wide by one `HOST_PATHS` row. Anti-slop's code is prior art
to learn from (scope resolution, alias resolution with visited sets), never a vendored import — a
vendored copy would bring `@oxlint/plugins` (an unrequested dependency), a foreign house style, and
a rule shape that violates the no-nested-functions law. Probes: E6 (plain object works), E9 (rules
reach Vue SFC script blocks with correct line mapping), E10b (the declared `^1.77.0` fleet floor
already carries `jsPlugins` and `oxlint/plugins-dev` — no manifest-surface move).

**A2 — `policy/no-mocking`.** One rule, several `messageId`s, banning exactly the surface the
canon names (AGENTS.md: mocks, module replacement, framework spies, fake clocks): `vi.mock`,
`vi.doMock`, `unstable_mockModule` (module replacement); `vi.fn`, `vi.spyOn` (mock functions and
spies); `vi.useFakeTimers`, `vi.setSystemTime` (fake clocks); `vi.stubGlobal`, `vi.stubEnv`
(global/env replacement); and the jest equivalents. Deliberately wider than anti-slop's rule,
which allows `vi.spyOn` — our canon does not. Deliberately narrower than the first draft: Sol's
objection sustained on `vi.unmock` and `vi.hoisted`, which the canon does not name (and which are
dead constructs once `vi.mock` is banned). Every message names the sanctioned replacement, so a
red gate converts to an edit: `createRecorder` from `@orkestrel/test` for spies, `waitForDelay`
for clocks, an injection seam for module mocks, a protocol-faithful fixture for stubs. Tree-wide,
no override. Current violations: zero (E3, E5).

**A3 — `policy/no-keyword-privacy` plus one built-in.** The custom rule bans the TypeScript
`private` member keyword (canon: "NEVER use TypeScript `private`; use runtime-enforced `#`
fields"). Constructor parameter properties — `private`/`public`/`protected`/`readonly` on
constructor parameters, the "readonly on parameters" non-negotiable included — are covered by
enabling the built-in `typescript/parameter-properties` instead of custom code (probed working).
`protected` and `public` member modifiers stay legal because the canon does not name them; see
Open decisions. Current violations: zero (E3).

**A4 — `'suppression'` in the policy sweep, not the plugin.** Ban `eslint-disable*` and
`oxlint-disable*` directives (canon bans `eslint-disable`; `oxlint-disable` is the same suppression
under the repository's named linter). Probe E10a settled the home beyond argument: a file-level
`/* oxlint-disable */` silently suppresses jsPlugin rules — zero findings, clean exit — so a
plugin-homed ban is defeated in exactly the file that needs it. The sweep cannot be suppressed
from inside a file, and its text scan covers files the linter never reaches (`scripts/`, root
configs). `PolicyRule` gains `'suppression'`; the scan glob becomes an exported constant. This
rule is load-bearing for everything else: it is what makes every other lint rule's zero
trustworthy. Current violations: zero (E3).

**A5 — Test discipline (anti-slop's genuinely adoptable engineering).** Both layers live in
`tests/config.test.ts` under the `config` project (tests.md fixes that home: `configs/` leaves are
proved beside the configuration they produce). Layer 1: RuleTester (`oxlint/plugins-dev`, an
export of the installed oxlint — zero new dependencies) valid and invalid cases per rule, labels
carrying `[membership: …]` to match the sweep's control idiom. Layer 2: one real-binary wiring
control — run the repository's actual `.oxlintrc.json` over a `createScratch` fixture carrying one
deliberate violation per rule and assert each rule id appears. Layer 2 is the control that catches
a silently no-op config (wrong specifier, plugin not loaded, rule not enabled — all of which
report zero and read as compliance). Assert on rule ids and `messageId`s only, never message text:
the test file is vendored byte-identical, so a text assertion makes every wording edit a
fleet-wide test edit. Caution absorbed from the audit itself: three of anti-slop's fifteen rules
ship with no test at all — prior art, not gospel.

**A6 — Record the `as const` ruling.** E2 proved the installed `consistent-type-assertions:
"never"` exempts `as const` while the prose ban is silent; the tree carries two uses. The
exemption must become a written sentence in `.claude/rules/typescript.md` either way. The lanes
split on direction — see Open decisions; the Orchestrator recommends sanctioning it explicitly.

## Reject

Every rejection is confirmed by both lanes independently. Counts are findings on this tree (E5).

| Rule | Count | Reason |
| --- | --- | --- |
| `no-runtime-typeof` | 64 | `typeof` inside total guards and parsers IS our boundary parsing; the rule presumes a schema library the dependency law forbids |
| `no-known-value-widening` | 47 | Mandates value-first inference/`satisfies`; inverts "types first — contracts precede implementation"; the 47 include deliberate hostile-data annotations |
| `no-unsafe-dictionary-type` | 44 | patterns.md positively mandates carrying wide foreign records unvalidated; `Record<string, unknown>` is the honest owned-JSON type |
| `no-shape-in-symbol-names` | 43 | Attacks fleet vocabulary: `*Shape` derivation form (names.md), `shapers.ts` kind (architecture.md), `@orkestrel/contract`'s `ContractShape` |
| `no-conditional-empty-object-spread` | 36 | `...(x === undefined ? {} : { y })` is the sanctioned omission idiom under `exactOptionalPropertyTypes` and absence-is-`undefined` |
| `no-unknown-parameters` | 34 | Directly inverts "accept `unknown` and narrow with guards" — the load-bearing philosophical difference between the two projects |
| `no-unknown-returns` | 5 | All five are test-infrastructure boundary loaders where returning `unknown` is honest; the caller narrows |
| `no-reflect-apply` / `no-reflect-get` | 4 | With assertions banned outright, `Reflect.get` is the total-safe read off hostile `unknown` (`matchesMissingPath`, a named total helper); their rules assume asserted access remains available |
| `require-safety-comment-for-type-assertion` | 0 | Would institutionalize a SAFETY-comment convention for a construct we ban entirely — teaches readers assertions are expected |
| `no-chained-type-assertions`, `no-widen-then-assert` | 0 | Subsumed by `consistent-type-assertions: "never"` for everything but `as const`, which A6 rules on directly |
| `no-object-parameters`, `no-unknown-type-aliases` | 0 | No stated convention bans either construct — adopting them imports anti-slop policy, which the standing constraint excludes; the alias ban would also foreclose the honest named-foreign-payload form |

Also rejected: anti-slop's installer-skill propagation pattern (`install-anti-slop` +
`install.mjs`). `scaffold repair`/`overwrite` already owns vendored-surface propagation; a second
mechanism for the same surface is the drift `HOST_PATHS` exists to prevent.

## Divergences reconciled

- **Suppression home** (planner: sweep; Sol: plugin) → sweep, settled by probe E10a.
- **Plugin home** (planner: `configs/policy.ts`; Sol: `tests/setupLint.ts`) → `configs/policy.ts`.
  `setup*.ts` files are test infrastructure by the tests contract; a lint plugin is configuration
  tooling, and the `configs/` leaf law already carries the exact vendoring constraint this file
  needs. Costs one one-line amendment to workspace.md's permitted-leaves sentence.
- **Test home** (planner: all in `config`; Sol: RuleTester in `policy`, binary in `config`) → all
  in `config`. tests.md states the placement law verbatim: `configs/` leaves are proved from
  `tests/config.test.ts`. The `policy` project's subject is the placement law, not lint tooling.
- **Mock-rule surface** (planner: include `unmock`/`hoisted`; Sol: canon does not name them) →
  Sol's letter-of-canon reading wins; the two ride out transitively once `vi.mock` is banned.
- **Privacy-rule surface** (planner: ban `public`/`protected` too; Sol: canon names only
  `private`) → Sol wins under the standing constraint; widening is an open canon decision below.
- **Rule ids** (`no-*` kebab vs house one-word) → ecosystem `no-*` form: the `.oxlintrc.json`
  rules map is a foreign schema whose every existing key already uses it. The house vocabulary
  governs the plugin's own identifiers and `PolicyRule`.
- **Visitor shape** — the plugin's visitor table holds one-line context-binding arrows delegating
  to named module-scope `report{Noun}` leaves (the `routes.ts` idiom), so the plugin itself honors
  the no-nested-functions law it polices; the one residual adapter line gets a sanctioning
  sentence in workspace.md § Tooling.

## Phase-2 candidate (not in the first ship)

Move the nested-function body law into a third plugin rule. Today the sweep enforces it at module
scope and inside directly-passed callbacks only — declared-function and class-method bodies are
review-only (E7). The plugin sees every body naturally and reaches Vue SFC script blocks (E9). The
sweep keeps module-scope placement including initializer classification (its negative controls
exist for exactly that); architecture.md's "cleanup and review enforce it" sentence then names the
plugin. Second ship, so the first stays two rules and small.

## Open decisions (user)

1. **Proceed to implementation?** The change moves the published `dist/host` surface
   (`.oxlintrc.json`, `configs/policy.ts`, `tests/setupPolicy.ts`, `tests/policy.test.ts`,
   `tests/config.test.ts`, rule files), so it obliges a scaffold bump and a fleet re-pin/repair
   wave. Prerequisite: a fleet-wide staged sweep (per-target counts for the mock/spy, accessibility,
   and directive surfaces) before any rule turns on — this repo's zeros are measured; the fleet's
   are not, and `vi.spyOn` is the likeliest fleet-wide friction.
2. **`as const` direction.** Sanction explicitly (recommended: it is sound narrowing, never
   widening; the installed rule already exempts it; two uses exist; the lint help text itself
   steers to `satisfies`/annotation) — or ban it and fix the two sites. Either way the ruling
   becomes one sentence in typescript.md.
3. **Widen the privacy canon?** Ban `protected`/`public` member modifiers too (planner's position)
   or keep the canon's letter (`private` only). Widening needs an AGENTS.md-level amendment first.
4. **Ban the `object` type?** One config line of built-in `typescript/no-restricted-types` — but
   only if the canon first states the invariant; today it would be a policy import.
5. **Namespace.** `policy` (recommended) or `canon` if the shared term with the Vitest project
   reads as a collision.

## Routing ledger and bench record

Absorption and zip audit: Orchestrator inline, per the user's explicit read-fully instruction
(recorded deviation from the Grok-first default). Subjective lane: `planner`, Opus 5, native.
Objective lane: `analyst` route, GPT-5.6 Sol, journaled CLI (thread
01a01488-59fe-7662-8f5f-d35edc1f6ba5); bench recovered mid-session via device auth (user approved)
and recorded live on a bounded round trip; the MCP transport stayed dark all session (401 — server
process predates the login). Probes: Orchestrator tracked commands (E1–E10). No lane saw the
other's answer; both ran on one brief. Campaign artifacts stay in this folder until the follow-up
implementation campaign closes; git history is the archive.

---

# Implementation addendum (accepted campaign, same branch)

The user authorized implementation with spirit rulings where round 1 left decisions open. What
landed, and where it corrected round-1 rulings:

- Landed as designed: `configs/policy.ts` (plugin `policy`; zero imports; `no-mocking` with
  messageIds mock/spy/clock/stub incl. computed literal and single-quasi template access;
  `no-keyword-privacy` for `private`/`protected` incl. abstract variants), `.oxlintrc.json` wiring
  plus built-ins `typescript/parameter-properties` and `typescript/explicit-member-accessibility`
  (`no-public`), the `HOST_PATHS` row, the sweep's `'suppression'` rule with composed tokens and
  in/out-of-population controls (root arm extensions equal to the directory arm), RuleTester cases
  plus the real-binary wiring proof, and `inspectPolicyConfiguration` proving no override or
  ignore pattern weakens the wiring (injected-override negative control).
- Corrections to round-1 rulings, each taken with the user's spirit authorization and carried
  through the adversarial audit: the privacy ban widened to all three accessibility modifiers and
  parameter properties, homed in AGENTS.md's non-negotiable (superseding this report's
  "protected and public stay legal" and open decision 3); the former readonly-parameters
  non-negotiable folded into it as subsumed; `as const` ruled sanctioned in typescript.md
  (open decision 2, sanction direction); campaign records under `.orkestrel/` exempted from the
  format gate via `.prettierignore`.
- Audit round: two blind lanes (Opus subjective, Sol objective), both FAIL on first pass; five
  reproduced findings (wiring-instrument override blindness, root-arm suppression gap,
  template-literal access escape, dead type exports, three prose drifts incl. a false routes.ts
  identity claim and the stale root privacy line) all fixed with pinned regression proofs;
  verdicts retained verbatim in this folder.
- Still open, unchanged: fleet-wide violation counts are unmeasured; the release wave (scaffold
  bump, publish, per-target re-pin + repair + gates) is the user's decision and follows the
  release-wave law. Phase-2 candidate (nested-function body law as a third plugin rule) remains
  unscheduled.
