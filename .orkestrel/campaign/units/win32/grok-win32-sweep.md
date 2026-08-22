# Brief: win32 portability sweep of the @orkestrel/test package

Role: grok (bridge to Cursor Grok). Read-only. The driver carries this brief across unaltered and returns the journal; the engine behind the CLI does the reading itself.

Objective: enumerate every Windows-portability hazard in /home/user/test that could turn a gate red on a win32 host, so a single writer unit can close them all.

Known confirmed hazard (do not re-derive; find its siblings): tests/src/server/helpers.test.ts overrides the temporary directory through process.env.TMPDIR alone (lines near 1262 and 1283). Node's os.tmpdir() on win32 reads TEMP, then TMP, and never TMPDIR, so the override is inert on Windows: the residue proofs compare tmpdir() to the owned path and fail, and the allocation-failure controls never throw.

Sweep, with file:line evidence per hit:
1. Every read or write of TMPDIR, TEMP, or TMP in tests/** and src/**.
2. Every assertion comparing paths that could differ by separator (join versus hard-coded '/'), drive-relative behavior, or trailing-separator normalization.
3. Every POSIX-only filesystem assumption in tests: chmod/mode assertions not gated on supportsMode, symlink creation not gated on the link probes, case-sensitivity assumptions not gated on supportsCase, raw-byte filenames not gated on supportsBytes.
4. Every hard-coded '/tmp' or platform-specific absolute path.
5. Every use of process.platform, and whether each guard is correct for win32.
6. Every spawn of a shell or binary by name that differs on Windows (sh, /bin/*, chmod +x style expectations).
7. In src/** (the published surface): any of the same classes — report separately, because a src hit obliges a version decision, not just a test fix.

Output: a table of hits — path:line, hazard class, one-line consequence on win32, and whether it is already gated by a capability probe. Distill; no raw dumps. Name the scope you actually swept.
