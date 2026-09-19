GATE REPORT — GREEN

- Registry adoption: retained `npm.exit.json` records exit `0`, null signal; `terminal.json` records `success: true` at `2026-09-18T21:01:33.661Z`. Before/after snapshots retain recovery `HEAD` `86a9ef6bc4620fdf36c47af1f4c530693357eb86`, branch `recovery/journey-20260918`, identical protected-source snapshots, and identical recorded absent paths.

- Installed registry identity: the after snapshot declares Scaffold `^0.0.75` and test `^0.0.18`; installed Scaffold is `0.0.75` with `dist/bin/main.js`, test is `0.0.18`, and the recorded lock URL is `https://registry.npmjs.org/@orkestrel/scaffold/-/scaffold-0.0.75.tgz`. Integrity is `sha512-ueJmibzyJKE7fyATUgc+CUWIKpfUEJxUm8oXBSFSrusuZiRYF6s7SfdCyQFmB37vN8+SoUVCssKV4/54sr1fEA==`. Direct installed public config hash is `C8364A20FCA401E65F3C092968B1F6B4D4E025A1EFD91E22BEB01B3FCD39E076`.

- Gates: retained records show ordered `format:check`, `lint:check`, `check`, `build`, `test`, and `test:journey`; every record has exit `0` and null signal. Terminal success is `true` at `2026-09-18T21:17:02.553Z`. `test` elapsed `150652.2812 ms`; captured `test:journey` elapsed `71718.54549999998 ms` and its stdout ends `176 passed`.

- Production-sequence control: `control.json` records child exit `7`, null signal. `control-terminal.json` records `failed: "control"` and `absent: true` for `successor.executed.txt`; `control-driver.json` records exit `0`.

- Capture retention: independent PowerShell hash and PNG-header inspection exited `0`. Every inventory frame equals its recovery source and recorded SHA-256, byte size, width, and height. The `light-1280`, `dark-1280`, `light-390`, and `dark-390` journey records state `capturing: true`; each retained navigation frame exists. Retained journey logs and JSON records equal their gate-output sources.

- Limits and anomaly: no gates, installs, source changes, or capture commands were rerun. A convenience PowerShell `ConvertFrom-Json` read of the recovery `package-lock.json` emitted `Cannot process argument because the value of argument "name" is not valid`; this is the known PowerShell empty-root-key limitation. The retained after snapshot supplies the native Node lock reading, and its recorded registry identity agrees with the direct installed public-config hash.
