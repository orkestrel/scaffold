# E-RECEIPTS terrain — Grok absorption, read-only

You are the Cursor Grok bench on the `grok` route (absorption and distillation). Perform the assignment directly, spawn
nothing, edit nothing, run no install and no test, and return evidence, never decisions. Your working directory is
`/home/user/veneer-read`, a read-only checkout of Veneer `main` at `4cd56a8`. Cite `file:line` for every fact; cite a
site by its heading or symbol and give the line as approximate.

## Question

Veneer's exit criterion 11 reads "Receipts: each recorded receipt names its browser build; the promised hosts are
recorded." Its carrier is the E-RECEIPTS unit. Map the terrain that unit works on.

1. **The promise.** Every place in `README.md`, `guides/veneer.md`, `package.json` (the `engines`, `browserslist`, and
   `devEngines` fields, and any other host field), and `ROADMAP.md` that promises a host: a browser and its version or
   range, a Node version, a Tailwind version, a Vue version, an operating system. Quote each promise's words.
2. **The receipts.** Every recorded receipt: a sentence, table row, or record in the guide or the roadmap that states a
   run's result on a host. For each, whether it names the browser build (the exact version string) and which one.
   Include `guides/veneer.md` § Compatibility and its tables, and the ROADMAP's `Chrome receipt` and `Audit claim 14`
   rows and the host table rows near the Playwright and npm facts.
3. **F4 HOST-OBSERVATIONS.** What commit `af673cb` pinned: read `git show --stat af673cb` and the files it changed, and
   report which hosts it recorded and where the record lives now.
4. **The distribution proof.** The `test:distribution` script and the `distribution` Vitest project in
   `vite.config.ts`: what the proof packs, installs, and asserts; what "release mode" means in its code, if anything;
   what it needs from the registry or the network; and every test file it runs.
5. **The machinery that names a build.** Any helper under `tests/` that reads or records the browser version (search
   for `version()`, `browserVersion`, `HeadlessChrome`, `userAgent`, and `Chromium`), with its callers.
6. **Gaps.** Each promised host with no receipt, and each receipt that names no build. List them; do not rule on them.

## Output

The six sections, in order, each a list or a table with `file:line` citations. A seventh section lists anything you
could not read, named as unread. State no count.
