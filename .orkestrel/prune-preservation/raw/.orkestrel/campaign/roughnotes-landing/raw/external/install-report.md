# Original registry install instrument

Root must run:

```powershell
& C:\Users\mikes\AppData\Local\Temp\roughnotes-integration-20260918\launch-install-original.ps1 -Commit ACCEPTED_COMMIT -Run original-registry-install-20260918
```

The instrument has not run `npm ci`. It requires the literal accepted main commit, records child logs and exits, and checks the accepted package identity after the install.
