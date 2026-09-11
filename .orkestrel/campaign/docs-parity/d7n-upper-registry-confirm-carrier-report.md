# Upper registry confirmation carrier report

Created `tmp/pass/confirm-upper-registry.ps1` from `confirm-following-registry.ps1`.

The successor changes the output label and package table for Browser, Interpret, LSP, Qualifier, Queue, Rater, Relation, SEA, Server, Terminal, and Workspace. The table uses the prepared landing HEADs and archive SHA-256 values from the accepted pack receipts. LSP uses `d7n-lsp-registry-docs-pack`.

Parser check: `powershell.exe -NoProfile -Command "[scriptblock]::Create((Get-Content -Raw 'tmp/pass/confirm-upper-registry.ps1')) | Out-Null"` exited `0`.

The confirmation carrier was not executed. No package command, Git change, upload, or publication ran.
