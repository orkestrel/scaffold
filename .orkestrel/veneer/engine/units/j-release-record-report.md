J-RELEASE-RECORD — writer report (opus on Opus 5.5)

## J-RELEASE-RECORD report

`recordHostWrite` now takes the snapshot and makes every recorded write through `snapshot.write`. Every caller moved in the same change, and no engine's `#save` or `#apply` remains. Every witness read red at `b8c6a08` by an assertion and reads green now.

One case is still red in my worktree: the write-back case in `Dropdown.test.ts`. It stays red until you apply the `tests/setupBrowser.ts` patch in the shared-file section. That patch is the only open item.

### Witness red readings at `b8c6a08`
Each was run as `npx vitest run --config vite.config.ts --no-cache --project src:browser <file> -t <pattern>`, before any source edit.

| Witness | Case | Red assertion at `b8c6a08` |
|---|---|---|
| S5 T10 (a) | Toast: "keeps a fade token a consumer adds after a show that never wrote it, through its destruction" | `expected [ 'toast' ] to deeply equal [ 'toast', 'fade' ]` |
| S5 T10 (b) | Toast: "keeps the removal of a shown token its markup carried, which its show never wrote, through its destruction" | `expected [ 'toast', 'show' ] to deeply equal [ 'toast' ]` |
| S4 R3, Carousel half | Carousel: "keeps a direction token a consumer adds after a slide that never wrote it, through its destruction" | `expected [ false, false ] to deeply equal [ true, true ]` |
| S4 T2 I1 | Tab: "restores every write its swap made when a listener to the sibling blur makes the sibling wrapper a dropdown" | after `destroy`, `item.hasAttribute('aria-expanded')`: `expected true to be false` |
| S4 T2 I1, the take | Tab: "writes only the selection its swap read before the sibling blur, leaving a wrapper a blur listener makes a dropdown untouched" | after `show`, `item.hasAttribute('aria-expanded')`: `expected true to be false` |
| E25 as E35 narrowed it | Tab: "keeps a consumer edit to a role or state the markup already carried through its destruction, writing nothing at construction" | `list.hasAttribute('role')`: `expected true to be false` |
| S6 row 16 | helpers: "writes through the snapshot, which records the target at that write, so the restoration writes back the value the call record holds" | `expected 'false' to be 'true'` |

These cases answer the brief's Unknowns (the targets each engine saved but never recorded). All read red at `b8c6a08`, so each target was converted:

| Case | Red assertion at `b8c6a08` |
|---|---|
| Collapse: "keeps a consumer edit to a shown token a listener added, which its show never wrote, through its destruction" | `expected [ 'collapse', 'show' ] to deeply equal [ 'collapse' ]` |
| Tab: "keeps a consumer edit to an active token a listener added, which its swap never wrote, through its destruction" | `expected [ 'nav-link', 'active' ] to deeply equal [ 'nav-link' ]` |
| Carousel: "keeps a consumer edit to an active token a listener added, which its slide never wrote, through its destruction" | `expected [ 'carousel-item', 'active' ] to deeply equal [ 'carousel-item' ]` |
| Dropdown: "keeps a consumer edit to a menu shown token a listener added, which its show never wrote, through its destruction" | `expected [ 'dropdown-menu', 'show' ] to deeply equal [ 'dropdown-menu' ]` |

I added these after the source edits, so I read them against `b8c6a08`'s engine files and `helpers.ts`, copied in temporarily. The script restored them byte for byte and the checksum matched (`tmp/j-release-record/baseline-reading.sh`).

| Case | Red assertion at `b8c6a08` |
|---|---|
| Collapse: "keeps a collapsed token a consumer adds to a trigger whose token its show never changed, through its destruction" | `expected false to be true` |
| Tab: "keeps a shown token a consumer adds to the sibling pane, whose token its swap never changed, through its destruction" | `expected [ true, false ] to deeply equal [ true, true ]` |

Every case in these tables reads green in the final scoped runs.

### `recordHostWrite`, verbatim
```ts
export function recordHostWrite(
	writes: readonly HostWrite[],
	target: HostSnapshotTarget,
	next: string | undefined,
	snapshot: HostSnapshotInterface,
): readonly HostWrite[] {
	const { category, element, name } = target
	const recorded = writes.some(
		(write) =>
			write.target.category === category &&
			write.target.element === element &&
			write.target.name === name,
	)
	const records =
		recorded || matchesHostValue(target, next)
			? writes
			: [...writes, { target, value: readHostValue(target), priority: readHostPriority(target) }]
	snapshot.write(target, next)
	return records
}
```
The signature of `rewindHostWrites` is unchanged; only its remarks changed.

### What each engine kept and removed
Every call-start `#save` is gone.
- **Every engine:** each recorded target is now saved by its own changing write.
- **The agreement tokens:** these are the targets the engines saved but never recorded — Collapse panel `show`, Toast `show`, Tab host `active`, Carousel incoming `active`, Dropdown menu `show`. Each had a red witness, so each now writes through `snapshot.write` directly and stays out of the call's record, as E24 requires.
- **Tab `#writeInitial`:** writes each planned attribute through `snapshot.write`. A value it finds already written joins only a live or pending record (E35's narrowed E25).
- **Tab `#selection`:** it is read once at the take, before the blur.
- **`#apply`:** removed from every engine, because each recorded write is now the call to `recordHostWrite` followed by `#holds`. Dropdown's `focus` and `update`, and Tab's `blur`, are now inline calls, each followed by its door.
- **Multi-token writes:** the snapshot writes one target at a time, so each write that covered several tokens is now a sequence of single-token writes with a door after each:
  - Collapse's `add(host, shown)` and `remove(host, shown)`;
  - Toast's `add(shown, transition)` and `remove(transition, shown)`;
  - Tab's previous-pane `remove(active, shown)`;
  - Carousel's `remove(direction, order)` and `remove(active, order, direction)`.

  Token order and every end state are the same. There are now more mutation records, and a reaction can see the state between two of the writes.

### Files touched
- `src/browser/helpers.ts`: `recordHostWrite` takes `snapshot` and writes through it; its TSDoc and `rewindHostWrites` remarks are updated.
- `src/browser/Collapse.ts`, `Toast.ts`, `Carousel.ts`, `Dropdown.ts`: every write goes through the snapshot; `#save` and `#apply` are removed.
- `src/browser/Tab.ts`: the same, plus the selection is read at the take, `#writeInitial` uses `write`, and the class remark is updated.
- `tests/src/browser/{Toast,Collapse,Tab,Carousel,Dropdown,helpers}.test.ts`: the witnesses, plus the updated cases below.
- `guides/veneer.md`: the `recordHostWrite` summary row, § Ownership and restoration, § Tab, and the restoration sentences in Collapse, Carousel, Dropdown, and Toast.
- `src/browser/types.ts`: no change, because I found no remark there that the change makes false.

These cases pinned the old write shape, so I updated them to the new state:
- **Collapse, host-less reaction case:** a write that changes nothing no longer runs a reaction, so the case now reacts at the zero-size write.
- **Toast, prevented nested show:** the case now expects three `class` mutation records.
- **Toast, replacement during restoration:** the class order is now `['toast','show','fade']`, because the save order follows the write order.
- **Carousel, listener-activation and outgoing-removal cases:** the mutation record lists now match the single-token writes.

### Diffstat
```
 guides/veneer.md                   |  50 ++++++----
 src/browser/Carousel.ts            | 192 +++++++++++++++++++------------------
 src/browser/Collapse.ts            | 184 ++++++++++++-----------------------
 src/browser/Dropdown.ts            |  91 +++++++-----------
 src/browser/Tab.ts                 | 162 +++++++++++++------------------
 src/browser/Toast.ts               |  88 ++++++++---------
 src/browser/helpers.ts             |  36 ++++---
 tests/src/browser/Carousel.test.ts |  57 ++++++++++-
 tests/src/browser/Collapse.test.ts |  76 ++++++++++++---
 tests/src/browser/Dropdown.test.ts |  20 ++++
 tests/src/browser/Tab.test.ts      | 117 ++++++++++++++++++++++
 tests/src/browser/Toast.test.ts    |  32 ++++++-
 tests/src/browser/helpers.test.ts  | 125 ++++++++++++++++++------
 13 files changed, 745 insertions(+), 485 deletions(-)
```

### Mutation table
Each mutation ran through `tmp/j-release-record/mutate.sh`, and every source file was restored with a checksum match.

| Mutation | Red proofs, by assertion |
|---|---|
| `helpers.ts`: `snapshot.write` in `recordHostWrite` replaced by `writeHostValue` | helpers S6 row 16 case: `expected 'mixed' to be 'false'`; helpers inline-property case: `expected [ '0px', '', null, false ] to deeply equal [ '12px', 'important', 'dialog', true ]`; Collapse.test red on 7 cases, for example "restores the panel, its size, and its triggers…" at `trigger.hasAttribute('aria-expanded')` (line 535) |
| Collapse call-start save restored | trigger-collapsed case (line 553, `expected false to be true`); shown-token case (line 569) |
| Toast call-start save restored | T10 (a) (line 824); T10 (b) (line 836); replacement class-order case (line 1212) |
| Tab call-start save restored | sibling-pane `show` case (line 777); host `active` case (line 800) |
| Carousel call-start save restored | R3 direction-token case (line 1854); incoming `active` case (line 1882) |
| Dropdown call-start save restored | menu `show` case (line 1013) |
| Tab's re-read after the blur restored (`this.#selection(outgoing, false)` in the loop) | "writes only the selection its swap read before the sibling blur…" at line 847, `expected true to be false`. The destroy witness stays green, because the snapshot now records at the write. |

### Acceptance output
- `npm run check`: exit 0.
- `npm run lint:check`: exit 0.
- `npm run format:check`: exit 0, "All matched files use the correct format."
- `npm run test:guides`: exit 0, "Test Files 1 passed (1) / Tests 26 passed (26)".
- `npm run test:setup:browser`: exit 0, "Test Files 1 passed (1) / Tests 98 passed (98)".
- `npm run test:app`: exit 0, "Test Files 61 passed (61) / Tests 223 passed (223)".
- Scoped runs:

| File | Result |
|---|---|
| Collapse | 51 passed (51) |
| Toast | 47 passed (47) |
| Tab | 53 passed (53) |
| Carousel | 75 passed (75) |
| helpers | 107 passed (107) |
| Dropdown | 1 failed, 43 passed (44) |

The Dropdown failure is "writes back only the toggle targets a stopped change altered…", on the table's last row: `resolved` is `true` where the row expects `false`.

### Shared-file patch (`tests/setupBrowser.ts`, report-only)
The last row of `DROPDOWN_WRITE_BACKS` is a hide on a toggle that already reads `aria-expanded="false"`, and the takeover fires at that attribute's write. That write no longer happens, because a write that changes nothing writes nothing, so the row can no longer be reached. The replacement row covers the same rule through the `class` write, which changes nothing:
```diff
@@ -3392,7 +3392,7 @@ export const DROPDOWN_WRITE_BACKS = Object.freeze([
 	Object.freeze({
 		direction: 'hide',
-		expanded: 'false',
+		expanded: 'true',
 		toggled: false,
-		order: Object.freeze([]),
+		order: Object.freeze(['aria-expanded']),
 	} as const),
```
`git apply --check` passes on it, and the patch is saved at `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/release-record/tmp/j-release-record/setupBrowser.patch`. To test it, I temporarily pointed the Dropdown case at the patched rows: "Tests 1 passed | 43 skipped (44)". That edit was reverted from a backup, and `Dropdown.test.ts` now differs from `b8c6a08` only by the added witness.

### `git status --short`
```
 M guides/veneer.md
 M src/browser/Carousel.ts
 M src/browser/Collapse.ts
 M src/browser/Dropdown.ts
 M src/browser/Tab.ts
 M src/browser/Toast.ts
 M src/browser/helpers.ts
 M tests/src/browser/Carousel.test.ts
 M tests/src/browser/Collapse.test.ts
 M tests/src/browser/Dropdown.test.ts
 M tests/src/browser/Tab.test.ts
 M tests/src/browser/Toast.test.ts
 M tests/src/browser/helpers.test.ts
```

### Deviation state
- **Open:** acceptance criterion 3 is not met for `Dropdown.test.ts` until the `tests/setupBrowser.ts` patch is applied. I made no edit to a shared or off-limits file.
- **Settled within scope:**
  - the parameter name, `snapshot`;
  - the case titles and where each case sits (the Dropdown witness is placed away from J-CONCERNS-B's case);
  - splitting the multi-token writes, with a door after each.
- **For the audit:** the Tab swap now reads its selection targets at the take, as the brief's mutation row asks. Bootstrap reads the dropdown after the blur.
- **Files:** all logs, scripts, and mutants are in `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/release-record/tmp/j-release-record/`. Nothing is committed.
