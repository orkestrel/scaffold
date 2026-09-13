# Integration brief — u-fix-5-integrate (Orchestrator-owned)

Orchestrator, Opus 5, in `/home/user/scaffold`, after the U-fix-5 builder exits. Regenerate
`host.json` with `build`, run `final-verify6.sh` (successor of `final-verify5.sh`), and land the
code, `u-fix-5-report.md`, and `u-fix-5-integrate-report.md` in one commit. Owned: `host.json`.
Off-limits: every file the U-fix-5 brief owns; every other file. Criteria: `build` exit 0 and
`host.json` rewritten; `test:config` exit 0; every chain row exit 0; `git status --short` empty
after the one commit.
