I ran the **subjective** lane — design fit, contract coherence, prose truth — across the trees the brief names. Standing limitation, recorded up front: my allowlist is Read/Grep/Glob, so I could not run `git status --porcelain` or `git diff`, and no diff was supplied in the brief. Every verdict below is a review of the source as it stands, not of what changed. Every BROKEN ruling names the command that settles it by execution.

---

## 1. (contract) `isContractError` recognizes cross-copy and refuses the four lookalikes without throwing — **BROKEN**

The totality half holds. `typeof value !== 'object' || value === null` cannot throw, and every later inspection — `instanceof`, `getPrototypeOf`, `.name`, `'code' in`, `getOwnPropertyDescriptor`, `.code` — sits inside the `try` at `C:\Users\mikes\WebstormProjects\contract\src\core\errors.ts:79-105`. A hostile getter, a revoked `Proxy`, and a trap-throwing `Proxy` all land on `catch { return false }`. The cross-copy half holds too, and its instrument is sound: `contract\tests\src\core\errors.test.ts:63` asserts `FirstConstructor).not.toBe(SecondConstructor)` before reading the guard, so the two-copy premise is controlled rather than assumed.

The refusal half is false for the `Proxy` case. `new Proxy(new ContractError('x', { code: 'range' }), {})` passes every gate:

| gate | line | proxy result |
| --- | --- | --- |
| `value instanceof Error` | `errors.ts:80` | `true` — default `getPrototypeOf` trap forwards |
| `getPrototypeOf(value) === Error.prototype` | `errors.ts:80` | `false` — forwards to `ContractError.prototype` |
| `value.name !== 'ContractError'` | `errors.ts:81` | forwards to the own field |
| `getOwnPropertyDescriptor(value, brand)` | `errors.ts:82-86` | forwards; `.value === true` |
| `value.code` | `errors.ts:87` | forwards a declared code |

`isContractError` returns `true`. The old `#brand` private field refused this vector by construction — a private-field read on a proxy throws — and the `Symbol.for` replacement dropped that property without the guide or any test noticing.

Bounding: the guide row at `contract\guides\contract.md:319` claims only that "hostile and revoked proxies answer `false`", which is true, so this is the brief's claim overstating the shipped guarantee, not the guide lying. But the round has not established the property it believes it established.

Compounding it, the brand check has **no negative control anywhere**. `errors.test.ts:57-66` builds `lookalike` as a plain `new Error` with the brand stamped and asserts `false` — but that value dies at `errors.ts:80` on the prototype gate, before the brand is ever read. No test in the tree makes the brand the deciding factor for either answer. Per `.claude/rules/quality.md` § Instruments, an instrument is not evidence until it has failed; this one has never been given the chance.

What right looks like: decide whether a transparent wrapper is inside the type, state that ruling on `isContractError`'s `@remarks`, and add a control whose only failing condition is a missing or wrong brand — a subclass of `ContractError` carrying the exact name and a declared code with the brand deleted.

Settling command: `node --input-type=module -e "const {ContractError,isContractError}=await import('./dist/src/core/index.js');console.log(isContractError(new Proxy(new ContractError('x',{code:'range'}),{})))"` from the `contract` root.

## 2. (contract) The old mechanism is gone, with no second recognition door — **CONFIRMED**

Attacks tried and failed. `#brand` returns no match anywhere outside `node_modules` (swept over the whole `contract` checkout). No `guard()` recognition export exists — every `guard` hit is `ContractCompiler.guard`, a local binding, or a combinator parameter. `ContractError.owns` no longer exists as a symbol. I looked specifically for a second door that could disagree and found the three `#owns` methods at `JSONCloner.ts:290`, `SchemaCloner.ts:248`, and `ShapeCloner.ts:949`; each answers *provenance* against an instance-private `WeakSet`, not type recognition, and `ShapeCloner.ts:937` routes the type question through `isContractError` itself. One recognition door, and the sweep at `integration.test.ts:559` is a live regression guard that fires the moment a function-valued static reappears.

One stale sentence is reported under Findings rather than here, because it is history in a `@remarks` rather than a live description of the mechanism.

## 3. (contract) A later intrinsic replacement cannot affect construction or recognition — **BROKEN**

Construction is genuinely pinned, and its proof is not a tautology. `errors.ts:21-22` captures `Object.defineProperty` and `Object.hasOwn` as static private fields at class evaluation, `errors.ts:36` stamps through the captured reference, and `integration.test.ts:538-557` arms a throwing replacement, proves it live with the control at line 548, and still gets `true` from `isContractError(authored)`. `integration.test.ts:1028-1056` separately proves the prototype-pin verification fires. That half I could not break.

Recognition is not pinned at all. `isContractError` reads three intrinsics live, per call:

- `errors.ts:80` — `Object.getPrototypeOf`
- `errors.ts:82-85` — `Object.getOwnPropertyDescriptor` **and** `Symbol.for`

Install `Object.getOwnPropertyDescriptor = () =&gt; undefined` after import and every genuine `ContractError` answers `false`, silently converting every consumer's `catch` branch into a fall-through. Install `() =&gt; ({ value: true })` and the brand gate stops discriminating. Neither throws, so the `try` cannot see it. This is the exact failure class `contract\src\core\constants.ts:11-16` names as the reason `INTRINSICS` exists — "it can LIE, which no boundary can see" — and `errors.ts` is the one file that does not use it.

No proof pins this. `integration.test.ts:516-536` looks like it should: it sweeps `OWNED_STATICS` installing `denyRecognition`. But `OWNED_STATICS` is derived at `tests\setup.ts:757-770` from `Object.getOwnPropertyNames(ContractError)` filtered to writable-or-configurable members, and after E2 removed the public static the surviving population is `length` and `name` — neither of which any recognition path reads. The corpus that existed to catch `ContractError.owns` now draws from an empty risk set, and `replaceIntrinsic` restores before the `isContractError(outcome.error)` call at line 528 anyway.

What right looks like: route `isContractError`'s three reads through `INTRINSICS.prototype`, `INTRINSICS.describe`, and a module-scope-captured brand symbol, and add a proof that replaces each of those globals with a liar and asserts the guard still answers correctly for a genuine error and a forgery.

Settling command: from `contract`, `node --input-type=module -e "const m=await import('./dist/src/core/index.js');const e=new m.ContractError('x',{code:'range'});Object.getOwnPropertyDescriptor=()=&gt;undefined;console.log(m.isContractError(e))"` — expect `false`.

## 4. (sea) `timeout` reaches every `runShell` call site the build spawns — **CONFIRMED**

I enumerated the call sites myself rather than trusting the report. `runShell` is invoked at `sea\src\server\seals\SEA.ts` lines 254, 306, 328, 338, 381, and 390, and nowhere else in `src`. Line 254 is the one site that composes its own options object, and it spreads `timeout` at line 257. The remaining five take the `shell` object built at lines 288-291, which spreads `timeout` at line 290. I looked for the falsifier the claim names — a site composing its own shell object without the option — and there is none. I also swept for a second spawn mechanism (`execFileSync`, `spawnSync`, `execSync`, `spawn(`) across `sea` outside `node_modules`; the only hits are in `tests\config.test.ts`, which is not the build path.

Guide prose matches: `sea\guides\sea.md:36` claims the option bounds "each spawned blob-generation, stripping, signing, and verification command", and those are exactly the six sites.

## 5. (sea) The `TIMEOUT` proof discriminates — **CONFIRMED**

`sea\tests\src\server\seals\SEA.test.ts:108-131` passes `timeout: 1` at the `SEAOptions` level and asserts `error.code === 'TIMEOUT'` at line 126. Delete the spread at `SEA.ts:257` and `runShell` receives no `timeout`, so `runSync` never sets `expired`, `helpers.ts:187` never fires, blob generation succeeds, and `execute()` proceeds past the point the assertion pins — the test goes red on the assertion, not on a timeout of its own. That is a real negative control.

Bounding, stated so the next round does not over-read it: the proof reaches call site 254 only. The five signing-path sites are darwin/win32-gated and no test drives them, so claim 4 rests on enumeration and claim 5 does not extend to it.

## 6. (program) The guards refuse exactly off-contract results and admit every conforming implementation — **CONFIRMED**

I attacked with the conforming-but-unusual implementation the claim invites: a class instance carrying its members as prototype getters. It passes. `isTallies` (`program\src\core\validators.ts:270-274`) reads through `Reflect.get`, which walks the prototype chain, so the getters are invoked and checked. `isProgramSums` (`validators.ts:178-182`) enumerates `Object.getOwnPropertyNames`, finds nothing own, and admits. `isDetermination`, `isTally`, `isAggregateGroup`, `isProgramResult`, `isAggregateResult`, and `isProgramValidationResult` all use `objectOf`, the open posture.

I then checked the optional sets against `program\src\core\types.ts` member by member, because a mismatch there is over-narrowing that no adversarial input reveals: `Determination` optional `scope`/`message` against `['scope','message']` at `validators.ts:210`; `ProgramResult` optional `decision`/`rating` against `['decision','rating']` at `validators.ts:309`; the rest carry no optionals and their guards pass no list. Exact.

The false-accept residual — a `sums` record carrying its members on a prototype is admitted unchecked — is real, and it is ruled on rather than hidden: `program\guides\program.md:210-211` names it in the main flow, the TSDoc at `validators.ts:162-167` repeats the rule, and `tests\src\core\validators.test.ts:208-210` fences it with the reason written beside the assertion. That is the disclosure standard `.claude/rules/quality.md` asks for, and it is what the contract package failed to give for its brand.

## 7. (program) The sealed definition is deeply owned — **BROKEN**

Two of three sub-claims hold. `Program.ts:88` takes an independent `structuredClone`, so post-construction mutation of the caller's object cannot reach `this.definition`. Nothing compares the caller's object by identity — `ProgramManager.ts:103` keys on `definition.id`, and `Program.ts` reads only `this.definition`.

"Deeply owned" is false. `#seal` (`Program.ts:284-294`) walks with `Object.values` and `Object.freeze`. Neither reaches an internal slot, and `Object.values` returns `[]` for a `Map` or `Set`. `structuredClone` preserves `Map`, `Set`, and `Date` faithfully, so all three survive into the stored copy as mutable objects that `#seal` visits and cannot seal.

Reachability, checked rather than assumed: `ProgramDefinition.authority?: LogicalDefinition` and `aggregate.gates?: LogicalDefinition` (`types.ts:129-140`) compose reason's `Check`, whose `value` is `unknown` — `program\guides\reason.md:294` types it that way and line 219 states outright that it "may hold anything". `isProgramDefinition` → `isLogicalDefinition` → `isCheck` therefore admits a `Map`-valued check, and `#seal` runs at `Program.ts:93` before `validate()` ever runs at line 114. So:

```
definition.authority.rules[0].premises[0].value = new Map()
// after construction:
program.definition.authority.rules[0].premises[0].value.set('k', 'v') // succeeds
```

A `Date` in the same slot mutates through `setTime`. A `Uint8Array` is worse: `Object.freeze` on a typed array with elements throws a raw `TypeError` out of `#seal`, out of the constructor, with none of the coded `ProgramError` values the class documents.

What right looks like: either narrow the definition surface to structured-clonable-and-freezable data and say so on `ProgramDefinition`, or state the limit where a consumer meets it — `#seal` freezes the plain-object graph and does not own the contents of a `Map`, `Set`, `Date`, or typed array reached through `Check.value` — and fence it.

Settling command: from `program`, construct a `Program` whose `authority` carries a `Map`-valued check, then `program.definition.authority.rules[0].premises[0].value.set('k','v')` and read it back.

## 8. (mcp) The adopted teardown registers each resource immediately after acquisition — **BROKEN**

The claim asks me to find a site where intervening code between acquisition and `add` could throw and leak. There are two, adjacent, in the same block:

- `mcp\tests\src\server\factories.test.ts:67-69` — `createHTTPServer()` at 67, `await new Promise(resolve =&gt; released.listen(0, '127.0.0.1', resolve))` at 68, `failureTeardown.add(...)` at 69.
- `mcp\tests\src\server\factories.test.ts:78-80` — the same shape for `stopped`.

The awaited executor sits between acquisition and registration. If `listen` throws synchronously the promise rejects and the handle is never registered; if `listen` emits `error` instead the promise never settles at all, because no reject path is wired — the hook times out *and* leaks an open server.

That this is a miss rather than a considered exception is settled by the sibling file: `mcp\tests\src\server\transports\WebSocketClientTransport.test.ts:67-75` acquires at 67 and registers at 68, **before** `listen` at line 91. The correct order is already written down in this batch; two sites did not get it.

What right looks like: move both `failureTeardown.add(...)` calls to the line directly after their `createHTTPServer()`, matching lines 67-68 of the WebSocket file, and give the `listen` promise a reject path.

## 9. (mcp) The aggregation proof cannot pass against the old abandoning loop — **CONFIRMED**

`factories.test.ts:64-108` registers `released`'s disposer first and `stopped`'s second, and `createTeardown` releases newest-first — stated at line 58 and again at `WebSocketClientTransport.test.ts:34`. So the failing disposer runs first. Under an abandoning loop, `released`'s disposer never runs and `expect(released.listening).toBe(false)` at line 107 fails. The mechanism discriminates, and line 105's `expect(thrown).toBe(failure)` pins that the failure is surfaced rather than swallowed.

Bounding for the next round: the discrimination depends entirely on the failing disposer being registered last. Swap the two registrations and line 107 passes against both loops. Worth a comment at the registration, not a fix.

## 10. (mechanical batch) The three most likely wrong — **BROKEN**

I named these three and attacked them: the `prepack` sweep's landing, the `Premise` render pins, and the shaper proofs.

**The sweep — broken.** `brief\tests\distribution.test.ts:111` runs `npm(['pack', '--dry-run', '--json'], ROOT)` with no `--ignore-scripts`, in a repo whose `brief\package.json:68` now declares `"prepack": "npm run build"`. `npm pack` runs `prepack` under `--dry-run`, so this line triggers a full build inside a Vitest worker. Line 84 of the same `beforeAll` passes the flag, which proves the hazard was understood and this second site was missed — and the brief's own Subject table names `brief` as one of the two repos the `--ignore-scripts` half covered. Fix: add `--ignore-scripts` at line 111.

**The `Premise` render pins — hold.** I checked each pinned string against the implementation at `qualifier\src\core\helpers.ts:158-167`: `'Some description → unknown'`, `'Premise → not met'`, `'Applicant is enrolled → unknown'`, `'Applicant is enrolled → not met'` (`tests\src\core\helpers.test.ts:180-217`) all reproduce from lines 159-161. The prose is the weak half, reported under Findings.

**The shaper proofs — hold.** `toolbox\tests\src\core\shapers.test.ts:23` and `:49` compile through the real `createContract`, and the accept/reject/round-trip assertions run against the compiled guard and parser, not against a re-description of the shape. They are materially thinner than their siblings, which is a finding rather than a break.

I did not attack the `Channel` example or a U11-A timing conversion as my three, but I read both and neither is wrong: the `Channel` `@example` at `agent\src\core\Channel.ts:13-23` compiles and yields `1` then returns against the implementation at lines 31-60, and the `workflow` conversions I sampled (`Controller.test.ts:52-54`, `:72`) are macrotask-for-macrotask equivalent to the `setTimeout` form they replace.

## 11. (whole batch) Each tree is coherent; name any you would not ship — **BROKEN**

I would not ship three.

**contract.** L0, and the strongest reason to hold. Recognition is unpinned against exactly the attack the package's own `INTRINSICS` docstring says the package exists to answer (claim 3), the brand mechanism has never once been the deciding factor in a test (claim 1), and the guide misdescribes the control that is supposed to cover it (Finding F1). A wrong release here cascades to the fleet, which is the stake the brief itself names.

**brief.** Its distribution proof now runs a full build inside the suite (claim 10). That is a self-inflicted red or a very slow green depending on machine, and it races the gate `build` for `dist/`.

**program.** `#seal` does not deliver the deep ownership its own TSDoc at `Program.ts:64-65` and guide at `program.md:656-657` both assert (claim 7), and the constructor can throw an uncoded host error for a type-legal definition (Finding F8).

**mcp** I would ship after the two registration lines move; the leak is conditional on a `listen` failure and the orphaned comment is cosmetic. **sea**, **qualifier**, **toolbox**, **agent**, **middleware**, **browser**, **workflow** I would ship as they stand.

---

## Findings outside the claims

**F1 — `contract\guides\contract.md:1035` calls a control something it is not.** The line describes `errors.test.ts` as carrying a "forged-brand" control. The value it names (`errors.test.ts:57-61`) is a plain `Error` with the brand stamped, and it is refused at `errors.ts:80` on the prototype gate — the brand is never read. A reader of that guide line concludes the brand mechanism is under test. It is not. Correct the description to "plain-error and undeclared-code controls", or add the control the sentence promises.

**F2 — `contract\src\core\errors.ts` bypasses the package's own intrinsics table, against that table's stated membership rule.** `constants.ts:36-41` fixes the rule: "every host operation this package dispatches by name whose result a published answer depends on", explicitly including the case where the reference is taken per call rather than at evaluation. `isContractError` dispatches `Object.getPrototypeOf`, `Object.getOwnPropertyDescriptor`, and `Symbol.for` by name and publishes a boolean that depends on all three. `INTRINSICS` already carries `prototype` and `describe` rows. `constants.ts` imports only `./types.js`, so there is no cycle preventing the import. Beside that, `errors.ts:21-22` builds a private two-row capture table of its own — a second mechanism for a job the package centralized, which is what `AGENTS.md` § Design laws "Centralize by kind" forbids.

**F3 — the guide names the brand's false-negative residual and not its false-positive one.** `contract.md:303` discloses that a pre-0.0.13 copy stamps no brand, and that a plain error or partial lookalike stays outside the type. It does not say that `Symbol.for` puts the brand in the global registry, so any caller can stamp it, and a complete forgery — an `Error` subclass with the exact name, a declared code, and the stamp — is inside the type. The package holds itself to naming exactly this kind of residual elsewhere: `contract.md:1021` names the record brand's forgeable population "and its exact cost", and `helpers.ts:921-940` prices it. The errors section should rule on the trade the same way, especially because the mechanism it replaced was unforgeable.

**F4 — `mcp\tests\src\server\transports\WebSocketClientTransport.test.ts:39-43` describes a mechanism the file no longer has.** The comment opens "A second registrar for the RAW `node:http` server the bogus-handshake test stands up" and explains how it is closed in `afterEach`. There is no second registrar; `startBogusAcceptServer` at line 65 registers on the same suite-level `teardown` declared at line 31. The block also now sits directly above `startWs` at line 46, which it does not describe, with no blank line separating it from the `startWs` comment at line 44. This is the relocated ordering remark landing in the wrong place. Fold the socket-detachment fact into the `startBogusAcceptServer` comment at lines 60-64 and delete the orphan.

**F5 — `agent\src\core\Channel.ts:54` silently drops values for a generic the class publishes.** `if (next !== undefined) yield next` sits inside a `while (this.#buffer.length &gt; 0)` loop, so the guard can only ever fire for a genuinely pushed `undefined`. `Channel&lt;T&gt;` is exported from `agent\src\core\index.ts:7` and documented at lines 1-11 as a general unbounded channel over `T`. `Channel&lt;number | undefined&gt;` and `Channel&lt;void&gt;` therefore lose values with no diagnostic and no documented limit. Either narrow the published type parameter, or hold the buffer as `{ value: T }` cells so absence and a pushed `undefined` are distinguishable — `AGENTS.md` § Design laws, "Absence is `undefined`", is the rule this violates from the other direction.

**F6 — the `Premise` two-mode prose is a five-word clause that rules on neither overlap nor fallback.** `qualifier\guides\qualifier.md:76` says "display-neutral evidence, checked or described", and `describePremise`'s TSDoc at `helpers.ts:143-157` carries only the checked example. The type makes every member optional, so both modes can be present at once, and `helpers.ts:160` resolves that by rendering the checked form and discarding `description` with no diagnostic. A premise carrying `field` but no `comparison` falls into described mode and renders `'Premise → …'`, discarding the field it has. Neither behaviour is stated or fenced. State the precedence beside the interface — checked wins when `field` and `comparison` are both present; a partial checked premise renders as described — and pin both with an assertion, per `.claude/rules/documentation.md` on falsifying a prose claim the way you falsify a code claim.

**F7 — the two new shaper proofs are the thinnest in their file, and the guide claims they were added to cover are unpinned.** `toolbox\tests\src\core\shapers.test.ts:22-77` gives `promptToolShape` and `answerToolShape` accept/reject/round-trip and nothing else. Every neighbour carries more: `agentToolShape` has an `expectTypeOf` structural lock (line 83) and a compiled-schema assertion (lines 122-132); `workspaceToolShape` has both (lines 216, 306-328); `workflowStepsShape` has the schema assertion (lines 206-209). Meanwhile `toolbox\guides\toolbox.md:109-110` claims `schema` "carries the whole `@orkestrel/form` document as exact JSON" and that the answer arm's `values` is "a record as exact JSON" — and no assertion in the file rejects a non-JSON value in either slot. The exact-JSON half of both rows is prose nothing tries.

**F8 — `program`'s constructor can throw an uncoded host error for a type-legal definition.** `Program.ts:88` calls `structuredClone(definition)` as the first statement, before `assertProgramDefinition` at line 89 and long before any shape guard. `Check.value` is `unknown` by published contract, so a function or a symbol in that slot is type-legal and produces a raw `DataCloneError` out of the constructor. The class documents its construction failures as `ProgramError` `'MISSING'`, `'DUPLICATE'`, and `'DEFINITION'` (`program.md:710-713`), and this escapes all three. A class instance in the same slot clones to a plain object, silently changing comparison semantics. Contain the clone and republish as a coded refusal, and name the cloneability precondition where `ProgramDefinition` is documented.

**F9 — nothing in any tree exercises the new `prepack` hook.** The sweep added `"prepack": "npm run build"` and, in the same pass, added `--ignore-scripts` to the `npm pack` calls in the distribution proofs (`mcp\tests\distribution.test.ts:340`, `probe\tests\distribution.test.ts:30`, `process\tests\distribution.test.ts:32`, `brief\tests\distribution.test.ts:84`). Those are the only places in these trees that pack anything. The result is a published lifecycle hook with no coverage: if `prepack` were misspelled, pointed at a script that does not exist, or removed tomorrow, no test in any of these repos would change colour. The one site that would have exercised it is the defect in claim 10. Decide the intent — either the hook is the build guarantee and one proof should let it run, or it is publish-time only and that should be said where a reader meets it.

**F10 — dispatch deviation, recorded rather than worked around.** `orkestrel-falsify` § Evidence, by subject type requires "the actual diff and the actual status output" for a code change, and names omitting either a dispatch deviation. The brief instead instructs the auditor to obtain them (`git status --porcelain` and `git diff`), which this lane's allowlist cannot do. I did not reconstruct them. Consequence for the reconciliation: I cannot distinguish a defect this batch introduced from one it inherited, so every ruling above is on the tree as it stands. Claims 8 and 10 in particular assert something about "every converted suite" and "a manifest", and without the diff I cannot confirm which files were in the conversion set — I ruled on the files that use the adopted primitives.

---

VERDICT: FAIL — 6 broken, 0 unresolved, 0 not-evidenced, 10 findings outside the claims