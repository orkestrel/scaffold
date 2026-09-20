# Unit plan-v2 — design round on the refined Veneer execution plan

## Role and lane

Two lanes read this brief blind to each other. The **subjective** lane is `planner` on Opus 5,
run as a native Claude subagent (read-only: `Read`, `Grep`, `Glob`; no shell). The **objective**
lane is `analyst` on `gpt-6-astra` through `codex exec --sandbox read-only`, rooted at
`C:/Users/mikes/WebstormProjects` (shell available, network denied, no writes). Your dispatch names
which lane you hold; say which one you held at the top of your answer.

Perform the assignment directly and spawn nothing.

## Subject

A policy, design, and process proposal: the refined Veneer execution plan at
`scaffold/.orkestrel/veneer/plan.md`, written 2026-09-20 by the Orchestrator after reading the
tenets, the prior handoff, the retained research, the Scaffold rules and skills, and the Veneer,
Elements, Mailbox, Test, and Roughnotes checkouts. It replaces the 2026-09-19 plan, retained at
`scaffold/.orkestrel/veneer/superseded/plan-2026-09-19.md`.

The proposal's canon: `scaffold/tenets.txt` (the user's requirements, highest), `scaffold/AGENTS.md`,
`scaffold/.agents/orchestration.md`, every `scaffold/.claude/rules/*.md`, and the skills under
`scaffold/.agents/skills/` the plan binds. The record of what motivated it: `scaffold/prompt.txt`
(the prior session's handoff — its line "run Opus 5 through Cursor's model route" is superseded by
the user's 2026-09-20 instruction that Cursor carries Grok only) and
`scaffold/.orkestrel/veneer/research.md` with its `research/` readings.

What the Orchestrator changed from the old plan, so you can attack the rulings rather than
rediscover them:

- Reordered the foundation: Workspace adoption, then Visual calibration beside it, Token contract,
  Compatibility ledger beside it, Instrument probes, Test gaps, Button.
- Dissolved the "Journey pilot" unit into Orchestrator-owned instrument probes (U5) and the Button
  unit (U7), on the ground that a synthetic pilot measures the harness rather than the product.
- Replaced the generated, explicitly refreshed PostCSS inspection data with a live bidirectional
  CSSOM parity test; dropped `TokenGroup`, `tokenGroups`, `renderTokensCss`, and the TypeScript
  value registry; kept a frozen name map in `src/core`.
- Fixed the styles axis as a separate wrapper because Scaffold content-owns the root
  `vite.config.ts` and `tsconfig.json`.
- Added a conformance project with runtime-boundary controls, an oracle project that runs official
  Bootstrap JavaScript in isolation and records expectations under an explicit refresh flag, and a
  Veneer consumer page in the distribution stage.
- Deletes the legacy itemized tree at the first U1 step and points at `fc36cec`.
- Takes managed Chromium and Edge as the two receipts because Chrome is not installed.
- Fixed the routing: Cursor carries Grok 4.6 only; Codex runs `gpt-6-astra` only; Opus lanes are
  native.

## What the round decides

Whether U1 is dispatched from this plan as written. A `PASS` starts Workspace adoption on it; a
`FAIL` sends the named claims back into the plan before any unit launches. A defect found here costs
an edit; the same defect found in U3 costs a unit and its audit round.

## Already established — do not re-run

The Orchestrator verified these directly, not from a writer's report:

- Bench liveness 2026-09-20: `codex exec` on `gpt-5.6-sol` and the Cursor versioned entry on
  `cursor-grok-4.6-high` both answered a bounded probe. Astra is the model the user requires; this
  round is its first dispatch of the session.
- `scaffold/src/core/compilers.ts:924-1080`: `tsconfig.json`, `vite.config.ts`, and every planned
  `configs/src/*.config.ts` and `configs/app/*.config.ts` are `content`-owned; `README.md` and
  `configs/app/vite.journey.config.ts` are `birth`-owned; `tests/distribution.test.ts` is plan-owned.
- `scaffold/tests/setupPolicy.ts:239-246` and `stemToPolicyCandidates`: a mirrored test resolves
  its module through `.ts`, `.vue`, `.scss`, `.css`, and leading-underscore partials; the rule runs
  test-to-module only.
- `roughnotes/vite.config.ts:305-316`: the `probe` project pins `pool: 'threads'`.
- Host: Chrome absent; Edge `153.0.4234.48` present; Playwright managed `chromium-1234` present.
- Registry 2026-09-20: `@orkestrel/test` `0.0.18`, `@orkestrel/contract` `0.0.17`,
  `@orkestrel/scaffold` `0.0.75`, `vitest` `5.0.1`, `playwright` `1.63.0`, `sass` `1.104.1`,
  `tailwindcss` `4.3.3`, `bootstrap` `5.3.8` with the digest the plan records.
- Repositories clean: Veneer `fc36cec`, Elements `3b41900`, Mailbox `8b54542`, Test `f49bc7f`.

## Review evidence and the path table

The subject is a proposal with no diff. Read it and its canon at these paths. The subjective lane
reads absolute Windows paths under `C:/Users/mikes/WebstormProjects/`; the objective lane reads the
same paths relative to its `-C` root, which is that folder.

| Evidence                         | Path                                                                                  |
| -------------------------------- | ------------------------------------------------------------------------------------- |
| The proposal                     | `scaffold/.orkestrel/veneer/plan.md`                                                  |
| The superseded plan              | `scaffold/.orkestrel/veneer/superseded/plan-2026-09-19.md`                            |
| The user's requirements          | `scaffold/tenets.txt`                                                                 |
| The prior handoff                | `scaffold/prompt.txt`                                                                 |
| The research index and readings  | `scaffold/.orkestrel/veneer/research.md`, `scaffold/.orkestrel/veneer/research/*`     |
| Coding contract and rules        | `scaffold/AGENTS.md`, `scaffold/.claude/rules/*.md`                                   |
| Orchestration                    | `scaffold/.agents/orchestration.md`                                                   |
| Skills the plan binds            | `scaffold/.agents/skills/{orkestrel-harden-package,orkestrel-align-packages,orkestrel-prove-journey,orkestrel-falsify,enterprise-bootstrap}/` |
| Scaffold's own guide and source  | `scaffold/guides/scaffold.md`, `scaffold/src/core/*.ts`, `scaffold/src/server/*.ts`, `scaffold/tests/setupPolicy.ts`, `scaffold/dist/host/tests/config.test.ts`, `scaffold/dist/host/guides/*.md` |
| Test's surface                   | `scaffold/guides/test.md`, `scaffold/node_modules/@orkestrel/test/dist/src/{core,browser}/index.d.ts` |
| Veneer as it stands              | `veneer/` (tree at `fc36cec`; no `node_modules`)                                      |
| Prior art                        | `elements/src/**`, `elements/guides/**`, `elements/ROADMAP.md`, `mailbox/src/**`, `mailbox/guides/**` |
| A generated browser application  | `roughnotes/` (journey axis, `configs/browsers.ts`, `tests/conformance.test.ts`)       |

## Numbered falsifiable claims

Read and rule on every claim in `scaffold/.orkestrel/veneer/plan-v2-audit-claims.md`. Both lanes rule on
every claim; the objective lane is primary on claims 3, 4, 6, 7, 10, and 11, the subjective lane on
claims 1, 2, 9, and 12, and both are equal on 5 and 8. Do not skip a claim because the other lane
is primary on it.

## Unknowns

- Whether Chromium's `CSSStyleDeclaration` enumerates custom properties for a `:root` rule read
  through `document.styleSheets`. Neither lane can run a browser; rule claim 3 `UNRESOLVED` if you
  cannot settle it from a primary source you can read, and name the probe that settles it.
- Whether API Extractor's roll-up keeps a `vue` type import as an external specifier in the rolled
  `index.d.ts` rather than inlining it. Read `scaffold/configs/helpers.ts` (`declarationRollup`) and
  the installed `@microsoft/api-extractor` declarations under `scaffold/node_modules` if you need to.
- Whether the audit's `projects` question fires on a `test:*` script that names a configuration
  the target holds but no `--project`. Read the audit's source in `scaffold/src/server/*.ts`.

## The threshold

A finding is worth more than a clean pass. A defect in this plan reaches every unit built on it;
the cost of one more edit here is nothing beside a misbuilt foundation unit and its audit round.

## Output

Part A, both lanes: the verdict shape `scaffold/.agents/skills/orkestrel-falsify/SKILL.md`
§ Verdict shape fixes — numbered verdicts one per claim in order, each `CONFIRMED` (with the attack
you tried that failed), `BROKEN` (with the falsifying input, state, or reading and the smallest
correct fix to the plan text), or `UNRESOLVED` (with what would settle it); then findings fitting
no claim, each substantiated to the `BROKEN` standard; then attacked-and-held; then exactly one
terminal line, `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <finding ids>`.

Part B, after the terminal line: the sections your role file names, filled as amendments to the
plan rather than a rewrite. The subjective lane fills `Design`, `Alternatives`, `Units`,
`Tensions`, and `Risks`. The objective lane fills `Constraints` (with `file:line`), `Refusals`
(quoting the rule text), `Measurements`, `Units`, `Tensions`, and `Risks`. Leave a section your
lane does not own empty. Keep every amendment concrete: the plan section, the line to change, and
the replacement text.

No process diary. No summary of what you read. Your final message is the whole answer; write no
file.
