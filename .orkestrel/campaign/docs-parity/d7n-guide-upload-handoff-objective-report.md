Objective lane held.

- **COMMAND — CONFIRMED.** [prompt.txt](C:/Users/mikes/WebstormProjects/scaffold/prompt.txt:1) changes to canonical Guide before authentication or publication. `$ErrorActionPreference = 'Stop'` covers directory failure. Explicit `$LASTEXITCODE` checks stop after failed `npm whoami` or publication. The command publishes Guide alone with `--ignore-scripts --browser=false`. It contains no stale package, login command, credential, OTP, or tarball path.

- **READY — CONFIRMED.** Guide is clean on `main`; local HEAD and `origin/main` equal closure commit `ccd2a79058b0d814e9a031ce86089b8e981d964b`. Closing receipts show successful prepublish, archive SHA-256 validation, packed and final manifest equality, complete distribution equality, and origin pushes. The accepted archive remains `01e460ee05cb84b4d24ffc2418aad29ca196d4152cf49b03bf0b68637858c638`. Scaffold’s dirty paths are limited to `prompt.txt` and campaign records, so they do not alter Guide or Scaffold’s published manifest and distribution.

- **PARSER — CONFIRMED with a receipt limitation.** Root records that the historical parser ran immediately after the exact prompt replacement and that no prompt edit followed. [d7n-guide-upload-prompt-reading.md](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/docs-parity/d7n-guide-upload-prompt-reading.md:1) binds the observed line to SHA-256 `26BCEC1F088C2976A1A27572C567E9954EFB61E68A38EAA96DB237320647E05E`. I also parsed the current file without execution using:

  ```powershell
  $tokens = $null; $errors = $null; [void][System.Management.Automation.Language.Parser]::ParseFile('C:/Users/mikes/WebstormProjects/scaffold/prompt.txt', [ref]$tokens, [ref]$errors); if ($errors.Count -ne 0) { $errors | ForEach-Object { $_.Message }; exit 1 }; Write-Output 'parsed current prompt'; exit 0
  ```

  The command exited `0` in chunk `d8fec8` and printed `parsed current prompt`. The historical `parse.exit.txt` contains BOM, `0`, and CRLF, but no input digest. It is not self-authenticating without root’s sequence and hash record.

- **CARRIER — CONFIRMED as source; execution remains pending.** [commit-guide-upload-handoff.sh](C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/commit-guide-upload-handoff.sh:7) explicitly removes BOM and CR before requiring parser exit `0`. It requires the reviewed verdict, Guide-only directory and publish command, and no sibling upload directory. It rejects staged or unrelated Scaffold changes, then stages only `prompt.txt` and campaign records. Before and after Scaffold push, it binds Guide to clean `main`, closure HEAD, `origin/main`, packed manifest, complete distribution, and the hardcoded archive digest. It likewise compares Scaffold’s manifest and complete distribution with its accepted archive before and after push. SHA validation reads the digest field, so Windows’ binary marker does not weaken identity.

The carrier has not run, so its Git and post-push effects remain intentionally unmeasured. Its syntax check exited `0`. The parser receipt’s missing digest is the only evidence limitation; the current prompt is separately hash-recorded and directly parsed.

VERDICT: PASS
