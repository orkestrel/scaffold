# Integration brief — u-fix-4-integrate (Orchestrator-owned)

Orchestrator, Opus 5, in `/home/user/scaffold`, after the U-fix-4 implementer exits. Regenerate
`host.json` with `build`, run `final-verify5.sh` (successor of `final-verify4.sh`), and land the
code, `u-fix-4-report.md`, and `u-fix-4-integrate-report.md` in one commit. Owned: `host.json`.
Off-limits: every file the U-fix-4 brief owns; every other file. Criteria: `build` exit 0 and
`host.json` rewritten; `test:config` exit 0; every chain row exit 0; `git status --short` empty
after the one commit.
