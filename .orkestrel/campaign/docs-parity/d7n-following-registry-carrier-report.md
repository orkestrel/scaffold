# Following registry receipt carrier report

The unexecuted successor is [confirm-next-registry.ps1](../pass/confirm-next-registry.ps1).

Root invocation: `powershell -File tmp/pass/confirm-next-registry.ps1`.

It fetches public latest metadata and matching tarballs, compares their hashes with accepted packed candidates, and retains canonical main state readings. No credentials are read.
