**Touched files**

Wrote `tmp/units/a2-report.md`. No source or test files changed.

`git diff --stat` returned no output.

**Red then green**

Not run. The contract mismatch triggered the brief's stop condition before implementation. No authorization-throw, limit, fixed-error-message, or abort-reconstruction proof is claimed.

**Scoped validation**

No lint, typecheck, or test gates ran. Read A1's reports and the landed contract. `git log --oneline -3` returned:

```text
573ba71 fix: cancellation owned by the readers, signal-bound error read, hostile-array guard
cef565d feat: add the AgentProvider base, wire contracts, and provider errors
337390c chore: align published development tooling
```

**Observations**

A1's parser-option rename is intentional: `tmp/units/a1-fix-report-3.md:43` records F6b's `parser` option. The design amendment at `../scaffold/.orkestrel/campaign/design-reconciliation.md:102-104` keeps `frame()` as the provider method and renames the relay option to `parser`. `../scaffold/.orkestrel/campaign/plan.md:99-102` declares that option as `parser` too.

Git emitted this warning and exited 0:

```text
warning: unable to access 'C:\Users\mikes/.config/git/ignore': Permission denied
```

**Deviation**

- Expected: acceptance criterion 4 at `tmp/units/a2-brief.md:177` requires `createRelayProvider({ url: 'http://relay.test/', frame, fetch: (input, init) => handler(new Request(input, init)) })`.
- Found: `src/core/types.ts:2259-2263` requires `readonly parser: () => ProviderParserInterface`; it declares no `frame` option. The required object supplies `frame` and omits the required `parser`.
- Constraint: `tmp/units/a2-brief.md:131` permits only a TSDoc sentence in `types.ts`, with “no member changes.” Its deviation contract at lines 166-168 requires stopping when A1's landed contract cannot express a required semantic.
- Done: verified the mismatch against the landed type, A1's fix report, and the amended design. Not done: relay implementation and its proofs.
- Hypothesis: A2's acceptance example predates the F6b rename. Correcting that example to `parser: frame` would align it with the landed contract.

**Status**

Stopped under the brief's deviation contract. A2 is not implemented. The brief needs its acceptance example reconciled with the required `parser` option before execution resumes.

`git status --porcelain` returned no stdout; the report is under ignored `tmp/`.
