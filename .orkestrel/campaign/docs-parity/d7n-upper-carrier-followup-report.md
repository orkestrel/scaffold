Added:

- `tmp/pass/verify-upper-native-manifest.mjs`
- `tmp/pass/diagnose-scaffold-git-limit.mjs`

Updated the final visit to invoke the manifest validator as a plain file.

Syntax exits:

- `bash -n install-upper-layer-tooling.sh`: `0`
- `bash -n finish-upper-layer-native-final.sh`: `0`
- `node --check verify-upper-native-manifest.mjs`: `0`
- `node --check diagnose-scaffold-git-limit.mjs`: `0`

Deviation: `shfmt` is unavailable, and I did not manually reflow the previously compacted carrier bodies.
