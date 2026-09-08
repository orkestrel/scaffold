GATE REPORT — GREEN

Markdown local artifact: `orkestrel-markdown-0.0.14.tgz`, SHA256 `02c46ebab1a401365ba73aafc9b644b7d21cf8924ee104364138dada2b10f9c3`.

- Retained carrier execution `75536`: exit `0`.
- Source guard: canonical Markdown HEAD is `ac33037b46b751fb1e25ca929556e9d5f107852a`; current status and binary diff are clean; `origin/main` is an ancestor.
- Archive, isolated Git boundary, bootstrap `npm ci`, repair, runtime staging install, artifact pack/extract, consumer install, and recorded ESM/CJS smokes: exit `0`.
- Gates `format:check`, `lint:check`, `check`, `build`, and `test`: exit `0`. No required assertion was skipped.
- Independent consumer smoke reruns: ESM exit `0`; CommonJS exit `0`. Each confirmed Markdown rendering, HTML projection, consumer-root Contract/HTML resolution, and accepted runtime-entry hashes.
- Packed manifest matches the staged manifest. Extracted `dist` comparison is empty. Runtime-only manifest delta is Contract `^0.0.16 → ^0.0.17` and HTML `^0.0.8 → ^0.0.9`; the archived bootstrap lock is unchanged.
- Selected-path repair receipts preserve the guarded host bytes and limit propagation to `tests/setupPolicy.ts` and `tests/config.test.ts`.
- `npm ls --all` exited `1` only for the recorded bootstrap dev-range mismatches: Guide `0.0.18` against `^0.0.17`, and Test `0.0.14` against `^0.0.13`. These are not runtime closure failures.

Open limits: revised `test:guides` revalidation is pending. Registry-final `test:distribution` was intentionally not run because the staged runtime versions are not registry-served.
