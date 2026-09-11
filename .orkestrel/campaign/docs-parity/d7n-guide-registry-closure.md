# Guide registry closure

Guide `0.0.18` is registry-confirmed at `ccd2a79058b0d814e9a031ce86089b8e981d964b`. Its downloaded archive is byte-identical to the accepted prepared archive. The canonical Guide checkout is clean on `main`, equal to `origin/main` and npm's `gitHead`.

The root ran `confirm-guide-registry.ps1` to exit `0`, returning `confirmed guide`. Registry and downloaded SHA1 equal `32b2eadaa968bf1f7dc07a1c6a5d1a27757d7683`. Downloaded and accepted SHA-256 equal `01e460ee05cb84b4d24ffc2418aad29ca196d4152cf49b03bf0b68637858c638`. The carrier checks exact registry identity, HTTPS URL/path, hashes, manifest and clean-main state. Receipts are retained under `evidence/d7n-guide-registry-confirm-closed`.

The reused objective analyst returned `VERDICT: PASS`; read `d7n-guide-registry-closure-objective-report.md`. Accepted source and build reviews remain closed. The owner performed the upload. No authentication or upload ran in the root session.

The Guide-only prompt is consumed and must not be rerun. Consumer preparation uses registry Guide `0.0.18` and Scaffold `0.0.64`. Remaining runtime packages are still unpublished; this closure covers Guide alone.

RELEASE: LANDED
