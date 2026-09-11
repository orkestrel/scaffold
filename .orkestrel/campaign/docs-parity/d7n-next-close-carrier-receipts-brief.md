# Close-carrier receipt correction

Keep the builder scope and current authority. Write only tmp/pass/close-next-package-verified.sh and tmp/units/d7n-next-close-carrier-receipts-report.md. Preserve all predecessors. Do not run a mutation carrier. Retention successor and metadata validator remain frozen and need no edits.

Start from close-next-package-final.sh and make only these specified receipt corrections:

- Bind manifests-after.sha256, diff-after.txt and index-after.txt to the pack directory, not the visit directory.
- After read-only identity/branch/status/receipt checks, create the unique closure directory and capture before. Do this before packed-manifest/dist/archive/metadata checks. Remove the later duplicate mkdir/capture.
- Route packed manifest cmp, packed dist diff, archive sha256sum --check and metadata validation through the existing run_command function, naming their receipts packed-manifest, packed-dist, archive-sha256 and metadata. Retain every exact exit under the closure directory, including failures. Do not write checks back into the accepted visit directory or coerce comparison errors to exit1. Use a bounded timeout for each.
- Expand the staging loop and final ref loop into multiline code. Do not compress them.
- Record origin/main, the local campaign ref and the origin campaign ref as separately named run_command rev-parse receipts in the closure directory. Compare every value with release-head.txt. Capture after and verify local HEAD, manifest and dist against their accepted values with retained command receipts.

Preserve every package/label guard, metadata check, allowlist, exact author/trailers, push ordering, absent-main creation branch and clean-state/ref equality requirement. Run Bash syntax only, return exact evidence and freeze. Root will read and independently review the verified successor before execution.
