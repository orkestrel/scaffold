# Batch audit round — reconciliation, 2026-08-21

Lanes: analyst (Sol, executed; `tmp/codex/audit-batch-analyst-last.md`), reviewer (Opus,
read-only; report captured beside this file). Analyst FAIL (claims 1, 11), reviewer FAIL
(claims 1, 3, 7, 8, 10, 11 plus findings F1-F10). Reconciled per claim; where the lanes
conflict, the Orchestrator's own source reading settles it, recorded here.

## Per-claim ruling

1. **BROKEN, convergent.** A transparent `Proxy` over a genuine `ContractError` answers
   `true`; the replaced `#brand` refused it by construction, and no test makes the brand the
   deciding factor for either answer. RULED (adopting the analyst's mechanism with the
   reviewer's controls): the brand stores the instance itself and recognition requires
   `descriptor.value === value`, which keeps cross-copy recognition and refuses a forwarding
   proxy; state the transparent-wrapper refusal in the `isContractError` TSDoc; add
   brand-deciding controls — the proxy, and a `ContractError` subclass carrying the exact
   name and a declared code with the brand deleted. Reviewer F1 (the guide's "forged-brand"
   description names a control that dies at the prototype gate) and F3 (the guide prices the
   false-negative residual and not the forgeable-stamp one) fold into the same unit.
2. CONFIRMED (both; no second recognition door).
3. **BROKEN, reviewer's vector stands.** The analyst's CONFIRMED replaced
   `Object.defineProperty` — the construction side — and never attacked recognition, which
   reads `Object.getPrototypeOf`, `Object.getOwnPropertyDescriptor`, and `Symbol.for` live
   per call; the `OWNED_STATICS` corpus that existed to cover it now draws from an empty
   population. RULED: recognition routes through the package's own `INTRINSICS` captures and
   a module-scope-captured brand symbol; add liar-intrinsic proofs for a genuine error and a
   forgery; replace or retire the empty-population sweep with one that names its membership.
   Reviewer F2 (a private two-row capture table beside the centralized `INTRINSICS`) folds
   in: the private captures dissolve into the central table.
4. CONFIRMED (both; the analyst executed, the reviewer enumerated the same call sites).
5. CONFIRMED (both). The reviewer's bound is recorded: the proof reaches the blob-generation
   site only; the darwin/win32 signing sites rest on enumeration.
6. CONFIRMED (both, independent vectors).
7. **BROKEN, reviewer's vector stands.** The analyst's mutation probe walked the plain-object
   graph; `#seal` walks with `Object.values`/`Object.freeze`, so a `Map`, `Set`, or `Date`
   reached through `Check.value` survives mutable, and a typed array throws a raw
   `TypeError` out of the constructor — reviewer F8's uncoded `DataCloneError` for a
   function-valued check is the same door. RULED (document-the-limit, per the reachability
   law): contain the clone-and-seal faults and republish them as the coded `'DEFINITION'`
   refusal with the cause attached; state on `ProgramDefinition` and in the guide that the
   seal owns the plain-object graph and does not own the contents of a `Map`, `Set`, `Date`,
   or typed array reached through `Check.value`; fence the `Map`-mutation residual and the
   coded refusal.
8. **BROKEN — the Orchestrator's own read settles the lanes' direct conflict.**
   `mcp/tests/src/server/factories.test.ts` lines 67-69 and 78-80 acquire, await `listen`,
   then register; the analyst's "registers before listening" is a misread of this file. The
   listen promise also wires no reject path. RULED: register immediately after acquisition
   using the disposer idiom `WebSocketClientTransport.test.ts:68-75` already has (it
   tolerates a never-listening server), and note at the second registration that the
   discrimination of the aggregation proof depends on the failing disposer registering last
   (the reviewer's claim-9 bound). Reviewer F4 (the orphaned "second registrar" comment)
   folds in: delete the orphan; its facts already live at lines 34-37 and 60-64.
9. CONFIRMED (both). The registration-order bound is carried into the claim-8 fix as a
   comment.
10. **SPLIT.** The `brief` pack site is BROKEN, convergent — fixed directly by the
    Orchestrator (`--ignore-scripts` added at `brief/tests/distribution.test.ts:111`,
    format and lint green; every pack site in that repo now carries the flag). The `Premise`
    render pins and the `Channel` example hold. The shaper thinness is reviewer F7, ruled
    below.
11. **BROKEN as a coherence verdict; each named tree ruled:** contract and program get fix
    units (claims 1, 3, 7). `brief` is fixed. The probe tarball pin is bounded campaign
    state owned by release prep (task list), not a defect. mcp ships after the claim-8 unit.
    sea, qualifier, toolbox, agent, middleware, browser, workflow ship as they stand, with
    the small findings below routed.

## Findings outside the claims

- F1, F2, F3 → folded into the contract unit (claims 1 and 3).
- F4 → folded into the mcp unit (claim 8).
- F5 (`agent` `Channel` silently drops a pushed `undefined` for `Channel<T | undefined>`) —
  pre-existing surface outside this wave's changes. CARRIED to the agent package's next
  change with the reviewer's two candidate fixes recorded (narrow the published type
  parameter, or hold `{ value: T }` cells).
- F6 (`qualifier` `Premise` two-mode precedence unstated and unfenced) — fix unit: state the
  precedence beside the interface (checked wins when both modes are present; a partial
  checked premise renders as described) and pin both with executed assertions.
- F7 (`toolbox` shaper proofs thinner than every sibling; exact-JSON guide rows unpinned) —
  fix unit: bring the two proofs to sibling depth (structural lock plus compiled-schema
  assertion) and pin or reword the exact-JSON rows.
- F8 → folded into the program unit (claim 7).
- F9 (nothing exercises `prepack`) — RULED publish-time-only and documented directly by the
  Orchestrator: the generated-manifest sentence in `guides/scaffold.md` § Generated
  workspace now states the hook's intent and the `--ignore-scripts` interplay; scaffold's
  guides project re-ran green (10 passed, exit 0). The compiler-emission digest test already
  pins the emitted line.
- F10 (reviewer's evidence limit: no diff supplied to the read-only lane) — recorded; the
  successor briefs already supply diffs.

## Fix units

| Unit | Subject | Engine | Route |
| --- | --- | --- | --- |
| C-fix | contract claims 1+3, F1-F3 | Sol | `codex exec`, contract checkout |
| G-fix | program claim 7 + F8 | Sol | `codex exec`, program checkout |
| M-fix2 | mcp claim 8 + F4 + claim-9 comment | Sonnet `builder` | native, mcp checkout |
| Q-fix | qualifier F6 | Sonnet `builder` | native, qualifier checkout |
| T-fix | toolbox F7 | Sonnet `builder` | native, toolbox checkout |

Writers are serialized per checkout; the checkouts are disjoint, so the units run in
parallel. C-fix and G-fix adopt prescriptions ruled here, so each closes on its
failing-first pairs plus the Orchestrator's authoritative re-runs (the mutation-probe
closure); a departure from prescription gets the cross-engine round.
