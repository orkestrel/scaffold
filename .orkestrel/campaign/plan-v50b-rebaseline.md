# Re-baseline — the release is vendored, because the fleet visit is required anyway

`plan-v50b.md` ruled the orphan-setup-module rule out of scope to hold 0.0.50 as a `dist/src`
release. A measurement taken after that ruling overturns its premise, so the plan is re-baselined
here rather than left standing.

## The premise that failed

The generated `tests/distribution.test.ts` is a planned artifact. A target receives it only by
re-pinning its `@orkestrel/scaffold` devDependency and running `repair` or `overwrite`. So this
release already obliges a visit to every target in the fleet, whatever else it carries.

`repair` is also what restores a vendored file. A vendored-byte release and a `dist/src` release
therefore reach the fleet through the **same visit**: re-pin, run the verb, re-prove the target's
gates. The marginal cost of moving vendored bytes in this release is the vendored files' own
re-proof inside a visit that was already required, not a second campaign.

Holding the release `dist/src` buys nothing it was supposed to buy.

## What changes

**Added to scope.** The release-mode regression guard, in the vendored `tests/config.test.ts`.
`release-mode-evidence.md` measures the defect and locates the guard: the subject is the root
configuration, that file is its stated proof, and the placement is what makes the guard protect
every package's publish gate rather than scaffold's alone. Shipping the generated distribution
proof fleet-wide while leaving its release gate unguarded ships the mechanism without the assertion
that keeps it honest.

**Still excluded.** The orphan-setup-module policy rule. Its exclusion never rested on the release
shape — it catches a dead setup module, which is not the gap the user named, and `AGENTS.md` records
a finding outside the enumerated scope against the capability that owns it rather than reopening the
scope. It stays recorded for a successor. The re-baseline changes which units run; it does not move
the exit criterion.

## The assumption this proceeds under

0.0.50 becomes a vendored-byte release: bump, publish, re-pin `@orkestrel/scaffold` in every target,
run the verb, and re-prove each target's gates. Nothing publishes without the user's credential and
approval, so this shapes what is built rather than what ships, and it is stated here to be
overridden rather than discovered later.

## Units, restated

| Unit | Subject | Vendored? |
| ---- | ------- | --------- |
| W1 | Release-mode regression guard | **yes**, `tests/config.test.ts` |
| W2 | Delete `Blueprint.distribution`; generate the proof at `presence`, with the core, server, and browser branches | no |
| W3 | Manifest script region, compare-and-swap, `ManifestRegions` | no |
| W4 | Audit question for an unproven setup surface | no |
| W5 | Guide parity | no |

W2 carries the browser branch rather than deferring it, because `AGENTS.md` refuses a stub or
deferred logic and a proof generated without its browser branch would leave a browser-face target's
strongest entry unproven.
