I'll read the brief and the checker-lane instructions first, then stay in a read-only mechanical pass with no edits or other lanes.The brief names this as Grok’s mechanical checker lane. I’ll load the skill, rules, governing spec, and the supplied diff/status next, still read-only.Status and verifier reports are in. Next I’ll read the actual diff, the frozen carrier, and the coding-contract rules the claims depend on.Checking the execute result shape in the guide and whether `run.json` has any origin-cache synonym I missed.Lane: mechanical checker (Cursor Grok). Source review only: no probes, no survey, no other-lane reports, no credentials. Independent verifier reading is the supplied `d7n-layer-capture-verify-report.md` (exit `0`), not this lane’s run. Live survey coverage is still unmeasured. Installed `@orkestrel/process` typings were not reachable here; the execute call is judged against `guides/process.md` and root’s already-established declaration.

Journal: `tmp/cursor/d7n-layer-capture-audit.jsonl`  
Session: `59ad5b23-ccf5-4afc-89cc-92c69010743b`

## 1. CONFIRMED

**Input/state.** Production entry `run(root, output, npm, git)` in `tmp/pass/layer-capture/main.mjs`. Occupied-output control in `test.mjs`. Supplied no-index diff vs `d7n-layer-capture.status.txt`.

**Attack that held.** Search for a replacement population, sibling walk, checkout write, install, fetch, pack, or publish. `run` has no package-list argument. The visit loop is only `PACKAGES` (`main.mjs:26-28`, `constants.mjs:1-8`). No `readdir`/`opendir`. Writes go to `this.#output` (`Capture.mjs:21-32`, `59-66`, `96-97`, `115-116`). Occupied paths are refused with `lstat` then thrown, then `mkdir` without recursive (`main.mjs:17-23`); the occupied-file sentinel control is in the verifier reading. Paths use `node:path` (`isAbsolute`, `resolve`, `join`, `relative`). Git vectors are read-only; there is no `fetch`/`pull`. The no-index diff adds only `Capture.mjs`, `child.mjs`, `constants.mjs`, `helpers.mjs`, `main.mjs`, and `test.mjs` under `tmp/pass/layer-capture/`. Standing `package.json` / staged lockfile dirt is outside that diff, as the brief already marked.

**Adjacent.** `Capture.file` will write a caller-supplied `saved` path; production `package()` does not pass one outside the output tree. `npm view` is the specified registry read, not a Git origin refresh.

## 2. CONFIRMED

**Input/state.** `Capture.file` / `Capture.command` plus `begin()` metadata. File-byte and Unicode-command controls in the verifier reading.

**Attack that held.** Search for decode-on-read, `trim`, or `JSON.parse` of captured payloads. File path: `readFile` without encoding, `writeFile(saved, bytes)`, SHA-256 of those bytes (`Capture.mjs:38-40`; `helpers.mjs:4-6`). Command path: `writeFile(..., 'utf8')` of `result.stdout` / `result.stderr` with no trim (`Capture.mjs:63-66`). Settlement copied as `aborted`, `code`, `expired`, `failed`, `signal`, `truncated` (`Capture.mjs:80-87`). Rows carry `package`, `source`/`saved` or stream paths, `executable`, `arguments`, `cwd`, `started`, `finish`. `run.json` states the decoded-string UTF-8 boundary (`Capture.mjs:24`). `argv.slice` appears only on process argv (`main.mjs:33`, `child.mjs:1`), not on streams.

**Adjacent.** Command JSONL also embeds `settlement: result`, which repeats the strings already in the stream files. That is extra copy, not parsing.

## 3. CONFIRMED

**Input/state.** Missing-file and nonzero Unicode/malformed child controls; production loops in `Capture.package` / `run`.

**Attack that held.** Search for a health/complete/parse projection, a retry, a tree-outcome field, or a stop on nonzero. Missing file: error row, no `digest` (`Capture.mjs:43-46`; verifier missing-file control). Malformed JSON text is child stdout and is not parsed (verifier command control; no `JSON.parse` in the carrier). Nonzero: `failed`/`code` retained; loops break only on `expired` or `aborted` (`Capture.mjs:102`, `105`, `110`; `main.mjs:28`). Streams and the JSONL row are written before that check (`Capture.mjs:65-91`). `truncated` is retained and does not stop the run (`Capture.mjs:87`). No retry loop. No Windows-tree field. `strict: false` (`Capture.mjs:55`) matches the guide: expiry/abort settle on the result rather than reject (`guides/process.md` execute options and result flags).

**Adjacent.** This lane did not execute an expired or aborted child. The stop path is source-visible only. Ancestry `exit 1` is not in the focused controls; the production loop still would not treat `failed` as a stop.

## 4. BROKEN

**Input/state.** Production Git/npm vectors and `run.json` keys.

**Failing evidence.** `origin/main` is not labelled cached in run metadata. `begin()` writes `git`, `npm`, `output`, `population`, `root`, `encoding`, `limit`, `platform`, `registry`, `timeout`, `timestamp`, `version` (`Capture.mjs:21-32`). GIT names the origin reading `git-origin` (`constants.mjs:17`). Grep over `tmp/pass/layer-capture` finds no `cached`.

**Smallest bound.** Only the cached label is missing.

**Adjacent that remains correct.** Specified Git argv with `-C` and the checkout (`Capture.mjs:100-101`, `108-109`; `constants.mjs:13-18`). Full `npm view` via `process.execPath`, CLI path, `--registry=https://registry.npmjs.org/`, `--json` (`Capture.mjs:104`; `constants.mjs:11`). Before/after manifest and lock copies and after Git readings (`Capture.mjs:98-111`). No `JSON.parse` of package JSON, so no custom field selector. No before/after comparison in the carrier.

## 5. CONFIRMED

**Input/state.** `tmp/pass/layer-capture/test.mjs` and the supplied verifier output.

**Families (membership / exclusions).**

- **File-byte identity** — membership: `Capture.file` on a present binary source; saved bytes equal source; `row.digest` equals `digestBytes` of those bytes (`test.mjs:14-27`). Exclusion: missing files; command streams; live fleet manifests; binary command stdout.
- **Missing-file row** — membership: `Capture.file` on an absent source; `error` present; `digest` absent (`test.mjs:29-38`). Exclusion: occupied output; command failures; live missing lockfiles.
- **Occupied-output refusal** — membership: `run()` when output exists as a file holding sentinel text; rejection; sentinel unchanged (`test.mjs:40-50`). Exclusion: occupied directory; symlink/TOCTOU races; relative-path refusal; checkout-root equality (those checks exist in `run` and are not this family).
- **Command recording** — membership: `Capture.command` through real `child.mjs` via `process.execPath`; Unicode stdout/stderr; malformed JSON text; nonzero code `7`; `expired`/`aborted`/`truncated` present as booleans (`test.mjs:52-69`). Exclusion: Git/npm production vectors; expiry/abort stop; truncation; binary stdout; `npm ls` / tree traversal; process-supervision internals; live fleet.

Controls import `Capture` and `run`, use `os.tmpdir()`, and spawn the inert child. Titles do not claim the excluded classes. Production coverage is not in this suite; a survey receipt is still required before graph reconciliation.

## 6. BROKEN

**Input/state.** Durable JSONL rows from `Capture.file` / `Capture.command`.

**Failing evidence.** Row discriminant is named `type` (`Capture.mjs:40`, `44`, `79`: `'file'` / `'command'`). AGENTS.md named-discriminants law: name the axis (`category` / `command` / …), never `type` or `kind`. These rows are the durable transcript the next consumer reads.

**Smallest bound.** The discriminant key on file and command rows.

**Adjacent that remains correct.** Centralization matches the builder layout: state in `Capture.mjs`, constants in `constants.mjs`, pure helpers in `helpers.mjs`, entry in `main.mjs`, controls in `test.mjs`, inert child in `child.mjs`. `#` fields. No `JSON.parse` of package evidence. No `as` / non-null / suppression. No nested assigned function. No package-health fields. No new npm dependency; `execute` is the specified `@orkestrel/process/server` primitive. `child.mjs` is a real inert child, not a fake of project code. `digestBytes` and `isInside` are not rename-only wrappers.

## Findings fitting no claim

none

## Attacked and held (not already on a CONFIRMED line)

Tried to break claim 1 on `package.json` dirt: the supplied status shows owner/lockfile standing state; the no-index diff does not add those paths. Tried to treat `git-origin` as the cached label for claim 4: it is a command `source` id, not run-metadata `cached`. Tried to treat `settlement: result` as a health projection: it copies execute’s own fields, including `failed`, without `complete`/`healthy`/`parse`.

## Referrals (not ruled)

Subjective: whether `stamp()` (`helpers.mjs:13-15`) is a superfluous wrapper of `toISOString`.  
Objective: whether embedding the full execute result as `settlement` is more than “preserve settlement vocabulary.” This lane does not settle that.

VERDICT: FAIL 4, 6; outside the claims: none
