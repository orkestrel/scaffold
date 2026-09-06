# Brief — U2-fix-3 (scaffold), the Orchestrator's integration edit, successor of `u2-fix-2-brief.md`

Role and engine: Orchestrator (Fable), applying four edits the round-3 lanes prescribed verbatim; audited by `checker` and `verifier` on Sonnet before the unit commits. Owned: `tests/config.test.ts`, `tests/setupPolicy.ts`, `configs/policy.ts`. Off-limits: every other file.

1. `tests/config.test.ts`, the `scripts/read.ts` fixture comment: "the absence assertion below reads" → "the following absence assertion reads".
2. `tests/setupPolicy.ts`, `inspectPolicyConfiguration`: `if (overrideRules === undefined || !isPolicyRecord(overrideRules)) {` → `if (!isPolicyRecord(overrideRules)) {`.
3. `tests/setupPolicy.ts`, the manifest reader: the two inline record tests over `manifest` and `record` → `!isPolicyRecord(...)`.
4. `configs/policy.ts`, `pathToPolicyRelative` TSDoc: add the sentence "For a workspace at the filesystem root the prefix is the separator alone."

Acceptance: `npx oxfmt --check` and `npx oxlint --deny-warnings` over the owned files exit 0; `npm run test:policy` exits 0; `npm run test:config` exits 0 apart from the host-inventory case; the checker confirms each edit against its prescription and the verifier chain reads green.
