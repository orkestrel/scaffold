# Probe native CRLF correction handoff

## Outcome

`extractClaimLiteral` now recognizes LF and CRLF line boundaries while preserving its LF-joined result. `extractProbeSection` now normalizes CRLF to LF before locating and slicing a section. Bare carriage returns remain unchanged.

The focused setup cases apply the retained root instrument's claim and section inputs under LF and CRLF and require equal results. Existing indentation and absence cases remain intact.

## Changed paths

- `C:/Users/mikes/WebstormProjects/probe/tests/setupServer.ts`: normalizes the named helper matching paths.
- `C:/Users/mikes/WebstormProjects/probe/tests/setupServer.test.ts`: adds the LF/CRLF parity vector.
- `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/d7n-probe-native-crlf-report.md`: records this handoff.

No package command ran. No CLAIM, DIGEST, example, workload, source API, guide, manifest, or lockfile changed.
