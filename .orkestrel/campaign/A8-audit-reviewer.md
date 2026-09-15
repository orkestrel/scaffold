<!-- A8-S — reviewer (Opus 5, native), subjective and cross-engine lane of audit A8 (tool emitter, U8b). Retained verbatim from the completion notification, 2026-09-15 (540 s, 25 tool uses). Immutable. -->

**Lane held: SUBJECTIVE (design fit, API and vocabulary, architecture fit, simplification, guide voice), plus the cross-engine license in the brief to adjudicate objective defects I can evidence. My tools are Read/Grep/Glob only, so every attack below is traced from source and from the supplied logs, not executed; I name the exact reproduction for each so the Orchestrator can run it.**

---

## 1. The pattern is followed step by step — BROKEN

Six of the seven steps hold: the event map is a type alias (`C:\Users\mikes\WebstormProjects\tool\src\core\types.ts:177`), options carry `on?`/`error?` and nothing else (`types.ts:186-192`), the interface declares `readonly emitter: EmitterInterface<ToolManagerEventMap>` (`types.ts:211`), the class stores `readonly #emitter` and exposes `get emitter()` (`ToolManager.ts:47`, `:60-62`), every publication is a direct `this.#emitter.emit(...)` with no `#notify` (`:73`, `:74`, `:112`, `:119`), and `destroy()` calls `this.#emitter.destroy()` last (`:122-125`). No inheritance, no `Omit`, no delegation boilerplate.

Step 5 is broken. `.claude/rules/patterns.md` § Stateful emitters prescribes `new Emitter({ on: options?.on, error: options?.error })`, and `scaffold/guides/emitter.md` § Own an emitter prescribes threading the caller's options "straight into the constructor — so the owner's options surface mirrors the emitter's without re-deriving it". `C:\Users\mikes\WebstormProjects\tool\src\core\tools\ToolManager.ts:50-53` re-derives it instead:

```ts
this.#emitter = new Emitter({
	...(options?.on === undefined ? {} : { on: options.on }),
	...(options?.error === undefined ? {} : { error: options.error }),
})
```

Why it matters: `ToolManagerOptions` is structurally `EmitterOptions<ToolManagerEventMap>` — same two optional members, same types (`types.ts:186-192` against `node_modules/@orkestrel/emitter/dist/src/core/index.d.ts:167-173`), and the constructor is `constructor(options?: EmitterOptions<TMap>)` (`index.d.ts:69`). The object therefore needs no reconstruction at all. The writer's own report names `exactOptionalPropertyTypes` as the reason (`U8b-tool-emitter-report.md:100`), but that setting only rejects an object literal carrying a present-with-undefined property; it does not reject passing the whole options value through. The same unit already does it the plain way one layer up, at `C:\Users\mikes\WebstormProjects\tool\src\core\factories.ts:64`: `return new ToolManager(options)`. Two adjacent files thread the identical value, one in a line and one in four, and a reader of the class cannot tell why.

What right looks like — replace `ToolManager.ts:50-53` with one line:

```ts
this.#emitter = new Emitter<ToolManagerEventMap>(options)
```

The explicit type argument removes any inference doubt. If the compiler rejects that form under this `tsconfig.json`, this finding is refuted and the current form stands; `npm run check` settles it.

## 2. Every registry change is published exactly once, in order — BROKEN

Every enumerated happy path holds, and the batch paths correctly recurse through the single-item path (`ToolManager.ts:68`, `:105`) so each element publishes on the same rules as a direct call.

The interleaving that breaks it is a listener that mutates the registry during a replacement. `ToolManager.ts:71-74` publishes `remove` and then `add` after the map is already final, and re-reads nothing between them:

```ts
const previous = this.#tools.get(tools.name)
this.#tools.set(tools.name, tools)
if (previous !== undefined) this.#emitter.emit('remove', previous)
this.#emitter.emit('add', tools)
```

Vector (traced from source, not executed):

```ts
const m = new ToolManager()
const a = new Tool({ name: 'echo', execute: () => 1 })
const b = new Tool({ name: 'echo', execute: () => 2 })
m.add(a)
m.emitter.on('remove', () => { m.remove('echo') })
const seen: boolean[] = []
m.emitter.on('add', (t) => seen.push(m.tool(t.name) === t))
m.add(b)
// seen === [false]; m.count === 0
```

`m.add(b)` sets the map, emits `remove(a)`, the listener deletes `echo` and emits `remove(b)`, and then the outer call emits `add(b)` for a tool the registry no longer holds. The registry publishes an addition that did not happen. `guides/tool.md:432` states the property absolutely — "Each addition publishes `add` after the map holds the tool" — and this state contradicts it.

Why it matters for what this round decides: the mcp bridge's `list_changed` push and live publish are exactly the listener class that re-reads and re-publishes on a registry event. A bridge whose `remove` handler reconciles the registry against a policy list will advertise a tool that `execute` then reports as not found.

Reachability is narrow — it needs a listener that mutates the registry during a replacement's `remove` — and that is the only interleaving I found; see Attacked and held for the ones that hold.

What right looks like, and the bound against over-correcting: do not add guards around each `emit`. A synchronous emitter lets any listener mutate anything, so a guard set can never be complete, and `.claude/rules/patterns.md` § Stateful emitters step 6 forbids the guarded-notify machinery that direction leads to. State the bound instead, on `ToolManagerEventMap` in `types.ts:177-184` and in the guide's prose at `guides/tool.md:432-437`: a listener that mutates the registry re-enters synchronously, and each event describes the registry at the moment it was published rather than at the moment its outer call returns. Then soften "after the map holds the tool" to the form the code earns.

## 3. `destroy` ends the registry — CONFIRMED

`destroy()` at `ToolManager.ts:122-125` calls `this.clear()` — which snapshots, empties, then emits `clear` while listeners are still attached — and destroys the emitter after. A second `destroy()` is safe on three independent grounds I traced: `this.#tools.clear()` on an empty map changes nothing, `emit` after `destroy` is a documented no-op (`node_modules/@orkestrel/emitter/dist/src/core/index.d.ts:49-50`), and `Emitter.destroy` is idempotent (`index.d.ts:162`). A later `add` reaches no listener for the same reason. The attacks are listed under Attacked and held.

## 4. Hooks and isolation — CONFIRMED

`createToolManager({ on })` reaches the initial listeners, proved by `tests/src/core/factories.test.ts` "forwards initial registry hooks for add, remove, and clear". Sibling isolation and `error` routing are proved by "forwards listener errors without preventing sibling listeners", which registers the throwing handler through `on`, subscribes recorders afterwards, and asserts both that the recorder still fired and that `errors.calls` equals `[[error, 'add']]` with an identity check on the error. That is a real sibling, not an adjacent assertion. The gate log's `exit=0` on `npm run test` covers the `test:src` link of the `&&` chain in `package.json:55`, so these ran.

## 5. `execute` is untouched — CONFIRMED

`git status --porcelain` in the supplied evidence lists neither `Tool.ts`, `errors.ts`, `helpers.ts`, nor `validators.ts`. Inside `ToolManager.ts` the diff touches no line of `execute` or `#run`; the current file shows both unchanged at `:89-97` and `:127-160`. `ToolManager.test.ts` "executes single and batch calls without publishing registry events" pins the negative directly, and the `#run` miss path still reads the same map.

## 6. The guide is true and in parity — BROKEN

The parity mechanics hold: the new `Summary` cells equal their doc-block description paragraphs (`guides/tool.md:57-58` against `types.ts:176`, `:186`), the `ToolManagerInterface` `## Methods` table lists `destroy` (`guides/tool.md:165`), the fence transcription at `tests/guides.test.ts:289-305` is byte-equal to `guides/tool.md:442-458` and is the last entry in the exhaustive ordered fence list the byte-equality case asserts, the executed case runs it, and `## Tests` names the new proofs.

The sentence the code contradicts is the `destroy` summary. `types.ts:287` and the mirrored cell at `guides/tool.md:165` both read:

> Removes every tool, then releases the emitter; the registry is finished.

The registry is not finished. `guides/tool.md:464-465` says so itself, forty lines earlier in the same document — "later additions still update its tool map" — and `types.ts:290-291` repeats it. `ToolManager.test.ts` "publishes nothing for a later add after destroy while updating the registry" asserts `manager.tool('echo')` is the tool after `destroy()`, so the package ships a test proving its own summary false. `execute` still dispatches those tools. A reader of the Methods table and a reader of the Patterns prose come away with opposite instructions, and `.claude/rules/writing.md` § Claims and time bars a claim the reader cannot check.

Why it matters for what this round decides: the mcp bridge is the reader. "Finished" tells it a destroyed registry is inert; the code tells it a destroyed registry is a live, silently unobservable registry. That divergence — callable tools, no `list_changed` — is the failure mode a bridge cannot see.

What right looks like: change both sides together, because the parity gate compares them. Replace the sentence at `types.ts:287` and `guides/tool.md:165` with what `destroy` does — "Removes every tool and releases the emitter's listeners." — and leave the `@remarks` at `types.ts:289-291` to carry the after-destroy contract it already states correctly.

## 7. Nothing re-implements an installed export — CONFIRMED

Recording uses `createRecorder` and `createRecorders` from `@orkestrel/test` at every site, matching the installed signatures (`node_modules/@orkestrel/test/dist/src/core/index.d.ts:128`, `:146`). The diff adds no module-scope declaration of any kind — every new symbol is a type, an interface member, or a class member — so there is nothing in it that could shadow an installed export. `Emitter`, `EmitterInterface`, `EmitterHooks`, and `EmitterErrorHandler` come from `@orkestrel/emitter`; `isArray` and `attempt` still come from `@orkestrel/contract`.

One evidence note the next round should carry rather than repeat: `P5c-collide-after-u8b.log.txt` does not report a clean or dirty result. It reports `installed export names: 355` and then an empty `=== agent` section. A count is not a collision verdict, and `.claude/rules/quality.md` § Instruments requires a sweep to name its pattern and paths including a clean one. My CONFIRMED rests on reading the diff, not on that log.

## 8. Nothing else moved — CONFIRMED

`git status --porcelain` lists nine files, all owned. `package.json:3` still reads `"version": "0.0.14"`. The only manifest and lockfile change is the U8a `@orkestrel/emitter` declaration and the `dev: true` removal. No vendored file appears. `README.md` is untouched, and the pitch/tagline parity case passes in the gate log's `test:guides` run.

## 9. Rules and tests — UNRESOLVED

The static half holds: no `any`, no `as`, no `!`, no suppression directive anywhere in the diff, and `lint:check` passed with `--deny-warnings`. No mock, fake, or module replacement — every proof drives the real `ToolManager` and the real `Emitter`. The arrow functions inside the `on` hook literals are the shape `scaffold/guides/emitter.md` itself prescribes, so they are not nested-function violations. Test titles name what they prove.

The red-before-green half cannot be decided from the evidence supplied. `U8b-tool-emitter-report.md:59` gives aggregate counts only — "12 failed, 74 passed" red and "86 passed" green — with no per-test output and no command log. That is the writer's own report and nothing else, which `.claude/rules/quality.md` and this brief both rule `UNRESOLVED`. What would settle it: the captured `test:src:core` output of the red run, showing each of the thirteen named titles failing.

The three weakest new tests and the mutation that leaves each green:

- `tests/guides.test.ts` "observes registry changes exactly as the observation fence claims" records event names as strings and never inspects a payload. Change `ToolManager.ts:74` to `this.#emitter.emit('add', previous ?? tools)` and it stays green while every `add` on a replacement carries the wrong instance.
- `tests/src/core/tools/ToolManager.test.ts` "emits one empty clear event for every clear of an empty registry" asserts `[[[]], [[]]]`, which is the same value whether the snapshot is taken before or after emptying. Move the snapshot in `clear()` (`ToolManager.ts:117-119`) to after `this.#tools.clear()` and it stays green; only the populated-clear case catches it.
- `tests/src/core/factories.test.ts` "forwards initial registry hooks for add, remove, and clear" reads three independent recorders and never compares them. Swap `ToolManager.ts:73-74` to emit `add` before `remove` and it stays green.

## 10. Coherent as tool 0.0.15 for mcp's `list_changed` push and the bridge's live publish — BROKEN

I would not ship it as it stands. The event surface itself is well chosen — three single-word events, payloads carrying instances rather than names, per-item batch publication matching `.claude/rules/patterns.md` § Managers, `clear` carrying its snapshot so a consumer need not have cached one, and `emitter` reachable from `ToolManagerInterface` so a bridge holds the published contract rather than the class. That is the right shape for a `list_changed` push, and it composes with the fleet's other emitter owners without a new concept.

What blocks the version is that the two consumers this round exists to unblock read the surface through prose, and the prose contradicts itself on the one lifecycle question a long-lived bridge must get right (claim 6), while the one interleaving a live bridge is most likely to create publishes an addition that did not happen (claim 2). Both fixes are small and neither touches the design.

One piece of evidence is also outstanding before a 0.0.15 tag. `AGENTS.md` § Work process puts `npm run build` between `check` and `test`, and `U8b-tool-gates-orchestrator.log.txt` contains no build block — it goes from `check` `exit=0` at line 21 straight to `npm run test` at line 22. This package rolls its published `.d.ts` through api-extractor (`configs/src/vite.core.config.ts:11-14`), and this change puts three `@orkestrel/emitter` types into the public declaration surface for the first time. The risk is low, because `@orkestrel/contract` types already cross that boundary through `ToolSuccess` and `ToolFailure`, and the rolldown external predicate at `configs/src/vite.core.config.ts:26` already covers every `@orkestrel/` specifier. It is still unread. The same log is missing the `test:src` and `test:policy` blocks; the `exit=0` on the `&&` chain in `package.json:55` covers whether they passed, but not what they collected.

---

## Findings outside the claims

**F1. The `remove` event carries two different post-conditions, and only one of them is documented or pinned.**

Through `remove(name)` (`ToolManager.ts:109-113`) the event fires after the deletion, so a listener reading `manager.tool(tool.name)` sees `undefined`. `ToolManager.test.ts` "emits remove after deleting the exact tool and stays silent for a missing name" pins exactly that, asserting `remaining.calls` equals `[[undefined]]`, which reads as a general property of the event. Through a replacement (`ToolManager.ts:71-73`) the same event fires after `this.#tools.set(...)`, so the identical listener sees the replacement already installed:

```ts
const m = new ToolManager()
const a = new Tool({ name: 'echo', execute: () => 1 })
const b = new Tool({ name: 'echo', execute: () => 2 })
m.add(a)
const seen: (ToolInterface | undefined)[] = []
m.emitter.on('remove', (t) => seen.push(m.tool(t.name)))
m.remove('echo') // seen === [undefined]
m.add(a); m.add(b) // seen === [undefined, b]
```

`guides/tool.md:434-435` documents the standalone case — "Removing a present name publishes `remove` after deletion" — and says nothing about the replacement case, so a consumer generalises from the sentence and the test and is wrong half the time. This is a documentation-completeness defect, not a behavioural one: the ordering the guide does document (`remove` then `add`, position preserved) is correct, and there is no ordering that makes both cases agree while keeping registration position, because preserving position requires `Map.set` on the live key.

What right looks like: one sentence on the `remove` member of `ToolManagerEventMap` (`types.ts:180-181`) and in the guide's Patterns prose (`guides/tool.md:433-434`) stating that a replacement's `remove` publishes with the replacement already installed, so a listener must not read absence from the map to confirm a removal.

---

## Attacked and held

**Claim 2, the interleavings that hold.** A `clear` listener that calls `clear()` again re-enters and each call still publishes exactly one `clear`; the snapshot at `ToolManager.ts:117` is taken before the emptying, so the nested call sees an already-empty map and publishes `[]`. An `add` listener that calls `remove(name)` leaves the map and the event stream consistent — `add` then `remove`, map empty. An `add` listener that calls `clear()` publishes `add` then `clear([tool])`, which is correct. A batch `remove` containing a repeated name publishes once for the first occurrence and returns `false` for the second, pinned by "emits batch removals in requested order and reports missing or repeated names". Only a listener mutating the registry from inside a *replacement's* `remove` breaks the invariant, which is why claim 2's break is bounded to that path.

**Claim 3, the attacks that failed.** I tried to reach a listener after `destroy()` three ways: `add` after destroy (emit is a no-op on a destroyed emitter), a subscription registered after destroy (`on` is a no-op, pinned by "publishes nothing for a later add after destroy while updating the registry"), and a second `destroy()` (idempotent on the emitter, and `clear()` on an empty map emits into a destroyed emitter). None reached a listener and none threw.

**Claim 1, the adjacent behaviour that looks wrong and is correct.** The batch `add` and batch `remove` now recurse through their own single-item overloads (`ToolManager.ts:68`, `:105`) rather than touching the map directly. That reads like the delegation boilerplate the pattern bans, and it is not: it is the single-item rule applied once per element, which is what `.claude/rules/patterns.md` § Managers requires of a batch verb, and it is why a replacement inside a batch publishes correctly.

**Claim 10, the adjacent design choice that looks like a defect and is the pattern.** `ToolManagerInterface.emitter` hands a consumer the full `EmitterInterface`, including `emit`, `clear`, and `destroy`, so any holder can fabricate a registry event or silently stop the registry publishing. That is the ecosystem's accepted cost of step 3 in `.claude/rules/patterns.md` § Stateful emitters, shared by every emitter owner in the fleet, and this unit is not the place to relitigate it.

**Test-file ceremony I attacked and could not call a defect.** Every `createRecorders` call site writes explicit type arguments — `createRecorders<ToolManagerEventMap, keyof ToolManagerEventMap>(...)` — ten times, where the installed declaration's own `@remarks` at `node_modules/@orkestrel/test/dist/src/core/index.d.ts:142-145` says a literal array infers correctly. It is noise rather than a defect, the writer recorded the choice at `U8b-tool-emitter-report.md:100`, and I have no compiled evidence that inference succeeds here.

VERDICT: FAIL 1, 2, 6, 9, 10; outside the claims: F1
