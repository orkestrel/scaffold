# Unit d7n-retired-worktrees-json-correction — Read the manifest array

Root owns this bounded line correction under the direct-edit exception in .agents/orchestration.md. Read AGENTS.md and the existing final-carrier brief and rules. Skill: none. The archive/removal specification and fixed paths are unchanged. No product code changes.

Root ran the reviewed carrier's Archive mode on Windows PowerShell 5.1; it exited 0 and archived the named worktrees. Verify then exited 1 with archive manifest population differs: scaffold-guides-entry. The wrong-hash attempt stopped at the same earlier failure and is not a valid control result.

Own tmp/pass/d7n-retired-worktrees-verified-carrier.ps1, copied from the frozen final carrier, with the manifest assignment changed from @($text | ConvertFrom-Json) to $text | ConvertFrom-Json. The enclosing array expression boxes the JSON array returned by Windows PowerShell; use the returned array directly. Preserve the predecessor and archive bytes. Do not rerun Archive or delete any copy until Verify and the actual wrong-hash control pass and the archive is pushed.

Run the same Verify command against the corrected carrier, then the Verify-only wrong-hash control. Retain the actual diff and receipts. Reuse the independent reviewer and objective analyst for the line correction and runtime evidence. Do not dispatch a fresh verifier or run product gates. Root decides acceptance and performs commits, pushes, and the authorized removal.
