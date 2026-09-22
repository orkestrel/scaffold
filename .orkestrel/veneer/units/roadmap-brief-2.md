# Unit F0 ROADMAP — successor brief 2 (the fold)

Effective over `roadmap-brief.md`. The Orchestrator performed this successor itself as the plan's
owner, after the audit round's verdict (`../veneer-audit-verdict.md`) and the F3 gate reading
(`veneer-pin-gates-report.md`) returned, and recorded it in the Veneer commit `6577fbd`
"Fold the audit verdict into the roadmap and re-baseline after F3".

## What changed and why

- § Carriers takes one row per failing audit claim, each with one unit, and the paragraph that
  deferred the objective lane's verdict is gone.
- § Phases and units reads F2 and F3 as landed, extends F4's closures, and adds T1 TEST-HOLD,
  T2 TEST-FORCED-COLORS, T3 TEST-PUBLISH, and F9 VENEER-REPIN, because `holdOraclePointer` duplicates
  the installed pointer drive for a root-scoped name and Test exports no root-scoped hold.
- § Decisions drops D1 (closed: Test `0.0.19` published 2026-09-22) and adds D10 (the Test release
  scope).
- § Standing conditions replaces the tip-tarball row with the `0.0.19` pin and adds the Codex
  sandbox loopback row from `codex-sandbox-probe.log.txt` and `codex-sandbox-probe-2.log.txt`;
  § Routing carries the launch rule.

## Report

`npm run format:check` exit 0 and `npm run test:policy` exit 0 (109 passed, 1 skipped) on the
folded file under npm 11.19.1, 2026-09-22; the diff ignoring the formatter's table realignment is
the change list in this file.
