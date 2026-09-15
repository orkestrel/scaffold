# Unit A2-fix-r2 — report

All items R1–R9 landed. Every scoped gate exits 0. One scope decision is recorded under
§ Deviation: R1 falsified three guide prose claims, and I corrected them inside the owned
`guides/agent.md` file rather than shipping false prose.

## Touched files

- `src/core/providers/RelayProvider.ts` — deleted the callable-serializer refusal; the owned
  `cloneJSONValue` snapshot is the sole mechanism; the clone's failure rides as the refusal's
  `cause`; class remarks, `body` remarks, and `body`'s `@throws` restated; the class fence
  reduced to its own construction and one call.
- `src/core/RelayStream.ts` — deleted the duplicate post-registration abort guard; renamed the
  retained handler field `#abort` to `#listener`; added the inbound-abort body sentence to the
  class remarks.
- `src/core/factories.ts` — annotated the `connectRelay` return type in `createRelay`'s fence;
  replaced `createRelayProvider`'s duplicated composition with a short fence plus a
  `{@link createRelay}` pointer in new `@remarks`.
- `src/core/shapers.ts` — the `relayFrameShape` error arm on one line.
- `tests/src/core/providers/RelayProvider.test.ts` — the two refusal cases inverted into three
  wire-body cases; added the refusal-cause case.
- `tests/src/core/factories.test.ts` — restored the exact-limit byte-length control.
- `tests/src/core/AgentProvider.test.ts` — the stalled exact-bound 503 provider deadline 80 ms → 200 ms.
- `guides/agent.md` — the `connectRelay` signature mirrored in the "Relaying a browser provider
  through your own server" fence; three prose claims corrected.

`git diff --stat`:

```text
 guides/agent.md                                |  12 ++-
 src/core/RelayStream.ts                        |  12 +--
 src/core/factories.ts                          |  27 ++++---
 src/core/providers/RelayProvider.ts            |  56 +++++++-------
 src/core/shapers.ts                            |   5 +-
 tests/src/core/AgentProvider.test.ts           |   2 +-
 tests/src/core/factories.test.ts               |   1 +
 tests/src/core/providers/RelayProvider.test.ts | 103 +++++++++++++++++++++----
 8 files changed, 143 insertions(+), 75 deletions(-)
```

`tests/setup.ts` is untouched. R1's `arguments` case needed no new fixture: `createHostileSerializer`,
`createToolCall`, and `RecordedTransport` already exist there and carry it.

## Red then green

Command for R1 and R2, run at `C:\Users\mikes\WebstormProjects\agent`:

```text
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/providers/RelayProvider.test.ts
```

- **R1 and R2 red, before the source change:** `Tests 3 failed | 10 passed (13)`. The failures
  are the hostile-`parameters` wire-body case and the hostile-`schema` wire-body case, each
  rejecting `ProviderError: relay request is not JSON` from `RelayProvider.ts:129`, plus the
  cause case, `expected undefined to be an instance of ContractError`.
- **R1 and R2 green, after:** `Tests 13 passed (13)`.

Failing-first test names:

- `sends the snapshot of hostile parameters and never consults their serializer`
- `sends the snapshot of a hostile schema and never consults its serializer`
- `carries the projection failure as the refusal cause`

The third wire-body case, `sends the snapshot of hostile call arguments and never consults their
serializer`, passed against the pre-fix code. That is the verdict's own F11 reading: the deleted
refusal never covered `messages[].calls[].arguments`, so the clone was already the only mechanism
there. It is a control on the claim that one method answered the same input two ways, and the brief
predicted it ("the current code throws `PROTOCOL` for two of them").

**R6** restores a control over a value the code already produces, so it has no failing-first state.
I proved it binds with a mutation planted in the same owned test and removed in the next command:
changing the exact-limit body to `padEnd(DEFAULT_RELAY_LIMIT - 1)` and running

```text
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/factories.test.ts -t "refuses valid JSON at exactly the default limit"
```

returned `Tests 1 failed | 58 skipped (59)`, failing at the restored assertion line
(`expected 1048575 to be 1048576`). With the plant removed the same command's file runs green inside
`test:src:core` (`753 passed`). The restored assertion is therefore what distinguishes "at the limit"
from "not at the limit", which is F5's complaint.

**R7** is a budget change and has no failing-first state either. The case reads the same both ways:
before, `timeout: 80`, green; after, `timeout: 200`, green, with
`expect(requireValue(transport.signals[0]).aborted).toBe(false)` and the `ProviderError` / `HTTP` /
`503` rejection shape unchanged. The case's own Vitest budget stays 400 ms, which now clears the
provider deadline by 200 ms rather than by 320 ms; the deadline is the binding constraint, and a run
that trips it fails on the aborted-false assertion rather than on the budget.

## Prose

**R5.** The full browser-and-server composition now appears once, on `createRelay`'s `@example`
(`grep -c connectRelay` returns 1 in `src/core/factories.ts` and 0 in `src/core/providers/RelayProvider.ts`).

- `createRelay`'s fence: unchanged except the `connectRelay` return-type annotation and the
  `import type { DispatcherInterface } from '@orkestrel/router'` line it needs. That fence is titled
  `Relaying a browser provider through your own server` and mirrored in `guides/agent.md` under the
  heading of that title, **so the guide fence changed identically in the same edit**. The
  transcription in `tests/guides.test.ts` asserts other lines of that fence and needed no change;
  `test:guides` is green.
- `createRelayProvider`'s fence: replaced by a short fence constructing the provider and making one
  `generate` call, with a new `@remarks` pointing at the composition through `{@link createRelay}`.
  Untitled, mirrored nowhere, **so the guide was not changed for it**.
- `RelayProvider`'s fence: the same short fence over `new RelayProvider(...)`, with the
  `{@link createRelay}` pointer added to the existing class `@remarks`. Untitled, mirrored nowhere,
  **so the guide was not changed for it**.
- Both new fences annotate their function's return type, matching the `RelayStream` fence, which is
  F4's secondary point.

**R9.** `RelayStream`'s class `@remarks` gained one sentence: an inbound abort leaves the response
body neither closed nor errored, a server runtime cancels that body when the client disconnects, and
a consumer that aborts the inbound signal itself must cancel the body rather than keep reading it.
No guide change: the guide's relay-protocol clause already states the cancellation path, and this
sentence is the class-level consumer obligation.

**R1's doc blocks.** `RelayProvider`'s class `@remarks` now states that the wire body is an owned
snapshot of the projection, so a custom serializer on an argument, a parameter schema, or a response
schema is ignored rather than consulted, and a value outside JSON is refused before fetching.
`body` gained a `@remarks` naming the property-descriptor read, and its `@throws` now names both arms:
the snapshot that cannot be taken, carrying that failure as its `cause`, and the snapshot the contract
rejects. `grep -n "toJSON" src/core/providers/RelayProvider.ts` returns nothing, so the token stays
out of the source per the acceptance criterion while the rule is stated in words.

## Scoped validation

Every command run at `C:\Users\mikes\WebstormProjects\agent`.

| Command                | Exit | Reading                          |
| ---------------------- | ---- | -------------------------------- |
| `npm run format:check` | 0    | All matched files use the correct format (87 files) |
| `npm run lint:check`   | 0    | no output                        |
| `npm run check`        | 0    | no output                        |
| `npm run test:src:core`| 0    | `Test Files 23 passed (23)`, `Tests 753 passed (753)` |
| `npm run test:setup`   | 0    | `Test Files 1 passed (1)`, `Tests 54 passed (54)` |
| `npm run test:guides`  | 0    | `Test Files 1 passed (1)`, `Tests 39 passed (39)` |

The baseline at `c052711` was `23 files, 751 tests`; the change removes two refusal cases and adds
four, so 753 is the expected count.

Acceptance criteria, each checked:

1. `format:check`, `lint:check`, `check` — exit 0, preceding table.
2. `test:src:core`, `test:setup`, `test:guides` — exit 0, every file collected, preceding table.
3. `grep -n "toJSON" src/core/providers/RelayProvider.ts` — no output. The three wire-body cases:
   two were red, all three are green.
4. The `cause` case was red and is green.
5. `grep -c "this.#abortProvider()" src/core/RelayStream.ts` — `3`, at `:38` (the constructor's
   single pinned guard), `:80` (the pull's error path), and `:88` (`#cancel`).
6. `grep -n "#abort\b" src/core/RelayStream.ts` — no output.
7. The full composition appears once, on `createRelay`; the other two fences link to it.
8. R6 and R7 as stated; R8 by inspection (the error arm is one line beside its siblings); R9 present.
9. No `any`, type assertion, non-null assertion, suppression, access modifier, parameter property, or
   nested function declaration in the diff. The only added functions are anonymous callbacks passed
   directly as arguments (`() => new Response(RELAY_RESULT_FRAME)`). `lint:check` and `check` agree.

## Observations

- **`build` and the whole `test` chain were not run**, per the brief. They are the Orchestrator's.
- **R2's boundary is narrower than the literal instruction, deliberately.** The brief said "`body`'s
  catch passes `{ cause }`". Keeping one try block around everything would have made the contract
  rejection wrap its own `ProviderError` as its `cause`, which reports a cause that carries no
  information. I moved the contract check out of the try instead, so the boundary covers the
  projection reads and the clone, and the guard rejection throws directly with no cause. The test
  pins that distinction: it asserts the cause is a `ContractError`, which is what
  `cloneJSONValue` throws. This is F3's "say on `@throws` what the refusal covers" rather than a
  change of the refusal itself; both arms still throw `ProviderError('PROTOCOL', 'relay request is
  not JSON')`, so no consumer-visible behaviour moved.
- **R4's new field name is `#listener`.** The deviation contract gave me the name. `#cancel` was
  taken by the method it binds, and the class already names the retained registration through
  `#release`, so `#listener` removes the `abort`/`cancel` alternation without introducing a third
  term for the inbound cancellation.
- **The probe that settled R2's cause type ran and was deleted.** It read `cloneJSONValue` against
  `{ value: Infinity }`, `{ value: createParser }`, and the hostile proxy: the first two throw
  `ContractError`, and the proxy clones to `{"x":1}` with no serializer on the clone. That
  confirms the Orchestrator's F11 mutation row independently, from inside this checkout.
  The file was `tmp/probe/a2-fix-r2-cause.test.ts`; `tmp/probe/` holds only the two pre-existing
  `.txt` files again.
- **One formatting correction was needed and I could not run `format`.** I copied the test file to
  the session scratchpad, ran `oxfmt` against the copy, read the diff, applied it by hand, and
  deleted the copy. No mutating command ran in the tree.

## Deviation

**One scope decision, carried rather than stopped on, because the file is inside Owned.**

R1 makes three prose claims in `guides/agent.md` false. The brief lists `guides/agent.md` as owned
"for R5's parity only", and its § "What asserts the state this change ends" names "any guide fence
mirroring a consolidated source fence (R5); nothing else". That last clause is not correct: the
following prose asserted the deleted refusal, and `test:guides` cannot see it, because the parity
gate compares summaries, titled examples, and export names, never a sentence about behaviour.

- Line 438 (§ The relay): "`RelayProvider.body` refuses a request the JSON wire cannot carry — a
  non-JSON tool argument, **a parameter schema with a synthetic serializer** — before it fetches."
- Line 1007 (invariant 35): "`body` **refuses a projected value carrying a synthetic serializer**,
  clones the projection through Contract's `cloneJSONValue`, and validates that clone".
- Line 1456 (the test-file index): "a **synthetic `parameters` or `schema` serializer rejected before
  fetching**".

I corrected each to what the code now does: the snapshot is the sole mechanism, a custom serializer
is ignored rather than consulted, the refusal that remains covers a value outside JSON and a snapshot
the contract rejects, and that refusal carries the clone's failure as its `cause`. Line 1456 also now
names the `arguments` case and the cause case, which are the tests it indexes.
`.claude/rules/documentation.md` is the reason: "Never suppress a parity failure. Correct the drift",
and "Re-read the prose last, against what actually shipped." Leaving those sentences would have
shipped three false claims to every consumer who installs the package, with a green gate over them.

Revert those three hunks if the Orchestrator rules the file scoped tighter than its own law; nothing
else in the change depends on them.

**No other deviation.** No item needed a file outside Owned, and no item changed a behaviour the
ruled contract fixes. No off-limits file was touched.

## Status

`git status --porcelain`:

```text
 M guides/agent.md
 M src/core/RelayStream.ts
 M src/core/factories.ts
 M src/core/providers/RelayProvider.ts
 M src/core/shapers.ts
 M tests/src/core/AgentProvider.test.ts
 M tests/src/core/factories.test.ts
 M tests/src/core/providers/RelayProvider.test.ts
```
