# J-RELEASE-CORE round 2 — the objective lane's verdict (2026-09-25)

`analyst` on GPT-6 Astra, read-only `codex exec`, thread `01a0d7a2-f642-7782-9fe4-2251a2024849`, journal `tmp/codex/j-release-core-audit-2.jsonl` (swept at acceptance). The brief is `units/j-release-core-audit-2-analyst-brief.md`. The lane's final message follows verbatim.

Source review of `03526bc` against `d702bb8`; no tests run. Runtime evidence comes from the supplied replay. Source citations refer to `03526bc`; evidence filenames are under `scaffold/.orkestrel/veneer/engine/units/`.

| Claim | Verdict | Evidence and ruling | Mutation and assertion distinction |
|---|---|---|---|
| **1. `hold` after destruction** | **CONFIRMED** | `src/browser/Lifetime.ts:93` returns `false` for an existing holding after abort, preserving its original release. A previously unheld record enters the ledger and releases immediately at `:96`. Re-tracing the round-1 abort-listener input therefore returns `false`; the drain subsequently runs the first release. `tests/src/browser/Lifetime.test.ts:144` asserts these results. | `hold-held-after-destroy` changes the recorded result from `false` to `true`; `hold-after-destroy` distinguishes immediate release of an unheld record. `base-d702bb8` reproduces the original assertion failure. See `j-release-core-replay-2.log.txt:11`, `:31`, and `:95`. |
| **2. `join` leaves with its child** | **CONFIRMED** | The listener is installed only after a successful hold (`src/browser/Lifetime.ts:72`, `:76`). Direct destruction follows child abort → owner release → nested child destruction → child drain → removal of the owner’s entry. Owner destruction follows newest holding → child destruction → that same nested sequence → older holding. The assertions distinguish these orderings at `tests/src/browser/Lifetime.test.ts:269` and `:321`. Construction-time destruction and construction failure leave no holding (`tests/src/browser/Button.test.ts:805`, `:822`). Button’s nested destruction skips claim release and drains its lifetime (`src/browser/Button.ts:125`). The listener itself cannot loop: the signal is already aborted, and the listener is removed before invocation. An adopter must still meet the resumable-release contract; these cases do not establish arbitrary release correctness. Error propagation has the separate defect under claim 5. | `join-no-child-release` distinguishes direct retirement, repeated cycles, and construction cleanup. `join-ledger` distinguishes ledger order from abort-listener order; `newest-first` distinguishes release order. Assertions inspect the release sequence, subsequent `owner.release(...) === false`, and absence of later destruction. See replay `:38`, `:82`, and `:119`. |
| **3. Button joins first** | **CONFIRMED** | `src/browser/Button.ts:61` reads the signal before claiming the host at `:63`; `:68` joins before holding the snapshot and reading hooks. Re-tracing the round-1 getter reaches the button through the owner’s ledger, releases its claim, and restores the host before `owner.destroy()` returns. The getter records `[null, false]` at `tests/src/browser/Button.test.ts:795`; the assertion is at `:800`. | `button-join-after-hooks` and `base-d702bb8` produce `['true', true]` instead. The observation occurs inside the getter, so restoration after the getter returns cannot satisfy it. See replay `:23` and `:56`. |
| **4. The mutations bind** | **CONFIRMED** | Every mutation row has a named assertion failure in `j-release-core-replay-2.log.txt:11` onward. The `button-snapshot-held` row reports **38 failed cases, all classified `AssertionError`**, at `:205`, with the individual cases following. The instrument classifies each failed case’s first failure message (`j-release-core-2-mutate-2.mjs:61`). This establishes the recorded case failures, not absence of every possible runner-level error. | The assertions distinguish the mutations as detailed in this table and the mapping following it. The passing Button run under `hold-held-after-destroy` is expected: its discriminating assertion belongs to the Lifetime case. Mutation success does not cover the joined-error path described under claim 5. |
| **5. Contract and documentation truth** | **FAIL** | The amended hold, enrollment, and snapshot descriptions match their intended paths (`src/browser/types.ts:338`, `:350`, `:461`; `src/browser/HostSnapshot.ts:26`; `guides/veneer.md:1022`). However, the guide promises propagation of the first release error at `guides/veneer.md:1019`, matching `src/browser/types.ts:382`. Joining a real `Lifetime` makes its release run inside the library-installed abort listener (`src/browser/Lifetime.ts:76`). A throwing child holding is removed by the nested drain; its error escapes into event dispatch, while the original destruction resumes with an empty ledger and returns normally (`:111`, `:123`, `:132`). The smallest input and derivation follow. This is a behavioral contract defect. | `drain-past-throw` and `first-error` distinguish continuation and error selection for ordinary holdings (`tests/src/browser/Lifetime.test.ts:115`). They do **not** distinguish loss of an error through the child-release listener: the throwing case contains no joined lifetime, and the joined cases contain no throwing release. Snapshot claims are distinguished by `write-no-record`, `write-change`, `write-join`, and `priority`. |
| **6. Scope and shape** | **CONFIRMED** | The commit’s changed paths match `j-release-core-2-status.txt:1`: the guide; Button, HostSnapshot, Lifetime, and browser types; and their named test files. `src/browser/Lifetime.ts:24` remains one flat class. Its function expressions are permitted anonymous argument callbacks; it contains no type assertion or compatibility branch. | Static inspection establishes these properties. Behavioral mutations do not prove file placement or syntax policy. |
| **7. The residue** | **CONFIRMED** | The omission exists: `src/browser/Lifetime.ts:72` holds the resource without checking whether its own lifetime has already aborted; `:76` then installs a listener too late. **No shipped constructor path reaches it:** Button creates its private lifetime at `src/browser/Button.ts:37`, and its only join occurs before exposure to hooks at `:68`; successful registry claim runs no consumer code (`src/browser/Registry.ts:33`). **The exported primitive remains callable with an ended real Lifetime**, using the documented resource/lifetime shape (`src/browser/Lifetime.ts:57`; browser export at `src/browser/index.ts:8`). Thus internal-constructor unreachability is not a public-API prohibition. | `button-join-after-hooks` demonstrates the consequence when construction enrollment is delayed. No supplied assertion directly covers calling the exported primitive with an already-ended lifetime. The existing example case joins before destruction (`tests/src/browser/Lifetime.test.ts:276`). |

The remaining mutation proofs have these distinguishing assertions.

| Mutation | Assertion that distinguishes it |
|---|---|
| `drain-nested`, `button-latch` | State recorded immediately after nested destruction must already be restored (`tests/src/browser/Lifetime.test.ts:49`, `:63`; `tests/src/browser/Button.test.ts:762`). |
| `same-entry` | A replacement holding survives completion of the earlier entry (`tests/src/browser/Lifetime.test.ts:84`). |
| `newest-first` | Recorded release order is newest first (`tests/src/browser/Lifetime.test.ts:16`, `:321`). |
| `drain-past-throw`, `first-error` | Older holdings release despite failure, and the thrown error is `newer` (`tests/src/browser/Lifetime.test.ts:126`). |
| `join-ledger` | The joined release occurs between newer and older holdings, after abort notification (`tests/src/browser/Lifetime.test.ts:216`). |
| `join-unlisten` | Aborting a foreign signal after child destruction invokes no destruction callback (`tests/src/browser/Lifetime.test.ts:253`). |
| `write-no-record` | Consumer edits survive restoration after an unchanged write (`tests/src/browser/HostSnapshot.test.ts:1444`). |
| `write-change` | Restoration returns the original attribute, tokens, and style presence (`tests/src/browser/HostSnapshot.test.ts:1428`). |
| `write-join` | State survives the earlier holder’s restoration, including takeover of a pending restoration, and restores after the final holder leaves (`tests/src/browser/HostSnapshot.test.ts:1470`, `:1516`). |
| `priority` | Equal values with differing priorities compare unequal; recording and restoration preserve priority (`tests/src/browser/helpers.test.ts:1558`, `:1660`, `:1746`; `tests/src/browser/HostSnapshot.test.ts:1454`). |
| `claim-before-drain` | Replacement construction during restoration succeeds without a registry error and retains ownership (`tests/src/browser/Button.test.ts:245`, `:249`). |
| `button-construction-save` | Destruction preserves the consumer’s `mixed` value when the button never wrote (`tests/src/browser/Button.test.ts:732`). |
| `button-snapshot-held` | Destruction restores changed host state, including the construction-getter observation (`tests/src/browser/Button.test.ts:165`, `:800`). |

The claim-5 failure follows from this smallest source-derived input; it was not executed during this audit.

```ts
const owner = new Lifetime()
const child = new Lifetime()

Lifetime.join(owner.signal, child, child)
child.hold({}, () => {
	throw new Error('release failed')
})

owner.destroy()
```

The owner calls `child.destroy()`. Child abort dispatch invokes `owner.release(child)`, which calls `child.destroy()` again. That nested drain throws after removing the child’s holding; the owner’s release also removes its entry in `finally`. DOM event dispatch reports the exception to the global object rather than propagating it through `abort()`. The original child and owner destructions consequently return normally. Calling `child.destroy()` directly has the same loss. This inference follows the source and the [DOM listener exception rules](https://dom.spec.whatwg.org/#concept-event-listener-inner-invoke). Neither a foreign implementation nor a consumer-installed abort listener is required.

The claim-7 residue is reachable through the exported primitive with this input; it also was not executed during this audit.

```ts
const owner = new Lifetime()
const child = new Lifetime()

child.destroy()
Lifetime.join(owner.signal, child, child)
owner.release(child) // true: the ended child was retained
```

No additional behavior defect outside the enumerated claims was established.

VERDICT: FAIL 5