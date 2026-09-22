# F6 FOUNDATION fix round — `analyst` verdict (GPT-6 Astra, objective lane)

Journal `tmp/codex/f6-fix-audit-analyst.jsonl` (swept at acceptance), thread `01a0ca8f-4cfa-7771-9983-b31db478d398`, exit 0. Brief: `.orkestrel/veneer/units/f6-fix-audit-analyst-brief.md`.

1. **CONFIRMED.** Guard adoption is present at `src/browser/validators.ts:19`, `:37`, and `src/core/errors.ts:53`. Runtime dependency placement agrees between `package.json:91` and `package-lock.json:11`. The original guard tests are unchanged. Their distinguishing mutations are:
   - `tests/src/browser/validators.test.ts:6`: remove a supported mode or admit coercion.
   - `:19`: accept SVG through `Element`, or remove containment around the hostile prototype.
   - `:43`: omit the event-class or boolean-detail check, or reject `pressed: false`.
   - `:61`: let prototype or pressed-accessor exceptions escape.
   - `tests/src/core/errors.test.ts:5`: lose error metadata, inheritance, or instance recognition.
   - `:17`: omit native error options or change cause-property behavior.
   - `:26`: accept ordinary errors/coded records or let the revoked proxy throw.

   Executed source probes passed for modes, events, and hostile error inputs; bare-instance and widened-error controls failed. The in-memory TypeScript replacement independently produced TS2339 at `validators.ts:60`: `detail` does not exist on `object`. `npm run check` passed. The supplied gate log confirms the browser and core suites passed (`f6-fix-gates.log.txt:147`, `:164`).

2. **UNRESOLVED — exclusive mutation result lacks independent execution evidence.** `tests/src/browser/Delegate.test.ts:181` constructs `.disabled` before the delegate and distinguishes acquisition, toggling, ownership, and restoration. Inserting `if (host.classList.contains('disabled')) return` before construction at `src/browser/Delegate.ts:65` contradicts its active-state assertion. The adjacent case at `Delegate.test.ts:162` acquires before adding the class. However, the measured assertion that this mutation fails **only** the added case rests on the writer’s report. Settle it with an independently recorded baseline/control/restored run of the complete Delegate test file. This lane cannot execute that browser control under its read-only restrictions.

3. **CONFIRMED.** The repetition, section, and matrix readings compare dark-mode membership with the requested mode (`tests/setupBrowser.test.ts:706`, `:709`; `tests/app/browser/integration.test.ts:539`, `:693`). They admit absent and explicit-light attributes equally. Restoring either a `null` or `'light'` requirement would reject a valid initial state permitted by `tests/setupBrowser.ts:690`.

4. **CONFIRMED.** `SHOWCASE_CONTROL` is declared, assigned, and inventoried (`app/browser/constants.ts:13`; `app/browser/Showcase.ts:61`; `tests/app/browser/index.test.ts:26`). The description-list remark and `dd` local are corrected (`tests/setupStyles.ts:713`; `tests/src/styles/elements/dl.test.ts:30`). Layer order precedes the important-utility paragraph, Tests points back to it, and Surface names B-COLLAPSE (`guides/veneer.md:145`, `:1185`, `:67`). The targeted counts are absent. Compatibility names the actor at `:970`; its obligation cell is unchanged. `scanOracleObligation` uses exact equality, followed by an undefined-obligation fallback (`tests/setupServer.ts:1037`); an executed changed-string control was refused.

5. **CONFIRMED.** The physical-direction bullet describes the shipped transform without claiming a reversing stylesheet (`guides/veneer.md:368`). The mirror sentence accurately describes test-to-module matching (`:265`). Executing the source functions confirmed partial and TypeScript matches, integration exclusion, and acceptance of an untested partial; an orphan ordinary test correctly failed (`tests/setupPolicy.ts:446`, `:478`).

6. **CONFIRMED.** The live diff equals the supplied snapshot. The status population equals the earlier population plus the authorized fix additions (`/home/user/scaffold/tmp/audit/f6-fix-status.txt:1`). Guard tests, policy infrastructure, and ROADMAP have no diff. `tmp/probe/` is absent.

7. **CONFIRMED.** Every recorded gate exits zero; the log terminates with `=== gates done (19:23:48)` (`/home/user/scaffold/tmp/audit/f6-fix-gates.log.txt:4410`). The lane’s separate core-test invocation was blocked by Vite’s attempted temporary-file write, not a test failure.

Findings outside the claims: none substantiated.

VERDICT: FAIL 2; outside the claims: none