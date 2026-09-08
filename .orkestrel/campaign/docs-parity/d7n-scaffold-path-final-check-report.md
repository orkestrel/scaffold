I'll read the brief and the governing orchestration files first so I follow the right process.The brief is a read-only mechanical check of four closure claims. I’ll load the required rules, skills, candidate, and predecessor evidence next.The brief points at ignored `tmp/` paths, so I’ll read those files directly rather than relying on indexed search.I’ll read the candidate sources, successor diffs, and the author’s staging-script evidence next.Mechanical check of the four closure claims. Subject is the isolated candidate at `tmp/pass/scaffold-path` and the actual staging script at `tmp/pass/prepare-scaffold-path-final.sh` (root’s `--show-prefix` guard, not the author’s stale diff). Staging was not run.

## 1 — CONFIRMED

Attack: the repeated-separator assertion is missing, or `normalizePolicyPath` no longer collapses separators / still resolves segments / still decodes percent text; or `fileURLToPath` was left as `URL.pathname`.

It held.

- Candidate helper still collapses separators and does not resolve segments: `tmp/pass/scaffold-path/tests/setupPolicy.ts:277-279` (`replaceAll('\\', '/')` then `/\/+/gu`).
- Direct test adds `expect(normalizePolicyPath('src//member.ts')).toBe('src/member.ts')` and keeps the prior literal: `tests/setupPolicy.test.ts:36-39`.
- Helper still converts with `fileURLToPath`: `setupPolicy.ts:12` and `setupPolicy.ts:291`.
- Writer mutation: collapse removed, same command still green (`duplicate-before-control.log.txt`, 4 passed). Assertion added, same mutation red (`duplicate-red.log.txt`, received `src//member.ts`). Collapse restored, green (`duplicate-green.log.txt`).
- Writer mutation: `URL.pathname` red on generated file-URI paths and malformed URI (`file-url-red.log.txt`); `fileURLToPath` restored, green (`file-url-green.log.txt`).
- Root independent runs: `d7n-scaffold-path-control-duplicate-root.log.txt` exit 1; `d7n-scaffold-path-control-uri-root.log.txt` exit 1; `d7n-scaffold-path-control-green-root.log.txt` exit 0.

## 2 — CONFIRMED

Attack: successor also rewrote child cwd, diagnostic membership, shape guards, statuses, clean assertions, or the portability normalizer rule; or TSDoc still says `file:` URL; or comparison root stayed `realpathSync(scratch.path)`.

It held. Successor delta vs `tmp/d7n-scaffold-path-fix-3/diff-before.patch`:

- `tests/setupPolicy.test.ts:36` — the repeated-separator assertion.
- `tests/setupPolicy.ts:282-287` — TSDoc `file:` URI (`URL` is gone from that block).
- `tests/config.test.ts:1753-1754` — comment plus `realpathSync.native(scratch.path)`.

Unchanged in the candidate: child `cwd: scratch.path` at `config.test.ts:1839` and `1844`; diagnostic codes and filenames in the `for` table at `1876-1900`; `typeof` guards at `1857-1864`; `violations.status` `1` at `1875`; `clean.status` `0` and `cleanCodes` length `0` at `1912-1913`. Tracked successor patches name only `tests/config.test.ts` and `tests/setupPolicy.ts`. Status before and after list the same dirty set (`status-before.txt`, `status-after.txt`). Canonical rule remains at `tmp/pass/scaffold-path/.claude/rules/portability.md:44`. Existing test titles still say `file URL`; that matches the fix brief’s ban on vocabulary rewrites of those tests.

## 3 — CONFIRMED

Attack: the live script still compares Git `--show-toplevel` (native `C:/`) to the Bash `/c/` target; or a linked/redirected target or dist root can pass; or the script installs, deletes broadly, edits source, touches owner manifests, publishes, or reads credentials.

It held. Actual script, not `prepare-scaffold-path-final.diff`:

- Pin: `target=/c/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-path`, `test "$SCR/scaffold-path" = "$target"`, `test "$(cd "$target" && pwd -P)" = "$target"` (`prepare-scaffold-path-final.sh:6-13`). `pass-env.sh` sets `SCR` in the same `/c/` language.
- Root correction: `test -z "$(git -C "$target" rev-parse --show-prefix)"` at line 14. Author diff still has `rev-parse --show-toplevel` equal `$target` (`prepare-scaffold-path-final.diff` hunk at that line). No `cygpath`, drive fold, or separator rewrite.
- Baseline `c87021bdc6367d27463139b293287a586de18240` at lines 7 and 15.
- Dist refusal before any `npm run`: `test -d`, `test ! -L`, `readlink -f` equals the same Bash path (lines 19-24). Linked target fails the `pwd -P` pin.
- No `npm install`/`ci`, no `rm`, no source edit, no manifest write, no `publish`, no credential path. First candidate mutation is `npm run build:src` at line 33, after those guards.

## 4 — CONFIRMED

Attack: build order differs from the isolated `package.json` scripts; bootstrap digest is not the installed `2b76b363…` pin; manifests can change unnoticed; the untracked test is omitted; a failed step can still print `Preparation completed.`; exit 1 is swallowed outside the `--no-index` capture.

It held.

- Isolated scripts: `build:src`, `build:host`, `build:inventory` (`tmp/pass/scaffold-path/package.json:87-92`). Script runs those names in that order (lines 33-35).
- Digest: `guidehash=2b76b363f4b93b8017d42d5fd2de68ab55f2d0b01bad851f9b68fd4e80604d17` on `node_modules/@orkestrel/guide/dist/src/core/index.js` (lines 8-9, 29-30). Direct read of `tmp/pass/packed/orkestrel-guide-0.0.18.tgz` shows the tarball is present; the script pins the installed dist, not that archive.
- Manifests: `sha256sum` then `sha256sum -c` (lines 28, 37).
- Captures: `before.status.txt`, `after.status.txt`, `final.diff`, `host.diff`, and `git diff --no-index` of `tests/setupPolicy.test.ts` (lines 27, 38-46).
- `set -euo pipefail` (line 2). Success `printf` is after every check (lines 48-49). The only `git` exit-1 swallow is the `--no-index` `if` at lines 41-46; any other status, including `--no-index` not equal to `1`, fails `test` and never reaches the success line.

The script has not been executed. This claim is the authored sequence, not a completed staging run.

## Findings outside the claims

None at the `BROKEN` standard. No refreshed final guide artifact. Regenerated host digests and the whole-chain verifier remain unrun.

## Attacked and held

- Separator collapse absent from the restored helper — failed: `setupPolicy.ts:278` plus root duplicate control exit 1 then green restore.
- `URL.pathname` left in place — failed: candidate `fileURLToPath` plus root URI control exit 1 then green restore.
- Successor rewrote cwd, diagnostic table, or clean assertions — failed: those lines match the predecessor `config.test.ts` hunk except the comparison-root comment and `.native`.
- Stale `--show-toplevel` vs `/c/` still live — failed: actual line 14 is `--show-prefix` empty; physical pin remains `pwd -P`.
- Success `printf` reachable after a failed build or hash check — failed: `set -euo pipefail` and success lines only at the end.
- Adjacent and correct: test titles still say `file URL`; TSDoc on the helper says `file:` URI. `git diff` of tracked files does not include the untracked test; that file is the `--no-index` capture.

```text
VERDICT: PASS
```

Provenance: brief `tmp/cursor/d7n-scaffold-path-final-check-brief.md`; Cursor Grok mechanical checker, this session; candidate `tmp/pass/scaffold-path`; actual script `tmp/pass/prepare-scaffold-path-final.sh`.
