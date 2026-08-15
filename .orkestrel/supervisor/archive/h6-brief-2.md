# H6 fix round — the affordance that means it, and five exact truths

Successor to `h6-brief.md`. Carries both audit lanes' reconciled findings (Sol verdict
`tmp/codex/h6-audit-last.md`; Opus reviewer report in the session record). CONFIRMED and
closed: rows/doors path unity, four of five states on film, the honest search contract, no
polling and no silent movement, the showcase seed, both Orchestrator rulings. The two
NOT-EVIDENCED captures (loading skeleton; the run-open → History → Back journey) are the
Orchestrator's to film at acceptance, not yours — but item 5 below is what makes the Back
journey filmable.

## Role and engine

`implementer` route, engine **GPT-5.6 Sol**, fresh thread, sandbox `workspace-write`. Sole
serial writer in `/workspace/supervisor` from clean committed baseline **7ebb93d**. Perform
directly, spawn nothing, no commits/pushes/installs. The closing auditor will be the Opus
reviewer.

## Fix items

1. **`changed` derives from the departed memory** (Sol claim 6 + reviewer claim 6, reconciled
   ruling): replace `HistoryManager.#rosterKey`'s live-snapshot key with the ordered
   `(id, updated)` key of `roster.departed` (the session-lived departure memory
   `RosterManager` already retains — `RosterManager.ts:121`). Baseline captures at first-page
   resolution under the existing generation guard; **`older()` never re-baselines** (the
   affordance means "the page you are holding is stale"; extending that page does not
   refresh it — state this in the TSDoc). Keep the no-snapshot guard where the roster has
   not yet delivered. Semantics the proofs must bind: a run merely STARTING flips nothing; an
   identical reconnect re-delivery flips nothing; a departure (a run seen live that left the
   roster) flips `changed` true and it STAYS true through roster activity and `older()` until
   a first-page read resolves; an abandoned (stale-generation) load cannot re-baseline; an
   empty departed memory at load baselines cleanly.
   - TSDoc (`app/browser/types.ts:517-523, 542`): promise the operator's fact, not the
     derivation — "True once a run has left the live roster since the listed page was read,
     so that page may no longer be the newest. Cleared by the next first-page read." Correct
     the remarks the same way.
   - Copy (`HistoryView.vue:155-170`): the statement becomes
     "A run has finished since this list was read." beside the same Refresh button.
   - Proofs: manager tests for every semantic above (the component/manager fixtures must
     gain the ability to REMOVE a run — the existing proof is green only because its fixture
     never departs one); a component proof of the sentence; and a promoted real-server
     integration regression carrying the probe's exact sequence
     (`tmp/redesign/h6-changed-probe.log`): open History → start a run → no affordance →
     stop it → affordance appears → Refresh → affordance clears and the run is listed.
2. **The copy stops inventing decay** (Sol claim 1): `HistoryView.vue:104` says departed runs
   stay in Live runs "until the rail lets it go"; departures are session-retained
   (`RosterManager.ts:121`). Rewrite the sentence to the session-retained truth ("marked
   'Last seen' there for the rest of your session" or the honest equivalent in the file's
   voice) and update the binding component test.
3. **The filter passes what was typed** (Sol claim 4): `HistoryView.vue:65` trims the draft
   before `load`, contradicting "exactly as typed". Use the trim ONLY to detect an
   all-whitespace clear; pass the original non-blank value. Regressions: leading-space and
   trailing-space prefixes reach the wire verbatim.
4. **The disclosure says its name** (reviewer required 1): the typed-id toggle renders a bare
   magnifier with no caption below a labelled field — two unexplained find-a-run controls on
   one page. Render the visible caption "Open by id" beside the glyph (the `aria-label`
   already says it); bind it in `OpenPanel.test.ts`. Do NOT touch placement, the
   collapsed-by-default behaviour, or the `open` prop. Ancillary and yours to decide,
   recorded: the reviewer suggests `bi-folder2-open` so the door's glyph says open rather
   than search.
5. **Back restores the reader's pane, not a fresh one** (reviewer finding F1): the History /
   run-pane `v-if`/`v-else` siblings (`ApplicationView.vue:423-449`) unmount `ContentPane`
   and `FeedList` on entry, so component-local register selection and scroll anchoring
   re-initialise on Back — §3's "restores its pane without reopening it" fails for the
   reader's own view. The property to establish: after Back, the pane presents the register
   selection and scroll state it had when History opened. The mechanism (keep-alive, v-show,
   hoisted facts) is yours to choose and record; the operator's no-disturbance guarantees
   (subscription, selection, snapshot) must stay exactly as they are. Bind it with a
   component test that narrows the feed to one register, enters History, returns, and reads
   the selection.
6. **Three small truths** (reviewer advisories, folded): the partial status line stops
   fighting itself ("Older runs stopped loading. Press Retry to try again." replaces the
   contradictory pair); "Showing 25 completed runs." so the count cannot read as a total;
   the submit button's `aria-label` becomes "Apply the run ID filter" so field and button
   stop sharing one spoken name.

## Scope

**Owned:** `app/browser/controllers/HistoryManager.ts`, `app/browser/types.ts` (the named
TSDoc lines only), `app/browser/components/{HistoryView,OpenPanel,ContentPane,FeedList}.vue`,
`app/browser/ApplicationView.vue`, `tests/app/browser/**` mirrored suites,
`tests/setupBrowser.ts` (fixture departure support, additive),
`tests/app/browser/integration/` (the promoted regression). **Off-limits:** everything else;
`app/browser/controllers/RosterManager.ts` and `Operator.ts` are read-only context (report a
deviation if the fix genuinely needs them); `guides/**` (report the parity delta).

Forbidden: the standing list; no timers/polling; no auto-refresh — the affordance stays a
press; rows still never mutate on roster activity (the MISSING frame's preserved behaviour).

## Environment facts

You are on a fresh bench thread; your sandbox denies loopback listeners. Run every
listener-free check (`npm run check`, static gates) and enumerate the suites awaiting the
Orchestrator, who runs the seven-project acceptance natively and re-films the changed,
loading, and Back-journey frames.

## Acceptance criteria

1. Every item-1 semantic bound by a test that fails under the live-snapshot derivation
   (state which proof binds which semantic); the integration regression carries the probe
   sequence.
2. Items 2-4 and 6: exact strings landed; regressions green; zero trims reach the wire.
3. Item 5's property bound by the register-selection test.
4. Static gates and every listener-free check green; suites awaiting the Orchestrator
   enumerated; the exact parity delta reported.

## Output

Touched files + diffstat; per-item closure table; per-criterion proofs with commands and
tails; `git status --porcelain`; deviations or none. No diary.
