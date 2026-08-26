# Unit SE1 report — sea: Windows CI axis

Builder (Sonnet) returned 2026-08-26. Acceptance met.

- `.github/workflows/ci.yml`: `runs-on: ${{ matrix.os }}`, `os: [ubuntu-latest, windows-latest]`,
  exclude row pinning Windows to the newer Node line. Every named script exists in
  `package.json`; no browser project, so no Playwright step.
- Status: ` M .github/workflows/ci.yml` only.
