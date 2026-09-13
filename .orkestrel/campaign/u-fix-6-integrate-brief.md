# Integration brief — u-fix-6-integrate (Orchestrator-owned)

Orchestrator, Opus 5, in `/home/user/scaffold`, after the U-fix-6 builder exits. `ROADMAP.md` is
neither vendored nor shipped, so `host.json` does not move; run `final-verify7.sh` (successor of
`final-verify6.sh`) so the release tip carries its own green chain, and land the code,
`u-fix-6-report.md`, and `u-fix-6-integrate-report.md` in one commit whose message carries the
host reading (`host-platform.log.txt`) so it survives the campaign prune. Owned: nothing in the
tree beyond the records. Off-limits: every file the U-fix-6 brief owns; every other file.
Criteria: every chain row exit 0; `git status --short` empty after the one commit; then the Grok
mechanical check over the scaffold rows reads no backticked token without a following noun.
