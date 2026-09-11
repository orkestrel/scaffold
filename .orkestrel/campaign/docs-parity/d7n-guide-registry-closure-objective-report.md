Objective lane held.

**Registry closure — CONFIRMED.**

- [confirm-guide-registry.ps1](C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/confirm-guide-registry.ps1:4) preserves the accepted predecessor’s HTTPS registry URL, exact tarball path, package identity, archive-hash, `gitHead`, manifest, clean-main, and `origin/main` guards. Its semantic changes are the Guide release bindings; compact author formatting does not change control flow or refusal behavior.

- [guide.metadata.json](C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/d7n-guide-registry-confirm-closed/guide.metadata.json:1) reports `@orkestrel/guide@0.0.18`, the canonical registry tarball URL, SHA-1 `32b2eadaa968bf1f7dc07a1c6a5d1a27757d7683`, and `gitHead` `ccd2a79058b0d814e9a031ce86089b8e981d964b`.

- [guide.json](C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/d7n-guide-registry-confirm-closed/guide.json:1) records registry and downloaded SHA-1 equality. Its downloaded SHA-256 equals accepted archive SHA-256 `01e460ee05cb84b4d24ffc2418aad29ca196d4152cf49b03bf0b68637858c638`.

- Git receipts show successful fetch, branch `main`, empty status, and local HEAD plus `origin/main` equal to the registry `gitHead`.

- Root reports the exact carrier exited `0` and returned `confirmed guide`. No failure artifact is present.

Limitation: this verdict relies on the retained point-in-time registry download and root execution. I ran no fresh registry request or gate.

VERDICT: PASS
