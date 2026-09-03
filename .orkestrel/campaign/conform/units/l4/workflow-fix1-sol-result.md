## Deviation contract

**Expected:** The `now` sweep returns only code tokens.

**Found:** Prose hits outside Owned:
- `src/core/WorkflowRunner.ts:466`
- `src/core/factories.ts:49`
- `src/core/helpers.ts:544`
- `src/core/types.ts:362,1708,1938`

**Done:** Rewrote the three requested sites and ran all sweeps. The old-name and nested-arrow sweeps are empty.

**Not done:** Report update and gates. Stopped because acceptance requires edits outside Owned.