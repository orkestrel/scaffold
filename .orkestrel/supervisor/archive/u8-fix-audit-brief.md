# U8 fix-round audit — Sol confirms the six repairs

Successor to `u8-audit-brief.md`; carries the fix round of the findings reconciled in
`.orkestrel/supervisor/u8-audit-reconciliation.md`. Writer: the Opus `implementer` (native), so
this audit goes to the engine that did not write it.

## Route

`analyst`, engine **GPT-5.6 Sol**, journaled `codex exec`, read-only sandbox, working in
`/workspace/supervisor`. You are already running inside the codex CLI; launch nothing. Standing
condition: the sandbox denies loopback listeners and writes, so browser suites cannot run here —
the acceptance chain log below is the executed record; rule on source plus supplied evidence.

## Evidence

- Fix diff: `git diff d184856..HEAD` in the checkout (the fix commit; run it yourself).
- Acceptance chain log: `/home/user/scaffold/tmp/redesign/u8-fix-acceptance.log` (11 steps).
- Writer report (non-authoritative): `/home/user/scaffold/tmp/redesign/u8-fix-report.md`.
- Prior round records: `/home/user/scaffold/.orkestrel/supervisor/u8-audit-reconciliation.md`,
  both verdicts beside it.
- Portfolio artifacts: `tests/app/browser/__screenshots__/portfolio/` (182 files expected).

## Claims — attempt refutation, one verdict each

1. **The membership proof binds the disk.** The new always-on portfolio assertion enumerates the
   real directory; an orphan file and a zero-byte file each fail it (the writer's two red runs);
   it covers the `.txt` artifacts as well as the frames.
2. **The register filters wear the ring.** `focus.css` now pairs
   `.btn-check:focus-visible + .btn` with the ring; the label reading ran red (2.25/1.93 against
   3:1) before and green (4.34/4.83) after; the shipped cascade carries the (0,3,0) pair after
   halfmoon's; the guide sentence "every control now wears the same opaque ring" now reads true.
3. **The instrument stayed byte-identical.** `git diff d184856..HEAD -- tests/setupBrowser.ts`
   is purely additive: every pre-existing reader unchanged; `readRing` is a new general form and
   its TSDoc records the sanctioned future consolidation of `readFocus`.
4. **The rename is total.** `deriveAddress` (app) → `deriveLineage` with every consumer updated;
   `deriveAddress` survives only as the untouched `src/core` symbol and one TSDoc mention
   explaining the collision; the guide's surface row, import, and fence call landed (applied by
   the Orchestrator from the writer's report-only patch — the documented integration protocol,
   not a scope breach); guides parity 374/374 in the chain log.
5. **The capture run retains the full portfolio for the shell half.** 182 non-empty files: 80
   frames + 68 accessibility trees + 17 step logs + 17 console logs; the steps are produced by
   the interactions themselves; the console journal forwards every call to the real console and
   restores on release. The journey half (3 states) keeps frames only under a recorded
   Orchestrator ruling: one snapshot format for the whole portfolio, the in-page describers, and
   the Node-side Playwright journey driver cannot reach them — the exclusion is named in the
   membership proof's comment and is a finding against the polish-surface skill's next revision,
   not a silent gap. Rule on whether the recording is honest and placed where a reader meets it,
   not on whether the ruling should have gone the other way.
6. **The test says what it proves.** The renamed helpers test asserts the collapse it names and
   records the ambiguity as a deliberate decision beside the assertion.
7. **Scope honesty.** The fix diff touches only the owned list plus the Orchestrator-applied
   guide hunks; `src/**`, `configs/**`, `vite.config.ts`, vendored files, `app/core`,
   `app/server` untouched.
8. **The recorded-not-fixed finding is sound.** `.focus-ring:focus` (`outline:0 !important`)
   outranks the app ring but the class is unused in `app/`; recording it rather than fixing it
   is the right closure while nothing wears the class.

## Output

Per claim: CONFIRMED / BROKEN (exact failing input, file:line, smallest fix) / UNRESOLVED /
NOT-EVIDENCED, then the single terminal line per `orkestrel-falsify`. No process diary.
