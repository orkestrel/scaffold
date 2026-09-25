# J-RELEASE-CORE round 3 — the objective lane's verdict (2026-09-25)

`analyst` on GPT-6 Astra, read-only `codex exec`, thread `01a0d7bd-fcd7-7d00-96c2-91dcdf9e5612`, journal `tmp/codex/j-release-core-audit-3.jsonl` (swept at acceptance). The brief is `units/j-release-core-audit-3-analyst-brief.md`. The lane's final message follows verbatim.

Source review of `8b4e9d6` against `03526bc`; no tests run. Round-2 inputs were retraced through the source. Runtime results below come from the supplied logs. Evidence filenames are relative to `scaffold/.orkestrel/veneer/engine/units/`; source citations refer to `8b4e9d6`.

| Claim | Verdict | Evidence and ruling | Mutation and assertion distinction |
|---|---|---|---|
| **1. Owner membership uses no event listener** | **CONFIRMED** | `src/browser/Lifetime.ts:78` holds the resource in its owner; `:84` holds the ending in the child lifetime. `#end` at `:137` removes by record without invoking a release or consumer code. The event listener at `:87` belongs exclusively to the foreign-signal branch. | `join-ending-omitted` leaves membership behind. `ending-releases-once` adds an unwanted destruction, distinguished by the release sequences at `tests/src/browser/Lifetime.test.ts:269` and `:387`. `ending-releases` also breaks the no-throw assertion at `:268`. |
| **2. Joined-child release errors propagate** | **CONFIRMED** | Retracing owner destruction: owner release → child drain → throwing holding removed → remaining child holdings released → ending removes owner membership → child rethrows → owner drains its remaining holdings and rethrows. Direct child destruction follows the same child path. See `src/browser/Lifetime.ts:118`, `:131`, `:143`; assertions at `tests/src/browser/Lifetime.test.ts:294` and `:309`. The original red log reports the lost errors as unhandled; `j-release-core-report-3.md:12` records the failed assertions. | `base-03526bc` makes each `toThrow` assertion fail (`j-release-core-replay-3.log.txt:311`). `drain-past-throw` distinguishes completion of the remaining releases (`:123`). The subject passes the whole-file replay (`:2`). |
| **3. An ended child leaves no owner holding** | **CONFIRMED** | Retracing `child.destroy(); Lifetime.join(owner.signal, child, child)`: the owner initially enrolls the child, but the child's fresh ending record immediately releases through `hold`, calling `#end`. Consequently `owner.release(child)` returns `false`. See `src/browser/Lifetime.ts:84`, `:104`, `:137`; assertion at `tests/src/browser/Lifetime.test.ts:320`. | `ended-enrolled`, `join-ending-omitted`, and `base-03526bc` change that result to `true`. The replay records the distinguishing failures at `j-release-core-replay-3.log.txt:374`, `:48`, and `:315`. |
| **4. Reach stays whole** | **CONFIRMED** | Under the stated empty-lifetime precondition, appending the ending at `src/browser/Lifetime.ts:84` makes it oldest; the reverse drain at `:121` runs it last. Before that ending, nested owner destruction still finds the child and reruns its pending release. `tests/src/browser/Lifetime.test.ts:338` checks that ordering. The Button case records the restored host immediately after nested owner destruction (`tests/src/browser/Button.test.ts:828`, `:832`). Button, the shipped adopter, joins before holding its snapshot (`src/browser/Button.ts:68`). No other shipped class calls `Lifetime.join`. E35’s planned adopters have no implemented join ordering here; none is shown to require prior holdings. The remark at `src/browser/Lifetime.ts:44` is sufficient as a caller precondition, but does not support arbitrary joins of populated lifetimes. | `ending-at-abort` and `join-ledger-3` distinguish lost nested reach. `ending-newest` makes the Button observation `[false, 'true']` instead of `[false, null]` (`j-release-core-replay-3.log.txt:322`). These assertions observe the nested return, so eventual restoration cannot satisfy them. |
| **5. Mutations bind** | **CONFIRMED** | The supplied mutation log and replay contain matching mutation results. Each row has a distinguishing assertion failure. `ending-releases` also produces `RangeError`; `ending-releases-once` produces assertion failures without recursion (`j-release-core-replay-3.log.txt:337`, `:365`). The instrument classifies each case’s first failure message (`j-release-core-3-mutate-3.mjs:63`); this establishes the recorded case failures, not exhaustive runner-error classification. | The claim-specific distinctions appear in this table; carried proofs appear in the following table. A passing companion test file does not invalidate a row whose named discriminating assertion fails. |
| **6. Documentation describes the behavior accurately** | **FAIL** | The owner-ending, ordering, precondition, and joined-error descriptions match the code (`guides/veneer.md:1028`). However, `src/browser/Lifetime.ts:55` includes an already-aborted foreign signal, then says the destruction runs in an abort listener (`:56`). That path actually calls `resource.destroy()` directly at `:85`: an exception propagates synchronously from `join`. The guide’s narrower statement about a signal **when it aborts** at `guides/veneer.md:1036` is accurate. The TSDoc must distinguish immediate destruction from event-dispatched destruction. | No supplied assertion distinguishes this exception boundary. The foreign-signal case at `tests/src/browser/Lifetime.test.ts:234` uses nonthrowing destruction callbacks; `join-unlisten` tests listener removal, not exception propagation. |
| **7. Scope and shape** | **CONFIRMED** | The commit diff contains only `guides/veneer.md`, `src/browser/Lifetime.ts`, `tests/src/browser/Button.test.ts`, and `tests/src/browser/Lifetime.test.ts`, matching `j-release-core-3-status.txt:1`. `LifetimeInterface` at `src/browser/types.ts:337` is unchanged. The ending is private (`src/browser/Lifetime.ts:137`), and the owner branch retains no compatibility listener. | Established by source and commit-diff inspection; behavioral mutations do not prove file scope or API shape. |

The carried proofs have these distinguishing assertions.

| Mutation | Assertion that distinguishes it |
|---|---|
| `base-d702bb8`, `hold-held-after-destroy` | An already-held record returns `false` after destruction begins: `tests/src/browser/Lifetime.test.ts:154`. |
| `button-join-after-hooks` | The getter observes restoration before owner destruction returns: `tests/src/browser/Button.test.ts:800`. |
| `drain-nested`, `button-latch` | Nested destruction completes pending work: `tests/src/browser/Lifetime.test.ts:49`; `tests/src/browser/Button.test.ts:762`, `:832`. |
| `same-entry` | A replacement entry survives completion of the earlier release: `tests/src/browser/Lifetime.test.ts:84`. |
| `newest-first` | Release order and first-error selection remain correct: `tests/src/browser/Lifetime.test.ts:16`, `:126`. |
| `hold-after-destroy` | A fresh record releases immediately and is not retained: `tests/src/browser/Lifetime.test.ts:92`. |
| `drain-past-throw`, `first-error` | Remaining holdings release, and the first error propagates: `tests/src/browser/Lifetime.test.ts:126`, `:127`, `:295`, `:310`. |
| `join-ledger-3` | Joined destruction occurs in ledger order, after abort notification: `tests/src/browser/Lifetime.test.ts:216`. |
| `join-unlisten` | A later foreign abort invokes no destruction: `tests/src/browser/Lifetime.test.ts:253`. |
| `write-no-record` | Consumer edits survive an unchanged write: `tests/src/browser/HostSnapshot.test.ts:1444`. |
| `write-join` | Live and pending records survive an earlier restoration: `tests/src/browser/HostSnapshot.test.ts:1470`, `:1516`. |
| `write-change` | Restoration recovers the original host values: `tests/src/browser/HostSnapshot.test.ts:1428`. |
| `priority` | A priority change is recorded and restored: `tests/src/browser/HostSnapshot.test.ts:1454`, `:1457`. |
| `claim-before-drain` | Replacement construction during restoration succeeds and retains ownership: `tests/src/browser/Button.test.ts:245`, `:249`. |
| `button-construction-save` | An unwritten consumer value survives destruction: `tests/src/browser/Button.test.ts:732`. |
| `button-snapshot-held` | Destruction restores host state, including the nested observation: `tests/src/browser/Button.test.ts:832`. |

Claim 6 has this smallest source-derived counterexample; it was not executed:

```ts
Lifetime.join(
	AbortSignal.abort(),
	{
		destroy() {
			throw new Error('release failed')
		},
	},
	new Lifetime(),
)
```

The error escapes synchronously from `join` through `src/browser/Lifetime.ts:85`. No listener is installed or dispatched.

No additional behavior defect outside the claims was established.

VERDICT: FAIL 6