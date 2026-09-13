# Integration report — u-fix-6-integrate

Ran on 2026-09-13 after the U-fix-6 builder returned `u-fix-6-report.md` and its successor return
for `u-fix-6b-brief.md`. Every command ran on this host as the Orchestrator's tracked command.

- `final-verify7.sh` (successor of `final-verify6.sh`, same chain): every row exit 0 — `build`,
  `format:check`, `lint:check`, `check`, `test:src:core`, `test:src:server`, `test:src:bin`,
  `test:policy`, `test:config`, `test:setup`, `test:guides`, release-mode `test:distribution`
  (`Tests  6 passed (6)`), and the literal `prepublishOnly` command. `final7.status.txt`, `final-verify7.log.txt`.
- `host.json` unchanged, as expected for an unvendored file: `ROADMAP.md` is neither vendored nor shipped.
- The Orchestrator read the whole diff before the chain: every replacement matches its
  prescription in `u-fix-6-brief.md` and `u-fix-6b-brief.md`, and nothing else moved.
- This report, the unit report with its successor return, both briefs, and the code land in one
  commit. The commit message carries the host reading from `host-platform.log.txt`, so it outlives
  the campaign prune.
