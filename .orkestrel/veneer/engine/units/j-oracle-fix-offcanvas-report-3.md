# J-ORACLE-FIX-OFFCANVAS round 3 — the writer's report (opus on Opus 5.5, 2026-09-25)

# J-ORACLE-FIX-OFFCANVAS round 3: report

The briefed fix works. The press now reads the deepest focused element, the residual case goes from red to green, and every gate and scoped file passes.

**Deviation state: complete, with one stop-class finding.** The briefed mechanism cannot meet the objective's "without a limit" clause. Two probes show the press still misses a focus move, and both inputs are reachable through the documented surface. I did not write the prose "without a limit", because that prose would be false. Each sentence states the depth the press covers and names the two misses as misses. That goes against obligation 4's "remove any wording that names the panel's root as the scope", and the decision is yours.

## Measurement: red reading at `dcff520`, before any source edit
- **Command:** `bash tmp/j-oracle-fix-offcanvas/red-3.sh residual-final`. It writes `dcff520`'s `Offcanvas.ts` over the fixed file, runs the case, restores the fixed file, and runs the case again.
- **Base result:** exit 1, `Tests 1 failed | 65 skipped (66)`, `AssertionError ... ❯ tests/src/browser/Offcanvas.test.ts:799:19`.
- **With motion:**
  - `hidden`: `[body, null]`, expected `[panel, trigger]`
  - `pressed`: `[body, null]`, expected `[panel, trigger]`
  - `lost`: `"visible"`, expected `"hidden"`
  - `prevented`: `false`, expected `true`
- **Under reduced motion:** `prevented` is `false`, expected `true`.
- **Fixed result:** exit 0, `Tests 1 passed | 65 skipped (66)`.

## The reader's contract and implementation
It lives in `src/browser/helpers.ts`. It needs no `types.ts` contract. No `@orkestrel/*` package has a deep focus reader: `@orkestrel/test`'s `readFocus` reads `document.activeElement` only, and its name is taken.
```ts
export function readFocusedElement(root: DocumentOrShadowRoot): Element | undefined {
	let focused = root.activeElement ?? undefined
	let inner = focused?.shadowRoot?.activeElement ?? undefined
	while (inner !== undefined) {
		focused = inner
		inner = inner.shadowRoot?.activeElement ?? undefined
	}
	return focused
}
```
It returns `undefined`, not the brief's `null`. `AGENTS.md` says absence is `undefined`, and `AGENTS.md` outranks the brief. I recorded this as an ancillary choice.

## Files touched
Diffstat: 6 files changed, 259 insertions, 37 deletions.
- `src/browser/helpers.ts`: adds `readFocusedElement` with its TSDoc.
- `src/browser/Offcanvas.ts`: `#press` compares `readFocusedElement(scope)` before and after `void this.hide()`. The class TSDoc and the `#press` comment are rewritten.
- `tests/src/browser/helpers.test.ts`: adds the `readFocusedElement` suite. It covers the document, one shadow level, two levels, a closed root, a focused host with an empty root, and nothing focused. Each case also reads the platform's own `activeElement`.
- `tests/src/browser/Offcanvas.test.ts`:
  - It adds the residual case.
  - Round 2's shadow case now runs open and closed roots. The closed row is the proof that tells the `document` mutation apart, because under the deep reader an open root no longer does.
  - Both rows press through `document.documentElement`, because the runner resolves no element inside a closed root. A `backdrop` reading confirms the press lands on the backdrop.
- `tests/src/browser/index.test.ts`: adds `readFocusedElement` to the export list.
- `guides/veneer.md`: adds a Surface row whose summary equals the TSDoc. Rewrites § Offcanvas and its Bootstrap-difference bullet.

## Red-first proof
- **Case title:** "cancels a trusted backdrop press's default action and leaves focus on a trigger in a shadow root the panel carries until the panel's visibility turns hidden, at the hidden event and after the press, with motion and under reduced motion".
- **Red and green:** the readings are in the measurement section.
- **Readings dropped from the brief's shape:**
  - The trigger sits inside the panel, so the platform moves focus off it when the panel's computed `visibility` turns `hidden`.
  - `settled` therefore reads the body in every build, so the case records the visibility at `focusout` instead.
  - `pressed` is read with motion only, because under reduced motion the panel is hidden before the press returns.

## Corrected sentences
- **Class TSDoc**
  - Before: "The panel reads the move from its root, the document or the shadow root that holds it, so a move between two elements of one shadow root counts."
  - After: "The panel compares the deepest focused element before and after the hide, read from its root, the document or the shadow root that holds it, down through each open shadow root, so a move at any depth of open shadow roots counts. Two moves escape the read and keep the default action: a move inside a closed shadow root below the panel's root, which exposes no focused element, and, for a panel inside a shadow root, a move between two elements outside that root."
- **`#press` comment**
  - Before: "The panel's root reads the move, because the document retargets an element focused inside a shadow root to that root's host, so the document reads no move between two elements of the panel's own shadow root."
  - After: "The press compares the deepest focused element, read down from the panel's root through each open shadow root, because a root retargets an element focused inside a shadow root below it to that root's host and so reads no move between two elements there. The read starts at the panel's root rather than the document, because a closed shadow root that holds the panel exposes nothing to the document. A move inside a closed shadow root below the panel's root, or between two elements outside the panel's shadow root, escapes the read."
- **Guide § Offcanvas**
  - Before: the same sentence as the class TSDoc's before.
  - After: "A trigger inside the panel keeps focus only until the panel's computed `visibility` turns `hidden`, because the platform moves focus off an element that can no longer take it. The panel compares the deepest focused element before and after the hide, through the `readFocusedElement` function. The read starts at the panel's root, the document or the shadow root that holds the panel, and follows each open shadow root down, so a move at any depth of open shadow roots counts. Two moves escape the read and keep the default action: a move inside a closed shadow root below the panel's root, which exposes no focused element, and, for a panel inside a shadow root, a move between two elements outside that root."
- **Guide Bootstrap-difference bullet**
  - Before: no such sentence.
  - After (added): "The press reads the deepest focused element down through each open shadow root, so a move at any depth of open shadow roots counts."

## Mutation table
The command is `bash tmp/j-oracle-fix-offcanvas/mutate-6.sh`, whose log is `mutate-6.log.txt`. It is the successor of `mutate-4.sh` and `mutate-5.sh`. Every row except R2 reddens its proof by an `AssertionError`. R2 leaves the press proofs green but reddens the reader's two-level case.

| Mutation | What goes red |
|---|---|
| R1: reader reads the root only, no shadow descent | helpers one-level (:996) and two-level (:1014); Offcanvas residual (:799) |
| R2: reader descends one shadow root and stops | helpers two-level (:1014) only. The press proofs pass, because the residual needs one level. |
| R3: press reads the panel's root `activeElement` (round 2's behaviour) | residual (:799) |
| M0 `document` | round 2's shadow case, closed row (:722) |
| M1 `never` | light-tree (:655), shadow (:722), residual (:799) |
| M2 `always` | guard, `prevented` row (:843) |
| M3 `released` | guard, `unfocusable` row (:843) |
| M4 `outside` | residual (:799); guard, `sliding` row (:843) |
| M5 `static` | guard, `static` row (:843) |
| M6 `click` | light-tree (:655), residual (:799) |
| base `dcff520` | residual (:799) |
| base `eaf3908` | shadow (:722), residual (:799) |
| base `63eabbd` | light-tree (:655), shadow (:722), residual (:799) |

After the run, `cmp` confirms both mutated files are restored.

## Census, compared with round 2's
The comparison script is `compare-3.py`. It exits non-zero on any difference. The census **matches round 2's**, and the census run and the comparison both exit 0.
- Departures: 66 in round 2 and 66 in round 3. None is on one side only. The only facet is `['attribute']`, and there are no focus departures.
- Offcanvas has 18 steps and modal has 22, with no changed step in either library.
- `departures.json` and the four recording files are byte-identical.
- `findings.json` differs only in its wall-clock `timings`. Round 1's and round 2's copies differ the same way. It is identical once the timings are left out.
- The first comparison run counted the timings; its log is kept as `compare-3-first.log.txt`.

## Acceptance output, verbatim (`accept-3.log.txt`)
```
npm run check exit 0
npm run lint:check exit 0
npm run format:check exit 0
npm run test:policy exit 0
npm run test:guides exit 0
npm run test:setup:browser exit 0
accept-3-test-policy.log.txt:      Tests  109 passed | 1 skipped (110)
accept-3-test-setup-browser.log.txt:      Tests  93 passed (93)
(test:guides)      Tests  26 passed (26)
helpers.test.ts exit 0      Tests  99 passed (99)
Offcanvas.test.ts exit 0      Tests  66 passed (66)
Isolation.test.ts exit 0      Tests  10 passed (10)
Modal.test.ts exit 0      Tests  61 passed (61)
index.test.ts exit 0      Tests  3 passed (3)
census exit 0
compare exit 0
```

## `git status --short`
```
 M guides/veneer.md
 M src/browser/Offcanvas.ts
 M src/browser/helpers.ts
 M tests/src/browser/Offcanvas.test.ts
 M tests/src/browser/helpers.test.ts
 M tests/src/browser/index.test.ts
```

## Deviation state
**Expected:** reading the deepest focused element from the panel's root cancels the press's default action whenever the hide moves focus, at any shadow depth.

**Found:** two reachable inputs still leave the default action in place. The probe is `bash tmp/probe/residual-probe.sh`, with its log at `tmp/probe/residual-probe.log.txt`. It appends a block to the test file temporarily and restores the file from a backup.
- **A closed shadow root the panel carries** holds the trigger and the focused button. The press reports `prevented: [[false]]` and focus ends on the body. No reader can see into a closed root.
- **A panel inside a shadow root while focus sits on a light-tree button outside it.** That button is not inert, because Isolation stops at the shadow boundary. After the press, `prevented` is `[[false]]` and the trigger does not hold focus. The panel's root reads `null` both before and after the hide.

**Done:** everything else the brief asked for.

**Not done:** the prose "without a limit".

**Hypothesis:** during the synchronous `void this.hide()`, listen for the composed `focusin` and `focusout` events at the panel's document. That would detect a move at every depth, closed roots included, and `readFocusedElement` would stay exported for J-ISOLATION-SHADOW.

## Scripts and logs
All are under `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-fix-offcanvas/tmp/`:
- `j-oracle-fix-offcanvas/red-3.sh`
- `j-oracle-fix-offcanvas/mutate-6.sh`
- `j-oracle-fix-offcanvas/accept-3.sh`
- `j-oracle-fix-offcanvas/compare-3.py`
- `probe/residual-probe.sh` and `probe/offcanvas-residual.block.ts.txt`

Their logs sit beside them.
