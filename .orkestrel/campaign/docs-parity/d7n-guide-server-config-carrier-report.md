# Guide server configuration carrier report

The carrier authors the `configs` and `tests` propagation only.

It reads the canonical sibling Guide target and writes evidence beneath its requested output path. It validates the `src/core` and `src/server` directories, refuses a browser source directory, and reads the showcase scope from `configs/app/vite.showcase.config.ts`. Preview writes no Guide file. Apply passes the preview audit and compiled plan to the `Materializer.repair` method.

The carrier records Guide Git state, `package.json` and `package-lock.json` hashes, and index entries before and after the instrument. Each capture command fails the carrier at its own failure. A successful carrier run refuses metadata, index, or staged-entry changes.

The instrument refuses only blocking compiler questions. It destroys the compiler if Materializer construction refuses.

`node --check tmp/pass/guide-server-config.mjs` exited `0`.

Git Bash `bash -n tmp/pass/run-guide-server-config.sh` exited `0`.

`git diff --check` over the carrier files exited `0`.
