# Test tip vendored into Veneer (2026-09-22)

Veneer's proofs import `stageMedia`, `releaseMedia`, `holdAccessible`, `hoverAccessible`,
`releasePointer`, `sendProtocol`, and `POINTER_HOLD` from `@orkestrel/test/browser`. The registry's
latest release is `0.0.18` (2026-09-17) and carries none of them; the `orkestrel/test` default
branch tip `00e2b879a6bf917eca2065a8062218226bc7ce7d` carries all of them.

- Replaced range: `devDependencies["@orkestrel/test"] = "^0.0.18"`, lockfile resolved `0.0.18`
  from `https://registry.npmjs.org/@orkestrel/test/-/test-0.0.18.tgz`. The manifest and lockfile
  are unchanged; the tarball was installed with `--no-save`.
- Tarball: `tmp/tarballs/orkestrel-test-0.0.18.tgz` built from that tip by
  `units/test-tip-vendor-2.sh`; its digest is in `units/test-tip-vendor-2.log.txt`.
- The tip's own lockfile does not satisfy its manifest (`@types/node` `26.6.1` against `26.6.2`),
  so `npm ci` refuses it and the clone was installed with `npm install --ignore-scripts`. That is a
  Test-repository defect to carry.
- Restore the registry copy before any distribution proof and before publishing:
  `node <npm11> ci --ignore-scripts` in the Veneer checkout (`units/veneer-deps-3.sh`).
- Veneer's manifest pins `devEngines.packageManager` to npm `>=11.6.0`; this host runs npm
  `10.9.7`, so every install here runs through the npm 11 the script places in the scratchpad.
