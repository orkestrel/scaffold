<!-- Retained from u7c-audit-3-analyst-last.md. Bench lane: analyst on Astra (objective lane, Opus wrote the unit and both fixes), codex exec read-only -C C:/Users/mikes/WebstormProjects/scaffold, journal u7c-audit-3-analyst.jsonl, thread 01a0c2a0-cbd9-7370-873b-7edd6bb87d2e, exit 0, 2026-09-21. Round 3: claims 1 to 4 CONFIRMED, claim 5 implementation half confirmed, gates to the verifier; no extra finding; accept. -->

This is a read-only source audit with in-memory projection and syntax checks. No browser suite or gate chain was rerun.

1. **CONFIRMED.** [tests/setup.ts:104](C:/Users/mikes/WebstormProjects/veneer/tests/setup.ts:104) exports the frozen calibration table; `tests/setup.test.ts:80` checks its shape. The journey pins light at `integration.test.ts:314` and dark at `:349` with precision `3`, retaining traversal and specimen-equality assertions. The read-only control rejected a uniform ratio of `3`.

2. **CONFIRMED.** [integration.test.ts:93](C:/Users/mikes/WebstormProjects/veneer/tests/app/browser/integration.test.ts:93) checks `unclean` before mounting. Release and cleanup failures accumulate at `:109–119`; `:123` retains their messages before throwing. Subsequent cases refuse with `"An earlier journey teardown was refused and never cleared"`. This matches the installed media helper’s retained-stage contract at `index.d.ts:2456`.

3. **CONFIRMED.** [tests/setupBrowser.test.ts:140](C:/Users/mikes/WebstormProjects/veneer/tests/setupBrowser.test.ts:140) and `:171` place `mounted.cleanup()` inside unconditional `finally` blocks beneath `releasePointer()`. A rejected release cannot bypass mount cleanup. No other case in that file mounts and releases.

4. **CONFIRMED.** [Showcase.test.ts:61](C:/Users/mikes/WebstormProjects/veneer/tests/app/browser/Showcase.test.ts:61) derives ownership through `!element.matches(BUTTON_SELECTOR)`, rejects an empty population, and compares reclaimed-host names at `:75`. Constructing the replacement engines exercises the ownership-release boundary.

5. **UNDECIDABLE as a whole; implementation portion confirmed.** Comparing the supplied patches limits round-3 changes to the named files. Live status matches the supplied status over `0cbb563`. The TypeScript syntax scan found none of the prohibited constructs it checked; its negative control was detected. Earlier implementation remains intact:
   - Section rendering and ownership: `ButtonSection.ts:50`, `:63`; entry delegation: `main.ts:14`.
   - Oracle equality and membership: `integration.test.ts:477`, `:489`; fixture projections preserve mutation order, and the reversed-order control differs.
   - Capture placement and membership: `integration.test.ts:565`, `:580`; retained filenames match the expanded registry.
   - Installed consumer construction, activation, and restoration: `distribution.test.ts:649`, `:1131`.

   Report 3 records exit `0` for Chromium and Edge. Independent gate truth remains with the designated verifier; that result was unavailable to this lane.

No additional implementation defect substantiated. No claim forces another implementation round.

Verdict: accept