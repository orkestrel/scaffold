# Review the PowerShell receipt reader correction

Act as the independent reviewer already reviewing this handoff. Perform this
read-only assignment directly and spawn nothing. Preserve accepted source and
operator-command verdicts. Read the root authority and applicable publish rules.

Review only the parser receipt comparison in
tmp/pass/commit-scaffold-upload-handoff-final.sh against retained predecessor
.orkestrel/campaign/docs-parity/instruments/d7/foundation-native/commit-scaffold-upload-handoff.sh.
Root owns the correction. The predecessor refused before creating its output
directory and before any Git operation. Format-Hex read the parser receipt as
EF BB BF 30 0D 0A: PowerShell wrote UTF-8 BOM, zero, CRLF. Its numeric result is 0.
The successor strips BOM bytes and CR before comparing the resulting value
exactly with 0. The command and package output remain unchanged. The original
receipt remains unchanged.

Determine whether the comparison accepts that measured receipt while still
refusing a normalized nonzero result. Return PASS or FAIL with the bounded
reason. Do not run the carrier, authenticate, upload, write, install or alter Git.
