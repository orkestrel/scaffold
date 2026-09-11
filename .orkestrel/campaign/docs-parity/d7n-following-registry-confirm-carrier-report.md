# Following registry carrier return

The builder authored tmp/pass/confirm-following-registry.ps1 as the successor
of confirm-next-registry.ps1. It changed the prepared package table and receipt
label, added the registry gitHead equality guard, and made input reads explicit
UTF8. The remaining archive, canonical identity and clean-main guards are unchanged.

The builder reported PowerShell Parser API exit 0 and predecessor diff exit 1.
Root read the returned diff and the saved script, then ran the script directly.
The root process exited 0. Its receipt directory is
tmp/pass/d7n-following-registry-confirm-closed. Root read result.json and confirmed
its values against d7n-following-layer-prepared.md.

This carrier downloads public registry metadata and archives, reads canonical
manifests, and fetches named Git origins. It does not authenticate or publish.
