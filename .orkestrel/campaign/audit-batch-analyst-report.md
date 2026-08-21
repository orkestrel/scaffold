1. **BROKEN** — A transparent `Proxy` over a genuine `ContractError` returns `true`; the other hostile inputs returned `false` without throwing. Physical module copies recognized each other correctly. Smallest fix: store `this` as the brand value and require `descriptor.value === value`, which preserves cross-copy recognition while refusing a forwarding proxy.

2. **CONFIRMED** — Sweeps of sources, tests, and guides found no `#brand`, `ContractError.guard()`, bootstrap seam, realm-local recognition wording, or alternate recognition API.

3. **CONFIRMED** — Replacing `Object.defineProperty` after module evaluation broke the direct control but neither construction nor recognition. The integration proof exercises that same sabotage.

4. **CONFIRMED** — Every spawned `runShell` site receives `timeout`: blob generation directly, and stripping, signing, and verification through the shared shell options.

5. **CONFIRMED** — The real build completed with `30_000`, while `1` produced `TIMEOUT`. Ignoring the option would make the latter complete and fail its error assertion.

6. **CONFIRMED** — Conforming class instances with prototype getters passed both foreign-result guards and `validateProgramDefinition`; malformed results remain refused.

7. **CONFIRMED** — Caller and stored identities diverged, caller mutation did not propagate, and nested stored mutation failed. Subsequent behavior reads the snapshot only.

8. **CONFIRMED** — Every converted `track` acquisition is followed immediately by `add`; raw servers register cleanup before listening. No throwing intervening operation was found.

9. **CONFIRMED** — The old reverse loop stopped on the first failing disposer and left the earlier real server listening; the adopted aggregator ran that earlier disposer and preserved the failure.

10. **CONFIRMED** — Attacked the `Channel` example, shaper proofs, and manifest placement. The exact package-spelled example compiled and ran through the exported source; the shaper tests compile the same shapes used by the factories; every edited manifest places `prepack` under `scripts`.

11. **BROKEN** — Do not ship `contract`, `probe`, or `brief`. `contract` admits the genuine-error proxy. `probe` pins `@orkestrel/test` to a machine-local temporary tarball; restore `^0.0.7` and its registry lock entry. `brief` has a second `npm pack --dry-run --json` call without `--ignore-scripts`, so it reruns `prepack`; add the missing flag.

Findings outside the claims: None.

VERDICT: FAIL — 2 broken, 0 unresolved, 0 not-evidenced, 0 findings outside the claims