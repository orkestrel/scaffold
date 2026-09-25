J-RELEASE-RECORD round 2 — writer report (opus on Opus 5.5)

## J-RELEASE-RECORD round 2 report

All three round-2 obligations are closed and every scoped run and gate is green. I departed from the brief in two places. The destroy witness's new after-show assertion read red at `a1041bd`, not green as the brief expected. And one Carousel door proved unreachable, so I removed it.

### Measurements, taken before any source edit
- **Obligation 1, replacement case at `a1041bd`: red.** "closes the dropdown a listener to the sibling blur forms around the sibling, as Bootstrap reads it after the blur" fails at `Tab.test.ts:852`, `expect(item.getAttribute('aria-expanded')).toBe('false')`: `expected null to be 'false'`.
- **Destroy witness with the after-show assertion at `a1041bd`: red, where the brief expected green.** "restores every write its swap made when a listener to the sibling blur makes the sibling wrapper a dropdown" fails at `Tab.test.ts:824`, `expect(item.getAttribute('aria-expanded')).toBe('false')`: `expected null to be 'false'`. This follows from the code: the take-time read at `a1041bd` never writes the wrapper, so an assertion that it reads `"false"` after `show()` cannot pass there. The destroy assertion after it was green at `a1041bd`, as in round 1.
- **Obligation 2 at `a1041bd`: green.** "records a write of the value an inline property holds when the property carries a priority, in the call and in the snapshot" passes: 1 passed, 106 skipped.
- **Obligation 2 with `snapshot.write` replaced by `writeHostValue` in `recordHostWrite`: red.** It fails at `helpers.test.ts:1725`: `expected [ '0px', '' ] to deeply equal [ '0px', 'important' ]`.

### Tab's new read sites, verbatim
The role reads are back where `b8c6a08` had them, after the pre-change dispatches:
```ts
		const leaving = outgoing?.getAttribute('role') === 'tab'
		const entering = host.getAttribute('role') === 'tab'
```
The sibling's selection is read after its blur and its pane's writes:
```ts
			// The sibling's selection, the dropdown that holds it included, is read here, after the blur
			// and the pane writes, as Bootstrap reads it.
			if (leaving) {
				for (const [target, value] of this.#selection(outgoing, false)) {
					written = recordHostWrite(written, target, value, snapshot)
					if (!this.#holds(change, expected, [])) return this.#rewind(change, written)
				}
			}
```
The host's selection is read after its `active` write:
```ts
		// The host's selection is read here, after its `active` token write, as Bootstrap reads it.
		if (entering) {
			for (const [target, value] of this.#selection(host, true)) {
				written = recordHostWrite(written, target, value, snapshot)
				if (!this.#holds(change, true, [])) return this.#rewind(change, written)
			}
		}
```

### Obligation 3: the doors after split writes
In each case, a reaction to the first write of a pair destroys the engine. Each case then asserts two things:
- No mutation record reached the observer after the destruction. This reads the observer's recorder plus `takeRecords`.
- The class state the destruction restored.

| Door | Binding case |
|---|---|
| Collapse show: `host` token add, then `shown` add | "writes no shown token after a reaction to its host token write destroys it, leaving the panel restored" |
| Collapse hide: `host` token removal, then `shown` removal | "removes no shown token after a reaction to its host token removal destroys it, leaving the panel shown" |
| Toast show: `shown` add, then `transition` add | "writes no transition token after a reaction to its shown token write destroys it, leaving the toast restored" |
| Toast hide: `transition` removal, then `shown` removal | "removes no shown token after a reaction to its transition token removal destroys it, leaving the toast shown" |
| Tab: previous pane's `active` removal, then its `shown` removal | "removes no shown token from the sibling pane after a reaction to its active token removal destroys it, leaving that pane shown" |
| Carousel: incoming `direction` removal, then its `order` removal | "writes nothing more after a reaction to its incoming direction removal destroys it, keeping an order token added then" |
| Carousel: outgoing `active` removal, then its `order` removal | "writes nothing more after a reaction to its outgoing active removal destroys it, keeping an order token added then" |
| Carousel: outgoing `order` removal, then its `direction` removal | No input reaches it, so I removed it. Every door from the incoming order write onward requires the outgoing item to lack the order token. The outgoing `order` removal therefore never changes anything, runs no consumer code, and leaves the state the previous door just read. I kept the write, which is Bootstrap's and a no-op, and added a comment explaining why no door follows it. |

In both Carousel cases, the destruction's restoration already writes the `order` token back. So the reaction adds that token again after destroying. That way, a second write that landed would be visible.

### Mutation table
Every source file was restored byte for byte by `tmp/j-release-record/mutate.sh`, and each checksum matched.

| Mutation | Red reading |
|---|---|
| `recordHostWrite` through `writeHostValue` | Tab destroy witness fails at `Tab.test.ts:826`, `expect(item.hasAttribute('aria-expanded')).toBe(false)`: `expected true to be false`. Obligation 2's case fails at `helpers.test.ts:1725`: `expected [ '0px', '' ] to deeply equal [ '0px', 'important' ]` |
| Tab's take-time read restored | Both cases read `expected null to be 'false'`: the replacement case at `Tab.test.ts:852`, and the destroy witness at `Tab.test.ts:824` |
| Collapse show door removed (`Collapse.ts` 272–274) | `Collapse.test.ts:844`, the records assertion: `expected [ MutationRecord{} ] to deeply equal []` |
| Collapse hide door removed (`Collapse.ts` 352) | `Collapse.test.ts:878`, the same assertion |
| Toast show door removed (`Toast.ts` 215) | `Toast.test.ts:1042`, the same assertion |
| Toast hide door removed (`Toast.ts` 281) | `Toast.test.ts:1080`, the same assertion |
| Tab pane door removed (`Tab.ts` 248) | `Tab.test.ts:1151`, the same assertion |
| Carousel incoming door removed (`Carousel.ts` 538–555) | `Carousel.test.ts:1987`, the same assertion |
| Carousel outgoing door removed (`Carousel.ts` 607–611) | `Carousel.test.ts:2028`, the same assertion. The round-1 case at `Carousel.test.ts:2706` also fails |

With the records assertion removed, the class assertion in each case also fails. My first mutation run, taken before I fixed the records assertion, recorded those failures, for example `expected [ 'collapse', 'show' ] to deeply equal [ 'collapse' ]`.

I first wrote these door cases with `observer.takeRecords()` read after an `await`. That assertion could not fail: the observer's microtask delivery empties the queue before `takeRecords` runs. The cases now record deliveries and assert on the delivered records plus `takeRecords`.

### Files touched
- `src/browser/Tab.ts`: selection reads moved back to Bootstrap's order, and the class TSDoc rewritten to match.
- `src/browser/Carousel.ts`: the unreachable door after the outgoing `order` removal is removed. I also took the optional `marks = []` default, which drops the trailing `[]` argument at every call site that passed it.
- `tests/src/browser/Tab.test.ts`: the replacement case, the after-show assertion in the destroy witness, and the pane door case.
- `tests/src/browser/Collapse.test.ts`, `Toast.test.ts`, `Carousel.test.ts`: the door cases.
- `tests/src/browser/helpers.test.ts`: the obligation 2 restore assertion.
- `guides/veneer.md` § Tab: the take-time sentences rewritten to describe Bootstrap's read order.
- `Collapse.ts` and `Toast.ts`: unchanged, because every door in them is reachable.

### Acceptance output, verbatim
```
npm run check: exit 0
npm run lint:check: exit 0
npm run format:check: exit 0
All matched files use the correct format.
npm run test:guides: exit 0
 Test Files  1 passed (1)
      Tests  26 passed (26)
npm run test:setup:browser: exit 0
 Test Files  1 passed (1)
      Tests  98 passed (98)
```
Scoped runs:

| File | Result |
|---|---|
| Tab | 54 passed (54) |
| Collapse | 53 passed (53) |
| Toast | 49 passed (49) |
| Carousel | 77 passed (77) |
| Dropdown | 44 passed (44) |
| helpers | 107 passed (107) |

### `git status --short`
```
 M guides/veneer.md
 M src/browser/Carousel.ts
 M src/browser/Tab.ts
 M tests/src/browser/Carousel.test.ts
 M tests/src/browser/Collapse.test.ts
 M tests/src/browser/Tab.test.ts
 M tests/src/browser/Toast.test.ts
 M tests/src/browser/helpers.test.ts
```

### Deviation state
Neither stop condition fired:
- Bootstrap's order made no snapshot-held witness fail.
- No door needed an edit to an off-limits file.

These are recorded for you:
- **The destroy witness measurement.** The brief expected its after-show assertion to read green at `a1041bd`. It read red there, because the take-time read never writes the wrapper. It reads green now.
- **The unreachable Carousel door.** The door after the outgoing `order` removal can't be reached, so I removed it under the brief's "only if a door proves unreachable" clause. The write itself stays.
- **Mutations on `helpers.ts`.** The obligation 2 mutation replaced `helpers.ts`, which is off-limits, while it ran. The script restored it and the checksum matched.
- **Shared file.** I produced no patch for `tests/setupBrowser.ts`.

Nothing is committed, and `main` is not merged. Logs and scripts are in `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/release-record/tmp/j-release-record/`, under the `r2-` prefix.
