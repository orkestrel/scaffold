AS5 is blocked before edits by an R3 scope conflict.

- **Expected:** removing the 16 names from `$withhold` emits their important rules inside `bootstrap`.
- **Found:** the utility emitter calls `unlayer`, which explicitly removes every layer. See [_mixins.scss:209](/home/user/.wave/veneer-audit-links/src/bootstrap/_mixins.scss:209) and [_mixins.scss:221](/home/user/.wave/veneer-audit-links/src/bootstrap/_mixins.scss:221). The existing [placement proof](/home/user/.wave/veneer-audit-links/tests/src/tailwindcss/index.test.ts:417) requires all important declarations to remain unlayered.
- **Scope conflict:** changing that emitter exceeds the brief’s permission to edit `_mixins.scss` “only for the element-wide link form.”
- **Hypothesis:** R3 intended to retain unlayered importance. Those percentage rules would still beat Tailwind’s normal utility declarations, but the guide must explain importance rather than reversed layer order.

No tracked files changed or commits made. Current evidence:

| Check | Result |
|---|---|
| `./bootstrap` baseline/current bytes | 332388 / 332388 |
| Baseline/current `cmp` | Exit 0; identical, no rebuild |
| `git diff --check` | Exit 0 |
| `git status --porcelain` | Empty |
| `git diff --stat -- src/browser` | Empty |

Implementation, proof readings, derivation updates, queued gates, journey comparison, and captures remain unperformed.

Should R3 retain **unlayered important rules** (recommended), or should ownership expand to change percentage-rule placement?

The scaffold [deviation protocol](/home/user/.wave/veneer-audit-links/node_modules/@orkestrel/scaffold/dist/host/agents/orchestration.md:138) requires this stop: “A unit stops when a conflict blocks its objective or requires an unowned change.”