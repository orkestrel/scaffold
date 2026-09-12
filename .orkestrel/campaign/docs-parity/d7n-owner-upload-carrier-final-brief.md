# Correct the upload carrier before execution

## Assignment

Continue as the native mechanical builder on its configured engine. Read d7n-owner-upload-carrier-brief.md and its authority; this successor changes only the defects named here. Work directly, spawn nothing, preserve sibling edits. Own only tmp/pass/d7n-owner-upload-carrier-final.sh and tmp/units/d7n-owner-upload-carrier-final-report.md. Preserve the predecessor script/report unchanged. Run bash -n only; the root runs every mutation.

## Required corrections

- Use Ollama's canonical path as $FLEET/ollama, matching the path spelling in the gate checksum record. Compare gate manifest hashes with sha256sum --check on its retained manifests-after.sha256, not a text comparison against a differently spelled path.
- The status allowlist receives porcelain rows with a status prefix. Extract the path after the status prefix before matching, or read changed/untracked paths separately. Refuse rename/copy rows so a source/destination pair cannot bypass the allowlist. Apply this correction in promote and checkpoint modes.
- Assert Scaffold's expected aabc03c96b6d37847cb8dc0daaa667c486b5b02f HEAD in promote mode as well as checkpoint mode.
- Read installed Ollama dependencies through absolute $ollama/node_modules/@orkestrel/scaffold/package.json and $ollama/node_modules/@orkestrel/guide/package.json. Remove run_target; its present relative arguments inspect Scaffold's own installation, not Ollama's.
- Toolbox requires only origin/main and origin/claude/orkestrel-npm-audit-deps-14ibta. The designated docs branch belongs to Scaffold alone.
- Check local Ollama main ancestry to the release candidate before any push or switch. Preserve the clean-tree and remote-main checks. Switch and fast-forward only after the ancestry proof passes.
- Replace read_receipt's node -e with shell text normalization of the exact local receipt: remove its UTF8 BOM and CRLF and compare to 0. Do not write another helper script for this.

## Acceptance and return

Retain every unrelated safety guard and receipt from the original brief. Root's install and prepublish receipts are green and prompt parsing is green. Do not claim the Linux gaps closed. Return corrected paths and the exact syntax-check exit. Stop on a primary scope deviation.
