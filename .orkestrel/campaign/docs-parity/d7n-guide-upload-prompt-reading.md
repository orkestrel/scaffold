# Guide operator command reading

The root replaced the consumed Scaffold command with the Guide command, then ran `./tmp/pass/parse-following-prompt.ps1 -Label d7n-guide-upload-prompt-parse`. It exited `0`. No prompt edit followed before this reading.

`Get-FileHash -Algorithm SHA256 prompt.txt` reported `26BCEC1F088C2976A1A27572C567E9954EFB61E68A38EAA96DB237320647E05E`. `Get-Content -Encoding UTF8 prompt.txt` returned:

```powershell
& { $ErrorActionPreference = 'Stop'; cd 'C:/Users/mikes/WebstormProjects/guide'; npm whoami; if ($LASTEXITCODE -ne 0) { throw 'Login check failed' }; npm publish --ignore-scripts --browser=false; if ($LASTEXITCODE -ne 0) { throw 'guide publish failed' } }
```

The actual Git diff replaces only the canonical upload directory and failure message. The parser’s retained exit receipt has no captured input digest. This reading records the observed command and digest; it does not retroactively add an input digest to that receipt. The reviewer may parse the actual unchanged command read-only and return that direct observation for retention. No upload has run here.
