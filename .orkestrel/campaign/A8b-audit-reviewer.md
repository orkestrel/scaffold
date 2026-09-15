<!-- A8b-S — reviewer (Opus 5, native; cross-engine over Astra's U8b/U8c), subjective lane of the U8c close. Retained verbatim from the completion notification, 2026-09-15 (501 s, 33 tool uses). Immutable. -->

**Lane held: SUBJECTIVE (design acceptance, API and vocabulary, architecture fit, simplification, guide voice), plus the brief's cross-engine license over work GPT-6 Astra wrote. Tools are Read/Grep/Glob only, so every reading below is traced from source, from the built artifact, and from the supplied logs; I name the exact command for anything I could not execute.**

---

## 1. Every A8 carrier is closed where the report says — CONFIRMED

I attacked each carrier at the `file:line` the report names and could not move one.

- **Constructor.** `C:\Users\mikes\WebstormProjects\tool\src\core\tools\ToolManager.ts:50-52` is `constructor(options?: ToolManagerOptions) { this.#emitter = new Emitter<ToolManagerEventMap>(options) }`. The four-line reconstruction A8 named is gone. The attack that it cannot compile fails twice over: `EmitterOptions<TMap>` declares `on` and `error` and nothing else (`C:\Users\mikes\WebstormProjects\tool\node_modules\@orkestrel\emitter\dist\src\core\index.d.ts:167-173`), so `ToolManagerOptions` is assignable whole, and `npm run check` exits 0 at `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\campaign\U8c-tool-gates-orchestrator.log.txt:21`. This is `.claude/rules/patterns.md` § Stateful emitters step 5 in its positional form.
- **Replacement `add`.** `ToolManager.ts:72` — `if (this.#tools.get(tools.name) === tools) this.#emitter.emit('add', tools)`, read after the `remove` emission at `:71`.
- **Map emptied after `emitter.destroy()`.** `ToolManager.ts:120-124`; the sweep is `:123`.
- **Mid-emit fact.** `src/core/types.ts:307-308` on `destroy`'s `@remarks`; `guides/tool.md:471-473`.
- **`destroy` summary.** `types.ts:301` and `guides/tool.md:165` both read `Removes every tool and releases the emitter's listeners.` byte-identically. The false claim A8 broke ("the registry is finished") is gone, and the after-destroy contract stays in the `@remarks` where it belongs.
- **F1.** Stated on the `remove` member at `types.ts:191-192`, mirrored at `guides/tool.md:437-438`, and pinned on both sides: the replacement test asserts `installed.calls[0]?.[0]).toBe(replacement)` at `tests/src/core/tools/ToolManager.test.ts:203-205` inside the case declared at `:173`, and the standalone case declared at `:212` asserts `remaining.calls` equals `[[undefined]]` from a listener reading the map at `:221`.

## 2. The re-entry vectors are green and were red — CONFIRMED

All three titles appear in both logs with the stated counts, and each red condition matches the report.

- `U8c-red.log.txt:1` / `:189` / `:355` head the three sections; each ends `exit=1` (`:188`, `:354`, `:528`) with `Tests 1 failed | 88 skipped (89)`. The failing assertions are visible: `expect(recorders.add.calls).toEqual([])` at `ToolManager.test.ts:319` (red log `:132`), `expect(manager.count).toBe(0)` at `:347` (red log `:309`), `expect(readings.calls).toEqual([])` at `:361` (red log `:479`).
- `U8c-green.log.txt:1` / `:120` / `:239` head the same three; each ends `exit=0` with `Tests 1 passed | 88 skipped (89)` (`:109`, `:228`, `:347`).
- The red section headers name the condition the report names, including the honest one: the mid-emit title's red is the P8 no-delivery expectation inverted, not an implementation defect. The report says exactly that (`U8c-tool-emitter-fix-report.md:55`, `:69`), so the claim's "the red condition for each is the one the report names" holds. An inverted expectation is still a valid control — it shows the shipped assertion discriminates.

## 3. The strengthened tests reject their mutations — CONFIRMED, with one surviving mutation named

The four properties the claim lists all hold:

- Both add-ordering cases read the registry inside the `add` listener — `ToolManager.test.ts:136` and `:157`, each asserting `registered.calls` equals `[[true]]`.
- The batch-remove case reads the map inside the `remove` listener at `:238` and asserts `remaining.calls` equals `[[undefined], [undefined]]`.
- The populated-clear assertion checks payload identity at `:268-269` (`toBe(second)`, `toBe(first)`), and the empty-clear case now appends a populated clear with its own identity assertions at `:288-290`, which closes A8-analyst's "always emit an empty payload" prediction.
- The hooks case asserts one shared sequence — `order.calls` equals `[['add'], ['remove'], ['add'], ['remove'], ['clear']]` at `tests/src/core/factories.test.ts:41`, which closes A8-reviewer's swap mutation.

**The mutation that still leaves every test green** — weaken `ToolManager.ts:72` from an identity check to a presence check:

```ts
if (this.#tools.get(tools.name) !== undefined) this.#emitter.emit('add', tools)
```

Traced against every case that reaches the line: a fresh `add` finds the tool present and emits (green at `:132`, `:153`); a replacement with no re-entrant listener finds the replacement present and emits (green at `:173`); and `replacement reentry preserves publication consistency` (`:299`) leaves the map **empty** after the re-entrant `remove`, so `get` returns `undefined`, no `add` publishes, and `expect(recorders.add.calls).toEqual([])` at `:319` still holds. The factories hooks case and the guide fence case drive no re-entry. Nothing in the red log's mutation set covers this one either (`U8c-red.log.txt:529`-`:2613` enumerate publication-order and teardown mutations only).

The vector that separates the two spellings is untested: a `remove` listener that installs a **third** instance under the same name during a replacement. The shipped code is correct there — it publishes `remove(previous)`, `remove(replacement)`, `add(third)` and ends holding `third` — but only the `=== tools` half makes that true, and nothing fails if that half is removed. What right looks like: a sibling case in `tests/src/core/tools/ToolManager.test.ts` registering `once('remove', () => manager.add(third))`, asserting the stream is `remove(previous), remove(replacement), add(third)` and that `recorders.add.calls` never carries `replacement`.

**Referral, not a verdict of mine:** test sufficiency is the objective lane's, and no objective lane ran this round. I am handing the Orchestrator the vector and the mutation; the ruling on whether it earns a fix unit is the Orchestrator's.

## 4. The identity check is the right size — CONFIRMED

The attack was to find a second guard or a guarded-notify layer forming, and it fails. `ToolManager.ts:72` is one inline map read compared for identity; there is no `#notify`, no flag, no per-event gate, and every publication is still a direct `this.#emitter.emit(...)` (`:71`, `:72`, `:110`, `:117`), which is `.claude/rules/patterns.md` § Stateful emitters step 6. The other conditions in the file are existence tests, not re-entrancy guards: `previous !== undefined` at `:71` decides whether a removal happened at all, and `tool === undefined` at `:108` decides whether `remove` has anything to publish.

The check also sits at the only place a window exists. `remove` (`:107-111`) and `clear` (`:114-118`) each mutate and then publish with no listener running in between; `add` is the single path where a listener runs (`emit('remove', previous)`) between the mutation and the publication it would invalidate. One window, one comparison.

The prose states a fact, not a promise. `guides/tool.md:439-440` reads "After the removal listeners return, `add` publishes only if the map still holds that exact replacement", and `types.ts:216-218` and `ToolManager.ts:28-31` carry the same conditional sentence. I found no sentence claiming consistency under every listener — the strongest form anywhere is "Each event describes the registry at the moment it is published" (`guides/tool.md:432`, `types.ts:180`), which is scoped to the moment of publication and is immediately qualified by the replacement sentence that follows it.

## 5. Nothing else moved — CONFIRMED

`git status --porcelain` in the supplied patch (`tmp/units/A8b-diff.patch:909-918`) lists nine files, all owned, and the diff body touches `Tool.ts`, `errors.ts`, `helpers.ts`, and `validators.ts` nowhere. `C:\Users\mikes\WebstormProjects\tool\package.json:3` still reads `"version": "0.0.14"`, and the only manifest hunk is the U8a `@orkestrel/emitter` runtime declaration with its lockfile `dev: true` removal. I globbed `tool/tmp/probe/**` directly: no files, so carrier 9 does not rest on the writer's prose line at `U8c-final-state.log.txt:23`.

On the fence transcription: it sits at `tests/guides.test.ts:289-305`, the identical line range the immutable A8 verdict cited for the U8b state, and it is byte-equal to the guide fence now at `guides/tool.md:447-465`; the executed case at `:473-489` passes inside the `31 passed` guides run (`U8c-tool-gates-orchestrator.log.txt:88`). The provenance conjunct ("U8c did not edit it") is not separately observable from a diff taken against `8f2ad5d`, but the property it stands for is verified two ways.

## 6. Would you ship it as tool 0.0.15? — UNRESOLVED

On everything my lane owns, yes, and without reservation. The event set is three single words mirroring the three mutators, the payloads carry instances, `destroy` announces itself as a final `clear` before the emitter dies so a bridge has a teardown signal without a fourth event, and `ToolManagerOptions` is the pattern's own options shape rather than a rename of `EmitterOptions`. The guide's new `## Patterns` section reads as the package's own voice, states the re-entry bound as a fact a consumer can act on, and carries no banned term (I swept `guides/tool.md` case-insensitively for the `.claude/rules/writing.md` § Substitutions rows plus `ensure`, `guarantee`, and `allows you to`: no matches; the two `never`/`always` hits in `src/core/types.ts:72` and `:101` are pre-existing lines outside this diff). The design question A8 left open is closed and the prose no longer contradicts the code.

What I cannot decide from the supplied evidence is the published artifact, and that is precisely what this round authorizes next — packing `tool` and installing it into agent, mcp, and ollama. This change puts three `@orkestrel/emitter` types into the public declaration surface for the first time: `C:\Users\mikes\WebstormProjects\tool\dist\src\core\index.d.ts:2-4` now imports `EmitterErrorHandler`, `EmitterHooks`, and `EmitterInterface` by bare specifier, consumed at `:300`, `:355`, `:448`, and `:450`. The package ships the gate that proves a consumer can resolve them — `tests/distribution.test.ts` packs the workspace, installs the tarball into a throwaway consumer, and typechecks the installed declarations — registered as the `distribution` project at `vite.config.ts:99-109` and reachable as `test:distribution` at `package.json:65`. It is **not** in the `test` chain (`package.json:55` runs `test:src`, `test:policy`, `test:config`, `test:setup`, `test:guides`), it appears in neither the writer's acceptance table nor `U8c-tool-gates-orchestrator.log.txt`, and `npm run build` exiting 0 proves the extractor emitted a declaration, not that a consumer resolves it.

What would settle it: `npm run test:distribution` in `C:\Users\mikes\WebstormProjects\tool`, read bare. If it exits 0, claim 6 closes and I would ship 0.0.15 as it stands. **Referral:** the distribution gate is a dependency and packaging question rather than a design one, and no objective lane ran this round, so the ruling on it is the Orchestrator's.

---

## Findings outside the claims

None.

---

## Attacked and held

**Claim 4, the third-instance interleaving.** A `remove` listener that installs a different tool under the same name during a replacement looked like the guard's blind spot. Traced through `ToolManager.ts:69-72`: the inner `add` runs its own guard, publishes `remove(replacement)` and `add(third)`, and the outer guard then reads `third !== replacement` and correctly suppresses the stale `add`. Stream and map agree. The guard is correct here; only its *proof* is missing, which is claim 3's note.

**Claim 4, the `add` that `destroy` silently invalidates.** During `destroy()`, a `clear` listener calling `manager.add(tool)` publishes `add(tool)` into a still-live emitter, and `ToolManager.ts:123` then empties the map with nothing published — the same shape as the defect this round repaired. It is not the defect: `guides/tool.md:469-471` states it outright ("then empties the map again without publishing. It returns with an empty registry even if a `clear` listener added a tool"), `ToolManager.test.ts:329` pins the published `add`, and every alternative ordering is worse — destroying the emitter first loses the teardown `clear` a bridge needs, and re-checking after the listeners return is the guarded-notify loop the A8 bound forbids. Least machinery that returns empty.

**Claim 4, `destroy` against the fixed lifecycle vocabulary.** `.claude/rules/names.md` § Fixed lifecycle vocabulary gives `destroy` the meaning "tear down and release resources", and a destroyed `ToolManager` still accepts `add` and still dispatches `execute`, which reads like a vocabulary violation. It is the ecosystem's own shape: the installed `Emitter` documents the identical tolerance — "After `destroy()`, `on` / `once` / `emit` do nothing and `destroyed` is `true`" (`node_modules/@orkestrel/emitter/dist/src/core/index.d.ts:49-50`), inert rather than throwing. `ToolManager.destroy` mirrors its own emitter, and `types.ts:304-305` states the after-destroy contract where a consumer meets it. Not a defect, and not this unit's to relitigate.

**Claim 4, the sentence that looks like an over-promise.** "Each event describes the registry at the moment it is published" (`guides/tool.md:432`) is loose for `remove` and `clear`, whose payloads describe what left rather than what remains. The two sentences that follow it qualify exactly that case, and F1's warning at `:438` tells a listener not to read absence from the map. Bounded in place; rewriting it would cost more clarity than it buys.

**Claim 1, the adjacent change that looks unscoped and is correct.** `ToolManager.test.ts` renames a pre-existing case from "clears every tool and is a no-op when already empty" to "clears every tool and leaves repeated clears empty" (patch `:904-905`). That is not scope creep: a `clear` on an empty registry is no longer a no-op, because it publishes an empty `clear`, and the old title would have shipped as a false statement about the new behaviour.

**Claim 5, the `emitter` member's full surface.** `ToolManagerInterface.emitter` still hands a consumer `emit`, `clear`, and `destroy`, so any holder can fabricate a registry event. A8 ruled this the accepted cost of `.claude/rules/patterns.md` step 3, shared by every emitter owner in the fleet. Unchanged by U8c, and still not this unit's question.

VERDICT: FAIL 6; outside the claims: none
