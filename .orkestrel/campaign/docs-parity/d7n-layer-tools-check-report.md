I'll read the brief and the checker workflow first, then inspect only the files the claims require.The brief names a close-brief checker lane plus the pack instrument. I'll load those authorities and the checker role next.I'll load the checker authorities, the capture subject, and the pack instrument next, staying inside this lane.I'll read the capture source, remaining ruled-delta evidence, and the pack environment next.**Provenance.** Role `checker`, engine Cursor Grok. Journal `tmp/cursor/d7n-layer-tools-check.jsonl`, session `6e0aed4e-16a5-4ed3-9c18-f827585f8fde`. This lane read source, the supplied diff, and the standing status only. It did not run the pack script, `node --test`, `cmp`, `tar`, or `npm pack`.

---

## Carrier (`tmp/pass/layer-capture/`)

Source-conformance against the ruled delta in `d7n-layer-capture-final.diff.txt`. Frozen copy under `.orkestrel/campaign/docs-parity/instruments/d7/windows/layer-capture-final/` matches the scratch files that were compared. Standing status in `d7n-layer-capture-final.status.txt` leaves owner `package.json` / `package-lock.json` dirt outside this instrument.

**C1 File rows have `record: 'file'`, `path`, and `saved`.** PASS / CONFIRMED  
`tmp/pass/layer-capture/Capture.mjs:41` and `:45` set `record: 'file'`, `path: source`, and `saved`. `tmp/pass/layer-capture/test.mjs:27-28` asserts `record` and `path`.

**C2 Command rows have `record: 'command'`, `label`, and exact stream paths.** PASS / CONFIRMED  
`Capture.mjs:62-63` bind `stdout`/`stderr` paths; `:76` sets `label`; `:78-80` store `{ digest, path }` and `record: 'command'`. `test.mjs:73-79` reads those stream paths and asserts `record`/`label`.

**C3 No `type` / `source` row keys remain.** PASS / CONFIRMED  
File and command object literals omit those keys (`Capture.mjs:41`, `:45`, `:68-88`). Controls assert `row.type` and `row.source` are absent (`test.mjs:29-30`, `:80-81`). Remaining `source` tokens are the `file`/`command` parameters and `GIT[].source` in `constants.mjs:14-18`, not row keys.

**C4 Cached origin and UTF-8 note are factual.** PASS / CONFIRMED (source-conformance)  
`Capture.mjs:24-27` writes `encoding: 'utf8'`, `origin: 'cached'`, and the decoded-stream note. The capture spec requires that origin label for local `origin/main` (`d7n-layer-capture-brief.md` Git phase). `Capture.mjs:66-67` saves streams with `'utf8'`. `guides/process.md` treats `execute` output as captured text (`stdout.trim()`, string equality). This lane did not call `execute`.

**C5 Entry composition imports the moved `run`.** PASS / CONFIRMED  
`tmp/pass/layer-capture/main.mjs:3` and `test.mjs:9` import `{ run }` from `./functions.mjs`. `main.mjs` is entry composition only.

**C6 Duplicated settlement, redundant package branch/population restatement, timestamp wrapper, and extra containment are gone; required guards remain.** PASS / CONFIRMED  
No `settlement: result` on the command row (`Capture.mjs:81-87`). `requested` is `` `@orkestrel/${packageName}` `` with no scaffold branch (`Capture.mjs:75`). `begin` spreads `input` and does not restate `population` (`Capture.mjs:22-23`). `stamp` and `isInside` are gone (`helpers.mjs:1-5`). `functions.mjs:7-20` still refuses relative paths, non-directory root, non-file npm/git, checkout-root equality, and occupied output. The test title at `test.mjs:61` still says “settlement”; that is not a row field.

**C7 Durable controls read journal files, not only returned objects.** PASS / CONFIRMED  
`test.mjs:31-34` parses `output/rows.jsonl` for the file row. `test.mjs:82-89` parses `rows.jsonl` and `run.json` for the command row and metadata. Missing-file and occupied-output controls still use the returned object or sentinel file only; they are not the successor journal pins.

**C8 No new parser, fake, type assertion, process-supervision, or mutation was introduced.** PASS / CONFIRMED  
`JSON.parse` is limited to journals this carrier wrote (`test.mjs:32`, `:83`, `:86`), as the successor brief required. No mock/fake. No `as` / `@ts-` / `eslint-disable`. Expiry/abort/truncation remain `typeof` pins (`test.mjs:75-77`), not executed supervision. No Git or package mutation in this tree.

**Attacked and held.** Row-key hunt for `type`/`source`/`settlement:` failed on object literals. Guard hunt still finds absolute-path, checkout-root, and occupied refusals in `functions.mjs`. Extra `isInside` containment is absent.

**Outside the claims.** Focused `node --test tmp/pass/layer-capture/test.mjs` was not run here.

```text
VERDICT: PASS
```

---

## Pack instrument (`tmp/pass/pack-path-bootstrap.sh`)

Source-conformance against `tmp/units/d7n-path-bootstrap-pack-brief.md` and `.orkestrel/campaign/docs-parity/d7n-path-bootstrap-pack.diff.txt`. Scratch script matches that diff and `.orkestrel/campaign/docs-parity/instruments/d7/windows/pack-path-bootstrap.sh`. Standing status predates this scratch file; the dispatch names it root-owned. Package version in the script is `0.0.63`. This is not release readiness. Packed-byte comparison was not performed.

**P1 Packs only the isolated existing build with lifecycle scripts disabled; never installs, rebuilds, publishes, or changes source/primary package state.** CONFIRMED (source-conformance; pack unexecuted)  
The only `npm` invocation is `npm pack --ignore-scripts --json --pack-destination "$EVIDENCE"` from a subshell `cd` into `"$ISOLATED"` (`pack-path-bootstrap.sh:33-36`). No `install`, `ci`, `publish`, `rebuild`, or `npm run`. Writes go to `"$EVIDENCE"`. `pass-env.sh` only exports `SCAFFOLD`, `FLEET`, `SCR`, and `PATH`. Whether this `npm` honors `--ignore-scripts` at runtime is unexecuted.

**P2 Before packing, checks required build members and named canonical source bytes; retains isolated Git and package/lock checksums; rechecks those checksums afterward.** CONFIRMED (source-conformance; `cmp`/`git`/`sha256sum` unexecuted)  
Pre-pack: isolated directory (`:9-12`); `dist/host/manifest.json`, `dist/host/tests/setupPolicy.ts`, `dist/host/tests/config.test.ts`, `dist/src/core/index.js` (`:14-23`); `cmp` of those two test files to `$SCAFFOLD` (`:25-26`); `git -C` HEAD and status (`:29-30`); `sha256sum` of isolated `package.json` and `package-lock.json` (`:31`). After pack: `sha256sum --check` of that checksum file (`:51`). Canonical-byte check is those named files, not the whole tree.

**P3 Exclusive new output directory; artifact checksum, member list, packed manifest, and packed-host/member hashes saved.** CONFIRMED (source-conformance; `mktemp`/`tar` unexecuted)  
`mktemp -d "$SCR/packed/path-bootstrap.XXXXXX"` (`:6`). Archive required at `"$EVIDENCE/orkestrel-scaffold-0.0.63.tgz"` (`:7`, `:38-41`). Saves `artifact.sha256`, `tar-members.txt`, `packed-manifest.json`, `packed-host-manifest.json`, `packed-host-manifest.sha256`, `packed-setup-policy.sha256`, `packed-config-test.sha256` (`:43-49`). Host manifest is full JSON plus hash, not hash alone.

**P4 Native forward-slash Git Bash paths and quoted arguments; every Git call names `-C`; writes scoped to the new output directory; no credential file or destructive action.** CONFIRMED (source-conformance)  
Source path `/c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh` (`:2`). Git calls: `:29-30`. Redirects and `tar -xOf` target `"$EVIDENCE"`. No `.npmrc`, `.env`, `auth.json`, `rm`, or Git mutation.

**Factual deviation (not a blocker, per dispatch).** `"$EVIDENCE"` is allocated at `:6-7` before preflight `:9-26`. A failed preflight can leave an empty exclusive directory. That is not replacement of an earlier archive.

**Attacked and held.** Hunt for `npm install`/`publish`/`build`, `rm`, credential paths, and Git without `-C` found none. Host-manifest-as-hash-only does not apply; full JSON is saved.

```text
VERDICT: PASS
```
