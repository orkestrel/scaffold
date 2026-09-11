Objective lane.

### Registry identity — CONFIRMED

The carrier’s prepared table matches the retained package names, versions, release tips, archive digests, and pack labels at [confirm-following-registry.ps1](C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/confirm-following-registry.ps1:7). It rejects registry name, version, `gitHead`, host, and tarball-path drift at [confirm-following-registry.ps1](C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/confirm-following-registry.ps1:43).

The completed [result.json](C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/d7n-following-registry-confirm-closed/result.json) records the accepted versions and release tips for Console, Database, Form, Markdown, Pool, Process, Reason, Router, Table, Template, and WebSocket.

### Registry bytes — CONFIRMED

The carrier verifies the retained local archive against its accepted SHA-256, downloads the registry archive, then requires downloaded SHA-1 equality with registry metadata and SHA-256 equality with the accepted archive at [confirm-following-registry.ps1](C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/confirm-following-registry.ps1:48).

Each package result records equal downloaded and accepted SHA-256 values and equal registry and downloaded SHA-1 values. The downloaded registry archives and metadata responses remain under [d7n-following-registry-confirm-closed](C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/d7n-following-registry-confirm-closed). This binds registry bytes transitively to the previously accepted canonical manifest and full `dist`.

### Canonical state — CONFIRMED

The carrier fetches origin before reading branch, HEAD, origin/main, and status at [confirm-following-registry.ps1](C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/confirm-following-registry.ps1:55). It rejects manifest identity drift, a non-main branch, release-tip drift, origin/main drift, or a dirty checkout at [confirm-following-registry.ps1](C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/confirm-following-registry.ps1:62).

The retained Git command receipts exit `0`; status outputs are empty; and the package result records show `main` with HEAD, origin/main, and registry `gitHead` equal to the accepted release tip.

### Refusal and authority boundary — CONFIRMED

Missing or unequal registry, archive, manifest, or Git evidence calls the failing path. A failure writes `failure.json` and rethrows; `result.json` is written only after the package loop completes at [confirm-following-registry.ps1](C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/confirm-following-registry.ps1:69). The recorded root process exited `0`.

The carrier performs registry downloads and Git fetches only. It does not authenticate, publish, upload, or read credentials.

No source defect or receipt gap remains within this registry-closure scope. The evidence does not establish the unselected upper layer or the deferred MCP/Probe transport chain, and the closure makes no such claim.

**VERDICT: PASS**
