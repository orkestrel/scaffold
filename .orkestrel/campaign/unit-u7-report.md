# Unit U7 report: the terminal-audit survivors, landed

Role `implementer`, engine Claude Opus 5, in the main checkout of `@orkestrel/process` at
version 0.0.6, uncommitted. The unit's brief file was lost to the 2026-08-21 power outage;
its instruction source is the appended Orchestrator rulings in
`design-terminal-reconciliation.md`, which carry the six fixes verbatim. Returned
2026-08-21; every acceptance criterion closed green, in order.

## Touched files

| File | Change |
| --- | --- |
| `src/server/helpers.ts` | Restored the top-level exited-root guard in `stopChild`; TSDoc states the guard's reason and drops the withdrawn moved-guard justification |
| `src/server/Process.ts` | Arms the `drain` bound on native exit (`#expire`/`#cut`/`#cutoff`); routes `#kill`'s wait through `waitForClose`; corrects the latch comment and the `stop` TSDoc |
| `tests/src/server/helpers.test.ts` | Reversed the hazard row into a negative control that runs on every host; kept the orphan row proving an exited root's descendant is unreachable |
| `tests/src/server/Process.test.ts` | New natural-exit terminal-moment row with its released-descendant control; repaired the never-terminated controls fix 3 invalidates; corrected the latch commentary and one stale tree-kill comment |
| `guides/process.md` | Corrected each named overclaim plus the same claims restated at `:1111` and `:1206` |

The `stopChild` body is byte-identical to `HEAD`: `git diff HEAD -- src/server/helpers.ts`
shows no hunk for the body; the remaining hunks are U3's `waitForClose` addition and the
TSDoc.

## The totality delta

```diff
+	this.#child.once('exit', this.#expire.bind(this))
 	this.#child.once('close', this.#close.bind(this))
@@
+	#expire(): void {
+		if (this.#settled) return
+		this.#cutoff = setTimeout(this.#cut.bind(this), this.#drain)
+	}
+
+	#cut(): void {
+		if (this.#settled) return
+		this.#settle(false)
+	}
@@ #settle
-		// Latch before closing either read end, because their host `close` can re-enter `#close`.
+		// Latch before the terminal value is resolved and delivered below, so a consumer handed that
+		// value never reads a child still reporting itself unfinished.
 		this.#settled = true
+		clearTimeout(this.#cutoff)
@@ #kill
-		(hand-rolled Promise.withResolvers timer race against #exit.promise)
+		if (!this.#settled) await waitForClose(this.#child, this.#drain)
 		if (!this.#settled) this.#settle(false)
```

`waitForClose` has exactly one production consumer, `Process.ts:490`. `#settle` clears
`#cutoff`, so an ordinary child that closes promptly holds the event loop only between
`exit` and `close`.

## Red-then-green records

- Fix 2's row (`-t "addresses nothing for an already-exited child"`): before fix 1,
  `Tests 1 failed | 152 skipped (153)` on `expected false to be true` at
  `helpers.test.ts:674`; after, `Tests 1 passed | 152 skipped (153)`, exit 0. The red run
  was piped to `tail`, so its shell status reports the pipeline; the failing count and the
  assertion are the record.
- Fix 3's row (`-t "reaches the terminal moment on a natural exit"`): before the arming,
  exit 1, `Tests 1 failed | 153 skipped (154)` on `the natural exit never reached the
  terminal moment` at `Process.test.ts:1185`; after, exit 0,
  `Tests 1 passed | 153 skipped (154)`. The released-descendant control reports
  `{ code: 0, signal: null, drained: true }` with `stopping` false, against the cutoff
  side's `drained: false`, with the held descendant proven alive at the terminal moment.

## Gate evidence, per criterion

| Criterion | Exit | Result |
| --- | --- | --- |
| format (owned files) | 0 | `All matched files use the correct format.` |
| lint (owned TypeScript) | 0 | no diagnostics |
| `tsc --noEmit --project tsconfig.json` | 0 | no output |
| `test:src:server` | 0 | `Tests 148 passed \| 6 skipped (154)` |
| `test:guides` | 0 | `Tests 99 passed \| 2 skipped (101)` |
| `test:distribution -- --mode release` | 0 | `Tests 1 passed (1)` |

Observations beyond the criteria, all exit 0: `check:src`, `test:src:core` (3 passed),
`test:policy` (93 passed), `test:config` (40 passed), `test:setup` (5 passed).

## Repairs fix 3 forced inside owned files

Fix 3 falsifies any control that ends itself and is expected to stay unsettled. The
`ends an in-flight lines read when destroy resolves` control failed on
`expected 'ended' to be 'pending'`; the `reaches the terminal moment on stop alone` control
passed on roughly 45 ms of accidental margin. Both controls take `drain: 30_000`, each row's
`finally` destroys the control and clears the timer, and the suite completes in 9.9 s.

## Deviation, and its integration

`src/core/types.ts` was off-limits to the unit and stated the pre-fix-3 contract in four
places; the unit returned exact patches. The Orchestrator applied all of them serially on
2026-08-21: the `ProcessOptions` remarks (the drain window is between the child's ending and
the read ends' release; the native exit arms it), the `drain` property line, the
`ProcessInterface` remarks, and the `exit` remark (a child nobody terminates settles it
within `drain` of ending). Integration verification: `oxfmt --check src/core/types.ts`
exit 0, `tsc --noEmit --project tsconfig.json` exit 0, `test:guides`
`99 passed | 2 skipped`, exit 0. The unit checked every `expect(types).toContain(...)`
string in `tests/guides.test.ts` against the patched regions; none asserts them.

The cross-engine audit of this unit is `audit-u7-brief.md`; its verdict file is
`audit-u7-verdict.md`.
