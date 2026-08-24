Connection lost, reconnecting to https://agentn.global.api5.cursor.sh (attempt 1)...
Retry attempt 1...
`git -C /home/user/orkestrel/brief status --porcelain` was rejected in this harness (before and after). No files were written. **`ROADMAP.md` is absent** under `/home/user/orkestrel/brief`.

---

## 1. The landed half

**Definition door — `snapshotBrief`: clone → guard → refuse `INVALID`.**  
`cloneJSONRecord` then `isBrief` on that copy. Failure is one coded throw. The freeze lives inside the contract cloner, not a later `seal` step in this file.

```39:46:/home/user/orkestrel/brief/src/core/cloners.ts
export function snapshotBrief(source: Brief): Brief {
	const owned = attempt(() => cloneJSONRecord(source))
	if (!owned.success || !isBrief(owned.value)) {
		throw new BriefError('INVALID', 'Brief carries data that cannot be read as one value', {
			field: 'brief',
		})
	}
	return owned.value
}
```

Callers that snapshot first, then read only the copy: `pinBrief` (`helpers.ts:858-877`), `briefToMarkdown` (`helpers.ts:992-993`), `briefToGoal` (`helpers.ts:1136-1138`), `briefToDispatch` (`helpers.ts:1174-1179`), `BriefManager.#stage` (`BriefManager.ts:130-132`), compiler `#draft` (`BriefCompiler.ts:400`).

**Program door — compiler ownership: clone if possible, else seal live, then guard the owned value.**

```259:262:/home/user/orkestrel/brief/src/core/BriefCompiler.ts
	#own<TValue>(value: TValue): TValue {
		const cloned = attempt(() => structuredClone(value))
		return freezeDeep(cloned.success ? cloned.value : value)
	}
```

`compile` clones the whole `BriefInput` once (`#snapshot` at `BriefCompiler.ts:240-241`: `freezeDeep(structuredClone(input))`), contains a clone throw as `DRAFT_FAILED` (`116-122`). Engine interpret: `#own` then `isInterpretation` (`281-284`). Gate: `#own` then `isLogicalResult` (`197-216`); malformed owned copy throws `GATE_FAILED` (`216-220`).

**Coded clone-fault refusal (engine return).** A conforming class instance clones to an empty own-member object; the guard fails; the stage records `INTERPRET_FAILED` rather than throwing.

```281:290:/home/user/orkestrel/brief/src/core/BriefCompiler.ts
			const read = attempt(() => this.#own(this.#interpret.interpret(text)))
			if (read.success && isInterpretation(read.value)) {
				stages.push(Object.freeze({ stage: 'interpret', input: text, output: read.value }))
				return read.value
			}
			const message = read.success
				? 'The interpret engine returned a non-interpretation result'
				: errorToMessage(read.error)
			// ...
			failures.push(Object.freeze({ stage: 'interpret', code: 'INTERPRET_FAILED', message }))
```

**Supplied-interpretation seal fallback (not a clone-fault refuse).** Snapshot copy fails `isInterpretation`; live value is re-guarded and `freezeDeep`’d in place (`298-308`). Malformed live still `INTERPRET_FAILED`.

The same law is stated on the type, not implemented as a further snapshot of sealed-live members:

```433:440:/home/user/orkestrel/brief/src/core/types.ts
 * - Every value a borrowed engine returns is OWNED AT ARRIVAL — copied where the value
 *   permits it, sealed in place where it does not — and then read exactly once.
 * ...
 *   a supplied interpretation whose snapshot copy
 *   loses prototype-carried members is sealed live rather than refused.
```

Guide restatement: `guides/brief.md:791-807` (`OWN AT ARRIVAL` / `VALIDATE THE OWNED COPY` / `NEVER READ A FOREIGN OBJECT TWICE`).  
`createBriefContract` only hands `briefShape` to `createContract` (`factories.ts:78`); declaration snapshot-guard-seal is not in `brief/src`.

---

## 2. The remaining doors

Guarded sites in `src` where the **same caller object** can be observed again after the guard (a per-read getter can disagree). Doors that already consume only a `snapshotBrief` / successful `structuredClone` copy are omitted.

**`assertBrief` — guard, return identity.**  
Guarded: `unknown` as `Brief`. Not cloned. Later reads are the caller’s object.

```843:847:/home/user/orkestrel/brief/src/core/helpers.ts
export function assertBrief(data: unknown): Brief {
	if (!isBrief(data)) {
		throw new BriefError('INVALID', 'Brief failed the exact-record contract', { field: 'brief' })
	}
	return data
}
```

**`parseBrief` — parse then `isBrief`.**  
Guarded: JSON text via `parseJSONAs(value, isBrief)` (`parsers.ts:25-26`). No clone/seal in this package after the guard. What `parseJSONAs` returns is outside this tree.

**Supplied `interpretation` — guard the snapshot, then possibly re-guard and keep the live object.**  
Guarded: `Interpretation`. Snapshot copy is already cloned at `#snapshot`. On failure, `raw.interpretation` is the original; `isInterpretation(live)` then `freezeDeep(live)` (`299-305`). Afterward `#draft` reads `interpretation.intent`, `.text`, `.entities`, `.ambiguities` (`388`, `408`, `415`). `freezeDeep` freezes in place (`helpers.ts:779-785`); it does not copy accessor results.

**Engine `Interpretation` on the seal arm of `#own`.**  
Guarded: engine return after `#own` (`281-284`). If `structuredClone` throws, the live object is frozen and then guarded. Afterward the same `#draft` / `deriveGivens` / `deriveGaps` reads (`helpers.ts:1271-1282`, `1306-1312`). The clone-empty class-instance path refuses (`INTERPRET_FAILED`); the unclonable-but-conforming path (e.g. `Entity.value` a function) seals live (`BriefCompiler.test.ts:522-558`).

**Gate `LogicalResult` after `#own`.**  
Guarded: `isLogicalResult(verdict)` (`216-222`), then `return verdict`. Afterward `compile` reads `verdict.conclusion` (`161`); `#blockage` calls `isLogicalResult` again and reads `verdict.rules` (`333-337`). If `#own` cloned, those reads are of the clone. If it sealed live, they are further getter reads of the engine object.

**`deriveTask` vocabulary lookup.**  
Guarded: looked-up `operation` / `domain` strings (`helpers.ts:1245-1249`). Maps themselves are not snapshotted. `Object.hasOwn(actions, intent.action) ? actions[intent.action]` reads `intent.action` and the map twice. `intent` is the interpretation object from the doors above. Constructor stores `options?.actions` / `.domains` by reference (`BriefCompiler.ts:90-91`); types say they are read live each `compile` (`types.ts:444-445`).

**Not a second clone-guard in this package (unguarded readers of a typed `Brief`).**  
`findUnmetRules`, `findBlockingGaps`, `findUngrantedAuthority`, `findManifestOverlaps`, `findUnpairedGaps`, `briefToSubject`, `validateBrief`, `briefToHash`, `briefToContent`, `briefToTrace` (`helpers.ts:385-728`) read `source` with no guard and no snapshot. On the compiler path they see a `#draft` `snapshotBrief` result. On an `assertBrief` path they see the original.

**Exported `is*` validators** (`validators.ts:47-190`) only return a boolean; they do not retain the value.  
**`isBriefError`** (`errors.ts:52-53`) then `.code` is an instance check, not a containment snapshot.  
**`brief()` / section builders** adopt caller arrays with no guard (`helpers.ts:278-297`).

---

## 3. The tests

Fixture for clone-drop / live seal: `AccessorInterpretation` and `buildAccessorInterpret` (`tests/setup.ts:186-266`). Counting-vs-stable verdict: `buildCountingReason` / `buildStableReason` (`tests/setup.ts:342-406`). Foreign `Entity.value`: `buildForeignInterpret` (`tests/setup.ts` around `143-184`).

| Pin | File |
| --- | --- |
| Clone-fault → `INTERPRET_FAILED` | `tests/src/core/BriefCompiler.test.ts:561-588` |
| Seal live supplied accessor interpretation | `BriefCompiler.test.ts:590-606` |
| Malformed live supplied still `INTERPRET_FAILED` | `BriefCompiler.test.ts:608-623` |
| Unclonable conforming `Entity.value` sealed, not fail-open | `BriefCompiler.test.ts:522-558` |
| Verdict owned / frozen; one reading vs counting getters | `BriefCompiler.test.ts:436-450`, `469-488` |
| Constructor option read once | `BriefCompiler.test.ts:347-387` |
| Input snapshot deep-frozen | `BriefCompiler.test.ts:389-409` |
| `snapshotBrief` breaks aliases and deep-freezes | `tests/src/core/helpers.test.ts:859-882` |
| Accessor / smuggled line-break refused as `cannot be read as one value` | `helpers.test.ts:780-822` |
| `pinBrief` snapshots before deriving trace/hash | `helpers.test.ts:551-589` |
| `assertBrief` returns the same object by identity | `helpers.test.ts:837-841` |

---

## Unknowns

- `git status --porcelain` before and after: command rejected here; working tree not observed.
- The quoted ROADMAP row: no `ROADMAP.md` (and no matching string) in `src`, `tests`, or `guides`.
- `cloneJSONRecord` / `parseJSONAs` / `createContract` bodies: `@orkestrel/contract`, not this tree.
- Whether `structuredClone` of a given engine result takes the clone arm or the seal arm at runtime, except where tests name the vector (`AccessorInterpretation` clone-empty; function `Entity.value` clone-throw).
