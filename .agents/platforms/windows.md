# Windows host

The commands an agent runs on a Windows host, and their quirks. `.claude/rules/portability.md` owns product code that runs on Windows; `.agents/skills/orkestrel-dispatch/references/launch.md` owns the portable launch and kill procedure this page serves.

## Processes

- Read liveness with `Get-Process -Id <pid>` in PowerShell, or under Git Bash from the output of `tasklist //FI "PID eq <pid>" //NH`: a row naming the pid means alive, and the `INFO:` line means gone. Never read liveness from `tasklist`'s exit code, `kill -0`, or `ps -eo`.
- List descendants with `Get-CimInstance Win32_Process -Filter "ParentProcessId=<pid>"`, applied to each listed id in turn. Under Git Bash, run it through `powershell -NoProfile -Command`, and write every Windows slash option as `//`.
- Kill a recorded tree with `taskkill /pid <pid> /T /F`. `launch.ts` kills the tree at its cap on this host.
- Detach a run from the session's process tree with WMI: `Invoke-CimMethod -ClassName Win32_Process -MethodName Create -Arguments @{ CommandLine = '<command>' }`. The run starts under `WmiPrvSE.exe`, outside the session's job and process tree (verified 2026-10-16). It receives the user's registry environment, not the caller's, so pass each value it needs on its command line. Record its journal and pid-file paths before the launch.
- Spawn npm without a shell through its JavaScript entry: `node <node directory>/node_modules/npm/bin/npm-cli.js <arguments>`. A `.cmd` shim cannot start without a shell, and `launch.ts` reports exit `127`.
- A child CLI can leak orphaned `conhost.exe` processes and open console windows. Count them with `Get-Process conhost` at each launch while such a lane is live.

## PowerShell 5.1

- Chain with `;` and gate with `if ($?) { ... }`; `&&` and `||` are parse errors.
- Edit text with the harness's file tools, never `Get-Content` piped through `-replace` into `Set-Content`. `-replace` matches case-insensitively, `Set-Content` writes the ANSI code page, `Set-Content -Encoding utf8` and `Out-File` write a byte-order mark, and the round trip turns non-ASCII punctuation into mojibake.
- Write a commit message to a file with the harness's file tool and commit with `git commit -F <file>`. A here-string carrying double quotes splits into stray arguments, and a byte-order mark in the file lands in the commit subject.
- Never pipe a command whose exit code gates the next step, a `node` probe included, into `Select-Object -First` or `-Last`. The cut pipeline kills the command early and leaves a misleading `$LASTEXITCODE`. Run it bare, read `$LASTEXITCODE`, or decide from `git status --porcelain` and `git rev-parse`.
- PowerShell drops a bare `--` before a native command, so `npm run <script> -- <arguments>` loses the separator. Run the tool's own entry with an argument array, or call `npm.cmd`.
- `Start-Process -ArgumentList` splits an element that contains spaces into several arguments. Put the launch in a TypeScript file run by `node`. `Start-Process` also detaches with no completion notice.
- Pass an absolute path to every .NET file call; `[System.IO.File]` resolves a relative path against the process directory, which `Set-Location` does not move.
- `Get-Content` without `-Encoding` reads a UTF-8 file with no byte-order mark as ANSI. Read with `-Encoding utf8` before concluding the bytes are corrupt.
- `*>` writes UTF-16LE. Redirect large output through a Node writer.
- Inside a double-quoted string, write `${name}:`; `$name:` parses as a drive reference.
- `Get-FileHash` prints uppercase hexadecimal, and Node's `createHash` prints lowercase. Compare digests case-insensitively.
- Redirecting a native command's standard error with `2>&1` wraps each line in an error record and sets `$?` to false on success. Let the harness capture standard error.

## Release packs and terminals

- Git Bash ships no `script` binary, so an agent cannot give npm a TTY there; the operator runs a browser-authorized `npm login` or `npm publish` in a real terminal.
- A pack made on Windows records `0644` for an entry git tracks as `100755`. Compare release packs between hosts by paths, sizes, and content hashes, and report executable-mode differences separately.

## Deleting untracked files

- When a sweep you run by hand deletes untracked files, send them to the Recycle Bin through a shell file operation with undo, never permanent deletion, and report what went there. Leave emptying the bin to the user; hand them `Clear-RecycleBin -Force`.
- Remove a worktree with `git worktree remove`. Delete a leftover `node_modules` junction without recursing into its target.
