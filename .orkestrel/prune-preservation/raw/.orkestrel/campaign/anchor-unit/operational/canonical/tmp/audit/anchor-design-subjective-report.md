# Propose native bigint directory identity

Role: subjective design lane, GPT-5.6 Sol substituting for unavailable Opus. Read-only; no behavioral proofs or gates ran.

Keep the API shape. Change WriteAnchor.device and WriteAnchor.inode to readonly bigint and pass { bigint: true } to lstatSync in readAnchor. Preserve undefined, directory/symlink checks, and strict equality in matchesAnchor. Evidence: src/server/types.ts:188, helpers.ts:1927 and :1959.

Keep names; add no numeric alias, union, serialization helper, timestamp, or manager. Examined src, tests, and guides/scaffold.md consumers carry anchors and compare fields; none requires serialization. WriteTransaction stores anchors and calls matchesAnchor at :108, :531, and :563.

Describe captured identity without promising continuity. Proposed matchesAnchor summary: “Tests whether a path still holds the captured directory identity.” Match guide surface row :411. Document native bigint values and retain inode-reuse limitation at types.ts:184 and guide:1859. Replace the fixed numeric-output readAnchor example with a real-directory representation check and update tests/distribution.test.ts:602.

Use deterministic real-filesystem regressions: capture a scratch directory, compare device/inode with lstatSync(target, { bigint: true }), and assert bigint primitives. This fails against numeric implementation without requiring an allocation collision. Preserve live rename-swap with distinct native identities, original held at retired, and refusal after replacement. Keep untouched, absent, file, and symlink controls. Extend the establish consumer proof at WriteTransaction.test.ts:366 with native bigint equality.

Suggested probe claim: the revised WriteAnchor accepts bigint lstatSync metadata under configs/src/tsconfig.server.json. Control keeps numeric anchor fields and fails at type stage. Obtain a receipt before relying on the claim; it does not replace host proofs.

Owned proposal: src/server/types.ts, src/server/helpers.ts, tests/src/server/helpers.test.ts, tests/src/server/WriteTransaction.test.ts, guides/scaffold.md, tests/distribution.test.ts. Brief deviation: createWriteDirectory is absent; actual behavior is WriteTransaction.#establish at :489.

Close with red/green regressions, scoped server checks/tests, guide parity, refreshed release gates, and declaration/archive inspection. No acceptance ruling.
