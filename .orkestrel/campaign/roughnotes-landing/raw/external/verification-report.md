GATE REPORT — GREEN

- Root-supplied execution: `prepare-3.ps1` completed exit `0` in `1.2469527` seconds. The predecessor’s exit `1` remains a retained precedence-control failure before backup or staging.

- Backup preservation: direct SHA-256 inspection confirms every recorded original dirty and staged working file equals its backup copy and `original-hashes.json`. Live original porcelain status equals `backup/original-status.txt`.

- Original staged blobs: `backup/original-index.txt` equals the live index. The saved and live blob IDs match:
  - `.codex/agents/orkestrel.toml`: `59069a1f5926a5a691982125cc4e0ec72f7e69fc`
  - `.codex/hooks.json`: `7c6257de2940b4bf16d64f7ff20834152c899404`
  - `git hash-object` agrees with each index blob after Git’s attribute-aware normalization.

- Recovery staging: every `recovery-hashes.json` entry matches live recovery bytes; `tests/app/browser/setup.test.ts` and `tests/app/browser/setup.ts` remain absent. Every common protected path matches the accepted gate-after snapshot. Cached paths exactly equal `recovery-paths.txt`; `git diff --quiet` confirms no unstaged tracked recovery change; `git diff --cached --check` exits `0`.

- Original reverse check: `git -C C:\Users\mikes\WebstormProjects\roughnotes apply --reverse --check -- C:\Users\mikes\AppData\Local\Temp\roughnotes-integration-20260918\backup\original-unstaged.patch` exited `0`. No reversal occurred. Original `git diff --check` also exited `0`.

- Limitation: `evidence/successor-3/` contains no retained control output files. `report-3.md` records the equal-array, extra-row, native-failure, and read-only preflight results. The actual prepared backup and staging evidence independently verifies the integration prerequisite. No source gates, commits, merges, installs, index mutations, or writes ran.
