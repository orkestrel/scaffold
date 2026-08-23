# Plan — what 0.0.50 closes, after the reconciliation

## Exit criterion

0.0.50 closes the distribution proof's self-fulfilling derivation, ships the generated proof with a
real browser stage, and makes the setup gap visible fleet-wide. The campaign ends when every unit
below is implemented, repaired, or intentionally excluded on evidence, and the gates are green.

## The release stays `dist/src`

The reconciled distribution design kept the proof out of `host.json` so no vendored byte moves. That
property is preserved here, and it decides one unit's placement.

The objective lane's strongest setup unit — the orphan-setup-module rule landed in the vendored
`tests/setupPolicy.ts` and `tests/policy.test.ts` pair — moves vendored bytes. That turns 0.0.50
from a `dist/src` release into a vendored-byte release: bump, publish, re-pin
`@orkestrel/scaffold` in every target, run `repair` there, and prove each target's gates still
green. It also catches a defect the user did not raise: a dead setup module, rather than an absent
setup proof.

**Ruled: it is outside this scope and recorded against the capability that owns it.** `AGENTS.md`
fixes the enumerated scope when work begins and records a finding outside it for the next change
rather than reopening this one. The setup gap the user named — nothing reports which packages lack
the proof — is closed inside this release by the audit question, which is `dist/src`.

## Units, in dependency order

Every unit is a writing unit in the main checkout, serialized, one writer at a time, dispatched from
a committed baseline.

| Unit | Subject | Owned files | Role | Engine |
| ---- | ------- | ----------- | ---- | ------ |
| W1 | Release-mode regression guard | `tests/config.test.ts` | `implementer` | Opus 5 |
| W2 | Delete `Blueprint.distribution`; generate the proof at `presence` | `src/core/types.ts`, `src/core/compilers.ts`, `src/core/constants.ts`, `src/bin/CLI.ts`, their focused tests | `implementer` | Opus 5 |
| W3 | Core and server branches, recursive exports reader | `src/core/templates.ts`, `src/core/compilers.ts`, focused tests | `implementer` | Opus 5 |
| W4 | The browser branch | `src/core/templates.ts`, `src/core/compilers.ts`, focused tests | `implementer` | Opus 5 |
| W5 | Manifest script region, compare-and-swap, `ManifestRegions` | `src/core/compilers.ts`, `src/server/Materializer.ts`, `src/server/types.ts`, `src/bin/CLI.ts`, focused tests | `implementer` | Opus 5 |
| W6 | Audit question for an unproven setup surface | `src/bin/CLI.ts`, `src/core/types.ts`, focused tests | `implementer` | Opus 5 |
| W7 | Guide parity | `guides/scaffold.md`, `.claude/rules/*` where a rule states a superseded fact | `implementer` | Opus 5 |

Every row routes to Opus because the Codex bench was dark for the whole round;
`.orkestrel/campaign/routing-v50b.md` records the probe, the recovery attempt, and the
substitution. W2, W3, W4, and W5 are constraint-heavy work whose default engine is GPT-5.6 Sol. If
the bench comes live, the remaining rows re-route to `sol` and the ledger records the point of
change.

W2 through W5 all write `src/core/compilers.ts`, so they are strictly serial and never concurrent.

## Recorded for a successor, not this release

- The vendored orphan-setup-module policy rule. Green in every checkout measured, red on an injected
  control, and it moves vendored bytes.
- Closing the vendored setup modules' unreferenced exports. Blocked on a rule conflict:
  `.claude/rules/tests.md:180` mandates the exports, and no instrument can call them a defect while
  it does.
- Re-running the objective lane on GPT-5.6 Sol against the identical brief, and re-taking this
  reconciliation, whenever the bench comes live.
