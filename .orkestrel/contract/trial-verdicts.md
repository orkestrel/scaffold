# Trial verification verdicts

Round `wf_71199c06-fe5`, run 2026-08-27 against `/home/user/orkestrel/contract` at the visit
commits, plus the Orchestrator's follow-up probes. Lanes ran blind, clean-contexted, in parallel;
the gate lane ran after them.

## Lane verdicts

- **pointer-fidelity — PASS.** Both pointer files state scaffold as the authority and carry no law
  of their own; every named `node_modules/@orkestrel/scaffold/dist/host/...` read target resolves;
  the sibling `../scaffold` route is absent in this topology as expected; the bodies match the
  `docs.agents` and `docs.claude` templates in `src/core/templates.ts` verbatim.
- **retention-fidelity — lane died** (structured-output retry cap), re-run by the Orchestrator
  directly with the corrected storage mapping (root dotfiles live under `dotfiles/`): every kept
  vendored file byte-matches the floor. The first pass's dotfile "mismatches" were the
  instrument's own wrong floor paths — a missing floor file and a differing file produce the same
  `diff -q` failure — and the policy-suite mismatch was the genuine fetch finding recorded in the
  root cause. Guide mirrors are mirror-owned and excluded.
- **catalog-restoration — PASS.** The restored catalog file byte-matches the floor outside the
  marker-bounded region (head and tail diffs empty, markers at identical lines), no pre-split
  charter text survives, the table holds 49 `@orkestrel` rows including `@orkestrel/contract`.
- **collateral-scope — PASS.** Exactly 92 deletions, all under the instruction roots;
  the modification set is exactly the visit's claim; porcelain empty; no empty directories left
  after the manual prune; `package.json` touched only the three devDependency pins.
- **policy-binding — FAIL (true finding).** The suite the overwrite wrote carried two cases that
  presuppose the pre-split tree: a non-empty skill family containing `orkestrel-falsify`
  (`policy.test.ts:350`) and `.claude/rules/names.md` in the path population
  (`policy.test.ts:496`).
- **gate-chain — FAIL (same finding).** `format:check`, `lint:check`, `check`, `build` all exit 0;
  `npm test` reached `test:policy` and failed exactly those cases, 2 failed | 108 passed.

## Root cause and resolution

The two failures are one defect, and it is not in the sweep: the online verbs read vendored bytes
from the PUBLISHED scaffold package, and the registry's 0.0.55 is the pre-split release, so the
overwrite wrote the registry's pre-gating `tests/policy.test.ts` (byte-identical to `origin/main`'s
copy, 504 lines) instead of the installed floor's presence-gated suite (571 lines). The canon-split
branch's own suite already binds by presence.

Proof: `scaffold repair --offline` (the value host is the installed floor offline) replaced exactly
that one file, the terminal audit reported 0 of 34 drifted, and `npm run test:policy` passed
111 of 111 on the swept tree. Restoration committed as `cd351ee`; the full gate chain re-ran
after it (result in `trial-gates-final.txt`).

Consequences recorded for the release: until the canon-split scaffold publishes (as 0.0.56 — the
registry already serves a different 0.0.55), a pre-publish visit must run
`scaffold overwrite --offline` and prove with `scaffold audit --offline`; an online audit of a
floor-restored target reports stale files until the release. Carried into `wave.md` by the prune
unit's addendum.
