# J-CONCERNS-B round 2 — the writer's report (opus on Opus 5.5, 2026-09-25)

Both P-CANCEL cases now record every mutation during the prevented calls and assert that none was taken. Each planted write-and-write-back fails its case at the new assertion and nowhere else, and `src/browser/Tooltip.ts` is back to the bytes it had at `7ab04db`.

**Touched file.** `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/concerns-b/tests/src/browser/Popover.test.ts` has 32 lines added (`1 file changed, 32 insertions(+)`). Only the two P-CANCEL cases changed.

## Added assertion in each case

The same block went into both cases. It starts right after the prevention listener is attached. One observer covers both prevented calls, `show()` then `toggle()` in the show case and `hide()` then `toggle()` in the hide case. It watches `document` with `subtree`, which includes the trigger's attributes and the tip. The records are read and the observer disconnected before the case writes anything itself. An `onTestFinished` hook also disconnects it if an assertion fails.

```ts
const writes = createRecorder<readonly [readonly MutationRecord[]]>()
const observer = new MutationObserver((records) => writes.handler(records))
onTestFinished(() => observer.disconnect())
observer.observe(document, {
	attributes: true,
	characterData: true,
	childList: true,
	subtree: true,
})
expect(await popover.show()).toBe(false)   // hide case: popover.hide()
expect(await popover.toggle()).toBe(false)
const records = [...writes.calls.flat(2), ...observer.takeRecords()].map(
	({ type, target, attributeName }) => ({ type, target: target.nodeName, attributeName }),
)
observer.disconnect()
expect(records).toEqual([])
```

- **Observer options.** I added `characterData` to the options the brief named, which the brief lets me choose, so a text write inside the tip also counts.
- **Readable records.** Each record is mapped to its type, target, and attribute so that a failure names what was written.
- **Existing assertions.** They stay unchanged beside the new one.

## Mutations and red readings

Tooltip.ts was backed up to `tmp/j-concerns-b/Tooltip.ts.orig` before any mutation, and its hash matched `7ab04db:src/browser/Tooltip.ts` (`ece32fdb42d2053ae5d65244cd734ee8d1938f4c`).

**Show mutation** (`tmp/j-concerns-b/show-mutation.diff`, log `show-mutation.log.txt`). Before `if (!accepted || this.#blocked()) return false`, I inserted:
```ts
if (!accepted && this.#profile.popover === 'manual') {
	host.setAttribute('aria-describedby', 'vn-mutation')
	host.removeAttribute('aria-describedby')
}
```
- **Result:** `Tests  1 failed | 19 passed (20)`.
- **Failing case:** "writes nothing and dispatches no inserted or shown event when a listener prevents the show event…".
- **Failing assertion:** `expect(records).toEqual([])` at `Popover.test.ts:379`.
- **Records received:** 4 × `{ attributeName: "aria-describedby", target: "BUTTON", type: "attributes" }`.

**Hide mutation** (`tmp/j-concerns-b/hide-mutation.diff`, log `hide-mutation.log.txt`). In `#conceal`, before `if (!accepted && !forced) return false`, I inserted:
```ts
if (!accepted && !forced && this.#profile.popover === 'manual' && this.#tip !== undefined) {
	this.#tip.classList.remove(this.#classes.shown)
	this.#tip.classList.add(this.#classes.shown)
}
```
- **Result:** `Tests  1 failed | 19 passed (20)`.
- **Failing case:** "keeps the tip shown, open, and unchanged, dispatching no hidden event, when a listener prevents the hide event a hide call starts".
- **Failing assertion:** `expect(records).toEqual([])` at `Popover.test.ts:448`.
- **Records received:** 4 × `{ attributeName: "class", target: "DIV", type: "attributes" }`.

**Byte restore.** After each mutation I copied `tmp/j-concerns-b/Tooltip.ts.orig` back. `cmp` reported no difference, and `git hash-object src/browser/Tooltip.ts` returned `ece32fdb42d2053ae5d65244cd734ee8d1938f4c`, the hash at `7ab04db`. `git diff --stat -- src/` is empty.

The unmutated source took no record during either prevented call: the first green run (`tmp/j-concerns-b/green-1.log.txt`) passed 20 of 20.

## Acceptance output

- **Lint and format.** `npm run lint:check` exited 0 (`oxlint --config .oxlintrc.json --deny-warnings .`). `npm run format:check` exited 0 with "All matched files use the correct format. Finished in 24261ms on 489 files using 16 threads." The file was formatted first with `npx oxfmt --config .oxfmtrc.json --write tests/src/browser/Popover.test.ts`.
- **Scoped run.** `npx vitest run --config vite.config.ts --no-cache --project src:browser tests/src/browser/Popover.test.ts` exited 0. Verbatim, from `tmp/j-concerns-b/acceptance.log.txt`:
```
 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/concerns-b

Port 63315 is in use, trying another one...

 Test Files  1 passed (1)
      Tests  20 passed (20)
   Start at  05:06:57
   Duration  5.49s (transform 0ms, setup 557ms, import 358ms, tests 3.48s, environment 0ms)
```

## `git status --short`

```
 M tests/src/browser/Popover.test.ts
```
(`tmp/` is git-ignored. It holds the backup, both mutation diffs, and every log.)

## Deviation state

None. Nothing was committed or installed, and no git command that discards changes was run.
