# Guide upload handoff carrier report

Created `tmp/pass/commit-guide-upload-handoff.sh`.

The carrier keeps Scaffold handoff closure checks and adds runtime guards for Guide main closure, final prepublish receipt, packed manifest and distribution, and archive digest by SHA256 field. It verifies the Guide main branch, closure HEAD, origin main, clean state, packed manifest, and complete distribution before and after the Scaffold push. It normalizes the prompt parser receipt for the measured UTF-8 BOM and CRLF form.

Syntax check: `C:/Users/mikes/scoop/apps/git/current/bin/bash.exe -n tmp/pass/commit-guide-upload-handoff.sh` exited `0`.

The carrier was not executed. No Git, publish, or install action ran.
