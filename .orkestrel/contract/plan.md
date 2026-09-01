# Campaign plan — method memoization for @orkestrel/contract

Objective: read and verify the Zod 4.5 method-memoization article, measure what the pattern
buys against this package's design, and land the improvement the evidence earns, on the
`claude/method-memoization-contracts-yus26p` branch in the contract and scaffold repositories.

Started 2026-09-01. Orchestrator: the Claude Code session engine, per the harness table in
`.agents/orchestration.md`.

## Bench liveness record

- Codex (Sol): CLI absent at session start; installed v0.152.0 through the documented cloud
  setup (`npm install -g @openai/codex`, exit 0). `codex login status` reports no credential.
  Device-auth recovery started; verification surfaced to the user (code O259-T0V2P,
  `https://auth.openai.com/codex/device`, 15-minute expiry). The device code expired unapproved
  (`device auth timed out after 15 minutes`, watcher fired 2026-09-01). Recorded dark for the
  campaign; the fallback in the routing ledger stands. A fresh login issues on the user's
  request.
- Cursor (Grok): CLI v2026.08.25 resolves. The user directed authentication through the API
  token; `CURSOR_API_KEY` is present (presence checked, value never read). LIVE on a bounded
  round-tripped model call 2026-09-01: `cursor-agent -p --trust --mode=ask --model
  cursor-grok-4.6-high` returned `alive` (journal `tmp/cursor/probe.log`). The interactive
  login flow was abandoned and its watcher stopped. Absorption units before this instruction
  ran on the recorded Sonnet fallback; reading-heavy units from here route to `grok`.
- Probe MCP server: absent from the session at start because no `node_modules` existed.
  Dependencies installed (`npm ci`, both repositories, exit 0); the server handshakes through a
  user-scope wrapper registration (probe 0.0.10, initialize round trip captured). The session
  harness has not connected it mid-session; the fallback instruments of
  `.claude/rules/tests.md` § Probes govern until it appears.

## Routing ledger

| Unit | Lane or job | Role | Engine | Substitution record |
| ---- | ----------- | ---- | ------ | ------------------- |
| absorb-zod | bounded primary-source research | `researcher` | Sonnet | Grok dark (no login), Luna dark (Codex no login), ladder lands on Sonnet |
| absorb-terrain | repository reconnaissance | `scout` | Sonnet | same ladder record |
| absorb-ecosystem | ecosystem evidence | `orkestrel` | Sonnet | native by design, no substitution |
| probe-baseline | Orchestrator-owned probe | Orchestrator | session engine | instruments in scratchpad, outputs retained |
| design-memoization, subjective lane | creative design | `planner` | Opus 5 | none |
| design-memoization, objective lane | objective analysis | `planner` role file | Opus 5 | Sol dark; the remaining engine runs every lane, clean contexts, blind |

| design audit inputs | verified findings | Orchestrator probes | session engine | `dead-memo.mjs` and `memo-attribution.mjs`, controls passing, retained here |
| M1 dead tracking memos | objective implementation | `implementer` | Opus 5 | Sol dark recorded; the objective unit routes to the remaining engine |
| M2 release sentinels | objective implementation | `implementer` | Opus 5 | same record |
| M4 retention prose | documentation-voice implementation | `implementer` | Opus 5 | native route, no substitution |
| per-unit audit, subjective lane | design-fit audit | `reviewer` | Opus 5 | none |
| per-unit audit, objective lane | correctness audit | `reviewer` role file | Opus 5 | Sol dark; the remaining engine runs every lane, clean contexts, blind |
| audit mechanics | mechanical conformance | `checker` | Sonnet | dispatched where criteria are mechanical |
| gates | gate evidence | `verifier` | Sonnet | none |

## Reconciled design (2026-09-01)

The lanes returned independently convergent rulings; the reconciliation:

- **Lazy `createContract` bundle — excluded on evidence.** Both lanes reject. Grounds, each
  sufficient: a first-read refusal escapes the `contain` door attribution
  (`compilers.ts:368`); the LOCKSTEP ownership snapshot moves from call time to first-read
  time (`types.ts:998-1002`); a long-lived partially read bundle retains the compiler, node
  index, and plans — strictly more than the eager bundle, whose members are self-contained and
  let the compiler collect; the probe measured Zod's self-overwriting-getter caching throwing
  on a frozen instance, and the bundle's freeze is pinned
  (`tests/src/core/ContractCompiler.test.ts:103`). Subjective grounds beside them: door-time
  refusal, inspectability, spread semantics.
- **M1, adopt — remove the dead build-time tracking memos.** `#trackGuard`
  (`ContractCompiler.ts:522-547`) and `#trackFaults` (`555-581`) allocate a `WeakMap` at build
  that the first call always replaces (`filled` starts 0; the scope tag is never 0 inside the
  closure). Verified statically and by the instrumented run (`dead-memo.out`: build-phase track
  memos never touched through `get`, `set`, or `has`; call-phase replacements show reads and
  writes — the instrument's control). The dead map is captured by every published guard,
  auditor, and reporter closure.
- **M2, adopt — hoist the release peers to `static readonly #` fields.** The constructor's
  paired empty arrays and `WeakMap` peers (`ContractCompiler.ts:146-175`, `192-211`) become
  class-scope frozen sentinels beside `static readonly #weakMap`; `#emptyIndex` is dropped and
  `#index` becomes `WeakMap | undefined`, with an explicit undefined refusal in `#locate` —
  the bare `Reflect.apply(recall, undefined, …)` at `466` would otherwise throw an uncoded
  TypeError, a correction to the objective lane's sketch taken from a first-hand read. The
  no-write-after-release proof: every collection writer sits behind `#prepare`, which refuses
  when `#source` is undefined, and `#release` clears `#source` in the same run.
- **M4, adopt — publish the retention rule.** TSDoc on `ContractCompilerInterface`
  (`types.ts`), the guide passage at `guides/contract.md:939-941` (hold the artifact, not the
  compiler), and the `createContract` TSDoc reason for the eager bundle. Executed fence per
  the documentation rules.
- **Per-family plan release — excluded on evidence.** The naive form breaks the union path
  (`#guardAt` reads at `1150`, `1688`, `1933`); the corrected form cannot release `#nodes`,
  `#index`, or `#order`, which dominate the retained working set. Reopens on a measurement
  attributing a material share of a released compiler's retained heap to plan arrays.
- **Reentry-poison caching — excluded on evidence.** One allocation per getter read past the
  first; no measurement attributes material cost. Reopens on one that does.
- **Validator and cloner working-state churn — recorded for a successor campaign.**
  `memo-attribution.out` attributes most dead WeakMap constructions on the `compileGuard` path
  to `ShapeValidator` instance initializers and its `#clear` constructing fresh collections per
  `validate` call, with the same paired-empty pattern in `ShapeCloner` and `SchemaCloner`
  (`Map` peers). That cost is transient allocation churn, not retained footprint — outside
  this campaign's subject. Reopens on an allocation-rate measurement attributing material time
  to it.

## Exit criterion

The campaign ends when each capability is implemented or intentionally excluded on evidence,
the gate chain `format:check → lint:check → check → build → test` is green from an independent
`verifier`, and the work is pushed to `claude/method-memoization-contracts-yus26p` in the
contract and scaffold repositories:

- Dead tracking-memo allocation removed (M1), behavior preservation proved by test, the heap
  direction reported against the probe baseline.
- Release-sentinel allocation moved to class scope with `#index` absence as `undefined` (M2),
  cross-compiler isolation and terminal replay proved by test, the cold-constructor reading
  reported against 1152 B.
- Retention rule published (M4) with an executed fence; parity green.
- Lazy bundle, per-family release, reentry-poison caching, and churn seams excluded with
  grounds recorded in this file and the commit message.
- The supervisor pin disagreement reported to the user (not this campaign's fix).
- No publish: the bump ruling and the fleet cascade are the user's release decision, surfaced
  in the final report.

The probe MCP server did not connect to this session (registered in user scope, handshake
verified out of session); TypeScript-edit claims are settled by running the workspace's own
`check` gate, per the fallback in `.claude/rules/tests.md` § Probes.
