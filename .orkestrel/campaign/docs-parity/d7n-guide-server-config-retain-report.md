# Guide server configuration retention report

The retention script copies the effective carrier instrument and the named evidence directories into the docs-parity campaign.

Each existing destination is compared by SHA-256 before the script refuses to overwrite it. Directory retention compares the complete relative file map and every file hash.

The script also retains this brief and this report after they exist.

The root retention run at `6031ec` exited `1` on the PowerShell `5.1` / CLR `4.0` host because `System.IO.Path` lacks `GetRelativePath`. The effective carrier and preview evidence copied before this directory comparison refused. The run did not overwrite, move, or delete a retained destination.

The script uses `System.Uri.MakeRelativeUri` with decoded file-relative paths in place of `GetRelativePath`.

PowerShell parser validation exited `0` before the correction.

Whitespace validation over the retention artifacts exited `0`.
