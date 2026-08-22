1. **BROKEN — The one-sentence test passes.**

   The Baselines sentence states the general fallback rule, authoritative-absence rule, guide exception, and provenance shape (`guides/scaffold.md:443`, `guides/scaffold.md:448`, `guides/scaffold.md:453`, `guides/scaffold.md:456`). It does not determine the verb matrix:

   - `new`: the live surfaces and forced-floor exit `0` do not follow.
   - `audit`: forced-floor exit `1` versus offline audit-derived exit does not follow.
   - `repair`: forced-floor exit `1` despite an aligned terminal audit does not follow.
   - `catalog`: rejecting `--offline` as usage and preserving failed guide rows do not fully follow.
   - `overwrite`: retaining repair and deletion work before skipping or refusing catalog does not follow.

   Those decisions appear only in the table and its following qualifications (`guides/scaffold.md:966`, `guides/scaffold.md:967`, `guides/scaffold.md:968`, `guides/scaffold.md:969`, `guides/scaffold.md:970`, `guides/scaffold.md:972`, `guides/scaffold.md:977`).

   **Alternative:** Add compact corollaries before the table: `new`, `audit`, and `repair` read versions and host; `catalog` reads membership, packuments, and guides; `overwrite` combines those reads. State that network-forced floors are drift except for successful `new`, explicit offline floors are intentional, `catalog` has no offline form, and `overwrite` commits repair and removal before catalog.

2. **BROKEN — The names carry their meanings.**

   Per-name ruling:

   - `Baseline`: confirmed. It names the selected `live` or `floor` tier (`src/bin/types.ts:22`).
   - `Provenance`: confirmed. It groups the source tiers by surface (`src/bin/types.ts:31`).
   - `Copy`: broken. It is too generic for a vendored-file lookup and collides conceptually with the existing byte-copy operation (`src/core/types.ts:246`, `src/server/WriteTransaction.ts:280`).
   - `Host`: confirmed. It extends the established vendored-host concept with a value representation (`src/server/types.ts:50`, `src/server/types.ts:89`).
   - `vendor`: broken. On a contract explicitly described as a reader that never writes, `vendor` implies the larger write-to-repository operation (`src/server/types.ts:338`, `src/server/types.ts:375`).
   - `repository`: broken. The option means a remote raw-content endpoint, while `Repository` already means the target’s local Git state (`src/server/types.ts:123`, `src/server/types.ts:320`).
   - `copiesToHost`: confirmed. It names a projection and follows the standalone-helper form (`src/server/helpers.ts:1208`).
   - `stageBytes`: confirmed. It names the staging operation and its material (`src/server/helpers.ts:1274`).
   - `--offline` and the `offline` option key: confirmed. They name the user-visible behavior directly (`src/bin/types.ts:66`, `src/bin/constants.ts:122`).
   - The existing `host` key remains confirmed; the union changes representation, not behavior (`src/server/types.ts:51`).

   **Alternative:** Rename `Copy` to `HostFile`, rename the `vendor` method and `copy` event to `read`, and rename the existing local-Git `Repository` contract to `Worktree` with `isWorktree`. Keep `UpstreamOptions.repository` for the remote repository endpoint.

3. **CONFIRMED — `Copy` earns its existence beside `Mirror`.**

   The shapes share lookup mechanics, but their domain invariants differ. A `Copy` is keyed solely by the target/repository path and may carry already-verified target bytes (`src/core/types.ts:246`, `src/core/types.ts:257`). A `Mirror` also carries the package name and represents catalog-owned guide state (`src/core/types.ts:279`, `src/core/types.ts:287`). Widening either type would introduce an optional or meaningless `name` field. The separation fits; the `Copy` name does not.

4. **CONFIRMED — The option groups fit.**

   `repository` and `registry` are parallel endpoint entities with single-word leaves (`src/server/types.ts:319`). The `host` union admits directory and value representations of the same vendored root (`src/server/types.ts:50`). The environment variables map directly into those groups without further keys (`src/bin/helpers.ts:62`, `src/bin/helpers.ts:65`, `src/bin/helpers.ts:70`). The structural grouping is coherent, subject to the `repository` vocabulary collision ruled under claim 2.

5. **BROKEN — The guide is in voice and complete.**

   The narrative otherwise leads with decisions and places the integrity and temporary-root limits where readers meet them (`guides/scaffold.md:443`, `guides/scaffold.md:1054`, `guides/scaffold.md:1152`). It omits the aggregation rule for mixed guide results: the reconciliation says `provenance.guides` becomes `floor` when a guide row falls back (`.orkestrel/campaign/design-fetch-reconciliation.md:68`), while the guide says rows may mix live updates and retained mirrors but never explains which single provenance value represents that mixture (`guides/scaffold.md:453`, `guides/scaffold.md:456`).

   **Alternative:** After the guide exception, add: “If any guide row keeps its mirror, `provenance.guides` is `floor`; it is `live` only when every requested guide resolves live.” Replace “baseline word” with “source tier.”

6. **CONFIRMED — Nothing speculative shipped.**

   The added public mechanisms have production consumers: the inventory path drives host reads (`src/server/Upstream.ts:567`); `readHostFloor`, `copiesToHost`, and the vendored-file reader form the CLI host-resolution path (`src/bin/CLI.ts:600`, `src/bin/CLI.ts:614`); `stageBytes` supplies the materializer’s value-host boundary (`src/server/Materializer.ts:1013`); and `stageInventory` drives the package’s inventory script (`package.json:90`). The helpers add validation, translation, staging, or source-selection boundaries rather than rename-only delegation.

Findings outside the claims: None.

VERDICT: FAIL - 3 broken, 0 unresolved, 0 not-evidenced, 0 findings outside the claims